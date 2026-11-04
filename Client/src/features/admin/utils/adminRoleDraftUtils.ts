import type {
  CreateRoleRequest,
  RoleAdminListItemDto,
  RoleResponseDto,
  UpdateRoleRequest,
} from '@/features/roles/roleTypes'
import type { AdminRoleFormDraft, AdminRoleListRow } from './adminRoleTypes'

export function createEmptyAdminRoleFormDraft(): AdminRoleFormDraft {
  return {
    id: null,
    name: '',
    isSystem: false,
    memberCount: 0,
    createdDate: null,
    updatedDate: null,
  }
}

export function mapRoleAdminItemToListRow(item: RoleAdminListItemDto): AdminRoleListRow {
  return {
    id: item.id,
    name: item.name,
    memberCount: item.memberCount,
    isSystem: item.isSystem,
    statusLabel: item.isSystem ? 'Sistem' : 'Özel',
    createdDate: item.createdDate,
  }
}

export function mapRoleResponseToFormDraft(
  item: RoleResponseDto,
  memberCount = 0,
): AdminRoleFormDraft {
  return {
    id: item.id,
    name: item.name,
    isSystem: item.isSystem,
    memberCount,
    createdDate: item.createdDate,
    updatedDate: item.updatedDate,
  }
}

export function validateAdminRoleDraft(draft: AdminRoleFormDraft): string | null {
  const name = draft.name.trim()

  if (!name) {
    return 'Rol adı zorunludur.'
  }

  if (name.length < 2) {
    return 'Rol adı en az 2 karakter olmalıdır.'
  }

  if (name.length > 50) {
    return 'Rol adı en fazla 50 karakter olabilir.'
  }

  return null
}

export function mapDraftToCreateRequest(draft: AdminRoleFormDraft): CreateRoleRequest {
  return {
    name: draft.name.trim(),
  }
}

export function mapDraftToUpdateRequest(draft: AdminRoleFormDraft): UpdateRoleRequest {
  return {
    id: draft.id!,
    name: draft.name.trim(),
  }
}
