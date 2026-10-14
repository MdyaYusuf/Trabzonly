import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PlayerCommentsSection } from '../components/PlayerCommentsSection'
import { PlayerDetailBreadcrumb } from '../components/PlayerDetailBreadcrumb'
import { PlayerDetailHero } from '../components/PlayerDetailHero'
import { PlayerDetailRatingBar } from '../components/PlayerDetailRatingBar'
import { PlayerDetailSidebar } from '../components/PlayerDetailSidebar'
import { PlayerInjurySection } from '../components/PlayerInjurySection'
import { PlayerSeasonStatsSection } from '../components/PlayerSeasonStatsSection'
import playerService from '../playerService'
import type { PlayerResponseDto } from '../playerTypes'

export function PlayerDetailPage() {
  const { playerId } = useParams<{ playerId: string }>()
  const [player, setPlayer] = useState<PlayerResponseDto | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadPlayer() {
      const parsedId = Number(playerId)

      if (!playerId || Number.isNaN(parsedId)) {
        setNotFound(true)
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setNotFound(false)

      const result = await playerService.getById(parsedId)

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setPlayer(result.data)
        setIsLoading(false)
        return
      }

      setPlayer(null)
      setNotFound(true)
      setIsLoading(false)
    }

    void loadPlayer()

    return () => {
      cancelled = true
    }
  }, [playerId])

  if (isLoading) {
    return (
      <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
        <p className="font-body px-4 py-space-xl text-center text-body-md text-on-surface-variant sm:px-6">
          Oyuncu yükleniyor...
        </p>
      </main>
    )
  }

  if (notFound || !player) {
    return (
      <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
        <div className="mx-auto flex max-w-[1360px] flex-col items-start gap-space-md px-4 py-space-xl sm:px-6 lg:px-12">
          <h1 className="font-headline text-headline-md font-bold text-primary">Oyuncu bulunamadı</h1>
          <p className="font-body text-body-md text-on-surface-variant">
            Bu oyuncu kaydı yok veya kaldırılmış olabilir.
          </p>
          <Link
            to="/oyuncular"
            className="font-label inline-flex items-center gap-1 bg-primary-container px-space-md py-space-sm text-label-md font-bold text-on-primary uppercase"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Kadroya Dön
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
      <PlayerDetailBreadcrumb
        playerName={player.name}
        seasonLabel={player.currentSeasonStats?.seasonName}
        currentTeam={player.currentTeam}
      />
      <PlayerDetailHero player={player} />
      <PlayerDetailRatingBar
        playerId={player.id}
        averageRating={player.averageRating}
        ratingCount={player.ratingCount}
        currentUserScore={player.currentUserScore}
        onRated={(averageRating, ratingCount, score) => {
          setPlayer((current) => {
            if (!current) {
              return current
            }

            return {
              ...current,
              averageRating,
              ratingCount,
              currentUserScore: score,
            }
          })
        }}
      />

      <div className="mx-auto w-full max-w-[1360px] px-4 py-space-xl sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12">
          <div className="flex flex-col gap-space-xl lg:col-span-8">
            <PlayerSeasonStatsSection player={player} />
            <PlayerInjurySection playerId={player.id} />
            <PlayerCommentsSection playerId={player.id} playerName={player.name} />
          </div>

          <PlayerDetailSidebar player={player} />
        </div>
      </div>
    </main>
  )
}
