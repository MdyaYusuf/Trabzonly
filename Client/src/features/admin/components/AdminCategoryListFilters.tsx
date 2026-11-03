import { Link } from 'react-router-dom'
import type { AdminCategorySort, AdminCategoryStatusFilter } from '../utils/adminCategoryTypes'

type AdminCategoryListFiltersProps = {
  search: string
  statusFilter: AdminCategoryStatusFilter
  sort: AdminCategorySort
  counts: { all: number; active: number; inactive: number }
  onSearchChange: (value: string) => void
  onStatusChange: (value: AdminCategoryStatusFilter) => void
  onSortChange: (value: AdminCategorySort) => void
  onClear: () => void
}

export function AdminCategoryListFilters({
  search,
  statusFilter,
  sort,
  counts,
  onSearchChange,
  onStatusChange,
  onSortChange,
  onClear,
}: AdminCategoryListFiltersProps) {
  const statusTabs: Array<{ id: AdminCategoryStatusFilter; label: string; count: number }> = [
    { id: 'all', label: 'Tümü', count: counts.all },
    { id: 'active', label: 'Aktif', count: counts.active },
    { id: 'inactive', label: 'Pasif', count: counts.inactive },
  ]

  const selectClass =
    'font-label cursor-pointer border border-outline-variant/50 bg-surface px-space-md py-space-sm text-label-md text-on-surface outline-none focus:border-primary'

  return (
    <section className="flex flex-col gap-space-md border border-outline-variant/40 bg-surface-container-lowest p-space-md">
      <label className="relative min-w-0 w-full">
        <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-on-surface-variant">
          search
        </span>
        <input
          type="search"
          value={search}
          onChange={(event) => {
            onSearchChange(event.target.value)
          }}
          placeholder="Kategori adı veya açıklama ara…"
          className="font-body w-full border border-outline-variant/50 bg-surface py-space-sm pr-space-md pl-10 text-body-md text-on-surface outline-none focus:border-primary"
        />
      </label>

      <div className="flex flex-col gap-space-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-space-sm">
          <div className="flex flex-wrap gap-1">
            {statusTabs.map((tab) => {
              const isActive = statusFilter === tab.id

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    onStatusChange(tab.id)
                  }}
                  className={`font-label cursor-pointer px-space-md py-space-sm text-label-md uppercase transition-colors ${
                    isActive
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-high text-on-surface-variant hover:text-primary'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              )
            })}
          </div>

          <select
            value={sort}
            onChange={(event) => {
              onSortChange(event.target.value as AdminCategorySort)
            }}
            className={selectClass}
          >
            <option value="name-asc">Sırala: Alfabetik</option>
            <option value="posts-desc">Sırala: Gönderi Sayısı Çoktan Aza</option>
            <option value="posts-asc">Sırala: Gönderi Sayısı Azdan Çoka</option>
          </select>

          <button
            type="button"
            onClick={onClear}
            className="font-label cursor-pointer border border-outline-variant/50 px-space-md py-space-sm text-label-md text-on-surface-variant uppercase transition-colors hover:border-primary hover:text-primary"
          >
            Filtreleri Temizle
          </button>
        </div>

        <Link
          to="/yonetim/kategoriler/yeni"
          className="font-label inline-flex h-11 min-w-[11.5rem] shrink-0 cursor-pointer items-center justify-center gap-space-xs self-center bg-gradient-to-r from-primary-container via-[#7a1235] to-primary px-space-lg text-label-md font-bold tracking-wider text-on-primary uppercase shadow-sm transition-all hover:scale-[1.02] hover:shadow-md"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Kategori Ekle
        </Link>
      </div>
    </section>
  )
}
