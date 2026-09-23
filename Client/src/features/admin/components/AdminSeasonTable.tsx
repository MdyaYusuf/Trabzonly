import { Link } from 'react-router-dom'
import type { AdminSeasonListRow, AdminSeasonRowStatus } from '../utils/adminSeasonTypes'

type AdminSeasonTableProps = {
  seasons: AdminSeasonListRow[]
}

const statusClass: Record<AdminSeasonRowStatus, string> = {
  planned: 'bg-secondary-fixed text-on-secondary-fixed-variant',
  active: 'bg-primary-container text-on-primary',
  completed: 'bg-surface-container-high text-on-surface-variant',
  archive: 'bg-surface-container-high text-on-surface-variant',
  legendary: 'bg-tertiary-container text-tertiary-fixed-dim',
}

export function AdminSeasonTable({ seasons }: AdminSeasonTableProps) {
  if (seasons.length === 0) {
    return (
      <section className="border border-outline-variant/40 bg-surface-container-lowest px-space-md py-space-xl text-center">
        <p className="font-body text-body-md text-on-surface-variant">
          Bu filtrede sezon bulunamadı.
        </p>
      </section>
    )
  }

  return (
    <section className="overflow-x-auto border border-outline-variant/40 bg-surface-container-lowest">
      <table className="w-full min-w-[960px] border-collapse text-left">
        <thead className="bg-surface-container-low">
          <tr className="font-kicker text-kicker text-on-surface-variant uppercase">
            <th className="px-space-sm py-space-sm">Sezon Adı</th>
            <th className="px-space-sm py-space-sm">Başlangıç Tarihi</th>
            <th className="px-space-sm py-space-sm">Bitiş Tarihi</th>
            <th className="px-space-sm py-space-sm">Durum</th>
            <th className="px-space-sm py-space-sm">Bağlı Veriler & Detaylar</th>
            <th className="px-space-sm py-space-sm">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {seasons.map((season) => (
            <tr
              key={season.id}
              className="border-t border-outline-variant/30 transition-colors hover:bg-surface-container-low/60"
            >
              <td className="px-space-sm py-space-sm">
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-space-xs">
                    <span className="font-headline text-headline-sm font-bold text-primary">
                      {season.name}
                    </span>
                    {season.isLive && (
                      <span className="font-kicker bg-secondary-container px-space-xs py-0.5 text-kicker text-on-secondary-container uppercase">
                        Canlı
                      </span>
                    )}
                    {season.isLegendary && (
                      <span
                        className="material-symbols-outlined text-[18px] text-tertiary-fixed-dim"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    )}
                  </div>
                  <span className="font-body text-body-sm text-on-surface-variant">
                    {season.subtitle}
                  </span>
                </div>
              </td>
              <td className="font-body px-space-sm py-space-sm text-body-sm text-on-surface">
                <span className="inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                    event
                  </span>
                  {season.startDateLabel}
                </span>
              </td>
              <td className="font-body px-space-sm py-space-sm text-body-sm text-on-surface">
                <span className="inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                    event_available
                  </span>
                  {season.endDateLabel}
                </span>
              </td>
              <td className="px-space-sm py-space-sm">
                <span
                  className={`font-kicker inline-flex items-center gap-1 px-space-sm py-0.5 text-kicker uppercase ${statusClass[season.status]}`}
                >
                  {season.status === 'legendary' && (
                    <span className="material-symbols-outlined text-[14px]">stars</span>
                  )}
                  {season.statusLabel}
                </span>
              </td>
              <td className="px-space-sm py-space-sm">
                <div className="font-body flex flex-wrap items-center gap-x-space-xs gap-y-1 text-body-sm text-on-surface-variant">
                  {season.details.map((detail, index) => (
                    <span key={detail} className="inline-flex items-center gap-1">
                      {index > 0 && <span aria-hidden>•</span>}
                      {detail.includes('Sakatlık') && (
                        <span className="material-symbols-outlined text-[14px]">
                          medical_services
                        </span>
                      )}
                      {detail.includes('Süper Kupa') && (
                        <span
                          className="material-symbols-outlined text-[14px] text-tertiary-fixed-dim"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          emoji_events
                        </span>
                      )}
                      <span
                        className={
                          detail === 'ŞAMPİYON' ? 'font-bold text-tertiary-fixed-dim' : undefined
                        }
                      >
                        {detail}
                      </span>
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-space-sm py-space-sm">
                <div className="flex items-center gap-1">
                  <Link
                    to={`/yonetim/sezonlar/${season.id}/duzenle`}
                    aria-label="Düzenle"
                    className="flex h-8 w-8 items-center justify-center text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary"
                  >
                    <span className="material-symbols-outlined text-[18px]">edit_square</span>
                  </Link>
                  <button
                    type="button"
                    aria-label="Sil"
                    disabled={!season.canDelete}
                    className="flex h-8 w-8 items-center justify-center text-on-surface-variant transition-colors enabled:hover:bg-error-container enabled:hover:text-error disabled:opacity-30"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {season.canDelete ? 'delete' : 'delete_forever'}
                    </span>
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
