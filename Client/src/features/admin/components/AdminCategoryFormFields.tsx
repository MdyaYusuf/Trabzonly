import type { AdminCategoryAccent, AdminCategoryFormDraft } from '../utils/adminCategoryTypes'
import { buildCategorySlugFromName } from '../utils/adminCategoryPlaceholders'

type AdminCategoryFormFieldsProps = {
  draft: AdminCategoryFormDraft
  onChange: <K extends keyof AdminCategoryFormDraft>(
    key: K,
    value: AdminCategoryFormDraft[K],
  ) => void
}

const inputClass =
  'font-body w-full border border-outline-variant/50 bg-surface px-space-md py-space-sm text-body-md text-on-surface outline-none focus:border-primary'

const iconOptions = [
  { id: 'grid_view', label: 'Pano & Taktik Düzeni' },
  { id: 'sports_soccer', label: 'Maç & Top' },
  { id: 'scoreboard', label: 'Skorboard' },
  { id: 'campaign', label: 'Tribün Kampanya' },
  { id: 'school', label: 'Altyapı' },
  { id: 'archive', label: 'Arşiv' },
]

export function AdminCategoryFormFields({ draft, onChange }: AdminCategoryFormFieldsProps) {
  const descriptionLength = draft.description.length

  function refreshSlug() {
    onChange('slug', buildCategorySlugFromName(draft.name))
  }

  return (
    <div className="flex flex-col gap-space-md">
      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-sm">
          <label htmlFor="categoryName" className="font-label text-label-md text-on-surface-variant">
            Kategori Adı <span className="text-error">*</span>
          </label>
          <span className="font-kicker ml-space-sm text-kicker text-error uppercase">
            Zorunlu Alan
          </span>
        </div>
        <input
          id="categoryName"
          className={inputClass}
          value={draft.name}
          onChange={(event) => {
            onChange('name', event.target.value)
          }}
        />
        <p className="font-body mt-space-xs text-body-sm text-on-surface-variant">
          Kategori adı sitede ana menülerde, gönderi başlıklarında ve filtreleme çiplerinde
          görünecektir.
        </p>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-sm flex flex-wrap items-center justify-between gap-space-sm">
          <label htmlFor="categorySlug" className="font-label text-label-md text-on-surface-variant">
            Kategori Bağlantısı (Slug)
          </label>
          <button
            type="button"
            onClick={refreshSlug}
            className="font-label inline-flex items-center gap-1 text-label-md text-secondary uppercase transition-colors hover:text-primary"
          >
            <span className="material-symbols-outlined text-[16px]">autorenew</span>
            Otomatik Yenile
          </button>
        </div>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-stretch">
          <span className="font-body flex items-center bg-surface-container-high px-space-md py-space-sm text-body-sm text-on-surface-variant">
            trabzonly.org/gonderiler/kategori/
          </span>
          <input
            id="categorySlug"
            className={inputClass}
            value={draft.slug}
            onChange={(event) => {
              onChange('slug', event.target.value)
            }}
          />
        </div>
        <p className="font-body mt-space-xs text-body-sm text-on-surface-variant">
          Kalıcı bağlantı yapısı için Türkçe karakter içermeyen SEO uyumlu URL yolu.
        </p>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-sm flex items-center justify-between gap-space-sm">
          <label
            htmlFor="categoryDescription"
            className="font-label text-label-md text-on-surface-variant"
          >
            Açıklama <span className="text-error">*</span>
          </label>
          <span className="font-label text-label-md text-on-surface-variant">
            {descriptionLength} / 500 Karakter
          </span>
        </div>
        <textarea
          id="categoryDescription"
          rows={5}
          maxLength={500}
          className={`${inputClass} resize-y`}
          value={draft.description}
          onChange={(event) => {
            onChange('description', event.target.value)
          }}
        />
        <p className="font-body mt-space-xs text-body-sm text-on-surface-variant">
          Kategori sayfasının üst kısmında ve arama motoru meta açıklamalarında kullanılır.
        </p>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <h2 className="font-headline mb-space-md text-headline-sm font-bold text-primary uppercase">
          Editoryal İkon & Renk Vurgusu
        </h2>
        <div className="flex flex-col gap-space-md sm:flex-row sm:items-start">
          <div
            className={`flex h-16 w-16 shrink-0 items-center justify-center ${
              draft.accent === 'mavi'
                ? 'bg-secondary-container text-on-secondary-container'
                : 'bg-primary-container text-on-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[32px]">{draft.icon}</span>
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-space-sm">
            <p className="font-label text-label-md text-on-surface">
              Seçili İkon: <strong>{draft.iconLabel}</strong>
            </p>
            <div className="flex flex-wrap gap-1">
              {iconOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    onChange('icon', option.id)
                    onChange('iconLabel', option.label)
                  }}
                  className={`font-label px-space-sm py-1 text-label-md uppercase transition-colors ${
                    draft.icon === option.id
                      ? 'bg-primary text-on-primary'
                      : 'border border-outline-variant/50 text-on-surface-variant hover:border-primary'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <div className="flex gap-space-sm">
              {(
                [
                  { id: 'bordo', label: 'BORDO' },
                  { id: 'mavi', label: 'MAVİ' },
                ] as Array<{ id: AdminCategoryAccent; label: string }>
              ).map((tone) => {
                const isActive = draft.accent === tone.id

                return (
                  <button
                    key={tone.id}
                    type="button"
                    onClick={() => {
                      onChange('accent', tone.id)
                    }}
                    className={`font-kicker px-space-md py-space-sm text-kicker uppercase transition-colors ${
                      isActive
                        ? tone.id === 'bordo'
                          ? 'bg-primary text-on-primary'
                          : 'bg-secondary text-on-secondary'
                        : 'border border-outline-variant/50 text-on-surface-variant'
                    }`}
                  >
                    {tone.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="flex items-start justify-between gap-space-md border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div>
          <h2 className="font-headline text-headline-sm font-bold text-primary uppercase">
            Kategori Statüsü (Yayında)
          </h2>
          <p className="font-body mt-space-xs text-body-sm text-on-surface-variant">
            {draft.isPublished
              ? 'Kategori Aktif — Gönderi oluştururken yazarlar bu kategoriyi seçebilir ve sitede herkese açık olarak listelenir.'
              : 'Kategori Pasif — Yazar seçiminde gizli kalır ve kamu listelerinde görünmez.'}
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={draft.isPublished}
          aria-label="Kategori Statüsünü Değiştir"
          onClick={() => {
            onChange('isPublished', !draft.isPublished)
          }}
          className={`relative h-7 w-12 shrink-0 transition-colors ${
            draft.isPublished ? 'bg-primary' : 'bg-outline-variant'
          }`}
        >
          <span
            className={`absolute top-0.5 h-6 w-6 bg-surface-container-lowest transition-transform ${
              draft.isPublished ? 'left-5' : 'left-0.5'
            }`}
          />
        </button>
      </section>
    </div>
  )
}
