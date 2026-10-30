import type { ReactNode } from 'react'
import type {
  AdminInjuryFormDraft,
  AdminInjuryPlayerOption,
  AdminInjurySeasonOption,
} from '../utils/adminInjuryTypes'

type AdminInjuryFormFieldsProps = {
  draft: AdminInjuryFormDraft
  players: AdminInjuryPlayerOption[]
  seasons: AdminInjurySeasonOption[]
  mode: 'create' | 'edit'
  onChange: <K extends keyof AdminInjuryFormDraft>(
    key: K,
    value: AdminInjuryFormDraft[K],
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

export function AdminInjuryFormFields({
  draft,
  players,
  seasons,
  mode,
  onChange,
}: AdminInjuryFormFieldsProps) {
  const created = formatDateParts(draft.createdDate)

  return (
    <div className="flex flex-col gap-space-md">
      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <SectionHeading section="Bölüm 01" title="Oyuncu ve Sezon" />
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

          <div className="md:col-span-2">
            <FieldLabel htmlFor="season">Sezon</FieldLabel>
            <select
              id="season"
              className={inputClass}
              value={draft.seasonId > 0 ? String(draft.seasonId) : ''}
              onChange={(event) => {
                onChange('seasonId', Number(event.target.value) || 0)
              }}
            >
              <option value="">Sezon seçilmedi</option>
              {seasons.map((season) => (
                <option key={season.id} value={season.id}>
                  {season.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <SectionHeading section="Bölüm 02" title="Sakatlık Bilgisi" />
        <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
          <div className="md:col-span-2">
            <FieldLabel htmlFor="diagnosis" required>
              Sakatlık Adı
            </FieldLabel>
            <input
              id="diagnosis"
              className={inputClass}
              maxLength={150}
              value={draft.name}
              onChange={(event) => {
                onChange('name', event.target.value)
              }}
            />
          </div>

          <div>
            <FieldLabel htmlFor="daysInjured" required>
              Sakatlık Günü
            </FieldLabel>
            <input
              id="daysInjured"
              type="number"
              min={0}
              className={inputClass}
              value={draft.daysInjured}
              onChange={(event) => {
                onChange('daysInjured', event.target.value)
              }}
            />
          </div>

          <div>
            <FieldLabel htmlFor="gamesMissed" required>
              Kaçırılan Maç
            </FieldLabel>
            <input
              id="gamesMissed"
              type="number"
              min={0}
              className={inputClass}
              value={draft.gamesMissed}
              onChange={(event) => {
                onChange('gamesMissed', event.target.value)
              }}
            />
          </div>
        </div>
      </section>

      {mode === 'edit' ? (
        <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
          <SectionHeading section="Bölüm 03" title="Kayıt Bilgisi" />
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
        </section>
      ) : null}
    </div>
  )
}
