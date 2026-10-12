import { PageBackButton } from '@/core/components/PageBackButton'
import { PageBreadcrumbHome } from '@/core/components/PageBreadcrumbHome'
import type { PublicMemberProfile } from '../utils/publicMemberProfileTypes'

type PublicMemberProfileBreadcrumbProps = {
  profile: PublicMemberProfile
}

export function PublicMemberProfileBreadcrumb({ profile }: PublicMemberProfileBreadcrumbProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-space-sm">
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-space-md">
        <PageBackButton to="/" label="Ana sayfaya dön" />
        <nav
          aria-label="Breadcrumb"
          className="font-label flex min-w-0 flex-wrap items-center gap-space-xs text-label-md text-on-surface-variant"
        >
          <PageBreadcrumbHome />
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span>Topluluk</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span>Üyeler</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="font-bold text-primary">{profile.username}</span>
        </nav>
      </div>
      <span className="font-kicker flex items-center gap-1 bg-surface-container px-space-md py-1 text-kicker text-primary uppercase">
        <span className="h-2 w-2 rounded-full bg-secondary-container" />
        {profile.liveSessionLabel}
      </span>
    </div>
  )
}
