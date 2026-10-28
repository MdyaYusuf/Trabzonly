import type { QuizTakeAnswerDto } from '../quizTypes'
import { OPTION_LETTERS, QUIZ_SECONDS_PER_QUESTION } from '../utils/quizFormat'

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
  remainingSeconds: number
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
  remainingSeconds,
  onSelect,
  onNext,
  isLast,
  isSubmitting,
}: TakeQuizQuestionPanelProps) {
  const canSelect = phase === 'answering'
  const timerUrgent = remainingSeconds <= 3
  const timerPercent =
    QUIZ_SECONDS_PER_QUESTION <= 0
      ? 0
      : Math.max(0, Math.min(100, (remainingSeconds / QUIZ_SECONDS_PER_QUESTION) * 100))

  return (
    <section className="relative flex flex-col gap-space-md overflow-hidden border border-outline-variant/40 bg-surface-container-lowest p-space-md">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-2.5 bg-surface-container-high"
      >
        <div
          className={`h-full transition-[width] duration-1000 ease-linear ${
            timerUrgent ? 'bg-error' : 'bg-secondary'
          }`}
          style={{ width: `${timerPercent}%` }}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-xs">
          <span className="h-2.5 w-2.5 bg-primary" />
          <h2 className="font-label text-body-md font-bold tracking-wider text-primary uppercase">
            SORU #{questionNumber} • {categoryLabel}
          </h2>
        </div>
        <div className="flex items-center gap-space-sm">
          <div
            className={`font-label flex items-center gap-1 text-body-md font-bold uppercase tabular-nums ${
              timerUrgent ? 'text-error' : 'text-secondary'
            }`}
            aria-live="polite"
            aria-label={`Kalan süre ${remainingSeconds} saniye`}
          >
            <span className="material-symbols-outlined text-[22px] leading-none">timer</span>
            {remainingSeconds}sn
          </div>
          <div className="font-label flex items-center gap-1 text-body-md font-bold text-tertiary-container uppercase">
            <span
              className="material-symbols-outlined text-[22px] text-tertiary-fixed-dim leading-none"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              military_tech
            </span>
            +{points} Puan
          </div>
        </div>
      </div>

      <div className="bg-on-surface/[0.03] px-space-md py-space-md sm:px-space-lg sm:py-space-md">
        <p className="font-label text-body-md leading-snug font-bold text-on-surface sm:text-body-lg">
          {prompt}
        </p>
      </div>

      <div className="flex flex-col gap-space-sm" role="radiogroup" aria-label="Cevap seçenekleri">
        {options.map((option, index) => {
          const letter = OPTION_LETTERS[index] ?? String(index + 1)
          const isSelected = feedback?.selectedAnswerId === option.id
          const isCorrectOption =
            feedback != null && feedback.correctAnswerId === option.id
          const showReveal = phase === 'revealed' && feedback != null

          let optionClass =
            'flex w-full items-center gap-space-sm border px-space-md py-space-sm text-left transition-colors '

          if (showReveal && isCorrectOption) {
            optionClass += 'border-success border-l-4 bg-success-container/60'
          } else if (showReveal && isSelected && !feedback.isCorrect) {
            optionClass += 'border-error border-l-4 bg-error-container/40'
          } else if (isSelected && phase !== 'revealed') {
            optionClass += 'border-primary border-l-4 bg-secondary-container/40'
          } else {
            optionClass +=
              'border-outline-variant/50 bg-surface hover:border-primary/40 hover:bg-surface-container-low'
          }

          if (canSelect) {
            optionClass += ' cursor-pointer'
          } else {
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
                className={`font-headline flex h-9 w-9 shrink-0 items-center justify-center text-label-md font-bold ${
                  showReveal && isCorrectOption
                    ? 'bg-success text-on-success'
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
                <span className="font-label flex flex-wrap items-center gap-space-xs text-body-md font-bold text-on-surface">
                  {option.text}
                  {showReveal && isCorrectOption ? (
                    <span className="font-kicker bg-success px-space-xs py-0.5 text-kicker font-bold text-on-success uppercase">
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
                <span
                  className="material-symbols-outlined shrink-0 text-[22px] text-success"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              ) : null}
              {showReveal && isSelected && !feedback.isCorrect ? (
                <span
                  className="material-symbols-outlined shrink-0 text-[22px] text-error"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  cancel
                </span>
              ) : null}
            </button>
          )
        })}
      </div>

      {phase === 'checking' ? (
        <p className="font-body text-body-sm text-on-surface-variant">Cevap kontrol ediliyor...</p>
      ) : null}

      <div className="border-t border-outline-variant/40 pt-space-sm">
        {phase === 'revealed' && feedback ? (
          <div
            className={`flex flex-col border-l-4 sm:flex-row sm:items-center ${
              feedback.isCorrect
                ? 'border-success bg-success-container/40'
                : 'border-error bg-error-container/30'
            }`}
          >
            <div className="flex min-w-0 flex-col gap-1 px-space-md py-space-sm sm:w-3/4">
              <p className="font-label text-label-md font-bold uppercase">
                {feedback.isCorrect
                  ? 'Doğru!'
                  : feedback.selectedAnswerId == null
                    ? 'Süre doldu — yanlış sayıldı'
                    : 'Yanlış'}
              </p>
              {feedback.explanation?.trim() ? (
                <p className="font-body line-clamp-2 text-body-sm text-on-surface-variant">
                  <span className="font-bold text-on-surface">Açıklama: </span>
                  {feedback.explanation.trim()}
                </p>
              ) : null}
            </div>
            <div className="flex shrink-0 px-space-md py-space-sm sm:w-1/4 sm:justify-end">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={onNext}
                className="font-label group inline-flex w-full cursor-pointer items-center justify-center gap-0.5 text-label-md font-bold tracking-wide text-secondary uppercase transition-colors hover:text-primary disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:justify-end"
              >
                <span className="material-symbols-outlined text-[18px] leading-none">fact_check</span>
                <span>
                  {isSubmitting
                    ? 'Kaydediliyor...'
                    : isLast
                      ? 'Bitir & Sonucu Gör'
                      : 'Sonraki Soru'}
                </span>
                <span className="material-symbols-outlined text-[18px] leading-none transition-transform group-hover:translate-x-0.5">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        ) : phase !== 'checking' ? (
          <p className="font-body text-body-sm text-on-surface-variant">
            Bir seçenek seç veya süre dolsun.
          </p>
        ) : null}
      </div>
    </section>
  )
}
