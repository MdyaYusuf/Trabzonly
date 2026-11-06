import { useEffect, useState } from 'react'
import categoryService from '@/features/categories/categoryService'
import { AdminCategoryDeleteModal } from '../components/AdminCategoryDeleteModal'
import { AdminCategoryListFilters } from '../components/AdminCategoryListFilters'
import { AdminCategoryListHeader } from '../components/AdminCategoryListHeader'
import { AdminCategoryTable } from '../components/AdminCategoryTable'
import { mapCategoryAdminItemToListRow } from '../utils/adminCategoryDraftUtils'
import type {
  AdminCategoryListRow,
  AdminCategorySort,
  AdminCategoryStatusFilter,
} from '../utils/adminCategoryTypes'

export function AdminCategoryListPage() {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<AdminCategoryStatusFilter>('all')
  const [sort, setSort] = useState<AdminCategorySort>('name-asc')
  const [rows, setRows] = useState<AdminCategoryListRow[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<AdminCategoryListRow | null>(null)
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

    async function loadCategories() {
      setIsLoading(true)

      const isActive =
        statusFilter === 'all' ? undefined : statusFilter === 'active'

      const result = await categoryService.getAllForAdmin({
        search: debouncedSearch || undefined,
        isActive,
        sort,
      })

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setRows(result.data.map(mapCategoryAdminItemToListRow))
      } else {
        setRows([])
      }

      setIsLoading(false)
    }

    void loadCategories()

    return () => {
      cancelled = true
    }
  }, [debouncedSearch, statusFilter, sort, listVersion])

  function clearFilters() {
    setSearch('')
    setDebouncedSearch('')
    setStatusFilter('all')
    setSort('name-asc')
  }

  async function handleConfirmDelete() {
    if (!deleteTarget || deletingId != null) {
      return
    }

    const deletedId = deleteTarget.id
    setDeletingId(deletedId)

    const result = await categoryService.remove(deletedId)

    if (result.success) {
      setDeleteTarget(null)
      setListVersion((prev) => prev + 1)
    }

    setDeletingId(null)
  }

  return (
    <div className="flex flex-col">
      <main className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
        <AdminCategoryListHeader />

        <AdminCategoryListFilters
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
            Kategoriler yükleniyor...
          </p>
        ) : (
          <AdminCategoryTable
            categories={rows}
            deletingId={deletingId}
            onDelete={setDeleteTarget}
          />
        )}
      </main>

      <AdminCategoryDeleteModal
        open={deleteTarget != null}
        categoryName={deleteTarget?.name ?? 'Kategori'}
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
