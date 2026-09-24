export type AdminMemberStatusFilter = 'all' | 'active' | 'passive' | 'admins'

export type AdminMemberStatus = 'active' | 'passive' | 'suspended'

export type AdminMemberRole = 'admin' | 'moderator' | 'editor' | 'member' | 'community'

export type AdminMemberListRow = {
  id: string
  username: string
  email: string
  memberCode: string
  role: AdminMemberRole
  roleLabel: string
  status: AdminMemberStatus
  statusLabel: string
  postsLabel: string
  squadsLabel: string
  registeredAt: string
  isVerified?: boolean
  badgeLabel?: string
  initials: string
  avatarTone: string
  actionLabel: string
  actionTone: 'danger' | 'success' | 'restore'
}

export type AdminMemberDetailDraft = {
  id: string
  memberCode: string
  registryNo: string
  username: string
  email: string
  bio: string
  role: AdminMemberRole
  roleSummary: string
  isActive: boolean
  isVerified: boolean
  emailVerified: boolean
  verifiedLabel: string
  registeredAt: string
  registerChannel: string
  lastLogin: string
  lastLoginMeta: string
  location: string
  ipMask: string
  twoFactorActive: boolean
  passwordHashLabel: string
  postsCount: string
  postsNote: string
  squadsCount: string
  squadsNote: string
  quizzesCount: string
  quizzesNote: string
  likesCount: string
  likesNote: string
  reputationScore: number
  reputationLabel: string
  reputationNote: string
  engagementMonths: Array<{ label: string; height: string }>
  auditItems: Array<{
    id: string
    icon: string
    title: string
    detail: string
    badge?: string
    badgeTone?: string
    date?: string
  }>
  previewBadge: string
  previewRole: string
  membershipYear: string
  initials: string
  avatarTone: string
}
