import type { ReactNode } from 'react'
import type { AdminCategoryFormDraft } from '../utils/adminCategoryTypes'

type AdminCategoryFormFieldsProps = {
  draft: AdminCategoryFormDraft
  mode: 'create' | 'edit'
  onChange: <K extends keyof AdminCategoryFormDraft>(
    key: K,
    value: AdminCategoryFormDraft[K],
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

export function AdminCategoryFormFields({
  draft,
  mode,
  onChange,
}: AdminCategoryFormFieldsProps) {
  const created = formatDateParts(draft.createdDate)
  const updated = formatDateParts(draft.updatedDate)
  const descriptionLength = draft.description.length

  return (
    <div className="flex flex-col gap-space-md">
      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <SectionHeading section="Bölüm 01" title="Temel Kategori Tanımı" />
        <div className="flex flex-col gap-space-md">
          <div>
            <FieldLabel htmlFor="categoryName" required>
              Kategori Adı
            </FieldLabel>
            <input
              id="categoryName"
              className={inputClass}
              maxLength={100}
              value={draft.name}
              onChange={(event) => {
                onChange('name', event.target.value)
              }}
              placeholder="Örn. Taktik & Analiz"
            />
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between gap-space-sm">
              <FieldLabel htmlFor="categoryDescription">Açıklama</FieldLabel>
              <span className="font-label text-label-md text-on-surface-variant">
                {descriptionLength} / 500
              </span>
            </div>
            <textarea
              id="categoryDescription"
              rows={4}
              maxLength={500}
              className={`${inputClass} resize-y`}
              value={draft.description}
              onChange={(event) => {
                onChange('description', event.target.value)
              }}
              placeholder="Kategori için kısa açıklama"
            />
          </div>
        </div>
      </section>

      {mode === 'edit' ? (
        <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
          <SectionHeading section="Bölüm 02" title="Durum" />
          <div className="flex items-start justify-between gap-space-md border border-outline-variant/30 bg-surface-container-low px-space-md py-space-sm">
            <div>
              <p className="font-label text-label-md font-bold text-on-surface uppercase">
                Aktif Kategori
              </p>
              <p className="font-body mt-1 text-body-sm text-on-surface-variant">
                {draft.isActive
                  ? 'Kategori aktif. Gönderi oluştururken seçilebilir.'
                  : 'Kategori pasif. Yazar seçiminde gizli kalır.'}
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={draft.isActive}
              aria-label="Kategori durumunu değiştir"
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
        </section>
      ) : null}

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
