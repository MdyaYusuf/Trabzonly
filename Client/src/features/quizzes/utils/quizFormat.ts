/** Formats API TimeSpan strings (e.g. "00:01:23.4560000") for display. */
export function formatQuizDuration(timeSpan: string | null | undefined): string {
  if (!timeSpan) {
    return '—'
  }

  const trimmed = timeSpan.trim()
  const match = /^(-?)(?:(\d+)\.)?(\d{1,2}):(\d{2}):(\d{2})(?:\.\d+)?$/.exec(trimmed)

  if (!match) {
    return trimmed
  }

  const days = Number(match[2] ?? 0)
  const hours = Number(match[3])
  const minutes = Number(match[4])
  const seconds = Number(match[5])
  const totalSeconds = days * 86400 + hours * 3600 + minutes * 60 + seconds

  if (totalSeconds < 60) {
    return `${totalSeconds}sn`
  }

  const mins = Math.floor(totalSeconds / 60)
  const secs = totalSeconds % 60

  if (mins < 60) {
    return `${mins}dk ${String(secs).padStart(2, '0')}sn`
  }

  const hrs = Math.floor(mins / 60)
  const remMins = mins % 60

  return `${hrs}sa ${remMins}dk`
}

export function formatQuizScore(score: number | null | undefined): string {
  if (score == null || Number.isNaN(score)) {
    return '—'
  }

  return `${Math.round(score)}`
}

/** Wall-clock seconds → ASP.NET TimeSpan JSON string (hh:mm:ss). */
export function secondsToTimeSpanString(totalSeconds: number): string {
  const safe = Math.max(1, Math.floor(totalSeconds))
  const hours = Math.floor(safe / 3600)
  const minutes = Math.floor((safe % 3600) / 60)
  const seconds = safe % 60

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export function scorePercent(score: number, maxScore: number): number {
  if (maxScore <= 0) {
    return 0
  }

  return Math.round((score / maxScore) * 100)
}

export function shuffleInPlace<T>(items: T[]): T[] {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = items[i]
    items[i] = items[j]
    items[j] = tmp
  }

  return items
}

export const QUIZ_SECONDS_PER_QUESTION = 10
export const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'] as const
