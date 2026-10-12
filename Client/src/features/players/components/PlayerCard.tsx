import { useState } from 'react'
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
  const shirtLabel = player.number > 0 ? `#${player.number}` : '—'
  const [flagFailed, setFlagFailed] = useState(false)
  const flagUrl = player.flagUrl
  const showFlag = Boolean(flagUrl) && !flagFailed

  return (
    <Link
      to={detailPath}
      className="group relative flex h-full cursor-pointer flex-col overflow-hidden bg-surface-container-lowest shadow-sm transition-all duration-200 hover:-translate-y-1 hover:scale-[1.035] hover:shadow-lg"
    >
      <div
        className={[
          'relative h-40 w-full shrink-0 overflow-hidden',
          showFlag ? 'bg-surface-container' : `bg-gradient-to-br ${player.tone}`,
        ].join(' ')}
      >
        {showFlag && flagUrl ? (
          <img
            src={flagUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
            onError={() => {
              setFlagFailed(true)
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(255,255,255,0.16),transparent_42%)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/5" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-space-md pb-space-sm">
          <span className="font-display text-4xl font-extrabold leading-none tracking-tight text-white/90">
            {shirtLabel}
          </span>
          <div className="flex items-center gap-1 bg-black/25 px-2 py-0.5 backdrop-blur-[2px]">
            <span
              className="material-symbols-outlined text-body-md text-tertiary-fixed"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span className="font-headline text-label-md font-bold text-white">
              {player.rating.toFixed(1)}
            </span>
          </div>
        </div>
        {player.badge ? (
          <div
            className={`absolute top-2 right-2 flex items-center px-2 py-0.5 ${badgeClass(player.badge.tone)}`}
          >
            <span className="font-kicker text-kicker font-bold tracking-widest uppercase">
              {player.badge.label}
            </span>
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-space-sm p-space-md">
        <div className="flex flex-wrap items-center gap-space-xs">
          <span className="bg-surface-container px-2 py-0.5 font-kicker text-kicker font-bold text-primary uppercase">
            {player.positionCode}
          </span>
          <span className="font-kicker truncate text-kicker font-bold text-on-surface-variant uppercase">
            {player.positionLabel}
          </span>
        </div>

        <div className="min-w-0">
          <h3 className="font-headline line-clamp-1 text-headline-sm font-bold text-primary transition-colors group-hover:text-secondary">
            {player.name}
          </h3>
          <p className="font-body mt-0.5 truncate text-body-sm text-on-surface-variant">
            {player.nationality} · {player.age} yaş · {player.height}
          </p>
        </div>

        <div
          className={`grid gap-1 border-y border-outline-variant/40 py-space-sm text-center ${
            player.stats.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
          }`}
        >
          {player.stats.map((stat) => (
            <div key={stat.label} className="min-w-0">
              <span className="font-kicker block truncate text-kicker text-on-surface-variant uppercase">
                {stat.label}
              </span>
              <span className="font-headline text-label-md font-bold text-primary">{stat.value}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto flex items-end justify-between gap-space-sm pt-space-xs">
          <div className="min-w-0">
            <span className="font-kicker block text-kicker text-on-surface-variant uppercase">
              Piyasa Değeri
            </span>
            <span className="font-headline text-headline-sm font-bold text-primary">
              {formatMarketValue(player.marketValue)}
            </span>
          </div>
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center border border-primary/35 text-primary transition-all duration-200 group-hover:border-secondary group-hover:bg-secondary group-hover:text-on-secondary"
          >
            <span className="material-symbols-outlined text-[22px] transition-transform duration-200 group-hover:translate-x-0.5">
              arrow_forward
            </span>
          </span>
        </div>
      </div>
    </Link>
  )
}
