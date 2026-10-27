/** Matches Api.Features.Quizzes.QuizCategory (JSON number). */
export const QuizCategory = {
  HistoryAndFirsts: 1,
  FacilitiesAndRecords: 2,
  EternalRivalry: 3,
  ChampionshipsAndAchievements: 4,
} as const

export type QuizCategory = (typeof QuizCategory)[keyof typeof QuizCategory]

// Responses — admin / full (may include isCorrect)
export interface AnswerResponseDto {
  id: string
  text: string
  isCorrect: boolean
}

export interface QuestionResponseDto {
  id: string
  text: string
  explanation?: string
  points: number
  sortOrder: number
  answers: AnswerResponseDto[]
}

export interface QuizResponseDto {
  id: string
  title: string
  description?: string
  category: QuizCategory
  isActive: boolean
  questions: QuestionResponseDto[]
}

export interface UserQuizResultResponseDto {
  id: string
  quizId: string
  userId: string
  score: number
  maxScore: number
  completionTime: string
  completedAt: string
}

export interface CreatedQuizResponseDto {
  id: string
  title: string
}

/** Public list payload — never includes questions, answers, or isCorrect. */
export interface QuizListItemDto {
  id: string
  title: string
  description?: string
  category: QuizCategory
  questionCount: number
  takenCount: number
  averageSuccessPercent?: number | null
  isActive: boolean
}

/** Take attempt answer — text only; never includes isCorrect or explanation. */
export interface QuizTakeAnswerDto {
  id: string
  text: string
}

export interface QuizTakeQuestionDto {
  id: string
  text: string
  points: number
  sortOrder: number
  answers: QuizTakeAnswerDto[]
}

export interface QuizTakeDto {
  id: string
  title: string
  description?: string
  category: QuizCategory
  questions: QuizTakeQuestionDto[]
}

// Per-question check
export interface CheckQuizAnswerRequest {
  quizId: string
  questionId: string
  answerId?: string | null
}

export interface CheckQuizAnswerResponse {
  isCorrect: boolean
  correctAnswerId: string
  explanation?: string
}

// Platform / leaderboard / me stats
export interface QuizPlatformStatsDto {
  totalQuizzes: number
  topUsername?: string | null
}

export interface QuizLeaderboardEntryDto {
  rank: number
  username: string
  averageScore: number
  averageCompletionTime: string
  distinctQuizCount: number
}

export interface QuizUserStatsDto {
  averageScore: number
  averageCompletionTime: string
  attemptsCount: number
  distinctQuizCount: number
}

// Requests — admin create/update
export interface CreateAnswerRequest {
  text: string
  isCorrect: boolean
}

export interface CreateQuestionRequest {
  text: string
  explanation?: string
  points: number
  sortOrder: number
  answers: CreateAnswerRequest[]
}

export interface CreateQuizRequest {
  title: string
  description?: string
  category: QuizCategory
  isActive: boolean
  questions: CreateQuestionRequest[]
}

export interface UpdateQuizRequest {
  id: string
  title: string
  description?: string
  category: QuizCategory
  isActive: boolean
  /** When provided, replaces all quiz questions. */
  questions?: CreateQuestionRequest[]
}

export interface QuestionAnswerDto {
  questionId: string
  answerId: string
}

export interface SubmitQuizRequest {
  quizId: string
  completionTime: string
  answers: QuestionAnswerDto[]
}
