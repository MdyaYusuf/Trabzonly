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
  public async Task<ReturnModel<List<InjuryResponseDto>>> GetAllAsync(
    Expression<Func<Injury, bool>>? filter = null,
    Func<IQueryable<Injury>, IQueryable<Injury>>? include = null,
    Func<IQueryable<Injury>, IOrderedQueryable<Injury>>? orderBy = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    List<Injury> injuries = await _injuryRepository.GetAllAsync(
      filter,
      include: include ?? (query => query.Include(i => i.Player).Include(i => i.Season)),
      orderBy: orderBy ?? (query => query.OrderByDescending(i => i.CreatedDate)),
      enableTracking,
      withDeleted,
      cancellationToken);

    List<InjuryResponseDto> response = _mapper.EntityToResponseDtoList(injuries);

    return new ReturnModel<List<InjuryResponseDto>>()
    {
      Success = true,
      Message = "Sakatlık listesi başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<InjuryResponseDto>> GetByIdAsync(
    Guid id,
    Func<IQueryable<Injury>, IQueryable<Injury>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    Injury injury = await _businessRules.GetInjuryIfExistAsync(
      id,
      include: include ?? (query => query.Include(i => i.Player).Include(i => i.Season)),
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
    Guid id,
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
}