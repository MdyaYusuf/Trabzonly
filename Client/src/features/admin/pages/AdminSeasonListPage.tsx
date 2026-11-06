import { useEffect, useState } from 'react'
import seasonService from '@/features/seasons/seasonService'
import { AdminSeasonDeleteModal } from '../components/AdminSeasonDeleteModal'
import { AdminSeasonListFilters } from '../components/AdminSeasonListFilters'
import { AdminSeasonListHeader } from '../components/AdminSeasonListHeader'
import { AdminSeasonPagination } from '../components/AdminSeasonPagination'
import { AdminSeasonTable } from '../components/AdminSeasonTable'
import { mapSeasonResponseToListRow } from '../utils/adminSeasonDraftUtils'
import type {
  AdminSeasonListRow,
  AdminSeasonSort,
  AdminSeasonStatusFilter,
} from '../utils/adminSeasonTypes'

const DEFAULT_PAGE_SIZE = 10

export function AdminSeasonListPage() {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<AdminSeasonStatusFilter>('all')
  const [sort, setSort] = useState<AdminSeasonSort>('start-desc')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)
  const [rows, setRows] = useState<AdminSeasonListRow[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<AdminSeasonListRow | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)
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
  }, [debouncedSearch, statusFilter, sort, pageSize])

  useEffect(() => {
    let cancelled = false

    async function loadSeasons() {
      setIsLoading(true)

      const isActive =
        statusFilter === 'all' ? undefined : statusFilter === 'active'

      const result = await seasonService.getAllForAdmin({
        pageNumber: page,
        pageSize,
        search: debouncedSearch || undefined,
        isActive,
        sort,
      })

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setRows(result.data.items.map(mapSeasonResponseToListRow))
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

    void loadSeasons()

    return () => {
      cancelled = true
    }
  }, [page, pageSize, debouncedSearch, statusFilter, sort, listVersion])

  function clearFilters() {
    setSearch('')
    setDebouncedSearch('')
    setStatusFilter('all')
    setSort('start-desc')
    setPage(1)
  }

  async function handleConfirmDelete() {
    if (!deleteTarget || deletingId != null) {
      return
    }

    if (deleteTarget.isActive) {
      return
    }

    const deletedId = deleteTarget.id
    setDeletingId(deletedId)

    const result = await seasonService.remove(deletedId)

    if (result.success) {
      setDeleteTarget(null)
      setListVersion((prev) => prev + 1)
    }

    setDeletingId(null)
  }

  return (
    <div className="flex flex-col">
      <main className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
        <AdminSeasonListHeader />

        <AdminSeasonListFilters
          search={search}
          statusFilter={statusFilter}
          sort={sort}
          onSearchChange={setSearch}
          onStatusChange={setStatusFilter}
          onSortChange={setSort}
          onClear={clearFilters}
        />

        {isLoading ? (
          <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
            Sezonlar yükleniyor...
          </p>
        ) : (
          <AdminSeasonTable
            seasons={rows}
            deletingId={deletingId}
            onDelete={setDeleteTarget}
          />
        )}

        {!isLoading && totalCount > 0 ? (
          <AdminSeasonPagination
            page={page}
            pageSize={pageSize}
            total={totalCount}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        ) : null}
      </main>

      <AdminSeasonDeleteModal
        open={Boolean(deleteTarget)}
        seasonName={deleteTarget?.name ?? 'Sezon'}
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
