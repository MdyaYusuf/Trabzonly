import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '@/core/store/hooks'
import { FeedGlobalPollCard } from '@/features/posts/components/FeedGlobalPollCard'
import quizService from '../quizService'
import type { QuizLeaderboardEntryDto, QuizUserStatsDto } from '../quizTypes'
import { formatQuizDuration, formatQuizScore } from '../utils/quizFormat'

export function QuizListSidebar() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const username = useAppSelector((state) => state.auth.user?.username)
  const [leaderboard, setLeaderboard] = useState<QuizLeaderboardEntryDto[]>([])
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(true)
  const [myStats, setMyStats] = useState<QuizUserStatsDto | null>(null)
  const [isLoadingMyStats, setIsLoadingMyStats] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadLeaderboard() {
      setIsLoadingLeaderboard(true)

      const result = await quizService.getLeaderboard(10)

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setLeaderboard(result.data)
      } else {
        setLeaderboard([])
      }

      setIsLoadingLeaderboard(false)
    }

    void loadLeaderboard()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    async function loadMyStats() {
      if (!isAuthenticated) {
        setMyStats(null)
        setIsLoadingMyStats(false)
        return
      }

      setIsLoadingMyStats(true)

      const result = await quizService.getMyStats()

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setMyStats(result.data)
      } else {
        setMyStats(null)
      }

      setIsLoadingMyStats(false)
    }

    void loadMyStats()

    return () => {
      cancelled = true
    }
  }, [isAuthenticated])

  return (
    <aside className="flex flex-col gap-space-lg">
      <div className="overflow-hidden bg-surface-container-lowest shadow-sm">
        <div className="flex items-center justify-between bg-surface-container-low p-space-md">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[20px] text-primary">leaderboard</span>
            <h3 className="font-headline text-headline-sm font-bold text-primary uppercase">
              Liderlik Tablosu
            </h3>
          </div>
          <span className="font-kicker text-kicker font-bold text-secondary uppercase">
            TOP 10
          </span>
        </div>

        <div className="p-space-md pb-space-sm">
          {isLoadingLeaderboard ? (
            <p className="font-body py-space-sm text-body-sm text-on-surface-variant">
              Sıralama yükleniyor...
            </p>
          ) : null}

          {!isLoadingLeaderboard && leaderboard.length === 0 ? (
            <p className="font-body py-space-sm text-body-sm text-on-surface-variant">
              Henüz sıralamaya girecek yeterli sonuç yok. En az 3 farklı quiz çözülmeli.
            </p>
          ) : null}

          {leaderboard.map((entry) => {
            const isTopThree = entry.rank <= 3
            const rankTone =
              entry.rank === 1
                ? 'bg-tertiary-fixed-dim text-on-tertiary-fixed'
                : entry.rank === 2
                  ? 'bg-surface-container-highest text-on-surface'
                  : entry.rank === 3
                    ? 'bg-surface-container-high text-on-surface'
                    : 'bg-surface-container text-on-surface-variant'

            if (!isTopThree) {
              return (
                <div
                  key={`${entry.rank}-${entry.username}`}
                  className="flex items-center justify-between p-space-sm"
                >
                  <div className="flex items-center gap-space-sm">
                    <div
                      className={`font-label flex h-7 w-7 items-center justify-center text-label-md ${rankTone}`}
                    >
                      {entry.rank}
                    </div>
                    <span className="font-label text-label-md font-medium text-on-surface">
                      {entry.username}
                    </span>
                  </div>
                  <span className="font-label text-label-md font-bold text-on-surface-variant">
                    %{formatQuizScore(entry.averageScore)}
                  </span>
                </div>
              )
            }

            return (
              <div
                key={`${entry.rank}-${entry.username}`}
                className="mb-space-xs flex items-center justify-between bg-surface-container-lowest p-space-sm"
              >
                <div className="flex items-center gap-space-sm">
                  <div
                    className={`font-headline flex h-7 w-7 items-center justify-center text-[13px] font-bold ${rankTone}`}
                  >
                    {entry.rank}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label text-label-md font-bold text-primary">
                      {entry.username}
                    </span>
                    <span className="font-kicker text-[10px] font-bold text-on-surface-variant uppercase">
                      {entry.distinctQuizCount} quiz ·{' '}
                      {formatQuizDuration(entry.averageCompletionTime)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-headline text-headline-sm font-extrabold text-primary">
                    %{formatQuizScore(entry.averageScore)}
                  </span>
                  <span className="font-kicker block text-[9px] text-on-surface-variant uppercase">
                    Ort.
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {isAuthenticated ? (
        <div className="flex flex-col gap-space-md bg-surface-container-lowest p-space-lg shadow-sm">
          <div className="flex items-center gap-space-sm">
            <div className="flex h-10 w-10 items-center justify-center bg-secondary text-on-secondary">
              <span className="material-symbols-outlined text-2xl">person</span>
            </div>
            <div className="flex flex-col">
              <span className="font-kicker text-kicker font-bold text-secondary uppercase">
                Senin İstatistiklerin
              </span>
              <span className="font-headline text-headline-sm font-bold text-primary uppercase">
                {username ?? 'Üye'}
              </span>
            </div>
          </div>

          {isLoadingMyStats ? (
            <p className="font-body text-body-sm text-on-surface-variant">İstatistikler yükleniyor...</p>
          ) : myStats == null || myStats.attemptsCount === 0 ? (
            <p className="font-body text-body-sm text-on-surface-variant">
              Henüz quiz çözmedin. Listeden bir test seçip başla.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-space-xs">
              <div className="bg-surface-container-low p-space-sm">
                <span className="font-kicker text-kicker text-on-surface-variant uppercase">
                  Ort. Skor
                </span>
                <span className="font-headline mt-1 block text-headline-sm font-bold text-primary">
                  %{formatQuizScore(myStats.averageScore)}
                </span>
              </div>
              <div className="bg-surface-container-low p-space-sm">
                <span className="font-kicker text-kicker text-on-surface-variant uppercase">
                  Ort. Süre
                </span>
                <span className="font-headline mt-1 block text-headline-sm font-bold text-primary">
                  {formatQuizDuration(myStats.averageCompletionTime)}
                </span>
              </div>
              <div className="bg-surface-container-low p-space-sm">
                <span className="font-kicker text-kicker text-on-surface-variant uppercase">
                  Deneme
                </span>
                <span className="font-headline mt-1 block text-headline-sm font-bold text-primary">
                  {myStats.attemptsCount.toLocaleString('tr-TR')}
                </span>
              </div>
              <div className="bg-surface-container-low p-space-sm">
                <span className="font-kicker text-kicker text-on-surface-variant uppercase">
                  Farklı Quiz
                </span>
                <span className="font-headline mt-1 block text-headline-sm font-bold text-primary">
                  {myStats.distinctQuizCount.toLocaleString('tr-TR')}
                </span>
              </div>
            </div>
          )}

          <Link
            to="/profil"
            className="font-label text-label-md font-bold text-secondary uppercase hover:underline"
          >
            Profile git
          </Link>
        </div>
      ) : null}

      <FeedGlobalPollCard />
    </aside>
  )
}
