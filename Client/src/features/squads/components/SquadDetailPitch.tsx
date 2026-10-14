import { CaptainArmband } from './CaptainArmband'
import { getFormationConfig } from '../utils/squadBuilderPlaceholders'
import type { BuilderFormationId, FormationSlot } from '../utils/squadBuilderTypes'
import type { SquadBenchPlayer, SquadPitchPlayer } from '../utils/squadDetailTypes'

type SquadDetailPitchProps = {
  formation: string
  players: SquadPitchPlayer[]
  benchPlayers: SquadBenchPlayer[]
}

function rowGridClass(count: number) {
  if (count === 1) {
    return 'flex w-full justify-center'
  }

  if (count === 2) {
    return 'grid w-full grid-cols-2 items-center px-16'
  }

  if (count === 3) {
    return 'grid w-full grid-cols-3 items-center px-4'
  }

  if (count === 5) {
    return 'grid w-full grid-cols-5 items-center px-1'
  }

  return 'grid w-full grid-cols-4 items-center px-3'
}

function DetailSlotCard({
  slot,
  player,
}: {
  slot: FormationSlot
  player?: SquadPitchPlayer
}) {
  const isGk = slot.id === 'GK'

  if (!player) {
    return (
      <div className="relative flex flex-col items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-white/50 bg-black/20 shadow-lg">
          <span className="material-symbols-outlined text-[24px] text-white/70">person</span>
        </div>
        <div className="mt-1 bg-surface-container-lowest/95 px-2 py-0.5 text-center shadow-sm">
          <span className="font-headline block text-[12px] font-bold text-primary">
            {slot.label}
          </span>
          <span className="font-kicker block text-[9px] font-bold text-on-surface-variant uppercase">
            Boş
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="group relative flex flex-col items-center transition-transform hover:scale-105">
      <div
        className={`relative h-12 w-12 rounded-full p-0.5 shadow-lg ring-2 ${
          isGk
            ? 'bg-tertiary ring-tertiary-fixed group-hover:ring-white'
            : 'bg-primary-container ring-white/60 group-hover:ring-secondary-container'
        }`}
      >
        <div
          className={`flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-white ${player.avatarGradient}`}
          title={player.fullName}
        >
          {player.avatarInitials}
        </div>
        {player.isCaptain ? <CaptainArmband side="left" /> : null}
        <span
          className={`font-kicker absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold shadow ${
            isGk
              ? 'bg-tertiary-container text-on-tertiary-container'
              : 'bg-primary text-on-primary'
          }`}
        >
          #{player.number}
        </span>
      </div>
      <div className="mt-1 bg-surface-container-lowest/95 px-2 py-0.5 text-center shadow-sm">
        <span className="font-headline block text-[12px] leading-tight font-bold text-primary">
          {player.shortName}
        </span>
        <span
          className={`font-kicker block text-[9px] font-bold uppercase ${
            isGk ? 'text-tertiary' : 'text-secondary'
          }`}
        >
          {slot.label} • {slot.roleLabel}
        </span>
      </div>
    </div>
  )
}

export function SquadDetailPitch({
  formation,
  players,
  benchPlayers,
}: SquadDetailPitchProps) {
  const formationConfig = getFormationConfig(formation.trim() as BuilderFormationId)
  const playersBySlotId = new Map(players.map((player) => [player.slotId, player]))

  return (
    <div className="flex flex-col gap-space-md lg:col-span-8">
      <div className="relative h-[600px] w-full select-none overflow-hidden bg-[#1e4a2c] shadow-xl sm:h-[660px] md:h-[700px]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#183c24] via-[#1f4e2d] to-[#153520] opacity-95" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_50%,transparent_50%)] bg-[length:100%_48px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(117,183,229,0.12)_0%,transparent_70%)]" />

          <svg
            className="absolute inset-0 h-full w-full stroke-white/40 fill-none"
            preserveAspectRatio="none"
            strokeWidth="2"
            viewBox="0 0 720 960"
            aria-hidden="true"
          >
            <rect height="912" width="672" x="24" y="24" />
            <line x1="24" x2="696" y1="480" y2="480" />
            <circle cx="360" cy="480" r="72" />
            <circle cx="360" cy="480" fill="white" fillOpacity="0.6" r="4" />
            <rect height="150" width="360" x="180" y="24" />
            <rect height="56" width="180" x="270" y="24" />
            <circle cx="360" cy="115" fill="white" fillOpacity="0.6" r="3" />
            <path d="M 300 174 A 60 60 0 0 0 420 174" />
            <rect height="150" width="360" x="180" y="786" />
            <rect height="56" width="180" x="270" y="880" />
            <circle cx="360" cy="845" fill="white" fillOpacity="0.6" r="3" />
            <path d="M 300 786 A 60 60 0 0 1 420 786" />
            <path d="M 24 44 A 20 20 0 0 0 44 24" />
            <path d="M 696 44 A 20 20 0 0 1 676 24" />
            <path d="M 24 916 A 20 20 0 0 1 44 936" />
            <path d="M 696 916 A 20 20 0 0 0 676 936" />
          </svg>
        </div>

        <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 sm:left-6">
          <span className="font-kicker bg-primary/90 px-2.5 py-1 text-[10px] font-bold tracking-widest text-on-primary uppercase">
            TRABZONSPOR
          </span>
          <span className="font-label bg-secondary-container/90 px-2 py-0.5 text-[10px] font-bold text-on-secondary-container uppercase">
            {formationConfig.lineLabel}
          </span>
        </div>

        <div className="relative z-20 flex h-full w-full flex-col justify-between p-3 sm:p-4">
          {formationConfig.rows.map((row, rowIndex) => {
            const isFirst = rowIndex === 0
            const isLast = rowIndex === formationConfig.rows.length - 1

            return (
              <div
                key={`row-${rowIndex}`}
                className={`${rowGridClass(row.length)} ${isFirst ? 'pt-6 sm:pt-8' : ''} ${isLast ? 'pb-2' : ''}`}
              >
                {row.map((slot) => (
                  <div key={slot.id} className="flex justify-center">
                    <DetailSlotCard slot={slot} player={playersBySlotId.get(slot.id)} />
                  </div>
                ))}
              </div>
            )
          })}
        </div>
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
