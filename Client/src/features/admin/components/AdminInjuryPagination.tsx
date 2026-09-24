type AdminInjuryPaginationProps = {
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
}

export function AdminInjuryPagination({
  page,
  pageSize,
  total,
  onPageChange,
}: AdminInjuryPaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const currentPage = Math.min(page, totalPages)
  const start = total === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const end = Math.min(currentPage * pageSize, total)

  const pages =
    totalPages <= 3
      ? Array.from({ length: totalPages }, (_, index) => index + 1)
      : [1, 2, 3]

  return (
    <div className="flex flex-col gap-space-sm border border-outline-variant/40 bg-surface-container-lowest px-space-md py-space-sm sm:flex-row sm:items-center sm:justify-between">
      <p className="font-label text-label-md text-on-surface-variant">
        Toplam <strong className="text-primary">{total}</strong> kayıttan{' '}
        <strong className="text-primary">
          {start} - {end}
        </strong>{' '}
        arası gösteriliyor
      </p>
      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => {
            onPageChange(currentPage - 1)
          }}
          className="font-label inline-flex items-center gap-1 px-space-sm py-space-xs text-label-md uppercase disabled:opacity-40"
        >
          <span className="material-symbols-outlined text-[16px]">chevron_left</span>
          Önceki
        </button>
        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            onClick={() => {
              onPageChange(pageNumber)
            }}
            className={`font-label h-8 w-8 text-label-md ${
              pageNumber === currentPage
                ? 'bg-primary text-on-primary'
                : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            {pageNumber}
          </button>
        ))}
        {totalPages > 3 && (
          <>
            <span className="font-label px-1 text-label-md text-on-surface-variant">...</span>
            <button
              type="button"
              onClick={() => {
                onPageChange(totalPages)
              }}
              className="font-label h-8 min-w-8 px-space-xs text-label-md text-on-surface-variant hover:bg-surface-container-high"
            >
              {totalPages}
            </button>
          </>
        )}
        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => {
            onPageChange(currentPage + 1)
          }}
          className="font-label inline-flex items-center gap-1 px-space-sm py-space-xs text-label-md uppercase disabled:opacity-40"
        >
          Sonraki
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </button>
      </div>
    </div>
  )
}
