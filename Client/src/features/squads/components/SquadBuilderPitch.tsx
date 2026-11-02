import { useEffect, useMemo, useState, type DragEvent } from 'react'
import type { PositionRoleResponseDto } from '@/features/positions/positionTypes'
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
import {
  pitchRowGridClass,
  pitchRowShiftClass,
  pitchSlotNudgeClass,
} from '../utils/squadBuilderPlaceholders'
import { CaptainArmband } from './CaptainArmband'
import { SquadPitchSlotCaption } from './SquadPitchSlotCaption'
import { SquadPlayerPickerMenu } from './SquadPlayerPickerMenu'

type SquadBuilderPitchProps = {
  formation: FormationConfig
  assignments: Partial<Record<BuilderSlotId, string>>
  roleAssignments: Partial<Record<BuilderSlotId, number>>
  rolesBySlotId: Map<BuilderSlotId, PositionRoleResponseDto[]>
  players: BuilderPlayer[]
  playersById: Map<string, BuilderPlayer>
  assignedPlayerIds: Set<string>
  captainPlayerId: string
  onAssignToSlot: (slotId: BuilderSlotId, playerId: string) => void
  onDropPlayer: (targetSlotId: BuilderSlotId, playerId: string, sourceSlotId?: string) => void
  onClearSlot: (slotId: BuilderSlotId) => void
  onRoleChange: (slotId: BuilderSlotId, roleId: number) => void
}

function SlotCard({
  slot,
  player,
  candidates,
  roleOptions,
  selectedRoleId,
  isPickerOpen,
  isDropTarget,
  openPickerUpward,
  isCaptain,
  onOpenPicker,
  onClosePicker,
  onPick,
  onClear,
  onRoleChange,
  onRoleMenuOpenChange,
  onDragOverSlot,
  onDragLeaveSlot,
  onDropOnSlot,
}: {
  slot: FormationSlot
  player?: BuilderPlayer
  candidates: BuilderPlayer[]
  roleOptions: PositionRoleResponseDto[]
  selectedRoleId?: number
  isPickerOpen: boolean
  isDropTarget: boolean
  openPickerUpward: boolean
  isCaptain: boolean
  onOpenPicker: () => void
  onClosePicker: () => void
  onPick: (playerId: string) => void
  onClear: () => void
  onRoleChange: (roleId: number) => void
  onRoleMenuOpenChange: (open: boolean) => void
  onDragOverSlot: (event: DragEvent) => void
  onDragLeaveSlot: () => void
  onDropOnSlot: (event: DragEvent) => void
}) {
  const isGk = slot.id === 'GK'
  const selectedRole = roleOptions.find((role) => role.id === selectedRoleId)

  if (!player) {
    return (
      <div
        className="relative z-10 flex flex-col items-center"
        onDragOver={onDragOverSlot}
        onDragLeave={onDragLeaveSlot}
        onDrop={onDropOnSlot}
      >
        <button
          type="button"
          onClick={onOpenPicker}
          className={`group flex cursor-pointer flex-col items-center transition-transform hover:scale-105 ${
            isDropTarget ? 'scale-105' : ''
          }`}
        >
          <div
            className={`flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border-2 border-dashed shadow-lg ${
              isDropTarget || isPickerOpen
                ? 'border-secondary-container bg-secondary-container/30'
                : 'border-white/50 bg-black/20'
            }`}
          >
            <span className="font-kicker text-[13px] font-bold tracking-[0.08em] text-white/80 uppercase">
              {slot.label}
            </span>
          </div>
          <SquadPitchSlotCaption empty name="Boş Pozisyon" isGk={isGk} />
        </button>
        {isPickerOpen ? (
          <SquadPlayerPickerMenu
            title={`${slot.label} · Oyuncu seç`}
            candidates={candidates}
            openUpward={openPickerUpward}
            onPick={onPick}
            onClose={onClosePicker}
          />
        ) : null}
      </div>
    )
  }

  return (
    <div
      className={`group relative flex cursor-pointer flex-col items-center transition-transform hover:scale-105 active:cursor-grabbing ${
        isDropTarget ? 'scale-105' : ''
      }`}
      draggable
      onDragStart={(event) => {
        setSquadPlayerDragData(
          event.dataTransfer,
          {
            playerId: player.id,
            sourceSlotId: slot.id,
          },
          slot.label,
        )
      }}
      onDragOver={onDragOverSlot}
      onDragLeave={onDragLeaveSlot}
      onDrop={onDropOnSlot}
    >
      <div
        className={`relative h-14 w-14 cursor-pointer rounded-full p-1 shadow-lg ring-2 ${
          isGk
            ? 'bg-tertiary ring-tertiary-fixed group-hover:ring-white'
            : 'bg-primary-container ring-white/60 group-hover:ring-secondary-container'
        } ${isDropTarget ? 'ring-secondary-container' : ''}`}
        title={player.name}
      >
        <div
          className={`flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br ${player.avatarGradient}`}
        >
          <span className="font-kicker text-[13px] font-bold tracking-[0.08em] text-white uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
            {slot.label}
          </span>
        </div>
        <span
          className={`font-kicker absolute -top-1 -left-1 flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold shadow ${
            isGk
              ? 'bg-tertiary-container text-on-tertiary-container'
              : 'bg-primary text-on-primary'
          }`}
        >
          #{player.number}
        </span>
        {isCaptain ? <CaptainArmband side="right" className="group-hover:hidden" /> : null}
        <button
          type="button"
          title="Pozisyonu Boşalt"
          onClick={(event) => {
            event.stopPropagation()
            onClear()
          }}
          className="absolute -top-1 -right-1 hidden h-6 w-6 items-center justify-center rounded-full bg-error text-on-error shadow group-hover:flex hover:opacity-90"
        >
          <span className="material-symbols-outlined text-[14px]">close</span>
        </button>
      </div>
      <SquadPitchSlotCaption
        name={player.shortName}
        roleLabel={selectedRole?.name ?? slot.roleLabel}
        roleDescription={selectedRole?.description}
        isGk={isGk}
        roleOptions={roleOptions}
        selectedRoleId={selectedRoleId}
        openRoleMenuUpward={openPickerUpward}
        onRoleChange={onRoleChange}
        onRoleMenuOpenChange={onRoleMenuOpenChange}
      />
    </div>
  )
}

export function SquadBuilderPitch({
  formation,
  assignments,
  roleAssignments,
  rolesBySlotId,
  players,
  playersById,
  assignedPlayerIds,
  captainPlayerId,
  onAssignToSlot,
  onDropPlayer,
  onClearSlot,
  onRoleChange,
}: SquadBuilderPitchProps) {
  const [openPickerSlotId, setOpenPickerSlotId] = useState<BuilderSlotId | null>(null)
  const [openRoleMenuSlotId, setOpenRoleMenuSlotId] = useState<BuilderSlotId | null>(null)
  const [dropTargetSlotId, setDropTargetSlotId] = useState<BuilderSlotId | null>(null)

  useEffect(() => {
    setOpenPickerSlotId(null)
    setOpenRoleMenuSlotId(null)
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

  const upwardPickerFromRow = Math.max(0, formation.rows.length - 2)

  return (
    <div className="relative min-h-[600px] w-full select-none overflow-visible bg-[#1e4a2c] shadow-xl sm:min-h-[660px] md:min-h-[700px]">
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
          {formation.lineLabel}
        </span>
      </div>

      <div className="relative z-20 flex min-h-[600px] w-full flex-col justify-between overflow-visible p-3 sm:min-h-[660px] sm:p-4 md:min-h-[700px]">
        {formation.rows.map((row, rowIndex) => {
          const isFirst = rowIndex === 0
          const isLast = rowIndex === formation.rows.length - 1
          const openPickerUpward = rowIndex >= upwardPickerFromRow

          const rowHasOverlay =
            (openPickerSlotId != null &&
              row.some((slot) => slot.id === openPickerSlotId)) ||
            (openRoleMenuSlotId != null &&
              row.some((slot) => slot.id === openRoleMenuSlotId))

          return (
            <div
              key={`row-${rowIndex}`}
              className={`${pitchRowGridClass(row.length, formation.rowSpreads?.[rowIndex])} ${pitchRowShiftClass(formation.rowShifts?.[rowIndex])} ${isFirst ? 'pt-6 sm:pt-8' : ''} ${isLast ? 'pb-2' : ''} ${
                rowHasOverlay ? 'relative z-40' : 'relative z-20'
              }`}
            >
              {row.map((slot) => {
                const playerId = assignments[slot.id]
                const player = playerId ? playersById.get(playerId) : undefined
                const slotElevated =
                  openPickerSlotId === slot.id || openRoleMenuSlotId === slot.id

                return (
                  <div
                    key={slot.id}
                    className={
                      slotElevated
                        ? `relative z-50 flex justify-center ${pitchSlotNudgeClass(slot.id)}`
                        : `relative z-10 flex justify-center ${pitchSlotNudgeClass(slot.id)}`
                    }
                  >
                    <SlotCard
                      slot={slot}
                      player={player}
                      candidates={candidatesBySlot.get(slot.id) ?? []}
                      roleOptions={rolesBySlotId.get(slot.id) ?? []}
                      selectedRoleId={roleAssignments[slot.id]}
                      isPickerOpen={openPickerSlotId === slot.id}
                      isDropTarget={dropTargetSlotId === slot.id}
                      openPickerUpward={openPickerUpward}
                      isCaptain={Boolean(playerId && playerId === captainPlayerId)}
                      onOpenPicker={() => {
                        setOpenRoleMenuSlotId(null)
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
                      onRoleChange={(roleId) => {
                        onRoleChange(slot.id, roleId)
                      }}
                      onRoleMenuOpenChange={(open) => {
                        if (open) {
                          setOpenPickerSlotId(null)
                          setOpenRoleMenuSlotId(slot.id)
                          return
                        }

                        setOpenRoleMenuSlotId((current) =>
                          current === slot.id ? null : current,
                        )
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
