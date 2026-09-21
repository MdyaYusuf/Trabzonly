import { Link } from 'react-router-dom'
import { quizListStats } from '../utils/quizListPlaceholders'

export function QuizListHero() {
  return (
    <header className="flex flex-col gap-space-lg">
      <div className="flex flex-wrap items-center justify-between gap-space-sm">
        <nav
          aria-label="Breadcrumb"
          className="font-label flex items-center gap-space-xs text-label-md text-on-surface-variant"
        >
          <Link to="/" className="transition-colors hover:text-primary">
            Ana Sayfa
          </Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="font-bold text-primary">Quizler</span>
        </nav>
        <div className="flex items-center gap-space-xs bg-surface-container px-space-md py-1">
          <span className="h-2 w-2 animate-pulse rounded-full bg-secondary-container" />
          <span className="font-kicker text-kicker font-bold tracking-widest text-primary uppercase">
            BORDO-MAVİ HAFIZA & TARAFTAR TESTLERİ
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 items-end gap-gutter lg:grid-cols-12">
        <div className="flex flex-col gap-space-sm lg:col-span-8">
          <h1 className="font-display text-headline-lg leading-none font-extrabold tracking-tight text-primary uppercase lg:text-display-xl">
            TRABZONSPOR QUİZLERİ & TRİBÜN HAFIZASI
          </h1>
          <p className="font-body max-w-3xl text-body-md text-on-surface-variant lg:text-body-lg">
            Efsane şampiyonluklardan unutulmaz derbilere, Karadeniz Fırtınası&apos;nın tarihini ne
            kadar iyi biliyorsun? Kendini test et, puanını kap, tribün sıralamasında yerini al!
          </p>
        </div>
        <div className="flex items-center justify-start gap-space-md lg:col-span-4 lg:justify-end">
          <div className="flex flex-col items-end bg-surface-container-highest px-space-md py-space-sm">
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              GÜNCEL SEZON
            </span>
            <span className="font-headline text-headline-sm font-bold text-primary">
              {quizListStats.seasonLabel}
            </span>
          </div>
          <div className="flex h-12 w-12 items-center justify-center bg-primary-container text-on-primary">
            <span
              className="material-symbols-outlined text-[28px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              quiz
            </span>
          </div>
        </div>
      </div>

      <div className="mt-space-sm grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center justify-between bg-surface-container-lowest p-space-md shadow-sm">
          <div className="flex flex-col">
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              Toplam Quiz
            </span>
            <span className="font-headline mt-1 text-headline-md font-bold text-primary">
              {quizListStats.totalQuizzes}
            </span>
          </div>
          <span className="material-symbols-outlined text-3xl text-secondary">library_books</span>
        </div>
        <div className="flex items-center justify-between bg-surface-container-lowest p-space-md shadow-sm">
          <div className="flex flex-col">
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              Toplam Çözülme
            </span>
            <span className="font-headline mt-1 text-headline-md font-bold text-primary">
              {quizListStats.totalSolves}
            </span>
          </div>
          <span className="material-symbols-outlined text-3xl text-secondary">groups</span>
        </div>
        <div className="flex items-center justify-between bg-surface-container-lowest p-space-md shadow-sm">
          <div className="flex flex-col">
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              Ortalama Başarı
            </span>
            <span className="font-headline mt-1 text-headline-md font-bold text-primary">
              {quizListStats.avgSuccess}
            </span>
          </div>
          <div className="relative flex items-center justify-center">
            <svg className="h-10 w-10 -rotate-90" viewBox="0 0 36 36" aria-hidden="true">
              <path
                className="text-surface-container-high"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="text-secondary"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray={`${quizListStats.avgSuccessPercent}, 100`}
                strokeLinecap="square"
                strokeWidth="4"
              />
            </svg>
            <span className="font-kicker absolute text-[10px] font-bold text-primary">
              {quizListStats.avgSuccessPercent}%
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between bg-primary-container p-space-md text-on-primary shadow-sm">
          <div className="flex flex-col">
            <span className="font-kicker text-kicker text-tertiary-fixed-dim uppercase">
              Haftanın Rekortmeni
            </span>
            <span className="font-headline mt-1 text-headline-md font-bold text-on-primary">
              {quizListStats.weeklyChampion}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-label text-label-md font-bold text-tertiary-fixed-dim">
              {quizListStats.weeklyScore}
            </span>
            <span className="font-kicker text-kicker text-on-primary/70 uppercase">Puan</span>
          </div>
        </div>
      </div>
    </header>
  )
}
