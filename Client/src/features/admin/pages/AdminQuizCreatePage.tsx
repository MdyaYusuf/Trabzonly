import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AdminQuizCreateFormFields } from '../components/AdminQuizCreateFormFields'
import { AdminQuizCreateSidebar } from '../components/AdminQuizCreateSidebar'
import { defaultAdminQuizCreateDraft } from '../utils/adminQuizPlaceholders'
import type { AdminQuizCreateDraft, AdminQuizQuestion } from '../utils/adminQuizTypes'

export function AdminQuizCreatePage() {
  const navigate = useNavigate()
  const [draft, setDraft] = useState<AdminQuizCreateDraft>(defaultAdminQuizCreateDraft)

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
      const newQuestion: AdminQuizQuestion = {
        id: `q${nextNumber}-${Date.now()}`,
        number: nextNumber,
        text: '',
        points: 10,
        typeLabel: 'Tek Seçimli',
        expanded: true,
        options: [
          { id: `q${nextNumber}a`, label: 'A', text: '', isCorrect: true },
          { id: `q${nextNumber}b`, label: 'B', text: '', isCorrect: false },
          { id: `q${nextNumber}c`, label: 'C', text: '', isCorrect: false },
          { id: `q${nextNumber}d`, label: 'D', text: '', isCorrect: false },
        ],
      }

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
    setDraft((prev) => ({
      ...prev,
      questions: prev.questions
        .filter((question) => question.id !== questionId)
        .map((question, index) => ({
          ...question,
          number: index + 1,
        })),
    }))
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

  function handleSave() {
    navigate('/yonetim/quizler')
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
              <span className="font-bold text-primary uppercase">Yeni Quiz Oluştur</span>
            </nav>
            <h1 className="font-headline text-headline-lg font-extrabold tracking-tight text-primary uppercase">
              Quiz Ekle
            </h1>
            <p className="font-body text-body-md text-on-surface-variant">
              <span className="font-bold text-primary">Kurgu Modu: İnteraktif Test</span>
              {' · '}
              Taraftarların bilgi birikimini ölçecek yeni interaktif soru seti ve puanlama kurgusu
              hazırlayın.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm">
            <button
              type="button"
              onClick={handleCancel}
              className="font-label inline-flex items-center gap-1 border border-outline-variant px-space-md py-space-sm text-label-md uppercase transition-colors hover:border-primary hover:text-primary"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
              İptal
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="font-label inline-flex items-center gap-1 border border-outline-variant px-space-md py-space-sm text-label-md uppercase transition-colors hover:border-primary hover:text-primary"
            >
              <span className="material-symbols-outlined text-[18px]">drafts</span>
              Taslak Olarak Kaydet
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="font-label inline-flex items-center gap-1 bg-primary-container px-space-md py-space-sm text-label-md font-bold tracking-wider text-on-primary uppercase transition-all hover:bg-primary"
            >
              <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
              Quiz&apos;i Yayınla
            </button>
          </div>
        </header>

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
          <p className="font-body flex items-start gap-1 text-body-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px]">info</span>
            Değişiklikler kaydedildikten sonra quiz taraftarların mobil ve masaüstü erişimine anında
            açılacaktır.
          </p>
          <div className="flex gap-space-sm">
            <button
              type="button"
              onClick={handleCancel}
              className="font-label border border-outline-variant px-space-md py-space-sm text-label-md uppercase transition-colors hover:border-primary hover:text-primary"
            >
              İptal
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="font-label inline-flex items-center gap-1 bg-primary-container px-space-md py-space-sm text-label-md font-bold tracking-wider text-on-primary uppercase transition-all hover:bg-primary"
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              Kaydet
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
