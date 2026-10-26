import type { AdminQuizQuestion } from '../utils/adminQuizTypes'

type AdminQuizQuestionEditorProps = {
  questions: AdminQuizQuestion[]
  onUpdateQuestion: (questionId: string, patch: Partial<AdminQuizQuestion>) => void
  onSetCorrectOption: (questionId: string, optionId: string) => void
  onUpdateOptionText: (questionId: string, optionId: string, text: string) => void
  onAddQuestion: () => void
  onRemoveQuestion: (questionId: string) => void
  onToggleExpand: (questionId: string) => void
}

const inputClass =
  'font-body w-full border border-outline-variant/50 bg-surface px-space-md py-space-sm text-body-md text-on-surface outline-none focus:border-primary'

export function AdminQuizQuestionEditor({
  questions,
  onUpdateQuestion,
  onSetCorrectOption,
  onUpdateOptionText,
  onAddQuestion,
  onRemoveQuestion,
  onToggleExpand,
}: AdminQuizQuestionEditorProps) {
  return (
    <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
      <div className="mb-space-md flex flex-wrap items-center justify-between gap-space-sm border-b border-outline-variant/40 pb-space-sm">
        <div className="flex flex-wrap items-center gap-space-sm">
          <h2 className="font-headline text-headline-sm font-bold text-primary uppercase">
            Sorular & Doğru Şık
          </h2>
          <span className="font-kicker bg-secondary-container px-space-sm py-1 text-kicker text-on-secondary-container uppercase">
            {questions.length} Soru
          </span>
        </div>
        <button
          type="button"
          onClick={onAddQuestion}
          className="font-label inline-flex items-center gap-1 text-label-md text-primary uppercase transition-colors hover:text-secondary"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          Soru Ekle
        </button>
      </div>

      <div className="flex flex-col gap-space-md">
        {questions.map((question) => (
          <article
            key={question.id}
            className="border border-outline-variant/40 bg-surface-container-low"
          >
            <div className="flex flex-wrap items-center justify-between gap-space-sm border-b border-outline-variant/30 px-space-md py-space-sm">
              <div className="flex flex-wrap items-center gap-space-sm">
                <span className="font-label text-label-md font-bold text-on-surface uppercase">
                  Soru {String(question.number).padStart(2, '0')}
                </span>
                <span className="font-kicker inline-flex items-center gap-1 text-kicker text-tertiary-container uppercase">
                  <span className="material-symbols-outlined text-[14px]">award_star</span>
                  {question.points} Puan
                </span>
              </div>
              <div className="flex items-center gap-1">
                {!question.expanded ? (
                  <button
                    type="button"
                    onClick={() => {
                      onToggleExpand(question.id)
                    }}
                    className="font-label inline-flex items-center gap-1 px-space-sm py-1 text-label-md uppercase text-on-surface-variant hover:text-primary"
                  >
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                    Genişlet
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      onToggleExpand(question.id)
                    }}
                    className="font-label inline-flex items-center gap-1 px-space-sm py-1 text-label-md uppercase text-on-surface-variant hover:text-primary"
                  >
                    Daralt
                  </button>
                )}
                <button
                  type="button"
                  aria-label="Soruyu sil"
                  disabled={questions.length <= 1}
                  onClick={() => {
                    onRemoveQuestion(question.id)
                  }}
                  className="flex h-8 w-8 items-center justify-center text-on-surface-variant hover:bg-error-container hover:text-error disabled:opacity-40"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>

            {question.expanded ? (
              <div className="flex flex-col gap-space-md p-space-md">
                <div>
                  <label className="font-label mb-1 block text-label-md text-on-surface-variant">
                    Soru Metni
                  </label>
                  <textarea
                    rows={2}
                    className={inputClass}
                    value={question.text}
                    onChange={(event) => {
                      onUpdateQuestion(question.id, { text: event.target.value })
                    }}
                  />
                </div>

                <div>
                  <label className="font-label mb-1 block text-label-md text-on-surface-variant">
                    Açıklama (opsiyonel)
                  </label>
                  <textarea
                    rows={2}
                    className={inputClass}
                    value={question.explanation}
                    onChange={(event) => {
                      onUpdateQuestion(question.id, { explanation: event.target.value })
                    }}
                    placeholder="Doğru cevap sonrası gösterilecek kısa açıklama"
                  />
                </div>

                <div>
                  <div className="mb-space-sm flex flex-wrap items-center justify-between gap-space-sm">
                    <p className="font-kicker text-kicker text-on-surface-variant uppercase">
                      4 Şık • Bir doğru cevap
                    </p>
                  </div>
                  <div className="flex flex-col gap-space-sm">
                    {question.options.map((option) => (
                      <div
                        key={option.id}
                        className={`flex flex-wrap items-center gap-space-sm border px-space-sm py-space-xs ${
                          option.isCorrect
                            ? 'border-secondary bg-secondary-fixed/40'
                            : 'border-outline-variant/40 bg-surface'
                        }`}
                      >
                        <span className="font-label w-6 text-label-md font-bold text-on-surface">
                          {option.label}
                        </span>
                        <input
                          className="font-body min-w-0 flex-1 border-0 bg-transparent px-space-sm py-space-xs text-body-md outline-none"
                          value={option.text}
                          onChange={(event) => {
                            onUpdateOptionText(question.id, option.id, event.target.value)
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            onSetCorrectOption(question.id, option.id)
                          }}
                          className={`font-label inline-flex items-center gap-1 px-space-sm py-1 text-label-md uppercase ${
                            option.isCorrect
                              ? 'bg-secondary text-on-secondary'
                              : 'text-on-surface-variant hover:text-primary'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            {option.isCorrect ? 'check_circle' : 'radio_button_unchecked'}
                          </span>
                          {option.isCorrect ? 'Doğru Şık' : 'Doğru Yap'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="font-body px-space-md py-space-sm text-body-md text-on-surface-variant">
                {question.text.trim() || 'Soru metni henüz girilmedi.'}
              </p>
            )}
          </article>
        ))}

        <button
          type="button"
          onClick={onAddQuestion}
          className="font-label border border-dashed border-outline-variant px-space-md py-space-md text-label-md text-on-surface-variant uppercase transition-colors hover:border-primary hover:text-primary"
        >
          + Yeni Soru Ekle (Soru {String(questions.length + 1).padStart(2, '0')})
        </button>
      </div>
    </section>
  )
}
