import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import playerService from '../playerService'
import type { PlayerResponseDto, PlayerPositionGroup } from '../playerTypes'
import { formatMarketValue } from '../utils/formatMarketValue'
import { positionGroupFromAbbreviation } from '../utils/mapPlayerToCardData'
import type { PositionGroup } from '../utils/playerDirectoryTypes'
import { PlayerCareerArchive } from './PlayerCareerArchive'
import { PlayerPollCard } from './PlayerPollCard'

type PlayerDetailSidebarProps = {
  player: PlayerResponseDto
}

const RIVAL_LIMIT = 4

function toListPositionGroup(group: PositionGroup): PlayerPositionGroup {
  if (group === 'all') {
    return 'all'
  }

  return group
}

function formatRivalLine(peer: PlayerResponseDto, group: PositionGroup): string {
  const stats = peer.currentSeasonStats

  if (group === 'gk' || group === 'def') {
    return `${stats?.cleanSheets ?? 0} Golsüz`
  }

  return `${stats?.goals ?? 0} Gol • ${stats?.assists ?? 0} Asist`
}

function rivalScore(peer: PlayerResponseDto, group: PositionGroup): number {
  const stats = peer.currentSeasonStats

  if (group === 'gk' || group === 'def') {
    return stats?.cleanSheets ?? 0
  }

  return (stats?.goals ?? 0) * 2 + (stats?.assists ?? 0)
}

function averageMarketValue(peers: PlayerResponseDto[]): number | null {
  const valued = peers.filter((peer) => peer.marketValue != null && peer.marketValue > 0)

  if (valued.length === 0) {
    return null
  }

  const total = valued.reduce((sum, peer) => sum + (peer.marketValue ?? 0), 0)
  return total / valued.length
}

function averageRating(peers: PlayerResponseDto[]): number | null {
  const rated = peers.filter((peer) => peer.ratingCount > 0)

  if (rated.length === 0) {
    return null
  }

  const total = rated.reduce((sum, peer) => sum + peer.averageRating, 0)
  return total / rated.length
}

function formatRating(value: number): string {
  return value.toFixed(1)
}

function positionGroupLabel(group: PositionGroup): string {
  if (group === 'gk') {
    return 'Kaleci'
  }

  if (group === 'def') {
    return 'Defans'
  }

  if (group === 'mid') {
    return 'Orta Saha'
  }

  if (group === 'fwd') {
    return 'Forvet'
  }

  return 'Kadro'
}

export function PlayerDetailSidebar({ player }: PlayerDetailSidebarProps) {
  const group = positionGroupFromAbbreviation(player.positionAbbreviation)
  const [peers, setPeers] = useState<PlayerResponseDto[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadPeers() {
      setIsLoading(true)

      const result = await playerService.getAll({
        pageNumber: 1,
        pageSize: 50,
        positionGroup: toListPositionGroup(group),
        sort: 'rating-desc',
      })

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setPeers(result.data.items)
      } else {
        setPeers([])
      }

      setIsLoading(false)
    }

    void loadPeers()

    return () => {
      cancelled = true
    }
  }, [group])

  const groupPeers = peers.filter((peer) => peer.id !== player.id)
  const rivals = [...groupPeers]
    .sort((a, b) => rivalScore(b, group) - rivalScore(a, group))
    .slice(0, RIVAL_LIMIT)

  const groupForAverages = peers.length > 0 ? peers : [player]
  const marketAvg = averageMarketValue(groupForAverages)
  const ratingAvg = averageRating(groupForAverages)
  const groupLabel = positionGroupLabel(group)

  return (
    <aside className="flex flex-col gap-space-lg lg:col-span-4">
      <PlayerPollCard playerId={player.id} />

      <div className="flex flex-col gap-space-md bg-surface-container-lowest p-space-md shadow-sm">
        <span className="font-kicker text-kicker font-bold tracking-widest text-secondary uppercase">
          POZİSYON KIYASI · {groupLabel}
        </span>

        {isLoading ? (
          <p className="font-body text-body-sm text-on-surface-variant">Kadro verisi yükleniyor...</p>
        ) : (
          <div className="grid grid-cols-2 gap-space-sm">
            <div className="bg-surface-container-low p-space-sm">
              <span className="font-kicker mb-1 block text-kicker text-on-surface-variant uppercase">
                Piyasa Değeri
              </span>
              <span className="font-headline block text-headline-sm font-bold text-primary">
                {player.marketValue != null
                  ? formatMarketValue(player.marketValue)
                  : '—'}
              </span>
              <span className="font-body mt-1 block text-[12px] text-on-surface-variant">
                Grup ort.{' '}
                {marketAvg != null ? formatMarketValue(Math.round(marketAvg)) : '—'}
              </span>
            </div>
            <div className="bg-surface-container-low p-space-sm">
              <span className="font-kicker mb-1 block text-kicker text-on-surface-variant uppercase">
                Ortalama Puan
              </span>
              <span className="font-headline block text-headline-sm font-bold text-primary">
                {player.ratingCount > 0 ? formatRating(player.averageRating) : '—'}
              </span>
              <span className="font-body mt-1 block text-[12px] text-on-surface-variant">
                Grup ort. {ratingAvg != null ? formatRating(ratingAvg) : '—'}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-space-md bg-surface-container-lowest p-space-md shadow-sm">
        <span className="font-kicker text-kicker font-bold tracking-widest text-secondary uppercase">
          Pozisyonundaki Diğer Oyuncular
        </span>

        {isLoading ? (
          <p className="font-body text-body-sm text-on-surface-variant">Rakipler yükleniyor...</p>
        ) : rivals.length === 0 ? (
          <p className="font-body text-body-sm text-on-surface-variant">
            Aynı pozisyon grubunda başka oyuncu bulunmuyor.
          </p>
        ) : (
          <div className="flex flex-col gap-space-sm">
            {rivals.map((rival) => (
              <Link
                key={rival.id}
                to={`/oyuncular/${rival.id}`}
                className="flex items-center justify-between gap-space-sm bg-surface-container-low p-space-sm transition-colors hover:bg-surface-container"
              >
                <div className="flex items-center gap-space-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary-container font-headline text-sm font-bold text-on-primary">
                    {rival.shirtNumber != null ? rival.shirtNumber : '—'}
                  </div>
                  <div>
                    <span className="font-headline block text-sm font-bold text-primary">
                      {rival.name}
                    </span>
                    <span className="font-body text-body-sm text-on-surface-variant">
                      {formatRivalLine(rival, group)}
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline">compare_arrows</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      <PlayerCareerArchive
        playerId={player.id}
        positionAbbreviation={player.positionAbbreviation}
      />
    </aside>
  )
}
