import type { FixtureResponseDto, MatchWeekSlotResponseDto } from '../matchWeekTypes'
import type { BuilderSlotId, FormationSlot } from '@/features/squads/utils/squadBuilderTypes'
import { getFormationConfig } from '@/features/squads/utils/squadBuilderPlaceholders'

const GRADIENTS = [
  'from-[#5a0e27] to-[#1A040B]',
  'from-[#12648e] to-[#1A040B]',
  'from-[#3a0014] to-[#12648e]',
  'from-[#8ccefd] to-[#5a0e27]',
  'from-[#544245] to-[#1A040B]',
  'from-[#75B7E5] to-[#1A040B]',
] as const

export function avatarGradientForPlayerId(playerId: number): string {
  return GRADIENTS[playerId % GRADIENTS.length]
}

export function shortNameFromFull(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)

  if (parts.length <= 1) {
    return name
  }

  return `${parts[0][0]}. ${parts[parts.length - 1]}`
}

export function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)

  if (parts.length === 0) {
    return '?'
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }

  return `${parts[0][0] ?? ''}${parts[parts.length - 1][0] ?? ''}`.toUpperCase()
}

export function findFormationSlot(
  formation: string,
  slotKey: string,
): FormationSlot | undefined {
  const config = getFormationConfig(formation.trim() as Parameters<typeof getFormationConfig>[0])
  const key = slotKey.trim().toUpperCase() as BuilderSlotId

  for (const row of config.rows) {
    const match = row.find((slot) => slot.id === key)

    if (match) {
      return match
    }
  }

  return undefined
}

export function formatFixtureTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

export function formatFixtureDateLabel(iso: string): string {
  return new Date(iso).toLocaleDateString('tr-TR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

export type FixtureDateGroup = {
  key: string
  label: string
  fixtures: FixtureResponseDto[]
}

export function groupFixturesByDate(fixtures: FixtureResponseDto[]): FixtureDateGroup[] {
  const groups = new Map<string, FixtureDateGroup>()

  for (const fixture of fixtures) {
    const key = fixture.kickoff
      ? new Date(fixture.kickoff).toISOString().slice(0, 10)
      : 'undated'
    const label = fixture.kickoff ? formatFixtureDateLabel(fixture.kickoff) : 'Tarih belirsiz'
    const existing = groups.get(key)

    if (existing) {
      existing.fixtures.push(fixture)
      continue
    }

    groups.set(key, {
      key,
      label,
      fixtures: [fixture],
    })
  }

  return [...groups.values()].sort((a, b) => {
    if (a.key === 'undated') {
      return 1
    }

    if (b.key === 'undated') {
      return -1
    }

    return a.key.localeCompare(b.key)
  })
}

export function splitBoardSlots(slots: MatchWeekSlotResponseDto[]): {
  starters: MatchWeekSlotResponseDto[]
  bench: MatchWeekSlotResponseDto[]
} {
  const starters = slots
    .filter((slot) => slot.isStarter)
    .sort((a, b) => a.sortOrder - b.sortOrder)
  const bench = slots
    .filter((slot) => !slot.isStarter)
    .sort((a, b) => a.sortOrder - b.sortOrder)

  return { starters, bench }
}
