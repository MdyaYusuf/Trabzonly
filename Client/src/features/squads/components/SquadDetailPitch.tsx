import { CaptainArmband } from './CaptainArmband'
import { SquadPitchSlotCaption } from './SquadPitchSlotCaption'
import {
  getFormationConfig,
  pitchRowGridClass,
  pitchRowShiftClass,
  pitchSlotNudgeClass,
} from '../utils/squadBuilderPlaceholders'
import type { BuilderFormationId, FormationSlot } from '../utils/squadBuilderTypes'
import type { SquadBenchPlayer, SquadPitchPlayer } from '../utils/squadDetailTypes'

type SquadDetailPitchProps = {
  formation: string
  players: SquadPitchPlayer[]
  benchPlayers: SquadBenchPlayer[]
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
          <span className="font-kicker text-[12px] font-bold tracking-[0.08em] text-white/80 uppercase">
            {slot.label}
          </span>
        </div>
        <SquadPitchSlotCaption empty name="Boş" isGk={isGk} />
      </div>
    )
  }

  return (
    <div className="group relative flex cursor-pointer flex-col items-center transition-transform hover:scale-105">
      <div
        className={`relative h-12 w-12 cursor-pointer rounded-full p-0.5 shadow-lg ring-2 ${
          isGk
            ? 'bg-tertiary ring-tertiary-fixed group-hover:ring-white'
            : 'bg-primary-container ring-white/60 group-hover:ring-secondary-container'
        }`}
      >
        <div
          className={`flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br ${player.avatarGradient}`}
          title={player.fullName}
        >
          <span className="font-kicker text-[12px] font-bold tracking-[0.08em] text-white uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
            {slot.label}
          </span>
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
      <SquadPitchSlotCaption
        name={player.shortName}
        roleLabel={player.roleLabel}
        roleDescription={player.roleDescription}
        isGk={isGk}
      />
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
            <rect height="150" width="360" x="180" y="24" />
            <rect height="56" width="180" x="270" y="24" />
            <path d="M 300 174 A 60 60 0 0 0 420 174" />
            <rect height="150" width="360" x="180" y="786" />
            <rect height="56" width="180" x="270" y="880" />
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
                className={`${pitchRowGridClass(row.length, formationConfig.rowSpreads?.[rowIndex])} ${pitchRowShiftClass(formationConfig.rowShifts?.[rowIndex])} ${isFirst ? 'pt-6 sm:pt-8' : ''} ${isLast ? 'pb-2' : ''}`}
              >
                {row.map((slot) => (
                  <div
                    key={slot.id}
                    className={`flex justify-center ${pitchSlotNudgeClass(slot.id)}`}
                  >
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
          <span className="font-kicker flex items-center gap-1.5 text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
            <span className="material-symbols-outlined text-[18px] text-secondary">
              airline_seat_recline_extra
            </span>
            YEDEK KULÜBESİ ({benchPlayers.length} OYUNCU)
          </span>
        </div>
        <div className="grid grid-cols-2 gap-space-xs text-center sm:grid-cols-5">
          {benchPlayers.map((player) => (
            <div
              key={`${player.playerId}-${player.name}`}
              className="flex flex-col items-center gap-0.5 bg-surface-container-low p-2"
            >
              <span className="font-kicker text-kicker text-on-surface-variant">
                #{player.number}
              </span>
              <span className="font-headline text-xs font-bold text-on-surface">{player.name}</span>
              <span className="font-kicker text-[10px] font-bold tracking-wider text-secondary uppercase">
                {player.position}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
