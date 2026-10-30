import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import playerService from '@/features/players/playerService'
import seasonService from '@/features/seasons/seasonService'
import playerStatsService from '@/features/stats/playerStatsService'
import { AdminStatisticDeleteModal } from '../components/AdminStatisticDeleteModal'
import { AdminStatisticFormFields } from '../components/AdminStatisticFormFields'
import {
  createEmptyAdminStatisticFormDraft,
  mapDraftToCreateRequest,
  mapDraftToUpdateRequest,
  mapPlayerStatsResponseToFormDraft,
  validateAdminStatisticDraft,
} from '../utils/adminStatisticDraftUtils'
import type {
  AdminStatisticFormDraft,
  AdminStatisticPlayerOption,
  AdminStatisticSeasonOption,
} from '../utils/adminStatisticTypes'

type AdminStatisticCreateEditPageProps = {
  mode?: 'create' | 'edit'
}

export function AdminStatisticCreateEditPage({
  mode: modeProp,
}: AdminStatisticCreateEditPageProps) {
  const { statisticId } = useParams<{ statisticId: string }>()
  const navigate = useNavigate()
  const mode = modeProp ?? (statisticId ? 'edit' : 'create')

  const [draft, setDraft] = useState<AdminStatisticFormDraft>(createEmptyAdminStatisticFormDraft)
  const [players, setPlayers] = useState<AdminStatisticPlayerOption[]>([])
  const [seasons, setSeasons] = useState<AdminStatisticSeasonOption[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

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
        const seasonItems = seasonsResult.data.items.map((season) => ({
          id: season.id,
          name: season.name,
        }))
        setSeasons(seasonItems)

        if (mode === 'create' && seasonItems.length > 0) {
          setDraft((prev) => {
            if (prev.seasonId > 0) {
              return prev
            }

            return {
              ...prev,
              seasonId: seasonItems[0]!.id,
            }
          })
        }
      } else {
        setSeasons([])
      }

      if (playersResult.success && playersResult.data) {
        const playerItems = playersResult.data.items.map((player) => ({
          id: player.id,
          label:
            player.shirtNumber != null
              ? `${player.name} (#${player.shirtNumber})`
              : player.name,
        }))
        setPlayers(playerItems)

        if (mode === 'create' && playerItems.length > 0) {
          setDraft((prev) => {
            if (prev.playerId > 0) {
              return prev
            }

            return {
              ...prev,
              playerId: playerItems[0]!.id,
            }
          })
        }
      } else {
        setPlayers([])
      }

      if (mode === 'create') {
        setIsLoading(false)
      }
    }

    void loadLookups()

    return () => {
      cancelled = true
    }
  }, [mode])

  useEffect(() => {
    if (mode !== 'edit' || !statisticId) {
      return
    }

    const id = Number(statisticId)

    if (!Number.isFinite(id) || id <= 0) {
      setFormError('Geçersiz istatistik kimliği.')
      setIsLoading(false)
      return
    }

    let cancelled = false

    async function loadStatistic() {
      setIsLoading(true)
      setFormError(null)

      const result = await playerStatsService.getById(id)

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setDraft(mapPlayerStatsResponseToFormDraft(result.data))
      } else {
        setFormError(result.message || 'İstatistik yüklenemedi.')
      }

      setIsLoading(false)
    }

    void loadStatistic()

    return () => {
      cancelled = true
    }
  }, [mode, statisticId])

  function updateField<K extends keyof AdminStatisticFormDraft>(
    key: K,
    value: AdminStatisticFormDraft[K],
  ) {
    setDraft((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  function handleCancel() {
    navigate('/yonetim/istatistikler')
  }

  async function handleSave() {
    if (isSaving) {
      return
    }

    const validationError = validateAdminStatisticDraft(draft)

    if (validationError) {
      setFormError(validationError)
      return
    }

    setIsSaving(true)
    setFormError(null)

    if (mode === 'create') {
      const result = await playerStatsService.add(mapDraftToCreateRequest(draft))

      if (result.success) {
        navigate('/yonetim/istatistikler')
      } else {
        setFormError(result.message || 'İstatistik kaydedilemedi.')
      }
    } else {
      const result = await playerStatsService.update(mapDraftToUpdateRequest(draft))

      if (result.success) {
        navigate('/yonetim/istatistikler')
      } else {
        setFormError(result.message || 'İstatistik güncellenemedi.')
      }
    }

    setIsSaving(false)
  }

  async function handleConfirmDelete() {
    if (draft.id == null || isDeleting) {
      return
    }

    setIsDeleting(true)

    const result = await playerStatsService.remove(draft.id)

    if (result.success) {
      navigate('/yonetim/istatistikler')
      return
    }

    setFormError(result.message || 'İstatistik silinemedi.')
    setIsDeleting(false)
    setDeleteOpen(false)
  }

  const title = mode === 'edit' ? 'İstatistik Düzenle' : 'Yeni İstatistik Ekle'
  const description =
    mode === 'edit'
      ? 'Oyuncunun sezon performans metriklerini güncelleyin.'
      : 'Yeni sezon istatistik kaydı oluşturun.'

  const actionButtonClass =
    'font-label inline-flex h-10 w-[8.75rem] cursor-pointer items-center justify-center gap-1 border px-space-md text-label-md uppercase'

  const selectedPlayerName =
    players.find((player) => player.id === draft.playerId)?.label ?? 'Oyuncu'
  const selectedSeasonName =
    seasons.find((season) => season.id === draft.seasonId)?.name ?? ''

  const actionButtons = (
    <div className="flex flex-wrap items-center justify-end gap-space-sm">
      <button
        type="button"
        disabled={isSaving}
        onClick={() => {
          void handleSave()
        }}
        className={`${actionButtonClass} border-transparent bg-primary-container font-bold tracking-wider text-on-primary transition-all hover:bg-primary disabled:cursor-not-allowed disabled:opacity-50`}
      >
        <span className="material-symbols-outlined text-[18px]">save</span>
        {isSaving ? 'Kaydediliyor…' : 'Kaydet'}
      </button>
      <button
        type="button"
        onClick={handleCancel}
        className={`${actionButtonClass} border-outline-variant transition-colors hover:border-primary hover:text-primary`}
      >
        <span className="material-symbols-outlined text-[18px]">close</span>
        İptal
      </button>
      {mode === 'edit' ? (
        <button
          type="button"
          onClick={() => {
            setDeleteOpen(true)
          }}
          className={`${actionButtonClass} border-error text-error transition-colors hover:bg-error-container`}
        >
          <span className="material-symbols-outlined text-[18px]">delete</span>
          Sil
        </button>
      ) : null}
    </div>
  )

  if (isLoading) {
    return (
      <main className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
        <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
          İstatistik yükleniyor...
        </p>
      </main>
    )
  }

  return (
    <div className="flex min-h-full flex-col">
      <main className="mx-auto flex w-full max-w-[1360px] flex-1 flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
        <header className="flex flex-col gap-space-md lg:flex-row lg:items-start lg:justify-between">
          <div className="flex max-w-3xl flex-col gap-space-xs">
            <h1 className="font-headline text-headline-lg font-extrabold tracking-tight text-primary uppercase">
              {title}
            </h1>
            <p className="font-body text-body-md text-on-surface-variant">{description}</p>
          </div>

          {actionButtons}
        </header>

        {formError ? (
          <p className="font-body border border-error/40 bg-error-container px-space-md py-space-sm text-body-md text-on-error-container">
            {formError}
          </p>
        ) : null}

        <AdminStatisticFormFields
          draft={draft}
          players={players}
          seasons={seasons}
          mode={mode}
          onChange={updateField}
        />

        {actionButtons}
      </main>

      <AdminStatisticDeleteModal
        open={deleteOpen}
        playerName={selectedPlayerName}
        seasonName={selectedSeasonName}
        isDeleting={isDeleting}
        onCancel={() => {
          if (isDeleting) {
            return
          }

          setDeleteOpen(false)
        }}
        onConfirm={() => {
          void handleConfirmDelete()
        }}
      />
    </div>
  )
}
