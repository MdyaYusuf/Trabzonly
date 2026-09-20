type SquadsGalleryPaginationProps = {
  currentPage: number
  totalPages: number
  totalCount: number
  onPageChange: (page: number) => void
}

function buildPageItems(currentPage: number, totalPages: number): (number | 'ellipsis')[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const items: (number | 'ellipsis')[] = [1]

  if (currentPage > 3) {
    items.push('ellipsis')
  }

  const start = Math.max(2, currentPage - 1)
  const end = Math.min(totalPages - 1, currentPage + 1)

  for (let page = start; page <= end; page += 1) {
    items.push(page)
  }

  if (currentPage < totalPages - 2) {
    items.push('ellipsis')
  }

  items.push(totalPages)

  return items
}

export function SquadsGalleryPagination({
  currentPage,
  totalPages,
  totalCount,
  onPageChange,
}: SquadsGalleryPaginationProps) {
  const pageItems = buildPageItems(currentPage, totalPages)

  return (
    <div className="mt-space-xl flex flex-col items-center justify-between gap-space-md border-t border-outline-variant/40 pt-space-lg sm:flex-row">
      <span className="font-body text-body-sm text-on-surface-variant">
        Sayfa <strong>{currentPage}</strong> / {totalPages} (Toplam{' '}
        {totalCount.toLocaleString('tr-TR')} Kadro)
      </span>
      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          className="font-label flex items-center gap-1 bg-surface-container-low px-3 py-1.5 text-label-md text-on-surface-variant transition-colors hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-[16px]">chevron_left</span>
          Önceki
        </button>

        {pageItems.map((item, index) => {
          if (item === 'ellipsis') {
            return (
              <span key={`ellipsis-${index}`} className="font-label px-1 text-label-md text-outline">
                ...
              </span>
            )
          }

          const isActive = item === currentPage

          return (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              className={
                isActive
                  ? 'font-label h-8 w-8 bg-primary-container text-label-md font-bold text-on-primary'
                  : 'font-label h-8 w-8 bg-surface-container-low text-label-md text-on-surface transition-colors hover:bg-surface-container'
              }
            >
              {item}
            </button>
          )
        })}

        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          className="font-label flex items-center gap-1 bg-surface-container-low px-3 py-1.5 text-label-md text-on-surface transition-colors hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-50"
        >
          Sonraki
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </button>
      </div>
    </div>
  )
}
