import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import playerService from '@/features/players/playerService'
import positionService from '@/features/positions/positionService'
import type { PositionResponseDto } from '@/features/positions/positionTypes'
import { AdminPlayerDeleteModal } from '../components/AdminPlayerDeleteModal'
import { AdminPlayerFormFields } from '../components/AdminPlayerFormFields'
import { AdminPlayerFormSidebar } from '../components/AdminPlayerFormSidebar'
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
            <nav
              aria-label="Breadcrumb"
              className="font-label flex flex-wrap items-center gap-space-xs text-label-md text-on-surface-variant"
            >
              <Link to="/yonetim" className="transition-colors hover:text-primary">
                Yönetim Masası
              </Link>
              <span>/</span>
              <Link to="/yonetim/oyuncular" className="transition-colors hover:text-primary">
                Oyuncular
              </Link>
              <span>/</span>
              <span className="font-bold text-primary">{title}</span>
            </nav>
            <h1 className="font-headline text-headline-lg font-extrabold tracking-tight text-primary uppercase">
              {title}
            </h1>
            <p className="font-body text-body-md text-on-surface-variant">{description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm">
            {mode === 'edit' ? (
              <button
                type="button"
                onClick={() => {
                  setDeleteOpen(true)
                }}
                className="font-label inline-flex cursor-pointer items-center gap-1 border border-error px-space-md py-space-sm text-label-md text-error uppercase transition-colors hover:bg-error-container"
              >
                <span className="material-symbols-outlined text-[18px]">delete</span>
                Sil
              </button>
            ) : null}
            <button
              type="button"
              onClick={handleCancel}
              className="font-label cursor-pointer border border-outline-variant px-space-md py-space-sm text-label-md uppercase transition-colors hover:border-primary hover:text-primary"
            >
              İptal
            </button>
            <button
              type="button"
              disabled={isSaving}
              onClick={() => {
                void handleSave()
              }}
              className="font-label inline-flex cursor-pointer items-center gap-1 bg-primary-container px-space-md py-space-sm text-label-md font-bold tracking-wider text-on-primary uppercase transition-all hover:bg-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              {isSaving ? 'Kaydediliyor…' : 'Kaydet'}
            </button>
          </div>
        </header>

        {formError ? (
          <p className="font-body border border-error/40 bg-error-container px-space-md py-space-sm text-body-md text-on-error-container">
            {formError}
          </p>
        ) : null}

        <div className="grid grid-cols-1 items-start gap-gutter lg:grid-cols-12">
          <div className="lg:col-span-8">
            <AdminPlayerFormFields
              draft={draft}
              positions={positions}
              showActiveToggle={mode === 'edit'}
              onChange={updateField}
            />
          </div>
          <div className="lg:col-span-4">
            <AdminPlayerFormSidebar draft={draft} mode={mode} onChange={updateField} />
          </div>
        </div>
      </main>

      <footer className="sticky bottom-0 border-t border-outline-variant/50 bg-surface-container-lowest px-4 py-space-md sm:px-6 lg:px-12">
        <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-sm lg:flex-row lg:items-center lg:justify-between">
          {mode === 'edit' ? (
            <button
              type="button"
              onClick={() => {
                setDeleteOpen(true)
              }}
              className="font-label inline-flex cursor-pointer items-center gap-1 text-label-md text-error uppercase transition-colors hover:underline"
            >
              <span className="material-symbols-outlined text-[18px]">delete_forever</span>
              Kaydı Kalıcı Olarak Sil
            </button>
          ) : (
            <p className="font-body text-body-sm text-on-surface-variant">
              Yeni oyuncu kaydı yayınlandığında kamu kadro listesinde görünür.
            </p>
          )}

          <div className="flex gap-space-sm">
            <button
              type="button"
              onClick={handleCancel}
              className="font-label cursor-pointer border border-outline-variant px-space-md py-space-sm text-label-md uppercase transition-colors hover:border-primary hover:text-primary"
            >
              İptal
            </button>
            <button
              type="button"
              disabled={isSaving}
              onClick={() => {
                void handleSave()
              }}
              className="font-label inline-flex cursor-pointer items-center gap-1 bg-primary-container px-space-md py-space-sm text-label-md font-bold tracking-wider text-on-primary uppercase transition-all hover:bg-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[18px]">check</span>
              {isSaving ? 'Kaydediliyor…' : 'Kaydet ve Yayınla'}
            </button>
          </div>
        </div>
      </footer>

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
