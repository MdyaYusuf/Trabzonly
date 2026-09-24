import type { AdminMemberStatusFilter } from '../utils/adminMemberTypes'

type AdminMemberListFiltersProps = {
  search: string
  role: string
  status: string
  quickView: AdminMemberStatusFilter
  counts: Record<AdminMemberStatusFilter, number>
  onSearchChange: (value: string) => void
  onRoleChange: (value: string) => void
  onStatusChange: (value: string) => void
  onQuickViewChange: (value: AdminMemberStatusFilter) => void
  onClear: () => void
}

export function AdminMemberListFilters({
  search,
  role,
  status,
  quickView,
  counts,
  onSearchChange,
  onRoleChange,
  onStatusChange,
  onQuickViewChange,
  onClear,
}: AdminMemberListFiltersProps) {
  const tabs: Array<{ id: AdminMemberStatusFilter; label: string }> = [
    { id: 'all', label: `Tümü (${counts.all.toLocaleString('tr-TR')})` },
    { id: 'active', label: `Aktif (${counts.active.toLocaleString('tr-TR')})` },
    { id: 'passive', label: `Pasif (${counts.passive.toLocaleString('tr-TR')})` },
    { id: 'admins', label: `Yöneticiler (${counts.admins})` },
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
            placeholder="Kullanıcı adı, e-posta veya ID"
            className="font-body w-full border border-outline-variant/50 bg-surface py-space-sm pr-space-md pl-10 text-body-md text-on-surface outline-none focus:border-primary"
          />
        </label>

        <select
          value={role}
          onChange={(event) => {
            onRoleChange(event.target.value)
          }}
          className="font-label border border-outline-variant/50 bg-surface px-space-md py-space-sm text-label-md outline-none focus:border-primary"
        >
          <option value="all">Rol: Tümü (Yönetici, Editör, Üye)</option>
          <option value="admin">Yönetici</option>
          <option value="moderator">Moderatör</option>
          <option value="editor">Editör</option>
          <option value="member">Üye</option>
        </select>

        <select
          value={status}
          onChange={(event) => {
            onStatusChange(event.target.value)
          }}
          className="font-label border border-outline-variant/50 bg-surface px-space-md py-space-sm text-label-md outline-none focus:border-primary"
        >
          <option value="all">Durum: Tümü (Aktif, Pasif, Askıda)</option>
          <option value="active">Aktif</option>
          <option value="passive">Pasif</option>
          <option value="suspended">Askıda</option>
        </select>
      </div>

      <button
        type="button"
        onClick={onClear}
        className="font-label inline-flex w-fit items-center gap-1 text-label-md text-on-surface-variant uppercase transition-colors hover:text-primary"
      >
        <span className="material-symbols-outlined text-[16px]">filter_alt_off</span>
        Filtreleri Temizle
      </button>

      <div className="flex flex-col gap-space-sm lg:flex-row lg:items-center">
        <span className="font-kicker text-kicker text-on-surface-variant uppercase">
          Hızlı Görünüm:
        </span>
        <div className="flex flex-wrap gap-1">
          {tabs.map((tab) => {
            const isActive = quickView === tab.id

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  onQuickViewChange(tab.id)
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
    </section>
  )
}
