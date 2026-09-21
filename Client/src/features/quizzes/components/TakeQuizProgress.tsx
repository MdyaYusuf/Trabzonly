type TakeQuizProgressProps = {
  currentIndex: number
  total: number
  answeredIds: Set<string>
  questionIds: string[]
  remainingSeconds: number
  onJump: (index: number) => void
}

function formatTime(totalSeconds: number) {
  const mins = Math.floor(totalSeconds / 60)
  const secs = totalSeconds % 60
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

export function TakeQuizProgress({
  currentIndex,
  total,
  answeredIds,
  questionIds,
  remainingSeconds,
  onJump,
}: TakeQuizProgressProps) {
  const answeredCount = answeredIds.size
  const progressPercent = Math.round((answeredCount / total) * 100)
  const remainingQuestions = Math.max(0, total - answeredCount)
  const currentNumber = currentIndex + 1

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
            <div className="flex items-center gap-space-md">
              <span className="font-kicker text-kicker text-primary uppercase">
                %{progressPercent} Tamamlandı
              </span>
              <span className="font-kicker text-kicker text-on-surface-variant uppercase">
                Kalan: {remainingQuestions} Soru
              </span>
            </div>
          </div>

          <div className="h-2 w-full overflow-hidden bg-surface-container-high">
            <div
              className="h-full bg-primary transition-[width] duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-space-sm bg-primary-container px-space-md py-space-sm text-on-primary">
          <span className="material-symbols-outlined animate-pulse text-secondary-container">
            timer
          </span>
          <div className="flex flex-col">
            <span className="font-kicker text-kicker uppercase opacity-80">Kalan Süre</span>
            <span className="font-headline text-headline-sm font-bold tracking-wider tabular-nums">
              {formatTime(remainingSeconds)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {questionIds.map((id, index) => {
          const number = index + 1
          const isCurrent = index === currentIndex
          const isAnswered = answeredIds.has(id)

          let className =
            'font-label flex h-9 w-9 items-center justify-center text-label-md transition-colors '

          if (isCurrent) {
            className += 'bg-secondary-container text-on-secondary-container font-bold'
          } else if (isAnswered) {
            className += 'bg-primary text-on-primary'
          } else {
            className += 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container'
          }

          return (
            <button
              key={id}
              type="button"
              aria-label={
                isAnswered ? `Soru ${number} (Çözüldü)` : `Soru ${number}`
              }
              aria-current={isCurrent ? 'step' : undefined}
              className={className}
              onClick={() => {
                onJump(index)
              }}
            >
              {isAnswered && !isCurrent ? (
                <span className="material-symbols-outlined text-[16px]">check</span>
              ) : (
                number
              )}
            </button>
          )
        })}
      </div>
    </section>
  )
}
