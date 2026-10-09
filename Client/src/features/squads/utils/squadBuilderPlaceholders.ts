import type {
  AttackStyleOption,
  BenchSlotId,
  BuilderFormationId,
  BuilderPlayer,
  BuilderSlotId,
  DefenseLineOption,
  FormationConfig,
  TempoOption,
} from './squadBuilderTypes'

export const NOTES_MAX_LENGTH = 400

export const defaultTitle = 'Akyazı Şok Presi: Karadeniz Fırtınası 4-2-3-1'

export const defaultNotes =
  'İlk 20 dakika yüksek ön alan presi. Pivot süpürücü kalır, 10 numara ikinci toplara iner. Santrfor stoperleri yıpratır.'

export const attackStyleOptions: AttackStyleOption[] = ['Baskılı', 'Dengeli', 'Kontra']

export const defenseLineOptions: DefenseLineOption[] = ['Yüksek', 'Dengeli', 'Derin']

export const tempoOptions: TempoOption[] = ['Yüksek', 'Normal', 'Düşük']

export const BENCH_SLOT_IDS: BenchSlotId[] = [
  'BENCH_1',
  'BENCH_2',
  'BENCH_3',
  'BENCH_4',
  'BENCH_5',
  'BENCH_6',
  'BENCH_7',
  'BENCH_8',
  'BENCH_9',
  'BENCH_10',
]

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

export function getFormationConfig(id: BuilderFormationId): FormationConfig {
  const found = formationConfigs.find((item) => item.id === id)

  if (!found) {
    return formationConfigs[0]
  }

  return found
}

export function slotIdsForFormation(id: BuilderFormationId): BuilderSlotId[] {
  return getFormationConfig(id).rows.flatMap((row) => row.map((slot) => slot.id))
}

export function isBenchSlotId(slotId: string): slotId is BenchSlotId {
  return BENCH_SLOT_IDS.includes(slotId as BenchSlotId)
}

export function computeSquadStats(
  starterAssignments: Partial<Record<BuilderSlotId, string>>,
  benchAssignments: Partial<Record<BenchSlotId, string>>,
  playersById: Map<string, BuilderPlayer>,
) {
  const starterIds = Object.values(starterAssignments).filter((id): id is string => Boolean(id))
  const benchIds = Object.values(benchAssignments).filter((id): id is string => Boolean(id))

  const starters = starterIds
    .map((id) => playersById.get(id))
    .filter((player): player is BuilderPlayer => Boolean(player))

  const allPlayers = [...starterIds, ...benchIds]
    .map((id) => playersById.get(id))
    .filter((player): player is BuilderPlayer => Boolean(player))

  const foreign = starters.filter((player) => !player.isDomestic).length
  const domestic = starters.filter((player) => player.isDomestic).length
  const avgAge =
    starters.length === 0
      ? 0
      : starters.reduce((sum, player) => sum + player.age, 0) / starters.length
  const totalValue = allPlayers.reduce((sum, player) => sum + player.marketValueM, 0)

  return {
    starterFilled: starters.length,
    benchFilled: benchIds.length,
    filled: starters.length,
    foreign,
    domestic,
    avgAge: avgAge.toFixed(1),
    totalValue: `${totalValue.toFixed(1)}M €`,
  }
}
