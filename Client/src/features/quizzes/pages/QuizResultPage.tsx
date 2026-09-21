import { useRef } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { QuizResultActions } from '../components/QuizResultActions'
import { QuizResultAnalysis } from '../components/QuizResultAnalysis'
import { QuizResultHero } from '../components/QuizResultHero'
import { QuizResultRecommendations } from '../components/QuizResultRecommendations'
import type { QuizResultLocationState } from './TakeQuizPage'
import { getQuizResultProfile } from '../utils/takeQuizPlaceholders'

export function QuizResultPage() {
  const { quizId } = useParams<{ quizId: string }>()
  const location = useLocation()
  const reviewRef = useRef<HTMLElement | null>(null)

  const state = location.state as QuizResultLocationState | null
  const result = state?.result ?? getQuizResultProfile(quizId)

  function scrollToReview() {
    reviewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
      <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
        <div className="flex flex-wrap items-center justify-between gap-space-sm">
          <nav
            aria-label="Breadcrumb"
            className="font-label flex flex-wrap items-center gap-space-xs text-label-md text-on-surface-variant"
          >
            <Link to="/" className="transition-colors hover:text-primary">
              Ana Sayfa
            </Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <Link to="/quizler" className="transition-colors hover:text-primary">
              Quizler
            </Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <Link
              to={`/quizler/${result.quizId}`}
              className="transition-colors hover:text-primary"
            >
              {result.breadcrumbTitle}
            </Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="font-bold text-primary">Sonuç Özeti</span>
          </nav>
          <span className="font-kicker flex items-center gap-1 bg-surface-container px-space-md py-1 text-kicker text-primary uppercase">
            <span className="h-2 w-2 rounded-full bg-secondary-container" />
            {result.statusLabel}
          </span>
        </div>

        <QuizResultHero result={result} />
        <QuizResultActions result={result} onReview={scrollToReview} />
        <QuizResultAnalysis result={result} reviewRef={reviewRef} />
        <QuizResultRecommendations items={result.recommended} />
      </div>
    </main>
  )
}
