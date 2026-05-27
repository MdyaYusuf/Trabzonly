using System.Linq.Expressions;
using Api.Core.Repositories;
using Api.Core.Responses;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Stats;

public class PlayerStatsService(
  IPlayerStatsRepository _playerStatsRepository,
  PlayerStatsMapper _mapper,
  PlayerStatsBusinessRules _businessRules,
  IUnitOfWork _unitOfWork,
  IValidator<CreatePlayerStatsRequest> _createValidator,
  IValidator<UpdatePlayerStatsRequest> _updateValidator) : IPlayerStatsService
{
  public async Task<ReturnModel<PagedResponse<PlayerStatsResponseDto>>> GetAllAsync(
    Expression<Func<PlayerStats, bool>>? filter = null,
    Func<IQueryable<PlayerStats>, IQueryable<PlayerStats>>? include = null,
    Func<IQueryable<PlayerStats>, IOrderedQueryable<PlayerStats>>? orderBy = null,
    int pageNumber = 1,
    int pageSize = 10,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    var (stats, totalCount) = await _playerStatsRepository.GetPagedListAsync(
      pageNumber,
      pageSize,
      filter,
      include: include ?? (query => query.Include(s => s.Player).Include(s => s.Season)),
      orderBy: orderBy ?? (query => query.OrderByDescending(s => s.CreatedDate)),
      enableTracking,
      withDeleted,
      cancellationToken);

    List<PlayerStatsResponseDto> responseDtos = _mapper.EntityToResponseDtoList(stats);
    var pagedResponse = new PagedResponse<PlayerStatsResponseDto>(responseDtos, totalCount, pageNumber, pageSize);

    return new ReturnModel<PagedResponse<PlayerStatsResponseDto>>()
    {
      Success = true,
      Message = "İstatistik listesi başarılı bir şekilde getirildi.",
      Data = pagedResponse,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<PlayerStatsResponseDto>> GetByIdAsync(
    Guid id,
    Func<IQueryable<PlayerStats>, IQueryable<PlayerStats>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    PlayerStats stats = await _businessRules.GetPlayerStatsIfExistAsync(
      id,
      include: include ?? (query => query.Include(s => s.Player).Include(s => s.Season)),
      enableTracking,
      cancellationToken);

    PlayerStatsResponseDto response = _mapper.EntityToResponseDto(stats);

    return new ReturnModel<PlayerStatsResponseDto>()
    {
      Success = true,
      Message = "İstatistik başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<CursorPagedResponse<PlayerStatsResponseDto>>> GetTopScorersAsync(
    int count,
    int? lastValueCursor = null,
    Guid? lastIdCursor = null,
    Func<IQueryable<PlayerStats>, IQueryable<PlayerStats>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    List<PlayerStats> stats = await _playerStatsRepository.GetTopScorersAsync(
      count + 1,
      lastValueCursor,
      lastIdCursor,
      include: include ?? (query => query.Include(s => s.Player).Include(s => s.Season)),
      enableTracking,
      withDeleted,
      cancellationToken);

    bool hasNextPage = stats.Count > count;
    var itemsToReturn = hasNextPage ? stats.Take(count).ToList() : stats;

    List<PlayerStatsResponseDto> response = _mapper.EntityToResponseDtoList(itemsToReturn);

    var pagedResponse = new CursorPagedResponse<PlayerStatsResponseDto>
    {
      Items = response,
      NextCursorValue = itemsToReturn.LastOrDefault()?.Goals,
      NextCursorId = itemsToReturn.LastOrDefault()?.Id,
      HasNextPage = hasNextPage
    };

    return new ReturnModel<CursorPagedResponse<PlayerStatsResponseDto>>()
    {
      Success = true,
      Message = "En çok gol atan oyuncular başarılı bir şekilde getirildi.",
      Data = pagedResponse,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<CursorPagedResponse<PlayerStatsResponseDto>>> GetTopAssistersAsync(
    int count,
    int? lastValueCursor = null,
    Guid? lastIdCursor = null,
    Func<IQueryable<PlayerStats>, IQueryable<PlayerStats>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    List<PlayerStats> stats = await _playerStatsRepository.GetTopAssistersAsync(
      count + 1,
      lastValueCursor,
      lastIdCursor,
      include: include ?? (query => query.Include(s => s.Player).Include(s => s.Season)),
      enableTracking,
      withDeleted,
      cancellationToken);

    bool hasNextPage = stats.Count > count;
    var itemsToReturn = hasNextPage ? stats.Take(count).ToList() : stats;

    List<PlayerStatsResponseDto> response = _mapper.EntityToResponseDtoList(itemsToReturn);

    var pagedResponse = new CursorPagedResponse<PlayerStatsResponseDto>
    {
      Items = response,
      NextCursorValue = itemsToReturn.LastOrDefault()?.Assists,
      NextCursorId = itemsToReturn.LastOrDefault()?.Id,
      HasNextPage = hasNextPage
    };

    return new ReturnModel<CursorPagedResponse<PlayerStatsResponseDto>>()
    {
      Success = true,
      Message = "En çok asist yapan oyuncular başarılı bir şekilde getirildi.",
      Data = pagedResponse,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<CreatedPlayerStatsResponseDto>> AddAsync(
    CreatePlayerStatsRequest request,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    _businessRules.AdminRoleRequired(userRole);

    var validationResult = await _createValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    _businessRules.PlayerStatsMustBeLogicallyValid(
      request.Appearances,
      request.MinutesPlayed,
      request.Goals,
      request.Assists,
      request.CleanSheets,
      request.RedCards);
    await _businessRules.PlayerStatsCannotBeDuplicatedWhenInserted(request.PlayerId, request.SeasonId, request.Team, cancellationToken);

    PlayerStats stats = _mapper.CreateToEntity(request);

    await _playerStatsRepository.AddAsync(stats, cancellationToken);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    CreatedPlayerStatsResponseDto response = _mapper.EntityToCreatedResponseDto(stats);

    return new ReturnModel<CreatedPlayerStatsResponseDto>()
    {
      Success = true,
      Message = "İstatistik başarılı bir şekilde eklendi.",
      Data = response,
      StatusCode = 201
    };
  }

  public async Task<ReturnModel<NoData>> UpdateAsync(
    UpdatePlayerStatsRequest request,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    _businessRules.AdminRoleRequired(userRole);

    var validationResult = await _updateValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    _businessRules.PlayerStatsMustBeLogicallyValid(
      request.Appearances,
      request.MinutesPlayed,
      request.Goals,
      request.Assists,
      request.CleanSheets,
      request.RedCards);
    await _businessRules.PlayerStatsCannotBeDuplicatedWhenUpdated(request.Id, request.PlayerId, request.SeasonId, request.Team, cancellationToken);

    PlayerStats stats = await _businessRules.GetPlayerStatsIfExistAsync(request.Id, enableTracking: true, cancellationToken: cancellationToken);

    _mapper.UpdateEntityFromRequest(request, stats);

    _playerStatsRepository.Update(stats);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "İstatistik başarılı bir şekilde güncellendi.",
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<NoData>> RemoveAsync(
    Guid id,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    _businessRules.AdminRoleRequired(userRole);

    PlayerStats stats = await _businessRules.GetPlayerStatsIfExistAsync(id, enableTracking: true, cancellationToken: cancellationToken);

    _playerStatsRepository.Delete(stats);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "İstatistik başarılı bir şekilde silindi.",
      StatusCode = 200
    };
  }
}