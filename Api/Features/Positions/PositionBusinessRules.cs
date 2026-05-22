using Api.Core.Exceptions;

namespace Api.Features.Positions;

public class PositionBusinessRules(IPositionRepository _positionRepository)
{
  public async Task<Position> GetPositionIfExistAsync(
    Guid id,
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
    var existingPosition = await _positionRepository.GetAsync(p => p.Abbreviation == abbreviation, enableTracking: false, cancellationToken: cancellationToken);

    if (existingPosition != null)
    {
      throw new BusinessException("Bu kısaltmaya sahip bir pozisyon zaten mevcut.");
    }
  }

  public async Task PositionAbbreviationCannotBeDuplicatedWhenUpdated(
    Guid id,
    string abbreviation,
    CancellationToken cancellationToken)
  {
    var existingPosition = await _positionRepository.GetAsync(p => p.Id != id && p.Abbreviation == abbreviation, enableTracking: false, cancellationToken: cancellationToken);

    if (existingPosition != null)
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
}