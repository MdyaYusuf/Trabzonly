export type PostCategoryId =
  | 'all'
  | 'taktik'
  | 'mac'
  | 'transfer'
  | 'tribun'
  | 'tarihce'
  | 'kulup'

export type FeedSortOption = 'newest' | 'popular' | 'discussed' | 'tactical'

export type CategoryBadgeTone = 'primary' | 'primary-container' | 'secondary'

export type FeedPostCard = {
  id: string
  categoryId: Exclude<PostCategoryId, 'all'>
  categoryLabel: string
  categoryTone: CategoryBadgeTone
  badge?: string
  badgeTone?: 'secondary' | 'tertiary'
  publishedLabel: string
  readTimeLabel?: string
  title: string
  excerpt: string
  authorInitials: string
  authorUsername: string
  authorRole: string
  authorAvatarTone: CategoryBadgeTone
  verified?: boolean
  likeCount: number
  dislikeCount: number
  commentCount: number
  featured?: boolean
  imageUrl?: string
  imageOverlayLabel?: string
  pollSnippet?: {
    label: string
    result: string
    votesLabel: string
  }
  showBookmark?: boolean
  showSaveLabel?: boolean
}
