import type { CSSProperties } from 'react'
import type { FormationTacticalArrow } from '../utils/squadBuilderTypes'
import type { SquadBenchPlayer, SquadPitchPlayer } from '../utils/squadDetailTypes'

type SquadDetailPitchProps = {
  players: SquadPitchPlayer[]
  benchPlayers: SquadBenchPlayer[]
  tacticalArrows: FormationTacticalArrow[]
}

function PitchPlayerMarker({ player }: { player: SquadPitchPlayer }) {
  const style: CSSProperties = {
    left: player.left,
    top: player.top,
  }

  return (
    <div
      className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 cursor-default flex-col items-center group"
      style={style}
    >
      <div className="mb-1 flex items-center gap-1">
        {player.isCaptain ? (
          <span className="font-kicker bg-tertiary-fixed-dim px-1.5 py-0.5 text-[10px] font-bold text-on-tertiary-fixed uppercase shadow-sm">
            KAPTAN (C)
          </span>
        ) : null}
        <span className="font-kicker bg-primary px-1.5 py-0.5 text-[10px] font-bold text-on-primary uppercase shadow-sm">
          {player.positionLabel}
        </span>
      </div>
      <div className="relative h-10 w-10 shrink-0 rounded-full bg-primary p-0.5 shadow-md transition-transform group-hover:scale-105">
        <div
          className={`flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br text-[11px] font-bold text-white ${player.avatarGradient}`}
          title={player.fullName}
        >
          {player.avatarInitials}
        </div>
        <span className="font-headline absolute -right-1 -bottom-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-on-primary shadow">
          #{player.number}
        </span>
      </div>
      <span className="font-headline mt-1 bg-surface px-2 py-0.5 text-[11px] font-bold whitespace-nowrap text-on-surface shadow-sm">
        {player.shortName}
      </span>
    </div>
  )
}

export function SquadDetailPitch({
  players,
  benchPlayers,
  tacticalArrows,
}: SquadDetailPitchProps) {
  return (
    <div className="flex flex-col gap-space-md lg:col-span-8">
      <div className="flex flex-wrap items-center justify-between gap-space-sm bg-surface-container-lowest p-space-sm shadow-sm">
        <div className="flex flex-wrap items-center gap-space-sm">
          <span className="font-kicker flex items-center gap-1 text-kicker font-bold tracking-widest text-primary uppercase">
            <span className="material-symbols-outlined text-[16px]">stadium</span>
            PAPARA PARK ÇİMİ - 11 DİZİLİMİ
          </span>
          <span className="font-body text-body-sm text-on-surface-variant">
            Hücum Yönü: Yukarı ↑
          </span>
        </div>
      </div>

      <div className="relative aspect-[4/5] w-full select-none overflow-hidden bg-[#133826] shadow-md sm:aspect-[3/4] md:aspect-[4/5]">
        <div
          className="pointer-events-none absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgb(15, 46, 31), rgb(15, 46, 31) 40px, rgb(19, 56, 38) 40px, rgb(19, 56, 38) 80px)',
          }}
        />

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full stroke-white/40 fill-none"
          preserveAspectRatio="none"
          strokeWidth="2"
          viewBox="0 0 800 1000"
          aria-hidden="true"
        >
          <rect height="940" width="740" x="30" y="30" />
          <line x1="30" x2="770" y1="500" y2="500" />
          <circle cx="400" cy="500" r="90" />
          <circle className="fill-white/60" cx="400" cy="500" r="3" />
          <rect height="150" width="300" x="250" y="30" />
          <rect height="60" width="160" x="320" y="30" />
          <circle className="fill-white/60" cx="400" cy="130" r="3" />
          <path d="M 330 180 A 80 80 0 0 0 470 180" />
          <rect height="150" width="300" x="250" y="820" />
          <rect height="60" width="160" x="320" y="910" />
          <circle className="fill-white/60" cx="400" cy="870" r="3" />
          <path d="M 330 820 A 80 80 0 0 1 470 820" />
          <path d="M 30 50 A 20 20 0 0 0 50 30" />
          <path d="M 750 30 A 20 20 0 0 0 770 50" />
          <path d="M 30 950 A 20 20 0 0 1 50 970" />
          <path d="M 750 970 A 20 20 0 0 1 770 950" />
        </svg>

        {tacticalArrows.length > 0 ? (
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
            viewBox="0 0 800 1000"
            aria-hidden="true"
          >
            <defs>
              <marker
                id="tactical-arrow"
                markerHeight="6"
                markerWidth="6"
                orient="auto-start-reverse"
                refX="5"
                refY="5"
                viewBox="0 0 10 10"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#8ccefd" />
              </marker>
            </defs>
            {tacticalArrows.map((arrow, index) => (
              <path
                key={`arrow-${index}`}
                d={arrow.d}
                fill="none"
                markerEnd="url(#tactical-arrow)"
                stroke={arrow.stroke}
                strokeDasharray="6,4"
                strokeWidth="2.5"
              />
            ))}
          </svg>
        ) : null}

        {players.map((player) => (
          <PitchPlayerMarker key={player.id} player={player} />
        ))}
      </div>

      <div className="bg-surface-container-lowest p-space-md shadow-sm">
        <div className="mb-space-sm flex flex-col justify-between gap-space-xs sm:flex-row sm:items-center">
          <span className="font-kicker text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
            YEDEK KULÜBESİ ({benchPlayers.length} OYUNCU)
          </span>
        </div>
        <div className="grid grid-cols-2 gap-space-xs text-center sm:grid-cols-5">
          {benchPlayers.map((player) => (
            <div
              key={`${player.playerId}-${player.name}`}
              className="flex flex-col items-center bg-surface-container-low p-2"
            >
              <span className="font-kicker text-kicker text-on-surface-variant">
                #{player.number} {player.position}
              </span>
              <span className="font-headline text-xs font-bold text-on-surface">{player.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
