import type { MatchWeekSlotRequest, MatchWeekResponseDto } from '@/features/matchWeek/matchWeekTypes'
import {
  getFormationConfig,
  isBenchSlotId,
  slotIdsForFormation,
} from '@/features/squads/utils/squadBuilderConfig'
import type {
  BenchSlotId,
  BuilderFormationId,
  BuilderSlotId,
} from '@/features/squads/utils/squadBuilderTypes'

export const MATCH_WEEK_BENCH_SLOT_IDS: BenchSlotId[] = [
  'BENCH_1',
  'BENCH_2',
  'BENCH_3',
  'BENCH_4',
  'BENCH_5',
  'BENCH_6',
]

export const MATCH_WEEK_MAX_BENCH = MATCH_WEEK_BENCH_SLOT_IDS.length

export function isBuilderFormationId(value: string): value is BuilderFormationId {
  return getFormationConfig(value as BuilderFormationId).id === value
}

export function buildMatchWeekSlotsRequest(
  formationId: BuilderFormationId,
  starterAssignments: Partial<Record<BuilderSlotId, string>>,
  benchAssignments: Partial<Record<BenchSlotId, string>>,
): MatchWeekSlotRequest[] {
  const starters: MatchWeekSlotRequest[] = []

  slotIdsForFormation(formationId).forEach((slotKey, index) => {
    const playerId = starterAssignments[slotKey]

    if (!playerId) {
      return
    }

    starters.push({
      slotKey,
      sortOrder: index,
      playerId: Number(playerId),
    })
  })

  const filledBenchPlayerIds = MATCH_WEEK_BENCH_SLOT_IDS.map(
    (slotId) => benchAssignments[slotId],
  ).filter((playerId): playerId is string => Boolean(playerId))

  const bench: MatchWeekSlotRequest[] = filledBenchPlayerIds.map((playerId, index) => ({
    slotKey: `BENCH_${index + 1}`,
    sortOrder: starters.length + index,
    playerId: Number(playerId),
  }))

  return [...starters, ...bench]
}

export function mapMatchWeekToAssignments(matchWeek: MatchWeekResponseDto): {
  formationId: BuilderFormationId
  starterAssignments: Partial<Record<BuilderSlotId, string>>
  benchAssignments: Partial<Record<BenchSlotId, string>>
} | null {
  const formationValue = matchWeek.formation.trim()

  if (!isBuilderFormationId(formationValue)) {
    return null
  }

  const starterAssignments: Partial<Record<BuilderSlotId, string>> = {}
  const benchAssignments: Partial<Record<BenchSlotId, string>> = {}
  const validStarterSlots = new Set(slotIdsForFormation(formationValue))

  for (const slot of matchWeek.slots ?? []) {
    const key = slot.slotKey.trim().toUpperCase()

    if (isBenchSlotId(key) && MATCH_WEEK_BENCH_SLOT_IDS.includes(key as BenchSlotId)) {
      benchAssignments[key as BenchSlotId] = String(slot.playerId)
      continue
    }

    if (!validStarterSlots.has(key as BuilderSlotId)) {
      continue
    }

    starterAssignments[key as BuilderSlotId] = String(slot.playerId)
  }

  return {
    formationId: formationValue,
    starterAssignments,
    benchAssignments,
  }
}

export function countFilledStarters(
  formationId: BuilderFormationId,
  starterAssignments: Partial<Record<BuilderSlotId, string>>,
): number {
  return slotIdsForFormation(formationId).filter((slotId) => Boolean(starterAssignments[slotId]))
    .length
}

export function countFilledBench(
  benchAssignments: Partial<Record<BenchSlotId, string>>,
): number {
  return MATCH_WEEK_BENCH_SLOT_IDS.filter((slotId) => Boolean(benchAssignments[slotId])).length
}
