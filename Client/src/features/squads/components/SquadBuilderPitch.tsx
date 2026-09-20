import type {
  BuilderPlayer,
  BuilderSlotId,
  FormationConfig,
  FormationSlot,
} from '../utils/squadBuilderTypes'
import { getPlayerById } from '../utils/squadBuilderPlaceholders'

type SquadBuilderPitchProps = {
  formation: FormationConfig
  assignments: Partial<Record<BuilderSlotId, string>>
  selectedSlotId: BuilderSlotId | null
  onSelectSlot: (slotId: BuilderSlotId) => void
  onClearSlot: (slotId: BuilderSlotId) => void
}

function SlotCard({
  slot,
  player,
  isSelected,
  isGk,
  onSelect,
  onClear,
}: {
  slot: FormationSlot
  player?: BuilderPlayer
  isSelected: boolean
  isGk: boolean
  onSelect: () => void
  onClear: () => void
}) {
  if (!player) {
    return (
      <button
        type="button"
        onClick={onSelect}
        className={`group relative flex flex-col items-center transition-transform hover:scale-105 ${
          isSelected ? 'scale-105' : ''
        }`}
      >
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed shadow-lg ${
            isSelected
              ? 'border-secondary-container bg-secondary-container/30'
              : 'border-white/50 bg-black/20'
          }`}
        >
          <span className="material-symbols-outlined text-[28px] text-white/70">add</span>
        </div>
        <div className="mt-1 bg-surface-container-lowest/95 px-2 py-0.5 text-center shadow-sm">
          <span className="font-headline block text-[12px] font-bold text-primary">{slot.label}</span>
          <span className="font-kicker block text-[9px] font-bold text-on-surface-variant uppercase">
            Boş Slot
          </span>
        </div>
      </button>
    )
  }

  return (
    <div
      className={`group relative flex cursor-pointer flex-col items-center transition-transform hover:scale-105 ${
        isSelected ? 'scale-105' : ''
      }`}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          onSelect()
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div
        className={`relative h-16 w-16 rounded-full p-1 shadow-lg ring-2 ${
          isGk
            ? 'bg-tertiary ring-tertiary-fixed group-hover:ring-white'
            : 'bg-primary-container ring-white/60 group-hover:ring-secondary-container'
        } ${isSelected ? 'ring-secondary-container' : ''}`}
      >
        <div
          className={`flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-white ${player.avatarGradient}`}
        >
          {player.initials}
        </div>
        <span
          className={`font-kicker absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold shadow ${
            isGk
              ? 'bg-tertiary-container text-on-tertiary-container'
              : 'bg-primary text-on-primary'
          }`}
        >
          #{player.number}
        </span>
        {isGk ? (
          <span className="font-kicker absolute -bottom-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-tertiary-fixed text-[10px] font-bold text-on-tertiary-fixed shadow ring-1 ring-white">
            C
          </span>
        ) : null}
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
          {player.isDomestic && slot.id === 'LB' ? ' (TR)' : ''}
          {isGk ? ' (TR)' : ''}
        </span>
      </div>
      <div className="absolute -top-2 -left-2 hidden items-center gap-1 group-hover:flex">
        <button
          type="button"
          title="Pozisyonu Boşalt"
          onClick={(event) => {
            event.stopPropagation()
            onClear()
          }}
          className="flex h-5 w-5 items-center justify-center rounded-full bg-error text-on-error shadow hover:opacity-90"
        >
          <span className="material-symbols-outlined text-[13px]">close</span>
        </button>
      </div>
    </div>
  )
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

export function SquadBuilderPitch({
  formation,
  assignments,
  selectedSlotId,
  onSelectSlot,
  onClearSlot,
}: SquadBuilderPitchProps) {
  return (
    <div className="relative w-full select-none overflow-hidden bg-[#1e4a2c] shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-b from-[#183c24] via-[#1f4e2d] to-[#153520] opacity-95" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_50%,transparent_50%)] bg-[length:100%_48px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(117,183,229,0.12)_0%,transparent_70%)]" />

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full stroke-white/40 fill-none"
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

      <svg
        className="pointer-events-none absolute inset-0 z-10 h-full w-full"
        viewBox="0 0 720 960"
        aria-hidden="true"
      >
        <line
          stroke="#75B7E5"
          strokeDasharray="6,4"
          strokeOpacity="0.7"
          strokeWidth="2.5"
          x1="260"
          x2="360"
          y1="590"
          y2="430"
        />
        <line
          stroke="#75B7E5"
          strokeDasharray="6,4"
          strokeOpacity="0.8"
          strokeWidth="2.5"
          x1="360"
          x2="360"
          y1="410"
          y2="190"
        />
        <path
          d="M 600 710 Q 640 540 590 390"
          fill="none"
          stroke="#D39D3F"
          strokeDasharray="4,4"
          strokeOpacity="0.85"
          strokeWidth="2.5"
        />
        <polygon fill="#D39D3F" points="590,380 584,394 596,392" />
        <path
          d="M 140 370 Q 210 320 290 200"
          fill="none"
          stroke="#ffdad6"
          strokeDasharray="3,3"
          strokeOpacity="0.6"
          strokeWidth="2"
        />
      </svg>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10">
        <span className="font-headline text-[64px] font-extrabold tracking-widest text-white uppercase sm:text-[96px]">
          TRABZON
        </span>
      </div>

      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 sm:left-6">
        <span className="font-kicker bg-primary/90 px-2.5 py-1 text-[10px] font-bold tracking-widest text-on-primary uppercase">
          PAPARA PARK • AKYAZI
        </span>
        <span className="font-label bg-secondary-container/90 px-2 py-0.5 text-[10px] font-bold text-on-secondary-container uppercase">
          {formation.lineLabel}
        </span>
      </div>

      <div className="relative z-20 flex h-[640px] w-full flex-col justify-between p-3 sm:h-[720px] sm:p-4 md:h-[760px]">
        {formation.rows.map((row, rowIndex) => {
          const isFirst = rowIndex === 0
          const isLast = rowIndex === formation.rows.length - 1

          return (
            <div
              key={`row-${rowIndex}`}
              className={`${rowGridClass(row.length)} ${isFirst ? 'pt-6 sm:pt-8' : ''} ${isLast ? 'pb-2' : ''}`}
            >
              {row.map((slot) => {
                const playerId = assignments[slot.id]
                const player = playerId ? getPlayerById(playerId) : undefined

                return (
                  <div key={slot.id} className="flex justify-center">
                    <SlotCard
                      slot={slot}
                      player={player}
                      isSelected={selectedSlotId === slot.id}
                      isGk={slot.id === 'GK'}
                      onSelect={() => {
                        onSelectSlot(slot.id)
                      }}
                      onClear={() => {
                        onClearSlot(slot.id)
                      }}
                    />
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
