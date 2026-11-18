import type {
  ContactMessageReadFilter,
  ContactMessageResolvedFilter,
} from '@/features/contactMessages/contactMessageTypes'

export type AdminContactMessageSort = 'created-desc' | 'created-asc' | 'username-asc'

type AdminContactMessageListFiltersProps = {
  search: string
  readFilter: ContactMessageReadFilter
  resolvedFilter: ContactMessageResolvedFilter
  sort: AdminContactMessageSort
  onSearchChange: (value: string) => void
  onReadFilterChange: (value: ContactMessageReadFilter) => void
  onResolvedFilterChange: (value: ContactMessageResolvedFilter) => void
  onSortChange: (value: AdminContactMessageSort) => void
  onClear: () => void
}

export function AdminContactMessageListFilters({
  search,
  readFilter,
  resolvedFilter,
  sort,
  onSearchChange,
  onReadFilterChange,
  onResolvedFilterChange,
  onSortChange,
  onClear,
}: AdminContactMessageListFiltersProps) {
  const statusTabs: Array<{ id: ContactMessageReadFilter; label: string }> = [
    { id: 'all', label: 'Tümü' },
    { id: 'unread', label: 'Okunmamış' },
    { id: 'read', label: 'Okunmuş' },
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
          placeholder="Kullanıcı adı, e-posta veya mesaj ara…"
          className="font-body w-full border border-outline-variant/50 bg-surface py-space-sm pr-space-md pl-10 text-body-md text-on-surface outline-none focus:border-primary"
        />
      </label>

      <div className="flex flex-col gap-space-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-space-sm">
          <div className="flex flex-wrap gap-1">
            {statusTabs.map((tab) => {
              const isActive = readFilter === tab.id

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    onReadFilterChange(tab.id)
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
            value={resolvedFilter}
            onChange={(event) => {
              onResolvedFilterChange(event.target.value as ContactMessageResolvedFilter)
            }}
            className={selectClass}
          >
            <option value="all">Çözüm: Tümü</option>
            <option value="open">Çözüm: Açık</option>
            <option value="resolved">Çözüm: Çözüldü</option>
          </select>

          <select
            value={sort}
            onChange={(event) => {
              onSortChange(event.target.value as AdminContactMessageSort)
            }}
            className={selectClass}
          >
            <option value="created-desc">Sırala: Yeniden Eskiye</option>
            <option value="created-asc">Sırala: Eskiden Yeniye</option>
            <option value="username-asc">Sırala: Kullanıcı Adı</option>
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
