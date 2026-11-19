import { useEffect, useState } from 'react'
import playerService from '@/features/players/playerService'
import { PlayerCategory } from '@/features/players/playerTypes'
import { AdminPlayerDeleteModal } from '../components/AdminPlayerDeleteModal'
import { AdminPlayerListFilters } from '../components/AdminPlayerListFilters'
import { AdminPlayerListHeader } from '../components/AdminPlayerListHeader'
import { AdminPlayerPagination } from '../components/AdminPlayerPagination'
import { AdminPlayerTable } from '../components/AdminPlayerTable'
import { mapPlayerResponseToListRow } from '../utils/adminPlayerDraftUtils'
import {
  getAdminPlayerCreatePath,
  getAdminPlayerModule,
} from '../utils/adminPlayerModuleConfig'
import type {
  AdminPlayerListRow,
  AdminPlayerPositionFilter,
  AdminPlayerStatusFilter,
} from '../utils/adminPlayerTypes'

const DEFAULT_PAGE_SIZE = 10

type AdminPlayerListPageProps = {
  category?: PlayerCategory
}

export function AdminPlayerListPage({
  category = PlayerCategory.Current,
}: AdminPlayerListPageProps) {
  const module = getAdminPlayerModule(category)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<AdminPlayerStatusFilter>('all')
  const [positionFilter, setPositionFilter] = useState<AdminPlayerPositionFilter>('all')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)
  const [rows, setRows] = useState<AdminPlayerListRow[]>([])
  const [totalCount, setTotalCount] = useState(0)
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
    setSearch('')
    setDebouncedSearch('')
    setStatusFilter('all')
    setPositionFilter('all')
  }, [category])

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, statusFilter, positionFilter, pageSize])

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
        category,
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
  }, [category, page, pageSize, debouncedSearch, statusFilter, positionFilter, listVersion])

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
    }

    setDeletingId(null)
  }

  return (
    <div className="flex flex-col">
      <main className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
        <AdminPlayerListHeader
          title={module.listLabel}
          description={module.listDescription}
        />

        <AdminPlayerListFilters
          search={search}
          statusFilter={statusFilter}
          positionFilter={positionFilter}
          createPath={getAdminPlayerCreatePath(category)}
          addButtonLabel={module.addButtonLabel}
          onSearchChange={setSearch}
          onStatusChange={setStatusFilter}
          onPositionChange={setPositionFilter}
          onClear={clearFilters}
        />

        {isLoading ? (
          <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
            {module.listLabel} yükleniyor...
          </p>
        ) : (
          <AdminPlayerTable
            players={rows}
            editPathPrefix={module.listPath}
            deletingId={deletingId}
            onDelete={setDeleteTarget}
            hideMarketColumn={module.hideMarketFields}
            hideAgeColumn={category === PlayerCategory.Legend}
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
