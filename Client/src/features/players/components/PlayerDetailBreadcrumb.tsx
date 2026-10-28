import { Link } from 'react-router-dom'
import { PageBackButton } from '@/core/components/PageBackButton'
import { PageBreadcrumbHome } from '@/core/components/PageBreadcrumbHome'

type PlayerDetailBreadcrumbProps = {
  playerName: string
}

export function PlayerDetailBreadcrumb({ playerName }: PlayerDetailBreadcrumbProps) {
  return (
    <div className="w-full border-b border-border-subtle bg-surface-container-low">
      <div className="mx-auto flex max-w-[1360px] flex-wrap items-center gap-space-md px-4 py-space-sm sm:px-6 lg:px-12">
        <PageBackButton to="/oyuncular" label="Oyuncu listesine dön" />
        <nav
          aria-label="Breadcrumb"
          className="font-label flex min-w-0 flex-1 flex-wrap items-center gap-space-xs text-label-md text-on-surface-variant"
        >
          <PageBreadcrumbHome />
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <Link to="/oyuncular" className="transition-colors hover:text-primary">
            Oyuncular
          </Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="font-bold text-primary">{playerName}</span>
        </nav>
      </div>
    </div>
  )
}
