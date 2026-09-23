import type { AdminSeasonFormDraft, AdminSeasonListRow } from './adminSeasonTypes'

export const adminSeasonListStats = {
  definedLabel: 'Sistemde Tanımlı',
  definedValue: '6 Sezon',
  definedNote: '2020/21 – 2025/26 dönemi',
  activeLabel: 'Aktif Sezon',
  activeValue: '2024/25',
  activeNote: '34 Müsabaka • 28 Kayıtlı Oyuncu',
  matchesLabel: 'Kayıtlı Maç Verisi',
  matchesValue: '482 Maç',
  matchesNote: 'Süper Lig, Kupa ve Avrupa',
}

export const adminSeasonListRows: AdminSeasonListRow[] = [
  {
    id: '1',
    name: '2025/26',
    subtitle: 'Gelecek Sezon Projeksiyonu',
    startDateLabel: '01.08.2025',
    endDateLabel: '31.05.2026',
    startSortKey: '2025-08-01',
    status: 'planned',
    statusLabel: 'Planlandı',
    details: ['Fikstür Hazırlığı', 'Takvim henüz kesinleşmedi'],
    matchCount: 0,
    canDelete: true,
  },
  {
    id: '2',
    name: '2024/25',
    subtitle: 'Trendyol Süper Lig & ZTK',
    startDateLabel: '09.08.2024',
    endDateLabel: '31.05.2025',
    startSortKey: '2024-08-09',
    status: 'active',
    statusLabel: 'Mevcut Sezon (Aktif)',
    details: ['34 Maç', '28 Oyuncu', '14 Sakatlık'],
    matchCount: 34,
    isLive: true,
    canDelete: false,
  },
  {
    id: '3',
    name: '2023/24',
    subtitle: 'Süper Lig & Kupa',
    startDateLabel: '11.08.2023',
    endDateLabel: '26.05.2024',
    startSortKey: '2023-08-11',
    status: 'completed',
    statusLabel: 'Tamamlandı',
    details: ['38 Maç', '3. Sıra', 'Kupa Finalisti'],
    matchCount: 38,
    canDelete: true,
  },
  {
    id: '4',
    name: '2022/23',
    subtitle: 'Süper Kupa & UEFA',
    startDateLabel: '05.08.2022',
    endDateLabel: '07.06.2023',
    startSortKey: '2022-08-05',
    status: 'archive',
    statusLabel: 'Arşiv',
    details: ['36 Maç', 'Süper Kupa Şampiyonu'],
    matchCount: 36,
    canDelete: true,
  },
  {
    id: '5',
    name: '2021/22',
    subtitle: 'Tarihi Süper Lig Zaferi',
    startDateLabel: '13.08.2021',
    endDateLabel: '22.05.2022',
    startSortKey: '2021-08-13',
    status: 'legendary',
    statusLabel: 'Efsane Şampiyonluk',
    details: ['38 Maç', '81 Puan', 'ŞAMPİYON'],
    matchCount: 38,
    isLegendary: true,
    canDelete: true,
  },
  {
    id: '6',
    name: '2020/21',
    subtitle: 'Pandemi Dönemi Takvimi',
    startDateLabel: '11.09.2020',
    endDateLabel: '15.05.2021',
    startSortKey: '2020-09-11',
    status: 'archive',
    statusLabel: 'Arşiv',
    details: ['40 Maç', '71 Puan', '4. Sıra'],
    matchCount: 40,
    canDelete: true,
  },
]

export const defaultAdminSeasonFormDraft: AdminSeasonFormDraft = {
  id: '2',
  recordCode: '#SEZ-2024-25 • AKTİF SEZON',
  name: '2024/25',
  startDate: '2024-08-09',
  endDate: '2025-05-31',
  isActive: true,
  description:
    '2024-2025 Trendyol Süper Lig ve Ziraat Türkiye Kupası maratonu. Kadro revizyonu ve Avrupa kupalarına katılım hedefiyle yürütülen operasyon dönemi.',
  leagueRankLabel: 'İLK 3',
  leagueRankNote: 'Avrupa Potası',
  squadFillLabel: '28 / 30',
  squadFillNote: '2 Boş Lisans Hakkı',
  scheduleLabel: '38 HAFTA',
  scheduleNote: '18 Tamamlandı',
  previewLeague: 'TRENDYOL SÜPER LİG',
  previewWeekLabel: '19. HAFTA',
  linkedModules: [
    {
      id: 'players',
      icon: 'groups',
      title: 'Kayıtlı Oyuncu Kadrosu',
      value: '28 Lisanslı Futbolcu',
    },
    {
      id: 'matches',
      icon: 'stadium',
      title: 'Resmi Müsabakalar',
      value: '34 Karşılaşma (18 Oynandı)',
    },
    {
      id: 'injuries',
      icon: 'medical_services',
      title: 'Sakatlık Kayıtları',
      value: '14 Tıbbi Rapor',
    },
    {
      id: 'quizzes',
      icon: 'quiz',
      title: 'Quiz ve Taraftar Puanları',
      value: '6 Aktif Turnuva',
    },
  ],
  createdBy: 'DOZER CEMİL',
  lastUpdated: 'DÜN, 16:45',
}

export const emptyAdminSeasonFormDraft: AdminSeasonFormDraft = {
  id: '',
  recordCode: '#SEZ-YENİ',
  name: '',
  startDate: '',
  endDate: '',
  isActive: false,
  description: '',
  leagueRankLabel: '—',
  leagueRankNote: 'Henüz tahmin yok',
  squadFillLabel: '0 / 30',
  squadFillNote: 'Lisans atanmadı',
  scheduleLabel: '0 HAFTA',
  scheduleNote: 'Fikstür bekleniyor',
  previewLeague: 'SÜPER LİG',
  previewWeekLabel: '—',
  linkedModules: [
    {
      id: 'players',
      icon: 'groups',
      title: 'Kayıtlı Oyuncu Kadrosu',
      value: '0 Lisanslı Futbolcu',
    },
    {
      id: 'matches',
      icon: 'stadium',
      title: 'Resmi Müsabakalar',
      value: '0 Karşılaşma',
    },
    {
      id: 'injuries',
      icon: 'medical_services',
      title: 'Sakatlık Kayıtları',
      value: '0 Tıbbi Rapor',
    },
    {
      id: 'quizzes',
      icon: 'quiz',
      title: 'Quiz ve Taraftar Puanları',
      value: '0 Aktif Turnuva',
    },
  ],
  createdBy: 'DOZER CEMİL',
  lastUpdated: '—',
}

export function getAdminSeasonFormDraft(seasonId: string | undefined): AdminSeasonFormDraft {
  if (!seasonId) {
    return emptyAdminSeasonFormDraft
  }

  if (seasonId === defaultAdminSeasonFormDraft.id || seasonId === '2') {
    return defaultAdminSeasonFormDraft
  }

  const row = adminSeasonListRows.find((season) => season.id === seasonId)

  if (!row) {
    return {
      ...emptyAdminSeasonFormDraft,
      id: seasonId,
      recordCode: `#SEZ-${seasonId}`,
      name: `Sezon ${seasonId}`,
    }
  }

  const [day, month, year] = row.startDateLabel.split('.')
  const [endDay, endMonth, endYear] = row.endDateLabel.split('.')

  return {
    ...emptyAdminSeasonFormDraft,
    id: row.id,
    recordCode: `#SEZ-${row.name.replace('/', '-')} • ${row.statusLabel.toUpperCase()}`,
    name: row.name,
    startDate: `${year}-${month}-${day}`,
    endDate: `${endYear}-${endMonth}-${endDay}`,
    isActive: row.status === 'active',
    description: row.subtitle,
    scheduleNote: row.details.join(' • '),
  }
}
