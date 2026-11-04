import { Link } from 'react-router-dom'
import type { AdminMemberListRow } from '../utils/adminMemberTypes'

type AdminMemberTableProps = {
  rows: AdminMemberListRow[]
  togglingId: string | null
  deletingId: string | null
  onToggleActive: (row: AdminMemberListRow) => void
  onDelete: (row: AdminMemberListRow) => void
}

export function AdminMemberTable({
  rows,
  togglingId,
  deletingId,
  onToggleActive,
  onDelete,
}: AdminMemberTableProps) {
  if (rows.length === 0) {
    return (
      <section className="border border-outline-variant/40 bg-surface-container-lowest px-space-md py-space-xl text-center">
        <p className="font-body text-body-md text-on-surface-variant">
          Henüz üye bulunamadı veya eşleşme yok.
        </p>
      </section>
    )
  }

  return (
    <section className="overflow-x-auto border border-outline-variant/40 bg-surface-container-lowest">
      <table className="w-full min-w-[1000px] border-collapse text-left">
        <thead className="bg-surface-container-low">
          <tr className="font-kicker text-kicker text-on-surface-variant uppercase">
            <th className="px-space-sm py-space-sm">Üye</th>
            <th className="px-space-sm py-space-sm">Rol</th>
            <th className="px-space-sm py-space-sm">Durum</th>
            <th className="px-space-sm py-space-sm">Gönderi</th>
            <th className="px-space-sm py-space-sm">Kadro</th>
            <th className="px-space-sm py-space-sm">Kayıt Tarihi</th>
            <th className="px-space-sm py-space-sm">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const isToggling = togglingId === row.id
            const isDeleting = deletingId === row.id
            const statusClass = row.isActive
              ? 'bg-secondary-container/50 text-on-secondary-container'
              : 'bg-error-container text-on-error-container'
            const canToggleActive = !row.isAdmin

            return (
              <tr
                key={row.id}
                className="border-t border-outline-variant/30 transition-colors hover:bg-surface-container-low/60"
              >
                <td className="px-space-sm py-space-sm">
                  <div className="flex items-center gap-space-sm">
                    {row.profileImageUrl ? (
                      <img
                        src={row.profileImageUrl}
                        alt=""
                        className="h-10 w-10 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-container text-xs font-bold text-on-primary">
                        {row.initials}
                      </div>
                    )}
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <span className="font-label text-label-md font-bold text-on-surface">
                        {row.username}
                      </span>
                      <span className="font-body text-body-sm text-on-surface-variant">
                        {row.email}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-space-sm py-space-sm">
                  <span className="font-label inline-block bg-surface-container-high px-space-sm py-1 text-label-md uppercase text-on-surface">
                    {row.roleName}
                  </span>
                </td>
                <td className="px-space-sm py-space-sm">
                  <span
                    className={`font-label inline-flex px-space-sm py-0.5 text-label-md uppercase ${statusClass}`}
                  >
                    {row.statusLabel}
                  </span>
                </td>
                <td className="font-label px-space-sm py-space-sm text-label-md tabular-nums text-on-surface">
                  {row.postCount}
                </td>
                <td className="font-label px-space-sm py-space-sm text-label-md tabular-nums text-on-surface">
                  {row.squadCount}
                </td>
                <td className="font-body px-space-sm py-space-sm text-body-sm text-on-surface-variant">
                  {row.createdDateLabel}
                </td>
                <td className="px-space-sm py-space-sm">
                  <div className="flex items-center gap-1">
                    <Link
                      to={`/yonetim/uyeler/${row.id}`}
                      aria-label="Düzenle"
                      className="flex h-8 w-8 cursor-pointer items-center justify-center text-secondary transition-colors hover:bg-secondary-container/40"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </Link>
                    <button
                      type="button"
                      aria-label={row.isActive ? 'Askıya al' : 'Aktifleştir'}
                      disabled={!canToggleActive || isToggling || isDeleting}
                      title={
                        row.isAdmin
                          ? 'Yönetici hesapları pasife alınamaz.'
                          : undefined
                      }
                      onClick={() => {
                        onToggleActive(row)
                      }}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {row.isActive ? 'person_off' : 'person'}
                      </span>
                    </button>
                    <button
                      type="button"
                      aria-label="Sil"
                      disabled={isDeleting || isToggling}
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
