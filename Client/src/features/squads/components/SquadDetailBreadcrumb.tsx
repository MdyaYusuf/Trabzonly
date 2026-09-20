import { Link } from 'react-router-dom'
import type { SquadDetailProfile } from '../utils/squadDetailTypes'

type SquadDetailBreadcrumbProps = {
  squad: SquadDetailProfile
}

export function SquadDetailBreadcrumb({ squad }: SquadDetailBreadcrumbProps) {
  return (
    <div className="w-full bg-surface-container-low px-4 py-space-sm sm:px-6 lg:px-12">
      <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-space-md">
        <nav
          aria-label="Breadcrumb"
          className="font-label flex min-w-0 items-center gap-space-xs text-label-md text-on-surface-variant"
        >
          <Link to="/" className="flex items-center gap-1 transition-colors hover:text-primary">
            <span className="material-symbols-outlined text-[16px]">home</span>
            <span>Ana Sayfa</span>
          </Link>
          <span className="font-stat text-[10px] text-outline-variant">&gt;</span>
          <Link to="/kadrolar" className="transition-colors hover:text-primary">
            Kadrolar & Taktik Galerisi
          </Link>
          <span className="font-stat text-[10px] text-outline-variant">&gt;</span>
          <span className="max-w-md truncate font-bold text-primary">{squad.title}</span>
        </nav>
        <div className="font-kicker hidden items-center gap-space-sm text-kicker tracking-wider text-on-surface-variant uppercase md:flex">
          <span className="inline-block h-2 w-2 rounded-full bg-secondary" />
          <span>SÜPER LİG 2024/25 ANALİZ ARŞİVİ</span>
        </div>
      </div>
    </div>
  )
}
