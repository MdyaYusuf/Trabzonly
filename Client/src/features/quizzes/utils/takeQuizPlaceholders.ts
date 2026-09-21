import type { QuizResultProfile, TakeQuizSession } from './takeQuizTypes'

const letters = ['A', 'B', 'C', 'D'] as const

function makeOptions(
  questionKey: string,
  pairs: Array<[string, string]>,
  correctLetter: 'A' | 'B' | 'C' | 'D',
) {
  return {
    options: pairs.map(([label, subtitle], i) => ({
      id: `${questionKey}-${letters[i]}`,
      letter: letters[i],
      label,
      subtitle,
    })),
    correctOptionId: `${questionKey}-${correctLetter}`,
  }
}

const questions: TakeQuizSession['questions'] = [
  {
    id: 'q1',
    index: 1,
    categoryLabel: 'SEZON AÇILIŞI',
    points: 10,
    prompt:
      '2021-22 sezonunda Trabzonspor’un ligde ilk hafta rakibi kimdi ve maç nasıl sonuçlandı?',
    atmosphereLabel: 'Şenol Güneş Spor Kompleksi',
    atmosphereMeta: '1. Hafta • Sezon başlangıcı',
    communityCorrectPercent: 62,
    communityCorrectLabel: 'Doğru cevap oranı',
    ...makeOptions(
      'q1',
      [
        ['Sivasspor • 2-1 galibiyet', 'İç saha açılışı'],
        ['Antalyaspor • 1-1', 'Beraberlik'],
        ['Başakşehir • 0-0', 'Skor yok'],
        ['Giresunspor • 3-0', 'Deplasman'],
      ],
      'A',
    ),
  },
  {
    id: 'q2',
    index: 2,
    categoryLabel: 'TEKNİK',
    points: 10,
    prompt: '2021-22 şampiyonluk sezonunda Trabzonspor’un teknik direktörü kimdi?',
    atmosphereLabel: 'Teknik bank',
    atmosphereMeta: 'Taktik satranç • Akyazı',
    communityCorrectPercent: 94,
    communityCorrectLabel: 'Doğru cevap oranı',
    ...makeOptions(
      'q2',
      [
        ['Abdullah Avcı', 'Şampiyonluk mimarı'],
        ['Şenol Güneş', 'Önceki dönem'],
        ['Eddie Newton', 'Asistan dönem'],
        ['Ünal Karaman', 'Önceki sezonlar'],
      ],
      'A',
    ),
  },
  {
    id: 'q3',
    index: 3,
    categoryLabel: 'KAPTAN',
    points: 10,
    prompt: 'Şampiyonluk sezonunun kaleci ve kaptan üçgeninde Uğurcan Çakır’ın rolü neydi?',
    atmosphereLabel: 'Kale',
    atmosphereMeta: 'Penaltı kurtarışları • Liderlik',
    communityCorrectPercent: 88,
    communityCorrectLabel: 'Doğru cevap oranı',
    ...makeOptions(
      'q3',
      [
        ['Birinci kaleci ve lider figür', 'Şampiyonluk sonrası da sembol'],
        ['Yedek kaleci', 'Rotasyon'],
        ['Sadece kupa maçlarında oynadı', 'Kısıtlı'],
        ['Sezon ortasında transfer oldu', 'Ayrılış'],
      ],
      'A',
    ),
  },
  {
    id: 'q4',
    index: 4,
    categoryLabel: 'GOL KRALI',
    points: 10,
    prompt: '2021-22’de hücum hattında Andreas Cornelius’un en çok anılan katkısı nedir?',
    atmosphereLabel: 'Hücum',
    atmosphereMeta: 'Santrafor • Danimarka',
    communityCorrectPercent: 71,
    communityCorrectLabel: 'Doğru cevap oranı',
    ...makeOptions(
      'q4',
      [
        ['Kritik şampiyonluk golleri ve fiziksel baskı', 'Santrafor etkisi'],
        ['Sadece asist üretimi', 'Pasör'],
        ['Kaleci olarak oynadı', 'Pozisyon dışı'],
        ['Sezonu başka kulüpte bitirdi', 'Transfer'],
      ],
      'A',
    ),
  },
  {
    id: 'q5',
    index: 5,
    categoryLabel: 'KANAT',
    points: 10,
    prompt: 'Anthony Nwakaeme şampiyonluk sezonunda hangi kanatta fırtına esti?',
    atmosphereLabel: 'Sol hat',
    atmosphereMeta: 'Nijerya • Tempo',
    communityCorrectPercent: 82,
    communityCorrectLabel: 'Doğru cevap oranı',
    ...makeOptions(
      'q5',
      [
        ['Sol kanat', 'Klasik Nwakaeme rotası'],
        ['Sağ bek', 'Defans'],
        ['Stoper', 'Merkez'],
        ['Kaleci', 'Kale'],
      ],
      'A',
    ),
  },
  {
    id: 'q6',
    index: 6,
    categoryLabel: 'ORTA SAHA',
    points: 10,
    prompt: 'Anastasios Bakasetas’ın 2021-22’deki tipik rolü hangisidir?',
    atmosphereLabel: 'On numara',
    atmosphereMeta: 'Yunanistan • Organizasyon',
    communityCorrectPercent: 76,
    communityCorrectLabel: 'Doğru cevap oranı',
    ...makeOptions(
      'q6',
      [
        ['On numara / yaratıcı orta saha', 'Asist ve şut'],
        ['Stoper', 'Defans'],
        ['Kaleci', 'Kale'],
        ['Sağ bek', 'Kanat defans'],
      ],
      'A',
    ),
  },
  {
    id: 'q7',
    index: 7,
    categoryLabel: 'DERBİ',
    points: 10,
    prompt:
      'Beşiktaş deplasmanında 90+6. dakikada galibiyeti getiren golü kim kaydetti?',
    atmosphereLabel: 'İstanbul',
    atmosphereMeta: 'Geç gol • Derbi',
    communityCorrectPercent: 69,
    communityCorrectLabel: 'Doğru cevap oranı',
    ...makeOptions(
      'q7',
      [
        ['Edin Višća', 'Geç dakikalar'],
        ['Marek Hamšík', 'Orta saha'],
        ['Vitor Hugo', 'Defans'],
        ['Hüseyin Türkmen', 'Stoper'],
      ],
      'A',
    ),
  },
  {
    id: 'q8',
    index: 8,
    categoryLabel: 'LİDERLİK',
    points: 10,
    prompt: 'Şampiyonluk yarışında Trabzonspor’un sezon boyunca en belirgin özelliği neydi?',
    atmosphereLabel: 'Tablo',
    atmosphereMeta: 'İstikrar • Fark',
    communityCorrectPercent: 73,
    communityCorrectLabel: 'Doğru cevap oranı',
    ...makeOptions(
      'q8',
      [
        ['Erken liderlik ve puan farkını koruma', 'Tablo hakimiyeti'],
        ['Son haftaya kadar üçüncülük', 'Geç yükseliş'],
        ['Küme düşme hattında mücadele', 'Alt sıra'],
        ['Sadece kupa odaklı sezon', 'Lig dışı'],
      ],
      'A',
    ),
  },
  {
    id: 'q9',
    index: 9,
    categoryLabel: 'ŞAMPİYONLUK MAÇI & TARİHİ ANLAR',
    points: 10,
    prompt:
      "30 Nisan 2022 tarihinde Akyazı'da oynanan ve 2-2 biterek 38 yıllık şampiyonluk hasretine son veren Antalyaspor karşılaşmasında, Trabzonspor'un 62. dakikadaki tarihi ikinci golünü kaydeden futbolcu kimdir?",
    atmosphereLabel: 'Medical Park Stadyumu • 30.04.2022',
    atmosphereMeta: "Dakika 62' • Skor: 2-1",
    communityCorrectPercent: 74,
    communityCorrectLabel: 'Doğru cevap oranı',
    ...makeOptions(
      'q9',
      [
        ['Andreas Cornelius', 'Santrafor • Danimarka'],
        ['Dorukhan Toköz', 'Orta Saha / Savunma • Türkiye'],
        ['Anthony Nwakaeme', 'Sol Kanat • Nijerya'],
        ['Anastasios Bakasetas', 'On Numara • Yunanistan'],
      ],
      'B',
    ),
  },
  {
    id: 'q10',
    index: 10,
    categoryLabel: 'STADYUM',
    points: 10,
    prompt: 'Şampiyonluğun ilan edildiği Akyazı sahasının o dönemki adı hangisidir?',
    atmosphereLabel: 'Akyazı',
    atmosphereMeta: 'Ev sahibi kale',
    communityCorrectPercent: 80,
    communityCorrectLabel: 'Doğru cevap oranı',
    ...makeOptions(
      'q10',
      [
        ['Medical Park Stadyumu', 'Şampiyonluk gecesi'],
        ['Hüseyin Avni Aker', 'Eski stadyum'],
        ['Ali Sami Yen', 'İstanbul'],
        ['Atatürk Olimpiyat', 'İstanbul'],
      ],
      'A',
    ),
  },
  {
    id: 'q11',
    index: 11,
    categoryLabel: 'ASİST',
    points: 10,
    prompt:
      "Giresunspor deplasmanında Nwakaeme'nin attığı kritik golün asistini kim yaptı?",
    atmosphereLabel: 'Karadeniz derbisi',
    atmosphereMeta: 'Asist zinciri',
    communityCorrectPercent: 58,
    communityCorrectLabel: 'Doğru cevap oranı',
    ...makeOptions(
      'q11',
      [
        ['Marek Hamšík', 'Orta saha'],
        ['Anastasios Bakasetas', 'Kavisli orta'],
        ['Edin Višća', 'Kanat'],
        ['Dorukhan Toköz', 'Çapa'],
      ],
      'B',
    ),
  },
  {
    id: 'q12',
    index: 12,
    categoryLabel: 'FORMA',
    points: 10,
    prompt: 'Şampiyonluk sezonunun bordo-mavi kimliğini en çok pekiştiren unsur hangisidir?',
    atmosphereLabel: 'Kimlik',
    atmosphereMeta: 'Tribün + forma',
    communityCorrectPercent: 85,
    communityCorrectLabel: 'Doğru cevap oranı',
    ...makeOptions(
      'q12',
      [
        ['Meşaleler, tezahürat ve forma birliği', 'Kolektif hafıza'],
        ['Sadece sponsor logosu', 'Ticari'],
        ['Sadece sosyal medya', 'Dijital'],
        ['Sadece Avrupa forması', 'Kıta'],
      ],
      'A',
    ),
  },
  {
    id: 'q13',
    index: 13,
    categoryLabel: 'HASRET',
    points: 10,
    prompt: '2021-22 şampiyonluğu kaç yıllık hasretin sonunu getirdi?',
    atmosphereLabel: '38 yıl',
    atmosphereMeta: 'Tarihi kırılma',
    communityCorrectPercent: 91,
    communityCorrectLabel: 'Doğru cevap oranı',
    ...makeOptions(
      'q13',
      [
        ['38 yıl', 'Hasretin sonu'],
        ['10 yıl', 'Kısa ara'],
        ['5 yıl', 'Yakın dönem'],
        ['50 yıl', 'Yarım asır'],
      ],
      'A',
    ),
  },
  {
    id: 'q14',
    index: 14,
    categoryLabel: 'KADRO',
    points: 10,
    prompt: 'Şampiyon kadroda Vitor Hugo’nun temel görevi neydi?',
    atmosphereLabel: 'Defans',
    atmosphereMeta: 'Stoper hattı',
    communityCorrectPercent: 67,
    communityCorrectLabel: 'Doğru cevap oranı',
    ...makeOptions(
      'q14',
      [
        ['Merkez defans / stoper', 'Hava topu ve liderlik'],
        ['Santrafor', 'Hücum'],
        ['Kaleci', 'Kale'],
        ['Sağ kanat', 'Hücum kanadı'],
      ],
      'A',
    ),
  },
  {
    id: 'q15',
    index: 15,
    categoryLabel: 'KIRILMA',
    points: 10,
    prompt:
      'Uğurcan Çakır’ın penaltı kurtarışıyla devleştiği ve şampiyonluk ateşini yaktığı kırılma maçı hangisiydi?',
    atmosphereLabel: 'Kale efsanesi',
    atmosphereMeta: 'Penaltı • Moment',
    communityCorrectPercent: 64,
    communityCorrectLabel: 'Doğru cevap oranı',
    ...makeOptions(
      'q15',
      [
        ['Fenerbahçe (İç Saha)', 'Penaltı kurtarışı'],
        ['Galatasaray (Deplasman)', 'Derbi'],
        ['Beşiktaş (İç Saha)', 'İstanbul'],
        ['Başakşehir (Deplasman)', 'Başkent hattı'],
      ],
      'A',
    ),
  },
]

export const championshipTakeQuizSession: TakeQuizSession = {
  id: 'featured-8',
  breadcrumbTitle: '2021-2022 Şampiyonluk Hafızası',
  title: '2021-2022 Şampiyonluk Sezonunu Ne Kadar Hatırlıyorsun?',
  difficultyLabel: 'ORTA',
  questionCount: 15,
  pointsLabel: '+150 Tribün Puanı',
  timeLimitSeconds: 5 * 60,
  questions,
  player: {
    initials: 'F61',
    username: 'Fırtına61',
    subtitle: 'Doğu Üst Tribünü Üyesi',
    pointsLabel: '340 Puan',
    accuracyLabel: '%87.5',
  },
  badge: {
    title: '2022 Şampiyonluk Hafızası',
    subtitle: 'Gümüş Koleksiyon Rozeti',
    progressLabel: '15/15 Hedefinde',
    note: 'Bu testi başarıyla tamamlayarak profil vitrinine efsane kupa madalyonunu ekle.',
  },
  rules: [
    'Her doğru cevap hanene 10 Puan kazandırır.',
    'Yanlış cevaplar veya pas geçmeler puanını düşürmez.',
    'Toplam süren 5 dakikadır. Süre dolduğunda yanıtlanan sorular değerlendirilir.',
  ],
}

const sessionsById: Record<string, TakeQuizSession> = {
  'featured-8': championshipTakeQuizSession,
  '8': championshipTakeQuizSession,
}

export function getTakeQuizSession(quizId: string | undefined): TakeQuizSession {
  if (!quizId) {
    return championshipTakeQuizSession
  }

  return (
    sessionsById[quizId] ?? {
      ...championshipTakeQuizSession,
      id: quizId,
    }
  )
}

export const championshipQuizResult: QuizResultProfile = {
  quizId: 'featured-8',
  breadcrumbTitle: '2021-2022 Sezonu Hafıza Testi',
  statusLabel: 'TEST TAMAMLANDI • 30 NİSAN 2022 HAFIZASI',
  seasonLabel: 'SEZON 2021-22',
  headline: 'BİZE HER YER',
  headlineAccent: 'TRABZON!',
  subheadline: 'Şampiyonluk Hafızan Kusursuz!',
  body: "Akyazı'daki meşaleleri, şampiyonluk düğümünün çözüldüğü o tarihi anları ve Abdullah Avcı'nın taktik satrancını dün gibi hatırlıyorsun. Gösterdiğin bu kusursuz performansla tribün liderlik tablosunda bu ayın ilk 10'una adını altın harflerle yazdırdın.",
  titleEarned: 'Efsane Tribün Hafızası',
  completionTime: '05dk 42sn',
  successPercent: 93,
  correctCount: 14,
  totalCount: 15,
  wrongCount: 1,
  pointsEarned: '+140',
  badgeLevel: 'SEVİYE 4',
  badgeTitle: '2021-22 ŞAMPİYONLUK PROFESÖRÜ',
  badgeNote:
    'Bu rozet yalnızca bu testte %90 ve üzeri başarı sağlayan 412 taraftara verilmiştir.',
  rankLabel: 'İlk %8 İçerisinde',
  rankPercent: '8',
  monthlyCompletions: '4.280',
  correctStatPercent: '%93.3',
  wrongQuestionLabel: 'Soru #11',
  speedPercentile: 'En Hızlı %8',
  avgSecondsLabel: 'Ort. 22.8 sn / soru',
  reviewItems: [
    {
      number: '01',
      prompt: 'Şampiyonluğu garantilediğimiz Antalyaspor maçındaki açılış golünü kim attı?',
      isCorrect: true,
      yourAnswer: 'Andreas Cornelius',
    },
    {
      number: '07',
      prompt: 'Beşiktaş deplasmanında 90+6. dakikada galibiyeti getiren golü kim kaydetti?',
      isCorrect: true,
      yourAnswer: 'Edin Višća',
    },
    {
      number: '11',
      prompt: "Giresunspor deplasmanında Nwakaeme'nin attığı kritik golün asistini kim yaptı?",
      isCorrect: false,
      yourAnswer: 'Marek Hamšík',
      correctAnswer: 'Anastasios Bakasetas',
      editorialNote:
        "Bakasetas ceza sahası dışından yaptığı kavisli ortayla Nwakaeme'yi arka direkte topla buluşturmuştu.",
    },
    {
      number: '15',
      prompt:
        "Uğurcan Çakır'ın penaltı kurtarışıyla devleştiği ve şampiyonluk ateşini yaktığı kırılma maçı hangisiydi?",
      isCorrect: true,
      yourAnswer: 'Fenerbahçe (İç Saha)',
    },
  ],
  recommended: [
    {
      id: '1',
      pointsLabel: '+200 PUAN',
      difficultyLabel: 'ZOR',
      difficultyTone: 'error',
      title: "1975'ten Günümüze: İlk Anadolu İhtilali ve Efsane Kadrolar",
      titleTone: 'primary',
      excerpt:
        'Ahmet Suat Özyazıcı, Özkan Sümer, Şenol Güneş, Ali Kemal Denizci... İstanbul hegemonyasını yıkan o ilk büyük efsanenin detayları.',
      meta: '20 Soru • 8 Dakika',
    },
    {
      id: '2',
      pointsLabel: '+180 PUAN',
      difficultyLabel: 'İLERİ SEVİYE',
      difficultyTone: 'secondary',
      title: "Karadeniz'in Avrupa Fatihleri: Liverpool, Aston Villa, Inter Zaferleri",
      titleTone: 'secondary',
      excerpt:
        'Avrupa devlerinin Hüseyin Avni Aker Çimlerine gömüldüğü o destansı gecelerin unutulmaz golleri, ilk 11’leri ve taktik hamleleri.',
      meta: '15 Soru • 6 Dakika',
    },
  ],
}

export function getQuizResultProfile(
  quizId: string | undefined,
  override?: Partial<QuizResultProfile>,
): QuizResultProfile {
  const base = {
    ...championshipQuizResult,
    quizId: quizId ?? championshipQuizResult.quizId,
  }

  if (!override) {
    return base
  }

  return { ...base, ...override }
}

export function buildQuizResultFromAnswers(
  session: TakeQuizSession,
  answers: Record<string, string>,
  elapsedSeconds: number,
): QuizResultProfile {
  let correctCount = 0
  const reviewItems: QuizResultProfile['reviewItems'] = []

  for (const question of session.questions) {
    const selected = answers[question.id]
    const selectedOption = question.options.find((o) => o.id === selected)
    const correctOption = question.options.find((o) => o.id === question.correctOptionId)
    const isCorrect = Boolean(selected) && selected === question.correctOptionId

    if (isCorrect) {
      correctCount += 1
    }

    reviewItems.push({
      number: String(question.index).padStart(2, '0'),
      prompt: question.prompt,
      isCorrect,
      yourAnswer: selectedOption?.label ?? 'Boş',
      correctAnswer: isCorrect ? undefined : correctOption?.label,
      editorialNote:
        question.id === 'q11' && !isCorrect
          ? championshipQuizResult.reviewItems.find((item) => item.number === '11')
              ?.editorialNote
          : undefined,
    })
  }

  const wrongCount = session.questions.length - correctCount
  const successPercent = Math.round((correctCount / session.questions.length) * 100)
  const points = correctCount * 10
  const mins = Math.floor(elapsedSeconds / 60)
  const secs = elapsedSeconds % 60
  const completionTime = `${String(mins).padStart(2, '0')}dk ${String(secs).padStart(2, '0')}sn`

  const wrongFirst = reviewItems.filter((item) => !item.isCorrect)
  const correctSample = reviewItems.filter((item) => item.isCorrect)
  const trimmedReview = [...wrongFirst, ...correctSample].slice(0, 4)

  const firstWrong = wrongFirst[0]

  return getQuizResultProfile(session.id, {
    breadcrumbTitle: session.breadcrumbTitle,
    successPercent,
    correctCount,
    totalCount: session.questions.length,
    wrongCount,
    pointsEarned: `+${points}`,
    completionTime,
    correctStatPercent: `%${((correctCount / session.questions.length) * 100).toFixed(1)}`,
    wrongQuestionLabel: firstWrong ? `Soru #${firstWrong.number}` : '—',
    reviewItems: trimmedReview.length > 0 ? trimmedReview : championshipQuizResult.reviewItems,
    avgSecondsLabel: `Ort. ${(elapsedSeconds / session.questions.length).toFixed(1)} sn / soru`,
  })
}
