import { PlayerCategory, type PlayerResponseDto } from '../playerTypes'
import { LEGEND_TEAM_LABEL, positionGroupFromZone } from '../utils/mapPlayerToCardData'

type PlayerSeasonStatsSectionProps = {
  player: PlayerResponseDto
}

type StatBoxTone = 'default' | 'emphasize' | 'yellow' | 'red'

function StatBox({
  label,
  value,
  hint,
  tone = 'default',
}: {
  label: string
  value: string
  hint?: string
  tone?: StatBoxTone
}) {
  if (tone === 'emphasize') {
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

  if (tone === 'yellow') {
    return (
      <div className="flex flex-col justify-between bg-tertiary-fixed p-space-md">
        <span className="font-kicker text-kicker font-bold text-on-tertiary-fixed-variant uppercase">
          {label}
        </span>
        <div className="my-space-xs">
          <span className="font-stat text-stat-counter font-extrabold text-on-tertiary-fixed">
            {value}
          </span>
        </div>
        {hint ? (
          <span className="font-body text-[12px] text-on-tertiary-fixed-variant">{hint}</span>
        ) : (
          <span className="font-body text-[12px] text-transparent">—</span>
        )}
      </div>
    )
  }

  if (tone === 'red') {
    return (
      <div className="flex flex-col justify-between bg-error-container p-space-md">
        <span className="font-kicker text-kicker font-bold text-on-error-container/80 uppercase">
          {label}
        </span>
        <div className="my-space-xs">
          <span className="font-stat text-stat-counter font-extrabold text-on-error-container">
            {value}
          </span>
        </div>
        {hint ? (
          <span className="font-body text-[12px] text-on-error-container/80">{hint}</span>
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
  const sectionTitle = isLegend
    ? 'TRABZONSPOR KARİYERİ İSTATİSTİKLERİ'
    : 'SEZON İSTATİSTİKLERİ'
  const appearances = stats?.appearances ?? 0
  const goals = stats?.goals ?? 0
  const assists = stats?.assists
  const cleanSheets = stats?.cleanSheets
  const yellowCards = stats?.yellowCards
  const redCards = stats?.redCards
  const goalsConceded = stats?.goalsConceded
  const contribution = goals + (assists ?? 0)
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
              label="Gol Yenilmeyen Maç"
              value={cleanSheets != null ? String(cleanSheets) : '—'}
              tone="emphasize"
            />
          ) : (
            <StatBox label="Atılan Gol" value={String(goals)} tone="red" />
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
              tone="yellow"
            />
          ) : (
            <StatBox
              label="Asist"
              value={assists != null ? String(assists) : '—'}
              tone="yellow"
            />
          )}

          {isGk ? null : isDef ? (
            <StatBox
              label="Kırmızı Kart"
              value={redCards != null ? String(redCards) : '—'}
              tone="red"
            />
          ) : (
            <StatBox label="Skor Katkısı" value={String(contribution)} tone="emphasize" />
          )}
        </div>
      )}
    </section>
  )
}
