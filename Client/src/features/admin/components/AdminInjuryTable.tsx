import { Link } from 'react-router-dom'
import type { AdminInjuryListRow } from '../utils/adminInjuryTypes'

type AdminInjuryTableProps = {
  rows: AdminInjuryListRow[]
  deletingId: number | null
  onDelete: (row: AdminInjuryListRow) => void
}

export function AdminInjuryTable({
  rows,
  deletingId,
  onDelete,
}: AdminInjuryTableProps) {
  if (rows.length === 0) {
    return (
      <section className="border border-outline-variant/40 bg-surface-container-lowest px-space-md py-space-xl text-center">
        <p className="font-body text-body-md text-on-surface-variant">
          Henüz sakatlık eklenmedi veya eşleşme yok.
        </p>
      </section>
    )
  }

  return (
    <section className="overflow-x-auto border border-outline-variant/40 bg-surface-container-lowest">
      <table className="w-full min-w-[1000px] border-collapse text-left">
        <thead className="bg-surface-container-low">
          <tr className="font-kicker text-kicker text-on-surface-variant uppercase">
            <th className="px-space-sm py-space-sm">Oyuncu</th>
            <th className="px-space-sm py-space-sm">Sakatlık</th>
            <th className="px-space-sm py-space-sm">Gün</th>
            <th className="px-space-sm py-space-sm">Kaçırılan Maç</th>
            <th className="px-space-sm py-space-sm">Sezon</th>
            <th className="px-space-sm py-space-sm">Kayıt Tarihi</th>
            <th className="px-space-sm py-space-sm">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const isDeleting = deletingId === row.id

            return (
              <tr
                key={row.id}
                className="border-t border-outline-variant/30 transition-colors hover:bg-surface-container-low/60"
              >
                <td className="px-space-sm py-space-sm">
                  <div className="flex items-center gap-space-sm">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-on-primary">
                      {row.initials}
                    </div>
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <span className="font-label text-label-md font-bold text-on-surface">
                        {row.playerName}
                      </span>
                      <span className="font-body text-body-sm text-on-surface-variant">
                        {row.number != null ? `#${row.number}` : '—'} {row.positionCode} •{' '}
                        {row.nationality}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="font-label px-space-sm py-space-sm text-label-md font-bold text-on-surface">
                  {row.diagnosis}
                </td>
                <td className="px-space-sm py-space-sm">
                  <span className="font-label bg-tertiary-fixed px-space-sm py-0.5 text-label-md text-on-tertiary-fixed-variant tabular-nums">
                    {row.days}
                  </span>
                </td>
                <td className="px-space-sm py-space-sm">
                  <span className="font-label bg-error-container px-space-sm py-0.5 text-label-md text-on-error-container tabular-nums">
                    {row.missedMatches}
                  </span>
                </td>
                <td className="font-label px-space-sm py-space-sm text-label-md">{row.season}</td>
                <td className="font-body px-space-sm py-space-sm text-body-sm text-on-surface-variant">
                  {row.recordedAt}
                </td>
                <td className="px-space-sm py-space-sm">
                  <div className="flex items-center gap-1">
                    <Link
                      to={`/yonetim/sakatliklar/${row.id}/duzenle`}
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
                        onDelete(row)
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
