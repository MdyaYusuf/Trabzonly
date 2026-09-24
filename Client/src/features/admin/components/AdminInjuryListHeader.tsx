import { Link } from 'react-router-dom'
import { adminInjuryListStats } from '../utils/adminInjuryPlaceholders'

export function AdminInjuryListHeader() {
  const stats = adminInjuryListStats

  return (
    <header className="flex flex-col gap-space-md">
      <div className="flex flex-col gap-space-md lg:flex-row lg:items-start lg:justify-between">
        <div className="flex max-w-3xl flex-col gap-space-xs">
          <div className="flex flex-wrap items-center justify-between gap-space-sm">
            <nav
              aria-label="Breadcrumb"
              className="font-label flex flex-wrap items-center gap-space-xs text-label-md text-on-surface-variant"
            >
              <span className="font-bold text-primary uppercase">Yönetim Masası</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="uppercase">Sağlık & Kadro</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="font-bold text-primary uppercase">Sakatlıklar</span>
            </nav>
            <span className="font-kicker flex items-center gap-1 bg-surface-container px-space-sm py-1 text-kicker text-secondary uppercase">
              <span className="h-2 w-2 rounded-full bg-secondary-container" />
              TFF & Sağlık Kurulu Senkron
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-space-sm">
            <h1 className="font-headline text-headline-lg font-extrabold tracking-tight text-primary uppercase">
              Sakatlıklar
            </h1>
            <span className="font-kicker bg-surface-container-high px-space-sm py-0.5 text-kicker text-on-surface-variant uppercase">
              v2.4
            </span>
          </div>
          <p className="font-body text-body-md text-on-surface-variant">
            A Takım oyuncu sakatlık süreçlerini, rehabilitasyon takvimini ve TFF sağlık kurulu
            protokollerini yönetin.
          </p>
        </div>

        <div className="flex flex-wrap gap-space-sm">
          <button
            type="button"
            className="font-label inline-flex items-center gap-1 border border-outline-variant px-space-md py-space-sm text-label-md uppercase transition-colors hover:border-primary hover:text-primary"
          >
            <span className="material-symbols-outlined text-[18px]">file_download</span>
            Dışa Aktar (Rapor)
          </button>
          <Link
            to="/yonetim/sakatliklar/yeni"
            className="font-label inline-flex items-center justify-center gap-space-xs bg-primary-container px-space-md py-space-sm text-label-md font-bold tracking-wider text-on-primary uppercase transition-all hover:bg-primary"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            + Sakatlık Ekle
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 xl:grid-cols-4">
        <article className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
          <div className="flex items-start justify-between">
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              Aktif Sakat Oyuncu
            </span>
            <span className="material-symbols-outlined text-error">medical_services</span>
          </div>
          <p className="font-headline mt-space-sm text-headline-md font-extrabold text-primary">
            {stats.activeCount}
          </p>
          <p className="font-body mt-1 text-body-sm text-on-surface-variant">{stats.activeNames}</p>
          <p className="font-label mt-space-xs inline-flex items-center gap-1 text-label-md text-error">
            <span className="material-symbols-outlined text-[16px]">priority_high</span>
            {stats.activeNote}
          </p>
        </article>

        <article className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
          <div className="flex items-start justify-between">
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              2024/25 Sezonu Toplamı
            </span>
            <span className="material-symbols-outlined text-secondary">healing</span>
          </div>
          <p className="font-headline mt-space-sm text-headline-md font-extrabold text-primary tabular-nums">
            {stats.seasonCases}
          </p>
          <p className="font-body mt-1 text-body-sm text-on-surface-variant">
            Ortalama iyileşme süresi:{' '}
            <strong className="text-on-surface">{stats.avgRecovery}</strong>
          </p>
          <p className="font-label mt-space-xs inline-flex items-center gap-1 text-label-md text-secondary">
            <span className="material-symbols-outlined text-[16px]">trending_down</span>
            {stats.seasonTrend}
          </p>
        </article>

        <article className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
          <div className="flex items-start justify-between">
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              En Çok Etkilenen Hat
            </span>
            <span className="material-symbols-outlined text-secondary">shield</span>
          </div>
          <p className="font-headline mt-space-sm text-headline-md font-extrabold text-primary">
            {stats.affectedLine}
          </p>
          <p className="font-body mt-1 text-body-sm text-on-surface-variant">
            Toplam <strong className="text-on-surface">{stats.missedByLine}</strong> {stats.lineDetail}
          </p>
          <p className="font-label mt-space-xs inline-flex items-center gap-1 text-label-md text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px]">sports_soccer</span>
            {stats.recentNote}
          </p>
        </article>

        <article className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
          <div className="flex items-start justify-between">
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              Sağlık Kurulu Konsolu
            </span>
            <span className="material-symbols-outlined text-secondary">verified_user</span>
          </div>
          <p className="font-headline mt-space-sm text-headline-sm font-extrabold text-primary">
            {stats.doctorName}
          </p>
          <p className="font-body mt-1 text-body-sm text-on-surface-variant">{stats.doctorRole}</p>
          <p className="font-kicker mt-space-sm inline-flex items-center gap-1 bg-secondary-container px-space-sm py-1 text-kicker text-on-secondary-container uppercase">
            {stats.doctorStatus}
          </p>
        </article>
      </div>
    </header>
  )
}
