import type { QuizTakeAnswerDto } from '../quizTypes'
import { OPTION_LETTERS } from '../utils/quizFormat'

export type TakeQuestionFeedback = {
  isCorrect: boolean
  correctAnswerId: string
  explanation?: string
  selectedAnswerId: string | null
}

type TakeQuizQuestionPanelProps = {
  questionNumber: number
  categoryLabel: string
  points: number
  prompt: string
  options: QuizTakeAnswerDto[]
  phase: 'answering' | 'checking' | 'revealed'
  feedback: TakeQuestionFeedback | null
  onSelect: (optionId: string) => void
  onNext: () => void
  isLast: boolean
  isSubmitting: boolean
}

export function TakeQuizQuestionPanel({
  questionNumber,
  categoryLabel,
  points,
  prompt,
  options,
  phase,
  feedback,
  onSelect,
  onNext,
  isLast,
  isSubmitting,
}: TakeQuizQuestionPanelProps) {
  const canSelect = phase === 'answering'

  return (
    <section className="flex flex-col gap-space-lg border border-outline-variant/40 bg-surface-container-lowest p-space-lg">
      <div className="flex flex-wrap items-start justify-between gap-space-sm">
        <div className="flex items-center gap-space-xs">
          <span className="h-3 w-3 bg-primary" />
          <h2 className="font-kicker text-kicker font-bold tracking-widest text-primary uppercase">
            SORU #{questionNumber} • {categoryLabel}
          </h2>
        </div>
        <div className="font-label flex items-center gap-1 text-label-md font-bold text-tertiary-container uppercase">
          <span
            className="material-symbols-outlined text-[18px] text-tertiary-fixed-dim"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            military_tech
          </span>
          +{points} Puan
        </div>
      </div>

      <p className="font-headline text-headline-sm font-bold text-on-surface lg:text-headline-md">
        {prompt}
      </p>

      <div className="flex flex-col gap-space-sm" role="radiogroup" aria-label="Cevap seçenekleri">
        {options.map((option, index) => {
          const letter = OPTION_LETTERS[index] ?? String(index + 1)
          const isSelected = feedback?.selectedAnswerId === option.id
          const isCorrectOption =
            feedback != null && feedback.correctAnswerId === option.id
          const showReveal = phase === 'revealed' && feedback != null

          let optionClass =
            'flex w-full items-center gap-space-md border px-space-md py-space-md text-left transition-colors '

          if (showReveal && isCorrectOption) {
            optionClass += 'border-primary border-l-4 bg-secondary-container/50'
          } else if (showReveal && isSelected && !feedback.isCorrect) {
            optionClass += 'border-error border-l-4 bg-error-container/40'
          } else if (isSelected && phase !== 'revealed') {
            optionClass += 'border-primary border-l-4 bg-secondary-container/40'
          } else {
            optionClass +=
              'border-outline-variant/50 bg-surface hover:border-primary/40 hover:bg-surface-container-low'
          }

          if (!canSelect) {
            optionClass += ' cursor-default'
          }

          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={!canSelect}
              onClick={() => {
                onSelect(option.id)
              }}
              className={optionClass}
            >
              <span
                className={`font-headline flex h-10 w-10 shrink-0 items-center justify-center text-headline-sm font-bold ${
                  showReveal && isCorrectOption
                    ? 'bg-primary text-on-primary'
                    : showReveal && isSelected && !feedback.isCorrect
                      ? 'bg-error text-on-error'
                      : isSelected
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container-high text-on-surface'
                }`}
              >
                {letter}
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="font-label flex flex-wrap items-center gap-space-sm text-label-md font-bold text-on-surface">
                  {option.text}
                  {showReveal && isCorrectOption ? (
                    <span className="font-kicker bg-primary px-space-xs py-0.5 text-kicker text-on-primary uppercase">
                      Doğru
                    </span>
                  ) : null}
                  {showReveal && isSelected && !feedback.isCorrect ? (
                    <span className="font-kicker bg-error px-space-xs py-0.5 text-kicker text-on-error uppercase">
                      Senin seçimin
                    </span>
                  ) : null}
                </span>
              </span>
              {showReveal && isCorrectOption ? (
                <span className="material-symbols-outlined text-primary">check_circle</span>
              ) : null}
              {showReveal && isSelected && !feedback.isCorrect ? (
                <span className="material-symbols-outlined text-error">cancel</span>
              ) : null}
            </button>
          )
        })}
      </div>

      {phase === 'checking' ? (
        <p className="font-body text-body-sm text-on-surface-variant">Cevap kontrol ediliyor...</p>
      ) : null}

      {phase === 'revealed' && feedback ? (
        <div
          className={`flex flex-col gap-space-sm border-l-4 px-space-md py-space-sm ${
            feedback.isCorrect
              ? 'border-primary bg-secondary-container/30'
              : 'border-error bg-error-container/30'
          }`}
        >
          <p className="font-label text-label-md font-bold uppercase">
            {feedback.isCorrect
              ? 'Doğru!'
              : feedback.selectedAnswerId == null
                ? 'Süre doldu — yanlış sayıldı'
                : 'Yanlış'}
          </p>
          {feedback.explanation?.trim() ? (
            <p className="font-body text-body-sm text-on-surface-variant">
              <span className="font-bold text-on-surface">Açıklama: </span>
              {feedback.explanation.trim()}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="flex flex-col gap-space-sm border-t border-outline-variant/40 pt-space-md sm:flex-row sm:items-center sm:justify-end">
        {phase === 'revealed' ? (
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onNext}
            className="font-label inline-flex items-center justify-center gap-space-xs bg-primary-container px-space-lg py-space-sm text-label-md font-bold tracking-wider text-on-primary uppercase transition-all hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? 'Sonuç kaydediliyor...'
              : isLast
                ? 'Bitir & Sonucu Gör'
                : 'Sonraki Soru'}
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        ) : (
          <p className="font-body text-body-sm text-on-surface-variant">
            Bir seçenek seç veya süre dolsun.
          </p>
        )}
      </div>
    </section>
  )
}
