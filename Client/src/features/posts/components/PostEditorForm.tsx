import { useRef } from 'react'

type PostEditorFormProps = {
  summary: string
  body: string
  coverPreviewUrl: string | null
  coverFileName: string | null
  onSummaryChange: (value: string) => void
  onBodyChange: (value: string) => void
  onCoverFileChange: (file: File | null) => void
  onRemoveCover: () => void
}

function wordCount(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean)
  return words.length
}

export function PostEditorForm({
  summary,
  body,
  coverPreviewUrl,
  coverFileName,
  onSummaryChange,
  onBodyChange,
  onCoverFileChange,
  onRemoveCover,
}: PostEditorFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const words = wordCount(body)
  const readMinutes = Math.max(1, Math.round((words / 200) * 10) / 10)

  return (
    <div className="flex flex-col gap-space-lg">
      <div className="flex flex-col gap-space-md bg-surface-container-lowest p-space-lg shadow-sm">
        <div className="flex items-center justify-between">
          <span className="font-headline flex items-center gap-2 text-[16px] font-bold text-primary uppercase">
            <span className="material-symbols-outlined text-secondary">short_text</span>
            Açıklama (Özet)
          </span>
          <span className="font-label text-label-md text-on-surface-variant">
            {summary.length} / 500 Karakter
          </span>
        </div>
        <textarea
          rows={3}
          maxLength={500}
          value={summary}
          onChange={(event) => {
            onSummaryChange(event.target.value)
          }}
          placeholder="Gönderi akışında görünecek kısa giriş..."
          className="font-body w-full bg-surface-container-low px-space-md py-space-sm text-body-md text-on-surface focus:ring-1 focus:ring-primary focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-space-md bg-surface-container-lowest p-space-lg shadow-sm">
        <span className="font-headline flex items-center gap-2 text-[16px] font-bold text-primary uppercase">
          <span className="material-symbols-outlined text-secondary">image</span>
          Kapak Görseli
        </span>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0] ?? null
            onCoverFileChange(file)
          }}
        />

        {coverPreviewUrl ? (
          <div className="relative flex flex-col items-center gap-space-md overflow-hidden bg-surface-container-low p-space-md md:flex-row">
            <div className="h-36 w-full shrink-0 overflow-hidden bg-surface-container-high md:w-56">
              <img src={coverPreviewUrl} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="flex w-full flex-col gap-space-xs">
              <span className="font-body truncate text-body-md font-bold text-on-surface">
                {coverFileName ?? 'Kapak görseli'}
              </span>
              <div className="flex items-center gap-space-xs">
                <button
                  type="button"
                  onClick={() => {
                    fileInputRef.current?.click()
                  }}
                  className="font-label flex items-center gap-1 bg-surface-container px-space-md py-1 text-label-md tracking-wider text-on-surface uppercase"
                >
                  Değiştir
                </button>
                <button
                  type="button"
                  onClick={onRemoveCover}
                  className="font-label flex items-center gap-1 bg-error-container px-space-md py-1 text-label-md tracking-wider text-on-error-container uppercase"
                >
                  Kaldır
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              fileInputRef.current?.click()
            }}
            className="flex flex-col items-center justify-center gap-space-xs bg-surface-container p-space-lg text-center transition-colors hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-2xl text-secondary">cloud_upload</span>
            <p className="font-headline text-headline-sm text-on-surface">Kapak görseli seç</p>
            <p className="font-body text-body-sm text-on-surface-variant">
              PNG, JPG veya WEBP • Maksimum 5MB
            </p>
          </button>
        )}
      </div>

      <div className="flex flex-col gap-space-md bg-surface-container-lowest p-space-lg shadow-sm">
        <div className="flex items-center justify-between gap-space-sm">
          <span className="font-headline flex items-center gap-2 text-[16px] font-bold text-primary uppercase">
            <span className="material-symbols-outlined text-secondary">edit_note</span>
            İçerik
          </span>
          <span className="font-label text-label-md text-error">* Zorunlu Alan</span>
        </div>
        <textarea
          rows={14}
          value={body}
          onChange={(event) => {
            onBodyChange(event.target.value)
          }}
          placeholder="Buraya yazınızı detaylandırın..."
          className="font-body w-full bg-surface-container-low p-space-md text-body-lg leading-relaxed text-on-surface focus:ring-1 focus:ring-primary focus:outline-none"
        />
        <div className="font-label flex items-center justify-between gap-space-md bg-surface-container-low px-space-md py-space-xs text-label-md text-on-surface-variant">
          <span>
            Kelime Sayısı: <strong className="text-on-surface">{words}</strong>
          </span>
          <span>
            Okuma Süresi: <strong className="text-on-surface">{readMinutes} dk</strong>
          </span>
        </div>
      </div>
    </div>
  )
}
