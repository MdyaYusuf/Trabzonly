import { Link } from 'react-router-dom'
import { adminRoleListStats } from '../utils/adminRolePlaceholders'

export function AdminRoleListHeader() {
  const stats = adminRoleListStats

  return (
    <header className="flex flex-col gap-space-md">
      <div className="flex flex-col gap-space-md lg:flex-row lg:items-start lg:justify-between">
        <div className="flex max-w-3xl flex-col gap-space-xs">
          <span className="font-kicker bg-surface-container px-space-sm py-1 text-kicker text-on-surface-variant uppercase">
            Kullanıcı ve Yetki Yönetimi • v2.4 • Canlı
          </span>
          <h1 className="font-headline text-headline-lg font-extrabold tracking-tight text-primary uppercase">
            Roller
          </h1>
          <p className="font-body text-body-md text-on-surface-variant">
            Yetki rollerini tanımla, kulüp direktörlüğü ve portal hiyerarşisini yapılandır.
            Bordo-Mavi dijital operasyon mimarisinin güvenlik çekirdeği.
          </p>
        </div>

        <div className="flex flex-wrap gap-space-sm">
          <button
            type="button"
            className="font-label inline-flex items-center gap-1 border border-outline-variant px-space-md py-space-sm text-label-md uppercase transition-colors hover:border-primary hover:text-primary"
          >
            <span className="material-symbols-outlined text-[18px]">file_download</span>
            Dışa Aktar (CSV/JSON)
          </button>
          <Link
            to="/yonetim/roller/yeni"
            className="font-label inline-flex items-center justify-center gap-space-xs bg-primary-container px-space-md py-space-sm text-label-md font-bold tracking-wider text-on-primary uppercase transition-all hover:bg-primary"
          >
            <span className="material-symbols-outlined text-[18px]">add_moderator</span>
            + Yeni Rol Ekle
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-gutter lg:grid-cols-3">
        <article className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
          <div className="flex items-start justify-between">
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              Tanımlı Rol Sayısı
            </span>
            <span className="material-symbols-outlined text-secondary">shield_person</span>
          </div>
          <p className="font-headline mt-space-sm text-headline-md font-extrabold text-primary">
            {stats.definedValue}
          </p>
          <p className="font-body mt-1 text-body-sm text-on-surface-variant">{stats.definedNote}</p>
          <p className="font-kicker mt-space-xs text-kicker text-secondary uppercase">
            {stats.hierarchyLabel}
          </p>
        </article>

        <article className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
          <div className="flex items-start justify-between">
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              Toplam Atanmış Üye
            </span>
            <span className="material-symbols-outlined text-secondary">group</span>
          </div>
          <p className="font-headline mt-space-sm text-headline-md font-extrabold text-primary tabular-nums">
            {stats.assignedValue}
          </p>
          <p className="font-body mt-1 text-body-sm text-on-surface-variant">{stats.assignedNote}</p>
          <p className="font-label mt-space-xs inline-flex items-center gap-1 text-label-md text-secondary">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            {stats.assignedTrend}
          </p>
        </article>

        <article className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
          <div className="flex items-start justify-between">
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              En Yüksek Yetkili Sayısı
            </span>
            <span className="material-symbols-outlined text-secondary">verified_user</span>
          </div>
          <p className="font-headline mt-space-sm text-headline-md font-extrabold text-primary">
            {stats.topAuthValue}
          </p>
          <p className="font-body mt-1 text-body-sm text-on-surface-variant">{stats.topAuthNote}</p>
          <span className="font-kicker mt-space-xs inline-block bg-secondary-container px-space-sm py-1 text-kicker text-on-secondary-container uppercase">
            {stats.topAuthBadge}
          </span>
        </article>
      </div>
    </header>
  )
}
