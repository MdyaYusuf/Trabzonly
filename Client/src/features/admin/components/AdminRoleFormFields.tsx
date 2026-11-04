import type { ReactNode } from 'react'
import type { AdminRoleFormDraft } from '../utils/adminRoleTypes'

type AdminRoleFormFieldsProps = {
  draft: AdminRoleFormDraft
  mode: 'create' | 'edit'
  onChange: <K extends keyof AdminRoleFormDraft>(
    key: K,
    value: AdminRoleFormDraft[K],
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

export function AdminRoleFormFields({ draft, mode, onChange }: AdminRoleFormFieldsProps) {
  const created = formatDateParts(draft.createdDate)
  const updated = formatDateParts(draft.updatedDate)
  const nameReadOnly = mode === 'edit' && draft.isSystem

  return (
    <div className="flex flex-col gap-space-md">
      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <SectionHeading section="Bölüm 01" title="Temel Rol Bilgisi" />
        <div className="flex flex-col gap-space-md">
          <div>
            <FieldLabel htmlFor="roleName" required>
              Rol Adı
            </FieldLabel>
            <input
              id="roleName"
              className={`${inputClass}${nameReadOnly ? ' cursor-not-allowed bg-surface-container-high text-on-surface-variant' : ''}`}
              maxLength={50}
              readOnly={nameReadOnly}
              value={draft.name}
              onChange={(event) => {
                onChange('name', event.target.value)
              }}
              placeholder="Örn. Moderator"
            />
            <p className="font-body mt-space-xs text-body-sm text-on-surface-variant">
              {nameReadOnly
                ? 'Sistem rolleri yeniden adlandırılamaz.'
                : 'Üye yönetimi ve yetkilendirmede görünen rol adı.'}
            </p>
          </div>

          {mode === 'edit' ? (
            <div className="flex flex-wrap items-center gap-space-sm">
              <span
                className={`font-label inline-flex items-center gap-1 px-space-sm py-1 text-label-md uppercase ${
                  draft.isSystem
                    ? 'bg-surface-container-high text-on-surface-variant'
                    : 'bg-secondary-container/50 text-on-secondary-container'
                }`}
              >
                {draft.isSystem ? (
                  <span className="material-symbols-outlined text-[14px]">lock</span>
                ) : null}
                {draft.isSystem ? 'Sistem Rolü' : 'Özel Rol'}
              </span>
              <span className="font-label inline-flex items-center gap-1 bg-surface-container-high px-space-sm py-1 text-label-md tabular-nums text-on-surface">
                <span className="material-symbols-outlined text-[16px]">group</span>
                {draft.memberCount} üye
              </span>
            </div>
          ) : null}
        </div>
      </section>

      {mode === 'edit' ? (
        <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
          <SectionHeading section="Bölüm 02" title="Kayıt Bilgisi" />
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
