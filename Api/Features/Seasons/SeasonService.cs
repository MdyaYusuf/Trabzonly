using System.Linq.Expressions;
using Api.Core.Repositories;
using Api.Core.Responses;
using FluentValidation;

namespace Api.Features.Seasons;

public class SeasonService(
  ISeasonRepository _seasonRepository,
  SeasonMapper _mapper,
  SeasonBusinessRules _businessRules,
  IUnitOfWork _unitOfWork,
  IValidator<CreateSeasonRequest> _createValidator,
  IValidator<UpdateSeasonRequest> _updateValidator) : ISeasonService
{
  public async Task<ReturnModel<List<SeasonResponseDto>>> GetAllAsync(
    Expression<Func<Season, bool>>? filter = null,
    Func<IQueryable<Season>, IQueryable<Season>>? include = null,
    Func<IQueryable<Season>, IOrderedQueryable<Season>>? orderBy = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    List<Season> seasons = await _seasonRepository.GetAllAsync(
      filter,
      include,
      orderBy,
      enableTracking,
      withDeleted,
      cancellationToken);

    List<SeasonResponseDto> response = _mapper.EntityToResponseDtoList(seasons);

    return new ReturnModel<List<SeasonResponseDto>>()
    {
      Success = true,
      Message = "Sezon listesi başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<SeasonResponseDto>> GetByIdAsync(
    Guid id,
    Func<IQueryable<Season>, IQueryable<Season>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    Season season = await _businessRules.GetSeasonIfExistAsync(
      id,
      include,
      enableTracking,
      cancellationToken);

    SeasonResponseDto response = _mapper.EntityToResponseDto(season);

    return new ReturnModel<SeasonResponseDto>()
    {
      Success = true,
      Message = "Sezon başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<SeasonResponseDto>> AddAsync(
    CreateSeasonRequest request,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    _businessRules.AdminRoleRequired(userRole);

    var validationResult = await _createValidator.ValidateAsync(request, cancellationToken);
    if (!validationResult.IsValid) throw new ValidationException(validationResult.Errors);

    await _businessRules.SeasonNameCannotBeDuplicatedAsync(request.Name, cancellationToken);
    await _businessRules.SeasonDatesCannotOverlapAsync(request.StartDate, request.EndDate, null, cancellationToken);

    Season season = _mapper.CreateToEntity(request);

    await _seasonRepository.AddAsync(season, cancellationToken);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    SeasonResponseDto response = _mapper.EntityToResponseDto(season);

    return new ReturnModel<SeasonResponseDto>()
    {
      Success = true,
      Message = "Sezon başarılı bir şekilde eklendi.",
      Data = response,
      StatusCode = 201
    };
  }

  public async Task<ReturnModel<NoData>> UpdateAsync(
    UpdateSeasonRequest request,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    _businessRules.AdminRoleRequired(userRole);

    var validationResult = await _updateValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    await _businessRules.SeasonNameCannotBeDuplicatedWhenUpdatedAsync(request.Id, request.Name, cancellationToken);
    await _businessRules.SeasonDatesCannotOverlapAsync(request.StartDate, request.EndDate, request.Id, cancellationToken);

    Season season = await _businessRules.GetSeasonIfExistAsync(request.Id, enableTracking: true, cancellationToken: cancellationToken);

    _mapper.UpdateEntityFromRequest(request, season);

    _seasonRepository.Update(season);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Sezon başarılı bir şekilde güncellendi.",
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<NoData>> RemoveAsync(
    Guid id,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    _businessRules.AdminRoleRequired(userRole);

    Season season = await _businessRules.GetSeasonIfExistAsync(id, enableTracking: true, cancellationToken: cancellationToken);

    _seasonRepository.Delete(season);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Sezon başarılı bir şekilde silindi.",
      StatusCode = 200
    };
  }
}