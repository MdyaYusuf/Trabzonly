import type { ReactNode } from 'react'
import { USER_DISPLAY_TAGS } from '@/features/users/utils/userDisplayTags'
import type { AdminMemberFormDraft, AdminMemberRoleOption } from '../utils/adminMemberTypes'

type AdminMemberDetailFormFieldsProps = {
  draft: AdminMemberFormDraft
  roles: AdminMemberRoleOption[]
  onChange: <K extends keyof AdminMemberFormDraft>(
    key: K,
    value: AdminMemberFormDraft[K],
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

function buildInitials(username: string): string {
  const cleaned = username.trim()

  if (!cleaned) {
    return '?'
  }

  return cleaned.slice(0, 2).toUpperCase()
}

const inputClass =
  'font-body w-full border border-outline-variant/50 bg-surface px-space-md py-space-sm text-body-md text-on-surface outline-none focus:border-primary'

const readOnlyInputClass = `${inputClass} cursor-not-allowed bg-surface-container-low opacity-90`

export function AdminMemberDetailFormFields({
  draft,
  roles,
  onChange,
}: AdminMemberDetailFormFieldsProps) {
  const created = formatDateParts(draft.createdDate)
  const updated = formatDateParts(draft.updatedDate)
  const bioLength = draft.bio.length
  const previewImageUrl = draft.clearProfileImage ? null : draft.profileImageUrl
  const roleLocked = draft.isAdmin
  const activeLocked = draft.isAdmin

  return (
    <div className="flex flex-col gap-space-md">
      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <SectionHeading section="Bölüm 01" title="Temel Hesap Bilgileri" />

        <div className="mb-space-md flex flex-col gap-space-md border border-outline-variant/30 bg-surface-container-low p-space-md sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-space-sm">
            {previewImageUrl ? (
              <img
                src={previewImageUrl}
                alt=""
                className="h-16 w-16 shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary-container text-lg font-bold text-on-primary">
                {buildInitials(draft.username)}
              </div>
            )}
            <div>
              <p className="font-headline text-headline-sm font-extrabold text-on-surface">
                {draft.username}
              </p>
              <p className="font-body mt-1 text-body-sm text-on-surface-variant">
                {previewImageUrl
                  ? 'Profil görseli mevcut. Gerekirse kaldırabilirsiniz.'
                  : 'Profil görseli yok.'}
              </p>
            </div>
          </div>
          {previewImageUrl || draft.profileImageUrl ? (
            <button
              type="button"
              disabled={draft.clearProfileImage || !draft.profileImageUrl}
              onClick={() => {
                onChange('clearProfileImage', true)
              }}
              className="font-label inline-flex cursor-pointer items-center gap-1 border border-error px-space-md py-space-sm text-label-md text-error uppercase transition-colors hover:bg-error-container disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="material-symbols-outlined text-[16px]">hide_image</span>
              Görseli Kaldır
            </button>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
          <div>
            <FieldLabel htmlFor="memberUsername" required>
              Kullanıcı Adı
            </FieldLabel>
            <input
              id="memberUsername"
              className={inputClass}
              maxLength={50}
              value={draft.username}
              onChange={(event) => {
                onChange('username', event.target.value)
              }}
            />
          </div>
          <div>
            <FieldLabel htmlFor="memberEmail">E-posta</FieldLabel>
            <input
              id="memberEmail"
              type="email"
              className={readOnlyInputClass}
              value={draft.email}
              readOnly
            />
          </div>
        </div>

        <div className="mt-space-md">
          <div className="mb-1 flex items-center justify-between gap-space-sm">
            <FieldLabel htmlFor="memberBio">Biyografi</FieldLabel>
            <span className="font-label text-label-md text-on-surface-variant">
              {bioLength} / 400
            </span>
          </div>
          <textarea
            id="memberBio"
            rows={4}
            maxLength={400}
            className={`${inputClass} resize-y`}
            value={draft.bio}
            onChange={(event) => {
              onChange('bio', event.target.value)
            }}
            placeholder="Profil biyografisi"
          />
        </div>

        <div className="mt-space-md grid grid-cols-1 gap-space-md md:grid-cols-2">
          <div>
            <FieldLabel htmlFor="memberDisplayTag" required>
              Görünen Etiket
            </FieldLabel>
            <select
              id="memberDisplayTag"
              className={inputClass}
              value={draft.displayTag}
              onChange={(event) => {
                onChange('displayTag', event.target.value)
              }}
            >
              {USER_DISPLAY_TAGS.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
          <div>
            <FieldLabel htmlFor="memberRole" required>
              Rol
            </FieldLabel>
            <select
              id="memberRole"
              className={inputClass}
              value={draft.roleId || ''}
              disabled={roleLocked}
              title={roleLocked ? 'Yönetici hesaplarının rolü değiştirilemez.' : undefined}
              onChange={(event) => {
                const nextRoleId = Number(event.target.value)
                const nextRole = roles.find((role) => role.id === nextRoleId)

                onChange('roleId', nextRoleId)
                onChange('roleName', nextRole?.name ?? '')
              }}
            >
              <option value="" disabled>
                Rol seçin
              </option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <SectionHeading section="Bölüm 02" title="Durum" />
        <div className="flex items-start justify-between gap-space-md border border-outline-variant/30 bg-surface-container-low px-space-md py-space-sm">
          <div>
            <p className="font-label text-label-md font-bold text-on-surface uppercase">
              {draft.isActive ? 'Aktif Hesap' : 'Pasif Hesap'}
            </p>
            <p className="font-body mt-1 text-body-sm text-on-surface-variant">
              {activeLocked
                ? 'Yönetici hesapları pasife alınamaz.'
                : draft.isActive
                  ? 'Üye oturum açabilir ve içerik üretebilir.'
                  : 'Üye hesabı pasif. Oturum açılamaz.'}
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={draft.isActive}
            disabled={activeLocked}
            aria-label="Hesap durumunu değiştir"
            onClick={() => {
              if (activeLocked) {
                return
              }

              onChange('isActive', !draft.isActive)
            }}
            className={`relative h-7 w-12 shrink-0 transition-colors ${
              draft.isActive ? 'bg-primary' : 'bg-outline-variant'
            } ${activeLocked ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
          >
            <span
              className={`absolute top-0.5 h-6 w-6 bg-surface-container-lowest transition-transform ${
                draft.isActive ? 'left-5' : 'left-0.5'
              }`}
            />
          </button>
        </div>
      </section>

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
    </div>
  )
}
