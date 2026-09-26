import { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useAppSelector } from '../core/store/hooks'
import postService from '../features/posts/postService'
import type { PostResponseDto } from '../features/posts/postTypes'
import playerService from '../features/players/playerService'
import type { PlayerResponseDto } from '../features/players/playerTypes'
import { formatMarketValue } from '../features/players/utils/formatMarketValue'
import squadService from '../features/squads/squadService'
import type { SquadPreviewDto } from '../features/squads/squadTypes'
import userService from '../features/users/userService'
import type { UserPreviewDto } from '../features/users/userTypes'

const HERO_BG = '/assets/background.jpeg'

const PLAYER_TONES = [
  'from-[#5A0E27] to-[#1A040B]',
  'from-[#12648e] to-[#1A040B]',
  'from-[#3f2900] to-[#1A040B]',
  'from-[#544245] to-[#1A040B]',
] as const

const CONTRIBUTOR_STYLES = [
  {
    avatarBg: 'bg-primary-container text-on-primary',
    avatarRing: 'border-secondary-container',
    rankClass: 'bg-tertiary-fixed text-on-tertiary-fixed',
    roleClass: 'text-primary',
  },
  {
    avatarBg: 'bg-secondary text-on-secondary',
    avatarRing: 'border-primary-container',
    rankClass: 'bg-surface-container-high text-on-surface',
    roleClass: 'text-secondary',
  },
  {
    avatarBg: 'bg-primary text-on-primary',
    avatarRing: 'border-tertiary-fixed-dim',
    rankClass: 'bg-surface-container-high text-on-surface',
    roleClass: 'text-primary-container',
  },
  {
    avatarBg: 'bg-secondary-container text-on-secondary-container',
    avatarRing: 'border-primary-container',
    rankClass: 'bg-surface-container-high text-on-surface',
    roleClass: 'text-secondary',
  },
  {
    avatarBg: 'bg-surface-variant text-on-surface',
    avatarRing: 'border-secondary',
    rankClass: 'bg-surface-container-high text-on-surface',
    roleClass: 'text-on-surface-variant',
  },
] as const

const SQUAD_PITCH_CLASSES = [
  'bg-primary-container',
  'bg-secondary',
  'bg-inverse-surface',
] as const

const SQUAD_AUTHOR_CLASSES = [
  'text-primary',
  'text-secondary',
  'text-tertiary-container',
] as const

function categoryBadgeClass(tone: 'bordo' | 'mavi' | 'altin') {
  if (tone === 'bordo') {
    return 'bg-primary-container text-on-primary'
  }

  if (tone === 'mavi') {
    return 'bg-secondary-container text-on-secondary-container'
  }

  return 'bg-tertiary-fixed-dim/30 text-on-surface'
}

function resolveCategoryTone(categoryName: string): 'bordo' | 'mavi' | 'altin' {
  const normalized = categoryName.trim().toLocaleLowerCase('tr-TR')

  if (normalized.includes('tribün') || normalized.includes('tribun')) {
    return 'mavi'
  }

  if (normalized.includes('tarih')) {
    return 'altin'
  }

  return 'bordo'
}

function formatRelativeTime(isoDate: string) {
  const date = new Date(isoDate)
  const diffMs = Date.now() - date.getTime()

  if (Number.isNaN(diffMs) || diffMs < 0) {
    return ''
  }

  const minutes = Math.floor(diffMs / 60_000)

  if (minutes < 1) {
    return 'Az önce'
  }

  if (minutes < 60) {
    return `${minutes} dk önce`
  }

  const hours = Math.floor(minutes / 60)

  if (hours < 24) {
    return `${hours} saat önce`
  }

  const days = Math.floor(hours / 24)

  if (days < 7) {
    return `${days} gün önce`
  }

  return date.toLocaleDateString('tr-TR')
}

function formatCompactNumber(value: number) {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`
  }

  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`
  }

  return value.toLocaleString('tr-TR')
}

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)

  if (parts.length === 0) {
    return '?'
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }

  return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase()
}

function resolveFormationKey(formation: string): '433' | '4231' | '352' {
  const digits = formation.replace(/[^0-9]/g, '')

  if (digits.startsWith('4231') || digits === '4231') {
    return '4231'
  }

  if (digits.startsWith('352') || digits === '352') {
    return '352'
  }

  return '433'
}

function MiniPitch({ formationKey }: { formationKey: '433' | '4231' | '352' }) {
  if (formationKey === '433') {
    return (
      <>
        <div className="z-10 flex justify-around">
          {['B', 'V', 'N'].map((letter) => (
            <span
              key={letter}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary-container text-xs font-bold text-on-secondary-container shadow"
            >
              {letter}
            </span>
          ))}
        </div>
        <div className="z-10 flex justify-around px-space-md">
          {['C', 'M', 'O'].map((letter) => (
            <span
              key={letter}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-container-lowest text-xs font-bold text-primary shadow"
            >
              {letter}
            </span>
          ))}
        </div>
        <div className="z-10 flex w-full justify-around px-space-xs">
          {['E', 'S', 'B', 'M'].map((letter) => (
            <span
              key={letter}
              className="flex h-5 w-5 items-center justify-center rounded-full bg-surface-container-lowest text-[10px] font-bold text-primary"
            >
              {letter}
            </span>
          ))}
        </div>
        <div className="z-10 flex justify-center">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-tertiary-fixed text-[10px] font-bold text-on-tertiary-fixed">
            U
          </span>
        </div>
      </>
    )
  }

  if (formationKey === '4231') {
    return (
      <>
        <div className="z-10 flex justify-center">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-container text-xs font-bold text-on-primary shadow">
            B
          </span>
        </div>
        <div className="z-10 flex justify-around">
          {['T', 'C', 'V'].map((letter) => (
            <span
              key={letter}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-container-lowest text-xs font-bold text-secondary shadow"
            >
              {letter}
            </span>
          ))}
        </div>
        <div className="z-10 flex justify-center gap-space-lg">
          {['M', 'O'].map((letter) => (
            <span
              key={letter}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-container-lowest text-xs font-bold text-secondary shadow"
            >
              {letter}
            </span>
          ))}
        </div>
        <div className="z-10 flex justify-around px-space-xs">
          {['E', 'D', 'B', 'M'].map((letter) => (
            <span
              key={letter}
              className="flex h-5 w-5 items-center justify-center rounded-full bg-surface-container-lowest text-[10px] font-bold text-secondary"
            >
              {letter}
            </span>
          ))}
        </div>
        <div className="z-10 flex justify-center">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-tertiary-fixed text-[10px] font-bold text-on-tertiary-fixed">
            U
          </span>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="z-10 flex justify-center gap-space-lg">
        {['S', 'H'].map((letter) => (
          <span
            key={letter}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary-container text-xs font-bold text-on-secondary-container shadow"
          >
            {letter}
          </span>
        ))}
      </div>
      <div className="z-10 flex justify-between px-space-xs">
        {['W', 'M', 'M', 'M', 'W'].map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            className="flex h-5 w-5 items-center justify-center rounded-full bg-surface-container-lowest text-[10px] font-bold text-inverse-surface"
          >
            {letter}
          </span>
        ))}
      </div>
      <div className="z-10 flex justify-around px-space-md">
        {['D', 'S', 'D'].map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            className="flex h-5 w-5 items-center justify-center rounded-full bg-surface-container-lowest text-[10px] font-bold text-inverse-surface"
          >
            {letter}
          </span>
        ))}
      </div>
      <div className="z-10 flex justify-center">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-tertiary-fixed text-[10px] font-bold text-on-tertiary-fixed">
          U
        </span>
      </div>
    </>
  )
}

export function HomePage() {
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const [posts, setPosts] = useState<PostResponseDto[]>([])
  const [players, setPlayers] = useState<PlayerResponseDto[]>([])
  const [squads, setSquads] = useState<SquadPreviewDto[]>([])
  const [contributors, setContributors] = useState<UserPreviewDto[]>([])
  const [tickerTitle, setTickerTitle] = useState('Trabzonspor tribününden en son fırtına yazıları yükleniyor...')

  useEffect(() => {
    let cancelled = false

    async function loadHomeData() {
      const [postsResult, ratedResult, valuedResult, squadsResult, contributorsResult] =
        await Promise.allSettled([
          postService.getRecent(3),
          playerService.getTopRated(4),
          playerService.getTopValued(4),
          squadService.getTopRated(3),
          userService.getTopContributors(5),
        ])

      if (cancelled) {
        return
      }

      if (postsResult.status === 'fulfilled' && postsResult.value.data?.items) {
        const recentPosts = postsResult.value.data.items
        setPosts(recentPosts)

        if (recentPosts[0]?.title) {
          setTickerTitle(recentPosts[0].title)
        }
      }

      if (ratedResult.status === 'fulfilled' && ratedResult.value.data && ratedResult.value.data.length > 0) {
        setPlayers(ratedResult.value.data)
      } else if (valuedResult.status === 'fulfilled' && valuedResult.value.data?.items) {
        setPlayers(valuedResult.value.data.items)
      }

      if (squadsResult.status === 'fulfilled' && squadsResult.value.data) {
        setSquads(squadsResult.value.data)
      }

      if (contributorsResult.status === 'fulfilled' && contributorsResult.value.data) {
        setContributors(contributorsResult.value.data)
      }
    }

    void loadHomeData()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
      <div className="flex w-full flex-col">
        <section className="relative -mt-16 flex h-[calc(100vh-4rem)] min-h-[560px] items-center justify-center overflow-hidden bg-primary pt-16 sm:-mt-20 sm:h-[calc(100vh-5rem)] sm:min-h-[640px] sm:pt-20">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${HERO_BG}')` }}
            role="img"
            aria-label="Papara Park stadyum atmosferi"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-ground via-dark-ground/60 to-dark-ground/85" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#1A040B_80%)]" />

          <div className="relative z-10 mx-auto flex w-full max-w-[1360px] flex-col items-center px-4 text-center sm:px-6 lg:px-12">
            <div className="mb-space-sm flex items-center justify-center p-space-lg">
              <div className="flex h-20 w-16 items-center justify-center rounded-lg bg-surface-container-lowest/10 p-space-xs shadow-2xl backdrop-blur-md sm:h-24 sm:w-20">
                <div className="flex h-full w-full flex-col items-center justify-center rounded bg-primary-container/80 text-tertiary-fixed-dim">
                  <span className="text-2xl leading-none">★</span>
                  <span className="mt-1 font-kicker text-[9px] font-bold tracking-widest text-on-primary">
                    1967
                  </span>
                </div>
              </div>
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
                href="#son-gonderiler"
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

          <div className="absolute right-0 bottom-0 left-0 w-full bg-dark-ground/90 px-4 py-space-sm backdrop-blur-md sm:px-6 lg:px-12">
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
          <section
            id="son-gonderiler"
            className="mx-auto max-w-[1360px] px-4 py-space-xl sm:px-6 lg:px-12"
          >
            <div className="mb-space-lg flex flex-col justify-between gap-space-sm md:flex-row md:items-end">
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center gap-space-xs">
                  <span className="inline-block h-4 w-2 bg-primary-container" />
                  <span className="font-kicker text-kicker font-bold tracking-widest text-primary-container uppercase">
                    TİRBÜN &amp; EDİTÖRYAL
                  </span>
                </div>
                <h2 className="font-headline text-headline-lg-mobile font-extrabold tracking-tight text-on-surface uppercase sm:text-headline-lg">
                  Son Gönderiler
                </h2>
                <p className="font-body text-body-md text-on-surface-variant">
                  Topluluktan taktik analizler, tribün hikayeleri ve bağımsız maç değerlendirmeleri.
                </p>
              </div>
              <RouterLink
                to="/gonderiler"
                className="font-label inline-flex items-center gap-space-xs text-label-md font-bold tracking-wider text-primary uppercase transition-colors hover:text-primary-container"
              >
                <span>Tümünü Gör</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </RouterLink>
            </div>

            <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
              {posts.length === 0 ? (
                <p className="font-body col-span-full text-body-md text-on-surface-variant">
                  Henüz yayınlanmış gönderi yok.
                </p>
              ) : (
                posts.map((post) => {
                  const tone = resolveCategoryTone(post.categoryName)

                  return (
                    <RouterLink
                      key={post.id}
                      to={`/gonderiler/${post.id}`}
                      className="group flex flex-col justify-between rounded bg-surface-container-lowest p-space-lg shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="flex flex-col">
                        <div className="mb-space-md flex items-center justify-between">
                          <span
                            className={`rounded px-space-sm py-space-xs font-kicker text-kicker font-bold tracking-wider uppercase ${categoryBadgeClass(tone)}`}
                          >
                            {post.categoryName}
                          </span>
                          <span className="font-body text-body-sm text-on-surface-variant">
                            {formatRelativeTime(post.createdDate)}
                          </span>
                        </div>
                        <h3 className="font-headline mb-space-sm text-headline-sm leading-tight font-bold text-on-surface uppercase transition-colors group-hover:text-primary-container">
                          {post.title}
                        </h3>
                        <p className="font-body mb-space-md line-clamp-3 text-body-md text-on-surface-variant">
                          {post.description || post.content}
                        </p>
                      </div>
                      <div className="-mx-space-lg -mb-space-lg flex items-center justify-between bg-surface-container/50 px-space-lg pt-space-md pb-space-md">
                        <div className="flex items-center gap-space-xs">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-container text-xs font-bold text-on-primary">
                            {initialsFromName(post.authorUsername)}
                          </div>
                          <span className="font-label text-label-md font-semibold text-on-surface">
                            {post.authorUsername}
                          </span>
                        </div>
                        <div className="font-body flex items-center gap-space-md text-body-sm text-on-surface-variant">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm text-error">favorite</span>
                            {formatCompactNumber(post.likeCount)}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">chat_bubble</span>
                            {formatCompactNumber(post.commentCount)}
                          </span>
                        </div>
                      </div>
                    </RouterLink>
                  )
                })
              )}
            </div>
          </section>

          <section className="bg-surface-container py-space-xl">
            <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-12">
              <div className="mb-space-lg flex flex-col justify-between gap-space-sm md:flex-row md:items-end">
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center gap-space-xs">
                    <span className="inline-block h-4 w-2 bg-secondary" />
                    <span className="font-kicker text-kicker font-bold tracking-widest text-secondary uppercase">
                      HAFTALIK PERFORMANS
                    </span>
                  </div>
                  <h2 className="font-headline text-headline-lg-mobile font-extrabold tracking-tight text-on-surface uppercase sm:text-headline-lg">
                    Öne Çıkan Oyuncular
                  </h2>
                  <p className="font-body text-body-md text-on-surface-variant">
                    Haftanın en yüksek taraftar oylama puanına sahip Karadeniz fırtınaları.
                  </p>
                </div>
                <RouterLink
                  to="/oyuncular"
                  className="font-label text-label-md font-bold tracking-wider text-secondary uppercase hover:underline"
                >
                  Tüm Kadro Reytingleri →
                </RouterLink>
              </div>

              <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-4">
                {players.length === 0 ? (
                  <p className="font-body col-span-full text-body-md text-on-surface-variant">
                    Henüz oyuncu verisi yok.
                  </p>
                ) : (
                  players.map((player, index) => {
                    const shirtLabel = player.shirtNumber ? `#${player.shirtNumber}` : '—'
                    const rating = Number(player.averageRating) || 0
                    const marketLabel = player.marketValue != null
                      ? formatMarketValue(Number(player.marketValue))
                      : '—'

                    return (
                      <div
                        key={player.id}
                        className="flex flex-col overflow-hidden rounded bg-surface-container-lowest shadow-sm transition-all hover:shadow-lg"
                      >
                        <div className="relative h-56 overflow-hidden bg-surface-container-high sm:h-64">
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${PLAYER_TONES[index % PLAYER_TONES.length]}`}
                            aria-hidden
                          />
                          {player.imageUrl ? (
                            <img
                              src={player.imageUrl}
                              alt={player.name}
                              className="absolute inset-0 h-full w-full object-cover opacity-80"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="font-display text-5xl font-extrabold text-white/20">
                                {shirtLabel}
                              </span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-transparent to-transparent" />
                          <div className="absolute top-space-sm left-space-sm rounded bg-primary px-space-xs py-0.5 font-display text-headline-sm font-extrabold text-on-primary">
                            {shirtLabel}
                          </div>
                          <div className="absolute bottom-space-sm left-space-md right-space-md text-on-primary">
                            <span className="font-kicker block text-kicker font-bold tracking-widest text-secondary-fixed uppercase">
                              {player.positionName}
                            </span>
                            <span className="font-headline text-headline-sm font-extrabold uppercase">
                              {player.name}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-1 flex-col justify-between bg-surface-container-lowest p-space-md">
                          <div>
                            <div className="mb-space-xs flex items-center justify-between">
                              <span className="font-label text-label-md font-medium text-on-surface-variant">
                                Taraftar Puanı
                              </span>
                              <span className="font-headline text-headline-sm font-extrabold text-primary">
                                {rating.toFixed(1)}{' '}
                                <span className="text-xs font-normal text-on-surface-variant">/ 10</span>
                              </span>
                            </div>
                            <div className="mb-space-md h-2 w-full overflow-hidden rounded-full bg-surface-container-high">
                              <div
                                className="h-full rounded-full bg-secondary"
                                style={{ width: `${Math.min(rating * 10, 100)}%` }}
                              />
                            </div>
                            <div className="mb-space-md grid grid-cols-2 gap-space-xs rounded bg-surface-container-low p-space-xs text-center">
                              <div>
                                <span className="font-kicker block text-kicker text-on-surface-variant">
                                  Piyasa Değeri
                                </span>
                                <span className="font-label text-label-md font-bold text-on-surface">
                                  {marketLabel}
                                </span>
                              </div>
                              <div>
                                <span className="font-kicker block text-kicker text-on-surface-variant">
                                  Yaş
                                </span>
                                <span className="font-label text-label-md font-bold text-on-surface">
                                  {player.age}
                                </span>
                              </div>
                            </div>
                          </div>
                          <RouterLink
                            to={`/oyuncular/${player.id}`}
                            className="block w-full rounded bg-surface-container py-space-xs text-center font-label text-label-md font-bold text-on-surface uppercase transition-colors hover:bg-primary-container hover:text-on-primary"
                          >
                            Oyuncu Detayı
                          </RouterLink>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-[1360px] px-4 py-space-xl sm:px-6 lg:px-12">
            <div className="mb-space-lg flex flex-col justify-between gap-space-md md:flex-row md:items-end">
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center gap-space-xs">
                  <span className="inline-block h-4 w-2 bg-primary-container" />
                  <span className="font-kicker text-kicker font-bold tracking-widest text-primary uppercase">
                    TAKTIK TAHTASI
                  </span>
                </div>
                <h2 className="font-headline text-headline-lg-mobile font-extrabold tracking-tight text-on-surface uppercase sm:text-headline-lg">
                  En Yüksek Puanlı Kadrolar
                </h2>
                <p className="font-body text-body-md text-on-surface-variant">
                  Topluluğun oluşturduğu, tartıştığı ve oyladığı haftalık ideal 11&apos;ler.
                </p>
              </div>
              <RouterLink
                to="/kadrolar/olustur"
                className="flex items-center gap-space-xs rounded bg-primary-container px-space-lg py-space-sm font-label text-label-md font-bold tracking-wider text-on-primary uppercase shadow-md transition-all hover:bg-primary"
              >
                <span className="material-symbols-outlined text-lg">add_circle</span>
                <span>Kendi Kadronu Kur</span>
              </RouterLink>
            </div>

            <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
              {squads.length === 0 ? (
                <p className="font-body col-span-full text-body-md text-on-surface-variant">
                  Henüz oylanan kadro yok.
                </p>
              ) : (
                squads.map((squad, index) => {
                  const scoreOutOf100 = Math.round(Number(squad.averageRating) * 20)

                  return (
                    <div
                      key={squad.id}
                      className="flex flex-col justify-between rounded bg-surface-container-lowest p-space-md shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div>
                        <div className="mb-space-sm flex items-center justify-between">
                          <span className="rounded bg-primary-fixed px-space-xs py-0.5 font-kicker text-kicker font-bold text-on-primary-fixed uppercase">
                            {squad.formation}
                          </span>
                          <div className="font-headline flex items-center gap-1 text-headline-sm font-extrabold text-tertiary-container">
                            <span className="text-tertiary-fixed-dim">★</span>
                            <span>{scoreOutOf100}</span>
                            <span className="text-xs font-normal text-on-surface-variant">/100</span>
                          </div>
                        </div>
                        <h3 className="font-headline mb-space-xs text-headline-sm font-extrabold text-on-surface uppercase">
                          {squad.title}
                        </h3>
                        <div className="font-body mb-space-md flex items-center gap-space-xs text-body-sm text-on-surface-variant">
                          <span>
                            Kurucu:{' '}
                            <strong className={SQUAD_AUTHOR_CLASSES[index % SQUAD_AUTHOR_CLASSES.length]}>
                              @{squad.authorUsername}
                            </strong>
                          </span>
                          <span>•</span>
                          <span>{squad.ratingCount} Oy</span>
                        </div>
                        <div
                          className={`relative flex h-44 w-full flex-col justify-between overflow-hidden rounded p-space-xs text-on-primary shadow-inner ${SQUAD_PITCH_CLASSES[index % SQUAD_PITCH_CLASSES.length]}`}
                        >
                          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-surface-container-lowest/20" />
                          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                            <div className="h-16 w-16 rounded-full border border-surface-container-lowest/20" />
                          </div>
                          <MiniPitch formationKey={resolveFormationKey(squad.formation)} />
                        </div>
                      </div>
                      <div className="-mx-space-md -mb-space-md mt-space-md flex items-center justify-between bg-surface-container/30 px-space-md pt-space-sm pb-space-md">
                        <span className="font-kicker text-kicker font-bold text-on-surface-variant uppercase">
                          Tribün 11&apos;i
                        </span>
                        <RouterLink
                          to={`/kadrolar/${squad.id}`}
                          className="font-label text-label-md font-bold text-primary uppercase hover:underline"
                        >
                          11&apos;i İncele →
                        </RouterLink>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </section>

          <section className="bg-surface-container-highest py-space-xl">
            <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-12">
              <div className="mb-space-lg flex flex-col justify-between gap-space-sm md:flex-row md:items-end">
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center gap-space-xs">
                    <span className="inline-block h-4 w-2 bg-tertiary-fixed-dim" />
                    <span className="font-kicker text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
                      TOPLULUK LİDERLERİ
                    </span>
                  </div>
                  <h2 className="font-headline text-headline-lg-mobile font-extrabold tracking-tight text-on-surface uppercase sm:text-headline-lg">
                    En Çok Katkı Verenler
                  </h2>
                  <p className="font-body text-body-md text-on-surface-variant">
                    Trabzonly tribününe içerik, kadro ve bağımsız analiz katan fırtına yazarları.
                  </p>
                </div>
                <span className="font-label text-label-md font-bold text-on-surface-variant uppercase">
                  Topluluk Sıralaması
                </span>
              </div>

              <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-5">
                {contributors.length === 0 ? (
                  <p className="font-body col-span-full text-body-md text-on-surface-variant">
                    Henüz katkı sıralaması oluşmadı.
                  </p>
                ) : (
                  contributors.map((contributor, index) => {
                    const style = CONTRIBUTOR_STYLES[index % CONTRIBUTOR_STYLES.length]

                    return (
                      <div
                        key={contributor.id}
                        className="flex flex-col items-center rounded bg-surface-container-lowest p-space-md text-center shadow-sm transition-shadow hover:shadow-md"
                      >
                        <div className="relative mb-space-sm">
                          <div
                            className={`flex h-16 w-16 items-center justify-center rounded-full p-1 font-headline text-headline-sm font-extrabold ${style.avatarBg}`}
                          >
                            <span
                              className={`flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 ${style.avatarRing}`}
                            >
                              {contributor.profileImageUrl ? (
                                <img
                                  src={contributor.profileImageUrl}
                                  alt={contributor.username}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                initialsFromName(contributor.username)
                              )}
                            </span>
                          </div>
                          <span
                            className={`absolute -right-1 -bottom-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold shadow ${style.rankClass}`}
                          >
                            #{index + 1}
                          </span>
                        </div>
                        <h4 className="font-headline mb-0.5 text-headline-sm font-bold text-on-surface uppercase">
                          {contributor.username}
                        </h4>
                        <span
                          className={`font-kicker mb-space-sm text-kicker font-bold uppercase ${style.roleClass}`}
                        >
                          {contributor.roleName}
                        </span>
                        <div className="w-full rounded bg-surface-container p-space-xs pt-space-xs">
                          <span className="font-label block text-label-md font-extrabold text-on-surface">
                            {contributor.postCount} Gönderi
                          </span>
                          <span className="font-kicker text-kicker text-on-surface-variant uppercase">
                            {formatCompactNumber(contributor.totalLikeCount)} Beğeni
                          </span>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden bg-primary py-space-xl text-on-primary">
            <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-primary-container opacity-40 blur-3xl" />
            <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-secondary opacity-20 blur-3xl" />
            <div className="relative z-10 mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-12">
              <div className="flex flex-col items-center justify-between gap-space-lg rounded-xl bg-primary-container/60 p-space-lg shadow-2xl backdrop-blur-md md:flex-row md:p-space-xl">
                <div className="flex max-w-xl flex-col gap-space-xs text-center md:text-left">
                  <div className="flex items-center justify-center gap-space-xs md:justify-start">
                    <span className="h-2.5 w-2.5 rounded-full bg-secondary-container" />
                    <span className="font-kicker text-kicker font-bold tracking-widest text-secondary-fixed-dim uppercase">
                      TRIBÜNE KATIL
                    </span>
                  </div>
                  <h3 className="font-headline text-headline-lg-mobile font-extrabold tracking-tight text-on-primary uppercase sm:text-headline-lg">
                    Fırtınanın Parçası Ol
                  </h3>
                  <p className="font-body text-body-md text-surface-variant opacity-90">
                    Gönderi yaz, kadro kur, oyunculara taraftar puanı ver. Bağımsız Trabzonspor
                    topluluğuna ücretsiz katıl.
                  </p>
                </div>
                <div className="flex w-full max-w-md flex-1 flex-col gap-space-xs sm:flex-row sm:items-center sm:justify-end">
                  {isAuthenticated ? (
                    <RouterLink
                      to="/gonderiler/yeni"
                      className="rounded bg-secondary-container px-space-lg py-space-sm text-center font-headline text-sm font-extrabold tracking-wider whitespace-nowrap text-on-secondary-container uppercase shadow-md transition-all hover:bg-surface-container-lowest hover:text-primary sm:text-headline-sm"
                    >
                      Gönderi Yaz
                    </RouterLink>
                  ) : (
                    <>
                      <RouterLink
                        to="/register"
                        className="rounded bg-secondary-container px-space-lg py-space-sm text-center font-headline text-sm font-extrabold tracking-wider whitespace-nowrap text-on-secondary-container uppercase shadow-md transition-all hover:bg-surface-container-lowest hover:text-primary sm:text-headline-sm"
                      >
                        Kayıt Ol
                      </RouterLink>
                      <RouterLink
                        to="/login"
                        className="rounded bg-surface-container-lowest/10 px-space-lg py-space-sm text-center font-headline text-sm font-extrabold tracking-wider whitespace-nowrap text-on-primary uppercase backdrop-blur-md transition-all hover:bg-surface-container-lowest/20 sm:text-headline-sm"
                      >
                        Giriş Yap
                      </RouterLink>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
