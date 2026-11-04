import type {
  AdminMemberRoleOption,
  AdminMemberSort,
  AdminMemberStatusFilter,
} from '../utils/adminMemberTypes'

type AdminMemberListFiltersProps = {
  search: string
  roleId: number | 'all'
  statusFilter: AdminMemberStatusFilter
  sort: AdminMemberSort
  roles: AdminMemberRoleOption[]
  onSearchChange: (value: string) => void
  onRoleChange: (value: number | 'all') => void
  onStatusChange: (value: AdminMemberStatusFilter) => void
  onSortChange: (value: AdminMemberSort) => void
  onClear: () => void
}

export function AdminMemberListFilters({
  search,
  roleId,
  statusFilter,
  sort,
  roles,
  onSearchChange,
  onRoleChange,
  onStatusChange,
  onSortChange,
  onClear,
}: AdminMemberListFiltersProps) {
  const statusTabs: Array<{ id: AdminMemberStatusFilter; label: string }> = [
    { id: 'all', label: 'Tümü' },
    { id: 'active', label: 'Aktif' },
    { id: 'passive', label: 'Pasif' },
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
          placeholder="Kullanıcı adı, e-posta veya ID ara…"
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
                  {tab.label}
                </button>
              )
            })}
          </div>

          <select
            value={roleId === 'all' ? 'all' : String(roleId)}
            onChange={(event) => {
              const value = event.target.value

              if (value === 'all') {
                onRoleChange('all')
                return
              }

              onRoleChange(Number(value))
            }}
            className={selectClass}
          >
            <option value="all">Rol: Tümü</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(event) => {
              onSortChange(event.target.value as AdminMemberSort)
            }}
            className={selectClass}
          >
            <option value="created-desc">Sırala: Yeniden Eskiye</option>
            <option value="name-asc">Sırala: Kullanıcı Adı</option>
          </select>

          <button
            type="button"
            onClick={onClear}
            className="font-label cursor-pointer border border-outline-variant/50 px-space-md py-space-sm text-label-md text-on-surface-variant uppercase transition-colors hover:border-primary hover:text-primary"
          >
            Filtreleri Temizle
          </button>
        </div>
      </div>
    </section>
  )
}
