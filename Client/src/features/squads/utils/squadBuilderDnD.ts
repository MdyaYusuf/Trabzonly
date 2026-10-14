import type { BuilderPosGroup, BuilderSlotId } from './squadBuilderTypes'

export const SQUAD_PLAYER_DND_TYPE = 'application/x-trabzonly-squad-player'

export type SquadPlayerDragPayload = {
  playerId: string
  sourceSlotId?: string
}

export function setSquadPlayerDragData(
  dataTransfer: DataTransfer,
  payload: SquadPlayerDragPayload,
  initials?: string,
): void {
  dataTransfer.setData(SQUAD_PLAYER_DND_TYPE, JSON.stringify(payload))
  dataTransfer.setData('text/plain', payload.playerId)
  dataTransfer.effectAllowed = 'move'

  if (initials) {
    setSquadAvatarDragImage(dataTransfer, initials)
  }
}

export function setSquadAvatarDragImage(
  dataTransfer: DataTransfer,
  initials: string,
): void {
  const ghost = document.createElement('div')
  ghost.textContent = initials.slice(0, 2).toUpperCase()
  ghost.setAttribute('aria-hidden', 'true')
  Object.assign(ghost.style, {
    position: 'fixed',
    top: '-200px',
    left: '-200px',
    width: '48px',
    height: '48px',
    borderRadius: '9999px',
    background: '#5a0e27',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    font: '700 13px/1 "Lexend Deca", sans-serif',
    boxShadow: '0 4px 12px rgba(0,0,0,0.35)',
    pointerEvents: 'none',
    zIndex: '9999',
  })
  document.body.appendChild(ghost)
  dataTransfer.setDragImage(ghost, 24, 24)
  window.setTimeout(() => {
    ghost.remove()
  }, 0)
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
