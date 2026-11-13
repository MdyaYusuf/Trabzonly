import type { FormationRowSpread } from '../utils/squadBuilderTypes'
import type { PitchColumn, PitchPlayer } from '../utils/squadsGalleryTypes'

type SquadPitchPreviewProps = {
  formationLabel: string
  columns: PitchColumn[]
}

function columnLayoutClass(
  playerCount: number,
  spread?: FormationRowSpread,
): string {
  if (playerCount <= 1) {
    return 'flex flex-col items-center'
  }

  if (spread === 'wide' || spread === 'edge') {
    return 'flex h-full w-full flex-col justify-between py-0.5'
  }

  if (spread === 'narrow') {
    return 'flex h-[56%] w-full flex-col justify-around self-center'
  }

  if (spread === 'relaxed') {
    return 'flex h-[82%] w-full flex-col justify-around self-center'
  }

  return 'flex h-full w-full flex-col justify-around py-1'
}

function previewSlotNudgeClass(slotId?: string): string {
  if (
    slotId === 'LB' ||
    slotId === 'RB' ||
    slotId === 'LM' ||
    slotId === 'RM'
  ) {
    return 'translate-x-2.5'
  }

  return ''
}

function PlayerDot({
  player,
  isEdge,
}: {
  player: PitchPlayer
  isEdge: boolean
}) {
  const sizeClass = isEdge ? 'h-6 w-6 text-[9px]' : 'h-5 w-5 text-[8px]'

  return (
    <div
      className={`flex flex-col items-center ${previewSlotNudgeClass(player.slotId)}`}
    >
      <div
        className={`rounded-full p-px shadow-md ring-1 ${
          player.isGk
            ? 'bg-tertiary ring-tertiary-fixed/80'
            : 'bg-primary-container/80 ring-white/50'
        }`}
      >
        <span
          className={`flex items-center justify-center rounded-full bg-gradient-to-br font-bold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.55)] ${sizeClass} ${player.avatarGradient}`}
        >
          {player.number}
        </span>
      </div>
      <span
        className={`mt-0.5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.75)] ${
          isEdge ? 'text-[9px] font-bold' : 'text-[8px]'
        }`}
      >
        {player.name}
      </span>
    </div>
  )
}

export function SquadPitchPreview({ formationLabel, columns }: SquadPitchPreviewProps) {
  const colCount = Math.max(columns.length, 1)

  return (
    <div className="relative flex h-60 flex-col justify-between overflow-hidden bg-[#163828] p-3">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 400 240"
        aria-hidden="true"
      >
        <rect fill="#1b4332" height="40" opacity="0.4" width="400" y="0" />
        <rect fill="#1b4332" height="40" opacity="0.4" width="400" y="80" />
        <rect fill="#1b4332" height="40" opacity="0.4" width="400" y="160" />
        <rect fill="none" height="220" stroke="#FFFFFF" strokeWidth="1.2" width="370" x="15" y="10" />
        <line stroke="#FFFFFF" strokeWidth="1.2" x1="200" x2="200" y1="10" y2="230" />
        <circle cx="200" cy="120" fill="none" r="36" stroke="#FFFFFF" strokeWidth="1.2" />
        <rect fill="none" height="120" stroke="#FFFFFF" strokeWidth="1.2" width="60" x="15" y="60" />
        <rect fill="none" height="70" stroke="#FFFFFF" strokeWidth="1.2" width="22" x="15" y="85" />
        <rect fill="none" height="120" stroke="#FFFFFF" strokeWidth="1.2" width="60" x="325" y="60" />
        <rect fill="none" height="70" stroke="#FFFFFF" strokeWidth="1.2" width="22" x="363" y="85" />
      </svg>

      <div className="relative z-10 flex items-center gap-2">
        <span className="font-label bg-secondary-container/90 px-2 py-0.5 text-[10px] font-bold text-on-secondary-container uppercase">
          {formationLabel}
        </span>
      </div>

      <div
        className="relative z-10 my-1 grid flex-1 items-center justify-items-center text-center"
        style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
      >
        {columns.map((column, columnIndex) => {
          const isEdge = columnIndex === 0 || columnIndex === columns.length - 1

          return (
            <div
              key={`col-${columnIndex}`}
              className={columnLayoutClass(column.players.length, column.spread)}
            >
              {column.players.map((player) => (
                <PlayerDot
                  key={`${player.slotId ?? player.number}-${player.name}`}
                  player={player}
                  isEdge={isEdge}
                />
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
