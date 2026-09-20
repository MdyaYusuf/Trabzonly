import type { PostCategoryId } from '../utils/postsFeedTypes'
import { categoryTabs } from '../utils/postsFeedPlaceholders'

type PostsFeedFiltersProps = {
  categoryId: PostCategoryId
  search: string
  onCategoryChange: (value: PostCategoryId) => void
  onSearchChange: (value: string) => void
}

export function PostsFeedFilters({
  categoryId,
  search,
  onCategoryChange,
  onSearchChange,
}: PostsFeedFiltersProps) {
  return (
    <section className="w-full bg-surface-container-lowest shadow-sm">
      <div className="mx-auto max-w-[1360px] px-4 py-space-sm sm:px-6 lg:px-12">
        <div className="flex flex-col items-center justify-between gap-space-md lg:flex-row">
          <div className="scrollbar-none flex w-full items-center gap-space-xs overflow-x-auto py-1 lg:w-auto">
            {categoryTabs.map((tab) => {
              const isActive = categoryId === tab.id

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    onCategoryChange(tab.id)
                  }}
                  className={[
                    'px-space-md py-space-xs font-label text-label-md font-bold whitespace-nowrap uppercase transition-colors',
                    isActive
                      ? 'bg-primary-container text-on-primary shadow-sm'
                      : 'bg-surface-container text-on-surface hover:bg-surface-container-high',
                  ].join(' ')}
                >
                  {tab.label} ({tab.count.toLocaleString('tr-TR')})
                </button>
              )
            })}
          </div>

          <div className="relative w-full shrink-0 lg:w-72">
            <span className="material-symbols-outlined absolute top-1/2 left-space-sm -translate-y-1/2 text-lg text-on-surface-variant">
              search
            </span>
            <input
              type="text"
              value={search}
              onChange={(event) => {
                onSearchChange(event.target.value)
              }}
              placeholder="Gönderi başlığı veya yazar ara..."
              className="font-body w-full bg-surface-container py-space-xs pr-space-sm pl-10 text-body-sm text-on-surface outline-none placeholder:text-on-surface-variant focus:bg-surface"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
