import {
  type NationFilter,
  type PositionGroup,
  type SortOption,
} from '../utils/playerDirectoryTypes'

type PlayerDirectoryFiltersProps = {
  positionFilter: PositionGroup
  search: string
  sort: SortOption
  nationFilter: NationFilter
  onPositionFilterChange: (next: PositionGroup) => void
  onSearchChange: (value: string) => void
  onSortChange: (value: SortOption) => void
  onNationFilterChange: (value: NationFilter) => void
}

export function PlayerDirectoryFilters({
  positionFilter,
  search,
  sort,
  nationFilter,
  onPositionFilterChange,
  onSearchChange,
  onSortChange,
  onNationFilterChange,
}: PlayerDirectoryFiltersProps) {
  const positionPills: { key: PositionGroup; label: string }[] = [
    { key: 'all', label: 'Tümü' },
    { key: 'gk', label: 'Kaleciler' },
    { key: 'def', label: 'Defans' },
    { key: 'mid', label: 'Orta Saha' },
    { key: 'fwd', label: 'Hücum / Forvet' },
  ]

  return (
    <section className="sticky top-16 z-40 w-full bg-surface-container-lowest shadow-sm sm:top-20">
      <div className="mx-auto flex max-w-[1360px] flex-col items-center justify-between gap-space-md px-4 py-space-sm sm:px-6 md:flex-row lg:px-12">
        <div className="flex w-full items-center gap-space-xs overflow-x-auto pb-1 md:w-auto md:pb-0">
          {positionPills.map((pill) => {
            const isActive = positionFilter === pill.key

            return (
              <button
                key={pill.key}
                type="button"
                onClick={() => onPositionFilterChange(pill.key)}
                className={
                  isActive
                    ? 'bg-primary-container px-space-md py-2 font-label text-label-md font-bold tracking-wider whitespace-nowrap text-on-primary uppercase shadow-sm transition-all'
                    : 'bg-surface-container px-space-md py-2 font-label text-label-md font-semibold tracking-wider whitespace-nowrap text-on-surface uppercase transition-all hover:bg-surface-container-high'
                }
              >
                {pill.label}
              </button>
            )
          })}
        </div>

        <div className="flex w-full flex-col items-stretch gap-space-sm sm:flex-row sm:items-center md:w-auto">
          <div className="relative flex-1 md:w-72 lg:w-80">
            <span className="material-symbols-outlined pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-headline-sm text-outline">
              search
            </span>
            <input
              className="w-full bg-surface-container-low py-2 pr-space-md pl-10 font-body text-body-sm text-on-surface transition-colors focus:bg-surface-container-lowest focus:outline-none"
              placeholder="Oyuncu adı veya forma no ile ara..."
              type="search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
            />
          </div>

          <div className="relative shrink-0">
            <select
              className="cursor-pointer appearance-none bg-surface-container px-space-md py-2 pr-8 font-label text-label-md font-semibold tracking-wider text-on-surface uppercase focus:outline-none"
              value={sort}
              onChange={(event) => onSortChange(event.target.value as SortOption)}
            >
              <option value="value-desc">Piyasa Değeri: Azalan</option>
              <option value="rating-desc">Reyting: En Yüksek</option>
              <option value="number-asc">Forma Numarası</option>
              <option value="apps-desc">En Çok Maça Çıkan</option>
            </select>
            <span className="material-symbols-outlined pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-headline-sm text-outline">
              expand_more
            </span>
          </div>

          <div className="relative hidden shrink-0 lg:block">
            <select
              className="cursor-pointer appearance-none bg-surface-container px-space-md py-2 pr-8 font-label text-label-md font-semibold tracking-wider text-on-surface uppercase focus:outline-none"
              value={nationFilter}
              onChange={(event) => onNationFilterChange(event.target.value as NationFilter)}
            >
              <option value="all">Uyruk: Tümü</option>
              <option value="domestic">Yerli Oyuncular</option>
              <option value="foreign">Yabancı Oyuncular</option>
            </select>
            <span className="material-symbols-outlined pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-headline-sm text-outline">
              flag
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
