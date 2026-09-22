import { Link, useLocation } from 'react-router-dom'
import { adminHubProfile } from '../utils/adminHubPlaceholders'

type AdminTopBarProps = {
  onLogout?: () => void
}

function resolveBreadcrumb(pathname: string): { root: string; current: string } {
  if (pathname.includes('/oyuncular/yeni')) {
    return { root: 'Yönetim Masası', current: 'Oyuncular / Yeni Oyuncu' }
  }

  if (pathname.includes('/oyuncular/') && pathname.includes('/duzenle')) {
    return { root: 'Yönetim Masası', current: 'Oyuncular / Oyuncuyu Düzenle' }
  }

  if (pathname.endsWith('/oyuncular') || pathname.includes('/oyuncular?')) {
    return { root: 'Yönetim Masası', current: 'Oyuncular' }
  }

  if (pathname.includes('/kategoriler/yeni')) {
    return { root: 'Yönetim Masası', current: 'Kategoriler / Yeni Kategori' }
  }

  if (pathname.includes('/kategoriler/') && pathname.includes('/duzenle')) {
    return { root: 'Yönetim Masası', current: 'Kategoriler / Kategoriyi Düzenle' }
  }

  if (pathname.endsWith('/kategoriler') || pathname.includes('/kategoriler?')) {
    return { root: 'Yönetim Masası', current: 'Kategoriler' }
  }

  if (pathname.includes('/pozisyonlar/yeni')) {
    return { root: 'Yönetim Masası', current: 'Pozisyonlar / Yeni Pozisyon' }
  }

  if (pathname.includes('/pozisyonlar/') && pathname.includes('/duzenle')) {
    return { root: 'Yönetim Masası', current: 'Pozisyonlar / Pozisyonu Düzenle' }
  }

  if (pathname.endsWith('/pozisyonlar') || pathname.includes('/pozisyonlar?')) {
    return { root: 'Yönetim Masası', current: 'Pozisyonlar' }
  }

  return {
    root: adminHubProfile.breadcrumbRoot,
    current: adminHubProfile.breadcrumbCurrent,
  }
}

export function AdminTopBar({ onLogout }: AdminTopBarProps) {
  const location = useLocation()
  const hub = adminHubProfile
  const crumb = resolveBreadcrumb(location.pathname)

  return (
    <header className="flex flex-wrap items-center justify-between gap-space-sm border-b border-outline-variant/50 bg-surface-container-lowest px-space-md py-space-sm lg:px-space-lg">
      <nav
        aria-label="Breadcrumb"
        className="font-label flex flex-wrap items-center gap-space-xs text-label-md text-on-surface-variant"
      >
        <span className="font-bold text-primary uppercase">{crumb.root}</span>
        <span>/</span>
        <span>{crumb.current}</span>
      </nav>

      <div className="flex flex-wrap items-center gap-space-md">
        <div className="font-label flex items-center gap-space-sm text-label-md text-on-surface-variant">
          <span>
            {hub.systemStatusLabel}:{' '}
            <span className="inline-flex items-center gap-1 font-bold text-secondary">
              <span className="h-2 w-2 rounded-full bg-secondary-container" />
              {hub.systemStatusValue}
            </span>
          </span>
          <span className="text-outline-variant">|</span>
          <span className="font-kicker text-kicker uppercase">{hub.versionLabel}</span>
        </div>

        <div className="flex items-center gap-space-sm">
          <Link
            to="/"
            className="font-label inline-flex items-center gap-1 text-label-md text-on-surface-variant uppercase transition-colors hover:text-primary"
          >
            Siteye dön
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
          </Link>
          <button
            type="button"
            onClick={onLogout}
            className="font-label inline-flex items-center gap-1 text-label-md text-on-surface-variant uppercase transition-colors hover:text-error"
          >
            Çıkış yap
            <span className="material-symbols-outlined text-[16px]">logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}
