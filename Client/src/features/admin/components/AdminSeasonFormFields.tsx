import type { ReactNode } from 'react'
import type { AdminSeasonFormDraft } from '../utils/adminSeasonTypes'

type AdminSeasonFormFieldsProps = {
  draft: AdminSeasonFormDraft
  mode: 'create' | 'edit'
  isActiveToggleLocked: boolean
  onChange: <K extends keyof AdminSeasonFormDraft>(
    key: K,
    value: AdminSeasonFormDraft[K],
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

export function AdminSeasonFormFields({
  draft,
  mode,
  isActiveToggleLocked,
  onChange,
}: AdminSeasonFormFieldsProps) {
  const created = formatDateParts(draft.createdDate)
  const updated = formatDateParts(draft.updatedDate)

  return (
    <div className="flex flex-col gap-space-md">
      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <SectionHeading section="Bölüm 01" title="Temel Sezon Tanımı" />
        <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
          <div className="md:col-span-2">
            <FieldLabel htmlFor="seasonName" required>
              Sezon Adı
            </FieldLabel>
            <input
              id="seasonName"
              className={inputClass}
              maxLength={20}
              value={draft.name}
              onChange={(event) => {
                onChange('name', event.target.value)
              }}
              placeholder="2024/25"
            />
          </div>

          <div>
            <FieldLabel htmlFor="startDate" required>
              Başlangıç Tarihi
            </FieldLabel>
            <input
              id="startDate"
              type="date"
              className={inputClass}
              value={draft.startDate}
              onChange={(event) => {
                onChange('startDate', event.target.value)
              }}
            />
          </div>

          <div>
            <FieldLabel htmlFor="endDate" required>
              Bitiş Tarihi
            </FieldLabel>
            <input
              id="endDate"
              type="date"
              className={inputClass}
              value={draft.endDate}
              onChange={(event) => {
                onChange('endDate', event.target.value)
              }}
            />
          </div>
        </div>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <SectionHeading section="Bölüm 02" title="Durum" />
        <div className="flex items-start justify-between gap-space-md border border-outline-variant/30 bg-surface-container-low px-space-md py-space-sm">
          <div>
            <p className="font-label text-label-md font-bold text-on-surface uppercase">
              Aktif Sezon
            </p>
            <p className="font-body mt-1 text-body-sm text-on-surface-variant">
              {isActiveToggleLocked
                ? mode === 'create'
                  ? 'İlk sezon otomatik olarak aktif oluşturulur.'
                  : 'En az bir aktif sezon olmalıdır. Pasife almak için önce başka bir sezonu aktif yapın.'
                : 'Bu sezonu sistemdeki tek aktif sezon yap. Aktifleştirildiğinde diğer aktif sezonlar pasife alınır.'}
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={draft.isActive}
            disabled={isActiveToggleLocked}
            onClick={() => {
              if (isActiveToggleLocked) {
                return
              }

              onChange('isActive', !draft.isActive)
            }}
            className={`relative h-7 w-12 shrink-0 transition-colors ${
              draft.isActive ? 'bg-primary' : 'bg-outline-variant'
            } ${isActiveToggleLocked ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
          >
            <span
              className={`absolute top-0.5 h-6 w-6 bg-surface-container-lowest transition-transform ${
                draft.isActive ? 'left-5' : 'left-0.5'
              }`}
            />
          </button>
        </div>
      </section>

      {mode === 'edit' ? (
        <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
          <SectionHeading section="Bölüm 03" title="Kayıt Bilgisi" />
          <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
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
            <div>
              <FieldLabel>Son Güncelleme</FieldLabel>
              <div className="flex flex-col gap-space-sm border border-outline-variant/30 bg-surface-container-low px-space-md py-space-sm">
                <p className="font-label flex items-center gap-space-sm text-label-md text-on-surface">
                  <span className="material-symbols-outlined text-[18px] text-secondary">
                    calendar_month
                  </span>
                  <span className="text-on-surface-variant">Tarih:</span>
                  <span className="font-bold tabular-nums">{updated.date}</span>
                </p>
                <p className="font-label flex items-center gap-space-sm text-label-md text-on-surface">
                  <span className="material-symbols-outlined text-[18px] text-secondary">
                    schedule
                  </span>
                  <span className="text-on-surface-variant">Saat:</span>
                  <span className="font-bold tabular-nums">{updated.time ?? '—'}</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  )
}
