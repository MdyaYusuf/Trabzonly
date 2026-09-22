import { Link } from 'react-router-dom'

type AdminCategoryListHeaderProps = {
  total: number
  active: number
  inactive: number
}

export function AdminCategoryListHeader({
  total,
  active,
  inactive,
}: AdminCategoryListHeaderProps) {
  return (
    <header className="flex flex-col gap-space-md lg:flex-row lg:items-start lg:justify-between">
      <div className="flex max-w-3xl flex-col gap-space-xs">
        <nav
          aria-label="Breadcrumb"
          className="font-label flex flex-wrap items-center gap-space-xs text-label-md text-on-surface-variant"
        >
          <span className="font-bold text-primary uppercase">Yönetim Masası</span>
          <span>/</span>
          <span className="uppercase">İçerik Mimarisi</span>
          <span>/</span>
          <span className="font-bold text-primary uppercase">Kategoriler</span>
        </nav>
        <h1 className="font-headline text-headline-lg font-extrabold tracking-tight text-primary uppercase">
          Kategoriler
        </h1>
        <p className="font-body text-body-md text-on-surface-variant">
          Gönderi kategorilerini düzenle, yeni yayın grupları yapılandır.
        </p>
        <p className="font-label mt-space-xs inline-flex w-fit flex-wrap gap-space-sm bg-surface-container px-space-md py-space-xs text-label-md text-on-surface-variant">
          <span>
            Toplam Kategori: <strong className="text-primary">{total}</strong>
          </span>
          <span>|</span>
          <span>
            Aktif: <strong className="text-primary">{active}</strong>
          </span>
          <span>|</span>
          <span>
            Pasif: <strong className="text-primary">{inactive}</strong>
          </span>
        </p>
      </div>

      <Link
        to="/yonetim/kategoriler/yeni"
        className="font-label inline-flex shrink-0 items-center justify-center gap-space-xs bg-primary-container px-space-md py-space-sm text-label-md font-bold tracking-wider text-on-primary uppercase transition-all hover:bg-primary"
      >
        <span className="material-symbols-outlined text-[18px]">add</span>
        Kategori Ekle
      </Link>
    </header>
  )
}
