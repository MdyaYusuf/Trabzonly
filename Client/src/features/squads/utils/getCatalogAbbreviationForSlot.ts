import type { BuilderSlotId } from './squadBuilderTypes'

/** Mirrors Api SquadTactics.GetCatalogAbbreviationForSlot for client role filtering. */
export function getCatalogAbbreviationForSlot(
  slotKey: string,
): string | null {
  const key = slotKey.trim().toUpperCase()

  switch (key) {
    case 'GK':
      return 'GK'
    case 'LB':
      return 'LB'
    case 'RB':
      return 'RB'
    case 'LCB':
    case 'CB':
    case 'RCB':
      return 'CB'
    case 'LWB':
      return 'LWB'
    case 'RWB':
      return 'RWB'
    case 'CDM':
    case 'LDM':
    case 'RDM':
      return 'DM'
    case 'LCM':
    case 'CM':
    case 'RCM':
      return 'CM'
    case 'LM':
      return 'LM'
    case 'RM':
      return 'RM'
    case 'LCAM':
    case 'CAM':
    case 'RCAM':
      return 'AM'
    case 'LW':
      return 'LW'
    case 'RW':
      return 'RW'
    case 'ST':
    case 'ST2':
      return 'ST'
    default:
      return null
  }
}

export function isBuilderSlotId(slotKey: string): slotKey is BuilderSlotId {
  return getCatalogAbbreviationForSlot(slotKey) !== null
}
