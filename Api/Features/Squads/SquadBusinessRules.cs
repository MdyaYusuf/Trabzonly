using Api.Core.Exceptions;
using Api.Features.Players;

namespace Api.Features.Squads;

public class SquadBusinessRules(
  ISquadRepository _squadRepository,
  IPlayerRepository _playerRepository)
{
  public async Task<Squad> GetSquadIfExistAsync(
    Guid id,
    Func<IQueryable<Squad>, IQueryable<Squad>>? include = null,
    bool enableTracking = false,
    CancellationToken cancellationToken = default)
  {
    var squad = await _squadRepository.GetByIdAsync(id, include, enableTracking, cancellationToken);

    if (squad == null)
    {
      throw new NotFoundException($"{id} numaralı kadro bulunamadı.");
    }

    return squad;
  }

  public void UserMustBeOwnerOrAdmin(
    Guid squadUserId,
    Guid currentUserId,
    string userRole)
  {
    if (squadUserId != currentUserId && userRole != "Admin")
    {
      throw new ForbiddenException("Bu işlem için yetkiniz bulunmamaktadır.");
    }
  }

  public void SlotsMustBeValid(string formation, IReadOnlyList<SquadSlotRequest> slots)
  {
    if (slots.Count != SquadTactics.TotalSlotCount)
    {
      throw new BusinessException(
        $"Kadro tam olarak {SquadTactics.TotalSlotCount} oyuncudan oluşmalıdır (11 ilk 11 + 10 yedek).");
    }

    if (!SquadTactics.FormationStarterSlotKeys.TryGetValue(formation, out string[]? expectedStarterKeys))
    {
      throw new BusinessException("Geçersiz diziliş.");
    }

    bool hasDuplicateSlotKeys = slots
      .GroupBy(s => s.SlotKey, StringComparer.OrdinalIgnoreCase)
      .Any(g => g.Count() > 1);

    if (hasDuplicateSlotKeys)
    {
      throw new BusinessException("Kadro içinde aynı mevki anahtarı birden fazla kullanılamaz.");
    }

    bool hasDuplicatePlayers = slots
      .GroupBy(s => s.PlayerId)
      .Any(g => g.Count() > 1);

    if (hasDuplicatePlayers)
    {
      throw new BusinessException("Aynı oyuncu kadroda birden fazla kez yer alamaz.");
    }

    List<SquadSlotRequest> starterSlots = slots
      .Where(s => !SquadTactics.IsBenchSlotKey(s.SlotKey))
      .ToList();

    List<SquadSlotRequest> benchSlots = slots
      .Where(s => SquadTactics.IsBenchSlotKey(s.SlotKey))
      .ToList();

    if (starterSlots.Count != SquadTactics.StarterSlotCount)
    {
      throw new BusinessException("İlk 11 tam olarak 11 oyuncudan oluşmalıdır.");
    }

    if (benchSlots.Count != SquadTactics.BenchSlotCount)
    {
      throw new BusinessException("Yedek kulübesi tam olarak 10 oyuncudan oluşmalıdır.");
    }

    HashSet<string> starterKeys = starterSlots
      .Select(s => s.SlotKey.ToUpperInvariant())
      .ToHashSet(StringComparer.OrdinalIgnoreCase);

    HashSet<string> expectedKeys = expectedStarterKeys
      .Select(key => key.ToUpperInvariant())
      .ToHashSet(StringComparer.OrdinalIgnoreCase);

    if (!starterKeys.SetEquals(expectedKeys))
    {
      throw new BusinessException("İlk 11 mevki anahtarları seçilen dizilişle uyuşmuyor.");
    }

    HashSet<string> benchKeys = benchSlots
      .Select(s => s.SlotKey.ToUpperInvariant())
      .ToHashSet(StringComparer.OrdinalIgnoreCase);

    HashSet<string> expectedBenchKeys = SquadTactics.BenchSlotKeys
      .Select(key => key.ToUpperInvariant())
      .ToHashSet(StringComparer.OrdinalIgnoreCase);

    if (!benchKeys.SetEquals(expectedBenchKeys))
    {
      throw new BusinessException("Yedek kulübesi mevki anahtarları BENCH_1 ile BENCH_10 arasında olmalıdır.");
    }
  }

  public void SetPiecePlayersMustBeStarters(
    IReadOnlyList<SquadSlotRequest> slots,
    int captainPlayerId,
    int cornerTakerPlayerId,
    int freeKickTakerPlayerId)
  {
    HashSet<int> starterPlayerIds = slots
      .Where(s => !SquadTactics.IsBenchSlotKey(s.SlotKey))
      .Select(s => s.PlayerId)
      .ToHashSet();

    if (!starterPlayerIds.Contains(captainPlayerId))
    {
      throw new BusinessException("Kaptan ilk 11 içinden seçilmelidir.");
    }

    if (!starterPlayerIds.Contains(cornerTakerPlayerId))
    {
      throw new BusinessException("Korner sorumlusu ilk 11 içinden seçilmelidir.");
    }

    if (!starterPlayerIds.Contains(freeKickTakerPlayerId))
    {
      throw new BusinessException("Serbest vuruş sorumlusu ilk 11 içinden seçilmelidir.");
    }
  }

  public async Task PlayersMustExistAndBeActiveAsync(
    IReadOnlyList<SquadSlotRequest> slots,
    CancellationToken cancellationToken = default)
  {
    foreach (var slot in slots)
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
        throw new BusinessException($"'{player.Name}' aktif olmadığı için kadroya eklenemez.");
      }
    }
  }

  public void UserCannotRateOwnSquad(Guid squadUserId, Guid currentUserId)
  {
    if (squadUserId == currentUserId)
    {
      throw new BusinessException("Kendi kadronuza puan veremezsiniz.");
    }
  }

  public void ScoreMustBeValid(decimal score)
  {
    if (score < 1m || score > 5m)
    {
      throw new BusinessException("Puan 1 ile 5 arasında olmalıdır.");
    }

    if (score * 2m != Math.Floor(score * 2m))
    {
      throw new BusinessException("Puan 0.5'lik adımlarla verilmelidir (ör. 3.0, 3.5, 4.0).");
    }
  }
}
