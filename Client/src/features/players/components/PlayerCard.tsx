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
  return (
    <article className="group relative flex flex-col overflow-hidden bg-surface-container-lowest shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between p-space-md pb-0">
        <div className="flex items-center gap-space-xs">
          <span className="font-headline flex h-7 w-7 items-center justify-center bg-primary-container text-body-md font-black text-on-primary">
            {player.number}
          </span>
          <span className="bg-surface-container px-2 py-0.5 font-kicker text-kicker font-bold text-primary uppercase">
            {player.positionCode} • {player.positionLabel}
          </span>
        </div>
        <div className="flex items-center gap-1 bg-surface-container-low px-2 py-0.5">
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

      <div className="relative mt-space-xs h-56 w-full overflow-hidden bg-surface-container">
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
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-headline text-headline-sm font-bold text-primary transition-colors group-hover:text-secondary">
              {player.name}
            </h3>
            <span className="font-kicker shrink-0 text-kicker font-bold text-secondary uppercase">
              {player.nationality}
            </span>
          </div>
          <p className="font-body mt-1 text-body-sm text-on-surface-variant">
            {player.age} Yaşında • {player.height} • {player.note}
          </p>
          <div className="my-space-sm grid grid-cols-3 gap-1 bg-surface-container-low p-space-xs text-center">
            {player.stats.map((stat) => (
              <div key={stat.label}>
                <span className="font-kicker block text-kicker text-on-surface-variant uppercase">
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
          <Link
            to={`/oyuncular/${player.id}`}
            className="font-label inline-flex items-center gap-1 bg-primary-container px-space-sm py-1.5 text-label-md font-bold text-on-primary uppercase transition-colors hover:bg-primary"
          >
            <span>İncele</span>
            <span className="material-symbols-outlined text-body-sm">arrow_forward</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
