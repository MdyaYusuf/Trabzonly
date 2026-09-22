import type { AdminPlayerFormDraft } from '../utils/adminPlayerTypes'

type AdminPlayerFormSidebarProps = {
  draft: AdminPlayerFormDraft
  mode: 'create' | 'edit'
}

export function AdminPlayerFormSidebar({ draft, mode }: AdminPlayerFormSidebarProps) {
  return (
    <aside className="flex flex-col gap-space-md">
      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <h2 className="font-kicker mb-space-md text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
          Oyuncu Fotoğrafı
        </h2>

        <div
          className={`relative mb-space-md flex aspect-[3/4] items-end justify-center overflow-hidden bg-gradient-to-br ${draft.avatarTone}`}
        >
          <span className="font-kicker absolute top-2 left-2 bg-black/40 px-space-xs py-0.5 text-kicker text-white uppercase">
            Portre
          </span>
          <span className="pb-space-lg font-headline text-display-xl font-extrabold text-on-primary/30">
            {draft.initials}
          </span>
        </div>

        <div className="mb-space-md flex flex-col items-center gap-space-xs border border-dashed border-outline-variant bg-surface-container-low px-space-md py-space-lg text-center">
          <span className="material-symbols-outlined text-3xl text-on-surface-variant">
            cloud_upload
          </span>
          <p className="font-label text-label-md font-bold text-on-surface">
            Yeni Görsel Sürükleyin
          </p>
          <p className="font-body text-body-sm text-on-surface-variant">
            PNG, JPG veya WebP (Maks. 5MB)
          </p>
        </div>

        <div className="flex gap-space-sm">
          <button
            type="button"
            className="font-label inline-flex flex-1 items-center justify-center gap-1 border border-outline-variant px-space-sm py-space-sm text-label-md uppercase transition-colors hover:border-primary hover:text-primary"
          >
            <span className="material-symbols-outlined text-[16px]">refresh</span>
            Değiştir
          </button>
          <button
            type="button"
            className="font-label inline-flex flex-1 items-center justify-center gap-1 border border-error/40 px-space-sm py-space-sm text-label-md text-error uppercase transition-colors hover:bg-error-container"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
            Kaldır
          </button>
        </div>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <h2 className="font-kicker mb-space-md text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
          Kayıt Geçmişi
        </h2>
        <dl className="flex flex-col gap-space-md">
          <div>
            <dt className="font-kicker flex items-center gap-1 text-kicker text-on-surface-variant uppercase">
              <span className="material-symbols-outlined text-[14px]">verified_user</span>
              Kayıt Oluşturan
            </dt>
            <dd className="font-label mt-1 text-label-md font-bold text-on-surface">
              {draft.createdBy}
            </dd>
          </div>
          <div>
            <dt className="font-kicker text-kicker text-on-surface-variant uppercase">
              Son Güncelleme
            </dt>
            <dd className="font-label mt-1 text-label-md text-on-surface">{draft.lastUpdated}</dd>
          </div>
          <div>
            <dt className="font-kicker text-kicker text-on-surface-variant uppercase">
              TFF Lisans Kodu
            </dt>
            <dd className="font-label mt-1 text-label-md font-bold text-primary">
              {draft.tffLicenseCode}
            </dd>
          </div>
          <div>
            <dt className="font-kicker text-kicker text-on-surface-variant uppercase">
              Sözleşme Tipi
            </dt>
            <dd className="mt-1">
              <span className="font-kicker bg-secondary-container px-space-sm py-0.5 text-kicker text-on-secondary-container uppercase">
                {draft.contractTypeLabel}
              </span>
            </dd>
          </div>
        </dl>

        {mode === 'create' && (
          <p className="font-body mt-space-md border-t border-outline-variant/40 pt-space-md text-body-sm text-on-surface-variant">
            Yeni kayıt kaydedildiğinde TFF lisans kodu ve geçmiş otomatik oluşur.
          </p>
        )}
      </section>
    </aside>
  )
}
