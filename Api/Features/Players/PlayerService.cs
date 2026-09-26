using System.Linq.Expressions;
using Api.Core.Helpers;
using Api.Core.Repositories;
using Api.Core.Responses;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Players;

public class PlayerService(
  IPlayerRepository _playerRepository,
  IPlayerRatingRepository _playerRatingRepository,
  PlayerMapper _mapper,
  PlayerBusinessRules _businessRules,
  IUnitOfWork _unitOfWork,
  IValidator<CreatePlayerRequest> _createValidator,
  IValidator<UpdatePlayerRequest> _updateValidator,
  IValidator<RatePlayerRequest> _rateValidator) : IPlayerService
{
  public async Task<ReturnModel<PagedResponse<PlayerResponseDto>>> GetAllAsync(
    Expression<Func<Player, bool>>? filter = null,
    Func<IQueryable<Player>, IQueryable<Player>>? include = null,
    Func<IQueryable<Player>, IOrderedQueryable<Player>>? orderBy = null,
    int pageNumber = 1,
    int pageSize = 10,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    var (players, totalCount) = await _playerRepository.GetPagedListAsync(
      pageNumber,
      pageSize,
      filter,
      include: include ?? (query => query.Include(p => p.Position)),
      orderBy: orderBy ?? (query => query.OrderBy(p => p.Name)),
      enableTracking,
      withDeleted,
      cancellationToken);

    List<PlayerResponseDto> responseDtos = _mapper.EntityToResponseDtoList(players);
    var pagedResponse = new PagedResponse<PlayerResponseDto>(responseDtos, totalCount, pageNumber, pageSize);

    return new ReturnModel<PagedResponse<PlayerResponseDto>>()
    {
      Success = true,
      Message = "Oyuncu listesi başarılı bir şekilde getirildi.",
      Data = pagedResponse,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<PlayerResponseDto>> GetByIdAsync(
    Guid id,
    Guid? currentUserId = null,
    Func<IQueryable<Player>, IQueryable<Player>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    Player player = await _businessRules.GetPlayerIfExistAsync(
      id,
      include: include ?? (query => query.Include(p => p.Position)),
      enableTracking,
      cancellationToken);

    decimal? currentUserScore = null;

    if (currentUserId.HasValue)
    {
      PlayerRating? rating = await _playerRatingRepository.GetAsync(
        predicate: r => r.PlayerId == id && r.UserId == currentUserId.Value,
        enableTracking: false,
        cancellationToken: cancellationToken);

      currentUserScore = rating?.Score;
    }

    PlayerResponseDto mapped = _mapper.EntityToResponseDto(player);
    PlayerResponseDto response = mapped with { CurrentUserScore = currentUserScore };

    return new ReturnModel<PlayerResponseDto>()
    {
      Success = true,
      Message = "Oyuncu başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<CursorPagedResponse<PlayerResponseDto>>> GetTopValuedPlayersAsync(
    int count,
    decimal? lastValueCursor = null,
    Guid? lastIdCursor = null,
    Func<IQueryable<Player>, IQueryable<Player>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    List<Player> players = await _playerRepository.GetTopValuedPlayersAsync(
      count + 1,
      lastValueCursor,
      lastIdCursor,
      include: include ?? (query => query.Include(p => p.Position)),
      enableTracking,
      withDeleted,
      cancellationToken);

    bool hasNextPage = players.Count > count;
    var itemsToReturn = hasNextPage ? players.Take(count).ToList() : players;

    List<PlayerResponseDto> response = _mapper.EntityToResponseDtoList(itemsToReturn);

    var pagedResponse = new CursorPagedResponse<PlayerResponseDto>
    {
      Items = response,
      NextCursorValue = itemsToReturn.LastOrDefault()?.MarketValue,
      NextCursorId = itemsToReturn.LastOrDefault()?.Id,
      HasNextPage = hasNextPage
    };

    return new ReturnModel<CursorPagedResponse<PlayerResponseDto>>()
    {
      Success = true,
      Message = "En değerli oyuncular başarılı bir şekilde getirildi.",
      Data = pagedResponse,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<List<PlayerResponseDto>>> GetMostCommentedPlayersAsync(
    int count,
    Func<IQueryable<Player>, IQueryable<Player>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    List<Player> players = await _playerRepository.GetMostCommentedPlayersAsync(
      count,
      include: include ?? (query => query.Include(p => p.Position)),
      enableTracking,
      withDeleted,
      cancellationToken);

    List<PlayerResponseDto> response = _mapper.EntityToResponseDtoList(players);

    return new ReturnModel<List<PlayerResponseDto>>()
    {
      Success = true,
      Message = "En çok konuşulan oyuncular başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<List<PlayerResponseDto>>> GetTopRatedPlayersAsync(
    int count,
    Func<IQueryable<Player>, IQueryable<Player>>? include = null,
    bool enableTracking = false,
    bool withDeleted = false,
    CancellationToken cancellationToken = default)
  {
    List<Player> players = await _playerRepository.GetTopRatedPlayersAsync(
      count,
      include: include ?? (query => query.Include(p => p.Position)),
      enableTracking,
      withDeleted,
      cancellationToken);

    List<PlayerResponseDto> response = _mapper.EntityToResponseDtoList(players);

    return new ReturnModel<List<PlayerResponseDto>>()
    {
      Success = true,
      Message = "En yüksek taraftar puanlı oyuncular başarılı bir şekilde getirildi.",
      Data = response,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<CreatedPlayerResponseDto>> AddAsync(
    CreatePlayerRequest request,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    _businessRules.AdminRoleRequired(userRole);

    var validationResult = await _createValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    await _businessRules.PlayerCannotBeDuplicatedAsync(request.Name, request.DateOfBirth, cancellationToken);

    Player player = _mapper.CreateToEntity(request);

    if (request.ImageFile != null)
    {
      player.ImageUrl = await FileHelper.SaveImageToDisk(request.ImageFile, "players", request.Name, cancellationToken);
    }

    await _playerRepository.AddAsync(player, cancellationToken);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    CreatedPlayerResponseDto response = _mapper.EntityToCreatedResponseDto(player);

    return new ReturnModel<CreatedPlayerResponseDto>()
    {
      Success = true,
      Message = "Oyuncu başarılı bir şekilde eklendi.",
      Data = response,
      StatusCode = 201
    };
  }

  public async Task<ReturnModel<NoData>> UpdateAsync(
    UpdatePlayerRequest request,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    _businessRules.AdminRoleRequired(userRole);

    var validationResult = await _updateValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    await _businessRules.PlayerCannotBeDuplicatedWhenUpdatedAsync(request.Id, request.Name, request.DateOfBirth, cancellationToken);

    Player player = await _businessRules.GetPlayerIfExistAsync(request.Id, enableTracking: true, cancellationToken: cancellationToken);

    player.ImageUrl = await FileHelper.ReplaceImageOnDisk(
      request.ImageFile, player.ImageUrl, "players", request.Name, cancellationToken);

    _mapper.UpdateEntityFromRequest(request, player);

    _playerRepository.Update(player);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Oyuncu başarılı bir şekilde güncellendi.",
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<NoData>> RemoveAsync(
    Guid id,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    _businessRules.AdminRoleRequired(userRole);

    Player player = await _businessRules.GetPlayerIfExistAsync(id, enableTracking: true, cancellationToken: cancellationToken);

    FileHelper.DeleteImageFromDisk(player.ImageUrl);

    _playerRepository.Delete(player);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<NoData>()
    {
      Success = true,
      Message = "Oyuncu başarılı bir şekilde silindi.",
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<PlayerRatingResponseDto>> RateAsync(
    Guid playerId,
    RatePlayerRequest request,
    Guid currentUserId,
    CancellationToken cancellationToken = default)
  {
    var validationResult = await _rateValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    _businessRules.ScoreMustBeValid(request.Score);

    Player player = await _businessRules.GetPlayerIfExistAsync(
      playerId,
      enableTracking: true,
      cancellationToken: cancellationToken);

    PlayerRating? existingRating = await _playerRatingRepository.GetAsync(
      predicate: r => r.PlayerId == playerId && r.UserId == currentUserId,
      enableTracking: true,
      cancellationToken: cancellationToken);

    if (existingRating == null)
    {
      await _playerRatingRepository.AddAsync(
        new PlayerRating
        {
          PlayerId = playerId,
          UserId = currentUserId,
          Score = request.Score
        },
        cancellationToken);
    }
    else
    {
      existingRating.Score = request.Score;
      _playerRatingRepository.Update(existingRating);
    }

    await _unitOfWork.SaveChangesAsync(cancellationToken);
    await RecalculatePlayerRatingAsync(player, cancellationToken);
    await _unitOfWork.SaveChangesAsync(cancellationToken);

    return new ReturnModel<PlayerRatingResponseDto>()
    {
      Success = true,
      Message = "Taraftar puanı başarılı bir şekilde kaydedildi.",
      Data = new PlayerRatingResponseDto(
        player.Id,
        request.Score,
        player.AverageRating,
        player.RatingCount),
      StatusCode = 200
    };
  }

  private async Task RecalculatePlayerRatingAsync(
    Player player,
    CancellationToken cancellationToken)
  {
    List<decimal> scores = await _playerRatingRepository
      .Query(enableTracking: false)
      .Where(r => r.PlayerId == player.Id)
      .Select(r => r.Score)
      .ToListAsync(cancellationToken);

    player.RatingCount = scores.Count;
    player.AverageRating = scores.Count == 0
      ? 0m
      : Math.Round(scores.Average(), 2);

    _playerRepository.Update(player);
  }
}
