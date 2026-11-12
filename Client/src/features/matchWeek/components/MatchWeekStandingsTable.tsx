import type { LeagueStandingResponseDto } from '../matchWeekTypes'

type MatchWeekStandingsTableProps = {
  standings: LeagueStandingResponseDto[]
  isLoading?: boolean
}

export function MatchWeekStandingsTable({
  standings,
  isLoading,
}: MatchWeekStandingsTableProps) {
  if (isLoading) {
    return <p className="font-body text-body-sm text-on-surface-variant">Yükleniyor...</p>
  }

  if (standings.length === 0) {
    return (
      <p className="font-body text-body-sm text-on-surface-variant">
        Puan durumu henüz oluşmadı.
      </p>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[320px] border-collapse text-left">
        <thead>
          <tr className="border-b border-outline-variant/40">
            <th className="font-kicker px-1 py-1.5 text-[10px] font-bold tracking-wider text-on-surface-variant uppercase">
              #
            </th>
            <th className="font-kicker px-1 py-1.5 text-[10px] font-bold tracking-wider text-on-surface-variant uppercase">
              Takım
            </th>
            <th className="font-kicker px-1 py-1.5 text-center text-[10px] font-bold tracking-wider text-on-surface-variant uppercase">
              O
            </th>
            <th className="font-kicker px-1 py-1.5 text-center text-[10px] font-bold tracking-wider text-on-surface-variant uppercase">
              G
            </th>
            <th className="font-kicker px-1 py-1.5 text-center text-[10px] font-bold tracking-wider text-on-surface-variant uppercase">
              B
            </th>
            <th className="font-kicker px-1 py-1.5 text-center text-[10px] font-bold tracking-wider text-on-surface-variant uppercase">
              M
            </th>
            <th className="font-kicker px-1 py-1.5 text-center text-[10px] font-bold tracking-wider text-on-surface-variant uppercase">
              Av
            </th>
            <th className="font-kicker px-1 py-1.5 text-center text-[10px] font-bold tracking-wider text-on-surface-variant uppercase">
              P
            </th>
          </tr>
        </thead>
        <tbody>
          {standings.map((row) => (
            <tr
              key={row.clubId}
              className={
                row.isTrabzonspor
                  ? 'border-b border-outline-variant/20 bg-primary/10'
                  : 'border-b border-outline-variant/15'
              }
            >
              <td className="font-headline px-1 py-1.5 text-xs font-bold tabular-nums text-on-surface">
                {row.rank}
              </td>
              <td
                className={`font-body max-w-[10rem] truncate px-1 py-1.5 text-xs ${
                  row.isTrabzonspor
                    ? 'font-bold text-primary'
                    : 'text-on-surface'
                }`}
                title={row.clubName}
              >
                {row.clubName}
              </td>
              <td className="font-body px-1 py-1.5 text-center text-xs tabular-nums text-on-surface-variant">
                {row.played}
              </td>
              <td className="font-body px-1 py-1.5 text-center text-xs tabular-nums text-on-surface-variant">
                {row.won}
              </td>
              <td className="font-body px-1 py-1.5 text-center text-xs tabular-nums text-on-surface-variant">
                {row.drawn}
              </td>
              <td className="font-body px-1 py-1.5 text-center text-xs tabular-nums text-on-surface-variant">
                {row.lost}
              </td>
              <td className="font-body px-1 py-1.5 text-center text-xs tabular-nums text-on-surface-variant">
                {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
              </td>
              <td className="font-headline px-1 py-1.5 text-center text-xs font-bold tabular-nums text-on-surface">
                {row.points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
