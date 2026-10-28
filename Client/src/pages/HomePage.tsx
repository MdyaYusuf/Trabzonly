import { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { BrandLogo } from '../core/components/BrandLogo'
import { useAppSelector } from '../core/store/hooks'
import { PlayerCard } from '../features/players/components/PlayerCard'
import playerService from '../features/players/playerService'
import { mapPlayerToCardData } from '../features/players/utils/mapPlayerToCardData'
import type { PlayerCardData } from '../features/players/utils/playerDirectoryTypes'
import postService from '../features/posts/postService'
import type { PostPlatformStatsDto } from '../features/posts/postTypes'

const HERO_BG = '/assets/backgrounds/home-page.jpeg'

function formatStatCount(value: number): string {
  return value.toLocaleString('tr-TR')
}

const HERO_TICKER_CTA =
  'Gönderi yaz, kadro kur, quiz çöz veya oyuncuları puanla ve tribünün sesi ol.'

export function HomePage() {
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const [editorialStats, setEditorialStats] = useState<PostPlatformStatsDto | null>(null)
  const [featuredPlayer, setFeaturedPlayer] = useState<PlayerCardData | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadHomeHighlights() {
      const [statsResult, playersResult] = await Promise.all([
        postService.getPlatformStats(),
        playerService.getAll({ search: 'Salah', pageNumber: 1, pageSize: 1 }),
      ])

      if (cancelled) {
        return
      }

      if (statsResult.success && statsResult.data) {
        setEditorialStats(statsResult.data)
      }

      const salah = playersResult.data?.items?.[0]

      if (playersResult.success && salah) {
        setFeaturedPlayer(mapPlayerToCardData(salah))
      }
    }

    void loadHomeHighlights()

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
                to="/register"
                className="rounded bg-surface-container-lowest/10 px-6 py-3 font-headline text-sm font-bold tracking-wider text-on-primary uppercase backdrop-blur-md transition-all hover:bg-surface-container-lowest/20 sm:px-8 sm:py-4 sm:text-headline-sm"
              >
                Üye Ol
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
                  {HERO_TICKER_CTA}
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
                  </div>

                  <h2 className="font-headline text-headline-lg-mobile leading-tight font-extrabold tracking-tight text-primary uppercase sm:text-headline-lg">
                    Taraftarın Sesi Ol
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
                      <span className="font-label block text-center text-label-md font-bold text-on-surface">
                        Taktik Analizler ve Transferler
                      </span>
                      <span className="mt-1 block text-center text-xs text-on-surface-variant">
                        Taktik ve transfer değerlendirmeleri
                      </span>
                    </div>
                    <div className="group rounded-xl border border-surface-container-high bg-surface-container-low p-space-sm transition-all duration-300 hover:border-tertiary-container hover:bg-surface-container">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="material-symbols-outlined text-xl text-tertiary-container transition-transform group-hover:scale-110">
                          sports_soccer
                        </span>
                        <span className="rounded bg-tertiary-fixed px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-tertiary uppercase">
                          Performans
                        </span>
                      </div>
                      <span className="font-label block text-center text-label-md font-bold text-on-surface">
                        Maç Değerlendirmeleri ve Deplasmanlar
                      </span>
                      <span className="mt-1 block text-center text-xs text-on-surface-variant">
                        Unutulmaz zaferler ve şampiyonluk anları
                      </span>
                    </div>
                    <div className="group rounded-xl border border-surface-container-high bg-surface-container-low p-space-sm transition-all duration-300 hover:border-primary hover:bg-surface-container">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="material-symbols-outlined text-xl text-primary transition-transform group-hover:scale-110">
                          history_edu
                        </span>
                        <span className="rounded bg-primary-fixed px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-primary uppercase">
                          Hafıza
                        </span>
                      </div>
                      <span className="font-label block text-center text-label-md font-bold text-on-surface">
                        Tarihçe, Efsaneler ve Gündem
                      </span>
                      <span className="mt-1 block text-center text-xs text-on-surface-variant">
                        Geçmişten günümüze Trabzonspor
                      </span>
                    </div>
                  </div>

                  <div className="flex w-full flex-wrap items-center gap-space-sm pt-space-sm sm:flex-nowrap">
                    <RouterLink
                      to="/gonderiler"
                      className="font-headline flex min-w-0 flex-1 items-center justify-center gap-space-xs rounded-full bg-primary px-space-md py-3 text-sm font-extrabold tracking-wider text-on-primary uppercase shadow-lg transition-all hover:scale-[1.01] hover:bg-primary-container active:scale-[0.99]"
                    >
                      <span>Tüm Gönderileri Keşfet</span>
                      <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </RouterLink>
                    <RouterLink
                      to={isAuthenticated ? '/gonderiler/yeni' : '/login'}
                      className="font-headline flex min-w-0 flex-1 items-center justify-center gap-space-xs rounded-full border border-surface-container-high bg-surface-container-low px-space-md py-3 text-sm font-bold tracking-wider text-on-surface uppercase transition-all hover:border-secondary hover:bg-surface-container"
                    >
                      <span className="material-symbols-outlined text-lg text-primary">
                        edit_note
                      </span>
                      <span>Gönderi Oluştur</span>
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
                          <span className="font-headline text-stat-counter font-black text-tertiary-container tabular-nums">
                            {editorialStats
                              ? formatStatCount(editorialStats.totalPosts)
                              : '—'}
                          </span>
                          <span className="text-xs font-medium text-on-surface-variant">
                            Toplam Gönderi
                          </span>
                        </div>
                        <span className="font-label text-right text-label-md font-semibold text-on-surface uppercase">
                          Yayınlanan Yazılar
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between rounded-xl border border-surface-container-high bg-surface-container-lowest p-space-sm">
                        <div className="flex flex-col">
                          <span className="font-headline text-stat-counter font-black text-secondary tabular-nums">
                            {editorialStats
                              ? formatStatCount(editorialStats.totalComments)
                              : '—'}
                          </span>
                          <span className="text-xs font-medium text-on-surface-variant">
                            Toplam Yorum
                          </span>
                        </div>
                        <span className="font-label text-right text-label-md font-semibold text-on-surface uppercase">
                          Taraftar Tartışması
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between rounded-xl border border-surface-container-high bg-surface-container-lowest p-space-sm">
                        <div className="flex flex-col">
                          <span className="font-headline text-stat-counter font-black text-primary tabular-nums">
                            {editorialStats
                              ? formatStatCount(
                                  editorialStats.totalLikes + editorialStats.totalDislikes,
                                )
                              : '—'}
                          </span>
                          <span className="text-xs font-medium text-on-surface-variant">
                            Toplam Tepki
                          </span>
                        </div>
                        <span className="font-label text-right text-label-md font-semibold text-on-surface uppercase">
                          Gönderi Tepkileri
                        </span>
                      </div>
                    </div>

                    <div className="mt-space-md flex items-center justify-between border-t border-surface-container-high pt-space-sm text-xs font-semibold text-on-surface-variant">
                      <span className="flex items-center gap-1.5 font-bold text-secondary">
                        <span className="h-2 w-2 animate-ping rounded-full bg-secondary" />
                        Bordo Mavi Kalem Birliği
                      </span>
                      <span className="flex items-center gap-1 font-bold text-tertiary">
                        ★ Anketli Gönderi
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
                    <span className="font-kicker flex items-center gap-1.5 rounded-full bg-gradient-to-r from-secondary-container to-secondary px-3 py-1 text-kicker font-black tracking-wider text-on-secondary-fixed uppercase shadow-md">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-on-secondary-fixed" />
                      Trabzonspor Oyuncuları
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
                    <div className="group rounded-xl border border-surface-container-lowest/15 bg-surface-container-lowest/10 p-space-sm text-center backdrop-blur-md transition-all duration-300 hover:border-secondary-fixed-dim/50 hover:bg-surface-container-lowest/15">
                      <span className="material-symbols-outlined mb-2 inline-block text-[28px] text-secondary-fixed-dim transition-transform group-hover:scale-110">
                        visibility
                      </span>
                      <span className="font-label block text-label-md font-bold text-surface-container-lowest">
                        Oyunculara Göz At
                      </span>
                      <span className="mt-1 block text-xs text-surface-variant/90">
                        Kadro ve oyuncu profillerini keşfet
                      </span>
                    </div>
                    <div className="group rounded-xl border border-surface-container-lowest/15 bg-surface-container-lowest/10 p-space-sm text-center backdrop-blur-md transition-all duration-300 hover:border-tertiary-fixed-dim/50 hover:bg-surface-container-lowest/15">
                      <span className="material-symbols-outlined mb-2 inline-block text-[28px] text-tertiary-fixed-dim transition-transform group-hover:scale-110">
                        analytics
                      </span>
                      <span className="font-label block text-label-md font-bold text-surface-container-lowest">
                        İstatistikleri İncele
                      </span>
                      <span className="mt-1 block text-xs text-surface-variant/90">
                        Gol, asist ve sezon verilerini karşılaştır
                      </span>
                    </div>
                    <div className="group rounded-xl border border-surface-container-lowest/15 bg-surface-container-lowest/10 p-space-sm text-center backdrop-blur-md transition-all duration-300 hover:border-inverse-primary/50 hover:bg-surface-container-lowest/15">
                      <span className="material-symbols-outlined mb-2 inline-block text-[28px] text-inverse-primary transition-transform group-hover:scale-110">
                        rate_review
                      </span>
                      <span className="font-label block text-label-md font-bold text-surface-container-lowest">
                        Puanla ve Yorumla
                      </span>
                      <span className="mt-1 block text-xs text-surface-variant/90">
                        Formu puanla, düşünceni tribüne bırak
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-space-md pt-space-sm">
                    <RouterLink
                      to="/oyuncular"
                      className="font-headline flex items-center gap-space-xs rounded-full bg-gradient-to-r from-secondary-container via-secondary to-primary-container px-space-lg py-3.5 text-sm font-extrabold tracking-wider text-surface-container-lowest uppercase shadow-[0_4px_20px_rgba(18,100,142,0.4)] transition-all hover:scale-[1.02] hover:shadow-[0_6px_25px_rgba(18,100,142,0.6)] active:scale-[0.99] sm:text-headline-sm"
                    >
                      <span className="material-symbols-outlined text-xl">sports_soccer</span>
                      <span>Trabzonspor Oyuncuları</span>
                      <span className="material-symbols-outlined text-xl">arrow_forward</span>
                    </RouterLink>
                  </div>
                </div>

                <div className="relative mx-auto w-full max-w-[360px] lg:col-span-5 lg:mx-0 lg:justify-self-end xl:max-w-[400px]">
                  <div className="relative flex flex-col gap-space-sm rounded-2xl border border-surface-container-high bg-surface-container-low p-space-md text-on-surface shadow-lg sm:p-space-lg">
                    <div className="flex items-center justify-between border-b border-surface-container-high pb-space-sm">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg text-tertiary-container">
                          sports_soccer
                        </span>
                        <span className="font-kicker text-kicker font-bold tracking-widest text-primary uppercase">
                          Örnek Oyuncu
                        </span>
                      </div>
                      <span className="font-kicker flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-0.5 text-kicker font-black tracking-wider text-surface-container-lowest uppercase shadow">
                        <span className="h-1.5 w-1.5 animate-ping rounded-full bg-white" />
                        Oyuncu Kartı
                      </span>
                    </div>

                    {featuredPlayer ? (
                      <PlayerCard player={featuredPlayer} />
                    ) : (
                      <p className="font-body text-body-sm text-on-surface-variant">
                        Oyuncu kartı yükleniyor...
                      </p>
                    )}
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
                    <span className="font-kicker flex items-center gap-1.5 rounded-full bg-gradient-to-r from-secondary-container to-secondary px-3 py-1 text-kicker font-black tracking-wider text-on-secondary-fixed uppercase shadow-md">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-on-secondary-fixed" />
                      Detaylı Taktikler ve Kadro
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
                        schema
                      </span>
                      <span className="text-xs font-bold text-on-surface">Diziliş</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl border border-surface-container-high bg-surface-container-low px-3 py-2 transition hover:border-tertiary-container">
                      <span className="material-symbols-outlined text-lg text-tertiary-container">
                        psychology
                      </span>
                      <span className="text-xs font-bold text-on-surface">Oyun Anlayışı</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl border border-surface-container-high bg-surface-container-low px-3 py-2 transition hover:border-secondary">
                      <span className="material-symbols-outlined text-lg text-secondary">
                        sticky_note_2
                      </span>
                      <span className="text-xs font-bold text-on-surface">Taktik Notu</span>
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
                        groups
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

                    <div className="z-10 flex items-center justify-start">
                      <div className="flex items-center gap-2 rounded-full border border-secondary-container/40 bg-[#0c1813]/85 px-3 py-1 shadow-lg backdrop-blur-md">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-secondary-fixed-dim" />
                        <span className="font-kicker text-kicker font-black text-secondary-fixed-dim uppercase">
                          4-2-3-1
                        </span>
                      </div>
                    </div>

                    <div className="z-10 flex justify-center">
                      <div className="flex -translate-y-1 flex-col items-center">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-amber-300 bg-gradient-to-tr from-primary to-primary-container text-xs font-black text-white shadow-[0_0_14px_rgba(255,177,192,0.8)]">
                          DJ
                        </div>
                        <span className="mt-1 rounded bg-black/50 px-1.5 text-[11px] font-bold text-white backdrop-blur-xs">
                          Dju
                        </span>
                      </div>
                    </div>

                    <div className="z-10 flex justify-around px-4">
                      {[
                        { initials: 'AR', name: 'Aral' },
                        { initials: 'MC', name: 'Muci' },
                        { initials: 'SL', name: 'Salah' },
                      ].map((player) => (
                        <div key={player.name} className="flex flex-col items-center">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/60 bg-gradient-to-tr from-secondary to-secondary-container text-xs font-black text-on-secondary-fixed shadow-[0_0_12px_rgba(140,206,253,0.7)]">
                            {player.initials}
                          </div>
                          <span className="mt-1 rounded bg-black/50 px-1.5 text-[11px] font-bold text-white backdrop-blur-xs">
                            {player.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="z-10 flex justify-around px-16">
                      {[
                        { initials: 'FB', name: 'Fabinho' },
                        { initials: 'FL', name: 'Folcarelli' },
                      ].map((player) => (
                        <div key={player.name} className="flex flex-col items-center">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/60 bg-gradient-to-tr from-secondary to-secondary-container text-xs font-black text-on-secondary-fixed shadow-[0_0_12px_rgba(140,206,253,0.7)]">
                            {player.initials}
                          </div>
                          <span className="mt-0.5 rounded bg-black/50 px-1.5 text-[10px] font-bold text-white">
                            {player.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="z-10 flex justify-around px-2">
                      {[
                        { initials: 'MS', name: 'Mustafa' },
                        { initials: 'BT', name: 'Batagov' },
                        { initials: 'NW', name: 'Nwaiwu' },
                        { initials: 'PI', name: 'Pina' },
                      ].map((player) => (
                        <div key={player.name} className="flex flex-col items-center">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/60 bg-surface-container-lowest text-[10px] font-bold text-primary shadow">
                            {player.initials}
                          </div>
                          <span className="mt-0.5 rounded bg-black/50 px-1 text-[9px] font-bold text-white">
                            {player.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="z-10 flex justify-center">
                      <div className="flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gradient-to-tr from-amber-400 to-amber-200 text-xs font-black text-on-tertiary-fixed shadow-[0_0_15px_rgba(247,189,91,0.8)]">
                          ON
                        </div>
                        <span className="mt-0.5 rounded bg-black/60 px-2 text-[10px] font-bold text-amber-300">
                          Onana
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Quiz */}
          <section id="quizler" className="mx-auto max-w-[1360px] px-4 py-space-xl sm:px-6 lg:px-12">
            <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-[#27030e] via-[#3d0619] to-[#120207] p-space-lg text-on-primary shadow-2xl md:p-space-xl">
              <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-tertiary-fixed-dim/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-secondary/25 blur-3xl" />

              <div className="relative z-10 grid grid-cols-1 items-center gap-space-xl lg:grid-cols-12">
                <div className="flex flex-col gap-space-md lg:col-span-7">
                  <div className="flex flex-wrap items-center gap-space-xs">
                    <span className="font-kicker flex items-center gap-1.5 rounded-full bg-gradient-to-r from-secondary-container to-secondary px-3 py-1 text-kicker font-black tracking-wider text-on-secondary-fixed uppercase shadow-md">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-on-secondary-fixed" />
                      Trabzonspor Quizleri
                    </span>
                  </div>

                  <h2 className="font-headline text-headline-lg-mobile leading-tight font-extrabold tracking-tight text-surface-container-lowest uppercase sm:text-headline-lg">
                    Trabzonspor&apos;u Ne Kadar Tanıyorsun?
                    <br />
                    <span className="bg-gradient-to-r from-tertiary-fixed-dim via-[#ff8da3] to-secondary-fixed-dim bg-clip-text text-transparent">
                      Test Et
                    </span>
                  </h2>

                  <p className="font-body max-w-xl text-body-md text-surface-variant opacity-95 sm:text-body-lg">
                    1976 ihtilalinin kahramanlarından 2021-22 şampiyonluk zaferine, Avni Aker
                    koridorlarından Faroz sokaklarına kadar Trabzonspor tarihini ne kadar iyi
                    biliyorsun? Kendini sına, rozetleri topla ve taraftar liderlik kürsüsüne çık.
                  </p>

                  <div className="grid grid-cols-2 gap-space-xs pt-space-xs sm:grid-cols-4">
                    <div className="rounded-xl border border-surface-container-lowest/15 bg-surface-container-lowest/10 p-space-sm text-center backdrop-blur-md">
                      <span className="material-symbols-outlined mb-1 inline-block text-[28px] text-tertiary-fixed-dim">
                        history_edu
                      </span>
                      <span className="block text-[11px] font-bold tracking-wider text-surface-variant uppercase">
                        Tarihçe ve İlkler
                      </span>
                    </div>
                    <div className="rounded-xl border border-surface-container-lowest/15 bg-surface-container-lowest/10 p-space-sm text-center backdrop-blur-md">
                      <span className="material-symbols-outlined mb-1 inline-block text-[28px] text-secondary-fixed-dim">
                        stadium
                      </span>
                      <span className="block text-[11px] font-bold tracking-wider text-surface-variant uppercase">
                        Tesisler ve Rekorlar
                      </span>
                    </div>
                    <div className="rounded-xl border border-surface-container-lowest/15 bg-surface-container-lowest/10 p-space-sm text-center backdrop-blur-md">
                      <span className="material-symbols-outlined mb-1 inline-block text-[28px] text-inverse-primary">
                        sports_soccer
                      </span>
                      <span className="block text-[11px] font-bold tracking-wider text-surface-variant uppercase">
                        Ezeli Rekabet
                      </span>
                    </div>
                    <div className="rounded-xl border border-surface-container-lowest/15 bg-surface-container-lowest/10 p-space-sm text-center backdrop-blur-md">
                      <span className="material-symbols-outlined mb-1 inline-block text-[28px] text-surface-container-lowest">
                        emoji_events
                      </span>
                      <span className="block text-[11px] font-bold tracking-wider text-surface-variant uppercase">
                        Şampiyonluklar ve Başarılar
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-space-md pt-space-sm">
                    <RouterLink
                      to="/quizler"
                      className="font-headline flex items-center gap-space-xs rounded-full border border-primary-fixed/30 bg-gradient-to-r from-primary-container via-[#7a1235] to-secondary px-space-lg py-3.5 text-sm font-extrabold tracking-wider text-on-primary uppercase shadow-[0_4px_25px_rgba(90,14,39,0.7)] transition-all hover:scale-[1.02] hover:shadow-[0_6px_30px_rgba(90,14,39,0.9)] active:scale-[0.99] sm:text-headline-sm"
                    >
                      <span>Tüm Quizleri Keşfet ve Çözmeye Başla</span>
                      <span className="material-symbols-outlined text-xl">arrow_forward</span>
                    </RouterLink>
                  </div>
                </div>

                <div className="flex flex-col gap-space-sm lg:col-span-5">
                  <div className="relative flex flex-col gap-space-md rounded-2xl border border-surface-container-high bg-surface-container-low p-space-md text-on-surface shadow-lg sm:p-space-lg">
                    <div className="flex items-center justify-between border-b border-surface-container-high pb-space-sm">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg text-tertiary-container">
                          fact_check
                        </span>
                        <span className="font-kicker text-kicker font-bold tracking-widest text-primary uppercase">
                          Örnek Soru
                        </span>
                      </div>
                      <span className="font-kicker flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-0.5 text-kicker font-black tracking-wider text-surface-container-lowest uppercase shadow">
                        <span className="h-1.5 w-1.5 animate-ping rounded-full bg-white" />
                        Quiz Önizleme
                      </span>
                    </div>

                    <div className="relative flex flex-col gap-space-sm overflow-hidden border border-outline-variant/40 bg-surface-container-lowest p-space-sm">
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-surface-container-high"
                      >
                        <div className="h-full w-[55%] bg-secondary" />
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-space-xs pt-1">
                        <div className="flex items-center gap-space-xs">
                          <span className="h-2 w-2 bg-primary" />
                          <h3 className="font-label text-label-md font-bold tracking-wider text-primary uppercase">
                            SORU #1 • Tarihçe ve İlkler
                          </h3>
                        </div>
                        <div className="font-label flex items-center gap-0.5 text-label-md font-bold text-tertiary-container uppercase">
                          <span
                            className="material-symbols-outlined text-[16px] text-tertiary-fixed-dim leading-none"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            military_tech
                          </span>
                          +10 Puan
                        </div>
                      </div>

                      <div className="bg-on-surface/[0.03] px-space-sm py-space-sm">
                        <p className="font-label text-label-md leading-snug font-bold text-on-surface">
                          18 Ekim 1984 ve 18 Ekim 1994&apos;te tam 10 yıl arayla iki kez 1-0
                          mağlup ettiği İngiliz kulübü hangisidir?
                        </p>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        {[
                          { letter: 'A', text: 'Tottenham' },
                          { letter: 'B', text: 'Aston Villa' },
                          { letter: 'C', text: 'Newcastle United' },
                          { letter: 'D', text: 'Everton' },
                        ].map((option) => (
                          <div
                            key={option.letter}
                            className="flex w-full items-center gap-space-sm border border-outline-variant/50 bg-surface px-space-sm py-1.5 text-left"
                          >
                            <span className="font-headline flex h-7 w-7 shrink-0 items-center justify-center bg-surface-container-high text-label-md font-bold text-on-surface">
                              {option.letter}
                            </span>
                            <span className="font-label text-label-md font-bold text-on-surface">
                              {option.text}
                            </span>
                          </div>
                        ))}
                      </div>
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
