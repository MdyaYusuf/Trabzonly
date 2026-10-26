import { useEffect, useState } from 'react'
import { PageBreadcrumbHome } from '@/core/components/PageBreadcrumbHome'
import quizService from '../quizService'
import type { QuizPlatformStatsDto } from '../quizTypes'
import { formatQuizScore } from '../utils/quizFormat'

export function QuizListHero() {
  const [stats, setStats] = useState<QuizPlatformStatsDto | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadStats() {
      const result = await quizService.getPlatformStats()

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setStats(result.data)
      } else {
        setStats(null)
      }
    }

    void loadStats()

    return () => {
      cancelled = true
    }
  }, [])

  const avgPercent =
    stats == null ? null : Math.min(100, Math.max(0, Math.round(stats.averageScore)))

  return (
    <header className="flex flex-col gap-space-lg">
      <div className="flex flex-wrap items-center justify-between gap-space-sm">
        <nav
          aria-label="Breadcrumb"
          className="font-label flex items-center gap-space-xs text-label-md text-on-surface-variant"
        >
          <PageBreadcrumbHome />
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
              {stats == null ? '—' : stats.totalQuizzes.toLocaleString('tr-TR')}
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
              {stats == null ? '—' : stats.totalCompletions.toLocaleString('tr-TR')}
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
              {stats == null ? '—' : `%${formatQuizScore(stats.averageScore)}`}
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
                strokeDasharray={`${avgPercent ?? 0}, 100`}
                strokeLinecap="square"
                strokeWidth="4"
              />
            </svg>
            <span className="font-kicker absolute text-[10px] font-bold text-primary">
              {avgPercent == null ? '—' : `${avgPercent}%`}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between bg-primary-container p-space-md text-on-primary shadow-sm">
          <div className="flex flex-col">
            <span className="font-kicker text-kicker text-tertiary-fixed-dim uppercase">
              Lider
            </span>
            <span className="font-headline mt-1 line-clamp-1 text-headline-md font-bold text-on-primary">
              {stats?.topUsername?.trim() || 'Henüz yok'}
            </span>
          </div>
          <span
            className="material-symbols-outlined text-3xl text-tertiary-fixed-dim"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            emoji_events
          </span>
        </div>
      </div>
    </header>
  )
}
