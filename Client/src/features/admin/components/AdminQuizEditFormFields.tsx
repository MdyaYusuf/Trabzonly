import { QUIZ_CATEGORY_OPTIONS, getQuizCategoryIcon } from '@/features/quizzes/quizCategoryUtils'
import type { QuizCategory } from '@/features/quizzes/quizTypes'
import type { AdminQuizEditDraft, AdminQuizQuestion } from '../utils/adminQuizTypes'
import { AdminQuizQuestionEditor } from './AdminQuizQuestionEditor'

type AdminQuizEditFormFieldsProps = {
  draft: AdminQuizEditDraft
  onChange: <K extends keyof AdminQuizEditDraft>(
    key: K,
    value: AdminQuizEditDraft[K],
  ) => void
  onUpdateQuestion: (questionId: string, patch: Partial<AdminQuizQuestion>) => void
  onSetCorrectOption: (questionId: string, optionId: string) => void
  onUpdateOptionText: (questionId: string, optionId: string, text: string) => void
  onAddQuestion: () => void
  onRemoveQuestion: (questionId: string) => void
  onToggleExpand: (questionId: string) => void
}

const inputClass =
  'font-body w-full border border-outline-variant/50 bg-surface px-space-md py-space-sm text-body-md text-on-surface outline-none focus:border-primary'

export function AdminQuizEditFormFields({
  draft,
  onChange,
  onUpdateQuestion,
  onSetCorrectOption,
  onUpdateOptionText,
  onAddQuestion,
  onRemoveQuestion,
  onToggleExpand,
}: AdminQuizEditFormFieldsProps) {
  const categoryIcon = getQuizCategoryIcon(draft.category)

  return (
    <div className="flex flex-col gap-space-md">
      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex flex-wrap items-center justify-between gap-space-sm border-b border-outline-variant/40 pb-space-sm">
          <h2 className="font-headline text-headline-sm font-bold text-primary uppercase">
            Temel Metaveri
          </h2>
          <span className="font-kicker text-kicker text-on-surface-variant uppercase">
            Zorunlu Alanlar
          </span>
        </div>

        <div className="flex flex-col gap-space-md">
          <div>
            <label
              htmlFor="editTitle"
              className="font-label mb-1 block text-label-md text-on-surface-variant"
            >
              Başlık <span className="text-error">*</span>
            </label>
            <input
              id="editTitle"
              className={inputClass}
              value={draft.title}
              onChange={(event) => {
                onChange('title', event.target.value)
              }}
            />
          </div>

          <div>
            <label
              htmlFor="editDescription"
              className="font-label mb-1 block text-label-md text-on-surface-variant"
            >
              Açıklama
            </label>
            <textarea
              id="editDescription"
              rows={3}
              className={inputClass}
              value={draft.description}
              onChange={(event) => {
                onChange('description', event.target.value)
              }}
            />
          </div>

          <div>
            <label
              htmlFor="editCategory"
              className="font-label mb-1 block text-label-md text-on-surface-variant"
            >
              Kategori
            </label>
            <div className="flex items-center gap-space-sm">
              <select
                id="editCategory"
                className={inputClass}
                value={draft.category}
                onChange={(event) => {
                  onChange('category', Number(event.target.value) as QuizCategory)
                }}
              >
                {QUIZ_CATEGORY_OPTIONS.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span
                className="material-symbols-outlined shrink-0 text-[28px] text-secondary"
                title="Kategori ikonu (salt okunur)"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {categoryIcon}
              </span>
            </div>
          </div>

          <label className="flex items-center justify-between gap-space-md border border-outline-variant/40 bg-surface-container-low px-space-md py-space-sm">
            <span>
              <span className="font-label block text-label-md font-bold text-on-surface uppercase">
                Aktif Durumu
              </span>
              <span className="font-kicker mt-1 inline-block text-kicker text-secondary uppercase">
                {draft.isActive ? 'Yayında' : 'Pasif'}
              </span>
            </span>
            <input
              type="checkbox"
              className="h-5 w-5 accent-primary"
              checked={draft.isActive}
              onChange={(event) => {
                onChange('isActive', event.target.checked)
              }}
            />
          </label>
        </div>
      </section>

      <AdminQuizQuestionEditor
        questions={draft.questions}
        onUpdateQuestion={onUpdateQuestion}
        onSetCorrectOption={onSetCorrectOption}
        onUpdateOptionText={onUpdateOptionText}
        onAddQuestion={onAddQuestion}
        onRemoveQuestion={onRemoveQuestion}
        onToggleExpand={onToggleExpand}
      />
    </div>
  )
}
