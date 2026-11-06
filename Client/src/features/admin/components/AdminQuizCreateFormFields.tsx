import type { QuizCategoryResponseDto } from '@/features/quizzes/quizTypes'
import type { AdminQuizCreateDraft, AdminQuizQuestion } from '../utils/adminQuizTypes'
import { AdminQuizQuestionEditor } from './AdminQuizQuestionEditor'

type AdminQuizCreateFormFieldsProps = {
  draft: AdminQuizCreateDraft
  categories: QuizCategoryResponseDto[]
  onChange: <K extends keyof AdminQuizCreateDraft>(
    key: K,
    value: AdminQuizCreateDraft[K],
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

export function AdminQuizCreateFormFields({
  draft,
  categories,
  onChange,
  onUpdateQuestion,
  onSetCorrectOption,
  onUpdateOptionText,
  onAddQuestion,
  onRemoveQuestion,
  onToggleExpand,
}: AdminQuizCreateFormFieldsProps) {
  return (
    <div className="flex flex-col gap-space-md">
      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex flex-wrap items-center justify-between gap-space-sm border-b border-outline-variant/40 pb-space-sm">
          <h2 className="font-headline text-headline-sm font-bold text-primary uppercase">
            Temel Quiz Bilgileri
          </h2>
          <span className="font-kicker text-kicker text-on-surface-variant uppercase">
            Bölüm 01
          </span>
        </div>

        <div className="flex flex-col gap-space-md">
          <div>
            <label htmlFor="quizTitle" className="font-label mb-1 block text-label-md text-on-surface-variant">
              Başlık <span className="text-error">*</span>
            </label>
            <input
              id="quizTitle"
              className={inputClass}
              value={draft.title}
              onChange={(event) => {
                onChange('title', event.target.value)
              }}
              placeholder="Örn: Tarihçe ve İlkler - Paket 1"
            />
          </div>

          <div>
            <label
              htmlFor="quizDescription"
              className="font-label mb-1 block text-label-md text-on-surface-variant"
            >
              Açıklama
            </label>
            <textarea
              id="quizDescription"
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
              htmlFor="quizCategory"
              className="font-label mb-1 block text-label-md text-on-surface-variant"
            >
              Kategori <span className="text-error">*</span>
            </label>
            <select
              id="quizCategory"
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
        </div>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex flex-wrap items-center justify-between gap-space-sm border-b border-outline-variant/40 pb-space-sm">
          <h2 className="font-headline text-headline-sm font-bold text-primary uppercase">
            Durum
          </h2>
          <span className="font-kicker text-kicker text-on-surface-variant uppercase">
            Bölüm 02
          </span>
        </div>
        <div className="flex items-start justify-between gap-space-md border border-outline-variant/30 bg-surface-container-low px-space-md py-space-sm">
          <div>
            <p className="font-label text-label-md font-bold text-on-surface uppercase">
              {draft.isActive ? 'Aktif Quiz' : 'Pasif Quiz'}
            </p>
            <p className="font-body mt-1 text-body-sm text-on-surface-variant">
              {draft.isActive
                ? 'Quiz aktif. Taraftar listesinde görünür ve çözülebilir.'
                : 'Quiz pasif. Taraftar listesinde gizlidir.'}
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={draft.isActive}
            aria-label="Quiz durumunu değiştir"
            onClick={() => {
              onChange('isActive', !draft.isActive)
            }}
            className={`relative h-7 w-12 shrink-0 cursor-pointer transition-colors ${
              draft.isActive ? 'bg-primary' : 'bg-outline-variant'
            }`}
          >
            <span
              className={`absolute top-0.5 h-6 w-6 bg-surface-container-lowest transition-transform ${
                draft.isActive ? 'left-5' : 'left-0.5'
              }`}
            />
          </button>
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
