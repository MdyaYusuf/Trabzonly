import {
  formationFilters,
  matchFilters,
  sortTabs,
  TOTAL_SQUADS,
} from '../utils/squadsGalleryPlaceholders'
import type {
  FormationFilter,
  GallerySortTab,
  GalleryViewMode,
  MatchFilter,
} from '../utils/squadsGalleryTypes'

type SquadsGalleryFiltersProps = {
  sortTab: GallerySortTab
  formationFilter: FormationFilter
  matchFilter: MatchFilter
  viewMode: GalleryViewMode
  search: string
  visibleCount: number
  onSortTabChange: (tab: GallerySortTab) => void
  onFormationFilterChange: (value: FormationFilter) => void
  onMatchFilterChange: (value: MatchFilter) => void
  onViewModeChange: (mode: GalleryViewMode) => void
  onSearchChange: (value: string) => void
}

export function SquadsGalleryFilters({
  sortTab,
  formationFilter,
  matchFilter,
  viewMode,
  search,
  visibleCount,
  onSortTabChange,
  onFormationFilterChange,
  onMatchFilterChange,
  onViewModeChange,
  onSearchChange,
}: SquadsGalleryFiltersProps) {
  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 pb-space-lg sm:px-6 lg:px-12">
      <div className="flex flex-col gap-space-md bg-surface-container-lowest p-space-md shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-space-md">
          <div className="flex flex-wrap items-center gap-space-xs bg-surface-container-low p-1">
            {sortTabs.map((tab) => {
              const isActive = sortTab === tab.id

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onSortTabChange(tab.id)}
                  className={
                    isActive
                      ? 'font-label flex items-center gap-1 bg-primary-container px-space-md py-space-xs text-label-md tracking-wider text-on-primary uppercase transition-colors'
                      : 'font-label flex items-center gap-1 px-space-md py-space-xs text-label-md tracking-wider text-on-surface-variant uppercase transition-colors hover:text-on-surface'
                  }
                >
                  {tab.live ? <span className="h-2 w-2 rounded-full bg-error" /> : null}
                  {tab.label}
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-space-md">
            <span className="font-body text-body-sm text-on-surface-variant">
              Gösterilen:{' '}
              <strong className="text-on-surface">{visibleCount} Kadro</strong> /{' '}
              {TOTAL_SQUADS.toLocaleString('tr-TR')}
            </span>
            <div className="flex items-center bg-surface-container-low p-1">
              <button
                type="button"
                title="Grid Görünümü"
                onClick={() => onViewModeChange('grid')}
                className={
                  viewMode === 'grid'
                    ? 'bg-surface-container-lowest p-1.5 text-primary shadow-xs'
                    : 'p-1.5 text-on-surface-variant transition-colors hover:text-primary'
                }
              >
                <span className="material-symbols-outlined text-[18px]">grid_view</span>
              </button>
              <button
                type="button"
                title="Kompakt Liste"
                onClick={() => onViewModeChange('list')}
                className={
                  viewMode === 'list'
                    ? 'bg-surface-container-lowest p-1.5 text-primary shadow-xs'
                    : 'p-1.5 text-on-surface-variant transition-colors hover:text-primary'
                }
              >
                <span className="material-symbols-outlined text-[18px]">view_agenda</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-space-sm pt-space-xs md:grid-cols-12">
          <div className="relative md:col-span-5">
            <span className="material-symbols-outlined pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[20px] text-outline">
              search
            </span>
            <input
              className="font-body w-full bg-surface-container-lowest py-2.5 pr-4 pl-10 text-body-md text-on-surface transition-colors placeholder:text-outline focus:bg-surface-container-low focus:outline-none"
              placeholder="Kadro adı, taktik analizi veya yazar ara..."
              type="search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
            />
          </div>

          <div className="flex items-center gap-space-xs overflow-x-auto pb-1 md:col-span-4 md:pb-0">
            <span className="font-kicker mr-1 shrink-0 text-kicker text-on-surface-variant uppercase">
              DİZİLİŞ:
            </span>
            {formationFilters.map((filter) => {
              const isActive = formationFilter === filter.id

              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => onFormationFilterChange(filter.id)}
                  className={
                    isActive
                      ? 'font-label bg-secondary-container px-3 py-1.5 text-label-md whitespace-nowrap text-on-secondary-container uppercase'
                      : 'font-label bg-surface-container px-3 py-1.5 text-label-md whitespace-nowrap text-on-surface transition-colors hover:bg-surface-container-high'
                  }
                >
                  {filter.label}
                </button>
              )
            })}
          </div>

          <div className="flex items-center justify-end md:col-span-3">
            <div className="relative w-full">
              <select
                className="font-body w-full cursor-pointer appearance-none bg-surface-container-lowest px-3 py-2.5 text-body-md text-on-surface focus:outline-none"
                value={matchFilter}
                onChange={(event) => onMatchFilterChange(event.target.value as MatchFilter)}
              >
                {matchFilters.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[20px] text-outline">
                expand_more
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
