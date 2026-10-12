export const USER_DISPLAY_TAGS = [
  'Taraftarın Sesi',
  'Kombine Sahibi',
  'Taktik Analisti',
  'Tribün Sesi',
] as const

export type UserDisplayTag = (typeof USER_DISPLAY_TAGS)[number]

export const DEFAULT_USER_DISPLAY_TAG: UserDisplayTag = 'Taraftarın Sesi'
