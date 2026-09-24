import { useMemo, useState } from 'react'
import { AdminStatisticListFilters } from '../components/AdminStatisticListFilters'
import { AdminStatisticListHeader } from '../components/AdminStatisticListHeader'
import { AdminStatisticPagination } from '../components/AdminStatisticPagination'
import { AdminStatisticTable } from '../components/AdminStatisticTable'
import { adminStatisticListRows } from '../utils/adminStatisticPlaceholders'
import type {
  AdminStatisticPositionGroup,
  AdminStatisticSort,
} from '../utils/adminStatisticTypes'

const PAGE_SIZE = 7

export function AdminStatisticListPage() {
  const [search, setSearch] = useState('')
  const [season, setSeason] = useState('2024/25')
  const [playerId, setPlayerId] = useState('all')
  const [team, setTeam] = useState('all')
  const [sort, setSort] = useState<AdminStatisticSort>('goals-desc')
  const [positionGroup, setPositionGroup] = useState<AdminStatisticPositionGroup>('all')
  const [page, setPage] = useState(1)

  const counts = useMemo(() => {
    return {
      all: 142,
      gk: 12,
      def: 44,
      mid: 48,
      att: 38,
    }
  }, [])

  const filtered = useMemo(() => {
    let result = [...adminStatisticListRows]

    if (season !== 'all') {
      result = result.filter((row) => row.season === season)
    }

    if (playerId !== 'all') {
      result = result.filter((row) => row.id === playerId)
    }

    if (team !== 'all') {
      result = result.filter((row) => row.team === team || team === 'Trabzonspor')
    }

    if (positionGroup !== 'all') {
      result = result.filter((row) => row.positionGroup === positionGroup)
    }

    const query = search.trim().toLowerCase()

    if (query) {
      result = result.filter(
        (row) =>
          row.playerName.toLowerCase().includes(query) ||
          String(row.number).includes(query) ||
          row.positionCode.toLowerCase().includes(query),
      )
    }

    result.sort((a, b) => {
      if (sort === 'assists-desc') {
        return b.assists - a.assists
      }

      if (sort === 'matches-desc') {
        return b.matches - a.matches
      }

      if (sort === 'minutes-desc') {
        return b.minutes - a.minutes
      }

      return b.goals - a.goals
    })

    return result
  }, [search, season, playerId, team, sort, positionGroup])

  const totalPages = Math.max(1, Math.ceil(Math.max(filtered.length, 1) / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageStart = (currentPage - 1) * PAGE_SIZE
  const pageRows = filtered.slice(pageStart, pageStart + PAGE_SIZE)

  function resetPage() {
    setPage(1)
  }

  function clearFilters() {
    setSearch('')
    setSeason('2024/25')
    setPlayerId('all')
    setTeam('all')
    setSort('goals-desc')
    setPositionGroup('all')
    setPage(1)
  }

  return (
    <main className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
      <AdminStatisticListHeader />

      <AdminStatisticListFilters
        search={search}
        season={season}
        playerId={playerId}
        team={team}
        sort={sort}
        positionGroup={positionGroup}
        counts={counts}
        visibleCount={filtered.length}
        onSearchChange={(value) => {
          setSearch(value)
          resetPage()
        }}
        onSeasonChange={(value) => {
          setSeason(value)
          resetPage()
        }}
        onPlayerChange={(value) => {
          setPlayerId(value)
          resetPage()
        }}
        onTeamChange={(value) => {
          setTeam(value)
          resetPage()
        }}
        onSortChange={(value) => {
          setSort(value)
          resetPage()
        }}
        onPositionChange={(value) => {
          setPositionGroup(value)
          resetPage()
        }}
        onClear={clearFilters}
      />

      <AdminStatisticTable rows={pageRows} />

      <AdminStatisticPagination
        page={currentPage}
        pageSize={PAGE_SIZE}
        total={filtered.length === adminStatisticListRows.length ? 142 : filtered.length}
        onPageChange={setPage}
      />

      <section className="grid grid-cols-1 gap-gutter lg:grid-cols-2">
        <article className="flex gap-space-sm border border-outline-variant/40 bg-surface-container-low p-space-md">
          <span className="material-symbols-outlined text-secondary">sync_alt</span>
          <div>
            <h2 className="font-label text-label-md font-bold text-on-surface uppercase">
              Veri Tabanı & Federasyon Senkronizasyonu
            </h2>
            <p className="font-body mt-1 text-body-sm text-on-surface-variant">
              Tüm veriler <strong className="text-primary">TFF ve Opta Sports</strong> istatistik
              akışları ile her maç bitiminden 15 dakika sonra otomatik senkronize edilir. Manuel
              eklenen veriler bir sonraki API çağrısında teyit edilerek kalıcı olarak damgalanır.
            </p>
          </div>
        </article>
        <article className="flex gap-space-sm border border-outline-variant/40 bg-surface-container-low p-space-md">
          <span className="material-symbols-outlined text-secondary">info</span>
          <div>
            <h2 className="font-label text-label-md font-bold text-on-surface uppercase">
              Filtre Boş Durum Protokolü
            </h2>
            <p className="font-body mt-1 text-body-sm text-on-surface-variant">
              Uygulanan arama kriterlerine karşılık veri bulunamadığında sistem arayüzde{' '}
              <em>
                &quot;Bu filtreler için istatistik bulunamadı. Lütfen sezon veya oyuncu
                kriterlerini güncelleyiniz.&quot;
              </em>{' '}
              durum bildirimini dinamik olarak yükler.
            </p>
          </div>
        </article>
      </section>
    </main>
  )
}
