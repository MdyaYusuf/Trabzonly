type PublicMemberProfileQuizzesProps = {
  quizCount: number
  averagePercent: number
}

export function PublicMemberProfileQuizzes({
  quizCount,
  averagePercent,
}: PublicMemberProfileQuizzesProps) {
  return (
    <section className="flex flex-col gap-space-md">
      <div className="flex items-center gap-space-xs border-b border-outline-variant/40 pb-space-sm">
        <span className="h-3 w-3 bg-primary" />
        <h2 className="font-headline text-headline-sm font-extrabold text-primary uppercase">
          Quiz Başarıları ({quizCount})
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2">
        <article className="border border-outline-variant/40 bg-surface-container-lowest p-space-lg">
          <span className="font-kicker text-kicker text-on-surface-variant uppercase">
            Tamamlanan Test
          </span>
          <p className="font-headline mt-space-sm text-headline-lg font-extrabold text-primary tabular-nums">
            {quizCount}
          </p>
          <p className="font-body mt-1 text-body-sm text-on-surface-variant">
            Tribün hafızası sınavları
          </p>
        </article>
        <article className="border border-outline-variant/40 bg-surface-container-lowest p-space-lg">
          <span className="font-kicker text-kicker text-on-surface-variant uppercase">
            Ortalama Başarı
          </span>
          <p className="font-headline mt-space-sm text-headline-lg font-extrabold text-secondary tabular-nums">
            %{averagePercent}
          </p>
          <div className="mt-space-sm h-2 w-full overflow-hidden bg-surface-container-high">
            <div
              className="h-full bg-secondary-container"
              style={{ width: `${averagePercent}%` }}
            />
          </div>
        </article>
      </div>

      <article className="border border-outline-variant/40 bg-surface-container-low p-space-md">
        <div className="flex items-start gap-space-sm">
          <span className="material-symbols-outlined text-primary">quiz</span>
          <div>
            <h3 className="font-label text-label-md font-bold text-on-surface uppercase">
              2021-22 Şampiyonluk Testi
            </h3>
            <p className="font-body mt-1 text-body-sm text-on-surface-variant">
              Skor: 14 / 15 (%93 Başarı) • 3 gün önce
            </p>
          </div>
        </div>
      </article>
    </section>
  )
}
