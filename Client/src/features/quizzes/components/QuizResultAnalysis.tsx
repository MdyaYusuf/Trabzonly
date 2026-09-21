import type { RefObject } from 'react'
import type { QuizResultProfile } from '../utils/takeQuizTypes'

type QuizResultAnalysisProps = {
  result: QuizResultProfile
  reviewRef: RefObject<HTMLElement | null>
}

export function QuizResultAnalysis({ result, reviewRef }: QuizResultAnalysisProps) {
  return (
    <section className="grid grid-cols-1 items-start gap-gutter lg:grid-cols-12">
      <div className="flex flex-col gap-space-md lg:col-span-5">
        <article className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
          <span className="font-kicker text-kicker font-bold tracking-widest text-secondary uppercase">
            Yeni Rozet Açıldı
          </span>
          <div className="mt-space-md flex gap-space-md">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-primary-container text-tertiary-fixed-dim">
              <span
                className="material-symbols-outlined text-[32px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                emoji_events
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-kicker text-kicker text-on-surface-variant uppercase">
                Efsane Hafıza Seviyesi
              </span>
              <h3 className="font-headline text-headline-sm font-bold text-primary uppercase">
                {result.badgeTitle}
              </h3>
              <p className="font-body text-body-sm text-on-surface-variant">{result.badgeNote}</p>
            </div>
          </div>
        </article>

        <article className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
          <div className="flex items-start justify-between gap-space-sm">
            <div className="flex gap-space-sm">
              <span className="material-symbols-outlined text-secondary">verified_user</span>
              <div>
                <h3 className="font-label text-label-md font-bold text-on-surface uppercase">
                  Profil Derecesi Yükseltildi
                </h3>
                <p className="font-body mt-1 text-body-sm text-on-surface-variant">
                  Kıdemli Taraftar ({result.badgeLevel === 'SEVİYE 4' ? 'Seviye 4' : result.badgeLevel})
                </p>
              </div>
            </div>
            <span className="font-kicker bg-secondary-container px-space-xs py-0.5 text-kicker text-on-secondary-container uppercase">
              Güncellendi
            </span>
          </div>
          <div className="mt-space-md border-t border-outline-variant/40 pt-space-md">
            <p className="font-body text-body-sm text-on-surface">
              Aylık Sıralama İlerlemesi:{' '}
              <strong className="text-primary">{result.rankLabel}</strong>
            </p>
            <p className="font-body mt-1 text-body-sm text-on-surface-variant">
              Bu ay {result.monthlyCompletions} bordo-mavili taraftar testi tamamladı.
            </p>
          </div>
        </article>

        <article className="relative overflow-hidden bg-gradient-to-br from-primary to-[#1a040b] p-space-lg text-on-primary">
          <span className="font-kicker text-kicker text-tertiary-fixed-dim uppercase">
            Tarihin İzinde
          </span>
          <h3 className="font-headline mt-space-sm text-headline-md font-extrabold uppercase">
            &quot;O Sene, Bu Sene!&quot;
          </h3>
          <p className="font-body mt-space-sm text-body-sm text-on-primary/85">
            38 yıllık hasretin son bulduğu o muazzam gecede Karadeniz Fırtınası sadece kupayı değil,
            milyonların ortak hafızasını gökyüzüne kaldırdı.
          </p>
        </article>
      </div>

      <div className="flex flex-col gap-space-md lg:col-span-7" id="detayli-analiz">
        <div className="grid grid-cols-1 gap-space-sm sm:grid-cols-3">
          <div className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
            <div className="flex items-center justify-between">
              <span className="font-kicker text-kicker text-on-surface-variant uppercase">Doğru</span>
              <span className="material-symbols-outlined text-secondary">check_circle</span>
            </div>
            <p className="font-headline mt-1 text-headline-md font-extrabold text-primary tabular-nums">
              {result.correctCount}
            </p>
            <p className="font-body text-body-sm text-on-surface-variant">
              {result.correctStatPercent} Tam İsabet
            </p>
          </div>
          <div className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
            <div className="flex items-center justify-between">
              <span className="font-kicker text-kicker text-on-surface-variant uppercase">Yanlış</span>
              <span className="material-symbols-outlined text-error">cancel</span>
            </div>
            <p className="font-headline mt-1 text-headline-md font-extrabold text-error tabular-nums">
              {result.wrongCount}
            </p>
            <p className="font-body text-body-sm text-on-surface-variant">
              {result.wrongQuestionLabel} Takıldı
            </p>
          </div>
          <div className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
            <div className="flex items-center justify-between">
              <span className="font-kicker text-kicker text-on-surface-variant uppercase">
                Hız Rekoru
              </span>
              <span className="material-symbols-outlined text-tertiary-fixed-dim">bolt</span>
            </div>
            <p className="font-headline mt-1 text-headline-sm font-extrabold text-primary">
              {result.speedPercentile}
            </p>
            <p className="font-body text-body-sm text-on-surface-variant">{result.avgSecondsLabel}</p>
          </div>
        </div>

        <article
          ref={reviewRef}
          className="border border-outline-variant/40 bg-surface-container-lowest p-space-md scroll-mt-28"
        >
          <div className="mb-space-md flex flex-wrap items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary">analytics</span>
              <h3 className="font-headline text-headline-sm font-bold text-primary uppercase">
                Hafıza Analiz Tablosu
              </h3>
            </div>
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              {result.totalCount} Soru İncelendi
            </span>
          </div>

          <ul className="flex flex-col divide-y divide-outline-variant/40">
            {result.reviewItems.map((item) => (
              <li
                key={item.number}
                className={`flex gap-space-md py-space-md ${
                  item.isCorrect ? '' : 'bg-error-container/30 px-space-sm'
                }`}
              >
                <span
                  className={`font-headline flex h-10 w-10 shrink-0 items-center justify-center text-sm font-bold ${
                    item.isCorrect
                      ? 'bg-surface-container-high text-on-surface'
                      : 'bg-error text-on-error'
                  }`}
                >
                  {item.number}
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <p className="font-body text-body-md text-on-surface">{item.prompt}</p>
                  <p className="font-body text-body-sm text-on-surface-variant">
                    Senin Yanıtın:{' '}
                    <span
                      className={
                        item.isCorrect
                          ? 'font-bold text-on-surface'
                          : 'font-bold text-error line-through'
                      }
                    >
                      {item.yourAnswer}
                    </span>
                    {item.isCorrect && (
                      <span className="ml-1 text-secondary">(Doğru)</span>
                    )}
                  </p>
                  {!item.isCorrect && item.correctAnswer && (
                    <p className="font-body flex items-center gap-1 text-body-sm text-secondary">
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      Doğru Cevap: <strong>{item.correctAnswer}</strong>
                    </p>
                  )}
                  {item.editorialNote && (
                    <p className="font-body mt-1 border-l-2 border-secondary-container pl-space-sm text-body-sm text-on-surface-variant">
                      <span className="font-bold text-on-surface">Editoryal Not: </span>
                      {item.editorialNote}
                    </p>
                  )}
                </div>
                <span
                  className={`material-symbols-outlined shrink-0 ${
                    item.isCorrect ? 'text-on-surface-variant' : 'text-error'
                  }`}
                >
                  {item.isCorrect ? 'check_circle' : 'cancel'}
                </span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="font-label mt-space-md flex w-full items-center justify-center gap-space-xs border border-outline-variant py-space-sm text-label-md text-on-surface uppercase transition-colors hover:border-primary hover:text-primary"
          >
            Tüm {result.totalCount} Sorunun Çözüm Açıklamasını Gör
            <span className="material-symbols-outlined text-[18px]">expand_more</span>
          </button>
        </article>
      </div>
    </section>
  )
}
