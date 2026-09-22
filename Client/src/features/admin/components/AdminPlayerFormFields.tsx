import type { ReactNode } from 'react'
import type { AdminPlayerFormDraft } from '../utils/adminPlayerTypes'
import {
  adminPlayerNationalityOptions,
  adminPlayerPrimaryPositions,
  adminPlayerSecondaryPositions,
  adminPlayerSquadOptions,
} from '../utils/adminPlayerPlaceholders'

type AdminPlayerFormFieldsProps = {
  draft: AdminPlayerFormDraft
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

const inputClass =
  'font-body w-full border border-outline-variant/50 bg-surface px-space-md py-space-sm text-body-md text-on-surface outline-none focus:border-primary'

export function AdminPlayerFormFields({ draft, onChange }: AdminPlayerFormFieldsProps) {
  const profileLength = draft.tacticalProfile.length

  return (
    <div className="flex flex-col gap-space-md">
      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <SectionHeading section="Bölüm 01" title="Temel Bilgiler & Kimlik" />
        <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
          <div className="md:col-span-2">
            <FieldLabel htmlFor="fullName" required>
              Ad Soyad
            </FieldLabel>
            <input
              id="fullName"
              className={inputClass}
              value={draft.fullName}
              onChange={(event) => {
                onChange('fullName', event.target.value)
              }}
            />
          </div>
          <div>
            <FieldLabel htmlFor="jerseyNumber" required>
              Forma Numarası
            </FieldLabel>
            <input
              id="jerseyNumber"
              className={inputClass}
              value={draft.jerseyNumber}
              onChange={(event) => {
                onChange('jerseyNumber', event.target.value)
              }}
            />
          </div>
          <div>
            <FieldLabel htmlFor="birthDate">Doğum Tarihi</FieldLabel>
            <input
              id="birthDate"
              type="date"
              className={inputClass}
              value={draft.birthDate}
              onChange={(event) => {
                onChange('birthDate', event.target.value)
              }}
            />
          </div>
          <div className="md:col-span-2">
            <FieldLabel htmlFor="nationality">Uyruk / Milliyet</FieldLabel>
            <select
              id="nationality"
              className={inputClass}
              value={draft.nationality}
              onChange={(event) => {
                onChange('nationality', event.target.value)
              }}
            >
              {adminPlayerNationalityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <FieldLabel>Tercih Edilen Ayak</FieldLabel>
            <div className="flex flex-wrap gap-1">
              {(
                [
                  { id: 'right', label: 'Sağ' },
                  { id: 'left', label: 'Sol' },
                  { id: 'both', label: 'Her İkisi' },
                ] as const
              ).map((foot) => {
                const isActive = draft.preferredFoot === foot.id

                return (
                  <button
                    key={foot.id}
                    type="button"
                    onClick={() => {
                      onChange('preferredFoot', foot.id)
                    }}
                    className={`font-label px-space-md py-space-sm text-label-md uppercase transition-colors ${
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
          <div className="md:col-span-2 flex items-start justify-between gap-space-md border border-outline-variant/30 bg-surface-container-low px-space-md py-space-sm">
            <div>
              <p className="font-label text-label-md font-bold text-on-surface uppercase">
                Kadro Statüsü
              </p>
              <p className="font-body mt-1 text-body-sm text-on-surface-variant">
                Aktif oyuncu - Takım kadrosunda ve maç bültenlerinde görünür
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={draft.isActiveInSquad}
              onClick={() => {
                onChange('isActiveInSquad', !draft.isActiveInSquad)
              }}
              className={`relative h-7 w-12 shrink-0 transition-colors ${
                draft.isActiveInSquad ? 'bg-primary' : 'bg-outline-variant'
              }`}
            >
              <span
                className={`absolute top-0.5 h-6 w-6 bg-surface-container-lowest transition-transform ${
                  draft.isActiveInSquad ? 'left-5' : 'left-0.5'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <SectionHeading section="Bölüm 02" title="Fiziksel Özellikler & Taktiksel Rol" />
        <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
          <div>
            <FieldLabel htmlFor="heightCm">Boy (cm)</FieldLabel>
            <div className="relative">
              <input
                id="heightCm"
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
            <FieldLabel htmlFor="weightKg">Kilo (kg)</FieldLabel>
            <div className="relative">
              <input
                id="weightKg"
                className={`${inputClass} pr-14`}
                value={draft.weightKg}
                onChange={(event) => {
                  onChange('weightKg', event.target.value)
                }}
              />
              <span className="font-kicker absolute top-1/2 right-3 -translate-y-1/2 text-kicker text-on-surface-variant">
                KG
              </span>
            </div>
          </div>
          <div>
            <FieldLabel htmlFor="primaryPosition" required>
              Birincil Pozisyon
            </FieldLabel>
            <select
              id="primaryPosition"
              className={inputClass}
              value={draft.primaryPosition}
              onChange={(event) => {
                onChange('primaryPosition', event.target.value)
              }}
            >
              {adminPlayerPrimaryPositions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <FieldLabel htmlFor="secondaryPosition">İkincil Pozisyon</FieldLabel>
            <select
              id="secondaryPosition"
              className={inputClass}
              value={draft.secondaryPosition}
              onChange={(event) => {
                onChange('secondaryPosition', event.target.value)
              }}
            >
              {adminPlayerSecondaryPositions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <SectionHeading section="Bölüm 03" title="Kulüp, Finans & Sözleşme Verileri" />
        <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
          <div className="md:col-span-2">
            <FieldLabel htmlFor="currentSquad">Mevcut Kadro / Takım</FieldLabel>
            <select
              id="currentSquad"
              className={inputClass}
              value={draft.currentSquad}
              onChange={(event) => {
                onChange('currentSquad', event.target.value)
              }}
            >
              {adminPlayerSquadOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <FieldLabel htmlFor="contractEnd">Sözleşme Bitiş Tarihi</FieldLabel>
            <input
              id="contractEnd"
              type="date"
              className={inputClass}
              value={draft.contractEnd}
              onChange={(event) => {
                onChange('contractEnd', event.target.value)
              }}
            />
          </div>
          <div>
            <FieldLabel htmlFor="marketValue">Güncel Piyasa Değeri (€)</FieldLabel>
            <div className="relative">
              <span className="font-label absolute top-1/2 left-3 -translate-y-1/2 text-label-md text-on-surface-variant">
                €
              </span>
              <input
                id="marketValue"
                className={`${inputClass} pl-8`}
                value={draft.marketValue}
                onChange={(event) => {
                  onChange('marketValue', event.target.value)
                }}
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <FieldLabel htmlFor="annualSalary">Yıllık Maaş (€)</FieldLabel>
            <div className="relative">
              <span className="font-label absolute top-1/2 left-3 -translate-y-1/2 text-label-md text-on-surface-variant">
                €
              </span>
              <input
                id="annualSalary"
                className={`${inputClass} pl-8`}
                value={draft.annualSalary}
                onChange={(event) => {
                  onChange('annualSalary', event.target.value)
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <SectionHeading section="Bölüm 04" title="Editoryal Rapor & Teknik Analiz" />
        <FieldLabel htmlFor="tacticalProfile">Taktiksel Profil ve Basın Bülteni Notları</FieldLabel>
        <textarea
          id="tacticalProfile"
          rows={6}
          maxLength={1000}
          className={`${inputClass} resize-y`}
          value={draft.tacticalProfile}
          onChange={(event) => {
            onChange('tacticalProfile', event.target.value)
          }}
        />
        <p className="font-label mt-space-xs text-right text-label-md text-on-surface-variant">
          {profileLength} / 1000 karakter
        </p>
      </section>
    </div>
  )
}
