import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SquadCreateIcon } from '@/features/squads/components/SquadCreateIcon'
import playerService from '../playerService'
import type { PlayerResponseDto } from '../playerTypes'
import { PlayerDirectoryPollCard } from './PlayerDirectoryPollCard'

const TOP_RATED_COUNT = 5

const AVATAR_TONES = [
  'bg-primary-container text-on-primary',
  'bg-secondary text-on-secondary',
  'bg-primary text-on-primary',
] as const

const ratingTips = [
  {
    title: 'Formu Oku',
    body: 'Son maçlar, sakatlık durumu ve rolünü değerlendirerek puan ver.',
  },
  {
    title: 'Dürüst Ol',
    body: 'Skordan bağımsız, saha içi performansa göre taraftar notunu bırak.',
  },
  {
    title: "11'ini Kur",
    body: "Beğendiğin isimlerle kendi dizilişini oluşturup tribüne sun.",
  },
] as const

function initialsFromName(name: string): string {
  const cleaned = name.trim()

  if (cleaned.length === 0) {
    return '?'
  }

  const parts = cleaned.split(/\s+/).filter(Boolean)

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }

  const first = parts[0]
  const last = parts[parts.length - 1]

  return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase()
}

export function PlayerDirectorySidebar() {
  const [topRated, setTopRated] = useState<PlayerResponseDto[]>([])
  const [isLoadingTopRated, setIsLoadingTopRated] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadTopRated() {
      setIsLoadingTopRated(true)

      const result = await playerService.getTopRated(TOP_RATED_COUNT)

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

  return (
    <aside className="flex flex-col gap-space-lg lg:col-span-4">
      <PlayerDirectoryPollCard />

      <div className="bg-surface-container-lowest p-space-md shadow-sm">
        <div className="mb-space-sm flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-lg text-tertiary-fixed-dim">
            hotel_class
          </span>
          <span className="font-headline text-label-md font-bold tracking-wider text-primary uppercase">
            En Yüksek Puanlı Oyuncular
          </span>
        </div>

        {isLoadingTopRated ? (
          <p className="font-body text-body-sm text-on-surface-variant">Oyuncular yükleniyor...</p>
        ) : topRated.length === 0 ? (
          <p className="font-body text-body-sm text-on-surface-variant">
            Henüz puanlı oyuncu yok.
          </p>
        ) : (
          <div className="flex flex-col gap-space-sm">
            {topRated.map((player, index) => {
              const rank = index + 1
              const avatarTone = AVATAR_TONES[index % AVATAR_TONES.length]

              return (
                <Link
                  key={player.id}
                  to={`/oyuncular/${player.id}`}
                  className="flex items-center gap-space-sm bg-surface-container p-space-xs transition-colors hover:bg-surface-container-high"
                >
                  <span
                    aria-label={`${rank}. sıra`}
                    className={[
                      'font-headline w-8 shrink-0 text-center text-[22px] leading-none font-bold tabular-nums',
                      rank === 1 ? 'text-primary' : 'text-on-surface-variant/45',
                    ].join(' ')}
                  >
                    {rank}
                  </span>
                  <div
                    className={[
                      'flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full font-headline text-label-md font-bold',
                      avatarTone,
                    ].join(' ')}
                  >
                    {initialsFromName(player.name)}
                  </div>
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span className="font-label line-clamp-2 text-label-md font-bold text-secondary">
                      {player.name}
                    </span>
                    <span className="font-kicker text-kicker text-on-surface-variant uppercase">
                      {player.positionAbbreviation}
                      {player.shirtNumber != null ? ` #${player.shirtNumber}` : ''}
                    </span>
                    <span className="font-body text-body-sm text-on-surface-variant">
                      {player.ratingCount > 0
                        ? `${player.averageRating.toFixed(1)} / 10.0 ortalama`
                        : 'Henüz puan yok'}
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-space-md bg-surface-container p-space-lg">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-lg text-secondary">sports_soccer</span>
          <span className="font-headline text-label-md font-bold tracking-wider text-primary uppercase">
            Taraftar Rehberi
          </span>
        </div>
        <p className="font-body text-body-sm text-on-surface-variant">
          Oyuncu kartlarından detaya gir, taraftar puanı ver ve favori 11&apos;ini kur.
        </p>
        <div className="flex flex-col gap-space-sm">
          {ratingTips.map((tip, index) => (
            <div
              key={tip.title}
              className="flex items-center gap-space-sm bg-surface-container-lowest p-space-sm"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-on-secondary">
                {index + 1}
              </span>
              <p className="font-body text-body-sm text-on-surface">
                <strong>{tip.title}:</strong> {tip.body}
              </p>
            </div>
          ))}
        </div>
        <Link
          to="/kadrolar/olustur"
          className="font-label group ml-auto inline-flex items-center gap-1 text-label-md font-bold text-secondary uppercase transition-colors hover:text-primary"
        >
          <SquadCreateIcon size={16} />
          <span>Kadro oluştur</span>
          <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-0.5">
            arrow_forward
          </span>
        </Link>
      </div>
    </aside>
  )
}
