type QuizListPaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function QuizListPagination({
  currentPage,
  totalPages,
  onPageChange,
}: QuizListPaginationProps) {
  return (
    <div className="mt-space-lg flex items-center justify-center gap-1">
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => {
        const isActive = pageNumber === currentPage

        return (
          <button
            key={pageNumber}
            type="button"
            onClick={() => {
              onPageChange(pageNumber)
            }}
            className={
              isActive
                ? 'font-label flex h-10 w-10 items-center justify-center bg-primary-container text-label-md font-bold text-on-primary'
                : 'font-label flex h-10 w-10 items-center justify-center bg-surface-container text-label-md font-semibold text-on-surface transition-colors hover:bg-surface-container-high'
            }
          >
            {pageNumber}
          </button>
        )
      })}
      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => {
          onPageChange(Math.min(totalPages, currentPage + 1))
        }}
        className="font-label flex h-10 items-center justify-center gap-1 bg-surface-container px-space-sm text-label-md font-semibold text-on-surface uppercase transition-colors hover:bg-surface-container-high disabled:cursor-not-allowed disabled:opacity-50"
      >
        Sonraki
        <span className="material-symbols-outlined text-label-md">chevron_right</span>
      </button>
    </div>
  )
}
