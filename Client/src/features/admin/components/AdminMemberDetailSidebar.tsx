import { Link } from 'react-router-dom'
import type { AdminMemberDetailDraft } from '../utils/adminMemberTypes'

type AdminMemberDetailSidebarProps = {
  draft: AdminMemberDetailDraft
}

export function AdminMemberDetailSidebar({ draft }: AdminMemberDetailSidebarProps) {
  return (
    <aside className="flex flex-col gap-space-md">
      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex items-center justify-between gap-space-sm">
          <h2 className="font-kicker flex items-center gap-1 text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
            <span className="material-symbols-outlined text-[16px]">preview</span>
            Canlı Profil Kartı Önizlemesi
          </h2>
          <span className="font-kicker text-kicker text-secondary uppercase">Topluluk Vitrini</span>
        </div>

        <article className="overflow-hidden border border-outline-variant/40">
          <div className={`bg-gradient-to-br p-space-md text-on-primary ${draft.avatarTone}`}>
            <div className="flex flex-wrap items-center justify-between gap-space-sm">
              <span className="font-kicker bg-black/25 px-space-sm py-0.5 text-kicker uppercase">
                Trabzonly Resmi Kulüp Forumu
              </span>
              <span className="font-kicker bg-tertiary-fixed px-space-sm py-0.5 text-kicker text-on-tertiary-fixed uppercase">
                {draft.previewBadge}
              </span>
            </div>
            <div className="mt-space-md flex items-end gap-space-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-on-primary/40 bg-black/20 text-lg font-bold">
                {draft.initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-headline text-headline-sm font-extrabold uppercase">
                  {draft.username}
                </p>
                <p className="font-kicker mt-1 inline-flex items-center gap-1 text-kicker uppercase">
                  <span className="material-symbols-outlined text-[14px]">stars</span>
                  {draft.previewRole} • Üyelik: {draft.membershipYear}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-space-md">
            <p className="font-body text-body-sm text-on-surface-variant">&quot;{draft.bio}&quot;</p>
            <Link
              to={`/uyeler/${draft.username}`}
              className="font-label mt-space-md inline-flex w-full items-center justify-center gap-1 border border-outline-variant px-space-md py-space-sm text-label-md uppercase transition-colors hover:border-primary hover:text-primary"
            >
              Profili Görüntüle
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </Link>
          </div>
        </article>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex items-center justify-between gap-space-sm">
          <h2 className="font-kicker flex items-center gap-1 text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
            <span className="material-symbols-outlined text-[16px]">query_stats</span>
            Topluluk Aktivite ve Etkileşim
          </h2>
          <span className="font-kicker text-kicker text-on-surface-variant uppercase">
            2024-25 Sezonu
          </span>
        </div>

        <div className="grid grid-cols-2 gap-space-sm">
          {[
            { label: 'Paylaşılan Gönderi', value: draft.postsCount, note: draft.postsNote },
            { label: 'Oluşturulan Kadro', value: draft.squadsCount, note: draft.squadsNote },
            { label: 'Çözülen Quiz', value: draft.quizzesCount, note: draft.quizzesNote },
            { label: 'Alınan Beğeni', value: draft.likesCount, note: draft.likesNote },
          ].map((stat) => (
            <article key={stat.label} className="border border-outline-variant/30 p-space-sm">
              <p className="font-kicker text-kicker text-on-surface-variant uppercase">
                {stat.label}
              </p>
              <p className="font-headline mt-1 text-headline-sm font-bold text-primary tabular-nums">
                {stat.value}
              </p>
              <p className="font-body mt-1 text-body-sm text-on-surface-variant">{stat.note}</p>
            </article>
          ))}
        </div>

        <div className="mt-space-md border border-outline-variant/30 p-space-sm">
          <p className="font-kicker text-kicker text-on-surface-variant uppercase">
            Topluluk İtibar Puanı
          </p>
          <p className="font-label mt-1 text-label-md font-bold text-on-surface">
            {draft.reputationLabel}
          </p>
          <div className="mt-space-sm h-1.5 bg-surface-container-high">
            <div
              className="h-full bg-secondary-container"
              style={{ width: `${draft.reputationScore}%` }}
            />
          </div>
          <p className="font-body mt-space-sm text-body-sm text-on-surface-variant">
            {draft.reputationNote}
          </p>
        </div>

        <div className="mt-space-md">
          <p className="font-kicker mb-space-sm text-kicker text-on-surface-variant uppercase">
            Son 6 Aylık Etkileşim İvmesi
          </p>
          <div className="flex h-24 items-end justify-between gap-1">
            {draft.engagementMonths.map((month) => (
              <div key={month.label} className="flex flex-1 flex-col items-center gap-1">
                <div className={`w-full bg-primary-container ${month.height}`} />
                <span className="font-kicker text-[9px] tracking-wide text-on-surface-variant uppercase">
                  {month.label.slice(0, 3)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <h2 className="font-kicker mb-space-md flex items-center gap-1 text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
          <span className="material-symbols-outlined text-[16px]">history_edu</span>
          Denetim ve Güvenlik Günlüğü
        </h2>
        <ul className="flex flex-col gap-space-sm">
          {draft.auditItems.map((item) => (
            <li
              key={item.id}
              className="flex items-start justify-between gap-space-sm border border-outline-variant/30 px-space-md py-space-sm"
            >
              <div className="flex gap-space-sm">
                <span className="material-symbols-outlined text-secondary">{item.icon}</span>
                <div>
                  <p className="font-label text-label-md font-bold text-on-surface">{item.title}</p>
                  <p className="font-body text-body-sm text-on-surface-variant">{item.detail}</p>
                  {item.date && (
                    <p className="font-kicker mt-1 text-kicker text-on-surface-variant uppercase">
                      {item.date}
                    </p>
                  )}
                </div>
              </div>
              {item.badge && (
                <span
                  className={`font-kicker shrink-0 px-space-sm py-1 text-kicker uppercase ${item.badgeTone}`}
                >
                  {item.badge}
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>
    </aside>
  )
}
