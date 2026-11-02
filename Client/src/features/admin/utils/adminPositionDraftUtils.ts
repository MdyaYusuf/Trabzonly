import {
  PositionZone,
  type CreatePositionRequest,
  type PositionResponseDto,
  type PositionRoleRequest,
  type UpdatePositionRequest,
} from '@/features/positions/positionTypes'
import type {
  AdminPositionFormDraft,
  AdminPositionListRow,
  AdminPositionRoleDraft,
} from './adminPositionTypes'

export function getPositionZoneLabel(zone: PositionZone): string {
  if (zone === PositionZone.Goalkeeper) {
    return 'Kaleci'
  }

  if (zone === PositionZone.Defence) {
    return 'Savunma'
  }

  if (zone === PositionZone.Midfield) {
    return 'Orta Saha'
  }

  return 'Hücum'
}

export function createRoleClientKey(): string {
  return `role-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function createEmptyAdminPositionRoleDraft(
  sortOrder = 0,
): AdminPositionRoleDraft {
  return {
    clientKey: createRoleClientKey(),
    id: null,
    name: '',
    description: '',
    sortOrder,
  }
}

export function createEmptyAdminPositionFormDraft(): AdminPositionFormDraft {
  return {
    id: null,
    name: '',
    abbreviation: '',
    zone: PositionZone.Midfield,
    roles: [],
    createdDate: null,
    updatedDate: null,
  }
}

export function mapPositionResponseToListRow(item: PositionResponseDto): AdminPositionListRow {
  const roles = [...(item.roles ?? [])].sort(
    (a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name, 'tr'),
  )

  return {
    id: item.id,
    name: item.name,
    abbreviation: item.abbreviation,
    zone: item.zone,
    zoneLabel: getPositionZoneLabel(item.zone),
    roleNames: roles.map((role) => role.name),
  }
}

export function mapPositionResponseToFormDraft(
  item: PositionResponseDto,
): AdminPositionFormDraft {
  const roles = [...(item.roles ?? [])]
    .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name, 'tr'))
    .map((role) => ({
      clientKey: `role-${role.id}`,
      id: role.id,
      name: role.name,
      description: role.description,
      sortOrder: role.sortOrder,
    }))

  return {
    id: item.id,
    name: item.name,
    abbreviation: item.abbreviation,
    zone: item.zone,
    roles,
    createdDate: item.createdDate,
    updatedDate: item.updatedDate,
  }
}

export function validateAdminPositionDraft(draft: AdminPositionFormDraft): string | null {
  if (!draft.name.trim()) {
    return 'Pozisyon adı zorunludur.'
  }

  if (draft.name.trim().length > 50) {
    return 'Pozisyon adı en fazla 50 karakter olabilir.'
  }

  if (!draft.abbreviation.trim()) {
    return 'Kısaltma zorunludur.'
  }

  if (draft.abbreviation.trim().length > 10) {
    return 'Kısaltma en fazla 10 karakter olabilir.'
  }

  for (let index = 0; index < draft.roles.length; index += 1) {
    const role = draft.roles[index]
    const roleNumber = index + 1

    if (!role.name.trim()) {
      return `Rol ${roleNumber}: ad zorunludur.`
    }

    if (role.name.trim().length > 80) {
      return `Rol ${roleNumber}: ad en fazla 80 karakter olabilir.`
    }

    if (!role.description.trim()) {
      return `Rol ${roleNumber}: açıklama zorunludur.`
    }

    if (role.description.trim().length > 300) {
      return `Rol ${roleNumber}: açıklama en fazla 300 karakter olabilir.`
    }
  }

  const roleNames = draft.roles.map((role) => role.name.trim().toLocaleLowerCase('tr'))
  const uniqueNames = new Set(roleNames)

  if (uniqueNames.size !== roleNames.length) {
    return 'Aynı pozisyon içinde rol adları benzersiz olmalıdır.'
  }

  return null
}

function mapDraftRolesToRequests(draft: AdminPositionFormDraft): PositionRoleRequest[] {
  return draft.roles.map((role, index) => ({
    id: role.id ?? undefined,
    name: role.name.trim(),
    description: role.description.trim(),
    sortOrder: index,
  }))
}

export function mapDraftToCreateRequest(draft: AdminPositionFormDraft): CreatePositionRequest {
  return {
    name: draft.name.trim(),
    abbreviation: draft.abbreviation.trim().toUpperCase(),
    zone: draft.zone,
    roles: mapDraftRolesToRequests(draft),
  }
}

export function mapDraftToUpdateRequest(draft: AdminPositionFormDraft): UpdatePositionRequest {
  return {
    id: draft.id!,
    ...mapDraftToCreateRequest(draft),
  }
}
