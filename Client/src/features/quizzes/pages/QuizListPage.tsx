import { useMemo, useState } from 'react'
import { QuizCard } from '../components/QuizCard'
import { QuizListFeatured } from '../components/QuizListFeatured'
import { QuizListFilters } from '../components/QuizListFilters'
import { QuizListHero } from '../components/QuizListHero'
import { QuizListPagination } from '../components/QuizListPagination'
import { QuizListSidebar } from '../components/QuizListSidebar'
import {
  difficultyRank,
  PAGE_SIZE,
  placeholderQuizzes,
  TOTAL_QUIZZES,
} from '../utils/quizListPlaceholders'
import type { QuizCategoryId, QuizSortOption } from '../utils/quizListTypes'

export function QuizListPage() {
  const [categoryId, setCategoryId] = useState<QuizCategoryId>('all')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<QuizSortOption>('most-solved')
  const [page, setPage] = useState(1)

  const filteredQuizzes = useMemo(() => {
    let result = [...placeholderQuizzes]

    if (categoryId === 'popular') {
      result = result.filter((quiz) => quiz.isPopular)
    } else if (categoryId !== 'all') {
      result = result.filter((quiz) => quiz.categoryId === categoryId)
    }

    const query = search.trim().toLowerCase()

    if (query) {
      result = result.filter(
        (quiz) =>
          quiz.title.toLowerCase().includes(query) ||
          quiz.excerpt.toLowerCase().includes(query) ||
          quiz.categoryLabel.toLowerCase().includes(query),
      )
    }

    result.sort((a, b) => {
      if (sort === 'difficulty') {
        return difficultyRank[b.difficulty] - difficultyRank[a.difficulty]
      }

      if (sort === 'newest') {
        return Number(b.id) - Number(a.id)
      }

      return Number(a.id) - Number(b.id)
    })

    return result
  }, [categoryId, search, sort])

  const totalPages = Math.max(1, Math.ceil(filteredQuizzes.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageStart = (currentPage - 1) * PAGE_SIZE
  const pageQuizzes = filteredQuizzes.slice(pageStart, pageStart + PAGE_SIZE)

  function resetPage() {
    setPage(1)
  }

  return (
    <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
      <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
        <QuizListHero />
        <QuizListFilters
          categoryId={categoryId}
          search={search}
          sort={sort}
          onCategoryChange={(value) => {
            setCategoryId(value)
            resetPage()
          }}
          onSearchChange={(value) => {
            setSearch(value)
            resetPage()
          }}
          onSortChange={(value) => {
            setSort(value)
            resetPage()
          }}
        />
        <QuizListFeatured />

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
                {pageQuizzes.length} / {TOTAL_QUIZZES} TEST GÖSTERİLİYOR
              </span>
            </div>

            {pageQuizzes.length === 0 ? (
              <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
                Bu filtrelere uygun quiz bulunamadı.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
                {pageQuizzes.map((quiz) => (
                  <QuizCard key={quiz.id} quiz={quiz} />
                ))}
              </div>
            )}

            <QuizListPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </section>

          <div className="lg:col-span-4">
            <QuizListSidebar />
          </div>
        </div>
      </div>
    </main>
  )
}
