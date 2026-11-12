import type { MatchWeekLeaderboardEntryDto } from '../matchWeekTypes'
import {
  avatarGradientForPlayerId,
  initialsFromName,
  shortNameFromFull,
} from '../utils/matchWeekPublicUtils'

type MatchWeekLeaderboardProps = {
  entries: MatchWeekLeaderboardEntryDto[]
  isLoading?: boolean
}

export function MatchWeekLeaderboard({ entries, isLoading }: MatchWeekLeaderboardProps) {
  return (
    <section className="border border-outline-variant/30 bg-surface-container-lowest p-space-md shadow-sm">
      <div className="mb-space-sm flex items-center gap-1.5">
        <span className="material-symbols-outlined text-[18px] text-secondary">trophy</span>
        <h2 className="font-kicker text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
          Haftanın En İyileri
        </h2>
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
        <ol className="flex flex-col gap-space-xs">
          {entries.map((entry) => (
            <li
              key={entry.playerId}
              className="flex items-center gap-space-sm border border-outline-variant/20 bg-surface px-space-sm py-space-xs"
            >
              <span className="font-headline w-6 shrink-0 text-center text-sm font-bold text-secondary">
                {entry.rank}
              </span>
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-[10px] font-bold text-white ${avatarGradientForPlayerId(entry.playerId)}`}
              >
                {initialsFromName(entry.playerName)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-headline truncate text-sm font-bold text-on-surface">
                  {shortNameFromFull(entry.playerName)}
                </p>
                <p className="font-kicker text-[10px] tracking-wider text-on-surface-variant uppercase">
                  #{entry.shirtNumber ?? '—'} / {entry.ratingCount} oy
                </p>
              </div>
              <span className="font-headline shrink-0 text-sm font-bold tabular-nums text-primary">
                {entry.averageRating.toFixed(1)}
              </span>
            </li>
          ))}
        </ol>
      ) : null}
    </section>
  )
}
