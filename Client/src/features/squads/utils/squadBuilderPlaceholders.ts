import type {
  BuilderFormationId,
  BuilderPlayer,
  BuilderSlotId,
  FormationConfig,
} from './squadBuilderTypes'

export const defaultTitle = 'Akyazı Şok Presi: Karadeniz Fırtınası 4-2-3-1'

export const defaultNotes =
  "Akyazı'da ilk 20 dakika yoğun ön alan şok presiyle rakip stoperleri hataya zorluyoruz. Mendy ve Lundstram tandeminde biri mutlaka süpürücü olarak yay çevresini kapatacak. Sol kanat (LW) içe kat ettiğinde Eren Elmalı çizgiyi boydan boya kullanacak. Simon Banza ceza sahasında stoperleri yıpratırken Cham ikinci toplara şut arayacak."

export const pressOptions = [
  'Yüksek Şok Pres (Akyazı Baskısı)',
  'Dengeli 2. Bölge Presi',
  'Kompakt Derin Savunma Bloğu',
] as const

export const defenseLineOptions = [
  'Orta Saha İlerisi (Ofsayt Tuzağı)',
  'Normal Hat (Standart Derinlik)',
  'Ceza Sahası Önü (Düşük Risk)',
] as const

export const attackWidthOptions = [
  'Geniş Alan (Çizgi Bekleri)',
  'Merkezden Kısa Pas Kombinasyonu',
  'Doğrudan Kanat Geçişleri',
] as const

export const formationConfigs: FormationConfig[] = [
  {
    id: '4-2-3-1',
    label: '4-2-3-1 (Ofansif)',
    lineLabel: '4-2-3-1 Taktik Çizgisi',
    rows: [
      [{ id: 'ST', label: 'ST', roleLabel: 'Santrfor' }],
      [
        { id: 'LW', label: 'LW', roleLabel: 'Sol Kanat' },
        { id: 'CAM', label: 'CAM', roleLabel: '10 Numara' },
        { id: 'RW', label: 'RW', roleLabel: 'Sağ Kanat' },
      ],
      [
        { id: 'LDM', label: 'LDM', roleLabel: 'Ön Libero' },
        { id: 'RDM', label: 'RDM', roleLabel: 'Merkez' },
      ],
      [
        { id: 'LB', label: 'LB', roleLabel: 'Sol Bek' },
        { id: 'LCB', label: 'LCB', roleLabel: 'Stoper' },
        { id: 'RCB', label: 'RCB', roleLabel: 'Lider Stoper' },
        { id: 'RB', label: 'RB', roleLabel: 'Sağ Bek' },
      ],
      [{ id: 'GK', label: 'GK', roleLabel: 'Kaptan' }],
    ],
  },
  {
    id: '4-3-3',
    label: '4-3-3 Hücum',
    lineLabel: '4-3-3 Taktik Çizgisi',
    rows: [
      [
        { id: 'LW', label: 'LW', roleLabel: 'Sol Kanat' },
        { id: 'ST', label: 'ST', roleLabel: 'Santrfor' },
        { id: 'RW', label: 'RW', roleLabel: 'Sağ Kanat' },
      ],
      [
        { id: 'LCM', label: 'LCM', roleLabel: 'İç Orta' },
        { id: 'CM', label: 'CM', roleLabel: 'Merkez' },
        { id: 'RCM', label: 'RCM', roleLabel: 'İç Orta' },
      ],
      [
        { id: 'LB', label: 'LB', roleLabel: 'Sol Bek' },
        { id: 'LCB', label: 'LCB', roleLabel: 'Stoper' },
        { id: 'RCB', label: 'RCB', roleLabel: 'Stoper' },
        { id: 'RB', label: 'RB', roleLabel: 'Sağ Bek' },
      ],
      [{ id: 'GK', label: 'GK', roleLabel: 'Kaleci' }],
    ],
  },
  {
    id: '3-5-2',
    label: '3-5-2 Total Fırtına',
    lineLabel: '3-5-2 Taktik Çizgisi',
    rows: [
      [
        { id: 'ST', label: 'ST', roleLabel: 'Santrfor' },
        { id: 'ST2', label: 'ST', roleLabel: 'İkinci Forvet' },
      ],
      [
        { id: 'LWB', label: 'LWB', roleLabel: 'Sol Kanat Bek' },
        { id: 'LCM', label: 'LCM', roleLabel: 'İç Orta' },
        { id: 'CM', label: 'CM', roleLabel: 'Merkez' },
        { id: 'RCM', label: 'RCM', roleLabel: 'İç Orta' },
        { id: 'RWB', label: 'RWB', roleLabel: 'Sağ Kanat Bek' },
      ],
      [
        { id: 'LCB', label: 'LCB', roleLabel: 'Stoper' },
        { id: 'CB', label: 'CB', roleLabel: 'Libero' },
        { id: 'RCB', label: 'RCB', roleLabel: 'Stoper' },
      ],
      [{ id: 'GK', label: 'GK', roleLabel: 'Kaleci' }],
    ],
  },
  {
    id: '4-4-2',
    label: '4-4-2 Klasik Trabzon',
    lineLabel: '4-4-2 Taktik Çizgisi',
    rows: [
      [
        { id: 'ST', label: 'ST', roleLabel: 'Santrfor' },
        { id: 'ST2', label: 'ST', roleLabel: 'İkinci Forvet' },
      ],
      [
        { id: 'LM', label: 'LM', roleLabel: 'Sol Kanat' },
        { id: 'LCM', label: 'LCM', roleLabel: 'İç Orta' },
        { id: 'RCM', label: 'RCM', roleLabel: 'İç Orta' },
        { id: 'RM', label: 'RM', roleLabel: 'Sağ Kanat' },
      ],
      [
        { id: 'LB', label: 'LB', roleLabel: 'Sol Bek' },
        { id: 'LCB', label: 'LCB', roleLabel: 'Stoper' },
        { id: 'RCB', label: 'RCB', roleLabel: 'Stoper' },
        { id: 'RB', label: 'RB', roleLabel: 'Sağ Bek' },
      ],
      [{ id: 'GK', label: 'GK', roleLabel: 'Kaleci' }],
    ],
  },
  {
    id: '3-4-1-2',
    label: '3-4-1-2 Kanat Bekli',
    lineLabel: '3-4-1-2 Taktik Çizgisi',
    rows: [
      [
        { id: 'ST', label: 'ST', roleLabel: 'Santrfor' },
        { id: 'ST2', label: 'ST', roleLabel: 'İkinci Forvet' },
      ],
      [{ id: 'CAM', label: 'CAM', roleLabel: '10 Numara' }],
      [
        { id: 'LWB', label: 'LWB', roleLabel: 'Sol Kanat Bek' },
        { id: 'LCM', label: 'LCM', roleLabel: 'İç Orta' },
        { id: 'RCM', label: 'RCM', roleLabel: 'İç Orta' },
        { id: 'RWB', label: 'RWB', roleLabel: 'Sağ Kanat Bek' },
      ],
      [
        { id: 'LCB', label: 'LCB', roleLabel: 'Stoper' },
        { id: 'CB', label: 'CB', roleLabel: 'Libero' },
        { id: 'RCB', label: 'RCB', roleLabel: 'Stoper' },
      ],
      [{ id: 'GK', label: 'GK', roleLabel: 'Kaleci' }],
    ],
  },
]

export const builderPlayers: BuilderPlayer[] = [
  {
    id: 'cakir',
    name: 'Uğurcan Çakır',
    shortName: 'Uğurcan Çakır',
    number: '1',
    posGroup: 'GK',
    roleHint: 'Kaleci • Türkiye • Kaptan',
    age: 28,
    isDomestic: true,
    marketValueM: 8.5,
    avatarGradient: 'from-[#8ccefd] to-[#5a0e27]',
    initials: 'UÇ',
  },
  {
    id: 'banza',
    name: 'Simon Banza',
    shortName: 'Simon Banza',
    number: '99',
    posGroup: 'FW',
    roleHint: 'Santrfor • D.R. Kongo • 28 Yaş',
    age: 28,
    isDomestic: false,
    marketValueM: 16,
    avatarGradient: 'from-[#3f2900] to-[#1A040B]',
    initials: 'SB',
  },
  {
    id: 'dragus',
    name: 'Denis Drăguș',
    shortName: 'Denis Drăguș',
    number: '70',
    posGroup: 'FW',
    roleHint: 'Sol Kanat / Gölge Forvet',
    age: 25,
    isDomestic: false,
    marketValueM: 7.5,
    avatarGradient: 'from-[#5a0e27] to-[#1A040B]',
    initials: 'DD',
  },
  {
    id: 'cham',
    name: 'Muhammed Cham',
    shortName: 'M. Cham',
    number: '10',
    posGroup: 'MF',
    roleHint: '10 Numara • Avusturya',
    age: 24,
    isDomestic: false,
    marketValueM: 6,
    avatarGradient: 'from-[#12648e] to-[#1A040B]',
    initials: 'MC',
  },
  {
    id: 'visca',
    name: 'Edin Višća',
    shortName: 'Edin Višća',
    number: '7',
    posGroup: 'FW',
    roleHint: 'Sağ Kanat • Bosna Hersek',
    age: 35,
    isDomestic: false,
    marketValueM: 2.5,
    avatarGradient: 'from-[#12648e] to-[#3a0014]',
    initials: 'EV',
  },
  {
    id: 'lundstram',
    name: 'John Lundstram',
    shortName: 'J. Lundstram',
    number: '5',
    posGroup: 'MF',
    roleHint: 'Ön Libero • İngiltere',
    age: 30,
    isDomestic: false,
    marketValueM: 4,
    avatarGradient: 'from-[#544245] to-[#1A040B]',
    initials: 'JL',
  },
  {
    id: 'mendy',
    name: 'Batista Mendy',
    shortName: 'Batista Mendy',
    number: '6',
    posGroup: 'MF',
    roleHint: 'Merkez Orta • Fransa',
    age: 24,
    isDomestic: false,
    marketValueM: 5.5,
    avatarGradient: 'from-[#5a0e27] to-[#12648e]',
    initials: 'BM',
  },
  {
    id: 'elmali',
    name: 'Eren Elmalı',
    shortName: 'Eren Elmalı',
    number: '18',
    posGroup: 'DF',
    roleHint: 'Sol Bek • Türkiye',
    age: 24,
    isDomestic: true,
    marketValueM: 5,
    badge: 'YERLİ (TR)',
    badgeTone: 'domestic',
    avatarGradient: 'from-[#75B7E5] to-[#1A040B]',
    initials: 'EE',
  },
  {
    id: 'batagov',
    name: 'Arseniy Batagov',
    shortName: 'A. Batagov',
    number: '44',
    posGroup: 'DF',
    roleHint: 'Stoper • Ukrayna',
    age: 22,
    isDomestic: false,
    marketValueM: 4.5,
    avatarGradient: 'from-[#3a0014] to-[#1A040B]',
    initials: 'AB',
  },
  {
    id: 'savic',
    name: 'Stefan Savić',
    shortName: 'Stefan Savić',
    number: '15',
    posGroup: 'DF',
    roleHint: 'Lider Stoper • Karadağ',
    age: 33,
    isDomestic: false,
    marketValueM: 3,
    avatarGradient: 'from-[#5a0e27] to-[#1A040B]',
    initials: 'SS',
  },
  {
    id: 'malheiro',
    name: 'Pedro Malheiro',
    shortName: 'P. Malheiro',
    number: '79',
    posGroup: 'DF',
    roleHint: 'Sağ Bek • Portekiz',
    age: 23,
    isDomestic: false,
    marketValueM: 4,
    avatarGradient: 'from-[#12648e] to-[#1A040B]',
    initials: 'PM',
  },
  {
    id: 'nwakaeme',
    name: 'Anthony Nwakaeme',
    shortName: 'A. Nwakaeme',
    number: '9',
    posGroup: 'FW',
    roleHint: 'Sol Kanat • Nijerya • Şampiyon 2022',
    age: 35,
    isDomestic: false,
    marketValueM: 1.5,
    badge: 'SİHİRBAZ',
    badgeTone: 'wizard',
    avatarGradient: 'from-[#3f2900] to-[#5a0e27]',
    initials: 'AN',
  },
  {
    id: 'destan',
    name: 'Enis Destan',
    shortName: 'Enis Destan',
    number: '94',
    posGroup: 'FW',
    roleHint: 'Santrfor • Türkiye • 22 Yaş',
    age: 22,
    isDomestic: true,
    marketValueM: 2,
    badge: 'YERLİ (TR)',
    badgeTone: 'domestic',
    avatarGradient: 'from-[#5a0e27] to-[#3f2900]',
    initials: 'ED',
  },
  {
    id: 'tufan',
    name: 'Ozan Tufan',
    shortName: 'Ozan Tufan',
    number: '11',
    posGroup: 'MF',
    roleHint: 'Merkez Orta Saha • 29 Yaş',
    age: 29,
    isDomestic: true,
    marketValueM: 3.5,
    badge: 'YERLİ (TR)',
    badgeTone: 'domestic',
    avatarGradient: 'from-[#12648e] to-[#5a0e27]',
    initials: 'OT',
  },
  {
    id: 'yokuslu',
    name: 'Okay Yokuşlu',
    shortName: 'Okay Yokuşlu',
    number: '35',
    posGroup: 'MF',
    roleHint: 'Ön Libero / Stoper • 30 Yaş',
    age: 30,
    isDomestic: true,
    marketValueM: 2.5,
    badge: 'YERLİ (TR)',
    badgeTone: 'domestic',
    avatarGradient: 'from-[#544245] to-[#5a0e27]',
    initials: 'OY',
  },
  {
    id: 'bozok',
    name: 'Umut Bozok',
    shortName: 'U. Bozok',
    number: '24',
    posGroup: 'FW',
    roleHint: 'Santrfor • Türkiye',
    age: 28,
    isDomestic: true,
    marketValueM: 1.8,
    badge: 'YERLİ (TR)',
    badgeTone: 'domestic',
    avatarGradient: 'from-[#3f2900] to-[#1A040B]',
    initials: 'UB',
  },
  {
    id: 'bardhi',
    name: 'Enis Bardhi',
    shortName: 'E. Bardhi',
    number: '8',
    posGroup: 'MF',
    roleHint: 'Duran Top • Kuzey Makedonya',
    age: 29,
    isDomestic: false,
    marketValueM: 3,
    avatarGradient: 'from-[#12648e] to-[#1A040B]',
    initials: 'EB',
  },
  {
    id: 'turkmen',
    name: 'Hüseyin Türkmen',
    shortName: 'H. Türkmen',
    number: '20',
    posGroup: 'DF',
    roleHint: 'Stoper • Türkiye',
    age: 27,
    isDomestic: true,
    marketValueM: 1.2,
    badge: 'YERLİ (TR)',
    badgeTone: 'domestic',
    avatarGradient: 'from-[#5a0e27] to-[#1A040B]',
    initials: 'HT',
  },
  {
    id: 'cevikkan',
    name: 'Onuralp Çevikkan',
    shortName: 'O. Çevikkan',
    number: '25',
    posGroup: 'GK',
    roleHint: 'Genç Kaleci • Türkiye',
    age: 19,
    isDomestic: true,
    marketValueM: 0.8,
    badge: 'YERLİ (TR)',
    badgeTone: 'domestic',
    avatarGradient: 'from-[#8ccefd] to-[#1A040B]',
    initials: 'OÇ',
  },
  {
    id: 'denswil',
    name: 'Stefano Denswil',
    shortName: 'S. Denswil',
    number: '4',
    posGroup: 'DF',
    roleHint: 'Stoper • Hollanda',
    age: 31,
    isDomestic: false,
    marketValueM: 1.5,
    avatarGradient: 'from-[#3a0014] to-[#12648e]',
    initials: 'SD',
  },
]

export const defaultAssignments: Partial<Record<BuilderSlotId, string>> = {
  ST: 'banza',
  LW: 'dragus',
  CAM: 'cham',
  RW: 'visca',
  LDM: 'lundstram',
  RDM: 'mendy',
  LB: 'elmali',
  LCB: 'batagov',
  RCB: 'savic',
  RB: 'malheiro',
  GK: 'cakir',
}

export function getFormationConfig(id: BuilderFormationId): FormationConfig {
  const found = formationConfigs.find((item) => item.id === id)

  if (!found) {
    return formationConfigs[0]
  }

  return found
}

export function getPlayerById(id: string): BuilderPlayer | undefined {
  return builderPlayers.find((player) => player.id === id)
}

export function slotIdsForFormation(id: BuilderFormationId): BuilderSlotId[] {
  return getFormationConfig(id).rows.flatMap((row) => row.map((slot) => slot.id))
}

export function computeSquadStats(assignments: Partial<Record<BuilderSlotId, string>>) {
  const players = Object.values(assignments)
    .filter((id): id is string => Boolean(id))
    .map((id) => getPlayerById(id))
    .filter((player): player is BuilderPlayer => Boolean(player))

  const foreign = players.filter((player) => !player.isDomestic).length
  const domestic = players.filter((player) => player.isDomestic).length
  const avgAge =
    players.length === 0
      ? 0
      : players.reduce((sum, player) => sum + player.age, 0) / players.length
  const totalValue = players.reduce((sum, player) => sum + player.marketValueM, 0)

  return {
    filled: players.length,
    foreign,
    domestic,
    avgAge: avgAge.toFixed(1),
    totalValue: `${totalValue.toFixed(1)}M €`,
  }
}
