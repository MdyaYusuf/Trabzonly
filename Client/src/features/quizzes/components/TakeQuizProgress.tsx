type QuestionStatus = 'upcoming' | 'current' | 'correct' | 'incorrect'

type TakeQuizProgressProps = {
  currentIndex: number
  total: number
  statuses: QuestionStatus[]
  remainingSeconds: number
  isTimerActive: boolean
}

function formatTime(totalSeconds: number) {
  const mins = Math.floor(totalSeconds / 60)
  const secs = totalSeconds % 60
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

export function TakeQuizProgress({
  currentIndex,
  total,
  statuses,
  remainingSeconds,
  isTimerActive,
}: TakeQuizProgressProps) {
  const completedCount = statuses.filter(
    (status) => status === 'correct' || status === 'incorrect',
  ).length
  const progressPercent = total === 0 ? 0 : Math.round((completedCount / total) * 100)
  const currentNumber = currentIndex + 1
  const timerUrgent = isTimerActive && remainingSeconds <= 3

  return (
    <section className="flex flex-col gap-space-md border border-outline-variant/50 bg-surface-container-lowest p-space-md">
      <div className="flex flex-col gap-space-md lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-space-sm">
          <div className="flex flex-wrap items-end justify-between gap-space-sm">
            <div className="flex items-baseline gap-space-xs">
              <span className="font-kicker text-kicker text-on-surface-variant uppercase">
                Soru Durumu
              </span>
              <span className="font-headline text-headline-md font-extrabold text-primary tabular-nums">
                {String(currentNumber).padStart(2, '0')}
              </span>
              <span className="font-label text-label-md text-on-surface-variant">/ {total}</span>
            </div>
            <span className="font-kicker text-kicker text-primary uppercase">
              %{progressPercent} Tamamlandı
            </span>
          </div>

          <div className="h-2 w-full overflow-hidden bg-surface-container-high">
            <div
              className="h-full bg-primary transition-[width] duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div
          className={`flex items-center gap-space-sm px-space-md py-space-sm ${
            timerUrgent
              ? 'bg-error text-on-error'
              : 'bg-primary-container text-on-primary'
          }`}
        >
          <span
            className={`material-symbols-outlined ${isTimerActive ? 'animate-pulse' : ''} ${
              timerUrgent ? '' : 'text-secondary-container'
            }`}
          >
            timer
          </span>
          <div className="flex flex-col">
            <span className="font-kicker text-kicker uppercase opacity-80">
              {isTimerActive ? 'Kalan Süre' : 'Süre Doldu'}
            </span>
            <span className="font-headline text-headline-sm font-bold tracking-wider tabular-nums">
              {formatTime(remainingSeconds)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {statuses.map((status, index) => {
          const number = index + 1
          let className =
            'font-label flex h-9 w-9 items-center justify-center text-label-md '

          if (status === 'current') {
            className += 'bg-secondary-container text-on-secondary-container font-bold'
          } else if (status === 'correct') {
            className += 'bg-primary text-on-primary'
          } else if (status === 'incorrect') {
            className += 'bg-error text-on-error'
          } else {
            className += 'bg-surface-container-high text-on-surface-variant'
          }

          return (
            <div
              key={number}
              aria-label={`Soru ${number}`}
              aria-current={status === 'current' ? 'step' : undefined}
              className={className}
            >
              {status === 'correct' ? (
                <span className="material-symbols-outlined text-[16px]">check</span>
              ) : status === 'incorrect' ? (
                <span className="material-symbols-outlined text-[16px]">close</span>
              ) : (
                number
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export type { QuestionStatus }
