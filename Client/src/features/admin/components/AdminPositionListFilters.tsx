import type { AdminPositionSort, AdminPositionZone } from '../utils/adminPositionTypes'

type AdminPositionListFiltersProps = {
  search: string
  zoneFilter: AdminPositionZone
  sort: AdminPositionSort
  counts: Record<AdminPositionZone, number>
  onSearchChange: (value: string) => void
  onZoneChange: (value: AdminPositionZone) => void
  onSortChange: (value: AdminPositionSort) => void
}

export function AdminPositionListFilters({
  search,
  zoneFilter,
  sort,
  counts,
  onSearchChange,
  onZoneChange,
  onSortChange,
}: AdminPositionListFiltersProps) {
  const tabs: Array<{ id: AdminPositionZone; label: string }> = [
    { id: 'all', label: 'Tümü' },
    { id: 'attack', label: 'Hücum Hattı' },
    { id: 'midfield', label: 'Orta Saha' },
    { id: 'defence', label: 'Savunma Hattı' },
    { id: 'goalkeeper', label: 'Kaleci' },
  ]

  return (
    <section className="flex flex-col gap-space-sm border border-outline-variant/40 bg-surface-container-lowest p-space-md">
      <div className="flex flex-col gap-space-sm lg:flex-row lg:items-center lg:justify-between">
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
            placeholder="Pozisyon adı veya kısaltma ara…"
            className="font-body w-full border border-outline-variant/50 bg-surface py-space-sm pr-space-md pl-10 text-body-md text-on-surface outline-none focus:border-primary"
          />
        </label>

        <label className="font-label flex items-center gap-space-xs text-label-md text-on-surface-variant">
          <span>Sırala:</span>
          <select
            value={sort}
            onChange={(event) => {
              onSortChange(event.target.value as AdminPositionSort)
            }}
            className="border border-outline-variant/50 bg-surface px-space-md py-space-sm text-on-surface outline-none focus:border-primary"
          >
            <option value="players-desc">Bağlı Oyuncu Sayısı (Çoktan Aza)</option>
            <option value="players-asc">Bağlı Oyuncu Sayısı (Azdan Çoğa)</option>
            <option value="alpha">Pozisyon Adı (A - Z)</option>
            <option value="zone">Saha Bölgesine Göre</option>
          </select>
        </label>
      </div>

      <div className="flex flex-wrap gap-1">
        {tabs.map((tab) => {
          const isActive = zoneFilter === tab.id

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                onZoneChange(tab.id)
              }}
              className={`font-label px-space-md py-space-sm text-label-md uppercase transition-colors ${
                isActive
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-high text-on-surface-variant hover:text-primary'
              }`}
            >
              {tab.label} ({counts[tab.id]})
            </button>
          )
        })}
      </div>
    </section>
  )
}
