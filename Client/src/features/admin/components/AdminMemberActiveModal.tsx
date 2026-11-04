type AdminMemberActiveModalProps = {
  open: boolean
  username: string
  currentlyActive: boolean
  isSubmitting: boolean
  onCancel: () => void
  onConfirm: () => void
}

export function AdminMemberActiveModal({
  open,
  username,
  currentlyActive,
  isSubmitting,
  onCancel,
  onConfirm,
}: AdminMemberActiveModalProps) {
  if (!open) {
    return null
  }

  const title = currentlyActive ? 'Hesabı Askıya Al' : 'Hesabı Aktifleştir'
  const description = currentlyActive
    ? 'hesabını pasife almak istediğinize emin misiniz? Üye oturum açamayacak.'
    : 'hesabını tekrar aktifleştirmek istediğinize emin misiniz?'
  const confirmLabel = currentlyActive ? 'Evet, Askıya Al' : 'Evet, Aktifleştir'
  const submittingLabel = currentlyActive ? 'Askıya alınıyor…' : 'Aktifleştiriliyor…'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/60 p-4 backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) {
          onCancel()
        }
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && !isSubmitting) {
          onCancel()
        }
      }}
      role="presentation"
    >
      <div className="relative w-full max-w-md bg-surface-container-lowest p-space-lg shadow-xl">
        <div className="mb-space-xs flex items-center gap-space-sm text-primary">
          <span className="material-symbols-outlined text-[28px]">
            {currentlyActive ? 'person_off' : 'person'}
          </span>
          <h3 className="font-headline text-headline-sm font-bold uppercase">{title}</h3>
        </div>
        <p className="font-body my-space-sm text-body-md text-on-surface-variant">
          <strong className="font-bold text-primary">{username}</strong> {description}
        </p>
        <div className="mt-space-lg flex items-center justify-end gap-space-sm">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onCancel}
            className="font-label cursor-pointer bg-surface-container px-space-md py-space-xs text-label-md font-semibold text-on-surface uppercase transition-colors hover:bg-surface-container-high disabled:cursor-not-allowed disabled:opacity-40"
          >
            Vazgeç
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onConfirm}
            className="font-label cursor-pointer bg-primary-container px-space-md py-space-xs text-label-md font-bold text-on-primary uppercase transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSubmitting ? submittingLabel : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
