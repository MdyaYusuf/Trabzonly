const CATEGORY_NAME_TO_ASSET: Record<string, string> = {
  'Tarihçe ve İlkler': '/assets/quiz-categories/history-and-firsts.png',
  'Tesisler ve Rekorlar': '/assets/quiz-categories/facilities-and-records.png',
  'Ezeli Rekabet': '/assets/quiz-categories/eternal-rivalry.png',
  'Şampiyonluklar ve Başarılar':
    '/assets/quiz-categories/championships-and-achievements.png',
}

/** Prefer API ImageUrl; fall back to known seeded category assets. */
export function resolveQuizCategoryImageUrl(
  categoryImageUrl?: string | null,
  categoryName?: string | null,
): string | null {
  const fromApi = categoryImageUrl?.trim()

  if (fromApi) {
    return fromApi
  }

  if (!categoryName) {
    return null
  }

  return CATEGORY_NAME_TO_ASSET[categoryName] ?? null
}
