import type { AdminQuizStatusFilter } from '../utils/adminQuizTypes'
import { adminQuizCategoryOptions } from '../utils/adminQuizPlaceholders'

type AdminQuizListFiltersProps = {
  search: string
  statusFilter: AdminQuizStatusFilter
  category: string
  counts: Record<AdminQuizStatusFilter, number>
  onSearchChange: (value: string) => void
  onStatusChange: (value: AdminQuizStatusFilter) => void
  onCategoryChange: (value: string) => void
  onClear: () => void
}

export function AdminQuizListFilters({
  search,
  statusFilter,
  category,
  counts,
  onSearchChange,
  onStatusChange,
  onCategoryChange,
  onClear,
}: AdminQuizListFiltersProps) {
  const tabs: Array<{ id: AdminQuizStatusFilter; label: string }> = [
    { id: 'all', label: `Tümü (${counts.all})` },
    { id: 'active', label: `Aktif (${counts.active})` },
    { id: 'passive', label: `Pasif (${counts.passive})` },
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
            placeholder="Quiz adı, etiket"
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
                {tab.label}
              </button>
            )
          })}
        </div>

        <select
          value={category}
          onChange={(event) => {
            onCategoryChange(event.target.value)
          }}
          className="font-label border border-outline-variant/50 bg-surface px-space-md py-space-sm text-label-md outline-none focus:border-primary"
        >
          {adminQuizCategoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
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
    </section>
  )
}
