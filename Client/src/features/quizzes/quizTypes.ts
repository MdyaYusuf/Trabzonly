/** Matches Api.Features.Quizzes.QuizCategory (JSON number). */
export const QuizCategory = {
  HistoryAndFirsts: 1,
  FacilitiesAndRecords: 2,
  EternalRivalry: 3,
  ChampionshipsAndAchievements: 4,
} as const

export type QuizCategory = (typeof QuizCategory)[keyof typeof QuizCategory]

// Responses
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
  completionTime: string
  completedAt: string
}

export interface CreatedQuizResponseDto {
  id: string
  title: string
}

// Requests
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
  questions: CreateQuestionRequest[]
}

export interface UpdateQuizRequest {
  id: string
  title: string
  description?: string
  category: QuizCategory
  isActive: boolean
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
