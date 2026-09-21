import type { PublicMemberProfile } from '../utils/publicMemberProfileTypes'

type PublicMemberProfileSidebarProps = {
  profile: PublicMemberProfile
}

const activityIcon = {
  comment: 'forum',
  quiz: 'quiz',
  squad: 'sports',
} as const

export function PublicMemberProfileSidebar({ profile }: PublicMemberProfileSidebarProps) {
  return (
    <aside className="flex flex-col gap-space-md">
      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-tertiary-fixed-dim">military_tech</span>
            <h3 className="font-kicker text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
              Tribün Rozetleri
            </h3>
          </div>
          <span className="font-label text-label-md font-bold text-primary">12 / 24</span>
        </div>

        <ul className="flex flex-col gap-space-md">
          {profile.featuredBadges.map((badge) => (
            <li key={badge.id} className="flex gap-space-sm">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary-container text-tertiary-fixed-dim">
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {badge.icon}
                </span>
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="font-label text-label-md font-bold text-on-surface">
                  {badge.title}
                </span>
                <span className="font-body text-body-sm text-on-surface-variant">
                  {badge.description}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-space-md border-t border-outline-variant/40 pt-space-md">
          <div className="mb-space-xs flex items-center justify-between">
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              Quiz Başarı Ortalaması
            </span>
            <span className="font-label text-label-md font-bold text-primary">
              %{profile.quizAveragePercent}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden bg-surface-container-high">
            <div
              className="h-full bg-secondary-container transition-[width]"
              style={{ width: `${profile.quizAveragePercent}%` }}
            />
          </div>
        </div>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-tertiary-fixed-dim">stars</span>
          <h3 className="font-kicker text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
            Kişisel Bordo-Mavi Arşiv
          </h3>
        </div>

        <h4 className="font-label mb-space-sm text-label-md font-bold text-primary uppercase">
          Gönlündeki Efsane 4&apos;lü
        </h4>
        <div className="mb-space-md grid grid-cols-2 gap-space-sm">
          {profile.legends.map((legend) => (
            <div key={legend.id} className="flex flex-col gap-1">
              <div
                className={`flex aspect-square items-center justify-center bg-gradient-to-br ${legend.tone}`}
              >
                <span className="font-headline text-headline-sm font-bold text-on-primary">
                  {legend.initials}
                </span>
              </div>
              <span className="font-label text-label-md font-bold text-on-surface">
                {legend.name}
              </span>
              <span className="font-body text-body-sm text-on-surface-variant">{legend.title}</span>
            </div>
          ))}
        </div>

        <div className="mb-space-md bg-primary-container p-space-md text-on-primary">
          <span className="font-kicker text-kicker text-tertiary-fixed-dim uppercase">
            Unutulmaz Maç
          </span>
          <div className="mt-space-sm flex items-start gap-space-sm">
            <span
              className="material-symbols-outlined text-tertiary-fixed-dim"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              emoji_events
            </span>
            <div>
              <p className="font-body text-body-sm text-on-primary/80">
                {profile.unforgettableMatch.dateLabel}
              </p>
              <p className="font-label text-label-md font-bold uppercase">
                {profile.unforgettableMatch.title} • {profile.unforgettableMatch.scoreLabel}
              </p>
            </div>
          </div>
        </div>

        <div>
          <span className="font-kicker text-kicker text-on-surface-variant uppercase">
            Tribün Uğuru
          </span>
          <p className="font-body mt-space-xs text-body-sm text-on-surface-variant italic">
            {profile.tribuneCharm}
          </p>
        </div>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-secondary">timeline</span>
          <h3 className="font-kicker text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
            Son Tribün Hareketleri
          </h3>
        </div>
        <ul className="flex flex-col gap-space-md">
          {profile.activities.map((activity) => (
            <li
              key={activity.id}
              className="flex gap-space-sm border-l-2 border-secondary-container pl-space-sm"
            >
              <span className="material-symbols-outlined mt-0.5 text-[18px] text-primary">
                {activityIcon[activity.kind]}
              </span>
              <div className="flex flex-col gap-0.5">
                <p className="font-body text-body-sm text-on-surface">
                  <span className="font-bold">{activity.title}</span> {activity.detail}
                </p>
                <span className="font-kicker text-kicker text-on-surface-variant uppercase">
                  {activity.timeLabel}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  )
}
