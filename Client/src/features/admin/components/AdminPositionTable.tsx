import { Link } from 'react-router-dom'
import type { AdminPositionListRow } from '../utils/adminPositionTypes'

type AdminPositionTableProps = {
  positions: AdminPositionListRow[]
  selectedIds: Set<string>
  onToggle: (id: string) => void
  onToggleAll: () => void
  onClearFilters: () => void
}

export function AdminPositionTable({
  positions,
  selectedIds,
  onToggle,
  onToggleAll,
  onClearFilters,
}: AdminPositionTableProps) {
  const allSelected =
    positions.length > 0 && positions.every((position) => selectedIds.has(position.id))

  if (positions.length === 0) {
    return (
      <section className="flex flex-col items-center gap-space-md border border-outline-variant/40 bg-surface-container-lowest px-space-md py-space-xl text-center">
        <span className="material-symbols-outlined text-4xl text-on-surface-variant">
          search_off
        </span>
        <div>
          <h2 className="font-headline text-headline-sm font-bold text-primary">
            Henüz bu filtrede pozisyon bulunamadı
          </h2>
          <p className="font-body mt-space-xs max-w-lg text-body-sm text-on-surface-variant">
            Arama kriterlerinizi değiştirerek tekrar deneyebilir veya &quot;+ Pozisyon ekle&quot;
            butonunu kullanarak sisteme yeni taktiksel rol ekleyebilirsiniz.
          </p>
        </div>
        <button
          type="button"
          onClick={onClearFilters}
          className="font-label border border-outline-variant px-space-md py-space-sm text-label-md uppercase transition-colors hover:border-primary hover:text-primary"
        >
          Filtreleri Sıfırla
        </button>
      </section>
    )
  }

  return (
    <section className="overflow-x-auto border border-outline-variant/40 bg-surface-container-lowest">
      <table className="w-full min-w-[920px] border-collapse text-left">
        <thead className="bg-surface-container-low">
          <tr className="font-kicker text-kicker text-on-surface-variant uppercase">
            <th className="px-space-sm py-space-sm">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onToggleAll}
                aria-label="Tümünü seç"
                className="accent-primary"
              />
            </th>
            <th className="px-space-sm py-space-sm">Ad & Taktik Rol</th>
            <th className="px-space-sm py-space-sm">Kısaltma</th>
            <th className="px-space-sm py-space-sm">Saha Bölgesi</th>
            <th className="px-space-sm py-space-sm">Bağlı Oyuncu</th>
            <th className="px-space-sm py-space-sm">Durum</th>
            <th className="px-space-sm py-space-sm">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((position) => {
            const isSelected = selectedIds.has(position.id)

            return (
              <tr
                key={position.id}
                className="border-t border-outline-variant/30 transition-colors hover:bg-surface-container-low/60"
              >
                <td className="px-space-sm py-space-sm">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {
                      onToggle(position.id)
                    }}
                    aria-label={`${position.name} seç`}
                    className="accent-primary"
                  />
                </td>
                <td className="px-space-sm py-space-sm">
                  <div className="flex items-start gap-space-sm">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary-container text-on-primary">
                      <span className="material-symbols-outlined text-[22px]">
                        {position.icon}
                      </span>
                    </span>
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <span className="font-label text-label-md font-bold text-on-surface">
                        {position.name}
                      </span>
                      <span className="font-body text-body-sm text-on-surface-variant">
                        {position.roleLabel}
                      </span>
                    </div>
                  </div>
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
                  <div className="flex flex-col gap-0.5">
                    <span className="font-label text-label-md font-bold text-on-surface">
                      {position.playerCountLabel}
                    </span>
                    <span className="font-body text-body-sm text-on-surface-variant">
                      {position.samplePlayers}
                    </span>
                  </div>
                </td>
                <td className="px-space-sm py-space-sm">
                  <span className="font-kicker inline-flex items-center gap-1 bg-secondary-container/50 px-space-sm py-0.5 text-kicker text-on-secondary-container uppercase">
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                    {position.statusLabel}
                  </span>
                </td>
                <td className="px-space-sm py-space-sm">
                  <div className="flex items-center gap-1">
                    <Link
                      to={`/yonetim/pozisyonlar/${position.id}/duzenle`}
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
            )
          })}
        </tbody>
      </table>
    </section>
  )
}
