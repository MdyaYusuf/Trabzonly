import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { metricsService } from '@/features/metrics/metricsService'
import squadService from '../squadService'

export function SquadsGalleryHero() {
  const [totalSquads, setTotalSquads] = useState<number | null>(null)
  const [topSquadTitle, setTopSquadTitle] = useState<string | null>(null)
  const [topSquadRating, setTopSquadRating] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadHeroStats() {
      const [metricsResult, topRatedResult] = await Promise.all([
        metricsService.getShellMetrics(),
        squadService.getTopRated(1),
      ])

      if (cancelled) {
        return
      }

      if (metricsResult.success && metricsResult.data) {
        setTotalSquads(metricsResult.data.totalSquadCount)
      }

      if (topRatedResult.success && topRatedResult.data && topRatedResult.data.length > 0) {
        setTopSquadTitle(topRatedResult.data[0].title)
        setTopSquadRating(topRatedResult.data[0].averageRating)
      } else {
        setTopSquadTitle(null)
        setTopSquadRating(null)
      }
    }

    void loadHeroStats()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="mx-auto w-full max-w-[1360px] px-4 pb-space-lg sm:px-6 lg:px-12">
      <div className="relative overflow-hidden bg-surface-container-lowest p-space-lg shadow-sm sm:p-space-xl">
        <div className="pointer-events-none absolute -right-12 -bottom-16 select-none text-primary opacity-[0.03]">
          <span className="font-display text-[120px] leading-none font-extrabold tracking-tighter sm:text-[180px] lg:text-[240px]">
            1967
          </span>
        </div>

        <div className="relative z-10 flex flex-col items-start justify-between gap-space-xl lg:flex-row lg:items-end">
          <div className="flex max-w-3xl flex-col">
            <div className="mb-space-sm flex items-center gap-space-xs">
              <span className="inline-block h-2.5 w-2.5 bg-primary-container" />
              <span className="font-kicker text-kicker font-bold tracking-widest text-primary-container uppercase">
                TAKTİK ARŞİVİ & TRİBÜN STRATEJİSİ
              </span>
            </div>
            <h1 className="font-display mb-space-sm text-headline-lg leading-[1.05] font-extrabold tracking-tight text-primary uppercase lg:text-display-xl">
              TARAFTAR TAKTİK KADROLARI &amp; 11&apos;LER
            </h1>
            <p className="font-body max-w-2xl text-body-md text-on-surface-variant lg:text-body-lg">
              Bordo-Mavi fırtınanın saha içi aklı. Topluluğun tasarladığı maç 11&apos;lerini keşfedin, oy
              vererek puanlayın, Karadeniz taktiğini kendi oyun planınızla şekillendirin.
            </p>
          </div>

          <div className="flex w-full shrink-0 flex-col items-stretch gap-space-md sm:flex-row sm:items-center lg:w-auto">
            <Link
              to="/kadrolar/olustur"
              className="font-label flex items-center justify-center gap-space-sm bg-primary-container px-space-lg py-space-md text-label-md tracking-wider text-on-primary uppercase shadow-md transition-all duration-150 hover:bg-primary"
            >
              <span className="material-symbols-outlined text-[20px]">draw</span>
              <span>+ Kadro Oluştur</span>
            </Link>
          </div>
        </div>

        <div className="mt-space-xl grid grid-cols-1 gap-space-md bg-surface-container-low p-space-md sm:grid-cols-2">
          <div className="flex flex-col bg-surface-container-lowest p-space-sm">
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              TOPLAM KADRO
            </span>
            <span className="font-stat mt-space-xs text-stat-counter font-extrabold text-primary">
              {totalSquads == null ? '—' : totalSquads.toLocaleString('tr-TR')}
            </span>
            <span className="font-body mt-space-xs text-body-sm text-on-surface-variant">
              Topluluk arşivi
            </span>
          </div>

          <div className="flex flex-col bg-surface-container-lowest p-space-sm">
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              EN YÜKSEK PUANLI
            </span>
            <span className="font-headline mt-space-xs line-clamp-1 text-headline-sm font-bold text-secondary">
              {topSquadTitle ?? 'Henüz kadro yok'}
            </span>
            <span className="font-body mt-space-xs text-body-sm text-on-surface-variant">
              {topSquadRating == null
                ? 'Puanlı kadro bekleniyor'
                : `${topSquadRating.toFixed(1)} / 5.0 ortalama`}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
