import { Link } from 'react-router-dom'
import type { AdminPollListRow } from '../utils/adminPollTypes'

type AdminPollTableProps = {
  polls: AdminPollListRow[]
  deactivatingId: number | null
  onDeactivate: (poll: AdminPollListRow) => void
}

export function AdminPollTable({
  polls,
  deactivatingId,
  onDeactivate,
}: AdminPollTableProps) {
  if (polls.length === 0) {
    return (
      <section className="border border-outline-variant/40 bg-surface-container-lowest px-space-md py-space-xl text-center">
        <p className="font-body text-body-md text-on-surface-variant">
          Henüz anket eklenmedi veya eşleşme yok.
        </p>
      </section>
    )
  }

  return (
    <section className="overflow-x-auto border border-outline-variant/40 bg-surface-container-lowest">
      <table className="w-full min-w-[960px] border-collapse text-left">
        <thead className="bg-surface-container-low">
          <tr className="font-kicker text-kicker text-on-surface-variant uppercase">
            <th className="px-space-sm py-space-sm">Soru</th>
            <th className="px-space-sm py-space-sm">Kapsam</th>
            <th className="px-space-sm py-space-sm">Hedef</th>
            <th className="px-space-sm py-space-sm">Seçenek</th>
            <th className="px-space-sm py-space-sm">Oy</th>
            <th className="px-space-sm py-space-sm">Durum</th>
            <th className="px-space-sm py-space-sm">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {polls.map((poll) => {
            const isDeactivating = deactivatingId === poll.id
            const statusClass = poll.isActive
              ? 'bg-secondary-container/50 text-on-secondary-container'
              : 'bg-error-container text-on-error-container'

            return (
              <tr
                key={poll.id}
                className="border-t border-outline-variant/30 transition-colors hover:bg-surface-container-low/60"
              >
                <td className="px-space-sm py-space-sm">
                  <span className="font-label text-label-md font-bold text-on-surface">
                    {poll.question}
                  </span>
                </td>
                <td className="px-space-sm py-space-sm">
                  <span className="font-label inline-flex bg-surface-container-high px-space-sm py-1 text-label-md text-on-surface uppercase">
                    {poll.scopeLabel}
                  </span>
                </td>
                <td className="font-body max-w-xs px-space-sm py-space-sm text-body-sm text-on-surface-variant">
                  {poll.targetLabel}
                </td>
                <td className="px-space-sm py-space-sm">
                  <span className="font-label tabular-nums text-label-md text-on-surface">
                    {poll.optionCount}
                  </span>
                </td>
                <td className="px-space-sm py-space-sm">
                  <span className="font-label inline-flex items-center gap-1 bg-surface-container-high px-space-sm py-1 text-label-md tabular-nums text-on-surface">
                    <span className="material-symbols-outlined text-[16px]">how_to_vote</span>
                    {poll.totalVotes}
                  </span>
                </td>
                <td className="px-space-sm py-space-sm">
                  <span
                    className={`font-label inline-flex px-space-sm py-0.5 text-label-md uppercase ${statusClass}`}
                  >
                    {poll.statusLabel}
                  </span>
                </td>
                <td className="px-space-sm py-space-sm">
                  <div className="flex items-center gap-1">
                    <Link
                      to={`/yonetim/anketler/${poll.id}/duzenle`}
                      aria-label="Düzenle"
                      className="flex h-8 w-8 cursor-pointer items-center justify-center text-secondary transition-colors hover:bg-secondary-container/40"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </Link>
                    <button
                      type="button"
                      aria-label="Pasifleştir"
                      disabled={!poll.isActive || isDeactivating}
                      title={
                        poll.isActive
                          ? 'Anketi pasifleştir'
                          : 'Anket zaten pasif'
                      }
                      onClick={() => {
                        onDeactivate(poll)
                      }}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center text-error transition-colors hover:bg-error-container disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        visibility_off
                      </span>
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
