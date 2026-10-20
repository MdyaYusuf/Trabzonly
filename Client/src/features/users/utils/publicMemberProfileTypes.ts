export type PublicMemberTabId = 'posts' | 'squads'

export type PublicMemberTab = {
  id: PublicMemberTabId
  label: string
  icon: string
  count: number
}

export type PublicMemberStat = {
  id: string
  label: string
  value: string
  unit: string
  title?: string
}
