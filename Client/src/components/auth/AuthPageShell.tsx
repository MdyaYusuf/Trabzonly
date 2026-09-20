import type { ReactNode } from 'react'

const HERO_BG = '/assets/background.jpeg'

const stats = [
  { value: '61.000+', label: 'Aktif Yoldaş', valueClass: 'text-secondary-container' },
  { value: '8', label: 'Kupa & Yıldız', valueClass: 'text-tertiary-fixed-dim' },
  { value: '#1', label: 'Özgür Tribün', valueClass: 'text-surface' },
] as const

type AuthPageShellProps = {
  children: ReactNode
}

export function AuthPageShell({ children }: AuthPageShellProps) {
  return (
    <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
      <section className="relative flex min-h-[calc(100vh-4rem)] items-stretch overflow-hidden bg-surface sm:min-h-[calc(100vh-5rem)]">
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_BG}')` }}
          role="img"
          aria-label="Akyazı stadyum atmosferi"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-primary/60" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[1360px] flex-col justify-between px-4 py-space-xl sm:px-6 lg:px-12">
          <div className="flex w-full items-center justify-between pb-space-lg">
            <div className="flex items-center gap-space-sm rounded bg-primary/70 px-space-md py-space-xs shadow-sm backdrop-blur-sm">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-secondary-container" />
              <span className="font-kicker text-kicker font-bold tracking-widest text-on-primary uppercase">
                DİJİTAL TRİBÜN CANLI BAĞLANTISI
              </span>
            </div>
            <div className="hidden items-center gap-space-md lg:flex">
              <span className="font-kicker text-kicker tracking-widest text-surface-container-highest uppercase">
                TRABZONSPOR KÜLTÜRÜ &amp; ARŞİVİ
              </span>
              <span className="font-headline text-headline-sm text-tertiary-fixed-dim">★</span>
            </div>
          </div>

          <div className="my-auto grid grid-cols-1 items-center gap-gutter lg:grid-cols-12">
            <div className="flex flex-col gap-space-md pr-0 text-on-primary lg:col-span-7 lg:pr-space-lg">
              <div className="inline-flex items-center gap-space-xs">
                <span className="h-[2px] w-8 bg-secondary-container" />
                <span className="font-kicker text-kicker font-bold tracking-widest text-secondary-container uppercase">
                  1967 RUHU &amp; TAŞIDIĞI DEĞERLER
                </span>
              </div>

              <h1 className="font-display text-display-xl-mobile leading-[1.05] font-extrabold tracking-tight text-surface uppercase drop-shadow-md sm:text-display-xl">
                BİZİ BİZ <br />
                <span className="text-secondary-container">YAPAN</span> SEVDA.
              </h1>

              <p className="font-body max-w-xl text-body-md leading-relaxed font-normal text-surface-container-high drop-shadow sm:text-body-lg">
                Bağımsız Trabzonspor dijital taraftar topluluğuna hoş geldin. Hüseyin Avni Aker
                inancıyla, Akyazı tutkusuyla; taktik analizler, derin arşiv ve fırtınanın hakiki sesi
                tek çatı altında.
              </p>

              <div className="mt-space-xs grid max-w-lg grid-cols-1 gap-space-md pt-space-md sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col rounded bg-primary/50 p-space-sm shadow-sm backdrop-blur-md"
                  >
                    <span
                      className={`font-stat text-headline-md leading-none font-extrabold ${stat.valueClass}`}
                    >
                      {stat.value}
                    </span>
                    <span className="font-kicker mt-1 text-kicker tracking-wider text-surface-dim uppercase">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center lg:col-span-5 lg:justify-end">{children}</div>
          </div>

          <div className="flex w-full flex-col items-center justify-between pt-space-lg text-on-primary/75 md:flex-row">
            <p className="font-body text-center text-body-sm drop-shadow md:text-left">
              Bağımsız Trabzonspor taraftar topluluğudur. Resmi kulüp sitesi değildir.
            </p>
            <div className="font-kicker mt-space-xs flex flex-wrap items-center justify-center gap-space-md text-kicker tracking-widest text-surface-container-high uppercase drop-shadow md:mt-0">
              <span>TARAFTAR ETİĞİ</span>
              <span>•</span>
              <span>GİZLİLİK POLİTİKASI</span>
              <span>•</span>
              <span>TRABZONLU TRIBÜN ARŞİVİ</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

type AuthCardProps = {
  title: string
  subtitle: string
  children: ReactNode
}

export function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <div className="relative w-full max-w-[460px] bg-surface-container-lowest p-space-lg text-on-surface shadow-2xl sm:p-space-xl">
      <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-primary-container via-secondary to-primary-container" />

      <div className="flex items-center justify-between pt-space-xs pb-space-md">
        <div className="flex items-center gap-space-md">
          <div className="flex items-center justify-center rounded-lg bg-surface-container-low p-space-sm shadow-sm">
            <div className="flex h-12 w-10 flex-col items-center justify-center bg-primary-container/90 text-tertiary-fixed-dim sm:h-14 sm:w-12">
              <span className="text-xl leading-none">★</span>
              <span className="mt-0.5 font-kicker text-[8px] font-bold tracking-widest text-on-primary">
                1967
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-headline text-lg font-extrabold tracking-tight text-primary uppercase sm:text-headline-md">
              TRABZONLY
            </span>
            <span className="font-kicker -mt-1 text-kicker font-bold tracking-widest text-secondary uppercase">
              TARAFTAR PLATFORMU
            </span>
          </div>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container font-bold text-tertiary-fixed-dim shadow-inner">
          <span
            className="material-symbols-outlined text-[18px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1 pb-space-lg">
        <h2 className="font-headline text-headline-md font-bold tracking-tight text-on-surface">
          {title}
        </h2>
        <p className="font-body text-body-sm text-on-surface-variant">{subtitle}</p>
      </div>

      {children}

      <div className="mt-space-lg flex items-center justify-between pt-space-sm text-outline">
        <span className="font-kicker text-kicker font-bold tracking-widest text-on-surface-variant/70 uppercase">
          61. DAKİKA COŞKUSU
        </span>
        <div className="flex items-center gap-1 text-secondary">
          <span className="material-symbols-outlined text-[14px]">sports_soccer</span>
          <span className="font-kicker text-kicker font-bold uppercase">BORDO - MAVİ</span>
        </div>
      </div>
    </div>
  )
}
