import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AdminStatisticFormFields } from '../components/AdminStatisticFormFields'
import { AdminStatisticFormSidebar } from '../components/AdminStatisticFormSidebar'
import { getAdminStatisticFormDraft } from '../utils/adminStatisticPlaceholders'
import type { AdminStatisticFormDraft } from '../utils/adminStatisticTypes'

type AdminStatisticCreateEditPageProps = {
  mode?: 'create' | 'edit'
}

export function AdminStatisticCreateEditPage({
  mode: modeProp,
}: AdminStatisticCreateEditPageProps) {
  const { statisticId } = useParams<{ statisticId: string }>()
  const navigate = useNavigate()
  const mode = modeProp ?? (statisticId ? 'edit' : 'create')
  const [draft, setDraft] = useState<AdminStatisticFormDraft>(() =>
    getAdminStatisticFormDraft(mode === 'edit' ? statisticId : undefined),
  )

  function updateField<K extends keyof AdminStatisticFormDraft>(
    key: K,
    value: AdminStatisticFormDraft[K],
  ) {
    setDraft((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  function handleCancel() {
    navigate('/yonetim/istatistikler')
  }

  function handleSave() {
    navigate('/yonetim/istatistikler')
  }

  const title = mode === 'edit' ? 'İstatistik Düzenle' : 'Yeni İstatistik Ekle'

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
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <Link to="/yonetim/istatistikler" className="transition-colors hover:text-primary">
                İstatistikler
              </Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="font-bold text-primary uppercase">{title}</span>
            </nav>
            <h1 className="font-headline text-headline-lg font-extrabold tracking-tight text-primary uppercase">
              {title}
            </h1>
            <p className="font-body text-body-md text-on-surface-variant">
              <span className="font-bold text-primary">{draft.recordCode}</span>
              {' · '}
              Oyuncunun lig ve kupa müsabakalarındaki resmi maç performans metriklerini güncelleyin.
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
          <div className="lg:col-span-7">
            <AdminStatisticFormFields draft={draft} onChange={updateField} />
          </div>
          <div className="lg:col-span-5">
            <AdminStatisticFormSidebar draft={draft} />
          </div>
        </div>
      </main>

      <footer className="sticky bottom-0 border-t border-outline-variant/50 bg-surface-container-lowest px-4 py-space-md sm:px-6 lg:px-12">
        <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-sm lg:flex-row lg:items-center lg:justify-between">
          <p className="font-body flex items-start gap-1 text-body-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px]">sync</span>
            Yapılan değişiklikler anlık olarak taraftar web arayüzüne ve oyuncu profiline
            yansıtılacaktır.
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
              Değişiklikleri Kaydet
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
