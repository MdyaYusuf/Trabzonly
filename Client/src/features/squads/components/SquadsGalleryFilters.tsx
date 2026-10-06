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
    <aside className="flex flex-col gap-space-md lg:sticky lg:top-24">
      <div className="flex min-h-[22rem] flex-col gap-space-lg bg-surface-container-lowest p-space-lg shadow-sm">
        <div>
          <span className="font-kicker mb-space-sm block text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
            Ara
          </span>
          <label className="relative block min-w-0 w-full">
            <span className="material-symbols-outlined pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-outline">
              search
            </span>
            <input
              className="h-12 w-full border border-outline-variant/40 bg-surface-container-low pr-space-md pl-10 font-label text-label-md font-semibold tracking-normal text-on-surface normal-case transition-colors placeholder:text-outline focus:border-primary focus:bg-surface-container-lowest focus:outline-none"
              placeholder="Kadro veya yazar…"
              type="search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
            />
          </label>
        </div>

        <div>
          <span className="font-kicker mb-space-sm block text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
            Sıralama
          </span>
          <div className="flex flex-col gap-1.5 bg-surface-container-low p-1.5">
            {sortTabs.map((tab) => {
              const isActive = sortTab === tab.id

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onSortTabChange(tab.id)}
                  className={
                    isActive
                      ? 'font-label w-full cursor-pointer bg-primary-container px-space-sm py-space-sm text-left text-label-md tracking-wider text-on-primary uppercase transition-colors'
                      : 'font-label w-full cursor-pointer bg-surface-container-lowest px-space-sm py-space-sm text-left text-label-md tracking-wider text-on-surface-variant uppercase transition-colors hover:bg-surface-container-highest hover:text-on-surface'
                  }
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <span className="font-kicker mb-space-sm block text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
            Görünüm
          </span>
          <div className="flex items-center gap-1.5 bg-surface-container-low p-1.5">
            <button
              type="button"
              title="Grid Görünümü"
              onClick={() => onViewModeChange('grid')}
              className={
                viewMode === 'grid'
                  ? 'flex flex-1 cursor-pointer items-center justify-center gap-1.5 bg-surface-container-lowest py-space-sm text-primary shadow-xs'
                  : 'flex flex-1 cursor-pointer items-center justify-center gap-1.5 py-space-sm text-on-surface-variant transition-colors hover:text-primary'
              }
            >
              <span className="material-symbols-outlined text-[20px]">grid_view</span>
              <span className="font-label text-label-md uppercase">Grid</span>
            </button>
            <button
              type="button"
              title="Kompakt Liste"
              onClick={() => onViewModeChange('list')}
              className={
                viewMode === 'list'
                  ? 'flex flex-1 cursor-pointer items-center justify-center gap-1.5 bg-surface-container-lowest py-space-sm text-primary shadow-xs'
                  : 'flex flex-1 cursor-pointer items-center justify-center gap-1.5 py-space-sm text-on-surface-variant transition-colors hover:text-primary'
              }
            >
              <span className="material-symbols-outlined text-[20px]">view_agenda</span>
              <span className="font-label text-label-md uppercase">Liste</span>
            </button>
          </div>
        </div>

        <p className="font-body mt-auto border-t border-outline-variant/30 pt-space-md text-body-sm text-on-surface-variant">
          Gösterilen:{' '}
          <strong className="text-on-surface">{visibleCount} Kadro</strong> /{' '}
          {totalCount.toLocaleString('tr-TR')}
        </p>
      </div>
    </aside>
  )
}
