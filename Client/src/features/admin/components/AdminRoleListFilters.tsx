import type { AdminRoleKindFilter } from '../utils/adminRoleTypes'

type AdminRoleListFiltersProps = {
  search: string
  kindFilter: AdminRoleKindFilter
  counts: Record<AdminRoleKindFilter, number>
  onSearchChange: (value: string) => void
  onKindChange: (value: AdminRoleKindFilter) => void
}

export function AdminRoleListFilters({
  search,
  kindFilter,
  counts,
  onSearchChange,
  onKindChange,
}: AdminRoleListFiltersProps) {
  const tabs: Array<{ id: AdminRoleKindFilter; label: string }> = [
    { id: 'all', label: `Tümü (${counts.all})` },
    { id: 'system', label: `Sistem Rolleri (${counts.system})` },
    { id: 'community', label: `Topluluk Rolleri (${counts.community})` },
  ]

  return (
    <section className="flex flex-col gap-space-md border border-outline-variant/40 bg-surface-container-lowest p-space-md">
      <div className="flex flex-col gap-space-sm xl:flex-row xl:items-center">
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
            placeholder="Rol adı veya açıklama ara…"
            className="font-body w-full border border-outline-variant/50 bg-surface py-space-sm pr-space-md pl-10 text-body-md text-on-surface outline-none focus:border-primary"
          />
        </label>

        <div className="flex flex-wrap gap-1">
          {tabs.map((tab) => {
            const isActive = kindFilter === tab.id

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  onKindChange(tab.id)
                }}
                className={`font-label px-space-md py-space-sm text-label-md uppercase transition-colors ${
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
      </div>

      <p className="font-body flex items-start gap-1 bg-secondary-fixed/40 px-space-md py-space-sm text-body-sm text-on-surface-variant">
        <span className="material-symbols-outlined text-[16px] text-secondary">info</span>
        Sistem çekirdek rolleri silinemez, izinleri modüler yönetilebilir.
      </p>
    </section>
  )
}
