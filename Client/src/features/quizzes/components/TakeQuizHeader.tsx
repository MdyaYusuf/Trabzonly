import { Link } from 'react-router-dom'
import { PageBackButton } from '@/core/components/PageBackButton'
import { PageBreadcrumbHome } from '@/core/components/PageBreadcrumbHome'
import { getQuizCategoryLabel } from '../quizCategoryUtils'
import type { QuizCategory } from '../quizTypes'

type TakeQuizHeaderProps = {
  title: string
  category: QuizCategory
  questionCount: number
}

export function TakeQuizHeader({ title, category, questionCount }: TakeQuizHeaderProps) {
  return (
    <header className="flex flex-col gap-space-md">
      <div className="flex flex-wrap items-center gap-space-md">
        <PageBackButton to="/quizler" label="Quiz listesine dön" />
        <nav
          aria-label="Breadcrumb"
          className="font-label flex min-w-0 flex-1 flex-wrap items-center gap-space-xs text-label-md text-on-surface-variant"
        >
          <PageBreadcrumbHome />
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <Link to="/quizler" className="transition-colors hover:text-primary">
            Quizler
          </Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="font-bold text-primary">{title}</span>
        </nav>
      </div>

      <div className="flex max-w-4xl flex-col gap-space-sm">
        <h1 className="font-headline text-headline-md font-extrabold tracking-tight text-primary uppercase lg:text-headline-lg">
          {title}
        </h1>
        <div className="flex flex-wrap items-center gap-space-sm">
          <span className="font-kicker border border-outline-variant/60 px-space-sm py-1 text-kicker text-on-surface-variant uppercase">
            {getQuizCategoryLabel(category)}
          </span>
          <span className="font-kicker border border-outline-variant/60 px-space-sm py-1 text-kicker text-on-surface-variant uppercase">
            {questionCount} Soru
          </span>
          <span className="font-kicker flex items-center gap-1 bg-tertiary-container px-space-sm py-1 text-kicker text-tertiary-fixed-dim uppercase">
            <span className="material-symbols-outlined text-[14px]">timer</span>
            10 sn / soru
          </span>
        </div>
      </div>
    </header>
  )
}
