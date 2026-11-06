import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import quizCategoryService from '@/features/quizzes/quizCategoryService'
import quizService from '@/features/quizzes/quizService'
import type { QuizCategoryResponseDto } from '@/features/quizzes/quizTypes'
import { AdminQuizDeleteModal } from '../components/AdminQuizDeleteModal'
import { AdminQuizEditFormFields } from '../components/AdminQuizEditFormFields'
import {
  createEmptyAdminQuestion,
  mapEditDraftToRequest,
  mapQuizResponseToEditDraft,
  validateAdminQuizDraft,
} from '../utils/adminQuizDraftUtils'
import type { AdminQuizEditDraft, AdminQuizQuestion } from '../utils/adminQuizTypes'

export function AdminQuizEditPage() {
  const { quizId } = useParams<{ quizId: string }>()
  const navigate = useNavigate()
  const [draft, setDraft] = useState<AdminQuizEditDraft | null>(null)
  const [categories, setCategories] = useState<QuizCategoryResponseDto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  useEffect(() => {
    if (!quizId) {
      setLoadError(true)
      setIsLoading(false)
      return
    }

    let cancelled = false

    async function loadQuiz() {
      setIsLoading(true)
      setLoadError(false)

      const [quizResult, categoryResult] = await Promise.all([
        quizService.getById(quizId!),
        quizCategoryService.getAllForAdmin(),
      ])

      if (cancelled) {
        return
      }

      if (categoryResult.success && categoryResult.data) {
        setCategories(categoryResult.data)
      } else {
        setCategories([])
      }

      if (quizResult.success && quizResult.data) {
        setDraft(mapQuizResponseToEditDraft(quizResult.data))
      } else {
        setDraft(null)
        setLoadError(true)
      }

      setIsLoading(false)
    }

    void loadQuiz()

    return () => {
      cancelled = true
    }
  }, [quizId])

  function updateField<K extends keyof AdminQuizEditDraft>(
    key: K,
    value: AdminQuizEditDraft[K],
  ) {
    setDraft((prev) => {
      if (!prev) {
        return prev
      }

      return {
        ...prev,
        [key]: value,
      }
    })
  }

  function updateQuestion(questionId: string, patch: Partial<AdminQuizQuestion>) {
    setDraft((prev) => {
      if (!prev) {
        return prev
      }

      return {
        ...prev,
        questions: prev.questions.map((question) =>
          question.id === questionId ? { ...question, ...patch } : question,
        ),
      }
    })
  }

  function setCorrectOption(questionId: string, optionId: string) {
    setDraft((prev) => {
      if (!prev) {
        return prev
      }

      return {
        ...prev,
        questions: prev.questions.map((question) => {
          if (question.id !== questionId) {
            return question
          }

          return {
            ...question,
            options: question.options.map((option) => ({
              ...option,
              isCorrect: option.id === optionId,
            })),
          }
        }),
      }
    })
  }

  function updateOptionText(questionId: string, optionId: string, text: string) {
    setDraft((prev) => {
      if (!prev) {
        return prev
      }

      return {
        ...prev,
        questions: prev.questions.map((question) => {
          if (question.id !== questionId) {
            return question
          }

          return {
            ...question,
            options: question.options.map((option) =>
              option.id === optionId ? { ...option, text } : option,
            ),
          }
        }),
      }
    })
  }

  function addQuestion() {
    setDraft((prev) => {
      if (!prev) {
        return prev
      }

      const nextNumber = prev.questions.length + 1

      return {
        ...prev,
        questions: [
          ...prev.questions.map((question) => ({ ...question, expanded: false })),
          createEmptyAdminQuestion(nextNumber),
        ],
      }
    })
  }

  function removeQuestion(questionId: string) {
    setDraft((prev) => {
      if (!prev || prev.questions.length <= 1) {
        return prev
      }

      return {
        ...prev,
        questions: prev.questions
          .filter((question) => question.id !== questionId)
          .map((question, index) => ({
            ...question,
            number: index + 1,
          })),
      }
    })
  }

  function toggleExpand(questionId: string) {
    setDraft((prev) => {
      if (!prev) {
        return prev
      }

      return {
        ...prev,
        questions: prev.questions.map((question) =>
          question.id === questionId
            ? { ...question, expanded: !question.expanded }
            : question,
        ),
      }
    })
  }

  function handleCancel() {
    navigate('/yonetim/quizler')
  }

  async function handleSave() {
    if (!draft || isSaving) {
      return
    }

    const validationError = validateAdminQuizDraft(draft)

    if (validationError) {
      setFormError(validationError)
      return
    }

    setFormError(null)
    setIsSaving(true)

    const result = await quizService.update(mapEditDraftToRequest(draft))

    setIsSaving(false)

    if (result.success) {
      navigate('/yonetim/quizler')
    } else {
      setFormError(result.message || 'Quiz güncellenemedi.')
    }
  }

  async function handleConfirmDelete() {
    if (!draft || isDeleting) {
      return
    }

    setIsDeleting(true)

    const result = await quizService.remove(draft.id)

    if (result.success) {
      navigate('/yonetim/quizler')
      return
    }

    setFormError(result.message || 'Quiz silinemedi.')
    setIsDeleting(false)
    setDeleteOpen(false)
  }

  const actionButtonClass =
    'font-label inline-flex h-10 w-[8.75rem] cursor-pointer items-center justify-center gap-1 border px-space-md text-label-md uppercase'

  if (isLoading) {
    return (
      <main className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
        <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
          Quiz yükleniyor...
        </p>
      </main>
    )
  }

  if (loadError || !draft) {
    return (
      <main className="mx-auto flex max-w-[1360px] flex-col gap-space-md px-4 py-space-xl sm:px-6 lg:px-12">
        <p className="font-body text-body-md text-on-surface-variant">Quiz bulunamadı.</p>
        <Link to="/yonetim/quizler" className="font-label text-label-md text-primary uppercase">
          Listeye dön
        </Link>
      </main>
    )
  }

  const actionButtons = (
    <div className="flex flex-wrap items-center justify-end gap-space-sm">
      <button
        type="button"
        disabled={isSaving}
        onClick={() => {
          void handleSave()
        }}
        className={`${actionButtonClass} border-transparent bg-primary-container font-bold tracking-wider text-on-primary transition-all hover:bg-primary disabled:cursor-not-allowed disabled:opacity-50`}
      >
        <span className="material-symbols-outlined text-[18px]">save</span>
        Kaydet
      </button>
      <button
        type="button"
        onClick={handleCancel}
        className={`${actionButtonClass} border-outline-variant transition-colors hover:border-primary hover:text-primary`}
      >
        <span className="material-symbols-outlined text-[18px]">close</span>
        İptal
      </button>
      <button
        type="button"
        disabled={isDeleting}
        onClick={() => {
          setDeleteOpen(true)
        }}
        className={`${actionButtonClass} border-error text-error transition-colors hover:bg-error-container disabled:cursor-not-allowed disabled:opacity-40`}
      >
        <span className="material-symbols-outlined text-[18px]">delete</span>
        Sil
      </button>
    </div>
  )

  return (
    <div className="flex min-h-full flex-col">
      <main className="mx-auto flex w-full max-w-[1360px] flex-1 flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
        <header className="flex flex-col gap-space-md lg:flex-row lg:items-start lg:justify-between">
          <div className="flex max-w-3xl flex-col gap-space-xs">
            <h1 className="font-headline text-headline-lg font-extrabold tracking-tight text-primary uppercase">
              Quiz Düzenle
            </h1>
            <p className="font-body text-body-md text-on-surface-variant">
              Quiz bilgilerini, durumunu ve sorularını güncelleyin.
            </p>
          </div>

          {actionButtons}
        </header>

        {formError ? (
          <p className="font-body border border-error/40 bg-error-container px-space-md py-space-sm text-body-md text-on-error-container">
            {formError}
          </p>
        ) : null}

        <AdminQuizEditFormFields
          draft={draft}
          categories={categories}
          onChange={updateField}
          onUpdateQuestion={updateQuestion}
          onSetCorrectOption={setCorrectOption}
          onUpdateOptionText={updateOptionText}
          onAddQuestion={addQuestion}
          onRemoveQuestion={removeQuestion}
          onToggleExpand={toggleExpand}
        />

        {actionButtons}
      </main>

      <AdminQuizDeleteModal
        open={deleteOpen}
        quizTitle={draft.title.trim() || 'Quiz'}
        isDeleting={isDeleting}
        onCancel={() => {
          if (isDeleting) {
            return
          }

          setDeleteOpen(false)
        }}
        onConfirm={() => {
          void handleConfirmDelete()
        }}
      />
    </div>
  )
}
