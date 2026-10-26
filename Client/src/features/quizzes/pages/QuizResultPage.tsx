import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { PageBackButton } from '@/core/components/PageBackButton'
import { PageBreadcrumbHome } from '@/core/components/PageBreadcrumbHome'
import { useAppSelector } from '@/core/store/hooks'
import { QuizResultActions } from '../components/QuizResultActions'
import { QuizResultHero } from '../components/QuizResultHero'
import type { QuizResultLocationState } from './TakeQuizPage'

export function QuizResultPage() {
  const { quizId } = useParams<{ quizId: string }>()
  const location = useLocation()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const state = location.state as QuizResultLocationState | null

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!quizId || !state?.result || state.result.quizId !== quizId) {
    return (
      <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
        <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-md px-4 py-space-xl sm:px-6 lg:px-12">
          <p className="font-body text-body-md text-on-surface-variant">
            Sonuç bulunamadı. Quizi çözdükten sonra buraya yönlendirilirsin.
          </p>
          <div className="flex flex-wrap gap-space-sm">
            <Link
              to="/quizler"
              className="font-label bg-primary-container px-space-md py-space-sm text-label-md font-bold text-on-primary uppercase"
            >
              Quiz listesi
            </Link>
            {quizId ? (
              <Link
                to={`/quizler/${quizId}`}
                className="font-label border border-outline-variant px-space-md py-space-sm text-label-md font-bold text-primary uppercase"
              >
                Tekrar çöz
              </Link>
            ) : null}
          </div>
        </div>
      </main>
    )
  }

  const { result, quizTitle } = state

  return (
    <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
      <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
        <div className="flex flex-wrap items-center justify-between gap-space-sm">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-space-md">
            <PageBackButton to="/quizler" label="Quiz listesine dön" />
            <nav
              aria-label="Breadcrumb"
              className="font-label flex min-w-0 flex-wrap items-center gap-space-xs text-label-md text-on-surface-variant"
            >
              <PageBreadcrumbHome />
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <Link to="/quizler" className="transition-colors hover:text-primary">
                Quizler
              </Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <Link
                to={`/quizler/${result.quizId}`}
                className="transition-colors hover:text-primary"
              >
                {quizTitle}
              </Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="font-bold text-primary">Sonuç</span>
            </nav>
          </div>
          <span className="font-kicker flex items-center gap-1 bg-surface-container px-space-md py-1 text-kicker text-primary uppercase">
            <span className="h-2 w-2 rounded-full bg-secondary-container" />
            Tamamlandı
          </span>
        </div>

        <QuizResultHero
          quizTitle={quizTitle}
          score={result.score}
          maxScore={result.maxScore}
          completionTime={result.completionTime}
          correctCount={state.correctCount}
          totalCount={state.totalCount}
        />
        <QuizResultActions quizId={result.quizId} />
      </div>
    </main>
  )
}
