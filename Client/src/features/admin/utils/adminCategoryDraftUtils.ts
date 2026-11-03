import type {
  CategoryAdminListItemDto,
  CategoryResponseDto,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from '@/features/categories/categoryTypes'
import type { AdminCategoryFormDraft, AdminCategoryListRow } from './adminCategoryTypes'

export function createEmptyAdminCategoryFormDraft(): AdminCategoryFormDraft {
  return {
    id: null,
    name: '',
    description: '',
    isActive: true,
    createdDate: null,
    updatedDate: null,
  }
}

export function mapCategoryAdminItemToListRow(
  item: CategoryAdminListItemDto,
): AdminCategoryListRow {
  return {
    id: item.id,
    name: item.name,
    description: item.description?.trim() || '—',
    postCount: item.postCount,
    isActive: item.isActive,
    statusLabel: item.isActive ? 'Aktif' : 'Pasif',
  }
}

export function mapCategoryResponseToFormDraft(
  item: CategoryResponseDto,
): AdminCategoryFormDraft {
  return {
    id: item.id,
    name: item.name,
    description: item.description ?? '',
    isActive: item.isActive,
    createdDate: item.createdDate,
    updatedDate: item.updatedDate,
  }
}

export function validateAdminCategoryDraft(draft: AdminCategoryFormDraft): string | null {
  if (!draft.name.trim()) {
    return 'Kategori adı zorunludur.'
  }

  if (draft.name.trim().length > 100) {
    return 'Kategori adı en fazla 100 karakter olabilir.'
  }

  if (draft.description.trim().length > 500) {
    return 'Açıklama en fazla 500 karakter olabilir.'
  }

  return null
}

export function mapDraftToCreateRequest(draft: AdminCategoryFormDraft): CreateCategoryRequest {
  const description = draft.description.trim()

  return {
    name: draft.name.trim(),
    description: description.length > 0 ? description : null,
  }
}

export function mapDraftToUpdateRequest(draft: AdminCategoryFormDraft): UpdateCategoryRequest {
  const description = draft.description.trim()

  return {
    id: draft.id!,
    name: draft.name.trim(),
    description: description.length > 0 ? description : null,
    isActive: draft.isActive,
  }
}
