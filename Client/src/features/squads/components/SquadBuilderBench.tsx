import type { BenchSlotId, BuilderPlayer } from '../utils/squadBuilderTypes'
import { BENCH_SLOT_IDS } from '../utils/squadBuilderPlaceholders'

type SquadBuilderBenchProps = {
  assignments: Partial<Record<BenchSlotId, string>>
  playersById: Map<string, BuilderPlayer>
  selectedSlotId: BenchSlotId | null
  onSelectSlot: (slotId: BenchSlotId) => void
  onClearSlot: (slotId: BenchSlotId) => void
}

export function SquadBuilderBench({
  assignments,
  playersById,
  selectedSlotId,
  onSelectSlot,
  onClearSlot,
}: SquadBuilderBenchProps) {
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
        10 yedek zorunludur. Slot seçip havuzdan oyuncu ekleyin.
      </p>

      <div className="grid grid-cols-2 gap-space-xs sm:grid-cols-5">
        {BENCH_SLOT_IDS.map((slotId, index) => {
          const playerId = assignments[slotId]
          const player = playerId ? playersById.get(playerId) : undefined
          const isSelected = selectedSlotId === slotId

          if (player) {
            return (
              <div
                key={slotId}
                className={
                  isSelected
                    ? 'relative flex flex-col items-center gap-0.5 bg-primary-container/15 p-2 ring-2 ring-primary'
                    : 'relative flex flex-col items-center gap-0.5 bg-surface-container-low p-2'
                }
              >
                <button
                  type="button"
                  onClick={() => {
                    onSelectSlot(slotId)
                  }}
                  className="flex w-full flex-col items-center gap-0.5"
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
                </button>
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
            <button
              key={slotId}
              type="button"
              onClick={() => {
                onSelectSlot(slotId)
              }}
              className={
                isSelected
                  ? 'flex flex-col items-center justify-center gap-0.5 border border-dashed border-primary bg-primary-container/10 p-2 ring-2 ring-primary'
                  : 'flex flex-col items-center justify-center gap-0.5 border border-dashed border-outline-variant/50 bg-surface-container-low p-2 transition-colors hover:border-primary hover:bg-surface-container'
              }
            >
              <span className="font-kicker text-[10px] font-bold text-on-surface-variant uppercase">
                Y{index + 1}
              </span>
              <span className="material-symbols-outlined text-[18px] text-outline">person_add</span>
              <span className="font-label text-[10px] text-on-surface-variant uppercase">Boş</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
