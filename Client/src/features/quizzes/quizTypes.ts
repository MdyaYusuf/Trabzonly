// Quiz category (table-backed)
export interface QuizCategoryResponseDto {
  id: number
  name: string
  description?: string | null
  imageUrl?: string | null
  isActive: boolean
}

export interface CreatedQuizCategoryResponseDto {
  id: number
  name: string
}

export interface CreateQuizCategoryRequest {
  name: string
  description?: string | null
  imageUrl?: string | null
  isActive: boolean
}

export interface UpdateQuizCategoryRequest {
  id: number
  name: string
  description?: string | null
  imageUrl?: string | null
  isActive: boolean
}

// Responses — admin / full (may include isCorrect)
export interface AnswerResponseDto {
  id: number
  text: string
  isCorrect: boolean
}

export interface QuestionResponseDto {
  id: number
  text: string
  explanation?: string
  points: number
  sortOrder: number
  answers: AnswerResponseDto[]
}

export interface QuizResponseDto {
  id: number
  title: string
  description?: string
  quizCategoryId: number
  categoryName: string
  categoryImageUrl?: string | null
  isActive: boolean
  questions: QuestionResponseDto[]
}

export interface UserQuizResultResponseDto {
  id: number
  quizId: number
  userId: string
  score: number
  maxScore: number
  completionTime: string
  completedAt: string
}

export interface CreatedQuizResponseDto {
  id: number
  title: string
}

export interface QuizAdminListItemDto {
  id: number
  title: string
  description?: string | null
  quizCategoryId: number
  categoryName: string
  questionCount: number
  isActive: boolean
}

export type QuizAdminSortOption = 'title-asc' | 'questions-asc' | 'questions-desc'

export interface QuizAdminListQuery {
  pageNumber?: number
  pageSize?: number
  search?: string
  isActive?: boolean
  quizCategoryId?: number
  sort?: QuizAdminSortOption
}

/** Public list payload — never includes questions, answers, or isCorrect. */
export interface QuizListItemDto {
  id: number
  title: string
  description?: string
  quizCategoryId: number
  categoryName: string
  categoryImageUrl?: string | null
  questionCount: number
  takenCount: number
  averageSuccessPercent?: number | null
  isActive: boolean
}

/** Take attempt answer — text only; never includes isCorrect or explanation. */
export interface QuizTakeAnswerDto {
  id: number
  text: string
}

export interface QuizTakeQuestionDto {
  id: number
  text: string
  points: number
  sortOrder: number
  answers: QuizTakeAnswerDto[]
}

export interface QuizTakeDto {
  id: number
  title: string
  description?: string
  quizCategoryId: number
  categoryName: string
  categoryImageUrl?: string | null
  questions: QuizTakeQuestionDto[]
}

// Per-question check
export interface CheckQuizAnswerRequest {
  quizId: number
  questionId: number
  answerId?: number | null
}

export interface CheckQuizAnswerResponse {
  isCorrect: boolean
  correctAnswerId: number
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
  profileImageUrl?: string | null
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
  quizCategoryId: number
  isActive: boolean
  questions: CreateQuestionRequest[]
}

export interface UpdateQuizRequest {
  id: number
  title: string
  description?: string
  quizCategoryId: number
  isActive: boolean
  /** When provided, replaces all quiz questions. */
  questions?: CreateQuestionRequest[]
}

export interface QuestionAnswerDto {
  questionId: number
  answerId: number
}

export interface SubmitQuizRequest {
  quizId: number
  completionTime: string
  answers: QuestionAnswerDto[]
}
