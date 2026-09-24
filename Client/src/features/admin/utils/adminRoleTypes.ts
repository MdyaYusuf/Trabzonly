export type AdminRoleKindFilter = 'all' | 'system' | 'community'

export type AdminRoleKind = 'system' | 'community'

export type AdminRoleColor = 'bordo' | 'mavi' | 'amber' | 'gri'

export type AdminRoleListRow = {
  id: string
  name: string
  kind: AdminRoleKind
  kindLabel: string
  description: string
  accessTitle: string
  accessDetails: string[]
  memberCount: number
  memberCountLabel: string
  createdAt: string
  createdNote: string
  statusLabel: string
  isLocked: boolean
  icon: string
  iconTone: string
}

export type AdminRolePermission = {
  id: string
  label: string
  description: string
  enabled: boolean
}

export type AdminRolePermissionGroup = {
  id: string
  title: string
  icon: string
  permissions: AdminRolePermission[]
}

export type AdminRoleFormDraft = {
  id: string
  recordCode: string
  name: string
  code: string
  description: string
  color: AdminRoleColor
  isDefaultRegistrationRole: boolean
  isSystemRole: boolean
  permissionGroups: AdminRolePermissionGroup[]
  assignedMembers: number
  lastAssignedMember: string
  lastAssignedMeta: string
  criticalityLabel: string
  twoFactorLabel: string
  protocolVersion: string
  lastUpdated: string
  previewUsername: string
  previewAdminName: string
  previewAdminRole: string
}
