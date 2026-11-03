import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import categoryService from '@/features/categories/categoryService'
import { AdminCategoryDeleteModal } from '../components/AdminCategoryDeleteModal'
import { AdminCategoryFormFields } from '../components/AdminCategoryFormFields'
import {
  createEmptyAdminCategoryFormDraft,
  mapCategoryResponseToFormDraft,
  mapDraftToCreateRequest,
  mapDraftToUpdateRequest,
  validateAdminCategoryDraft,
} from '../utils/adminCategoryDraftUtils'
import type { AdminCategoryFormDraft } from '../utils/adminCategoryTypes'

type AdminCategoryCreateEditPageProps = {
  mode?: 'create' | 'edit'
}

export function AdminCategoryCreateEditPage({
  mode: modeProp,
}: AdminCategoryCreateEditPageProps) {
  const { categoryId } = useParams<{ categoryId: string }>()
  const navigate = useNavigate()
  const mode = modeProp ?? (categoryId ? 'edit' : 'create')

  const [draft, setDraft] = useState<AdminCategoryFormDraft>(createEmptyAdminCategoryFormDraft)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [linkedPostCount, setLinkedPostCount] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function loadPage() {
      setIsLoading(true)
      setFormError(null)

      if (mode === 'create') {
        setDraft(createEmptyAdminCategoryFormDraft())
        setLinkedPostCount(0)
        setIsLoading(false)
        return
      }

      if (!categoryId) {
        setFormError('Geçersiz kategori kimliği.')
        setIsLoading(false)
        return
      }

      const id = Number(categoryId)

      if (!Number.isFinite(id) || id <= 0) {
        setFormError('Geçersiz kategori kimliği.')
        setIsLoading(false)
        return
      }

      const [categoryResult, listResult] = await Promise.all([
        categoryService.getById(id),
        categoryService.getAllForAdmin({ search: undefined, sort: 'name-asc' }),
      ])

      if (cancelled) {
        return
      }

      if (categoryResult.success && categoryResult.data) {
        setDraft(mapCategoryResponseToFormDraft(categoryResult.data))
      } else {
        setFormError(categoryResult.message || 'Kategori yüklenemedi.')
      }

      if (listResult.success && listResult.data) {
        const match = listResult.data.find((item) => item.id === id)
        setLinkedPostCount(match?.postCount ?? 0)
      } else {
        setLinkedPostCount(0)
      }

      setIsLoading(false)
    }

    void loadPage()

    return () => {
      cancelled = true
    }
  }, [mode, categoryId])

  function updateField<K extends keyof AdminCategoryFormDraft>(
    key: K,
    value: AdminCategoryFormDraft[K],
  ) {
    setDraft((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  function handleCancel() {
    navigate('/yonetim/kategoriler')
  }

  async function handleSave() {
    if (isSaving) {
      return
    }

    const validationError = validateAdminCategoryDraft(draft)

    if (validationError) {
      setFormError(validationError)
      return
    }

    setIsSaving(true)
    setFormError(null)

    if (mode === 'create') {
      const result = await categoryService.add(mapDraftToCreateRequest(draft))

      if (result.success) {
        navigate('/yonetim/kategoriler')
      } else {
        setFormError(result.message || 'Kategori kaydedilemedi.')
      }
    } else {
      const result = await categoryService.update(mapDraftToUpdateRequest(draft))

      if (result.success) {
        navigate('/yonetim/kategoriler')
      } else {
        setFormError(result.message || 'Kategori güncellenemedi.')
      }
    }

    setIsSaving(false)
  }

  async function handleConfirmDelete() {
    if (draft.id == null || isDeleting || linkedPostCount > 0) {
      return
    }

    setIsDeleting(true)

    const result = await categoryService.remove(draft.id)

    if (result.success) {
      navigate('/yonetim/kategoriler')
      return
    }

    setFormError(result.message || 'Kategori silinemedi.')
    setIsDeleting(false)
    setDeleteOpen(false)
  }

  const title = mode === 'edit' ? 'Kategoriyi Düzenle' : 'Yeni Kategori Ekle'
  const description =
    mode === 'edit'
      ? 'Kategori adı, açıklama ve aktif durumunu güncelleyin.'
      : 'Yeni gönderi kategorisi oluşturun.'

  const canDelete = mode === 'edit' && linkedPostCount === 0

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
          disabled={!canDelete}
          title={
            linkedPostCount > 0
              ? 'Bu kategoriye bağlı gönderiler varken silinemez.'
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
          Kategori yükleniyor...
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

        <AdminCategoryFormFields draft={draft} mode={mode} onChange={updateField} />

        {actionButtons}
      </main>

      <AdminCategoryDeleteModal
        open={deleteOpen}
        categoryName={draft.name.trim() || 'Kategori'}
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
