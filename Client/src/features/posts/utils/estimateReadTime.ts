const WORDS_PER_MINUTE = 200

export function estimateReadTimeLabel(
  ...parts: Array<string | null | undefined>
): string | null {
  const text = parts
    .map((part) => part?.trim() ?? '')
    .filter((part) => part.length > 0)
    .join(' ')

  if (text.length === 0) {
    return null
  }

  const wordCount = text.split(/\s+/).filter(Boolean).length

  if (wordCount === 0) {
    return null
  }

  const minutes = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))

  return `Okuma Süresi: ${minutes} dk`
}
