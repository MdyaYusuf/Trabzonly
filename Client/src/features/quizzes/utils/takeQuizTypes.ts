export type TakeQuizOption = {
  id: string
  letter: string
  label: string
  subtitle: string
}

export type TakeQuizQuestion = {
  id: string
  index: number
  categoryLabel: string
  points: number
  prompt: string
  atmosphereLabel?: string
  atmosphereMeta?: string
  communityCorrectPercent?: number
  communityCorrectLabel?: string
  options: TakeQuizOption[]
  correctOptionId: string
}

export type TakeQuizSession = {
  id: string
  breadcrumbTitle: string
  title: string
  difficultyLabel: string
  questionCount: number
  pointsLabel: string
  timeLimitSeconds: number
  questions: TakeQuizQuestion[]
  player: {
    initials: string
    username: string
    subtitle: string
    pointsLabel: string
    accuracyLabel: string
  }
  badge: {
    title: string
    subtitle: string
    progressLabel: string
    note: string
  }
  rules: string[]
}

export type QuizResultReviewItem = {
  number: string
  prompt: string
  isCorrect: boolean
  yourAnswer: string
  correctAnswer?: string
  editorialNote?: string
}

export type QuizResultRecommended = {
  id: string
  pointsLabel: string
  difficultyLabel: string
  difficultyTone: 'error' | 'secondary'
  title: string
  titleTone: 'primary' | 'secondary'
  excerpt: string
  meta: string
}

export type QuizResultProfile = {
  quizId: string
  breadcrumbTitle: string
  statusLabel: string
  seasonLabel: string
  headline: string
  headlineAccent: string
  subheadline: string
  body: string
  titleEarned: string
  completionTime: string
  successPercent: number
  correctCount: number
  totalCount: number
  wrongCount: number
  pointsEarned: string
  badgeLevel: string
  badgeTitle: string
  badgeNote: string
  rankLabel: string
  rankPercent: string
  monthlyCompletions: string
  correctStatPercent: string
  wrongQuestionLabel: string
  speedPercentile: string
  avgSecondsLabel: string
  reviewItems: QuizResultReviewItem[]
  recommended: QuizResultRecommended[]
}
