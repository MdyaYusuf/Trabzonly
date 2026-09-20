import { Link } from 'react-router-dom'
import type { SquadGalleryCardData } from '../utils/squadsGalleryTypes'
import { SquadPitchPreview } from './SquadPitchPreview'

type SquadGalleryCardProps = {
  squad: SquadGalleryCardData
  listMode?: boolean
}

function avatarToneClass(tone: SquadGalleryCardData['authorAvatarTone']) {
  if (tone === 'secondary') {
    return 'bg-secondary text-on-secondary'
  }

  if (tone === 'primary-container') {
    return 'bg-primary-container text-on-primary'
  }

  if (tone === 'surface') {
    return 'bg-surface-container-highest text-on-surface'
  }

  return 'bg-primary text-on-primary'
}

function RatingStars({ rating }: { rating: number }) {
  const icons: string[] = []

  for (let i = 1; i <= 5; i += 1) {
    if (rating >= i) {
      icons.push('star')
    } else if (rating >= i - 0.5) {
      icons.push('star_half')
    } else {
      icons.push('star')
    }
  }

  return (
    <div className="flex items-center text-[#D39D3F]">
      {icons.map((icon, index) => {
        const filled = rating >= index + 0.5

        return (
          <span
            key={`${icon}-${index}`}
            className="material-symbols-outlined text-[16px]"
            style={
              filled
                ? { fontVariationSettings: "'FILL' 1" }
                : { fontVariationSettings: "'FILL' 0", opacity: 0.35 }
            }
          >
            {icon}
          </span>
        )
      })}
    </div>
  )
}

export function SquadGalleryCard({ squad, listMode = false }: SquadGalleryCardProps) {
  return (
    <article
      className={
        listMode
          ? 'group flex flex-col bg-surface-container-lowest shadow-sm transition-shadow hover:shadow-md md:flex-row'
          : 'group flex flex-col bg-surface-container-lowest shadow-sm transition-shadow hover:shadow-md'
      }
    >
      <div className={listMode ? 'md:w-[320px] md:shrink-0' : undefined}>
        <SquadPitchPreview
          formationLabel={squad.formationLabel}
          badge={squad.badge}
          badgeTone={squad.badgeTone}
          pitchTags={squad.pitchTags}
          columns={squad.columns}
        />
      </div>

      <div className="flex flex-1 flex-col justify-between p-space-md">
        <div className="flex flex-col">
          <div className="mb-space-xs flex items-center justify-between gap-space-xs">
            <div className="flex min-w-0 items-center gap-space-xs">
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${avatarToneClass(squad.authorAvatarTone)}`}
              >
                {squad.authorInitials}
              </div>
              <span className="font-label truncate text-label-md font-bold text-on-surface">
                {squad.authorUsername}
              </span>
              {squad.authorVerified ? (
                <span
                  className="material-symbols-outlined shrink-0 text-[16px] text-secondary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
              ) : null}
              {squad.authorBadge ? (
                <span className="font-kicker hidden bg-secondary-fixed px-1.5 text-[10px] font-bold text-on-secondary-fixed uppercase sm:inline">
                  {squad.authorBadge}
                </span>
              ) : null}
            </div>
            <span className="font-body shrink-0 text-body-sm text-on-surface-variant">
              {squad.publishedLabel}
            </span>
          </div>

          <h2 className="font-headline mb-space-xs text-headline-sm leading-snug font-bold text-on-surface transition-colors group-hover:text-primary">
            {squad.title}
          </h2>

          <div className="mb-space-sm flex items-center gap-space-xs">
            <RatingStars rating={squad.rating} />
            <span className="font-label text-label-md font-bold text-on-surface">{squad.rating}</span>
            <span className="font-body text-body-sm text-on-surface-variant">
              ({squad.ratingCount} oy)
            </span>
          </div>

          <p className="font-body mb-space-md line-clamp-2 text-body-sm text-on-surface-variant">
            {squad.excerpt}
          </p>
        </div>

        <div className="-mx-space-md -mb-space-md flex items-center justify-between bg-surface-container-low px-space-md py-space-sm pt-space-sm">
          <div className="font-body flex items-center gap-space-md text-[12px] text-on-surface-variant">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">mode_comment</span>
              {squad.commentCount}
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">visibility</span>
              {squad.viewsLabel}
            </span>
          </div>
          <div className="flex items-center gap-space-xs">
            <button
              type="button"
              title="Beğen"
              className="p-1.5 text-on-surface-variant transition-colors hover:text-primary"
            >
              <span className="material-symbols-outlined text-[18px]">thumb_up</span>
            </button>
            <button
              type="button"
              title="Taktik Tahtasında Klonla"
              className="p-1.5 text-on-surface-variant transition-colors hover:text-secondary"
            >
              <span className="material-symbols-outlined text-[18px]">content_copy</span>
            </button>
            <Link
              to={`/kadrolar/${squad.id}`}
              className="font-label bg-primary px-space-sm py-1 text-[11px] tracking-wider text-on-primary uppercase transition-colors hover:bg-primary-container"
            >
              İncele & Puanla
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
