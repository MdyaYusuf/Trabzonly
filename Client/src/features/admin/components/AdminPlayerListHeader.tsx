import type { AdminPlayerListStats } from '../utils/adminPlayerTypes'

type AdminPlayerListHeaderProps = {
  stats: AdminPlayerListStats
}

export function AdminPlayerListHeader({ stats }: AdminPlayerListHeaderProps) {
  return (
    <header className="flex flex-col gap-space-md">
      <div className="flex flex-col gap-space-md lg:flex-row lg:items-start lg:justify-between">
        <div className="flex max-w-2xl flex-col gap-space-xs">
          <nav
            aria-label="Breadcrumb"
            className="font-label flex items-center gap-space-xs text-label-md text-on-surface-variant"
          >
            <span className="font-bold text-primary uppercase">Yönetim Masası</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="font-bold text-primary uppercase">Oyuncular</span>
          </nav>
          <h1 className="font-headline text-headline-lg font-extrabold tracking-tight text-primary uppercase">
            Oyuncular
          </h1>
          <p className="font-body text-body-md text-on-surface-variant">
            Kadrodaki, sözleşmeli ve kiralık takip edilen profesyonel futbolcuları yönet.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-space-sm">
          <div className="border border-outline-variant/40 bg-surface-container-lowest px-space-sm py-space-sm">
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              {stats.totalLabel}
            </span>
            <p className="font-headline mt-1 text-headline-sm font-bold text-primary">
              {stats.totalValue}
            </p>
          </div>
          <div className="border border-outline-variant/40 bg-surface-container-lowest px-space-sm py-space-sm">
            <span className="font-kicker flex items-center gap-1 text-kicker text-on-surface-variant uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary-container" />
              {stats.activeLabel}
            </span>
            <p className="font-headline mt-1 text-headline-sm font-bold text-primary">
              {stats.activeValue}
            </p>
          </div>
          <div className="border border-outline-variant/40 bg-surface-container-lowest px-space-sm py-space-sm">
            <span className="font-kicker flex items-center gap-1 text-kicker text-on-surface-variant uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-error" />
              {stats.inactiveLabel}
            </span>
            <p className="font-headline mt-1 text-headline-sm font-bold text-primary">
              {stats.inactiveValue}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 xl:grid-cols-4">
        <article className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
          <div className="flex items-start justify-between">
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              Mevki Dağılımı
            </span>
            <span className="material-symbols-outlined text-secondary">sports_soccer</span>
          </div>
          <p className="font-headline mt-space-sm text-headline-sm font-bold text-primary">
            {stats.positionDistribution}
          </p>
          <p className="font-body mt-1 text-body-sm text-on-surface-variant">{stats.positionNote}</p>
        </article>

        <article className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
          <div className="flex items-start justify-between">
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              Yaş Ortalaması
            </span>
            <span className="material-symbols-outlined text-secondary">query_builder</span>
          </div>
          <p className="font-headline mt-space-sm text-headline-sm font-bold text-primary">
            {stats.averageAge}
          </p>
          <p className="font-body mt-1 text-body-sm text-on-surface-variant">{stats.averageAgeNote}</p>
        </article>

        <article className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
          <div className="flex items-start justify-between">
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              Milli Oyuncular
            </span>
            <span className="material-symbols-outlined text-secondary">public</span>
          </div>
          <p className="font-headline mt-space-sm text-headline-sm font-bold text-primary">
            {stats.nationalCount}
          </p>
          <p className="font-body mt-1 text-body-sm text-on-surface-variant">{stats.nationalNote}</p>
        </article>

        <article className="flex flex-col justify-between bg-primary p-space-md text-on-primary">
          <div>
            <span className="font-kicker text-kicker text-tertiary-fixed-dim uppercase">
              {stats.reportTitle}
            </span>
            <p className="font-headline mt-space-sm text-headline-sm font-bold">
              {stats.reportSubtitle}
            </p>
            <p className="font-body mt-1 text-body-sm text-on-primary/80">{stats.reportNote}</p>
          </div>
          <button
            type="button"
            className="font-label mt-space-md inline-flex w-fit items-center gap-1 bg-on-primary px-space-md py-space-xs text-label-md font-bold text-primary uppercase transition-colors hover:bg-secondary-container"
          >
            <span className="material-symbols-outlined text-[18px]">file_download</span>
            Al
          </button>
        </article>
      </div>
    </header>
  )
}
