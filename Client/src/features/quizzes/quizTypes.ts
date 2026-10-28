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
  quizCategoryId: number
  categoryName: string
  categoryImageUrl?: string | null
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
  quizCategoryId: number
  categoryName: string
  categoryImageUrl?: string | null
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
  id: string
  title: string
  description?: string
  quizCategoryId: number
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
