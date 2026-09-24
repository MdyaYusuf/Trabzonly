import type { AdminInjuryFormDraft, AdminInjuryListRow } from './adminInjuryTypes'

export const adminInjuryListStats = {
  activeCount: '3 Futbolcu',
  activeNames: 'Stefan Savić, Anthony Nwakaeme, Hüseyin Türkmen',
  activeNote: '2 oyuncu ilk 11 rotasyonunda',
  seasonCases: '14 Vaka',
  avgRecovery: '18 Gün',
  seasonTrend: 'Geçen sezona göre %12 daha az',
  affectedLine: 'Savunma',
  missedByLine: '9 maç',
  lineDetail: 'kaçırıldı (Stoper & Bek)',
  recentNote: 'Son 4 haftada 2 kas yaralanması',
  doctorName: 'Dr. Halil Polat',
  doctorRole: 'Klinik Şefi & Takım Başhekimi',
  doctorStatus: 'TFF BİLDİRİMLERİ TAMAM',
}

export const adminInjuryPlayerOptions = [
  { id: '1', label: '#15 Stefan Savić', name: 'Stefan Savić', number: '15' },
  { id: '2', label: '#9 Anthony Nwakaeme', name: 'Anthony Nwakaeme', number: '9' },
  { id: '3', label: '#7 Edin Višća', name: 'Edin Višća', number: '7' },
  { id: '4', label: '#4 Hüseyin Türkmen', name: 'Hüseyin Türkmen', number: '4' },
  { id: '5', label: '#99 Enis Destan', name: 'Enis Destan', number: '99' },
  { id: '6', label: '#5 Batista Mendy', name: 'Batista Mendy', number: '5' },
  { id: '7', label: '#1 Uğurcan Çakır', name: 'Uğurcan Çakır', number: '1' },
]

export const adminInjuryListRows: AdminInjuryListRow[] = [
  {
    id: '1',
    playerName: 'Stefan Savić',
    number: 15,
    positionLabel: '#15 • STOPER (DEFANS)',
    diagnosis: 'Sol Arka Adale Yırtığı (Hamstring Grade 2)',
    diagnosisDetail: 'Kayserispor deplasmanı 63. dakika',
    status: 'active',
    statusLabel: 'Kadro Dışı (İstirahat)',
    days: 28,
    missedMatches: 4,
    season: '2024/25',
    recordedAt: '21.09.2024',
    initials: 'SS',
    avatarTone: 'from-primary to-primary-container',
  },
  {
    id: '2',
    playerName: 'Anthony Nwakaeme',
    number: 9,
    positionLabel: '#9 • SOL KANAT (FORVET)',
    diagnosis: 'Kasık Zorlanması & Ödem (Adduktor Longus)',
    diagnosisDetail: 'Antrenman esnası mikro yırtık',
    status: 'active',
    statusLabel: 'Tedavide (Bireysel Çalışma)',
    days: 18,
    missedMatches: 2,
    season: '2024/25',
    recordedAt: '04.10.2024',
    initials: 'AN',
    avatarTone: 'from-secondary to-primary-container',
  },
  {
    id: '3',
    playerName: 'Hüseyin Türkmen',
    number: 4,
    positionLabel: '#4 • STOPER (DEFANS)',
    diagnosis: 'Aşil Tendonu Rüptürü & Post-Op İyileşme',
    diagnosisDetail: 'Cerrahi operasyon sonrası 6. ay',
    status: 'active',
    statusLabel: 'Kadro Dışı (İstirahat)',
    days: 180,
    missedMatches: 22,
    season: '2024/25',
    recordedAt: '28.04.2024',
    initials: 'HT',
    avatarTone: 'from-tertiary-container to-primary',
  },
  {
    id: '4',
    playerName: 'Enis Destan',
    number: 99,
    positionLabel: '#99 • SANTRFOR (HÜCUM)',
    diagnosis: 'Omuz Çıkığı (Akromiyoklavikuler Eklem)',
    diagnosisDetail: 'Konservatif tedavi tamamlandı',
    status: 'match-form',
    statusLabel: 'Maç Formu Kazanıyor',
    days: 24,
    missedMatches: 3,
    season: '2024/25',
    recordedAt: '01.09.2024',
    initials: 'ED',
    avatarTone: 'from-primary-container to-secondary',
  },
  {
    id: '5',
    playerName: 'Edin Višća',
    number: 7,
    positionLabel: '#7 • SAĞ KANAT (HÜCUM)',
    diagnosis: 'Köprücük Kemiği (Klavikula) Kırığı',
    diagnosisDetail: 'Plak-vida tespiti sonrası tam kaynama',
    status: 'recovered',
    statusLabel: 'Tam İyileşti',
    days: 62,
    missedMatches: 8,
    season: '2023/24',
    recordedAt: '12.01.2024',
    initials: 'EV',
    avatarTone: 'from-secondary to-primary',
  },
  {
    id: '6',
    playerName: 'Batista Mendy',
    number: 5,
    positionLabel: '#5 • ÖN LİBERO (ORTA SAHA)',
    diagnosis: 'Ayak Bileği Burkulması & Dış Yan Bağ Gerilmesi',
    diagnosisDetail: 'Şiddetli darbe kaynaklı kontüzyon',
    status: 'recovered',
    statusLabel: 'Tam İyileşti',
    days: 11,
    missedMatches: 1,
    season: '2024/25',
    recordedAt: '18.08.2024',
    initials: 'BM',
    avatarTone: 'from-primary to-secondary',
  },
  {
    id: '7',
    playerName: 'Uğurcan Çakır',
    number: 1,
    positionLabel: '#1 • KALECİ (KAPTAN)',
    diagnosis: 'Burun Fraktürü & Koruyucu Karbon Maske',
    diagnosisDetail: 'Kapalı redüksiyon uygulandı, maça engel yok',
    status: 'recovered',
    statusLabel: 'Tam İyileşti',
    days: 7,
    missedMatches: 0,
    season: '2024/25',
    recordedAt: '10.09.2024',
    initials: 'UÇ',
    avatarTone: 'from-primary-container to-tertiary-container',
  },
]

export const adminInjuryRotation = [
  {
    name: 'Stefano Denswil',
    line: 'Sol Stoper • Formda',
    badge: "İLK 11'DE",
    tone: 'bg-secondary-container text-on-secondary-container',
  },
  {
    name: 'Arseniy Batagov',
    line: 'Sağ Stoper • Alternatif',
    badge: 'KADRODA',
    tone: 'bg-surface-container-high text-on-surface',
  },
  {
    name: 'Serdar Saatçı',
    line: 'Stoper • Rotasyon',
    badge: 'YEDEKTE',
    tone: 'bg-surface-container text-on-surface-variant',
  },
]

const doctorNoteDefault =
  'MR kontrollerinde yırtık alanında fibröz doku oluşumu ve iyileşme periyodu hedeflenen takvimle uyumlu gözlemlendi. Oyuncu fizyoterapist eşliğinde düz koşu ve izometrik kuvvet egzersizlerine başlamıştır. Nüks riskinin önlenmesi adına sonraki 2 lig maçında kadroya alınmayacak, risk seviyesi minimuma indiğinde takımla tam çalışmaya dahil edilecektir.'

export const defaultAdminInjuryFormDraft: AdminInjuryFormDraft = {
  id: '1',
  recordCode: '#INJ-2024-SAVIC15',
  statusBadge: 'TEDAVİDE',
  playerId: '1',
  playerName: 'Stefan Savić',
  playerNumber: '15',
  playerNationality: 'MNE / KARADAĞ',
  playerPosition: 'Stoper (Merkez Savunma)',
  contractLabel: 'Sözleşme: 2024-2027',
  season: '2024-2025',
  category: 'muscle',
  tffCode: 'M-62.4',
  diagnosis: 'Sol Arka Adale Yırtığı (Hamstring Biceps Femoris Grade 2)',
  diagnosisDate: '2024-09-18',
  expectedReturnDate: '2024-10-25',
  expectedReturnNote: 'Hedef: 10. Hafta Göztepe Deplasman Karşılaşması.',
  totalDays: '37',
  missedMatches: '5',
  stage: 'individual',
  doctorNote: doctorNoteDefault,
  pressTransferable: true,
  previewDiagnosis: 'Hamstring Biceps Femoris Grade 2 Yırtık',
  daysInjuredLabel: '37 GÜNDÜR SAKAT',
  recoveryPercent: '75',
  returnMatchLabel: 'Göztepe (D) Maçı',
  currentStatusLabel: 'Bireysel Saha Çalışması',
  ballWorkLabel: 'Kısmi (Temassız)',
  lastCheckLabel: '22.10.2024 (Mehmet Ali Yılmaz Tesisi)',
  initials: 'SS',
  avatarTone: 'from-primary to-primary-container',
  doctorName: 'Op. Dr. Halil Polat',
  doctorTitle: 'Trabzonspor Kulübü Başhekimi & Sağlık Kurulu Başkanı',
  protocolNo: '#TFF-MED-8841',
}

export const emptyAdminInjuryFormDraft: AdminInjuryFormDraft = {
  id: '',
  recordCode: '#INJ-YENİ',
  statusBadge: 'YENİ KAYIT',
  playerId: '1',
  playerName: 'Stefan Savić',
  playerNumber: '15',
  playerNationality: 'MNE / KARADAĞ',
  playerPosition: 'Stoper (Merkez Savunma)',
  contractLabel: 'Sözleşme: 2024-2027',
  season: '2024-2025',
  category: 'muscle',
  tffCode: '—',
  diagnosis: '',
  diagnosisDate: '',
  expectedReturnDate: '',
  expectedReturnNote: 'Tahmini dönüş tarihi girildiğinde hesaplanır.',
  totalDays: '0',
  missedMatches: '0',
  stage: 'rest',
  doctorNote: '',
  pressTransferable: false,
  previewDiagnosis: 'Teşhis bekleniyor',
  daysInjuredLabel: '0 GÜNDÜR SAKAT',
  recoveryPercent: '0',
  returnMatchLabel: '—',
  currentStatusLabel: 'İstirahat / Klinik',
  ballWorkLabel: 'Yok',
  lastCheckLabel: '—',
  initials: 'SS',
  avatarTone: 'from-primary to-primary-container',
  doctorName: 'Op. Dr. Halil Polat',
  doctorTitle: 'Trabzonspor Kulübü Başhekimi & Sağlık Kurulu Başkanı',
  protocolNo: '#TFF-MED-DRAFT',
}

export function getAdminInjuryFormDraft(injuryId: string | undefined): AdminInjuryFormDraft {
  if (!injuryId) {
    return emptyAdminInjuryFormDraft
  }

  if (injuryId === defaultAdminInjuryFormDraft.id || injuryId === '1') {
    return defaultAdminInjuryFormDraft
  }

  const row = adminInjuryListRows.find((item) => item.id === injuryId)

  if (!row) {
    return {
      ...emptyAdminInjuryFormDraft,
      id: injuryId,
      recordCode: `#INJ-${injuryId}`,
    }
  }

  return {
    ...emptyAdminInjuryFormDraft,
    id: row.id,
    recordCode: `#INJ-2024-${row.playerName.split(' ').pop()?.toUpperCase()}${row.number}`,
    statusBadge:
      row.status === 'recovered'
        ? 'İYİLEŞTİ'
        : row.status === 'match-form'
          ? 'MAÇ FORMU'
          : 'TEDAVİDE',
    playerId: row.id,
    playerName: row.playerName,
    playerNumber: String(row.number),
    diagnosis: row.diagnosis,
    previewDiagnosis: row.diagnosis,
    totalDays: String(row.days),
    missedMatches: String(row.missedMatches),
    daysInjuredLabel: `${row.days} GÜNDÜR SAKAT`,
    season: row.season === '2023/24' ? '2023-2024' : '2024-2025',
    stage:
      row.status === 'recovered'
        ? 'ready'
        : row.status === 'match-form'
          ? 'warmup'
          : 'individual',
    initials: row.initials,
    avatarTone: row.avatarTone,
  }
}
