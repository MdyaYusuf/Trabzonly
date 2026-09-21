import type { PublicMemberProfile } from '../utils/publicMemberProfileTypes'

type PublicMemberProfileStatsProps = {
  profile: PublicMemberProfile
}

export function PublicMemberProfileStats({ profile }: PublicMemberProfileStatsProps) {
  return (
    <section className="grid grid-cols-2 gap-px overflow-hidden border border-outline-variant/40 bg-outline-variant/40 sm:grid-cols-3 lg:grid-cols-5">
      {profile.stats.map((stat) => (
        <div
          key={stat.id}
          className="flex flex-col gap-1 bg-surface-container-low px-space-md py-space-md"
        >
          <span className="font-kicker text-kicker text-on-surface-variant uppercase">
            {stat.label}
          </span>
          <div className="flex items-baseline gap-space-xs">
            <span className="font-headline text-headline-md font-extrabold text-primary tabular-nums">
              {stat.value}
            </span>
            <span className="font-label text-label-md text-on-surface-variant">{stat.unit}</span>
          </div>
        </div>
      ))}

      <div className="col-span-2 flex flex-col justify-center gap-space-sm bg-surface-container-low px-space-md py-space-md sm:col-span-3 lg:col-span-1">
        <span className="font-kicker text-kicker text-on-surface-variant uppercase">
          12 Rozet Kazanıldı
        </span>
        <div className="flex items-center gap-1">
          {profile.badgePreviewIcons.map((icon) => (
            <span
              key={icon}
              className="flex h-8 w-8 items-center justify-center bg-primary-container text-tertiary-fixed-dim"
            >
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {icon}
              </span>
            </span>
          ))}
          <span className="font-label bg-surface-container-high px-space-sm py-1 text-label-md font-bold text-primary">
            +{profile.badgeExtraCount}
          </span>
        </div>
      </div>
    </section>
  )
}
