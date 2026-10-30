import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import playerService from '@/features/players/playerService'
import positionService from '@/features/positions/positionService'
import type { PositionResponseDto } from '@/features/positions/positionTypes'
import { AdminPlayerDeleteModal } from '../components/AdminPlayerDeleteModal'
import { AdminPlayerFormFields } from '../components/AdminPlayerFormFields'
import {
  createEmptyAdminPlayerFormDraft,
  mapDraftToCreateRequest,
  mapDraftToUpdateRequest,
  mapPlayerResponseToFormDraft,
  validateAdminPlayerDraft,
} from '../utils/adminPlayerDraftUtils'
import type { AdminPlayerFormDraft } from '../utils/adminPlayerTypes'

type AdminPlayerCreateEditPageProps = {
  mode?: 'create' | 'edit'
}

export function AdminPlayerCreateEditPage({ mode: modeProp }: AdminPlayerCreateEditPageProps) {
  const { playerId } = useParams<{ playerId: string }>()
  const navigate = useNavigate()
  const mode = modeProp ?? (playerId ? 'edit' : 'create')

  const [draft, setDraft] = useState<AdminPlayerFormDraft>(createEmptyAdminPlayerFormDraft)
  const [positions, setPositions] = useState<PositionResponseDto[]>([])
  const [isLoading, setIsLoading] = useState(mode === 'edit')
  const [isSaving, setIsSaving] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadPositions() {
      const result = await positionService.getAll({
        pageNumber: 1,
        pageSize: 100,
      })

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        const items = result.data.items
        setPositions(items)

        if (mode === 'create' && items.length > 0) {
          setDraft((prev) => {
            if (prev.positionId > 0) {
              return prev
            }

            return {
              ...prev,
              positionId: items[0]!.id,
            }
          })
        }
      } else {
        setPositions([])
      }
    }

    void loadPositions()

    return () => {
      cancelled = true
    }
  }, [mode])

  useEffect(() => {
    if (mode !== 'edit' || !playerId) {
      return
    }

    const id = Number(playerId)

    if (!Number.isFinite(id) || id <= 0) {
      setFormError('Geçersiz oyuncu kimliği.')
      setIsLoading(false)
      return
    }

    let cancelled = false

    async function loadPlayer() {
      setIsLoading(true)
      setFormError(null)

      const result = await playerService.getById(id)

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setDraft(mapPlayerResponseToFormDraft(result.data))
      } else {
        setFormError(result.message || 'Oyuncu yüklenemedi.')
      }

      setIsLoading(false)
    }

    void loadPlayer()

    return () => {
      cancelled = true
    }
  }, [mode, playerId])

  function updateField<K extends keyof AdminPlayerFormDraft>(
    key: K,
    value: AdminPlayerFormDraft[K],
  ) {
    setDraft((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  function handleCancel() {
    navigate('/yonetim/oyuncular')
  }

  async function handleSave() {
    if (isSaving) {
      return
    }

    const validationError = validateAdminPlayerDraft(draft)

    if (validationError) {
      setFormError(validationError)
      return
    }

    setIsSaving(true)
    setFormError(null)

    if (mode === 'create') {
      const result = await playerService.add(mapDraftToCreateRequest(draft))

      if (result.success) {
        navigate('/yonetim/oyuncular')
      } else {
        setFormError(result.message || 'Oyuncu kaydedilemedi.')
      }
    } else {
      const result = await playerService.update(mapDraftToUpdateRequest(draft))

      if (result.success) {
        navigate('/yonetim/oyuncular')
      } else {
        setFormError(result.message || 'Oyuncu güncellenemedi.')
      }
    }

    setIsSaving(false)
  }

  async function handleConfirmDelete() {
    if (draft.id == null || isDeleting) {
      return
    }

    setIsDeleting(true)

    const result = await playerService.remove(draft.id)

    if (result.success) {
      navigate('/yonetim/oyuncular')
      return
    }

    setFormError(result.message || 'Oyuncu silinemedi.')
    setIsDeleting(false)
    setDeleteOpen(false)
  }

  const title = mode === 'edit' ? 'Oyuncuyu Düzenle' : 'Yeni Oyuncu Ekle'
  const description =
    mode === 'edit'
      ? 'Oyuncu kimlik, fizik ve kadro bilgilerini güncelleyin.'
      : 'Yeni oyuncu kaydı oluşturun. Temel kimlik, pozisyon ve kulüp alanlarını doldurun.'

  const actionButtonClass =
    'font-label inline-flex h-10 w-[8.75rem] cursor-pointer items-center justify-center gap-1 border px-space-md text-label-md uppercase'

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
          Oyuncu yükleniyor...
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

        <AdminPlayerFormFields
          draft={draft}
          positions={positions}
          mode={mode}
          onChange={updateField}
        />

        {actionButtons}
      </main>

      <AdminPlayerDeleteModal
        open={deleteOpen}
        playerName={draft.name.trim() || 'Oyuncu'}
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
