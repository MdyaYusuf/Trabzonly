import { useEffect, useState } from 'react'
import { QuizCard } from '../components/QuizCard'
import {
  QuizListFilters,
  type QuizListCategoryFilter,
} from '../components/QuizListFilters'
import { QuizListHero } from '../components/QuizListHero'
import { QuizListPagination } from '../components/QuizListPagination'
import { QuizListSidebar } from '../components/QuizListSidebar'
import quizService from '../quizService'
import type { QuizListItemDto } from '../quizTypes'

const PAGE_SIZE = 6

export function QuizListPage() {
  const [categoryId, setCategoryId] = useState<QuizListCategoryFilter>('all')
  const [page, setPage] = useState(1)
  const [quizzes, setQuizzes] = useState<QuizListItemDto[]>([])
  const [totalUnfilteredCount, setTotalUnfilteredCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadQuizzes() {
      setIsLoading(true)

      const result = await quizService.getActiveList({
        category: categoryId === 'all' ? undefined : categoryId,
        sort: 'most-taken',
      })

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setQuizzes(result.data)

        if (categoryId === 'all') {
          setTotalUnfilteredCount(result.data.length)
        }
      } else {
        setQuizzes([])
      }

      setIsLoading(false)
    }

    void loadQuizzes()

    return () => {
      cancelled = true
    }
  }, [categoryId])

  const totalPages = Math.max(1, Math.ceil(quizzes.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageStart = (currentPage - 1) * PAGE_SIZE
  const pageQuizzes = quizzes.slice(pageStart, pageStart + PAGE_SIZE)

  return (
    <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
      <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
        <QuizListHero />
        <QuizListFilters
          categoryId={categoryId}
          totalCount={totalUnfilteredCount}
          onCategoryChange={(value) => {
            setCategoryId(value)
            setPage(1)
          }}
        />

        <div className="grid grid-cols-1 items-start gap-gutter lg:grid-cols-12">
          <section className="flex flex-col gap-space-md lg:col-span-8">
            <div className="flex flex-wrap items-center justify-between gap-space-sm border-b border-outline-variant/40 pb-space-xs">
              <div className="flex items-center gap-space-xs">
                <span className="h-3 w-3 bg-primary" />
                <h2 className="font-headline text-headline-md font-extrabold text-primary uppercase">
                  TÜM TRABZONSPOR TESTLERİ
                </h2>
              </div>
              <span className="font-label text-label-md text-on-surface-variant uppercase">
                {isLoading
                  ? 'Yükleniyor...'
                  : `${pageQuizzes.length} / ${quizzes.length} TEST GÖSTERİLİYOR`}
              </span>
            </div>

            {isLoading ? (
              <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
                Quizler yükleniyor...
              </p>
            ) : null}

            {!isLoading && pageQuizzes.length === 0 ? (
              <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
                Bu kategoriye uygun quiz bulunamadı.
              </p>
            ) : null}

            {!isLoading && pageQuizzes.length > 0 ? (
              <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
                {pageQuizzes.map((quiz) => (
                  <QuizCard key={quiz.id} quiz={quiz} />
                ))}
              </div>
            ) : null}

            {!isLoading && quizzes.length > PAGE_SIZE ? (
              <QuizListPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            ) : null}
          </section>

          <div className="lg:col-span-4">
            <QuizListSidebar />
          </div>
        </div>
      </div>
    </main>
  )
}
