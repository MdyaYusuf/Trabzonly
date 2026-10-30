import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import injuryService from '@/features/injuries/injuryService'
import playerService from '@/features/players/playerService'
import seasonService from '@/features/seasons/seasonService'
import { AdminInjuryDeleteModal } from '../components/AdminInjuryDeleteModal'
import { AdminInjuryFormFields } from '../components/AdminInjuryFormFields'
import {
  createEmptyAdminInjuryFormDraft,
  mapDraftToCreateRequest,
  mapDraftToUpdateRequest,
  mapInjuryResponseToFormDraft,
  validateAdminInjuryDraft,
} from '../utils/adminInjuryDraftUtils'
import type {
  AdminInjuryFormDraft,
  AdminInjuryPlayerOption,
  AdminInjurySeasonOption,
} from '../utils/adminInjuryTypes'

type AdminInjuryCreateEditPageProps = {
  mode?: 'create' | 'edit'
}

export function AdminInjuryCreateEditPage({ mode: modeProp }: AdminInjuryCreateEditPageProps) {
  const { injuryId } = useParams<{ injuryId: string }>()
  const navigate = useNavigate()
  const mode = modeProp ?? (injuryId ? 'edit' : 'create')

  const [draft, setDraft] = useState<AdminInjuryFormDraft>(createEmptyAdminInjuryFormDraft)
  const [players, setPlayers] = useState<AdminInjuryPlayerOption[]>([])
  const [seasons, setSeasons] = useState<AdminInjurySeasonOption[]>([])
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
    if (mode !== 'edit' || !injuryId) {
      return
    }

    const id = Number(injuryId)

    if (!Number.isFinite(id) || id <= 0) {
      setFormError('Geçersiz sakatlık kimliği.')
      setIsLoading(false)
      return
    }

    let cancelled = false

    async function loadInjury() {
      setIsLoading(true)
      setFormError(null)

      const result = await injuryService.getById(id)

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setDraft(mapInjuryResponseToFormDraft(result.data))
      } else {
        setFormError(result.message || 'Sakatlık yüklenemedi.')
      }

      setIsLoading(false)
    }

    void loadInjury()

    return () => {
      cancelled = true
    }
  }, [mode, injuryId])

  function updateField<K extends keyof AdminInjuryFormDraft>(
    key: K,
    value: AdminInjuryFormDraft[K],
  ) {
    setDraft((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  function handleCancel() {
    navigate('/yonetim/sakatliklar')
  }

  async function handleSave() {
    if (isSaving) {
      return
    }

    const validationError = validateAdminInjuryDraft(draft)

    if (validationError) {
      setFormError(validationError)
      return
    }

    setIsSaving(true)
    setFormError(null)

    if (mode === 'create') {
      const result = await injuryService.add(mapDraftToCreateRequest(draft))

      if (result.success) {
        navigate('/yonetim/sakatliklar')
      } else {
        setFormError(result.message || 'Sakatlık kaydedilemedi.')
      }
    } else {
      const result = await injuryService.update(mapDraftToUpdateRequest(draft))

      if (result.success) {
        navigate('/yonetim/sakatliklar')
      } else {
        setFormError(result.message || 'Sakatlık güncellenemedi.')
      }
    }

    setIsSaving(false)
  }

  async function handleConfirmDelete() {
    if (draft.id == null || isDeleting) {
      return
    }

    setIsDeleting(true)

    const result = await injuryService.remove(draft.id)

    if (result.success) {
      navigate('/yonetim/sakatliklar')
      return
    }

    setFormError(result.message || 'Sakatlık silinemedi.')
    setIsDeleting(false)
    setDeleteOpen(false)
  }

  const title = mode === 'edit' ? 'Sakatlığı Düzenle' : 'Yeni Sakatlık Ekle'
  const description =
    mode === 'edit'
      ? 'Oyuncu sakatlık kaydını güncelleyin.'
      : 'Yeni sakatlık kaydı oluşturun.'

  const actionButtonClass =
    'font-label inline-flex h-10 w-[8.75rem] cursor-pointer items-center justify-center gap-1 border px-space-md text-label-md uppercase'

  const selectedPlayerName =
    players.find((player) => player.id === draft.playerId)?.label ?? 'Oyuncu'

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
        <span className="material-symbols-outlined text-[18px]">
          {mode === 'create' ? 'add' : 'save'}
        </span>
        {isSaving
          ? mode === 'create'
            ? 'Ekleniyor…'
            : 'Kaydediliyor…'
          : mode === 'create'
            ? 'Ekle'
            : 'Kaydet'}
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
          Sakatlık yükleniyor...
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

        <AdminInjuryFormFields
          draft={draft}
          players={players}
          seasons={seasons}
          mode={mode}
          onChange={updateField}
        />

        {actionButtons}
      </main>

      <AdminInjuryDeleteModal
        open={deleteOpen}
        playerName={selectedPlayerName}
        diagnosis={draft.name.trim()}
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
