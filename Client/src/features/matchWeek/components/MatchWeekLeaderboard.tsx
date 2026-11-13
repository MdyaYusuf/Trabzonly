import { Link } from 'react-router-dom'
import type { MatchWeekLeaderboardEntryDto } from '../matchWeekTypes'
import { initialsFromName } from '../utils/matchWeekPublicUtils'

type MatchWeekLeaderboardProps = {
  entries: MatchWeekLeaderboardEntryDto[]
  isLoading?: boolean
}

const AVATAR_TONES = [
  'bg-primary-container text-on-primary',
  'bg-secondary text-on-secondary',
  'bg-primary text-on-primary',
] as const

export function MatchWeekLeaderboard({ entries, isLoading }: MatchWeekLeaderboardProps) {
  return (
    <div className="bg-surface-container-lowest p-space-md shadow-sm">
      <div className="mb-space-sm flex items-center gap-space-xs">
        <span className="material-symbols-outlined text-lg text-tertiary-fixed-dim">
          hotel_class
        </span>
        <span className="font-headline text-label-md font-bold tracking-wider text-primary uppercase">
          Haftanın En İyileri
        </span>
      </div>

      {isLoading ? (
        <p className="font-body text-body-sm text-on-surface-variant">Yükleniyor...</p>
      ) : null}

      {!isLoading && entries.length === 0 ? (
        <p className="font-body text-body-sm text-on-surface-variant">
          Henüz puan verilmedi.
        </p>
      ) : null}

      {!isLoading && entries.length > 0 ? (
        <div className="flex flex-col gap-space-sm">
          {entries.map((entry, index) => {
            const avatarTone = AVATAR_TONES[index % AVATAR_TONES.length]

            return (
              <Link
                key={entry.playerId}
                to={`/oyuncular/${entry.playerId}`}
                className="flex items-center gap-space-sm bg-surface-container p-space-xs transition-colors hover:bg-surface-container-high"
              >
                <span
                  aria-label={`${entry.rank}. sıra`}
                  className={[
                    'font-headline w-8 shrink-0 text-center text-[22px] leading-none font-bold tabular-nums',
                    entry.rank === 1 ? 'text-primary' : 'text-on-surface-variant/45',
                  ].join(' ')}
                >
                  {entry.rank}
                </span>
                <div
                  className={[
                    'flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full font-headline text-label-md font-bold',
                    avatarTone,
                  ].join(' ')}
                >
                  {initialsFromName(entry.playerName)}
                </div>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="font-label line-clamp-2 text-label-md font-bold text-secondary">
                    {entry.playerName}
                  </span>
                  <span className="font-kicker text-kicker text-on-surface-variant uppercase">
                    {entry.positionAbbreviation?.trim() || '—'}
                    {entry.shirtNumber != null ? ` #${entry.shirtNumber}` : ''}
                  </span>
                  <span className="font-body text-body-sm text-on-surface-variant">
                    {`${entry.averageRating.toFixed(1)} ortalama / ${entry.ratingCount} oy`}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
