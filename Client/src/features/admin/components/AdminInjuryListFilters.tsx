import { Link } from 'react-router-dom'
import type {
  AdminInjuryPlayerOption,
  AdminInjurySeasonOption,
} from '../utils/adminInjuryTypes'

type AdminInjuryListFiltersProps = {
  search: string
  seasonId: number | 'all'
  playerId: number | 'all'
  seasons: AdminInjurySeasonOption[]
  players: AdminInjuryPlayerOption[]
  onSearchChange: (value: string) => void
  onSeasonChange: (value: number | 'all') => void
  onPlayerChange: (value: number | 'all') => void
  onClear: () => void
}

export function AdminInjuryListFilters({
  search,
  seasonId,
  playerId,
  seasons,
  players,
  onSearchChange,
  onSeasonChange,
  onPlayerChange,
  onClear,
}: AdminInjuryListFiltersProps) {
  const selectClass =
    'font-label cursor-pointer border border-outline-variant/50 bg-surface px-space-md py-space-sm text-label-md text-on-surface outline-none focus:border-primary'

  return (
    <section className="flex flex-col gap-space-md border border-outline-variant/40 bg-surface-container-lowest p-space-md">
      <label className="relative min-w-0 w-full">
        <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-on-surface-variant">
          search
        </span>
        <input
          type="search"
          value={search}
          onChange={(event) => {
            onSearchChange(event.target.value)
          }}
          placeholder="Oyuncu adı, forma numarası veya sakatlık ara…"
          className="font-body w-full border border-outline-variant/50 bg-surface py-space-sm pr-space-md pl-10 text-body-md text-on-surface outline-none focus:border-primary"
        />
      </label>

      <div className="flex flex-col gap-space-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-space-sm">
          <select
            value={seasonId === 'all' ? 'all' : String(seasonId)}
            onChange={(event) => {
              const value = event.target.value

              if (value === 'all') {
                onSeasonChange('all')
                return
              }

              onSeasonChange(Number(value))
            }}
            className={selectClass}
          >
            <option value="all">Tüm Sezonlar</option>
            {seasons.map((season) => (
              <option key={season.id} value={season.id}>
                {season.name}
              </option>
            ))}
          </select>

          <select
            value={playerId === 'all' ? 'all' : String(playerId)}
            onChange={(event) => {
              const value = event.target.value

              if (value === 'all') {
                onPlayerChange('all')
                return
              }

              onPlayerChange(Number(value))
            }}
            className={selectClass}
          >
            <option value="all">Oyuncu: Tümü</option>
            {players.map((player) => (
              <option key={player.id} value={player.id}>
                {player.label}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={onClear}
            className="font-label cursor-pointer border border-outline-variant/50 px-space-md py-space-sm text-label-md text-on-surface-variant uppercase transition-colors hover:border-primary hover:text-primary"
          >
            Filtreleri Temizle
          </button>
        </div>

        <Link
          to="/yonetim/sakatliklar/yeni"
          className="font-label inline-flex h-11 min-w-[11.5rem] shrink-0 cursor-pointer items-center justify-center gap-space-xs self-center bg-gradient-to-r from-primary-container via-[#7a1235] to-primary px-space-lg text-label-md font-bold tracking-wider text-on-primary uppercase shadow-sm transition-all hover:scale-[1.02] hover:shadow-md"
        >
          <span className="material-symbols-outlined text-[20px]">healing</span>
          Sakatlık Ekle
        </Link>
      </div>
    </section>
  )
}
