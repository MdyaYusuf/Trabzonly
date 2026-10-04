import { Link } from 'react-router-dom'
import { formatMarketValue } from '../utils/formatMarketValue'
import { type PlayerCardData } from '../utils/playerDirectoryTypes'

function badgeClass(tone: 'bordo' | 'mavi' | 'neutral') {
  if (tone === 'bordo') {
    return 'bg-primary/90 text-on-primary'
  }

  if (tone === 'mavi') {
    return 'bg-secondary text-on-secondary'
  }

  return 'bg-surface-container-highest text-primary'
}

type PlayerCardProps = {
  player: PlayerCardData
}

export function PlayerCard({ player }: PlayerCardProps) {
  const detailPath = `/oyuncular/${player.id}`

  return (
    <Link
      to={detailPath}
      className="group relative flex h-full cursor-pointer flex-col overflow-hidden bg-surface-container-lowest shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-md"
    >
      <div className="flex items-start justify-between p-space-md pb-0">
        <div className="flex min-w-0 items-center gap-space-xs">
          <span className="font-headline flex h-7 w-7 shrink-0 items-center justify-center bg-primary-container text-body-md font-black text-on-primary">
            {player.number}
          </span>
          <span className="truncate bg-surface-container px-2 py-0.5 font-kicker text-kicker font-bold text-primary uppercase">
            {player.positionCode} • {player.positionLabel}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1 bg-surface-container-low px-2 py-0.5">
          <span
            className="material-symbols-outlined text-body-md text-tertiary-fixed-dim"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>
          <span className="font-headline text-label-md font-bold text-primary">
            {player.rating.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="relative mt-space-xs h-56 w-full shrink-0 overflow-hidden bg-surface-container">
        <div className={`absolute inset-0 bg-gradient-to-br ${player.tone}`} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-5xl font-extrabold text-white/15">
            #{player.number}
          </span>
        </div>
        {player.badge ? (
          <div
            className={`absolute bottom-2 left-3 flex items-center gap-1.5 px-2 py-1 ${badgeClass(player.badge.tone)}`}
          >
            <span className="font-kicker text-kicker font-bold tracking-widest uppercase">
              {player.badge.label}
            </span>
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col justify-between p-space-md">
        <div>
          <div className="min-h-[3.75rem]">
            <h3 className="font-headline line-clamp-2 text-headline-sm font-bold text-primary transition-colors group-hover:text-secondary">
              {player.name}
            </h3>
            <span className="font-kicker mt-0.5 block truncate text-kicker font-bold text-secondary uppercase">
              {player.nationality}
            </span>
          </div>
          <p className="font-body mt-0.5 truncate text-body-sm text-on-surface-variant">
            {player.age} Yaşında • {player.height} • {player.note}
          </p>
          <div
            className={`my-space-sm grid gap-1 bg-surface-container-low p-space-xs text-center ${
              player.stats.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
            }`}
          >
            {player.stats.map((stat) => (
              <div key={stat.label} className="min-w-0">
                <span className="font-kicker block truncate text-kicker whitespace-nowrap text-on-surface-variant uppercase">
                  {stat.label}
                </span>
                <span className="font-headline text-label-md font-bold text-primary">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between pt-space-xs">
          <div>
            <span className="font-kicker block text-kicker text-on-surface-variant uppercase">
              Piyasa Değeri
            </span>
            <span className="font-headline text-headline-sm font-bold text-primary">
              {formatMarketValue(player.marketValue)}
            </span>
          </div>
          <span className="font-label inline-flex items-center gap-1 bg-primary-container px-space-sm py-1.5 text-label-md font-bold text-on-primary uppercase transition-colors group-hover:bg-primary">
            <span>İncele</span>
            <span className="material-symbols-outlined text-body-sm">arrow_forward</span>
          </span>
        </div>
      </div>
    </Link>
  )
}
