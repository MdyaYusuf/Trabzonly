// Responses
export interface AnswerResponseDto {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuestionResponseDto {
  id: string;
  text: string;
  points: number;
  answers: AnswerResponseDto[];
}

export interface QuizResponseDto {
  id: string;
  title: string;
  description?: string;
  isActive: boolean;
  questions: QuestionResponseDto[];
}

export interface UserQuizResultResponseDto {
  id: string;
  quizId: string;
  userId: string;
  score: number;
  completionTime: string;
  completedAt: string;
}

export interface CreatedQuizResponseDto {
  id: string;
  title: string;
}

// Requests
export interface CreateAnswerRequest {
  text: string;
  isCorrect: boolean;
}

export interface CreateQuestionRequest {
  text: string;
  points: number;
  answers: CreateAnswerRequest[];
}

export interface CreateQuizRequest {
  title: string;
  description?: string;
  questions: CreateQuestionRequest[];
}

export interface UpdateQuizRequest extends Omit<CreateQuizRequest, 'questions'> {
  id: string;
  isActive: boolean;
}

export interface QuestionAnswerDto {
  questionId: string;
  answerId: string;
}

export interface SubmitQuizRequest {
  quizId: string;
  userId: string;
  completionTime: string;
  answers: QuestionAnswerDto[];
}