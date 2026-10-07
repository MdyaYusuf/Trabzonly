import type { SquadPreviewDto, SquadSlotResponseDto } from '../squadTypes'
import type { BuilderFormationId } from './squadBuilderTypes'
import { formationConfigs } from './squadBuilderPlaceholders'
import type { PitchPlayer, SquadGalleryCardData } from './squadsGalleryTypes'

function formatRelativeTime(isoDate: string): string {
  const created = new Date(isoDate).getTime()
  const now = Date.now()
  const diffMs = Math.max(0, now - created)
  const minutes = Math.floor(diffMs / 60_000)

  if (minutes < 1) {
    return 'az önce'
  }

  if (minutes < 60) {
    return `${minutes} dk önce`
  }

  const hours = Math.floor(minutes / 60)

  if (hours < 24) {
    return `${hours} saat önce`
  }

  const days = Math.floor(hours / 24)

  if (days < 7) {
    return `${days} gün önce`
  }

  return new Date(isoDate).toLocaleDateString('tr-TR')
}

function shortPlayerName(fullName: string): string {
  const trimmed = fullName.trim()

  if (!trimmed) {
    return '?'
  }

  const parts = trimmed.split(/\s+/)

  if (parts.length === 1) {
    return parts[0]
  }

  return parts[parts.length - 1]
}

function resolveFormationId(formation: string): BuilderFormationId | null {
  const normalized = formation.trim()
  const match = formationConfigs.find((config) => config.id === normalized)

  if (!match) {
    return null
  }

  return match.id
}

function isBenchSlotKey(slotKey: string): boolean {
  return slotKey.toUpperCase().startsWith('BENCH_')
}

function mapSlotsToPitchColumns(
  formation: string,
  slots: SquadSlotResponseDto[],
): PitchPlayer[][] {
  const starterSlots = slots.filter((slot) => !isBenchSlotKey(slot.slotKey))
  const formationId = resolveFormationId(formation)
  const slotByKey = new Map(
    starterSlots.map((slot) => [slot.slotKey.toUpperCase(), slot] as const),
  )

  if (!formationId) {
    return [
      starterSlots.map((slot, index) => ({
        number: slot.playerShirtNumber != null ? String(slot.playerShirtNumber) : '—',
        name: shortPlayerName(slot.playerName),
        tone: index % 2 === 0 ? 'bordo' : 'mavi',
      })),
    ]
  }

  const config = formationConfigs.find((item) => item.id === formationId)

  if (!config) {
    return []
  }

  // Builder rows are attack → defense; gallery columns are left → right (GK → ST).
  const columnRows = [...config.rows].reverse()

  return columnRows.map((row, columnIndex) => {
    const tone: PitchPlayer['tone'] = columnIndex % 2 === 0 ? 'bordo' : 'mavi'

    return row.flatMap((slotDef) => {
      const slot = slotByKey.get(slotDef.id.toUpperCase())

      if (!slot) {
        return []
      }

      return [
        {
          number: slot.playerShirtNumber != null ? String(slot.playerShirtNumber) : '—',
          name: shortPlayerName(slot.playerName),
          tone,
        },
      ]
    })
  })
}

export function mapSquadPreviewToGalleryCard(squad: SquadPreviewDto): SquadGalleryCardData {
  return {
    id: squad.id,
    title: squad.title,
    excerpt: squad.notes.trim(),
    formation: squad.formation,
    formationLabel: squad.formation,
    authorUsername: squad.authorUsername,
    authorDisplayTag: squad.authorDisplayTag,
    publishedLabel: formatRelativeTime(squad.createdDate),
    rating: squad.averageRating,
    ratingCount: squad.ratingCount,
    commentCount: squad.commentCount,
    viewCount: squad.viewCount,
    columns: mapSlotsToPitchColumns(squad.formation, squad.slots ?? []),
  }
}
