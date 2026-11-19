using Api.Core.Exceptions;

namespace Api.Features.Stats;

public class PlayerStatsBusinessRules(IPlayerStatsRepository _playerStatsRepository)
{
  public async Task<PlayerStats> GetPlayerStatsIfExistAsync(
    int id,
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
    int playerId,
    int seasonId,
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
    int id,
    int playerId,
    int seasonId,
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
    int goals,
    int? assists,
    int? cleanSheets,
    int? redCards)
  {
    int resolvedAssists = assists ?? 0;
    int resolvedCleanSheets = cleanSheets ?? 0;
    int resolvedRedCards = redCards ?? 0;

    if (appearances == 0 && (goals > 0 || resolvedAssists > 0 || resolvedCleanSheets > 0 || resolvedRedCards > 0))
    {
      throw new BusinessException("Hiç maça çıkmamış bir oyuncunun gol, asist veya kart gibi istatistikleri olamaz.");
    }

    if (cleanSheets.HasValue && cleanSheets.Value > appearances)
    {
      throw new BusinessException("Gol yenilmeyen maç sayısı, toplam maça çıkma sayısından büyük olamaz.");
    }

    if (resolvedRedCards > appearances)
    {
      throw new BusinessException("Kırmızı kart sayısı, toplam maça çıkma sayısından büyük olamaz.");
    }
  }
}