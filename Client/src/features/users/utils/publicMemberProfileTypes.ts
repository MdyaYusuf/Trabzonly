export type PublicMemberBadge = {
  id: string
  icon: string
  title: string
  description: string
}

export type PublicMemberStat = {
  id: string
  label: string
  value: string
  unit: string
}

export type PublicMemberPost = {
  id: string
  categoryLabel: string
  categoryTone: 'primary' | 'secondary' | 'tertiary'
  readTime: string
  publishedLabel: string
  title: string
  excerpt: string
  likeCount: number
  commentCount: number
  saveCount: number
  imageTone: string
}

export type PublicMemberSquad = {
  id: string
  formation: string
  rating: string
  votesLabel: string
  title: string
  keyPlayers: string
  boardLabel: string
  tacticLabel: string
  pitchTone: string
}

export type PublicMemberLegend = {
  id: string
  name: string
  title: string
  tone: string
  initials: string
}

export type PublicMemberActivity = {
  id: string
  kind: 'comment' | 'quiz' | 'squad'
  title: string
  detail: string
  timeLabel: string
}

export type PublicMemberTabId = 'posts' | 'squads' | 'quizzes' | 'comments'

export type PublicMemberTab = {
  id: PublicMemberTabId
  label: string
  icon: string
  count: number
}

export type PublicMemberProfile = {
  username: string
  displayName: string
  handle: string
  initials: string
  coverMotto: string
  stadiumLabel: string
  spiritLabel: string
  roleBadge: string
  levelBadge: string
  seatLabel: string
  location: string
  joinedLabel: string
  bio: string
  motto: string
  liveSessionLabel: string
  stats: PublicMemberStat[]
  badgePreviewIcons: string[]
  badgeExtraCount: number
  tabs: PublicMemberTab[]
  posts: PublicMemberPost[]
  squads: PublicMemberSquad[]
  featuredBadges: PublicMemberBadge[]
  quizAveragePercent: number
  legends: PublicMemberLegend[]
  unforgettableMatch: {
    dateLabel: string
    title: string
    scoreLabel: string
  }
  tribuneCharm: string
  activities: PublicMemberActivity[]
}
