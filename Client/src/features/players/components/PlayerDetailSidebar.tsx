import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  careerClubs,
  rivalForwards,
  type PlayerProfile,
} from '../utils/playerDetailPlaceholders'

type PlayerDetailSidebarProps = {
  profile: PlayerProfile
}

export function PlayerDetailSidebar({ profile }: PlayerDetailSidebarProps) {
  const [pollChoice, setPollChoice] = useState<'yes' | 'no' | null>('yes')

  return (
          <aside className="flex flex-col gap-space-lg lg:col-span-4">
            <div className="flex flex-col gap-space-md bg-surface-container-lowest p-space-md shadow-sm">
              <div className="flex items-center justify-between pb-space-xs">
                <span className="font-kicker text-kicker font-bold tracking-widest text-secondary uppercase">
                  GÜNÜN TARAFTAR ANKETİ
                </span>
                <span className="font-kicker flex items-center gap-1 text-[10px] font-bold text-primary">
                  <span className="h-2 w-2 animate-ping rounded-full bg-secondary-container" />
                  AKTİF
                </span>
              </div>
              <h3 className="font-headline text-headline-sm leading-tight font-bold text-primary">
                {profile.name}&apos;nın bonservisi sezon sonu mutlaka alınmalı mı?
              </h3>
              <div className="flex flex-col gap-space-sm">
                <button
                  type="button"
                  onClick={() => setPollChoice('yes')}
                  className="flex cursor-pointer flex-col gap-1 bg-surface-container p-space-sm transition-colors hover:bg-surface-container-high"
                >
                  <div className="font-label flex justify-between text-label-md font-bold text-on-surface">
                    <span className="flex items-center gap-2">
                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-on-primary ${
                          pollChoice === 'yes' ? 'bg-primary' : 'bg-outline-variant'
                        }`}
                      >
                        ✓
                      </span>
                      Evet, Ne Pahasına Olursa Olsun
                    </span>
                    <span className="font-bold text-primary">%88</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden bg-surface-container-highest">
                    <div className="h-full w-[88%] bg-primary" />
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setPollChoice('no')}
                  className="flex cursor-pointer flex-col gap-1 bg-surface-container p-space-sm transition-colors hover:bg-surface-container-high"
                >
                  <div className="font-label flex justify-between text-label-md font-bold text-on-surface">
                    <span>Hayır, Maliyet Çok Yüksek</span>
                    <span className="font-bold text-on-surface-variant">%12</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden bg-surface-container-highest">
                    <div className="h-full w-[12%] bg-outline-variant" />
                  </div>
                </button>
              </div>
              <div className="font-kicker flex items-center justify-between pt-space-xs text-kicker text-on-surface-variant">
                <span>Toplam Oy: 9.420</span>
                <span className="font-bold text-secondary">Sonuçları İncele →</span>
              </div>
            </div>

            <div className="flex flex-col gap-space-sm bg-primary p-space-md text-on-primary shadow-md">
              <div className="flex items-center justify-between">
                <span className="font-kicker text-kicker font-bold tracking-widest text-secondary-container uppercase">
                  HÜCUM DİNAMİĞİ
                </span>
                <span className="material-symbols-outlined text-[18px] text-tertiary-fixed-dim">bolt</span>
              </div>
              <h3 className="font-headline text-headline-sm font-bold uppercase">
                Ölümcül Karadeniz Üçlüsü
              </h3>
              <p className="font-body text-body-sm text-on-primary/80">
                {profile.name}, Višća ve Nwakaeme aynı 11&apos;de çıktığında maç başı 2.35 gol
                ortalaması ve %76 galibiyet oranı.
              </p>
              <div className="mt-space-xs grid grid-cols-2 gap-space-sm">
                <div className="bg-primary-container/60 p-space-sm">
                  <span className="font-kicker block text-kicker text-secondary-fixed-dim uppercase">
                    Gol Ort.
                  </span>
                  <span className="font-headline text-headline-md font-extrabold">2.35</span>
                </div>
                <div className="bg-primary-container/60 p-space-sm">
                  <span className="font-kicker block text-kicker text-secondary-fixed-dim uppercase">
                    Galibiyet
                  </span>
                  <span className="font-headline text-headline-md font-extrabold">%76</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-space-md bg-surface-container-lowest p-space-md shadow-sm">
              <span className="font-kicker text-kicker font-bold tracking-widest text-secondary uppercase">
                KADRO İÇİ RAKİP / PAYLAŞIM
              </span>
              <div className="flex flex-col gap-space-sm">
                {rivalForwards.map((rival) => (
                  <div
                    key={rival.name}
                    className="flex items-center justify-between gap-space-sm bg-surface-container-low p-space-sm"
                  >
                    <div className="flex items-center gap-space-sm">
                      <div className="flex h-10 w-10 items-center justify-center bg-primary-container font-bold text-on-primary">
                        {rival.initials}
                      </div>
                      <div>
                        <span className="font-headline block text-sm font-bold text-primary">
                          {rival.name}
                        </span>
                        <span className="font-body text-body-sm text-on-surface-variant">
                          {rival.line}
                        </span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-outline">compare_arrows</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-space-md bg-surface-container-lowest p-space-md shadow-sm">
              <span className="font-kicker text-kicker font-bold tracking-widest text-secondary uppercase">
                KARİYER ARŞİVİ
              </span>
              <div className="relative flex flex-col gap-space-md border-l-2 border-l-border-subtle pl-space-md">
                {careerClubs.map((club) => (
                  <div key={club.club} className="relative">
                    <span className="absolute top-1 -left-[1.4rem] h-3 w-3 rounded-full bg-primary" />
                    <span className="font-headline block text-sm font-bold text-primary">
                      {club.club}
                    </span>
                    <span className="font-kicker text-kicker text-on-surface-variant uppercase">
                      {club.years}
                    </span>
                    <span className="font-body block text-body-sm text-on-surface">{club.record}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-space-sm bg-surface-container p-space-md shadow-sm">
              <span className="font-kicker text-kicker font-bold tracking-widest text-secondary uppercase">
                SONRAKİ RANDEVU
              </span>
              <h3 className="font-headline text-headline-sm font-bold text-primary uppercase">
                Papara Park&apos;ta Fırtına
              </h3>
              <p className="font-body text-body-sm text-on-surface-variant">
                Trabzonspor vs Galatasaray • Süper Lig • Cumartesi 20:00
              </p>
              <Link
                to="/kadrolar"
                className="font-label mt-space-xs inline-flex items-center gap-1 text-label-md font-bold tracking-wider text-primary uppercase hover:text-secondary"
              >
                Kadronu Kur
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </aside>
  )
}
