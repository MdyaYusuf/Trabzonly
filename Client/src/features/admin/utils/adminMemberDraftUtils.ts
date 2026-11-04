import type {
  AdminUpdateUserRequest,
  UserAdminDetailDto,
  UserAdminListItemDto,
} from '@/features/users/userTypes'
import {
  DEFAULT_USER_DISPLAY_TAG,
  type UserDisplayTag,
} from '@/features/users/utils/userDisplayTags'
import type { AdminMemberFormDraft, AdminMemberListRow } from './adminMemberTypes'

function formatDateLabel(value: string): string {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value.slice(0, 10)
  }

  return date.toLocaleDateString('tr-TR')
}

function buildInitials(username: string): string {
  const cleaned = username.trim()

  if (!cleaned) {
    return '?'
  }

  const parts = cleaned.split(/[\s._-]+/).filter(Boolean)

  if (parts.length >= 2) {
    return `${parts[0]![0] ?? ''}${parts[1]![0] ?? ''}`.toUpperCase()
  }

  return cleaned.slice(0, 2).toUpperCase()
}

export function createEmptyAdminMemberFormDraft(): AdminMemberFormDraft {
  return {
    id: null,
    username: '',
    email: '',
    bio: '',
    displayTag: DEFAULT_USER_DISPLAY_TAG,
    profileImageUrl: null,
    roleId: 0,
    roleName: '',
    isAdmin: false,
    isActive: true,
    clearProfileImage: false,
    createdDate: null,
    updatedDate: null,
  }
}

export function mapUserAdminItemToListRow(item: UserAdminListItemDto): AdminMemberListRow {
  return {
    id: item.id,
    username: item.username,
    email: item.email,
    profileImageUrl: item.profileImageUrl ?? null,
    initials: buildInitials(item.username),
    roleId: item.roleId,
    roleName: item.roleName,
    isAdmin: item.roleName === 'Admin',
    isActive: item.isActive,
    statusLabel: item.isActive ? 'Aktif' : 'Pasif',
    postCount: item.postCount,
    squadCount: item.squadCount,
    createdDateLabel: formatDateLabel(item.createdDate),
  }
}

export function mapUserAdminDetailToFormDraft(item: UserAdminDetailDto): AdminMemberFormDraft {
  const displayTag = item.displayTag?.trim()

  return {
    id: item.id,
    username: item.username,
    email: item.email,
    bio: item.bio ?? '',
    displayTag: displayTag || DEFAULT_USER_DISPLAY_TAG,
    profileImageUrl: item.profileImageUrl ?? null,
    roleId: item.roleId,
    roleName: item.roleName,
    isAdmin: item.roleName === 'Admin',
    isActive: item.isActive,
    clearProfileImage: false,
    createdDate: item.createdDate,
    updatedDate: item.updatedDate ?? null,
  }
}

export function validateAdminMemberDraft(draft: AdminMemberFormDraft): string | null {
  const username = draft.username.trim()

  if (!username) {
    return 'Kullanıcı adı zorunludur.'
  }

  if (username.length < 3) {
    return 'Kullanıcı adı en az 3 karakter olmalıdır.'
  }

  if (username.length > 50) {
    return 'Kullanıcı adı en fazla 50 karakter olabilir.'
  }

  if (draft.bio.length > 400) {
    return 'Biyografi en fazla 400 karakter olabilir.'
  }

  if (!draft.displayTag.trim()) {
    return 'Görünen etiket seçilmelidir.'
  }

  if (draft.roleId < 1) {
    return 'Rol seçilmelidir.'
  }

  return null
}

export function mapDraftToAdminUpdateRequest(
  draft: AdminMemberFormDraft,
): AdminUpdateUserRequest {
  const bio = draft.bio.trim()

  return {
    username: draft.username.trim(),
    bio: bio.length > 0 ? bio : null,
    displayTag: draft.displayTag.trim() as UserDisplayTag,
    roleId: draft.roleId,
    isActive: draft.isActive,
    clearProfileImage: draft.clearProfileImage,
  }
}
