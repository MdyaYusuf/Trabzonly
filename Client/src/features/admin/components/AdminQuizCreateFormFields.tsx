import type { AdminQuizCreateDraft, AdminQuizQuestion } from '../utils/adminQuizTypes'

type AdminQuizCreateFormFieldsProps = {
  draft: AdminQuizCreateDraft
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
            * Zorunlu Alanlar
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
              placeholder="Örn: 2021-2022 Şampiyonluk Sezonu Hafıza Testi"
            />
            <p className="font-body mt-space-xs text-body-sm text-on-surface-variant">
              Masaüstü ve mobil tribün kartlarında görünecek ana başlık.
            </p>
          </div>

          <div>
            <label
              htmlFor="quizDescription"
              className="font-label mb-1 block text-label-md text-on-surface-variant"
            >
              Açıklama <span className="text-error">*</span>
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

          <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
            <div>
              <label
                htmlFor="quizCategory"
                className="font-label mb-1 block text-label-md text-on-surface-variant"
              >
                Kategori Seçimi
              </label>
              <select
                id="quizCategory"
                className={inputClass}
                value={draft.category}
                onChange={(event) => {
                  onChange('category', event.target.value)
                }}
              >
                <option value="tarih">Kulüp Tarihi</option>
                <option value="sampiyonluklar">Şampiyonluklar</option>
                <option value="kadrolar">Efsane Kadrolar</option>
                <option value="guncel">Güncel Kadro</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="quizDuration"
                className="font-label mb-1 block text-label-md text-on-surface-variant"
              >
                Tahmini Çözüm Süresi
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-on-surface-variant">
                  timer
                </span>
                <input
                  id="quizDuration"
                  className={`${inputClass} pl-10`}
                  value={draft.durationLabel}
                  onChange={(event) => {
                    onChange('durationLabel', event.target.value)
                  }}
                />
              </div>
            </div>
          </div>

          <label className="flex items-center justify-between gap-space-md border border-outline-variant/40 bg-surface-container-low px-space-md py-space-sm">
            <span>
              <span className="font-label block text-label-md font-bold text-on-surface uppercase">
                Aktif / Canlı Yayın Durumu
              </span>
              <span className="font-body text-body-sm text-on-surface-variant">
                Kaydedildiğinde sitede hemen aktif olsun ve ana akışa düşsün.
              </span>
            </span>
            <input
              type="checkbox"
              className="h-5 w-5 accent-primary"
              checked={draft.isLive}
              onChange={(event) => {
                onChange('isLive', event.target.checked)
              }}
            />
          </label>
        </div>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex flex-wrap items-center justify-between gap-space-sm border-b border-outline-variant/40 pb-space-sm">
          <div className="flex flex-wrap items-center gap-space-sm">
            <h2 className="font-headline text-headline-sm font-bold text-primary uppercase">
              Sorular & Doğru Şık Kurgusu
            </h2>
            <span className="font-kicker bg-secondary-container px-space-sm py-1 text-kicker text-on-secondary-container uppercase">
              {draft.questions.length} Aktif Soru
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
          {draft.questions.map((question) => (
            <article
              key={question.id}
              className="border border-outline-variant/40 bg-surface-container-low"
            >
              <div className="flex flex-wrap items-center justify-between gap-space-sm border-b border-outline-variant/30 px-space-md py-space-sm">
                <div className="flex flex-wrap items-center gap-space-sm">
                  <span className="material-symbols-outlined text-on-surface-variant">
                    drag_indicator
                  </span>
                  <span className="font-label text-label-md font-bold text-on-surface uppercase">
                    Soru {String(question.number).padStart(2, '0')}
                  </span>
                  <span className="font-kicker bg-surface-container-highest px-space-sm py-0.5 text-kicker text-on-surface-variant uppercase">
                    {question.typeLabel}
                  </span>
                  <span className="font-kicker inline-flex items-center gap-1 text-kicker text-tertiary-container uppercase">
                    <span className="material-symbols-outlined text-[14px]">award_star</span>
                    {question.points} Puan
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {!question.expanded && (
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
                  )}
                  <button
                    type="button"
                    aria-label="Soruyu sil"
                    onClick={() => {
                      onRemoveQuestion(question.id)
                    }}
                    className="flex h-8 w-8 items-center justify-center text-on-surface-variant hover:bg-error-container hover:text-error"
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
                    <div className="mb-space-sm flex flex-wrap items-center justify-between gap-space-sm">
                      <p className="font-kicker text-kicker text-on-surface-variant uppercase">
                        Şıklar & Doğru Cevap İşaretlemesi
                      </p>
                      <p className="font-body text-body-sm text-on-surface-variant">
                        Doğru şıkkı yanındaki alandan seçin
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
                    <button
                      type="button"
                      className="font-label mt-space-sm inline-flex items-center gap-1 text-label-md text-on-surface-variant uppercase hover:text-primary"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span>
                      Şık Ekle (E)
                    </button>
                  </div>
                </div>
              ) : (
                <p className="font-body px-space-md py-space-sm text-body-md text-on-surface-variant">
                  {question.text}
                </p>
              )}
            </article>
          ))}

          <button
            type="button"
            onClick={onAddQuestion}
            className="font-label border border-dashed border-outline-variant px-space-md py-space-md text-label-md text-on-surface-variant uppercase transition-colors hover:border-primary hover:text-primary"
          >
            + Yeni Soru Ekle (Soru {String(draft.questions.length + 1).padStart(2, '0')})
          </button>
        </div>
      </section>
    </div>
  )
}
