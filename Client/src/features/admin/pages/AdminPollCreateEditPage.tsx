import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import playerService from '@/features/players/playerService'
import pollService from '@/features/polls/pollService'
import { AdminPollDeactivateModal } from '../components/AdminPollDeactivateModal'
import { AdminPollFormFields } from '../components/AdminPollFormFields'
import {
  createEmptyAdminPollFormDraft,
  mapDraftToCreateRequest,
  mapDraftToUpdateRequest,
  mapPollAdminDetailToFormDraft,
  validateAdminPollDraft,
} from '../utils/adminPollDraftUtils'
import type { AdminPollFormDraft, AdminPollOptionDraft } from '../utils/adminPollTypes'

type AdminPollCreateEditPageProps = {
  mode?: 'create' | 'edit'
}

export function AdminPollCreateEditPage({ mode: modeProp }: AdminPollCreateEditPageProps) {
  const { pollId } = useParams<{ pollId: string }>()
  const navigate = useNavigate()
  const mode = modeProp ?? (pollId ? 'edit' : 'create')

  const [draft, setDraft] = useState<AdminPollFormDraft>(createEmptyAdminPollFormDraft)
  const [players, setPlayers] = useState<Array<{ id: number; name: string }>>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [deactivateOpen, setDeactivateOpen] = useState(false)
  const [isDeactivating, setIsDeactivating] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadPage() {
      setIsLoading(true)
      setFormError(null)

      const playersResult = await playerService.getAllForAdmin({
        pageNumber: 1,
        pageSize: 200,
        sort: 'number-asc',
      })

      if (cancelled) {
        return
      }

      if (playersResult.success && playersResult.data) {
        setPlayers(
          playersResult.data.items.map((player) => ({
            id: player.id,
            name: player.name,
          })),
        )
      } else {
        setPlayers([])
      }

      if (mode === 'create') {
        setDraft(createEmptyAdminPollFormDraft())
        setIsLoading(false)
        return
      }

      if (!pollId) {
        setFormError('Geçersiz anket kimliği.')
        setIsLoading(false)
        return
      }

      const id = Number(pollId)

      if (!Number.isFinite(id) || id <= 0) {
        setFormError('Geçersiz anket kimliği.')
        setIsLoading(false)
        return
      }

      const pollResult = await pollService.getAdminById(id)

      if (cancelled) {
        return
      }

      if (pollResult.success && pollResult.data) {
        setDraft(mapPollAdminDetailToFormDraft(pollResult.data))
      } else {
        setFormError(pollResult.message || 'Anket yüklenemedi.')
      }

      setIsLoading(false)
    }

    void loadPage()

    return () => {
      cancelled = true
    }
  }, [mode, pollId])

  function updateField<K extends keyof AdminPollFormDraft>(
    key: K,
    value: AdminPollFormDraft[K],
  ) {
    setDraft((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  function handleOptionsChange(options: AdminPollOptionDraft[]) {
    setDraft((prev) => ({
      ...prev,
      options,
    }))
  }

  function handleCancel() {
    navigate('/yonetim/anketler')
  }

  async function handleSave() {
    if (isSaving) {
      return
    }

    const validationError = validateAdminPollDraft(draft, mode)

    if (validationError) {
      setFormError(validationError)
      return
    }

    setIsSaving(true)
    setFormError(null)

    if (mode === 'create') {
      const result = await pollService.add(mapDraftToCreateRequest(draft))

      if (result.success) {
        navigate('/yonetim/anketler')
      } else {
        setFormError(result.message || 'Anket kaydedilemedi.')
      }
    } else {
      const result = await pollService.update(mapDraftToUpdateRequest(draft))

      if (result.success) {
        navigate('/yonetim/anketler')
      } else {
        setFormError(result.message || 'Anket güncellenemedi.')
      }
    }

    setIsSaving(false)
  }

  async function handleConfirmDeactivate() {
    if (draft.id == null || isDeactivating || !draft.isActive) {
      return
    }

    setIsDeactivating(true)

    const result = await pollService.deactivate(draft.id)

    if (result.success) {
      navigate('/yonetim/anketler')
      return
    }

    setFormError(result.message || 'Anket pasifleştirilemedi.')
    setIsDeactivating(false)
    setDeactivateOpen(false)
  }

  const title = mode === 'edit' ? 'Anketi Düzenle' : 'Yeni Anket Ekle'
  const description =
    mode === 'edit'
      ? 'Anket sorusunu, seçeneklerini ve aktif durumunu güncelleyin.'
      : 'Global veya oyuncu anketi oluşturun.'

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
          disabled={!draft.isActive}
          title={draft.isActive ? undefined : 'Anket zaten pasif'}
          onClick={() => {
            setDeactivateOpen(true)
          }}
          className={`${actionButtonClass} border-error text-error transition-colors hover:bg-error-container disabled:cursor-not-allowed disabled:opacity-40`}
        >
          <span className="material-symbols-outlined text-[18px]">visibility_off</span>
          Pasifleştir
        </button>
      ) : null}
    </div>
  )

  if (isLoading) {
    return (
      <main className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
        <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
          Anket yükleniyor...
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

        <AdminPollFormFields
          draft={draft}
          mode={mode}
          players={players}
          onChange={updateField}
          onOptionsChange={handleOptionsChange}
        />

        {actionButtons}
      </main>

      <AdminPollDeactivateModal
        open={deactivateOpen}
        question={draft.question.trim() || 'Anket'}
        isDeactivating={isDeactivating}
        onCancel={() => {
          if (isDeactivating) {
            return
          }

          setDeactivateOpen(false)
        }}
        onConfirm={() => {
          void handleConfirmDeactivate()
        }}
      />
    </div>
  )
}
