import type { AdminStatisticFormDraft } from '../utils/adminStatisticTypes'

type AdminStatisticFormSidebarProps = {
  draft: AdminStatisticFormDraft
}

export function AdminStatisticFormSidebar({ draft }: AdminStatisticFormSidebarProps) {
  const minutesLabel = Number(draft.minutes || 0).toLocaleString('tr-TR')

  return (
    <aside className="flex flex-col gap-space-md">
      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex items-center justify-between gap-space-sm">
          <h2 className="font-kicker flex items-center gap-1 text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
            <span className="material-symbols-outlined text-[16px]">visibility</span>
            Canlı Performans Kartı Önizlemesi
          </h2>
          <span className="font-kicker text-kicker text-secondary uppercase">Önizleme</span>
        </div>

        <article className="overflow-hidden border border-outline-variant/40">
          <div className={`relative bg-gradient-to-br p-space-md text-on-primary ${draft.avatarTone}`}>
            <span className="font-kicker bg-black/30 px-space-sm py-0.5 text-kicker uppercase">
              {draft.previewPositionBadge}
            </span>
            <p className="font-kicker mt-space-md text-kicker text-on-primary/80 uppercase">
              Trabzonspor #{draft.playerNumber}
            </p>
            <h3 className="font-headline text-headline-md font-extrabold uppercase">
              {draft.playerName}
            </h3>
            <p className="font-body mt-1 text-body-sm text-on-primary/80">
              {draft.season.replace(' Sezonu', '')} Trendyol Süper Lig
            </p>
          </div>
          <div className="grid grid-cols-4 gap-px bg-outline-variant/40">
            {[
              { label: 'Gol', value: draft.goals },
              { label: 'Asist', value: draft.assists },
              { label: 'Maç', value: draft.matches },
              { label: 'Süre', value: `${minutesLabel}'` },
            ].map((stat) => (
              <div key={stat.label} className="bg-surface-container-lowest p-space-sm text-center">
                <p className="font-kicker text-kicker text-on-surface-variant uppercase">
                  {stat.label}
                </p>
                <p className="font-headline mt-1 text-headline-sm font-bold text-primary tabular-nums">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
          <div className="border-t border-outline-variant/40 p-space-md">
            <div className="flex items-center justify-between gap-space-sm">
              <div>
                <p className="font-kicker text-kicker text-on-surface-variant uppercase">
                  Gol Başına Dakika Oranı
                </p>
                <p className="font-headline mt-1 text-headline-sm font-bold text-primary tabular-nums">
                  {draft.minutesPerGoalLabel}{' '}
                  <span className="font-label text-label-md text-on-surface-variant">dk / gol</span>
                </p>
                <p className="font-body mt-1 text-body-sm text-on-surface-variant">
                  {draft.minutesPerGoalNote}
                </p>
              </div>
              <span className="font-kicker inline-flex items-center gap-1 bg-secondary-container px-space-sm py-1 text-kicker text-on-secondary-container uppercase">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                Yüksek Verim
              </span>
            </div>
            <p className="font-label mt-space-md text-label-md text-on-surface">
              Müsabaka Kart Karnesi:{' '}
              <span className="text-tertiary-container">{draft.yellowCards} Sarı</span>
              {' · '}
              <span className="text-error">{draft.redCards} Kırmızı</span>
            </p>
            <p className="font-body mt-space-xs text-body-sm text-on-surface-variant">
              * Bu kart oyuncu detay sayfasında ve ana sayfa haftalık özetinde eşzamanlı gösterilir.
            </p>
          </div>
        </article>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <h2 className="font-kicker mb-space-md flex items-center gap-1 text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
          <span className="material-symbols-outlined text-[16px]">verified</span>
          Optimal Veri ve Lisans Doğrulama
        </h2>
        <div className="mb-space-md flex gap-space-sm bg-secondary-fixed/40 px-space-md py-space-sm">
          <span className="material-symbols-outlined text-secondary">check_circle</span>
          <div>
            <p className="font-label text-label-md font-bold text-on-surface">
              TFF Esame Entegrasyonu
            </p>
            <p className="font-body text-body-sm text-on-surface-variant">
              TFF Müsabaka Raporuyla %100 Uyumlu
            </p>
          </div>
        </div>
        <dl className="flex flex-col gap-space-sm">
          <div>
            <dt className="font-kicker text-kicker text-on-surface-variant uppercase">
              Son Güncelleme
            </dt>
            <dd className="font-label mt-1 text-label-md text-on-surface">{draft.lastUpdated}</dd>
          </div>
          <div>
            <dt className="font-kicker text-kicker text-on-surface-variant uppercase">
              İlgili Sezon Durumu
            </dt>
            <dd className="font-label mt-1 text-label-md text-on-surface">{draft.seasonStatus}</dd>
          </div>
          <div>
            <dt className="font-kicker text-kicker text-on-surface-variant uppercase">
              API Senkronizasyonu
            </dt>
            <dd className="font-label mt-1 inline-flex items-center gap-1 text-label-md font-bold text-secondary">
              <span className="h-2 w-2 rounded-full bg-secondary-container" />
              {draft.apiSyncLabel}
            </dd>
          </div>
        </dl>
      </section>
    </aside>
  )
}
