using System.Linq.Expressions;
using Api.Core.Repositories;
using Api.Core.Responses;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Squads;

public class SquadService(
  ISquadRepository _squadRepository,
  ISquadSlotRepository _squadSlotRepository,
  ISquadRatingRepository _squadRatingRepository,
  SquadMapper _mapper,
  SquadBusinessRules _businessRules,
  IUnitOfWork _unitOfWork,
  IValidator<CreateSquadRequest> _createValidator,
  IValidator<UpdateSquadRequest> _updateValidator,
  IValidator<RateSquadRequest> _rateValidator) : ISquadService
{
  private static readonly Func<IQueryable<Squad>, IQueryable<Squad>> DefaultPreviewInclude =
    query => query.Include(s => s.User);

  private static readonly Func<IQueryable<Squad>, IQueryable<Squad>> DefaultDetailInclude =
    query => query
      .Include(s => s.User)
      .Include(s => s.Slots)
        .ThenInclude(slot => slot.Player)
          .ThenInclude(player => player.Position);

  public async Task<ReturnModel<PagedResponse<SquadPreviewDto>>> GetAllAsync(
    Expression<Func<Squad, bool>>? filter = null,
    Func<IQueryable<Squad>, IQueryable<Squad>>? include = null,
    Func<IQueryable<Squad>, IOrderedQueryable<Squad>>? orderBy = null,
    int pageNumber = 1,
    int pageSize = 10,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    var (squads, totalCount) = await _squadRepository.GetPagedListAsync(
      pageNumber,
      pageSize,
      filter,
      include: include ?? DefaultPreviewInclude,
      orderBy: orderBy ?? (query => query.OrderByDescending(s => s.CreatedDate)),
      enableTracking,
      withDeleted,
      cancellationToken);

    List<SquadPreviewDto> responseDtos = _mapper.EntityToPreviewDtoList(squads);
    var pagedResponse = new PagedResponse<SquadPreviewDto>(responseDtos, totalCount, pageNumber, pageSize);

    return new ReturnModel<PagedResponse<SquadPreviewDto>>()
    {
      Success = true,
      Message = "Kadro listesi başarılı bir şekilde getirildi.",
      Data = pagedResponse,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<SquadResponseDto>> GetByIdAsync(
    Guid id,
    Guid? currentUserId = null,
    Func<IQueryable<Squad>, IQueryable<Squad>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    Squad squad = await _businessRules.GetSquadIfExistAsync(
      id,
      include: include ?? DefaultDetailInclude,
      enableTracking,
      cancellationToken);

    decimal? currentUserScore = null;

    if (currentUserId.HasValue)
    {
      SquadRating? rating = await _squadRatingRepository.GetAsync(
        predicate: r => r.SquadId == id && r.UserId == currentUserId.Value,
        enableTracking: false,
        cancellationToken: cancellationToken);

      currentUserScore = rating?.Score;
    }

    SquadResponseDto response = _mapper.EntityToResponseDtoWithSlots(squad, currentUserScore);

    return new ReturnModel<SquadResponseDto>()
    {
      Success = true,
      Message = "Kadro başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<CursorPagedResponse<SquadPreviewDto>>> GetRecentSquadsAsync(
    int count,
    DateTime? lastDateCursor = null,
    Guid? lastIdCursor = null,
    Func<IQueryable<Squad>, IQueryable<Squad>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    List<Squad> squads = await _squadRepository.GetRecentSquadsAsync(
      count + 1,
      lastDateCursor,
      lastIdCursor,
      include: include ?? DefaultPreviewInclude,
      enableTracking,
      withDeleted,
      cancellationToken);

    bool hasNextPage = squads.Count > count;
    var itemsToReturn = hasNextPage ? squads.Take(count).ToList() : squads;

    List<SquadPreviewDto> response = _mapper.EntityToPreviewDtoList(itemsToReturn);

    var pagedResponse = new CursorPagedResponse<SquadPreviewDto>
    {
      Items = response,
      NextCursorDate = itemsToReturn.LastOrDefault()?.CreatedDate,
      NextCursorId = itemsToReturn.LastOrDefault()?.Id,
      HasNextPage = hasNextPage
    };

    return new ReturnModel<CursorPagedResponse<SquadPreviewDto>>()
    {
      Success = true,
      Message = "En son eklenen kadrolar başarılı bir şekilde getirildi.",
      Data = pagedResponse,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<List<SquadPreviewDto>>> GetTopRatedSquadsAsync(
    int count,
    Func<IQueryable<Squad>, IQueryable<Squad>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    List<Squad> squads = await _squadRepository.GetTopRatedSquadsAsync(
      count,
      include: include ?? DefaultPreviewInclude,
      enableTracking,
      withDeleted,
      cancellationToken);

    List<SquadPreviewDto> response = _mapper.EntityToPreviewDtoList(squads);

    return new ReturnModel<List<SquadPreviewDto>>()
    {
      Success = true,
      Message = "En yüksek puanlı kadrolar başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<List<SquadPreviewDto>>> GetByUserIdAsync(
    Guid userId,
    Func<IQueryable<Squad>, IQueryable<Squad>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    List<Squad> squads = await _squadRepository.GetAllAsync(
      filter: s => s.UserId == userId,
      include: include ?? DefaultPreviewInclude,
      orderBy: query => query.OrderByDescending(s => s.CreatedDate),
      enableTracking,
      withDeleted,
      cancellationToken);

    List<SquadPreviewDto> response = _mapper.EntityToPreviewDtoList(squads);

    return new ReturnModel<List<SquadPreviewDto>>()
    {
      Success = true,
      Message = "Kullanıcının kadroları başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<CreatedSquadResponseDto>> AddAsync(
    CreateSquadRequest request,
    Guid currentUserId,
    CancellationToken cancellationToken = default)
  {
    var validationResult = await _createValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    _businessRules.SlotsMustBeValid(request.Slots);
    await _businessRules.PlayersMustExistAndBeActiveAsync(request.Slots, cancellationToken);

    Squad squad = _mapper.CreateToEntity(request);
    squad.UserId = currentUserId;

    await _squadRepository.AddAsync(squad, cancellationToken);
    await AddSlotsAsync(squad.Id, request.Slots, cancellationToken);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    CreatedSquadResponseDto response = _mapper.EntityToCreatedResponseDto(squad);

    return new ReturnModel<CreatedSquadResponseDto>()
    {
      Success = true,
      Message = "Kadro başarılı bir şekilde oluşturuldu.",
      Data = response,
      StatusCode = 201
    };
  }

  public async Task<ReturnModel<NoData>> UpdateAsync(
    UpdateSquadRequest request,
    Guid currentUserId,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    var validationResult = await _updateValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    _businessRules.SlotsMustBeValid(request.Slots);
    await _businessRules.PlayersMustExistAndBeActiveAsync(request.Slots, cancellationToken);

    Squad squad = await _businessRules.GetSquadIfExistAsync(
      request.Id,
      include: query => query.Include(s => s.Slots),
      enableTracking: true,
      cancellationToken: cancellationToken);

    _businessRules.UserMustBeOwnerOrAdmin(squad.UserId, currentUserId, userRole);

    _mapper.UpdateEntityFromRequest(request, squad);
    await ReplaceSlotsAsync(squad, request.Slots, cancellationToken);

    _squadRepository.Update(squad);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Kadro başarılı bir şekilde güncellendi.",
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<NoData>> RemoveAsync(
    Guid id,
    Guid currentUserId,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    Squad squad = await _businessRules.GetSquadIfExistAsync(
      id,
      enableTracking: true,
      cancellationToken: cancellationToken);

    _businessRules.UserMustBeOwnerOrAdmin(squad.UserId, currentUserId, userRole);

    _squadRepository.Delete(squad);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Kadro başarılı bir şekilde silindi.",
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<SquadRatingResponseDto>> RateAsync(
    Guid squadId,
    RateSquadRequest request,
    Guid currentUserId,
    CancellationToken cancellationToken = default)
  {
    var validationResult = await _rateValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    _businessRules.ScoreMustBeValid(request.Score);

    Squad squad = await _businessRules.GetSquadIfExistAsync(
      squadId,
      enableTracking: true,
      cancellationToken: cancellationToken);

    _businessRules.UserCannotRateOwnSquad(squad.UserId, currentUserId);

    SquadRating? existingRating = await _squadRatingRepository.GetAsync(
      predicate: r => r.SquadId == squadId && r.UserId == currentUserId,
      enableTracking: true,
      cancellationToken: cancellationToken);

    if (existingRating == null)
    {
      await _squadRatingRepository.AddAsync(
        new SquadRating
        {
          SquadId = squadId,
          UserId = currentUserId,
          Score = request.Score
        },
        cancellationToken);
    }
    else
    {
      existingRating.Score = request.Score;
      _squadRatingRepository.Update(existingRating);
    }

    await _unitOfWork.SaveChangesAsync(cancellationToken);
    await RecalculateSquadRatingAsync(squad, cancellationToken);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<SquadRatingResponseDto>()
    {
      Success = true,
      Message = "Kadro puanı başarılı bir şekilde kaydedildi.",
      Data = new SquadRatingResponseDto(
        squad.Id,
        request.Score,
        squad.AverageRating,
        squad.RatingCount),
      StatusCode = 200
    };
  }

  private async Task AddSlotsAsync(
    Guid squadId,
    IReadOnlyList<SquadSlotRequest> slots,
    CancellationToken cancellationToken)
  {
    foreach (var slotRequest in slots.OrderBy(s => s.SortOrder).ThenBy(s => s.SlotKey))
    {
      await _squadSlotRepository.AddAsync(
        new SquadSlot
        {
          SquadId = squadId,
          SlotKey = slotRequest.SlotKey,
          SortOrder = slotRequest.SortOrder,
          PlayerId = slotRequest.PlayerId
        },
        cancellationToken);
    }
  }

  private async Task ReplaceSlotsAsync(
    Squad squad,
    IReadOnlyList<SquadSlotRequest> slots,
    CancellationToken cancellationToken)
  {
    if (squad.Slots.Count > 0)
    {
      _squadSlotRepository.DeleteRange(squad.Slots);
    }

    await AddSlotsAsync(squad.Id, slots, cancellationToken);
  }

  private async Task RecalculateSquadRatingAsync(
    Squad squad,
    CancellationToken cancellationToken)
  {
    List<decimal> scores = await _squadRatingRepository
      .Query(enableTracking: false)
      .Where(r => r.SquadId == squad.Id)
      .Select(r => r.Score)
      .ToListAsync(cancellationToken);

    squad.RatingCount = scores.Count;
    squad.AverageRating = scores.Count == 0
      ? 0m
      : Math.Round(scores.Average(), 2);

    _squadRepository.Update(squad);
  }
}
