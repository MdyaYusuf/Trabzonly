import { Link } from 'react-router-dom'
import type { QuizResultRecommended } from '../utils/takeQuizTypes'

type QuizResultRecommendationsProps = {
  items: QuizResultRecommended[]
}

export function QuizResultRecommendations({ items }: QuizResultRecommendationsProps) {
  return (
    <section className="flex flex-col gap-space-md">
      <div className="flex flex-col gap-space-xs">
        <span className="font-kicker text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
          Yeni Hedefler & Tribün Rekabeti
        </span>
        <h2 className="font-headline text-headline-md font-extrabold text-primary uppercase">
          Sıradaki Mücadeleler ile Puanını Katla
        </h2>
        <p className="font-body text-body-md text-on-surface-variant">
          Hafızanı tazelemeye devam et, liderlik koltuğunu sağlama al.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
        {items.map((item) => {
          const difficultyClass =
            item.difficultyTone === 'error'
              ? 'bg-error-container text-on-error-container'
              : 'bg-secondary-container text-on-secondary-container'
          const titleClass =
            item.titleTone === 'secondary' ? 'text-secondary' : 'text-primary'
          const ctaClass =
            item.difficultyTone === 'error'
              ? 'bg-primary-container text-on-primary hover:bg-primary'
              : 'bg-secondary-container text-on-secondary-container hover:bg-secondary hover:text-on-secondary'

          return (
            <article
              key={item.id}
              className="flex flex-col justify-between border border-outline-variant/40 bg-surface-container-lowest p-space-lg"
            >
              <div className="flex flex-col gap-space-sm">
                <div className="flex flex-wrap items-center gap-space-sm">
                  <span className="font-kicker bg-tertiary-container px-space-sm py-1 text-kicker text-tertiary-fixed-dim uppercase">
                    {item.pointsLabel}
                  </span>
                  <span className={`font-kicker px-space-sm py-1 text-kicker uppercase ${difficultyClass}`}>
                    {item.difficultyLabel}
                  </span>
                </div>
                <h3
                  className={`font-headline text-headline-sm font-bold uppercase ${titleClass}`}
                >
                  {item.title}
                </h3>
                <p className="font-body text-body-sm text-on-surface-variant">{item.excerpt}</p>
              </div>
              <div className="mt-space-md flex items-center justify-between gap-space-sm border-t border-outline-variant/40 pt-space-md">
                <span className="font-label text-label-md font-bold text-on-surface uppercase">
                  {item.meta}
                </span>
                <Link
                  to={`/quizler/${item.id}`}
                  className={`font-label inline-flex items-center gap-space-xs px-space-md py-space-xs text-label-md font-bold tracking-wider uppercase transition-all ${ctaClass}`}
                >
                  Hemen Çöz
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
