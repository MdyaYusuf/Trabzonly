import type { CategoryResponseDto } from '../../categories/categoryTypes'
import type { FeedSortOption } from '../utils/postsFeedTypes'
import { sortOptions } from '../utils/postsFeedTypes'

type PostsFeedFiltersProps = {
  categories: CategoryResponseDto[]
  categoryId: number | 'all'
  search: string
  sort: FeedSortOption
  onCategoryChange: (value: number | 'all') => void
  onSearchChange: (value: string) => void
  onSortChange: (value: FeedSortOption) => void
}

const controlClass =
  'h-10 border border-outline-variant/40 bg-surface-container-low font-label text-label-md font-semibold tracking-wider text-on-surface uppercase transition-colors focus:border-primary focus:bg-surface-container-lowest focus:outline-none'

export function PostsFeedFilters({
  categories,
  categoryId,
  search,
  sort,
  onCategoryChange,
  onSearchChange,
  onSortChange,
}: PostsFeedFiltersProps) {
  return (
    <section className="sticky top-16 z-40 w-full border-b border-outline-variant/30 bg-surface-container-lowest/95 backdrop-blur-sm sm:top-20">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-space-sm px-4 py-space-sm sm:px-6 lg:px-12">
        <div
          className="flex flex-wrap gap-1 bg-surface-container p-1"
          role="tablist"
          aria-label="Kategori filtresi"
        >
          <button
            type="button"
            role="tab"
            aria-selected={categoryId === 'all'}
            onClick={() => {
              onCategoryChange('all')
            }}
            className={
              categoryId === 'all'
                ? 'min-w-[30%] flex-1 bg-primary-container px-space-sm py-2 font-label text-label-md font-bold tracking-wider text-on-primary uppercase shadow-sm transition-colors sm:min-w-0'
                : 'min-w-[30%] flex-1 px-space-sm py-2 font-label text-label-md font-semibold tracking-wider text-on-surface-variant uppercase transition-colors hover:bg-surface-container-high hover:text-primary sm:min-w-0'
            }
          >
            Tümü
          </button>
          {categories.map((category) => {
            const isActive = categoryId === category.id

            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  onCategoryChange(category.id)
                }}
                className={
                  isActive
                    ? 'min-w-[30%] flex-1 bg-primary-container px-space-sm py-2 font-label text-label-md font-bold tracking-wider text-on-primary uppercase shadow-sm transition-colors sm:min-w-0'
                    : 'min-w-[30%] flex-1 px-space-sm py-2 font-label text-label-md font-semibold tracking-wider text-on-surface-variant uppercase transition-colors hover:bg-surface-container-high hover:text-primary sm:min-w-0'
                }
              >
                {category.name}
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 gap-space-sm sm:grid-cols-[minmax(0,1fr)_auto]">
          <label className="relative min-w-0">
            <span className="material-symbols-outlined pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-outline">
              search
            </span>
            <input
              className={`${controlClass} w-full pr-space-md pl-10 normal-case tracking-normal`}
              placeholder="Gönderi başlığı veya yazar ara…"
              type="search"
              value={search}
              onChange={(event) => {
                onSearchChange(event.target.value)
              }}
            />
          </label>

          <div className="relative min-w-0 sm:min-w-[14rem]">
            <select
              className={`${controlClass} w-full cursor-pointer appearance-none px-space-md pr-9`}
              value={sort}
              aria-label="Sıralama"
              onChange={(event) => {
                onSortChange(event.target.value as FeedSortOption)
              }}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
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
