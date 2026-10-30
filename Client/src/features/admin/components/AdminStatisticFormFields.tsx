import type { ReactNode } from 'react'
import type {
  AdminStatisticFormDraft,
  AdminStatisticPlayerOption,
  AdminStatisticSeasonOption,
} from '../utils/adminStatisticTypes'

type AdminStatisticFormFieldsProps = {
  draft: AdminStatisticFormDraft
  players: AdminStatisticPlayerOption[]
  seasons: AdminStatisticSeasonOption[]
  mode: 'create' | 'edit'
  onChange: <K extends keyof AdminStatisticFormDraft>(
    key: K,
    value: AdminStatisticFormDraft[K],
  ) => void
}

function SectionHeading({
  section,
  title,
}: {
  section: string
  title: string
}) {
  return (
    <div className="mb-space-md flex flex-wrap items-center justify-between gap-space-sm border-b border-outline-variant/40 pb-space-sm">
      <h2 className="font-headline text-headline-sm font-bold text-primary uppercase">{title}</h2>
      <span className="font-kicker text-kicker tracking-widest text-on-surface-variant uppercase">
        {section}
      </span>
    </div>
  )
}

function FieldLabel({
  children,
  required,
  htmlFor,
}: {
  children: ReactNode
  required?: boolean
  htmlFor?: string
}) {
  return (
    <label htmlFor={htmlFor} className="font-label mb-1 block text-label-md text-on-surface-variant">
      {children}
      {required ? <span className="text-error"> *</span> : null}
    </label>
  )
}

function formatDateParts(value?: string | null): { date: string; time: string | null } {
  if (!value) {
    return { date: '—', time: null }
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return { date: value, time: null }
  }

  return {
    date: date.toLocaleDateString('tr-TR'),
    time: date.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }),
  }
}

const inputClass =
  'font-body w-full border border-outline-variant/50 bg-surface px-space-md py-space-sm text-body-md text-on-surface outline-none focus:border-primary'

export function AdminStatisticFormFields({
  draft,
  players,
  seasons,
  mode,
  onChange,
}: AdminStatisticFormFieldsProps) {
  const created = formatDateParts(draft.createdDate)

  return (
    <div className="flex flex-col gap-space-md">
      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <SectionHeading section="Bölüm 01" title="Oyuncu ve Dönem" />
        <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
          <div className="md:col-span-2">
            <FieldLabel htmlFor="playerSelect" required>
              Oyuncu
            </FieldLabel>
            <select
              id="playerSelect"
              className={inputClass}
              value={draft.playerId > 0 ? String(draft.playerId) : ''}
              onChange={(event) => {
                onChange('playerId', Number(event.target.value) || 0)
              }}
            >
              <option value="">Oyuncu seçin</option>
              {players.map((player) => (
                <option key={player.id} value={player.id}>
                  {player.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <FieldLabel htmlFor="season" required>
              Sezon
            </FieldLabel>
            <select
              id="season"
              className={inputClass}
              value={draft.seasonId > 0 ? String(draft.seasonId) : ''}
              onChange={(event) => {
                onChange('seasonId', Number(event.target.value) || 0)
              }}
            >
              <option value="">Sezon seçin</option>
              {seasons.map((season) => (
                <option key={season.id} value={season.id}>
                  {season.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <FieldLabel htmlFor="team" required>
              Takım
            </FieldLabel>
            <input
              id="team"
              className={inputClass}
              value={draft.team}
              onChange={(event) => {
                onChange('team', event.target.value)
              }}
            />
          </div>
        </div>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <SectionHeading section="Bölüm 02" title="Müsabaka ve Süre" />
        <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
          <div>
            <FieldLabel htmlFor="matches" required>
              Maç Sayısı
            </FieldLabel>
            <input
              id="matches"
              type="number"
              min={0}
              className={inputClass}
              value={draft.matches}
              onChange={(event) => {
                onChange('matches', event.target.value)
              }}
            />
          </div>
          <div>
            <FieldLabel htmlFor="minutes" required>
              Oynanan Dakika
            </FieldLabel>
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
          </div>
        </div>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <SectionHeading section="Bölüm 03" title="Hücum ve Disiplin" />
        <div className="grid grid-cols-2 gap-space-md md:grid-cols-4">
          <div>
            <FieldLabel htmlFor="goals">Gol</FieldLabel>
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
          </div>
          <div>
            <FieldLabel htmlFor="assists">Asist</FieldLabel>
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
            <FieldLabel htmlFor="yellow">Sarı Kart</FieldLabel>
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
            <FieldLabel htmlFor="red">Kırmızı Kart</FieldLabel>
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
        <SectionHeading section="Bölüm 04" title="Savunma Metrikleri" />
        <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="cleanSheets">Golsüz Maç</FieldLabel>
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
          </div>
          <div>
            <FieldLabel htmlFor="conceded">Yenilen Gol</FieldLabel>
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
          </div>
        </div>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <SectionHeading section="Bölüm 05" title="Kayıt Bilgisi" />
        {mode === 'edit' ? (
          <div>
            <FieldLabel>Oluşturulma</FieldLabel>
            <div className="flex flex-col gap-space-sm border border-outline-variant/30 bg-surface-container-low px-space-md py-space-sm">
              <p className="font-label flex items-center gap-space-sm text-label-md text-on-surface">
                <span className="material-symbols-outlined text-[18px] text-secondary">
                  calendar_month
                </span>
                <span className="text-on-surface-variant">Tarih:</span>
                <span className="font-bold tabular-nums">{created.date}</span>
              </p>
              <p className="font-label flex items-center gap-space-sm text-label-md text-on-surface">
                <span className="material-symbols-outlined text-[18px] text-secondary">
                  schedule
                </span>
                <span className="text-on-surface-variant">Saat:</span>
                <span className="font-bold tabular-nums">{created.time ?? '—'}</span>
              </p>
            </div>
          </div>
        ) : (
          <p className="font-body text-body-sm text-on-surface-variant">
            Yeni istatistik kaydı seçilen oyuncu ve sezon için oluşturulur.
          </p>
        )}
      </section>
    </div>
  )
}
