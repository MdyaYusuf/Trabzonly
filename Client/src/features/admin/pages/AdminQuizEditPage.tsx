import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AdminQuizEditFormFields } from '../components/AdminQuizEditFormFields'
import { AdminQuizEditSidebar } from '../components/AdminQuizEditSidebar'
import { getAdminQuizEditDraft } from '../utils/adminQuizPlaceholders'
import type { AdminQuizEditDraft } from '../utils/adminQuizTypes'

export function AdminQuizEditPage() {
  const { quizId } = useParams<{ quizId: string }>()
  const navigate = useNavigate()
  const [draft, setDraft] = useState<AdminQuizEditDraft>(() => getAdminQuizEditDraft(quizId))

  function updateField<K extends keyof AdminQuizEditDraft>(
    key: K,
    value: AdminQuizEditDraft[K],
  ) {
    setDraft((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  function removeTag(tagId: string) {
    setDraft((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag.id !== tagId),
    }))
  }

  function handleCancel() {
    navigate('/yonetim/quizler')
  }

  function handleSave() {
    navigate('/yonetim/quizler')
  }

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
              <Link to="/yonetim/quizler" className="transition-colors hover:text-primary">
                Quizler
              </Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="font-bold text-primary uppercase">{draft.recordCode}</span>
            </nav>
            <h1 className="font-headline text-headline-lg font-extrabold tracking-tight text-primary uppercase">
              Quiz Düzenle
            </h1>
            <p className="font-body text-body-md text-on-surface-variant">
              Mevcut taraftar quizinin meta verilerini, başlığını, yayın durumunu ve erişim
              kurallarını güncelleyin.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm">
            <button
              type="button"
              className="font-label inline-flex items-center gap-1 border border-error px-space-md py-space-sm text-label-md text-error uppercase transition-colors hover:bg-error-container"
            >
              <span className="material-symbols-outlined text-[18px]">delete</span>
              Quiz&apos;i Sil
            </button>
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
              Kaydet
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 items-start gap-gutter lg:grid-cols-12">
          <div className="lg:col-span-7">
            <AdminQuizEditFormFields
              draft={draft}
              onChange={updateField}
              onRemoveTag={removeTag}
            />
          </div>
          <div className="lg:col-span-5">
            <AdminQuizEditSidebar draft={draft} />
          </div>
        </div>
      </main>

      <footer className="sticky bottom-0 border-t border-outline-variant/50 bg-surface-container-lowest px-4 py-space-md sm:px-6 lg:px-12">
        <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-sm lg:flex-row lg:items-center lg:justify-between">
          <p className="font-body flex items-start gap-1 text-body-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px]">info</span>
            Yapılan değişiklikler anlık olarak Trabzonly web ve mobil quiz modülüne yansıtılacaktır.
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
              <span className="material-symbols-outlined text-[18px]">save</span>
              Değişiklikleri Kaydet
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
