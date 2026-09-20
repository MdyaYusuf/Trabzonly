import type { PostDetailProfile } from './postDetailTypes'

const authorPortrait = '/assets/posts/post-author.png'

const heroImage = '/assets/posts/post-detail-hero.png'

const relatedA = '/assets/posts/post-related-training.png'

const relatedB = '/assets/posts/post-related-crowd.png'

export const defaultPostDetail: PostDetailProfile = {
  id: '1',
  categoryLabel: 'Taktik & Analiz',
  breadcrumbTitle: "Akyazı'da Çift Forvet Presi: Banza ve Drăguș",
  isEditorsPick: true,
  publishedLabel: '3 saat önce • 18 Şubat 2025',
  dossierLabel: 'DOSYA NO: 61-TAK-25',
  readTimeLabel: 'Okuma Süresi: 6 dk',
  viewsLabel: '4.820 Okunma',
  title: "AKYAZI'DA ÇİFT FORVET PRESİ: BANZA VE DRĂGUȘ BİRLİKTE NASIL OYNAMALI?",
  lead:
    "Göztepe maçının ikinci yarısında izlediğimiz 4-4-2 geçişi, rakip stoperlerin ilk hat oyun kurmasını tamamen kilitledi. Ancak Cham'ın merkezdeki pas açılarının boğulmaması ve geçiş savunmasında gedik verilmemesi için Cham-Mendy ikilisinin metraj kontrolünü kusursuz işletmesi şart.",
  author: {
    username: '@MuratReis',
    roleBadge: 'Taktik Ustası',
    subtitle: 'Kıdemli Taktik Yazarı & Kombine Sahibi • Doğu Üst Tribün',
    postsLabel: '61 Gönderi',
    readsLabel: '14.2k Okunma',
    trustLabel: '%98 Güven Puanı',
    imageUrl: authorPortrait,
  },
  heroImageUrl: heroImage,
  heroHudLabel: 'AKYAZI PRES HARİTASI (0-30 DK)',
  heroHudStat: '%68 3. BÖLGE',
  heroCaption:
    'Papara Park zemininde ilk 30 dakika ön alan baskı haritası ve rakip stoperlere uygulanan ikili blok pres aksı.',
  opening:
    "rabzonspor'un bu sezon iç sahada yaşadığı en büyük handikap, top rakipteyken ön alandaki temassız bekleyişti. Rakip savunmaların Akyazı'da rahatça ilk pası çıkarması, hem orta saha omurgamız Mendy-Lundstram ikilisini geniş alanları savunmak zorunda bırakıyor hem de tribünlerin sabırsızlık katsayısını artırıyordu. Göztepe sınavının ikinci devresinde kenardan gelen Denis Drăguș hamlesi, sadece bir oyuncu değişikliği değil, sahadaki geometrinin kökten revizyonuydu.",
  sections: [
    {
      heading: '1. İlk Bölge Baskısı ve Rakip Stoperlerin Kilitlenmesi',
      body: "Simon Banza gibi pivot özellikleri olan, sırtı dönük top saklayan bir santrforun yanına Drăguș'un dinamik koşu temposu eklendiğinde, rakip stoper ikilisi için oyun kurma opsiyonları tamamen kapandı. Banza doğrudan sağ stoperin sağ ayağını kapatarak taç çizgisine yönlendirirken, Drăguș kör noktadan baskıya girip pas kanallarını kesti. Bu durum rakibi sürekli uzun vurmaya zorladı.",
    },
    {
      heading: "2. Cham'ın 10 Numara Alanındaki Pas Koridorları ve Mendy Sigortası",
      body: "Çift forvete dönüldüğünde en sık karşılaşılan tuzak, orta sahanın boşalması ve rakip merkez oyuncularının ceza sahası yayına rahat sızmasıdır. Burada kilit aktör Muhammed Cham. Cham, klasik bir serbest 10 numara gibi hücumda kalırsa, Mendy geride 40 metrelik bir alanı tek başına süpürmek zorunda kalır. Çözüm, top rakipteyken Cham'ın 4-4-2'nin sağ kanadı gibi konumlanması ve hücuma çıkarken içeri kat ederek forvetlerin arasına sızmasıdır.",
    },
    {
      heading: '3. Hafta Sonu Derbisi İçin Çıkarılacak Dersler',
      body: "Önümüzdeki kritik derbide rakibin geriden kısa pasla çıkma ısrarı biliniyor. Banza-Drăguș pres hattı eğer ilk 20 dakikada Akyazı seyircisinin yarattığı desibel gücüyle senkronize edilirse, maçın kaderini belirleyecek 1 veya 2 net fırsat doğrudan rakip yarı alanda kazanılan toplarla üretilecektir. Trabzonspor ruhu beklemeyi değil, fırtına gibi önde saldırmayı emreder.",
    },
  ],
  tacticNote: {
    title: 'Taktik Notu: Koridor Paylaşımı',
    body: "Banza stoperi göğsünde tutup fiziksel temasla merkezde tutarken, Drăguș sol iç koridora kayarak Lundstram'ın savunma arkasına atacağı uzun diyagonal paslara koridor açıyor. Bu ikilinin birbirine uzaklığı hiçbir pozisyonda 18 metreyi aşmamalı.",
  },
  metricsTitle: 'Ön Alan Performans Metrikleri (90 Dakika)',
  metricsSource: 'OPTA VERİ SETİ',
  playerMetrics: [
    {
      name: 'Simon Banza',
      role: 'Pivot Forvet',
      nameTone: 'primary',
      rows: [
        {
          label: 'Ceza Sahasında Topla Buluşma',
          value: '6.8 (Lig Ort: 4.1)',
          width: '82%',
          barClass: 'bg-primary-container',
        },
        {
          label: 'Kazanılan Hava Topu İkili Mücadele',
          value: '%71.4',
          width: '71%',
          barClass: 'bg-secondary',
        },
      ],
    },
    {
      name: 'Denis Drăguș',
      role: 'Gezici Forvet',
      nameTone: 'secondary',
      rows: [
        {
          label: 'Hızlı Geçiş Koşusu (Topsuz)',
          value: '34.2 km/s',
          width: '90%',
          barClass: 'bg-secondary-container',
        },
        {
          label: 'Ön Alanda Top Geri Kazanımı',
          value: '3.4 Adet',
          width: '68%',
          barClass: 'bg-primary-container',
        },
      ],
    },
  ],
  tags: [
    '#Trabzonspor',
    '#TaktikTahtası',
    '#SimonBanza',
    '#DenisDragus',
    '#AkyazıRuhu',
    '#SüperLig',
  ],
  likeCount: 342,
  dislikeCount: 12,
  endorsementLabel: '%96 Taraftar Onaylıyor',
  commentCount: 88,
  authorOtherPosts: [
    {
      kicker: 'Orta Saha Merceği',
      kickerTone: 'secondary',
      title: "Mendy'nin 6 Numara Yalnızlığı: İkinci Bir Dinamo Şart mı?",
      date: '14 Şubat 2025',
      reads: '5.2k Okunma',
    },
    {
      kicker: 'Bek Analizi',
      kickerTone: 'primary',
      title: 'Pedro Malheiro Hücumda Ne Kadar Özgür Olmalı?',
      date: '10 Şubat 2025',
      reads: '3.9k Okunma',
    },
    {
      kicker: 'Arşiv & Hafıza',
      kickerTone: 'secondary',
      title: '2010-11 Pres Gücü: Jaja, Burak ve Umut Üçgeni Nasıl İşliyordu?',
      date: '2 Şubat 2025',
      reads: '8.7k Okunma',
    },
  ],
  poll: {
    question:
      'Hafta sonu derbisinde çift forvetle (Banza & Drăguș) mi, yoksa tek forvet arkası serbest Cham ile mi başlanmalı?',
    options: [
      {
        label: 'Çift Forvet (Banza & Drăguș)',
        percent: 71,
        votes: '%71 (1.420 Oy)',
        tone: 'primary',
      },
      {
        label: 'Tek Forvet + Serbest Cham',
        percent: 29,
        votes: '%29 (580 Oy)',
        tone: 'secondary',
      },
    ],
    totalLabel: 'Toplam 2.000 taraftar oy kullandı',
  },
  relatedPosts: [
    {
      title: "Mehmet Ali Yılmaz Tesisleri'nde Basına Kapalı Pres Çalışması",
      meta: 'Dün • 4 dk okuma',
      imageUrl: relatedA,
    },
    {
      title: "Akyazı'da 40 Bin Kişi: Derbide Akustik Baskı Nasıl Artırılır?",
      meta: '2 gün önce • 7 dk okuma',
      imageUrl: relatedB,
    },
  ],
  comments: [
    {
      id: 'c1',
      initials: 'AK',
      username: '@AkyazıKapalı61',
      badge: 'Kombineli',
      badgeTone: 'primary',
      avatarTone: 'primary',
      timeLabel: '3 saat önce',
      body: "Murat Hocam eline sağlık, teşhis nokta atışı. Ancak Cham konusunda bir çekincem var: Rakip bek ileri çıktığında Cham kanat savunmasına yeterince yardım etmiyor, bu da Pedro Malheiro'yu 2'ye 1 yakalatıyor. Eğer Cham 10 numarada oynayacaksa, arkasındaki Mendy'nin o kanat kademesine kayması zorunlu. Yoksa derbide oradan delerler.",
      upvotes: 248,
      downvotes: 4,
      replyCount: 2,
      replies: [
        {
          id: 'r1',
          username: '@DrSelimKaya',
          badge: 'Tarihçi Yazar',
          timeLabel: '2 saat önce',
          body: 'Kesinlikle katılıyorum. 96 ruhundaki Şota-Arçil ikilisinde de aynı baskı modeli vardı; arkalarında Ünal Karaman savunma açığını kapatmak için maç başı 12 km koşuyordu. Mendy bunu yapabilecek ciğere sahip.',
          upvotes: 41,
        },
        {
          id: 'r2',
          username: '@ViraTayfa',
          timeLabel: '1 saat önce',
          body: 'Kuzey kale arkası olarak ilk 15 dakikada o stoperleri öyle bir ıslığa boğacağız ki top ayaklarına dolanacak. Yeter ki Banza pes etmeden ilk baskıyı kursun.',
          upvotes: 19,
        },
      ],
    },
    {
      id: 'c2',
      initials: 'KK',
      username: '@KuzeyKaleArkası',
      badge: 'Kıdemli Üye',
      badgeTone: 'surface',
      avatarTone: 'secondary',
      timeLabel: '2 saat önce',
      body: "Drăguș'un savunma arkası koşuları ligin en tehlikeli silahı ama son vuruşlarda bazen acele ediyor. Banza ile ceza sahası paslaşmalarını artırırlarsa rakip defans dengesi tamamen dağılır. Analiz için teşekkürler hocam.",
      upvotes: 112,
      downvotes: 2,
    },
  ],
}

export const postDetailById: Record<string, PostDetailProfile> = {
  '1': defaultPostDetail,
}
