import type { CSSProperties } from 'react'
import type { SquadBenchPlayer, SquadPitchPlayer } from '../utils/squadDetailTypes'

type SquadDetailPitchProps = {
  players: SquadPitchPlayer[]
  benchPlayers: SquadBenchPlayer[]
  benchPlanLabel: string
}

function ringClass(tone: SquadPitchPlayer['ringTone']) {
  if (tone === 'primary') {
    return 'bg-primary'
  }

  if (tone === 'primary-container') {
    return 'bg-primary-container'
  }

  if (tone === 'secondary') {
    return 'bg-secondary'
  }

  if (tone === 'secondary-container') {
    return 'bg-secondary-container'
  }

  return 'bg-surface-container-lowest'
}

function numberBadgeClass(tone: SquadPitchPlayer['numberTone']) {
  if (tone === 'secondary') {
    return 'bg-secondary text-on-secondary'
  }

  if (tone === 'tertiary') {
    return 'bg-tertiary-fixed text-on-tertiary-fixed'
  }

  return 'bg-primary text-on-primary'
}

function positionBadgeClass(tone: SquadPitchPlayer['positionTone']) {
  if (tone === 'secondary') {
    return 'bg-secondary text-on-secondary'
  }

  if (tone === 'tertiary') {
    return 'bg-tertiary-fixed-dim text-on-tertiary-fixed font-extrabold'
  }

  return 'bg-primary text-on-primary'
}

function roleClass(tone: SquadPitchPlayer['roleTone']) {
  if (tone === 'secondary') {
    return 'text-secondary'
  }

  if (tone === 'primary-container') {
    return 'text-primary-container'
  }

  if (tone === 'surface' || tone === 'on-surface') {
    return 'text-on-surface'
  }

  return 'text-primary'
}

function benchRoleClass(tone: SquadBenchPlayer['roleTone']) {
  if (tone === 'secondary') {
    return 'text-secondary'
  }

  if (tone === 'tertiary') {
    return 'text-tertiary-container'
  }

  if (tone === 'bold-primary') {
    return 'font-bold text-primary'
  }

  if (tone === 'muted') {
    return 'text-on-surface-variant'
  }

  return 'text-primary'
}

function PitchPlayerMarker({ player }: { player: SquadPitchPlayer }) {
  const style: CSSProperties = {
    left: player.left,
  }

  if (player.bottom) {
    style.bottom = player.bottom
  } else if (player.top) {
    style.top = player.top
  }

  return (
    <div
      className={`absolute z-10 flex cursor-pointer flex-col items-center group ${
        player.centerX ? '-translate-x-1/2' : '-translate-x-1/2'
      }`}
      style={style}
    >
      <div className="mb-1 flex items-center gap-1">
        {player.isCaptain ? (
          <span className="font-kicker bg-tertiary-fixed-dim px-1.5 py-0.5 text-[10px] font-bold text-on-tertiary-fixed uppercase shadow-sm">
            KAPTAN (C)
          </span>
        ) : null}
        <span
          className={`font-kicker px-1.5 py-0.5 text-[10px] font-bold uppercase shadow-sm ${positionBadgeClass(player.positionTone)}`}
        >
          {player.positionLabel}
        </span>
      </div>
      <div
        className={`relative h-10 w-10 shrink-0 rounded-full p-0.5 shadow-md transition-transform group-hover:scale-105 ${ringClass(player.ringTone)}`}
      >
        <div
          className={`flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br text-[11px] font-bold text-white ${player.avatarGradient}`}
          title={player.fullName}
        >
          {player.avatarInitials}
        </div>
        <span
          className={`font-headline absolute -right-1 -bottom-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold shadow ${numberBadgeClass(player.numberTone)} ${
            player.numberTone === 'primary' && player.id === 'st'
              ? 'text-tertiary-fixed-dim'
              : ''
          }`}
        >
          #{player.number}
        </span>
      </div>
      <span className="font-headline mt-1 bg-surface px-2 py-0.5 text-[11px] font-bold whitespace-nowrap text-on-surface shadow-sm">
        {player.shortName}
      </span>
      <span
        className={`font-kicker mt-0.5 bg-surface-container-lowest/90 px-1.5 text-[9px] font-bold tracking-tight uppercase ${roleClass(player.roleTone)}`}
      >
        {player.roleLabel}
      </span>
    </div>
  )
}

export function SquadDetailPitch({
  players,
  benchPlayers,
  benchPlanLabel,
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
            Hücum Yönü: Aşağıdan Yukarı ↑
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-space-xs">
          <button
            type="button"
            className="font-label flex items-center gap-1 bg-surface-container px-space-sm py-1 text-xs text-label-md text-on-surface uppercase transition-colors hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-[15px]">straighten</span> Isı Haritası
          </button>
          <button
            type="button"
            className="font-label flex items-center gap-1 bg-surface-container px-space-sm py-1 text-xs text-label-md text-on-surface uppercase transition-colors hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-[15px]">arrow_forward</span> Pres Hatları
          </button>
          <button
            type="button"
            className="font-label flex items-center gap-1 bg-secondary-container px-space-sm py-1 text-xs text-label-md font-bold text-on-secondary-container uppercase"
          >
            <span className="material-symbols-outlined text-[15px]">fullscreen</span> Tam Ekran
          </button>
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
          <path
            d="M 280 270 Q 320 200 370 150"
            fill="none"
            markerEnd="url(#tactical-arrow)"
            stroke="#8ccefd"
            strokeDasharray="6,4"
            strokeWidth="2.5"
          />
          <path
            d="M 430 350 Q 520 320 590 260"
            fill="none"
            markerEnd="url(#tactical-arrow)"
            stroke="#f7bd5b"
            strokeDasharray="6,4"
            strokeWidth="2.5"
          />
          <path
            d="M 680 700 L 700 480"
            fill="none"
            markerEnd="url(#tactical-arrow)"
            stroke="#8ccefd"
            strokeDasharray="5,5"
            strokeWidth="2"
          />
        </svg>

        {players.map((player) => (
          <PitchPlayerMarker key={player.id} player={player} />
        ))}
      </div>

      <div className="bg-surface-container-lowest p-space-md shadow-sm">
        <div className="mb-space-sm flex flex-col justify-between gap-space-xs sm:flex-row sm:items-center">
          <span className="font-kicker text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
            HAMLE OYUNCULARI • YEDEK KULÜBESİ ({benchPlayers.length} OYUNCU)
          </span>
          <span className="font-body text-body-sm font-bold text-secondary">{benchPlanLabel}</span>
        </div>
        <div className="grid grid-cols-2 gap-space-xs text-center sm:grid-cols-3 md:grid-cols-6">
          {benchPlayers.map((player) => (
            <div
              key={`${player.number}-${player.name}`}
              className="flex flex-col items-center bg-surface-container-low p-2"
            >
              <span className="font-kicker text-kicker text-on-surface-variant">
                #{player.number} {player.position}
              </span>
              <span className="font-headline text-xs font-bold text-on-surface">{player.name}</span>
              <span className={`text-[10px] ${benchRoleClass(player.roleTone)}`}>{player.role}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
