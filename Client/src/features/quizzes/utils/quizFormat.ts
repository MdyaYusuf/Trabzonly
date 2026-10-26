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
