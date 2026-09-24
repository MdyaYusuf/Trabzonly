type AdminMemberPaginationProps = {
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
}

export function AdminMemberPagination({
  page,
  pageSize,
  total,
  onPageChange,
}: AdminMemberPaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const currentPage = Math.min(page, totalPages)
  const start = total === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const end = Math.min(currentPage * pageSize, total)

  return (
    <div className="flex flex-col gap-space-sm border border-outline-variant/40 bg-surface-container-lowest px-space-md py-space-sm sm:flex-row sm:items-center sm:justify-between">
      <p className="font-label text-label-md text-on-surface-variant">
        Toplam <strong className="text-primary">{total.toLocaleString('tr-TR')}</strong> kayıttan{' '}
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
          className="font-label px-space-sm py-space-xs text-label-md uppercase disabled:opacity-40"
        >
          Önceki
        </button>
        <button
          type="button"
          onClick={() => {
            onPageChange(1)
          }}
          className={`font-label h-8 w-8 text-label-md ${
            currentPage === 1
              ? 'bg-primary text-on-primary'
              : 'text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          1
        </button>
        {totalPages > 2 && (
          <span className="font-label px-1 text-label-md text-on-surface-variant">...</span>
        )}
        {totalPages > 1 && (
          <button
            type="button"
            onClick={() => {
              onPageChange(totalPages)
            }}
            className={`font-label h-8 min-w-8 px-space-xs text-label-md ${
              currentPage === totalPages
                ? 'bg-primary text-on-primary'
                : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            {totalPages}
          </button>
        )}
        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => {
            onPageChange(currentPage + 1)
          }}
          className="font-label px-space-sm py-space-xs text-label-md uppercase disabled:opacity-40"
        >
          Sonraki
        </button>
      </div>
    </div>
  )
}
