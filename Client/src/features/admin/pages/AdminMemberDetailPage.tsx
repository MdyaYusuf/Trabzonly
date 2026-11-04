import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import roleService from '@/features/roles/roleService'
import userService from '@/features/users/userService'
import { AdminMemberDeleteModal } from '../components/AdminMemberDeleteModal'
import { AdminMemberDetailFormFields } from '../components/AdminMemberDetailFormFields'
import {
  createEmptyAdminMemberFormDraft,
  mapDraftToAdminUpdateRequest,
  mapUserAdminDetailToFormDraft,
  validateAdminMemberDraft,
} from '../utils/adminMemberDraftUtils'
import type { AdminMemberFormDraft, AdminMemberRoleOption } from '../utils/adminMemberTypes'

export function AdminMemberDetailPage() {
  const { memberId } = useParams<{ memberId: string }>()
  const navigate = useNavigate()

  const [draft, setDraft] = useState<AdminMemberFormDraft>(createEmptyAdminMemberFormDraft)
  const [roles, setRoles] = useState<AdminMemberRoleOption[]>([])
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

      if (!memberId) {
        setFormError('Geçersiz üye kimliği.')
        setIsLoading(false)
        return
      }

      const [detailResult, rolesResult] = await Promise.all([
        userService.getAdminDetail(memberId),
        roleService.getAll({ pageNumber: 1, pageSize: 100 }),
      ])

      if (cancelled) {
        return
      }

      if (rolesResult.success && rolesResult.data) {
        setRoles(
          rolesResult.data.items.map((role) => ({
            id: role.id,
            name: role.name,
          })),
        )
      } else {
        setRoles([])
      }

      if (detailResult.success && detailResult.data) {
        setDraft(mapUserAdminDetailToFormDraft(detailResult.data))
      } else {
        setFormError(detailResult.message || 'Üye yüklenemedi.')
      }

      setIsLoading(false)
    }

    void loadPage()

    return () => {
      cancelled = true
    }
  }, [memberId])

  function updateField<K extends keyof AdminMemberFormDraft>(
    key: K,
    value: AdminMemberFormDraft[K],
  ) {
    setDraft((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  function handleCancel() {
    navigate('/yonetim/uyeler')
  }

  async function handleSave() {
    if (isSaving || !draft.id) {
      return
    }

    const validationError = validateAdminMemberDraft(draft)

    if (validationError) {
      setFormError(validationError)
      return
    }

    setIsSaving(true)
    setFormError(null)

    const result = await userService.adminUpdate(
      draft.id,
      mapDraftToAdminUpdateRequest(draft),
    )

    if (result.success) {
      navigate('/yonetim/uyeler')
    } else {
      setFormError(result.message || 'Üye güncellenemedi.')
    }

    setIsSaving(false)
  }

  async function handleConfirmDelete() {
    if (!draft.id || isDeleting) {
      return
    }

    setIsDeleting(true)

    const result = await userService.remove(draft.id)

    if (result.success) {
      navigate('/yonetim/uyeler')
      return
    }

    setFormError(result.message || 'Üye silinemedi.')
    setIsDeleting(false)
    setDeleteOpen(false)
  }

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
        Kaydet
      </button>
      <button
        type="button"
        onClick={handleCancel}
        className={`${actionButtonClass} border-outline-variant transition-colors hover:border-primary hover:text-primary`}
      >
        <span className="material-symbols-outlined text-[18px]">close</span>
        İptal
      </button>
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
    </div>
  )

  if (isLoading) {
    return (
      <main className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
        <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
          Üye yükleniyor...
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
              Üyeyi Düzenle
            </h1>
            <p className="font-body text-body-md text-on-surface-variant">
              Biyografi, görünen etiket, rol ve hesap durumunu yönetin.
            </p>
          </div>

          {actionButtons}
        </header>

        {formError ? (
          <p className="font-body border border-error/40 bg-error-container px-space-md py-space-sm text-body-md text-on-error-container">
            {formError}
          </p>
        ) : null}

        <AdminMemberDetailFormFields
          draft={draft}
          roles={roles}
          onChange={updateField}
        />

        {actionButtons}
      </main>

      <AdminMemberDeleteModal
        open={deleteOpen}
        username={draft.username.trim() || 'Üye'}
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
