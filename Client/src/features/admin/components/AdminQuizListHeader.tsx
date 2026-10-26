import { Link } from 'react-router-dom'

type AdminQuizListHeaderProps = {
  totalCount: number
  activeCount: number
  passiveCount: number
}

export function AdminQuizListHeader({
  totalCount,
  activeCount,
  passiveCount,
}: AdminQuizListHeaderProps) {
  return (
    <header className="flex flex-col gap-space-md">
      <div className="flex flex-col gap-space-md lg:flex-row lg:items-start lg:justify-between">
        <div className="flex max-w-3xl flex-col gap-space-xs">
          <span className="font-kicker bg-surface-container px-space-sm py-1 text-kicker text-on-surface-variant uppercase">
            Yönetim • Quizler
          </span>
          <h1 className="font-headline text-headline-lg font-extrabold tracking-tight text-primary uppercase">
            Quizler
          </h1>
          <p className="font-body text-body-md text-on-surface-variant">
            Taraftar quizlerini oluştur, düzenle ve yayınla.
          </p>
        </div>

        <Link
          to="/yonetim/quizler/yeni"
          className="font-label inline-flex items-center justify-center gap-space-xs bg-primary-container px-space-md py-space-sm text-label-md font-bold tracking-wider text-on-primary uppercase transition-all hover:bg-primary"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Quiz ekle
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-gutter sm:grid-cols-3">
        <article className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
          <div className="flex items-start justify-between">
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              Toplam Quiz
            </span>
            <span className="material-symbols-outlined text-secondary">quiz</span>
          </div>
          <p className="font-headline mt-space-sm text-headline-md font-extrabold text-primary">
            {totalCount.toLocaleString('tr-TR')}
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
            {activeCount.toLocaleString('tr-TR')}
          </p>
        </article>

        <article className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
          <div className="flex items-start justify-between">
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">Pasif</span>
            <span className="material-symbols-outlined text-secondary">pause_circle</span>
          </div>
          <p className="font-headline mt-space-sm text-headline-md font-extrabold text-primary">
            {passiveCount.toLocaleString('tr-TR')}
          </p>
        </article>
      </div>
    </header>
  )
}
