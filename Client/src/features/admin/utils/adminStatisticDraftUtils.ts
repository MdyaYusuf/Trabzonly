import type {
  CreatePlayerStatsRequest,
  PlayerStatsResponseDto,
  UpdatePlayerStatsRequest,
} from '@/features/stats/playerStatsTypes'
import type { AdminStatisticFormDraft, AdminStatisticListRow } from './adminStatisticTypes'

function initialsFromName(name: string): string {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  if (parts.length === 0) {
    return '?'
  }

  if (parts.length === 1) {
    return parts[0]!.slice(0, 2).toUpperCase()
  }

  return `${parts[0]!.charAt(0)}${parts[parts.length - 1]!.charAt(0)}`.toUpperCase()
}

function formatMinutesLabel(minutes: number): string {
  return `${minutes.toLocaleString('tr-TR')}′`
}

function parseNonNegativeInt(value: string, fieldLabel: string): number | string {
  const trimmed = value.trim()

  if (!trimmed) {
    return `${fieldLabel} zorunludur.`
  }

  const parsed = Number(trimmed)

  if (!Number.isInteger(parsed) || parsed < 0) {
    return `${fieldLabel} geçerli bir sayı olmalıdır.`
  }

  return parsed
}

export function createEmptyAdminStatisticFormDraft(): AdminStatisticFormDraft {
  return {
    id: null,
    playerId: 0,
    seasonId: 0,
    team: 'Trabzonspor',
    matches: '0',
    minutes: '0',
    goals: '0',
    assists: '0',
    yellowCards: '0',
    redCards: '0',
    cleanSheets: '0',
    goalsConceded: '0',
    createdDate: null,
  }
}

export function mapPlayerStatsResponseToListRow(
  item: PlayerStatsResponseDto,
): AdminStatisticListRow {
  return {
    id: item.id,
    playerId: item.playerId,
    playerName: item.playerName,
    number: item.shirtNumber ?? null,
    positionCode: item.positionAbbreviation || '—',
    nationality: item.nationality || '—',
    seasonId: item.seasonId,
    season: item.seasonName,
    team: item.team,
    matches: item.appearances,
    minutesLabel: formatMinutesLabel(item.minutesPlayed),
    minutes: item.minutesPlayed,
    goals: item.goals,
    assists: item.assists,
    yellowCards: item.yellowCards,
    redCards: item.redCards,
    cleanSheets: item.cleanSheets,
    goalsConceded: item.goalsConceded,
    initials: initialsFromName(item.playerName),
  }
}

export function mapPlayerStatsResponseToFormDraft(
  item: PlayerStatsResponseDto,
): AdminStatisticFormDraft {
  return {
    id: item.id,
    playerId: item.playerId,
    seasonId: item.seasonId,
    team: item.team,
    matches: String(item.appearances),
    minutes: String(item.minutesPlayed),
    goals: String(item.goals),
    assists: String(item.assists),
    yellowCards: String(item.yellowCards),
    redCards: String(item.redCards),
    cleanSheets: String(item.cleanSheets),
    goalsConceded: String(item.goalsConceded),
    createdDate: item.createdDate,
  }
}

export function validateAdminStatisticDraft(draft: AdminStatisticFormDraft): string | null {
  if (draft.playerId <= 0) {
    return 'Oyuncu seçimi zorunludur.'
  }

  if (draft.seasonId <= 0) {
    return 'Sezon seçimi zorunludur.'
  }

  if (!draft.team.trim()) {
    return 'Takım zorunludur.'
  }

  const fields: Array<[string, string]> = [
    [draft.matches, 'Maç sayısı'],
    [draft.minutes, 'Oynanan dakika'],
    [draft.goals, 'Gol'],
    [draft.assists, 'Asist'],
    [draft.yellowCards, 'Sarı kart'],
    [draft.redCards, 'Kırmızı kart'],
    [draft.cleanSheets, 'Golsüz maç'],
    [draft.goalsConceded, 'Yenilen gol'],
  ]

  for (const [value, label] of fields) {
    const parsed = parseNonNegativeInt(value, label)

    if (typeof parsed === 'string') {
      return parsed
    }
  }

  return null
}

export function mapDraftToCreateRequest(draft: AdminStatisticFormDraft): CreatePlayerStatsRequest {
  return {
    team: draft.team.trim(),
    appearances: Number(draft.matches),
    minutesPlayed: Number(draft.minutes),
    goals: Number(draft.goals),
    assists: Number(draft.assists),
    yellowCards: Number(draft.yellowCards),
    redCards: Number(draft.redCards),
    cleanSheets: Number(draft.cleanSheets),
    goalsConceded: Number(draft.goalsConceded),
    playerId: draft.playerId,
    seasonId: draft.seasonId,
  }
}

export function mapDraftToUpdateRequest(draft: AdminStatisticFormDraft): UpdatePlayerStatsRequest {
  return {
    id: draft.id!,
    ...mapDraftToCreateRequest(draft),
  }
}
