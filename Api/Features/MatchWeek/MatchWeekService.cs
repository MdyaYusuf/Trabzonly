using Api.Core.Repositories;
using Api.Core.Responses;
using Api.Features.Seasons;
using FluentValidation;

namespace Api.Features.MatchWeek;

public class MatchWeekService(
  IMatchWeekRepository _matchWeekRepository,
  IMatchWeekSlotRepository _matchWeekSlotRepository,
  IMatchWeekPlayerRatingRepository _matchWeekPlayerRatingRepository,
  MatchWeekBusinessRules _businessRules,
  IUnitOfWork _unitOfWork,
  IValidator<SaveMatchWeekRequest> _saveValidator,
  IValidator<RateMatchWeekPlayerRequest> _rateValidator) : IMatchWeekService
{
  private sealed record PlayerRatingStats(
    decimal AverageRating,
    int RatingCount,
    decimal? CurrentUserScore);

  public async Task<ReturnModel<MatchWeekResponseDto>> GetCurrentAsync(
    Guid? currentUserId = null,
    CancellationToken cancellationToken = default)
  {
    Season season = await _businessRules.GetActiveSeasonIfExistAsync(cancellationToken);

    MatchWeek? matchWeek = await _businessRules.GetCurrentForSeasonAsync(
      season.Id,
      enableTracking: false,
      cancellationToken: cancellationToken);

    if (matchWeek == null)
    {
      return new ReturnModel<MatchWeekResponseDto>()
      {
        Success = true,
        Message = "Maç haftası başarılı bir şekilde getirildi.",
        Data = CreateEmptyShell(season.Id),
        StatusCode = 200
      };
    }

    Dictionary<int, PlayerRatingStats> ratingStats = await BuildRatingStatsAsync(
      matchWeek.Id,
      matchWeek.Slots.Select(s => s.PlayerId).ToHashSet(),
      currentUserId,
      cancellationToken);

    return new ReturnModel<MatchWeekResponseDto>()
    {
      Success = true,
      Message = "Maç haftası başarılı bir şekilde getirildi.",
      Data = MapToResponse(matchWeek, ratingStats),
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<MatchWeekResponseDto>> SaveAsync(
    SaveMatchWeekRequest request,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    return await UpsertAsync(
      request: request,
      userRole: userRole,
      alwaysClearRatings: false,
      cancellationToken: cancellationToken);
  }

  public async Task<ReturnModel<MatchWeekResponseDto>> StartNewWeekAsync(
    SaveMatchWeekRequest request,
    string userRole,
    CancellationToken cancellationToken = default)
  {
    return await UpsertAsync(
      request: request,
      userRole: userRole,
      alwaysClearRatings: true,
      cancellationToken: cancellationToken);
  }

  public async Task<ReturnModel<MatchWeekPlayerRatingResponseDto>> RatePlayerAsync(
    int playerId,
    RateMatchWeekPlayerRequest request,
    Guid currentUserId,
    CancellationToken cancellationToken = default)
  {
    var validationResult = await _rateValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    _businessRules.ScoreMustBeValid(request.Score);

    MatchWeek matchWeek = await _businessRules.GetCurrentBoardIfExistAsync(
      enableTracking: false,
      cancellationToken: cancellationToken);

    _businessRules.PlayerMustBeOnBoard(matchWeek, playerId);

    MatchWeekPlayerRating? existingRating = await _matchWeekPlayerRatingRepository.GetAsync(
      predicate: r =>
        r.MatchWeekId == matchWeek.Id &&
        r.PlayerId == playerId &&
        r.UserId == currentUserId,
      enableTracking: true,
      cancellationToken: cancellationToken);

    if (existingRating == null)
    {
      await _matchWeekPlayerRatingRepository.AddAsync(
        new MatchWeekPlayerRating
        {
          MatchWeekId = matchWeek.Id,
          PlayerId = playerId,
          UserId = currentUserId,
          Score = request.Score
        },
        cancellationToken);
    }
    else
    {
      existingRating.Score = request.Score;
      existingRating.UpdatedDate = DateTime.Now;
      _matchWeekPlayerRatingRepository.Update(existingRating);
    }

    await _unitOfWork.SaveChangesAsync(cancellationToken);

    PlayerRatingStats stats = await BuildPlayerRatingStatsAsync(
      matchWeek.Id,
      playerId,
      currentUserId: null,
      cancellationToken);

    return new ReturnModel<MatchWeekPlayerRatingResponseDto>()
    {
      Success = true,
      Message = "Oyuncu puanı başarılı bir şekilde kaydedildi.",
      Data = new MatchWeekPlayerRatingResponseDto(
        matchWeek.Id,
        playerId,
        request.Score,
        stats.AverageRating,
        stats.RatingCount),
      StatusCode = 200
    };
  }

  public async Task<ReturnModel<MatchWeekLeaderboardResponseDto>> GetLeaderboardAsync(
    CancellationToken cancellationToken = default)
  {
    Season season = await _businessRules.GetActiveSeasonIfExistAsync(cancellationToken);

    MatchWeek? matchWeek = await _businessRules.GetCurrentForSeasonAsync(
      season.Id,
      enableTracking: false,
      cancellationToken: cancellationToken);

    if (matchWeek == null)
    {
      return new ReturnModel<MatchWeekLeaderboardResponseDto>()
      {
        Success = true,
        Message = "Maç haftası sıralaması başarılı bir şekilde getirildi.",
        Data = new MatchWeekLeaderboardResponseDto(0, []),
        StatusCode = 200
      };
    }

    HashSet<int> boardPlayerIds = matchWeek.Slots.Select(s => s.PlayerId).ToHashSet();

    Dictionary<int, PlayerRatingStats> ratingStats = await BuildRatingStatsAsync(
      matchWeek.Id,
      boardPlayerIds,
      currentUserId: null,
      cancellationToken);

    Dictionary<int, MatchWeekSlot> slotsByPlayerId = matchWeek.Slots
      .GroupBy(s => s.PlayerId)
      .ToDictionary(g => g.Key, g => g.First());

    List<MatchWeekLeaderboardEntryDto> entries = boardPlayerIds
      .Where(playerId =>
        ratingStats.TryGetValue(playerId, out PlayerRatingStats? stats) &&
        stats.RatingCount > 0)
      .Select(playerId =>
      {
        PlayerRatingStats stats = ratingStats[playerId];
        MatchWeekSlot slot = slotsByPlayerId[playerId];

        return new
        {
          PlayerId = playerId,
          Slot = slot,
          Stats = stats
        };
      })
      .OrderByDescending(item => item.Stats.AverageRating)
      .ThenByDescending(item => item.Stats.RatingCount)
      .ThenBy(item => item.PlayerId)
      .Take(5)
      .Select((item, index) => new MatchWeekLeaderboardEntryDto(
        Rank: index + 1,
        PlayerId: item.PlayerId,
        PlayerName: item.Slot.Player.Name,
        PlayerImageUrl: item.Slot.Player.ImageUrl,
        ShirtNumber: item.Slot.Player.ShirtNumber,
        SlotKey: item.Slot.SlotKey,
        IsStarter: item.Slot.IsStarter,
        AverageRating: item.Stats.AverageRating,
        RatingCount: item.Stats.RatingCount))
      .ToList();

    return new ReturnModel<MatchWeekLeaderboardResponseDto>()
    {
      Success = true,
      Message = "Maç haftası sıralaması başarılı bir şekilde getirildi.",
      Data = new MatchWeekLeaderboardResponseDto(matchWeek.Id, entries),
      StatusCode = 200
    };
  }

  private async Task<ReturnModel<MatchWeekResponseDto>> UpsertAsync(
    SaveMatchWeekRequest request,
    string userRole,
    bool alwaysClearRatings,
    CancellationToken cancellationToken)
  {
    _businessRules.AdminRoleRequired(userRole);

    var validationResult = await _saveValidator.ValidateAsync(request, cancellationToken);

    if (!validationResult.IsValid)
    {
      throw new ValidationException(validationResult.Errors);
    }

    _businessRules.LineupMustBeValid(request.Formation, request.Slots);
    await _businessRules.PlayersMustExistAndBeActiveAsync(request.Slots, cancellationToken);

    Season season = await _businessRules.GetActiveSeasonIfExistAsync(cancellationToken);

    MatchWeek? matchWeek = await _businessRules.GetCurrentForSeasonAsync(
      season.Id,
      enableTracking: true,
      cancellationToken: cancellationToken);

    bool shouldClearRatings = alwaysClearRatings;

    if (matchWeek == null)
    {
      matchWeek = new MatchWeek
      {
        SeasonId = season.Id,
        Formation = request.Formation
      };

      await _matchWeekRepository.AddAsync(matchWeek, cancellationToken);
      await _unitOfWork.SaveChangesAsync(cancellationToken);

      await ReplaceSlotsAsync(matchWeek.Id, request.Slots, cancellationToken);
      await _unitOfWork.SaveChangesAsync(cancellationToken);
    }
    else
    {
      if (!alwaysClearRatings)
      {
        shouldClearRatings = MatchWeekBusinessRules.LineupSetChanged(
          matchWeek.Slots,
          request.Slots);
      }

      matchWeek.Formation = request.Formation;
      matchWeek.UpdatedDate = DateTime.Now;

      _matchWeekRepository.Update(matchWeek);

      if (shouldClearRatings)
      {
        await ClearRatingsAsync(matchWeek.Id, cancellationToken);
      }

      await ReplaceSlotsAsync(
        matchWeek.Id,
        request.Slots,
        existingSlots: matchWeek.Slots,
        cancellationToken);
      await _unitOfWork.SaveChangesAsync(cancellationToken);
    }

    MatchWeek refreshed = await _matchWeekRepository.GetByIdAsync(
      matchWeek.Id,
      include: MatchWeekBusinessRules.WithBoardInclude(),
      enableTracking: false,
      cancellationToken: cancellationToken)
      ?? throw new InvalidOperationException("Maç haftası kaydı yenilenemedi.");

    Dictionary<int, PlayerRatingStats> ratingStats = await BuildRatingStatsAsync(
      refreshed.Id,
      refreshed.Slots.Select(s => s.PlayerId).ToHashSet(),
      currentUserId: null,
      cancellationToken);

    string message = alwaysClearRatings
      ? "Yeni maç haftası başarılı bir şekilde kaydedildi. Oyuncu puanları sıfırlandı."
      : shouldClearRatings
        ? "Maç haftası başarılı bir şekilde kaydedildi. Kadro değiştiği için oyuncu puanları sıfırlandı."
        : "Maç haftası başarılı bir şekilde kaydedildi.";

    return new ReturnModel<MatchWeekResponseDto>()
    {
      Success = true,
      Message = message,
      Data = MapToResponse(refreshed, ratingStats),
      StatusCode = 200
    };
  }

  private async Task ClearRatingsAsync(int matchWeekId, CancellationToken cancellationToken)
  {
    List<MatchWeekPlayerRating> ratings = await _matchWeekPlayerRatingRepository.GetAllAsync(
      filter: r => r.MatchWeekId == matchWeekId,
      enableTracking: true,
      cancellationToken: cancellationToken);

    if (ratings.Count > 0)
    {
      _matchWeekPlayerRatingRepository.DeleteRange(ratings);
    }
  }

  private async Task ReplaceSlotsAsync(
    int matchWeekId,
    IReadOnlyList<MatchWeekSlotRequest> slots,
    CancellationToken cancellationToken)
  {
    await ReplaceSlotsAsync(
      matchWeekId,
      slots,
      existingSlots: null,
      cancellationToken);
  }

  private async Task ReplaceSlotsAsync(
    int matchWeekId,
    IReadOnlyList<MatchWeekSlotRequest> slots,
    ICollection<MatchWeekSlot>? existingSlots,
    CancellationToken cancellationToken)
  {
    List<MatchWeekSlot> currentSlots;

    if (existingSlots != null)
    {
      currentSlots = existingSlots.ToList();
    }
    else
    {
      currentSlots = await _matchWeekSlotRepository.GetAllAsync(
        filter: s => s.MatchWeekId == matchWeekId,
        enableTracking: true,
        cancellationToken: cancellationToken);
    }

    if (currentSlots.Count > 0)
    {
      _matchWeekSlotRepository.DeleteRange(currentSlots);
    }

    foreach (MatchWeekSlotRequest slotRequest in slots
      .OrderBy(s => s.SortOrder)
      .ThenBy(s => s.SlotKey, StringComparer.OrdinalIgnoreCase))
    {
      bool isStarter = !MatchWeekTactics.IsBenchSlotKey(slotRequest.SlotKey);

      await _matchWeekSlotRepository.AddAsync(
        new MatchWeekSlot
        {
          MatchWeekId = matchWeekId,
          PlayerId = slotRequest.PlayerId,
          SlotKey = slotRequest.SlotKey.ToUpperInvariant(),
          IsStarter = isStarter,
          SortOrder = slotRequest.SortOrder
        },
        cancellationToken);
    }
  }

  private async Task<Dictionary<int, PlayerRatingStats>> BuildRatingStatsAsync(
    int matchWeekId,
    HashSet<int> boardPlayerIds,
    Guid? currentUserId,
    CancellationToken cancellationToken)
  {
    Dictionary<int, PlayerRatingStats> result = boardPlayerIds.ToDictionary(
      playerId => playerId,
      _ => new PlayerRatingStats(0m, 0, null));

    if (boardPlayerIds.Count == 0)
    {
      return result;
    }

    List<MatchWeekPlayerRating> ratings = await _matchWeekPlayerRatingRepository.GetAllAsync(
      filter: r => r.MatchWeekId == matchWeekId && boardPlayerIds.Contains(r.PlayerId),
      enableTracking: false,
      cancellationToken: cancellationToken);

    foreach (IGrouping<int, MatchWeekPlayerRating> group in ratings.GroupBy(r => r.PlayerId))
    {
      List<decimal> scores = group.Select(r => r.Score).ToList();
      decimal average = Math.Round(scores.Average(), 1, MidpointRounding.AwayFromZero);
      decimal? currentUserScore = null;

      if (currentUserId.HasValue)
      {
        currentUserScore = group
          .FirstOrDefault(r => r.UserId == currentUserId.Value)
          ?.Score;
      }

      result[group.Key] = new PlayerRatingStats(average, scores.Count, currentUserScore);
    }

    return result;
  }

  private async Task<PlayerRatingStats> BuildPlayerRatingStatsAsync(
    int matchWeekId,
    int playerId,
    Guid? currentUserId,
    CancellationToken cancellationToken)
  {
    Dictionary<int, PlayerRatingStats> stats = await BuildRatingStatsAsync(
      matchWeekId,
      new HashSet<int> { playerId },
      currentUserId,
      cancellationToken);

    return stats[playerId];
  }

  private static MatchWeekResponseDto CreateEmptyShell(int seasonId)
  {
    return new MatchWeekResponseDto(
      Id: null,
      SeasonId: seasonId,
      Formation: MatchWeekTactics.DefaultFormation,
      Slots: [],
      UpdatedDate: null);
  }

  private static MatchWeekResponseDto MapToResponse(
    MatchWeek matchWeek,
    IReadOnlyDictionary<int, PlayerRatingStats> ratingStats)
  {
    List<MatchWeekSlotResponseDto> slots = matchWeek.Slots
      .OrderByDescending(s => s.IsStarter)
      .ThenBy(s => s.SortOrder)
      .ThenBy(s => s.SlotKey, StringComparer.OrdinalIgnoreCase)
      .Select(slot =>
      {
        ratingStats.TryGetValue(slot.PlayerId, out PlayerRatingStats? stats);
        stats ??= new PlayerRatingStats(0m, 0, null);

        return MapSlot(slot, stats);
      })
      .ToList();

    return new MatchWeekResponseDto(
      matchWeek.Id,
      matchWeek.SeasonId,
      matchWeek.Formation,
      slots,
      matchWeek.UpdatedDate);
  }

  private static MatchWeekSlotResponseDto MapSlot(
    MatchWeekSlot slot,
    PlayerRatingStats stats)
  {
    return new MatchWeekSlotResponseDto(
      slot.Id,
      slot.PlayerId,
      slot.Player.Name,
      slot.Player.ImageUrl,
      slot.Player.ShirtNumber,
      slot.SlotKey,
      slot.IsStarter,
      slot.SortOrder,
      stats.AverageRating,
      stats.RatingCount,
      stats.CurrentUserScore);
  }
}
