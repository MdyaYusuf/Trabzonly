import { PositionZone } from '@/features/positions/positionTypes'
import { PlayerCategory, type PlayerResponseDto } from '../playerTypes'
import { getNationalityFlagUrl } from './nationalityFlag'
import type { PlayerCardData, PlayerCardStat, PositionGroup } from './playerDirectoryTypes'

const CARD_TONES = [
  'from-[#5A0E27] to-[#1A040B]',
  'from-[#3f2900] to-[#1A040B]',
  'from-[#12648e] to-[#1A040B]',
  'from-[#1A3A2A] to-[#1A040B]',
  'from-[#4A1A4A] to-[#1A040B]',
] as const

export const LEGEND_TEAM_LABEL = 'Trabzonspor Efsanesi'

export function positionGroupFromZone(zone: PositionZone): PositionGroup {
  if (zone === PositionZone.Goalkeeper) {
    return 'gk'
  }

  if (zone === PositionZone.Defence) {
    return 'def'
  }

  if (zone === PositionZone.Midfield) {
    return 'mid'
  }

  return 'fwd'
}

function buildCardStats(player: PlayerResponseDto): PlayerCardStat[] {
  const stats = player.currentSeasonStats
  const group = positionGroupFromZone(player.positionZone)

  if (group === 'gk' || group === 'def') {
    return [
      { label: 'Maç', value: String(stats?.appearances ?? 0) },
      {
        label: 'Gol Yenilmeyen Maç',
        value: stats?.cleanSheets != null ? String(stats.cleanSheets) : '—',
      },
    ]
  }

  return [
    { label: 'Maç', value: String(stats?.appearances ?? 0) },
    { label: 'Gol', value: String(stats?.goals ?? 0) },
    {
      label: 'Asist',
      value: stats?.assists != null ? String(stats.assists) : '—',
    },
  ]
}

function resolveTeamNote(player: PlayerResponseDto): string {
  if (player.category === PlayerCategory.Legend) {
    return LEGEND_TEAM_LABEL
  }

  return player.currentTeam?.trim() || player.description?.trim() || ''
}

function resolveSubtitle(player: PlayerResponseDto, height: string): string {
  const nationality = player.nationality.toUpperCase()

  if (player.category === PlayerCategory.Legend) {
    return `${nationality} · ${height}`
  }

  if (player.category === PlayerCategory.TransferTarget) {
    const team = player.currentTeam?.trim()

    if (team) {
      return `${nationality} · ${player.age} yaş · ${team}`
    }
  }

  return `${nationality} · ${player.age} yaş · ${height}`
}

function resolveBadge(
  player: PlayerResponseDto,
): PlayerCardData['badge'] {
  if (player.category === PlayerCategory.Legend) {
    return { label: 'EFSANE', tone: 'bordo' }
  }

  if (player.category === PlayerCategory.TransferTarget) {
    return { label: 'HEDEF', tone: 'mavi' }
  }

  if (player.isCaptain) {
    return { label: 'KAPTAN', tone: 'bordo' }
  }

  return undefined
}

export function mapPlayerToCardData(player: PlayerResponseDto, index = 0): PlayerCardData {
  const positionGroup = positionGroupFromZone(player.positionZone)
  const height =
    player.height != null ? `${(player.height / 100).toFixed(2).replace('.', ',')} m` : '—'
  return {
    id: player.id,
    number: player.shirtNumber ?? 0,
    name: player.name,
    nationality: player.nationality.toUpperCase(),
    positionGroup,
    positionCode: player.positionAbbreviation || '—',
    positionLabel: player.positionName.toUpperCase(),
    rating: player.averageRating,
    height,
    subtitle: resolveSubtitle(player, height),
    note: resolveTeamNote(player),
    marketValue: player.marketValue ?? null,
    showMarketValue: true,
    badge: resolveBadge(player),
    stats: buildCardStats(player),
    tone: CARD_TONES[index % CARD_TONES.length],
    flagUrl: getNationalityFlagUrl(player.nationality),
    commentCount: player.commentCount,
    description: player.description,
    goals: player.currentSeasonStats?.goals,
    assists: player.currentSeasonStats?.assists,
    category: player.category,
  }
}

export function formatLastUpdated(value?: string | null): string {
  if (!value) {
    return '—'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return '—'
  }

  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}
