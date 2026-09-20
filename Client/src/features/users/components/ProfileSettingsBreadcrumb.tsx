import { Link } from 'react-router-dom'

export function ProfileSettingsBreadcrumb() {
  return (
    <div className="w-full bg-surface-container-low px-4 py-space-xs sm:px-6 lg:px-12">
      <div className="mx-auto flex max-w-[1360px] items-center justify-between">
        <div className="font-label flex flex-wrap items-center gap-space-xs text-label-md text-on-surface-variant">
          <Link to="/" className="transition-colors hover:text-primary">
            Ana Sayfa
          </Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="transition-colors hover:text-primary">Topluluk Profili</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="font-bold text-primary">Hesap & Taktik Ayarları</span>
        </div>
        <div className="font-kicker hidden items-center gap-space-sm text-kicker text-on-surface-variant uppercase md:flex">
          <span className="inline-block h-2 w-2 rounded-full bg-secondary-container" />
          <span>Akyazı Papara Park Canlı Ağ Modu • 61. Dakika Senkronizasyonu Aktif</span>
        </div>
      </div>
    </div>
  )
}
