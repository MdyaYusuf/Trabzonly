import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import seasonService from '@/features/seasons/seasonService'
import { AdminSeasonDeleteModal } from '../components/AdminSeasonDeleteModal'
import { AdminSeasonFormFields } from '../components/AdminSeasonFormFields'
import {
  createEmptyAdminSeasonFormDraft,
  mapDraftToCreateRequest,
  mapDraftToUpdateRequest,
  mapSeasonResponseToFormDraft,
  validateAdminSeasonDraft,
} from '../utils/adminSeasonDraftUtils'
import type { AdminSeasonFormDraft } from '../utils/adminSeasonTypes'

type AdminSeasonCreateEditPageProps = {
  mode?: 'create' | 'edit'
}

export function AdminSeasonCreateEditPage({ mode: modeProp }: AdminSeasonCreateEditPageProps) {
  const { seasonId } = useParams<{ seasonId: string }>()
  const navigate = useNavigate()
  const mode = modeProp ?? (seasonId ? 'edit' : 'create')

  const [draft, setDraft] = useState<AdminSeasonFormDraft>(createEmptyAdminSeasonFormDraft)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isFirstSeason, setIsFirstSeason] = useState(false)
  const [activeCount, setActiveCount] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function loadPage() {
      setIsLoading(true)
      setFormError(null)

      if (mode === 'create') {
        const summaryResult = await seasonService.getAdminSummary()

        if (cancelled) {
          return
        }

        const totalCount =
          summaryResult.success && summaryResult.data ? summaryResult.data.totalCount : 0
        const summaryActiveCount =
          summaryResult.success && summaryResult.data ? summaryResult.data.activeCount : 0

        setIsFirstSeason(totalCount === 0)
        setActiveCount(summaryActiveCount)

        if (totalCount === 0) {
          setDraft((prev) => ({
            ...prev,
            isActive: true,
          }))
        }

        setIsLoading(false)
        return
      }

      if (!seasonId) {
        setFormError('Geçersiz sezon kimliği.')
        setIsLoading(false)
        return
      }

      const id = Number(seasonId)

      if (!Number.isFinite(id) || id <= 0) {
        setFormError('Geçersiz sezon kimliği.')
        setIsLoading(false)
        return
      }

      const [seasonResult, summaryResult] = await Promise.all([
        seasonService.getById(id),
        seasonService.getAdminSummary(),
      ])

      if (cancelled) {
        return
      }

      if (summaryResult.success && summaryResult.data) {
        setActiveCount(summaryResult.data.activeCount)
      }

      if (seasonResult.success && seasonResult.data) {
        setDraft(mapSeasonResponseToFormDraft(seasonResult.data))
      } else {
        setFormError(seasonResult.message || 'Sezon yüklenemedi.')
      }

      setIsLoading(false)
    }

    void loadPage()

    return () => {
      cancelled = true
    }
  }, [mode, seasonId])

  function updateField<K extends keyof AdminSeasonFormDraft>(
    key: K,
    value: AdminSeasonFormDraft[K],
  ) {
    setDraft((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  function handleCancel() {
    navigate('/yonetim/sezonlar')
  }

  async function handleSave() {
    if (isSaving) {
      return
    }

    const validationError = validateAdminSeasonDraft(draft)

    if (validationError) {
      setFormError(validationError)
      return
    }

    setIsSaving(true)
    setFormError(null)

    if (mode === 'create') {
      const result = await seasonService.add(mapDraftToCreateRequest(draft))

      if (result.success) {
        navigate('/yonetim/sezonlar')
      } else {
        setFormError(result.message || 'Sezon kaydedilemedi.')
      }
    } else {
      const result = await seasonService.update(mapDraftToUpdateRequest(draft))

      if (result.success) {
        navigate('/yonetim/sezonlar')
      } else {
        setFormError(result.message || 'Sezon güncellenemedi.')
      }
    }

    setIsSaving(false)
  }

  async function handleConfirmDelete() {
    if (draft.id == null || isDeleting || draft.isActive) {
      return
    }

    setIsDeleting(true)

    const result = await seasonService.remove(draft.id)

    if (result.success) {
      navigate('/yonetim/sezonlar')
      return
    }

    setFormError(result.message || 'Sezon silinemedi.')
    setIsDeleting(false)
    setDeleteOpen(false)
  }

  const title = mode === 'edit' ? 'Sezonu Düzenle' : 'Yeni Sezon Ekle'
  const description =
    mode === 'edit'
      ? 'Sezon adı, tarih aralığı ve aktif durumunu güncelleyin.'
      : 'Yeni sezon kaydı oluşturun.'

  const isActiveToggleLocked =
    (mode === 'create' && isFirstSeason) ||
    (mode === 'edit' && draft.isActive && activeCount <= 1)

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
          disabled={draft.isActive}
          title={
            draft.isActive
              ? 'Aktif sezon silinemez. Önce başka bir sezonu aktif yapın.'
              : undefined
          }
          onClick={() => {
            setDeleteOpen(true)
          }}
          className={`${actionButtonClass} border-error text-error transition-colors hover:bg-error-container disabled:cursor-not-allowed disabled:opacity-40`}
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
          Sezon yükleniyor...
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

        <AdminSeasonFormFields
          draft={draft}
          mode={mode}
          isActiveToggleLocked={isActiveToggleLocked}
          onChange={updateField}
        />

        {actionButtons}
      </main>

      <AdminSeasonDeleteModal
        open={deleteOpen}
        seasonName={draft.name.trim() || 'Sezon'}
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
