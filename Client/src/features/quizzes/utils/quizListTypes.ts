export type QuizCategoryId =
  | 'all'
  | 'popular'
  | 'championships'
  | 'europe'
  | 'squads'
  | 'culture'

export type QuizSortOption = 'most-solved' | 'newest' | 'difficulty'

export type QuizDifficulty = 'easy' | 'medium' | 'hard' | 'advanced'

export type QuizBadgeTone = 'primary' | 'primary-container' | 'secondary' | 'tertiary'

export type QuizListCard = {
  id: string
  title: string
  excerpt: string
  categoryId: Exclude<QuizCategoryId, 'all' | 'popular'>
  categoryLabel: string
  categoryTone: QuizBadgeTone
  solvesLabel: string
  difficulty: QuizDifficulty
  difficultyLabel: string
  questionCount: number
  durationMinutes: number
  participantsLabel: string
  isPopular?: boolean
  imageTone: string
  imageUrl?: string
}

export type QuizFeatured = {
  id: string
  seriesNumber: string
  seriesLabel: string
  difficultyLabel: string
  badge: string
  popularityLabel: string
  title: string
  excerpt: string
  questionCount: number
  durationMinutes: number
  pointsLabel: string
  rating: number
  ratingCount: number
  friendsLabel: string
  imageUrl?: string
}

export type LeaderboardEntry = {
  rank: number
  username: string
  badge?: string
  verified?: boolean
  points: number
  pointsLabel?: string
  compact?: boolean
}

export type DailyQuestion = {
  prompt: string
  pointsLabel: string
  options: { id: string; label: string }[]
}
