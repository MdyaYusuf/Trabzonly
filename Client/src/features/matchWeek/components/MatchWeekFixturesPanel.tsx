import type { FixtureResponseDto } from '../matchWeekTypes'
import {
  formatFixtureTime,
  groupFixturesByDate,
} from '../utils/matchWeekPublicUtils'

type MatchWeekFixturesPanelProps = {
  weekNumber: number
  fixtures: FixtureResponseDto[]
  isLoading?: boolean
  onWeekChange: (weekNumber: number) => void
}

const TOTAL_WEEKS = 34

function FixtureRow({ fixture }: { fixture: FixtureResponseDto }) {
  const hasScore = fixture.homeScore != null && fixture.awayScore != null
  const homeName = fixture.homeClub.name
  const awayName = fixture.awayClub.name
  const highlightHome = fixture.homeClub.isTrabzonspor
  const highlightAway = fixture.awayClub.isTrabzonspor

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-1 border-b border-outline-variant/15 px-1 py-2 last:border-b-0">
      <span
        className={`font-body truncate text-right text-xs ${
          highlightHome ? 'font-bold text-primary' : 'text-on-surface'
        }`}
        title={fixture.homeClub.name}
      >
        {homeName}
      </span>
      <span className="font-headline min-w-[3.25rem] text-center text-xs font-extrabold tabular-nums text-secondary">
        {hasScore
          ? `${fixture.homeScore} – ${fixture.awayScore}`
          : fixture.kickoff
            ? formatFixtureTime(fixture.kickoff)
            : '—'}
      </span>
      <span
        className={`font-body truncate text-left text-xs ${
          highlightAway ? 'font-bold text-primary' : 'text-on-surface'
        }`}
        title={fixture.awayClub.name}
      >
        {awayName}
      </span>
    </div>
  )
}

export function MatchWeekFixturesPanel({
  weekNumber,
  fixtures,
  isLoading,
  onWeekChange,
}: MatchWeekFixturesPanelProps) {
  const groups = groupFixturesByDate(fixtures)
  const canGoPrev = weekNumber > 1
  const canGoNext = weekNumber < TOTAL_WEEKS

  return (
    <div className="flex flex-col gap-space-sm">
      <div className="flex items-center justify-between gap-space-sm">
        <button
          type="button"
          disabled={!canGoPrev || isLoading}
          aria-label="Önceki hafta"
          className="font-label inline-flex h-8 w-8 cursor-pointer items-center justify-center border border-outline-variant/40 text-on-surface disabled:cursor-not-allowed disabled:opacity-40"
          onClick={() => {
            if (canGoPrev) {
              onWeekChange(weekNumber - 1)
            }
          }}
        >
          <span className="material-symbols-outlined text-[18px]">chevron_left</span>
        </button>
        <p className="font-kicker text-kicker font-bold tracking-widest text-on-surface uppercase">
          {weekNumber}. Hafta
        </p>
        <button
          type="button"
          disabled={!canGoNext || isLoading}
          aria-label="Sonraki hafta"
          className="font-label inline-flex h-8 w-8 cursor-pointer items-center justify-center border border-outline-variant/40 text-on-surface disabled:cursor-not-allowed disabled:opacity-40"
          onClick={() => {
            if (canGoNext) {
              onWeekChange(weekNumber + 1)
            }
          }}
        >
          <span className="material-symbols-outlined text-[18px]">chevron_right</span>
        </button>
      </div>

      {isLoading ? (
        <p className="font-body text-body-sm text-on-surface-variant">Yükleniyor...</p>
      ) : null}

      {!isLoading && fixtures.length === 0 ? (
        <p className="font-body text-body-sm text-on-surface-variant">
          Bu hafta için maç yok.
        </p>
      ) : null}

      {!isLoading && groups.length > 0 ? (
        <div className="flex flex-col gap-space-sm">
          {groups.map((group) => (
            <div key={group.key}>
              <p className="font-kicker mb-1 text-[10px] font-bold tracking-wider text-on-surface-variant uppercase">
                {group.label}
              </p>
              <div className="border border-outline-variant/20 bg-surface">
                {group.fixtures.map((fixture) => (
                  <FixtureRow key={fixture.id} fixture={fixture} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
