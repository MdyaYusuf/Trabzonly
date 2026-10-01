using System.Linq.Expressions;
using Api.Core.Helpers;
using Api.Core.Repositories;
using Api.Core.Responses;
using Api.Features.Seasons;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Players;

public class PlayerService(
  IPlayerRepository _playerRepository,
  IPlayerRatingRepository _playerRatingRepository,
  ISeasonRepository _seasonRepository,
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
    Func<IQueryable<Player>, IQueryable<Player>> resolvedInclude = include
      ?? BuildDefaultInclude(await ResolveCurrentSeasonIdAsync(cancellationToken));

    var (players, totalCount) = await _playerRepository.GetPagedListAsync(
      pageNumber,
      pageSize,
      filter,
      include: resolvedInclude,
      orderBy: orderBy ?? (query => query.OrderBy(p => p.Name)),
      enableTracking,
      withDeleted,
      cancellationToken);

    List<PlayerResponseDto> responseDtos = await MapPlayersAsync(players, cancellationToken);
    var pagedResponse = new PagedResponse<PlayerResponseDto>(responseDtos, totalCount, pageNumber, pageSize);

    return new ReturnModel<PagedResponse<PlayerResponseDto>>()
    {
      Success = true,
      Message = "Oyuncu listesi başarılı bir şekilde getirildi.",
      Data = pagedResponse,
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<PagedResponse<PlayerResponseDto>>> GetRosterAsync(
    PlayerListQueryRequest query,
    CancellationToken cancellationToken = default)
  {
    int pageNumber = query.PageNumber < 1 ? 1 : query.PageNumber;
    int pageSize = query.PageSize < 1 ? 12 : Math.Min(query.PageSize, 50);
    Guid? currentSeasonId = await ResolveCurrentSeasonIdAsync(cancellationToken);

    return await GetAllAsync(
      filter: BuildListFilter(query),
      include: BuildDefaultInclude(currentSeasonId),
      orderBy: BuildListOrderBy(query.Sort, currentSeasonId),
      pageNumber: pageNumber,
      pageSize: pageSize,
      cancellationToken: cancellationToken);
  }

  public async Task<ReturnModel<PlayerRosterOverviewDto>> GetRosterOverviewAsync(
    CancellationToken cancellationToken = default)
  {
    Guid? currentSeasonId = await ResolveCurrentSeasonIdAsync(cancellationToken);
    PlayerRosterOverviewDto overview = await _playerRepository.GetRosterOverviewAsync(
      currentSeasonId,
      cancellationToken);

    return new ReturnModel<PlayerRosterOverviewDto>()
    {
      Success = true,
      Message = "Kadro özeti başarılı bir şekilde getirildi.",
      Data = overview,
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
    Guid? currentSeasonId = await ResolveCurrentSeasonIdAsync(cancellationToken);

    Player player = await _businessRules.GetPlayerIfExistAsync(
      id,
      include: include ?? BuildDefaultInclude(currentSeasonId),
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

    PlayerResponseDto response = (await MapPlayersAsync([player], cancellationToken))[0]
      with
    { CurrentUserScore = currentUserScore };

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
    Guid? currentSeasonId = await ResolveCurrentSeasonIdAsync(cancellationToken);

    List<Player> players = await _playerRepository.GetTopValuedPlayersAsync(
      count + 1,
      lastValueCursor,
      lastIdCursor,
      include: include ?? BuildDefaultInclude(currentSeasonId),
      enableTracking,
      withDeleted,
      cancellationToken);

    bool hasNextPage = players.Count > count;
    var itemsToReturn = hasNextPage ? players.Take(count).ToList() : players;

    List<PlayerResponseDto> response = await MapPlayersAsync(itemsToReturn, cancellationToken);

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
    Guid? currentSeasonId = await ResolveCurrentSeasonIdAsync(cancellationToken);

    List<Player> players = await _playerRepository.GetMostCommentedPlayersAsync(
      count,
      include: include ?? BuildDefaultInclude(currentSeasonId),
      enableTracking,
      withDeleted,
      cancellationToken);

    List<PlayerResponseDto> response = await MapPlayersAsync(players, cancellationToken);

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
    Guid? currentSeasonId = await ResolveCurrentSeasonIdAsync(cancellationToken);

    List<Player> players = await _playerRepository.GetTopRatedPlayersAsync(
      count,
      include: include ?? BuildDefaultInclude(currentSeasonId),
      enableTracking,
      withDeleted,
      cancellationToken);

    List<PlayerResponseDto> response = await MapPlayersAsync(players, cancellationToken);

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

  private async Task<Guid?> ResolveCurrentSeasonIdAsync(CancellationToken cancellationToken)
  {
    DateTime now = DateTime.UtcNow;

    Season? current = await _seasonRepository.GetAsync(
      predicate: s => s.StartDate <= now && s.EndDate >= now,
      enableTracking: false,
      cancellationToken: cancellationToken);

    if (current != null)
    {
      return current.Id;
    }

    List<Season> seasons = await _seasonRepository.GetAllAsync(
      orderBy: query => query.OrderByDescending(s => s.EndDate),
      enableTracking: false,
      cancellationToken: cancellationToken);

    return seasons.FirstOrDefault()?.Id;
  }

  private static Func<IQueryable<Player>, IQueryable<Player>> BuildDefaultInclude(Guid? currentSeasonId)
  {
    if (currentSeasonId.HasValue)
    {
      Guid seasonId = currentSeasonId.Value;

      return query => query
        .Include(p => p.Position)
        .Include(p => p.Stats.Where(s => s.SeasonId == seasonId));
    }

    return query => query.Include(p => p.Position);
  }

  private static Expression<Func<Player, bool>> BuildListFilter(PlayerListQueryRequest query)
  {
    string? search = query.Search?.Trim();
    string[]? abbreviations = PlayerPositionGroups.GetAbbreviations(query.PositionGroup);
    bool? isDomestic = query.IsDomestic;

    return player =>
      player.IsActive &&
      (string.IsNullOrEmpty(search) ||
        player.Name.Contains(search) ||
        (player.ShirtNumber.HasValue && player.ShirtNumber.Value.ToString().Contains(search))) &&
      (abbreviations == null || abbreviations.Contains(player.Position.Abbreviation)) &&
      (!isDomestic.HasValue || player.IsDomestic == isDomestic.Value);
  }

  private static Func<IQueryable<Player>, IOrderedQueryable<Player>> BuildListOrderBy(
    string? sort,
    Guid? currentSeasonId)
  {
    string normalized = sort?.Trim().ToLowerInvariant() ?? PlayerSortOptions.ValueDesc;

    return normalized switch
    {
      PlayerSortOptions.RatingDesc => query => query
        .OrderByDescending(p => p.AverageRating)
        .ThenByDescending(p => p.RatingCount)
        .ThenBy(p => p.Name),
      PlayerSortOptions.NumberAsc => query => query
        .OrderBy(p => p.ShirtNumber == null)
        .ThenBy(p => p.ShirtNumber)
        .ThenBy(p => p.Name),
      PlayerSortOptions.AppsDesc when currentSeasonId.HasValue => query => query
        .OrderByDescending(p => p.Stats
          .Where(s => s.SeasonId == currentSeasonId.Value)
          .Select(s => (int?)s.Appearances)
          .FirstOrDefault() ?? 0)
        .ThenBy(p => p.Name),
      PlayerSortOptions.AppsDesc => query => query.OrderBy(p => p.Name),
      _ => query => query
        .OrderByDescending(p => p.MarketValue ?? 0m)
        .ThenBy(p => p.Name)
    };
  }

  private async Task<List<PlayerResponseDto>> MapPlayersAsync(
    List<Player> players,
    CancellationToken cancellationToken)
  {
    if (players.Count == 0)
    {
      return [];
    }

    List<Guid> playerIds = players.Select(p => p.Id).ToList();

    Dictionary<Guid, int> commentCounts = await _playerRepository
      .Query(enableTracking: false)
      .Where(p => playerIds.Contains(p.Id))
      .Select(p => new { p.Id, Count = p.Comments.Count })
      .ToDictionaryAsync(x => x.Id, x => x.Count, cancellationToken);

    return players.Select(player =>
    {
      PlayerResponseDto mapped = _mapper.EntityToResponseDto(player);
      PlayerSeasonStatsDto? seasonStats = null;
      var stats = player.Stats.FirstOrDefault();

      if (stats != null)
      {
        seasonStats = new PlayerSeasonStatsDto(
          stats.Appearances,
          stats.MinutesPlayed,
          stats.Goals,
          stats.Assists,
          stats.CleanSheets);
      }

      return mapped with
      {
        CommentCount = commentCounts.GetValueOrDefault(player.Id),
        CurrentSeasonStats = seasonStats,
        PositionAbbreviation = player.Position?.Abbreviation ?? mapped.PositionAbbreviation
      };
    }).ToList();
  }
}
