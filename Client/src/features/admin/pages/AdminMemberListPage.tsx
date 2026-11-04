import { useEffect, useState } from 'react'
import roleService from '@/features/roles/roleService'
import userService from '@/features/users/userService'
import { AdminMemberActiveModal } from '../components/AdminMemberActiveModal'
import { AdminMemberDeleteModal } from '../components/AdminMemberDeleteModal'
import { AdminMemberListFilters } from '../components/AdminMemberListFilters'
import { AdminMemberListHeader } from '../components/AdminMemberListHeader'
import { AdminMemberPagination } from '../components/AdminMemberPagination'
import { AdminMemberTable } from '../components/AdminMemberTable'
import { mapUserAdminItemToListRow } from '../utils/adminMemberDraftUtils'
import type {
  AdminMemberListRow,
  AdminMemberRoleOption,
  AdminMemberSort,
  AdminMemberStatusFilter,
} from '../utils/adminMemberTypes'

const DEFAULT_PAGE_SIZE = 10

export function AdminMemberListPage() {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [roleId, setRoleId] = useState<number | 'all'>('all')
  const [statusFilter, setStatusFilter] = useState<AdminMemberStatusFilter>('all')
  const [sort, setSort] = useState<AdminMemberSort>('created-desc')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)
  const [rows, setRows] = useState<AdminMemberListRow[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [roles, setRoles] = useState<AdminMemberRoleOption[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<AdminMemberListRow | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [activeTarget, setActiveTarget] = useState<AdminMemberListRow | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)
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
  }, [debouncedSearch, roleId, statusFilter, sort, pageSize])

  useEffect(() => {
    let cancelled = false

    async function loadRoles() {
      const result = await roleService.getAll({ pageNumber: 1, pageSize: 100 })

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setRoles(
          result.data.items.map((role) => ({
            id: role.id,
            name: role.name,
          })),
        )
      } else {
        setRoles([])
      }
    }

    void loadRoles()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    async function loadMembers() {
      setIsLoading(true)

      const isActive =
        statusFilter === 'all' ? undefined : statusFilter === 'active'

      const result = await userService.getAllForAdmin({
        pageNumber: page,
        pageSize,
        search: debouncedSearch || undefined,
        roleId: roleId === 'all' ? undefined : roleId,
        isActive,
        sort,
      })

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setRows(result.data.items.map(mapUserAdminItemToListRow))
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

    void loadMembers()

    return () => {
      cancelled = true
    }
  }, [page, pageSize, debouncedSearch, roleId, statusFilter, sort, listVersion])

  function clearFilters() {
    setSearch('')
    setDebouncedSearch('')
    setRoleId('all')
    setStatusFilter('all')
    setSort('created-desc')
    setPage(1)
  }

  async function handleConfirmToggleActive() {
    if (!activeTarget || activeTarget.isAdmin || togglingId != null) {
      return
    }

    const targetId = activeTarget.id
    setTogglingId(targetId)

    const result = await userService.adminSetActive(targetId, {
      isActive: !activeTarget.isActive,
    })

    if (result.success) {
      setActiveTarget(null)
      setListVersion((prev) => prev + 1)
    }

    setTogglingId(null)
  }

  async function handleConfirmDelete() {
    if (!deleteTarget || deletingId != null) {
      return
    }

    const deletedId = deleteTarget.id
    setDeletingId(deletedId)

    const result = await userService.remove(deletedId)

    if (result.success) {
      setDeleteTarget(null)
      setListVersion((prev) => prev + 1)
    }

    setDeletingId(null)
  }

  return (
    <div className="flex flex-col">
      <main className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
        <AdminMemberListHeader />

        <AdminMemberListFilters
          search={search}
          roleId={roleId}
          statusFilter={statusFilter}
          sort={sort}
          roles={roles}
          onSearchChange={setSearch}
          onRoleChange={setRoleId}
          onStatusChange={setStatusFilter}
          onSortChange={setSort}
          onClear={clearFilters}
        />

        {isLoading ? (
          <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
            Üyeler yükleniyor...
          </p>
        ) : (
          <AdminMemberTable
            rows={rows}
            togglingId={togglingId}
            deletingId={deletingId}
            onToggleActive={setActiveTarget}
            onDelete={setDeleteTarget}
          />
        )}

        {!isLoading && totalCount > 0 ? (
          <AdminMemberPagination
            page={page}
            pageSize={pageSize}
            total={totalCount}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        ) : null}
      </main>

      <AdminMemberActiveModal
        open={activeTarget != null}
        username={activeTarget?.username ?? 'Üye'}
        currentlyActive={activeTarget?.isActive ?? true}
        isSubmitting={togglingId != null}
        onCancel={() => {
          if (togglingId != null) {
            return
          }

          setActiveTarget(null)
        }}
        onConfirm={() => {
          void handleConfirmToggleActive()
        }}
      />

      <AdminMemberDeleteModal
        open={deleteTarget != null}
        username={deleteTarget?.username ?? 'Üye'}
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
