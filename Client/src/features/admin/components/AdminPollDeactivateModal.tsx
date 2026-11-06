type AdminPollDeactivateModalProps = {
  open: boolean
  question: string
  isDeactivating: boolean
  onCancel: () => void
  onConfirm: () => void
}

export function AdminPollDeactivateModal({
  open,
  question,
  isDeactivating,
  onCancel,
  onConfirm,
}: AdminPollDeactivateModalProps) {
  if (!open) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/60 p-4 backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget && !isDeactivating) {
          onCancel()
        }
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && !isDeactivating) {
          onCancel()
        }
      }}
      role="presentation"
    >
      <div className="relative w-full max-w-md bg-surface-container-lowest p-space-lg shadow-xl">
        <div className="mb-space-xs flex items-center gap-space-sm text-error">
          <span className="material-symbols-outlined text-[28px]">visibility_off</span>
          <h3 className="font-headline text-headline-sm font-bold uppercase">
            Anketi Pasifleştir
          </h3>
        </div>
        <p className="font-body my-space-sm text-body-md text-on-surface-variant">
          <strong className="font-bold text-primary">{question}</strong> anketini pasifleştirmek
          istediğinize emin misiniz? Anket silinmez; yalnızca yayından kaldırılır.
        </p>
        <div className="mt-space-lg flex items-center justify-end gap-space-sm">
          <button
            type="button"
            disabled={isDeactivating}
            onClick={onCancel}
            className="font-label cursor-pointer bg-surface-container px-space-md py-space-xs text-label-md font-semibold text-on-surface uppercase transition-colors hover:bg-surface-container-high disabled:cursor-not-allowed disabled:opacity-40"
          >
            Vazgeç
          </button>
          <button
            type="button"
            disabled={isDeactivating}
            onClick={onConfirm}
            className="font-label cursor-pointer bg-error px-space-md py-space-xs text-label-md font-bold text-on-error uppercase transition-colors hover:bg-on-error-container disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isDeactivating ? 'Pasifleştiriliyor…' : 'Evet, Pasifleştir'}
          </button>
        </div>
      </div>
    </div>
  )
}
