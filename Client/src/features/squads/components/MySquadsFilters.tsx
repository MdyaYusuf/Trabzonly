import {
  mySquadFilterTabs,
  mySquadSortOptions,
  placeholderMySquads,
} from '../utils/mySquadsPlaceholders'
import type { MySquadFilter, MySquadSort } from '../utils/mySquadsTypes'

type MySquadsFiltersProps = {
  filter: MySquadFilter
  sort: MySquadSort
  search: string
  onFilterChange: (value: MySquadFilter) => void
  onSortChange: (value: MySquadSort) => void
  onSearchChange: (value: string) => void
}

function tabCount(id: MySquadFilter) {
  if (id === 'all') {
    return placeholderMySquads.length
  }

  if (id === 'published') {
    return placeholderMySquads.filter((squad) => squad.status === 'published').length
  }

  if (id === 'draft') {
    return placeholderMySquads.filter((squad) => squad.status === 'draft').length
  }

  return null
}

export function MySquadsFilters({
  filter,
  sort,
  search,
  onFilterChange,
  onSortChange,
  onSearchChange,
}: MySquadsFiltersProps) {
  return (
    <div className="mb-space-lg flex flex-col justify-between gap-space-md bg-surface-container-lowest p-space-md shadow-sm md:flex-row md:items-center">
      <div className="flex flex-wrap items-center gap-space-xs">
        {mySquadFilterTabs.map((tab) => {
          const isActive = filter === tab.id
          const count = tabCount(tab.id)
          const label = count === null ? tab.label : `${tab.label} (${count})`

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                onFilterChange(tab.id)
              }}
              className={
                isActive
                  ? 'font-label bg-primary px-space-md py-space-xs text-label-md font-bold text-on-primary uppercase'
                  : 'font-label bg-surface-container px-space-md py-space-xs text-label-md font-bold text-on-surface uppercase transition-colors hover:bg-surface-container-high'
              }
            >
              {label}
            </button>
          )
        })}
      </div>

      <div className="flex flex-1 items-center justify-end gap-space-sm md:max-w-md">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-[18px] text-on-surface-variant">
            search
          </span>
          <input
            className="font-body w-full bg-surface-container py-2 pr-space-md pl-9 text-body-sm text-on-surface transition-colors placeholder:text-on-surface-variant focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:outline-none"
            placeholder="Kadro adı veya formasyon ara (Örn: 4-2-3-1, Akyazı)..."
            type="search"
            value={search}
            onChange={(event) => {
              onSearchChange(event.target.value)
            }}
          />
        </div>
        <div className="relative shrink-0">
          <select
            className="font-label appearance-none bg-surface-container px-space-md py-2 pr-8 text-label-md text-on-surface uppercase focus:ring-1 focus:ring-primary focus:outline-none"
            value={sort}
            onChange={(event) => {
              onSortChange(event.target.value as MySquadSort)
            }}
          >
            {mySquadSortOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
          <span className="material-symbols-outlined pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-[18px] text-on-surface-variant">
            expand_more
          </span>
        </div>
      </div>
    </div>
  )
}
