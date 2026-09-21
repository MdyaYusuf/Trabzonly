import { Link } from 'react-router-dom'
import type { PublicMemberProfile } from '../utils/publicMemberProfileTypes'

type PublicMemberProfileBreadcrumbProps = {
  profile: PublicMemberProfile
}

export function PublicMemberProfileBreadcrumb({ profile }: PublicMemberProfileBreadcrumbProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-space-sm">
      <nav
        aria-label="Breadcrumb"
        className="font-label flex flex-wrap items-center gap-space-xs text-label-md text-on-surface-variant"
      >
        <Link to="/" className="transition-colors hover:text-primary">
          Ana Sayfa
        </Link>
        <span>/</span>
        <span>Topluluk</span>
        <span>/</span>
        <span>Üyeler</span>
        <span>/</span>
        <span className="font-bold text-primary">{profile.username}</span>
      </nav>
      <span className="font-kicker flex items-center gap-1 bg-surface-container px-space-md py-1 text-kicker text-primary uppercase">
        <span className="h-2 w-2 rounded-full bg-secondary-container" />
        {profile.liveSessionLabel}
      </span>
    </div>
  )
}
