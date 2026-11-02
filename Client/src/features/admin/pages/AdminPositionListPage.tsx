import { useEffect, useState } from 'react'
import positionService from '@/features/positions/positionService'
import type { PositionZone } from '@/features/positions/positionTypes'
import { AdminPositionDeleteModal } from '../components/AdminPositionDeleteModal'
import { AdminPositionListFilters } from '../components/AdminPositionListFilters'
import { AdminPositionListHeader } from '../components/AdminPositionListHeader'
import { AdminPositionTable } from '../components/AdminPositionTable'
import { mapPositionResponseToListRow } from '../utils/adminPositionDraftUtils'
import type {
  AdminPositionListRow,
  AdminPositionSort,
  AdminPositionZoneFilter,
} from '../utils/adminPositionTypes'

export function AdminPositionListPage() {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [zoneFilter, setZoneFilter] = useState<AdminPositionZoneFilter>('all')
  const [sort, setSort] = useState<AdminPositionSort>('zone-asc')
  const [rows, setRows] = useState<AdminPositionListRow[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<AdminPositionListRow | null>(null)
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
    let cancelled = false

    async function loadPositions() {
      setIsLoading(true)

      const zone: PositionZone | undefined =
        zoneFilter === 'all' ? undefined : zoneFilter

      const result = await positionService.getAllForAdmin({
        search: debouncedSearch || undefined,
        zone,
        sort,
      })

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setRows(result.data.map(mapPositionResponseToListRow))
      } else {
        setRows([])
      }

      setIsLoading(false)
    }

    void loadPositions()

    return () => {
      cancelled = true
    }
  }, [debouncedSearch, zoneFilter, sort, listVersion])

  function clearFilters() {
    setSearch('')
    setDebouncedSearch('')
    setZoneFilter('all')
    setSort('zone-asc')
  }

  async function handleConfirmDelete() {
    if (!deleteTarget || deletingId != null) {
      return
    }

    const deletedId = deleteTarget.id
    setDeletingId(deletedId)

    const result = await positionService.remove(deletedId)

    if (result.success) {
      setDeleteTarget(null)
      setListVersion((prev) => prev + 1)
    }

    setDeletingId(null)
  }

  return (
    <div className="flex flex-col">
      <main className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
        <AdminPositionListHeader />

        <AdminPositionListFilters
          search={search}
          zoneFilter={zoneFilter}
          sort={sort}
          onSearchChange={setSearch}
          onZoneChange={setZoneFilter}
          onSortChange={setSort}
          onClear={clearFilters}
        />

        {isLoading ? (
          <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
            Pozisyonlar yükleniyor...
          </p>
        ) : (
          <AdminPositionTable
            positions={rows}
            deletingId={deletingId}
            onDelete={setDeleteTarget}
          />
        )}
      </main>

      <AdminPositionDeleteModal
        open={Boolean(deleteTarget)}
        positionName={deleteTarget?.name ?? 'Pozisyon'}
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
