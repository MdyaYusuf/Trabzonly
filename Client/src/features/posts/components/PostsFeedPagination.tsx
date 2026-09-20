type PostsFeedPaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onLoadMore: () => void
}

export function PostsFeedPagination({
  currentPage,
  totalPages,
  onPageChange,
  onLoadMore,
}: PostsFeedPaginationProps) {
  const pageNumbers = [1, 2, 3, 4].filter((page) => page <= totalPages)
  const showEllipsis = totalPages > 5
  const lastPage = totalPages

  return (
    <div className="flex flex-col items-center justify-between gap-space-md border-t border-surface-container pt-space-md sm:flex-row">
      <button
        type="button"
        onClick={onLoadMore}
        className="w-full bg-surface-container-lowest px-space-lg py-space-sm font-label text-label-md font-bold text-primary uppercase shadow-sm transition-all duration-150 hover:bg-primary-container hover:text-on-primary sm:w-auto"
      >
        Daha Fazla Gönderi Yükle
      </button>

      <div className="flex items-center gap-1">
        {pageNumbers.map((page) => {
          const isActive = page === currentPage

          return (
            <button
              key={page}
              type="button"
              onClick={() => {
                onPageChange(page)
              }}
              className={[
                'flex h-8 w-8 items-center justify-center font-label text-label-md font-bold',
                isActive
                  ? 'bg-primary-container text-on-primary'
                  : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container',
              ].join(' ')}
            >
              {page}
            </button>
          )
        })}

        {showEllipsis ? <span className="px-1 text-on-surface-variant">...</span> : null}

        {lastPage > 4 ? (
          <button
            type="button"
            onClick={() => {
              onPageChange(lastPage)
            }}
            className={[
              'flex h-8 w-8 items-center justify-center font-label text-label-md font-bold',
              currentPage === lastPage
                ? 'bg-primary-container text-on-primary'
                : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container',
            ].join(' ')}
          >
            {lastPage}
          </button>
        ) : null}

        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => {
            onPageChange(Math.min(totalPages, currentPage + 1))
          }}
          className="flex h-8 items-center justify-center gap-1 bg-surface-container-lowest px-space-sm font-label text-label-md font-bold text-primary uppercase hover:bg-surface-container disabled:opacity-40"
        >
          <span>Sonraki</span>
          <span>→</span>
        </button>
      </div>
    </div>
  )
}
