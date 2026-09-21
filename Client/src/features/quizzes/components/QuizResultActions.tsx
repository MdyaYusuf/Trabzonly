import { Link } from 'react-router-dom'
import type { QuizResultProfile } from '../utils/takeQuizTypes'

type QuizResultActionsProps = {
  result: QuizResultProfile
  onReview: () => void
}

export function QuizResultActions({ result, onReview }: QuizResultActionsProps) {
  return (
    <section className="flex flex-col gap-space-md border border-outline-variant/40 bg-surface-container px-space-md py-space-md lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-col gap-space-sm sm:flex-row sm:flex-wrap">
        <Link
          to="/quizler"
          className="font-label inline-flex items-center justify-center gap-space-xs bg-primary-container px-space-md py-space-sm text-label-md font-bold tracking-wider text-on-primary uppercase transition-all hover:bg-primary"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Quizlere Dön
        </Link>
        <button
          type="button"
          onClick={onReview}
          className="font-label inline-flex items-center justify-center gap-space-xs bg-primary-container px-space-md py-space-sm text-label-md font-bold tracking-wider text-on-primary uppercase transition-all hover:bg-primary"
        >
          <span className="material-symbols-outlined text-[18px]">fact_check</span>
          Yanıtlarını İncele ({result.correctCount}D / {result.wrongCount}Y)
        </button>
        <Link
          to={`/quizler/${result.quizId}`}
          className="font-label inline-flex items-center justify-center gap-space-xs bg-primary-container px-space-md py-space-sm text-label-md font-bold tracking-wider text-on-primary uppercase transition-all hover:bg-primary"
        >
          <span className="material-symbols-outlined text-[18px]">replay</span>
          Testi Tekrar Çöz
        </Link>
      </div>

      <div className="flex items-center gap-space-sm">
        <span className="font-kicker text-kicker text-on-surface-variant uppercase">
          Sonucunu Paylaş:
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Paylaş"
            className="flex h-9 w-9 items-center justify-center bg-surface-container-lowest text-on-surface transition-colors hover:bg-primary hover:text-on-primary"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
          </button>
          <button
            type="button"
            aria-label="Görsel paylaş"
            className="flex h-9 w-9 items-center justify-center bg-surface-container-lowest text-on-surface transition-colors hover:bg-primary hover:text-on-primary"
          >
            <span className="material-symbols-outlined text-[18px]">photo_camera</span>
          </button>
        </div>
      </div>
    </section>
  )
}
