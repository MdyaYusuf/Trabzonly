import { Link } from 'react-router-dom'

type QuizResultActionsProps = {
  quizId: string
}

export function QuizResultActions({ quizId }: QuizResultActionsProps) {
  return (
    <section className="flex flex-col gap-space-md border border-outline-variant/40 bg-surface-container px-space-md py-space-md sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-space-sm sm:flex-row sm:flex-wrap">
        <Link
          to="/quizler"
          className="font-label inline-flex items-center justify-center gap-space-xs bg-primary-container px-space-md py-space-sm text-label-md font-bold tracking-wider text-on-primary uppercase transition-all hover:bg-primary"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Quizlere Dön
        </Link>
        <Link
          to={`/quizler/${quizId}`}
          className="font-label inline-flex items-center justify-center gap-space-xs bg-primary-container px-space-md py-space-sm text-label-md font-bold tracking-wider text-on-primary uppercase transition-all hover:bg-primary"
        >
          <span className="material-symbols-outlined text-[18px]">replay</span>
          Testi Tekrar Çöz
        </Link>
      </div>
    </section>
  )
}
