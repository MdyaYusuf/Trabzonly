import { useEffect, useState } from 'react'
import { useAppSelector } from '@/core/store/hooks'
import { authService } from '@/features/auth/authService'
import seasonService from '@/features/seasons/seasonService'
import { MatchWeekHeader } from '../components/MatchWeekHeader'
import { MatchWeekPitch } from '../components/MatchWeekPitch'
import { MatchWeekSidebar } from '../components/MatchWeekSidebar'
import matchWeekService from '../matchWeekService'
import type {
  FixtureResponseDto,
  LeagueStandingResponseDto,
  MatchWeekLeaderboardEntryDto,
  MatchWeekResponseDto,
} from '../matchWeekTypes'

export function MatchWeekPage() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const userId = useAppSelector((state) => state.auth.user?.id)

  const [matchWeek, setMatchWeek] = useState<MatchWeekResponseDto | null>(null)
  const [leaderboard, setLeaderboard] = useState<MatchWeekLeaderboardEntryDto[]>([])
  const [standings, setStandings] = useState<LeagueStandingResponseDto[]>([])
  const [fixtures, setFixtures] = useState<FixtureResponseDto[]>([])
  const [seasonId, setSeasonId] = useState<number | null>(null)
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

      const [currentResult, leaderboardResult] = await Promise.all([
        matchWeekService.getCurrent(),
        matchWeekService.getLeaderboard(),
      ])

      if (cancelled) {
        return
      }

      if (!currentResult.success || !currentResult.data) {
        setMatchWeek(null)
        setBoardError(currentResult.message || 'Maç haftası yüklenemedi.')
        setIsLoadingBoard(false)
        setIsLeaderboardLoading(false)
        return
      }

      setMatchWeek(currentResult.data)
      setIsLoadingBoard(false)

      if (leaderboardResult.success && leaderboardResult.data) {
        setLeaderboard(leaderboardResult.data.entries)
      } else {
        setLeaderboard([])
      }

      setIsLeaderboardLoading(false)
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

      const seasonResult = await seasonService.getActive()

      if (cancelled) {
        return
      }

      if (!seasonResult.success || !seasonResult.data) {
        setSeasonId(null)
        setStandings([])
        setIsStandingsLoading(false)
        return
      }

      const activeSeasonId = seasonResult.data.id
      const displayedWeek = seasonResult.data.displayedFixtureWeek

      setSeasonId(activeSeasonId)
      setWeekNumber(displayedWeek)

      const standingsResult = await matchWeekService.getStandings(activeSeasonId)

      if (cancelled) {
        return
      }

      if (standingsResult.success && standingsResult.data) {
        setStandings(standingsResult.data.standings)
      } else {
        setStandings([])
      }

      setIsStandingsLoading(false)
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

      const result = await matchWeekService.getWeekFixtures(weekNumber, seasonId ?? undefined)

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setFixtures(result.data.fixtures)
      } else {
        setFixtures([])
      }

      setIsFixturesLoading(false)
    }

    void loadFixtures()

    return () => {
      cancelled = true
    }
  }, [seasonId, weekNumber])

  async function refreshLeaderboard() {
    setIsLeaderboardLoading(true)
    const result = await matchWeekService.getLeaderboard()

    if (result.success && result.data) {
      setLeaderboard(result.data.entries)
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

  if (isLoadingBoard) {
    return (
      <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
        <p className="font-body mx-auto max-w-[1360px] px-4 py-space-xl text-center text-body-md text-on-surface-variant sm:px-6 lg:px-12">
          Maç haftası yükleniyor...
        </p>
      </main>
    )
  }

  if (boardError || !matchWeek) {
    return (
      <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
        <p className="font-body mx-auto max-w-[1360px] px-4 py-space-xl text-center text-body-md text-on-surface-variant sm:px-6 lg:px-12">
          {boardError ?? 'Maç haftası bulunamadı.'}
        </p>
      </main>
    )
  }

  return (
    <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
      <MatchWeekHeader matchWeek={matchWeek} />

      <section className="w-full bg-background py-space-xl">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 items-start gap-gutter lg:grid-cols-12">
            <div className="lg:col-span-8">
              <MatchWeekPitch
                formation={matchWeek.formation}
                slots={matchWeek.slots}
                onPlayerRated={handlePlayerRated}
              />
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
