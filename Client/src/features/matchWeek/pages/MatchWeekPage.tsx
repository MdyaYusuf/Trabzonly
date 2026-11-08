import { useEffect, useState } from 'react'
import { useAppSelector } from '@/core/store/hooks'
import { authService } from '@/features/auth/authService'
import seasonService from '@/features/seasons/seasonService'
import { MatchWeekBreadcrumb } from '../components/MatchWeekBreadcrumb'
import { MatchWeekHero } from '../components/MatchWeekHero'
import { MatchWeekPitch } from '../components/MatchWeekPitch'
import { MatchWeekSidebar } from '../components/MatchWeekSidebar'
import matchWeekService from '../matchWeekService'
import type {
  FixtureResponseDto,
  LeagueStandingResponseDto,
  MatchWeekLeaderboardEntryDto,
  MatchWeekResponseDto,
} from '../matchWeekTypes'
import { findTrabzonsporFixture } from '../utils/matchWeekPublicUtils'

export function MatchWeekPage() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const userId = useAppSelector((state) => state.auth.user?.id)

  const [matchWeek, setMatchWeek] = useState<MatchWeekResponseDto | null>(null)
  const [leaderboard, setLeaderboard] = useState<MatchWeekLeaderboardEntryDto[]>([])
  const [standings, setStandings] = useState<LeagueStandingResponseDto[]>([])
  const [fixtures, setFixtures] = useState<FixtureResponseDto[]>([])
  const [displayedWeekTrabzonsporFixture, setDisplayedWeekTrabzonsporFixture] =
    useState<FixtureResponseDto | null>(null)
  const [seasonId, setSeasonId] = useState<number | null>(null)
  const [seasonName, setSeasonName] = useState<string | null>(null)
  const [displayedWeek, setDisplayedWeek] = useState<number | null>(null)
  const [weekNumber, setWeekNumber] = useState(1)

  const [isLoadingBoard, setIsLoadingBoard] = useState(true)
  const [isLeaderboardLoading, setIsLeaderboardLoading] = useState(true)
  const [isStandingsLoading, setIsStandingsLoading] = useState(true)
  const [isFixturesLoading, setIsFixturesLoading] = useState(false)
  const [boardError, setBoardError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadBoard() {
      setIsLoadingBoard(true)
      setIsLeaderboardLoading(true)
      setBoardError(null)

      await authService.ensureViewerSession()

      if (cancelled) {
        return
      }

      try {
        const currentResult = await matchWeekService.getCurrent()

        if (cancelled) {
          return
        }

        if (!currentResult.success || !currentResult.data) {
          setMatchWeek(null)
          setBoardError(currentResult.message || 'Maç haftası yüklenemedi.')
        } else {
          setMatchWeek(currentResult.data)
          setBoardError(null)
        }
      } catch {
        if (cancelled) {
          return
        }

        setMatchWeek(null)
        setBoardError('Maç haftası yüklenemedi.')
      }

      if (cancelled) {
        return
      }

      setIsLoadingBoard(false)

      try {
        const leaderboardResult = await matchWeekService.getLeaderboard()

        if (cancelled) {
          return
        }

        if (leaderboardResult.success && leaderboardResult.data) {
          setLeaderboard(leaderboardResult.data.entries)
        } else {
          setLeaderboard([])
        }
      } catch {
        if (!cancelled) {
          setLeaderboard([])
        }
      }

      if (!cancelled) {
        setIsLeaderboardLoading(false)
      }
    }

    void loadBoard()

    return () => {
      cancelled = true
    }
  }, [isAuthenticated, userId])

  useEffect(() => {
    let cancelled = false

    async function loadSeasonContext() {
      setIsStandingsLoading(true)

      try {
        const seasonResult = await seasonService.getActive()

        if (cancelled) {
          return
        }

        if (!seasonResult.success || !seasonResult.data) {
          setSeasonId(null)
          setSeasonName(null)
          setDisplayedWeek(null)
          setDisplayedWeekTrabzonsporFixture(null)
          setStandings([])
          setIsStandingsLoading(false)
          return
        }

        const activeSeasonId = seasonResult.data.id
        const week = seasonResult.data.displayedFixtureWeek

        setSeasonId(activeSeasonId)
        setSeasonName(seasonResult.data.name)
        setDisplayedWeek(week)
        setWeekNumber(week)

        const [standingsResult, displayedWeekResult] = await Promise.all([
          matchWeekService.getStandings(activeSeasonId),
          matchWeekService.getWeekFixtures(week, activeSeasonId),
        ])

        if (cancelled) {
          return
        }

        if (standingsResult.success && standingsResult.data) {
          setStandings(standingsResult.data.standings)
        } else {
          setStandings([])
        }

        if (displayedWeekResult.success && displayedWeekResult.data) {
          setDisplayedWeekTrabzonsporFixture(
            findTrabzonsporFixture(displayedWeekResult.data.fixtures),
          )
        } else {
          setDisplayedWeekTrabzonsporFixture(null)
        }
      } catch {
        if (!cancelled) {
          setSeasonId(null)
          setSeasonName(null)
          setDisplayedWeek(null)
          setDisplayedWeekTrabzonsporFixture(null)
          setStandings([])
        }
      }

      if (!cancelled) {
        setIsStandingsLoading(false)
      }
    }

    void loadSeasonContext()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (seasonId == null) {
      return
    }

    let cancelled = false

    async function loadFixtures() {
      setIsFixturesLoading(true)

      try {
        const result = await matchWeekService.getWeekFixtures(
          weekNumber,
          seasonId ?? undefined,
        )

        if (cancelled) {
          return
        }

        if (result.success && result.data) {
          setFixtures(result.data.fixtures)
        } else {
          setFixtures([])
        }
      } catch {
        if (!cancelled) {
          setFixtures([])
        }
      }

      if (!cancelled) {
        setIsFixturesLoading(false)
      }
    }

    void loadFixtures()

    return () => {
      cancelled = true
    }
  }, [seasonId, weekNumber])

  async function refreshLeaderboard() {
    setIsLeaderboardLoading(true)

    try {
      const result = await matchWeekService.getLeaderboard()

      if (result.success && result.data) {
        setLeaderboard(result.data.entries)
      }
    } catch {
      // Keep existing leaderboard if refresh fails.
    }

    setIsLeaderboardLoading(false)
  }

  function handlePlayerRated(
    playerId: number,
    averageRating: number,
    ratingCount: number,
    score: number,
  ) {
    setMatchWeek((current) => {
      if (!current) {
        return current
      }

      return {
        ...current,
        slots: current.slots.map((slot) => {
          if (slot.playerId !== playerId) {
            return slot
          }

          return {
            ...slot,
            averageRating,
            ratingCount,
            currentUserScore: score,
          }
        }),
      }
    })

    void refreshLeaderboard()
  }

  const hasLineup = (matchWeek?.slots.length ?? 0) > 0

  return (
    <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
      <MatchWeekBreadcrumb />
      <MatchWeekHero
        seasonName={seasonName}
        displayedWeek={displayedWeek}
        playerOfTheWeek={leaderboard[0] ?? null}
        trabzonsporFixture={displayedWeekTrabzonsporFixture}
      />

      <section className="w-full bg-background py-space-xl">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 items-start gap-gutter lg:grid-cols-12">
            <div className="flex flex-col gap-space-md lg:col-span-8">
              {isLoadingBoard ? (
                <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
                  Maç haftası kadrosu yükleniyor...
                </p>
              ) : null}

              {!isLoadingBoard && boardError && !matchWeek ? (
                <div className="border border-outline-variant/30 bg-surface-container-lowest p-space-lg text-center shadow-sm">
                  <p className="font-headline text-headline-sm font-bold text-primary uppercase">
                    Kadro yüklenemedi
                  </p>
                  <p className="font-body mt-space-sm text-body-md text-on-surface-variant">
                    {boardError}
                  </p>
                </div>
              ) : null}

              {!isLoadingBoard && matchWeek && !hasLineup ? (
                <div className="border border-outline-variant/30 bg-surface-container-lowest p-space-lg text-center shadow-sm">
                  <span className="material-symbols-outlined text-[40px] text-secondary">
                    sports_soccer
                  </span>
                  <p className="font-headline mt-space-sm text-headline-sm font-bold text-primary uppercase">
                    Bu haftanın kadrosu henüz yok
                  </p>
                  <p className="font-body mt-space-sm text-body-md text-on-surface-variant">
                    Haftanın kadrosu yayınladığında puanınızı verebilmeniz için diziliş ve
                    oyuncu puanları görünecektir.
                  </p>
                </div>
              ) : null}

              {!isLoadingBoard && matchWeek && hasLineup ? (
                <MatchWeekPitch
                  formation={matchWeek.formation}
                  slots={matchWeek.slots}
                  onPlayerRated={handlePlayerRated}
                />
              ) : null}
            </div>

            <MatchWeekSidebar
              leaderboard={leaderboard}
              isLeaderboardLoading={isLeaderboardLoading}
              standings={standings}
              isStandingsLoading={isStandingsLoading}
              weekNumber={weekNumber}
              fixtures={fixtures}
              isFixturesLoading={isFixturesLoading}
              onWeekChange={setWeekNumber}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
