import { Link } from 'react-router-dom'
import type { QuizResultProfile } from '../utils/takeQuizTypes'

type QuizResultHeroProps = {
  result: QuizResultProfile
}

export function QuizResultHero({ result }: QuizResultHeroProps) {
  const circumference = 2 * Math.PI * 54
  const offset = circumference - (result.successPercent / 100) * circumference

  return (
    <section className="overflow-hidden bg-gradient-to-br from-primary via-primary-container to-[#1a040b]">
      <div className="relative grid grid-cols-1 gap-gutter px-space-lg py-space-xl lg:grid-cols-12 lg:px-space-xl">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 15% 20%, rgba(247,189,91,0.25), transparent 40%), radial-gradient(circle at 85% 70%, rgba(140,206,253,0.2), transparent 35%)',
          }}
        />

        <div className="relative z-10 flex flex-col gap-space-md lg:col-span-7">
          <span className="font-kicker inline-flex w-fit items-center gap-1 bg-tertiary-container px-space-sm py-1 text-kicker text-tertiary-fixed-dim uppercase">
            <span
              className="material-symbols-outlined text-[14px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              stars
            </span>
            RESMİ TRİBÜN DERECESİ
          </span>

          <h1 className="font-display text-headline-lg font-extrabold tracking-tight text-on-primary uppercase lg:text-display-xl">
            {result.headline}
            <br />
            <span className="text-secondary-container">{result.headlineAccent}</span>
          </h1>

          <p className="font-headline text-headline-sm font-bold text-secondary-container lg:text-headline-md">
            {result.subheadline}
          </p>

          <p className="font-body max-w-2xl text-body-md text-on-primary/85 lg:text-body-lg">
            {result.body}
          </p>

          <div className="mt-space-sm flex flex-col gap-space-sm sm:flex-row">
            <div className="flex items-center gap-space-sm bg-black/30 px-space-md py-space-sm">
              <span
                className="material-symbols-outlined text-tertiary-fixed-dim"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                military_tech
              </span>
              <div className="flex flex-col">
                <span className="font-kicker text-kicker text-on-primary/70 uppercase">
                  Kazanılan Unvan
                </span>
                <span className="font-label text-label-md font-bold text-on-primary uppercase">
                  {result.titleEarned}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-space-sm bg-black/30 px-space-md py-space-sm">
              <span className="material-symbols-outlined text-secondary-container">schedule</span>
              <div className="flex flex-col">
                <span className="font-kicker text-kicker text-on-primary/70 uppercase">
                  Tamamlanma:
                </span>
                <span className="font-label text-label-md font-bold text-on-primary">
                  {result.completionTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 lg:col-span-5">
          <div className="flex h-full flex-col border border-white/10 bg-surface-container-lowest">
            <div className="flex items-center justify-between border-b border-outline-variant/40 px-space-md py-space-sm">
              <span className="font-kicker text-kicker font-bold text-on-surface-variant uppercase">
                SONUÇ RAPORU
              </span>
              <span className="font-kicker text-kicker text-primary uppercase">
                {result.seasonLabel}
              </span>
            </div>

            <div className="flex flex-1 flex-col items-center gap-space-md p-space-lg">
              <div className="relative h-36 w-36">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120" aria-hidden>
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-surface-container-high"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="butt"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className="text-primary transition-[stroke-dashoffset] duration-700"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-headline text-stat-counter font-extrabold text-primary tabular-nums">
                    %{result.successPercent}
                  </span>
                  <span className="font-kicker text-kicker text-on-surface-variant uppercase">
                    Başarı Oranı
                  </span>
                </div>
              </div>

              <div className="grid w-full grid-cols-2 gap-space-sm">
                <div className="bg-surface-container-low p-space-md text-center">
                  <p className="font-headline text-headline-sm font-extrabold text-primary tabular-nums">
                    {result.correctCount} / {result.totalCount}
                  </p>
                  <p className="font-kicker mt-1 text-kicker text-on-surface-variant uppercase">
                    Doğru / Toplam
                  </p>
                </div>
                <div className="bg-error-container/40 p-space-md text-center">
                  <p className="font-headline text-headline-sm font-extrabold text-error tabular-nums">
                    {result.wrongCount}
                  </p>
                  <p className="font-kicker mt-1 text-kicker text-on-error-container uppercase">
                    Yanlış Cevap
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between bg-primary-container px-space-md py-space-sm text-on-primary">
              <span className="font-kicker flex items-center gap-1 text-kicker uppercase">
                <span className="material-symbols-outlined text-[16px]">toll</span>
                Kazanılan Puan
              </span>
              <span className="font-headline text-headline-sm font-extrabold text-tertiary-fixed-dim">
                {result.pointsEarned} TP
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="sr-only">
        <Link to="/quizler">Quizlere dön</Link>
      </div>
    </section>
  )
}
