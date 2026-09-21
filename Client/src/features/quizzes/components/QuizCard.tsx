import { Link } from 'react-router-dom'
import type { QuizBadgeTone, QuizListCard } from '../utils/quizListTypes'

type QuizCardProps = {
  quiz: QuizListCard
}

const categoryToneClass: Record<QuizBadgeTone, string> = {
  primary: 'bg-primary text-on-primary',
  'primary-container': 'bg-primary-container text-on-primary',
  secondary: 'bg-secondary text-on-secondary',
  tertiary: 'bg-tertiary-container text-tertiary-fixed-dim',
}

export function QuizCard({ quiz }: QuizCardProps) {
  return (
    <article className="flex flex-col justify-between bg-surface-container-lowest p-space-lg shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-col gap-space-sm">
        <div className="relative mb-space-xs h-40 w-full overflow-hidden bg-surface-container">
          <div
            className={`h-full w-full bg-gradient-to-br ${quiz.imageTone}`}
            role="img"
            aria-label={quiz.title}
          />
          <span
            className={`font-kicker absolute top-2 left-2 px-space-xs py-0.5 text-kicker font-bold uppercase ${categoryToneClass[quiz.categoryTone]}`}
          >
            {quiz.categoryLabel} • {quiz.solvesLabel}
          </span>
          <span className="font-kicker absolute right-2 bottom-2 bg-inverse-surface/80 px-space-xs py-0.5 text-kicker text-inverse-on-surface uppercase">
            {quiz.difficultyLabel}
          </span>
        </div>
        <h3 className="font-headline line-clamp-2 text-headline-sm font-bold text-primary uppercase">
          {quiz.title}
        </h3>
        <p className="font-body line-clamp-3 text-body-sm text-on-surface-variant">
          {quiz.excerpt}
        </p>
      </div>
      <div className="-mx-space-lg -mb-space-lg mt-space-md flex items-center justify-between bg-surface-container-low px-space-lg py-space-sm pt-space-md">
        <div className="flex flex-col">
          <span className="font-label text-label-md font-bold text-primary">
            {quiz.questionCount} Soru • {quiz.durationMinutes} Dk
          </span>
          <span className="font-kicker text-kicker text-on-surface-variant uppercase">
            {quiz.participantsLabel}
          </span>
        </div>
        <Link
          to={`/quizler/${quiz.id}`}
          className="font-label bg-primary-container px-space-md py-space-xs text-label-md font-bold tracking-wider text-on-primary uppercase transition-all hover:bg-primary"
        >
          Çöz
        </Link>
      </div>
    </article>
  )
}
