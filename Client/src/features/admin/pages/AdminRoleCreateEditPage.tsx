import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import roleService from '@/features/roles/roleService'
import { AdminRoleDeleteModal } from '../components/AdminRoleDeleteModal'
import { AdminRoleFormFields } from '../components/AdminRoleFormFields'
import {
  createEmptyAdminRoleFormDraft,
  mapDraftToCreateRequest,
  mapDraftToUpdateRequest,
  mapRoleResponseToFormDraft,
  validateAdminRoleDraft,
} from '../utils/adminRoleDraftUtils'
import type { AdminRoleFormDraft } from '../utils/adminRoleTypes'

type AdminRoleCreateEditPageProps = {
  mode?: 'create' | 'edit'
}

export function AdminRoleCreateEditPage({
  mode: modeProp,
}: AdminRoleCreateEditPageProps) {
  const { roleId } = useParams<{ roleId: string }>()
  const navigate = useNavigate()
  const mode = modeProp ?? (roleId ? 'edit' : 'create')

  const [draft, setDraft] = useState<AdminRoleFormDraft>(createEmptyAdminRoleFormDraft)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadPage() {
      setIsLoading(true)
      setFormError(null)

      if (mode === 'create') {
        setDraft(createEmptyAdminRoleFormDraft())
        setIsLoading(false)
        return
      }

      if (!roleId) {
        setFormError('Geçersiz rol kimliği.')
        setIsLoading(false)
        return
      }

      const id = Number(roleId)

      if (!Number.isFinite(id) || id <= 0) {
        setFormError('Geçersiz rol kimliği.')
        setIsLoading(false)
        return
      }

      const [roleResult, listResult] = await Promise.all([
        roleService.getById(id),
        roleService.getAllForAdmin({ sort: 'name-asc' }),
      ])

      if (cancelled) {
        return
      }

      if (roleResult.success && roleResult.data) {
        const match = listResult.success
          ? listResult.data?.find((item) => item.id === id)
          : undefined

        setDraft(
          mapRoleResponseToFormDraft(roleResult.data, match?.memberCount ?? 0),
        )
      } else {
        setFormError(roleResult.message || 'Rol yüklenemedi.')
      }

      setIsLoading(false)
    }

    void loadPage()

    return () => {
      cancelled = true
    }
  }, [mode, roleId])

  function updateField<K extends keyof AdminRoleFormDraft>(
    key: K,
    value: AdminRoleFormDraft[K],
  ) {
    setDraft((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  function handleCancel() {
    navigate('/yonetim/roller')
  }

  async function handleSave() {
    if (isSaving || draft.isSystem) {
      return
    }

    const validationError = validateAdminRoleDraft(draft)

    if (validationError) {
      setFormError(validationError)
      return
    }

    setIsSaving(true)
    setFormError(null)

    if (mode === 'create') {
      const result = await roleService.add(mapDraftToCreateRequest(draft))

      if (result.success) {
        navigate('/yonetim/roller')
      } else {
        setFormError(result.message || 'Rol kaydedilemedi.')
      }
    } else {
      const result = await roleService.update(mapDraftToUpdateRequest(draft))

      if (result.success) {
        navigate('/yonetim/roller')
      } else {
        setFormError(result.message || 'Rol güncellenemedi.')
      }
    }

    setIsSaving(false)
  }

  async function handleConfirmDelete() {
    if (draft.id == null || isDeleting || draft.isSystem || draft.memberCount > 0) {
      return
    }

    setIsDeleting(true)

    const result = await roleService.remove(draft.id)

    if (result.success) {
      navigate('/yonetim/roller')
      return
    }

    setFormError(result.message || 'Rol silinemedi.')
    setIsDeleting(false)
    setDeleteOpen(false)
  }

  const title = mode === 'edit' ? 'Rolü Düzenle' : 'Yeni Rol Ekle'
  const description =
    mode === 'edit'
      ? draft.isSystem
        ? 'Sistem rolü salt okunurdur. Adı değiştirilemez veya silinemez.'
        : 'Rol adını güncelleyin veya rolü silin.'
      : 'Yeni bir özel rol oluşturun.'

  const canSave = mode === 'create' || !draft.isSystem
  const canDelete = mode === 'edit' && !draft.isSystem && draft.memberCount === 0

  const actionButtonClass =
    'font-label inline-flex h-10 w-[8.75rem] cursor-pointer items-center justify-center gap-1 border px-space-md text-label-md uppercase'

  const actionButtons = (
    <div className="flex flex-wrap items-center justify-end gap-space-sm">
      {canSave ? (
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
      ) : null}
      <button
        type="button"
        onClick={handleCancel}
        className={`${actionButtonClass} border-outline-variant transition-colors hover:border-primary hover:text-primary`}
      >
        <span className="material-symbols-outlined text-[18px]">close</span>
        İptal
      </button>
      {mode === 'edit' && !draft.isSystem ? (
        <button
          type="button"
          disabled={!canDelete}
          title={
            draft.memberCount > 0
              ? 'Bu role bağlı üyeler varken silinemez.'
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
          Rol yükleniyor...
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

        <AdminRoleFormFields draft={draft} mode={mode} onChange={updateField} />

        {actionButtons}
      </main>

      <AdminRoleDeleteModal
        open={deleteOpen}
        roleName={draft.name.trim() || 'Rol'}
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
