import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import quizCategoryService from '@/features/quizzes/quizCategoryService'
import quizService from '@/features/quizzes/quizService'
import type { QuizCategoryResponseDto } from '@/features/quizzes/quizTypes'
import { AdminQuizCreateFormFields } from '../components/AdminQuizCreateFormFields'
import {
  createEmptyAdminQuestion,
  createEmptyAdminQuizCreateDraft,
  mapCreateDraftToRequest,
  validateAdminQuizDraft,
} from '../utils/adminQuizDraftUtils'
import type { AdminQuizCreateDraft, AdminQuizQuestion } from '../utils/adminQuizTypes'

export function AdminQuizCreatePage() {
  const navigate = useNavigate()
  const [draft, setDraft] = useState<AdminQuizCreateDraft>(createEmptyAdminQuizCreateDraft)
  const [categories, setCategories] = useState<QuizCategoryResponseDto[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadCategories() {
      const result = await quizCategoryService.getAllForAdmin()

      if (cancelled) {
        return
      }

      if (result.success && result.data && result.data.length > 0) {
        setCategories(result.data)
        setDraft((prev) => {
          if (prev.quizCategoryId > 0) {
            return prev
          }

          return {
            ...prev,
            quizCategoryId: result.data![0]!.id,
          }
        })
      } else {
        setCategories([])
      }
    }

    void loadCategories()

    return () => {
      cancelled = true
    }
  }, [])

  function updateField<K extends keyof AdminQuizCreateDraft>(
    key: K,
    value: AdminQuizCreateDraft[K],
  ) {
    setDraft((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  function updateQuestion(questionId: string, patch: Partial<AdminQuizQuestion>) {
    setDraft((prev) => ({
      ...prev,
      questions: prev.questions.map((question) =>
        question.id === questionId ? { ...question, ...patch } : question,
      ),
    }))
  }

  function setCorrectOption(questionId: string, optionId: string) {
    setDraft((prev) => ({
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
    }))
  }

  function updateOptionText(questionId: string, optionId: string, text: string) {
    setDraft((prev) => ({
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
    }))
  }

  function addQuestion() {
    setDraft((prev) => {
      const nextNumber = prev.questions.length + 1
      const newQuestion = createEmptyAdminQuestion(nextNumber)

      return {
        ...prev,
        questions: [
          ...prev.questions.map((question) => ({ ...question, expanded: false })),
          newQuestion,
        ],
      }
    })
  }

  function removeQuestion(questionId: string) {
    setDraft((prev) => {
      if (prev.questions.length <= 1) {
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
    setDraft((prev) => ({
      ...prev,
      questions: prev.questions.map((question) =>
        question.id === questionId
          ? { ...question, expanded: !question.expanded }
          : question,
      ),
    }))
  }

  function handleCancel() {
    navigate('/yonetim/quizler')
  }

  async function handleSave() {
    if (isSaving) {
      return
    }

    const validationError = validateAdminQuizDraft(draft)

    if (validationError) {
      setFormError(validationError)
      return
    }

    setFormError(null)
    setIsSaving(true)

    const result = await quizService.add(mapCreateDraftToRequest(draft))

    setIsSaving(false)

    if (result.success) {
      navigate('/yonetim/quizler')
    } else {
      setFormError(result.message || 'Quiz kaydedilemedi.')
    }
  }

  const actionButtonClass =
    'font-label inline-flex h-10 w-[8.75rem] cursor-pointer items-center justify-center gap-1 border px-space-md text-label-md uppercase'

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
        <span className="material-symbols-outlined text-[18px]">add</span>
        {isSaving ? 'Ekleniyor…' : 'Ekle'}
      </button>
      <button
        type="button"
        onClick={handleCancel}
        className={`${actionButtonClass} border-outline-variant transition-colors hover:border-primary hover:text-primary`}
      >
        <span className="material-symbols-outlined text-[18px]">close</span>
        İptal
      </button>
    </div>
  )

  return (
    <div className="flex min-h-full flex-col">
      <main className="mx-auto flex w-full max-w-[1360px] flex-1 flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
        <header className="flex flex-col gap-space-md lg:flex-row lg:items-start lg:justify-between">
          <div className="flex max-w-3xl flex-col gap-space-xs">
            <h1 className="font-headline text-headline-lg font-extrabold tracking-tight text-primary uppercase">
              Quiz Ekle
            </h1>
            <p className="font-body text-body-md text-on-surface-variant">
              Kategori, sorular ve yayın durumu ile yeni quiz oluşturun.
            </p>
          </div>

          {actionButtons}
        </header>

        {formError ? (
          <p className="font-body border border-error/40 bg-error-container px-space-md py-space-sm text-body-md text-on-error-container">
            {formError}
          </p>
        ) : null}

        <AdminQuizCreateFormFields
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
    </div>
  )
}
