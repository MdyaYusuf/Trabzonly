import {
  PlayerCategory,
  type CreatePlayerRequest,
  type PlayerResponseDto,
  type UpdatePlayerRequest,
} from '@/features/players/playerTypes'
import { formatMarketValue } from '@/features/players/utils/formatMarketValue'
import { LEGEND_TEAM_LABEL } from '@/features/players/utils/mapPlayerToCardData'
import { getAdminPlayerModule } from './adminPlayerModuleConfig'
import type {
  AdminPlayerFormDraft,
  AdminPlayerListRow,
  AdminPlayerPreferredFoot,
  AdminPlayerStatus,
} from './adminPlayerTypes'

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

function toDateInputValue(value: string | undefined | null): string {
  if (!value) {
    return ''
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value.slice(0, 10)
  }

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function normalizePreferredFoot(value: string): AdminPlayerPreferredFoot {
  const normalized = value.trim().toLowerCase()

  if (normalized === 'left' || normalized === 'sol') {
    return 'Left'
  }

  if (normalized === 'both' || normalized === 'her ikisi' || normalized === 'çift') {
    return 'Both'
  }

  return 'Right'
}

function parseOptionalNumber(value: string): number | undefined {
  const trimmed = value.trim()

  if (!trimmed) {
    return undefined
  }

  const parsed = Number(trimmed.replace(',', '.'))

  if (Number.isNaN(parsed)) {
    return undefined
  }

  return parsed
}

export function formatAdminMoneyInput(raw: string): string {
  const withoutGrouping = raw.replace(/\./g, '')
  const cleaned = withoutGrouping.replace(/[^\d,]/g, '')

  if (!cleaned) {
    return ''
  }

  const commaIndex = cleaned.indexOf(',')
  let integerDigits =
    commaIndex === -1 ? cleaned : cleaned.slice(0, commaIndex)
  const fractionDigits =
    commaIndex === -1
      ? null
      : cleaned.slice(commaIndex + 1).replace(/,/g, '').slice(0, 2)

  integerDigits = integerDigits.replace(/^0+(?=\d)/, '')

  if (!integerDigits) {
    integerDigits = '0'
  }

  const grouped = integerDigits.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  if (fractionDigits != null) {
    return `${grouped},${fractionDigits}`
  }

  if (cleaned.endsWith(',')) {
    return `${grouped},`
  }

  return grouped
}

export function formatAdminMoneyAmount(value: number): string {
  return value.toLocaleString('tr-TR', {
    maximumFractionDigits: 2,
    useGrouping: true,
  })
}

export function parseAdminMoneyInput(value: string): number | undefined {
  const trimmed = value.trim()

  if (!trimmed) {
    return undefined
  }

  const normalized = trimmed.replace(/\./g, '').replace(',', '.')
  const parsed = Number(normalized)

  if (Number.isNaN(parsed)) {
    return undefined
  }

  return parsed
}

export function createEmptyAdminPlayerFormDraft(
  category: PlayerCategory = PlayerCategory.Current,
  defaultPositionId: number = 0,
): AdminPlayerFormDraft {
  const module = getAdminPlayerModule(category)

  return {
    id: null,
    name: '',
    shirtNumber: '',
    dateOfBirth: '',
    nationality: '',
    preferredFoot: 'Right',
    isActive: true,
    heightCm: '',
    positionId: defaultPositionId,
    currentTeam: module.defaultCurrentTeam,
    marketValue: '',
    wage: '',
    description: '',
    isCaptain: false,
    category,
    createdDate: null,
    updatedDate: null,
  }
}

export function mapPlayerResponseToListRow(player: PlayerResponseDto): AdminPlayerListRow {
  const status: AdminPlayerStatus = player.isActive ? 'active' : 'inactive'

  return {
    id: player.id,
    number: player.shirtNumber ?? null,
    fullName: player.name,
    positionLabel: player.positionAbbreviation
      ? `${player.positionName} (${player.positionAbbreviation})`
      : player.positionName,
    currentTeam:
      player.category === PlayerCategory.Legend
        ? LEGEND_TEAM_LABEL
        : player.currentTeam?.trim() || '—',
    nationality: player.nationality,
    age: player.age,
    marketValueLabel:
      player.category === PlayerCategory.Legend
        ? '—'
        : player.marketValue != null
          ? formatMarketValue(player.marketValue)
          : '—',
    status,
    statusLabel: player.isActive ? 'Aktif' : 'Pasif',
    isCaptain: player.isCaptain,
    imageUrl: player.imageUrl,
    initials: initialsFromName(player.name),
  }
}

export function mapPlayerResponseToFormDraft(player: PlayerResponseDto): AdminPlayerFormDraft {
  return {
    id: player.id,
    name: player.name,
    shirtNumber: player.shirtNumber != null ? String(player.shirtNumber) : '',
    dateOfBirth: toDateInputValue(player.dateOfBirth),
    nationality: player.nationality,
    preferredFoot: normalizePreferredFoot(player.preferredFoot),
    isActive: player.isActive,
    heightCm: player.height != null ? String(player.height) : '',
    positionId: player.positionId,
    currentTeam: player.currentTeam ?? '',
    marketValue:
      player.marketValue != null ? formatAdminMoneyAmount(player.marketValue) : '',
    wage: player.wage != null ? formatAdminMoneyAmount(player.wage) : '',
    description: player.description ?? '',
    isCaptain: player.isCaptain,
    category: player.category,
    createdDate: player.createdDate,
    updatedDate: player.updatedDate,
  }
}

export function validateAdminPlayerDraft(draft: AdminPlayerFormDraft): string | null {
  if (!draft.name.trim()) {
    return 'Oyuncu adı zorunludur.'
  }

  if (!draft.nationality.trim()) {
    return 'Uyruk zorunludur.'
  }

  if (!draft.dateOfBirth) {
    return 'Doğum tarihi zorunludur.'
  }

  const module = getAdminPlayerModule(draft.category)

  if (module.currentTeamRequired && !draft.currentTeam.trim()) {
    return 'Mevcut takım zorunludur.'
  }

  if (!draft.positionId || draft.positionId <= 0) {
    return 'Pozisyon seçimi zorunludur.'
  }

  const shirtNumber = parseOptionalNumber(draft.shirtNumber)

  if (shirtNumber != null && (shirtNumber < 1 || shirtNumber > 99 || !Number.isInteger(shirtNumber))) {
    return 'Forma numarası 1 ile 99 arasında olmalıdır.'
  }

  const height = parseOptionalNumber(draft.heightCm)

  if (draft.heightCm.trim() && (height == null || height <= 0)) {
    return 'Boy geçerli bir sayı olmalıdır.'
  }

  const marketValue = parseAdminMoneyInput(draft.marketValue)

  if (draft.marketValue.trim() && (marketValue == null || marketValue < 0)) {
    return 'Piyasa değeri geçerli bir sayı olmalıdır.'
  }

  const wage = parseAdminMoneyInput(draft.wage)

  if (draft.wage.trim() && (wage == null || wage < 0)) {
    return 'Maaş geçerli bir sayı olmalıdır.'
  }

  return null
}

function buildBaseRequest(draft: AdminPlayerFormDraft) {
  const shirtNumber = parseOptionalNumber(draft.shirtNumber)
  const hideMarket = getAdminPlayerModule(draft.category).hideMarketFields

  return {
    name: draft.name.trim(),
    nationality: draft.nationality.trim(),
    dateOfBirth: draft.dateOfBirth,
    height: parseOptionalNumber(draft.heightCm),
    preferredFoot: draft.preferredFoot,
    marketValue: hideMarket ? undefined : parseAdminMoneyInput(draft.marketValue),
    wage: hideMarket ? undefined : parseAdminMoneyInput(draft.wage),
    currentTeam: draft.currentTeam.trim() || null,
    description: draft.description.trim() || undefined,
    shirtNumber: shirtNumber != null ? Math.trunc(shirtNumber) : null,
    positionId: draft.positionId,
    isCaptain: draft.isCaptain,
    category: draft.category,
  }
}

export function mapDraftToCreateRequest(draft: AdminPlayerFormDraft): CreatePlayerRequest {
  return buildBaseRequest(draft)
}

export function mapDraftToUpdateRequest(draft: AdminPlayerFormDraft): UpdatePlayerRequest {
  if (draft.id == null) {
    throw new Error('Güncelleme için oyuncu kimliği gerekli.')
  }

  return {
    ...buildBaseRequest(draft),
    id: draft.id,
    isActive: draft.isActive,
  }
}
