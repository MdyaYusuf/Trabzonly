import { useEffect, useState } from 'react'
import playerService from '@/features/players/playerService'
import seasonService from '@/features/seasons/seasonService'
import playerStatsService from '@/features/stats/playerStatsService'
import { AdminStatisticDeleteModal } from '../components/AdminStatisticDeleteModal'
import { AdminStatisticListFilters } from '../components/AdminStatisticListFilters'
import { AdminStatisticListHeader } from '../components/AdminStatisticListHeader'
import { AdminStatisticPagination } from '../components/AdminStatisticPagination'
import { AdminStatisticTable } from '../components/AdminStatisticTable'
import { mapPlayerStatsResponseToListRow } from '../utils/adminStatisticDraftUtils'
import type {
  AdminStatisticListRow,
  AdminStatisticPlayerOption,
  AdminStatisticPositionGroup,
  AdminStatisticSeasonOption,
  AdminStatisticSort,
} from '../utils/adminStatisticTypes'

const DEFAULT_PAGE_SIZE = 10

export function AdminStatisticListPage() {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [debouncedTeam, setDebouncedTeam] = useState('')
  const [seasonId, setSeasonId] = useState<number | 'all'>('all')
  const [playerId, setPlayerId] = useState<number | 'all'>('all')
  const [team, setTeam] = useState('')
  const [sort, setSort] = useState<AdminStatisticSort>('goals-desc')
  const [positionGroup, setPositionGroup] = useState<AdminStatisticPositionGroup>('all')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)
  const [rows, setRows] = useState<AdminStatisticListRow[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [seasons, setSeasons] = useState<AdminStatisticSeasonOption[]>([])
  const [players, setPlayers] = useState<AdminStatisticPlayerOption[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<AdminStatisticListRow | null>(null)
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
    const timer = window.setTimeout(() => {
      setDebouncedTeam(team.trim())
    }, 300)

    return () => {
      window.clearTimeout(timer)
    }
  }, [team])

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, debouncedTeam, seasonId, playerId, sort, positionGroup, pageSize])

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

    async function loadStats() {
      setIsLoading(true)

      const result = await playerStatsService.getAllForAdmin({
        pageNumber: page,
        pageSize,
        search: debouncedSearch || undefined,
        seasonId: seasonId === 'all' ? undefined : seasonId,
        playerId: playerId === 'all' ? undefined : playerId,
        team: debouncedTeam || undefined,
        positionGroup,
        sort,
      })

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setRows(result.data.items.map(mapPlayerStatsResponseToListRow))
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

    void loadStats()

    return () => {
      cancelled = true
    }
  }, [
    page,
    pageSize,
    debouncedSearch,
    debouncedTeam,
    seasonId,
    playerId,
    sort,
    positionGroup,
    listVersion,
  ])

  function clearFilters() {
    setSearch('')
    setDebouncedSearch('')
    setTeam('')
    setDebouncedTeam('')
    setSeasonId('all')
    setPlayerId('all')
    setSort('goals-desc')
    setPositionGroup('all')
    setPage(1)
  }

  async function handleConfirmDelete() {
    if (!deleteTarget || deletingId != null) {
      return
    }

    const deletedId = deleteTarget.id
    setDeletingId(deletedId)

    const result = await playerStatsService.remove(deletedId)

    if (result.success) {
      setDeleteTarget(null)
      setListVersion((prev) => prev + 1)
    }

    setDeletingId(null)
  }

  return (
    <div className="flex flex-col">
      <main className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
        <AdminStatisticListHeader />

        <AdminStatisticListFilters
          search={search}
          seasonId={seasonId}
          playerId={playerId}
          team={team}
          sort={sort}
          positionGroup={positionGroup}
          seasons={seasons}
          players={players}
          onSearchChange={setSearch}
          onSeasonChange={setSeasonId}
          onPlayerChange={setPlayerId}
          onTeamChange={setTeam}
          onSortChange={setSort}
          onPositionChange={setPositionGroup}
          onClear={clearFilters}
        />

        {isLoading ? (
          <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
            İstatistikler yükleniyor...
          </p>
        ) : (
          <AdminStatisticTable
            rows={rows}
            deletingId={deletingId}
            onDelete={setDeleteTarget}
          />
        )}

        {!isLoading && totalCount > 0 ? (
          <AdminStatisticPagination
            page={page}
            pageSize={pageSize}
            total={totalCount}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        ) : null}
      </main>

      <AdminStatisticDeleteModal
        open={Boolean(deleteTarget)}
        playerName={deleteTarget?.playerName ?? 'Oyuncu'}
        seasonName={deleteTarget?.season ?? ''}
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
