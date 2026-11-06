import { useEffect, useState } from 'react'
import pollService from '@/features/polls/pollService'
import { AdminPollDeactivateModal } from '../components/AdminPollDeactivateModal'
import { AdminPollListFilters } from '../components/AdminPollListFilters'
import { AdminPollListHeader } from '../components/AdminPollListHeader'
import { AdminPollTable } from '../components/AdminPollTable'
import { AdminQuizPagination } from '../components/AdminQuizPagination'
import { mapPollAdminItemToListRow } from '../utils/adminPollDraftUtils'
import type {
  AdminPollListRow,
  AdminPollScopeFilter,
  AdminPollSort,
  AdminPollStatusFilter,
} from '../utils/adminPollTypes'

const DEFAULT_PAGE_SIZE = 10

export function AdminPollListPage() {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<AdminPollStatusFilter>('all')
  const [scopeFilter, setScopeFilter] = useState<AdminPollScopeFilter>('all')
  const [sort, setSort] = useState<AdminPollSort>('newest')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)
  const [rows, setRows] = useState<AdminPollListRow[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [deactivateTarget, setDeactivateTarget] = useState<AdminPollListRow | null>(null)
  const [deactivatingId, setDeactivatingId] = useState<number | null>(null)
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
  }, [debouncedSearch, statusFilter, scopeFilter, sort, pageSize])

  useEffect(() => {
    let cancelled = false

    async function loadPolls() {
      setIsLoading(true)

      const isActive =
        statusFilter === 'all' ? undefined : statusFilter === 'active'

      const result = await pollService.getAllForAdmin({
        pageNumber: page,
        pageSize,
        search: debouncedSearch || undefined,
        isActive,
        scope: scopeFilter === 'all' ? undefined : scopeFilter,
        sort,
      })

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setRows(result.data.items.map(mapPollAdminItemToListRow))
        setTotalCount(result.data.totalCount)

        if (result.data.items.length === 0 && result.data.totalCount > 0 && page > 1) {
          setPage(page - 1)
        }
      } else {
        setRows([])
        setTotalCount(0)
      }

      setIsLoading(false)
    }

    void loadPolls()

    return () => {
      cancelled = true
    }
  }, [debouncedSearch, statusFilter, scopeFilter, sort, page, pageSize, listVersion])

  function clearFilters() {
    setSearch('')
    setDebouncedSearch('')
    setStatusFilter('all')
    setScopeFilter('all')
    setSort('newest')
    setPage(1)
  }

  async function handleConfirmDeactivate() {
    if (!deactivateTarget || deactivatingId != null) {
      return
    }

    const id = deactivateTarget.id
    setDeactivatingId(id)

    const result = await pollService.deactivate(id)

    if (result.success) {
      setDeactivateTarget(null)
      setListVersion((prev) => prev + 1)
    }

    setDeactivatingId(null)
  }

  return (
    <div className="flex flex-col">
      <main className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
        <AdminPollListHeader />

        <AdminPollListFilters
          search={search}
          statusFilter={statusFilter}
          scopeFilter={scopeFilter}
          sort={sort}
          onSearchChange={setSearch}
          onStatusChange={setStatusFilter}
          onScopeChange={setScopeFilter}
          onSortChange={setSort}
          onClear={clearFilters}
        />

        {isLoading ? (
          <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
            Anketler yükleniyor...
          </p>
        ) : (
          <AdminPollTable
            polls={rows}
            deactivatingId={deactivatingId}
            onDeactivate={setDeactivateTarget}
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

      <AdminPollDeactivateModal
        open={deactivateTarget != null}
        question={deactivateTarget?.question ?? ''}
        isDeactivating={deactivatingId != null}
        onCancel={() => {
          if (deactivatingId != null) {
            return
          }

          setDeactivateTarget(null)
        }}
        onConfirm={() => {
          void handleConfirmDeactivate()
        }}
      />
    </div>
  )
}
