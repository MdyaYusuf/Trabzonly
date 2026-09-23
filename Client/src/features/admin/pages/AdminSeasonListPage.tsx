import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AdminSeasonListFilters } from '../components/AdminSeasonListFilters'
import { AdminSeasonListHeader } from '../components/AdminSeasonListHeader'
import { AdminSeasonPagination } from '../components/AdminSeasonPagination'
import { AdminSeasonTable } from '../components/AdminSeasonTable'
import { adminSeasonListRows } from '../utils/adminSeasonPlaceholders'
import type { AdminSeasonSort, AdminSeasonStatusFilter } from '../utils/adminSeasonTypes'

const PAGE_SIZE = 6

export function AdminSeasonListPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<AdminSeasonStatusFilter>('all')
  const [sort, setSort] = useState<AdminSeasonSort>('start-desc')
  const [page, setPage] = useState(1)

  const counts = useMemo(() => {
    const active = adminSeasonListRows.filter((row) => row.status === 'active').length
    const archive = adminSeasonListRows.filter((row) => row.status !== 'active').length

    return {
      all: adminSeasonListRows.length,
      active,
      archive,
    }
  }, [])

  const filtered = useMemo(() => {
    let result = [...adminSeasonListRows]

    if (statusFilter === 'active') {
      result = result.filter((row) => row.status === 'active')
    } else if (statusFilter === 'archive') {
      result = result.filter((row) => row.status !== 'active')
    }

    const query = search.trim().toLowerCase()

    if (query) {
      result = result.filter(
        (row) =>
          row.name.toLowerCase().includes(query) ||
          row.subtitle.toLowerCase().includes(query) ||
          row.statusLabel.toLowerCase().includes(query),
      )
    }

    result.sort((a, b) => {
      if (sort === 'start-asc') {
        return a.startSortKey.localeCompare(b.startSortKey)
      }

      if (sort === 'alpha') {
        return a.name.localeCompare(b.name, 'tr')
      }

      if (sort === 'matches') {
        return b.matchCount - a.matchCount
      }

      return b.startSortKey.localeCompare(a.startSortKey)
    })

    return result
  }, [search, statusFilter, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageStart = (currentPage - 1) * PAGE_SIZE
  const pageSeasons = filtered.slice(pageStart, pageStart + PAGE_SIZE)

  function resetPage() {
    setPage(1)
  }

  return (
    <main className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
      <AdminSeasonListHeader />

      <AdminSeasonListFilters
        search={search}
        statusFilter={statusFilter}
        sort={sort}
        counts={counts}
        onSearchChange={(value) => {
          setSearch(value)
          resetPage()
        }}
        onStatusChange={(value) => {
          setStatusFilter(value)
          resetPage()
        }}
        onSortChange={(value) => {
          setSort(value)
          resetPage()
        }}
      />

      <AdminSeasonTable seasons={pageSeasons} />

      <AdminSeasonPagination
        page={currentPage}
        pageSize={PAGE_SIZE}
        total={filtered.length}
        onPageChange={setPage}
      />

      <section className="flex flex-col gap-space-md border border-outline-variant/40 bg-surface-container-low p-space-md lg:flex-row lg:items-start lg:justify-between">
        <div className="flex gap-space-sm">
          <span className="material-symbols-outlined text-secondary">info</span>
          <div>
            <h2 className="font-label text-label-md font-bold text-on-surface uppercase">
              Sezonlama Sistem Notu & Otomasyon Rehberi
            </h2>
            <p className="font-body mt-1 text-body-sm text-on-surface-variant">
              Bir sezonun başlangıç ve bitiş tarihleri; o periyottaki oyuncu sakatlık raporlarını,
              maç esame listelerini, teknik heyet görev dağılımlarını ve taraftar quiz puan
              tablolarını otomatik olarak gruplar. Mevcut sezon statüsü değiştirildiğinde tüm
              yönetim paneli varsayılan filtreleri ve kamuya açık Trabzonly portalındaki canlı
              istatistik kartları anlık olarak yeni periyoda senkronize olur.
            </p>
          </div>
        </div>
        <Link
          to="/yonetim/sezonlar/yeni"
          className="font-label inline-flex shrink-0 items-center gap-1 bg-primary-container px-space-md py-space-sm text-label-md font-bold text-on-primary uppercase transition-all hover:bg-primary"
        >
          <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
          Yeni Sezon Tanımla
        </Link>
      </section>
    </main>
  )
}
