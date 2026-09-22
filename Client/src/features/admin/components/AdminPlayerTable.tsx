import { Link } from 'react-router-dom'
import type { AdminPlayerListRow } from '../utils/adminPlayerTypes'

type AdminPlayerTableProps = {
  players: AdminPlayerListRow[]
  selectedIds: Set<string>
  onToggle: (id: string) => void
  onToggleAll: () => void
}

export function AdminPlayerTable({
  players,
  selectedIds,
  onToggle,
  onToggleAll,
}: AdminPlayerTableProps) {
  const allSelected = players.length > 0 && players.every((player) => selectedIds.has(player.id))

  return (
    <section className="overflow-x-auto border border-outline-variant/40 bg-surface-container-lowest">
      {players.length === 0 ? (
        <p className="font-body px-space-md py-space-xl text-center text-body-md text-on-surface-variant">
          Henüz oyuncu eklenmedi veya eşleşme yok.
        </p>
      ) : (
        <table className="w-full min-w-[960px] border-collapse text-left">
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
              <th className="px-space-sm py-space-sm">No</th>
              <th className="px-space-sm py-space-sm">Fotoğraf</th>
              <th className="px-space-sm py-space-sm">Ad Soyad</th>
              <th className="px-space-sm py-space-sm">Pozisyon</th>
              <th className="px-space-sm py-space-sm">Kadro / Takım</th>
              <th className="px-space-sm py-space-sm">Uyruk</th>
              <th className="px-space-sm py-space-sm">Yaş</th>
              <th className="px-space-sm py-space-sm">Piyasa Değeri</th>
              <th className="px-space-sm py-space-sm">Durum</th>
              <th className="px-space-sm py-space-sm">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => {
              const isSelected = selectedIds.has(player.id)
              const statusClass =
                player.status === 'active'
                  ? 'bg-secondary-container/50 text-on-secondary-container'
                  : player.status === 'injured'
                    ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
                    : 'bg-error-container text-on-error-container'

              return (
                <tr
                  key={player.id}
                  className="border-t border-outline-variant/30 transition-colors hover:bg-surface-container-low/60"
                >
                  <td className="px-space-sm py-space-sm">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {
                        onToggle(player.id)
                      }}
                      aria-label={`${player.fullName} seç`}
                      className="accent-primary"
                    />
                  </td>
                  <td className="font-label px-space-sm py-space-sm text-label-md font-bold text-primary">
                    #{player.number}
                  </td>
                  <td className="px-space-sm py-space-sm">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-on-primary ${player.avatarTone}`}
                    >
                      {player.initials}
                    </div>
                  </td>
                  <td className="px-space-sm py-space-sm">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex flex-wrap items-center gap-space-xs">
                        <span className="font-label text-label-md font-bold text-on-surface uppercase">
                          {player.fullName}
                        </span>
                        {player.isCaptain && (
                          <span className="font-kicker bg-tertiary-container px-space-xs py-0.5 text-kicker text-tertiary-fixed-dim uppercase">
                            Kaptan
                          </span>
                        )}
                        {player.isViceCaptain && (
                          <span className="font-kicker inline-flex items-center gap-0.5 bg-surface-container-high px-space-xs py-0.5 text-kicker text-on-surface-variant uppercase">
                            <span
                              className="material-symbols-outlined text-[12px] text-tertiary-fixed-dim"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              star
                            </span>
                            Kaptan 2.
                          </span>
                        )}
                      </div>
                      <span className="font-body text-body-sm text-on-surface-variant">
                        {player.secondaryName}
                      </span>
                    </div>
                  </td>
                  <td className="font-body px-space-sm py-space-sm text-body-sm text-on-surface">
                    {player.positionLabel}
                  </td>
                  <td className="font-body px-space-sm py-space-sm text-body-sm text-on-surface-variant">
                    {player.squadLabel}
                  </td>
                  <td className="font-body px-space-sm py-space-sm text-body-sm text-on-surface">
                    <span className="mr-1" aria-hidden>
                      {player.nationalityFlag}
                    </span>
                    {player.nationality}
                  </td>
                  <td className="font-label px-space-sm py-space-sm text-label-md tabular-nums">
                    {player.age}
                  </td>
                  <td className="font-label px-space-sm py-space-sm text-label-md font-bold text-primary tabular-nums">
                    {player.marketValueLabel}
                  </td>
                  <td className="px-space-sm py-space-sm">
                    <span className={`font-kicker px-space-sm py-0.5 text-kicker uppercase ${statusClass}`}>
                      {player.statusLabel}
                    </span>
                  </td>
                  <td className="px-space-sm py-space-sm">
                    <div className="flex items-center gap-1">
                      <Link
                        to={`/yonetim/oyuncular/${player.id}/duzenle`}
                        aria-label="Düzenle"
                        className="flex h-8 w-8 items-center justify-center text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </Link>
                      <button
                        type="button"
                        aria-label="İstatistik"
                        className="flex h-8 w-8 items-center justify-center text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-secondary"
                      >
                        <span className="material-symbols-outlined text-[18px]">query_stats</span>
                      </button>
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
      )}
    </section>
  )
}
