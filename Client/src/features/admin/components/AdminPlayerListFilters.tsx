import { Link } from 'react-router-dom'
import type {
  AdminPlayerPositionGroup,
  AdminPlayerSquadFilter,
  AdminPlayerStatusFilter,
} from '../utils/adminPlayerTypes'

type AdminPlayerListFiltersProps = {
  search: string
  statusFilter: AdminPlayerStatusFilter
  positionFilter: AdminPlayerPositionGroup
  squadFilter: AdminPlayerSquadFilter
  counts: { all: number; active: number; inactive: number }
  onSearchChange: (value: string) => void
  onStatusChange: (value: AdminPlayerStatusFilter) => void
  onPositionChange: (value: AdminPlayerPositionGroup) => void
  onSquadChange: (value: AdminPlayerSquadFilter) => void
}

export function AdminPlayerListFilters({
  search,
  statusFilter,
  positionFilter,
  squadFilter,
  counts,
  onSearchChange,
  onStatusChange,
  onPositionChange,
  onSquadChange,
}: AdminPlayerListFiltersProps) {
  const statusTabs: Array<{ id: AdminPlayerStatusFilter; label: string; count: number }> = [
    { id: 'all', label: 'Tümü', count: counts.all },
    { id: 'active', label: 'Aktif', count: counts.active },
    { id: 'inactive', label: 'Pasif', count: counts.inactive },
  ]

  return (
    <section className="flex flex-col gap-space-md border border-outline-variant/40 bg-surface-container-lowest p-space-md">
      <div className="flex flex-col gap-space-sm lg:flex-row lg:items-center">
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
            placeholder="İsim, numara veya pozisyon ara…"
            className="font-body w-full border border-outline-variant/50 bg-surface py-space-sm pr-space-md pl-10 text-body-md text-on-surface outline-none focus:border-primary"
          />
        </label>

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

      <div className="flex flex-col gap-space-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-space-sm">
          <select
            value={positionFilter}
            onChange={(event) => {
              onPositionChange(event.target.value as AdminPlayerPositionGroup)
            }}
            className="font-label border border-outline-variant/50 bg-surface px-space-md py-space-sm text-label-md text-on-surface outline-none focus:border-primary"
          >
            <option value="all">Tüm Pozisyonlar</option>
            <option value="gk">Kaleci (KL)</option>
            <option value="def">Defans (STP, BEK)</option>
            <option value="mid">Orta Saha (DOS, MO, OOS)</option>
            <option value="att">Hücum (ST, KANAT)</option>
          </select>

          <select
            value={squadFilter}
            onChange={(event) => {
              onSquadChange(event.target.value as AdminPlayerSquadFilter)
            }}
            className="font-label border border-outline-variant/50 bg-surface px-space-md py-space-sm text-label-md text-on-surface outline-none focus:border-primary"
          >
            <option value="all">Tüm Kadrolar</option>
            <option value="first-team">Trabzonspor A Takım</option>
            <option value="loan">Kiralık Gönderilenler</option>
            <option value="u19">U19 Rezerv Gelişim</option>
          </select>

          <button
            type="button"
            className="font-label inline-flex items-center gap-1 border border-outline-variant/50 px-space-md py-space-sm text-label-md text-on-surface-variant uppercase transition-colors hover:border-primary hover:text-primary"
          >
            <span className="material-symbols-outlined text-[18px]">filter_alt</span>
            Sırala
          </button>
        </div>

        <Link
          to="/yonetim/oyuncular/yeni"
          className="font-label inline-flex items-center justify-center gap-space-xs bg-primary-container px-space-md py-space-sm text-label-md font-bold tracking-wider text-on-primary uppercase transition-all hover:bg-primary"
        >
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          + Oyuncu Ekle
        </Link>
      </div>
    </section>
  )
}
