import { useEffect, useMemo, useState } from 'react'
import quizCategoryService from '@/features/quizzes/quizCategoryService'
import quizService from '@/features/quizzes/quizService'
import type { QuizCategoryResponseDto } from '@/features/quizzes/quizTypes'
import { AdminQuizDeleteModal } from '../components/AdminQuizDeleteModal'
import { AdminQuizListFilters } from '../components/AdminQuizListFilters'
import { AdminQuizListHeader } from '../components/AdminQuizListHeader'
import { AdminQuizPagination } from '../components/AdminQuizPagination'
import { AdminQuizTable } from '../components/AdminQuizTable'
import {
  buildAdminQuizCategoryFilterOptions,
  mapQuizAdminItemToListRow,
} from '../utils/adminQuizDraftUtils'
import type {
  AdminQuizListRow,
  AdminQuizSort,
  AdminQuizStatusFilter,
} from '../utils/adminQuizTypes'

const DEFAULT_PAGE_SIZE = 10

export function AdminQuizListPage() {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<AdminQuizStatusFilter>('all')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState<AdminQuizSort>('title-asc')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)
  const [rows, setRows] = useState<AdminQuizListRow[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [categories, setCategories] = useState<QuizCategoryResponseDto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<AdminQuizListRow | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [listVersion, setListVersion] = useState(0)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search.trim())
    }, 300)

    return () => {
      window.clearTimeout(timer)
    }
  }, [search])

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, statusFilter, category, sort, pageSize])

  useEffect(() => {
    let cancelled = false

    async function loadCategories() {
      const result = await quizCategoryService.getAllForAdmin()

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setCategories(result.data)
      } else {
        setCategories([])
      }
    }

    void loadCategories()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    async function loadQuizzes() {
      setIsLoading(true)

      const isActive =
        statusFilter === 'all' ? undefined : statusFilter === 'active'

      const result = await quizService.getAllForAdmin({
        pageNumber: page,
        pageSize,
        search: debouncedSearch || undefined,
        isActive,
        quizCategoryId: category === 'all' ? undefined : Number(category),
        sort,
      })

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setRows(result.data.items.map(mapQuizAdminItemToListRow))
        setTotalCount(result.data.totalCount)

        if (result.data.items.length === 0 && result.data.totalCount > 0 && page > 1) {
          setPage((prev) => Math.max(1, prev - 1))
        }
      } else {
        setRows([])
        setTotalCount(0)
      }

      setIsLoading(false)
    }

    void loadQuizzes()

    return () => {
      cancelled = true
    }
  }, [page, pageSize, debouncedSearch, statusFilter, category, sort, listVersion])

  const categoryOptions = useMemo(
    () => buildAdminQuizCategoryFilterOptions(categories),
    [categories],
  )

  function clearFilters() {
    setSearch('')
    setDebouncedSearch('')
    setStatusFilter('all')
    setCategory('all')
    setSort('title-asc')
    setPage(1)
  }

  async function handleConfirmDelete() {
    if (!deleteTarget || deletingId != null) {
      return
    }

    const deletedId = deleteTarget.id
    setDeletingId(deletedId)

    const result = await quizService.remove(deletedId)

    if (result.success) {
      setDeleteTarget(null)
      setListVersion((prev) => prev + 1)
    }

    setDeletingId(null)
  }

  return (
    <div className="flex flex-col">
      <main className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
        <AdminQuizListHeader />

        <AdminQuizListFilters
          search={search}
          statusFilter={statusFilter}
          category={category}
          sort={sort}
          categoryOptions={categoryOptions}
          onSearchChange={setSearch}
          onStatusChange={setStatusFilter}
          onCategoryChange={setCategory}
          onSortChange={setSort}
          onClear={clearFilters}
        />

        {isLoading ? (
          <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
            Quizler yükleniyor...
          </p>
        ) : (
          <AdminQuizTable
            rows={rows}
            deletingId={deletingId}
            onDelete={setDeleteTarget}
          />
        )}

        {!isLoading && totalCount > 0 ? (
          <AdminQuizPagination
            page={page}
            pageSize={pageSize}
            total={totalCount}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        ) : null}
      </main>

      <AdminQuizDeleteModal
        open={deleteTarget != null}
        quizTitle={deleteTarget?.title ?? 'Quiz'}
        isDeleting={deletingId != null}
        onCancel={() => {
          if (deletingId != null) {
            return
          }

          setDeleteTarget(null)
        }}
        onConfirm={() => {
          void handleConfirmDelete()
        }}
      />
    </div>
  )
}
