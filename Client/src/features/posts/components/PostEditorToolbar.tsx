import { Link } from 'react-router-dom'
import { PageBackButton } from '@/core/components/PageBackButton'
import { PageBreadcrumbHome } from '@/core/components/PageBreadcrumbHome'
import type { CategoryResponseDto } from '../../categories/categoryTypes'

type PostEditorToolbarProps = {
  mode: 'create' | 'edit'
  cancelTo: string
  title: string
  categoryId: number | ''
  categories: CategoryResponseDto[]
  isSubmitting: boolean
  canPublish: boolean
  onTitleChange: (value: string) => void
  onCategoryChange: (value: number | '') => void
  onPublish: () => void
}

export function PostEditorToolbar({
  mode,
  cancelTo,
  title,
  categoryId,
  categories,
  isSubmitting,
  canPublish,
  onTitleChange,
  onCategoryChange,
  onPublish,
}: PostEditorToolbarProps) {
  return (
    <section className="w-full bg-surface py-space-md">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-space-md px-4 sm:px-6 lg:px-12">
        <div className="flex flex-wrap items-center gap-space-md">
          <PageBackButton
            to={cancelTo}
            label={mode === 'edit' ? 'Gönderi detayına dön' : 'Gönderiler listesine dön'}
          />
          <nav
            aria-label="Breadcrumb"
            className="font-label flex flex-wrap items-center gap-space-xs text-label-md text-on-surface-variant"
          >
            <PageBreadcrumbHome />
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <Link to="/gonderiler" className="transition-colors hover:text-primary">
              Gönderiler
            </Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="font-bold text-primary">
              {mode === 'edit' ? 'Gönderiyi Düzenle' : 'Gönderi Oluştur'}
            </span>
          </nav>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-space-md">
          <div className="flex min-w-0 flex-col gap-0.5">
            <h1 className="font-headline text-headline-md font-bold tracking-tight text-primary uppercase">
              {mode === 'edit' ? 'Gönderiyi Düzenle' : 'Gönderi Oluştur'}
            </h1>
            <p className="font-body text-body-sm text-on-surface-variant">
              Sahadaki taktiği, tribün anısını veya transfer nabzını camia ile paylaş.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-space-sm">
            <Link
              to={cancelTo}
              className="font-label flex items-center gap-1 px-space-md py-space-xs text-label-md tracking-wider text-on-surface-variant uppercase transition-colors hover:text-error"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
              İptal
            </Link>
            <button
              type="button"
              onClick={onPublish}
              disabled={!canPublish || isSubmitting}
              className={
                canPublish && !isSubmitting
                  ? 'font-headline flex items-center gap-2 bg-primary-container px-space-lg py-space-xs text-label-md tracking-wider text-on-primary uppercase shadow-sm transition-all hover:bg-primary'
                  : 'font-headline flex cursor-not-allowed items-center gap-2 bg-surface-container-highest px-space-lg py-space-xs text-label-md tracking-wider text-on-surface-variant uppercase opacity-70'
              }
            >
              <span className="material-symbols-outlined text-[18px] text-secondary-container">
                send
              </span>
              {isSubmitting
                ? 'Kaydediliyor…'
                : mode === 'edit'
                  ? 'Güncelle'
                  : 'Yayınla'}
            </button>
          </div>
        </div>

        <div className="flex min-w-[280px] w-full items-center gap-space-sm bg-surface-container px-space-md py-space-xs">
          <span className="material-symbols-outlined text-primary">edit_square</span>
          <input
            className="font-headline w-full bg-transparent text-headline-sm font-bold tracking-tight text-on-surface placeholder-on-surface-variant/50 focus:outline-none lg:text-headline-md"
            placeholder="Gönderi Başlığı Yazın... (Örn: Akyazı'da Çift Forvet Presi)"
            type="text"
            maxLength={200}
            value={title}
            onChange={(event) => {
              onTitleChange(event.target.value)
            }}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="font-kicker shrink-0 pr-2 text-kicker font-bold text-on-surface-variant uppercase">
            Kategori:
          </span>
          {categories.length === 0 ? (
            <span className="font-label text-label-md text-on-surface-variant">
              Kategoriler yükleniyor…
            </span>
          ) : (
            categories.map((category) => {
              const isActive = category.id === categoryId

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => {
                    onCategoryChange(category.id)
                  }}
                  className={
                    isActive
                      ? 'font-label cursor-pointer bg-primary px-3 py-1 text-label-md text-on-primary uppercase shadow-sm transition-all'
                      : 'font-label cursor-pointer bg-surface-container px-3 py-1 text-label-md text-on-surface uppercase transition-all hover:bg-primary hover:text-on-primary'
                  }
                >
                  {category.name}
                </button>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}
