import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AdminCategoryFormFields } from '../components/AdminCategoryFormFields'
import { AdminCategoryFormSidebar } from '../components/AdminCategoryFormSidebar'
import { getAdminCategoryFormDraft } from '../utils/adminCategoryPlaceholders'
import type { AdminCategoryFormDraft } from '../utils/adminCategoryTypes'

type AdminCategoryCreateEditPageProps = {
  mode?: 'create' | 'edit'
}

export function AdminCategoryCreateEditPage({
  mode: modeProp,
}: AdminCategoryCreateEditPageProps) {
  const { categoryId } = useParams<{ categoryId: string }>()
  const navigate = useNavigate()
  const mode = modeProp ?? (categoryId ? 'edit' : 'create')
  const [draft, setDraft] = useState<AdminCategoryFormDraft>(() =>
    getAdminCategoryFormDraft(mode === 'edit' ? categoryId : undefined),
  )

  function updateField<K extends keyof AdminCategoryFormDraft>(
    key: K,
    value: AdminCategoryFormDraft[K],
  ) {
    setDraft((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  function handleCancel() {
    navigate('/yonetim/kategoriler')
  }

  function handleSave() {
    navigate('/yonetim/kategoriler')
  }

  const title = mode === 'edit' ? 'Kategoriyi Düzenle' : 'Yeni Kategori Ekle'
  const description =
    mode === 'edit'
      ? 'Gönderi kategorisi meta verilerini, görünürlük statüsünü ve editoryal hiyerarşisini güncelleyin.'
      : 'Yeni yayın grubu oluşturun. Ad, slug, açıklama ve editoryal vurguyu tanımlayın.'

  return (
    <div className="flex min-h-full flex-col">
      <main className="mx-auto flex w-full max-w-[1360px] flex-1 flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
        <header className="flex flex-col gap-space-md lg:flex-row lg:items-start lg:justify-between">
          <div className="flex max-w-3xl flex-col gap-space-xs">
            <nav
              aria-label="Breadcrumb"
              className="font-label flex flex-wrap items-center gap-space-xs text-label-md text-on-surface-variant"
            >
              <Link to="/yonetim" className="transition-colors hover:text-primary">
                Yönetim Masası
              </Link>
              <span>/</span>
              <Link to="/yonetim/kategoriler" className="transition-colors hover:text-primary">
                Kategoriler
              </Link>
              <span>/</span>
              <span className="font-bold text-primary uppercase">{title}</span>
            </nav>
            <h1 className="font-headline text-headline-lg font-extrabold tracking-tight text-primary uppercase">
              {title}
            </h1>
            <p className="font-body text-body-md text-on-surface-variant">
              <span className="font-bold text-primary">{draft.recordCode}</span>
              {' · '}
              {description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm">
            {mode === 'edit' && (
              <button
                type="button"
                className="font-label inline-flex items-center gap-1 border border-error px-space-md py-space-sm text-label-md text-error uppercase transition-colors hover:bg-error-container"
              >
                <span className="material-symbols-outlined text-[18px]">delete</span>
                Sil
              </button>
            )}
            <button
              type="button"
              onClick={handleCancel}
              className="font-label border border-outline-variant px-space-md py-space-sm text-label-md uppercase transition-colors hover:border-primary hover:text-primary"
            >
              İptal
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="font-label inline-flex items-center gap-1 bg-primary-container px-space-md py-space-sm text-label-md font-bold tracking-wider text-on-primary uppercase transition-all hover:bg-primary"
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              Kaydet
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 items-start gap-gutter lg:grid-cols-12">
          <div className="lg:col-span-8">
            <AdminCategoryFormFields draft={draft} onChange={updateField} />
          </div>
          <div className="lg:col-span-4">
            <AdminCategoryFormSidebar draft={draft} />
          </div>
        </div>
      </main>

      <footer className="sticky bottom-0 border-t border-outline-variant/50 bg-surface-container-lowest px-4 py-space-md sm:px-6 lg:px-12">
        <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-sm lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-space-sm">
            <span className="material-symbols-outlined text-secondary">info</span>
            <p className="font-body text-body-sm text-on-surface-variant">
              {mode === 'edit' ? (
                <>
                  Kategori silindiğinde bağlı{' '}
                  <strong className="text-primary">{draft.linkedPostsCount} gönderi</strong>{' '}
                  otomatik olarak &quot;Genel&quot; arşiv kategorisine taşınır.
                </>
              ) : (
                <>Yeni kategori kaydedildiğinde yazar seçim listelerinde hemen görünür.</>
              )}
            </p>
          </div>
          <div className="flex gap-space-sm">
            <button
              type="button"
              onClick={handleCancel}
              className="font-label border border-outline-variant px-space-md py-space-sm text-label-md uppercase transition-colors hover:border-primary hover:text-primary"
            >
              İptal
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="font-label bg-primary-container px-space-md py-space-sm text-label-md font-bold tracking-wider text-on-primary uppercase transition-all hover:bg-primary"
            >
              Kaydet
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
