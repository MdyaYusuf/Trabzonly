using System.Linq.Expressions;
using Api.Core.Repositories;
using Api.Core.Responses;
using FluentValidation;

namespace Api.Features.Positions;

public class PositionService(
  IPositionRepository _positionRepository,
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
      include,
      orderBy,
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

  public async Task<ReturnModel<PositionResponseDto>> GetByIdAsync(
    Guid id,
    Func<IQueryable<Position>, IQueryable<Position>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    Position position = await _businessRules.GetPositionIfExistAsync(
      id,
      include,
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

    Position position = await _businessRules.GetPositionIfExistAsync(request.Id, enableTracking: true, cancellationToken: cancellationToken);

    _mapper.UpdateEntityFromRequest(request, position);

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
    Guid id,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    _businessRules.AdminRoleRequired(userRole);

    Position position = await _businessRules.GetPositionIfExistAsync(id, enableTracking: true, cancellationToken: cancellationToken);

    _positionRepository.Delete(position);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Pozisyon başarılı bir şekilde silindi.",
      StatusCode = 200
    };
  }
}