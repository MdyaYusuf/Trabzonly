import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { QuizListItemDto } from '../quizTypes'
import { resolveQuizCategoryImageUrl } from '../utils/quizCategoryImage'
import { formatQuizScore } from '../utils/quizFormat'

type QuizCardProps = {
  quiz: QuizListItemDto
}

export function QuizCard({ quiz }: QuizCardProps) {
  const detailPath = `/quizler/${quiz.id}`
  const description = quiz.description?.trim() || 'Bu test için açıklama eklenmemiş.'
  const imageUrl = resolveQuizCategoryImageUrl(quiz.categoryImageUrl, quiz.categoryName)
  const [imageFailed, setImageFailed] = useState(false)
  const showImage = Boolean(imageUrl) && !imageFailed
  const averageLabel =
    quiz.averageSuccessPercent == null
      ? '—'
      : `%${formatQuizScore(quiz.averageSuccessPercent)}`

  return (
    <Link
      to={detailPath}
      className="group relative flex h-full cursor-pointer flex-col overflow-hidden bg-surface-container-lowest shadow-sm transition-all duration-200 hover:-translate-y-1 hover:scale-[1.035] hover:shadow-lg"
    >
      <div
        className={[
          'relative h-44 w-full shrink-0 overflow-hidden',
          showImage ? 'bg-surface-container' : 'bg-gradient-to-br from-primary to-secondary',
        ].join(' ')}
      >
        {showImage && imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            onError={() => {
              setImageFailed(true)
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(255,255,255,0.16),transparent_42%)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/5" />

        <div className="absolute top-2 left-2 max-w-[75%]">
          <span className="font-kicker inline-block bg-primary/90 px-2 py-0.5 text-kicker font-bold tracking-widest text-on-primary uppercase">
            {quiz.categoryName}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-space-sm p-space-md">
        <div className="min-w-0">
          <h3 className="font-headline line-clamp-2 min-h-[52px] text-headline-sm font-bold text-primary uppercase transition-colors group-hover:text-secondary">
            {quiz.title}
          </h3>
          <p className="font-body mt-space-xs line-clamp-2 min-h-[2.5rem] text-body-sm text-on-surface-variant">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-1 border-y border-outline-variant/40 py-space-sm text-center">
          <div className="min-w-0">
            <span className="font-kicker block truncate text-kicker text-on-surface-variant uppercase">
              Top. Çözülme
            </span>
            <span className="font-headline text-label-md font-bold text-primary">
              {quiz.takenCount.toLocaleString('tr-TR')}
            </span>
          </div>
          <div className="min-w-0">
            <span className="font-kicker block truncate text-kicker text-on-surface-variant uppercase">
              Ort. Başarı
            </span>
            <span className="font-headline text-label-md font-bold text-primary">
              {averageLabel}
            </span>
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between gap-space-sm pt-space-xs">
          <div className="min-w-0">
            <span className="font-kicker block text-kicker text-on-surface-variant uppercase">
              Soru Sayısı
            </span>
            <span className="font-headline text-headline-sm font-bold text-primary">
              {quiz.questionCount}
            </span>
          </div>
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center border border-primary/35 text-primary transition-all duration-200 group-hover:border-secondary group-hover:bg-secondary group-hover:text-on-secondary"
          >
            <span className="material-symbols-outlined text-[22px] transition-transform duration-200 group-hover:translate-x-0.5">
              arrow_forward
            </span>
          </span>
        </div>
      </div>
    </Link>
  )
}
