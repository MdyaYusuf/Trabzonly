import type { ReactNode } from 'react'
import { PositionZone } from '@/features/positions/positionTypes'
import {
  createEmptyAdminPositionRoleDraft,
} from '../utils/adminPositionDraftUtils'
import type { AdminPositionFormDraft, AdminPositionRoleDraft } from '../utils/adminPositionTypes'

type AdminPositionFormFieldsProps = {
  draft: AdminPositionFormDraft
  mode: 'create' | 'edit'
  onChange: <K extends keyof AdminPositionFormDraft>(
    key: K,
    value: AdminPositionFormDraft[K],
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

const zoneOptions = [
  { id: PositionZone.Goalkeeper, label: 'Kaleci' },
  { id: PositionZone.Defence, label: 'Savunma' },
  { id: PositionZone.Midfield, label: 'Orta Saha' },
  { id: PositionZone.Attack, label: 'Hücum' },
]

export function AdminPositionFormFields({
  draft,
  mode,
  onChange,
}: AdminPositionFormFieldsProps) {
  const created = formatDateParts(draft.createdDate)
  const updated = formatDateParts(draft.updatedDate)

  function updateRole(
    clientKey: string,
    key: keyof AdminPositionRoleDraft,
    value: string | number,
  ) {
    onChange(
      'roles',
      draft.roles.map((role) => {
        if (role.clientKey !== clientKey) {
          return role
        }

        return {
          ...role,
          [key]: value,
        }
      }),
    )
  }

  function addRole() {
    onChange('roles', [...draft.roles, createEmptyAdminPositionRoleDraft(draft.roles.length)])
  }

  function removeRole(clientKey: string) {
    onChange(
      'roles',
      draft.roles.filter((role) => role.clientKey !== clientKey),
    )
  }

  return (
    <div className="flex flex-col gap-space-md">
      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <SectionHeading section="Bölüm 01" title="Temel Pozisyon Tanımı" />
        <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
          <div className="md:col-span-2">
            <FieldLabel htmlFor="positionName" required>
              Pozisyon Adı
            </FieldLabel>
            <input
              id="positionName"
              className={inputClass}
              maxLength={50}
              value={draft.name}
              onChange={(event) => {
                onChange('name', event.target.value)
              }}
              placeholder="Santrafor"
            />
          </div>

          <div>
            <FieldLabel htmlFor="abbreviation" required>
              Kısaltma
            </FieldLabel>
            <input
              id="abbreviation"
              maxLength={10}
              className={`${inputClass} uppercase`}
              value={draft.abbreviation}
              onChange={(event) => {
                onChange('abbreviation', event.target.value.toUpperCase())
              }}
              placeholder="ST"
            />
          </div>

          <div>
            <FieldLabel htmlFor="zone" required>
              Saha Bölgesi
            </FieldLabel>
            <select
              id="zone"
              className={inputClass}
              value={draft.zone}
              onChange={(event) => {
                onChange('zone', Number(event.target.value) as PositionZone)
              }}
            >
              {zoneOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex flex-wrap items-center justify-between gap-space-sm border-b border-outline-variant/40 pb-space-sm">
          <h2 className="font-headline text-headline-sm font-bold text-primary uppercase">
            Roller
          </h2>
          <button
            type="button"
            onClick={addRole}
            className="font-label inline-flex cursor-pointer items-center gap-1 border border-outline-variant px-space-md py-space-xs text-label-md uppercase transition-colors hover:border-primary hover:text-primary"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Rol Ekle
          </button>
        </div>

        {draft.roles.length === 0 ? (
          <p className="font-body text-body-sm text-on-surface-variant">
            Bu pozisyona henüz rol eklenmedi.
          </p>
        ) : (
          <ul className="flex flex-col gap-space-md">
            {draft.roles.map((role, index) => (
              <li
                key={role.clientKey}
                className="border border-outline-variant/30 bg-surface-container-low p-space-md"
              >
                <div className="mb-space-sm flex items-center justify-between gap-space-sm">
                  <p className="font-label text-label-md font-bold text-on-surface uppercase">
                    Rol {index + 1}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      removeRole(role.clientKey)
                    }}
                    className="font-label cursor-pointer text-label-md text-error uppercase transition-colors hover:underline"
                  >
                    Kaldır
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-space-md">
                  <div>
                    <FieldLabel htmlFor={`role-name-${role.clientKey}`} required>
                      Rol Adı
                    </FieldLabel>
                    <input
                      id={`role-name-${role.clientKey}`}
                      className={inputClass}
                      maxLength={80}
                      value={role.name}
                      onChange={(event) => {
                        updateRole(role.clientKey, 'name', event.target.value)
                      }}
                      placeholder="Target Forward"
                    />
                  </div>
                  <div>
                    <FieldLabel htmlFor={`role-description-${role.clientKey}`} required>
                      Açıklama
                    </FieldLabel>
                    <textarea
                      id={`role-description-${role.clientKey}`}
                      rows={3}
                      className={`${inputClass} resize-y`}
                      maxLength={300}
                      value={role.description}
                      onChange={(event) => {
                        updateRole(role.clientKey, 'description', event.target.value)
                      }}
                      placeholder="Rolün kısa açıklaması"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {mode === 'edit' ? (
        <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
          <SectionHeading section="Bölüm 03" title="Sistem Bilgileri" />
          <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
            <div>
              <p className="font-label text-label-md text-on-surface-variant uppercase">
                Oluşturulma
              </p>
              <p className="font-body mt-1 text-body-md text-on-surface">
                {created.date}
                {created.time ? ` · ${created.time}` : ''}
              </p>
            </div>
            <div>
              <p className="font-label text-label-md text-on-surface-variant uppercase">
                Son Güncelleme
              </p>
              <p className="font-body mt-1 text-body-md text-on-surface">
                {updated.date}
                {updated.time ? ` · ${updated.time}` : ''}
              </p>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  )
}
