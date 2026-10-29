import { useEffect, useState } from 'react'
import type { AdminPlayerFormDraft } from '../utils/adminPlayerTypes'

type AdminPlayerFormSidebarProps = {
  draft: AdminPlayerFormDraft
  mode: 'create' | 'edit'
  onChange: <K extends keyof AdminPlayerFormDraft>(
    key: K,
    value: AdminPlayerFormDraft[K],
  ) => void
}

function formatDateLabel(value?: string | null): string {
  if (!value) {
    return '—'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toLocaleString('tr-TR')
}

export function AdminPlayerFormSidebar({
  draft,
  mode,
  onChange,
}: AdminPlayerFormSidebarProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!draft.imageFile) {
      setPreviewUrl(null)
      return
    }

    const objectUrl = URL.createObjectURL(draft.imageFile)
    setPreviewUrl(objectUrl)

    return () => {
      URL.revokeObjectURL(objectUrl)
    }
  }, [draft.imageFile])

  const displayUrl = previewUrl ?? draft.imageUrl ?? null
  const initials = draft.name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('') || '?'

  return (
    <aside className="flex flex-col gap-space-md">
      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <h2 className="font-kicker mb-space-md text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
          Oyuncu Fotoğrafı
        </h2>

        <div className="relative mb-space-md flex aspect-[3/4] items-end justify-center overflow-hidden bg-surface-container">
          {displayUrl ? (
            <img src={displayUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <span className="pb-space-lg font-headline text-display-xl font-extrabold text-primary/20">
              {initials}
            </span>
          )}
        </div>

        <div className="mb-space-md flex flex-col items-center gap-space-xs border border-dashed border-outline-variant bg-surface-container-low px-space-md py-space-lg text-center">
          <span className="material-symbols-outlined text-3xl text-on-surface-variant">
            cloud_upload
          </span>
          <p className="font-label text-label-md font-bold text-on-surface">
            Görsel yükleyin
          </p>
          <p className="font-body text-body-sm text-on-surface-variant">
            PNG, JPG veya WebP (Maks. 5MB)
          </p>
          {draft.imageFile ? (
            <p className="font-body text-body-sm text-secondary">{draft.imageFile.name}</p>
          ) : null}
        </div>

        <div className="flex gap-space-sm">
          <label className="font-label inline-flex flex-1 cursor-pointer items-center justify-center gap-1 border border-outline-variant px-space-sm py-space-sm text-label-md uppercase transition-colors hover:border-primary hover:text-primary">
            <span className="material-symbols-outlined text-[16px]">upload</span>
            {draft.imageFile || draft.imageUrl ? 'Değiştir' : 'Yükle'}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0] ?? null
                onChange('imageFile', file)
                event.target.value = ''
              }}
            />
          </label>
          <button
            type="button"
            onClick={() => {
              onChange('imageFile', null)
            }}
            disabled={!draft.imageFile}
            className="font-label inline-flex flex-1 items-center justify-center gap-1 border border-error/40 px-space-sm py-space-sm text-label-md text-error uppercase transition-colors hover:bg-error-container disabled:opacity-40"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
            Kaldır
          </button>
        </div>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <h2 className="font-kicker mb-space-md text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
          Kayıt Bilgisi
        </h2>
        <dl className="flex flex-col gap-space-md">
          <div>
            <dt className="font-kicker text-kicker text-on-surface-variant uppercase">Durum</dt>
            <dd className="mt-1">
              <span
                className={`font-kicker px-space-sm py-0.5 text-kicker uppercase ${
                  draft.isActive
                    ? 'bg-secondary-container/50 text-on-secondary-container'
                    : 'bg-error-container text-on-error-container'
                }`}
              >
                {mode === 'create' ? 'Yeni kayıt (aktif)' : draft.isActive ? 'Aktif' : 'Pasif'}
              </span>
            </dd>
          </div>
          {mode === 'edit' ? (
            <>
              <div>
                <dt className="font-kicker text-kicker text-on-surface-variant uppercase">
                  Oluşturulma
                </dt>
                <dd className="font-label mt-1 text-label-md text-on-surface">
                  {formatDateLabel(draft.createdDate)}
                </dd>
              </div>
              <div>
                <dt className="font-kicker text-kicker text-on-surface-variant uppercase">
                  Son Güncelleme
                </dt>
                <dd className="font-label mt-1 text-label-md text-on-surface">
                  {formatDateLabel(draft.updatedDate)}
                </dd>
              </div>
            </>
          ) : (
            <p className="font-body text-body-sm text-on-surface-variant">
              Yeni oyuncu kaydı varsayılan olarak aktif oluşturulur.
            </p>
          )}
        </dl>
      </section>
    </aside>
  )
}
