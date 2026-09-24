import type {
  AdminStatisticPositionGroup,
  AdminStatisticSort,
} from '../utils/adminStatisticTypes'
import { adminStatisticPlayerOptions } from '../utils/adminStatisticPlaceholders'

type AdminStatisticListFiltersProps = {
  search: string
  season: string
  playerId: string
  team: string
  sort: AdminStatisticSort
  positionGroup: AdminStatisticPositionGroup
  counts: Record<AdminStatisticPositionGroup, number>
  visibleCount: number
  onSearchChange: (value: string) => void
  onSeasonChange: (value: string) => void
  onPlayerChange: (value: string) => void
  onTeamChange: (value: string) => void
  onSortChange: (value: AdminStatisticSort) => void
  onPositionChange: (value: AdminStatisticPositionGroup) => void
  onClear: () => void
}

export function AdminStatisticListFilters({
  search,
  season,
  playerId,
  team,
  sort,
  positionGroup,
  counts,
  visibleCount,
  onSearchChange,
  onSeasonChange,
  onPlayerChange,
  onTeamChange,
  onSortChange,
  onPositionChange,
  onClear,
}: AdminStatisticListFiltersProps) {
  const tabs: Array<{ id: AdminStatisticPositionGroup; label: string }> = [
    { id: 'all', label: 'Tümü' },
    { id: 'gk', label: 'Kaleci' },
    { id: 'def', label: 'Savunma' },
    { id: 'mid', label: 'Orta Saha' },
    { id: 'att', label: 'Forvet' },
  ]

  return (
    <section className="flex flex-col gap-space-md border border-outline-variant/40 bg-surface-container-lowest p-space-md">
      <div className="flex flex-col gap-space-sm xl:flex-row xl:items-center">
        <label className="relative min-w-0 flex-1">
          <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-on-surface-variant">
            search
          </span>
          <input
            type="search"
            value={search}
            onChange={(event) => {
              onSearchChange(event.target.value)
            }}
            placeholder="Oyuncu adı veya forma numarası ara…"
            className="font-body w-full border border-outline-variant/50 bg-surface py-space-sm pr-space-md pl-10 text-body-md text-on-surface outline-none focus:border-primary"
          />
        </label>

        <div className="flex flex-wrap gap-space-sm">
          <select
            value={season}
            onChange={(event) => {
              onSeasonChange(event.target.value)
            }}
            className="font-label border border-outline-variant/50 bg-surface px-space-md py-space-sm text-label-md outline-none focus:border-primary"
          >
            <option value="all">Tüm Sezonlar</option>
            <option value="2024/25">Sezon: 2024/25</option>
            <option value="2023/24">Sezon: 2023/24</option>
            <option value="2022/23">Sezon: 2022/23</option>
          </select>

          <select
            value={playerId}
            onChange={(event) => {
              onPlayerChange(event.target.value)
            }}
            className="font-label border border-outline-variant/50 bg-surface px-space-md py-space-sm text-label-md outline-none focus:border-primary"
          >
            <option value="all">Oyuncu: Tümü</option>
            {adminStatisticPlayerOptions.map((player) => (
              <option key={player.id} value={player.id}>
                {player.label}
              </option>
            ))}
          </select>

          <select
            value={team}
            onChange={(event) => {
              onTeamChange(event.target.value)
            }}
            className="font-label border border-outline-variant/50 bg-surface px-space-md py-space-sm text-label-md outline-none focus:border-primary"
          >
            <option value="all">Tüm Takımlar</option>
            <option value="Trabzonspor">Trabzonspor A-Takım</option>
            <option value="U19">Trabzonspor U19</option>
            <option value="U17">Trabzonspor U17</option>
          </select>

          <select
            value={sort}
            onChange={(event) => {
              onSortChange(event.target.value as AdminStatisticSort)
            }}
            className="font-label border border-outline-variant/50 bg-surface px-space-md py-space-sm text-label-md outline-none focus:border-primary"
          >
            <option value="goals-desc">Sırala: Gol (Azalan)</option>
            <option value="assists-desc">Sırala: Asist (Azalan)</option>
            <option value="matches-desc">Sırala: Maç Sayısı</option>
            <option value="minutes-desc">Sırala: Alınan Süre</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-space-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-1">
          {tabs.map((tab) => {
            const isActive = positionGroup === tab.id

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  onPositionChange(tab.id)
                }}
                className={`font-label px-space-md py-space-sm text-label-md uppercase transition-colors ${
                  isActive
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-high text-on-surface-variant hover:text-primary'
                }`}
              >
                {tab.label} ({counts[tab.id]})
              </button>
            )
          })}
        </div>

        <div className="font-label flex flex-wrap items-center gap-space-sm text-label-md text-on-surface-variant">
          <span>
            Görüntülenen: <strong className="text-primary">{visibleCount} Oyuncu</strong>
          </span>
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1 uppercase transition-colors hover:text-primary"
          >
            <span className="material-symbols-outlined text-[16px]">restart_alt</span>
            Filtreleri Temizle
          </button>
        </div>
      </div>
    </section>
  )
}
