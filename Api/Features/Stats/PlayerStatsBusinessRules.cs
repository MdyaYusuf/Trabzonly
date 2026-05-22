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
    var existing = await _playerStatsRepository.GetAsync(s => s.PlayerId == playerId && s.SeasonId == seasonId && s.Team == team, enableTracking: false, cancellationToken: cancellationToken);

    if (existing != null)
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
    var existing = await _playerStatsRepository.GetAsync(s => s.Id != id && s.PlayerId == playerId && s.SeasonId == seasonId && s.Team == team, enableTracking: false, cancellationToken: cancellationToken);

    if (existing != null)
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
}