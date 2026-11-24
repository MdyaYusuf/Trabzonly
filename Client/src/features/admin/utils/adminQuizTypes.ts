import type { QuizAdminSortOption } from '@/features/quizzes/quizTypes'

export type AdminQuizStatusFilter = 'all' | 'active' | 'passive'

export type AdminQuizStatus = 'active' | 'passive'

export type AdminQuizSort = QuizAdminSortOption

export type AdminQuizListRow = {
  id: number
  title: string
  quizCategoryId: number
  categoryLabel: string
  description: string
  questionCount: number
  status: AdminQuizStatus
  statusLabel: string
}

/** Draft keys — API ids are numbers; new drafts use temp string keys. */
export type DraftKey = string | number

export type AdminQuizOption = {
  id: DraftKey
  label: string
  text: string
  isCorrect: boolean
}

export type AdminQuizQuestion = {
  id: DraftKey
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
  id: number
  title: string
  description: string
  quizCategoryId: number
  isActive: boolean
  questions: AdminQuizQuestion[]
}
