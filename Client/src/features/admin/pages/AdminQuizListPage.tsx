import { useMemo, useState } from 'react'
import { AdminQuizListFilters } from '../components/AdminQuizListFilters'
import { AdminQuizListHeader } from '../components/AdminQuizListHeader'
import { AdminQuizPagination } from '../components/AdminQuizPagination'
import { AdminQuizTable } from '../components/AdminQuizTable'
import { adminQuizListRows } from '../utils/adminQuizPlaceholders'
import type { AdminQuizStatusFilter } from '../utils/adminQuizTypes'

const PAGE_SIZE = 5

export function AdminQuizListPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<AdminQuizStatusFilter>('all')
  const [category, setCategory] = useState('all')
  const [page, setPage] = useState(1)

  const counts = useMemo(() => {
    return {
      all: 12,
      active: 8,
      passive: 4,
    }
  }, [])

  const filtered = useMemo(() => {
    let result = [...adminQuizListRows]

    if (statusFilter !== 'all') {
      result = result.filter((row) => row.status === statusFilter)
    }

    if (category !== 'all') {
      result = result.filter((row) => row.categoryKey === category)
    }

    const query = search.trim().toLowerCase()

    if (query) {
      result = result.filter(
        (row) =>
          row.title.toLowerCase().includes(query) ||
          row.category.toLowerCase().includes(query) ||
          row.description.toLowerCase().includes(query),
      )
    }

    return result
  }, [search, statusFilter, category])

  const totalPages = Math.max(1, Math.ceil(Math.max(filtered.length, 1) / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageStart = (currentPage - 1) * PAGE_SIZE
  const pageRows = filtered.slice(pageStart, pageStart + PAGE_SIZE)

  function resetPage() {
    setPage(1)
  }

  function clearFilters() {
    setSearch('')
    setStatusFilter('all')
    setCategory('all')
    setPage(1)
  }

  const displayTotal =
    filtered.length === adminQuizListRows.length &&
    statusFilter === 'all' &&
    category === 'all' &&
    !search.trim()
      ? 12
      : filtered.length

  return (
    <main className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
      <AdminQuizListHeader />

      <AdminQuizListFilters
        search={search}
        statusFilter={statusFilter}
        category={category}
        counts={counts}
        onSearchChange={(value) => {
          setSearch(value)
          resetPage()
        }}
        onStatusChange={(value) => {
          setStatusFilter(value)
          resetPage()
        }}
        onCategoryChange={(value) => {
          setCategory(value)
          resetPage()
        }}
        onClear={clearFilters}
      />

      <AdminQuizTable rows={pageRows} />

      <AdminQuizPagination
        page={currentPage}
        pageSize={PAGE_SIZE}
        total={displayTotal}
        onPageChange={setPage}
      />

      <section className="flex gap-space-sm border border-outline-variant/40 bg-surface-container-low p-space-md">
        <span className="material-symbols-outlined text-secondary">info</span>
        <div>
          <h2 className="font-label text-label-md font-bold text-on-surface uppercase">
            Quiz Moderasyon ve Canlı Yayın Protokolü
          </h2>
          <p className="font-body mt-1 text-body-sm text-on-surface-variant">
            Yayınlanan tüm quizler anlık olarak Trabzonly taraftar mobil ve masaüstü arayüzünde
            puanlama ve liderlik tablosuyla eşlenir. Değişiklikler anlık önbellek yenilemesiyle
            taraftarlara yansıtılır.
          </p>
        </div>
      </section>
    </main>
  )
}
