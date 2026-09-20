import type {
  BuilderPlayer,
  BuilderPosGroup,
  BuilderSlotId,
} from '../utils/squadBuilderTypes'

type SquadBuilderPlayerPoolProps = {
  players: BuilderPlayer[]
  assignments: Partial<Record<BuilderSlotId, string>>
  search: string
  posFilter: BuilderPosGroup
  filled: number
  selectedSlotId: BuilderSlotId | null
  onSearchChange: (value: string) => void
  onPosFilterChange: (value: BuilderPosGroup) => void
  onAssign: (playerId: string) => void
}

const posTabs: { id: BuilderPosGroup; label: string }[] = [
  { id: 'ALL', label: 'TÜMÜ' },
  { id: 'FW', label: 'FORVET' },
  { id: 'MF', label: 'ORTA SAHA' },
  { id: 'DF', label: 'DEFANS' },
  { id: 'GK', label: 'KALECİ' },
]

function slotLabelForPlayer(
  assignments: Partial<Record<BuilderSlotId, string>>,
  playerId: string,
): string | null {
  const entry = Object.entries(assignments).find(([, id]) => id === playerId)

  if (!entry) {
    return null
  }

  return entry[0]
}

export function SquadBuilderPlayerPool({
  players,
  assignments,
  search,
  posFilter,
  filled,
  selectedSlotId,
  onSearchChange,
  onPosFilterChange,
  onAssign,
}: SquadBuilderPlayerPoolProps) {
  const isComplete = filled >= 11

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
    <div className="flex w-full flex-col gap-space-md bg-surface-container-lowest p-space-md shadow-sm">
      <div className="flex flex-col gap-space-xs">
        <div className="flex items-center justify-between gap-space-sm">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-headline text-headline-sm font-bold text-primary uppercase">
              Oyuncu Havuzu
            </span>
            <span className="font-kicker bg-secondary-container px-2 py-0.5 text-[10px] font-bold text-on-secondary-container">
              TRABZONSPOR A TAKIMI
            </span>
          </div>
          <span className="font-label text-[12px] font-semibold text-on-surface-variant">
            {players.length} Futbolcu
          </span>
        </div>

        <div className="relative mt-1 w-full">
          <span className="material-symbols-outlined absolute top-2.5 left-3 text-[20px] text-on-surface-variant">
            search
          </span>
          <input
            className="font-body w-full bg-surface-container py-2 pr-space-md pl-10 text-body-sm text-on-surface placeholder-on-surface-variant/60 focus:ring-1 focus:ring-primary focus:outline-none"
            placeholder="Oyuncu adı veya forma no ara (Örn: Draguş, 70, Nwakaeme)..."
            type="search"
            value={search}
            onChange={(event) => {
              onSearchChange(event.target.value)
            }}
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto pt-1">
          {posTabs.map((tab) => {
            const isActive = posFilter === tab.id

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  onPosFilterChange(tab.id)
                }}
                className={
                  isActive
                    ? 'font-kicker bg-primary px-3 py-1 text-kicker font-bold text-on-primary uppercase'
                    : 'font-kicker bg-surface-container px-3 py-1 text-kicker font-bold text-on-surface uppercase transition-colors hover:bg-surface-container-high'
                }
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex items-center justify-between bg-secondary-fixed/50 p-space-sm">
        <div className="flex items-center gap-2">
          <span
            className={`material-symbols-outlined text-[20px] ${
              isComplete ? 'text-[#2e7d32]' : 'text-secondary'
            }`}
          >
            {isComplete ? 'check_circle' : selectedSlotId ? 'ads_click' : 'info'}
          </span>
          <p className="font-body text-[12px] leading-tight text-on-secondary-fixed">
            {isComplete ? (
              <>
                İlk 11 tamamlandı!{' '}
                <strong className="font-bold text-[#2e7d32]">11/11 Oyuncu</strong> yerleştirildi.
                Taktik direktiflerini düzenleyip yayınlayabilirsiniz.
              </>
            ) : selectedSlotId ? (
              <>
                Seçili slot: <strong className="font-bold text-primary">{selectedSlotId}</strong>.
                Havuzdan oyuncu seçerek yerleştirin.
              </>
            ) : (
              <>
                Yerleştirilen:{' '}
                <strong className="font-bold text-primary">
                  {filled}/11 Oyuncu
                </strong>
                . Boş bir slot seçin veya doğrudan oyuncu ekleyin.
              </>
            )}
          </p>
        </div>
      </div>

      <div className="flex max-h-[380px] flex-col gap-2 overflow-y-auto pr-1">
        {filtered.map((player) => {
          const assignedSlot = slotLabelForPlayer(assignments, player.id)
          const isAssigned = Boolean(assignedSlot)

          if (isAssigned) {
            return (
              <div
                key={player.id}
                className="flex cursor-not-allowed items-center justify-between bg-surface-container-highest/60 p-2.5 opacity-60"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-white grayscale ${player.avatarGradient}`}
                  >
                    {player.initials}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-headline text-[14px] font-bold text-on-surface-variant line-through">
                        {player.name}
                      </span>
                      <span className="font-kicker bg-surface-variant px-1.5 text-[10px] text-on-surface-variant">
                        #{player.number}
                      </span>
                    </div>
                    <span className="font-body text-[12px] text-on-surface-variant">
                      Sahada ({assignedSlot} Pozisyonunda)
                    </span>
                  </div>
                </div>
                <span className="font-kicker flex items-center gap-1 bg-primary-container px-2.5 py-1 text-[10px] font-bold text-on-primary uppercase">
                  <span className="material-symbols-outlined text-[14px] text-tertiary-fixed-dim">
                    check
                  </span>
                  KADRODA
                </span>
              </div>
            )
          }

          return (
            <div
              key={player.id}
              className="group flex items-center justify-between bg-surface-container-low p-2.5 transition-colors hover:bg-surface-container"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-white ${player.avatarGradient}`}
                >
                  {player.initials}
                </div>
                <div className="flex min-w-0 flex-col">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-headline text-[14px] font-bold text-on-surface transition-colors group-hover:text-primary">
                      {player.name}
                    </span>
                    <span className="font-kicker bg-primary/10 px-1.5 text-[10px] font-bold text-primary">
                      #{player.number}
                    </span>
                    {player.badge ? (
                      <span
                        className={
                          player.badgeTone === 'wizard'
                            ? 'font-kicker bg-tertiary-fixed px-1 text-[9px] font-bold text-on-tertiary-fixed'
                            : 'font-kicker bg-surface-container px-1 text-[9px] font-bold text-on-surface-variant'
                        }
                      >
                        {player.badge}
                      </span>
                    ) : null}
                  </div>
                  <span className="font-body text-[12px] text-on-surface-variant">
                    {player.roleHint}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  onAssign(player.id)
                }}
                className={
                  player.badgeTone === 'wizard'
                    ? 'font-kicker flex shrink-0 items-center gap-1 bg-secondary px-3 py-1.5 text-kicker font-bold text-on-secondary uppercase shadow-sm transition-all hover:bg-secondary-container hover:text-on-secondary-container'
                    : 'font-kicker flex shrink-0 items-center gap-1 bg-surface-container px-3 py-1.5 text-kicker font-bold text-on-surface uppercase transition-all hover:bg-secondary hover:text-on-secondary'
                }
              >
                <span className="material-symbols-outlined text-[15px]">add_circle</span>
                {player.badgeTone === 'wizard' ? 'SLOTA EKLE' : 'SEÇ'}
              </button>
            </div>
          )
        })}

        {filtered.length === 0 ? (
          <p className="font-body py-space-md text-center text-body-sm text-on-surface-variant">
            Bu filtrelere uygun oyuncu bulunamadı.
          </p>
        ) : null}
      </div>
    </div>
  )
}
