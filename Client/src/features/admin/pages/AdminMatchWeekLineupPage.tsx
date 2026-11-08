import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import matchWeekService from '@/features/matchWeek/matchWeekService'
import type { ClubResponseDto, MatchWeekResponseDto } from '@/features/matchWeek/matchWeekTypes'
import playerService from '@/features/players/playerService'
import { mapPlayerToBuilderPlayer } from '@/features/squads/utils/mapPlayerToBuilderPlayer'
import {
  formationConfigs,
  getFormationConfig,
  isBenchSlotId,
  slotIdsForFormation,
} from '@/features/squads/utils/squadBuilderPlaceholders'
import type {
  AssignmentSlotId,
  BenchSlotId,
  BuilderFormationId,
  BuilderPlayer,
  BuilderPosGroup,
  BuilderSlotId,
} from '@/features/squads/utils/squadBuilderTypes'
import { AdminMatchWeekBench } from '../components/AdminMatchWeekBench'
import { AdminMatchWeekNewWeekModal } from '../components/AdminMatchWeekNewWeekModal'
import { AdminMatchWeekPitch } from '../components/AdminMatchWeekPitch'
import { AdminMatchWeekPlayerPool } from '../components/AdminMatchWeekPlayerPool'
import {
  MATCH_WEEK_BENCH_SLOT_IDS,
  MATCH_WEEK_MAX_BENCH,
  buildMatchWeekSlotsRequest,
  countFilledBench,
  countFilledStarters,
  isBuilderFormationId,
  mapMatchWeekToAssignments,
} from '../utils/adminMatchWeekLineupUtils'

const inputClass =
  'font-body w-full border border-outline-variant/50 bg-surface px-space-md py-space-sm text-body-md text-on-surface outline-none focus:border-primary'

const buttonClass =
  'font-label inline-flex h-10 cursor-pointer items-center justify-center gap-1 border px-space-md text-label-md uppercase disabled:cursor-not-allowed disabled:opacity-40'

export function AdminMatchWeekLineupPage() {
  const [formationId, setFormationId] = useState<BuilderFormationId>('4-2-3-1')
  const [starterAssignments, setStarterAssignments] = useState<
    Partial<Record<BuilderSlotId, string>>
  >({})
  const [benchAssignments, setBenchAssignments] = useState<Partial<Record<BenchSlotId, string>>>(
    {},
  )
  const [opponentClubId, setOpponentClubId] = useState('')
  const [isHome, setIsHome] = useState(true)
  const [homeScore, setHomeScore] = useState('')
  const [awayScore, setAwayScore] = useState('')
  const [clubs, setClubs] = useState<ClubResponseDto[]>([])
  const [players, setPlayers] = useState<BuilderPlayer[]>([])
  const [search, setSearch] = useState('')
  const [posFilter, setPosFilter] = useState<BuilderPosGroup>('ALL')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isStartingNewWeek, setIsStartingNewWeek] = useState(false)
  const [newWeekModalOpen, setNewWeekModalOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)

  const formation = getFormationConfig(formationId)

  const playersById = useMemo(() => {
    const map = new Map<string, BuilderPlayer>()
    for (const player of players) {
      map.set(player.id, player)
    }
    return map
  }, [players])

  const allAssignments = useMemo(
    () =>
      ({ ...starterAssignments, ...benchAssignments }) as Partial<
        Record<AssignmentSlotId, string>
      >,
    [starterAssignments, benchAssignments],
  )

  const assignedPlayerIds = useMemo(() => {
    const ids = new Set<string>()

    for (const playerId of Object.values(allAssignments)) {
      if (playerId) {
        ids.add(playerId)
      }
    }

    return ids
  }, [allAssignments])

  const availablePlayers = useMemo(
    () => players.filter((player) => !assignedPlayerIds.has(player.id)),
    [players, assignedPlayerIds],
  )

  const starterFilled = countFilledStarters(formationId, starterAssignments)
  const benchFilled = countFilledBench(benchAssignments)
  const canSave = starterFilled === 11 && opponentClubId !== ''

  useEffect(() => {
    let cancelled = false

    async function loadPage() {
      setIsLoading(true)
      setError(null)

      const [clubsResult, playersResult, matchWeekResult] = await Promise.all([
        matchWeekService.getClubs(),
        playerService.getAllForAdmin({
          pageNumber: 1,
          pageSize: 200,
          isActive: true,
          sort: 'number-asc',
        }),
        matchWeekService.getCurrent(),
      ])

      if (cancelled) {
        return
      }

      if (clubsResult.success && clubsResult.data) {
        setClubs(clubsResult.data.filter((club) => !club.isTrabzonspor))
      } else {
        setClubs([])
      }

      if (playersResult.success && playersResult.data) {
        setPlayers(playersResult.data.items.map(mapPlayerToBuilderPlayer))
      } else {
        setPlayers([])
      }

      if (matchWeekResult.success && matchWeekResult.data) {
        applyMatchWeek(matchWeekResult.data)
      } else if (!matchWeekResult.success) {
        setError(matchWeekResult.message || 'Maç haftası yüklenemedi.')
      }

      setIsLoading(false)
    }

    void loadPage()

    return () => {
      cancelled = true
    }
  }, [])

  function applyMatchWeek(matchWeek: MatchWeekResponseDto) {

    const mapped = mapMatchWeekToAssignments(matchWeek)

    if (mapped) {
      setFormationId(mapped.formationId)
      setStarterAssignments(mapped.starterAssignments)
      setBenchAssignments(mapped.benchAssignments)
    } else if (matchWeek.slots.length > 0) {
      setError('Kayıtlı diziliş desteklenmiyor. Dizilişi yeniden seçin.')
    } else if (isBuilderFormationId(matchWeek.formation.trim())) {
      setFormationId(matchWeek.formation.trim() as BuilderFormationId)
      setStarterAssignments({})
      setBenchAssignments({})
    }

    setOpponentClubId(
      matchWeek.opponentClub?.id != null ? String(matchWeek.opponentClub.id) : '',
    )
    setIsHome(matchWeek.isHome)
    setHomeScore(matchWeek.homeScore == null ? '' : String(matchWeek.homeScore))
    setAwayScore(matchWeek.awayScore == null ? '' : String(matchWeek.awayScore))
  }

  function showFeedback(message: string) {
    setFeedback(message)
    window.setTimeout(() => {
      setFeedback(null)
    }, 2400)
  }

  function findSlotForPlayer(playerId: string): AssignmentSlotId | null {
    for (const [slotId, assignedId] of Object.entries(starterAssignments)) {
      if (assignedId === playerId) {
        return slotId as BuilderSlotId
      }
    }

    for (const [slotId, assignedId] of Object.entries(benchAssignments)) {
      if (assignedId === playerId) {
        return slotId as BenchSlotId
      }
    }

    return null
  }

  function handleFormationChange(nextId: BuilderFormationId) {
    const nextSlots = new Set(slotIdsForFormation(nextId))
    const keptPlayers: Partial<Record<BuilderSlotId, string>> = {}

    for (const [slotId, playerId] of Object.entries(starterAssignments)) {
      if (nextSlots.has(slotId as BuilderSlotId) && playerId) {
        keptPlayers[slotId as BuilderSlotId] = playerId
      }
    }

    setFormationId(nextId)
    setStarterAssignments(keptPlayers)
  }

  function handleClearStarterSlot(slotId: BuilderSlotId) {
    setStarterAssignments((prev) => {
      const next = { ...prev }
      delete next[slotId]
      return next
    })
  }

  function handleClearBenchSlot(slotId: BenchSlotId) {
    setBenchAssignments((prev) => {
      const next = { ...prev }
      delete next[slotId]
      return next
    })
  }

  function handleAssignToStarterSlot(slotId: BuilderSlotId, playerId: string) {
    if (assignedPlayerIds.has(playerId)) {
      return
    }

    setStarterAssignments((prev) => ({
      ...prev,
      [slotId]: playerId,
    }))
  }

  function handleAssignToBenchSlot(slotId: BenchSlotId, playerId: string) {
    if (assignedPlayerIds.has(playerId)) {
      return
    }

    setBenchAssignments((prev) => ({
      ...prev,
      [slotId]: playerId,
    }))
  }

  function handleDropOnStarterSlot(
    targetSlotId: BuilderSlotId,
    playerId: string,
    sourceSlotId?: string,
  ) {
    const source =
      (sourceSlotId as AssignmentSlotId | undefined) ?? findSlotForPlayer(playerId)

    if (source === targetSlotId) {
      return
    }

    const targetPlayerId = starterAssignments[targetSlotId]

    if (source && !isBenchSlotId(source)) {
      setStarterAssignments((prev) => {
        const next = { ...prev }
        const currentTarget = next[targetSlotId]

        if (currentTarget) {
          next[source] = currentTarget
        } else {
          delete next[source]
        }

        next[targetSlotId] = playerId
        return next
      })
      return
    }

    if (source && isBenchSlotId(source)) {
      setStarterAssignments((prev) => ({
        ...prev,
        [targetSlotId]: playerId,
      }))
      setBenchAssignments((prev) => {
        const next = { ...prev }

        if (targetPlayerId) {
          next[source] = targetPlayerId
        } else {
          delete next[source]
        }

        return next
      })
      return
    }

    setStarterAssignments((prev) => ({
      ...prev,
      [targetSlotId]: playerId,
    }))
  }

  function handleDropOnBenchSlot(
    targetSlotId: BenchSlotId,
    playerId: string,
    sourceSlotId?: string,
  ) {
    const source =
      (sourceSlotId as AssignmentSlotId | undefined) ?? findSlotForPlayer(playerId)

    if (source === targetSlotId) {
      return
    }

    const targetPlayerId = benchAssignments[targetSlotId]

    if (source && isBenchSlotId(source)) {
      setBenchAssignments((prev) => {
        const next = { ...prev }
        const currentTarget = next[targetSlotId]

        if (currentTarget) {
          next[source] = currentTarget
        } else {
          delete next[source]
        }

        next[targetSlotId] = playerId
        return next
      })
      return
    }

    if (source && !isBenchSlotId(source)) {
      setBenchAssignments((prev) => ({
        ...prev,
        [targetSlotId]: playerId,
      }))
      setStarterAssignments((prev) => {
        const next = { ...prev }

        if (targetPlayerId) {
          next[source] = targetPlayerId
        } else {
          delete next[source]
        }

        return next
      })
      return
    }

    setBenchAssignments((prev) => ({
      ...prev,
      [targetSlotId]: playerId,
    }))
  }

  function handlePoolAssign(playerId: string) {
    if (assignedPlayerIds.has(playerId)) {
      return
    }

    const emptyStarter = slotIdsForFormation(formationId).find(
      (slotId) => !starterAssignments[slotId],
    )

    if (emptyStarter) {
      handleAssignToStarterSlot(emptyStarter, playerId)
      return
    }

    const emptyBench = MATCH_WEEK_BENCH_SLOT_IDS.find((slotId) => !benchAssignments[slotId])

    if (emptyBench) {
      handleAssignToBenchSlot(emptyBench, playerId)
    }
  }

  function buildRequest() {
    const parsedOpponentId = Number(opponentClubId)
    const homeScoreValue = homeScore.trim() === '' ? null : Number(homeScore)
    const awayScoreValue = awayScore.trim() === '' ? null : Number(awayScore)

    return {
      formation: formationId,
      opponentClubId: parsedOpponentId,
      isHome,
      homeScore: homeScoreValue,
      awayScore: awayScoreValue,
      slots: buildMatchWeekSlotsRequest(formationId, starterAssignments, benchAssignments),
    }
  }

  function validateBeforeSave(): string | null {
    if (!canSave) {
      return '11 kişilik ilk 11 ve rakip kulüp zorunludur.'
    }

    const homeEmpty = homeScore.trim() === ''
    const awayEmpty = awayScore.trim() === ''

    if (homeEmpty !== awayEmpty) {
      return 'Ev sahibi ve deplasman skorları birlikte girilmeli veya birlikte boş bırakılmalıdır.'
    }

    if (!homeEmpty) {
      if (!/^\d+$/.test(homeScore.trim()) || !/^\d+$/.test(awayScore.trim())) {
        return 'Skorlar negatif olmayan tam sayı olmalıdır.'
      }
    }

    if (!Number.isFinite(Number(opponentClubId)) || Number(opponentClubId) <= 0) {
      return 'Geçerli bir rakip kulüp seçin.'
    }

    if (benchFilled > MATCH_WEEK_MAX_BENCH) {
      return `Yedek kulübesi en fazla ${MATCH_WEEK_MAX_BENCH} oyuncu olabilir.`
    }

    return null
  }

  async function handleSave() {
    const validationError = validateBeforeSave()

    if (validationError) {
      setError(validationError)
      return
    }

    setIsSaving(true)
    setError(null)

    const result = await matchWeekService.saveCurrent(buildRequest())

    if (result.success && result.data) {
      applyMatchWeek(result.data)
      showFeedback(result.message || 'Kadro kaydedildi.')
    } else {
      setError(result.message || 'Kadro kaydedilemedi.')
    }

    setIsSaving(false)
  }

  async function handleConfirmNewWeek() {
    const validationError = validateBeforeSave()

    if (validationError) {
      setError(validationError)
      setNewWeekModalOpen(false)
      return
    }

    setIsStartingNewWeek(true)
    setError(null)

    const result = await matchWeekService.startNewWeek(buildRequest())

    if (result.success && result.data) {
      applyMatchWeek(result.data)
      setNewWeekModalOpen(false)
      showFeedback(result.message || 'Yeni hafta kaydedildi.')
    } else {
      setError(result.message || 'Yeni hafta kaydedilemedi.')
    }

    setIsStartingNewWeek(false)
  }

  const isBusy = isLoading || isSaving || isStartingNewWeek

  return (
    <div className="flex flex-col">
      <main className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
        <header className="flex flex-wrap items-end justify-between gap-space-md">
          <div className="flex max-w-3xl flex-col gap-space-xs">
            <h1 className="font-headline text-headline-lg font-extrabold tracking-tight text-primary uppercase">
              Maç Haftası Kadrosu
            </h1>
            <p className="font-body text-body-md text-on-surface-variant">
              Canlı haftanın dizilişini, rakibini ve skoru yönet. Kaydet kadroyu günceller; Yeni
              hafta puanları her zaman sıfırlar.
            </p>
            <Link
              to="/yonetim/mac-haftasi/fikstur"
              className="font-label w-fit text-label-md text-primary uppercase underline-offset-2 hover:underline"
            >
              Fikstür yönetimine git
            </Link>
          </div>

          <div className="flex flex-wrap gap-space-sm">
            <button
              type="button"
              disabled={isBusy || !canSave}
              onClick={() => {
                setNewWeekModalOpen(true)
              }}
              className={`${buttonClass} border-error text-error hover:bg-error/10`}
            >
              Yeni Hafta
            </button>
            <button
              type="button"
              disabled={isBusy || !canSave}
              onClick={() => {
                void handleSave()
              }}
              className={`${buttonClass} border-primary bg-primary text-on-primary`}
            >
              {isSaving ? 'Kaydediliyor…' : 'Kaydet'}
            </button>
          </div>
        </header>

        {error ? (
          <p className="font-body border border-error/30 bg-error-container/30 px-space-md py-space-sm text-body-md text-error">
            {error}
          </p>
        ) : null}

        {feedback ? (
          <p className="font-body border border-primary/20 bg-primary-container/10 px-space-md py-space-sm text-body-md text-primary">
            {feedback}
          </p>
        ) : null}

        {isLoading ? (
          <p className="font-body text-body-md text-on-surface-variant">Kadro yükleniyor…</p>
        ) : (
          <>
            <section className="grid gap-space-md border border-outline-variant/40 bg-surface p-space-md lg:grid-cols-[1fr_auto_auto_auto]">
              <div>
                <label
                  htmlFor="match-week-opponent"
                  className="font-label mb-1 block text-label-md text-on-surface-variant"
                >
                  Rakip
                </label>
                <select
                  id="match-week-opponent"
                  value={opponentClubId}
                  disabled={isBusy}
                  onChange={(event) => {
                    setOpponentClubId(event.target.value)
                  }}
                  className={`${inputClass} cursor-pointer`}
                >
                  <option value="">Kulüp seç…</option>
                  {clubs.map((club) => (
                    <option key={club.id} value={club.id}>
                      {club.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="font-label mb-1 block text-label-md text-on-surface-variant">
                  Saha
                </span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    disabled={isBusy}
                    onClick={() => {
                      setIsHome(true)
                    }}
                    className={`font-label cursor-pointer px-space-md py-space-sm text-label-md uppercase ${
                      isHome
                        ? 'bg-primary text-on-primary'
                        : 'border border-outline-variant/50 text-on-surface-variant'
                    }`}
                  >
                    Ev
                  </button>
                  <button
                    type="button"
                    disabled={isBusy}
                    onClick={() => {
                      setIsHome(false)
                    }}
                    className={`font-label cursor-pointer px-space-md py-space-sm text-label-md uppercase ${
                      !isHome
                        ? 'bg-primary text-on-primary'
                        : 'border border-outline-variant/50 text-on-surface-variant'
                    }`}
                  >
                    Deplasman
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="match-week-home-score"
                  className="font-label mb-1 block text-label-md text-on-surface-variant"
                >
                  Ev Skoru
                </label>
                <input
                  id="match-week-home-score"
                  type="text"
                  inputMode="numeric"
                  value={homeScore}
                  disabled={isBusy}
                  onChange={(event) => {
                    setHomeScore(event.target.value)
                  }}
                  className={`${inputClass} w-24`}
                />
              </div>

              <div>
                <label
                  htmlFor="match-week-away-score"
                  className="font-label mb-1 block text-label-md text-on-surface-variant"
                >
                  Dep Skoru
                </label>
                <input
                  id="match-week-away-score"
                  type="text"
                  inputMode="numeric"
                  value={awayScore}
                  disabled={isBusy}
                  onChange={(event) => {
                    setAwayScore(event.target.value)
                  }}
                  className={`${inputClass} w-24`}
                />
              </div>
            </section>

            <section className="flex flex-wrap items-center gap-space-sm">
              <label
                htmlFor="match-week-formation"
                className="font-label text-label-md text-on-surface-variant uppercase"
              >
                Diziliş
              </label>
              <select
                id="match-week-formation"
                value={formationId}
                disabled={isBusy}
                onChange={(event) => {
                  handleFormationChange(event.target.value as BuilderFormationId)
                }}
                className={`${inputClass} w-40 cursor-pointer`}
              >
                {formationConfigs.map((config) => (
                  <option key={config.id} value={config.id}>
                    {config.label}
                  </option>
                ))}
              </select>
              <span className="font-label text-label-md text-on-surface-variant">
                İlk 11: {starterFilled}/11 · Yedek: {benchFilled}/{MATCH_WEEK_MAX_BENCH}
              </span>
            </section>

            <div className="grid gap-space-lg xl:grid-cols-[minmax(0,1fr)_20rem]">
              <div className="flex flex-col gap-space-md">
                <AdminMatchWeekPitch
                  formation={formation}
                  assignments={starterAssignments}
                  players={players}
                  playersById={playersById}
                  assignedPlayerIds={assignedPlayerIds}
                  onAssignToSlot={handleAssignToStarterSlot}
                  onDropPlayer={handleDropOnStarterSlot}
                  onClearSlot={handleClearStarterSlot}
                />
                <AdminMatchWeekBench
                  assignments={benchAssignments}
                  playersById={playersById}
                  availablePlayers={availablePlayers}
                  onClearSlot={handleClearBenchSlot}
                  onAssignToSlot={handleAssignToBenchSlot}
                  onDropPlayer={handleDropOnBenchSlot}
                />
              </div>

              <AdminMatchWeekPlayerPool
                players={players}
                assignments={allAssignments}
                search={search}
                posFilter={posFilter}
                starterFilled={starterFilled}
                benchFilled={benchFilled}
                onSearchChange={setSearch}
                onPosFilterChange={setPosFilter}
                onAssign={handlePoolAssign}
              />
            </div>
          </>
        )}
      </main>

      <AdminMatchWeekNewWeekModal
        open={newWeekModalOpen}
        isSubmitting={isStartingNewWeek}
        onCancel={() => {
          setNewWeekModalOpen(false)
        }}
        onConfirm={() => {
          void handleConfirmNewWeek()
        }}
      />
    </div>
  )
}
