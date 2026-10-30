import type { ReactNode } from 'react'
import type { PositionResponseDto } from '@/features/positions/positionTypes'
import type { AdminPlayerFormDraft, AdminPlayerPreferredFoot } from '../utils/adminPlayerTypes'

type AdminPlayerFormFieldsProps = {
  draft: AdminPlayerFormDraft
  positions: PositionResponseDto[]
  mode: 'create' | 'edit'
  onChange: <K extends keyof AdminPlayerFormDraft>(
    key: K,
    value: AdminPlayerFormDraft[K],
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

const FOOT_OPTIONS: Array<{ id: AdminPlayerPreferredFoot; label: string }> = [
  { id: 'Right', label: 'Sağ' },
  { id: 'Left', label: 'Sol' },
  { id: 'Both', label: 'Her İkisi' },
]

export function AdminPlayerFormFields({
  draft,
  positions,
  mode,
  onChange,
}: AdminPlayerFormFieldsProps) {
  const profileLength = draft.description.length
  const showActiveToggle = mode === 'edit'
  const statusClass = draft.isActive
    ? 'bg-secondary-container/50 text-on-secondary-container'
    : 'bg-error-container text-on-error-container'
  const created = formatDateParts(draft.createdDate)
  const updated = formatDateParts(draft.updatedDate)

  return (
    <div className="flex flex-col gap-space-md">
      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <SectionHeading section="Bölüm 01" title="Temel Bilgiler" />
        <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
          <div>
            <FieldLabel htmlFor="name" required>
              Ad Soyad
            </FieldLabel>
            <input
              id="name"
              className={inputClass}
              value={draft.name}
              onChange={(event) => {
                onChange('name', event.target.value)
              }}
            />
          </div>
          <div>
            <FieldLabel htmlFor="shirtNumber">Forma Numarası</FieldLabel>
            <input
              id="shirtNumber"
              inputMode="numeric"
              className={inputClass}
              value={draft.shirtNumber}
              onChange={(event) => {
                onChange('shirtNumber', event.target.value)
              }}
            />
          </div>
          <div>
            <FieldLabel htmlFor="dateOfBirth" required>
              Doğum Tarihi
            </FieldLabel>
            <input
              id="dateOfBirth"
              type="date"
              className={inputClass}
              value={draft.dateOfBirth}
              onChange={(event) => {
                onChange('dateOfBirth', event.target.value)
              }}
            />
          </div>
          <div>
            <FieldLabel htmlFor="nationality" required>
              Uyruk / Milliyet
            </FieldLabel>
            <input
              id="nationality"
              className={inputClass}
              value={draft.nationality}
              onChange={(event) => {
                onChange('nationality', event.target.value)
              }}
              placeholder="Örn. Türkiye"
            />
          </div>
          <div className="md:col-span-2">
            <FieldLabel>Tercih Edilen Ayak</FieldLabel>
            <div className="flex flex-wrap gap-1">
              {FOOT_OPTIONS.map((foot) => {
                const isActive = draft.preferredFoot === foot.id

                return (
                  <button
                    key={foot.id}
                    type="button"
                    onClick={() => {
                      onChange('preferredFoot', foot.id)
                    }}
                    className={`font-label cursor-pointer px-space-md py-space-sm text-label-md uppercase transition-colors ${
                      isActive
                        ? 'bg-primary text-on-primary'
                        : 'border border-outline-variant/50 text-on-surface-variant hover:border-primary'
                    }`}
                  >
                    {foot.label}
                  </button>
                )
              })}
            </div>
          </div>
          <div
            className={`grid grid-cols-1 gap-space-md ${
              showActiveToggle ? 'md:col-span-2 md:grid-cols-2' : 'md:col-span-2'
            }`}
          >
            {showActiveToggle ? (
              <div className="flex items-start justify-between gap-space-md border border-outline-variant/30 bg-surface-container-low px-space-md py-space-sm">
                <div>
                  <div className="flex flex-wrap items-center gap-space-xs">
                    <p className="font-label text-label-md font-bold text-on-surface uppercase">
                      Kadro Statüsü
                    </p>
                    <span
                      className={`font-kicker px-space-sm py-0.5 text-kicker uppercase ${statusClass}`}
                    >
                      {draft.isActive ? 'Aktif' : 'Pasif'}
                    </span>
                  </div>
                  <p className="font-body mt-1 text-body-sm text-on-surface-variant">
                    Aktif oyuncular kamu kadro listesinde görünür.
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={draft.isActive}
                  onClick={() => {
                    onChange('isActive', !draft.isActive)
                  }}
                  className={`relative h-7 w-12 shrink-0 cursor-pointer transition-colors ${
                    draft.isActive ? 'bg-primary' : 'bg-outline-variant'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-6 w-6 bg-surface-container-lowest transition-transform ${
                      draft.isActive ? 'left-5' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>
            ) : null}
            <div className="flex items-start justify-between gap-space-md border border-outline-variant/30 bg-surface-container-low px-space-md py-space-sm">
              <div>
                <p className="font-label text-label-md font-bold text-on-surface uppercase">
                  Kaptan
                </p>
                <p className="font-body mt-1 text-body-sm text-on-surface-variant">
                  Oyuncuyu takım kaptanı olarak işaretle.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={draft.isCaptain}
                onClick={() => {
                  onChange('isCaptain', !draft.isCaptain)
                }}
                className={`relative h-7 w-12 shrink-0 cursor-pointer transition-colors ${
                  draft.isCaptain ? 'bg-primary' : 'bg-outline-variant'
                }`}
              >
                <span
                  className={`absolute top-0.5 h-6 w-6 bg-surface-container-lowest transition-transform ${
                    draft.isCaptain ? 'left-5' : 'left-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <SectionHeading section="Bölüm 02" title="Fizik & Pozisyon" />
        <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
          <div>
            <FieldLabel htmlFor="heightCm">Boy (cm)</FieldLabel>
            <div className="relative">
              <input
                id="heightCm"
                inputMode="numeric"
                className={`${inputClass} pr-14`}
                value={draft.heightCm}
                onChange={(event) => {
                  onChange('heightCm', event.target.value)
                }}
              />
              <span className="font-kicker absolute top-1/2 right-3 -translate-y-1/2 text-kicker text-on-surface-variant">
                CM
              </span>
            </div>
          </div>
          <div>
            <FieldLabel htmlFor="positionId" required>
              Pozisyon
            </FieldLabel>
            <select
              id="positionId"
              className={`${inputClass} cursor-pointer`}
              value={draft.positionId || ''}
              onChange={(event) => {
                onChange('positionId', Number(event.target.value))
              }}
            >
              <option value="" disabled>
                Pozisyon seçin
              </option>
              {positions.map((position) => (
                <option key={position.id} value={position.id}>
                  {position.name} ({position.abbreviation})
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <SectionHeading section="Bölüm 03" title="Kulüp & Finans" />
        <div className="grid grid-cols-1 gap-space-md md:grid-cols-3">
          <div>
            <FieldLabel htmlFor="currentTeam" required>
              Mevcut Takım
            </FieldLabel>
            <input
              id="currentTeam"
              className={inputClass}
              value={draft.currentTeam}
              onChange={(event) => {
                onChange('currentTeam', event.target.value)
              }}
            />
          </div>
          <div>
            <FieldLabel htmlFor="marketValue">Piyasa Değeri</FieldLabel>
            <div className="relative">
              <input
                id="marketValue"
                inputMode="decimal"
                className={`${inputClass} pr-8`}
                value={draft.marketValue}
                onChange={(event) => {
                  onChange('marketValue', event.target.value)
                }}
              />
              <span className="font-label absolute top-1/2 right-3 -translate-y-1/2 text-label-md text-on-surface-variant">
                €
              </span>
            </div>
          </div>
          <div>
            <FieldLabel htmlFor="wage">Maaş</FieldLabel>
            <div className="relative">
              <input
                id="wage"
                inputMode="decimal"
                className={`${inputClass} pr-8`}
                value={draft.wage}
                onChange={(event) => {
                  onChange('wage', event.target.value)
                }}
              />
              <span className="font-label absolute top-1/2 right-3 -translate-y-1/2 text-label-md text-on-surface-variant">
                €
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <SectionHeading section="Bölüm 04" title="Açıklama" />
        <FieldLabel htmlFor="description">Oyuncu Açıklaması</FieldLabel>
        <textarea
          id="description"
          rows={6}
          maxLength={2000}
          className={`${inputClass} resize-y`}
          value={draft.description}
          onChange={(event) => {
            onChange('description', event.target.value)
          }}
        />
        <p className="font-label mt-space-xs text-right text-label-md text-on-surface-variant">
          {profileLength} / 2000 karakter
        </p>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <SectionHeading section="Bölüm 05" title="Kayıt Bilgisi" />
        {mode === 'edit' ? (
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
        ) : (
          <p className="font-body text-body-sm text-on-surface-variant">
            Yeni oyuncu kaydı varsayılan olarak aktif oluşturulur. Kadro durumunu kayıttan sonra
            düzenleyebilirsiniz.
          </p>
        )}
      </section>
    </div>
  )
}
