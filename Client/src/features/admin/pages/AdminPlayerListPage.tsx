import { useEffect, useState } from 'react'
import playerService from '@/features/players/playerService'
import type { PlayerAdminSummaryDto } from '@/features/players/playerTypes'
import { AdminPlayerDeleteModal } from '../components/AdminPlayerDeleteModal'
import { AdminPlayerListFilters } from '../components/AdminPlayerListFilters'
import { AdminPlayerListHeader } from '../components/AdminPlayerListHeader'
import { AdminPlayerPagination } from '../components/AdminPlayerPagination'
import { AdminPlayerTable } from '../components/AdminPlayerTable'
import { mapPlayerResponseToListRow } from '../utils/adminPlayerDraftUtils'
import type {
  AdminPlayerListRow,
  AdminPlayerPositionFilter,
  AdminPlayerStatusFilter,
} from '../utils/adminPlayerTypes'

const DEFAULT_PAGE_SIZE = 10

export function AdminPlayerListPage() {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<AdminPlayerStatusFilter>('all')
  const [positionFilter, setPositionFilter] = useState<AdminPlayerPositionFilter>('all')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)
  const [rows, setRows] = useState<AdminPlayerListRow[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [summary, setSummary] = useState<PlayerAdminSummaryDto | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<AdminPlayerListRow | null>(null)
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
  }, [debouncedSearch, statusFilter, positionFilter, pageSize])

  useEffect(() => {
    let cancelled = false

    async function loadSummary() {
      const result = await playerService.getAdminSummary()

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setSummary(result.data)
      } else {
        setSummary(null)
      }
    }

    void loadSummary()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    async function loadPlayers() {
      setIsLoading(true)

      const isActive =
        statusFilter === 'all' ? undefined : statusFilter === 'active'

      const result = await playerService.getAllForAdmin({
        pageNumber: page,
        pageSize,
        search: debouncedSearch || undefined,
        positionGroup: positionFilter,
        isActive,
      })

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setRows(result.data.items.map(mapPlayerResponseToListRow))
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

    void loadPlayers()

    return () => {
      cancelled = true
    }
  }, [page, pageSize, debouncedSearch, statusFilter, positionFilter, listVersion])

  function clearFilters() {
    setSearch('')
    setDebouncedSearch('')
    setStatusFilter('all')
    setPositionFilter('all')
    setPage(1)
  }

  async function handleConfirmDelete() {
    if (!deleteTarget || deletingId != null) {
      return
    }

    const deletedId = deleteTarget.id
    setDeletingId(deletedId)

    const result = await playerService.remove(deletedId)

    if (result.success) {
      setDeleteTarget(null)
      setListVersion((prev) => prev + 1)

      const summaryResult = await playerService.getAdminSummary()

      if (summaryResult.success && summaryResult.data) {
        setSummary(summaryResult.data)
      }
    }

    setDeletingId(null)
  }

  const counts = {
    all: summary?.totalCount ?? totalCount,
    active: summary?.activeCount ?? 0,
    inactive: summary?.inactiveCount ?? 0,
  }

  return (
    <div className="flex flex-col">
      <main className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
        <AdminPlayerListHeader />

        <AdminPlayerListFilters
          search={search}
          statusFilter={statusFilter}
          positionFilter={positionFilter}
          counts={counts}
          onSearchChange={setSearch}
          onStatusChange={setStatusFilter}
          onPositionChange={setPositionFilter}
          onClear={clearFilters}
        />

        {isLoading ? (
          <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
            Oyuncular yükleniyor...
          </p>
        ) : (
          <AdminPlayerTable
            players={rows}
            deletingId={deletingId}
            onDelete={setDeleteTarget}
          />
        )}

        {!isLoading && totalCount > 0 ? (
          <AdminPlayerPagination
            page={page}
            pageSize={pageSize}
            total={totalCount}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        ) : null}
      </main>

      <AdminPlayerDeleteModal
        open={Boolean(deleteTarget)}
        playerName={deleteTarget?.fullName ?? 'Oyuncu'}
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
