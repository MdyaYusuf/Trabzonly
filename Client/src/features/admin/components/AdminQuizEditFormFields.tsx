import type { QuizCategoryResponseDto } from '@/features/quizzes/quizTypes'
import type { AdminQuizEditDraft, AdminQuizQuestion } from '../utils/adminQuizTypes'
import { AdminQuizQuestionEditor } from './AdminQuizQuestionEditor'

type AdminQuizEditFormFieldsProps = {
  draft: AdminQuizEditDraft
  categories: QuizCategoryResponseDto[]
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
  categories,
  onChange,
  onUpdateQuestion,
  onSetCorrectOption,
  onUpdateOptionText,
  onAddQuestion,
  onRemoveQuestion,
  onToggleExpand,
}: AdminQuizEditFormFieldsProps) {
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
              Kategori <span className="text-error">*</span>
            </label>
            <select
              id="editCategory"
              className={inputClass}
              value={draft.quizCategoryId || ''}
              onChange={(event) => {
                onChange('quizCategoryId', Number(event.target.value))
              }}
            >
              <option value="" disabled>
                Kategori seçin
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
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
