import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import positionService from '@/features/positions/positionService'
import { AdminPositionDeleteModal } from '../components/AdminPositionDeleteModal'
import { AdminPositionFormFields } from '../components/AdminPositionFormFields'
import {
  createEmptyAdminPositionFormDraft,
  mapDraftToCreateRequest,
  mapDraftToUpdateRequest,
  mapPositionResponseToFormDraft,
  validateAdminPositionDraft,
} from '../utils/adminPositionDraftUtils'
import type { AdminPositionFormDraft } from '../utils/adminPositionTypes'

type AdminPositionCreateEditPageProps = {
  mode?: 'create' | 'edit'
}

export function AdminPositionCreateEditPage({
  mode: modeProp,
}: AdminPositionCreateEditPageProps) {
  const { positionId } = useParams<{ positionId: string }>()
  const navigate = useNavigate()
  const mode = modeProp ?? (positionId ? 'edit' : 'create')

  const [draft, setDraft] = useState<AdminPositionFormDraft>(createEmptyAdminPositionFormDraft)
  const [isLoading, setIsLoading] = useState(mode === 'edit')
  const [isSaving, setIsSaving] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (mode !== 'edit') {
      return
    }

    let cancelled = false

    async function loadPosition() {
      setIsLoading(true)
      setFormError(null)

      if (!positionId) {
        setFormError('Geçersiz pozisyon kimliği.')
        setIsLoading(false)
        return
      }

      const id = Number(positionId)

      if (!Number.isFinite(id) || id <= 0) {
        setFormError('Geçersiz pozisyon kimliği.')
        setIsLoading(false)
        return
      }

      const result = await positionService.getById(id)

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setDraft(mapPositionResponseToFormDraft(result.data))
      } else {
        setFormError(result.message || 'Pozisyon yüklenemedi.')
      }

      setIsLoading(false)
    }

    void loadPosition()

    return () => {
      cancelled = true
    }
  }, [mode, positionId])

  function updateField<K extends keyof AdminPositionFormDraft>(
    key: K,
    value: AdminPositionFormDraft[K],
  ) {
    setDraft((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  function handleCancel() {
    navigate('/yonetim/pozisyonlar')
  }

  async function handleSave() {
    if (isSaving) {
      return
    }

    const validationError = validateAdminPositionDraft(draft)

    if (validationError) {
      setFormError(validationError)
      return
    }

    setIsSaving(true)
    setFormError(null)

    if (mode === 'create') {
      const result = await positionService.add(mapDraftToCreateRequest(draft))

      if (result.success) {
        navigate('/yonetim/pozisyonlar')
      } else {
        setFormError(result.message || 'Pozisyon kaydedilemedi.')
      }
    } else {
      const result = await positionService.update(mapDraftToUpdateRequest(draft))

      if (result.success) {
        navigate('/yonetim/pozisyonlar')
      } else {
        setFormError(result.message || 'Pozisyon güncellenemedi.')
      }
    }

    setIsSaving(false)
  }

  async function handleConfirmDelete() {
    if (draft.id == null || isDeleting) {
      return
    }

    setIsDeleting(true)

    const result = await positionService.remove(draft.id)

    if (result.success) {
      navigate('/yonetim/pozisyonlar')
      return
    }

    setFormError(result.message || 'Pozisyon silinemedi.')
    setIsDeleting(false)
    setDeleteOpen(false)
  }

  const title = mode === 'edit' ? 'Pozisyonu Düzenle' : 'Yeni Pozisyon Ekle'
  const description =
    mode === 'edit'
      ? 'Pozisyon adı, kısaltma, saha bölgesi ve rollerini güncelleyin.'
      : 'Yeni pozisyon kaydı ve rollerini oluşturun.'

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
        <span className="material-symbols-outlined text-[18px]">
          {mode === 'create' ? 'add' : 'save'}
        </span>
        {mode === 'create' ? (isSaving ? 'Ekleniyor…' : 'Ekle') : 'Kaydet'}
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
          Pozisyon yükleniyor...
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

        <AdminPositionFormFields draft={draft} mode={mode} onChange={updateField} />

        {actionButtons}
      </main>

      <AdminPositionDeleteModal
        open={deleteOpen}
        positionName={draft.name.trim() || 'Pozisyon'}
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
