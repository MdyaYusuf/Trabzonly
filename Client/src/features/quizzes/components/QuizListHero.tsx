import { useEffect, useState } from 'react'
import quizService from '../quizService'
import type { QuizPlatformStatsDto } from '../quizTypes'

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

  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 pb-space-md sm:px-6 lg:px-12">
      <div className="relative overflow-hidden bg-surface-container-lowest p-space-md shadow-sm sm:p-space-lg">
        <div className="pointer-events-none absolute -right-10 -bottom-12 select-none text-primary opacity-[0.03]">
          <span className="font-display text-[100px] leading-none font-extrabold tracking-tighter sm:text-[160px]">
            1967
          </span>
        </div>

        <div className="relative z-10 flex flex-col gap-space-md lg:flex-row lg:items-stretch lg:justify-between lg:gap-space-xl">
          <div className="flex min-w-0 flex-1 flex-col justify-center">
            <div className="mb-space-xs flex items-center gap-space-xs">
              <span className="inline-block h-2.5 w-2.5 bg-primary-container" />
              <span className="font-kicker text-kicker font-bold tracking-widest text-primary-container uppercase">
                BORDO-MAVİ HAFIZA & TARAFTAR TESTLERİ
              </span>
            </div>
            <h1 className="font-display text-headline-lg leading-[1.05] font-extrabold tracking-tight text-primary uppercase lg:text-display-xl">
              TRABZONSPOR QUİZLERİ
            </h1>
            <p className="font-body mt-space-sm max-w-2xl text-body-md text-on-surface-variant">
              Efsane şampiyonluklardan unutulmaz derbilere, Karadeniz Fırtınası&apos;nın tarihini ne
              kadar iyi biliyorsun? Kendini test et, puanını kap, tribün sıralamasında yerini al!
            </p>
          </div>

          <div className="flex w-full shrink-0 flex-col gap-space-sm lg:w-[28rem]">
            <div className="grid grid-cols-2 gap-space-sm">
              <div className="flex h-36 flex-col justify-center bg-surface-container-low px-space-sm py-space-md sm:px-space-md">
                <span className="font-kicker text-kicker font-bold tracking-wide text-on-surface-variant uppercase">
                  Toplam Quiz
                </span>
                <span className="font-stat mt-1.5 text-headline-md font-extrabold text-primary lg:text-headline-lg">
                  {stats == null ? '—' : stats.totalQuizzes.toLocaleString('tr-TR')}
                </span>
                <span className="font-body mt-1 text-body-sm text-on-surface-variant">
                  Aktif testler
                </span>
              </div>

              <div className="flex h-36 min-w-0 flex-col justify-center bg-surface-container-low px-space-md py-space-md">
                <span className="font-kicker text-kicker font-bold tracking-wide text-on-surface-variant uppercase">
                  Lider
                </span>
                <span className="font-headline mt-1.5 line-clamp-2 text-body-sm font-bold text-secondary">
                  {stats?.topUsername?.trim() || 'Henüz yok'}
                </span>
                <span className="font-body mt-1 text-body-sm text-on-surface-variant">
                  Tribün sıralaması
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
