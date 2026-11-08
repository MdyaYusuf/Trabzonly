import { useMemo, useState, type DragEvent } from 'react'
import { SquadPlayerPickerMenu } from '@/features/squads/components/SquadPlayerPickerMenu'
import {
  readSquadPlayerDragData,
  setSquadPlayerDragData,
} from '@/features/squads/utils/squadBuilderDnD'
import type { BenchSlotId, BuilderPlayer } from '@/features/squads/utils/squadBuilderTypes'
import {
  MATCH_WEEK_BENCH_SLOT_IDS,
  MATCH_WEEK_MAX_BENCH,
} from '../utils/adminMatchWeekLineupUtils'

type AdminMatchWeekBenchProps = {
  assignments: Partial<Record<BenchSlotId, string>>
  playersById: Map<string, BuilderPlayer>
  availablePlayers: BuilderPlayer[]
  onClearSlot: (slotId: BenchSlotId) => void
  onAssignToSlot: (slotId: BenchSlotId, playerId: string) => void
  onDropPlayer: (targetSlotId: BenchSlotId, playerId: string, sourceSlotId?: string) => void
}

export function AdminMatchWeekBench({
  assignments,
  playersById,
  availablePlayers,
  onClearSlot,
  onAssignToSlot,
  onDropPlayer,
}: AdminMatchWeekBenchProps) {
  const [dropTargetSlotId, setDropTargetSlotId] = useState<BenchSlotId | null>(null)
  const [openPickerSlotId, setOpenPickerSlotId] = useState<BenchSlotId | null>(null)
  const filled = MATCH_WEEK_BENCH_SLOT_IDS.filter((slotId) => Boolean(assignments[slotId])).length

  const candidates = useMemo(
    () =>
      [...availablePlayers].sort(
        (a, b) => Number(a.number) - Number(b.number) || a.name.localeCompare(b.name, 'tr'),
      ),
    [availablePlayers],
  )

  return (
    <div className="flex flex-col gap-space-sm border border-outline-variant/40 bg-surface p-space-md">
      <div className="flex flex-wrap items-center justify-between gap-space-xs">
        <h2 className="font-headline flex items-center gap-1.5 text-headline-sm font-bold text-primary uppercase">
          <span className="material-symbols-outlined text-[20px] text-secondary">
            airline_seat_recline_extra
          </span>
          Yedek Kulübesi
        </h2>
        <span className="font-label text-label-md font-bold text-on-surface-variant">
          {filled} / {MATCH_WEEK_MAX_BENCH}
        </span>
      </div>

      <p className="font-body text-body-sm text-on-surface-variant">
        En fazla {MATCH_WEEK_MAX_BENCH} yedek. Boş bırakılabilir.
      </p>

      <div className="grid grid-cols-2 gap-space-xs sm:grid-cols-3 lg:grid-cols-6">
        {MATCH_WEEK_BENCH_SLOT_IDS.map((slotId, index) => {
          const playerId = assignments[slotId]
          const player = playerId ? playersById.get(playerId) : undefined
          const isDropTarget = dropTargetSlotId === slotId
          const isPickerOpen = openPickerSlotId === slotId

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
                  setSquadPlayerDragData(
                    event.dataTransfer,
                    {
                      playerId: player.id,
                      sourceSlotId: slotId,
                    },
                    player.initials,
                  )
                }}
                {...dropHandlers}
                className={
                  isDropTarget
                    ? 'group relative z-10 flex h-[6.5rem] cursor-pointer flex-col items-center gap-1 overflow-hidden border border-primary bg-primary-container/20 p-2 shadow-sm ring-2 ring-primary active:cursor-grabbing'
                    : 'group relative z-10 flex h-[6.5rem] cursor-pointer flex-col items-center gap-1 overflow-hidden border border-primary/40 bg-primary-container/10 p-2 shadow-sm active:cursor-grabbing'
                }
              >
                <span className="font-kicker text-[10px] font-bold text-primary uppercase">
                  Y{index + 1}
                </span>
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-[10px] font-bold text-white ${player.avatarGradient}`}
                >
                  {player.initials}
                </div>
                <span
                  className="font-headline w-full truncate text-center text-xs font-bold text-primary"
                  title={player.shortName}
                >
                  {player.shortName}
                </span>
                <button
                  type="button"
                  title="Boşalt"
                  onClick={() => {
                    onClearSlot(slotId)
                  }}
                  className="absolute top-1 right-1 hidden h-5 w-5 cursor-pointer items-center justify-center bg-error text-on-error group-hover:flex"
                >
                  <span className="material-symbols-outlined text-[12px]">close</span>
                </button>
              </div>
            )
          }

          return (
            <div key={slotId} className="relative z-10" {...dropHandlers}>
              <button
                type="button"
                onClick={() => {
                  setOpenPickerSlotId(slotId)
                }}
                className={
                  isDropTarget || isPickerOpen
                    ? 'flex h-[6.5rem] w-full cursor-pointer flex-col items-center justify-center gap-1 border border-dashed border-primary bg-primary-container/10 p-2'
                    : 'flex h-[6.5rem] w-full cursor-pointer flex-col items-center justify-center gap-1 border border-dashed border-outline-variant/60 p-2 hover:border-primary'
                }
              >
                <span className="font-kicker text-[10px] font-bold text-on-surface-variant uppercase">
                  Y{index + 1}
                </span>
                <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
                  person_add
                </span>
              </button>
              {isPickerOpen ? (
                <SquadPlayerPickerMenu
                  title={`Yedek ${index + 1} · Oyuncu seç`}
                  candidates={candidates}
                  openUpward={index >= 3}
                  onPick={(pickedId) => {
                    onAssignToSlot(slotId, pickedId)
                    setOpenPickerSlotId(null)
                  }}
                  onClose={() => {
                    setOpenPickerSlotId(null)
                  }}
                />
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}
