import type { PublicMemberProfile } from '../utils/publicMemberProfileTypes'

type PublicMemberProfileHeroProps = {
  profile: PublicMemberProfile
}

export function PublicMemberProfileHero({ profile }: PublicMemberProfileHeroProps) {
  return (
    <section className="flex flex-col">
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#1a040b] via-primary to-[#0b3a55] sm:h-56 lg:h-64">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(140,206,253,0.25), transparent 45%), radial-gradient(circle at 80% 70%, rgba(247,189,91,0.15), transparent 40%)',
          }}
        />
        <p className="font-display absolute inset-0 flex items-center justify-center px-4 text-center text-headline-lg font-extrabold tracking-tight text-white/15 uppercase select-none sm:text-display-xl">
          {profile.coverMotto}
        </p>
        <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-space-sm bg-gradient-to-t from-black/70 to-transparent p-space-md">
          <span className="font-kicker flex items-center gap-1 text-kicker text-white uppercase">
            <span className="material-symbols-outlined text-[16px]">stadium</span>
            {profile.stadiumLabel}
          </span>
          <span className="font-kicker text-kicker text-tertiary-fixed-dim uppercase">
            {profile.spiritLabel}
          </span>
        </div>
      </div>

      <div className="relative z-10 -mt-16 border border-outline-variant/40 bg-surface-container-lowest p-space-md shadow-sm sm:-mt-20 sm:p-space-lg">
        <div className="flex flex-col gap-space-lg lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-space-md sm:flex-row sm:items-start">
            <div className="relative shrink-0 self-start">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary ring-4 ring-tertiary-fixed-dim sm:h-28 sm:w-28">
                <span className="font-headline text-headline-md font-extrabold text-on-primary">
                  {profile.initials}
                </span>
              </div>
              <span
                className="absolute right-1 bottom-1 flex h-7 w-7 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container"
                aria-label="Onaylı üye"
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
              </span>
            </div>

            <div className="flex min-w-0 flex-col gap-space-sm">
              <div className="flex flex-wrap items-center gap-space-sm">
                <span className="font-kicker flex items-center gap-1 bg-tertiary-container px-space-sm py-1 text-kicker text-tertiary-fixed-dim uppercase">
                  <span
                    className="material-symbols-outlined text-[14px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    workspace_premium
                  </span>
                  {profile.roleBadge}
                </span>
                <span className="font-kicker flex items-center gap-1 bg-secondary-container px-space-sm py-1 text-kicker text-on-secondary-container uppercase">
                  <span className="material-symbols-outlined text-[14px]">military_tech</span>
                  {profile.levelBadge}
                </span>
              </div>

              <div>
                <h1 className="font-headline text-headline-md font-extrabold text-primary">
                  {profile.displayName}
                </h1>
                <p className="font-label mt-1 text-label-md text-on-surface-variant">
                  {profile.handle}
                </p>
              </div>

              <div className="font-body flex flex-wrap items-center gap-x-space-md gap-y-space-xs text-body-sm text-on-surface-variant">
                <span className="inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">local_activity</span>
                  {profile.seatLabel}
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">location_on</span>
                  {profile.location}
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                  {profile.joinedLabel}
                </span>
              </div>

              <p className="font-body max-w-2xl text-body-md text-on-surface-variant">
                {profile.bio}{' '}
                <span className="font-bold text-primary">{profile.motto}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm lg:shrink-0 lg:flex-col lg:items-stretch">
            <button
              type="button"
              className="font-label inline-flex items-center justify-center gap-space-xs bg-primary-container px-space-md py-space-sm text-label-md font-bold tracking-wider text-on-primary uppercase transition-all hover:bg-primary"
            >
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              Takip Et
            </button>
            <button
              type="button"
              className="font-label inline-flex items-center justify-center gap-space-xs border border-outline-variant px-space-md py-space-sm text-label-md uppercase transition-colors hover:border-primary hover:text-primary"
            >
              <span className="material-symbols-outlined text-[18px]">mail</span>
              Mesaj Gönder
            </button>
            <div className="flex gap-1">
              <button
                type="button"
                aria-label="Paylaş"
                className="flex h-10 w-10 items-center justify-center border border-outline-variant text-on-surface transition-colors hover:border-primary hover:text-primary"
              >
                <span className="material-symbols-outlined text-[18px]">share</span>
              </button>
              <button
                type="button"
                aria-label="Bildir"
                className="flex h-10 w-10 items-center justify-center border border-outline-variant text-on-surface transition-colors hover:border-error hover:text-error"
              >
                <span className="material-symbols-outlined text-[18px]">flag</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
