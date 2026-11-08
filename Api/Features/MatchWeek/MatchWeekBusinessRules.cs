using Api.Core.Exceptions;
using Api.Features.Players;
using Api.Features.Seasons;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.MatchWeek;

public class MatchWeekBusinessRules(
  IMatchWeekRepository _matchWeekRepository,
  IClubRepository _clubRepository,
  IPlayerRepository _playerRepository,
  ISeasonRepository _seasonRepository)
{
  public async Task<Season> GetActiveSeasonIfExistAsync(CancellationToken cancellationToken = default)
  {
    Season? season = await _seasonRepository.GetAsync(
      predicate: s => s.IsActive,
      enableTracking: false,
      cancellationToken: cancellationToken);

    if (season == null)
    {
      throw new NotFoundException("Aktif sezon bulunamadı.");
    }

    return season;
  }

  public async Task<MatchWeek?> GetCurrentForSeasonAsync(
    int seasonId,
    bool enableTracking,
    CancellationToken cancellationToken = default)
  {
    return await _matchWeekRepository.GetAsync(
      predicate: mw => mw.SeasonId == seasonId,
      include: WithBoardInclude(),
      enableTracking: enableTracking,
      cancellationToken: cancellationToken);
  }

  public async Task<Club> GetClubIfExistAsync(
    int clubId,
    CancellationToken cancellationToken = default)
  {
    Club? club = await _clubRepository.GetByIdAsync(
      clubId,
      enableTracking: false,
      cancellationToken: cancellationToken);

    if (club == null)
    {
      throw new NotFoundException($"{clubId} numaralı kulüp bulunamadı.");
    }

    return club;
  }

  public void AdminRoleRequired(string userRole)
  {
    if (userRole != "Admin")
    {
      throw new ForbiddenException("Bu işlem için yetkiniz bulunmamaktadır.");
    }
  }

  public void LineupMustBeValid(
    string formation,
    IReadOnlyList<MatchWeekSlotRequest> slots)
  {
    if (!MatchWeekTactics.TryGetStarterSlotKeys(formation, out string[] expectedStarterKeys))
    {
      throw new BusinessException("Geçersiz diziliş.");
    }

    if (slots.Count < MatchWeekTactics.StarterSlotCount ||
        slots.Count > MatchWeekTactics.StarterSlotCount + MatchWeekTactics.MaxBenchSlotCount)
    {
      throw new BusinessException(
        $"Kadro {MatchWeekTactics.StarterSlotCount} ilk 11 ve en fazla {MatchWeekTactics.MaxBenchSlotCount} yedekten oluşmalıdır.");
    }

    bool hasDuplicateSlotKeys = slots
      .GroupBy(s => s.SlotKey, StringComparer.OrdinalIgnoreCase)
      .Any(g => g.Count() > 1);

    if (hasDuplicateSlotKeys)
    {
      throw new BusinessException("Aynı slot anahtarı birden fazla kullanılamaz.");
    }

    bool hasDuplicatePlayers = slots
      .GroupBy(s => s.PlayerId)
      .Any(g => g.Count() > 1);

    if (hasDuplicatePlayers)
    {
      throw new BusinessException("Aynı oyuncu kadroda birden fazla kez yer alamaz.");
    }

    List<MatchWeekSlotRequest> starterSlots = slots
      .Where(s => !MatchWeekTactics.IsBenchSlotKey(s.SlotKey))
      .ToList();

    List<MatchWeekSlotRequest> benchSlots = slots
      .Where(s => MatchWeekTactics.IsBenchSlotKey(s.SlotKey))
      .ToList();

    if (starterSlots.Count != MatchWeekTactics.StarterSlotCount)
    {
      throw new BusinessException("İlk 11 tam olarak 11 oyuncudan oluşmalıdır.");
    }

    if (benchSlots.Count > MatchWeekTactics.MaxBenchSlotCount)
    {
      throw new BusinessException(
        $"Yedek kulübesi en fazla {MatchWeekTactics.MaxBenchSlotCount} oyuncudan oluşmalıdır.");
    }

    HashSet<string> starterKeys = starterSlots
      .Select(s => s.SlotKey.ToUpperInvariant())
      .ToHashSet(StringComparer.OrdinalIgnoreCase);

    HashSet<string> expectedKeys = expectedStarterKeys
      .Select(key => key.ToUpperInvariant())
      .ToHashSet(StringComparer.OrdinalIgnoreCase);

    if (!starterKeys.SetEquals(expectedKeys))
    {
      throw new BusinessException("İlk 11 slot anahtarları seçilen dizilişle uyuşmuyor.");
    }

    HashSet<string> allowedBenchKeys = MatchWeekTactics.AllowedBenchSlotKeys
      .Select(key => key.ToUpperInvariant())
      .ToHashSet(StringComparer.OrdinalIgnoreCase);

    foreach (MatchWeekSlotRequest benchSlot in benchSlots)
    {
      if (!allowedBenchKeys.Contains(benchSlot.SlotKey.ToUpperInvariant()))
      {
        throw new BusinessException("Yedek slot anahtarları BENCH_1 ile BENCH_6 arasında olmalıdır.");
      }
    }

    HashSet<string> expectedBenchPrefix = Enumerable
      .Range(1, benchSlots.Count)
      .Select(index => $"BENCH_{index}")
      .ToHashSet(StringComparer.OrdinalIgnoreCase);

    HashSet<string> actualBenchKeys = benchSlots
      .Select(s => s.SlotKey.ToUpperInvariant())
      .ToHashSet(StringComparer.OrdinalIgnoreCase);

    if (!actualBenchKeys.SetEquals(expectedBenchPrefix))
    {
      throw new BusinessException(
        "Yedek slotları BENCH_1'den başlayarak ardışık kullanılmalıdır.");
    }
  }

  public async Task PlayersMustExistAndBeActiveAsync(
    IReadOnlyList<MatchWeekSlotRequest> slots,
    CancellationToken cancellationToken = default)
  {
    foreach (MatchWeekSlotRequest slot in slots)
    {
      Player? player = await _playerRepository.GetByIdAsync(
        slot.PlayerId,
        enableTracking: false,
        cancellationToken: cancellationToken);

      if (player == null)
      {
        throw new NotFoundException($"{slot.PlayerId} numaralı oyuncu bulunamadı.");
      }

      if (!player.IsActive)
      {
        throw new BusinessException($"{player.Name} aktif olmadığı için kadroya eklenemez.");
      }
    }
  }

  public static bool LineupSetChanged(
    IEnumerable<MatchWeekSlot> existingSlots,
    IReadOnlyList<MatchWeekSlotRequest> requestedSlots)
  {
    HashSet<(int PlayerId, string SlotKey)> existing = existingSlots
      .Select(s => (s.PlayerId, s.SlotKey.ToUpperInvariant()))
      .ToHashSet();

    HashSet<(int PlayerId, string SlotKey)> requested = requestedSlots
      .Select(s => (s.PlayerId, s.SlotKey.ToUpperInvariant()))
      .ToHashSet();

    return !existing.SetEquals(requested);
  }

  public static Func<IQueryable<MatchWeek>, IQueryable<MatchWeek>> WithBoardInclude()
  {
    return query => query
      .Include(mw => mw.OpponentClub)
      .Include(mw => mw.Slots)
        .ThenInclude(s => s.Player);
  }
}
