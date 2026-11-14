import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import squadService from '../squadService'
import type { MySquadStatsDto } from '../squadTypes'
import { SquadCreateIcon } from './SquadCreateIcon'

export function MySquadsHero() {
  const [stats, setStats] = useState<MySquadStatsDto | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadStats() {
      const result = await squadService.getMyStats()

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
                TRABZONSPOR TAKTİK LABORATUVARI
              </span>
            </div>
            <h1 className="font-display text-headline-lg leading-[1.05] font-extrabold tracking-tight text-primary uppercase lg:text-display-xl">
              BENİM KADROLARIM
            </h1>
            <p className="font-body mt-space-sm max-w-2xl text-body-md text-on-surface-variant">
              Oluşturduğunuz taktik dizilişler, topluluk puanlamaları ve maç stratejileri. Bordo-Mavi
              fırtınayı saha içine yansıtın, taraftarın takdirine sunun.
            </p>
          </div>

          <div className="flex w-full shrink-0 flex-col gap-space-sm lg:w-[28rem]">
            <div className="grid grid-cols-3 gap-space-sm">
              <div className="flex h-36 flex-col justify-center bg-surface-container-low px-space-sm py-space-md sm:px-space-md">
                <span className="font-kicker text-kicker font-bold tracking-wide text-on-surface-variant uppercase">
                  Toplam Görüntülenme
                </span>
                <span className="font-stat mt-1.5 text-headline-sm font-extrabold text-primary sm:text-headline-md">
                  {stats == null ? '—' : stats.totalViewCount.toLocaleString('tr-TR')}
                </span>
                <span className="font-body mt-1 text-body-sm text-on-surface-variant">
                  Kadrolarınız
                </span>
              </div>

              <div className="flex h-36 flex-col justify-center bg-surface-container-low px-space-sm py-space-md sm:px-space-md">
                <span className="font-kicker text-kicker font-bold tracking-wide text-on-surface-variant uppercase">
                  Ortalama Puan
                </span>
                <span className="font-stat mt-1.5 text-headline-sm font-extrabold text-primary sm:text-headline-md">
                  {stats == null || stats.totalSquads === 0
                    ? '—'
                    : stats.averageRating.toFixed(1)}
                </span>
                <span className="font-body mt-1 text-body-sm text-on-surface-variant">
                  / 10.0 ortalama
                </span>
              </div>

              <div className="flex h-36 flex-col justify-center bg-surface-container-low px-space-sm py-space-md sm:px-space-md">
                <span className="font-kicker text-kicker font-bold tracking-wide text-on-surface-variant uppercase">
                  Toplam Kadro
                </span>
                <span className="font-stat mt-1.5 text-headline-sm font-extrabold text-primary sm:text-headline-md">
                  {stats == null ? '—' : stats.totalSquads.toLocaleString('tr-TR')}
                </span>
                <span className="font-body mt-1 text-body-sm text-on-surface-variant">
                  Dizilişleriniz
                </span>
              </div>
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
