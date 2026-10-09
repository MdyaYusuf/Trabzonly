import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '@/core/store/hooks'
import playerService from '@/features/players/playerService'
import { SquadBuilderBench } from '../components/SquadBuilderBench'
import { SquadBuilderNotes } from '../components/SquadBuilderNotes'
import { SquadBuilderPitch } from '../components/SquadBuilderPitch'
import { SquadBuilderPlayerPool } from '../components/SquadBuilderPlayerPool'
import { SquadBuilderPublishModal } from '../components/SquadBuilderPublishModal'
import { SquadBuilderTactics } from '../components/SquadBuilderTactics'
import { SquadBuilderToolbar } from '../components/SquadBuilderToolbar'
import squadService from '../squadService'
import type { CreateSquadRequest, SquadSlotRequest } from '../squadTypes'
import { mapPlayerToBuilderPlayer } from '../utils/mapPlayerToBuilderPlayer'
import {
  BENCH_SLOT_IDS,
  NOTES_MAX_LENGTH,
  attackStyleOptions,
  computeSquadStats,
  defaultNotes,
  defaultTitle,
  defenseLineOptions,
  getFormationConfig,
  isBenchSlotId,
  slotIdsForFormation,
  tempoOptions,
} from '../utils/squadBuilderPlaceholders'
import type {
  AssignmentSlotId,
  AttackStyleOption,
  BenchSlotId,
  BuilderFormationId,
  BuilderPlayer,
  BuilderPosGroup,
  BuilderSlotId,
  DefenseLineOption,
  TempoOption,
} from '../utils/squadBuilderTypes'

export function SquadBuilderPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  const [title, setTitle] = useState(defaultTitle)
  const [formationId, setFormationId] = useState<BuilderFormationId>('4-2-3-1')
  const [starterAssignments, setStarterAssignments] = useState<
    Partial<Record<BuilderSlotId, string>>
  >({})
  const [benchAssignments, setBenchAssignments] = useState<Partial<Record<BenchSlotId, string>>>(
    {},
  )
  const [selectedSlotId, setSelectedSlotId] = useState<AssignmentSlotId | null>(null)
  const [search, setSearch] = useState('')
  const [posFilter, setPosFilter] = useState<BuilderPosGroup>('ALL')
  const [attackStyle, setAttackStyle] = useState<AttackStyleOption>(attackStyleOptions[0])
  const [defenseLine, setDefenseLine] = useState<DefenseLineOption>(defenseLineOptions[0])
  const [tempo, setTempo] = useState<TempoOption>(tempoOptions[0])
  const [captainPlayerId, setCaptainPlayerId] = useState('')
  const [cornerTakerPlayerId, setCornerTakerPlayerId] = useState('')
  const [freeKickTakerPlayerId, setFreeKickTakerPlayerId] = useState('')
  const [notes, setNotes] = useState(defaultNotes)
  const [players, setPlayers] = useState<BuilderPlayer[]>([])
  const [isLoadingPlayers, setIsLoadingPlayers] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [publishedSquadId, setPublishedSquadId] = useState<string | null>(null)
  const [isPublishing, setIsPublishing] = useState(false)
  const [draftToast, setDraftToast] = useState<string | null>(null)

  const formation = getFormationConfig(formationId)
  const playersById = useMemo(() => {
    const map = new Map<string, BuilderPlayer>()
    for (const player of players) {
      map.set(player.id, player)
    }
    return map
  }, [players])

  const stats = useMemo(
    () => computeSquadStats(starterAssignments, benchAssignments, playersById),
    [starterAssignments, benchAssignments, playersById],
  )

  const allAssignments = useMemo(
    () => ({ ...starterAssignments, ...benchAssignments }) as Partial<
      Record<AssignmentSlotId, string>
    >,
    [starterAssignments, benchAssignments],
  )

  const starterPlayers = useMemo(() => {
    return slotIdsForFormation(formationId)
      .map((slotId) => {
        const playerId = starterAssignments[slotId]
        return playerId ? playersById.get(playerId) : undefined
      })
      .filter((player): player is BuilderPlayer => Boolean(player))
  }, [formationId, starterAssignments, playersById])

  const starterPlayerIds = useMemo(
    () => new Set(starterPlayers.map((player) => player.id)),
    [starterPlayers],
  )

  useEffect(() => {
    if (!starterPlayerIds.has(captainPlayerId)) {
      setCaptainPlayerId('')
    }

    if (!starterPlayerIds.has(cornerTakerPlayerId)) {
      setCornerTakerPlayerId('')
    }

    if (!starterPlayerIds.has(freeKickTakerPlayerId)) {
      setFreeKickTakerPlayerId('')
    }
  }, [starterPlayerIds, captainPlayerId, cornerTakerPlayerId, freeKickTakerPlayerId])

  useEffect(() => {
    let cancelled = false

    async function loadPlayers() {
      setIsLoadingPlayers(true)

      const result = await playerService.getAll({
        pageNumber: 1,
        pageSize: 100,
        sort: 'number-asc',
      })

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setPlayers(result.data.items.map(mapPlayerToBuilderPlayer))
      } else {
        setPlayers([])
      }

      setIsLoadingPlayers(false)
    }

    void loadPlayers()

    return () => {
      cancelled = true
    }
  }, [])

  function showToast(message: string) {
    setDraftToast(message)
    window.setTimeout(() => {
      setDraftToast(null)
    }, 2200)
  }

  function handleFormationChange(nextId: BuilderFormationId) {
    const nextSlots = new Set(slotIdsForFormation(nextId))
    const kept: Partial<Record<BuilderSlotId, string>> = {}

    for (const [slotId, playerId] of Object.entries(starterAssignments)) {
      if (nextSlots.has(slotId as BuilderSlotId) && playerId) {
        kept[slotId as BuilderSlotId] = playerId
      }
    }

    setFormationId(nextId)
    setStarterAssignments(kept)
    setSelectedSlotId(null)
  }

  function handleClear() {
    setStarterAssignments({})
    setBenchAssignments({})
    setCaptainPlayerId('')
    setCornerTakerPlayerId('')
    setFreeKickTakerPlayerId('')
    setSelectedSlotId(null)
  }

  function handleClearStarterSlot(slotId: BuilderSlotId) {
    setStarterAssignments((prev) => {
      const next = { ...prev }
      delete next[slotId]
      return next
    })

    if (selectedSlotId === slotId) {
      setSelectedSlotId(null)
    }
  }

  function handleClearBenchSlot(slotId: BenchSlotId) {
    setBenchAssignments((prev) => {
      const next = { ...prev }
      delete next[slotId]
      return next
    })

    if (selectedSlotId === slotId) {
      setSelectedSlotId(null)
    }
  }

  function handleSelectStarterSlot(slotId: BuilderSlotId) {
    setSelectedSlotId((prev) => (prev === slotId ? null : slotId))
  }

  function handleSelectBenchSlot(slotId: BenchSlotId) {
    setSelectedSlotId((prev) => (prev === slotId ? null : slotId))
  }

  function handleAssign(playerId: string) {
    const alreadyAssigned = Object.values(allAssignments).includes(playerId)

    if (alreadyAssigned) {
      return
    }

    if (selectedSlotId && isBenchSlotId(selectedSlotId)) {
      setBenchAssignments((prev) => ({
        ...prev,
        [selectedSlotId]: playerId,
      }))
      setSelectedSlotId(null)
      return
    }

    if (selectedSlotId && !isBenchSlotId(selectedSlotId)) {
      setStarterAssignments((prev) => ({
        ...prev,
        [selectedSlotId]: playerId,
      }))
      setSelectedSlotId(null)
      return
    }

    const starterSlotIds = slotIdsForFormation(formationId)
    const emptyStarter = starterSlotIds.find((slotId) => !starterAssignments[slotId])

    if (emptyStarter) {
      setStarterAssignments((prev) => ({
        ...prev,
        [emptyStarter]: playerId,
      }))
      return
    }

    const emptyBench = BENCH_SLOT_IDS.find((slotId) => !benchAssignments[slotId])

    if (emptyBench) {
      setBenchAssignments((prev) => ({
        ...prev,
        [emptyBench]: playerId,
      }))
      return
    }

    showToast('Tüm slotlar dolu. Önce bir pozisyonu boşaltın.')
  }

  const canPublish =
    stats.starterFilled === 11 &&
    stats.benchFilled === 10 &&
    Boolean(captainPlayerId) &&
    Boolean(cornerTakerPlayerId) &&
    Boolean(freeKickTakerPlayerId) &&
    title.trim().length > 0 &&
    notes.length <= NOTES_MAX_LENGTH &&
    starterPlayerIds.has(captainPlayerId) &&
    starterPlayerIds.has(cornerTakerPlayerId) &&
    starterPlayerIds.has(freeKickTakerPlayerId)

  async function handlePublish() {
    if (!canPublish || isPublishing) {
      return
    }

    if (!isAuthenticated) {
      showToast('Yayınlamak için giriş yapmalısınız.')
      navigate('/login')
      return
    }

    const starterSlots: SquadSlotRequest[] = slotIdsForFormation(formationId).map(
      (slotKey, index) => ({
        slotKey,
        sortOrder: index,
        playerId: Number(starterAssignments[slotKey]),
      }),
    )

    const benchSlots: SquadSlotRequest[] = BENCH_SLOT_IDS.map((slotKey, index) => ({
      slotKey,
      sortOrder: 11 + index,
      playerId: Number(benchAssignments[slotKey]),
    }))

    const request: CreateSquadRequest = {
      title: title.trim() || defaultTitle,
      formation: formationId,
      notes: notes.trim(),
      attackStyle,
      defenseLine,
      tempo,
      captainPlayerId: Number(captainPlayerId),
      cornerTakerPlayerId: Number(cornerTakerPlayerId),
      freeKickTakerPlayerId: Number(freeKickTakerPlayerId),
      slots: [...starterSlots, ...benchSlots],
    }

    setIsPublishing(true)

    const result = await squadService.add(request)

    setIsPublishing(false)

    if (!result.success || !result.data) {
      showToast(result.message || 'Kadro yayınlanamadı.')
      return
    }

    setPublishedSquadId(result.data.id)
    setModalOpen(true)
  }

  return (
    <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
      <SquadBuilderToolbar
        title={title}
        formationId={formationId}
        starterFilled={stats.starterFilled}
        benchFilled={stats.benchFilled}
        avgAge={stats.avgAge}
        totalValue={stats.totalValue}
        canPublish={canPublish}
        isPublishing={isPublishing}
        onTitleChange={setTitle}
        onFormationChange={handleFormationChange}
        onClear={handleClear}
        onSaveDraft={() => {
          showToast('Taslak kaydı yakında aktif.')
        }}
        onPublish={() => {
          void handlePublish()
        }}
      />

      {draftToast ? (
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-12">
          <div className="mb-space-sm bg-secondary-container px-space-md py-space-sm text-on-secondary-container shadow-sm">
            <span className="font-label text-label-md">{draftToast}</span>
          </div>
        </div>
      ) : null}

      <section className="mx-auto w-full max-w-[1360px] px-4 py-space-xl sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-gutter lg:grid-cols-12">
          <div className="flex flex-col gap-space-md lg:col-span-7">
            <SquadBuilderPitch
              formation={formation}
              assignments={starterAssignments}
              playersById={playersById}
              selectedSlotId={
                selectedSlotId && !isBenchSlotId(selectedSlotId) ? selectedSlotId : null
              }
              onSelectSlot={handleSelectStarterSlot}
              onClearSlot={handleClearStarterSlot}
            />

            <SquadBuilderTactics
              attackStyle={attackStyle}
              defenseLine={defenseLine}
              tempo={tempo}
              captainPlayerId={captainPlayerId}
              cornerTakerPlayerId={cornerTakerPlayerId}
              freeKickTakerPlayerId={freeKickTakerPlayerId}
              starterPlayers={starterPlayers}
              onAttackStyleChange={setAttackStyle}
              onDefenseLineChange={setDefenseLine}
              onTempoChange={setTempo}
              onCaptainChange={setCaptainPlayerId}
              onCornerTakerChange={setCornerTakerPlayerId}
              onFreeKickTakerChange={setFreeKickTakerPlayerId}
            />

            <SquadBuilderBench
              assignments={benchAssignments}
              playersById={playersById}
              selectedSlotId={
                selectedSlotId && isBenchSlotId(selectedSlotId) ? selectedSlotId : null
              }
              onSelectSlot={handleSelectBenchSlot}
              onClearSlot={handleClearBenchSlot}
            />
          </div>

          <div className="flex flex-col gap-space-lg lg:col-span-5">
            {isLoadingPlayers ? (
              <p className="font-body bg-surface-container-lowest p-space-md text-body-md text-on-surface-variant shadow-sm">
                Oyuncu havuzu yükleniyor…
              </p>
            ) : (
              <SquadBuilderPlayerPool
                players={players}
                assignments={allAssignments}
                search={search}
                posFilter={posFilter}
                starterFilled={stats.starterFilled}
                benchFilled={stats.benchFilled}
                selectedSlotId={selectedSlotId}
                onSearchChange={setSearch}
                onPosFilterChange={setPosFilter}
                onAssign={handleAssign}
              />
            )}
            <SquadBuilderNotes notes={notes} onNotesChange={setNotes} />
          </div>
        </div>
      </section>

      <SquadBuilderPublishModal
        open={modalOpen}
        title={title || defaultTitle}
        formationLabel={formationId}
        squadId={publishedSquadId}
        starterFilled={stats.starterFilled}
        benchFilled={stats.benchFilled}
        onClose={() => {
          setModalOpen(false)
          if (publishedSquadId) {
            navigate(`/kadrolar/${publishedSquadId}`)
          }
        }}
      />
    </main>
  )
}
