import { Link } from 'react-router-dom'
import { adminQuizListStats } from '../utils/adminQuizPlaceholders'

export function AdminQuizListHeader() {
  const stats = adminQuizListStats

  return (
    <header className="flex flex-col gap-space-md">
      <div className="flex flex-col gap-space-md lg:flex-row lg:items-start lg:justify-between">
        <div className="flex max-w-3xl flex-col gap-space-xs">
          <span className="font-kicker bg-surface-container px-space-sm py-1 text-kicker text-on-surface-variant uppercase">
            Kulüp Direktörlüğü • v2.4 • Canlı
          </span>
          <h1 className="font-headline text-headline-lg font-extrabold tracking-tight text-primary uppercase">
            Quizler
          </h1>
          <p className="font-body text-body-md text-on-surface-variant">
            Taraftar quizlerini oluştur ve yayınla.
          </p>
        </div>

        <div className="flex flex-wrap gap-space-sm">
          <button
            type="button"
            className="font-label inline-flex items-center gap-1 border border-outline-variant px-space-md py-space-sm text-label-md uppercase transition-colors hover:border-primary hover:text-primary"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            Dışa Aktar
          </button>
          <Link
            to="/yonetim/quizler/yeni"
            className="font-label inline-flex items-center justify-center gap-space-xs bg-primary-container px-space-md py-space-sm text-label-md font-bold tracking-wider text-on-primary uppercase transition-all hover:bg-primary"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            + Quiz ekle
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 xl:grid-cols-4">
        <article className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
          <div className="flex items-start justify-between">
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              Toplam Quiz
            </span>
            <span className="material-symbols-outlined text-secondary">quiz</span>
          </div>
          <p className="font-headline mt-space-sm text-headline-md font-extrabold text-primary">
            {stats.totalValue}
          </p>
          <p className="font-body mt-1 text-body-sm text-on-surface-variant">{stats.totalNote}</p>
          <p className="font-label mt-space-xs text-label-md text-on-surface">
            Arşiv Oranı <strong>{stats.archiveRate}</strong>
          </p>
        </article>

        <article className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
          <div className="flex items-start justify-between">
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              Aktif Yayında
            </span>
            <span className="material-symbols-outlined text-secondary">check_circle</span>
          </div>
          <p className="font-headline mt-space-sm text-headline-md font-extrabold text-primary">
            {stats.activeValue}
          </p>
          <p className="font-body mt-1 text-body-sm text-on-surface-variant">{stats.activeNote}</p>
          <p className="font-label mt-space-xs inline-flex items-center gap-1 text-label-md text-secondary">
            <span className="h-2 w-2 rounded-full bg-secondary-container" />
            Kapasite {stats.capacity}
          </p>
        </article>

        <article className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
          <div className="flex items-start justify-between">
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              Toplam Çözülme
            </span>
            <span className="material-symbols-outlined text-secondary">trending_up</span>
          </div>
          <p className="font-headline mt-space-sm text-headline-md font-extrabold text-primary tabular-nums">
            {stats.solvesValue}
          </p>
          <p className="font-body mt-1 text-body-sm text-on-surface-variant">{stats.solvesNote}</p>
          <p className="font-label mt-space-xs text-label-md text-secondary">
            Aylık Değişim {stats.monthlyChange}
          </p>
        </article>

        <article className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
          <div className="flex items-start justify-between">
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              Ortalama Başarı
            </span>
            <span className="material-symbols-outlined text-secondary">insights</span>
          </div>
          <p className="font-headline mt-space-sm text-headline-md font-extrabold text-primary tabular-nums">
            {stats.successValue}
          </p>
          <p className="font-body mt-1 text-body-sm text-on-surface-variant">{stats.successNote}</p>
          <p className="font-kicker mt-space-xs text-kicker text-on-surface-variant uppercase">
            Genel Skala {stats.successScale}
          </p>
        </article>
      </div>
    </header>
  )
}
