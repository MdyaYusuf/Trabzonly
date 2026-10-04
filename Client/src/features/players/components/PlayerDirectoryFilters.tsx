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

const POSITION_PILLS: { key: PositionGroup; label: string }[] = [
  { key: 'all', label: 'Tümü' },
  { key: 'gk', label: 'Kaleci' },
  { key: 'def', label: 'Defans' },
  { key: 'mid', label: 'Orta Saha' },
  { key: 'fwd', label: 'Hücum' },
]

const controlClass =
  'h-10 border border-outline-variant/40 bg-surface-container-low font-label text-label-md font-semibold tracking-wider text-on-surface uppercase transition-colors focus:border-primary focus:bg-surface-container-lowest focus:outline-none'

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
  return (
    <section className="sticky top-16 z-40 w-full border-b border-outline-variant/30 bg-surface-container-lowest/95 backdrop-blur-sm sm:top-20">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-space-sm px-4 py-space-sm sm:px-6 lg:px-12">
        <div
          className="flex flex-wrap gap-1 bg-surface-container p-1"
          role="tablist"
          aria-label="Pozisyon filtresi"
        >
          {POSITION_PILLS.map((pill) => {
            const isActive = positionFilter === pill.key

            return (
              <button
                key={pill.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  onPositionFilterChange(pill.key)
                }}
                className={
                  isActive
                    ? 'min-w-[30%] flex-1 cursor-pointer bg-primary-container px-space-sm py-2 font-label text-label-md font-bold tracking-wider text-on-primary uppercase shadow-sm transition-colors sm:min-w-0'
                    : 'min-w-[30%] flex-1 cursor-pointer px-space-sm py-2 font-label text-label-md font-semibold tracking-wider text-on-surface-variant uppercase transition-colors hover:bg-surface-container-high hover:text-primary sm:min-w-0'
                }
              >
                {pill.label}
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 gap-space-sm sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_auto_auto]">
          <label className="relative min-w-0">
            <span className="material-symbols-outlined pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-outline">
              search
            </span>
            <input
              className={`${controlClass} w-full pr-space-md pl-10 normal-case tracking-normal`}
              placeholder="Oyuncu adı veya forma no ara…"
              type="search"
              value={search}
              onChange={(event) => {
                onSearchChange(event.target.value)
              }}
            />
          </label>

          <div className="relative min-w-0 sm:min-w-[13rem]">
            <select
              className={`${controlClass} w-full cursor-pointer appearance-none px-space-md pr-9`}
              value={sort}
              aria-label="Sıralama"
              onChange={(event) => {
                onSortChange(event.target.value as SortOption)
              }}
            >
              <option value="value-desc">Piyasa: Azalan</option>
              <option value="rating-desc">Reyting: Yüksek</option>
              <option value="number-asc">Forma Numarası</option>
              <option value="apps-desc">En Çok Maç</option>
            </select>
            <span className="material-symbols-outlined pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-outline">
              expand_more
            </span>
          </div>

          <div className="relative min-w-0 sm:col-span-2 lg:col-span-1 lg:min-w-[12rem]">
            <select
              className={`${controlClass} w-full cursor-pointer appearance-none px-space-md pr-9`}
              value={nationFilter}
              aria-label="Uyruk filtresi"
              onChange={(event) => {
                onNationFilterChange(event.target.value as NationFilter)
              }}
            >
              <option value="all">Uyruk: Tümü</option>
              <option value="domestic">Yerli Oyuncular</option>
              <option value="foreign">Yabancı Oyuncular</option>
            </select>
            <span className="material-symbols-outlined pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-outline">
              expand_more
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
