type QuestionStatus = 'upcoming' | 'current' | 'correct' | 'incorrect'

type TakeQuizProgressProps = {
  currentIndex: number
  total: number
  statuses: QuestionStatus[]
}

export function TakeQuizProgress({
  currentIndex,
  total,
  statuses,
}: TakeQuizProgressProps) {
  const completedCount = statuses.filter(
    (status) => status === 'correct' || status === 'incorrect',
  ).length
  const currentNumber = currentIndex + 1

  return (
    <section className="grid grid-cols-1 overflow-hidden sm:grid-cols-[7.5rem_1fr]">
      <div className="flex flex-col items-center justify-center gap-0.5 bg-secondary px-space-md py-space-sm text-on-secondary">
        <span className="font-headline text-headline-md font-extrabold leading-none tabular-nums">
          {String(currentNumber).padStart(2, '0')}
        </span>
        <span className="font-kicker text-kicker uppercase opacity-80">/ {total} soru</span>
      </div>

      <div className="flex flex-col justify-center gap-space-sm bg-primary px-space-md py-space-sm text-on-primary">
        <div className="flex flex-wrap items-center justify-between gap-x-space-md gap-y-1">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[20px] text-secondary-container">
              fact_check
            </span>
            <span className="font-label text-label-md font-bold tracking-wider uppercase">
              Soru Durumu
            </span>
          </div>
          <span className="font-label text-label-md font-bold tracking-wider text-secondary-container uppercase">
            {completedCount} tamamlandı
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5" role="list" aria-label="Soru adımları">
          {statuses.map((status, index) => {
            const number = index + 1
            let className =
              'font-label flex h-7 w-7 items-center justify-center text-label-md '

            if (status === 'current') {
              className += 'bg-secondary-container font-bold text-on-secondary-container'
            } else if (status === 'correct') {
              className += 'bg-success text-on-success'
            } else if (status === 'incorrect') {
              className += 'bg-error text-on-error'
            } else {
              className += 'bg-on-primary/15 text-on-primary/70'
            }

            return (
              <div
                key={number}
                role="listitem"
                aria-label={`Soru ${number}`}
                aria-current={status === 'current' ? 'step' : undefined}
                className={className}
              >
                {status === 'correct' ? (
                  <span className="material-symbols-outlined text-[13px]">check</span>
                ) : status === 'incorrect' ? (
                  <span className="material-symbols-outlined text-[13px]">close</span>
                ) : (
                  number
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export type { QuestionStatus }
