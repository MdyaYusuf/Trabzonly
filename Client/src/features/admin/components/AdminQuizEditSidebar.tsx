import type { AdminQuizEditDraft } from '../utils/adminQuizTypes'

type AdminQuizEditSidebarProps = {
  draft: AdminQuizEditDraft
}

export function AdminQuizEditSidebar({ draft }: AdminQuizEditSidebarProps) {
  return (
    <aside className="flex flex-col gap-space-md">
      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex items-center justify-between gap-space-sm">
          <h2 className="font-kicker flex items-center gap-1 text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
            <span className="material-symbols-outlined text-[16px]">visibility</span>
            Canlı Kart Önizlemesi
          </h2>
          <span className="font-kicker text-kicker text-secondary uppercase">Portal Görünümü</span>
        </div>

        <article className="overflow-hidden border border-outline-variant/40">
          <div className="bg-primary-container p-space-md text-on-primary">
            <div className="flex flex-wrap items-center justify-between gap-space-sm">
              <span className="font-kicker bg-black/25 px-space-sm py-0.5 text-kicker uppercase">
                Canlı Yarışma
              </span>
              <span className="font-kicker text-kicker text-on-primary/80 uppercase">Trabzonly</span>
            </div>
            <p className="font-kicker mt-space-md text-kicker text-on-primary/80 uppercase">
              {draft.previewCategory}
            </p>
            <h3 className="font-headline mt-1 text-headline-sm font-extrabold uppercase">
              {draft.title}
            </h3>
            <div className="mt-space-md flex flex-wrap gap-space-md">
              <span className="font-label inline-flex items-center gap-1 text-label-md">
                <span className="material-symbols-outlined text-[16px]">help</span>
                {draft.questionCount} Soru
              </span>
              <span className="font-label inline-flex items-center gap-1 text-label-md">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                {draft.durationLabel}
              </span>
              <span className="font-label inline-flex items-center gap-1 text-label-md">
                <span className="material-symbols-outlined text-[16px]">group</span>
                {draft.participationLabel}
              </span>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-space-md">
            <p className="font-body text-body-sm text-on-surface-variant">{draft.description}</p>
            <button
              type="button"
              className="font-label mt-space-md inline-flex w-full items-center justify-center gap-1 bg-primary-container px-space-md py-space-sm text-label-md font-bold text-on-primary uppercase"
            >
              <span className="material-symbols-outlined text-[18px]">play_arrow</span>
              Testi Çöz (Aktif)
            </button>
          </div>
        </article>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex items-center justify-between gap-space-sm">
          <h2 className="font-kicker flex items-center gap-1 text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
            <span className="material-symbols-outlined text-[16px]">query_stats</span>
            Performans ve Katılım
          </h2>
          <span className="font-kicker text-kicker text-on-surface-variant uppercase">
            Son 30 Gün
          </span>
        </div>

        <div className="grid grid-cols-2 gap-space-sm">
          <div className="border border-outline-variant/30 p-space-sm">
            <p className="font-kicker text-kicker text-on-surface-variant uppercase">
              Toplam Katılım
            </p>
            <p className="font-headline mt-1 text-headline-sm font-bold text-primary tabular-nums">
              {draft.participation.toLocaleString('tr-TR')}
            </p>
            <p className="font-label mt-1 inline-flex items-center gap-1 text-label-md text-secondary">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              {draft.participationTrend}
            </p>
          </div>
          <div className="border border-outline-variant/30 p-space-sm">
            <p className="font-kicker text-kicker text-on-surface-variant uppercase">
              Tamamlama Oranı
            </p>
            <p className="font-headline mt-1 text-headline-sm font-bold text-primary tabular-nums">
              {draft.completionRate}
            </p>
            <p className="font-body mt-1 text-body-sm text-on-surface-variant">
              {draft.completionDetail}
            </p>
          </div>
        </div>

        <div className="mt-space-md border border-outline-variant/30 p-space-sm">
          <p className="font-kicker text-kicker text-on-surface-variant uppercase">Ortalama Skor</p>
          <p className="font-headline mt-1 text-headline-sm font-bold text-primary">
            {draft.averageScore}
          </p>
          <div className="mt-space-sm h-1.5 bg-surface-container-high">
            <div className="h-full w-[78%] bg-secondary-container" />
          </div>
          <p className="font-body mt-space-sm text-body-sm text-on-surface-variant">
            {draft.averageNote}
          </p>
        </div>

        <div className="mt-space-md flex items-start gap-space-sm border border-outline-variant/30 p-space-sm">
          <span className="material-symbols-outlined text-secondary">groups</span>
          <div>
            <p className="font-kicker text-kicker text-on-surface-variant uppercase">
              En Yüksek Puan Alan Kitle
            </p>
            <p className="font-label mt-1 text-label-md font-bold text-on-surface">
              {draft.topAudience}
            </p>
            <p className="font-body text-body-sm text-on-surface-variant">
              {draft.topAudienceScore}
            </p>
          </div>
        </div>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <h2 className="font-kicker mb-space-md flex items-center gap-1 text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
          <span className="material-symbols-outlined text-[16px]">verified_user</span>
          Denetim ve Güncelleme
        </h2>
        <dl className="flex flex-col gap-space-sm">
          <div>
            <dt className="font-kicker text-kicker text-on-surface-variant uppercase">
              Son Güncelleyen
            </dt>
            <dd className="font-label mt-1 text-label-md text-on-surface">{draft.lastEditor}</dd>
          </div>
          <div>
            <dt className="font-kicker text-kicker text-on-surface-variant uppercase">
              Son Güncelleme Saati
            </dt>
            <dd className="font-label mt-1 text-label-md text-on-surface">{draft.lastUpdated}</dd>
          </div>
          <div>
            <dt className="font-kicker text-kicker text-on-surface-variant uppercase">
              Orijinal Yayın Tarihi
            </dt>
            <dd className="font-label mt-1 text-label-md text-on-surface">{draft.publishedAt}</dd>
          </div>
        </dl>
      </section>
    </aside>
  )
}
