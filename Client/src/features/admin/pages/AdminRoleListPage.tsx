import { useEffect, useState } from 'react'
import roleService from '@/features/roles/roleService'
import type { RoleAdminSummaryDto } from '@/features/roles/roleTypes'
import { AdminRoleDeleteModal } from '../components/AdminRoleDeleteModal'
import { AdminRoleListFilters } from '../components/AdminRoleListFilters'
import { AdminRoleListHeader } from '../components/AdminRoleListHeader'
import { AdminRoleTable } from '../components/AdminRoleTable'
import { mapRoleAdminItemToListRow } from '../utils/adminRoleDraftUtils'
import type {
  AdminRoleKindFilter,
  AdminRoleListRow,
  AdminRoleSort,
} from '../utils/adminRoleTypes'

export function AdminRoleListPage() {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [kindFilter, setKindFilter] = useState<AdminRoleKindFilter>('all')
  const [sort, setSort] = useState<AdminRoleSort>('name-asc')
  const [rows, setRows] = useState<AdminRoleListRow[]>([])
  const [summary, setSummary] = useState<RoleAdminSummaryDto | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<AdminRoleListRow | null>(null)
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

    async function loadSummary() {
      const result = await roleService.getAdminSummary()

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
  }, [listVersion])

  useEffect(() => {
    let cancelled = false

    async function loadRoles() {
      setIsLoading(true)

      const isSystem =
        kindFilter === 'all' ? undefined : kindFilter === 'system'

      const result = await roleService.getAllForAdmin({
        search: debouncedSearch || undefined,
        isSystem,
        sort,
      })

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setRows(result.data.map(mapRoleAdminItemToListRow))
      } else {
        setRows([])
      }

      setIsLoading(false)
    }

    void loadRoles()

    return () => {
      cancelled = true
    }
  }, [debouncedSearch, kindFilter, sort, listVersion])

  function clearFilters() {
    setSearch('')
    setDebouncedSearch('')
    setKindFilter('all')
    setSort('name-asc')
  }

  async function handleConfirmDelete() {
    if (!deleteTarget || deletingId != null) {
      return
    }

    const deletedId = deleteTarget.id
    setDeletingId(deletedId)

    const result = await roleService.remove(deletedId)

    if (result.success) {
      setDeleteTarget(null)
      setListVersion((prev) => prev + 1)
    }

    setDeletingId(null)
  }

  const counts = {
    all: summary?.totalCount ?? 0,
    system: summary?.systemCount ?? 0,
    custom: summary?.customCount ?? 0,
  }

  return (
    <div className="flex flex-col">
      <main className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
        <AdminRoleListHeader />

        <AdminRoleListFilters
          search={search}
          kindFilter={kindFilter}
          sort={sort}
          counts={counts}
          onSearchChange={setSearch}
          onKindChange={setKindFilter}
          onSortChange={setSort}
          onClear={clearFilters}
        />

        {isLoading ? (
          <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
            Roller yükleniyor...
          </p>
        ) : (
          <AdminRoleTable
            roles={rows}
            deletingId={deletingId}
            onDelete={setDeleteTarget}
          />
        )}
      </main>

      <AdminRoleDeleteModal
        open={deleteTarget != null}
        roleName={deleteTarget?.name ?? 'Rol'}
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
