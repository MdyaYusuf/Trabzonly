import { formatMarketValue } from '../utils/formatMarketValue'
import { placeholderPlayers } from '../utils/playerDirectoryPlaceholders'

type PlayerDirectoryHeroProps = {
  totalSquadValue: number
}

export function PlayerDirectoryHero({ totalSquadValue }: PlayerDirectoryHeroProps) {
  return (
      <section className="w-full bg-surface-container-low">
        <div className="mx-auto max-w-[1360px] px-4 pt-space-lg pb-space-md sm:px-6 lg:px-12">
          <div className="flex flex-col justify-between gap-space-lg pb-space-lg lg:flex-row lg:items-end">
            <div className="flex max-w-2xl flex-col gap-space-xs">
              <div className="flex flex-wrap items-center gap-space-xs">
                <span className="h-2 w-2 bg-secondary-container" />
                <span className="font-kicker text-kicker font-bold tracking-widest text-secondary uppercase">
                  RESMİ SÜPER LİG 2024/25 SEZONU
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
                    {placeholderPlayers.length} OYUNCU
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-gutter pt-space-sm md:grid-cols-12">
            <div className="group relative flex flex-col items-stretch justify-between overflow-hidden bg-surface-container-lowest shadow-sm sm:flex-row md:col-span-6">
              <div className="z-10 flex flex-1 flex-col justify-between p-space-lg">
                <div className="flex flex-col gap-space-xs">
                  <div className="flex flex-wrap items-center gap-space-xs">
                    <span className="bg-primary-container px-space-xs py-0.5 font-kicker text-kicker font-bold tracking-widest text-on-primary uppercase">
                      EN DEĞERLİ
                    </span>
                    <span className="font-kicker text-kicker font-bold text-secondary uppercase">
                      FORVET • #99
                    </span>
                  </div>
                  <h3 className="font-headline mt-1 text-headline-md font-bold tracking-tight text-primary uppercase">
                    Simon Banza
                  </h3>
                  <p className="font-body line-clamp-2 text-body-sm text-on-surface-variant">
                    Demokratik Kongolu santrfor, hücum hattında yarattığı fiziksel üstünlük ve ceza
                    sahası bitiriciliğiyle taraftarın güvenini kazandı.
                  </p>
                </div>
                <div className="mt-space-md flex items-end gap-space-lg bg-surface-container-low px-space-md py-space-xs pt-space-sm">
                  <div>
                    <span className="font-kicker block text-kicker text-on-surface-variant uppercase">
                      Piyasa Değeri
                    </span>
                    <span className="font-headline text-headline-md font-extrabold text-primary">
                      16.00M €
                    </span>
                  </div>
                  <div className="h-8 w-px bg-surface-container-highest" />
                  <div>
                    <span className="font-kicker block text-kicker text-on-surface-variant uppercase">
                      Süper Lig
                    </span>
                    <span className="font-headline text-headline-sm font-bold text-secondary">
                      12 Gol • 3 Asist
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative h-48 w-full shrink-0 overflow-hidden bg-gradient-to-br from-[#3f2900] to-[#1A040B] sm:h-auto sm:w-48">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-5xl font-extrabold text-white/20">#99</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent sm:bg-gradient-to-r" />
              </div>
            </div>

            <div className="group relative flex flex-col items-stretch justify-between overflow-hidden bg-surface-container-lowest shadow-sm sm:flex-row md:col-span-6">
              <div className="z-10 flex flex-1 flex-col justify-between p-space-lg">
                <div className="flex flex-col gap-space-xs">
                  <div className="flex flex-wrap items-center gap-space-xs">
                    <span className="bg-secondary px-space-xs py-0.5 font-kicker text-kicker font-bold tracking-widest text-on-secondary uppercase">
                      EN ÇOK YORUMLANAN
                    </span>
                    <span className="font-kicker text-kicker font-bold text-primary uppercase">
                      SAĞ KANAT • #7
                    </span>
                  </div>
                  <h3 className="font-headline mt-1 text-headline-md font-bold tracking-tight text-primary uppercase">
                    Edin Višća
                  </h3>
                  <p className="font-body line-clamp-2 text-body-sm text-on-surface-variant">
                    Trabzonspor hücum organizasyonlarının beyni ve asist makinesi. Taraftar
                    tribününde en yüksek taktiksel değerlendirme alan maestro.
                  </p>
                </div>
                <div className="mt-space-md flex items-end gap-space-lg bg-surface-container-low px-space-md py-space-xs pt-space-sm">
                  <div>
                    <span className="font-kicker block text-kicker text-on-surface-variant uppercase">
                      Topluluk Reytingi
                    </span>
                    <span className="font-headline flex items-center gap-1 text-headline-md font-extrabold text-tertiary-container">
                      <span
                        className="material-symbols-outlined text-headline-sm text-tertiary-fixed-dim"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>{' '}
                      8.8
                    </span>
                  </div>
                  <div className="h-8 w-px bg-surface-container-highest" />
                  <div>
                    <span className="font-kicker block text-kicker text-on-surface-variant uppercase">
                      Tribün Güncesi
                    </span>
                    <span className="font-headline text-headline-sm font-bold text-primary">
                      1.842 Yorum
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative h-48 w-full shrink-0 overflow-hidden bg-gradient-to-br from-[#12648e] to-[#1A040B] sm:h-auto sm:w-48">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-5xl font-extrabold text-white/20">#7</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent sm:bg-gradient-to-r" />
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}
