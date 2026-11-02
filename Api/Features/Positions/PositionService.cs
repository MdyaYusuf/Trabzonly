using System.Linq.Expressions;
using Api.Core.Repositories;
using Api.Core.Responses;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Positions;

public class PositionService(
  IPositionRepository _positionRepository,
  IPositionRoleRepository _positionRoleRepository,
  PositionMapper _mapper,
  PositionBusinessRules _businessRules,
  IUnitOfWork _unitOfWork,
  IValidator<CreatePositionRequest> _createValidator,
  IValidator<UpdatePositionRequest> _updateValidator) : IPositionService
{
  public async Task<ReturnModel<PagedResponse<PositionResponseDto>>> GetAllAsync(
    Expression<Func<Position, bool>>? filter = null,
    Func<IQueryable<Position>, IQueryable<Position>>? include = null,
    Func<IQueryable<Position>, IOrderedQueryable<Position>>? orderBy = null,
    int pageNumber = 1,
    int pageSize = 10,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    var (positions, totalCount) = await _positionRepository.GetPagedListAsync(
      pageNumber,
      pageSize,
      filter,
      include: include ?? IncludeRoles,
      orderBy: orderBy ?? (query => query.OrderBy(p => p.Zone).ThenBy(p => p.Name)),
      enableTracking,
      withDeleted,
      cancellationToken);

    List<PositionResponseDto> responseDtos = _mapper.EntityToResponseDtoList(positions);
    var pagedResponse = new PagedResponse<PositionResponseDto>(responseDtos, totalCount, pageNumber, pageSize);

    return new ReturnModel<PagedResponse<PositionResponseDto>>()
    {
      Success = true,
      Message = "Pozisyon listesi başarılı bir şekilde getirildi.",
      Data = pagedResponse,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<List<PositionResponseDto>>> GetAdminListAsync(
    PositionAdminListQueryRequest query,
    CancellationToken cancellationToken = default)
  {
    List<Position> positions = await _positionRepository.GetAllAsync(
      filter: BuildAdminListFilter(query),
      include: IncludeRoles,
      orderBy: BuildAdminListOrderBy(query.Sort),
      enableTracking: false,
      cancellationToken: cancellationToken);

    List<PositionResponseDto> responseDtos = _mapper.EntityToResponseDtoList(positions);

    return new ReturnModel<List<PositionResponseDto>>()
    {
      Success = true,
      Message = "Pozisyon yönetim listesi başarılı bir şekilde getirildi.",
      Data = responseDtos,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<PositionResponseDto>> GetByIdAsync(
    int id,
    Func<IQueryable<Position>, IQueryable<Position>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    Position position = await _businessRules.GetPositionIfExistAsync(
      id,
      include: include ?? IncludeRoles,
      enableTracking,
      cancellationToken);

    PositionResponseDto response = _mapper.EntityToResponseDto(position);

    return new ReturnModel<PositionResponseDto>()
    {
      Success = true,
      Message = "Pozisyon başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<PositionResponseDto>> AddAsync(
    CreatePositionRequest request,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    _businessRules.AdminRoleRequired(userRole);

    var validationResult = await _createValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    await _businessRules.PositionNameCannotBeDuplicatedWhenInserted(request.Name, cancellationToken);
    await _businessRules.PositionAbbreviationCannotBeDuplicatedWhenInserted(request.Abbreviation, cancellationToken);

    Position position = _mapper.CreateToEntity(request);
    ApplyRoles(position, request.Roles);

    await _positionRepository.AddAsync(position, cancellationToken);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    PositionResponseDto response = _mapper.EntityToResponseDto(position);

    return new ReturnModel<PositionResponseDto>()
    {
      Success = true,
      Message = "Pozisyon başarılı bir şekilde eklendi.",
      Data = response,
      StatusCode = 201
    };
  }

  public async Task<ReturnModel<NoData>> UpdateAsync(
    UpdatePositionRequest request,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    _businessRules.AdminRoleRequired(userRole);
    var validationResult = await _updateValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    await _businessRules.PositionNameCannotBeDuplicatedWhenUpdated(request.Id, request.Name, cancellationToken);
    await _businessRules.PositionAbbreviationCannotBeDuplicatedWhenUpdated(request.Id, request.Abbreviation, cancellationToken);

    Position position = await _businessRules.GetPositionIfExistAsync(
      request.Id,
      include: IncludeRoles,
      enableTracking: true,
      cancellationToken: cancellationToken);

    _businessRules.RequestedRolesMustBelongToPosition(position, request.Roles);

    _mapper.UpdateEntityFromRequest(request, position);
    ReplaceRoles(position, request.Roles);

    _positionRepository.Update(position);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Pozisyon başarılı bir şekilde güncellendi.",
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<NoData>> RemoveAsync(
    int id,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    _businessRules.AdminRoleRequired(userRole);

    Position position = await _businessRules.GetPositionIfExistAsync(id, enableTracking: true, cancellationToken: cancellationToken);

    await _businessRules.PositionCannotBeDeletedWhenHasPlayersAsync(id, cancellationToken);

    _positionRepository.Delete(position);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Pozisyon başarılı bir şekilde silindi.",
      StatusCode = 200
    };
  }

  private void ApplyRoles(Position position, List<PositionRoleRequest> roles)
  {
    foreach (PositionRoleRequest roleRequest in roles.OrderBy(r => r.SortOrder).ThenBy(r => r.Name))
    {
      position.Roles.Add(CreateRoleFromRequest(roleRequest));
    }
  }

  private void ReplaceRoles(Position position, List<PositionRoleRequest> roles)
  {
    HashSet<int> keepIds = roles
      .Where(r => r.Id.HasValue)
      .Select(r => r.Id!.Value)
      .ToHashSet();

    List<PositionRole> rolesToRemove = position.Roles
      .Where(r => !keepIds.Contains(r.Id))
      .ToList();

    if (rolesToRemove.Count > 0)
    {
      _positionRoleRepository.DeleteRange(rolesToRemove);

      foreach (PositionRole role in rolesToRemove)
      {
        position.Roles.Remove(role);
      }
    }

    foreach (PositionRoleRequest roleRequest in roles.OrderBy(r => r.SortOrder).ThenBy(r => r.Name))
    {
      if (!roleRequest.Id.HasValue)
      {
        position.Roles.Add(CreateRoleFromRequest(roleRequest));
        continue;
      }

      PositionRole? existing = position.Roles.FirstOrDefault(r => r.Id == roleRequest.Id.Value);

      if (existing == null)
      {
        continue;
      }

      existing.Name = roleRequest.Name.Trim();
      existing.Description = roleRequest.Description.Trim();
      existing.SortOrder = roleRequest.SortOrder;
      _positionRoleRepository.Update(existing);
    }
  }

  private static PositionRole CreateRoleFromRequest(PositionRoleRequest roleRequest)
  {
    return new PositionRole
    {
      Name = roleRequest.Name.Trim(),
      Description = roleRequest.Description.Trim(),
      SortOrder = roleRequest.SortOrder
    };
  }

  private static IQueryable<Position> IncludeRoles(IQueryable<Position> query)
  {
    return query.Include(p => p.Roles);
  }

  private static Expression<Func<Position, bool>> BuildAdminListFilter(
    PositionAdminListQueryRequest query)
  {
    string? search = query.Search?.Trim();
    PositionZone? zone = query.Zone;

    return position =>
      (!zone.HasValue || position.Zone == zone.Value) &&
      (string.IsNullOrEmpty(search) ||
        position.Name.Contains(search) ||
        position.Abbreviation.Contains(search));
  }

  private static Func<IQueryable<Position>, IOrderedQueryable<Position>> BuildAdminListOrderBy(
    string? sort)
  {
    string normalized = sort?.Trim().ToLowerInvariant() ?? PositionSortOptions.ZoneAsc;

    return normalized switch
    {
      PositionSortOptions.NameAsc => query => query
        .OrderBy(p => p.Name)
        .ThenBy(p => p.Abbreviation),
      PositionSortOptions.AbbreviationAsc => query => query
        .OrderBy(p => p.Abbreviation)
        .ThenBy(p => p.Name),
      _ => query => query
        .OrderBy(p => p.Zone)
        .ThenBy(p => p.Name)
        .ThenBy(p => p.Abbreviation)
    };
  }
}
