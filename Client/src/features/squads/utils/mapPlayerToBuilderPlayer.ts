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

function posGroupFromAbbreviation(
  abbreviation: string,
): Exclude<BuilderPosGroup, 'ALL'> {
  const key = abbreviation.trim().toUpperCase()

  if (key === 'GK') {
    return 'GK'
  }

  if (
    key === 'CB' ||
    key === 'LCB' ||
    key === 'RCB' ||
    key === 'LB' ||
    key === 'RB' ||
    key === 'LWB' ||
    key === 'RWB' ||
    key === 'DF'
  ) {
    return 'DF'
  }

  if (
    key === 'ST' ||
    key === 'CF' ||
    key === 'LW' ||
    key === 'RW' ||
    key === 'SS' ||
    key === 'FW'
  ) {
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
    posGroup: posGroupFromAbbreviation(player.positionAbbreviation),
    roleHint: `${player.positionName} • ${player.nationality}`,
    age: player.age,
    isDomestic: player.isDomestic,
    marketValueM,
    badge: player.isDomestic ? 'YERLİ (TR)' : undefined,
    badgeTone: player.isDomestic ? 'domestic' : undefined,
    avatarGradient: GRADIENTS[player.id % GRADIENTS.length],
    initials: initialsFromName(player.name),
  }
}
