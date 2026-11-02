import { PositionZone } from '@/features/positions/positionTypes'
import type { PlayerResponseDto } from '@/features/players/playerTypes'
import type { BuilderPlayer, BuilderPosGroup } from './squadBuilderTypes'

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
  }
}
