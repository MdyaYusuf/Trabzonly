import {
  quizCategoryTabs,
  quizSortOptions,
  TOTAL_QUIZZES,
} from '../utils/quizListPlaceholders'
import type { QuizCategoryId, QuizSortOption } from '../utils/quizListTypes'

type QuizListFiltersProps = {
  categoryId: QuizCategoryId
  search: string
  sort: QuizSortOption
  onCategoryChange: (value: QuizCategoryId) => void
  onSearchChange: (value: string) => void
  onSortChange: (value: QuizSortOption) => void
}

export function QuizListFilters({
  categoryId,
  search,
  sort,
  onCategoryChange,
  onSearchChange,
  onSortChange,
}: QuizListFiltersProps) {
  return (
    <section className="flex flex-col gap-space-md bg-surface-container-lowest p-space-md shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-space-md">
        <div className="flex flex-wrap items-center gap-space-xs">
          {quizCategoryTabs.map((tab) => {
            const isActive = categoryId === tab.id
            const label =
              tab.id === 'all' ? `${tab.label} (${TOTAL_QUIZZES})` : tab.label

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  onCategoryChange(tab.id)
                }}
                className={
                  isActive
                    ? 'font-label bg-primary-container px-space-md py-space-xs text-label-md tracking-wider text-on-primary uppercase shadow-sm transition-all'
                    : 'font-label bg-surface-container-low px-space-md py-space-xs text-label-md tracking-wider text-on-surface uppercase transition-all hover:bg-surface-container'
                }
              >
                {label}
              </button>
            )
          })}
        </div>

        <div className="flex w-full flex-col items-stretch gap-space-sm sm:w-auto sm:flex-row sm:items-center">
          <div className="relative min-w-0 sm:min-w-[280px]">
            <input
              className="font-body w-full bg-surface-container-low px-space-md py-space-xs pr-10 text-body-sm text-on-surface placeholder:text-on-surface-variant/60 focus:bg-surface-container-lowest focus:outline-none"
              placeholder="Quiz ara (Örn: 2021-22, Avni Aker...)"
              type="search"
              value={search}
              onChange={(event) => {
                onSearchChange(event.target.value)
              }}
            />
            <span className="material-symbols-outlined absolute top-1/2 right-space-sm -translate-y-1/2 text-[18px] text-on-surface-variant">
              search
            </span>
          </div>
          <div className="flex items-center bg-surface-container-low px-space-md py-space-xs">
            <span className="font-kicker mr-space-xs text-kicker text-on-surface-variant uppercase">
              Sırala:
            </span>
            <select
              className="font-label cursor-pointer bg-transparent text-label-md font-bold text-primary uppercase focus:outline-none"
              value={sort}
              onChange={(event) => {
                onSortChange(event.target.value as QuizSortOption)
              }}
            >
              {quizSortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  )
}
