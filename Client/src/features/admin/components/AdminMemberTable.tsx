import { Link } from 'react-router-dom'
import type { AdminMemberListRow } from '../utils/adminMemberTypes'

type AdminMemberTableProps = {
  rows: AdminMemberListRow[]
}

function roleTone(role: AdminMemberListRow['role']) {
  if (role === 'admin') {
    return 'bg-primary-container text-on-primary'
  }

  if (role === 'moderator') {
    return 'bg-secondary-container text-on-secondary-container'
  }

  if (role === 'editor') {
    return 'bg-secondary-fixed text-on-secondary-fixed-variant'
  }

  return 'bg-surface-container-high text-on-surface-variant'
}

function statusTone(status: AdminMemberListRow['status']) {
  if (status === 'active') {
    return 'bg-secondary-container text-on-secondary-container'
  }

  if (status === 'suspended') {
    return 'bg-error-container text-on-error-container'
  }

  return 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
}

function actionTone(tone: AdminMemberListRow['actionTone']) {
  if (tone === 'restore') {
    return 'bg-primary text-on-primary hover:bg-primary-container'
  }

  if (tone === 'success') {
    return 'border border-secondary text-secondary hover:bg-secondary-container'
  }

  return 'border border-error text-error hover:bg-error-container'
}

export function AdminMemberTable({ rows }: AdminMemberTableProps) {
  if (rows.length === 0) {
    return (
      <section className="border border-outline-variant/40 bg-surface-container-lowest px-space-md py-space-xl text-center">
        <p className="font-body text-body-md text-on-surface-variant">
          Bu filtreler için üye bulunamadı. Lütfen rol veya durum kriterlerini güncelleyiniz.
        </p>
      </section>
    )
  }

  return (
    <section className="overflow-x-auto border border-outline-variant/40 bg-surface-container-lowest">
      <table className="w-full min-w-[1000px] border-collapse text-left">
        <thead className="bg-surface-container-low">
          <tr className="font-kicker text-kicker text-on-surface-variant uppercase">
            <th className="px-space-sm py-space-sm">Avatar & Üye Kimliği</th>
            <th className="px-space-sm py-space-sm">Rol</th>
            <th className="px-space-sm py-space-sm">Durum</th>
            <th className="px-space-sm py-space-sm">Katılım & Gönderi</th>
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
                    <div className="flex flex-wrap items-center gap-space-xs">
                      <span className="font-label text-label-md font-bold text-on-surface">
                        {row.username}
                      </span>
                      {row.isVerified && (
                        <span
                          className="material-symbols-outlined text-[16px] text-secondary"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          verified
                        </span>
                      )}
                      {row.badgeLabel && (
                        <span className="font-kicker bg-tertiary-fixed px-space-xs py-0.5 text-kicker text-on-tertiary-fixed-variant uppercase">
                          {row.badgeLabel}
                        </span>
                      )}
                    </div>
                    <span className="font-body text-body-sm text-on-surface-variant">
                      {row.email}
                    </span>
                    <span className="font-kicker text-kicker text-on-surface-variant uppercase">
                      {row.memberCode}
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-space-sm py-space-sm">
                <span
                  className={`font-label inline-block px-space-sm py-1 text-label-md uppercase ${roleTone(row.role)}`}
                >
                  {row.roleLabel}
                </span>
              </td>
              <td className="px-space-sm py-space-sm">
                <span
                  className={`font-label inline-flex items-center gap-1 px-space-sm py-1 text-label-md uppercase ${statusTone(row.status)}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {row.statusLabel}
                </span>
              </td>
              <td className="px-space-sm py-space-sm">
                <p className="font-label text-label-md font-bold text-on-surface">
                  {row.postsLabel}
                </p>
                <p className="font-body text-body-sm text-on-surface-variant">{row.squadsLabel}</p>
              </td>
              <td className="font-body px-space-sm py-space-sm text-body-sm text-on-surface-variant">
                {row.registeredAt}
              </td>
              <td className="px-space-sm py-space-sm">
                <div className="flex flex-wrap items-center gap-space-sm">
                  <Link
                    to={`/yonetim/uyeler/${row.id}`}
                    className="font-label text-label-md text-primary uppercase transition-colors hover:text-secondary"
                  >
                    Düzenle
                  </Link>
                  <button
                    type="button"
                    className={`font-label px-space-sm py-1 text-label-md uppercase transition-colors ${actionTone(row.actionTone)}`}
                  >
                    {row.actionLabel}
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
