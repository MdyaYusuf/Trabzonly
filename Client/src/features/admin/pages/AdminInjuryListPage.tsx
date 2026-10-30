import { useEffect, useState } from 'react'
import injuryService from '@/features/injuries/injuryService'
import playerService from '@/features/players/playerService'
import seasonService from '@/features/seasons/seasonService'
import { AdminInjuryDeleteModal } from '../components/AdminInjuryDeleteModal'
import { AdminInjuryListFilters } from '../components/AdminInjuryListFilters'
import { AdminInjuryListHeader } from '../components/AdminInjuryListHeader'
import { AdminInjuryPagination } from '../components/AdminInjuryPagination'
import { AdminInjuryTable } from '../components/AdminInjuryTable'
import { mapInjuryResponseToListRow } from '../utils/adminInjuryDraftUtils'
import type {
  AdminInjuryListRow,
  AdminInjuryPlayerOption,
  AdminInjurySeasonOption,
} from '../utils/adminInjuryTypes'

const DEFAULT_PAGE_SIZE = 10

export function AdminInjuryListPage() {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [seasonId, setSeasonId] = useState<number | 'all'>('all')
  const [playerId, setPlayerId] = useState<number | 'all'>('all')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)
  const [rows, setRows] = useState<AdminInjuryListRow[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [seasons, setSeasons] = useState<AdminInjurySeasonOption[]>([])
  const [players, setPlayers] = useState<AdminInjuryPlayerOption[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<AdminInjuryListRow | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [listVersion, setListVersion] = useState(0)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search.trim())
    }, 300)

    return () => {
      window.clearTimeout(timer)
    }
  }, [search])

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, seasonId, playerId, pageSize])

  useEffect(() => {
    let cancelled = false

    async function loadLookups() {
      const [seasonsResult, playersResult] = await Promise.all([
        seasonService.getAll({ pageNumber: 1, pageSize: 100 }),
        playerService.getAllForAdmin({ pageNumber: 1, pageSize: 100 }),
      ])

      if (cancelled) {
        return
      }

      if (seasonsResult.success && seasonsResult.data) {
        setSeasons(
          seasonsResult.data.items.map((season) => ({
            id: season.id,
            name: season.name,
          })),
        )
      } else {
        setSeasons([])
      }

      if (playersResult.success && playersResult.data) {
        setPlayers(
          playersResult.data.items.map((player) => ({
            id: player.id,
            label:
              player.shirtNumber != null
                ? `${player.name} (#${player.shirtNumber})`
                : player.name,
          })),
        )
      } else {
        setPlayers([])
      }
    }

    void loadLookups()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    async function loadInjuries() {
      setIsLoading(true)

      const result = await injuryService.getAllForAdmin({
        pageNumber: page,
        pageSize,
        search: debouncedSearch || undefined,
        seasonId: seasonId === 'all' ? undefined : seasonId,
        playerId: playerId === 'all' ? undefined : playerId,
      })

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setRows(result.data.items.map(mapInjuryResponseToListRow))
        setTotalCount(result.data.totalCount)

        if (result.data.items.length === 0 && result.data.totalCount > 0 && page > 1) {
          setPage((prev) => Math.max(1, prev - 1))
        }
      } else {
        setRows([])
        setTotalCount(0)
      }

      setIsLoading(false)
    }

    void loadInjuries()

    return () => {
      cancelled = true
    }
  }, [page, pageSize, debouncedSearch, seasonId, playerId, listVersion])

  function clearFilters() {
    setSearch('')
    setDebouncedSearch('')
    setSeasonId('all')
    setPlayerId('all')
    setPage(1)
  }

  async function handleConfirmDelete() {
    if (!deleteTarget || deletingId != null) {
      return
    }

    const deletedId = deleteTarget.id
    setDeletingId(deletedId)

    const result = await injuryService.remove(deletedId)

    if (result.success) {
      setDeleteTarget(null)
      setListVersion((prev) => prev + 1)
    }

    setDeletingId(null)
  }

  return (
    <div className="flex flex-col">
      <main className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
        <AdminInjuryListHeader />

        <AdminInjuryListFilters
          search={search}
          seasonId={seasonId}
          playerId={playerId}
          seasons={seasons}
          players={players}
          onSearchChange={setSearch}
          onSeasonChange={setSeasonId}
          onPlayerChange={setPlayerId}
          onClear={clearFilters}
        />

        {isLoading ? (
          <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
            Sakatlıklar yükleniyor...
          </p>
        ) : (
          <AdminInjuryTable
            rows={rows}
            deletingId={deletingId}
            onDelete={setDeleteTarget}
          />
        )}

        {!isLoading && totalCount > 0 ? (
          <AdminInjuryPagination
            page={page}
            pageSize={pageSize}
            total={totalCount}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        ) : null}
      </main>

      <AdminInjuryDeleteModal
        open={Boolean(deleteTarget)}
        playerName={deleteTarget?.playerName ?? 'Oyuncu'}
        diagnosis={deleteTarget?.diagnosis ?? ''}
        isDeleting={deletingId != null}
        onCancel={() => {
          if (deletingId != null) {
            return
          }

          setDeleteTarget(null)
        }}
        onConfirm={() => {
          void handleConfirmDelete()
        }}
      />
    </div>
  )
}
