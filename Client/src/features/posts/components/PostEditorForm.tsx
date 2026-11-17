type PostEditorFormProps = {
  summary: string
  body: string
  onSummaryChange: (value: string) => void
  onBodyChange: (value: string) => void
}

function wordCount(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean)
  return words.length
}

export function PostEditorForm({
  summary,
  body,
  onSummaryChange,
  onBodyChange,
}: PostEditorFormProps) {
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
