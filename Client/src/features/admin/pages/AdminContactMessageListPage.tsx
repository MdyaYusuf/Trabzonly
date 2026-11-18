import { useEffect, useState } from 'react'
import contactMessageService from '@/features/contactMessages/contactMessageService'
import type {
  ContactMessageAdminListItemDto,
  ContactMessageReadFilter,
  ContactMessageResolvedFilter,
} from '@/features/contactMessages/contactMessageTypes'
import { AdminContactMessageList } from '../components/AdminContactMessageList'
import {
  AdminContactMessageListFilters,
  type AdminContactMessageSort,
} from '../components/AdminContactMessageListFilters'
import { AdminContactMessageListHeader } from '../components/AdminContactMessageListHeader'
import { AdminMemberPagination } from '../components/AdminMemberPagination'

const DEFAULT_PAGE_SIZE = 10

export function AdminContactMessageListPage() {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [readFilter, setReadFilter] = useState<ContactMessageReadFilter>('all')
  const [resolvedFilter, setResolvedFilter] = useState<ContactMessageResolvedFilter>('all')
  const [sort, setSort] = useState<AdminContactMessageSort>('created-desc')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)
  const [totalCount, setTotalCount] = useState(0)
  const [messages, setMessages] = useState<ContactMessageAdminListItemDto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [resolvingId, setResolvingId] = useState<number | null>(null)
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
  }, [debouncedSearch, readFilter, resolvedFilter, sort, pageSize])

  useEffect(() => {
    let cancelled = false

    async function loadMessages() {
      setIsLoading(true)

      const isRead =
        readFilter === 'all' ? undefined : readFilter === 'read'
      const isResolved =
        resolvedFilter === 'all' ? undefined : resolvedFilter === 'resolved'

      const result = await contactMessageService.getAllForAdmin({
        pageNumber: page,
        pageSize,
        search: debouncedSearch || undefined,
        isRead,
        isResolved,
        sort,
      })

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setMessages(result.data.items)
        setTotalCount(result.data.totalCount)

        if (result.data.items.length === 0 && result.data.totalCount > 0 && page > 1) {
          setPage((prev) => Math.max(1, prev - 1))
        }
      } else {
        setMessages([])
        setTotalCount(0)
      }

      setIsLoading(false)
    }

    void loadMessages()

    return () => {
      cancelled = true
    }
  }, [page, pageSize, debouncedSearch, readFilter, resolvedFilter, sort, listVersion])

  function clearFilters() {
    setSearch('')
    setDebouncedSearch('')
    setReadFilter('all')
    setResolvedFilter('all')
    setSort('created-desc')
    setPage(1)
  }

  async function handleMarkRead(message: ContactMessageAdminListItemDto) {
    if (message.isRead) {
      return
    }

    try {
      const result = await contactMessageService.markAsRead(message.id)

      if (result.success) {
        setMessages((prev) =>
          prev.map((item) => {
            if (item.id !== message.id) {
              return item
            }

            return {
              ...item,
              isRead: true,
            }
          }),
        )
      }
    } catch {
      // apiClient already surfaces the error toast.
    }
  }

  async function handleSetResolved(
    message: ContactMessageAdminListItemDto,
    isResolved: boolean,
  ) {
    if (resolvingId != null || message.isResolved === isResolved) {
      return
    }

    setResolvingId(message.id)

    try {
      const result = await contactMessageService.setResolved(message.id, isResolved)

      if (result.success) {
        setMessages((prev) =>
          prev.map((item) => {
            if (item.id !== message.id) {
              return item
            }

            return {
              ...item,
              isRead: isResolved ? true : item.isRead,
              isResolved,
            }
          }),
        )
      }
    } catch {
      // apiClient already surfaces the error toast.
    } finally {
      setResolvingId(null)
    }
  }

  async function handleDelete(message: ContactMessageAdminListItemDto) {
    if (deletingId != null) {
      return
    }

    const confirmed = window.confirm(
      `@${message.username} kullanıcısının mesajını silmek istediğinize emin misiniz?`,
    )

    if (!confirmed) {
      return
    }

    setDeletingId(message.id)

    try {
      const result = await contactMessageService.remove(message.id)

      if (result.success) {
        setListVersion((prev) => prev + 1)
      }
    } catch {
      // apiClient already surfaces the error toast.
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="flex flex-col">
      <main className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
        <AdminContactMessageListHeader />

        <AdminContactMessageListFilters
          search={search}
          readFilter={readFilter}
          resolvedFilter={resolvedFilter}
          sort={sort}
          onSearchChange={setSearch}
          onReadFilterChange={setReadFilter}
          onResolvedFilterChange={setResolvedFilter}
          onSortChange={setSort}
          onClear={clearFilters}
        />

        {isLoading ? (
          <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
            Mesajlar yükleniyor...
          </p>
        ) : (
          <AdminContactMessageList
            messages={messages}
            resolvingId={resolvingId}
            deletingId={deletingId}
            onMarkRead={(message) => {
              void handleMarkRead(message)
            }}
            onSetResolved={(message, isResolved) => {
              void handleSetResolved(message, isResolved)
            }}
            onDelete={(message) => {
              void handleDelete(message)
            }}
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
    </div>
  )
}
