type SquadBuilderNotesProps = {
  notes: string
  openForVoting: boolean
  generateCard: boolean
  onNotesChange: (value: string) => void
  onOpenForVotingChange: (value: boolean) => void
  onGenerateCardChange: (value: boolean) => void
  onDownload: () => void
}

export function SquadBuilderNotes({
  notes,
  openForVoting,
  generateCard,
  onNotesChange,
  onOpenForVotingChange,
  onGenerateCardChange,
  onDownload,
}: SquadBuilderNotesProps) {
  return (
    <div className="flex w-full flex-col gap-space-sm bg-surface-container-lowest p-space-md shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-space-sm">
        <span className="font-headline flex items-center gap-2 text-[16px] font-bold text-primary uppercase">
          <span className="material-symbols-outlined text-secondary">stylus_note</span>
          Taktik Analizi & Tribün Direktifleri
        </span>
        <span className="font-kicker text-kicker text-on-surface-variant uppercase">
          Yazar: BordoMaviTaktik
        </span>
      </div>

      <div className="flex items-center gap-1 bg-surface-container px-2 py-1">
        <button type="button" className="px-2 py-1 text-[12px] font-bold text-on-surface hover:bg-surface-container-high">
          B
        </button>
        <button type="button" className="px-2 py-1 text-[12px] text-on-surface italic hover:bg-surface-container-high">
          I
        </button>
        <span className="h-4 w-px bg-outline-variant" />
        <button type="button" className="flex items-center px-1 py-1 text-on-surface hover:bg-surface-container-high">
          <span className="material-symbols-outlined text-[16px]">format_list_bulleted</span>
        </button>
        <button type="button" className="flex items-center px-1 py-1 text-on-surface hover:bg-surface-container-high">
          <span className="material-symbols-outlined text-[16px]">sports_soccer</span>
        </button>
        <span className="font-kicker ml-auto text-[11px] text-on-surface-variant uppercase">
          Topluluk Notu
        </span>
      </div>

      <textarea
        rows={4}
        value={notes}
        onChange={(event) => {
          onNotesChange(event.target.value)
        }}
        placeholder="Bu kadrodaki taktik planınızı, ön alan pres kurgusunu, korner organizasyonlarını ve maç senaryolarınızı detaylandırın..."
        className="font-body w-full bg-surface-container p-space-sm text-body-sm leading-relaxed text-on-surface focus:ring-1 focus:ring-primary focus:outline-none"
      />

      <div className="flex flex-col gap-2 pt-space-xs">
        <label className="flex cursor-pointer items-center gap-2 select-none">
          <input
            type="checkbox"
            checked={openForVoting}
            onChange={(event) => {
              onOpenForVotingChange(event.target.checked)
            }}
            className="h-4 w-4 accent-primary"
          />
          <span className="font-body text-[13px] text-on-surface">
            Bu kadroyu <strong>&quot;Tribün Güncesi & Kadrolar&quot;</strong> akışında oylamaya ve
            yoruma aç
          </span>
        </label>
        <label className="flex cursor-pointer items-center gap-2 select-none">
          <input
            type="checkbox"
            checked={generateCard}
            onChange={(event) => {
              onGenerateCardChange(event.target.checked)
            }}
            className="h-4 w-4 accent-primary"
          />
          <span className="font-body text-[13px] text-on-surface">
            Instagram Hikaye & X (Twitter) Taktik Kartı Çıktısı oluştur
          </span>
        </label>
      </div>

      <div className="flex items-center justify-between bg-surface-container-low p-2.5 pt-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[22px] text-secondary">photo_camera</span>
          <div className="flex flex-col">
            <span className="font-headline text-[12px] font-bold text-primary">
              Taktik Kartı Dışa Aktar
            </span>
            <span className="font-body text-[11px] text-on-surface-variant">
              1080x1920 Story veya 1200x675 X Formatı
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onDownload}
          className="font-kicker flex items-center gap-1 bg-surface-container-highest px-3 py-1 text-kicker font-bold text-on-surface uppercase transition-all hover:bg-primary hover:text-on-primary"
        >
          <span className="material-symbols-outlined text-[15px]">download</span>
          İNDİR (.PNG)
        </button>
      </div>
    </div>
  )
}
