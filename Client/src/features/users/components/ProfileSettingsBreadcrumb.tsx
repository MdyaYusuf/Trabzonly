import { PageBackButton } from '@/core/components/PageBackButton'
import { PageBreadcrumbHome } from '@/core/components/PageBreadcrumbHome'

export function ProfileSettingsBreadcrumb() {
  return (
    <div className="w-full bg-surface-container-low">
      <div className="mx-auto flex max-w-[1360px] flex-wrap items-center gap-space-md px-4 py-space-sm sm:px-6 lg:px-12">
        <PageBackButton to="/" label="Ana sayfaya dön" />
        <nav
          aria-label="Breadcrumb"
          className="font-label flex min-w-0 flex-wrap items-center gap-space-xs text-label-md text-on-surface-variant"
        >
          <PageBreadcrumbHome />
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="font-bold text-primary">Profil Ayarları</span>
        </nav>
      </div>
    </div>
  )
}
