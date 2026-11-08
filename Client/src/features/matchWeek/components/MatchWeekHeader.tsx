import type { MatchWeekResponseDto } from '../matchWeekTypes'

type MatchWeekHeaderProps = {
  matchWeek: MatchWeekResponseDto
}

export function MatchWeekHeader({ matchWeek }: MatchWeekHeaderProps) {
  const opponentName = matchWeek.opponentClub?.name ?? 'Rakip belirtilmedi'
  const leftName = matchWeek.isHome ? 'Trabzonspor' : opponentName
  const rightName = matchWeek.isHome ? opponentName : 'Trabzonspor'
  const hasScore = matchWeek.homeScore != null && matchWeek.awayScore != null

  return (
    <header className="border-b border-outline-variant/30 bg-surface py-space-lg">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-space-sm px-4 sm:px-6 lg:px-12">
        <p className="font-kicker text-kicker tracking-widest text-on-surface-variant uppercase">
          Maç Haftası · {matchWeek.formation}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-space-md sm:justify-start sm:gap-space-lg">
          <h1 className="font-headline text-center text-headline-lg font-extrabold tracking-tight text-primary uppercase sm:text-left">
            {leftName}
          </h1>
          <div className="flex min-w-[5.5rem] flex-col items-center">
            {hasScore ? (
              <p className="font-headline text-headline-md font-bold tabular-nums text-on-surface">
                {matchWeek.homeScore} – {matchWeek.awayScore}
              </p>
            ) : (
              <p className="font-headline text-headline-sm font-bold text-on-surface-variant uppercase">
                vs
              </p>
            )}
            <span className="font-label text-label-md text-on-surface-variant uppercase">
              {matchWeek.isHome ? 'Ev Sahibi' : 'Deplasman'}
            </span>
          </div>
          <h1 className="font-headline text-center text-headline-lg font-extrabold tracking-tight text-primary uppercase sm:text-left">
            {rightName}
          </h1>
        </div>
      </div>
    </header>
  )
}
