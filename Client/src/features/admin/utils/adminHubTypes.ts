export type AdminNavBadgeTone = 'count' | 'alert' | 'none'

export type AdminNavItem = {
  id: string
  label: string
  to: string
  icon: string
  badge?: string
  badgeTone?: AdminNavBadgeTone
}

export type AdminModuleBadgeTone = 'neutral' | 'warning' | 'success' | 'info'

export type AdminModuleCard = {
  id: string
  title: string
  description: string
  categoryLabel: string
  badgeLabel: string
  badgeTone: AdminModuleBadgeTone
  icon: string
  to: string
}

export type AdminHubProfile = {
  title: string
  description: string
  permissionLabel: string
  permissionValue: string
  systemStatusLabel: string
  systemStatusValue: string
  versionLabel: string
  breadcrumbRoot: string
  breadcrumbCurrent: string
  modules: AdminModuleCard[]
}

export type AdminShellProfile = {
  brandTitle: string
  brandSubtitle: string
  navHeading: string
  adminName: string
  adminRole: string
  adminInitials: string
  footerLeft: string
  footerRight: string
  navItems: AdminNavItem[]
}
