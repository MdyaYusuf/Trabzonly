import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { metricsService } from '@/features/metrics/metricsService'
import squadService from '../squadService'
import { SquadCreateIcon } from './SquadCreateIcon'

export function SquadsGalleryHero() {
  const [totalSquads, setTotalSquads] = useState<number | null>(null)
  const [topSquadId, setTopSquadId] = useState<string | null>(null)
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
        const topSquad = topRatedResult.data[0]
        setTopSquadId(topSquad.id)
        setTopSquadTitle(topSquad.title)
        setTopSquadRating(topSquad.averageRating)
      } else {
        setTopSquadId(null)
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
                TAKTİK ARŞİVİ & TRİBÜN STRATEJİSİ
              </span>
            </div>
            <h1 className="font-display text-headline-lg leading-[1.05] font-extrabold tracking-tight text-primary uppercase lg:text-display-xl">
              TARAFTAR KADROLARI
            </h1>
            <p className="font-body mt-space-sm max-w-2xl text-body-md text-on-surface-variant">
              Bordo-Mavi fırtınanın saha içi aklı. Topluluğun tasarladığı maç 11&apos;lerini keşfedin, oy
              vererek puanlayın, Karadeniz taktiğini kendi oyun planınızla şekillendirin.
            </p>
          </div>

          <div className="flex w-full shrink-0 flex-col gap-space-sm lg:w-[28rem]">
            <div className="grid grid-cols-4 gap-space-sm">
              <div className="col-span-1 flex flex-col justify-center bg-surface-container-low px-space-sm py-space-md sm:px-space-md">
                <span className="font-kicker text-kicker font-bold tracking-wide text-on-surface-variant uppercase">
                  Toplam Kadro
                </span>
                <span className="font-stat mt-1.5 text-headline-md font-extrabold text-primary lg:text-headline-lg">
                  {totalSquads == null ? '—' : totalSquads.toLocaleString('tr-TR')}
                </span>
                <span className="font-body mt-1 text-body-sm text-on-surface-variant">
                  Topluluk arşivi
                </span>
              </div>

              {topSquadId ? (
                <Link
                  to={`/kadrolar/${topSquadId}`}
                  className="col-span-3 flex min-w-0 flex-col justify-center bg-surface-container-low px-space-md py-space-md transition-colors hover:bg-surface-container-high"
                >
                  <span className="font-kicker text-kicker font-bold tracking-wide text-on-surface-variant uppercase">
                    En Yüksek Puanlı
                  </span>
                  <span className="font-headline mt-1.5 line-clamp-2 text-body-sm font-bold text-secondary">
                    {topSquadTitle}
                  </span>
                  <span className="font-body mt-1 text-body-sm text-on-surface-variant">
                    {topSquadRating == null
                      ? 'Puanlı kadro bekleniyor'
                      : `${topSquadRating.toFixed(1)} / 5.0 ortalama`}
                  </span>
                </Link>
              ) : (
                <div className="col-span-3 flex min-w-0 flex-col justify-center bg-surface-container-low px-space-md py-space-md">
                  <span className="font-kicker text-kicker font-bold tracking-wide text-on-surface-variant uppercase">
                    En Yüksek Puanlı
                  </span>
                  <span className="font-headline mt-1.5 line-clamp-2 text-body-sm font-bold text-secondary">
                    {topSquadTitle ?? 'Henüz kadro yok'}
                  </span>
                  <span className="font-body mt-1 text-body-sm text-on-surface-variant">
                    Puanlı kadro bekleniyor
                  </span>
                </div>
              )}
            </div>

            <Link
              to="/kadrolar/olustur"
              className="font-label flex w-full items-center justify-center gap-space-sm bg-primary-container px-space-lg py-space-sm text-label-md tracking-wider text-on-primary uppercase shadow-md transition-all duration-150 hover:bg-primary"
            >
              <SquadCreateIcon size={20} />
              <span>+ Kadro Oluştur</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
