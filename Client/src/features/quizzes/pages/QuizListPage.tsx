import { useEffect, useMemo, useState } from 'react'
import { PageBreadcrumbHome } from '@/core/components/PageBreadcrumbHome'
import { QuizCard } from '../components/QuizCard'
import {
  QuizListFilters,
  type QuizListCategoryFilter,
} from '../components/QuizListFilters'
import { QuizListHero } from '../components/QuizListHero'
import { QuizListPagination } from '../components/QuizListPagination'
import { QuizListSidebar } from '../components/QuizListSidebar'
import quizCategoryService from '../quizCategoryService'
import quizService from '../quizService'
import type { QuizCategoryResponseDto, QuizListItemDto } from '../quizTypes'

const PAGE_SIZE = 6

export function QuizListPage() {
  const [categories, setCategories] = useState<QuizCategoryResponseDto[]>([])
  const [categoryId, setCategoryId] = useState<QuizListCategoryFilter>('all')
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [page, setPage] = useState(1)
  const [quizzes, setQuizzes] = useState<QuizListItemDto[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadCategories() {
      const result = await quizCategoryService.getActive()

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setCategories(result.data)
      } else {
        setCategories([])
      }
    }

    void loadCategories()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 300)

    return () => {
      window.clearTimeout(timer)
    }
  }, [search])

  useEffect(() => {
    let cancelled = false

    async function loadQuizzes() {
      setIsLoading(true)

      const result = await quizService.getActiveList({
        categoryId: categoryId === 'all' ? undefined : categoryId,
        sort: 'most-taken',
      })

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setQuizzes(result.data)
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

  const filteredQuizzes = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase()

    if (!query) {
      return quizzes
    }

    return quizzes.filter((quiz) => {
      const title = quiz.title.toLowerCase()
      const description = (quiz.description ?? '').toLowerCase()

      return title.includes(query) || description.includes(query)
    })
  }, [quizzes, debouncedSearch])

  const totalPages = Math.max(1, Math.ceil(filteredQuizzes.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageStart = (currentPage - 1) * PAGE_SIZE
  const pageQuizzes = filteredQuizzes.slice(pageStart, pageStart + PAGE_SIZE)

  return (
    <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
      <div className="mx-auto w-full max-w-[1360px] px-4 py-space-md sm:px-6 lg:px-12">
        <nav
          aria-label="Breadcrumb"
          className="font-label flex items-center gap-space-xs text-label-md text-on-surface-variant"
        >
          <PageBreadcrumbHome />
          <span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
          <span className="font-bold text-primary">Quizler</span>
        </nav>
      </div>

      <QuizListHero />

      <QuizListFilters
        categories={categories}
        categoryId={categoryId}
        search={search}
        onCategoryChange={(value) => {
          setCategoryId(value)
          setPage(1)
        }}
        onSearchChange={setSearch}
      />

      <div className="w-full bg-background py-space-xl">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-12">
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
                    : `${pageQuizzes.length} / ${filteredQuizzes.length} TEST GÖSTERİLİYOR`}
                </span>
              </div>

              {isLoading ? (
                <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
                  Quizler yükleniyor...
                </p>
              ) : null}

              {!isLoading && pageQuizzes.length === 0 ? (
                <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
                  Bu filtrelere uygun quiz bulunamadı.
                </p>
              ) : null}

              {!isLoading && pageQuizzes.length > 0 ? (
                <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
                  {pageQuizzes.map((quiz) => (
                    <QuizCard key={quiz.id} quiz={quiz} />
                  ))}
                </div>
              ) : null}

              {!isLoading && filteredQuizzes.length > PAGE_SIZE ? (
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
      </div>
    </main>
  )
}
