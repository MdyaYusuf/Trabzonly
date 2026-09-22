import type { AdminPositionFormDraft, AdminPositionListRow } from './adminPositionTypes'

export const adminPositionListRows: AdminPositionListRow[] = [
  {
    id: '1',
    name: 'Santrafor',
    roleLabel: '1. Forvet / Uç Nokta Bitirici',
    abbreviation: 'ST',
    zone: 'attack',
    zoneLabel: 'Hücum (Merkez)',
    playerCount: 4,
    playerCountLabel: '4 Oyuncu',
    samplePlayers: 'Simon Banza, Enis Destan...',
    statusLabel: 'Aktif',
    icon: 'sports_soccer',
    zoneOrder: 1,
  },
  {
    id: '2',
    name: 'Stoper',
    roleLabel: 'Merkez Savunma Hattı / Tandem',
    abbreviation: 'CB',
    zone: 'defence',
    zoneLabel: 'Savunma (Merkez)',
    playerCount: 5,
    playerCountLabel: '5 Oyuncu',
    samplePlayers: 'Denswil, Savic, Saatçı...',
    statusLabel: 'Aktif',
    icon: 'shield',
    zoneOrder: 3,
  },
  {
    id: '3',
    name: 'Kaleci',
    roleLabel: 'Son Savunma Hattı / Kale Bekçisi',
    abbreviation: 'GK',
    zone: 'goalkeeper',
    zoneLabel: 'Kale',
    playerCount: 4,
    playerCountLabel: '4 Oyuncu',
    samplePlayers: 'Uğurcan Çakır, M. Taha...',
    statusLabel: 'Aktif',
    icon: 'sports_handball',
    zoneOrder: 4,
  },
  {
    id: '4',
    name: 'Sağ Kanat',
    roleLabel: 'Hücum Genişliği & Çizgi Forveti',
    abbreviation: 'RW',
    zone: 'attack',
    zoneLabel: 'Hücum (Kanat)',
    playerCount: 3,
    playerCountLabel: '3 Oyuncu',
    samplePlayers: 'Edin Višća, Cihan Çanak...',
    statusLabel: 'Aktif',
    icon: 'arrow_outward',
    zoneOrder: 1,
  },
  {
    id: '5',
    name: 'Sol Kanat',
    roleLabel: 'Ters Ayaklı İç Forvet / Çizgi Hücumcusu',
    abbreviation: 'LW',
    zone: 'attack',
    zoneLabel: 'Hücum (Kanat)',
    playerCount: 3,
    playerCountLabel: '3 Oyuncu',
    samplePlayers: 'Denis Drăguș, Nwakaeme...',
    statusLabel: 'Aktif',
    icon: 'arrow_upward',
    zoneOrder: 1,
  },
  {
    id: '6',
    name: 'Ön Libero / Defansif Orta Saha',
    roleLabel: 'Top Geri Kazanımı & Çapa / 6 Numara',
    abbreviation: 'DM',
    zone: 'midfield',
    zoneLabel: 'Orta Saha (Defansif)',
    playerCount: 3,
    playerCountLabel: '3 Oyuncu',
    samplePlayers: 'Batista Mendy, Lundstram...',
    statusLabel: 'Aktif',
    icon: 'lock',
    zoneOrder: 2,
  },
  {
    id: '7',
    name: 'Merkez Orta Saha',
    roleLabel: 'İki Yönlü Oyun Kurucu / 8 Numara',
    abbreviation: 'CM',
    zone: 'midfield',
    zoneLabel: 'Orta Saha (Merkez)',
    playerCount: 3,
    playerCountLabel: '3 Oyuncu',
    samplePlayers: 'Okay Yokuşlu, Ozan Tufan...',
    statusLabel: 'Aktif',
    icon: 'sync_alt',
    zoneOrder: 2,
  },
  {
    id: '8',
    name: 'On Numara / Ofansif Orta Saha',
    roleLabel: 'Yaratıcı Karar Verici & Kilit Pasör',
    abbreviation: 'AM',
    zone: 'midfield',
    zoneLabel: 'Orta Saha (Ofansif)',
    playerCount: 2,
    playerCountLabel: '2 Oyuncu',
    samplePlayers: 'Muhammed Cham, Bardhi',
    statusLabel: 'Aktif',
    icon: 'auto_awesome',
    zoneOrder: 2,
  },
  {
    id: '9',
    name: 'Sağ Bek',
    roleLabel: 'Sağ Koridor Savunması & Bindirme',
    abbreviation: 'RB',
    zone: 'defence',
    zoneLabel: 'Savunma (Sağ)',
    playerCount: 2,
    playerCountLabel: '2 Oyuncu',
    samplePlayers: 'Pedro Malheiro, Serkan Asan',
    statusLabel: 'Aktif',
    icon: 'transit_enterexit',
    zoneOrder: 3,
  },
  {
    id: '10',
    name: 'Sol Bek',
    roleLabel: 'Sol Koridor Emniyeti & Hücum Destek',
    abbreviation: 'LB',
    zone: 'defence',
    zoneLabel: 'Savunma (Sol)',
    playerCount: 2,
    playerCountLabel: '2 Oyuncu',
    samplePlayers: 'Eren Elmalı, Borna Barišić',
    statusLabel: 'Aktif',
    icon: 'transit_enterexit',
    zoneOrder: 3,
  },
  {
    id: '11',
    name: 'İkinci Forvet',
    roleLabel: 'Gezgin Santrafor Arkası / Gölge Golcü',
    abbreviation: 'SS',
    zone: 'attack',
    zoneLabel: 'Hücum (Destek)',
    playerCount: 0,
    playerCountLabel: '0 Oyuncu',
    samplePlayers: 'Atanmış oyuncu yok',
    statusLabel: 'Aktif',
    icon: 'group_work',
    zoneOrder: 1,
  },
]

export const adminPositionDistribution = {
  totalPlayers: 28,
  idealQuota: 30,
  lines: [
    { id: 'attack', label: 'Hücum (ST, RW, LW, SS)', count: 10, percent: 36 },
    { id: 'midfield', label: 'Orta Saha (DM, CM, AM)', count: 8, percent: 28 },
    { id: 'defence', label: 'Savunma Hattı (CB, RB, LB)', count: 9, percent: 32 },
    { id: 'goalkeeper', label: 'Kale (GK)', count: 4, percent: 14 },
  ],
}

export const defaultAdminPositionFormDraft: AdminPositionFormDraft = {
  id: '1',
  recordCode: '#POS-01 • ST',
  name: 'Santrafor',
  abbreviation: 'ST',
  zone: 'attack',
  zoneSelectLabel: 'Hücum Hattı (FWD)',
  description:
    'Rakip ceza sahası içinde gol arayan, sırtı dönük top saklayan ve hücum presini başlatan en uçtaki merkez hücumcu rolü.',
  isActive: true,
  federationNote:
    'TFF ve UEFA esame listesi senkronizasyonunda bu kısaltma (#POS-01) santrafor lejantı olarak eşleştirilmiştir. Değiştirildiğinde geriye dönük resmi maç istatistikleri korunur.',
  previewNumber: '#17',
  previewPlayerName: 'Simon Banza',
  previewRoleLine: 'Santrafor • 1. Tercih',
  formationLabel: '4-2-3-1',
  linkedPlayers: [
    {
      id: '1',
      numberLabel: '#17',
      name: 'Simon Banza',
      roleNote: 'Santrafor / ST',
      preferenceLabel: '1. TERCİH',
    },
    {
      id: '2',
      numberLabel: '#99',
      name: 'Enis Destan',
      roleNote: 'Santrafor / ST',
      preferenceLabel: '2. TERCİH',
    },
    {
      id: '3',
      numberLabel: '#70',
      name: 'Denis Drăguș',
      roleNote: 'İkincil: ST',
      preferenceLabel: 'ALTERNATİF',
    },
    {
      id: '4',
      numberLabel: '-',
      name: 'Umut Bozok',
      roleNote: 'Santrafor / ST',
      preferenceLabel: 'REZERV',
    },
  ],
  depthLabel: '4 OYUNCU',
  depthNote: 'Bu pozisyonda toplam 4 aktif lisanslı oyuncu kayıtlıdır.',
  lastUpdated: '2 SAAT ÖNCE (DOZER CEMİL)',
}

export const emptyAdminPositionFormDraft: AdminPositionFormDraft = {
  id: '',
  recordCode: '#POS-YENİ',
  name: '',
  abbreviation: '',
  zone: 'midfield',
  zoneSelectLabel: 'Orta Saha (MID)',
  description: '',
  isActive: true,
  federationNote:
    'Yeni pozisyon kaydı TFF/UEFA kısaltma sözlüğüne eklendikten sonra kadro editöründe seçilebilir hale gelir.',
  previewNumber: '#00',
  previewPlayerName: 'Örnek Oyuncu',
  previewRoleLine: 'Yeni Pozisyon • Taslak',
  formationLabel: '4-2-3-1',
  linkedPlayers: [],
  depthLabel: '0 OYUNCU',
  depthNote: 'Bu pozisyona henüz oyuncu atanmadı.',
  lastUpdated: '—',
}

const zoneSelectMap = {
  goalkeeper: 'Kale (GK)',
  defence: 'Savunma Hattı (DEF)',
  midfield: 'Orta Saha (MID)',
  attack: 'Hücum Hattı (FWD)',
} as const

export function getAdminPositionFormDraft(
  positionId: string | undefined,
): AdminPositionFormDraft {
  if (!positionId) {
    return emptyAdminPositionFormDraft
  }

  if (positionId === defaultAdminPositionFormDraft.id || positionId === '1') {
    return defaultAdminPositionFormDraft
  }

  const row = adminPositionListRows.find((position) => position.id === positionId)

  if (!row) {
    return {
      ...emptyAdminPositionFormDraft,
      id: positionId,
      recordCode: `#POS-${positionId}`,
      name: `Pozisyon ${positionId}`,
    }
  }

  return {
    ...emptyAdminPositionFormDraft,
    id: row.id,
    recordCode: `#POS-${row.id.padStart(2, '0')} • ${row.abbreviation}`,
    name: row.name,
    abbreviation: row.abbreviation,
    zone: row.zone,
    zoneSelectLabel: zoneSelectMap[row.zone],
    description: row.roleLabel,
    depthLabel: `${row.playerCount} OYUNCU`,
    depthNote: `Bu pozisyonda toplam ${row.playerCount} aktif lisanslı oyuncu kayıtlıdır.`,
    previewPlayerName: row.samplePlayers.split(',')[0]?.trim() || 'Örnek Oyuncu',
    previewRoleLine: `${row.name} • 1. Tercih`,
  }
}
