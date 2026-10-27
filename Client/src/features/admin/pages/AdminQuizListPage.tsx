import { useEffect, useMemo, useState } from 'react'
import quizCategoryService from '@/features/quizzes/quizCategoryService'
import quizService from '@/features/quizzes/quizService'
import type { QuizCategoryResponseDto } from '@/features/quizzes/quizTypes'
import { AdminQuizListFilters } from '../components/AdminQuizListFilters'
import { AdminQuizListHeader } from '../components/AdminQuizListHeader'
import { AdminQuizPagination } from '../components/AdminQuizPagination'
import { AdminQuizTable } from '../components/AdminQuizTable'
import {
  buildAdminQuizCategoryFilterOptions,
  mapQuizResponseToListRow,
} from '../utils/adminQuizDraftUtils'
import type { AdminQuizListRow, AdminQuizStatusFilter } from '../utils/adminQuizTypes'

const PAGE_SIZE = 8

export function AdminQuizListPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<AdminQuizStatusFilter>('all')
  const [category, setCategory] = useState('all')
  const [page, setPage] = useState(1)
  const [rows, setRows] = useState<AdminQuizListRow[]>([])
  const [categories, setCategories] = useState<QuizCategoryResponseDto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  async function loadQuizzes() {
    setIsLoading(true)

    const [quizResult, categoryResult] = await Promise.all([
      quizService.getAllForAdmin(),
      quizCategoryService.getAllForAdmin(),
    ])

    if (quizResult.success && quizResult.data) {
      setRows(quizResult.data.map(mapQuizResponseToListRow))
    } else {
      setRows([])
    }

    if (categoryResult.success && categoryResult.data) {
      setCategories(categoryResult.data)
    } else {
      setCategories([])
    }

    setIsLoading(false)
  }

  useEffect(() => {
    void loadQuizzes()
  }, [])

  const categoryOptions = useMemo(
    () => buildAdminQuizCategoryFilterOptions(categories),
    [categories],
  )

  const counts = useMemo(() => {
    return {
      all: rows.length,
      active: rows.filter((row) => row.status === 'active').length,
      passive: rows.filter((row) => row.status === 'passive').length,
    }
  }, [rows])

  const filtered = useMemo(() => {
    let result = [...rows]

    if (statusFilter !== 'all') {
      result = result.filter((row) => row.status === statusFilter)
    }

    if (category !== 'all') {
      const categoryValue = Number(category)
      result = result.filter((row) => row.quizCategoryId === categoryValue)
    }

    const query = search.trim().toLowerCase()

    if (query) {
      result = result.filter(
        (row) =>
          row.title.toLowerCase().includes(query) ||
          row.categoryLabel.toLowerCase().includes(query) ||
          row.description.toLowerCase().includes(query),
      )
    }

    return result
  }, [rows, search, statusFilter, category])

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

  async function handleDelete(id: string) {
    if (deletingId) {
      return
    }

    const confirmed = window.confirm('Bu quizi silmek istediğine emin misin?')

    if (!confirmed) {
      return
    }

    setDeletingId(id)

    const result = await quizService.remove(id)

    if (result.success) {
      setRows((prev) => prev.filter((row) => row.id !== id))
    }

    setDeletingId(null)
  }

  return (
    <main className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
      <AdminQuizListHeader
        totalCount={counts.all}
        activeCount={counts.active}
        passiveCount={counts.passive}
      />

      <AdminQuizListFilters
        search={search}
        statusFilter={statusFilter}
        category={category}
        categoryOptions={categoryOptions}
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

      {isLoading ? (
        <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
          Quizler yükleniyor...
        </p>
      ) : (
        <AdminQuizTable
          rows={pageRows}
          deletingId={deletingId}
          onDelete={(id) => {
            void handleDelete(id)
          }}
        />
      )}

      {!isLoading && filtered.length > PAGE_SIZE ? (
        <AdminQuizPagination
          page={currentPage}
          pageSize={PAGE_SIZE}
          total={filtered.length}
          onPageChange={setPage}
        />
      ) : null}
    </main>
  )
}
