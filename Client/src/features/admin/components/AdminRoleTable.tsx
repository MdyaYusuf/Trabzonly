import { Link } from 'react-router-dom'
import type { AdminRoleListRow } from '../utils/adminRoleTypes'

type AdminRoleTableProps = {
  roles: AdminRoleListRow[]
  deletingId: number | null
  onDelete: (role: AdminRoleListRow) => void
}

function formatCreatedDate(value: string): string {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return '—'
  }

  return date.toLocaleDateString('tr-TR')
}

export function AdminRoleTable({ roles, deletingId, onDelete }: AdminRoleTableProps) {
  if (roles.length === 0) {
    return (
      <section className="border border-outline-variant/40 bg-surface-container-lowest px-space-md py-space-xl text-center">
        <p className="font-body text-body-md text-on-surface-variant">
          Henüz rol eklenmedi veya eşleşme yok.
        </p>
      </section>
    )
  }

  return (
    <section className="overflow-x-auto border border-outline-variant/40 bg-surface-container-lowest">
      <table className="w-full min-w-[720px] border-collapse text-left">
        <thead className="bg-surface-container-low">
          <tr className="font-kicker text-kicker text-on-surface-variant uppercase">
            <th className="px-space-sm py-space-sm">Rol</th>
            <th className="px-space-sm py-space-sm">Üye Sayısı</th>
            <th className="px-space-sm py-space-sm">Tür</th>
            <th className="px-space-sm py-space-sm">Oluşturulma</th>
            <th className="px-space-sm py-space-sm">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => {
            const isDeleting = deletingId === role.id
            const hasMembers = role.memberCount > 0
            const canDelete = !role.isSystem && !hasMembers

            return (
              <tr
                key={role.id}
                className="border-t border-outline-variant/30 transition-colors hover:bg-surface-container-low/60"
              >
                <td className="px-space-sm py-space-sm">
                  <span className="font-label text-label-md font-bold text-on-surface">
                    {role.name}
                  </span>
                </td>
                <td className="px-space-sm py-space-sm">
                  <Link
                    to="/yonetim/uyeler"
                    className="font-label inline-flex items-center gap-1 bg-surface-container-high px-space-sm py-1 text-label-md tabular-nums text-on-surface transition-colors hover:text-primary"
                  >
                    <span className="material-symbols-outlined text-[16px]">group</span>
                    {role.memberCount}
                  </Link>
                </td>
                <td className="px-space-sm py-space-sm">
                  <span
                    className={`font-label inline-flex items-center gap-1 px-space-sm py-0.5 text-label-md uppercase ${
                      role.isSystem
                        ? 'bg-surface-container-high text-on-surface-variant'
                        : 'bg-secondary-container/50 text-on-secondary-container'
                    }`}
                  >
                    {role.isSystem ? (
                      <span className="material-symbols-outlined text-[14px]">lock</span>
                    ) : null}
                    {role.statusLabel}
                  </span>
                </td>
                <td className="font-label px-space-sm py-space-sm text-label-md tabular-nums text-on-surface">
                  {formatCreatedDate(role.createdDate)}
                </td>
                <td className="px-space-sm py-space-sm">
                  <div className="flex items-center gap-1">
                    <Link
                      to={`/yonetim/roller/${role.id}/duzenle`}
                      aria-label="Düzenle"
                      className="flex h-8 w-8 cursor-pointer items-center justify-center text-secondary transition-colors hover:bg-secondary-container/40"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </Link>
                    <button
                      type="button"
                      aria-label="Sil"
                      disabled={!canDelete || isDeleting}
                      title={
                        role.isSystem
                          ? 'Sistem rolleri silinemez.'
                          : hasMembers
                            ? 'Bu role bağlı üyeler varken silinemez.'
                            : undefined
                      }
                      onClick={() => {
                        onDelete(role)
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
