import { PlayerCategory, type PlayerResponseDto } from '../playerTypes'
import { LEGEND_TEAM_LABEL, positionGroupFromZone } from '../utils/mapPlayerToCardData'

type PlayerSeasonStatsSectionProps = {
  player: PlayerResponseDto
}

function StatBox({
  label,
  value,
  hint,
  emphasize = false,
}: {
  label: string
  value: string
  hint?: string
  emphasize?: boolean
}) {
  if (emphasize) {
    return (
      <div className="flex flex-col justify-between bg-primary-container p-space-md text-on-primary">
        <span className="font-kicker text-kicker font-bold text-secondary-fixed-dim uppercase">
          {label}
        </span>
        <div className="my-space-xs">
          <span className="font-stat text-stat-counter font-extrabold text-on-primary">
            {value}
          </span>
        </div>
        {hint ? (
          <span className="font-body text-[12px] font-semibold text-tertiary-fixed-dim">
            {hint}
          </span>
        ) : (
          <span className="font-body text-[12px] text-transparent">—</span>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-between bg-surface-container p-space-md">
      <span className="font-kicker text-kicker font-bold text-on-surface-variant uppercase">
        {label}
      </span>
      <div className="my-space-xs">
        <span className="font-stat text-stat-counter font-extrabold text-primary">{value}</span>
      </div>
      {hint ? (
        <span className="font-body text-[12px] text-on-surface-variant">{hint}</span>
      ) : (
        <span className="font-body text-[12px] text-transparent">—</span>
      )}
    </div>
  )
}

export function PlayerSeasonStatsSection({ player }: PlayerSeasonStatsSectionProps) {
  const stats = player.currentSeasonStats
  const group = positionGroupFromZone(player.positionZone)
  const isLegend = player.category === PlayerCategory.Legend
  const seasonLabel =
    stats?.seasonName?.trim() ||
    (isLegend ? 'Kariyer' : 'Güncel Sezon')
  const teamLabel = isLegend
    ? stats?.team?.trim() || LEGEND_TEAM_LABEL
    : stats?.team?.trim() || player.currentTeam?.trim() || '—'
  const sectionTitle = isLegend ? 'KARİYER İSTATİSTİKLERİ' : 'SEZON İSTATİSTİKLERİ'
  const appearances = stats?.appearances ?? 0
  const goals = stats?.goals ?? 0
  const assists = stats?.assists ?? 0
  const cleanSheets = stats?.cleanSheets
  const yellowCards = stats?.yellowCards
  const redCards = stats?.redCards
  const goalsConceded = stats?.goalsConceded
  const contribution = goals + assists
  const isGk = group === 'gk'
  const isDef = group === 'def'

  return (
    <section className="flex flex-col gap-space-lg bg-surface-container-lowest p-space-lg shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-space-sm pb-space-sm">
        <div>
          <span className="font-kicker mb-1 block text-kicker font-bold tracking-widest text-secondary uppercase">
            DETAYLI ANALİZ &amp; PERFORMANS
          </span>
          <h2 className="font-headline text-headline-md font-bold tracking-tight text-primary">
            {sectionTitle}
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-space-xs">
          <span className="bg-primary-container px-space-sm py-space-xs font-kicker text-kicker font-bold text-on-primary">
            {seasonLabel}
          </span>
          <span className="bg-surface-container px-space-sm py-space-xs font-kicker text-kicker font-semibold text-on-surface-variant">
            {teamLabel}
          </span>
        </div>
      </div>

      {!stats ? (
        <p className="font-body text-body-md text-on-surface-variant">
          {isLegend
            ? 'Bu efsane için henüz kariyer istatistik kaydı yok.'
            : 'Bu sezon için henüz istatistik kaydı yok.'}
        </p>
      ) : (
        <div
          className={
            isGk
              ? 'grid grid-cols-1 gap-space-sm sm:grid-cols-3'
              : 'grid grid-cols-2 gap-space-sm sm:grid-cols-4'
          }
        >
          <StatBox label="Maç" value={String(appearances)} />

          {isGk || isDef ? (
            <StatBox
              label="Gol Yenmeyen Maç"
              value={cleanSheets != null ? String(cleanSheets) : '—'}
              emphasize
            />
          ) : (
            <StatBox label="Atılan Gol" value={String(goals)} emphasize />
          )}

          {isGk ? (
            <StatBox
              label="Yenilen Gol"
              value={goalsConceded != null ? String(goalsConceded) : '—'}
            />
          ) : isDef ? (
            <StatBox
              label="Sarı Kart"
              value={yellowCards != null ? String(yellowCards) : '—'}
            />
          ) : (
            <StatBox label="Asist" value={String(assists)} />
          )}

          {isGk ? null : isDef ? (
            <StatBox
              label="Kırmızı Kart"
              value={redCards != null ? String(redCards) : '—'}
            />
          ) : (
            <StatBox
              label="Skor Katkısı"
              value={String(contribution)}
              hint={`${goals}G + ${assists}A`}
            />
          )}
        </div>
      )}
    </section>
  )
}
