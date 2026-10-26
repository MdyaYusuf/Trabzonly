import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import quizService from '@/features/quizzes/quizService'
import { AdminQuizEditFormFields } from '../components/AdminQuizEditFormFields'
import { AdminQuizEditSidebar } from '../components/AdminQuizEditSidebar'
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
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
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

      const result = await quizService.getById(quizId!)

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setDraft(mapQuizResponseToEditDraft(result.data))
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
    }
  }

  async function handleDelete() {
    if (!draft || isDeleting) {
      return
    }

    const confirmed = window.confirm('Bu quizi silmek istediğine emin misin?')

    if (!confirmed) {
      return
    }

    setIsDeleting(true)

    const result = await quizService.remove(draft.id)

    setIsDeleting(false)

    if (result.success) {
      navigate('/yonetim/quizler')
    }
  }

  if (isLoading) {
    return (
      <main className="mx-auto max-w-[1360px] px-4 py-space-xl sm:px-6 lg:px-12">
        <p className="font-body text-body-md text-on-surface-variant">Quiz yükleniyor...</p>
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

  return (
    <div className="flex min-h-full flex-col">
      <main className="mx-auto flex w-full max-w-[1360px] flex-1 flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
        <header className="flex flex-col gap-space-md lg:flex-row lg:items-start lg:justify-between">
          <div className="flex max-w-3xl flex-col gap-space-xs">
            <nav
              aria-label="Breadcrumb"
              className="font-label flex flex-wrap items-center gap-space-xs text-label-md text-on-surface-variant"
            >
              <Link to="/yonetim" className="transition-colors hover:text-primary">
                Yönetim Masası
              </Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <Link to="/yonetim/quizler" className="transition-colors hover:text-primary">
                Quizler
              </Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="font-bold text-primary uppercase">Düzenle</span>
            </nav>
            <h1 className="font-headline text-headline-lg font-extrabold tracking-tight text-primary uppercase">
              Quiz Düzenle
            </h1>
            <p className="font-body text-body-md text-on-surface-variant">
              Metaveri ve soruları güncelle. Sorular kaydedildiğinde komple yenilenir.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm">
            <button
              type="button"
              disabled={isDeleting}
              onClick={() => {
                void handleDelete()
              }}
              className="font-label inline-flex items-center gap-1 border border-error px-space-md py-space-sm text-label-md text-error uppercase transition-colors hover:bg-error-container disabled:opacity-50"
            >
              Sil
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="font-label border border-outline-variant px-space-md py-space-sm text-label-md uppercase"
            >
              İptal
            </button>
            <button
              type="button"
              disabled={isSaving}
              onClick={() => {
                void handleSave()
              }}
              className="font-label inline-flex items-center gap-1 bg-primary-container px-space-md py-space-sm text-label-md font-bold tracking-wider text-on-primary uppercase disabled:opacity-50"
            >
              {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          </div>
        </header>

        {formError ? (
          <p className="font-body border border-error/40 bg-error-container/30 px-space-md py-space-sm text-body-sm text-error">
            {formError}
          </p>
        ) : null}

        <div className="grid grid-cols-1 items-start gap-gutter lg:grid-cols-12">
          <div className="lg:col-span-7">
            <AdminQuizEditFormFields
              draft={draft}
              onChange={updateField}
              onUpdateQuestion={updateQuestion}
              onSetCorrectOption={setCorrectOption}
              onUpdateOptionText={updateOptionText}
              onAddQuestion={addQuestion}
              onRemoveQuestion={removeQuestion}
              onToggleExpand={toggleExpand}
            />
          </div>
          <div className="lg:col-span-5">
            <AdminQuizEditSidebar draft={draft} />
          </div>
        </div>
      </main>

      <footer className="sticky bottom-0 border-t border-outline-variant/50 bg-surface-container-lowest px-4 py-space-md sm:px-6 lg:px-12">
        <div className="mx-auto flex w-full max-w-[1360px] justify-end gap-space-sm">
          <button
            type="button"
            onClick={handleCancel}
            className="font-label border border-outline-variant px-space-md py-space-sm text-label-md uppercase"
          >
            İptal
          </button>
          <button
            type="button"
            disabled={isSaving}
            onClick={() => {
              void handleSave()
            }}
            className="font-label inline-flex items-center gap-1 bg-primary-container px-space-md py-space-sm text-label-md font-bold tracking-wider text-on-primary uppercase disabled:opacity-50"
          >
            {isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
          </button>
        </div>
      </footer>
    </div>
  )
}
