type AdminMatchWeekNewWeekModalProps = {
  open: boolean
  isSubmitting: boolean
  onCancel: () => void
  onConfirm: () => void
}

export function AdminMatchWeekNewWeekModal({
  open,
  isSubmitting,
  onCancel,
  onConfirm,
}: AdminMatchWeekNewWeekModalProps) {
  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-week-title"
        className="w-full max-w-md border border-outline-variant/40 bg-surface p-space-lg shadow-lg"
      >
        <div className="mb-space-md flex items-start gap-space-sm">
          <span className="material-symbols-outlined text-[28px] text-error">warning</span>
          <div>
            <h2
              id="new-week-title"
              className="font-headline text-headline-sm font-bold text-primary uppercase"
            >
              Yeni Hafta
            </h2>
            <p className="font-body mt-1 text-body-md text-on-surface-variant">
              Mevcut maç haftası kadrosu bu dizilişle değiştirilecek ve tüm oyuncu puanları
              silinecek. Devam etmek istiyor musunuz?
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-space-sm">
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
            className="font-label cursor-pointer bg-error px-space-md py-space-xs text-label-md font-bold text-on-error uppercase transition-colors hover:bg-on-error-container disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSubmitting ? 'Kaydediliyor…' : 'Onayla'}
          </button>
        </div>
      </div>
    </div>
  )
}
