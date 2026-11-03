import { Link } from 'react-router-dom'
import type { AdminPositionListRow } from '../utils/adminPositionTypes'

type AdminPositionTableProps = {
  positions: AdminPositionListRow[]
  deletingId: number | null
  onDelete: (position: AdminPositionListRow) => void
}

export function AdminPositionTable({
  positions,
  deletingId,
  onDelete,
}: AdminPositionTableProps) {
  if (positions.length === 0) {
    return (
      <section className="border border-outline-variant/40 bg-surface-container-lowest px-space-md py-space-xl text-center">
        <p className="font-body text-body-md text-on-surface-variant">
          Henüz pozisyon eklenmedi veya eşleşme yok.
        </p>
      </section>
    )
  }

  return (
    <section className="overflow-x-auto border border-outline-variant/40 bg-surface-container-lowest">
      <table className="w-full min-w-[900px] border-collapse text-left">
        <thead className="bg-surface-container-low">
          <tr className="font-kicker text-kicker text-on-surface-variant uppercase">
            <th className="px-space-sm py-space-sm">Pozisyon</th>
            <th className="px-space-sm py-space-sm">Kısaltma</th>
            <th className="px-space-sm py-space-sm">Saha Bölgesi</th>
            <th className="px-space-sm py-space-sm">Roller</th>
            <th className="px-space-sm py-space-sm">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((position) => {
            const isDeleting = deletingId === position.id

            return (
              <tr
                key={position.id}
                className="border-t border-outline-variant/30 transition-colors hover:bg-surface-container-low/60"
              >
                <td className="px-space-sm py-space-sm">
                  <span className="font-label text-label-md font-bold text-on-surface">
                    {position.name}
                  </span>
                </td>
                <td className="px-space-sm py-space-sm">
                  <span className="font-kicker bg-surface-container-high px-space-sm py-1 text-kicker font-bold text-primary uppercase">
                    {position.abbreviation}
                  </span>
                </td>
                <td className="font-body px-space-sm py-space-sm text-body-sm text-on-surface">
                  {position.zoneLabel}
                </td>
                <td className="px-space-sm py-space-sm">
                  {position.roleNames.length === 0 ? (
                    <span className="font-body text-body-sm text-on-surface-variant">Rol yok</span>
                  ) : (
                    <div className="flex flex-wrap items-center gap-1">
                      {position.roleNames.map((roleName) => (
                        <span
                          key={`${position.id}-${roleName}`}
                          className="font-kicker bg-surface-container-high px-space-xs py-0.5 text-kicker text-on-surface-variant uppercase"
                        >
                          {roleName}
                        </span>
                      ))}
                    </div>
                  )}
                </td>
                <td className="px-space-sm py-space-sm">
                  <div className="flex items-center gap-1">
                    <Link
                      to={`/yonetim/pozisyonlar/${position.id}/duzenle`}
                      aria-label="Düzenle"
                      className="flex h-8 w-8 cursor-pointer items-center justify-center text-secondary transition-colors hover:bg-secondary-container/40"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </Link>
                    <button
                      type="button"
                      aria-label="Sil"
                      disabled={isDeleting}
                      onClick={() => {
                        onDelete(position)
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
