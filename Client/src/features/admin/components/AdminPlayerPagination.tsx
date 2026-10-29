type AdminPlayerPaginationProps = {
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
}

function buildPageWindow(currentPage: number, totalPages: number): number[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4))
  const end = Math.min(totalPages, start + 4)

  return Array.from({ length: end - start + 1 }, (_, index) => start + index)
}

export function AdminPlayerPagination({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
}: AdminPlayerPaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const currentPage = Math.min(page, totalPages)
  const start = total === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const end = Math.min(currentPage * pageSize, total)
  const pages = buildPageWindow(currentPage, totalPages)

  return (
    <div className="flex flex-col gap-space-sm border border-outline-variant/40 bg-surface-container-lowest px-space-md py-space-sm lg:flex-row lg:items-center lg:justify-between">
      <div className="font-label flex flex-wrap items-center gap-space-sm text-label-md text-on-surface-variant">
        <span>
          Toplam <strong className="text-primary">{total}</strong> kayıttan{' '}
          <strong className="text-primary">
            {start} - {end}
          </strong>{' '}
          arası gösteriliyor
        </span>
        <span className="text-outline-variant">|</span>
        <label className="flex items-center gap-space-xs">
          <span className="font-kicker text-kicker uppercase">Sayfa Başına:</span>
          <select
            value={pageSize}
            onChange={(event) => {
              onPageSizeChange(Number(event.target.value))
            }}
            className="cursor-pointer border border-outline-variant/50 bg-surface px-space-sm py-1 outline-none focus:border-primary"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </label>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => {
            onPageChange(currentPage - 1)
          }}
          className="font-label inline-flex cursor-pointer items-center gap-1 px-space-sm py-space-xs text-label-md uppercase disabled:cursor-not-allowed disabled:opacity-40"
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
            className={`font-label h-8 w-8 cursor-pointer text-label-md ${
              pageNumber === currentPage
                ? 'bg-primary text-on-primary'
                : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            {pageNumber}
          </button>
        ))}
        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => {
            onPageChange(currentPage + 1)
          }}
          className="font-label inline-flex cursor-pointer items-center gap-1 px-space-sm py-space-xs text-label-md uppercase disabled:cursor-not-allowed disabled:opacity-40"
        >
          Sonraki
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </button>
      </div>
    </div>
  )
}
