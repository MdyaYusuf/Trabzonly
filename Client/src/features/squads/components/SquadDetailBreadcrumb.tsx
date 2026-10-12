import { Link } from 'react-router-dom'
import { PageBackButton } from '@/core/components/PageBackButton'
import { PageBreadcrumbHome } from '@/core/components/PageBreadcrumbHome'

type SquadDetailBreadcrumbProps = {
  title: string
}

export function SquadDetailBreadcrumb({ title }: SquadDetailBreadcrumbProps) {
  return (
    <div className="w-full bg-surface-container-low">
      <div className="mx-auto flex max-w-[1360px] flex-wrap items-center gap-space-md px-4 py-space-sm sm:px-6 lg:px-12">
        <PageBackButton to="/kadrolar" label="Kadrolar listesine dön" />
        <nav
          aria-label="Breadcrumb"
          className="font-label flex min-w-0 flex-1 flex-wrap items-center gap-space-xs text-label-md text-on-surface-variant"
        >
          <PageBreadcrumbHome />
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <Link to="/kadrolar" className="transition-colors hover:text-primary">
            Kadrolar
          </Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="max-w-md truncate font-bold text-primary">{title}</span>
        </nav>
      </div>
    </div>
  )
}
