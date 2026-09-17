using Api.Core.Exceptions;
using Api.Features.Players;

namespace Api.Features.Squads;

public class SquadBusinessRules(
  ISquadRepository _squadRepository,
  IPlayerRepository _playerRepository)
{
  public async Task<Squad> GetSquadIfExistAsync(
    Guid id,
    Func<IQueryable<Squad>, IQueryable<Squad>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    var squad = await _squadRepository.GetByIdAsync(id, include, enableTracking, cancellationToken);

    if (squad == null)
    {
      throw new NotFoundException($"{id} numaralı kadro bulunamadı.");
    }

    return squad;
  }

  public void UserMustBeOwnerOrAdmin(
    Guid squadUserId,
    Guid currentUserId,
    string userRole)
  {
    if (squadUserId != currentUserId && userRole != "Admin")
    {
      throw new ForbiddenException("Bu işlem için yetkiniz bulunmamaktadır.");
    }
  }

  public void SlotsMustBeValid(IReadOnlyList<SquadSlotRequest> slots)
  {
    if (slots.Count != 11)
    {
      throw new BusinessException("Kadro tam olarak 11 oyuncudan oluşmalıdır.");
    }

    bool hasDuplicateSlotKeys = slots
      .GroupBy(s => s.SlotKey, StringComparer.OrdinalIgnoreCase)
      .Any(g => g.Count() > 1);

    if (hasDuplicateSlotKeys)
    {
      throw new BusinessException("Kadro içinde aynı mevki anahtarı birden fazla kullanılamaz.");
    }

    bool hasDuplicatePlayers = slots
      .GroupBy(s => s.PlayerId)
      .Any(g => g.Count() > 1);

    if (hasDuplicatePlayers)
    {
      throw new BusinessException("Aynı oyuncu kadroda birden fazla kez yer alamaz.");
    }
  }

  public async Task PlayersMustExistAndBeActiveAsync(
    IReadOnlyList<SquadSlotRequest> slots,
    CancellationToken cancellationToken = default)
  {
    foreach (var slot in slots)
    {
      Player? player = await _playerRepository.GetByIdAsync(
        slot.PlayerId,
        enableTracking: false,
        cancellationToken: cancellationToken);

      if (player == null)
      {
        throw new NotFoundException($"{slot.PlayerId} numaralı oyuncu bulunamadı.");
      }

      if (!player.IsActive)
      {
        throw new BusinessException($"'{player.Name}' aktif olmadığı için kadroya eklenemez.");
      }
    }
  }

  public void UserCannotRateOwnSquad(Guid squadUserId, Guid currentUserId)
  {
    if (squadUserId == currentUserId)
    {
      throw new BusinessException("Kendi kadronuza puan veremezsiniz.");
    }
  }

  public void ScoreMustBeValid(decimal score)
  {
    if (score < 1m || score > 5m)
    {
      throw new BusinessException("Puan 1 ile 5 arasında olmalıdır.");
    }

    if (score * 2m != Math.Floor(score * 2m))
    {
      throw new BusinessException("Puan 0.5'lik adımlarla verilmelidir (ör. 3.0, 3.5, 4.0).");
    }
  }
}
