import { PageBackButton } from '@/core/components/PageBackButton'
import { PageBreadcrumbHome } from '@/core/components/PageBreadcrumbHome'

type PublicMemberProfileBreadcrumbProps = {
  username: string
}

export function PublicMemberProfileBreadcrumb({
  username,
}: PublicMemberProfileBreadcrumbProps) {
  return (
    <div className="flex flex-wrap items-center gap-space-md">
      <PageBackButton to="/" label="Geri dön" preferHistory />
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
        <span className="font-bold text-primary">{username}</span>
      </nav>
    </div>
  )
}
