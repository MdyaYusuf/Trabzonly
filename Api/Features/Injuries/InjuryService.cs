using System.Linq.Expressions;
using Api.Core.Repositories;
using Api.Core.Responses;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Injuries;

public class InjuryService(
  IInjuryRepository _injuryRepository,
  InjuryMapper _mapper,
  InjuryBusinessRules _businessRules,
  IUnitOfWork _unitOfWork,
  IValidator<CreateInjuryRequest> _createValidator,
  IValidator<UpdateInjuryRequest> _updateValidator) : IInjuryService
{
  public async Task<ReturnModel<PagedResponse<InjuryResponseDto>>> GetAllAsync(
    Expression<Func<Injury, bool>>? filter = null,
    Func<IQueryable<Injury>, IQueryable<Injury>>? include = null,
    Func<IQueryable<Injury>, IOrderedQueryable<Injury>>? orderBy = null,
    int pageNumber = 1,
    int pageSize = 10,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    var (injuries, totalCount) = await _injuryRepository.GetPagedListAsync(
      pageNumber,
      pageSize,
      filter,
      include: include ?? BuildDefaultInclude(),
      orderBy: orderBy ?? (query => query.OrderByDescending(i => i.CreatedDate)),
      enableTracking,
      withDeleted,
      cancellationToken);

    List<InjuryResponseDto> responseDtos = _mapper.EntityToResponseDtoList(injuries);
    var pagedResponse = new PagedResponse<InjuryResponseDto>(responseDtos, totalCount, pageNumber, pageSize);

    return new ReturnModel<PagedResponse<InjuryResponseDto>>()
    {
      Success = true,
      Message = "Sakatlık listesi başarılı bir şekilde getirildi.",
      Data = pagedResponse,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<PagedResponse<InjuryResponseDto>>> GetAdminListAsync(
    InjuryAdminListQueryRequest query,
    CancellationToken cancellationToken = default)
  {
    int pageNumber = query.PageNumber < 1 ? 1 : query.PageNumber;
    int pageSize = query.PageSize < 1 ? 10 : Math.Min(query.PageSize, 50);

    return await GetAllAsync(
      filter: BuildAdminListFilter(query),
      include: BuildDefaultInclude(),
      orderBy: query => query.OrderByDescending(i => i.CreatedDate).ThenBy(i => i.Player.Name),
      pageNumber: pageNumber,
      pageSize: pageSize,
      cancellationToken: cancellationToken);
  }

  public async Task<ReturnModel<InjuryResponseDto>> GetByIdAsync(
    int id,
    Func<IQueryable<Injury>, IQueryable<Injury>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    Injury injury = await _businessRules.GetInjuryIfExistAsync(
      id,
      include: include ?? BuildDefaultInclude(),
      enableTracking,
      cancellationToken);

    InjuryResponseDto response = _mapper.EntityToResponseDto(injury);

    return new ReturnModel<InjuryResponseDto>()
    {
      Success = true,
      Message = "Sakatlık başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<CreatedInjuryResponseDto>> AddAsync(
    CreateInjuryRequest request,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    _businessRules.AdminRoleRequired(userRole);

    var validationResult = await _createValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    _businessRules.InjuryMustBeLogicallyValid(request.DaysInjured, request.GamesMissed);
    await _businessRules.InjuryCannotBeDuplicatedAsync(
      request.PlayerId,
      request.SeasonId,
      request.Name,
      request.DaysInjured,
      request.GamesMissed,
      cancellationToken);

    Injury injury = _mapper.CreateToEntity(request);

    await _injuryRepository.AddAsync(injury, cancellationToken);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    CreatedInjuryResponseDto response = _mapper.EntityToCreatedResponseDto(injury);

    return new ReturnModel<CreatedInjuryResponseDto>()
    {
      Success = true,
      Message = "Sakatlık başarılı bir şekilde eklendi.",
      Data = response,
      StatusCode = 201
    };
  }

  public async Task<ReturnModel<NoData>> UpdateAsync(
    UpdateInjuryRequest request,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    _businessRules.AdminRoleRequired(userRole);

    var validationResult = await _updateValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    _businessRules.InjuryMustBeLogicallyValid(request.DaysInjured, request.GamesMissed);
    await _businessRules.InjuryCannotBeDuplicatedWhenUpdatedAsync(
      request.Id,
      request.PlayerId,
      request.SeasonId,
      request.Name,
      request.DaysInjured,
      request.GamesMissed,
      cancellationToken);

    Injury injury = await _businessRules.GetInjuryIfExistAsync(request.Id, enableTracking: true, cancellationToken: cancellationToken);

    _mapper.UpdateEntityFromRequest(request, injury);

    _injuryRepository.Update(injury);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Sakatlık başarılı bir şekilde güncellendi.",
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<NoData>> RemoveAsync(
    int id,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    _businessRules.AdminRoleRequired(userRole);

    Injury injury = await _businessRules.GetInjuryIfExistAsync(id, enableTracking: true, cancellationToken: cancellationToken);

    _injuryRepository.Delete(injury);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Sakatlık başarılı bir şekilde silindi.",
      StatusCode = 200
    };
  }

  private static Func<IQueryable<Injury>, IQueryable<Injury>> BuildDefaultInclude()
  {
    return query => query
      .Include(i => i.Player)
        .ThenInclude(p => p.Position)
      .Include(i => i.Season);
  }

  private static Expression<Func<Injury, bool>> BuildAdminListFilter(
    InjuryAdminListQueryRequest query)
  {
    string? search = query.Search?.Trim();
    int? seasonId = query.SeasonId;
    int? playerId = query.PlayerId;

    return injury =>
      (!seasonId.HasValue || injury.SeasonId == seasonId.Value) &&
      (!playerId.HasValue || injury.PlayerId == playerId.Value) &&
      (string.IsNullOrEmpty(search) ||
        injury.Name.Contains(search) ||
        injury.Player.Name.Contains(search) ||
        (injury.Player.ShirtNumber.HasValue &&
          injury.Player.ShirtNumber.Value.ToString().Contains(search)));
  }
}