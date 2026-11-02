using Api.Core.Exceptions;
using Api.Features.Players;

namespace Api.Features.Positions;

public class PositionBusinessRules(
  IPositionRepository _positionRepository,
  IPlayerRepository _playerRepository)
{
  public async Task<Position> GetPositionIfExistAsync(
    int id,
    Func<IQueryable<Position>, IQueryable<Position>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    var position = await _positionRepository.GetByIdAsync(id, include, enableTracking, cancellationToken);

    if (position == null)
    {
      throw new NotFoundException($"{id} numaralı pozisyon bulunamadı.");
    }

    return position;
  }

  public async Task PositionAbbreviationCannotBeDuplicatedWhenInserted(
    string abbreviation,
    CancellationToken cancellationToken)
  {
    bool exists = await _positionRepository.AnyAsync(p => p.Abbreviation == abbreviation, cancellationToken);

    if (exists)
    {
      throw new BusinessException("Bu kısaltmaya sahip bir pozisyon zaten mevcut.");
    }
  }

  public async Task PositionAbbreviationCannotBeDuplicatedWhenUpdated(
    int id,
    string abbreviation,
    CancellationToken cancellationToken)
  {
    bool exists = await _positionRepository.AnyAsync(p => p.Id != id && p.Abbreviation == abbreviation, cancellationToken);

    if (exists)
    {
      throw new BusinessException("Bu kısaltmaya sahip bir pozisyon zaten mevcut.");
    }
  }

  public void AdminRoleRequired(
    string userRole)
  {
    if (userRole != "Admin")
    {
      throw new ForbiddenException("Bu işlem için yetkiniz bulunmamaktadır.");
    }
  }

  public async Task PositionNameCannotBeDuplicatedWhenInserted(
    string name,
    CancellationToken cancellationToken)
  {
    bool exists = await _positionRepository.AnyAsync(p => p.Name == name, cancellationToken);

    if (exists)
    {
      throw new BusinessException("Bu ada sahip bir pozisyon zaten mevcut.");
    }
  }

  public async Task PositionNameCannotBeDuplicatedWhenUpdated(
    int id,
    string name,
    CancellationToken cancellationToken)
  {
    bool exists = await _positionRepository.AnyAsync(p => p.Id != id && p.Name == name, cancellationToken);

    if (exists)
    {
      throw new BusinessException("Bu ada sahip bir pozisyon zaten mevcut.");
    }
  }

  public async Task PositionCannotBeDeletedWhenHasPlayersAsync(
    int positionId,
    CancellationToken cancellationToken = default)
  {
    bool hasPlayers = await _playerRepository.AnyAsync(p => p.PositionId == positionId, cancellationToken);

    if (hasPlayers)
    {
      throw new BusinessException(
        "Bu pozisyona bağlı oyuncular varken silinemez. Önce oyuncuları başka bir pozisyona taşıyın.");
    }
  }

  public void RequestedRolesMustBelongToPosition(
    Position position,
    IReadOnlyList<PositionRoleRequest> roles)
  {
    HashSet<int> existingIds = position.Roles.Select(r => r.Id).ToHashSet();

    foreach (PositionRoleRequest role in roles)
    {
      if (!role.Id.HasValue)
      {
        continue;
      }

      if (!existingIds.Contains(role.Id.Value))
      {
        throw new BusinessException(
          $"{role.Id.Value} numaralı rol bu pozisyona ait değil.");
      }
    }
  }
}
