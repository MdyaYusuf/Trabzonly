import type { SquadResponseDto, SquadSlotResponseDto } from '../squadTypes'
import { getFormationConfig } from './squadBuilderPlaceholders'
import type { BuilderFormationId } from './squadBuilderTypes'
import type {
  SquadBenchPlayer,
  SquadDetailViewModel,
  SquadPitchPlayer,
} from './squadDetailTypes'

const GRADIENTS = [
  'from-[#5a0e27] to-[#1A040B]',
  'from-[#12648e] to-[#1A040B]',
  'from-[#3a0014] to-[#12648e]',
  'from-[#8ccefd] to-[#5a0e27]',
  'from-[#544245] to-[#1A040B]',
  'from-[#75B7E5] to-[#1A040B]',
] as const

function formatRelativeTime(isoDate: string): string {
  const created = new Date(isoDate).getTime()
  const now = Date.now()
  const diffMs = Math.max(0, now - created)
  const minutes = Math.floor(diffMs / 60_000)

  if (minutes < 1) {
    return 'az önce'
  }

  if (minutes < 60) {
    return `${minutes} dk önce`
  }

  const hours = Math.floor(minutes / 60)

  if (hours < 24) {
    return `${hours} saat önce`
  }

  const days = Math.floor(hours / 24)

  if (days < 7) {
    return `${days} gün önce`
  }

  return new Date(isoDate).toLocaleDateString('tr-TR')
}

function initialsFromUsername(username: string): string {
  const cleaned = username.trim()

  if (cleaned.length === 0) {
    return '?'
  }

  return cleaned.slice(0, 2).toUpperCase()
}

function shortPlayerName(fullName: string): string {
  const trimmed = fullName.trim()

  if (!trimmed) {
    return '?'
  }

  const parts = trimmed.split(/\s+/)

  if (parts.length === 1) {
    return parts[0]
  }

  return `${parts[0][0]}. ${parts[parts.length - 1]}`
}

function isBenchSlot(slotKey: string): boolean {
  return slotKey.toUpperCase().startsWith('BENCH_')
}

function formatMarketValue(total: number): string {
  if (total <= 0) {
    return '—'
  }

  if (total >= 1_000_000) {
    return `${(total / 1_000_000).toFixed(1)}M€`
  }

  if (total >= 1_000) {
    return `${(total / 1_000).toFixed(0)}K€`
  }

  return `${total.toFixed(0)}€`
}

function resolveFormationId(formation: string): BuilderFormationId {
  const normalized = formation.trim() as BuilderFormationId
  const config = getFormationConfig(normalized)

  return config.id
}

function findPlayerName(
  slots: SquadSlotResponseDto[],
  playerId: number,
): string {
  const match = slots.find((slot) => slot.playerId === playerId)

  return match?.playerName ?? '—'
}

function mapStartersToPitchPlayers(
  formation: string,
  slots: SquadSlotResponseDto[],
  captainPlayerId: number,
): SquadPitchPlayer[] {
  const formationId = resolveFormationId(formation)
  const config = getFormationConfig(formationId)
  const slotByKey = new Map(
    slots
      .filter((slot) => !isBenchSlot(slot.slotKey))
      .map((slot) => [slot.slotKey.toUpperCase(), slot] as const),
  )

  const rowCount = Math.max(config.rows.length, 1)
  const players: SquadPitchPlayer[] = []

  config.rows.forEach((row, rowIndex) => {
    const topPercent =
      rowCount === 1 ? 50 : 8 + (rowIndex / (rowCount - 1)) * 80

    row.forEach((slotDef, slotIndex) => {
      const slot = slotByKey.get(slotDef.id.toUpperCase())

      if (!slot) {
        return
      }

      const leftPercent =
        row.length === 1 ? 50 : ((slotIndex + 1) / (row.length + 1)) * 100

      players.push({
        id: slot.slotKey,
        playerId: slot.playerId,
        shortName: shortPlayerName(slot.playerName),
        fullName: slot.playerName,
        number: slot.playerShirtNumber != null ? String(slot.playerShirtNumber) : '—',
        positionLabel: slotDef.label,
        left: `${leftPercent}%`,
        top: `${topPercent}%`,
        isCaptain: slot.playerId === captainPlayerId,
        avatarInitials: initialsFromUsername(slot.playerName),
        avatarGradient: GRADIENTS[slot.playerId % GRADIENTS.length],
      })
    })
  })

  return players
}

function mapBenchPlayers(slots: SquadSlotResponseDto[]): SquadBenchPlayer[] {
  return slots
    .filter((slot) => isBenchSlot(slot.slotKey))
    .sort((a, b) => a.sortOrder - b.sortOrder || a.slotKey.localeCompare(b.slotKey))
    .map((slot) => ({
      playerId: slot.playerId,
      number: slot.playerShirtNumber != null ? String(slot.playerShirtNumber) : '—',
      position: slot.positionAbbreviation,
      name: shortPlayerName(slot.playerName),
    }))
}

export function mapSquadToDetailView(squad: SquadResponseDto): SquadDetailViewModel {
  const slots = squad.slots ?? []
  const starters = slots.filter((slot) => !isBenchSlot(slot.slotKey))

  const avgAge =
    starters.length === 0
      ? 0
      : starters.reduce((sum, slot) => sum + (slot.age ?? 0), 0) / starters.length

  const totalValue = slots.reduce((sum, slot) => sum + (slot.marketValue ?? 0), 0)

  const authorLabel = squad.authorUsername.startsWith('@')
    ? squad.authorUsername
    : `@${squad.authorUsername}`

  const creditParts = [authorLabel]
  if (squad.authorDisplayTag) {
    creditParts.push(squad.authorDisplayTag)
  }

  return {
    id: squad.id,
    title: squad.title,
    formation: squad.formation,
    notes: squad.notes,
    userId: squad.userId,
    authorUsername: squad.authorUsername,
    authorDisplayTag: squad.authorDisplayTag,
    authorInitials: initialsFromUsername(squad.authorUsername),
    publishedLabel: formatRelativeTime(squad.createdDate),
    rating: squad.averageRating,
    ratingCount: squad.ratingCount,
    commentCount: squad.commentCount,
    viewCount: squad.viewCount,
    currentUserScore: squad.currentUserScore,
    isAuthorFollowedByCurrentUser: squad.isAuthorFollowedByCurrentUser ?? false,
    attackStyle: squad.attackStyle,
    defenseLine: squad.defenseLine,
    tempo: squad.tempo,
    captainPlayerId: squad.captainPlayerId,
    cornerTakerName: findPlayerName(slots, squad.cornerTakerPlayerId),
    freeKickTakerName: findPlayerName(slots, squad.freeKickTakerPlayerId),
    pitchPlayers: mapStartersToPitchPlayers(squad.formation, slots, squad.captainPlayerId),
    benchPlayers: mapBenchPlayers(slots),
    instructions: [
      { title: 'Hücum Anlayışı', value: squad.attackStyle },
      { title: 'Savunma Çizgisi', value: squad.defenseLine },
      { title: 'Tempo', value: squad.tempo },
      {
        title: 'Duran Top Sorumluları',
        value: `Korner: ${findPlayerName(slots, squad.cornerTakerPlayerId)} · Serbest Vuruş: ${findPlayerName(slots, squad.freeKickTakerPlayerId)}`,
      },
    ],
    avgAge: avgAge > 0 ? avgAge.toFixed(1) : '—',
    avgAgeCaption: 'İlk 11 ortalaması',
    totalValue: formatMarketValue(totalValue),
    totalValueCaption: 'İlk 11 + yedekler',
    authorNoteCredit: creditParts.join(' • '),
  }
}
