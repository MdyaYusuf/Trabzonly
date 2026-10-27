import type { QuizCategoryResponseDto } from '../quizTypes'

export type QuizListCategoryFilter = number | 'all'

type QuizListFiltersProps = {
  categories: QuizCategoryResponseDto[]
  categoryId: QuizListCategoryFilter
  search: string
  onCategoryChange: (value: QuizListCategoryFilter) => void
  onSearchChange: (value: string) => void
}

const controlClass =
  'h-10 border border-outline-variant/40 bg-surface-container-low font-label text-label-md font-semibold tracking-wider text-on-surface uppercase transition-colors focus:border-primary focus:bg-surface-container-lowest focus:outline-none'

export function QuizListFilters({
  categories,
  categoryId,
  search,
  onCategoryChange,
  onSearchChange,
}: QuizListFiltersProps) {
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
                ? 'min-w-[30%] flex-1 cursor-pointer bg-primary-container px-space-sm py-2 font-label text-label-md font-bold tracking-wider text-on-primary uppercase shadow-sm transition-colors sm:min-w-0'
                : 'min-w-[30%] flex-1 cursor-pointer px-space-sm py-2 font-label text-label-md font-semibold tracking-wider text-on-surface-variant uppercase transition-colors hover:bg-surface-container-high hover:text-primary sm:min-w-0'
            }
          >
            Tümü
          </button>
          {categories.map((tab) => {
            const isActive = categoryId === tab.id

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  onCategoryChange(tab.id)
                }}
                className={
                  isActive
                    ? 'min-w-[30%] flex-1 cursor-pointer bg-primary-container px-space-sm py-2 font-label text-label-md font-bold tracking-wider text-on-primary uppercase shadow-sm transition-colors sm:min-w-0'
                    : 'min-w-[30%] flex-1 cursor-pointer px-space-sm py-2 font-label text-label-md font-semibold tracking-wider text-on-surface-variant uppercase transition-colors hover:bg-surface-container-high hover:text-primary sm:min-w-0'
                }
              >
                {tab.name}
              </button>
            )
          })}
        </div>

        <label className="relative min-w-0">
          <span className="material-symbols-outlined pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-outline">
            search
          </span>
          <input
            className={`${controlClass} w-full pr-space-md pl-10 normal-case tracking-normal`}
            placeholder="Quiz adı veya açıklama ara…"
            type="search"
            value={search}
            onChange={(event) => {
              onSearchChange(event.target.value)
            }}
          />
        </label>
      </div>
    </section>
  )
}
