export type AdminCategoryStatus = 'active' | 'inactive'

export type AdminCategoryStatusFilter = 'all' | 'active' | 'inactive'

export type AdminCategorySort =
  | 'posts-desc'
  | 'posts-asc'
  | 'alpha'
  | 'updated'

export type AdminCategoryAccent = 'bordo' | 'mavi'

export type AdminCategoryListRow = {
  id: string
  name: string
  slug: string
  description: string
  postCount: number
  postCountLabel: string
  status: AdminCategoryStatus
  statusLabel: string
  icon: string
  accent: AdminCategoryAccent
  updatedRank: number
}

export type AdminCategoryFormDraft = {
  id: string
  recordCode: string
  name: string
  slug: string
  description: string
  icon: string
  iconLabel: string
  accent: AdminCategoryAccent
  isPublished: boolean
  linkedPostsLabel: string
  linkedPostsCount: number
  totalReadsLabel: string
  createdBy: string
  lastUpdated: string
  statusDetail: string
  previewDateLabel: string
  previewTitle: string
}
