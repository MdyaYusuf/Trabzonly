import type { AdminInjuryStatusFilter } from '../utils/adminInjuryTypes'
import { adminInjuryPlayerOptions } from '../utils/adminInjuryPlaceholders'

type AdminInjuryListFiltersProps = {
  playerId: string
  season: string
  statusFilter: AdminInjuryStatusFilter
  counts: Record<AdminInjuryStatusFilter, number>
  visibleCount: number
  onPlayerChange: (value: string) => void
  onSeasonChange: (value: string) => void
  onStatusChange: (value: AdminInjuryStatusFilter) => void
  onClear: () => void
}

export function AdminInjuryListFilters({
  playerId,
  season,
  statusFilter,
  counts,
  visibleCount,
  onPlayerChange,
  onSeasonChange,
  onStatusChange,
  onClear,
}: AdminInjuryListFiltersProps) {
  const activeChips: string[] = []

  if (season !== 'all') {
    activeChips.push(`${season} Sezonu`)
  }

  activeChips.push('Tüm Mevkiler')

  return (
    <section className="flex flex-col gap-space-md border border-outline-variant/40 bg-surface-container-lowest p-space-md">
      <div className="flex flex-col gap-space-sm xl:flex-row xl:items-center">
        <div className="flex min-w-0 flex-1 flex-wrap gap-space-sm">
          <select
            value={playerId}
            onChange={(event) => {
              onPlayerChange(event.target.value)
            }}
            className="font-label min-w-[200px] flex-1 border border-outline-variant/50 bg-surface px-space-md py-space-sm text-label-md outline-none focus:border-primary"
          >
            <option value="all">Oyuncu: Tümü (A Takım)</option>
            {adminInjuryPlayerOptions.map((player) => (
              <option key={player.id} value={player.id}>
                {player.label}
              </option>
            ))}
          </select>

          <select
            value={season}
            onChange={(event) => {
              onSeasonChange(event.target.value)
            }}
            className="font-label border border-outline-variant/50 bg-surface px-space-md py-space-sm text-label-md outline-none focus:border-primary"
          >
            <option value="2024/25">Sezon: 2024/25</option>
            <option value="2023/24">Sezon: 2023/24</option>
            <option value="2022/23">Sezon: 2022/23</option>
            <option value="all">Tüm Sezonlar</option>
          </select>

          <select
            value={statusFilter}
            onChange={(event) => {
              onStatusChange(event.target.value as AdminInjuryStatusFilter)
            }}
            className="font-label border border-outline-variant/50 bg-surface px-space-md py-space-sm text-label-md outline-none focus:border-primary"
          >
            <option value="all">Durum: Tümü ({counts.all})</option>
            <option value="active">Tedavisi Süren ({counts.active})</option>
            <option value="match-form">Maç Formu Alan ({counts['match-form']})</option>
            <option value="recovered">İyileşen / Sahada ({counts.recovered})</option>
          </select>
        </div>

        <button
          type="button"
          onClick={onClear}
          className="font-label inline-flex items-center gap-1 border border-outline-variant px-space-md py-space-sm text-label-md uppercase transition-colors hover:border-primary hover:text-primary"
        >
          <span className="material-symbols-outlined text-[16px]">restart_alt</span>
          Sıfırla
        </button>
      </div>

      <div className="flex flex-col gap-space-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-space-sm">
          <span className="font-kicker text-kicker text-on-surface-variant uppercase">
            Aktif Filtreler:
          </span>
          {activeChips.map((chip) => (
            <span
              key={chip}
              className="font-label inline-flex items-center gap-1 border border-outline-variant/50 bg-surface-container px-space-sm py-1 text-label-md text-on-surface"
            >
              {chip}
              <span className="material-symbols-outlined text-[14px] text-on-surface-variant">
                close
              </span>
            </span>
          ))}
        </div>
        <p className="font-label text-label-md text-on-surface-variant">
          <strong className="text-primary">{visibleCount}</strong> kayıt listelendi
        </p>
      </div>
    </section>
  )
}
