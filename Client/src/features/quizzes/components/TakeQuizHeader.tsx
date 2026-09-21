import { Link } from 'react-router-dom'
import type { TakeQuizSession } from '../utils/takeQuizTypes'

type TakeQuizHeaderProps = {
  session: TakeQuizSession
}

export function TakeQuizHeader({ session }: TakeQuizHeaderProps) {
  return (
    <header className="flex flex-col gap-space-md">
      <nav
        aria-label="Breadcrumb"
        className="font-label flex flex-wrap items-center gap-space-xs text-label-md text-on-surface-variant"
      >
        <Link to="/" className="transition-colors hover:text-primary">
          Ana Sayfa
        </Link>
        <span>/</span>
        <Link to="/quizler" className="transition-colors hover:text-primary">
          Quizler
        </Link>
        <span>/</span>
        <span className="font-bold text-primary">{session.breadcrumbTitle}</span>
      </nav>

      <div className="flex flex-col gap-space-md lg:flex-row lg:items-start lg:justify-between">
        <div className="flex max-w-4xl flex-col gap-space-sm">
          <h1 className="font-headline text-headline-md font-extrabold tracking-tight text-primary uppercase lg:text-headline-lg">
            {session.title}
          </h1>
          <div className="flex flex-wrap items-center gap-space-sm">
            <span className="font-kicker border border-outline-variant/60 px-space-sm py-1 text-kicker text-on-surface-variant uppercase">
              Zorluk: {session.difficultyLabel}
            </span>
            <span className="font-kicker border border-outline-variant/60 px-space-sm py-1 text-kicker text-on-surface-variant uppercase">
              {session.questionCount} Soru
            </span>
            <span className="font-kicker flex items-center gap-1 bg-tertiary-container px-space-sm py-1 text-kicker text-tertiary-fixed-dim uppercase">
              <span className="material-symbols-outlined text-[14px]">star</span>
              {session.pointsLabel}
            </span>
          </div>
        </div>

        <Link
          to="/quizler"
          className="font-label inline-flex shrink-0 items-center gap-space-xs border border-outline-variant px-space-md py-space-sm text-label-md text-on-surface uppercase transition-colors hover:border-primary hover:text-primary"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Quizlerden Çık
        </Link>
      </div>
    </header>
  )
}
