import { sortTabs } from '../utils/squadsGalleryTypes'
import type { GallerySortTab, GalleryViewMode } from '../utils/squadsGalleryTypes'

type SquadsGalleryFiltersProps = {
  sortTab: GallerySortTab
  viewMode: GalleryViewMode
  search: string
  visibleCount: number
  totalCount: number
  onSortTabChange: (tab: GallerySortTab) => void
  onViewModeChange: (mode: GalleryViewMode) => void
  onSearchChange: (value: string) => void
}

export function SquadsGalleryFilters({
  sortTab,
  viewMode,
  search,
  visibleCount,
  totalCount,
  onSortTabChange,
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
                      ? 'font-label flex cursor-pointer items-center gap-1 bg-primary-container px-space-md py-space-xs text-label-md tracking-wider text-on-primary uppercase transition-colors'
                      : 'font-label flex cursor-pointer items-center gap-1 px-space-md py-space-xs text-label-md tracking-wider text-on-surface-variant uppercase transition-colors hover:text-on-surface'
                  }
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-space-md">
            <span className="font-body text-body-sm text-on-surface-variant">
              Gösterilen:{' '}
              <strong className="text-on-surface">{visibleCount} Kadro</strong> /{' '}
              {totalCount.toLocaleString('tr-TR')}
            </span>
            <div className="flex items-center bg-surface-container-low p-1">
              <button
                type="button"
                title="Grid Görünümü"
                onClick={() => onViewModeChange('grid')}
                className={
                  viewMode === 'grid'
                    ? 'cursor-pointer bg-surface-container-lowest p-1.5 text-primary shadow-xs'
                    : 'cursor-pointer p-1.5 text-on-surface-variant transition-colors hover:text-primary'
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
                    ? 'cursor-pointer bg-surface-container-lowest p-1.5 text-primary shadow-xs'
                    : 'cursor-pointer p-1.5 text-on-surface-variant transition-colors hover:text-primary'
                }
              >
                <span className="material-symbols-outlined text-[18px]">view_agenda</span>
              </button>
            </div>
          </div>
        </div>

        <div className="relative w-full">
          <span className="material-symbols-outlined pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[20px] text-outline">
            search
          </span>
          <input
            className="font-body w-full bg-surface-container-lowest py-2.5 pr-4 pl-10 text-body-md text-on-surface transition-colors placeholder:text-outline focus:bg-surface-container-low focus:outline-none"
            placeholder="Kadro adı veya yazar ara..."
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>
      </div>
    </section>
  )
}
