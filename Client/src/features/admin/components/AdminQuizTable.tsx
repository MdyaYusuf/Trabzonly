import { Link } from 'react-router-dom'
import type { AdminQuizListRow } from '../utils/adminQuizTypes'

type AdminQuizTableProps = {
  rows: AdminQuizListRow[]
  deletingId: string | null
  onDelete: (id: string) => void
}

export function AdminQuizTable({ rows, deletingId, onDelete }: AdminQuizTableProps) {
  if (rows.length === 0) {
    return (
      <section className="border border-outline-variant/40 bg-surface-container-lowest px-space-md py-space-xl text-center">
        <p className="font-body text-body-md text-on-surface-variant">
          Bu filtreler için quiz bulunamadı.
        </p>
      </section>
    )
  }

  return (
    <section className="overflow-x-auto border border-outline-variant/40 bg-surface-container-lowest">
      <table className="w-full min-w-[900px] border-collapse text-left">
        <thead className="bg-surface-container-low">
          <tr className="font-kicker text-kicker text-on-surface-variant uppercase">
            <th className="px-space-sm py-space-sm">Başlık</th>
            <th className="px-space-sm py-space-sm">Açıklama</th>
            <th className="px-space-sm py-space-sm">Soru / Puan</th>
            <th className="px-space-sm py-space-sm">Durum</th>
            <th className="px-space-sm py-space-sm">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className="border-t border-outline-variant/30 transition-colors hover:bg-surface-container-low/60"
            >
              <td className="px-space-sm py-space-sm">
                <div>
                  <p className="font-label text-label-md font-bold text-on-surface">{row.title}</p>
                  <p className="font-kicker mt-1 text-kicker text-on-surface-variant uppercase">
                    {row.categoryLabel}
                  </p>
                </div>
              </td>
              <td className="max-w-xs px-space-sm py-space-sm">
                <p className="font-body line-clamp-3 text-body-sm text-on-surface-variant">
                  {row.description}
                </p>
              </td>
              <td className="px-space-sm py-space-sm">
                <p className="font-label text-label-md font-bold text-on-surface tabular-nums">
                  {row.questionCount} Soru
                </p>
                <span className="font-kicker mt-1 inline-block bg-surface-container-high px-space-sm py-0.5 text-kicker text-on-surface-variant uppercase">
                  {row.totalPoints} Puan
                </span>
              </td>
              <td className="px-space-sm py-space-sm">
                <span
                  className={`font-label inline-flex items-center gap-1 px-space-sm py-1 text-label-md uppercase ${
                    row.status === 'active'
                      ? 'bg-secondary-container text-on-secondary-container'
                      : 'bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  {row.status === 'active' ? (
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  ) : null}
                  {row.statusLabel}
                </span>
              </td>
              <td className="px-space-sm py-space-sm">
                <div className="flex items-center gap-1">
                  <Link
                    to={`/yonetim/quizler/${row.id}/duzenle`}
                    aria-label="Düzenle"
                    className="flex h-8 w-8 items-center justify-center text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary"
                  >
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </Link>
                  <button
                    type="button"
                    aria-label="Sil"
                    disabled={deletingId === row.id}
                    onClick={() => {
                      onDelete(row.id)
                    }}
                    className="flex h-8 w-8 items-center justify-center text-on-surface-variant transition-colors hover:bg-error-container hover:text-error disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
