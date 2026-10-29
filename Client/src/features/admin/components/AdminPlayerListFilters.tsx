import { Link } from 'react-router-dom'
import type {
  AdminPlayerPositionFilter,
  AdminPlayerStatusFilter,
} from '../utils/adminPlayerTypes'

type AdminPlayerListFiltersProps = {
  search: string
  statusFilter: AdminPlayerStatusFilter
  positionFilter: AdminPlayerPositionFilter
  counts: { all: number; active: number; inactive: number }
  onSearchChange: (value: string) => void
  onStatusChange: (value: AdminPlayerStatusFilter) => void
  onPositionChange: (value: AdminPlayerPositionFilter) => void
  onClear: () => void
}

export function AdminPlayerListFilters({
  search,
  statusFilter,
  positionFilter,
  counts,
  onSearchChange,
  onStatusChange,
  onPositionChange,
  onClear,
}: AdminPlayerListFiltersProps) {
  const statusTabs: Array<{ id: AdminPlayerStatusFilter; label: string; count: number }> = [
    { id: 'all', label: 'Tümü', count: counts.all },
    { id: 'active', label: 'Aktif', count: counts.active },
    { id: 'inactive', label: 'Pasif', count: counts.inactive },
  ]

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
          placeholder="İsim veya forma numarası ara…"
          className="font-body w-full border border-outline-variant/50 bg-surface py-space-sm pr-space-md pl-10 text-body-md text-on-surface outline-none focus:border-primary"
        />
      </label>

      <div className="flex flex-col gap-space-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-space-sm">
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
            value={positionFilter}
            onChange={(event) => {
              onPositionChange(event.target.value as AdminPlayerPositionFilter)
            }}
            className="font-label cursor-pointer border border-outline-variant/50 bg-surface px-space-md py-space-sm text-label-md text-on-surface outline-none focus:border-primary"
          >
            <option value="all">Tüm Pozisyonlar</option>
            <option value="gk">Kaleci</option>
            <option value="def">Defans</option>
            <option value="mid">Orta Saha</option>
            <option value="fwd">Hücum</option>
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
          to="/yonetim/oyuncular/yeni"
          className="font-label inline-flex cursor-pointer items-center gap-space-xs bg-gradient-to-r from-primary-container via-[#7a1235] to-primary px-space-md py-space-xs text-label-md font-bold tracking-wider text-on-primary uppercase shadow-sm transition-all hover:scale-[1.02] hover:shadow-md"
        >
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          Oyuncu Ekle
        </Link>
      </div>
    </section>
  )
}
