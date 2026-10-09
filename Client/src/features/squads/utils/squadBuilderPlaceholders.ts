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

function formation(
  id: BuilderFormationId,
  rows: FormationConfig['rows'],
): FormationConfig {
  return {
    id,
    label: id,
    lineLabel: id,
    rows,
  }
}

export const formationConfigs: FormationConfig[] = [
  formation('4-2-3-1', [
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
      { id: 'RCB', label: 'RCB', roleLabel: 'Stoper' },
      { id: 'RB', label: 'RB', roleLabel: 'Sağ Bek' },
    ],
    [{ id: 'GK', label: 'GK', roleLabel: 'Kaleci' }],
  ]),
  formation('4-3-3', [
    [{ id: 'ST', label: 'ST', roleLabel: 'Santrfor' }],
    [
      { id: 'LW', label: 'LW', roleLabel: 'Sol Kanat' },
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
  ]),
  formation('4-3-1-2', [
    [
      { id: 'ST', label: 'ST', roleLabel: 'Santrfor' },
      { id: 'ST2', label: 'ST', roleLabel: 'İkinci Forvet' },
    ],
    [{ id: 'CAM', label: 'CAM', roleLabel: '10 Numara' }],
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
  ]),
  formation('4-1-4-1', [
    [{ id: 'ST', label: 'ST', roleLabel: 'Santrfor' }],
    [
      { id: 'LM', label: 'LM', roleLabel: 'Sol Kanat' },
      { id: 'LCM', label: 'LCM', roleLabel: 'İç Orta' },
      { id: 'RCM', label: 'RCM', roleLabel: 'İç Orta' },
      { id: 'RM', label: 'RM', roleLabel: 'Sağ Kanat' },
    ],
    [{ id: 'CDM', label: 'CDM', roleLabel: 'Ön Libero' }],
    [
      { id: 'LB', label: 'LB', roleLabel: 'Sol Bek' },
      { id: 'LCB', label: 'LCB', roleLabel: 'Stoper' },
      { id: 'RCB', label: 'RCB', roleLabel: 'Stoper' },
      { id: 'RB', label: 'RB', roleLabel: 'Sağ Bek' },
    ],
    [{ id: 'GK', label: 'GK', roleLabel: 'Kaleci' }],
  ]),
  formation('4-4-2', [
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
  ]),
  formation('4-4-1-1', [
    [{ id: 'ST', label: 'ST', roleLabel: 'Santrfor' }],
    [{ id: 'CAM', label: 'CAM', roleLabel: '10 Numara' }],
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
  ]),
  formation('4-5-1', [
    [{ id: 'ST', label: 'ST', roleLabel: 'Santrfor' }],
    [
      { id: 'LM', label: 'LM', roleLabel: 'Sol Kanat' },
      { id: 'LCM', label: 'LCM', roleLabel: 'İç Orta' },
      { id: 'CM', label: 'CM', roleLabel: 'Merkez' },
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
  ]),
  formation('3-5-2', [
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
  ]),
  formation('3-4-3', [
    [{ id: 'ST', label: 'ST', roleLabel: 'Santrfor' }],
    [
      { id: 'LW', label: 'LW', roleLabel: 'Sol Kanat' },
      { id: 'RW', label: 'RW', roleLabel: 'Sağ Kanat' },
    ],
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
  ]),
  formation('3-4-1-2', [
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
  ]),
  formation('3-4-2-1', [
    [{ id: 'ST', label: 'ST', roleLabel: 'Santrfor' }],
    [
      { id: 'LW', label: 'LW', roleLabel: 'Sol 10' },
      { id: 'RW', label: 'RW', roleLabel: 'Sağ 10' },
    ],
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
  ]),
  formation('5-3-2', [
    [
      { id: 'ST', label: 'ST', roleLabel: 'Santrfor' },
      { id: 'ST2', label: 'ST', roleLabel: 'İkinci Forvet' },
    ],
    [
      { id: 'LCM', label: 'LCM', roleLabel: 'İç Orta' },
      { id: 'CM', label: 'CM', roleLabel: 'Merkez' },
      { id: 'RCM', label: 'RCM', roleLabel: 'İç Orta' },
    ],
    [
      { id: 'LWB', label: 'LWB', roleLabel: 'Sol Kanat Bek' },
      { id: 'LCB', label: 'LCB', roleLabel: 'Stoper' },
      { id: 'CB', label: 'CB', roleLabel: 'Libero' },
      { id: 'RCB', label: 'RCB', roleLabel: 'Stoper' },
      { id: 'RWB', label: 'RWB', roleLabel: 'Sağ Kanat Bek' },
    ],
    [{ id: 'GK', label: 'GK', roleLabel: 'Kaleci' }],
  ]),
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

  const avgAge =
    starters.length === 0
      ? 0
      : starters.reduce((sum, player) => sum + player.age, 0) / starters.length
  const totalValue = allPlayers.reduce((sum, player) => sum + player.marketValueM, 0)

  return {
    starterFilled: starters.length,
    benchFilled: benchIds.length,
    filled: starters.length,
    avgAge: avgAge.toFixed(1),
    totalValue: `${totalValue.toFixed(1)}M €`,
  }
}
