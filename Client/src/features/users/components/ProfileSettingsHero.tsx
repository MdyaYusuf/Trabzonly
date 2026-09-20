import { Link } from 'react-router-dom'
import { defaultProfileSettings } from '../utils/profileSettingsPlaceholders'

type ProfileSettingsHeroProps = {
  onLogout: () => void
}

export function ProfileSettingsHero({ onLogout }: ProfileSettingsHeroProps) {
  const profile = defaultProfileSettings

  return (
    <section className="relative w-full overflow-hidden bg-primary-container text-on-primary">
      <div
        className="pointer-events-none absolute inset-0 opacity-15 mix-blend-screen"
        style={{
          backgroundImage: 'radial-gradient(#8ccefd 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="pointer-events-none absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1360px] px-4 py-space-xl sm:px-6 lg:px-12">
        <div className="flex flex-col justify-between gap-space-lg lg:flex-row lg:items-end">
          <div className="flex flex-col items-start gap-space-lg sm:flex-row sm:items-center">
            <div className="group relative">
              <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden bg-primary text-on-primary shadow-xl sm:h-32 sm:w-32">
                <span className="font-display text-stat-counter tracking-tighter text-secondary-container select-none font-extrabold">
                  {profile.initials}
                </span>
                <div className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-1 bg-primary/80 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="material-symbols-outlined text-secondary-container">
                    photo_camera
                  </span>
                  <span className="font-kicker text-center text-kicker tracking-wider text-on-primary uppercase">
                    Değiştir
                  </span>
                </div>
              </div>
              <div className="absolute -top-2 -right-2 flex items-center gap-1 bg-primary px-2 py-0.5 shadow-md">
                <span
                  className="material-symbols-outlined text-[16px] text-tertiary-fixed-dim"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span className="font-kicker text-kicker tracking-wider text-tertiary-fixed-dim uppercase">
                  {profile.kongreBadge}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-space-xs">
              <div className="flex flex-wrap items-center gap-space-xs">
                <h1 className="font-headline text-headline-lg font-bold tracking-tight text-on-primary uppercase">
                  {profile.displayName}
                </h1>
                <div className="flex items-center gap-1 bg-tertiary-container px-2.5 py-1 text-on-tertiary-container">
                  <span
                    className="material-symbols-outlined text-[15px] text-tertiary-fixed-dim"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                  <span className="font-kicker text-kicker tracking-wider text-tertiary-fixed-dim uppercase">
                    {profile.roleBadge}
                  </span>
                </div>
              </div>
              <p className="font-body max-w-xl text-body-md text-on-primary/80">
                {profile.subtitle}
              </p>
              <div className="font-label flex items-center gap-space-sm text-label-md text-secondary-container">
                <span className="font-bold">@{profile.handle}</span>
                <span className="text-on-primary/40">•</span>
                <span className="text-on-primary/70">{profile.memberSince}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-space-md lg:items-end">
            <div className="flex flex-wrap items-center gap-space-sm">
              <Link
                to="/gonderiler"
                className="font-label flex items-center gap-space-xs bg-transparent px-space-md py-space-xs text-label-md tracking-wider text-on-primary uppercase transition-all hover:bg-on-primary hover:text-primary"
              >
                <span className="material-symbols-outlined text-[18px]">visibility</span>
                Genel Profili Görüntüle
              </Link>
              <button
                type="button"
                onClick={onLogout}
                className="bg-primary px-space-md py-space-xs font-label text-label-md tracking-wider text-on-primary uppercase transition-all hover:bg-surface-container-lowest hover:text-primary"
              >
                Çıkış Yap
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-space-xs">
              <div className="flex items-baseline gap-1.5 bg-primary/90 px-3 py-1.5 shadow-sm">
                <span className="font-headline text-headline-sm font-bold text-secondary-container">
                  {profile.stats.posts}
                </span>
                <span className="font-kicker text-kicker text-on-primary/70 uppercase">Gönderi</span>
              </div>
              <div className="flex items-baseline gap-1.5 bg-primary/90 px-3 py-1.5 shadow-sm">
                <span className="font-headline text-headline-sm font-bold text-secondary-container">
                  {profile.stats.squads}
                </span>
                <span className="font-kicker text-kicker text-on-primary/70 uppercase">
                  Taktik Kadro
                </span>
              </div>
              <div className="flex items-baseline gap-1.5 bg-primary/90 px-3 py-1.5 shadow-sm">
                <span className="font-headline text-headline-sm font-bold text-tertiary-fixed-dim">
                  {profile.stats.communityScore}
                </span>
                <span className="font-kicker text-kicker text-on-primary/70 uppercase">
                  Topluluk Skoru
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
