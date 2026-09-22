import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AdminPlayerFormFields } from '../components/AdminPlayerFormFields'
import { AdminPlayerFormSidebar } from '../components/AdminPlayerFormSidebar'
import { getAdminPlayerFormDraft } from '../utils/adminPlayerPlaceholders'
import type { AdminPlayerFormDraft } from '../utils/adminPlayerTypes'

type AdminPlayerCreateEditPageProps = {
  mode?: 'create' | 'edit'
}

export function AdminPlayerCreateEditPage({ mode: modeProp }: AdminPlayerCreateEditPageProps) {
  const { playerId } = useParams<{ playerId: string }>()
  const navigate = useNavigate()
  const mode = modeProp ?? (playerId ? 'edit' : 'create')
  const [draft, setDraft] = useState<AdminPlayerFormDraft>(() =>
    getAdminPlayerFormDraft(mode === 'edit' ? playerId : undefined),
  )

  function updateField<K extends keyof AdminPlayerFormDraft>(
    key: K,
    value: AdminPlayerFormDraft[K],
  ) {
    setDraft((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  function handleCancel() {
    navigate('/yonetim/oyuncular')
  }

  function handleSave() {
    navigate('/yonetim/oyuncular')
  }

  const title = mode === 'edit' ? 'Oyuncuyu Düzenle' : 'Yeni Oyuncu Ekle'
  const description =
    mode === 'edit'
      ? 'Oyuncu lisans bilgilerini, fiziksel metriklerini ve sözleşme detaylarını güncelleyin.'
      : 'Yeni oyuncu lisans kaydı oluşturun. Temel kimlik, fizik ve sözleşme alanlarını doldurun.'

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
              <Link to="/yonetim/oyuncular" className="transition-colors hover:text-primary">
                Oyuncular
              </Link>
              <span>/</span>
              <span className="font-bold text-primary">{title}</span>
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
            <AdminPlayerFormFields draft={draft} onChange={updateField} />
          </div>
          <div className="lg:col-span-4">
            <AdminPlayerFormSidebar draft={draft} mode={mode} />
          </div>
        </div>
      </main>

      <footer className="sticky bottom-0 border-t border-outline-variant/50 bg-surface-container-lowest px-4 py-space-md sm:px-6 lg:px-12">
        <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-sm lg:flex-row lg:items-center lg:justify-between">
          {mode === 'edit' ? (
            <button
              type="button"
              className="font-label inline-flex items-center gap-1 text-label-md text-error uppercase transition-colors hover:underline"
            >
              <span className="material-symbols-outlined text-[18px]">delete_forever</span>
              Kaydı Kalıcı Olarak Sil
            </button>
          ) : (
            <p className="font-body text-body-sm text-on-surface-variant">
              Yeni oyuncu kaydı yayınlandığında kamu kadro listesinde görünür.
            </p>
          )}

          <div className="flex flex-col gap-space-sm sm:flex-row sm:items-center">
            <p className="font-body max-w-md text-body-sm text-on-surface-variant lg:text-right">
              Tüm değişiklikler anında genel kadro listesine ve kamu bültenine yansıyacaktır.
            </p>
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
                className="font-label inline-flex items-center gap-1 bg-primary-container px-space-md py-space-sm text-label-md font-bold tracking-wider text-on-primary uppercase transition-all hover:bg-primary"
              >
                <span className="material-symbols-outlined text-[18px]">check</span>
                Kaydet ve Yayınla
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
