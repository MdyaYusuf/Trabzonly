import { Link } from 'react-router-dom'
import type { AdminSeasonListRow } from '../utils/adminSeasonTypes'

type AdminSeasonTableProps = {
  seasons: AdminSeasonListRow[]
  deletingId: number | null
  onDelete: (season: AdminSeasonListRow) => void
}

export function AdminSeasonTable({
  seasons,
  deletingId,
  onDelete,
}: AdminSeasonTableProps) {
  if (seasons.length === 0) {
    return (
      <section className="border border-outline-variant/40 bg-surface-container-lowest px-space-md py-space-xl text-center">
        <p className="font-body text-body-md text-on-surface-variant">
          Henüz sezon eklenmedi veya eşleşme yok.
        </p>
      </section>
    )
  }

  return (
    <section className="overflow-x-auto border border-outline-variant/40 bg-surface-container-lowest">
      <table className="w-full min-w-[900px] border-collapse text-left">
        <thead className="bg-surface-container-low">
          <tr className="font-kicker text-kicker text-on-surface-variant uppercase">
            <th className="px-space-sm py-space-sm">Sezon Adı</th>
            <th className="px-space-sm py-space-sm">Başlangıç</th>
            <th className="px-space-sm py-space-sm">Bitiş</th>
            <th className="px-space-sm py-space-sm">Durum</th>
            <th className="px-space-sm py-space-sm">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {seasons.map((season) => {
            const isDeleting = deletingId === season.id
            const statusClass = season.isActive
              ? 'bg-secondary-container/50 text-on-secondary-container'
              : 'bg-error-container text-on-error-container'

            return (
              <tr
                key={season.id}
                className="border-t border-outline-variant/30 transition-colors hover:bg-surface-container-low/60"
              >
                <td className="px-space-sm py-space-sm">
                  <span className="font-headline text-headline-sm font-bold text-primary">
                    {season.name}
                  </span>
                </td>
                <td className="font-label px-space-sm py-space-sm text-label-md tabular-nums">
                  {season.startDateLabel}
                </td>
                <td className="font-label px-space-sm py-space-sm text-label-md tabular-nums">
                  {season.endDateLabel}
                </td>
                <td className="px-space-sm py-space-sm">
                  <span
                    className={`font-label inline-flex px-space-sm py-0.5 text-label-md uppercase ${statusClass}`}
                  >
                    {season.statusLabel}
                  </span>
                </td>
                <td className="px-space-sm py-space-sm">
                  <div className="flex items-center gap-1">
                    <Link
                      to={`/yonetim/sezonlar/${season.id}/duzenle`}
                      aria-label="Düzenle"
                      className="flex h-8 w-8 cursor-pointer items-center justify-center text-secondary transition-colors hover:bg-secondary-container/40"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </Link>
                    <button
                      type="button"
                      aria-label="Sil"
                      disabled={season.isActive || isDeleting}
                      title={
                        season.isActive
                          ? 'Aktif sezon silinemez. Önce başka bir sezonu aktif yapın.'
                          : undefined
                      }
                      onClick={() => {
                        onDelete(season)
                      }}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center text-error transition-colors hover:bg-error-container disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}
