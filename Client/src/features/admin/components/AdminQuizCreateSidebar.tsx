import { getQuizCategoryIcon, getQuizCategoryLabel } from '@/features/quizzes/quizCategoryUtils'
import type { AdminQuizCreateDraft } from '../utils/adminQuizTypes'

type AdminQuizCreateSidebarProps = {
  draft: AdminQuizCreateDraft
}

export function AdminQuizCreateSidebar({ draft }: AdminQuizCreateSidebarProps) {
  const firstQuestion = draft.questions[0]
  const previewOptions = firstQuestion?.options.slice(0, 4) ?? []
  const totalPoints = draft.questions.reduce((sum, question) => sum + question.points, 0)
  const categoryLabel = getQuizCategoryLabel(draft.category)
  const categoryIcon = getQuizCategoryIcon(draft.category)

  return (
    <aside className="flex flex-col gap-space-md">
      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex items-center justify-between gap-space-sm">
          <h2 className="font-kicker flex items-center gap-1 text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
            <span className="material-symbols-outlined text-[16px]">visibility</span>
            Önizleme
          </h2>
        </div>

        <article className="overflow-hidden border border-outline-variant/40">
          <div className="bg-primary-container p-space-md text-on-primary">
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-[22px]">{categoryIcon}</span>
              <span className="font-kicker bg-black/25 px-space-sm py-0.5 text-kicker uppercase">
                {categoryLabel}
              </span>
            </div>
            <p className="font-kicker mt-space-sm text-kicker text-on-primary/80 uppercase">
              {draft.questions.length} Soru • {totalPoints} Puan
            </p>
            <h3 className="font-headline mt-1 text-headline-sm font-extrabold uppercase">
              {draft.title.trim() || 'Yeni Quiz'}
            </h3>
          </div>
          <div className="bg-surface-container-lowest p-space-md">
            <p className="font-body text-body-md text-on-surface">
              {firstQuestion?.text.trim() || 'Soru metni eklendiğinde burada görünür.'}
            </p>
            <ul className="mt-space-md flex flex-col gap-space-sm">
              {previewOptions.map((option) => (
                <li
                  key={option.id}
                  className={`flex items-center gap-space-sm border px-space-md py-space-sm ${
                    option.isCorrect
                      ? 'border-secondary bg-secondary-fixed/40'
                      : 'border-outline-variant/40'
                  }`}
                >
                  <span className="font-label text-label-md font-bold">{option.label}</span>
                  <span className="font-label text-label-md text-on-surface">
                    {option.text.trim() || '—'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <h2 className="font-kicker mb-space-md text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
          Özet
        </h2>
        <dl className="flex flex-col gap-space-sm">
          <div className="flex items-center justify-between gap-space-sm">
            <dt className="font-body text-body-sm text-on-surface-variant">Soru sayısı</dt>
            <dd className="font-label text-label-md font-bold text-on-surface">
              {draft.questions.length}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-space-sm">
            <dt className="font-body text-body-sm text-on-surface-variant">Toplam puan</dt>
            <dd className="font-label text-label-md font-bold text-on-surface">{totalPoints}</dd>
          </div>
          <div className="flex items-center justify-between gap-space-sm">
            <dt className="font-body text-body-sm text-on-surface-variant">Durum</dt>
            <dd className="font-label text-label-md font-bold text-on-surface">
              {draft.isActive ? 'Aktif' : 'Pasif'}
            </dd>
          </div>
        </dl>
      </section>
    </aside>
  )
}
