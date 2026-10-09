import { useEffect, useMemo, useRef, useState, type DragEvent } from 'react'
import type {
  BuilderPlayer,
  BuilderSlotId,
  FormationConfig,
  FormationSlot,
} from '../utils/squadBuilderTypes'
import {
  posGroupForSlot,
  readSquadPlayerDragData,
  setSquadPlayerDragData,
} from '../utils/squadBuilderDnD'

type SquadBuilderPitchProps = {
  formation: FormationConfig
  assignments: Partial<Record<BuilderSlotId, string>>
  players: BuilderPlayer[]
  playersById: Map<string, BuilderPlayer>
  assignedPlayerIds: Set<string>
  onAssignToSlot: (slotId: BuilderSlotId, playerId: string) => void
  onDropPlayer: (targetSlotId: BuilderSlotId, playerId: string, sourceSlotId?: string) => void
  onClearSlot: (slotId: BuilderSlotId) => void
}

function SlotPlayerPicker({
  slot,
  candidates,
  onPick,
  onClose,
}: {
  slot: FormationSlot
  candidates: BuilderPlayer[]
  onPick: (playerId: string) => void
  onClose: () => void
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        onClose()
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) {
      return candidates
    }

    return candidates.filter((player) => {
      return (
        player.name.toLowerCase().includes(query) ||
        player.shortName.toLowerCase().includes(query) ||
        player.number.includes(query)
      )
    })
  }, [candidates, search])

  return (
    <div
      ref={rootRef}
      className="absolute top-full left-1/2 z-40 mt-2 w-56 -translate-x-1/2 bg-surface-container-lowest p-2 shadow-xl ring-1 ring-outline-variant/40"
      role="dialog"
      aria-label={`${slot.label} oyuncu seç`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="font-kicker text-[10px] font-bold tracking-widest text-primary uppercase">
          {slot.label} · Seç
        </span>
        <button
          type="button"
          onClick={onClose}
          className="flex h-6 w-6 items-center justify-center text-on-surface-variant hover:text-primary"
          aria-label="Kapat"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>
      <label className="relative mb-2 block">
        <span className="material-symbols-outlined pointer-events-none absolute top-1/2 left-2 -translate-y-1/2 text-[16px] text-on-surface-variant">
          search
        </span>
        <input
          autoFocus
          type="search"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value)
          }}
          placeholder="İsim veya no…"
          className="font-body w-full bg-surface-container py-1.5 pr-2 pl-8 text-[12px] text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </label>
      <div className="flex max-h-48 flex-col gap-1 overflow-y-auto">
        {filtered.map((player) => (
          <button
            key={player.id}
            type="button"
            onClick={() => {
              onPick(player.id)
            }}
            className="flex items-center gap-2 bg-surface-container-low px-2 py-1.5 text-left transition-colors hover:bg-surface-container"
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-[10px] font-bold text-white ${player.avatarGradient}`}
            >
              {player.initials}
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-headline block truncate text-[12px] font-bold text-on-surface">
                {player.name}
              </span>
              <span className="font-kicker text-[9px] text-on-surface-variant uppercase">
                #{player.number} · {player.roleHint}
              </span>
            </div>
          </button>
        ))}
        {filtered.length === 0 ? (
          <p className="font-body px-1 py-2 text-center text-[11px] text-on-surface-variant">
            Uygun oyuncu yok.
          </p>
        ) : null}
      </div>
    </div>
  )
}

function SlotCard({
  slot,
  player,
  candidates,
  isPickerOpen,
  isDropTarget,
  onOpenPicker,
  onClosePicker,
  onPick,
  onClear,
  onDragOverSlot,
  onDragLeaveSlot,
  onDropOnSlot,
}: {
  slot: FormationSlot
  player?: BuilderPlayer
  candidates: BuilderPlayer[]
  isPickerOpen: boolean
  isDropTarget: boolean
  onOpenPicker: () => void
  onClosePicker: () => void
  onPick: (playerId: string) => void
  onClear: () => void
  onDragOverSlot: (event: DragEvent) => void
  onDragLeaveSlot: () => void
  onDropOnSlot: (event: DragEvent) => void
}) {
  const isGk = slot.id === 'GK'

  if (!player) {
    return (
      <div
        className="relative flex flex-col items-center"
        onDragOver={onDragOverSlot}
        onDragLeave={onDragLeaveSlot}
        onDrop={onDropOnSlot}
      >
        <button
          type="button"
          onClick={onOpenPicker}
          className={`group flex flex-col items-center transition-transform hover:scale-105 ${
            isDropTarget ? 'scale-105' : ''
          }`}
        >
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed shadow-lg ${
              isDropTarget || isPickerOpen
                ? 'border-secondary-container bg-secondary-container/30'
                : 'border-white/50 bg-black/20'
            }`}
          >
            <span className="material-symbols-outlined text-[28px] text-white/70">add</span>
          </div>
          <div className="mt-1 bg-surface-container-lowest/95 px-2 py-0.5 text-center shadow-sm">
            <span className="font-headline block text-[12px] font-bold text-primary">
              {slot.label}
            </span>
            <span className="font-kicker block text-[9px] font-bold text-on-surface-variant uppercase">
              Boş Slot
            </span>
          </div>
        </button>
        {isPickerOpen ? (
          <SlotPlayerPicker
            slot={slot}
            candidates={candidates}
            onPick={onPick}
            onClose={onClosePicker}
          />
        ) : null}
      </div>
    )
  }

  return (
    <div
      className={`group relative flex flex-col items-center transition-transform hover:scale-105 ${
        isDropTarget ? 'scale-105' : ''
      }`}
      draggable
      onDragStart={(event) => {
        setSquadPlayerDragData(event.dataTransfer, {
          playerId: player.id,
          sourceSlotId: slot.id,
        })
      }}
      onDragOver={onDragOverSlot}
      onDragLeave={onDragLeaveSlot}
      onDrop={onDropOnSlot}
    >
      <div
        className={`relative h-16 w-16 cursor-grab rounded-full p-1 shadow-lg ring-2 active:cursor-grabbing ${
          isGk
            ? 'bg-tertiary ring-tertiary-fixed group-hover:ring-white'
            : 'bg-primary-container ring-white/60 group-hover:ring-secondary-container'
        } ${isDropTarget ? 'ring-secondary-container' : ''}`}
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
  players,
  playersById,
  assignedPlayerIds,
  onAssignToSlot,
  onDropPlayer,
  onClearSlot,
}: SquadBuilderPitchProps) {
  const [openPickerSlotId, setOpenPickerSlotId] = useState<BuilderSlotId | null>(null)
  const [dropTargetSlotId, setDropTargetSlotId] = useState<BuilderSlotId | null>(null)

  useEffect(() => {
    setOpenPickerSlotId(null)
    setDropTargetSlotId(null)
  }, [formation.id])

  const candidatesBySlot = useMemo(() => {
    const map = new Map<BuilderSlotId, BuilderPlayer[]>()

    for (const row of formation.rows) {
      for (const slot of row) {
        const group = posGroupForSlot(slot.id)
        map.set(
          slot.id,
          players.filter(
            (player) => player.posGroup === group && !assignedPlayerIds.has(player.id),
          ),
        )
      }
    }

    return map
  }, [assignedPlayerIds, formation.rows, players])

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
                const player = playerId ? playersById.get(playerId) : undefined

                return (
                  <div key={slot.id} className="flex justify-center">
                    <SlotCard
                      slot={slot}
                      player={player}
                      candidates={candidatesBySlot.get(slot.id) ?? []}
                      isPickerOpen={openPickerSlotId === slot.id}
                      isDropTarget={dropTargetSlotId === slot.id}
                      onOpenPicker={() => {
                        setOpenPickerSlotId(slot.id)
                      }}
                      onClosePicker={() => {
                        setOpenPickerSlotId(null)
                      }}
                      onPick={(pickedId) => {
                        onAssignToSlot(slot.id, pickedId)
                        setOpenPickerSlotId(null)
                      }}
                      onClear={() => {
                        onClearSlot(slot.id)
                      }}
                      onDragOverSlot={(event) => {
                        event.preventDefault()
                        event.dataTransfer.dropEffect = 'move'
                        setDropTargetSlotId(slot.id)
                      }}
                      onDragLeaveSlot={() => {
                        setDropTargetSlotId((current) =>
                          current === slot.id ? null : current,
                        )
                      }}
                      onDropOnSlot={(event) => {
                        event.preventDefault()
                        setDropTargetSlotId(null)
                        const payload = readSquadPlayerDragData(event.dataTransfer)

                        if (!payload) {
                          return
                        }

                        onDropPlayer(slot.id, payload.playerId, payload.sourceSlotId)
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
