import { Link } from 'react-router-dom'
import { formatMarketValue } from '../utils/formatMarketValue'
import type { PlayerCardData } from '../utils/playerDirectoryTypes'

type PlayerDirectoryHeroProps = {
  totalSquadValue: number
  activePlayerCount: number
  seasonLabel?: string | null
  topValued?: PlayerCardData | null
  mostCommented?: PlayerCardData | null
}

export function PlayerDirectoryHero({
  totalSquadValue,
  activePlayerCount,
  seasonLabel,
  topValued,
  mostCommented,
}: PlayerDirectoryHeroProps) {
  return (
    <section className="w-full bg-surface-container-low">
      <div className="mx-auto max-w-[1360px] px-4 pt-space-lg pb-space-md sm:px-6 lg:px-12">
        <div className="flex flex-col justify-between gap-space-lg pb-space-lg lg:flex-row lg:items-end">
          <div className="flex max-w-2xl flex-col gap-space-xs">
            <div className="flex flex-wrap items-center gap-space-xs">
              <span className="h-2 w-2 bg-secondary-container" />
              <span className="font-kicker text-kicker font-bold tracking-widest text-secondary uppercase">
                {seasonLabel?.trim() || 'GÜNCEL SEZON'}
              </span>
              <span className="text-label-md text-outline-variant">•</span>
              <span className="font-kicker text-kicker text-on-surface-variant uppercase">
                A TAKIM RAPORU
              </span>
            </div>
            <h1 className="font-display text-headline-lg leading-none font-black tracking-tight text-primary uppercase lg:text-display-xl">
              A TAKIM VE OYUNCU REHBERİ
            </h1>
            <p className="font-body mt-space-xs text-body-md leading-relaxed text-on-surface-variant lg:text-body-lg">
              Bordo-Mavi fırtınanın güncel kadrosu, taraftar reytingleri, piyasa değerleri ve detaylı
              istatistik analizleri. Bağımsız tribün gözüyle oyuncu değerlendirme merkezi.
            </p>
          </div>

          <div className="flex flex-col items-stretch gap-space-md bg-surface-container-lowest p-space-sm shadow-sm sm:flex-row sm:items-center">
            <div className="flex items-center gap-space-sm px-space-md py-space-xs">
              <span className="material-symbols-outlined text-headline-md text-secondary">shield</span>
              <div className="flex flex-col">
                <span className="font-kicker text-kicker text-on-surface-variant uppercase">
                  KADRO DEĞERİ
                </span>
                <span className="font-headline text-headline-sm font-bold text-primary">
                  {formatMarketValue(totalSquadValue)}
                </span>
              </div>
            </div>
            <div className="hidden h-10 w-px bg-surface-container-highest sm:block" />
            <div className="flex items-center gap-space-sm px-space-md py-space-xs">
              <span className="material-symbols-outlined text-headline-md text-tertiary-fixed-dim">
                groups
              </span>
              <div className="flex flex-col">
                <span className="font-kicker text-kicker text-on-surface-variant uppercase">
                  AKTİF FUTBOLCU
                </span>
                <span className="font-headline text-headline-sm font-bold text-primary">
                  {activePlayerCount} OYUNCU
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-gutter pt-space-sm md:grid-cols-12">
          {topValued ? (
            <Link
              to={`/oyuncular/${topValued.id}`}
              className="group relative flex flex-col items-stretch justify-between overflow-hidden bg-surface-container-lowest shadow-sm sm:flex-row md:col-span-6"
            >
              <div className="z-10 flex flex-1 flex-col justify-between p-space-lg">
                <div className="flex flex-col gap-space-xs">
                  <span className="w-fit bg-primary-container px-space-xs py-0.5 font-kicker text-kicker font-bold tracking-widest text-on-primary uppercase">
                    EN DEĞERLİ
                  </span>
                  <span className="font-kicker text-kicker font-bold text-secondary uppercase">
                    {topValued.positionLabel} • #{topValued.number || '—'}
                  </span>
                  <h3 className="font-headline mt-1 text-headline-md font-bold tracking-tight text-primary uppercase transition-colors group-hover:text-secondary">
                    {topValued.name}
                  </h3>
                  <p className="font-body line-clamp-2 text-body-sm text-on-surface-variant">
                    {topValued.description?.trim() ||
                      `${topValued.nationality} ${topValued.positionLabel.toLowerCase()}, A Takım kadrosunda.`}
                  </p>
                </div>
                <div className="mt-space-md flex items-end gap-space-lg bg-surface-container-low px-space-md py-space-xs pt-space-sm">
                  <div>
                    <span className="font-kicker block text-kicker text-on-surface-variant uppercase">
                      Piyasa Değeri
                    </span>
                    <span className="font-headline text-headline-md font-extrabold text-primary">
                      {formatMarketValue(topValued.marketValue)}
                    </span>
                  </div>
                  <div className="h-8 w-px bg-surface-container-highest" />
                  <div>
                    <span className="font-kicker block text-kicker text-on-surface-variant uppercase">
                      Sezon
                    </span>
                    <span className="font-headline text-headline-sm font-bold text-secondary">
                      {topValued.goals ?? 0} Gol • {topValued.assists ?? 0} Asist
                    </span>
                  </div>
                </div>
              </div>
              <div
                className={`relative h-48 w-full shrink-0 overflow-hidden bg-gradient-to-br ${topValued.tone} sm:h-auto sm:w-48`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-5xl font-extrabold text-white/20">
                    #{topValued.number || '—'}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent sm:bg-gradient-to-r" />
              </div>
            </Link>
          ) : null}

          {mostCommented ? (
            <Link
              to={`/oyuncular/${mostCommented.id}`}
              className="group relative flex flex-col items-stretch justify-between overflow-hidden bg-surface-container-lowest shadow-sm sm:flex-row md:col-span-6"
            >
              <div className="z-10 flex flex-1 flex-col justify-between p-space-lg">
                <div className="flex flex-col gap-space-xs">
                  <span className="w-fit bg-secondary px-space-xs py-0.5 font-kicker text-kicker font-bold tracking-widest text-on-secondary uppercase">
                    EN ÇOK YORUMLANAN
                  </span>
                  <span className="font-kicker text-kicker font-bold text-primary uppercase">
                    {mostCommented.positionLabel} • #{mostCommented.number || '—'}
                  </span>
                  <h3 className="font-headline mt-1 text-headline-md font-bold tracking-tight text-primary uppercase transition-colors group-hover:text-secondary">
                    {mostCommented.name}
                  </h3>
                  <p className="font-body line-clamp-2 text-body-sm text-on-surface-variant">
                    {mostCommented.description?.trim() ||
                      'Tribünde en çok konuşulan A Takım oyuncularından.'}
                  </p>
                </div>
                <div className="mt-space-md flex items-end gap-space-lg bg-surface-container-low px-space-md py-space-xs pt-space-sm">
                  <div>
                    <span className="font-kicker block text-kicker text-on-surface-variant uppercase">
                      Taraftar Puanı
                    </span>
                    <span className="font-headline flex items-center gap-1 text-headline-md font-extrabold text-tertiary-container">
                      <span
                        className="material-symbols-outlined text-headline-sm text-tertiary-fixed-dim"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>{' '}
                      {mostCommented.rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="h-8 w-px bg-surface-container-highest" />
                  <div>
                    <span className="font-kicker block text-kicker text-on-surface-variant uppercase">
                      Tribün Güncesi
                    </span>
                    <span className="font-headline text-headline-sm font-bold text-primary">
                      {mostCommented.commentCount.toLocaleString('tr-TR')} Yorum
                    </span>
                  </div>
                </div>
              </div>
              <div
                className={`relative h-48 w-full shrink-0 overflow-hidden bg-gradient-to-br ${mostCommented.tone} sm:h-auto sm:w-48`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-5xl font-extrabold text-white/20">
                    #{mostCommented.number || '—'}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent sm:bg-gradient-to-r" />
              </div>
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  )
}
