import { useState, type FormEvent } from 'react'
import { Link as RouterLink } from 'react-router-dom'

const HERO_BG = '/assets/background.jpeg'

const placeholderPosts = [
  {
    id: '1',
    category: 'ANALİZ',
    categoryTone: 'bordo' as const,
    time: '2 saat önce',
    title: 'Modern Karadeniz Geçiş Oyunu: Orta Sahanın Yeni Dinamiği',
    excerpt:
      'Bordo-Mavili ekibin üçüncü bölgedeki pres kırıcı şablonları ve ikinci topları toplama yüzdesi neden zirve yaptı? Detaylı ısı haritası dökümü.',
    author: 'Uğur K. (Trabzon)',
    initials: 'UK',
    likes: '482',
    comments: '64',
  },
  {
    id: '2',
    category: 'TRİBÜN',
    categoryTone: 'mavi' as const,
    time: '5 saat önce',
    title: "Akyazı'da 61. Dakika Ritüeli: Bir Şehrin Zamansız Haykırışı",
    excerpt:
      'Meşalelerin dumanı Papara Park çatısını sararken o an ne hissedilir? Babadan oğula geçen Bordo-Mavi aidiyetin tribün dili.',
    author: 'Ahmet Reis (Vira)',
    initials: 'AR',
    likes: '895',
    comments: '112',
  },
  {
    id: '3',
    category: 'TARİHÇE',
    categoryTone: 'altin' as const,
    time: '1 gün önce',
    title: '1976 İhtilali: İstanbul Saltanatını Yıkan Efsane Kadronun Mirası',
    excerpt:
      "Anadolu'nun ilk şampiyonluk destanında Özkan Sümer ve Ahmet Suat Özyazıcı taktik dehasının günümüz futboluna yansımaları.",
    author: 'Dr. Selim Kaya',
    initials: 'SK',
    likes: '1.240',
    comments: '190',
  },
]

const placeholderPlayers = [
  {
    id: '1',
    number: '#1',
    badge: 'KAPTAN',
    position: 'KALECİ',
    name: 'Uğurcan Çakır',
    rating: 9.4,
    statA: { label: 'Kurtarış', value: '6 Net' },
    statB: { label: 'Pas İsabeti', value: '%88' },
    tone: 'from-[#5A0E27] to-[#1A040B]',
  },
  {
    id: '2',
    number: '#7',
    badge: null,
    position: 'SAĞ KANAT',
    name: 'Edin Višća',
    rating: 8.8,
    statA: { label: 'Kilit Pas', value: '4' },
    statB: { label: 'Asist Beklentisi', value: '0.82 xA' },
    tone: 'from-[#12648e] to-[#1A040B]',
  },
  {
    id: '3',
    number: '#99',
    badge: null,
    position: 'FORVET',
    name: 'Simon Banza',
    rating: 9.1,
    statA: { label: 'Gol', value: '2 Gol' },
    statB: { label: 'İkili Mücadele', value: '7/9' },
    tone: 'from-[#3f2900] to-[#1A040B]',
  },
  {
    id: '4',
    number: '#44',
    badge: null,
    position: 'STOPER',
    name: 'Arseniy Batagov',
    rating: 8.6,
    statA: { label: 'Top Çalma', value: '5 Kez' },
    statB: { label: 'Hava Topu', value: '%100' },
    tone: 'from-[#544245] to-[#1A040B]',
  },
]

const placeholderSquads = [
  {
    id: '1',
    formation: '4-3-3 HÜCUM',
    score: 96,
    title: 'Derbi Zaferi 4-3-3',
    author: '@ViraFırtına',
    authorClass: 'text-primary',
    votes: '412 Oy',
    tag: 'Yüksek Pres & Hızlı Kanat',
    pitchClass: 'bg-primary-container',
    formationKey: '433' as const,
  },
  {
    id: '2',
    formation: '4-2-3-1 KONTROL',
    score: 92,
    title: 'Hamšík Ekolü 4-2-3-1',
    author: '@Karadenizli61',
    authorClass: 'text-secondary',
    votes: '345 Oy',
    tag: 'Merkez Pas Hakimiyeti',
    pitchClass: 'bg-secondary',
    formationKey: '4231' as const,
  },
  {
    id: '3',
    formation: '3-5-2 KLASİK',
    score: 89,
    title: "Klasik 1996 Ruhu 3-5-2",
    author: '@FırtınaAnaliz',
    authorClass: 'text-tertiary-container',
    votes: '278 Oy',
    tag: 'Çift Forvet Presi',
    pitchClass: 'bg-inverse-surface',
    formationKey: '352' as const,
  },
]

const placeholderContributors = [
  {
    id: '1',
    initials: 'MR',
    name: 'Murat Reis',
    role: 'Kıdemli Yazar',
    roleClass: 'text-primary',
    avatarBg: 'bg-primary-container text-on-primary',
    avatarRing: 'border-secondary-container',
    rank: '#1',
    rankClass: 'bg-tertiary-fixed text-on-tertiary-fixed',
    statPrimary: '61 Gönderi',
    statSecondary: '34.2K Beğeni',
  },
  {
    id: '2',
    initials: 'BA',
    name: 'BordoMaviAnaliz',
    role: 'Taktikçi',
    roleClass: 'text-secondary',
    avatarBg: 'bg-secondary text-on-secondary',
    avatarRing: 'border-primary-container',
    rank: '#2',
    rankClass: 'bg-surface-container-high text-on-surface',
    statPrimary: '128 Analiz',
    statSecondary: '28.9K Beğeni',
  },
  {
    id: '3',
    initials: 'ZT',
    name: 'Zeynep_TS',
    role: 'Tribün Lideri',
    roleClass: 'text-primary-container',
    avatarBg: 'bg-primary text-on-primary',
    avatarRing: 'border-tertiary-fixed-dim',
    rank: '#3',
    rankClass: 'bg-surface-container-high text-on-surface',
    statPrimary: '44 Gönderi',
    statSecondary: '21.4K Beğeni',
  },
  {
    id: '4',
    initials: 'T6',
    name: 'Tayfa61',
    role: 'Kadro Ustası',
    roleClass: 'text-secondary',
    avatarBg: 'bg-secondary-container text-on-secondary-container',
    avatarRing: 'border-primary-container',
    rank: '#4',
    rankClass: 'bg-surface-container-high text-on-surface',
    statPrimary: '14 Kadro',
    statSecondary: '18.7K Beğeni',
  },
  {
    id: '5',
    initials: 'KR',
    name: 'KuzeyRüzgarı',
    role: 'Tarihçi',
    roleClass: 'text-on-surface-variant',
    avatarBg: 'bg-surface-variant text-on-surface',
    avatarRing: 'border-secondary',
    rank: '#5',
    rankClass: 'bg-surface-container-high text-on-surface',
    statPrimary: '31 Yazı',
    statSecondary: '15.1K Beğeni',
  },
]

function categoryBadgeClass(tone: 'bordo' | 'mavi' | 'altin') {
  if (tone === 'bordo') {
    return 'bg-primary-container text-on-primary'
  }

  if (tone === 'mavi') {
    return 'bg-secondary-container text-on-secondary-container'
  }

  return 'bg-tertiary-fixed-dim/30 text-on-surface'
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
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleNewsletterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!email.trim()) {
      return
    }

    setSubscribed(true)
    setEmail('')
  }

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
                to="/login"
                className="rounded bg-surface-container-lowest/10 px-6 py-3 font-headline text-sm font-bold tracking-wider text-on-primary uppercase backdrop-blur-md transition-all hover:bg-surface-container-lowest/20 sm:px-8 sm:py-4 sm:text-headline-sm"
              >
                Giriş Yap
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
                  Haftalık Taktik Kurulu: Hafta sonu derbisinde kanat varyasyonları değerlendiriliyor.
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
              {placeholderPosts.map((post) => (
                <article
                  key={post.id}
                  className="group flex flex-col justify-between rounded bg-surface-container-lowest p-space-lg shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex flex-col">
                    <div className="mb-space-md flex items-center justify-between">
                      <span
                        className={`rounded px-space-sm py-space-xs font-kicker text-kicker font-bold tracking-wider uppercase ${categoryBadgeClass(post.categoryTone)}`}
                      >
                        {post.category}
                      </span>
                      <span className="font-body text-body-sm text-on-surface-variant">
                        {post.time}
                      </span>
                    </div>
                    <h3 className="font-headline mb-space-sm text-headline-sm leading-tight font-bold text-on-surface uppercase transition-colors group-hover:text-primary-container">
                      {post.title}
                    </h3>
                    <p className="font-body mb-space-md line-clamp-3 text-body-md text-on-surface-variant">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="-mx-space-lg -mb-space-lg flex items-center justify-between bg-surface-container/50 px-space-lg pt-space-md pb-space-md">
                    <div className="flex items-center gap-space-xs">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-container text-xs font-bold text-on-primary">
                        {post.initials}
                      </div>
                      <span className="font-label text-label-md font-semibold text-on-surface">
                        {post.author}
                      </span>
                    </div>
                    <div className="font-body flex items-center gap-space-md text-body-sm text-on-surface-variant">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm text-error">favorite</span>
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">chat_bubble</span>
                        {post.comments}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
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
                {placeholderPlayers.map((player) => (
                  <div
                    key={player.id}
                    className="flex flex-col overflow-hidden rounded bg-surface-container-lowest shadow-sm transition-all hover:shadow-lg"
                  >
                    <div className="relative h-56 overflow-hidden bg-surface-container-high sm:h-64">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${player.tone}`}
                        aria-hidden
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-display text-5xl font-extrabold text-white/20">
                          {player.number}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-transparent to-transparent" />
                      <div className="absolute top-space-sm left-space-sm rounded bg-primary px-space-xs py-0.5 font-display text-headline-sm font-extrabold text-on-primary">
                        {player.number}
                      </div>
                      {player.badge ? (
                        <div className="absolute top-space-sm right-space-sm flex items-center gap-1 rounded bg-tertiary-fixed px-space-xs py-0.5 text-xs font-bold text-on-tertiary-fixed shadow-md">
                          <span className="material-symbols-outlined text-sm text-tertiary">star</span>
                          {player.badge}
                        </div>
                      ) : null}
                      <div className="absolute bottom-space-sm left-space-md right-space-md text-on-primary">
                        <span className="font-kicker block text-kicker font-bold tracking-widest text-secondary-fixed uppercase">
                          {player.position}
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
                            {player.rating}{' '}
                            <span className="text-xs font-normal text-on-surface-variant">/ 10</span>
                          </span>
                        </div>
                        <div className="mb-space-md h-2 w-full overflow-hidden rounded-full bg-surface-container-high">
                          <div
                            className="h-full rounded-full bg-secondary"
                            style={{ width: `${player.rating * 10}%` }}
                          />
                        </div>
                        <div className="mb-space-md grid grid-cols-2 gap-space-xs rounded bg-surface-container-low p-space-xs text-center">
                          <div>
                            <span className="font-kicker block text-kicker text-on-surface-variant">
                              {player.statA.label}
                            </span>
                            <span className="font-label text-label-md font-bold text-on-surface">
                              {player.statA.value}
                            </span>
                          </div>
                          <div>
                            <span className="font-kicker block text-kicker text-on-surface-variant">
                              {player.statB.label}
                            </span>
                            <span className="font-label text-label-md font-bold text-on-surface">
                              {player.statB.value}
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
                ))}
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
              {placeholderSquads.map((squad) => (
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
                        <span>{squad.score}</span>
                        <span className="text-xs font-normal text-on-surface-variant">/100</span>
                      </div>
                    </div>
                    <h3 className="font-headline mb-space-xs text-headline-sm font-extrabold text-on-surface uppercase">
                      {squad.title}
                    </h3>
                    <div className="font-body mb-space-md flex items-center gap-space-xs text-body-sm text-on-surface-variant">
                      <span>
                        Kurucu:{' '}
                        <strong className={squad.authorClass}>{squad.author}</strong>
                      </span>
                      <span>•</span>
                      <span>{squad.votes}</span>
                    </div>
                    <div
                      className={`relative flex h-44 w-full flex-col justify-between overflow-hidden rounded p-space-xs text-on-primary shadow-inner ${squad.pitchClass}`}
                    >
                      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-surface-container-lowest/20" />
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <div className="h-16 w-16 rounded-full border border-surface-container-lowest/20" />
                      </div>
                      <MiniPitch formationKey={squad.formationKey} />
                    </div>
                  </div>
                  <div className="-mx-space-md -mb-space-md mt-space-md flex items-center justify-between bg-surface-container/30 px-space-md pt-space-sm pb-space-md">
                    <span className="font-kicker text-kicker font-bold text-on-surface-variant uppercase">
                      {squad.tag}
                    </span>
                    <RouterLink
                      to={`/kadrolar/${squad.id}`}
                      className="font-label text-label-md font-bold text-primary uppercase hover:underline"
                    >
                      11&apos;i İncele →
                    </RouterLink>
                  </div>
                </div>
              ))}
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
                  Aylık Sıralama
                </span>
              </div>

              <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-5">
                {placeholderContributors.map((contributor) => (
                  <div
                    key={contributor.id}
                    className="flex flex-col items-center rounded bg-surface-container-lowest p-space-md text-center shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="relative mb-space-sm">
                      <div
                        className={`flex h-16 w-16 items-center justify-center rounded-full p-1 font-headline text-headline-sm font-extrabold ${contributor.avatarBg}`}
                      >
                        <span
                          className={`flex h-full w-full items-center justify-center rounded-full border-2 ${contributor.avatarRing}`}
                        >
                          {contributor.initials}
                        </span>
                      </div>
                      <span
                        className={`absolute -right-1 -bottom-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold shadow ${contributor.rankClass}`}
                      >
                        {contributor.rank}
                      </span>
                    </div>
                    <h4 className="font-headline mb-0.5 text-headline-sm font-bold text-on-surface uppercase">
                      {contributor.name}
                    </h4>
                    <span
                      className={`font-kicker mb-space-sm text-kicker font-bold uppercase ${contributor.roleClass}`}
                    >
                      {contributor.role}
                    </span>
                    <div className="w-full rounded bg-surface-container p-space-xs pt-space-xs">
                      <span className="font-label block text-label-md font-extrabold text-on-surface">
                        {contributor.statPrimary}
                      </span>
                      <span className="font-kicker text-kicker text-on-surface-variant uppercase">
                        {contributor.statSecondary}
                      </span>
                    </div>
                  </div>
                ))}
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
                      HAFTALIK TARAFTAR BÜLTENİ
                    </span>
                  </div>
                  <h3 className="font-headline text-headline-lg-mobile font-extrabold tracking-tight text-on-primary uppercase sm:text-headline-lg">
                    61. Dakikada Bülten
                  </h3>
                  <p className="font-body text-body-md text-surface-variant opacity-90">
                    Karadeniz fırtınasının haftalık taktik analizlerini, tribün derlemelerini ve özel
                    röportajları her Cuma e-postanda hisset.
                  </p>
                </div>
                <form
                  className="flex w-full max-w-md flex-1 flex-col gap-space-xs sm:flex-row"
                  onSubmit={handleNewsletterSubmit}
                >
                  <input
                    className="w-full rounded bg-surface-container-lowest px-space-md py-space-sm font-body text-body-md text-on-surface transition focus:ring-2 focus:ring-secondary-container focus:outline-none"
                    placeholder="E-posta adresiniz..."
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                  <button
                    className="rounded bg-secondary-container px-space-lg py-space-sm font-headline text-sm font-extrabold tracking-wider whitespace-nowrap text-on-secondary-container uppercase shadow-md transition-all hover:bg-surface-container-lowest hover:text-primary sm:text-headline-sm"
                    type="submit"
                  >
                    Abone Ol
                  </button>
                </form>
                {subscribed ? (
                  <p className="w-full text-center font-body text-body-sm text-secondary-fixed-dim md:w-auto">
                    Kaydınız alındı. Bize her yer Trabzon.
                  </p>
                ) : null}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
