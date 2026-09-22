import type { AdminCategoryFormDraft } from '../utils/adminCategoryTypes'

type AdminCategoryFormSidebarProps = {
  draft: AdminCategoryFormDraft
}

export function AdminCategoryFormSidebar({ draft }: AdminCategoryFormSidebarProps) {
  const badgeClass =
    draft.accent === 'mavi'
      ? 'bg-secondary text-on-secondary'
      : 'bg-primary-container text-on-primary'

  return (
    <aside className="flex flex-col gap-space-md">
      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex items-center justify-between gap-space-sm">
          <h2 className="font-kicker text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
            Canlı Etiket Önizlemesi
          </h2>
          <span className="font-kicker text-kicker text-secondary uppercase">Canlı Simülasyon</span>
        </div>
        <p className="font-body mb-space-md text-body-sm text-on-surface-variant">
          Yazı kartlarında ve ana akışta taraftarlara sunulacak rozet tasarımı:
        </p>

        <article className="overflow-hidden border border-outline-variant/40">
          <div className="relative h-36 bg-gradient-to-br from-primary via-primary-container to-secondary">
            <span
              className={`font-kicker absolute top-2 left-2 px-space-sm py-0.5 text-kicker font-bold uppercase ${badgeClass}`}
            >
              {draft.name || 'Kategori'}
            </span>
          </div>
          <div className="bg-surface-container-lowest p-space-md">
            <p className="font-kicker text-kicker text-on-surface-variant uppercase">
              {draft.previewDateLabel}
            </p>
            <h3 className="font-headline mt-space-xs text-headline-sm font-bold text-primary">
              {draft.previewTitle}
            </h3>
            <p className="font-body mt-space-xs line-clamp-2 text-body-sm text-on-surface-variant">
              {draft.description || 'Kategori açıklaması burada önizlenir.'}
            </p>
          </div>
        </article>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-secondary">query_stats</span>
          <h2 className="font-kicker text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
            Kategori Metrikleri
          </h2>
        </div>
        <dl className="flex flex-col gap-space-md">
          <div>
            <dt className="font-kicker text-kicker text-on-surface-variant uppercase">
              Bağlı Gönderi
            </dt>
            <dd className="font-label mt-1 text-label-md font-bold text-on-surface">
              {draft.linkedPostsLabel}
            </dd>
          </div>
          <div>
            <dt className="font-kicker text-kicker text-on-surface-variant uppercase">
              Toplam Okunma
            </dt>
            <dd className="font-label mt-1 text-label-md font-bold text-on-surface">
              {draft.totalReadsLabel}
            </dd>
          </div>
          <div>
            <dt className="font-kicker text-kicker text-on-surface-variant uppercase">Oluşturan</dt>
            <dd className="font-label mt-1 text-label-md text-on-surface">{draft.createdBy}</dd>
          </div>
          <div>
            <dt className="font-kicker text-kicker text-on-surface-variant uppercase">
              Son Güncelleme
            </dt>
            <dd className="font-label mt-1 text-label-md text-on-surface">{draft.lastUpdated}</dd>
          </div>
          <div>
            <dt className="font-kicker text-kicker text-on-surface-variant uppercase">Durum</dt>
            <dd className="font-label mt-1 inline-flex items-center gap-1 text-label-md font-bold text-secondary">
              <span className="h-2 w-2 rounded-full bg-secondary-container" />
              {draft.statusDetail}
            </dd>
          </div>
        </dl>
      </section>
    </aside>
  )
}
