import { useMemo, useState } from 'react'
import { AdminCategoryListFilters } from '../components/AdminCategoryListFilters'
import { AdminCategoryListHeader } from '../components/AdminCategoryListHeader'
import { AdminCategoryPagination } from '../components/AdminCategoryPagination'
import { AdminCategoryTable } from '../components/AdminCategoryTable'
import { adminCategoryListRows } from '../utils/adminCategoryPlaceholders'
import type {
  AdminCategorySort,
  AdminCategoryStatusFilter,
} from '../utils/adminCategoryTypes'

const PAGE_SIZE = 7

export function AdminCategoryListPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<AdminCategoryStatusFilter>('all')
  const [sort, setSort] = useState<AdminCategorySort>('posts-desc')
  const [page, setPage] = useState(1)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const counts = useMemo(() => {
    const active = adminCategoryListRows.filter((row) => row.status === 'active').length
    const inactive = adminCategoryListRows.filter((row) => row.status === 'inactive').length

    return {
      all: adminCategoryListRows.length,
      active,
      inactive,
    }
  }, [])

  const filtered = useMemo(() => {
    let result = [...adminCategoryListRows]

    if (statusFilter === 'active') {
      result = result.filter((row) => row.status === 'active')
    } else if (statusFilter === 'inactive') {
      result = result.filter((row) => row.status === 'inactive')
    }

    const query = search.trim().toLowerCase()

    if (query) {
      result = result.filter(
        (row) =>
          row.name.toLowerCase().includes(query) ||
          row.description.toLowerCase().includes(query) ||
          row.slug.toLowerCase().includes(query),
      )
    }

    result.sort((a, b) => {
      if (sort === 'posts-asc') {
        return a.postCount - b.postCount
      }

      if (sort === 'alpha') {
        return a.name.localeCompare(b.name, 'tr')
      }

      if (sort === 'updated') {
        return a.updatedRank - b.updatedRank
      }

      return b.postCount - a.postCount
    })

    return result
  }, [search, statusFilter, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageStart = (currentPage - 1) * PAGE_SIZE
  const pageCategories = filtered.slice(pageStart, pageStart + PAGE_SIZE)

  function resetPage() {
    setPage(1)
  }

  function toggleId(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev)

      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }

      return next
    })
  }

  function toggleAll() {
    const pageIds = pageCategories.map((row) => row.id)
    const allSelected = pageIds.every((id) => selectedIds.has(id))

    setSelectedIds((prev) => {
      const next = new Set(prev)

      if (allSelected) {
        for (const id of pageIds) {
          next.delete(id)
        }
      } else {
        for (const id of pageIds) {
          next.add(id)
        }
      }

      return next
    })
  }

  return (
    <main className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
      <AdminCategoryListHeader
        total={counts.all}
        active={counts.active}
        inactive={counts.inactive}
      />

      <AdminCategoryListFilters
        search={search}
        statusFilter={statusFilter}
        sort={sort}
        counts={counts}
        onSearchChange={(value) => {
          setSearch(value)
          resetPage()
        }}
        onStatusChange={(value) => {
          setStatusFilter(value)
          resetPage()
        }}
        onSortChange={(value) => {
          setSort(value)
          resetPage()
        }}
      />

      <AdminCategoryTable
        categories={pageCategories}
        selectedIds={selectedIds}
        onToggle={toggleId}
        onToggleAll={toggleAll}
      />

      <AdminCategoryPagination
        page={currentPage}
        pageSize={PAGE_SIZE}
        total={filtered.length}
        onPageChange={setPage}
      />

      <section className="flex gap-space-sm border border-outline-variant/40 bg-surface-container-low px-space-md py-space-md">
        <span className="material-symbols-outlined text-secondary">info</span>
        <div>
          <h2 className="font-label text-label-md font-bold text-on-surface uppercase">
            Yayın Mimarisi Notu
          </h2>
          <p className="font-body mt-1 text-body-sm text-on-surface-variant">
            Veritabanında kategori bulunamadığında veya filtreleme sonucunda kayıt çıkmadığında
            sistem varsayılan olarak şu iletiyi döndürür:{' '}
            <em>
              &quot;Henüz kategori yok. Yeni içerik grubu oluşturmak için Kategori Ekle butonunu
              kullanabilirsiniz.&quot;
            </em>
          </p>
        </div>
      </section>
    </main>
  )
}
