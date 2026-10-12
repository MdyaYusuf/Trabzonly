import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '@/core/store/hooks'
import squadService from '../squadService'
import type { SquadPreviewDto } from '../squadTypes'
import { SquadCreateIcon } from './SquadCreateIcon'
import { SquadsGalleryPollCard } from './SquadsGalleryPollCard'

const TOP_RATED_COUNT = 5

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

export function SquadsGallerySidebar() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const currentUserId = useAppSelector((state) => state.auth.user?.id)

  const [topRated, setTopRated] = useState<SquadPreviewDto[]>([])
  const [isLoadingTopRated, setIsLoadingTopRated] = useState(true)

  const [mySquads, setMySquads] = useState<SquadPreviewDto[]>([])
  const [isLoadingMySquads, setIsLoadingMySquads] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadTopRated() {
      setIsLoadingTopRated(true)

      const result = await squadService.getTopRated(TOP_RATED_COUNT)

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setTopRated(result.data)
      } else {
        setTopRated([])
      }

      setIsLoadingTopRated(false)
    }

    void loadTopRated()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    async function loadMySquads() {
      if (!isAuthenticated || !currentUserId) {
        setMySquads([])
        setIsLoadingMySquads(false)
        return
      }

      setIsLoadingMySquads(true)

      const result = await squadService.getByUserId(currentUserId)

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setMySquads(result.data)
      } else {
        setMySquads([])
      }

      setIsLoadingMySquads(false)
    }

    void loadMySquads()

    return () => {
      cancelled = true
    }
  }, [currentUserId, isAuthenticated])

  const latestMySquad = mySquads[0] ?? null

  return (
    <aside className="flex flex-col gap-space-lg lg:col-span-4">
      <SquadsGalleryPollCard />

      <div className="bg-surface-container-lowest p-space-md shadow-sm">
        <div className="mb-space-sm flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-lg text-tertiary-fixed-dim">
            hotel_class
          </span>
          <span className="font-headline text-label-md font-bold tracking-wider text-primary uppercase">
            En Yüksek Puanlı Kadrolar
          </span>
        </div>

        {isLoadingTopRated ? (
          <p className="font-body text-body-sm text-on-surface-variant">Kadrolar yükleniyor...</p>
        ) : topRated.length === 0 ? (
          <p className="font-body text-body-sm text-on-surface-variant">
            Henüz puanlı kadro yok.
          </p>
        ) : (
          <div className="flex flex-col gap-space-sm">
            {topRated.map((squad, index) => {
              const rank = index + 1
              const avatarTone = AVATAR_TONES[index % AVATAR_TONES.length]

              return (
                <Link
                  key={squad.id}
                  to={`/kadrolar/${squad.id}`}
                  className="flex items-center gap-space-sm bg-surface-container p-space-xs transition-colors hover:bg-surface-container-high"
                >
                  <span
                    className={[
                      'font-headline shrink-0 text-label-md font-bold',
                      rank === 1 ? 'text-tertiary-fixed-dim' : 'text-on-surface-variant',
                    ].join(' ')}
                  >
                    #{rank}
                  </span>
                  <div
                    className={[
                      'flex h-8 w-8 shrink-0 items-center justify-center font-headline text-kicker font-bold',
                      avatarTone,
                    ].join(' ')}
                  >
                    {initialsFromUsername(squad.authorUsername)}
                  </div>
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span className="font-label line-clamp-2 text-label-md font-bold text-secondary">
                      {squad.title}
                    </span>
                    <span className="font-kicker text-kicker text-on-surface-variant">
                      @{squad.authorUsername}
                    </span>
                    <span className="font-body text-body-sm text-on-surface-variant">
                      {squad.averageRating.toFixed(1)} / 5.0 ortalama
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>

      <div className="relative flex flex-col gap-space-md bg-surface-container-lowest p-space-md shadow-sm">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-lg text-secondary">person_play</span>
          <span className="font-headline text-label-md font-bold tracking-wider text-primary uppercase">
            Benim Kadrolarım
          </span>
        </div>

        {!isAuthenticated ? (
          <div className="flex flex-col gap-space-md">
            <p className="font-body text-body-sm text-on-surface-variant">
              Giriş yaparak kendi taktik dizilişlerini kaydet, yönet ve tribüne sun.
            </p>
            <div className="flex flex-col gap-space-sm">
              <Link
                to="/login"
                className="font-label flex w-full items-center justify-center bg-primary-container px-space-md py-space-sm text-label-md tracking-wider text-on-primary uppercase transition-colors hover:bg-primary"
              >
                Giriş Yap
              </Link>
              <Link
                to="/register"
                className="font-label flex w-full items-center justify-center border border-outline-variant px-space-md py-space-sm text-label-md tracking-wider text-on-surface uppercase transition-colors hover:border-primary hover:text-primary"
              >
                Topluluğa Katıl
              </Link>
            </div>
          </div>
        ) : isLoadingMySquads ? (
          <p className="font-body text-body-sm text-on-surface-variant">Kadroların yükleniyor...</p>
        ) : mySquads.length === 0 ? (
          <div className="flex flex-col gap-space-md">
            <p className="font-body text-body-sm text-on-surface-variant">
              Henüz bir kadron yok. İlk 11&apos;ini kurup tribüne katıl.
            </p>
            <Link
              to="/kadrolar/olustur"
              className="font-label flex w-full items-center justify-center gap-space-xs bg-primary-container px-space-md py-space-sm text-label-md tracking-wider text-on-primary uppercase transition-colors hover:bg-primary"
            >
              <SquadCreateIcon size={18} />
              <span>+ Kadro Oluştur</span>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-space-md">
            <div className="flex items-center gap-space-sm bg-surface-container px-space-md py-space-sm">
              <span className="font-stat text-headline-sm font-extrabold text-primary">
                {mySquads.length}
              </span>
              <span className="font-kicker text-kicker font-bold tracking-wider text-on-surface-variant uppercase">
                Kayıtlı Kadro
              </span>
            </div>

            {latestMySquad ? (
              <Link
                to={`/kadrolar/${latestMySquad.id}`}
                className="flex flex-col gap-1 bg-surface-container px-space-md py-space-sm transition-colors hover:bg-surface-container-high"
              >
                <span className="font-kicker text-kicker font-bold tracking-wider text-on-surface-variant uppercase">
                  Son Kadro
                </span>
                <span className="font-label line-clamp-2 text-label-md font-bold text-secondary">
                  {latestMySquad.title}
                </span>
                <span className="font-body text-body-sm text-on-surface-variant">
                  {latestMySquad.ratingCount > 0
                    ? `${latestMySquad.averageRating.toFixed(1)} / 5.0 ortalama`
                    : 'Henüz puan yok'}
                </span>
              </Link>
            ) : null}

            <Link
              to="/kadrolarim"
              className="font-label ml-auto inline-flex items-center gap-1 text-label-md font-bold text-secondary uppercase transition-colors hover:text-primary"
            >
              <span className="material-symbols-outlined text-base">folder_special</span>
              <span>Kadrolarıma Git</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        )}
      </div>
    </aside>
  )
}
