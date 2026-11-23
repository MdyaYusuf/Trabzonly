import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppSelector } from '@/core/store/hooks'
import playerService from '@/features/players/playerService'
import { PlayerCategory } from '@/features/players/playerTypes'
import positionService from '@/features/positions/positionService'
import type { PositionRoleResponseDto } from '@/features/positions/positionTypes'
import { SquadBuilderBench } from '../components/SquadBuilderBench'
import { SquadBuilderNotes } from '../components/SquadBuilderNotes'
import { SquadBuilderPitch } from '../components/SquadBuilderPitch'
import { SquadBuilderPlayerPool } from '../components/SquadBuilderPlayerPool'
import { SquadBuilderPublishModal } from '../components/SquadBuilderPublishModal'
import { SquadBuilderSidebarActions } from '../components/SquadBuilderSidebarActions'
import { SquadBuilderSidebarStats } from '../components/SquadBuilderSidebarStats'
import { SquadBuilderTactics } from '../components/SquadBuilderTactics'
import { SquadBuilderToolbar } from '../components/SquadBuilderToolbar'
import squadService from '../squadService'
import type {
  CreateSquadRequest,
  SquadResponseDto,
  SquadSlotRequest,
  UpdateSquadRequest,
} from '../squadTypes'
import { getCatalogAbbreviationForSlot } from '../utils/getCatalogAbbreviationForSlot'
import {
  mapPlayerToBuilderPlayer,
  mapSquadSlotToBuilderPlayer,
  mergeBuilderPlayers,
} from '../utils/mapPlayerToBuilderPlayer'
import {
  BENCH_SLOT_IDS,
  NOTES_MAX_LENGTH,
  attackStyleOptions,
  computeSquadStats,
  defenseLineOptions,
  getFormationConfig,
  isBenchSlotId,
  slotIdsForFormation,
  tempoOptions,
} from '../utils/squadBuilderConfig'
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
import { DEFAULT_ENABLED_POOL_CATEGORIES } from '../utils/squadPoolCategories'

function isBuilderFormationId(value: string): value is BuilderFormationId {
  return getFormationConfig(value as BuilderFormationId).id === value
}

function isAttackStyleOption(value: string): value is AttackStyleOption {
  return (attackStyleOptions as readonly string[]).includes(value)
}

function isDefenseLineOption(value: string): value is DefenseLineOption {
  return (defenseLineOptions as readonly string[]).includes(value)
}

function isTempoOption(value: string): value is TempoOption {
  return (tempoOptions as readonly string[]).includes(value)
}

function defaultRoleIdForSlot(
  slotId: BuilderSlotId,
  rolesBySlotId: Map<BuilderSlotId, PositionRoleResponseDto[]>,
): number | undefined {
  const roles = rolesBySlotId.get(slotId)

  if (!roles || roles.length === 0) {
    return undefined
  }

  return roles[0]?.id
}

export function SquadBuilderPage() {
  const navigate = useNavigate()
  const { squadId: editSquadId } = useParams<{ squadId?: string }>()
  const isEditMode = Boolean(editSquadId)
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  const [title, setTitle] = useState('')
  const [formationId, setFormationId] = useState<BuilderFormationId>('4-2-3-1')
  const [starterAssignments, setStarterAssignments] = useState<
    Partial<Record<BuilderSlotId, string>>
  >({})
  const [roleAssignments, setRoleAssignments] = useState<
    Partial<Record<BuilderSlotId, number>>
  >({})
  const [benchAssignments, setBenchAssignments] = useState<Partial<Record<BenchSlotId, string>>>(
    {},
  )
  const [search, setSearch] = useState('')
  const [posFilter, setPosFilter] = useState<BuilderPosGroup>('ALL')
  const [enabledCategories, setEnabledCategories] = useState<Set<PlayerCategory>>(
    () => new Set(DEFAULT_ENABLED_POOL_CATEGORIES),
  )
  const [attackStyle, setAttackStyle] = useState<AttackStyleOption>(attackStyleOptions[0])
  const [defenseLine, setDefenseLine] = useState<DefenseLineOption>(defenseLineOptions[0])
  const [tempo, setTempo] = useState<TempoOption>(tempoOptions[0])
  const [captainPlayerId, setCaptainPlayerId] = useState('')
  const [cornerTakerPlayerId, setCornerTakerPlayerId] = useState('')
  const [freeKickTakerPlayerId, setFreeKickTakerPlayerId] = useState('')
  const [notes, setNotes] = useState('')
  const [players, setPlayers] = useState<BuilderPlayer[]>([])
  const [rolesByAbbreviation, setRolesByAbbreviation] = useState<
    Map<string, PositionRoleResponseDto[]>
  >(() => new Map())
  const [isLoadingPlayers, setIsLoadingPlayers] = useState(true)
  const [isLoadingSquad, setIsLoadingSquad] = useState(isEditMode)
  const [modalOpen, setModalOpen] = useState(false)
  const [publishedSquadId, setPublishedSquadId] = useState<string | null>(null)
  const [isPublishing, setIsPublishing] = useState(false)
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null)

  const formation = getFormationConfig(formationId)
  const playersById = useMemo(() => {
    const map = new Map<string, BuilderPlayer>()
    for (const player of players) {
      map.set(player.id, player)
    }
    return map
  }, [players])

  const rolesBySlotId = useMemo(() => {
    const map = new Map<BuilderSlotId, PositionRoleResponseDto[]>()

    for (const slotId of slotIdsForFormation(formationId)) {
      const abbreviation = getCatalogAbbreviationForSlot(slotId)

      if (!abbreviation) {
        map.set(slotId, [])
        continue
      }

      map.set(slotId, rolesByAbbreviation.get(abbreviation) ?? [])
    }

    return map
  }, [formationId, rolesByAbbreviation])

  const stats = useMemo(
    () => computeSquadStats(starterAssignments, benchAssignments, playersById),
    [starterAssignments, benchAssignments, playersById],
  )

  const poolPlayers = useMemo(
    () => players.filter((player) => enabledCategories.has(player.category)),
    [players, enabledCategories],
  )

  const allAssignments = useMemo(
    () => ({ ...starterAssignments, ...benchAssignments }) as Partial<
      Record<AssignmentSlotId, string>
    >,
    [starterAssignments, benchAssignments],
  )

  const hasLegendInSquad = useMemo(() => {
    for (const playerId of Object.values(allAssignments)) {
      if (!playerId) {
        continue
      }

      const player = playersById.get(playerId)

      if (player?.category === PlayerCategory.Legend) {
        return true
      }
    }

    return false
  }, [allAssignments, playersById])

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

  const assignedPlayerIds = useMemo(() => {
    const ids = new Set<string>()

    for (const playerId of Object.values(allAssignments)) {
      if (playerId) {
        ids.add(playerId)
      }
    }

    return ids
  }, [allAssignments])

  const starterSlotsHaveRoles = useMemo(() => {
    return slotIdsForFormation(formationId).every((slotId) => {
      if (!starterAssignments[slotId]) {
        return false
      }

      const roleId = roleAssignments[slotId]
      return typeof roleId === 'number' && roleId > 0
    })
  }, [formationId, starterAssignments, roleAssignments])

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

  function ensureRoleForSlot(
    slotId: BuilderSlotId,
    currentRoles: Partial<Record<BuilderSlotId, number>>,
  ): Partial<Record<BuilderSlotId, number>> {
    if (currentRoles[slotId]) {
      return currentRoles
    }

    const defaultRoleId = defaultRoleIdForSlot(slotId, rolesBySlotId)

    if (!defaultRoleId) {
      return currentRoles
    }

    return {
      ...currentRoles,
      [slotId]: defaultRoleId,
    }
  }

  function applySquadToBuilder(squad: SquadResponseDto) {
    const formationValue = squad.formation.trim()

    if (!isBuilderFormationId(formationValue)) {
      showToast('Bu kadronun dizilişi builderda desteklenmiyor.')
      return
    }

    const nextStarters: Partial<Record<BuilderSlotId, string>> = {}
    const nextRoles: Partial<Record<BuilderSlotId, number>> = {}
    const nextBench: Partial<Record<BenchSlotId, string>> = {}
    const validStarterSlots = new Set(slotIdsForFormation(formationValue))

    for (const slot of squad.slots ?? []) {
      const key = slot.slotKey.trim().toUpperCase()

      if (isBenchSlotId(key)) {
        nextBench[key as BenchSlotId] = String(slot.playerId)
        continue
      }

      if (!validStarterSlots.has(key as BuilderSlotId)) {
        continue
      }

      const starterKey = key as BuilderSlotId
      nextStarters[starterKey] = String(slot.playerId)

      if (slot.positionRoleId != null && slot.positionRoleId > 0) {
        nextRoles[starterKey] = slot.positionRoleId
      }
    }

    setTitle(squad.title)
    setFormationId(formationValue)
    setStarterAssignments(nextStarters)
    setRoleAssignments(nextRoles)
    setBenchAssignments(nextBench)
    setNotes(squad.notes ?? '')
    setCaptainPlayerId(String(squad.captainPlayerId))
    setCornerTakerPlayerId(String(squad.cornerTakerPlayerId))
    setFreeKickTakerPlayerId(String(squad.freeKickTakerPlayerId))

    if (isAttackStyleOption(squad.attackStyle)) {
      setAttackStyle(squad.attackStyle)
    }

    if (isDefenseLineOption(squad.defenseLine)) {
      setDefenseLine(squad.defenseLine)
    }

    if (isTempoOption(squad.tempo)) {
      setTempo(squad.tempo)
    }
  }

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

    async function loadCatalog() {
      setIsLoadingPlayers(true)

      const poolQuery = {
        pageNumber: 1,
        pageSize: 200,
        sort: 'number-asc' as const,
      }

      const [currentResult, legendResult, transferResult, positionsResult] =
        await Promise.all([
          playerService.getAll({
            ...poolQuery,
            category: PlayerCategory.Current,
          }),
          playerService.getAll({
            ...poolQuery,
            category: PlayerCategory.Legend,
          }),
          playerService.getAll({
            ...poolQuery,
            category: PlayerCategory.TransferTarget,
          }),
          positionService.getAll({
            pageNumber: 1,
            pageSize: 100,
          }),
        ])

      if (cancelled) {
        return
      }

      const nextPlayers: BuilderPlayer[] = []

      if (currentResult.success && currentResult.data) {
        nextPlayers.push(...currentResult.data.items.map(mapPlayerToBuilderPlayer))
      }

      if (legendResult.success && legendResult.data) {
        nextPlayers.push(...legendResult.data.items.map(mapPlayerToBuilderPlayer))
      }

      if (transferResult.success && transferResult.data) {
        nextPlayers.push(...transferResult.data.items.map(mapPlayerToBuilderPlayer))
      }

      setPlayers((prev) => mergeBuilderPlayers(nextPlayers, prev))

      if (positionsResult.success && positionsResult.data) {
        const nextRoles = new Map<string, PositionRoleResponseDto[]>()

        for (const position of positionsResult.data.items) {
          const abbreviation = position.abbreviation.trim().toUpperCase()
          const roles = [...(position.roles ?? [])].sort(
            (a, b) => a.sortOrder - b.sortOrder || a.id - b.id,
          )
          nextRoles.set(abbreviation, roles)
        }

        setRolesByAbbreviation(nextRoles)
      } else {
        setRolesByAbbreviation(new Map())
      }

      setIsLoadingPlayers(false)
    }

    void loadCatalog()

    return () => {
      cancelled = true
    }
  }, [])

  function handleTogglePoolCategory(category: PlayerCategory) {
    setEnabledCategories((prev) => {
      const next = new Set(prev)

      if (next.has(category)) {
        if (next.size <= 1) {
          return prev
        }

        next.delete(category)
        return next
      }

      next.add(category)
      return next
    })
  }

  useEffect(() => {
    if (!editSquadId) {
      setIsLoadingSquad(false)
      return
    }

    let cancelled = false

    async function loadSquadForEdit() {
      setIsLoadingSquad(true)

      const result = await squadService.getById(editSquadId!)

      if (cancelled) {
        return
      }

      if (!result.success || !result.data) {
        showToast(result.message || 'Kadro yüklenemedi.')
        setIsLoadingSquad(false)
        navigate('/kadrolar/olustur', { replace: true })
        return
      }

      const slotPlayers = (result.data.slots ?? []).map(mapSquadSlotToBuilderPlayer)
      setPlayers((prev) => mergeBuilderPlayers(prev, slotPlayers))
      applySquadToBuilder(result.data)
      setIsLoadingSquad(false)
    }

    void loadSquadForEdit()

    return () => {
      cancelled = true
    }
  }, [editSquadId, navigate])

  useEffect(() => {
    setRoleAssignments((prev) => {
      let changed = false
      const next = { ...prev }

      for (const slotId of slotIdsForFormation(formationId)) {
        if (!starterAssignments[slotId]) {
          if (next[slotId] != null) {
            delete next[slotId]
            changed = true
          }
          continue
        }

        const roleOptions = rolesBySlotId.get(slotId) ?? []
        const currentRoleId = next[slotId]
        const roleStillValid = roleOptions.some((role) => role.id === currentRoleId)

        if (roleStillValid) {
          continue
        }

        const fallback = roleOptions[0]?.id

        if (fallback) {
          next[slotId] = fallback
          changed = true
        } else if (currentRoleId != null) {
          delete next[slotId]
          changed = true
        }
      }

      return changed ? next : prev
    })
  }, [formationId, starterAssignments, rolesBySlotId])

  function showToast(message: string) {
    setFeedbackToast(message)
    window.setTimeout(() => {
      setFeedbackToast(null)
    }, 2200)
  }

  function handleFormationChange(nextId: BuilderFormationId) {
    const nextSlots = new Set(slotIdsForFormation(nextId))
    const keptPlayers: Partial<Record<BuilderSlotId, string>> = {}
    const keptRoles: Partial<Record<BuilderSlotId, number>> = {}

    for (const [slotId, playerId] of Object.entries(starterAssignments)) {
      if (nextSlots.has(slotId as BuilderSlotId) && playerId) {
        keptPlayers[slotId as BuilderSlotId] = playerId
      }
    }

    for (const [slotId, roleId] of Object.entries(roleAssignments)) {
      if (nextSlots.has(slotId as BuilderSlotId) && roleId) {
        keptRoles[slotId as BuilderSlotId] = roleId
      }
    }

    setFormationId(nextId)
    setStarterAssignments(keptPlayers)
    setRoleAssignments(keptRoles)
  }

  function handleCancel() {
    const historyIndex =
      typeof window.history.state?.idx === 'number' ? window.history.state.idx : 0

    if (historyIndex > 0) {
      navigate(-1)
      return
    }

    navigate('/kadrolar')
  }

  function handleClear() {
    setStarterAssignments({})
    setRoleAssignments({})
    setBenchAssignments({})
    setCaptainPlayerId('')
    setCornerTakerPlayerId('')
    setFreeKickTakerPlayerId('')
  }

  function handleClearStarterSlot(slotId: BuilderSlotId) {
    setStarterAssignments((prev) => {
      const next = { ...prev }
      delete next[slotId]
      return next
    })
    setRoleAssignments((prev) => {
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

  function handleRoleChange(slotId: BuilderSlotId, roleId: number) {
    setRoleAssignments((prev) => ({
      ...prev,
      [slotId]: roleId,
    }))
  }

  function handleAssignToStarterSlot(slotId: BuilderSlotId, playerId: string) {
    if (assignedPlayerIds.has(playerId)) {
      return
    }

    setStarterAssignments((prev) => ({
      ...prev,
      [slotId]: playerId,
    }))
    setRoleAssignments((prev) => ensureRoleForSlot(slotId, prev))
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
    const targetRoleId = roleAssignments[targetSlotId]

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
      setRoleAssignments((prev) => {
        const next = { ...prev }
        const sourceRole = next[source]

        if (targetRoleId) {
          next[source] = targetRoleId
        } else {
          delete next[source]
        }

        if (sourceRole) {
          next[targetSlotId] = sourceRole
        } else {
          const fallback = defaultRoleIdForSlot(targetSlotId, rolesBySlotId)

          if (fallback) {
            next[targetSlotId] = fallback
          } else {
            delete next[targetSlotId]
          }
        }

        return next
      })
      return
    }

    if (source && isBenchSlotId(source)) {
      setStarterAssignments((prev) => ({
        ...prev,
        [targetSlotId]: playerId,
      }))
      setRoleAssignments((prev) => ensureRoleForSlot(targetSlotId, prev))
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
    setRoleAssignments((prev) => ensureRoleForSlot(targetSlotId, prev))
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
      setRoleAssignments((prev) => {
        const next = { ...prev }

        if (targetPlayerId) {
          return ensureRoleForSlot(source, next)
        }

        delete next[source]
        return next
      })
      return
    }

    setBenchAssignments((prev) => ({
      ...prev,
      [targetSlotId]: playerId,
    }))
  }

  function handleAssign(playerId: string) {
    if (assignedPlayerIds.has(playerId)) {
      return
    }

    const starterSlotIds = slotIdsForFormation(formationId)
    const emptyStarter = starterSlotIds.find((slotId) => !starterAssignments[slotId])

    if (emptyStarter) {
      setStarterAssignments((prev) => ({
        ...prev,
        [emptyStarter]: playerId,
      }))
      setRoleAssignments((prev) => ensureRoleForSlot(emptyStarter, prev))
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

  function getPublishBlockReason(): string | null {
    if (!isAuthenticated) {
      return 'Yayınlamak için giriş yapmalısınız.'
    }

    if (title.trim().length === 0) {
      return 'Kadro başlığı girmelisiniz.'
    }

    if (notes.length > NOTES_MAX_LENGTH) {
      return `Notlar en fazla ${NOTES_MAX_LENGTH} karakter olabilir.`
    }

    if (stats.starterFilled < 11) {
      return 'İlk 11 eksik. Tüm başlangıç oyuncularını seçmelisiniz.'
    }

    if (stats.benchFilled < 10) {
      return 'Yedek kulübesi eksik. Tüm yedek oyuncuları seçmelisiniz.'
    }

    if (!starterSlotsHaveRoles) {
      return 'Her başlangıç oyuncusu için bir rol seçmelisiniz.'
    }

    if (!captainPlayerId || !starterPlayerIds.has(captainPlayerId)) {
      return 'İlk 11 içinden bir kaptan seçmelisiniz.'
    }

    if (!cornerTakerPlayerId || !starterPlayerIds.has(cornerTakerPlayerId)) {
      return 'İlk 11 içinden bir korner kullanan seçmelisiniz.'
    }

    if (!freeKickTakerPlayerId || !starterPlayerIds.has(freeKickTakerPlayerId)) {
      return 'İlk 11 içinden bir serbest vuruş kullanan seçmelisiniz.'
    }

    return null
  }

  async function handlePublish() {
    if (isPublishing) {
      return
    }

    const blockReason = getPublishBlockReason()

    if (blockReason) {
      toast.warning(blockReason)
      return
    }

    const starterSlots: SquadSlotRequest[] = slotIdsForFormation(formationId).map(
      (slotKey, index) => ({
        slotKey,
        sortOrder: index,
        playerId: Number(starterAssignments[slotKey]),
        positionRoleId: roleAssignments[slotKey] ?? null,
      }),
    )

    const benchSlots: SquadSlotRequest[] = BENCH_SLOT_IDS.map((slotKey, index) => ({
      slotKey,
      sortOrder: 11 + index,
      playerId: Number(benchAssignments[slotKey]),
      positionRoleId: null,
    }))

    const baseRequest: CreateSquadRequest = {
      title: title.trim(),
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

    try {
      if (isEditMode && editSquadId) {
        const updateRequest: UpdateSquadRequest = {
          ...baseRequest,
          id: editSquadId,
        }
        const result = await squadService.update(updateRequest)

        if (!result.success) {
          showToast(result.message || 'Kadro güncellenemedi.')
          return
        }

        setPublishedSquadId(editSquadId)
        setModalOpen(true)
        return
      }

      const result = await squadService.add(baseRequest)

      if (!result.success || !result.data) {
        showToast(result.message || 'Kadro yayınlanamadı.')
        return
      }

      setPublishedSquadId(result.data.id)
      setModalOpen(true)
    } catch {
      // apiClient already surfaces errors via toast
    } finally {
      setIsPublishing(false)
    }
  }

  if (isLoadingSquad) {
    return (
      <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
        <section className="mx-auto w-full max-w-[1360px] px-4 py-space-xl sm:px-6 lg:px-12">
          <p className="font-body bg-surface-container-lowest p-space-md text-body-md text-on-surface-variant shadow-sm">
            Kadro yükleniyor…
          </p>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
      <SquadBuilderToolbar
        title={title}
        formationId={formationId}
        isPublishing={isPublishing}
        onTitleChange={setTitle}
        onFormationChange={handleFormationChange}
        onClear={handleClear}
        onCancel={handleCancel}
        onPublish={() => {
          void handlePublish()
        }}
      />

      {feedbackToast ? (
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-12">
          <div className="mb-space-sm bg-secondary-container px-space-md py-space-sm text-on-secondary-container shadow-sm">
            <span className="font-label text-label-md">{feedbackToast}</span>
          </div>
        </div>
      ) : null}

      <section className="mx-auto flex w-full max-w-[1360px] flex-col gap-gutter px-4 pt-space-sm pb-space-xl sm:px-6 lg:px-12">
        {isLoadingPlayers ? (
          <p className="font-body bg-surface-container-lowest p-space-md text-body-md text-on-surface-variant shadow-sm">
            Oyuncu havuzu yükleniyor…
          </p>
        ) : (
          <SquadBuilderPlayerPool
            players={poolPlayers}
            assignments={allAssignments}
            search={search}
            posFilter={posFilter}
            enabledCategories={enabledCategories}
            onSearchChange={setSearch}
            onPosFilterChange={setPosFilter}
            onToggleCategory={handleTogglePoolCategory}
            onAssign={handleAssign}
          />
        )}

        <div className="flex flex-col gap-gutter lg:flex-row lg:items-stretch">
          <div className="flex min-w-0 flex-col gap-space-md lg:w-7/12 lg:shrink-0">
            <p className="font-body max-w-3xl text-[10px] leading-snug text-on-surface-variant/70">
              * Boş pozisyonlara tıklayarak mevkiye uygun oyuncu seçebilir veya havuzdan sürükleyip
              bırakabilirsiniz. Yedek kulübenizi de doldurmayı unutmayınız.
            </p>

            <SquadBuilderPitch
              formation={formation}
              assignments={starterAssignments}
              roleAssignments={roleAssignments}
              rolesBySlotId={rolesBySlotId}
              players={poolPlayers}
              playersById={playersById}
              assignedPlayerIds={assignedPlayerIds}
              captainPlayerId={captainPlayerId}
              onAssignToSlot={handleAssignToStarterSlot}
              onDropPlayer={handleDropOnStarterSlot}
              onClearSlot={handleClearStarterSlot}
              onRoleChange={handleRoleChange}
            />

            <SquadBuilderSidebarStats
              avgAge={stats.avgAge}
              totalValue={stats.totalValue}
              hasLegendInSquad={hasLegendInSquad}
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-space-lg">
            <SquadBuilderBench
              assignments={benchAssignments}
              playersById={playersById}
              availablePlayers={poolPlayers.filter(
                (player) => !assignedPlayerIds.has(player.id),
              )}
              onClearSlot={handleClearBenchSlot}
              onAssignToSlot={(slotId, playerId) => {
                if (assignedPlayerIds.has(playerId)) {
                  return
                }

                setBenchAssignments((prev) => ({
                  ...prev,
                  [slotId]: playerId,
                }))
              }}
              onDropPlayer={handleDropOnBenchSlot}
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

            <div className="flex min-h-0 flex-1 flex-col">
              <SquadBuilderNotes notes={notes} onNotesChange={setNotes} />
            </div>

            <div className="mt-auto w-full">
              <SquadBuilderSidebarActions
                isPublishing={isPublishing}
                onClear={handleClear}
                onCancel={handleCancel}
                onPublish={() => {
                  void handlePublish()
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <SquadBuilderPublishModal
        open={modalOpen}
        title={title.trim()}
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
