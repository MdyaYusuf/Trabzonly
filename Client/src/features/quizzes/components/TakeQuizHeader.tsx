import { Link } from 'react-router-dom'
import { PageBackButton } from '@/core/components/PageBackButton'
import { PageBreadcrumbHome } from '@/core/components/PageBreadcrumbHome'

type TakeQuizHeaderProps = {
  title: string
  categoryName: string
  questionCount: number
}

export function TakeQuizHeader({ title, categoryName, questionCount }: TakeQuizHeaderProps) {
  return (
    <header className="flex flex-col gap-space-sm">
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

      <div className="flex flex-col gap-space-xs">
        <h1 className="font-headline text-headline-sm font-extrabold tracking-tight text-primary uppercase sm:text-headline-md">
          {title}
        </h1>
        <div className="flex flex-wrap items-center gap-space-sm">
          <span className="font-kicker border border-outline-variant/60 px-space-sm py-1 text-kicker text-on-surface-variant uppercase">
            {categoryName}
          </span>
          <span className="font-kicker border border-outline-variant/60 px-space-sm py-1 text-kicker text-on-surface-variant uppercase">
            {questionCount} Soru
          </span>
          <span className="inline-flex overflow-hidden">
            <span className="flex items-center justify-center bg-secondary px-2 text-on-secondary">
              <span className="material-symbols-outlined text-[18px] leading-none">timer</span>
            </span>
            <span className="flex flex-col justify-center bg-primary px-space-sm py-1 leading-none text-on-primary">
              <span className="font-headline text-label-md font-extrabold tabular-nums">10</span>
              <span className="font-kicker text-[9px] tracking-wider uppercase opacity-90">
                sn / soru
              </span>
            </span>
          </span>
        </div>
      </div>
    </header>
  )
}
