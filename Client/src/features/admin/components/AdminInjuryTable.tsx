import { Link } from 'react-router-dom'
import type { AdminInjuryListRow } from '../utils/adminInjuryTypes'

type AdminInjuryTableProps = {
  rows: AdminInjuryListRow[]
}

function statusTone(status: AdminInjuryListRow['status']) {
  if (status === 'recovered') {
    return 'bg-secondary-container text-on-secondary-container'
  }

  if (status === 'match-form') {
    return 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
  }

  return 'bg-error-container text-on-error-container'
}

export function AdminInjuryTable({ rows }: AdminInjuryTableProps) {
  if (rows.length === 0) {
    return (
      <section className="border border-outline-variant/40 bg-surface-container-lowest px-space-md py-space-xl text-center">
        <p className="font-body text-body-md text-on-surface-variant">
          Bu filtreler için sakatlık kaydı bulunamadı. Lütfen sezon veya durum kriterlerini
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
            <th className="px-space-sm py-space-sm">Oyuncu & Pozisyon</th>
            <th className="px-space-sm py-space-sm">Klinik Teşhis / Sakatlık Adı</th>
            <th className="px-space-sm py-space-sm">Rehabilitasyon Durumu</th>
            <th className="px-space-sm py-space-sm">Gün</th>
            <th className="px-space-sm py-space-sm">Kaçırılan Maç</th>
            <th className="px-space-sm py-space-sm">Sezon</th>
            <th className="px-space-sm py-space-sm">Kayıt Tarihi</th>
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
                    <span className="font-label text-label-md font-bold text-on-surface">
                      {row.playerName}
                    </span>
                    <span className="font-body text-body-sm text-on-surface-variant">
                      {row.positionLabel}
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-space-sm py-space-sm">
                <p className="font-label text-label-md font-bold text-on-surface">{row.diagnosis}</p>
                <p className="font-body mt-0.5 text-body-sm text-on-surface-variant">
                  {row.diagnosisDetail}
                </p>
              </td>
              <td className="px-space-sm py-space-sm">
                <span
                  className={`font-label inline-flex items-center gap-1 px-space-sm py-1 text-label-md uppercase ${statusTone(row.status)}`}
                >
                  {row.status === 'recovered' && (
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  )}
                  {row.statusLabel}
                </span>
              </td>
              <td className="font-label px-space-sm py-space-sm text-label-md tabular-nums">
                {row.days} Gün
              </td>
              <td className="font-label px-space-sm py-space-sm text-label-md tabular-nums">
                {row.missedMatches} Maç
              </td>
              <td className="font-label px-space-sm py-space-sm text-label-md">{row.season}</td>
              <td className="font-body px-space-sm py-space-sm text-body-sm text-on-surface-variant">
                {row.recordedAt}
              </td>
              <td className="px-space-sm py-space-sm">
                <div className="flex items-center gap-1">
                  <Link
                    to={`/yonetim/sakatliklar/${row.id}/duzenle`}
                    aria-label="Görüntüle"
                    className="flex h-8 w-8 items-center justify-center text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary"
                  >
                    <span className="material-symbols-outlined text-[18px]">visibility</span>
                  </Link>
                  <Link
                    to={`/yonetim/sakatliklar/${row.id}/duzenle`}
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
