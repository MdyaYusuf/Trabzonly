import type { AdminSeasonFormDraft } from '../utils/adminSeasonTypes'

type AdminSeasonFormSidebarProps = {
  draft: AdminSeasonFormDraft
}

export function AdminSeasonFormSidebar({ draft }: AdminSeasonFormSidebarProps) {
  return (
    <aside className="flex flex-col gap-space-md">
      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex items-center justify-between gap-space-sm">
          <h2 className="font-kicker flex items-center gap-1 text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
            <span className="material-symbols-outlined text-[16px]">visibility</span>
            Canlı Etki Önizlemesi
          </h2>
          <span className="font-kicker text-kicker text-secondary uppercase">Sitede Görünüm</span>
        </div>
        <p className="font-body mb-space-md text-body-sm text-on-surface-variant">
          Frontend önizleme — kullanıcı arayüzünde filtre ve başlık modüllerinde render edilen
          görsel kimlik.
        </p>

        <article className="overflow-hidden border border-outline-variant/40">
          <div className="bg-gradient-to-br from-primary via-primary-container to-[#1a040b] p-space-md text-on-primary">
            <div className="flex items-center justify-between gap-space-sm">
              <span className="font-kicker text-kicker text-tertiary-fixed-dim uppercase">
                Trabzonspor Kulübü
              </span>
              {draft.isActive && (
                <span className="font-kicker bg-secondary-container px-space-xs py-0.5 text-kicker text-on-secondary-container uppercase">
                  Canlı Sezon
                </span>
              )}
            </div>
            <div className="mt-space-md flex items-end gap-space-sm">
              <span className="font-display text-display-xl font-extrabold leading-none opacity-30">
                {draft.name.slice(2, 4) || '24'}
              </span>
              <div>
                <p className="font-headline text-headline-md font-extrabold">
                  {draft.name || 'YYYY/YY'} Sezonu
                </p>
                <p className="font-kicker mt-1 text-kicker text-secondary-container uppercase">
                  {draft.previewLeague}
                </p>
              </div>
            </div>
            <div className="mt-space-md flex items-center justify-between border-t border-white/15 pt-space-sm">
              <span
                className={`font-kicker px-space-sm py-0.5 text-kicker uppercase ${
                  draft.isActive
                    ? 'bg-secondary-container text-on-secondary-container'
                    : 'bg-white/15 text-on-primary'
                }`}
              >
                {draft.isActive ? 'Aktif' : 'Pasif'}
              </span>
              <span className="font-label inline-flex items-center gap-1 text-label-md">
                <span className="material-symbols-outlined text-[16px]">sports_soccer</span>
                Güncel Fikstür Tablosu
              </span>
            </div>
            <p className="font-kicker mt-space-sm text-kicker text-on-primary/70 uppercase">
              {draft.previewWeekLabel}
            </p>
          </div>
        </article>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <h2 className="font-kicker mb-space-sm text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
          Bağlı Modüller & Veriler
        </h2>
        <p className="font-body mb-space-md text-body-sm text-on-surface-variant">
          Bu dönem güncellendiğinde etkilenecek bağlı veri blokları.
        </p>
        <ul className="flex flex-col gap-space-sm">
          {draft.linkedModules.map((module) => (
            <li
              key={module.id}
              className="flex items-start gap-space-sm border-b border-outline-variant/30 pb-space-sm last:border-b-0 last:pb-0"
            >
              <span className="material-symbols-outlined text-secondary">{module.icon}</span>
              <div>
                <p className="font-label text-label-md font-bold text-on-surface">{module.title}</p>
                <p className="font-body text-body-sm text-on-surface-variant">{module.value}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="font-kicker mt-space-md text-kicker text-on-surface-variant uppercase">
          <span className="material-symbols-outlined mr-1 align-middle text-[14px]">history</span>
          Oluşturan: {draft.createdBy} • Son Güncelleme: {draft.lastUpdated}
        </p>
      </section>

      <section className="bg-primary p-space-md text-on-primary">
        <div className="flex gap-space-sm">
          <span className="material-symbols-outlined text-tertiary-fixed-dim">tips_and_updates</span>
          <div>
            <h2 className="font-label text-label-md font-bold uppercase">Kadro Yönetimi Uyarısı</h2>
            <p className="font-body mt-1 text-body-sm text-on-primary/85">
              Sezon statüsünü pasife aldığınızda, ana sayfadaki canlı skor merkezi ve oyuncu
              istatistikleri arşive kaldırılır. Yalnızca bir sezon varsayılan &quot;Aktif&quot;
              olabilir.
            </p>
          </div>
        </div>
      </section>
    </aside>
  )
}
