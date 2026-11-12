import { Link } from 'react-router-dom'
import type {
  FixtureResponseDto,
  MatchWeekLeaderboardEntryDto,
} from '../matchWeekTypes'
import {
  formatFixtureDateShort,
  formatFixtureTime,
  shortNameFromFull,
} from '../utils/matchWeekPublicUtils'

type MatchWeekHeroProps = {
  seasonName?: string | null
  displayedWeek?: number | null
  playerOfTheWeek?: MatchWeekLeaderboardEntryDto | null
  trabzonsporFixture?: FixtureResponseDto | null
}

function clubLabel(name: string, shortName?: string | null): string {
  const short = shortName?.trim()

  if (short) {
    return short
  }

  return name
}

export function MatchWeekHero({
  seasonName,
  displayedWeek,
  playerOfTheWeek,
  trabzonsporFixture,
}: MatchWeekHeroProps) {
  const hasScore =
    trabzonsporFixture?.homeScore != null &&
    trabzonsporFixture?.awayScore != null

  const homeLabel = trabzonsporFixture
    ? clubLabel(
        trabzonsporFixture.homeClub.name,
        trabzonsporFixture.homeClub.shortName,
      )
    : null
  const awayLabel = trabzonsporFixture
    ? clubLabel(
        trabzonsporFixture.awayClub.name,
        trabzonsporFixture.awayClub.shortName,
      )
    : null

  const venueLabel = trabzonsporFixture
    ? trabzonsporFixture.homeClub.isTrabzonspor
      ? 'Ev'
      : 'Deplasman'
    : null

  const kickoffMeta =
    trabzonsporFixture?.kickoff != null
      ? `${formatFixtureDateShort(trabzonsporFixture.kickoff)} / ${formatFixtureTime(trabzonsporFixture.kickoff)}`
      : null

  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 pb-space-md sm:px-6 lg:px-12">
      <div className="relative overflow-hidden bg-surface-container-lowest p-space-md shadow-sm sm:p-space-lg">
        <div className="pointer-events-none absolute -right-10 -bottom-12 select-none text-primary opacity-[0.03]">
          <span className="font-display text-[100px] leading-none font-extrabold tracking-tighter sm:text-[160px]">
            1967
          </span>
        </div>

        <div className="relative z-10 flex flex-col gap-space-md lg:flex-row lg:items-stretch lg:justify-between lg:gap-space-xl">
          <div className="flex min-w-0 flex-1 flex-col justify-center">
            <div className="mb-space-xs flex flex-wrap items-center gap-space-xs">
              <span className="inline-block h-2.5 w-2.5 bg-primary-container" />
              <span className="font-kicker text-kicker font-bold tracking-widest text-primary-container uppercase">
                {seasonName?.trim() || 'GÜNCEL SEZON'} &{' '}
                {displayedWeek != null ? `${displayedWeek}. Hafta` : 'Lig Haftası'}
              </span>
            </div>
            <h1 className="font-display text-headline-lg leading-[1.05] font-extrabold tracking-tight text-primary uppercase lg:text-display-xl">
              HAFTANIN KADROSU
            </h1>
            <p className="font-body mt-space-sm max-w-2xl text-body-md text-on-surface-variant">
              Canlı haftanın kadrosunu puanlayın, haftanın en iyilerini, Süper Lig puan durumu ve
              fikstürünü takip edin.
            </p>
          </div>

          <div className="flex w-full shrink-0 flex-col gap-space-sm lg:w-[28rem]">
            <div className="grid grid-cols-2 items-stretch gap-space-sm">
              <div className="flex h-36 min-w-0 flex-col justify-center bg-surface-container-low px-space-md py-space-md">
                <span className="font-kicker text-kicker font-bold tracking-wide text-on-surface-variant uppercase">
                  {displayedWeek != null
                    ? `${displayedWeek}. Hafta Maçı`
                    : 'Trabzonspor Maçı'}
                </span>
                {trabzonsporFixture && homeLabel && awayLabel ? (
                  <>
                    <span className="font-headline mt-1.5 line-clamp-2 text-body-sm font-bold text-secondary">
                      {homeLabel}{' '}
                      {hasScore
                        ? `${trabzonsporFixture.homeScore} – ${trabzonsporFixture.awayScore}`
                        : 'vs'}{' '}
                      {awayLabel}
                    </span>
                    <span className="font-body mt-1 text-body-sm text-on-surface-variant">
                      {venueLabel}
                      {kickoffMeta ? ` / ${kickoffMeta}` : ''}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="font-headline mt-1.5 line-clamp-2 text-body-sm font-bold text-secondary">
                      Maç bulunamadı
                    </span>
                    <span className="font-body mt-1 text-body-sm text-on-surface-variant">
                      Gösterilen hafta fikstürü bekleniyor
                    </span>
                  </>
                )}
              </div>

              {playerOfTheWeek ? (
                <Link
                  to={`/oyuncular/${playerOfTheWeek.playerId}`}
                  className="flex h-36 min-w-0 flex-col justify-center bg-surface-container-low px-space-md py-space-md transition-colors hover:bg-surface-container-high"
                >
                  <span className="font-kicker text-kicker font-bold tracking-wide text-on-surface-variant uppercase">
                    Haftanın Oyuncusu
                  </span>
                  <span className="font-headline mt-1.5 line-clamp-2 text-body-sm font-bold text-secondary">
                    {shortNameFromFull(playerOfTheWeek.playerName)}
                  </span>
                  <span className="font-body mt-1 text-body-sm text-on-surface-variant">
                    {playerOfTheWeek.averageRating.toFixed(1)} ortalama /{' '}
                    {playerOfTheWeek.ratingCount} oy
                  </span>
                </Link>
              ) : (
                <div className="flex h-36 min-w-0 flex-col justify-center bg-surface-container-low px-space-md py-space-md">
                  <span className="font-kicker text-kicker font-bold tracking-wide text-on-surface-variant uppercase">
                    Haftanın Oyuncusu
                  </span>
                  <span className="font-headline mt-1.5 line-clamp-2 text-body-sm font-bold text-secondary">
                    Henüz puan yok
                  </span>
                  <span className="font-body mt-1 text-body-sm text-on-surface-variant">
                    Oyuncu puanları bekleniyor
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
