import { useMemo, useState } from 'react'
import { AdminInjuryListFilters } from '../components/AdminInjuryListFilters'
import { AdminInjuryListHeader } from '../components/AdminInjuryListHeader'
import { AdminInjuryPagination } from '../components/AdminInjuryPagination'
import { AdminInjuryTable } from '../components/AdminInjuryTable'
import { adminInjuryListRows } from '../utils/adminInjuryPlaceholders'
import type { AdminInjuryStatusFilter } from '../utils/adminInjuryTypes'

const PAGE_SIZE = 7

export function AdminInjuryListPage() {
  const [playerId, setPlayerId] = useState('all')
  const [season, setSeason] = useState('2024/25')
  const [statusFilter, setStatusFilter] = useState<AdminInjuryStatusFilter>('all')
  const [page, setPage] = useState(1)

  const counts = useMemo(() => {
    return {
      all: 14,
      active: adminInjuryListRows.filter((row) => row.status === 'active').length,
      'match-form': adminInjuryListRows.filter((row) => row.status === 'match-form').length,
      recovered: adminInjuryListRows.filter((row) => row.status === 'recovered').length,
    }
  }, [])

  const filtered = useMemo(() => {
    let result = [...adminInjuryListRows]

    if (season !== 'all') {
      result = result.filter((row) => row.season === season)
    }

    if (playerId !== 'all') {
      result = result.filter((row) => row.id === playerId)
    }

    if (statusFilter !== 'all') {
      result = result.filter((row) => row.status === statusFilter)
    }

    return result
  }, [playerId, season, statusFilter])

  const totalPages = Math.max(1, Math.ceil(Math.max(filtered.length, 1) / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageStart = (currentPage - 1) * PAGE_SIZE
  const pageRows = filtered.slice(pageStart, pageStart + PAGE_SIZE)

  function resetPage() {
    setPage(1)
  }

  function clearFilters() {
    setPlayerId('all')
    setSeason('2024/25')
    setStatusFilter('all')
    setPage(1)
  }

  return (
    <main className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
      <AdminInjuryListHeader />

      <AdminInjuryListFilters
        playerId={playerId}
        season={season}
        statusFilter={statusFilter}
        counts={counts}
        visibleCount={
          filtered.length === adminInjuryListRows.length && season === '2024/25'
            ? 14
            : filtered.length
        }
        onPlayerChange={(value) => {
          setPlayerId(value)
          resetPage()
        }}
        onSeasonChange={(value) => {
          setSeason(value)
          resetPage()
        }}
        onStatusChange={(value) => {
          setStatusFilter(value)
          resetPage()
        }}
        onClear={clearFilters}
      />

      <AdminInjuryTable rows={pageRows} />

      <AdminInjuryPagination
        page={currentPage}
        pageSize={PAGE_SIZE}
        total={
          filtered.length === adminInjuryListRows.length && season === '2024/25'
            ? 14
            : filtered.length
        }
        onPageChange={setPage}
      />

      <section className="flex flex-col gap-space-md border border-outline-variant/40 bg-surface-container-low p-space-md lg:flex-row lg:items-start lg:justify-between">
        <div className="flex gap-space-sm">
          <span className="material-symbols-outlined text-secondary">gavel</span>
          <div>
            <h2 className="font-label text-label-md font-bold text-on-surface uppercase">
              Tıbbi Raporlama ve TFF Bildirim Protokolü
            </h2>
            <p className="font-body mt-1 text-body-sm text-on-surface-variant">
              Süper Lig ve Ziraat Türkiye Kupası müsabakaları öncesi esame listesi bildirimlerinde,
              sakatlığı süren veya iğne/özel tedaviyle kadroya dahil edilecek oyuncular için
              maçtan <strong className="text-primary">48 saat önce</strong> kulüp sağlık heyeti onay
              kodu sisteme girilmek zorundadır.
            </p>
          </div>
        </div>
        <span className="font-kicker shrink-0 bg-secondary-container px-space-md py-space-sm text-kicker text-on-secondary-container uppercase">
          TFF Protokolü: Tam Uyumlu
        </span>
      </section>
    </main>
  )
}
