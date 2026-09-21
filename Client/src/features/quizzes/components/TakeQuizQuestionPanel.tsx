import type { TakeQuizQuestion as Question } from '../utils/takeQuizTypes'

type TakeQuizQuestionPanelProps = {
  question: Question
  selectedOptionId: string | undefined
  isFirst: boolean
  isLast: boolean
  onSelect: (optionId: string) => void
  onPrevious: () => void
  onSkip: () => void
  onConfirm: () => void
}

export function TakeQuizQuestionPanel({
  question,
  selectedOptionId,
  isFirst,
  isLast,
  onSelect,
  onPrevious,
  onSkip,
  onConfirm,
}: TakeQuizQuestionPanelProps) {
  return (
    <section className="flex flex-col gap-space-lg border border-outline-variant/40 bg-surface-container-lowest p-space-lg">
      <div className="flex flex-wrap items-start justify-between gap-space-sm">
        <div className="flex items-center gap-space-xs">
          <span className="h-3 w-3 bg-primary" />
          <h2 className="font-kicker text-kicker font-bold tracking-widest text-primary uppercase">
            SORU #{question.index} • {question.categoryLabel}
          </h2>
        </div>
        <div className="font-label flex items-center gap-1 text-label-md font-bold text-tertiary-container uppercase">
          <span
            className="material-symbols-outlined text-[18px] text-tertiary-fixed-dim"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            military_tech
          </span>
          +{question.points} Puan
        </div>
      </div>

      <p className="font-headline text-headline-sm font-bold text-on-surface lg:text-headline-md">
        {question.prompt}
      </p>

      {(question.atmosphereLabel || question.atmosphereMeta) && (
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary via-primary-container to-secondary sm:h-56">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(140,206,253,0.25),transparent_40%)]" />
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-space-sm bg-gradient-to-t from-black/70 to-transparent p-space-md">
            {question.atmosphereLabel && (
              <span className="font-kicker flex items-center gap-1 text-kicker text-white uppercase">
                <span className="material-symbols-outlined text-[16px]">stadium</span>
                {question.atmosphereLabel}
              </span>
            )}
            {question.atmosphereMeta && (
              <span className="font-kicker text-kicker text-secondary-container uppercase">
                {question.atmosphereMeta}
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-space-sm" role="radiogroup" aria-label="Cevap seçenekleri">
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id

          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => {
                onSelect(option.id)
              }}
              className={`flex w-full items-center gap-space-md border px-space-md py-space-md text-left transition-colors ${
                isSelected
                  ? 'border-primary bg-secondary-container/40 border-l-4'
                  : 'border-outline-variant/50 bg-surface hover:border-primary/40 hover:bg-surface-container-low'
              }`}
            >
              <span
                className={`font-headline flex h-10 w-10 shrink-0 items-center justify-center text-headline-sm font-bold ${
                  isSelected
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-high text-on-surface'
                }`}
              >
                {option.letter}
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="font-label flex flex-wrap items-center gap-space-sm text-label-md font-bold text-on-surface">
                  {option.label}
                  {isSelected && (
                    <span className="font-kicker bg-primary px-space-xs py-0.5 text-kicker text-on-primary uppercase">
                      Seçiminiz
                    </span>
                  )}
                </span>
                <span className="font-body text-body-sm text-on-surface-variant">
                  {option.subtitle}
                </span>
              </span>
              {isSelected && (
                <span className="material-symbols-outlined text-primary">check</span>
              )}
            </button>
          )
        })}
      </div>

      <div className="flex flex-col gap-space-sm border-t border-outline-variant/40 pt-space-md sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          disabled={isFirst}
          onClick={onPrevious}
          className="font-label inline-flex items-center justify-center gap-space-xs border border-outline-variant px-space-md py-space-sm text-label-md uppercase transition-colors enabled:hover:border-primary enabled:hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Önceki Soru
        </button>

        <button
          type="button"
          onClick={onSkip}
          className="font-label text-label-md text-on-surface-variant uppercase underline-offset-4 transition-colors hover:text-primary hover:underline"
        >
          Soruyu Boş Bırak / Pas Geç
        </button>

        <button
          type="button"
          onClick={onConfirm}
          className="font-label inline-flex items-center justify-center gap-space-xs bg-primary-container px-space-lg py-space-sm text-label-md font-bold tracking-wider text-on-primary uppercase transition-all hover:bg-primary"
        >
          {isLast ? 'Cevabı Onayla & Bitir' : 'Cevabı Onayla & Sonraki Soru'}
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
    </section>
  )
}
