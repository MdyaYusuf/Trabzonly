type SquadBuilderPublishModalProps = {
  open: boolean
  title: string
  formationLabel: string
  filled: number
  onClose: () => void
}

export function SquadBuilderPublishModal({
  open,
  title,
  formationLabel,
  filled,
  onClose,
}: SquadBuilderPublishModalProps) {
  if (!open) {
    return null
  }

  const shareUrl = 'https://trabzonly.com/kadrolar/akyazi-sok-presi-banza-cham-2024'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/80 p-4 backdrop-blur-sm">
      <div className="relative flex w-full max-w-lg flex-col gap-space-md bg-surface-container-lowest p-space-lg shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant transition-colors hover:text-primary"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        <div className="flex items-center gap-2 text-primary">
          <span className="material-symbols-outlined text-[32px] text-tertiary-fixed-dim">
            celebration
          </span>
          <div>
            <h3 className="font-headline text-headline-md font-bold tracking-tight">
              Kadro Başarıyla Kaydedildi!
            </h3>
            <p className="font-body text-body-sm text-on-surface-variant">
              Kadro topluluk akışında 1. sıraya yerleşti.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 bg-primary p-space-md text-on-primary">
          <div className="flex items-center justify-between">
            <span className="font-kicker text-kicker font-bold text-secondary-container uppercase">
              TRABZONLY TAKTİK TAHTASI
            </span>
            <span className="font-kicker text-kicker font-bold text-tertiary-fixed-dim uppercase">
              {formationLabel} SİSTEMİ
            </span>
          </div>
          <h4 className="font-headline text-headline-sm font-bold text-on-primary">{title}</h4>
          <p className="font-body text-[12px] text-on-primary/80">
            Kadro Tamamlandı: {filled} / 11 Oyuncu Sahada • TFF Yabancı Kuralına Uygun
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-label text-label-md font-bold text-on-surface">
            Paylaşım Bağlantısı:
          </span>
          <div className="flex items-center gap-2">
            <input
              className="font-body w-full bg-surface-container p-2 text-[12px] text-on-surface focus:outline-none"
              readOnly
              type="text"
              value={shareUrl}
            />
            <button
              type="button"
              onClick={() => {
                void navigator.clipboard?.writeText(shareUrl)
              }}
              className="font-label shrink-0 bg-secondary px-4 py-2 text-label-md font-bold text-on-secondary uppercase"
            >
              KOPYALA
            </button>
          </div>
        </div>

        <div className="flex items-center justify-end gap-space-sm pt-2">
          <button
            type="button"
            onClick={onClose}
            className="font-label bg-primary px-space-md py-space-xs text-label-md text-on-primary uppercase"
          >
            TAMAM
          </button>
        </div>
      </div>
    </div>
  )
}
