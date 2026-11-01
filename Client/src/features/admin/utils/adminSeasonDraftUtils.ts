import type {
  CreateSeasonRequest,
  SeasonResponseDto,
  UpdateSeasonRequest,
} from '@/features/seasons/seasonTypes'
import type { AdminSeasonFormDraft, AdminSeasonListRow } from './adminSeasonTypes'

function formatDateLabel(value: string): string {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value.slice(0, 10)
  }

  return date.toLocaleDateString('tr-TR')
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

export function createEmptyAdminSeasonFormDraft(): AdminSeasonFormDraft {
  return {
    id: null,
    name: '',
    startDate: '',
    endDate: '',
    isActive: false,
    createdDate: null,
    updatedDate: null,
  }
}

export function mapSeasonResponseToListRow(item: SeasonResponseDto): AdminSeasonListRow {
  return {
    id: item.id,
    name: item.name,
    startDateLabel: formatDateLabel(item.startDate),
    endDateLabel: formatDateLabel(item.endDate),
    isActive: item.isActive,
    statusLabel: item.isActive ? 'Aktif' : 'Pasif',
    createdDate: item.createdDate,
    updatedDate: item.updatedDate,
  }
}

export function mapSeasonResponseToFormDraft(item: SeasonResponseDto): AdminSeasonFormDraft {
  return {
    id: item.id,
    name: item.name,
    startDate: toDateInputValue(item.startDate),
    endDate: toDateInputValue(item.endDate),
    isActive: item.isActive,
    createdDate: item.createdDate,
    updatedDate: item.updatedDate,
  }
}

export function validateAdminSeasonDraft(draft: AdminSeasonFormDraft): string | null {
  if (!draft.name.trim()) {
    return 'Sezon adı zorunludur.'
  }

  if (draft.name.trim().length > 20) {
    return 'Sezon adı en fazla 20 karakter olabilir.'
  }

  if (!draft.startDate) {
    return 'Başlangıç tarihi zorunludur.'
  }

  if (!draft.endDate) {
    return 'Bitiş tarihi zorunludur.'
  }

  if (draft.endDate <= draft.startDate) {
    return 'Bitiş tarihi, başlangıç tarihinden sonra olmalıdır.'
  }

  return null
}

export function mapDraftToCreateRequest(draft: AdminSeasonFormDraft): CreateSeasonRequest {
  return {
    name: draft.name.trim(),
    startDate: draft.startDate,
    endDate: draft.endDate,
    isActive: draft.isActive,
  }
}

export function mapDraftToUpdateRequest(draft: AdminSeasonFormDraft): UpdateSeasonRequest {
  return {
    id: draft.id!,
    ...mapDraftToCreateRequest(draft),
  }
}
