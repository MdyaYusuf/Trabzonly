import type {
  CreateInjuryRequest,
  InjuryResponseDto,
  UpdateInjuryRequest,
} from '@/features/injuries/injuryTypes'
import type { AdminInjuryFormDraft, AdminInjuryListRow } from './adminInjuryTypes'

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

function formatRecordedAt(value: string): string {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toLocaleDateString('tr-TR')
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

export function createEmptyAdminInjuryFormDraft(): AdminInjuryFormDraft {
  return {
    id: null,
    playerId: 0,
    seasonId: 0,
    name: '',
    daysInjured: '0',
    gamesMissed: '0',
    createdDate: null,
  }
}

export function mapInjuryResponseToListRow(item: InjuryResponseDto): AdminInjuryListRow {
  return {
    id: item.id,
    playerId: item.playerId,
    playerName: item.playerName,
    number: item.shirtNumber ?? null,
    positionCode: item.positionAbbreviation || '—',
    nationality: item.nationality || '—',
    diagnosis: item.name,
    days: item.daysInjured,
    missedMatches: item.gamesMissed,
    seasonId: item.seasonId ?? null,
    season: item.seasonName?.trim() || '—',
    recordedAt: formatRecordedAt(item.createdDate),
    initials: initialsFromName(item.playerName),
  }
}

export function mapInjuryResponseToFormDraft(item: InjuryResponseDto): AdminInjuryFormDraft {
  return {
    id: item.id,
    playerId: item.playerId,
    seasonId: item.seasonId ?? 0,
    name: item.name,
    daysInjured: String(item.daysInjured),
    gamesMissed: String(item.gamesMissed),
    createdDate: item.createdDate,
  }
}

export function validateAdminInjuryDraft(draft: AdminInjuryFormDraft): string | null {
  if (draft.playerId <= 0) {
    return 'Oyuncu seçimi zorunludur.'
  }

  if (!draft.name.trim()) {
    return 'Sakatlık adı zorunludur.'
  }

  if (draft.name.trim().length > 150) {
    return 'Sakatlık adı en fazla 150 karakter olabilir.'
  }

  const days = parseNonNegativeInt(draft.daysInjured, 'Sakatlık günü')

  if (typeof days === 'string') {
    return days
  }

  const games = parseNonNegativeInt(draft.gamesMissed, 'Kaçırılan maç')

  if (typeof games === 'string') {
    return games
  }

  return null
}

export function mapDraftToCreateRequest(draft: AdminInjuryFormDraft): CreateInjuryRequest {
  return {
    name: draft.name.trim(),
    daysInjured: Number(draft.daysInjured),
    gamesMissed: Number(draft.gamesMissed),
    playerId: draft.playerId,
    seasonId: draft.seasonId > 0 ? draft.seasonId : null,
  }
}

export function mapDraftToUpdateRequest(draft: AdminInjuryFormDraft): UpdateInjuryRequest {
  return {
    id: draft.id!,
    ...mapDraftToCreateRequest(draft),
  }
}
