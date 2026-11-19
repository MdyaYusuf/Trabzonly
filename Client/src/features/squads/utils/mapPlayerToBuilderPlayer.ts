import { PositionZone } from '@/features/positions/positionTypes'
import {
  PlayerCategory,
  type PlayerResponseDto,
} from '@/features/players/playerTypes'
import type { SquadSlotResponseDto } from '../squadTypes'
import type {
  BuilderPlayer,
  BuilderPlayerBadge,
  BuilderPosGroup,
} from './squadBuilderTypes'

const GRADIENTS = [
  'from-[#5a0e27] to-[#1A040B]',
  'from-[#12648e] to-[#1A040B]',
  'from-[#3a0014] to-[#12648e]',
  'from-[#8ccefd] to-[#5a0e27]',
  'from-[#544245] to-[#1A040B]',
  'from-[#75B7E5] to-[#1A040B]',
] as const

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)

  if (parts.length === 0) {
    return '?'
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }

  return `${parts[0][0] ?? ''}${parts[parts.length - 1][0] ?? ''}`.toUpperCase()
}

function shortNameFromFull(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)

  if (parts.length <= 1) {
    return name
  }

  return `${parts[0][0]}. ${parts[parts.length - 1]}`
}

function posGroupFromZone(zone: PositionZone): Exclude<BuilderPosGroup, 'ALL'> {
  if (zone === PositionZone.Goalkeeper) {
    return 'GK'
  }

  if (zone === PositionZone.Defence) {
    return 'DF'
  }

  if (zone === PositionZone.Attack) {
    return 'FW'
  }

  return 'MF'
}

function posGroupFromAbbreviation(
  abbreviation: string,
): Exclude<BuilderPosGroup, 'ALL'> {
  const key = abbreviation.trim().toUpperCase()

  if (key === 'GK') {
    return 'GK'
  }

  if (
    key === 'CB' ||
    key === 'LB' ||
    key === 'RB' ||
    key === 'LWB' ||
    key === 'RWB'
  ) {
    return 'DF'
  }

  if (key === 'LW' || key === 'RW' || key === 'ST') {
    return 'FW'
  }

  return 'MF'
}

function badgeForCategory(category: PlayerCategory): BuilderPlayerBadge | undefined {
  if (category === PlayerCategory.Legend) {
    return { label: 'EFSANE', tone: 'bordo' }
  }

  if (category === PlayerCategory.TransferTarget) {
    return { label: 'HEDEF', tone: 'mavi' }
  }

  return undefined
}

export function mapPlayerToBuilderPlayer(player: PlayerResponseDto): BuilderPlayer {
  const marketValueM =
    player.marketValue != null ? Math.round((player.marketValue / 1_000_000) * 10) / 10 : 0

  return {
    id: String(player.id),
    name: player.name,
    shortName: shortNameFromFull(player.name),
    number: player.shirtNumber != null ? String(player.shirtNumber) : '—',
    posGroup: posGroupFromZone(player.positionZone),
    roleHint: `${player.positionName} • ${player.nationality}`,
    age: player.age,
    marketValueM,
    avatarGradient: GRADIENTS[player.id % GRADIENTS.length],
    initials: initialsFromName(player.name),
    category: player.category,
    badge: badgeForCategory(player.category),
  }
}

export function mapSquadSlotToBuilderPlayer(slot: SquadSlotResponseDto): BuilderPlayer {
  const marketValueM =
    slot.marketValue != null ? Math.round((slot.marketValue / 1_000_000) * 10) / 10 : 0

  return {
    id: String(slot.playerId),
    name: slot.playerName,
    shortName: shortNameFromFull(slot.playerName),
    number: slot.playerShirtNumber != null ? String(slot.playerShirtNumber) : '—',
    posGroup: posGroupFromAbbreviation(slot.positionAbbreviation),
    roleHint: slot.positionAbbreviation,
    age: slot.age,
    marketValueM,
    avatarGradient: GRADIENTS[slot.playerId % GRADIENTS.length],
    initials: initialsFromName(slot.playerName),
    category: slot.category,
    badge: badgeForCategory(slot.category),
  }
}

export function mergeBuilderPlayers(
  existing: BuilderPlayer[],
  incoming: BuilderPlayer[],
): BuilderPlayer[] {
  if (incoming.length === 0) {
    return existing
  }

  const byId = new Map(existing.map((player) => [player.id, player]))
  let changed = false

  for (const player of incoming) {
    if (byId.has(player.id)) {
      continue
    }

    byId.set(player.id, player)
    changed = true
  }

  if (!changed) {
    return existing
  }

  return Array.from(byId.values())
}
