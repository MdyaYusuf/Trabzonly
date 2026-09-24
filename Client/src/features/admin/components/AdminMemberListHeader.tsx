import { adminMemberListStats } from '../utils/adminMemberPlaceholders'

export function AdminMemberListHeader() {
  const stats = adminMemberListStats

  return (
    <header className="flex flex-col gap-space-md">
      <div className="flex flex-col gap-space-md lg:flex-row lg:items-start lg:justify-between">
        <div className="flex max-w-3xl flex-col gap-space-xs">
          <span className="font-kicker bg-surface-container px-space-sm py-1 text-kicker text-on-surface-variant uppercase">
            Topluluk Direktörlüğü • v2.4 • Canlı
          </span>
          <h1 className="font-headline text-headline-lg font-extrabold tracking-tight text-primary uppercase">
            Üyeler
          </h1>
          <p className="font-body text-body-md text-on-surface-variant">
            Topluluk üyelerini görüntüle, yetkilerini ve kulüp portalı erişim durumlarını yönet.
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
          <button
            type="button"
            className="font-label inline-flex items-center justify-center gap-space-xs bg-primary-container px-space-md py-space-sm text-label-md font-bold tracking-wider text-on-primary uppercase transition-all hover:bg-primary"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            + Yeni Üye Ekle
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 xl:grid-cols-4">
        <article className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
          <div className="flex items-start justify-between">
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              Toplam Kayıtlı Üye
            </span>
            <span className="material-symbols-outlined text-secondary">group</span>
          </div>
          <p className="font-headline mt-space-sm text-headline-md font-extrabold text-primary tabular-nums">
            {stats.totalValue}
          </p>
          <p className="font-label mt-1 text-label-md text-secondary">{stats.totalTrend}</p>
          <p className="font-body mt-space-xs text-body-sm text-on-surface-variant">
            {stats.syncLabel}: <strong className="text-on-surface">{stats.syncStatus}</strong>
          </p>
        </article>

        <article className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
          <div className="flex items-start justify-between">
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              Aktif Taraftar
            </span>
            <span className="material-symbols-outlined text-secondary">verified_user</span>
          </div>
          <p className="font-headline mt-space-sm text-headline-md font-extrabold text-primary tabular-nums">
            {stats.activeValue}
          </p>
          <p className="font-label mt-1 text-label-md text-on-surface">{stats.activeRate}</p>
          <p className="font-body mt-space-xs text-body-sm text-on-surface-variant">
            {stats.activeNote} • {stats.activeBadge}
          </p>
        </article>

        <article className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
          <div className="flex items-start justify-between">
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              Yeni Kayıtlar (Bu Ay)
            </span>
            <span className="material-symbols-outlined text-secondary">trending_up</span>
          </div>
          <p className="font-headline mt-space-sm text-headline-md font-extrabold text-primary tabular-nums">
            {stats.newValue}
          </p>
          <p className="font-label mt-1 text-label-md text-secondary">{stats.newTrend}</p>
          <p className="font-body mt-space-xs text-body-sm text-on-surface-variant">
            {stats.newNote} • {stats.newBadge}
          </p>
        </article>

        <article className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
          <div className="flex items-start justify-between">
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              Moderatör & Yönetici
            </span>
            <span className="material-symbols-outlined text-secondary">shield_person</span>
          </div>
          <p className="font-headline mt-space-sm text-headline-md font-extrabold text-primary tabular-nums">
            {stats.staffValue}
          </p>
          <p className="font-label mt-1 text-label-md text-on-surface">{stats.staffNote}</p>
          <p className="font-body mt-space-xs text-body-sm text-on-surface-variant">
            {stats.staffDetail} • {stats.staffBadge}
          </p>
        </article>
      </div>
    </header>
  )
}
