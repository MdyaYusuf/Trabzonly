import type {
  AssignmentSlotId,
  BuilderPlayer,
  BuilderPosGroup,
} from '@/features/squads/utils/squadBuilderTypes'
import { isBenchSlotId } from '@/features/squads/utils/squadBuilderPlaceholders'
import { setSquadPlayerDragData } from '@/features/squads/utils/squadBuilderDnD'
import { MATCH_WEEK_MAX_BENCH } from '../utils/adminMatchWeekLineupUtils'

type AdminMatchWeekPlayerPoolProps = {
  players: BuilderPlayer[]
  assignments: Partial<Record<AssignmentSlotId, string>>
  search: string
  posFilter: BuilderPosGroup
  starterFilled: number
  benchFilled: number
  onSearchChange: (value: string) => void
  onPosFilterChange: (value: BuilderPosGroup) => void
  onAssign: (playerId: string) => void
}

const posTabs: { id: BuilderPosGroup; label: string }[] = [
  { id: 'ALL', label: 'Tümü' },
  { id: 'GK', label: 'Kaleci' },
  { id: 'DF', label: 'Defans' },
  { id: 'MF', label: 'Orta Saha' },
  { id: 'FW', label: 'Forvet' },
]

function slotLabelForPlayer(
  assignments: Partial<Record<AssignmentSlotId, string>>,
  playerId: string,
): string | null {
  const entry = Object.entries(assignments).find(([, id]) => id === playerId)

  if (!entry) {
    return null
  }

  return entry[0]
}

export function AdminMatchWeekPlayerPool({
  players,
  assignments,
  search,
  posFilter,
  starterFilled,
  benchFilled,
  onSearchChange,
  onPosFilterChange,
  onAssign,
}: AdminMatchWeekPlayerPoolProps) {
  const startersComplete = starterFilled >= 11

  const filtered = players.filter((player) => {
    if (posFilter !== 'ALL' && player.posGroup !== posFilter) {
      return false
    }

    const query = search.trim().toLowerCase()

    if (!query) {
      return true
    }

    return (
      player.name.toLowerCase().includes(query) ||
      player.number.includes(query) ||
      player.shortName.toLowerCase().includes(query)
    )
  })

  return (
    <div className="flex w-full flex-col gap-space-md border border-outline-variant/40 bg-surface p-space-md">
      <div className="flex flex-col gap-space-xs">
        <div className="flex items-center justify-between gap-space-sm">
          <span className="font-headline text-headline-sm font-bold text-primary uppercase">
            Oyuncu Havuzu
          </span>
          <span className="font-label text-label-md text-on-surface-variant">
            XI {starterFilled}/11 · Yedek {benchFilled}/{MATCH_WEEK_MAX_BENCH}
          </span>
        </div>
        <input
          type="search"
          value={search}
          onChange={(event) => {
            onSearchChange(event.target.value)
          }}
          placeholder="İsim veya numara ara…"
          className="font-body w-full border border-outline-variant/50 bg-surface px-space-md py-space-sm text-body-md text-on-surface outline-none focus:border-primary"
        />
        <div className="flex flex-wrap gap-1">
          {posTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                onPosFilterChange(tab.id)
              }}
              className={`font-label cursor-pointer px-space-sm py-1 text-label-md uppercase ${
                posFilter === tab.id
                  ? 'bg-primary text-on-primary'
                  : 'border border-outline-variant/50 text-on-surface-variant hover:border-primary hover:text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex max-h-[28rem] flex-col gap-1 overflow-y-auto">
        {filtered.map((player) => {
          const slotLabel = slotLabelForPlayer(assignments, player.id)
          const isAssigned = Boolean(slotLabel)
          const boardFull = startersComplete && benchFilled >= MATCH_WEEK_MAX_BENCH
          const canInteract = !isAssigned && !boardFull

          return (
            <button
              key={player.id}
              type="button"
              draggable={canInteract}
              disabled={!canInteract}
              onDragStart={(event) => {
                if (!canInteract) {
                  event.preventDefault()
                  return
                }

                setSquadPlayerDragData(
                  event.dataTransfer,
                  {
                    playerId: player.id,
                  },
                  player.initials,
                )
              }}
              onClick={() => {
                if (!canInteract) {
                  return
                }

                onAssign(player.id)
              }}
              className={`flex items-center gap-space-sm border px-space-sm py-space-xs text-left transition-colors ${
                isAssigned
                  ? 'cursor-default border-primary/30 bg-primary-container/10 opacity-70'
                  : canInteract
                    ? 'cursor-pointer border-outline-variant/40 hover:border-primary'
                    : 'cursor-not-allowed border-outline-variant/40 opacity-50'
              }`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-[10px] font-bold text-white ${player.avatarGradient}`}
              >
                {player.initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-headline truncate text-sm font-bold text-primary">
                  {player.shortName}
                </p>
                <p className="font-label truncate text-[11px] text-on-surface-variant uppercase">
                  #{player.number} · {player.roleHint}
                </p>
              </div>
              {slotLabel ? (
                <span className="font-kicker shrink-0 text-[10px] font-bold text-primary uppercase">
                  {isBenchSlotId(slotLabel) ? slotLabel.replace('BENCH_', 'Y') : slotLabel}
                </span>
              ) : (
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                  add
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
