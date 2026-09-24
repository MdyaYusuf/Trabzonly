import type { AdminInjuryFormDraft, AdminInjuryStage } from '../utils/adminInjuryTypes'
import { adminInjuryPlayerOptions } from '../utils/adminInjuryPlaceholders'

type AdminInjuryFormFieldsProps = {
  draft: AdminInjuryFormDraft
  onChange: <K extends keyof AdminInjuryFormDraft>(
    key: K,
    value: AdminInjuryFormDraft[K],
  ) => void
}

const inputClass =
  'font-body w-full border border-outline-variant/50 bg-surface px-space-md py-space-sm text-body-md text-on-surface outline-none focus:border-primary'

const stages: Array<{ id: AdminInjuryStage; title: string; subtitle: string }> = [
  { id: 'rest', title: 'İstirahat / Klinik', subtitle: 'Evre 1' },
  { id: 'individual', title: 'Bireysel Saha (Aktif)', subtitle: 'Evre 2 • Düz Koşu' },
  { id: 'warmup', title: 'Takımla Isınma', subtitle: 'Evre 3 • Temassız' },
  { id: 'ready', title: 'Müsabakaya Hazır', subtitle: 'Evre 4 • Kadroya Açık' },
]

export function AdminInjuryFormFields({ draft, onChange }: AdminInjuryFormFieldsProps) {
  const noteLength = draft.doctorNote.length

  return (
    <div className="flex flex-col gap-space-md">
      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex flex-wrap items-center justify-between gap-space-sm border-b border-outline-variant/40 pb-space-sm">
          <div>
            <p className="font-kicker text-kicker text-on-surface-variant uppercase">Kod: SEC-01</p>
            <h2 className="font-headline text-headline-sm font-bold text-primary uppercase">
              Temel Oyuncu & Müsabaka Bilgileri
            </h2>
          </div>
          <span className="font-kicker bg-error-container px-space-sm py-1 text-kicker text-on-error-container uppercase">
            Zorunlu Protokol
          </span>
        </div>

        <div className="flex flex-col gap-space-md">
          <div>
            <div className="mb-1 flex flex-wrap items-center gap-space-sm">
              <label className="font-label text-label-md text-on-surface-variant">
                Seçili Lisanslı Oyuncu <span className="text-error">*</span>
              </label>
              <span className="font-kicker bg-secondary-container px-space-xs py-0.5 text-kicker text-on-secondary-container uppercase">
                Kadro Sicili Doğrulandı
              </span>
            </div>
            <div className="flex flex-col gap-space-sm border border-outline-variant/40 bg-surface-container-low p-space-md sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-space-sm">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-on-primary ${draft.avatarTone}`}
                >
                  {draft.initials}
                </div>
                <div>
                  <p className="font-label text-label-md font-bold text-on-surface">
                    {draft.playerName}{' '}
                    <span className="text-on-surface-variant">#{draft.playerNumber}</span>
                  </p>
                  <p className="font-kicker text-kicker text-on-surface-variant uppercase">
                    {draft.playerNationality}
                  </p>
                  <p className="font-body text-body-sm text-on-surface-variant">
                    Mevki: {draft.playerPosition} • {draft.contractLabel}
                  </p>
                </div>
              </div>
              <select
                className={`${inputClass} sm:max-w-[220px]`}
                value={draft.playerId}
                onChange={(event) => {
                  const selected = adminInjuryPlayerOptions.find(
                    (player) => player.id === event.target.value,
                  )
                  onChange('playerId', event.target.value)
                  if (selected) {
                    onChange('playerName', selected.name)
                    onChange('playerNumber', selected.number)
                    onChange(
                      'initials',
                      selected.name
                        .split(' ')
                        .map((part) => part[0])
                        .join('')
                        .slice(0, 2),
                    )
                  }
                }}
                aria-label="Oyuncu değiştir"
              >
                {adminInjuryPlayerOptions.map((player) => (
                  <option key={player.id} value={player.id}>
                    {player.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
            <div>
              <label htmlFor="season" className="font-label mb-1 block text-label-md text-on-surface-variant">
                Sezon Bilgisi <span className="font-body text-body-sm">(Opsiyonel)</span>
              </label>
              <select
                id="season"
                className={inputClass}
                value={draft.season}
                onChange={(event) => {
                  onChange('season', event.target.value)
                }}
              >
                <option value="2024-2025">2024/25 Sezonu (Aktif)</option>
                <option value="2023-2024">2023/24 Sezonu</option>
                <option value="2022-2023">2022/23 Sezonu</option>
              </select>
              <p className="font-body mt-space-xs text-body-sm text-on-surface-variant">
                Boş bırakılırsa sistemdeki aktif sezona otomatik bağlanır.
              </p>
            </div>
            <div>
              <label
                htmlFor="category"
                className="font-label mb-1 block text-label-md text-on-surface-variant"
              >
                Teşhis Kategori & Alanı <span className="text-error">*</span>
              </label>
              <select
                id="category"
                className={inputClass}
                value={draft.category}
                onChange={(event) => {
                  onChange('category', event.target.value as AdminInjuryFormDraft['category'])
                }}
              >
                <option value="muscle">Kas & Adale Yaralanması</option>
                <option value="ligament">Eklem & Bağ Lezyonları</option>
                <option value="fracture">Kemik & Kırık Travması</option>
                <option value="post-op">Post-Operatif / Cerrahi Rehabilitasyon</option>
                <option value="other">Diğer Tıbbi Sebepler</option>
              </select>
              <p className="font-body mt-space-xs text-body-sm text-on-surface-variant">
                TFF Sağlık Kurulu yaralanma kodu:{' '}
                <strong className="text-primary">{draft.tffCode}</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md border-b border-outline-variant/40 pb-space-sm">
          <p className="font-kicker text-kicker text-on-surface-variant uppercase">Kod: SEC-02</p>
          <h2 className="font-headline text-headline-sm font-bold text-primary uppercase">
            Tıbbi Teşhis ve Detaylar
          </h2>
          <p className="font-body mt-1 text-body-sm text-on-surface-variant">Klinik Bulgular</p>
        </div>
        <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
          <div className="md:col-span-2">
            <label
              htmlFor="diagnosis"
              className="font-label mb-1 block text-label-md text-on-surface-variant"
            >
              Sakatlık Tanısı / Adı <span className="text-error">*</span>
            </label>
            <input
              id="diagnosis"
              className={inputClass}
              value={draft.diagnosis}
              onChange={(event) => {
                onChange('diagnosis', event.target.value)
                onChange('previewDiagnosis', event.target.value)
              }}
            />
            <p className="font-body mt-space-xs text-body-sm text-on-surface-variant">
              Resmi bültenlerde ve kamuoyu açıklamasında görünecek medikal tanı başlığıdır.
            </p>
          </div>
          <div>
            <label
              htmlFor="diagnosisDate"
              className="font-label mb-1 block text-label-md text-on-surface-variant"
            >
              Teşhis Tarihi / Başlangıç <span className="text-error">*</span>
            </label>
            <input
              id="diagnosisDate"
              type="date"
              className={inputClass}
              value={draft.diagnosisDate}
              onChange={(event) => {
                onChange('diagnosisDate', event.target.value)
              }}
            />
            <p className="font-body mt-space-xs text-body-sm text-on-surface-variant">
              Sakatlanmanın gerçekleştiği müsabaka / antrenman tarihi.
            </p>
          </div>
          <div>
            <label
              htmlFor="returnDate"
              className="font-label mb-1 block text-label-md text-on-surface-variant"
            >
              Tahmini Sahalara Dönüş Tarihi
            </label>
            <input
              id="returnDate"
              type="date"
              className={inputClass}
              value={draft.expectedReturnDate}
              onChange={(event) => {
                onChange('expectedReturnDate', event.target.value)
              }}
            />
            <p className="font-body mt-space-xs text-body-sm text-on-surface-variant">
              {draft.expectedReturnNote}
            </p>
          </div>
        </div>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md border-b border-outline-variant/40 pb-space-sm">
          <p className="font-kicker text-kicker text-on-surface-variant uppercase">Kod: SEC-03</p>
          <h2 className="font-headline text-headline-sm font-bold text-primary uppercase">
            Süreç ve Müsabaka Etkisi
          </h2>
          <p className="font-body mt-1 text-body-sm text-on-surface-variant">Metrikler</p>
        </div>
        <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
          <div>
            <label
              htmlFor="totalDays"
              className="font-label mb-1 block text-label-md text-on-surface-variant"
            >
              Toplam Sakatlık Günü
            </label>
            <div className="relative">
              <input
                id="totalDays"
                type="number"
                min={0}
                className={`${inputClass} font-headline text-headline-sm font-bold pr-14`}
                value={draft.totalDays}
                onChange={(event) => {
                  onChange('totalDays', event.target.value)
                  onChange('daysInjuredLabel', `${event.target.value || '0'} GÜNDÜR SAKAT`)
                }}
              />
              <span className="font-kicker absolute top-1/2 right-3 -translate-y-1/2 text-kicker text-on-surface-variant uppercase">
                Gün
              </span>
            </div>
            <p className="font-body mt-space-xs text-body-sm text-on-surface-variant">
              18 Eylül 2024 tarihinden itibaren hesaplanan net süre.
            </p>
          </div>
          <div>
            <label
              htmlFor="missedMatches"
              className="font-label mb-1 block text-label-md text-on-surface-variant"
            >
              Kaçırılan Resmi Maç
            </label>
            <div className="relative">
              <input
                id="missedMatches"
                type="number"
                min={0}
                className={`${inputClass} font-headline text-headline-sm font-bold pr-14`}
                value={draft.missedMatches}
                onChange={(event) => {
                  onChange('missedMatches', event.target.value)
                }}
              />
              <span className="font-kicker absolute top-1/2 right-3 -translate-y-1/2 text-kicker text-on-surface-variant uppercase">
                Maç
              </span>
            </div>
            <p className="font-body mt-space-xs text-body-sm text-on-surface-variant">
              Süper Lig + ZTK resmi müsabaka adedi.
            </p>
          </div>
        </div>

        <div className="mt-space-md">
          <p className="font-label mb-space-sm text-label-md text-on-surface-variant">
            Tedavi ve İyileşme Evresi
          </p>
          <div className="grid grid-cols-1 gap-space-sm sm:grid-cols-2">
            {stages.map((stage) => {
              const isActive = draft.stage === stage.id

              return (
                <label
                  key={stage.id}
                  className={`flex cursor-pointer items-start gap-space-sm border px-space-md py-space-sm transition-colors ${
                    isActive
                      ? 'border-secondary bg-secondary-fixed/30'
                      : 'border-outline-variant/40 hover:border-primary'
                  }`}
                >
                  <input
                    type="radio"
                    name="injury_stage"
                    className="mt-1 accent-primary"
                    checked={isActive}
                    onChange={() => {
                      onChange('stage', stage.id)
                      onChange('currentStatusLabel', stage.title)
                    }}
                  />
                  <span>
                    <span className="font-label block text-label-md font-bold text-on-surface">
                      {stage.title}
                    </span>
                    <span className="font-kicker text-kicker text-on-surface-variant uppercase">
                      {stage.subtitle}
                    </span>
                  </span>
                </label>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex flex-wrap items-center justify-between gap-space-sm border-b border-outline-variant/40 pb-space-sm">
          <div>
            <p className="font-kicker text-kicker text-on-surface-variant uppercase">Kod: SEC-04</p>
            <h2 className="font-headline text-headline-sm font-bold text-primary uppercase">
              Kulüp Sağlık Kurulu Notu & Doktor Açıklaması
            </h2>
          </div>
          <span className="font-kicker bg-surface-container-high px-space-sm py-1 text-kicker text-on-surface-variant uppercase">
            Gizli & Resmi
          </span>
        </div>
        <label
          htmlFor="doctorNote"
          className="font-label mb-1 block text-label-md text-on-surface-variant"
        >
          Detaylı Klinik Raporu ve Antrenman Kısıtlamaları
        </label>
        <textarea
          id="doctorNote"
          rows={4}
          maxLength={1000}
          className={`${inputClass} leading-relaxed`}
          value={draft.doctorNote}
          onChange={(event) => {
            onChange('doctorNote', event.target.value)
          }}
        />
        <div className="mt-space-sm flex flex-wrap items-center justify-between gap-space-sm">
          <p className="font-body text-body-sm text-on-surface-variant">
            Karakter: {noteLength} / 1000
          </p>
          <label className="font-label flex items-center gap-space-sm text-label-md text-on-surface">
            <input
              type="checkbox"
              className="accent-primary"
              checked={draft.pressTransferable}
              onChange={(event) => {
                onChange('pressTransferable', event.target.checked)
              }}
            />
            Resmi Basın Bültenine Aktarılabilir
          </label>
        </div>
      </section>
    </div>
  )
}
