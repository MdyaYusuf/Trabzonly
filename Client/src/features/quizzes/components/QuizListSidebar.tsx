import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '@/core/store/hooks'
import { FeedGlobalPollCard } from '@/features/posts/components/FeedGlobalPollCard'
import {
  publicProfilePath,
  UserProfileLink,
} from '@/features/users/components/UserProfileLink'
import quizService from '../quizService'
import type { QuizLeaderboardEntryDto, QuizUserStatsDto } from '../quizTypes'
import { formatQuizDuration, formatQuizScore } from '../utils/quizFormat'

const AVATAR_TONES = [
  'bg-primary-container text-on-primary',
  'bg-secondary text-on-secondary',
  'bg-primary text-on-primary',
] as const

function initialsFromUsername(username: string): string {
  const cleaned = username.trim()

  if (cleaned.length === 0) {
    return '?'
  }

  return cleaned.slice(0, 2).toUpperCase()
}

export function QuizListSidebar() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const username = useAppSelector((state) => state.auth.user?.username)
  const profileImageUrl = useAppSelector((state) => state.auth.user?.profileImageUrl)
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
      <FeedGlobalPollCard />

      <div className="bg-surface-container-lowest p-space-md shadow-sm">
        <div className="mb-space-sm flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-lg text-tertiary-fixed-dim">
            leaderboard
          </span>
          <span className="font-headline text-label-md font-bold tracking-wider text-primary uppercase">
            Liderlik Tablosu
          </span>
        </div>

        {isLoadingLeaderboard ? (
          <p className="font-body text-body-sm text-on-surface-variant">Sıralama yükleniyor...</p>
        ) : leaderboard.length === 0 ? (
          <p className="font-body text-body-sm text-on-surface-variant">
            Henüz sıralamaya girecek yeterli sonuç yok. En az 3 farklı quiz çözülmeli.
          </p>
        ) : (
          <div className="flex flex-col gap-space-sm">
            {leaderboard.map((entry, index) => {
              const avatarTone = AVATAR_TONES[index % AVATAR_TONES.length]

              return (
                <Link
                  key={`${entry.rank}-${entry.username}`}
                  to={publicProfilePath(entry.username)}
                  className="flex cursor-pointer items-center gap-space-sm bg-surface-container p-space-xs transition-colors hover:bg-surface-container-high"
                >
                  <span
                    aria-label={`${entry.rank}. sıra`}
                    className={[
                      'font-headline w-8 shrink-0 text-center text-[22px] leading-none font-bold tabular-nums',
                      entry.rank === 1 ? 'text-primary' : 'text-on-surface-variant/45',
                    ].join(' ')}
                  >
                    {entry.rank}
                  </span>
                  <UserProfileLink
                    nested
                    username={entry.username}
                    aria-label={`@${entry.username} profili`}
                    className={[
                      'flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full font-headline text-label-md font-bold',
                      avatarTone,
                    ].join(' ')}
                  >
                    {entry.profileImageUrl ? (
                      <img
                        src={entry.profileImageUrl}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      initialsFromUsername(entry.username)
                    )}
                  </UserProfileLink>
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <UserProfileLink
                      nested
                      username={entry.username}
                      className="font-label truncate text-label-md font-bold text-secondary transition-colors hover:text-primary"
                    />
                    <span className="font-kicker text-kicker text-on-surface-variant uppercase">
                      {entry.distinctQuizCount} quiz
                    </span>
                    <span className="font-body text-body-sm text-on-surface-variant">
                      %{formatQuizScore(entry.averageScore)} /{' '}
                      {formatQuizDuration(entry.averageCompletionTime)} ortalama
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>

      {isAuthenticated && username ? (
        <div className="relative flex flex-col gap-space-md bg-surface-container-lowest p-space-md shadow-sm">
          <div className="flex items-center gap-space-sm">
            <UserProfileLink
              username={username}
              aria-label={`@${username} profili`}
              className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary font-headline text-label-md font-bold text-on-secondary"
            >
              {profileImageUrl ? (
                <img
                  src={profileImageUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                initialsFromUsername(username)
              )}
            </UserProfileLink>
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="font-headline text-label-md font-bold tracking-wider text-primary uppercase">
                Senin İstatistiklerin
              </span>
              <UserProfileLink
                username={username}
                className="font-kicker text-kicker text-on-surface-variant transition-colors hover:text-primary"
              />
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
                  Ort. Başarı
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
            to={publicProfilePath(username)}
            className="font-label group ml-auto inline-flex items-center gap-1 text-label-md font-bold text-secondary uppercase transition-colors hover:text-primary"
          >
            <span className="material-symbols-outlined text-base">person</span>
            <span>Profile Git</span>
            <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-0.5">
              arrow_forward
            </span>
          </Link>
        </div>
      ) : null}
    </aside>
  )
}
