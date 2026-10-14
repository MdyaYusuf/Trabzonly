import { Link } from 'react-router-dom'
import type { SquadGalleryCardData } from '../utils/squadsGalleryTypes'
import { SquadPitchPreview } from './SquadPitchPreview'

type SquadGalleryCardProps = {
  squad: SquadGalleryCardData
  listMode?: boolean
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating.toFixed(1)} / 5`}>
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1
        const fill: 'full' | 'half' | 'empty' =
          rating >= starValue ? 'full' : rating >= starValue - 0.5 ? 'half' : 'empty'
        const gradientId = `squad-star-half-${index}`

        return (
          <svg
            key={index}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            className="shrink-0"
            aria-hidden="true"
          >
            {fill === 'half' ? (
              <defs>
                <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="0">
                  <stop offset="50%" stopColor="#D39D3F" />
                  <stop offset="50%" stopColor="#D39D3F" stopOpacity="0.28" />
                </linearGradient>
              </defs>
            ) : null}
            <path
              d="M12 2.5l2.74 6.16 6.76.62-5.1 4.5 1.5 6.72L12 16.9l-6 3.6 1.5-6.72-5.1-4.5 6.76-.62L12 2.5z"
              fill={
                fill === 'full' ? '#D39D3F' : fill === 'half' ? `url(#${gradientId})` : '#D39D3F'
              }
              fillOpacity={fill === 'empty' ? 0.28 : 1}
            />
          </svg>
        )
      })}
    </div>
  )
}

export function SquadGalleryCard({ squad, listMode = false }: SquadGalleryCardProps) {
  const detailPath = `/kadrolar/${squad.id}`
  const authorLabel = squad.authorUsername.startsWith('@')
    ? squad.authorUsername
    : `@${squad.authorUsername}`

  return (
    <Link
      to={detailPath}
      className={
        listMode
          ? 'group relative flex cursor-pointer flex-col bg-surface-container-lowest shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-md md:flex-row'
          : 'group relative flex cursor-pointer flex-col bg-surface-container-lowest shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-md'
      }
    >
      <div className={listMode ? 'md:w-[320px] md:shrink-0' : undefined}>
        <SquadPitchPreview formationLabel={squad.formationLabel} columns={squad.columns} />
      </div>

      <div className="flex flex-1 flex-col justify-between p-space-md">
        <div className="flex flex-col">
          <div className="mb-space-xs flex items-center justify-between gap-space-xs">
            <div className="flex min-w-0 items-center gap-space-xs">
              <span className="font-label truncate text-label-md font-bold text-on-surface">
                {authorLabel}
              </span>
              {squad.authorDisplayTag ? (
                <span className="font-kicker hidden bg-secondary-fixed px-1.5 text-[10px] font-bold text-on-secondary-fixed uppercase sm:inline">
                  {squad.authorDisplayTag}
                </span>
              ) : null}
            </div>
            <span className="font-body shrink-0 text-body-sm text-on-surface-variant">
              {squad.publishedLabel}
            </span>
          </div>

          <h2 className="font-headline mb-space-xs line-clamp-2 text-headline-sm leading-snug font-bold text-primary transition-colors group-hover:text-secondary">
            {squad.title}
          </h2>

          <div className="mb-space-sm flex items-center gap-space-xs">
            <RatingStars rating={squad.rating} />
            <span className="font-label text-label-md font-bold text-on-surface">
              {squad.rating.toFixed(1)}
            </span>
            <span className="font-body text-body-sm text-on-surface-variant">
              ({squad.ratingCount} oy)
            </span>
          </div>

          <p className="font-body mb-space-md line-clamp-2 min-h-[2.5rem] text-body-sm text-on-surface-variant">
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
              {squad.viewCount.toLocaleString('tr-TR')}
            </span>
          </div>
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center border border-primary/35 text-primary transition-all duration-200 group-hover:border-secondary group-hover:bg-secondary group-hover:text-on-secondary"
          >
            <span className="material-symbols-outlined text-[20px] transition-transform duration-200 group-hover:translate-x-0.5">
              arrow_forward
            </span>
          </span>
        </div>
      </div>
    </Link>
  )
}
