import type { TakeQuizQuestion, TakeQuizSession } from '../utils/takeQuizTypes'

type TakeQuizSidebarProps = {
  session: TakeQuizSession
  question: TakeQuizQuestion
}

export function TakeQuizSidebar({ session, question }: TakeQuizSidebarProps) {
  const correctPercent = question.communityCorrectPercent ?? 74
  const correctOption = question.options.find((o) => o.id === question.correctOptionId)

  return (
    <aside className="flex flex-col gap-space-md">
      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex items-center justify-between">
          <h3 className="font-kicker text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
            Yarışmacı Durumu
          </h3>
          <span className="font-kicker flex items-center gap-1 text-kicker text-secondary uppercase">
            <span className="h-2 w-2 rounded-full bg-secondary-container" />
            Çevrimiçi
          </span>
        </div>

        <div className="mb-space-md flex items-center gap-space-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary font-headline text-sm font-bold text-on-primary">
            {session.player.initials}
          </div>
          <div className="flex flex-col">
            <span className="font-label text-label-md font-bold text-on-surface">
              {session.player.username}
            </span>
            <span className="font-body text-body-sm text-on-surface-variant">
              {session.player.subtitle}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-space-sm">
          <div className="bg-surface-container-low p-space-sm">
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              Kazanılan Puan
            </span>
            <p className="font-headline mt-1 text-headline-sm font-bold text-primary">
              {session.player.pointsLabel}
            </p>
          </div>
          <div className="bg-surface-container-low p-space-sm">
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              Doğruluk Oranı
            </span>
            <p className="font-headline mt-1 text-headline-sm font-bold text-secondary">
              {session.player.accuracyLabel}
            </p>
          </div>
        </div>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-sm flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-secondary">pie_chart</span>
          <h3 className="font-kicker text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
            Tribün Nabzı & İstatistik
          </h3>
        </div>
        <p className="font-body text-body-sm text-on-surface-variant">
          Bu soruyu çözen Bordo-Mavi taraftarların{' '}
          <span className="font-bold text-primary">%{correctPercent}&apos;ü</span> doğru yanıt
          verdi.
        </p>
        <div className="mt-space-md flex items-center gap-space-md">
          <div
            className="relative h-16 w-16 shrink-0 rounded-full"
            style={{
              background: `conic-gradient(#8ccefd ${correctPercent}%, #f0e6e0 0)`,
            }}
            aria-hidden
          >
            <div className="absolute inset-2 flex items-center justify-center rounded-full bg-surface-container-lowest">
              <span className="font-label text-label-md font-bold text-primary">
                {correctPercent}%
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-body text-body-sm text-on-surface">
              Doğru: <strong>{correctOption?.label ?? '—'}</strong>
            </span>
            <span className="font-body text-body-sm text-on-surface-variant">Diğer seçenekler</span>
          </div>
        </div>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-sm flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-tertiary-fixed-dim">workspace_premium</span>
          <h3 className="font-kicker text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
            Kazanılacak Rozet
          </h3>
        </div>
        <div className="flex gap-space-sm">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-primary-container text-tertiary-fixed-dim">
            <span
              className="material-symbols-outlined text-[28px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              shield
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-label text-label-md font-bold text-on-surface">
              {session.badge.title}
            </span>
            <span className="font-body text-body-sm text-on-surface-variant">
              {session.badge.subtitle}
            </span>
            <span className="font-kicker mt-1 text-kicker text-secondary uppercase">
              {session.badge.progressLabel}
            </span>
          </div>
        </div>
        <p className="font-body mt-space-sm text-body-sm text-on-surface-variant">
          {session.badge.note}
        </p>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-low p-space-md">
        <div className="mb-space-sm flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-on-surface-variant">info</span>
          <h3 className="font-kicker text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
            Quiz Kuralları
          </h3>
        </div>
        <ul className="flex flex-col gap-space-xs">
          {session.rules.map((rule) => (
            <li key={rule} className="font-body flex gap-space-xs text-body-sm text-on-surface-variant">
              <span className="text-primary">•</span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  )
}
