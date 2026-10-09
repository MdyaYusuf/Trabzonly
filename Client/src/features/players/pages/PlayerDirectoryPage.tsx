import { useEffect, useState } from 'react'
import { PlayerCard } from '../components/PlayerCard'
import { PlayerDirectoryCta } from '../components/PlayerDirectoryCta'
import { PlayerDirectoryFilters } from '../components/PlayerDirectoryFilters'
import { PlayerDirectoryHero } from '../components/PlayerDirectoryHero'
import { PlayerDirectoryPagination } from '../components/PlayerDirectoryPagination'
import playerService from '../playerService'
import {
  formatLastUpdated,
  mapPlayerToCardData,
} from '../utils/mapPlayerToCardData'
import {
  PAGE_SIZE,
  type PlayerCardData,
  type PositionGroup,
  type SortOption,
} from '../utils/playerDirectoryTypes'

export function PlayerDirectoryPage() {
  const [positionFilter, setPositionFilter] = useState<PositionGroup>('all')
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [sort, setSort] = useState<SortOption>('value-desc')
  const [page, setPage] = useState(1)
  const [players, setPlayers] = useState<PlayerCardData[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [totalSquadValue, setTotalSquadValue] = useState(0)
  const [activePlayerCount, setActivePlayerCount] = useState(0)
  const [lastUpdatedLabel, setLastUpdatedLabel] = useState('—')
  const [seasonLabel, setSeasonLabel] = useState<string | null>(null)
  const [topValued, setTopValued] = useState<PlayerCardData | null>(null)
  const [mostCommented, setMostCommented] = useState<PlayerCardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search.trim())
    }, 300)

    return () => {
      window.clearTimeout(timer)
    }
  }, [search])

  useEffect(() => {
    let cancelled = false

    async function loadSummaryAndHero() {
      const [summaryResult, topValuedResult, mostCommentedResult] = await Promise.all([
        playerService.getRosterOverview(),
        playerService.getTopValued(1),
        playerService.getMostCommented(1),
      ])

      if (cancelled) {
        return
      }

      if (summaryResult.success && summaryResult.data) {
        setTotalSquadValue(summaryResult.data.totalMarketValue)
        setActivePlayerCount(summaryResult.data.activePlayerCount)
        setLastUpdatedLabel(formatLastUpdated(summaryResult.data.lastUpdated))
        setSeasonLabel(summaryResult.data.currentSeasonName ?? null)
      }

      if (topValuedResult.success && topValuedResult.data?.items?.[0]) {
        setTopValued(mapPlayerToCardData(topValuedResult.data.items[0], 0))
      }

      if (mostCommentedResult.success && mostCommentedResult.data?.[0]) {
        setMostCommented(mapPlayerToCardData(mostCommentedResult.data[0], 1))
      }
    }

    void loadSummaryAndHero()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    async function loadPlayers() {
      setIsLoading(true)

      const result = await playerService.getAll({
        pageNumber: page,
        pageSize: PAGE_SIZE,
        search: debouncedSearch || undefined,
        positionGroup: positionFilter,
        sort,
      })

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setPlayers(result.data.items.map((player, index) => mapPlayerToCardData(player, index)))
        setTotalCount(result.data.totalCount)

        const maxPage = Math.max(1, Math.ceil(result.data.totalCount / PAGE_SIZE))

        if (page > maxPage) {
          setPage(maxPage)
        }
      } else {
        setPlayers([])
        setTotalCount(0)
      }

      setIsLoading(false)
    }

    void loadPlayers()

    return () => {
      cancelled = true
    }
  }, [debouncedSearch, page, positionFilter, sort])

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageStart = (currentPage - 1) * PAGE_SIZE
  const rangeStart = totalCount === 0 ? 0 : pageStart + 1
  const rangeEnd = Math.min(pageStart + PAGE_SIZE, totalCount)

  function setFilter(next: PositionGroup) {
    setPositionFilter(next)
    setPage(1)
  }

  return (
    <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
      <PlayerDirectoryHero
        totalSquadValue={totalSquadValue}
        activePlayerCount={activePlayerCount}
        seasonLabel={seasonLabel}
        topValued={topValued}
        mostCommented={mostCommented}
      />

      <PlayerDirectoryFilters
        positionFilter={positionFilter}
        search={search}
        sort={sort}
        onPositionFilterChange={setFilter}
        onSearchChange={(value) => {
          setSearch(value)
          setPage(1)
        }}
        onSortChange={(value) => {
          setSort(value)
          setPage(1)
        }}
      />

      <section id="kadro-listesi" className="w-full bg-background py-space-xl">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-12">
          <div className="mb-space-lg flex flex-col items-start justify-between gap-space-sm pb-space-md sm:flex-row sm:items-center">
            <div className="flex flex-wrap items-center gap-space-sm">
              <span className="inline-block h-3 w-3 bg-primary" />
              <h2 className="font-headline text-headline-md font-bold tracking-tight text-primary uppercase">
                KADRO LİSTESİ
              </h2>
              <span className="bg-surface-container-highest px-space-xs py-0.5 font-kicker text-kicker font-bold text-on-surface">
                {totalCount} FUTBOLCU GÖSTERİLİYOR
              </span>
            </div>
            <div className="font-label flex items-center gap-space-xs text-label-md text-on-surface-variant">
              <span className="material-symbols-outlined text-body-md text-secondary">sync</span>
              <span>Son Güncelleme: {lastUpdatedLabel}</span>
            </div>
          </div>

          {isLoading ? (
            <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
              Oyuncular yükleniyor...
            </p>
          ) : players.length === 0 ? (
            <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
              Bu filtrelere uygun oyuncu bulunamadı.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {players.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          )}

          <PlayerDirectoryPagination
            filteredCount={totalCount}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setPage}
          />
        </div>
      </section>

      <PlayerDirectoryCta />
    </main>
  )
}
