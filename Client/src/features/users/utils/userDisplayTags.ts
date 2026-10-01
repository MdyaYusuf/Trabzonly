export const USER_DISPLAY_TAGS = [
  'Kombine Sahibi',
  'Taktik Analisti',
  'Tribün Sesi',
] as const

export type UserDisplayTag = (typeof USER_DISPLAY_TAGS)[number]
