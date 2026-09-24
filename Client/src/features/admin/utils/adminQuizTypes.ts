export type AdminQuizStatusFilter = 'all' | 'active' | 'passive'

export type AdminQuizStatus = 'active' | 'passive'

export type AdminQuizListRow = {
  id: string
  title: string
  category: string
  categoryKey: string
  description: string
  questionCount: number
  totalPoints: number
  participationLabel: string
  participation: number
  avgSuccessLabel: string
  status: AdminQuizStatus
  statusLabel: string
  icon: string
}

export type AdminQuizOption = {
  id: string
  label: string
  text: string
  isCorrect: boolean
}

export type AdminQuizQuestion = {
  id: string
  number: number
  text: string
  points: number
  typeLabel: string
  expanded: boolean
  options: AdminQuizOption[]
}

export type AdminQuizCreateDraft = {
  title: string
  description: string
  category: string
  durationLabel: string
  isLive: boolean
  questions: AdminQuizQuestion[]
  badgeName: string
  badgeRequirement: string
  plannedQuestionCount: number
  plannedMaxScore: number
}

export type AdminQuizEditQuestionSummary = {
  id: string
  numberLabel: string
  text: string
  correctAnswer: string
  points: number
  isActive: boolean
}

export type AdminQuizEditDraft = {
  id: string
  recordCode: string
  title: string
  description: string
  tags: Array<{ id: string; label: string; tone: string }>
  isLive: boolean
  questionCount: number
  totalPoints: number
  questions: AdminQuizEditQuestionSummary[]
  hiddenQuestionCount: number
  retakeRule: string
  timeLimit: string
  addToLeaderboard: boolean
  previewCategory: string
  durationLabel: string
  participationLabel: string
  participation: number
  participationTrend: string
  completionRate: string
  completionDetail: string
  averageScore: string
  averageNote: string
  topAudience: string
  topAudienceScore: string
  lastEditor: string
  lastUpdated: string
  publishedAt: string
}
