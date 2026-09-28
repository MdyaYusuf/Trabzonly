import { useEffect, useState, type ReactNode } from 'react'
import { metricsService } from '@/features/metrics/metricsService'
import type { ShellMetricsDto } from '@/features/metrics/metricsTypes'

const HERO_BG = '/assets/background.jpeg'

type ShellStat = {
  kicker: string
  value: string
  label: string
  valueClass: string
  kickerClass: string
}

const fallbackStats: ShellStat[] = [
  {
    kicker: 'TOPLULUK',
    value: '—',
    label: 'Aktif Kullanıcı',
    valueClass: 'text-on-primary',
    kickerClass: 'text-secondary-fixed',
  },
  {
    kicker: 'İÇERİK',
    value: '—',
    label: 'Toplam Gönderi',
    valueClass: 'text-on-primary',
    kickerClass: 'text-tertiary-fixed-dim',
  },
  {
    kicker: 'KADRO',
    value: '—',
    label: 'Kurulan Kadrolar',
    valueClass: 'text-on-primary',
    kickerClass: 'text-secondary-fixed',
  },
]

function formatStatCount(value: number): string {
  return value.toLocaleString('tr-TR')
}

function mapShellStats(data: ShellMetricsDto): ShellStat[] {
  return [
    {
      kicker: 'TOPLULUK',
      value: formatStatCount(data.activeUserCount),
      label: 'Aktif Kullanıcı',
      valueClass: 'text-on-primary',
      kickerClass: 'text-secondary-fixed',
    },
    {
      kicker: 'İÇERİK',
      value: formatStatCount(data.totalPostCount),
      label: 'Toplam Gönderi',
      valueClass: 'text-on-primary',
      kickerClass: 'text-tertiary-fixed-dim',
    },
    {
      kicker: 'KADRO',
      value: formatStatCount(data.totalSquadCount),
      label: 'Kurulan Kadrolar',
      valueClass: 'text-on-primary',
      kickerClass: 'text-secondary-fixed',
    },
  ]
}

type AuthPageShellProps = {
  children: ReactNode
  description?: string
  showSecurityBanner?: boolean
}

const DEFAULT_DESCRIPTION =
  'Bağımsız Trabzonspor dijital taraftar topluluğuna hoş geldin. Hüseyin Avni Aker inancıyla, Akyazı tutkusuyla; taktik analizler, derin arşiv ve fırtınanın hakiki sesi tek çatı altında.'

export function AuthPageShell({
  children,
  description = DEFAULT_DESCRIPTION,
  showSecurityBanner = false,
}: AuthPageShellProps) {
  const [stats, setStats] = useState<ShellStat[]>(fallbackStats)

  useEffect(() => {
    let cancelled = false

    async function loadStats() {
      try {
        const response = await metricsService.getShellMetrics()

        if (!cancelled && response.success && response.data) {
          setStats(mapShellStats(response.data))
        }
      } catch {
        // Keep fallback placeholders when stats are unavailable.
      }
    }

    void loadStats()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
      <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-primary sm:min-h-[calc(100vh-5rem)]">
        <div
          className="pointer-events-none absolute inset-0 scale-105 bg-cover bg-center opacity-40 mix-blend-luminosity"
          style={{ backgroundImage: `url('${HERO_BG}')` }}
          role="img"
          aria-label="Akyazı stadyum atmosferi"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary-container/85" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/40" />

        <div className="relative z-10 mx-auto flex w-full max-w-[1360px] flex-col justify-center px-4 py-space-xl sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-space-lg lg:grid-cols-12 lg:gap-gutter">
            <div className="flex flex-col gap-space-lg pr-0 text-on-primary lg:col-span-6 lg:pr-space-xl xl:col-span-7">
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center gap-space-xs">
                  <span className="h-2.5 w-2.5 bg-secondary-container" />
                  <span className="font-kicker text-kicker tracking-widest text-secondary-fixed uppercase">
                    1967 RUHU &amp; TAŞIDIĞI DEĞERLER
                  </span>
                </div>
                <h1 className="font-display text-display-xl-mobile leading-none font-extrabold tracking-tight text-on-primary uppercase sm:text-display-xl">
                  BİZİ BİZ <br />
                  <span className="text-secondary-fixed">YAPAN</span> <br />
                  <span className="text-primary-fixed">SEVDA.</span>
                </h1>
              </div>

              <p className="font-body max-w-xl text-body-md text-surface-container-high/90 sm:text-body-lg">
                {description}
              </p>

              <div className="grid max-w-lg grid-cols-1 gap-space-sm pt-space-xs sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col gap-space-xs bg-primary-container/80 p-space-md shadow-sm"
                  >
                    <span
                      className={`font-kicker text-kicker tracking-wider uppercase ${stat.kickerClass}`}
                    >
                      {stat.kicker}
                    </span>
                    <span
                      className={`font-headline text-headline-sm font-bold ${stat.valueClass}`}
                    >
                      {stat.value}
                    </span>
                    <span className="font-body text-body-sm text-surface-container-high/70">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-space-md pt-space-sm text-surface-variant/80">
                <span className="font-kicker text-kicker tracking-widest text-surface-variant uppercase">
                  KARADENİZ FIRTINASI TARAFTAR GÜVENCESİ
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-secondary-fixed" />
                <span className="font-kicker text-kicker tracking-widest text-surface-variant uppercase">
                  256-BİT SSL ŞİFRELEME
                </span>
              </div>
            </div>

            <div className="flex w-full flex-col lg:col-span-6 xl:col-span-5">{children}</div>
          </div>
        </div>

        {showSecurityBanner ? (
          <div className="absolute right-0 bottom-0 left-0 z-10 hidden items-center justify-between bg-primary/95 px-4 py-2.5 text-on-primary sm:flex sm:px-6 lg:px-12">
            <div className="flex items-center gap-space-md">
              <span className="h-2 w-2 animate-pulse rounded-full bg-secondary-container" />
              <span className="font-kicker text-kicker font-bold tracking-widest text-secondary-fixed uppercase">
                GÜVENLİK DUYURUSU
              </span>
              <span className="font-body text-body-sm text-surface-container-high/80">
                Trabzonly asla e-posta veya mesaj yoluyla şifrenizi talep etmez. Resmi bağlantıları
                teyit ediniz.
              </span>
            </div>
            <span className="font-kicker text-kicker tracking-widest text-surface-variant uppercase">
              TARAFTAR ÇEVRİMİÇİ
            </span>
          </div>
        ) : null}
      </section>
    </main>
  )
}

type AuthCardProps = {
  title?: string
  subtitle?: string
  brandKicker?: string
  children: ReactNode
  footer?: ReactNode
}

export function AuthCard({
  title,
  subtitle,
  brandKicker = 'TARAFTAR PLATFORMU',
  children,
  footer,
}: AuthCardProps) {
  return (
    <div className="relative flex w-full flex-col overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg text-on-surface shadow-2xl sm:p-space-xl">
      <div className="flex items-center gap-space-md pb-space-lg">
        <div className="flex h-14 w-12 shrink-0 items-center justify-center rounded-sm bg-surface-container p-1">
          <div className="flex h-full w-full flex-col items-center justify-center bg-primary-container/90 text-tertiary-fixed-dim">
            <span className="text-xl leading-none">★</span>
            <span className="mt-0.5 font-kicker text-[8px] font-bold tracking-widest text-on-primary">
              1967
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-headline text-headline-sm font-bold tracking-tight text-primary uppercase">
            TRABZONLY
          </span>
          <span className="font-kicker text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
            {brandKicker}
          </span>
        </div>
      </div>

      {title ? (
        <div className="mb-space-lg flex flex-col gap-space-xs">
          <h2 className="font-headline text-headline-md font-bold tracking-tight text-on-surface uppercase">
            {title}
          </h2>
          {subtitle ? (
            <p className="font-body text-body-md text-on-surface-variant">{subtitle}</p>
          ) : null}
        </div>
      ) : null}

      {children}

      {footer ?? (
        <div className="mt-space-md flex items-center justify-between pt-space-sm text-on-surface-variant">
          <span className="font-kicker text-kicker font-bold tracking-widest text-primary uppercase">
            61. DAKİKA COŞKUSU
          </span>
          <span className="font-kicker text-kicker font-bold tracking-widest text-secondary uppercase">
            BORDO - MAVİ
          </span>
        </div>
      )}
    </div>
  )
}

