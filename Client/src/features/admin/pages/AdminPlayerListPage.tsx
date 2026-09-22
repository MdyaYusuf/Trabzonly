import { useMemo, useState } from 'react'
import { AdminPlayerListFilters } from '../components/AdminPlayerListFilters'
import { AdminPlayerListHeader } from '../components/AdminPlayerListHeader'
import { AdminPlayerPagination } from '../components/AdminPlayerPagination'
import { AdminPlayerReportBar } from '../components/AdminPlayerReportBar'
import { AdminPlayerTable } from '../components/AdminPlayerTable'
import {
  adminPlayerListRows,
  adminPlayerListStats,
  adminPlayerReportStrip,
} from '../utils/adminPlayerPlaceholders'
import type {
  AdminPlayerPositionGroup,
  AdminPlayerSquadFilter,
  AdminPlayerStatusFilter,
} from '../utils/adminPlayerTypes'

export function AdminPlayerListPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<AdminPlayerStatusFilter>('all')
  const [positionFilter, setPositionFilter] = useState<AdminPlayerPositionGroup>('all')
  const [squadFilter, setSquadFilter] = useState<AdminPlayerSquadFilter>('all')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(7)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const counts = useMemo(() => {
    const active = adminPlayerListRows.filter((player) => player.status === 'active').length
    const inactive = adminPlayerListRows.filter((player) => player.status !== 'active').length

    return {
      all: adminPlayerListRows.length,
      active,
      inactive,
    }
  }, [])

  const filtered = useMemo(() => {
    let result = [...adminPlayerListRows]

    if (statusFilter === 'active') {
      result = result.filter((player) => player.status === 'active')
    } else if (statusFilter === 'inactive') {
      result = result.filter((player) => player.status !== 'active')
    }

    if (positionFilter !== 'all') {
      result = result.filter((player) => player.positionGroup === positionFilter)
    }

    if (squadFilter !== 'all') {
      result = result.filter((player) => player.squadFilter === squadFilter)
    }

    const query = search.trim().toLowerCase()

    if (query) {
      result = result.filter(
        (player) =>
          player.fullName.toLowerCase().includes(query) ||
          player.secondaryName.toLowerCase().includes(query) ||
          player.positionLabel.toLowerCase().includes(query) ||
          String(player.number).includes(query),
      )
    }

    return result
  }, [search, statusFilter, positionFilter, squadFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const pageStart = (currentPage - 1) * pageSize
  const pagePlayers = filtered.slice(pageStart, pageStart + pageSize)

  function resetPage() {
    setPage(1)
  }

  function clearFilters() {
    setSearch('')
    setStatusFilter('all')
    setPositionFilter('all')
    setSquadFilter('all')
    setPage(1)
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
    const pageIds = pagePlayers.map((player) => player.id)
    const allSelected = pageIds.every((id) => selectedIds.has(id))

    setSelectedIds((prev) => {
      const next = new Set(prev)

      if (allSelected) {
        for (const id of pageIds) {
          next.delete(id)
        }
      } else {
        for (const id of pageIds) {
          next.add(id)
        }
      }

      return next
    })
  }

  return (
    <div className="flex flex-col">
      <AdminPlayerReportBar report={adminPlayerReportStrip} />

      <main className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
        <AdminPlayerListHeader stats={adminPlayerListStats} />

        <AdminPlayerListFilters
          search={search}
          statusFilter={statusFilter}
          positionFilter={positionFilter}
          squadFilter={squadFilter}
          counts={counts}
          onSearchChange={(value) => {
            setSearch(value)
            resetPage()
          }}
          onStatusChange={(value) => {
            setStatusFilter(value)
            resetPage()
          }}
          onPositionChange={(value) => {
            setPositionFilter(value)
            resetPage()
          }}
          onSquadChange={(value) => {
            setSquadFilter(value)
            resetPage()
          }}
        />

        <AdminPlayerTable
          players={pagePlayers}
          selectedIds={selectedIds}
          onToggle={toggleId}
          onToggleAll={toggleAll}
        />

        <AdminPlayerPagination
          page={currentPage}
          pageSize={pageSize}
          total={filtered.length}
          onPageChange={setPage}
          onPageSizeChange={(size) => {
            setPageSize(size)
            setPage(1)
          }}
        />

        <section className="flex flex-col gap-space-sm border border-outline-variant/40 bg-surface-container-low px-space-md py-space-md lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-space-sm">
            <span className="material-symbols-outlined text-secondary">info</span>
            <div>
              <h2 className="font-label text-label-md font-bold text-on-surface uppercase">
                Filtreleme & Arama Bilgilendirmesi
              </h2>
              <p className="font-body mt-1 text-body-sm text-on-surface-variant">
                Kriterlere uyan oyuncu bulunamazsa sistem otomatik olarak &quot;Henüz oyuncu
                eklenmedi veya eşleşme yok&quot; durumunu sunar.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-space-sm">
            <button
              type="button"
              onClick={clearFilters}
              className="font-label border border-outline-variant px-space-md py-space-sm text-label-md uppercase transition-colors hover:border-primary hover:text-primary"
            >
              Filtreleri Temizle
            </button>
            <button
              type="button"
              className="font-label bg-primary-container px-space-md py-space-sm text-label-md font-bold text-on-primary uppercase transition-all hover:bg-primary"
            >
              Toplu Düzenleme Modu
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
