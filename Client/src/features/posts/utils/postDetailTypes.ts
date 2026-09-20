export type CommentSort = 'top' | 'newest' | 'tactical'

export type PostComment = {
  id: string
  initials: string
  username: string
  badge?: string
  badgeTone?: 'primary' | 'surface' | 'tertiary'
  avatarTone: 'primary' | 'secondary'
  timeLabel: string
  body: string
  upvotes: number
  downvotes: number
  replyCount?: number
  replies?: {
    id: string
    username: string
    badge?: string
    timeLabel: string
    body: string
    upvotes: number
  }[]
}

export type PostDetailProfile = {
  id: string
  categoryLabel: string
  breadcrumbTitle: string
  isEditorsPick: boolean
  publishedLabel: string
  dossierLabel: string
  readTimeLabel: string
  viewsLabel: string
  title: string
  lead: string
  author: {
    username: string
    roleBadge: string
    subtitle: string
    postsLabel: string
    readsLabel: string
    trustLabel: string
    imageUrl: string
  }
  heroImageUrl: string
  heroHudLabel: string
  heroHudStat: string
  heroCaption: string
  opening: string
  sections: { heading: string; body: string }[]
  tacticNote: { title: string; body: string }
  metricsTitle: string
  metricsSource: string
  playerMetrics: {
    name: string
    role: string
    nameTone: 'primary' | 'secondary'
    rows: { label: string; value: string; width: string; barClass: string }[]
  }[]
  tags: string[]
  likeCount: number
  dislikeCount: number
  endorsementLabel: string
  commentCount: number
  authorOtherPosts: {
    kicker: string
    kickerTone: 'primary' | 'secondary'
    title: string
    date: string
    reads: string
  }[]
  poll: {
    question: string
    options: { label: string; percent: number; votes: string; tone: 'primary' | 'secondary' }[]
    totalLabel: string
  }
  relatedPosts: { title: string; meta: string; imageUrl: string }[]
  comments: PostComment[]
}
