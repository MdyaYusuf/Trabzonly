import type {
  AdminFixtureDraftRow,
  FixtureResponseDto,
  UpdateFixtureWeekItemRequest,
} from '@/features/matchWeek/matchWeekTypes'

function pad(value: number): string {
  return String(value).padStart(2, '0')
}

export function toDatetimeLocalValue(iso: string | null | undefined): string {
  if (!iso) {
    return ''
  }

  const date = new Date(iso)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

export function fromDatetimeLocalValue(value: string): string | null {
  const trimmed = value.trim()

  if (!trimmed) {
    return null
  }

  const date = new Date(trimmed)

  if (Number.isNaN(date.getTime())) {
    return null
  }

  return date.toISOString()
}

export function mapFixtureToDraftRow(fixture: FixtureResponseDto): AdminFixtureDraftRow {
  return {
    id: fixture.id,
    homeClubName: fixture.homeClub.name,
    awayClubName: fixture.awayClub.name,
    kickoffLocal: toDatetimeLocalValue(fixture.kickoff),
    homeScore: fixture.homeScore == null ? '' : String(fixture.homeScore),
    awayScore: fixture.awayScore == null ? '' : String(fixture.awayScore),
  }
}

export function parseOptionalScore(value: string): number | null | 'invalid' {
  const trimmed = value.trim()

  if (!trimmed) {
    return null
  }

  if (!/^\d+$/.test(trimmed)) {
    return 'invalid'
  }

  return Number(trimmed)
}

export function validateFixtureDraftRows(rows: AdminFixtureDraftRow[]): string | null {
  for (const row of rows) {
    const homeScore = parseOptionalScore(row.homeScore)
    const awayScore = parseOptionalScore(row.awayScore)

    if (homeScore === 'invalid' || awayScore === 'invalid') {
      return 'Skorlar negatif olmayan tam sayı olmalıdır.'
    }

    if ((homeScore == null) !== (awayScore == null)) {
      return 'Ev sahibi ve deplasman skorları birlikte girilmeli veya birlikte boş bırakılmalıdır.'
    }

    if (row.kickoffLocal.trim() && fromDatetimeLocalValue(row.kickoffLocal) == null) {
      return 'Geçersiz maç saati.'
    }
  }

  return null
}

export function mapDraftRowsToUpdateItems(
  rows: AdminFixtureDraftRow[],
): UpdateFixtureWeekItemRequest[] {
  return rows.map((row) => {
    const homeScore = parseOptionalScore(row.homeScore)
    const awayScore = parseOptionalScore(row.awayScore)

    return {
      id: row.id,
      kickoff: fromDatetimeLocalValue(row.kickoffLocal),
      homeScore: homeScore === 'invalid' ? null : homeScore,
      awayScore: awayScore === 'invalid' ? null : awayScore,
    }
  })
}
