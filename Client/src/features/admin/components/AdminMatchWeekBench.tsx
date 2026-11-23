import { useMemo, useState, type DragEvent } from 'react'
import { SquadPlayerPickerMenu } from '@/features/squads/components/SquadPlayerPickerMenu'
import {
  readSquadPlayerDragData,
  setSquadPlayerDragData,
} from '@/features/squads/utils/squadBuilderDnD'
import type { BenchSlotId, BuilderPlayer } from '@/features/squads/utils/squadBuilderTypes'
import { builderBadgeClass } from '@/features/squads/utils/squadPoolCategories'
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
    <div className="flex flex-col gap-space-sm bg-surface-container-lowest p-space-md shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-space-xs">
        <h2 className="font-headline flex items-center gap-1.5 text-headline-sm font-bold text-primary uppercase">
          <span className="material-symbols-outlined text-[20px] text-secondary">
            airline_seat_recline_extra
          </span>
          Oyuna Sonradan Girenler
        </h2>
        <span className="font-label text-label-md font-bold text-on-surface-variant">
          {filled} / {MATCH_WEEK_MAX_BENCH}
        </span>
      </div>

      <p className="font-body text-body-sm text-on-surface-variant">
        Boş bırakılabilir. Oyuna sonradan giren bütün oyuncuları ekleyebilirsiniz.
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
            const isGk = player.posGroup === 'GK'

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
                    ? 'group relative z-10 flex h-[6.5rem] cursor-pointer flex-col items-center justify-center gap-1 overflow-hidden border border-primary bg-primary-container/20 p-2 shadow-sm ring-2 ring-primary active:cursor-grabbing'
                    : 'group relative z-10 flex h-[6.5rem] cursor-pointer flex-col items-center justify-center gap-1 overflow-hidden border border-primary/40 bg-primary-container/10 p-2 shadow-sm active:cursor-grabbing'
                }
              >
                <div className="relative">
                  <div
                    className={`relative h-11 w-11 rounded-full p-0.5 shadow-lg ring-2 transition-[box-shadow] ${
                      isGk
                        ? 'bg-tertiary ring-tertiary-fixed group-hover:ring-white'
                        : 'bg-primary-container ring-white/60 group-hover:ring-secondary-container'
                    }`}
                  >
                    <div
                      className={`flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br text-[12px] font-bold text-white ${player.avatarGradient}`}
                    >
                      {player.initials}
                    </div>
                  </div>
                  <span
                    className={`font-kicker absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold shadow ${
                      isGk
                        ? 'bg-tertiary-container text-on-tertiary-container'
                        : 'bg-primary text-on-primary'
                    }`}
                  >
                    #{player.number}
                  </span>
                  {player.badge ? (
                    <span
                      className={`font-kicker absolute -bottom-1 left-1/2 z-[1] -translate-x-1/2 px-1 py-px text-[8px] font-bold uppercase ${builderBadgeClass(player.badge.tone)}`}
                    >
                      {player.badge.label}
                    </span>
                  ) : null}
                </div>
                <span
                  className="font-headline w-full truncate text-center text-[11px] font-bold text-primary"
                  title={player.shortName}
                >
                  {player.shortName}
                </span>
                <span className="font-body w-full truncate text-center text-[10px] text-on-surface-variant">
                  {player.roleHint}
                </span>
                <button
                  type="button"
                  title="Yedeği kaldır"
                  onClick={() => {
                    onClearSlot(slotId)
                  }}
                  className="absolute top-0.5 right-0.5 hidden h-4 w-4 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-error text-on-error shadow group-hover:flex hover:opacity-90"
                >
                  <span className="material-symbols-outlined origin-center scale-[0.65] text-[12px] leading-none">
                    close
                  </span>
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
                  openUpward
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
