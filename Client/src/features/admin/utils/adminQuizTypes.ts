export type AdminQuizStatusFilter = 'all' | 'active' | 'passive'

export type AdminQuizStatus = 'active' | 'passive'

export type AdminQuizListRow = {
  id: string
  title: string
  quizCategoryId: number
  categoryLabel: string
  description: string
  questionCount: number
  totalPoints: number
  status: AdminQuizStatus
  statusLabel: string
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
  explanation: string
  points: number
  expanded: boolean
  options: AdminQuizOption[]
}

export type AdminQuizCreateDraft = {
  title: string
  description: string
  quizCategoryId: number
  isActive: boolean
  questions: AdminQuizQuestion[]
}

export type AdminQuizEditDraft = {
  id: string
  title: string
  description: string
  quizCategoryId: number
  isActive: boolean
  questions: AdminQuizQuestion[]
}
