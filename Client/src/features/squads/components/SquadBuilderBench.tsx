import { useMemo, useState, type DragEvent } from 'react'
import type { BenchSlotId, BuilderPlayer } from '../utils/squadBuilderTypes'
import { BENCH_SLOT_IDS } from '../utils/squadBuilderPlaceholders'
import {
  readSquadPlayerDragData,
  setSquadPlayerDragData,
} from '../utils/squadBuilderDnD'
import { SquadPlayerPickerMenu } from './SquadPlayerPickerMenu'

type SquadBuilderBenchProps = {
  assignments: Partial<Record<BenchSlotId, string>>
  playersById: Map<string, BuilderPlayer>
  availablePlayers: BuilderPlayer[]
  onClearSlot: (slotId: BenchSlotId) => void
  onAssignToSlot: (slotId: BenchSlotId, playerId: string) => void
  onDropPlayer: (targetSlotId: BenchSlotId, playerId: string, sourceSlotId?: string) => void
}

export function SquadBuilderBench({
  assignments,
  playersById,
  availablePlayers,
  onClearSlot,
  onAssignToSlot,
  onDropPlayer,
}: SquadBuilderBenchProps) {
  const [dropTargetSlotId, setDropTargetSlotId] = useState<BenchSlotId | null>(null)
  const [openPickerSlotId, setOpenPickerSlotId] = useState<BenchSlotId | null>(null)
  const filled = BENCH_SLOT_IDS.filter((slotId) => Boolean(assignments[slotId])).length

  const candidates = useMemo(
    () =>
      [...availablePlayers].sort(
        (a, b) => Number(a.number) - Number(b.number) || a.name.localeCompare(b.name, 'tr'),
      ),
    [availablePlayers],
  )

  return (
    <div className="flex flex-col gap-space-sm bg-surface-container-lowest p-space-md shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-space-xs">
        <h2 className="font-headline flex items-center gap-1.5 text-headline-sm font-bold text-primary uppercase">
          <span className="material-symbols-outlined text-[20px] text-secondary">
            airline_seat_recline_extra
          </span>
          Yedek Kulübesi
        </h2>
        <span className="font-label text-label-md font-bold text-on-surface-variant">
          {filled} / 10
        </span>
      </div>

      <p className="font-body text-body-sm text-on-surface-variant">
        10 yedek zorunludur. Boş yedeğe tıklayıp seçim yaparak veya oyuncu havuzundan sürükleyerek
        kulübenizi doldurunuz.
      </p>

      <div className="grid grid-cols-2 gap-space-xs sm:grid-cols-5">
        {BENCH_SLOT_IDS.map((slotId, index) => {
          const playerId = assignments[slotId]
          const player = playerId ? playersById.get(playerId) : undefined
          const isDropTarget = dropTargetSlotId === slotId
          const isPickerOpen = openPickerSlotId === slotId
          const openPickerUpward = index >= 5

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
                <span className="font-kicker text-[10px] font-bold text-on-surface-variant uppercase">
                  #{player.number} · {player.posGroup}
                </span>
                <button
                  type="button"
                  title="Yedeği kaldır"
                  onClick={() => {
                    onClearSlot(slotId)
                  }}
                  className="absolute top-0.5 right-0.5 hidden h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-error text-on-error shadow group-hover:flex hover:opacity-90"
                >
                  <span className="material-symbols-outlined text-[12px] leading-none">close</span>
                </button>
              </div>
            )
          }

          return (
            <div
              key={slotId}
              className={
                isPickerOpen
                  ? 'relative z-50 flex h-[6.5rem] flex-col'
                  : 'relative z-10 flex h-[6.5rem] flex-col'
              }
              {...dropHandlers}
            >
              <button
                type="button"
                onClick={() => {
                  setOpenPickerSlotId(slotId)
                }}
                className={
                  isDropTarget || isPickerOpen
                    ? 'flex h-full w-full cursor-pointer flex-col items-center justify-center gap-0.5 border border-dashed border-primary bg-transparent p-2 ring-2 ring-primary'
                    : 'flex h-full w-full cursor-pointer flex-col items-center justify-center gap-0.5 border border-dashed border-outline-variant/40 bg-transparent p-2 opacity-70 transition-colors hover:border-primary/50 hover:opacity-100'
                }
              >
                <span className="font-kicker text-[10px] font-bold text-on-surface-variant/80 uppercase">
                  Y{index + 1}
                </span>
                <span className="material-symbols-outlined text-[18px] text-outline">
                  person_add
                </span>
                <span className="font-label text-[10px] text-on-surface-variant/80 uppercase">
                  Boş
                </span>
              </button>
              {isPickerOpen ? (
                <SquadPlayerPickerMenu
                  title={`Y${index + 1} · Oyuncu seç`}
                  candidates={candidates}
                  openUpward={openPickerUpward}
                  emptyLabel="Seçilebilecek oyuncu kalmadı."
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
