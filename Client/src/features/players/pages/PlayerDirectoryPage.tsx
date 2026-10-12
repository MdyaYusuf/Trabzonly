import { useEffect, useState } from 'react'
import { PlayerCard } from '../components/PlayerCard'
import { PlayerDirectoryBreadcrumb } from '../components/PlayerDirectoryBreadcrumb'
import { PlayerDirectoryCta } from '../components/PlayerDirectoryCta'
import { PlayerDirectoryFilters } from '../components/PlayerDirectoryFilters'
import { PlayerDirectoryHero } from '../components/PlayerDirectoryHero'
import { PlayerDirectoryPagination } from '../components/PlayerDirectoryPagination'
import { PlayerDirectorySidebar } from '../components/PlayerDirectorySidebar'
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
  const [lastUpdatedLabel, setLastUpdatedLabel] = useState('—')
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

    async function loadOverview() {
      const summaryResult = await playerService.getRosterOverview()

      if (cancelled) {
        return
      }

      if (summaryResult.success && summaryResult.data) {
        setLastUpdatedLabel(formatLastUpdated(summaryResult.data.lastUpdated))
      }
    }

    void loadOverview()

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
      <PlayerDirectoryBreadcrumb />
      <PlayerDirectoryHero />

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
          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12">
            <div className="flex flex-col gap-space-lg lg:col-span-8">
              <div className="flex flex-col items-start justify-between gap-space-sm pb-space-md sm:flex-row sm:items-center">
                <div className="flex flex-wrap items-center gap-space-sm">
                  <span className="inline-block h-3 w-3 bg-primary" />
                  <h2 className="font-headline text-headline-md font-bold tracking-tight text-primary uppercase">
                    KADRO LİSTESİ
                  </h2>
                  <div className="flex items-center gap-space-xs bg-surface-container-highest px-space-sm py-0.5">
                    <span className="material-symbols-outlined text-[18px] text-tertiary-fixed-dim">
                      groups
                    </span>
                    <span className="font-kicker text-kicker font-bold text-on-surface uppercase">
                      {totalCount} OYUNCU
                    </span>
                  </div>
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
                <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
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

            <PlayerDirectorySidebar />
          </div>
        </div>
      </section>

      <PlayerDirectoryCta />
    </main>
  )
}
