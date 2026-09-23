import type { AdminSeasonFormDraft } from '../utils/adminSeasonTypes'

type AdminSeasonFormFieldsProps = {
  draft: AdminSeasonFormDraft
  onChange: <K extends keyof AdminSeasonFormDraft>(
    key: K,
    value: AdminSeasonFormDraft[K],
  ) => void
}

const inputClass =
  'font-body w-full border border-outline-variant/50 bg-surface px-space-md py-space-sm text-body-md text-on-surface outline-none focus:border-primary'

export function AdminSeasonFormFields({ draft, onChange }: AdminSeasonFormFieldsProps) {
  return (
    <div className="flex flex-col gap-space-md">
      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex flex-wrap items-center justify-between gap-space-sm border-b border-outline-variant/40 pb-space-sm">
          <h2 className="font-headline flex items-center gap-space-xs text-headline-sm font-bold text-primary uppercase">
            <span className="material-symbols-outlined text-[22px]">calendar_today</span>
            Temel Sezon Tanımı
          </h2>
          <span className="font-kicker text-kicker tracking-widest text-on-surface-variant uppercase">
            Zorunlu Alanlar (*)
          </span>
        </div>

        <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
          <div className="md:col-span-2">
            <label
              htmlFor="seasonName"
              className="font-label mb-1 block text-label-md text-on-surface-variant"
            >
              Sezon Adı <span className="text-error">*</span>
              <span className="font-kicker ml-space-sm text-kicker uppercase">Benzersiz Etiket</span>
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-on-surface-variant">
                tag
              </span>
              <input
                id="seasonName"
                className={`${inputClass} pl-10`}
                value={draft.name}
                onChange={(event) => {
                  onChange('name', event.target.value)
                }}
                placeholder="2026/27"
              />
            </div>
            <p className="font-body mt-space-xs flex items-start gap-1 text-body-sm text-on-surface-variant">
              <span className="material-symbols-outlined mt-0.5 text-[16px]">info</span>
              Resmi lig ve kupa takvimine uygun formatta giriniz (YYYY/YY).
            </p>
          </div>

          <div>
            <label
              htmlFor="startDate"
              className="font-label mb-1 block text-label-md text-on-surface-variant"
            >
              Başlangıç Tarihi <span className="text-error">*</span>
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-on-surface-variant">
                calendar_month
              </span>
              <input
                id="startDate"
                type="date"
                className={`${inputClass} pl-10`}
                value={draft.startDate}
                onChange={(event) => {
                  onChange('startDate', event.target.value)
                }}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="endDate"
              className="font-label mb-1 block text-label-md text-on-surface-variant"
            >
              Bitiş Tarihi <span className="text-error">*</span>
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-on-surface-variant">
                event_available
              </span>
              <input
                id="endDate"
                type="date"
                className={`${inputClass} pl-10`}
                value={draft.endDate}
                onChange={(event) => {
                  onChange('endDate', event.target.value)
                }}
              />
            </div>
          </div>

          <p className="font-body md:col-span-2 flex items-start gap-1 text-body-sm text-on-surface-variant">
            <span className="material-symbols-outlined mt-0.5 text-[16px]">date_range</span>
            Tarih aralığı lisans geçerliliklerini ve dönemsel istatistik filtrelerini belirler.
          </p>
        </div>
      </section>

      <section className="flex items-start justify-between gap-space-md border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div>
          <h2 className="font-headline text-headline-sm font-bold text-primary uppercase">
            Dönem Statüsü / Aktif Sezon
          </h2>
          <p className="font-body mt-space-xs text-body-sm text-on-surface-variant">
            Bu sezon sitedeki varsayılan canlı sezon olarak belirlensin (Aktif).
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

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <label
          htmlFor="description"
          className="font-label mb-1 block text-label-md text-on-surface-variant"
        >
          Sezon Açıklaması & Hedefler
          <span className="font-kicker ml-space-sm text-kicker uppercase">Editöryal Not</span>
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
      </section>

      <section className="border border-outline-variant/40 bg-secondary-fixed/40 p-space-md">
        <div className="flex gap-space-sm">
          <span className="material-symbols-outlined text-secondary">sync_alt</span>
          <div>
            <h2 className="font-label text-label-md font-bold text-on-surface uppercase">
              Federasyon ve Fikstür Senkronizasyonu
            </h2>
            <p className="font-body mt-1 text-body-sm text-on-surface-variant">
              TFF takvimindeki resmi erteleme ve devre arası tarihleri sistem tarafından otomatik
              algılanır. Manuel güncelleme gerektirmeyen veri akışı aktiftir.
            </p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-gutter sm:grid-cols-3">
        <article className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
          <span className="font-kicker text-kicker text-on-surface-variant uppercase">
            Lig Derecesi Tahmini
          </span>
          <p className="font-headline mt-space-sm text-headline-sm font-bold text-primary">
            {draft.leagueRankLabel}
          </p>
          <p className="font-body mt-1 text-body-sm text-on-surface-variant">
            {draft.leagueRankNote}
          </p>
        </article>
        <article className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
          <span className="font-kicker text-kicker text-on-surface-variant uppercase">
            Kadro Doluluk
          </span>
          <p className="font-headline mt-space-sm text-headline-sm font-bold text-primary">
            {draft.squadFillLabel}
          </p>
          <p className="font-body mt-1 text-body-sm text-on-surface-variant">
            {draft.squadFillNote}
          </p>
        </article>
        <article className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
          <span className="font-kicker text-kicker text-on-surface-variant uppercase">
            Resmi Maç Takvimi
          </span>
          <p className="font-headline mt-space-sm text-headline-sm font-bold text-primary">
            {draft.scheduleLabel}
          </p>
          <p className="font-body mt-1 text-body-sm text-on-surface-variant">
            {draft.scheduleNote}
          </p>
        </article>
      </div>
    </div>
  )
}
