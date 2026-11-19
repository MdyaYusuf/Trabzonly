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

function parseOptionalNonNegativeInt(
  value: string,
  fieldLabel: string,
): number | null | string {
  const trimmed = value.trim()

  if (!trimmed) {
    return null
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
    goals: '0',
    assists: '',
    yellowCards: '',
    redCards: '',
    cleanSheets: '',
    goalsConceded: '',
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
    goals: item.goals,
    assists: item.assists ?? null,
    yellowCards: item.yellowCards ?? null,
    redCards: item.redCards ?? null,
    cleanSheets: item.cleanSheets ?? null,
    goalsConceded: item.goalsConceded ?? null,
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
    goals: String(item.goals),
    assists: item.assists != null ? String(item.assists) : '',
    yellowCards: item.yellowCards != null ? String(item.yellowCards) : '',
    redCards: item.redCards != null ? String(item.redCards) : '',
    cleanSheets: item.cleanSheets != null ? String(item.cleanSheets) : '',
    goalsConceded: item.goalsConceded != null ? String(item.goalsConceded) : '',
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

  const requiredFields: Array<[string, string]> = [
    [draft.matches, 'Maç sayısı'],
    [draft.goals, 'Gol'],
  ]

  for (const [value, label] of requiredFields) {
    const parsed = parseNonNegativeInt(value, label)

    if (typeof parsed === 'string') {
      return parsed
    }
  }

  const optionalFields: Array<[string, string]> = [
    [draft.assists, 'Asist'],
    [draft.yellowCards, 'Sarı kart'],
    [draft.redCards, 'Kırmızı kart'],
    [draft.cleanSheets, 'Gol yenmeyen maç'],
    [draft.goalsConceded, 'Yenilen gol'],
  ]

  for (const [value, label] of optionalFields) {
    const parsed = parseOptionalNonNegativeInt(value, label)

    if (typeof parsed === 'string') {
      return parsed
    }
  }

  return null
}

function resolveOptionalInt(value: string): number | null {
  const parsed = parseOptionalNonNegativeInt(value, '')

  if (typeof parsed === 'number') {
    return parsed
  }

  return null
}

export function mapDraftToCreateRequest(draft: AdminStatisticFormDraft): CreatePlayerStatsRequest {
  return {
    team: draft.team.trim(),
    appearances: Number(draft.matches),
    goals: Number(draft.goals),
    assists: resolveOptionalInt(draft.assists),
    yellowCards: resolveOptionalInt(draft.yellowCards),
    redCards: resolveOptionalInt(draft.redCards),
    cleanSheets: resolveOptionalInt(draft.cleanSheets),
    goalsConceded: resolveOptionalInt(draft.goalsConceded),
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
