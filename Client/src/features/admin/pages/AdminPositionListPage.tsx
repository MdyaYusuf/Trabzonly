import { useMemo, useState } from 'react'
import { AdminPositionListFilters } from '../components/AdminPositionListFilters'
import { AdminPositionListFooter } from '../components/AdminPositionListFooter'
import { AdminPositionListHeader } from '../components/AdminPositionListHeader'
import { AdminPositionTable } from '../components/AdminPositionTable'
import {
  adminPositionDistribution,
  adminPositionListRows,
} from '../utils/adminPositionPlaceholders'
import type { AdminPositionSort, AdminPositionZone } from '../utils/adminPositionTypes'

export function AdminPositionListPage() {
  const [search, setSearch] = useState('')
  const [zoneFilter, setZoneFilter] = useState<AdminPositionZone>('all')
  const [sort, setSort] = useState<AdminPositionSort>('players-desc')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const counts = useMemo(() => {
    return {
      all: adminPositionListRows.length,
      attack: adminPositionListRows.filter((row) => row.zone === 'attack').length,
      midfield: adminPositionListRows.filter((row) => row.zone === 'midfield').length,
      defence: adminPositionListRows.filter((row) => row.zone === 'defence').length,
      goalkeeper: adminPositionListRows.filter((row) => row.zone === 'goalkeeper').length,
    }
  }, [])

  const filtered = useMemo(() => {
    let result = [...adminPositionListRows]

    if (zoneFilter !== 'all') {
      result = result.filter((row) => row.zone === zoneFilter)
    }

    const query = search.trim().toLowerCase()

    if (query) {
      result = result.filter(
        (row) =>
          row.name.toLowerCase().includes(query) ||
          row.abbreviation.toLowerCase().includes(query) ||
          row.roleLabel.toLowerCase().includes(query) ||
          row.zoneLabel.toLowerCase().includes(query),
      )
    }

    result.sort((a, b) => {
      if (sort === 'players-asc') {
        return a.playerCount - b.playerCount
      }

      if (sort === 'alpha') {
        return a.name.localeCompare(b.name, 'tr')
      }

      if (sort === 'zone') {
        if (a.zoneOrder !== b.zoneOrder) {
          return a.zoneOrder - b.zoneOrder
        }

        return a.name.localeCompare(b.name, 'tr')
      }

      return b.playerCount - a.playerCount
    })

    return result
  }, [search, zoneFilter, sort])

  function clearFilters() {
    setSearch('')
    setZoneFilter('all')
    setSort('players-desc')
  }

  function toggleId(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev)

      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }

      return next
    })
  }

  function toggleAll() {
    const ids = filtered.map((row) => row.id)
    const allSelected = ids.every((id) => selectedIds.has(id))

    setSelectedIds((prev) => {
      const next = new Set(prev)

      if (allSelected) {
        for (const id of ids) {
          next.delete(id)
        }
      } else {
        for (const id of ids) {
          next.add(id)
        }
      }

      return next
    })
  }

  return (
    <main className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
      <AdminPositionListHeader
        totalPositions={adminPositionListRows.length}
        activeRoles={adminPositionListRows.length}
        registeredPlayers={adminPositionDistribution.totalPlayers}
      />

      <AdminPositionListFilters
        search={search}
        zoneFilter={zoneFilter}
        sort={sort}
        counts={counts}
        onSearchChange={setSearch}
        onZoneChange={setZoneFilter}
        onSortChange={setSort}
      />

      <AdminPositionTable
        positions={filtered}
        selectedIds={selectedIds}
        onToggle={toggleId}
        onToggleAll={toggleAll}
        onClearFilters={clearFilters}
      />

      <AdminPositionListFooter
        visibleCount={filtered.length}
        totalCount={filtered.length}
      />
    </main>
  )
}
