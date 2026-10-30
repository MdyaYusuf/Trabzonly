import { Link } from 'react-router-dom'
import type { AdminPlayerListRow } from '../utils/adminPlayerTypes'

type AdminPlayerTableProps = {
  players: AdminPlayerListRow[]
  deletingId: number | null
  onDelete: (player: AdminPlayerListRow) => void
}

export function AdminPlayerTable({
  players,
  deletingId,
  onDelete,
}: AdminPlayerTableProps) {
  return (
    <section className="overflow-x-auto border border-outline-variant/40 bg-surface-container-lowest">
      {players.length === 0 ? (
        <p className="font-body px-space-md py-space-xl text-center text-body-md text-on-surface-variant">
          Henüz oyuncu eklenmedi veya eşleşme yok.
        </p>
      ) : (
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead className="bg-surface-container-low">
            <tr className="font-kicker text-kicker text-on-surface-variant uppercase">
              <th className="px-space-sm py-space-sm">No</th>
              <th className="px-space-sm py-space-sm">Fotoğraf</th>
              <th className="px-space-sm py-space-sm">Ad Soyad</th>
              <th className="px-space-sm py-space-sm">Pozisyon</th>
              <th className="px-space-sm py-space-sm">Takım</th>
              <th className="px-space-sm py-space-sm">Uyruk</th>
              <th className="px-space-sm py-space-sm">Yaş</th>
              <th className="px-space-sm py-space-sm">Piyasa Değeri</th>
              <th className="px-space-sm py-space-sm">Durum</th>
              <th className="px-space-sm py-space-sm">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => {
              const statusClass =
                player.status === 'active'
                  ? 'bg-secondary-container/50 text-on-secondary-container'
                  : 'bg-error-container text-on-error-container'
              const isDeleting = deletingId === player.id

              return (
                <tr
                  key={player.id}
                  className="border-t border-outline-variant/30 transition-colors hover:bg-surface-container-low/60"
                >
                  <td className="font-label px-space-sm py-space-sm text-label-md font-bold text-primary">
                    {player.number != null ? `#${player.number}` : '—'}
                  </td>
                  <td className="px-space-sm py-space-sm">
                    {player.imageUrl ? (
                      <img
                        src={player.imageUrl}
                        alt=""
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xs font-bold text-on-primary">
                        {player.initials}
                      </div>
                    )}
                  </td>
                  <td className="px-space-sm py-space-sm">
                    <div className="flex flex-wrap items-center gap-space-xs">
                      <span className="font-label text-label-md font-bold text-on-surface uppercase">
                        {player.fullName}
                      </span>
                      {player.isCaptain ? (
                        <span className="font-kicker bg-tertiary-container px-space-xs py-0.5 text-kicker text-tertiary-fixed-dim uppercase">
                          Kaptan
                        </span>
                      ) : null}
                    </div>
                  </td>
                  <td className="font-body px-space-sm py-space-sm text-body-sm text-on-surface">
                    {player.positionLabel}
                  </td>
                  <td className="font-body px-space-sm py-space-sm text-body-sm text-on-surface-variant">
                    {player.currentTeam}
                  </td>
                  <td className="font-body px-space-sm py-space-sm text-body-sm text-on-surface">
                    {player.nationality}
                  </td>
                  <td className="font-label px-space-sm py-space-sm text-label-md tabular-nums">
                    {player.age}
                  </td>
                  <td className="font-label px-space-sm py-space-sm text-label-md font-bold text-primary tabular-nums">
                    {player.marketValueLabel}
                  </td>
                  <td className="px-space-sm py-space-sm">
                    <span
                      className={`font-kicker px-space-sm py-0.5 text-kicker uppercase ${statusClass}`}
                    >
                      {player.statusLabel}
                    </span>
                  </td>
                  <td className="px-space-sm py-space-sm">
                    <div className="flex items-center gap-1">
                      <Link
                        to={`/yonetim/oyuncular/${player.id}/duzenle`}
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
                          onDelete(player)
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
      )}
    </section>
  )
}
