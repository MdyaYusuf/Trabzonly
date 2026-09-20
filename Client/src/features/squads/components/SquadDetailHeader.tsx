import { Link } from 'react-router-dom'
import type { SquadDetailProfile } from '../utils/squadDetailTypes'

type SquadDetailHeaderProps = {
  squad: SquadDetailProfile
}

export function SquadDetailHeader({ squad }: SquadDetailHeaderProps) {
  return (
    <section className="w-full bg-surface py-space-lg">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col justify-between gap-space-lg lg:flex-row lg:items-start">
          <div className="flex flex-1 flex-col gap-space-md">
            <div className="flex flex-wrap items-center gap-space-sm">
              <span className="font-kicker flex items-center gap-1 bg-primary-container px-space-sm py-1 text-kicker tracking-widest text-on-primary uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-tertiary-fixed-dim" />
                {squad.formationBadge}
              </span>
              <span className="font-label bg-secondary-container px-space-sm py-1 text-label-md font-bold text-on-secondary-container">
                {squad.venueBadge}
              </span>
              <span className="font-kicker flex items-center gap-1 bg-surface-container-high px-space-sm py-1 text-kicker font-semibold text-on-surface-variant uppercase">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                {squad.verifiedBadge}
              </span>
            </div>

            <h1 className="font-display max-w-4xl text-headline-lg leading-none font-extrabold tracking-tight text-primary uppercase lg:text-display-xl">
              {squad.title}
            </h1>

            <div className="flex flex-wrap items-center gap-space-lg pt-space-xs">
              <div className="flex items-center gap-space-sm">
                <div className="font-headline relative flex h-12 w-12 items-center justify-center bg-primary text-headline-sm font-bold text-on-primary shadow-sm">
                  {squad.authorInitials}
                  <span
                    className="absolute -right-1 -bottom-1 flex h-4 w-4 items-center justify-center bg-tertiary-fixed-dim text-[10px] font-bold text-on-tertiary-fixed"
                    title={squad.authorBadge}
                  >
                    ★
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-space-xs">
                    <span className="font-headline text-headline-sm font-bold text-on-surface">
                      {squad.authorUsername}
                    </span>
                    <span className="font-kicker bg-surface-container-highest px-1.5 py-0.5 text-kicker font-bold text-primary uppercase">
                      {squad.authorBadge}
                    </span>
                  </div>
                  <span className="font-body text-body-sm text-on-surface-variant">
                    Yayınlanma: {squad.publishedLabel} • {squad.locationLabel}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-space-xs">
                <button
                  type="button"
                  className="font-label flex items-center gap-1.5 bg-surface-container px-space-md py-space-xs text-label-md tracking-wider text-on-surface uppercase transition-colors hover:bg-surface-container-highest"
                >
                  <span className="material-symbols-outlined text-[18px]">person_add</span>
                  <span>Yazarı Takip Et</span>
                </button>
                <button
                  type="button"
                  className="font-label flex items-center gap-1.5 bg-surface-container px-space-md py-space-xs text-label-md tracking-wider text-on-surface uppercase transition-colors hover:bg-surface-container-highest"
                >
                  <span className="material-symbols-outlined text-[18px]">share</span>
                  <span>Paylaş</span>
                </button>
                <Link
                  to="/kadrolar/olustur"
                  className="font-label flex items-center gap-1.5 bg-primary-container px-space-md py-space-xs text-label-md font-bold tracking-wider text-on-primary uppercase shadow-sm transition-colors hover:bg-primary"
                >
                  <span className="material-symbols-outlined text-[18px]">content_copy</span>
                  <span>Kendi Kadrona Klonla</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col justify-between gap-space-md bg-surface-container-lowest p-space-md shadow-sm lg:w-80">
            <div className="flex items-center justify-between">
              <span className="font-kicker text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
                TOPLULUK PUANI
              </span>
              <span className="font-kicker bg-secondary-container px-2 py-0.5 text-kicker font-bold text-on-secondary-container">
                {squad.approvalPercent} ONAY
              </span>
            </div>
            <div className="flex items-baseline gap-space-sm">
              <span className="font-stat text-stat-counter leading-none font-extrabold text-primary">
                {squad.rating}
              </span>
              <div className="flex flex-col">
                <div className="flex items-center text-[20px] leading-none text-tertiary-fixed-dim">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star_half
                  </span>
                </div>
                <span className="font-body mt-1 text-body-sm text-on-surface-variant">
                  {squad.ratingCount} Taraftar Oyladı
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-space-xs pt-space-xs text-center">
              <div className="bg-surface-container-low p-2">
                <span className="font-label block text-label-md font-bold text-primary">
                  {squad.commentCount}
                </span>
                <span className="font-kicker text-kicker text-on-surface-variant uppercase">
                  Yorum
                </span>
              </div>
              <div className="bg-surface-container-low p-2">
                <span className="font-label block text-label-md font-bold text-secondary">
                  {squad.viewsLabel}
                </span>
                <span className="font-kicker text-kicker text-on-surface-variant uppercase">
                  Görüntü
                </span>
              </div>
              <div className="bg-surface-container-low p-2">
                <span className="font-label block text-label-md font-bold text-primary-container">
                  {squad.tacticFitPercent}
                </span>
                <span className="font-kicker text-kicker text-on-surface-variant uppercase">
                  Taktik Uyum
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
