import type { AdminSeasonSort, AdminSeasonStatusFilter } from '../utils/adminSeasonTypes'

type AdminSeasonListFiltersProps = {
  search: string
  statusFilter: AdminSeasonStatusFilter
  sort: AdminSeasonSort
  counts: { all: number; active: number; archive: number }
  onSearchChange: (value: string) => void
  onStatusChange: (value: AdminSeasonStatusFilter) => void
  onSortChange: (value: AdminSeasonSort) => void
}

export function AdminSeasonListFilters({
  search,
  statusFilter,
  sort,
  counts,
  onSearchChange,
  onStatusChange,
  onSortChange,
}: AdminSeasonListFiltersProps) {
  const tabs: Array<{ id: AdminSeasonStatusFilter; label: string; count: number }> = [
    { id: 'all', label: 'Tümü', count: counts.all },
    { id: 'active', label: 'Aktif', count: counts.active },
    { id: 'archive', label: 'Arşiv', count: counts.archive },
  ]

  return (
    <section className="flex flex-col gap-space-sm border border-outline-variant/40 bg-surface-container-lowest p-space-md lg:flex-row lg:items-center lg:justify-between">
      <div className="flex min-w-0 flex-1 flex-col gap-space-sm lg:flex-row lg:items-center">
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
            placeholder="Sezon adı veya yıl ara…"
            className="font-body w-full border border-outline-variant/50 bg-surface py-space-sm pr-space-md pl-10 text-body-md text-on-surface outline-none focus:border-primary"
          />
        </label>
      </div>

      <label className="font-label flex items-center gap-space-xs text-label-md text-on-surface-variant">
        <select
          value={sort}
          onChange={(event) => {
            onSortChange(event.target.value as AdminSeasonSort)
          }}
          className="border border-outline-variant/50 bg-surface px-space-md py-space-sm text-on-surface outline-none focus:border-primary"
        >
          <option value="start-desc">Sıralama: Başlangıç (Yeniden Eskiye)</option>
          <option value="start-asc">Sıralama: Başlangıç (Eskiden Yeniye)</option>
          <option value="alpha">Sıralama: Sezon Adı (A-Z)</option>
          <option value="matches">Sıralama: Toplam Maç Sayısı</option>
        </select>
      </label>
    </section>
  )
}
