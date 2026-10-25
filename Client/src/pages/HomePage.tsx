import { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { BrandLogo } from '../core/components/BrandLogo'
import { useAppSelector } from '../core/store/hooks'
import postService from '../features/posts/postService'

const HERO_BG = '/assets/backgrounds/home-page.jpeg'

export function HomePage() {
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const [tickerTitle, setTickerTitle] = useState(
    'Haftalık Taktik Kurulu: Hafta sonu derbisinde kanat varyasyonları değerlendiriliyor.',
  )

  useEffect(() => {
    let cancelled = false

    async function loadTicker() {
      const result = await postService.getRecent(1)

      if (cancelled) {
        return
      }

      const firstTitle = result.data?.items?.[0]?.title

      if (firstTitle) {
        setTickerTitle(firstTitle)
      }
    }

    void loadTicker()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
      <div className="flex w-full flex-col">
        {/* Hero */}
        <section className="relative -mt-16 flex h-[calc(100vh-4rem)] min-h-[560px] items-center justify-center overflow-hidden bg-primary pt-16 sm:-mt-20 sm:h-[calc(100vh-5rem)] sm:min-h-[640px] sm:pt-20">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${HERO_BG}')` }}
            role="img"
            aria-label="Papara Park stadyum atmosferi"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A040B] via-[#1A040B]/60 to-[#1A040B]/85" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#1A040B_80%)]" />

          <div className="relative z-10 mx-auto flex w-full max-w-[1360px] flex-col items-center px-4 text-center sm:px-6 lg:px-12">
            <div className="mb-space-sm flex items-center justify-center p-space-lg">
              <BrandLogo
                size={96}
                className="h-20 w-20 drop-shadow-2xl sm:h-24 sm:w-24"
              />
            </div>

            <div className="mb-space-xs flex items-center gap-space-xs">
              <span className="font-display select-none text-display-xl-mobile font-extrabold tracking-tight text-on-primary uppercase sm:text-display-xl">
                TRABZONLY
              </span>
              <span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-tertiary-fixed-dim shadow-[0_0_12px_rgba(247,189,91,0.8)] sm:mt-4 sm:h-3 sm:w-3" />
            </div>

            <span className="font-kicker mb-space-md text-kicker font-bold tracking-widest text-secondary-fixed-dim uppercase">
              BAĞIMSIZ TRABZONSPOR DİJİTAL TARAFTAR PLATFORMU
            </span>

            <h1 className="font-headline mb-space-md max-w-4xl text-headline-lg-mobile leading-none font-bold tracking-tight text-on-primary uppercase sm:text-headline-lg">
              Fırtınanın Kalbinde, Tek Yürek.
            </h1>

            <p className="font-body mx-auto mb-space-xl max-w-2xl text-body-md text-surface-variant opacity-95 sm:text-body-lg">
              Avni Aker&apos;in ruhundan Akyazı&apos;nın fırtınasına; bağımsız Trabzonspor
              taraftarının buluşma, taktik tartışma ve kadro kurma meydanı.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-space-md">
              <a
                href="#tribun-editoryal"
                className="flex items-center gap-space-xs rounded bg-primary-container px-6 py-3 font-headline text-sm font-bold tracking-wider text-on-primary uppercase shadow-xl transition-all hover:bg-primary sm:px-8 sm:py-4 sm:text-headline-sm"
              >
                <span>Keşfet</span>
                <span className="material-symbols-outlined text-lg">arrow_downward</span>
              </a>
              <RouterLink
                to={isAuthenticated ? '/kadrolar/olustur' : '/login'}
                className="rounded bg-surface-container-lowest/10 px-6 py-3 font-headline text-sm font-bold tracking-wider text-on-primary uppercase backdrop-blur-md transition-all hover:bg-surface-container-lowest/20 sm:px-8 sm:py-4 sm:text-headline-sm"
              >
                {isAuthenticated ? 'Kadro Kur' : 'Giriş Yap'}
              </RouterLink>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 left-0 w-full bg-[#1A040B]/90 px-4 py-space-sm backdrop-blur-md sm:px-6 lg:px-12">
            <div className="mx-auto flex max-w-[1360px] items-center justify-between text-surface-variant">
              <div className="flex min-w-0 items-center gap-space-sm">
                <span className="inline-block h-2 w-2 shrink-0 animate-ping rounded-full bg-secondary-fixed-dim" />
                <span className="font-kicker shrink-0 text-kicker tracking-widest text-secondary-fixed-dim uppercase">
                  CANLI AKIŞ:
                </span>
                <span className="font-body truncate text-body-sm text-surface-container-lowest">
                  {tickerTitle}
                </span>
              </div>
              <div className="font-kicker hidden items-center gap-space-md tracking-wider text-surface-variant uppercase md:flex">
                <span>61. DAKİKA KÜLTÜRÜ</span>
                <span className="text-tertiary-fixed-dim">★ 8 ŞAMPİYONLUK</span>
                <span>BİZE HER YER TRABZON</span>
              </div>
            </div>
          </div>
        </section>

        <div className="w-full bg-surface-container-low">
          {/* Section 1: Tribün ve Editöryal Ses */}
          <section
            id="tribun-editoryal"
            className="mx-auto max-w-[1360px] px-4 py-space-xl sm:px-6 lg:px-12"
          >
            <div className="relative overflow-hidden rounded-2xl border border-surface-container-high bg-surface-container-lowest p-space-lg text-on-surface shadow-xl md:p-space-xl">
              <div className="pointer-events-none absolute -top-24 -left-20 h-96 w-96 rounded-full bg-secondary-fixed/20 blur-3xl" />
              <div className="pointer-events-none absolute -right-20 -bottom-24 h-96 w-96 rounded-full bg-primary-fixed/30 blur-3xl" />

              <div className="relative z-10 grid grid-cols-1 items-center gap-space-xl lg:grid-cols-12">
                <div className="flex flex-col gap-space-md lg:col-span-7">
                  <div className="flex flex-wrap items-center gap-space-xs">
                    <span className="font-kicker flex items-center gap-1.5 rounded-full bg-gradient-to-r from-secondary-container to-secondary px-3 py-1 text-kicker font-black tracking-wider text-on-secondary-fixed uppercase shadow-md">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-on-secondary-fixed" />
                      BAĞIMSIZ TRİBÜN &amp; KALEM
                    </span>
                    <span className="text-xs font-bold tracking-widest text-secondary uppercase">
                      GÜNCEL EDİTÖRYAL
                    </span>
                  </div>

                  <h2 className="font-headline text-headline-lg-mobile leading-tight font-extrabold tracking-tight text-primary uppercase sm:text-headline-lg">
                    Tribün ve Editöryal Ses:
                    <br />
                    <span className="text-secondary">Fırtınayı Kaleminde Hisset</span>
                  </h2>

                  <p className="font-body max-w-xl text-body-md text-on-surface-variant sm:text-body-lg">
                    Avni Aker&apos;in hafızasından Papara Park&apos;ın fırtınalı gecelerine;
                    Trabzonspor taraftarlarının bağımsız maç analizleri, derinlikli taktik
                    makaleleri ve deplasman hatıraları burada tek bir kütüphanede buluşuyor.
                  </p>

                  <div className="grid grid-cols-1 gap-space-sm pt-space-xs sm:grid-cols-3">
                    <div className="group rounded-xl border border-surface-container-high bg-surface-container-low p-space-sm transition-all duration-300 hover:border-secondary hover:bg-surface-container">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="material-symbols-outlined text-xl text-secondary transition-transform group-hover:scale-110">
                          analytics
                        </span>
                        <span className="rounded bg-secondary-fixed px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-secondary uppercase">
                          Rapor
                        </span>
                      </div>
                      <span className="font-label block text-label-md font-bold text-on-surface">
                        Haftalık Taktik Yazıları
                      </span>
                      <span className="mt-1 block text-xs text-on-surface-variant">
                        Isı haritaları ve geçiş oyunu detayları
                      </span>
                    </div>
                    <div className="group rounded-xl border border-surface-container-high bg-surface-container-low p-space-sm transition-all duration-300 hover:border-tertiary-container hover:bg-surface-container">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="material-symbols-outlined text-xl text-tertiary-container transition-transform group-hover:scale-110">
                          history_edu
                        </span>
                        <span className="rounded bg-tertiary-fixed px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-tertiary uppercase">
                          Hafıza
                        </span>
                      </div>
                      <span className="font-label block text-label-md font-bold text-on-surface">
                        Avni Aker Arşivi
                      </span>
                      <span className="mt-1 block text-xs text-on-surface-variant">
                        Unutulmaz zaferler ve şampiyonluk anları
                      </span>
                    </div>
                    <div className="group rounded-xl border border-surface-container-high bg-surface-container-low p-space-sm transition-all duration-300 hover:border-primary hover:bg-surface-container">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="material-symbols-outlined text-xl text-primary transition-transform group-hover:scale-110">
                          directions_bus
                        </span>
                        <span className="rounded bg-primary-fixed px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-primary uppercase">
                          Sefer
                        </span>
                      </div>
                      <span className="font-label block text-label-md font-bold text-on-surface">
                        Deplasman Günlükleri
                      </span>
                      <span className="mt-1 block text-xs text-on-surface-variant">
                        Yollardaki bordo-mavi Karadeniz ruhu
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-space-md pt-space-sm">
                    <RouterLink
                      to="/gonderiler"
                      className="font-headline flex items-center gap-space-xs rounded-full bg-primary px-space-lg py-3.5 text-sm font-extrabold tracking-wider text-on-primary uppercase shadow-lg transition-all hover:scale-[1.02] hover:bg-primary-container active:scale-[0.99] sm:text-headline-sm"
                    >
                      <span>Tüm Gönderileri Keşfet</span>
                      <span className="material-symbols-outlined text-xl">arrow_forward</span>
                    </RouterLink>
                    <RouterLink
                      to={isAuthenticated ? '/gonderiler/yeni' : '/login'}
                      className="font-headline flex items-center gap-space-xs rounded-full border border-surface-container-high bg-surface-container-low px-space-lg py-3.5 text-sm font-bold tracking-wider text-on-surface uppercase transition-all hover:border-secondary hover:bg-surface-container sm:text-headline-sm"
                    >
                      <span className="material-symbols-outlined text-xl text-primary">
                        edit_note
                      </span>
                      <span>Analiz Yaz</span>
                    </RouterLink>
                  </div>
                </div>

                <div className="relative lg:col-span-5">
                  <div className="relative flex flex-col justify-between rounded-2xl border border-surface-container-high bg-surface-container-low p-space-lg shadow-lg">
                    <div className="mb-space-md flex items-center justify-between border-b border-surface-container-high pb-space-sm">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg text-tertiary-container">
                          auto_awesome
                        </span>
                        <span className="font-kicker text-kicker font-bold tracking-widest text-primary uppercase">
                          EDİTÖRYAL ETKİ
                        </span>
                      </div>
                      <span className="font-kicker rounded-full bg-secondary px-2.5 py-0.5 text-kicker font-black tracking-wider text-surface-container-lowest uppercase shadow">
                        CANLI TOPLULUK
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-baseline justify-between rounded-xl border border-surface-container-high bg-surface-container-lowest p-space-sm">
                        <div className="flex flex-col">
                          <span className="font-headline text-stat-counter font-black text-tertiary-container">
                            1.4K+
                          </span>
                          <span className="text-xs font-medium text-on-surface-variant">
                            Özgün Taktik Analizi
                          </span>
                        </div>
                        <span className="font-label text-right text-label-md font-semibold text-on-surface uppercase">
                          Bağımsız Yazı &amp; Taktik Rapor
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between rounded-xl border border-surface-container-high bg-surface-container-lowest p-space-sm">
                        <div className="flex flex-col">
                          <span className="font-headline text-stat-counter font-black text-secondary">
                            12K+
                          </span>
                          <span className="text-xs font-medium text-on-surface-variant">
                            Aktif Taraftar Tartışması
                          </span>
                        </div>
                        <span className="font-label text-right text-label-md font-semibold text-on-surface uppercase">
                          Yorum ve Değerlendirme
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between rounded-xl border border-surface-container-high bg-surface-container-lowest p-space-sm">
                        <div className="flex flex-col">
                          <span className="font-headline text-stat-counter font-black text-primary">
                            61
                          </span>
                          <span className="text-xs font-medium text-on-surface-variant">
                            Haftalık Periyot
                          </span>
                        </div>
                        <span className="font-label text-right text-label-md font-semibold text-on-surface uppercase">
                          Dakika Özel Bülteni
                        </span>
                      </div>
                    </div>

                    <div className="mt-space-md flex items-center justify-between border-t border-surface-container-high pt-space-sm text-xs font-semibold text-on-surface-variant">
                      <span className="flex items-center gap-1.5 font-bold text-secondary">
                        <span className="h-2 w-2 animate-ping rounded-full bg-secondary" />
                        Bordo Mavi Kalem Birliği
                      </span>
                      <span className="flex items-center gap-1 font-bold text-tertiary">
                        ★ Haftanın En İyi Yazısı Rozeti
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Fırtına Sahada */}
          <section
            id="oyuncu-reytingleri"
            className="mx-auto max-w-[1360px] px-4 py-space-xl sm:px-6 lg:px-12"
          >
            <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-[#27030e] via-[#3d0619] to-[#120207] p-space-lg text-on-primary shadow-2xl md:p-space-xl">
              <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-secondary/25 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-primary-container/40 blur-3xl" />

              <div className="relative z-10 grid grid-cols-1 items-center gap-space-xl lg:grid-cols-12">
                <div className="flex flex-col gap-space-md lg:col-span-7">
                  <div className="flex flex-wrap items-center gap-space-xs">
                    <span className="font-kicker flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-kicker font-black tracking-wider text-on-secondary uppercase shadow-md">
                      <span className="h-1.5 w-1.5 animate-ping rounded-full bg-white" />
                      CANLI TARAFTAR REYTİNGİ
                    </span>
                    <span className="text-xs font-bold tracking-widest text-secondary-fixed-dim uppercase">
                      SON MAÇ DEĞERLENDİRMESİ • 8.420+ OY
                    </span>
                  </div>

                  <h2 className="font-headline text-headline-lg-mobile leading-tight font-extrabold tracking-tight text-surface-container-lowest uppercase sm:text-headline-lg">
                    Fırtına Sahada:
                    <br />
                    <span className="bg-gradient-to-r from-[#ff8da3] via-secondary-fixed-dim to-[#ffd9df] bg-clip-text text-transparent">
                      Her Düdükte Söz Taraftarın
                    </span>
                  </h2>

                  <p className="font-body max-w-xl text-body-md text-surface-variant opacity-95 sm:text-body-lg">
                    Son düdük çaldığında mücadele tribünde bitmez. Avni Aker ve Akyazı ruhuyla her
                    oyuncunun pas isabetini, ikili mücadele hırsını ve forma aidiyetini oyla.
                    Haftanın yıldızını bağımsız taraftar konsensüsüyle belirle.
                  </p>

                  <div className="grid grid-cols-1 gap-space-sm pt-space-xs sm:grid-cols-3">
                    <div className="group rounded-xl border border-surface-container-lowest/15 bg-surface-container-lowest/10 p-space-sm backdrop-blur-md transition-all duration-300 hover:border-secondary-fixed-dim/50 hover:bg-surface-container-lowest/15">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="material-symbols-outlined text-xl text-secondary-fixed-dim transition-transform group-hover:scale-110">
                          how_to_vote
                        </span>
                        <span className="rounded bg-secondary-fixed-dim/20 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-secondary-fixed-dim uppercase">
                          10 Üzerinden
                        </span>
                      </div>
                      <span className="font-label block text-label-md font-bold text-surface-container-lowest">
                        Bireysel Puanlama
                      </span>
                      <span className="mt-1 block text-xs text-surface-variant/90">
                        11 oyuncu + teknik heyet reytingi
                      </span>
                    </div>
                    <div className="group rounded-xl border border-surface-container-lowest/15 bg-surface-container-lowest/10 p-space-sm backdrop-blur-md transition-all duration-300 hover:border-tertiary-fixed-dim/50 hover:bg-surface-container-lowest/15">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="material-symbols-outlined text-xl text-tertiary-fixed-dim transition-transform group-hover:scale-110">
                          military_tech
                        </span>
                        <span className="rounded bg-tertiary-fixed-dim/20 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-tertiary-fixed-dim uppercase">
                          Haftalık MVP
                        </span>
                      </div>
                      <span className="font-label block text-label-md font-bold text-surface-container-lowest">
                        Maçın Yıldızı
                      </span>
                      <span className="mt-1 block text-xs text-surface-variant/90">
                        Taraftar oylarıyla rozet ve kürsü
                      </span>
                    </div>
                    <div className="group rounded-xl border border-surface-container-lowest/15 bg-surface-container-lowest/10 p-space-sm backdrop-blur-md transition-all duration-300 hover:border-inverse-primary/50 hover:bg-surface-container-lowest/15">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="material-symbols-outlined text-xl text-inverse-primary transition-transform group-hover:scale-110">
                          analytics
                        </span>
                        <span className="rounded bg-inverse-primary/20 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-inverse-primary uppercase">
                          Rapor
                        </span>
                      </div>
                      <span className="font-label block text-label-md font-bold text-surface-container-lowest">
                        Konsensüs Grafiği
                      </span>
                      <span className="mt-1 block text-xs text-surface-variant/90">
                        Tribün analizleriyle harmanlanan veri
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-space-md pt-space-sm">
                    <RouterLink
                      to="/oyuncular"
                      className="font-headline flex items-center gap-space-xs rounded-full bg-gradient-to-r from-secondary-container via-secondary to-primary-container px-space-lg py-3.5 text-sm font-extrabold tracking-wider text-surface-container-lowest uppercase shadow-[0_4px_20px_rgba(18,100,142,0.4)] transition-all hover:scale-[1.02] hover:shadow-[0_6px_25px_rgba(18,100,142,0.6)] active:scale-[0.99] sm:text-headline-sm"
                    >
                      <span className="material-symbols-outlined text-xl">how_to_vote</span>
                      <span>Maçın Oyuncusunu ve Takımı Oyla</span>
                      <span className="material-symbols-outlined text-xl">arrow_forward</span>
                    </RouterLink>
                    <RouterLink
                      to="/oyuncular"
                      className="font-headline flex items-center gap-space-xs rounded-full border border-surface-container-lowest/30 bg-surface-container-lowest/10 px-space-lg py-3.5 text-sm font-bold tracking-wider text-surface-container-lowest uppercase backdrop-blur-md transition-all hover:border-surface-container-lowest/60 hover:bg-surface-container-lowest/20 sm:text-headline-sm"
                    >
                      <span className="material-symbols-outlined text-xl text-secondary-fixed-dim">
                        insights
                      </span>
                      <span>Haftanın Reytinglerini İncele</span>
                    </RouterLink>
                  </div>
                </div>

                <div className="relative lg:col-span-5">
                  <div className="relative flex flex-col justify-between rounded-2xl border border-surface-container-lowest/20 bg-surface-container-lowest/10 p-space-lg shadow-2xl backdrop-blur-xl">
                    <div className="mb-space-md flex items-center justify-between border-b border-surface-container-lowest/15 pb-space-sm">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg text-tertiary-fixed-dim">
                          sports_soccer
                        </span>
                        <span className="font-kicker text-kicker font-bold tracking-widest text-secondary-fixed-dim uppercase">
                          PAPARA PARK KONSENSÜSÜ
                        </span>
                      </div>
                      <span className="font-kicker flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-kicker font-black tracking-wider text-surface-container-lowest uppercase shadow">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                        SON KARŞILAŞMA
                      </span>
                    </div>

                    <div className="mb-space-sm flex items-center justify-between rounded-xl border border-surface-container-lowest/10 bg-surface-container-lowest/5 p-space-sm">
                      <div className="flex flex-col">
                        <span className="text-xs font-medium tracking-wider text-surface-variant uppercase">
                          Ortalama Takım Puanı
                        </span>
                        <div className="mt-0.5 flex items-baseline gap-2">
                          <span className="font-headline text-stat-counter font-black text-secondary-fixed-dim drop-shadow-[0_0_12px_rgba(140,206,253,0.5)]">
                            8.2
                          </span>
                          <span className="text-xs font-bold text-surface-variant">/ 10.0</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="flex items-center gap-1 rounded-full border border-tertiary-fixed-dim/40 bg-tertiary-fixed-dim/20 px-2.5 py-1 text-xs font-bold tracking-wider text-tertiary-fixed-dim uppercase">
                          <span className="material-symbols-outlined text-sm">star</span>
                          %86 MVP Konsensüsü
                        </span>
                        <span className="mt-1 text-[11px] text-surface-variant">
                          Uğurcan &amp; Banza Zirvede
                        </span>
                      </div>
                    </div>

                    <div className="space-y-space-xs">
                      <div className="rounded-xl border border-surface-container-lowest/10 bg-surface-container-lowest/5 p-space-sm">
                        <div className="mb-1 flex items-center justify-between">
                          <span className="font-label text-label-md font-semibold text-surface-container-lowest">
                            Hücum &amp; Bitiricilik Etkisi
                          </span>
                          <span className="font-headline text-headline-sm font-bold text-tertiary-fixed-dim">
                            8.7
                          </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-lowest/15">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-tertiary-fixed-dim"
                            style={{ width: '87%' }}
                          />
                        </div>
                      </div>
                      <div className="rounded-xl border border-surface-container-lowest/10 bg-surface-container-lowest/5 p-space-sm">
                        <div className="mb-1 flex items-center justify-between">
                          <span className="font-label text-label-md font-semibold text-surface-container-lowest">
                            Mücadele &amp; Pres Gücü
                          </span>
                          <span className="font-headline text-headline-sm font-bold text-secondary-fixed-dim">
                            9.1
                          </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-lowest/15">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-secondary-fixed-dim to-secondary-container"
                            style={{ width: '91%' }}
                          />
                        </div>
                      </div>
                      <div className="rounded-xl border border-surface-container-lowest/10 bg-surface-container-lowest/5 p-space-sm">
                        <div className="mb-1 flex items-center justify-between">
                          <span className="font-label text-label-md font-semibold text-surface-container-lowest">
                            Savunma &amp; Hat Kademesi
                          </span>
                          <span className="font-headline text-headline-sm font-bold text-inverse-primary">
                            7.9
                          </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-lowest/15">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-primary-container to-[#ff8da3]"
                            style={{ width: '79%' }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-space-md flex items-center justify-between border-t border-surface-container-lowest/15 pt-space-sm text-xs font-semibold text-surface-variant">
                      <span className="flex items-center gap-1.5 text-secondary-fixed">
                        <span className="h-2 w-2 animate-ping rounded-full bg-secondary-fixed" />
                        Oyunu Kullan, Haftanın 11&apos;ini Belirle
                      </span>
                      <span className="flex items-center gap-1 text-tertiary-fixed-dim">
                        ★ Trabzonly Taraftar Rozeti
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Taktik Tahtası */}
          <section
            id="taktik-tahtasi"
            className="mx-auto max-w-[1360px] px-4 py-space-xl sm:px-6 lg:px-12"
          >
            <div className="relative overflow-hidden rounded-2xl border border-surface-container-high bg-surface-container-lowest p-space-lg text-on-surface shadow-xl md:p-space-xl">
              <div className="pointer-events-none absolute -top-24 -left-20 h-96 w-96 rounded-full bg-secondary-fixed/20 blur-3xl" />
              <div className="pointer-events-none absolute -right-20 -bottom-24 h-96 w-96 rounded-full bg-primary-fixed/30 blur-3xl" />

              <div className="relative z-10 grid grid-cols-1 items-center gap-space-xl lg:grid-cols-12">
                <div className="flex flex-col gap-space-md lg:col-span-6">
                  <div className="flex items-center gap-space-xs">
                    <span className="font-kicker flex items-center gap-1.5 rounded-full border border-tertiary-fixed-dim/40 bg-tertiary-fixed px-3 py-1 text-kicker font-black tracking-widest text-on-tertiary-fixed uppercase">
                      <span className="material-symbols-outlined text-xs">tab</span>
                      İNTERAKTİF TAKTİK BENCH
                    </span>
                  </div>

                  <h2 className="font-headline text-headline-lg-mobile leading-tight font-extrabold tracking-tight text-primary uppercase sm:text-headline-lg">
                    Taktik Tahtası:
                    <br />
                    <span className="text-secondary">Senin 11&apos;in, Senin Taktik Aklın</span>
                  </h2>

                  <p className="font-body max-w-xl text-body-md text-on-surface-variant sm:text-body-lg">
                    Akyazı&apos;da kritik derbiye sen çıksan hangi formasyonu sahaya sürerdin?
                    4-3-3 hücum mu, yoksa geçiş odaklı 4-2-3-1 mi? Kadronu kur, sahaya diz, taktik
                    açıklamalarını ekle ve binlerce taraftardan puan topla.
                  </p>

                  <div className="grid grid-cols-1 gap-2 py-1 sm:grid-cols-3">
                    <div className="flex items-center gap-2 rounded-xl border border-surface-container-high bg-surface-container-low px-3 py-2 transition hover:border-secondary">
                      <span className="material-symbols-outlined text-lg text-secondary">
                        drag_indicator
                      </span>
                      <span className="text-xs font-bold text-on-surface">Sürükle-Bırak</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl border border-surface-container-high bg-surface-container-low px-3 py-2 transition hover:border-tertiary-container">
                      <span className="material-symbols-outlined text-lg text-tertiary-container">
                        thumb_up
                      </span>
                      <span className="text-xs font-bold text-on-surface">Topluluk Oyu</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl border border-surface-container-high bg-surface-container-low px-3 py-2 transition hover:border-secondary">
                      <span className="material-symbols-outlined text-lg text-secondary">share</span>
                      <span className="text-xs font-bold text-on-surface">Sosyal Kart</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
                    <RouterLink
                      to={isAuthenticated ? '/kadrolar/olustur' : '/login'}
                      className="font-headline flex items-center gap-space-xs rounded-full bg-primary px-space-lg py-3.5 text-sm font-extrabold tracking-wider text-on-primary uppercase shadow-lg transition-all hover:scale-[1.02] hover:bg-primary-container active:scale-[0.99] sm:text-headline-sm"
                    >
                      <span>Hemen Kendi Kadronu Kur</span>
                      <span className="material-symbols-outlined text-xl">arrow_forward</span>
                    </RouterLink>
                    <RouterLink
                      to="/kadrolar"
                      className="font-headline flex items-center gap-space-xs rounded-full border border-surface-container-high bg-surface-container-low px-space-lg py-3.5 text-sm font-bold tracking-wider text-on-surface uppercase transition-all hover:border-secondary hover:bg-surface-container sm:text-headline-sm"
                    >
                      <span className="material-symbols-outlined text-xl text-secondary">
                        grid_view
                      </span>
                      <span>Topluluk 11&apos;lerini Gör</span>
                    </RouterLink>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <div className="relative flex h-[410px] w-full flex-col justify-between overflow-hidden rounded-2xl border-2 border-secondary/30 bg-gradient-to-b from-[#0a2318] via-[#0d2a1d] to-[#071710] p-4 shadow-[0_0_35px_rgba(0,0,0,0.6)]">
                    <div className="pointer-events-none absolute inset-x-4 inset-y-4 rounded-lg border border-white/25" />
                    <div className="pointer-events-none absolute inset-x-4 top-1/2 h-px -translate-y-1/2 bg-white/25" />
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <div className="h-24 w-24 rounded-full border border-white/25" />
                    </div>
                    <div className="pointer-events-none absolute top-4 inset-x-1/4 h-16 rounded-b-md border-x border-b border-white/20" />
                    <div className="pointer-events-none absolute bottom-4 inset-x-1/4 h-16 rounded-t-md border-x border-t border-white/20" />

                    <div className="z-10 flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full border border-secondary-container/40 bg-[#0c1813]/85 px-3 py-1 shadow-lg backdrop-blur-md">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-secondary-fixed-dim" />
                        <span className="font-kicker text-kicker font-black text-secondary-fixed-dim uppercase">
                          4-3-3 OFANSİF DİZİLİŞ
                        </span>
                      </div>
                      <span className="rounded-full border border-white/10 bg-[#0c1813]/85 px-2.5 py-1 text-[11px] font-bold text-tertiary-fixed-dim backdrop-blur-md">
                        Papara Park Formasyonu
                      </span>
                    </div>

                    <div className="z-10 flex justify-around px-4">
                      {[
                        { initials: 'NW', name: 'Nwakaeme', accent: true },
                        { initials: 'SB', name: 'Banza', star: true },
                        { initials: 'EV', name: 'Višća', accent: true },
                      ].map((player) => (
                        <div
                          key={player.name}
                          className={[
                            'flex flex-col items-center',
                            player.star ? '-translate-y-1' : '',
                          ].join(' ')}
                        >
                          <div
                            className={[
                              'flex items-center justify-center rounded-full border-2 font-black text-xs shadow-[0_0_12px_rgba(140,206,253,0.7)]',
                              player.star
                                ? 'h-9 w-9 border-amber-300 bg-gradient-to-tr from-primary to-primary-container text-white shadow-[0_0_14px_rgba(255,177,192,0.8)]'
                                : 'h-8 w-8 border-white/60 bg-gradient-to-tr from-secondary to-secondary-container text-on-secondary-fixed',
                            ].join(' ')}
                          >
                            {player.initials}
                          </div>
                          <span className="mt-1 rounded bg-black/50 px-1.5 text-[11px] font-bold text-white backdrop-blur-xs">
                            {player.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="z-10 flex justify-around px-10">
                      {['Cham', 'Okay', 'Mendy'].map((name, index) => (
                        <div
                          key={name}
                          className={[
                            'flex flex-col items-center',
                            index === 1 ? 'translate-y-1' : '',
                          ].join(' ')}
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-secondary-container bg-surface-container-lowest text-xs font-black text-primary shadow-[0_0_10px_rgba(255,255,255,0.6)]">
                            {name.slice(0, 2).toUpperCase()}
                          </div>
                          <span className="mt-0.5 rounded bg-black/50 px-1.5 text-[10px] font-bold text-white">
                            {name}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="z-10 flex justify-around px-2">
                      {['Eren', 'Denswil', 'Batagov', 'Malheiro'].map((name) => (
                        <div key={name} className="flex flex-col items-center">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/60 bg-surface-container-lowest text-[10px] font-bold text-primary shadow">
                            {name.slice(0, 2).toUpperCase()}
                          </div>
                          <span className="mt-0.5 rounded bg-black/50 px-1 text-[9px] font-bold text-white">
                            {name}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="z-10 flex justify-center">
                      <div className="flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gradient-to-tr from-amber-400 to-amber-200 text-xs font-black text-on-tertiary-fixed shadow-[0_0_15px_rgba(247,189,91,0.8)]">
                          UÇ
                        </div>
                        <span className="mt-0.5 rounded bg-black/60 px-2 text-[10px] font-bold text-amber-300">
                          Uğurcan
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Tarihin Fırtınası / Quiz */}
          <section id="quizler" className="mx-auto max-w-[1360px] px-4 py-space-xl sm:px-6 lg:px-12">
            <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-[#27030e] via-[#3d0619] to-[#120207] p-space-lg text-on-primary shadow-2xl md:p-space-xl">
              <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-tertiary-fixed-dim/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-secondary/25 blur-3xl" />

              <div className="relative z-10 grid grid-cols-1 items-center gap-space-xl lg:grid-cols-12">
                <div className="flex flex-col gap-space-md lg:col-span-7">
                  <div className="flex flex-wrap items-center gap-space-xs">
                    <span className="font-kicker flex items-center gap-1.5 rounded-full border border-tertiary-fixed-dim/40 bg-tertiary-fixed-dim/20 px-3 py-1 text-kicker font-black tracking-widest text-tertiary-fixed-dim uppercase">
                      <span className="material-symbols-outlined text-sm text-tertiary-fixed-dim">
                        military_tech
                      </span>
                      TRABZONSPOR HAFIZA MERKEZİ
                    </span>
                    <span className="text-xs font-bold tracking-widest text-secondary-fixed-dim uppercase">
                      HAFTALIK ÖDÜLLÜ TRİVİA
                    </span>
                  </div>

                  <h2 className="font-headline text-headline-lg-mobile leading-tight font-extrabold tracking-tight text-surface-container-lowest uppercase sm:text-headline-lg">
                    Tarihin Fırtınası:
                    <br />
                    <span className="bg-gradient-to-r from-tertiary-fixed-dim via-[#ff8da3] to-secondary-fixed-dim bg-clip-text text-transparent">
                      Efsane Şampiyonluklar &amp; Tribün Kültürü
                    </span>
                  </h2>

                  <p className="font-body max-w-xl text-body-md text-surface-variant opacity-95 sm:text-body-lg">
                    1976 ihtilalinin kahramanlarından 2021-22 şampiyonluk zaferine, Avni Aker
                    koridorlarından Faroz sokaklarına kadar Trabzonspor tarihini ne kadar iyi
                    biliyorsun? Kendini sına, rozetleri topla ve taraftar liderlik kürsüsüne çık.
                  </p>

                  <div className="grid grid-cols-2 gap-space-xs pt-space-xs sm:grid-cols-4">
                    <div className="rounded-xl border border-surface-container-lowest/15 bg-surface-container-lowest/10 p-space-sm text-center backdrop-blur-md">
                      <span className="font-headline block text-headline-md font-black text-tertiary-fixed-dim drop-shadow-[0_0_12px_rgba(247,189,91,0.5)]">
                        ★ 8
                      </span>
                      <span className="text-[11px] font-bold tracking-wider text-surface-variant uppercase">
                        Şampiyonluk
                      </span>
                    </div>
                    <div className="rounded-xl border border-surface-container-lowest/15 bg-surface-container-lowest/10 p-space-sm text-center backdrop-blur-md">
                      <span className="font-headline block text-headline-md font-black text-secondary-fixed-dim drop-shadow-[0_0_12px_rgba(140,206,253,0.5)]">
                        500+
                      </span>
                      <span className="text-[11px] font-bold tracking-wider text-surface-variant uppercase">
                        Özgün Soru
                      </span>
                    </div>
                    <div className="rounded-xl border border-surface-container-lowest/15 bg-surface-container-lowest/10 p-space-sm text-center backdrop-blur-md">
                      <span className="font-headline block text-headline-md font-black text-inverse-primary drop-shadow-[0_0_12px_rgba(255,177,192,0.4)]">
                        61
                      </span>
                      <span className="text-[11px] font-bold tracking-wider text-surface-variant uppercase">
                        Kültür Rozeti
                      </span>
                    </div>
                    <div className="rounded-xl border border-surface-container-lowest/15 bg-surface-container-lowest/10 p-space-sm text-center backdrop-blur-md">
                      <span className="font-headline block text-headline-md font-black text-surface-container-lowest">
                        #1
                      </span>
                      <span className="text-[11px] font-bold tracking-wider text-surface-variant uppercase">
                        Kürsü Mücadelesi
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-space-md pt-space-sm">
                    <RouterLink
                      to="/quizler"
                      className="font-headline flex items-center gap-space-xs rounded-full border border-primary-fixed/30 bg-gradient-to-r from-primary-container via-[#7a1235] to-secondary px-space-lg py-3.5 text-sm font-extrabold tracking-wider text-on-primary uppercase shadow-[0_4px_25px_rgba(90,14,39,0.7)] transition-all hover:scale-[1.02] hover:shadow-[0_6px_30px_rgba(90,14,39,0.9)] active:scale-[0.99] sm:text-headline-sm"
                    >
                      <span>Tüm Quizleri Keşfet &amp; Hafızanı Test Et</span>
                      <span className="material-symbols-outlined text-xl">arrow_forward</span>
                    </RouterLink>
                    <RouterLink
                      to="/quizler"
                      className="font-headline flex items-center gap-space-xs rounded-full border border-surface-container-lowest/30 bg-surface-container-lowest/10 px-space-lg py-3.5 text-sm font-bold tracking-wider text-surface-container-lowest uppercase backdrop-blur-md transition-all hover:border-surface-container-lowest/60 hover:bg-surface-container-lowest/20 sm:text-headline-sm"
                    >
                      <span className="material-symbols-outlined text-xl text-secondary-fixed-dim">
                        leaderboard
                      </span>
                      <span>Haftalık Liderlik Tablosu</span>
                    </RouterLink>
                  </div>
                </div>

                <div className="flex flex-col gap-space-sm lg:col-span-5">
                  <div className="rounded-2xl border border-surface-container-lowest/20 bg-surface-container-lowest/10 p-space-md shadow-2xl backdrop-blur-xl">
                    <div className="mb-space-sm flex items-center justify-between border-b border-surface-container-lowest/15 pb-space-xs">
                      <span className="font-kicker flex items-center gap-1 text-kicker font-bold tracking-widest text-secondary-fixed-dim uppercase">
                        <span className="material-symbols-outlined text-sm text-tertiary-fixed-dim">
                          workspace_premium
                        </span>
                        KAZANILABİLİR KÜLTÜR ROZETLERİ
                      </span>
                      <span className="rounded border border-tertiary-fixed-dim/40 bg-tertiary-fixed-dim/20 px-2 py-0.5 text-[10px] font-bold text-tertiary-fixed-dim uppercase">
                        SEZON 2024
                      </span>
                    </div>

                    <div className="space-y-space-xs">
                      <div className="flex items-center justify-between rounded-xl border border-surface-container-lowest/10 bg-surface-container-lowest/5 p-space-sm transition-all hover:bg-surface-container-lowest/10">
                        <div className="flex items-center gap-space-sm">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 text-on-tertiary-fixed shadow-md">
                            <span className="material-symbols-outlined text-xl">trophy</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-label text-label-md font-bold text-surface-container-lowest">
                              Dozer Cemil Onur Rozeti
                            </span>
                            <span className="text-xs text-surface-variant">
                              Avni Aker Tarihini %100 Tamamlayanlara
                            </span>
                          </div>
                        </div>
                        <span className="font-mono text-xs font-bold text-tertiary-fixed-dim">
                          +250 Puan
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl border border-surface-container-lowest/10 bg-surface-container-lowest/5 p-space-sm transition-all hover:bg-surface-container-lowest/10">
                        <div className="flex items-center gap-space-sm">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-secondary to-secondary-container text-on-secondary shadow-md">
                            <span className="material-symbols-outlined text-xl">flare</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-label text-label-md font-bold text-surface-container-lowest">
                              2021-22 Şampiyonluk Muhafızı
                            </span>
                            <span className="text-xs text-surface-variant">
                              Şampiyonluk Kadro Testi Şampiyonu
                            </span>
                          </div>
                        </div>
                        <span className="font-mono text-xs font-bold text-secondary-fixed-dim">
                          +300 Puan
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl border border-surface-container-lowest/10 bg-surface-container-lowest/5 p-space-sm transition-all hover:bg-surface-container-lowest/10">
                        <div className="flex items-center gap-space-sm">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-primary to-primary-container text-on-primary shadow-md">
                            <span className="material-symbols-outlined text-xl">
                              local_fire_department
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-label text-label-md font-bold text-surface-container-lowest">
                              61. Dakika Meşale Rozeti
                            </span>
                            <span className="text-xs text-surface-variant">
                              Tribün &amp; Besteler Bilgi Testi
                            </span>
                          </div>
                        </div>
                        <span className="font-mono text-xs font-bold text-inverse-primary">
                          +180 Puan
                        </span>
                      </div>
                    </div>

                    <div className="mt-space-sm flex items-center justify-between border-t border-surface-container-lowest/15 pt-space-xs text-xs text-surface-variant">
                      <span className="flex items-center gap-1 font-medium">
                        <span className="material-symbols-outlined text-sm text-tertiary-fixed-dim">
                          verified_user
                        </span>
                        Haftalık 1.si Özel Dijital Şampiyonluk Rozeti Kazanır
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
