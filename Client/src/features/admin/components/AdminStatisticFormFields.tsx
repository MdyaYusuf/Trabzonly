import type { AdminStatisticFormDraft } from '../utils/adminStatisticTypes'
import {
  adminStatisticPlayerOptions,
  adminStatisticSeasonOptions,
  adminStatisticTeamOptions,
} from '../utils/adminStatisticPlaceholders'

type AdminStatisticFormFieldsProps = {
  draft: AdminStatisticFormDraft
  onChange: <K extends keyof AdminStatisticFormDraft>(
    key: K,
    value: AdminStatisticFormDraft[K],
  ) => void
}

const inputClass =
  'font-body w-full border border-outline-variant/50 bg-surface px-space-md py-space-sm text-body-md text-on-surface outline-none focus:border-primary'

export function AdminStatisticFormFields({ draft, onChange }: AdminStatisticFormFieldsProps) {
  return (
    <div className="flex flex-col gap-space-md">
      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md border-b border-outline-variant/40 pb-space-sm">
          <h2 className="font-headline flex items-center gap-space-xs text-headline-sm font-bold text-primary uppercase">
            <span className="material-symbols-outlined text-[22px]">badge</span>
            Temel Oyuncu ve Dönem Bilgileri
          </h2>
          <p className="font-body mt-1 text-body-sm text-on-surface-variant">
            Müsabakanın bağlı olduğu resmi profil ve turnuva kayıtları
          </p>
        </div>

        <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
          <div className="md:col-span-2">
            <div className="mb-1 flex flex-wrap items-center gap-space-sm">
              <label
                htmlFor="playerSelect"
                className="font-label text-label-md text-on-surface-variant"
              >
                Oyuncu Seçimi <span className="text-error">*</span>
              </label>
              <span className="font-kicker bg-secondary-container px-space-xs py-0.5 text-kicker text-on-secondary-container uppercase">
                Kadro Verisinden Aktif
              </span>
            </div>
            <select
              id="playerSelect"
              className={inputClass}
              value={draft.playerId}
              onChange={(event) => {
                const selected = adminStatisticPlayerOptions.find(
                  (player) => player.id === event.target.value,
                )
                onChange('playerId', event.target.value)
                if (selected) {
                  onChange('playerName', selected.name)
                  onChange('playerNumber', selected.number)
                  onChange('playerPosition', selected.position)
                  onChange('initials', selected.name.split(' ').map((part) => part[0]).join('').slice(0, 2))
                }
              }}
            >
              {adminStatisticPlayerOptions.map((player) => (
                <option key={player.id} value={player.id}>
                  {player.name} #{player.number} — {player.position}
                </option>
              ))}
            </select>
            <p className="font-body mt-space-xs text-body-sm text-on-surface-variant">
              Kadroda kayıtlı aktif futbolculardan seçin.
            </p>
          </div>

          <div>
            <label htmlFor="season" className="font-label mb-1 block text-label-md text-on-surface-variant">
              Sezon <span className="text-error">*</span>
            </label>
            <select
              id="season"
              className={inputClass}
              value={draft.season}
              onChange={(event) => {
                onChange('season', event.target.value)
              }}
            >
              {adminStatisticSeasonOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="team" className="font-label mb-1 block text-label-md text-on-surface-variant">
              Takım / Kadro <span className="text-error">*</span>
            </label>
            <select
              id="team"
              className={inputClass}
              value={draft.team}
              onChange={(event) => {
                onChange('team', event.target.value)
              }}
            >
              {adminStatisticTeamOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md border-b border-outline-variant/40 pb-space-sm">
          <h2 className="font-headline flex items-center gap-space-xs text-headline-sm font-bold text-primary uppercase">
            <span className="material-symbols-outlined text-[22px]">timer</span>
            Müsabaka ve Süre Metrikleri
          </h2>
          <p className="font-body mt-1 text-body-sm text-on-surface-variant">
            Sahada yer alma hacmi ve resmi katılım süresi
          </p>
        </div>
        <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
          <div>
            <label htmlFor="matches" className="font-label mb-1 block text-label-md text-on-surface-variant">
              Maç Sayısı <span className="text-error">*</span>
            </label>
            <input
              id="matches"
              type="number"
              min={0}
              max={60}
              className={inputClass}
              value={draft.matches}
              onChange={(event) => {
                onChange('matches', event.target.value)
              }}
            />
            <p className="font-body mt-space-xs text-body-sm text-on-surface-variant">
              Zorunlu alan (min: 0, max: 60)
            </p>
          </div>
          <div>
            <label htmlFor="minutes" className="font-label mb-1 block text-label-md text-on-surface-variant">
              Oynanan Dakika <span className="text-error">*</span>
            </label>
            <input
              id="minutes"
              type="number"
              min={0}
              className={inputClass}
              value={draft.minutes}
              onChange={(event) => {
                onChange('minutes', event.target.value)
              }}
            />
            <p className="font-body mt-space-xs text-body-sm text-on-surface-variant">
              Toplam süre dakika cinsinden
            </p>
          </div>
        </div>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md border-b border-outline-variant/40 pb-space-sm">
          <h2 className="font-headline flex items-center gap-space-xs text-headline-sm font-bold text-primary uppercase">
            <span className="material-symbols-outlined text-[22px]">sports_soccer</span>
            Hücum ve Disiplin İstatistikleri
          </h2>
          <p className="font-body mt-1 text-body-sm text-on-surface-variant">
            Skor katkısı ve resmi hakem kart sicili
          </p>
        </div>
        <div className="grid grid-cols-2 gap-space-md md:grid-cols-4">
          <div>
            <label htmlFor="goals" className="font-label mb-1 block text-label-md text-on-surface-variant">
              Gol
            </label>
            <input
              id="goals"
              type="number"
              min={0}
              className={inputClass}
              value={draft.goals}
              onChange={(event) => {
                onChange('goals', event.target.value)
              }}
            />
            <p className="font-kicker mt-1 text-kicker text-on-surface-variant uppercase">
              {draft.goalsBreakdown}
            </p>
          </div>
          <div>
            <label htmlFor="assists" className="font-label mb-1 block text-label-md text-on-surface-variant">
              Asist
            </label>
            <input
              id="assists"
              type="number"
              min={0}
              className={inputClass}
              value={draft.assists}
              onChange={(event) => {
                onChange('assists', event.target.value)
              }}
            />
          </div>
          <div>
            <label htmlFor="yellow" className="font-label mb-1 block text-label-md text-on-surface-variant">
              Sarı Kart
            </label>
            <input
              id="yellow"
              type="number"
              min={0}
              className={inputClass}
              value={draft.yellowCards}
              onChange={(event) => {
                onChange('yellowCards', event.target.value)
              }}
            />
          </div>
          <div>
            <label htmlFor="red" className="font-label mb-1 block text-label-md text-on-surface-variant">
              Kırmızı Kart
            </label>
            <input
              id="red"
              type="number"
              min={0}
              className={inputClass}
              value={draft.redCards}
              onChange={(event) => {
                onChange('redCards', event.target.value)
              }}
            />
          </div>
        </div>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex flex-wrap items-center justify-between gap-space-sm border-b border-outline-variant/40 pb-space-sm">
          <div>
            <h2 className="font-headline flex items-center gap-space-xs text-headline-sm font-bold text-primary uppercase">
              <span className="material-symbols-outlined text-[22px]">shield</span>
              Savunma ve Kaleci Metrikleri
            </h2>
            <p className="font-body mt-1 text-body-sm text-on-surface-variant">
              Defansif ve file bekçisi istatistik havuzu
            </p>
          </div>
          <span className="font-kicker bg-surface-container-high px-space-sm py-1 text-kicker text-on-surface-variant uppercase">
            Özel Durumlar
          </span>
        </div>
        <div className="grid grid-cols-1 gap-space-md sm:grid-cols-3">
          <div>
            <label htmlFor="cleanSheets" className="font-label mb-1 block text-label-md text-on-surface-variant">
              Clean Sheet
            </label>
            <input
              id="cleanSheets"
              type="number"
              min={0}
              className={inputClass}
              value={draft.cleanSheets}
              onChange={(event) => {
                onChange('cleanSheets', event.target.value)
              }}
            />
            <p className="font-body mt-1 text-body-sm text-on-surface-variant">
              Kaleci ve savunma maçları
            </p>
          </div>
          <div>
            <label htmlFor="saves" className="font-label mb-1 block text-label-md text-on-surface-variant">
              Kurtarış
            </label>
            <input
              id="saves"
              type="number"
              min={0}
              className={inputClass}
              value={draft.saves}
              onChange={(event) => {
                onChange('saves', event.target.value)
              }}
            />
            <p className="font-body mt-1 text-body-sm text-on-surface-variant">
              Toplam başarılı kurtarış
            </p>
          </div>
          <div>
            <label htmlFor="conceded" className="font-label mb-1 block text-label-md text-on-surface-variant">
              Yediği Gol
            </label>
            <input
              id="conceded"
              type="number"
              min={0}
              className={inputClass}
              value={draft.goalsConceded}
              onChange={(event) => {
                onChange('goalsConceded', event.target.value)
              }}
            />
            <p className="font-body mt-1 text-body-sm text-on-surface-variant">Aleyhte gol adedi</p>
          </div>
        </div>
        <p className="font-body mt-space-md flex items-start gap-1 bg-secondary-fixed/40 px-space-md py-space-sm text-body-sm text-on-surface-variant">
          <span className="material-symbols-outlined text-[16px] text-secondary">info</span>
          Mevki hücum/orta saha olduğunda bu alanlar opsiyoneldir ve genel istatistik tablosunda
          tire (-) olarak işlenir.
        </p>
      </section>
    </div>
  )
}
