import { PageBreadcrumbHome } from '@/core/components/PageBreadcrumbHome'

export function SquadsGalleryBreadcrumb() {
  return (
    <div className="mx-auto w-full max-w-[1360px] px-4 py-space-md sm:px-6 lg:px-12">
      <nav
        aria-label="Breadcrumb"
        className="font-label flex items-center gap-space-xs text-label-md text-on-surface-variant"
      >
        <PageBreadcrumbHome />
        <span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
        <span className="font-bold text-primary">Kadrolar</span>
      </nav>
    </div>
  )
}
