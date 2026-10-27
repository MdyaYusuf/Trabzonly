import { Link } from 'react-router-dom'
import {
  getQuizCategoryIcon,
  getQuizCategoryLabel,
} from '../quizCategoryUtils'
import type { QuizListItemDto } from '../quizTypes'
import { formatQuizScore } from '../utils/quizFormat'

type QuizCardProps = {
  quiz: QuizListItemDto
}

export function QuizCard({ quiz }: QuizCardProps) {
  const categoryLabel = getQuizCategoryLabel(quiz.category)
  const categoryIcon = getQuizCategoryIcon(quiz.category)
  const description = quiz.description?.trim() || 'Bu test için açıklama eklenmemiş.'
  const averageLabel =
    quiz.averageSuccessPercent == null
      ? 'Henüz çözülmedi'
      : `Ort. %${formatQuizScore(quiz.averageSuccessPercent)} başarı`

  return (
    <article className="flex flex-col justify-between bg-surface-container-lowest p-space-lg shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-col gap-space-sm">
        <div className="flex items-start justify-between gap-space-sm">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-surface-container text-primary">
            <span
              className="material-symbols-outlined text-[28px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {categoryIcon}
            </span>
          </div>
          <span className="font-kicker bg-surface-container px-space-xs py-0.5 text-kicker font-bold text-on-surface-variant uppercase">
            {categoryLabel}
          </span>
        </div>
        <h3 className="font-headline line-clamp-2 text-headline-sm font-bold text-primary uppercase">
          {quiz.title}
        </h3>
        <p className="font-body line-clamp-3 text-body-sm text-on-surface-variant">{description}</p>
      </div>
      <div className="-mx-space-lg -mb-space-lg mt-space-md flex items-center justify-between bg-surface-container-low px-space-lg py-space-sm pt-space-md">
        <div className="flex flex-col">
          <span className="font-label text-label-md font-bold text-primary">
            {quiz.questionCount} Soru
          </span>
          <span className="font-kicker text-kicker text-on-surface-variant uppercase">
            {quiz.takenCount.toLocaleString('tr-TR')} Çözülme · {averageLabel}
          </span>
        </div>
        <Link
          to={`/quizler/${quiz.id}`}
          className="font-label bg-primary-container px-space-md py-space-xs text-label-md font-bold tracking-wider text-on-primary uppercase transition-all hover:bg-primary"
        >
          Çöz
        </Link>
      </div>
    </article>
  )
}
