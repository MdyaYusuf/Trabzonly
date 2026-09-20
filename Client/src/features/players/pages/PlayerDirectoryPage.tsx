import { useMemo, useState } from 'react'
import { PlayerCard } from '../components/PlayerCard'
import { PlayerDirectoryCta } from '../components/PlayerDirectoryCta'
import { PlayerDirectoryFilters } from '../components/PlayerDirectoryFilters'
import { PlayerDirectoryHero } from '../components/PlayerDirectoryHero'
import { PlayerDirectoryPagination } from '../components/PlayerDirectoryPagination'
import {
  PAGE_SIZE,
  placeholderPlayers,
} from '../utils/playerDirectoryPlaceholders'
import {
  type NationFilter,
  type PlayerCardData,
  type PositionGroup,
  type SortOption,
} from '../utils/playerDirectoryTypes'

function appearancesOf(player: PlayerCardData) {
  const apps = player.stats.find((stat) => stat.label === 'Maç')
  return apps ? Number(apps.value) : 0
}

export function PlayerDirectoryPage() {
  const [positionFilter, setPositionFilter] = useState<PositionGroup>('all')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortOption>('value-desc')
  const [nationFilter, setNationFilter] = useState<NationFilter>('all')
  const [page, setPage] = useState(1)

  const positionCounts = useMemo(() => {
    return {
      all: placeholderPlayers.length,
      gk: placeholderPlayers.filter((player) => player.positionGroup === 'gk').length,
      def: placeholderPlayers.filter((player) => player.positionGroup === 'def').length,
      mid: placeholderPlayers.filter((player) => player.positionGroup === 'mid').length,
      fwd: placeholderPlayers.filter((player) => player.positionGroup === 'fwd').length,
    }
  }, [])

  const filteredPlayers = useMemo(() => {
    let result = [...placeholderPlayers]

    if (positionFilter !== 'all') {
      result = result.filter((player) => player.positionGroup === positionFilter)
    }

    if (nationFilter === 'domestic') {
      result = result.filter((player) => player.isDomestic)
    } else if (nationFilter === 'foreign') {
      result = result.filter((player) => !player.isDomestic)
    }

    const query = search.trim().toLowerCase()

    if (query) {
      result = result.filter(
        (player) =>
          player.name.toLowerCase().includes(query) ||
          String(player.number).includes(query),
      )
    }

    result.sort((a, b) => {
      if (sort === 'value-desc') {
        return b.marketValue - a.marketValue
      }

      if (sort === 'rating-desc') {
        return b.rating - a.rating
      }

      if (sort === 'number-asc') {
        return a.number - b.number
      }

      return appearancesOf(b) - appearancesOf(a)
    })

    return result
  }, [nationFilter, positionFilter, search, sort])

  const totalPages = Math.max(1, Math.ceil(filteredPlayers.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageStart = (currentPage - 1) * PAGE_SIZE
  const pagePlayers = filteredPlayers.slice(pageStart, pageStart + PAGE_SIZE)
  const rangeStart = filteredPlayers.length === 0 ? 0 : pageStart + 1
  const rangeEnd = Math.min(pageStart + PAGE_SIZE, filteredPlayers.length)

  const totalSquadValue = placeholderPlayers.reduce((sum, player) => sum + player.marketValue, 0)

  function setFilter(next: PositionGroup) {
    setPositionFilter(next)
    setPage(1)
  }

  return (
    <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
      <PlayerDirectoryHero totalSquadValue={totalSquadValue} />

      <PlayerDirectoryFilters
        positionFilter={positionFilter}
        search={search}
        sort={sort}
        nationFilter={nationFilter}
        positionCounts={positionCounts}
        onPositionFilterChange={setFilter}
        onSearchChange={(value) => {
          setSearch(value)
          setPage(1)
        }}
        onSortChange={(value) => {
          setSort(value)
          setPage(1)
        }}
        onNationFilterChange={(value) => {
          setNationFilter(value)
          setPage(1)
        }}
      />

      <section className="w-full bg-background py-space-xl">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-12">
          <div className="mb-space-lg flex flex-col items-start justify-between gap-space-sm pb-space-md sm:flex-row sm:items-center">
            <div className="flex flex-wrap items-center gap-space-sm">
              <span className="inline-block h-3 w-3 bg-primary" />
              <h2 className="font-headline text-headline-md font-bold tracking-tight text-primary uppercase">
                KADRO LİSTESİ
              </h2>
              <span className="bg-surface-container-highest px-space-xs py-0.5 font-kicker text-kicker font-bold text-on-surface">
                {filteredPlayers.length} FUTBOLCU GÖSTERİLİYOR
              </span>
            </div>
            <div className="font-label flex items-center gap-space-xs text-label-md text-on-surface-variant">
              <span className="material-symbols-outlined text-body-md text-secondary">sync</span>
              <span>Son Güncelleme: 28 Ekim 2024</span>
            </div>
          </div>

          {pagePlayers.length === 0 ? (
            <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
              Bu filtrelere uygun oyuncu bulunamadı.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {pagePlayers.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          )}

          <PlayerDirectoryPagination
            filteredCount={filteredPlayers.length}
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
