type MySquadsDeleteModalProps = {
  open: boolean
  squadTitle: string
  onCancel: () => void
  onConfirm: () => void
}

export function MySquadsDeleteModal({
  open,
  squadTitle,
  onCancel,
  onConfirm,
}: MySquadsDeleteModalProps) {
  if (!open) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/60 p-4 backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onCancel()
        }
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          onCancel()
        }
      }}
      role="presentation"
    >
      <div className="relative w-full max-w-md bg-surface-container-lowest p-space-lg shadow-xl">
        <div className="mb-space-xs flex items-center gap-space-sm text-error">
          <span className="material-symbols-outlined text-[28px]">warning</span>
          <h3 className="font-headline text-headline-sm font-bold uppercase">KADROYU SİL</h3>
        </div>
        <p className="font-body my-space-sm text-body-md text-on-surface-variant">
          <strong className="font-bold text-primary">{squadTitle}</strong> adlı dizilişi ve buna ait
          tüm taktik notları silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
        </p>
        <div className="mt-space-lg flex items-center justify-end gap-space-sm">
          <button
            type="button"
            onClick={onCancel}
            className="font-label bg-surface-container px-space-md py-space-xs text-label-md font-semibold text-on-surface uppercase transition-colors hover:bg-surface-container-high"
          >
            Vazgeç
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="font-label bg-error px-space-md py-space-xs text-label-md font-bold text-on-error uppercase transition-colors hover:bg-on-error-container"
          >
            Evet, Sil
          </button>
        </div>
      </div>
    </div>
  )
}
