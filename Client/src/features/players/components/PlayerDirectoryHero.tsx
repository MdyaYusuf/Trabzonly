import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SquadCreateIcon } from '@/features/squads/components/SquadCreateIcon'
import playerService from '../playerService'
import { formatMarketValue } from '../utils/formatMarketValue'

export function PlayerDirectoryHero() {
  const [seasonLabel, setSeasonLabel] = useState<string | null>(null)
  const [totalSquadValue, setTotalSquadValue] = useState<number | null>(null)
  const [topPlayerId, setTopPlayerId] = useState<number | null>(null)
  const [topPlayerName, setTopPlayerName] = useState<string | null>(null)
  const [topPlayerEngagement, setTopPlayerEngagement] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadHeroStats() {
      const [overviewResult, mostEngagedResult] = await Promise.all([
        playerService.getRosterOverview(),
        playerService.getMostEngaged(1),
      ])

      if (cancelled) {
        return
      }

      if (overviewResult.success && overviewResult.data) {
        setTotalSquadValue(overviewResult.data.totalMarketValue)
        setSeasonLabel(overviewResult.data.currentSeasonName ?? null)
      }

      if (
        mostEngagedResult.success &&
        mostEngagedResult.data &&
        mostEngagedResult.data.length > 0
      ) {
        const topPlayer = mostEngagedResult.data[0]
        setTopPlayerId(topPlayer.id)
        setTopPlayerName(topPlayer.name)
        setTopPlayerEngagement(topPlayer.ratingCount + topPlayer.commentCount)
      } else {
        setTopPlayerId(null)
        setTopPlayerName(null)
        setTopPlayerEngagement(null)
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
            <div className="mb-space-xs flex flex-wrap items-center gap-space-xs">
              <span className="inline-block h-2.5 w-2.5 bg-primary-container" />
              <span className="font-kicker text-kicker font-bold tracking-widest text-primary-container uppercase">
                {seasonLabel?.trim() || 'GÜNCEL SEZON'}
              </span>
              <span className="text-label-md text-outline-variant">•</span>
              <span className="font-kicker text-kicker text-on-surface-variant uppercase">
                A TAKIM RAPORU
              </span>
            </div>
            <h1 className="font-display text-headline-lg leading-[1.05] font-extrabold tracking-tight text-primary uppercase lg:text-display-xl">
              TRABZONSPOR KADROSU
            </h1>
            <p className="font-body mt-space-sm max-w-2xl text-body-md text-on-surface-variant">
              Bordo-Mavi fırtınanın güncel kadrosu, taraftar reytingleri, piyasa değerleri ve detaylı
              istatistik analizleri. Bağımsız tribün gözüyle oyuncu değerlendirme merkezi.
            </p>
          </div>

          <div className="flex w-full shrink-0 flex-col gap-space-sm lg:w-[28rem]">
            <div className="grid grid-cols-2 items-stretch gap-space-sm">
              <div className="flex h-36 min-w-0 flex-col justify-center bg-surface-container-low px-space-md py-space-md">
                <span className="font-kicker text-kicker font-bold whitespace-nowrap text-on-surface-variant uppercase">
                  Kadro Değeri
                </span>
                <span className="font-stat mt-1.5 text-headline-sm font-extrabold whitespace-nowrap text-primary sm:text-headline-md">
                  {totalSquadValue == null ? '—' : formatMarketValue(totalSquadValue)}
                </span>
                <span className="font-body mt-1 text-body-sm text-on-surface-variant">
                  Toplam Piyasa Değeri
                </span>
              </div>

              {topPlayerId != null ? (
                <Link
                  to={`/oyuncular/${topPlayerId}`}
                  className="flex h-36 min-w-0 flex-col justify-center bg-surface-container-low px-space-md py-space-md transition-colors hover:bg-surface-container-high"
                >
                  <span className="font-kicker text-kicker font-bold tracking-wide text-on-surface-variant uppercase">
                    En Çok Etkileşim Alan
                  </span>
                  <span className="font-headline mt-1.5 line-clamp-2 text-body-sm font-bold text-secondary">
                    {topPlayerName}
                  </span>
                  <span className="font-body mt-1 text-body-sm text-on-surface-variant">
                    {topPlayerEngagement == null
                      ? 'Etkileşim bekleniyor'
                      : `${topPlayerEngagement.toLocaleString('tr-TR')} etkileşim`}
                  </span>
                </Link>
              ) : (
                <div className="flex h-36 min-w-0 flex-col justify-center bg-surface-container-low px-space-md py-space-md">
                  <span className="font-kicker text-kicker font-bold tracking-wide text-on-surface-variant uppercase">
                    En Çok Etkileşim Alan
                  </span>
                  <span className="font-headline mt-1.5 line-clamp-2 text-body-sm font-bold text-secondary">
                    {topPlayerName ?? 'Henüz oyuncu yok'}
                  </span>
                  <span className="font-body mt-1 text-body-sm text-on-surface-variant">
                    Etkileşim bekleniyor
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
