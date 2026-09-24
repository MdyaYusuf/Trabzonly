import { Link } from 'react-router-dom'
import type { AdminRoleListRow } from '../utils/adminRoleTypes'

type AdminRoleTableProps = {
  rows: AdminRoleListRow[]
}

export function AdminRoleTable({ rows }: AdminRoleTableProps) {
  if (rows.length === 0) {
    return (
      <section className="border border-outline-variant/40 bg-surface-container-lowest px-space-md py-space-xl text-center">
        <p className="font-body text-body-md text-on-surface-variant">
          Bu filtreler için rol bulunamadı. Lütfen arama veya tür kriterlerini güncelleyiniz.
        </p>
      </section>
    )
  }

  return (
    <section className="overflow-x-auto border border-outline-variant/40 bg-surface-container-lowest">
      <table className="w-full min-w-[1000px] border-collapse text-left">
        <thead className="bg-surface-container-low">
          <tr className="font-kicker text-kicker text-on-surface-variant uppercase">
            <th className="px-space-sm py-space-sm">Rol Tanımı & Detayı</th>
            <th className="px-space-sm py-space-sm">Erişim Seviyesi / Yetki Özeti</th>
            <th className="px-space-sm py-space-sm">Atanan Üye Sayısı</th>
            <th className="px-space-sm py-space-sm">Oluşturulma Tarihi</th>
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
                <div className="flex items-start gap-space-sm">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center ${row.iconTone}`}
                  >
                    <span className="material-symbols-outlined text-[20px]">{row.icon}</span>
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-space-xs">
                      <p className="font-label text-label-md font-bold text-on-surface">
                        {row.name}
                      </p>
                      <span className="font-kicker bg-surface-container-high px-space-xs py-0.5 text-kicker text-on-surface-variant uppercase">
                        {row.kindLabel}
                      </span>
                    </div>
                    <p className="font-body mt-1 max-w-sm text-body-sm text-on-surface-variant">
                      {row.description}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-space-sm py-space-sm">
                <p className="font-label text-label-md font-bold text-on-surface">
                  {row.accessTitle}
                </p>
                {row.accessDetails.map((detail) => (
                  <p
                    key={detail}
                    className="font-body mt-1 inline-flex items-center gap-1 text-body-sm text-on-surface-variant"
                  >
                    <span className="material-symbols-outlined text-[14px] text-secondary">
                      check_circle
                    </span>
                    {detail}
                  </p>
                ))}
              </td>
              <td className="px-space-sm py-space-sm">
                <p className="font-label text-label-md font-bold text-on-surface tabular-nums">
                  {row.memberCountLabel}
                </p>
                <Link
                  to="/yonetim/uyeler"
                  className="font-label mt-1 inline-flex items-center gap-1 text-label-md text-primary uppercase hover:text-secondary"
                >
                  Üyeleri Gör
                  <span className="material-symbols-outlined text-[14px]">north_east</span>
                </Link>
              </td>
              <td className="px-space-sm py-space-sm">
                <p className="font-label text-label-md text-on-surface">{row.createdAt}</p>
                <p className="font-body text-body-sm text-on-surface-variant">{row.createdNote}</p>
              </td>
              <td className="px-space-sm py-space-sm">
                <span
                  className={`font-label inline-flex items-center gap-1 px-space-sm py-1 text-label-md uppercase ${
                    row.isLocked
                      ? 'bg-surface-container-high text-on-surface-variant'
                      : 'bg-secondary-container text-on-secondary-container'
                  }`}
                >
                  {row.isLocked ? (
                    <span className="material-symbols-outlined text-[14px]">lock</span>
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  )}
                  {row.statusLabel}
                </span>
              </td>
              <td className="px-space-sm py-space-sm">
                <div className="flex items-center gap-1">
                  <Link
                    to={`/yonetim/roller/${row.id}/duzenle`}
                    className="font-label px-space-sm py-1 text-label-md text-primary uppercase hover:text-secondary"
                  >
                    Düzenle
                  </Link>
                  {row.isLocked ? (
                    <span
                      className="flex h-8 w-8 items-center justify-center text-on-surface-variant"
                      title="Sistem rolü kilitli"
                    >
                      <span className="material-symbols-outlined text-[18px]">lock</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      aria-label="Sil"
                      className="flex h-8 w-8 items-center justify-center text-on-surface-variant transition-colors hover:bg-error-container hover:text-error"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
