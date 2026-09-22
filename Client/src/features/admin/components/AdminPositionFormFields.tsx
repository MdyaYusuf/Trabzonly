import type { AdminPositionFormDraft } from '../utils/adminPositionTypes'

type AdminPositionFormFieldsProps = {
  draft: AdminPositionFormDraft
  onChange: <K extends keyof AdminPositionFormDraft>(
    key: K,
    value: AdminPositionFormDraft[K],
  ) => void
}

const inputClass =
  'font-body w-full border border-outline-variant/50 bg-surface px-space-md py-space-sm text-body-md text-on-surface outline-none focus:border-primary'

const zoneOptions = [
  { id: 'goalkeeper' as const, label: 'Kale (GK)' },
  { id: 'defence' as const, label: 'Savunma Hattı (DEF)' },
  { id: 'midfield' as const, label: 'Orta Saha (MID)' },
  { id: 'attack' as const, label: 'Hücum Hattı (FWD)' },
]

export function AdminPositionFormFields({ draft, onChange }: AdminPositionFormFieldsProps) {
  return (
    <div className="flex flex-col gap-space-md">
      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex flex-wrap items-center justify-between gap-space-sm border-b border-outline-variant/40 pb-space-sm">
          <h2 className="font-headline text-headline-sm font-bold text-primary uppercase">
            Temel Pozisyon Bilgileri
          </h2>
          <span className="font-kicker text-kicker tracking-widest text-on-surface-variant uppercase">
            Zorunlu Alanlar (*)
          </span>
        </div>

        <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
          <div className="md:col-span-2">
            <label
              htmlFor="positionName"
              className="font-label mb-1 block text-label-md text-on-surface-variant"
            >
              Pozisyon Adı <span className="text-error">*</span>
              <span className="font-kicker ml-space-sm text-kicker uppercase">
                Resmi Adlandırma
              </span>
            </label>
            <input
              id="positionName"
              className={inputClass}
              value={draft.name}
              onChange={(event) => {
                onChange('name', event.target.value)
              }}
            />
            <p className="font-body mt-space-xs flex items-start gap-1 text-body-sm text-on-surface-variant">
              <span className="material-symbols-outlined mt-0.5 text-[16px]">info</span>
              Tam pozisyon adı oyuncu detay sayfalarında ve resmi kadro bültenlerinde yer alır.
            </p>
          </div>

          <div>
            <label
              htmlFor="abbreviation"
              className="font-label mb-1 block text-label-md text-on-surface-variant"
            >
              Kısaltma <span className="text-error">*</span>
              <span className="font-kicker ml-space-sm text-kicker uppercase">Azami 4 Harf</span>
            </label>
            <input
              id="abbreviation"
              maxLength={4}
              className={`${inputClass} uppercase`}
              value={draft.abbreviation}
              onChange={(event) => {
                onChange('abbreviation', event.target.value.toUpperCase())
              }}
            />
            <p className="font-body mt-space-xs text-body-sm text-on-surface-variant">
              Kısaltmalar oyuncu kartlarında ve kadro slotlarında görünür.
            </p>
          </div>

          <div>
            <label
              htmlFor="zone"
              className="font-label mb-1 block text-label-md text-on-surface-variant"
            >
              Saha Bölgesi (Taktik Kategori) <span className="text-error">*</span>
            </label>
            <select
              id="zone"
              className={inputClass}
              value={draft.zone}
              onChange={(event) => {
                const zone = event.target.value as AdminPositionFormDraft['zone']
                const option = zoneOptions.find((item) => item.id === zone)
                onChange('zone', zone)
                onChange('zoneSelectLabel', option?.label ?? draft.zoneSelectLabel)
              }}
            >
              {zoneOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            <p className="font-body mt-space-xs text-body-sm text-on-surface-variant">
              Oyuncuların antrenman grupları, kadro filtreleri ve maç kadrosu dizilim hiyerarşisini
              belirler.
            </p>
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="description"
              className="font-label mb-1 block text-label-md text-on-surface-variant"
            >
              Açıklama & Taktik Rol
              <span className="font-kicker ml-space-sm text-kicker uppercase">
                Teknik Rapor Modülü
              </span>
            </label>
            <textarea
              id="description"
              rows={4}
              className={`${inputClass} resize-y`}
              value={draft.description}
              onChange={(event) => {
                onChange('description', event.target.value)
              }}
            />
            <p className="font-body mt-space-xs flex items-start gap-1 text-body-sm text-on-surface-variant">
              <span className="material-symbols-outlined mt-0.5 text-[16px]">help</span>
              Taktik tahtasında oyuncu kartlarının altında rol tanımı olarak sunulur.
            </p>
          </div>
        </div>
      </section>

      <section className="flex items-start justify-between gap-space-md border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div>
          <h2 className="font-headline text-headline-sm font-bold text-primary uppercase">
            Durum / Kullanılabilirlik
          </h2>
          <p className="font-body mt-space-xs text-body-sm text-on-surface-variant">
            {draft.isActive
              ? 'Aktif - Kadro oluştururken ve oyuncu eklerken seçilebilir.'
              : 'Pasif - Kadro ve oyuncu formlarında seçilemez.'}
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={draft.isActive}
          onClick={() => {
            onChange('isActive', !draft.isActive)
          }}
          className={`relative h-7 w-12 shrink-0 transition-colors ${
            draft.isActive ? 'bg-primary' : 'bg-outline-variant'
          }`}
        >
          <span
            className={`absolute top-0.5 h-6 w-6 bg-surface-container-lowest transition-transform ${
              draft.isActive ? 'left-5' : 'left-0.5'
            }`}
          />
        </button>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-low p-space-md">
        <div className="flex gap-space-sm">
          <span className="material-symbols-outlined text-secondary">verified_user</span>
          <div>
            <h2 className="font-label text-label-md font-bold text-on-surface uppercase">
              Federasyon Standart Uyumluluğu
            </h2>
            <p className="font-body mt-1 text-body-sm text-on-surface-variant">
              {draft.federationNote}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
