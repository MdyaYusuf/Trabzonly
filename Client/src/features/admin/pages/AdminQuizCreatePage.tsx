import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import quizService from '@/features/quizzes/quizService'
import { AdminQuizCreateFormFields } from '../components/AdminQuizCreateFormFields'
import { AdminQuizCreateSidebar } from '../components/AdminQuizCreateSidebar'
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
  const [isSaving, setIsSaving] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

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

  async function handleSave(isActiveOverride?: boolean) {
    if (isSaving) {
      return
    }

    const nextDraft =
      isActiveOverride == null
        ? draft
        : {
            ...draft,
            isActive: isActiveOverride,
          }

    const validationError = validateAdminQuizDraft(nextDraft)

    if (validationError) {
      setFormError(validationError)
      return
    }

    setFormError(null)
    setIsSaving(true)

    const result = await quizService.add(mapCreateDraftToRequest(nextDraft))

    setIsSaving(false)

    if (result.success) {
      navigate('/yonetim/quizler')
    }
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
              <span className="font-bold text-primary uppercase">Yeni Quiz</span>
            </nav>
            <h1 className="font-headline text-headline-lg font-extrabold tracking-tight text-primary uppercase">
              Quiz Ekle
            </h1>
            <p className="font-body text-body-md text-on-surface-variant">
              Kategori, sorular (4 şık, bir doğru) ve açıklama ile yeni quiz oluştur.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm">
            <button
              type="button"
              onClick={handleCancel}
              className="font-label inline-flex items-center gap-1 border border-outline-variant px-space-md py-space-sm text-label-md uppercase transition-colors hover:border-primary hover:text-primary"
            >
              İptal
            </button>
            <button
              type="button"
              disabled={isSaving}
              onClick={() => {
                void handleSave(false)
              }}
              className="font-label inline-flex items-center gap-1 border border-outline-variant px-space-md py-space-sm text-label-md uppercase transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
            >
              Pasif Kaydet
            </button>
            <button
              type="button"
              disabled={isSaving}
              onClick={() => {
                void handleSave(true)
              }}
              className="font-label inline-flex items-center gap-1 bg-primary-container px-space-md py-space-sm text-label-md font-bold tracking-wider text-on-primary uppercase transition-all hover:bg-primary disabled:opacity-50"
            >
              {isSaving ? 'Kaydediliyor...' : 'Yayınla'}
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
            <AdminQuizCreateFormFields
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
            <AdminQuizCreateSidebar draft={draft} />
          </div>
        </div>
      </main>

      <footer className="sticky bottom-0 border-t border-outline-variant/50 bg-surface-container-lowest px-4 py-space-md sm:px-6 lg:px-12">
        <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-sm lg:flex-row lg:items-center lg:justify-between">
          <p className="font-body text-body-sm text-on-surface-variant">
            Kaydettikten sonra quiz yönetim listesinde görünür.
          </p>
          <div className="flex gap-space-sm">
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
        </div>
      </footer>
    </div>
  )
}
