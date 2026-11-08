using Api.Core.Repositories;
using Api.Core.Responses;
using Api.Features.Seasons;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.MatchWeek;

public class MatchWeekService(
  IMatchWeekRepository _matchWeekRepository,
  IMatchWeekSlotRepository _matchWeekSlotRepository,
  IMatchWeekPlayerRatingRepository _matchWeekPlayerRatingRepository,
  MatchWeekBusinessRules _businessRules,
  IUnitOfWork _unitOfWork,
  IValidator<SaveMatchWeekRequest> _saveValidator) : IMatchWeekService
{
  public async Task<ReturnModel<MatchWeekResponseDto>> GetCurrentAsync(
    CancellationToken cancellationToken = default)
  {
    Season season = await _businessRules.GetActiveSeasonIfExistAsync(cancellationToken);

    MatchWeek? matchWeek = await _businessRules.GetCurrentForSeasonAsync(
      season.Id,
      enableTracking: false,
      cancellationToken: cancellationToken);

    MatchWeekResponseDto response = matchWeek == null
      ? CreateEmptyShell(season.Id)
      : MapToResponse(matchWeek);

    return new ReturnModel<MatchWeekResponseDto>()
    {
      Success = true,
      Message = "Maç haftası başarılı bir şekilde getirildi.",
      Data = response,
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
    await _businessRules.GetClubIfExistAsync(request.OpponentClubId, cancellationToken);

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
        Formation = request.Formation,
        OpponentClubId = request.OpponentClubId,
        IsHome = request.IsHome,
        HomeScore = request.HomeScore,
        AwayScore = request.AwayScore
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
      matchWeek.OpponentClubId = request.OpponentClubId;
      matchWeek.IsHome = request.IsHome;
      matchWeek.HomeScore = request.HomeScore;
      matchWeek.AwayScore = request.AwayScore;
      matchWeek.UpdatedDate = DateTime.Now;

      _matchWeekRepository.Update(matchWeek);

      if (shouldClearRatings)
      {
        await ClearRatingsAsync(matchWeek.Id, cancellationToken);
      }

      await ReplaceSlotsAsync(matchWeek.Id, request.Slots, existingSlots: matchWeek.Slots, cancellationToken);
      await _unitOfWork.SaveChangesAsync(cancellationToken);
    }

    MatchWeek refreshed = await _matchWeekRepository.GetByIdAsync(
      matchWeek.Id,
      include: MatchWeekBusinessRules.WithBoardInclude(),
      enableTracking: false,
      cancellationToken: cancellationToken)
      ?? throw new InvalidOperationException("Maç haftası kaydı yenilenemedi.");

    string message = alwaysClearRatings
      ? "Yeni maç haftası başarılı bir şekilde kaydedildi. Oyuncu puanları sıfırlandı."
      : shouldClearRatings
        ? "Maç haftası başarılı bir şekilde kaydedildi. Kadro değiştiği için oyuncu puanları sıfırlandı."
        : "Maç haftası başarılı bir şekilde kaydedildi.";

    return new ReturnModel<MatchWeekResponseDto>()
    {
      Success = true,
      Message = message,
      Data = MapToResponse(refreshed),
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

  private static MatchWeekResponseDto CreateEmptyShell(int seasonId)
  {
    return new MatchWeekResponseDto(
      Id: null,
      SeasonId: seasonId,
      Formation: MatchWeekTactics.DefaultFormation,
      OpponentClub: null,
      IsHome: true,
      HomeScore: null,
      AwayScore: null,
      Slots: [],
      UpdatedDate: null);
  }

  private static MatchWeekResponseDto MapToResponse(MatchWeek matchWeek)
  {
    List<MatchWeekSlotResponseDto> slots = matchWeek.Slots
      .OrderByDescending(s => s.IsStarter)
      .ThenBy(s => s.SortOrder)
      .ThenBy(s => s.SlotKey, StringComparer.OrdinalIgnoreCase)
      .Select(MapSlot)
      .ToList();

    return new MatchWeekResponseDto(
      matchWeek.Id,
      matchWeek.SeasonId,
      matchWeek.Formation,
      matchWeek.OpponentClub == null
        ? null
        : new MatchWeekClubDto(
          matchWeek.OpponentClub.Id,
          matchWeek.OpponentClub.Name,
          matchWeek.OpponentClub.ShortName,
          matchWeek.OpponentClub.IsTrabzonspor),
      matchWeek.IsHome,
      matchWeek.HomeScore,
      matchWeek.AwayScore,
      slots,
      matchWeek.UpdatedDate);
  }

  private static MatchWeekSlotResponseDto MapSlot(MatchWeekSlot slot)
  {
    return new MatchWeekSlotResponseDto(
      slot.Id,
      slot.PlayerId,
      slot.Player.Name,
      slot.Player.ImageUrl,
      slot.Player.ShirtNumber,
      slot.SlotKey,
      slot.IsStarter,
      slot.SortOrder);
  }
}
