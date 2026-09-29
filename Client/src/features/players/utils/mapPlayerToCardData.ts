import type { PlayerResponseDto } from '../playerTypes'
import type { PlayerCardData, PlayerCardStat, PositionGroup } from './playerDirectoryTypes'

const CARD_TONES = [
  'from-[#5A0E27] to-[#1A040B]',
  'from-[#3f2900] to-[#1A040B]',
  'from-[#12648e] to-[#1A040B]',
  'from-[#1A3A2A] to-[#1A040B]',
  'from-[#4A1A4A] to-[#1A040B]',
] as const

export function positionGroupFromAbbreviation(abbreviation: string): PositionGroup {
  const code = abbreviation.toUpperCase()

  if (code === 'GK') {
    return 'gk'
  }

  if (code === 'CB' || code === 'LB' || code === 'RB') {
    return 'def'
  }

  if (code === 'DM' || code === 'CM' || code === 'AM') {
    return 'mid'
  }

  return 'fwd'
}

function buildCardStats(player: PlayerResponseDto): PlayerCardStat[] {
  const stats = player.currentSeasonStats
  const group = positionGroupFromAbbreviation(player.positionAbbreviation)
  const appearances = String(stats?.appearances ?? 0)

  if (group === 'gk') {
    return [
      { label: 'Maç', value: appearances },
      { label: 'Golsüz Maç', value: String(stats?.cleanSheets ?? 0) },
      { label: 'Kurtarış', value: String(stats?.saves ?? 0) },
    ]
  }

  if (group === 'def') {
    return [
      { label: 'Maç', value: appearances },
      { label: 'Dakika', value: String(stats?.minutesPlayed ?? 0) },
      { label: 'Golsüz Maç', value: String(stats?.cleanSheets ?? 0) },
    ]
  }

  return [
    { label: 'Maç', value: appearances },
    { label: 'Gol', value: String(stats?.goals ?? 0) },
    { label: 'Asist', value: String(stats?.assists ?? 0) },
  ]
}

export function mapPlayerToCardData(player: PlayerResponseDto, index = 0): PlayerCardData {
  const positionGroup = positionGroupFromAbbreviation(player.positionAbbreviation)
  const note = player.description?.trim() || player.currentTeam
  const height =
    player.height != null ? `${(player.height / 100).toFixed(2).replace('.', ',')} m` : '—'

  return {
    id: player.id,
    number: player.shirtNumber ?? 0,
    name: player.name,
    nationality: player.nationality.toUpperCase(),
    isDomestic: player.isDomestic,
    positionGroup,
    positionCode: player.positionAbbreviation || '—',
    positionLabel: player.positionName.toUpperCase(),
    rating: player.averageRating,
    age: player.age,
    height,
    note,
    marketValue: player.marketValue ?? 0,
    badge: player.isCaptain ? { label: 'KAPTAN', tone: 'bordo' } : undefined,
    stats: buildCardStats(player),
    tone: CARD_TONES[index % CARD_TONES.length],
    commentCount: player.commentCount,
    description: player.description,
    goals: player.currentSeasonStats?.goals,
    assists: player.currentSeasonStats?.assists,
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
