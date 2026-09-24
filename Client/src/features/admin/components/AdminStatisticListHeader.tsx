import { Link } from 'react-router-dom'
import { adminStatisticListStats } from '../utils/adminStatisticPlaceholders'

export function AdminStatisticListHeader() {
  const stats = adminStatisticListStats

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
              <span className="uppercase">Performans & Analiz</span>
              <span>/</span>
              <span className="font-bold text-primary uppercase">İstatistikler</span>
            </nav>
            <span className="font-kicker flex items-center gap-1 bg-surface-container px-space-sm py-1 text-kicker text-secondary uppercase">
              <span className="h-2 w-2 rounded-full bg-secondary-container" />
              OptaSports • Canlı Senkron
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-space-sm">
            <h1 className="font-headline text-headline-lg font-extrabold tracking-tight text-primary uppercase">
              İstatistikler
            </h1>
            <span className="font-kicker bg-surface-container-high px-space-sm py-0.5 text-kicker text-on-surface-variant uppercase">
              v2.4
            </span>
          </div>
          <p className="font-body text-body-md text-on-surface-variant">
            Trabzonspor A-Takım ve altyapı oyuncularının sezon bazlı resmi performans metriklerini
            yönetin.
          </p>
        </div>

        <div className="flex flex-wrap gap-space-sm">
          <button
            type="button"
            className="font-label inline-flex items-center gap-1 border border-outline-variant px-space-md py-space-sm text-label-md uppercase transition-colors hover:border-primary hover:text-primary"
          >
            <span className="material-symbols-outlined text-[18px]">file_download</span>
            Dışa Aktar (CSV/XLS)
          </button>
          <Link
            to="/yonetim/istatistikler/yeni"
            className="font-label inline-flex items-center justify-center gap-space-xs bg-primary-container px-space-md py-space-sm text-label-md font-bold tracking-wider text-on-primary uppercase transition-all hover:bg-primary"
          >
            <span className="material-symbols-outlined text-[18px]">add_chart</span>
            + İstatistik Ekle
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 xl:grid-cols-4">
        <article className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
          <div className="flex items-start justify-between">
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              Toplam Sezon Arşivi
            </span>
            <span className="material-symbols-outlined text-secondary">database</span>
          </div>
          <p className="font-headline mt-space-sm text-headline-md font-extrabold text-primary tabular-nums">
            {stats.archiveValue}
          </p>
          <p className="font-body mt-1 text-body-sm text-on-surface-variant">{stats.archiveNote}</p>
        </article>

        <article className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
          <div className="flex items-start justify-between">
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              2024/25 Gol Krallığı
            </span>
            <span className="material-symbols-outlined text-secondary">sports_soccer</span>
          </div>
          <p className="font-headline mt-space-sm text-headline-md font-extrabold text-primary tabular-nums">
            {stats.topScorerGoals}
          </p>
          <p className="font-kicker text-kicker text-on-surface-variant uppercase">
            {stats.topScorerMeta}
          </p>
          <p className="font-label mt-space-xs text-label-md font-bold text-on-surface">
            {stats.topScorerName}
          </p>
          <p className="font-body text-body-sm text-on-surface-variant">{stats.topScorerDetail}</p>
        </article>

        <article className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
          <div className="flex items-start justify-between">
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              Asist Lideri
            </span>
            <span className="material-symbols-outlined text-secondary">assistant_navigation</span>
          </div>
          <p className="font-headline mt-space-sm text-headline-md font-extrabold text-secondary tabular-nums">
            {stats.assistLeaderValue}
          </p>
          <p className="font-kicker text-kicker text-on-surface-variant uppercase">
            {stats.assistLeaderMeta}
          </p>
          <p className="font-label mt-space-xs text-label-md font-bold text-on-surface">
            {stats.assistLeaderName}
          </p>
          <p className="font-body text-body-sm text-on-surface-variant">
            {stats.assistLeaderDetail}
          </p>
        </article>

        <article className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
          <div className="flex items-start justify-between">
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              Kale Emniyeti
            </span>
            <span className="material-symbols-outlined text-secondary">shield</span>
          </div>
          <p className="font-headline mt-space-sm text-headline-md font-extrabold text-primary tabular-nums">
            {stats.cleanSheetValue}
          </p>
          <p className="font-kicker text-kicker text-on-surface-variant uppercase">
            {stats.cleanSheetMeta}
          </p>
          <p className="font-label mt-space-xs text-label-md font-bold text-on-surface">
            {stats.cleanSheetName}
          </p>
          <p className="font-body text-body-sm text-on-surface-variant">{stats.cleanSheetDetail}</p>
        </article>
      </div>
    </header>
  )
}
