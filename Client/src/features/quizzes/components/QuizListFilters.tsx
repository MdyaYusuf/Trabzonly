import { QUIZ_CATEGORY_OPTIONS } from '../quizCategoryUtils'
import type { QuizCategory } from '../quizTypes'

export type QuizListCategoryFilter = QuizCategory | 'all'

type QuizListFiltersProps = {
  categoryId: QuizListCategoryFilter
  totalCount: number | null
  onCategoryChange: (value: QuizListCategoryFilter) => void
}

export function QuizListFilters({
  categoryId,
  totalCount,
  onCategoryChange,
}: QuizListFiltersProps) {
  const allLabel =
    totalCount == null ? 'Tümü' : `Tümü (${totalCount.toLocaleString('tr-TR')})`

  return (
    <section className="flex flex-col gap-space-md bg-surface-container-lowest p-space-md shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-space-md">
        <div className="flex flex-wrap items-center gap-space-xs">
          <button
            type="button"
            onClick={() => {
              onCategoryChange('all')
            }}
            className={
              categoryId === 'all'
                ? 'font-label bg-primary-container px-space-md py-space-xs text-label-md tracking-wider text-on-primary uppercase shadow-sm transition-all'
                : 'font-label bg-surface-container-low px-space-md py-space-xs text-label-md tracking-wider text-on-surface uppercase transition-all hover:bg-surface-container'
            }
          >
            {allLabel}
          </button>
          {QUIZ_CATEGORY_OPTIONS.map((tab) => {
            const isActive = categoryId === tab.id

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  onCategoryChange(tab.id)
                }}
                className={
                  isActive
                    ? 'font-label flex items-center gap-space-xs bg-primary-container px-space-md py-space-xs text-label-md tracking-wider text-on-primary uppercase shadow-sm transition-all'
                    : 'font-label flex items-center gap-space-xs bg-surface-container-low px-space-md py-space-xs text-label-md tracking-wider text-on-surface uppercase transition-all hover:bg-surface-container'
                }
              >
                <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
                {tab.label}
              </button>
            )
          })}
        </div>

        <span className="font-kicker text-kicker font-bold text-on-surface-variant uppercase">
          Sıralama: En Çok Çözülenler
        </span>
      </div>
    </section>
  )
}
