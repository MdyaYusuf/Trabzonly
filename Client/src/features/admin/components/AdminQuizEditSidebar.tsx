import type { AdminQuizEditDraft } from '../utils/adminQuizTypes'

type AdminQuizEditSidebarProps = {
  draft: AdminQuizEditDraft
  categoryName: string
}

export function AdminQuizEditSidebar({ draft, categoryName }: AdminQuizEditSidebarProps) {
  const totalPoints = draft.questions.reduce((sum, question) => sum + question.points, 0)

  return (
    <aside className="flex flex-col gap-space-md">
      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex items-center justify-between gap-space-sm">
          <h2 className="font-kicker flex items-center gap-1 text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
            <span className="material-symbols-outlined text-[16px]">visibility</span>
            Kart Önizlemesi
          </h2>
        </div>

        <article className="overflow-hidden border border-outline-variant/40">
          <div className="bg-primary-container p-space-md text-on-primary">
            <span className="font-kicker bg-black/25 px-space-sm py-0.5 text-kicker uppercase">
              {categoryName}
            </span>
            <h3 className="font-headline mt-space-md text-headline-sm font-extrabold uppercase">
              {draft.title.trim() || 'Quiz'}
            </h3>
            <div className="mt-space-md flex flex-wrap gap-space-md">
              <span className="font-label inline-flex items-center gap-1 text-label-md">
                <span className="material-symbols-outlined text-[16px]">help</span>
                {draft.questions.length} Soru
              </span>
              <span className="font-label inline-flex items-center gap-1 text-label-md">
                <span className="material-symbols-outlined text-[16px]">toll</span>
                {totalPoints} Puan
              </span>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-space-md">
            <p className="font-body text-body-sm text-on-surface-variant">
              {draft.description.trim() || 'Açıklama yok.'}
            </p>
            <p className="font-kicker mt-space-md text-kicker text-on-surface-variant uppercase">
              Durum: {draft.isActive ? 'Aktif' : 'Pasif'}
            </p>
          </div>
        </article>
      </section>
    </aside>
  )
}
