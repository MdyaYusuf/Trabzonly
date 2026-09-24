import { Link } from 'react-router-dom'
import type { AdminStatisticListRow } from '../utils/adminStatisticTypes'

type AdminStatisticTableProps = {
  rows: AdminStatisticListRow[]
}

function dashOrValue(value: number | null) {
  if (value === null) {
    return '—'
  }

  return value
}

export function AdminStatisticTable({ rows }: AdminStatisticTableProps) {
  if (rows.length === 0) {
    return (
      <section className="border border-outline-variant/40 bg-surface-container-lowest px-space-md py-space-xl text-center">
        <p className="font-body text-body-md text-on-surface-variant">
          Bu filtreler için istatistik bulunamadı. Lütfen sezon veya oyuncu kriterlerini
          güncelleyiniz.
        </p>
      </section>
    )
  }

  return (
    <section className="overflow-x-auto border border-outline-variant/40 bg-surface-container-lowest">
      <table className="w-full min-w-[1100px] border-collapse text-left">
        <thead className="bg-surface-container-low">
          <tr className="font-kicker text-kicker text-on-surface-variant uppercase">
            <th className="px-space-sm py-space-sm">Oyuncu</th>
            <th className="px-space-sm py-space-sm">Sezon</th>
            <th className="px-space-sm py-space-sm">Takım</th>
            <th className="px-space-sm py-space-sm">Maç</th>
            <th className="px-space-sm py-space-sm">Dakika</th>
            <th className="bg-primary-fixed/30 px-space-sm py-space-sm">Gol</th>
            <th className="bg-secondary-fixed/40 px-space-sm py-space-sm">Asist</th>
            <th className="px-space-sm py-space-sm">Sarı</th>
            <th className="px-space-sm py-space-sm">Kırmızı</th>
            <th className="px-space-sm py-space-sm">Clean Sheet</th>
            <th className="px-space-sm py-space-sm">Kurtarış</th>
            <th className="px-space-sm py-space-sm">Yediği</th>
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
                <div className="flex items-center gap-space-sm">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-on-primary ${row.avatarTone}`}
                  >
                    {row.initials}
                  </div>
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <div className="flex flex-wrap items-center gap-space-xs">
                      <span className="font-label text-label-md font-bold text-on-surface">
                        {row.playerName}
                      </span>
                      {row.isVerified && (
                        <span
                          className="material-symbols-outlined text-[16px] text-secondary"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          verified
                        </span>
                      )}
                    </div>
                    <span className="font-body text-body-sm text-on-surface-variant">
                      #{row.number} {row.positionCode} • {row.nationality}
                    </span>
                  </div>
                </div>
              </td>
              <td className="font-label px-space-sm py-space-sm text-label-md">{row.season}</td>
              <td className="font-body px-space-sm py-space-sm text-body-sm text-on-surface-variant">
                {row.team}
              </td>
              <td className="font-label px-space-sm py-space-sm text-label-md tabular-nums">
                {row.matches}
              </td>
              <td className="font-label px-space-sm py-space-sm text-label-md tabular-nums">
                {row.minutesLabel}
              </td>
              <td className="bg-primary-fixed/20 px-space-sm py-space-sm">
                <span className="font-label bg-primary-container px-space-sm py-0.5 text-label-md font-bold text-on-primary tabular-nums">
                  {row.goals}
                </span>
              </td>
              <td className="bg-secondary-fixed/30 px-space-sm py-space-sm">
                <span className="font-label bg-secondary-container px-space-sm py-0.5 text-label-md font-bold text-on-secondary-container tabular-nums">
                  {row.assists}
                </span>
              </td>
              <td className="px-space-sm py-space-sm">
                <span className="font-label bg-tertiary-fixed px-space-sm py-0.5 text-label-md text-on-tertiary-fixed-variant tabular-nums">
                  {row.yellowCards}
                </span>
              </td>
              <td className="px-space-sm py-space-sm">
                <span className="font-label bg-error-container px-space-sm py-0.5 text-label-md text-on-error-container tabular-nums">
                  {row.redCards}
                </span>
              </td>
              <td className="font-label px-space-sm py-space-sm text-label-md tabular-nums">
                {row.cleanSheets !== null ? `${row.cleanSheets} Maç` : '—'}
              </td>
              <td className="font-label px-space-sm py-space-sm text-label-md tabular-nums">
                {dashOrValue(row.saves)}
              </td>
              <td className="font-label px-space-sm py-space-sm text-label-md tabular-nums">
                {dashOrValue(row.goalsConceded)}
              </td>
              <td className="px-space-sm py-space-sm">
                <div className="flex items-center gap-1">
                  <Link
                    to={`/yonetim/istatistikler/${row.id}/duzenle`}
                    aria-label="Düzenle"
                    className="flex h-8 w-8 items-center justify-center text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary"
                  >
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </Link>
                  <button
                    type="button"
                    aria-label="Sil"
                    className="flex h-8 w-8 items-center justify-center text-on-surface-variant transition-colors hover:bg-error-container hover:text-error"
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
