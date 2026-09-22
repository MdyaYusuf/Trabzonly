import type {
  AdminCategorySort,
  AdminCategoryStatusFilter,
} from '../utils/adminCategoryTypes'

type AdminCategoryListFiltersProps = {
  search: string
  statusFilter: AdminCategoryStatusFilter
  sort: AdminCategorySort
  counts: { all: number; active: number; inactive: number }
  onSearchChange: (value: string) => void
  onStatusChange: (value: AdminCategoryStatusFilter) => void
  onSortChange: (value: AdminCategorySort) => void
}

export function AdminCategoryListFilters({
  search,
  statusFilter,
  sort,
  counts,
  onSearchChange,
  onStatusChange,
  onSortChange,
}: AdminCategoryListFiltersProps) {
  const tabs: Array<{ id: AdminCategoryStatusFilter; label: string; count: number }> = [
    { id: 'all', label: 'Tümü', count: counts.all },
    { id: 'active', label: 'Aktif', count: counts.active },
    { id: 'inactive', label: 'Pasif', count: counts.inactive },
  ]

  return (
    <section className="flex flex-col gap-space-sm border border-outline-variant/40 bg-surface-container-lowest p-space-md lg:flex-row lg:items-center lg:justify-between">
      <div className="flex min-w-0 flex-1 flex-col gap-space-sm lg:flex-row lg:items-center">
        <label className="relative min-w-0 flex-1">
          <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-on-surface-variant">
            search
          </span>
          <input
            type="search"
            value={search}
            onChange={(event) => {
              onSearchChange(event.target.value)
            }}
            placeholder="Kategori veya anahtar kelime ara…"
            className="font-body w-full border border-outline-variant/50 bg-surface py-space-sm pr-space-md pl-10 text-body-md text-on-surface outline-none focus:border-primary"
          />
        </label>

        <div className="flex flex-wrap gap-1">
          {tabs.map((tab) => {
            const isActive = statusFilter === tab.id

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  onStatusChange(tab.id)
                }}
                className={`font-label px-space-md py-space-sm text-label-md uppercase transition-colors ${
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
      </div>

      <label className="font-label flex items-center gap-space-xs text-label-md text-on-surface-variant">
        <span>Sıralama:</span>
        <select
          value={sort}
          onChange={(event) => {
            onSortChange(event.target.value as AdminCategorySort)
          }}
          className="border border-outline-variant/50 bg-surface px-space-md py-space-sm text-on-surface outline-none focus:border-primary"
        >
          <option value="posts-desc">Gönderi Sayısı (Çoktan Aza)</option>
          <option value="posts-asc">Gönderi Sayısı (Azdan Çoka)</option>
          <option value="alpha">Alfabetik (A-Z)</option>
          <option value="updated">Son Güncellenen</option>
        </select>
      </label>
    </section>
  )
}
