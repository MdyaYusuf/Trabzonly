import { QuizCategory } from './quizTypes'

export const QUIZ_CATEGORY_LABELS: Record<QuizCategory, string> = {
  [QuizCategory.HistoryAndFirsts]: 'Tarihçe ve İlkler',
  [QuizCategory.FacilitiesAndRecords]: 'Tesisler ve Rekorlar',
  [QuizCategory.EternalRivalry]: 'Ezeli Rekabet',
  [QuizCategory.ChampionshipsAndAchievements]: 'Şampiyonluklar ve Başarılar',
}

/** Material Symbol names used on list cards and admin previews. */
export const QUIZ_CATEGORY_ICONS: Record<QuizCategory, string> = {
  [QuizCategory.HistoryAndFirsts]: 'history_edu',
  [QuizCategory.FacilitiesAndRecords]: 'stadium',
  [QuizCategory.EternalRivalry]: 'swords',
  [QuizCategory.ChampionshipsAndAchievements]: 'workspace_premium',
}

export const QUIZ_CATEGORY_OPTIONS: { id: QuizCategory; label: string; icon: string }[] = [
  {
    id: QuizCategory.HistoryAndFirsts,
    label: QUIZ_CATEGORY_LABELS[QuizCategory.HistoryAndFirsts],
    icon: QUIZ_CATEGORY_ICONS[QuizCategory.HistoryAndFirsts],
  },
  {
    id: QuizCategory.FacilitiesAndRecords,
    label: QUIZ_CATEGORY_LABELS[QuizCategory.FacilitiesAndRecords],
    icon: QUIZ_CATEGORY_ICONS[QuizCategory.FacilitiesAndRecords],
  },
  {
    id: QuizCategory.EternalRivalry,
    label: QUIZ_CATEGORY_LABELS[QuizCategory.EternalRivalry],
    icon: QUIZ_CATEGORY_ICONS[QuizCategory.EternalRivalry],
  },
  {
    id: QuizCategory.ChampionshipsAndAchievements,
    label: QUIZ_CATEGORY_LABELS[QuizCategory.ChampionshipsAndAchievements],
    icon: QUIZ_CATEGORY_ICONS[QuizCategory.ChampionshipsAndAchievements],
  },
]

export function getQuizCategoryLabel(category: QuizCategory): string {
  return QUIZ_CATEGORY_LABELS[category]
}

export function getQuizCategoryIcon(category: QuizCategory): string {
  return QUIZ_CATEGORY_ICONS[category]
}
