import type { BuilderPosGroup, BuilderSlotId } from './squadBuilderTypes'

export const SQUAD_PLAYER_DND_TYPE = 'application/x-trabzonly-squad-player'

export type SquadPlayerDragPayload = {
  playerId: string
  sourceSlotId?: string
}

export function setSquadPlayerDragData(
  dataTransfer: DataTransfer,
  payload: SquadPlayerDragPayload,
): void {
  dataTransfer.setData(SQUAD_PLAYER_DND_TYPE, JSON.stringify(payload))
  dataTransfer.setData('text/plain', payload.playerId)
  dataTransfer.effectAllowed = 'move'
}

export function readSquadPlayerDragData(
  dataTransfer: DataTransfer,
): SquadPlayerDragPayload | null {
  const raw = dataTransfer.getData(SQUAD_PLAYER_DND_TYPE)

  if (!raw) {
    const plain = dataTransfer.getData('text/plain')

    if (!plain) {
      return null
    }

    return { playerId: plain }
  }

  try {
    const parsed = JSON.parse(raw) as SquadPlayerDragPayload

    if (!parsed?.playerId) {
      return null
    }

    return parsed
  } catch {
    return null
  }
}

export function posGroupForSlot(
  slotId: BuilderSlotId,
): Exclude<BuilderPosGroup, 'ALL'> {
  if (slotId === 'GK') {
    return 'GK'
  }

  if (
    slotId === 'LB' ||
    slotId === 'LCB' ||
    slotId === 'CB' ||
    slotId === 'RCB' ||
    slotId === 'RB' ||
    slotId === 'LWB' ||
    slotId === 'RWB'
  ) {
    return 'DF'
  }

  if (slotId === 'ST' || slotId === 'ST2' || slotId === 'LW' || slotId === 'RW') {
    return 'FW'
  }

  return 'MF'
}
