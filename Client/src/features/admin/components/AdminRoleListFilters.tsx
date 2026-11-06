import { Link } from 'react-router-dom'
import type { AdminRoleKindFilter, AdminRoleSort } from '../utils/adminRoleTypes'

type AdminRoleListFiltersProps = {
  search: string
  kindFilter: AdminRoleKindFilter
  sort: AdminRoleSort
  onSearchChange: (value: string) => void
  onKindChange: (value: AdminRoleKindFilter) => void
  onSortChange: (value: AdminRoleSort) => void
  onClear: () => void
}

export function AdminRoleListFilters({
  search,
  kindFilter,
  sort,
  onSearchChange,
  onKindChange,
  onSortChange,
  onClear,
}: AdminRoleListFiltersProps) {
  const kindTabs: Array<{ id: AdminRoleKindFilter; label: string }> = [
    { id: 'all', label: 'Tümü' },
    { id: 'system', label: 'Sistem' },
    { id: 'custom', label: 'Özel' },
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
          placeholder="Rol adı ara…"
          className="font-body w-full border border-outline-variant/50 bg-surface py-space-sm pr-space-md pl-10 text-body-md text-on-surface outline-none focus:border-primary"
        />
      </label>

      <div className="flex flex-col gap-space-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-space-sm">
          <div className="flex flex-wrap gap-1">
            {kindTabs.map((tab) => {
              const isActive = kindFilter === tab.id

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    onKindChange(tab.id)
                  }}
                  className={`font-label cursor-pointer px-space-md py-space-sm text-label-md uppercase transition-colors ${
                    isActive
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-high text-on-surface-variant hover:text-primary'
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          <select
            value={sort}
            onChange={(event) => {
              onSortChange(event.target.value as AdminRoleSort)
            }}
            className={selectClass}
          >
            <option value="name-asc">Sırala: Alfabetik</option>
            <option value="members-desc">Sırala: Üye Sayısı Çoktan Aza</option>
            <option value="members-asc">Sırala: Üye Sayısı Azdan Çoka</option>
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
          to="/yonetim/roller/yeni"
          className="font-label inline-flex h-11 min-w-[11.5rem] shrink-0 cursor-pointer items-center justify-center gap-space-xs self-center bg-gradient-to-r from-primary-container via-[#7a1235] to-primary px-space-lg text-label-md font-bold tracking-wider text-on-primary uppercase shadow-sm transition-all hover:scale-[1.02] hover:shadow-md"
        >
          <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span>
          Rol Ekle
        </Link>
      </div>
    </section>
  )
}
