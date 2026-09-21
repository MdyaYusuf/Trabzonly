import { Link } from 'react-router-dom'
import { featuredQuiz } from '../utils/quizListPlaceholders'

export function QuizListFeatured() {
  const quiz = featuredQuiz

  return (
    <section className="grid w-full grid-cols-1 overflow-hidden bg-surface-container-lowest shadow-md lg:grid-cols-12">
      <div className="relative flex min-h-[320px] flex-col justify-between bg-primary-container p-space-lg text-on-primary lg:col-span-5 lg:min-h-[380px]">
        {quiz.imageUrl ? (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-35 mix-blend-overlay"
            style={{ backgroundImage: `url('${quiz.imageUrl}')` }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#5a0e27] via-[#3a0014] to-[#1A040B] opacity-80" />
        )}
        <div className="relative z-10 flex items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-xs bg-tertiary-container px-space-sm py-1 text-tertiary-fixed-dim">
            <span
              className="material-symbols-outlined text-[16px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span className="font-kicker text-kicker font-bold tracking-widest uppercase">
              HAFTANIN VİTRİNİ
            </span>
          </div>
          <span className="font-kicker text-kicker tracking-widest text-on-primary/80 uppercase">
            {quiz.difficultyLabel}
          </span>
        </div>
        <div className="relative z-10 flex flex-col gap-space-xs">
          <span className="font-stat text-stat-counter leading-none font-extrabold text-secondary-container">
            {quiz.seriesNumber}
          </span>
          <span className="font-kicker text-kicker tracking-widest text-on-primary/90 uppercase">
            {quiz.seriesLabel}
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-space-lg bg-surface-container-lowest p-space-lg lg:col-span-7 lg:p-space-xl">
        <div className="flex flex-col gap-space-sm">
          <div className="flex flex-wrap items-center gap-space-sm">
            <span className="font-kicker bg-primary px-space-sm py-1 text-kicker font-bold tracking-wider text-on-primary uppercase">
              {quiz.badge}
            </span>
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              {quiz.popularityLabel}
            </span>
          </div>
          <h2 className="font-headline mt-space-xs text-headline-md font-extrabold tracking-tight text-primary uppercase lg:text-headline-lg">
            {quiz.title}
          </h2>
          <p className="font-body text-body-md leading-relaxed text-on-surface-variant">
            {quiz.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
            <div className="flex items-center gap-space-xs bg-surface-container px-space-sm py-1">
              <span className="material-symbols-outlined text-[16px] text-secondary">help</span>
              <span className="font-label text-label-md font-semibold text-on-surface">
                {quiz.questionCount} Soru
              </span>
            </div>
            <div className="flex items-center gap-space-xs bg-surface-container px-space-sm py-1">
              <span className="material-symbols-outlined text-[16px] text-secondary">schedule</span>
              <span className="font-label text-label-md font-semibold text-on-surface">
                {quiz.durationMinutes} Dakika
              </span>
            </div>
            <div className="flex items-center gap-space-xs bg-surface-container px-space-sm py-1">
              <span className="material-symbols-outlined text-[16px] text-secondary">
                military_tech
              </span>
              <span className="font-label text-label-md font-semibold text-on-surface">
                {quiz.pointsLabel}
              </span>
            </div>
            <div className="flex items-center gap-space-xs text-on-surface-variant">
              <span
                className="material-symbols-outlined text-[16px] text-tertiary-fixed-dim"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span className="font-label text-label-md font-bold text-on-surface">
                {quiz.rating}
              </span>
              <span className="font-body text-body-sm">
                ({quiz.ratingCount.toLocaleString('tr-TR')} oy)
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-space-md border-t border-outline-variant/40 pt-space-md sm:flex-row sm:items-center">
          <div className="flex items-center gap-space-sm">
            <div className="flex -space-x-2">
              {['BF', 'AK', 'TS'].map((initials, index) => (
                <div
                  key={initials}
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-surface-container-lowest text-[10px] font-bold text-on-primary ${
                    index === 0
                      ? 'bg-primary'
                      : index === 1
                        ? 'bg-secondary'
                        : 'bg-primary-container'
                  }`}
                >
                  {initials}
                </div>
              ))}
            </div>
            <span className="font-body text-body-sm text-on-surface-variant">
              {quiz.friendsLabel}
            </span>
          </div>
          <Link
            to={`/quizler/${quiz.id}`}
            className="font-label bg-primary px-space-lg py-space-sm text-center text-label-md font-bold tracking-wider text-on-primary uppercase shadow-sm transition-colors hover:bg-primary-container"
          >
            HEMEN ÇÖZ →
          </Link>
        </div>
      </div>
    </section>
  )
}
