import { useState, type DragEvent } from 'react'
import type { BenchSlotId, BuilderPlayer } from '../utils/squadBuilderTypes'
import { BENCH_SLOT_IDS } from '../utils/squadBuilderPlaceholders'
import {
  readSquadPlayerDragData,
  setSquadPlayerDragData,
} from '../utils/squadBuilderDnD'

type SquadBuilderBenchProps = {
  assignments: Partial<Record<BenchSlotId, string>>
  playersById: Map<string, BuilderPlayer>
  onClearSlot: (slotId: BenchSlotId) => void
  onDropPlayer: (targetSlotId: BenchSlotId, playerId: string, sourceSlotId?: string) => void
}

export function SquadBuilderBench({
  assignments,
  playersById,
  onClearSlot,
  onDropPlayer,
}: SquadBuilderBenchProps) {
  const [dropTargetSlotId, setDropTargetSlotId] = useState<BenchSlotId | null>(null)
  const filled = BENCH_SLOT_IDS.filter((slotId) => Boolean(assignments[slotId])).length

  return (
    <div className="flex flex-col gap-space-sm bg-surface-container-lowest p-space-md shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-space-xs">
        <h2 className="font-headline flex items-center gap-1.5 text-headline-sm font-bold text-primary uppercase">
          <span className="material-symbols-outlined text-[20px]">airline_seat_recline_extra</span>
          Yedek Kulübesi
        </h2>
        <span className="font-label text-label-md font-bold text-on-surface-variant">
          {filled} / 10
        </span>
      </div>

      <p className="font-body text-body-sm text-on-surface-variant">
        10 yedek zorunludur. Havuzdan sürükleyip bırakın.
      </p>

      <div className="grid grid-cols-2 gap-space-xs sm:grid-cols-5">
        {BENCH_SLOT_IDS.map((slotId, index) => {
          const playerId = assignments[slotId]
          const player = playerId ? playersById.get(playerId) : undefined
          const isDropTarget = dropTargetSlotId === slotId

          const dropHandlers = {
            onDragOver: (event: DragEvent) => {
              event.preventDefault()
              event.dataTransfer.dropEffect = 'move'
              setDropTargetSlotId(slotId)
            },
            onDragLeave: () => {
              setDropTargetSlotId((current) => (current === slotId ? null : current))
            },
            onDrop: (event: DragEvent) => {
              event.preventDefault()
              setDropTargetSlotId(null)
              const payload = readSquadPlayerDragData(event.dataTransfer)

              if (!payload) {
                return
              }

              onDropPlayer(slotId, payload.playerId, payload.sourceSlotId)
            },
          }

          if (player) {
            return (
              <div
                key={slotId}
                draggable
                onDragStart={(event) => {
                  setSquadPlayerDragData(event.dataTransfer, {
                    playerId: player.id,
                    sourceSlotId: slotId,
                  })
                }}
                {...dropHandlers}
                className={
                  isDropTarget
                    ? 'relative flex cursor-grab flex-col items-center gap-0.5 bg-primary-container/15 p-2 ring-2 ring-primary active:cursor-grabbing'
                    : 'relative flex cursor-grab flex-col items-center gap-0.5 bg-surface-container-low p-2 active:cursor-grabbing'
                }
              >
                <span className="font-kicker text-[10px] font-bold text-on-surface-variant uppercase">
                  Y{index + 1}
                </span>
                <span className="font-headline text-center text-xs font-bold text-on-surface">
                  {player.shortName}
                </span>
                <span className="font-kicker text-[10px] text-on-surface-variant">
                  #{player.number} {player.posGroup}
                </span>
                <button
                  type="button"
                  title="Yedeği kaldır"
                  onClick={() => {
                    onClearSlot(slotId)
                  }}
                  className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center bg-surface-container-highest text-on-surface-variant transition-colors hover:bg-error hover:text-on-error"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </div>
            )
          }

          return (
            <div
              key={slotId}
              {...dropHandlers}
              className={
                isDropTarget
                  ? 'flex flex-col items-center justify-center gap-0.5 border border-dashed border-primary bg-primary-container/10 p-2 ring-2 ring-primary'
                  : 'flex flex-col items-center justify-center gap-0.5 border border-dashed border-outline-variant/50 bg-surface-container-low p-2 transition-colors'
              }
            >
              <span className="font-kicker text-[10px] font-bold text-on-surface-variant uppercase">
                Y{index + 1}
              </span>
              <span className="material-symbols-outlined text-[18px] text-outline">person_add</span>
              <span className="font-label text-[10px] text-on-surface-variant uppercase">Boş</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
