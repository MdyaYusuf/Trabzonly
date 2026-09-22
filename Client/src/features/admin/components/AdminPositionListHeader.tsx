import { Link } from 'react-router-dom'

type AdminPositionListHeaderProps = {
  totalPositions: number
  activeRoles: number
  registeredPlayers: number
}

export function AdminPositionListHeader({
  totalPositions,
  activeRoles,
  registeredPlayers,
}: AdminPositionListHeaderProps) {
  return (
    <header className="flex flex-col gap-space-md lg:flex-row lg:items-start lg:justify-between">
      <div className="flex max-w-3xl flex-col gap-space-xs">
        <nav
          aria-label="Breadcrumb"
          className="font-label flex flex-wrap items-center gap-space-xs text-label-md text-on-surface-variant"
        >
          <span className="font-bold text-primary uppercase">Yönetim Masası</span>
          <span>/</span>
          <span className="uppercase">Kadro & Taktik</span>
          <span>/</span>
          <span className="font-bold text-primary uppercase">Pozisyonlar</span>
        </nav>
        <h1 className="font-headline text-headline-lg font-extrabold tracking-tight text-primary uppercase">
          Pozisyonlar
        </h1>
        <p className="font-body text-body-md text-on-surface-variant">
          Trabzonspor profesyonel A-Takım ve altyapı kadro havuzu taktiksel saha sözlüğünü yönetin.
        </p>
        <p className="font-label mt-space-xs inline-flex w-fit flex-wrap items-center gap-space-sm bg-surface-container px-space-md py-space-xs text-label-md text-on-surface-variant">
          <span>
            Toplam Pozisyon: <strong className="text-primary">{totalPositions}</strong>
          </span>
          <span>|</span>
          <span className="inline-flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-secondary">
              sports_soccer
            </span>
            Aktif Saha Rolü: <strong className="text-primary">{activeRoles}</strong>
          </span>
          <span>|</span>
          <span className="inline-flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-secondary">group</span>
            Kayıtlı Oyuncu: <strong className="text-primary">{registeredPlayers}</strong>
          </span>
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
          to="/yonetim/pozisyonlar/yeni"
          className="font-label inline-flex items-center justify-center gap-space-xs bg-primary-container px-space-md py-space-sm text-label-md font-bold tracking-wider text-on-primary uppercase transition-all hover:bg-primary"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          + Pozisyon Ekle
        </Link>
      </div>
    </header>
  )
}
