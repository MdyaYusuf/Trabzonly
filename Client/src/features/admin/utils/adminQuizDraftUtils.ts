import type {
  CreateQuestionRequest,
  CreateQuizRequest,
  QuizCategoryResponseDto,
  QuizResponseDto,
  UpdateQuizRequest,
} from '@/features/quizzes/quizTypes'
import type {
  AdminQuizCreateDraft,
  AdminQuizEditDraft,
  AdminQuizListRow,
  AdminQuizOption,
  AdminQuizQuestion,
  AdminQuizStatus,
} from './adminQuizTypes'

const OPTION_LABELS = ['A', 'B', 'C', 'D'] as const

export function buildAdminQuizCategoryFilterOptions(
  categories: QuizCategoryResponseDto[],
): { value: string; label: string }[] {
  return [
    { value: 'all', label: 'Kategori: Tümü' },
    ...categories.map((category) => ({
      value: String(category.id),
      label: category.name,
    })),
  ]
}

export function createEmptyAdminQuestion(number: number): AdminQuizQuestion {
  return {
    id: `q-${number}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    number,
    text: '',
    explanation: '',
    points: 10,
    expanded: true,
    options: OPTION_LABELS.map((label, index) => ({
      id: `opt-${number}-${label}-${Date.now()}`,
      label,
      text: '',
      isCorrect: index === 0,
    })),
  }
}

export function createEmptyAdminQuizCreateDraft(
  defaultCategoryId: number = 0,
): AdminQuizCreateDraft {
  return {
    title: '',
    description: '',
    quizCategoryId: defaultCategoryId,
    isActive: true,
    questions: [createEmptyAdminQuestion(1)],
  }
}

export function mapQuizResponseToListRow(quiz: QuizResponseDto): AdminQuizListRow {
  const status: AdminQuizStatus = quiz.isActive ? 'active' : 'passive'
  const totalPoints = quiz.questions.reduce((sum, question) => sum + question.points, 0)

  return {
    id: quiz.id,
    title: quiz.title,
    quizCategoryId: quiz.quizCategoryId,
    categoryLabel: quiz.categoryName,
    description: quiz.description?.trim() || '—',
    questionCount: quiz.questions.length,
    totalPoints,
    status,
    statusLabel: quiz.isActive ? 'Aktif' : 'Pasif',
  }
}

export function mapQuizResponseToEditDraft(quiz: QuizResponseDto): AdminQuizEditDraft {
  const ordered = [...quiz.questions].sort((a, b) => a.sortOrder - b.sortOrder)

  return {
    id: quiz.id,
    title: quiz.title,
    description: quiz.description ?? '',
    quizCategoryId: quiz.quizCategoryId,
    isActive: quiz.isActive,
    questions: ordered.map((question, index) => {
      const options: AdminQuizOption[] = question.answers.map((answer, answerIndex) => ({
        id: answer.id,
        label: OPTION_LABELS[answerIndex] ?? String(answerIndex + 1),
        text: answer.text,
        isCorrect: answer.isCorrect,
      }))

      while (options.length < 4) {
        const label = OPTION_LABELS[options.length] ?? String(options.length + 1)
        options.push({
          id: `pad-${question.id}-${label}`,
          label,
          text: '',
          isCorrect: false,
        })
      }

      if (!options.some((option) => option.isCorrect) && options[0]) {
        options[0].isCorrect = true
      }

      return {
        id: question.id,
        number: index + 1,
        text: question.text,
        explanation: question.explanation ?? '',
        points: question.points,
        expanded: index === 0,
        options: options.slice(0, 4),
      }
    }),
  }
}

export function mapDraftQuestionsToRequest(
  questions: AdminQuizQuestion[],
): CreateQuestionRequest[] {
  return questions.map((question, index) => ({
    text: question.text.trim(),
    explanation: question.explanation.trim() || undefined,
    points: question.points > 0 ? question.points : 10,
    sortOrder: index,
    answers: question.options.map((option) => ({
      text: option.text.trim(),
      isCorrect: option.isCorrect,
    })),
  }))
}

export function mapCreateDraftToRequest(draft: AdminQuizCreateDraft): CreateQuizRequest {
  return {
    title: draft.title.trim(),
    description: draft.description.trim() || undefined,
    quizCategoryId: draft.quizCategoryId,
    isActive: draft.isActive,
    questions: mapDraftQuestionsToRequest(draft.questions),
  }
}

export function mapEditDraftToRequest(draft: AdminQuizEditDraft): UpdateQuizRequest {
  return {
    id: draft.id,
    title: draft.title.trim(),
    description: draft.description.trim() || undefined,
    quizCategoryId: draft.quizCategoryId,
    isActive: draft.isActive,
    questions: mapDraftQuestionsToRequest(draft.questions),
  }
}

export function validateAdminQuizDraft(draft: {
  title: string
  quizCategoryId: number
  questions: AdminQuizQuestion[]
}): string | null {
  if (!draft.title.trim()) {
    return 'Quiz başlığı zorunludur.'
  }

  if (draft.quizCategoryId < 1) {
    return 'Bir kategori seçin.'
  }

  if (draft.questions.length === 0) {
    return 'En az bir soru ekleyin.'
  }

  for (const question of draft.questions) {
    if (!question.text.trim()) {
      return `Soru ${question.number} metni boş olamaz.`
    }

    if (question.options.length !== 4) {
      return `Soru ${question.number} tam 4 şık içermelidir.`
    }

    if (question.options.some((option) => !option.text.trim())) {
      return `Soru ${question.number} için tüm şıkları doldurun.`
    }

    const correctCount = question.options.filter((option) => option.isCorrect).length

    if (correctCount !== 1) {
      return `Soru ${question.number} için tam bir doğru şık seçin.`
    }
  }

  return null
}

export function resolveCategoryName(
  categories: QuizCategoryResponseDto[],
  quizCategoryId: number,
): string {
  return categories.find((category) => category.id === quizCategoryId)?.name ?? 'Kategori'
}
