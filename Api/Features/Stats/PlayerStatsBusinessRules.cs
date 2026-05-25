using Api.Core.Exceptions;

namespace Api.Features.Stats;

public class PlayerStatsBusinessRules(IPlayerStatsRepository _playerStatsRepository)
{
  public async Task<PlayerStats> GetPlayerStatsIfExistAsync(
    Guid id,
    Func<IQueryable<PlayerStats>, IQueryable<PlayerStats>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    var stats = await _playerStatsRepository.GetByIdAsync(id, include, enableTracking, cancellationToken);

    if (stats == null)
    {
      throw new NotFoundException($"{id} numaralı oyuncu istatistiği bulunamadı.");
    }

    return stats;
  }

  public async Task PlayerStatsCannotBeDuplicatedWhenInserted(
    Guid playerId,
    Guid seasonId,
    string team,
    CancellationToken cancellationToken)
  {
    bool exists = await _playerStatsRepository.AnyAsync(
      s => s.PlayerId == playerId && s.SeasonId == seasonId && s.Team == team, cancellationToken);

    if (exists)
    {
      throw new BusinessException("Bu oyuncunun belirtilen sezon ve takıma ait istatistiği zaten mevcut.");
    }
  }

  public async Task PlayerStatsCannotBeDuplicatedWhenUpdated(
    Guid id,
    Guid playerId,
    Guid seasonId,
    string team,
    CancellationToken cancellationToken)
  {
    bool exists = await _playerStatsRepository.AnyAsync(
      s => s.Id != id && s.PlayerId == playerId && s.SeasonId == seasonId && s.Team == team, cancellationToken);

    if (exists)
    {
      throw new BusinessException("Bu oyuncunun belirtilen sezon ve takıma ait istatistiği zaten mevcut.");
    }
  }

  public void AdminRoleRequired(string userRole)
  {
    if (userRole != "Admin")
    {
      throw new ForbiddenException("Bu işlem için yetkiniz bulunmamaktadır.");
    }
  }

  public void PlayerStatsMustBeLogicallyValid(
    int appearances,
    int minutesPlayed,
    int goals,
    int assists,
    int cleanSheets,
    int redCards)
  {
    if (appearances == 0 && (goals > 0 || assists > 0 || minutesPlayed > 0 || cleanSheets > 0 || redCards > 0))
    {
      throw new BusinessException("Hiç maça çıkmamış bir oyuncunun gol, asist veya dakika gibi istatistikleri olamaz.");
    }

    if (cleanSheets > appearances)
    {
      throw new BusinessException("Gol yemeden bitirilen maç sayısı, toplam maça çıkma sayısından büyük olamaz.");
    }

    if (redCards > appearances)
    {
      throw new BusinessException("Kırmızı kart sayısı, toplam maça çıkma sayısından büyük olamaz.");
    }

    // Assuming a max of ~130 minutes per game (90 mins + 30 extra time + 10 stoppage)
    if (minutesPlayed > appearances * 130)
    {
      throw new BusinessException("Girilen oynanan dakika sayısı, çıkılan maç sayısına göre fiziksel olarak imkansız.");
    }
  }
}