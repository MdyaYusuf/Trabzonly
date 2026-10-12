import { PageBackButton } from '@/core/components/PageBackButton'
import { PageBreadcrumbHome } from '@/core/components/PageBreadcrumbHome'

export function ProfileSettingsBreadcrumb() {
  return (
    <div className="w-full bg-surface-container-low">
      <div className="mx-auto flex max-w-[1360px] flex-wrap items-center justify-between gap-space-sm px-4 py-space-sm sm:px-6 lg:px-12">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-space-md">
          <PageBackButton to="/" label="Ana sayfaya dön" />
          <nav
            aria-label="Breadcrumb"
            className="font-label flex min-w-0 flex-wrap items-center gap-space-xs text-label-md text-on-surface-variant"
          >
            <PageBreadcrumbHome />
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="transition-colors hover:text-primary">Topluluk Profili</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="font-bold text-primary">Hesap & Taktik Ayarları</span>
          </nav>
        </div>
        <div className="font-kicker hidden items-center gap-space-sm text-kicker text-on-surface-variant uppercase md:flex">
          <span className="inline-block h-2 w-2 rounded-full bg-secondary-container" />
          <span>Akyazı Papara Park Canlı Ağ Modu • 61. Dakika Senkronizasyonu Aktif</span>
        </div>
      </div>
    </div>
  )
}
