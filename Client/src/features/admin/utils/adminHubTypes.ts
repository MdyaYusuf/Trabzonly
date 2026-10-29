export type AdminNavItem = {
  id: string
  label: string
  to: string
  icon: string
}

export type AdminModuleCard = {
  id: string
  title: string
  description: string
  categoryLabel: string
  icon: string
  to: string
}

export type AdminHubProfile = {
  title: string
  description: string
  modules: AdminModuleCard[]
}

export type AdminShellProfile = {
  brandTitle: string
  brandSubtitle: string
  navHeading: string
  navItems: AdminNavItem[]
}
