import { Link } from 'react-router-dom'
import { adminSeasonListStats } from '../utils/adminSeasonPlaceholders'

export function AdminSeasonListHeader() {
  const stats = adminSeasonListStats

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
              <span>/</span>
              <span className="uppercase">Arşiv & İstatistik</span>
              <span>/</span>
              <span className="font-bold text-primary uppercase">Sezonlar</span>
            </nav>
            <span className="font-kicker flex items-center gap-1 bg-surface-container px-space-sm py-1 text-kicker text-secondary uppercase">
              <span className="h-2 w-2 rounded-full bg-secondary-container" />
              Canlı Veri Tabanı Konsolu
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-space-sm">
            <h1 className="font-headline text-headline-lg font-extrabold tracking-tight text-primary uppercase">
              Sezonlar
            </h1>
            <span className="font-kicker bg-surface-container-high px-space-sm py-0.5 text-kicker text-on-surface-variant uppercase">
              v2.4
            </span>
          </div>
          <p className="font-body text-body-md text-on-surface-variant">
            İstatistik, kadro ve sakatlık kayıtları için kurumsal sezon takvimlerini tanımla ve
            yönet.
          </p>
        </div>

        <div className="flex flex-wrap gap-space-sm">
          <button
            type="button"
            className="font-label inline-flex items-center gap-1 border border-outline-variant px-space-md py-space-sm text-label-md uppercase transition-colors hover:border-primary hover:text-primary"
          >
            <span className="material-symbols-outlined text-[18px]">file_download</span>
            Dışa Aktar
          </button>
          <Link
            to="/yonetim/sezonlar/yeni"
            className="font-label inline-flex items-center justify-center gap-space-xs bg-primary-container px-space-md py-space-sm text-label-md font-bold tracking-wider text-on-primary uppercase transition-all hover:bg-primary"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            + Sezon Ekle
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-gutter sm:grid-cols-3">
        <article className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
          <div className="flex items-start justify-between">
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              {stats.definedLabel}
            </span>
            <span className="material-symbols-outlined text-secondary">calendar_month</span>
          </div>
          <p className="font-headline mt-space-sm text-headline-sm font-bold text-primary">
            {stats.definedValue}
          </p>
          <p className="font-body mt-1 text-body-sm text-on-surface-variant">{stats.definedNote}</p>
        </article>

        <article className="bg-primary p-space-md text-on-primary">
          <div className="flex items-start justify-between">
            <span className="font-kicker text-kicker text-tertiary-fixed-dim uppercase">
              {stats.activeLabel}
            </span>
            <span className="material-symbols-outlined text-secondary-container">sports_soccer</span>
          </div>
          <p className="font-headline mt-space-sm text-headline-sm font-bold">{stats.activeValue}</p>
          <p className="font-body mt-1 text-body-sm text-on-primary/80">{stats.activeNote}</p>
        </article>

        <article className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
          <div className="flex items-start justify-between">
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              {stats.matchesLabel}
            </span>
            <span className="material-symbols-outlined text-secondary">scoreboard</span>
          </div>
          <p className="font-headline mt-space-sm text-headline-sm font-bold text-primary">
            {stats.matchesValue}
          </p>
          <p className="font-body mt-1 text-body-sm text-on-surface-variant">{stats.matchesNote}</p>
        </article>
      </div>
    </header>
  )
}
