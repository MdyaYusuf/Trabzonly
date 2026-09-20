import { Link } from 'react-router-dom'
import { type PlayerProfile } from '../utils/playerDetailPlaceholders'

type PlayerDetailHeroProps = {
  profile: PlayerProfile
  favorited: boolean
  setFavorited: (value: boolean | ((prev: boolean) => boolean)) => void
}

export function PlayerDetailHero({ profile, favorited, setFavorited }: PlayerDetailHeroProps) {
  return (
    <>
      <div className="border-b border-border-subtle bg-surface-container-low">
        <div className="mx-auto flex max-w-[1360px] flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-12">
          <Link
            to="/oyuncular"
            className="font-label inline-flex items-center gap-1 text-label-md font-bold tracking-wider text-primary uppercase transition-colors hover:text-secondary"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Tüm Kadroya Dön
          </Link>
          <div className="font-kicker flex flex-wrap items-center gap-space-sm text-kicker tracking-wider text-on-surface-variant uppercase">
            <span>
              SEZON: <strong className="text-primary">2024 / 2025</strong>
            </span>
            <span className="text-outline-variant">•</span>
            <span>
              LİG: <strong className="text-primary">TRENDYOL SÜPER LİG</strong>
            </span>
          </div>
        </div>
      </div>

      <section className="relative w-full overflow-hidden bg-primary text-on-primary">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-container to-primary opacity-95" />
        <div className="pointer-events-none absolute -right-20 -bottom-32 h-[550px] w-[550px] rounded-full bg-secondary-container opacity-10 blur-3xl" />
        <div className="pointer-events-none absolute top-1/4 left-1/4 h-[350px] w-[350px] rounded-full bg-secondary opacity-15 blur-2xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] opacity-5 [background-size:24px_24px]" />

        <div className="relative z-10 mx-auto max-w-[1360px] px-4 pt-space-lg pb-space-xl sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 items-end gap-gutter lg:grid-cols-12">
            <div className="relative flex flex-col justify-end lg:col-span-4">
              <div
                className={`relative flex aspect-[4/5] max-h-[480px] w-full items-end justify-center overflow-hidden bg-gradient-to-br shadow-2xl ${profile.tone}`}
              >
                <span className="absolute top-space-md left-space-md font-display text-display-xl leading-none font-extrabold text-on-primary/20 select-none">
                  {profile.number}
                </span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-6xl font-extrabold text-white/15">
                    #{profile.number}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />
                <div className="absolute right-space-md bottom-space-md left-space-md flex items-center justify-between bg-primary/90 px-space-sm py-space-xs backdrop-blur-md">
                  <span className="font-kicker text-kicker tracking-widest text-secondary-container uppercase">
                    A TAKIM {profile.position.split('/')[0]?.trim() ?? 'OYUNCU'}
                  </span>
                  <span className="font-label flex items-center gap-1 text-label-md font-bold text-tertiary-fixed-dim uppercase">
                    <span
                      className="material-symbols-outlined text-[15px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                    KULÜP LİSANSLI
                  </span>
                </div>
              </div>
            </div>

            <div className="flex h-full flex-col justify-between pt-space-md lg:col-span-8">
              <div className="flex flex-wrap items-center justify-between gap-space-md pb-space-md">
                <div className="flex flex-wrap items-center gap-space-xs">
                  <span className="bg-secondary px-space-sm py-space-xs font-kicker text-kicker font-bold tracking-wider text-on-secondary uppercase">
                    {profile.position}
                  </span>
                  {profile.loanLabel ? (
                    <span className="bg-surface-container-highest/20 px-space-sm py-space-xs font-kicker text-kicker font-semibold text-on-primary uppercase">
                      {profile.loanLabel}
                    </span>
                  ) : null}
                  <span className="flex items-center gap-1 bg-tertiary-container px-space-sm py-space-xs font-kicker text-kicker font-bold text-tertiary-fixed-dim uppercase">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tertiary-fixed-dim" />
                    {profile.statusBadge}
                  </span>
                </div>
                <div className="flex items-center gap-space-xs bg-primary-container px-space-md py-space-xs shadow-md">
                  <span
                    className="material-symbols-outlined text-[20px] text-tertiary-fixed-dim"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-1">
                      <span className="font-headline text-headline-sm font-bold text-tertiary-fixed-dim">
                        {profile.rating.toFixed(1)}
                      </span>
                      <span className="font-kicker text-kicker text-on-primary/60">/ 10</span>
                    </div>
                    <span className="font-kicker text-[9px] tracking-wider text-on-primary/80 uppercase">
                      {profile.votes} Taraftar Oyu
                    </span>
                  </div>
                </div>
              </div>

              <div className="my-space-sm">
                <div className="mb-space-xs flex flex-wrap items-center gap-space-sm">
                  <span className="font-label text-label-md font-semibold tracking-wider text-on-primary/90 uppercase">
                    {profile.nationality}
                  </span>
                  {profile.dualNationality ? (
                    <>
                      <span className="h-1 w-1 rounded-full bg-secondary-container" />
                      <span className="font-label text-label-md text-secondary-fixed-dim">
                        {profile.dualNationality}
                      </span>
                    </>
                  ) : null}
                </div>
                <h1 className="-ml-1 font-display text-display-xl-mobile leading-none font-black tracking-tight text-on-primary uppercase sm:text-display-xl">
                  {profile.name}
                </h1>
              </div>

              <div className="my-space-md grid grid-cols-2 gap-space-sm bg-primary-container/80 p-space-md sm:grid-cols-4">
                <div>
                  <span className="font-kicker block text-kicker text-on-primary/70 uppercase">
                    Piyasa Değeri
                  </span>
                  <span className="font-headline text-headline-md font-bold text-tertiary-fixed-dim">
                    {profile.marketValue}
                  </span>
                  <span className="font-body block text-[11px] text-on-primary/60">
                    Zirve Değeri: {profile.peakValue}
                  </span>
                </div>
                <div>
                  <span className="font-kicker block text-kicker text-on-primary/70 uppercase">
                    Yaş / Doğum
                  </span>
                  <span className="font-headline text-headline-md font-bold text-on-primary">
                    {profile.age} Yaş
                  </span>
                  <span className="font-body block text-[11px] text-on-primary/60">
                    {profile.birthDate}
                  </span>
                </div>
                <div>
                  <span className="font-kicker block text-kicker text-on-primary/70 uppercase">
                    Fiziki Yapı / Ayak
                  </span>
                  <span className="font-headline text-headline-md font-bold text-on-primary">
                    {profile.height}
                  </span>
                  <span className="font-body block text-[11px] font-semibold text-secondary-container">
                    {profile.foot}
                  </span>
                </div>
                <div>
                  <span className="font-kicker block text-kicker text-on-primary/70 uppercase">
                    Sözleşme Sonu
                  </span>
                  <span className="font-headline text-headline-md font-bold text-on-primary">
                    {profile.contractEnd}
                  </span>
                  <span className="font-body block text-[11px] text-on-primary/60">
                    {profile.contractNote}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-space-md pt-space-xs">
                <div className="flex flex-wrap items-center gap-space-sm">
                  <button
                    type="button"
                    className="font-label flex items-center gap-2 bg-secondary-container px-space-lg py-space-sm text-label-md font-bold tracking-wider text-on-secondary-container uppercase shadow-md transition-all hover:bg-surface-container-lowest"
                  >
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    Oyuncuyu Puanla
                  </button>
                  <button
                    type="button"
                    onClick={() => setFavorited((value) => !value)}
                    className="font-label flex items-center gap-2 bg-surface-container-highest/20 px-space-md py-space-sm text-label-md font-semibold tracking-wider text-on-primary uppercase transition-colors hover:bg-surface-container-highest/40"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {favorited ? 'favorite' : 'favorite'}
                    </span>
                    Favorilere Ekle
                  </button>
                  <button
                    type="button"
                    title="Profili Paylaş"
                    className="flex items-center justify-center bg-surface-container-highest/20 p-space-sm text-on-primary transition-colors hover:bg-surface-container-highest/40"
                  >
                    <span className="material-symbols-outlined text-[18px]">share</span>
                  </button>
                </div>
                <div className="font-kicker flex items-center gap-space-xs text-kicker text-secondary-fixed uppercase">
                  <span className="h-2 w-2 rounded-full bg-secondary-container" />
                  <span>{profile.squadStatus}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
