import type { PlayerResponseDto } from '../playerTypes'
import { positionGroupFromAbbreviation } from '../utils/mapPlayerToCardData'

type PlayerSeasonStatsSectionProps = {
  player: PlayerResponseDto
}

export function PlayerSeasonStatsSection({ player }: PlayerSeasonStatsSectionProps) {
  const stats = player.currentSeasonStats
  const group = positionGroupFromAbbreviation(player.positionAbbreviation)
  const seasonLabel = stats?.seasonName?.trim() || 'Güncel Sezon'
  const teamLabel = stats?.team?.trim() || player.currentTeam
  const appearances = stats?.appearances ?? 0
  const minutes = stats?.minutesPlayed ?? 0
  const goals = stats?.goals ?? 0
  const assists = stats?.assists ?? 0
  const cleanSheets = stats?.cleanSheets ?? 0
  const yellowCards = stats?.yellowCards ?? 0
  const redCards = stats?.redCards ?? 0
  const goalsConceded = stats?.goalsConceded ?? 0
  const contribution = goals + assists
  const minutesPerGoal = goals > 0 ? Math.round(minutes / goals) : null

  return (
    <section className="flex flex-col gap-space-lg bg-surface-container-lowest p-space-lg shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-space-sm pb-space-sm">
        <div>
          <span className="font-kicker mb-1 block text-kicker font-bold tracking-widest text-secondary uppercase">
            DETAYLI ANALİZ &amp; PERFORMANS
          </span>
          <h2 className="font-headline text-headline-md font-bold tracking-tight text-primary">
            SEZON İSTATİSTİKLERİ
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
          Bu sezon için henüz istatistik kaydı yok.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-space-sm sm:grid-cols-4">
            <div className="flex flex-col justify-between bg-surface-container p-space-md">
              <span className="font-kicker text-kicker font-bold text-on-surface-variant uppercase">
                Maç
              </span>
              <div className="my-space-xs">
                <span className="font-stat text-stat-counter font-extrabold text-primary">
                  {appearances}
                </span>
              </div>
              <span className="font-body text-[12px] text-on-surface-variant">
                {minutes.toLocaleString('tr-TR')} Dakika
              </span>
            </div>

            {group === 'gk' || group === 'def' ? (
              <div className="flex flex-col justify-between bg-primary-container p-space-md text-on-primary">
                <span className="font-kicker text-kicker font-bold text-secondary-fixed-dim uppercase">
                  Golsüz Maç
                </span>
                <div className="my-space-xs">
                  <span className="font-stat text-stat-counter font-extrabold text-on-primary">
                    {cleanSheets}
                  </span>
                </div>
                <span className="font-body text-[12px] font-semibold text-tertiary-fixed-dim">
                  {group === 'gk'
                    ? `${goalsConceded} Gol Yedi`
                    : `${appearances > 0 ? Math.round((cleanSheets / appearances) * 100) : 0}% Oran`}
                </span>
              </div>
            ) : (
              <div className="flex flex-col justify-between bg-primary-container p-space-md text-on-primary">
                <span className="font-kicker text-kicker font-bold text-secondary-fixed-dim uppercase">
                  Atılan Gol
                </span>
                <div className="my-space-xs">
                  <span className="font-stat text-stat-counter font-extrabold text-on-primary">
                    {goals}
                  </span>
                </div>
                <span className="font-body text-[12px] font-semibold text-tertiary-fixed-dim">
                  {minutesPerGoal != null ? `${minutesPerGoal} dk / gol` : 'Gol yok'}
                </span>
              </div>
            )}

            {group === 'gk' ? (
              <div className="flex flex-col justify-between bg-surface-container p-space-md">
                <span className="font-kicker text-kicker font-bold text-on-surface-variant uppercase">
                  Yenilen Gol
                </span>
                <div className="my-space-xs">
                  <span className="font-stat text-stat-counter font-extrabold text-secondary">
                    {goalsConceded}
                  </span>
                </div>
                <span className="font-body text-[12px] text-on-surface-variant">
                  {appearances > 0
                    ? `Maç başı ${(goalsConceded / appearances).toFixed(2)}`
                    : '—'}
                </span>
              </div>
            ) : (
              <div className="flex flex-col justify-between bg-surface-container p-space-md">
                <span className="font-kicker text-kicker font-bold text-on-surface-variant uppercase">
                  Asist
                </span>
                <div className="my-space-xs">
                  <span className="font-stat text-stat-counter font-extrabold text-secondary">
                    {assists}
                  </span>
                </div>
                <span className="font-body text-[12px] text-on-surface-variant">
                  Doğrudan {contribution} skor katkısı
                </span>
              </div>
            )}

            <div className="flex flex-col justify-between bg-surface-container p-space-md">
              <span className="font-kicker text-kicker font-bold text-on-surface-variant uppercase">
                Dakika
              </span>
              <div className="my-space-xs">
                <span className="font-stat text-stat-counter font-extrabold text-primary">
                  {minutes.toLocaleString('tr-TR')}
                </span>
              </div>
              <span className="font-body text-[12px] text-on-surface-variant">
                {appearances > 0 ? `Maç başı ${Math.round(minutes / appearances)} dk` : '—'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-space-sm bg-surface-container-low p-space-md md:grid-cols-3">
            <div>
              <span className="font-kicker mb-1 block text-kicker font-bold text-on-surface-variant uppercase">
                Kart Durumu
              </span>
              <div className="flex items-center gap-space-xs">
                <span className="bg-tertiary-fixed px-2 py-0.5 text-[12px] font-bold text-tertiary">
                  {yellowCards} Sarı
                </span>
                <span className="bg-error-container px-2 py-0.5 text-[12px] font-bold text-on-error-container">
                  {redCards} Kırmızı
                </span>
              </div>
            </div>
            {group === 'gk' || group === 'def' ? (
              <div>
                <span className="font-kicker mb-1 block text-kicker font-bold text-on-surface-variant uppercase">
                  Golsüz Maç
                </span>
                <span className="font-headline text-headline-sm font-bold text-primary">
                  {cleanSheets}
                </span>
              </div>
            ) : (
              <div>
                <span className="font-kicker mb-1 block text-kicker font-bold text-on-surface-variant uppercase">
                  Skor Katkısı
                </span>
                <span className="font-headline text-headline-sm font-bold text-primary">
                  {contribution}{' '}
                  <span className="font-body text-body-sm font-normal text-on-surface-variant">
                    ({goals}G + {assists}A)
                  </span>
                </span>
              </div>
            )}
            {group !== 'gk' && group !== 'def' && minutesPerGoal != null ? (
              <div>
                <span className="font-kicker mb-1 block text-kicker font-bold text-on-surface-variant uppercase">
                  Dakika / Gol
                </span>
                <span className="font-headline text-headline-sm font-bold text-primary">
                  {minutesPerGoal} dk
                </span>
              </div>
            ) : group === 'gk' ? (
              <div>
                <span className="font-kicker mb-1 block text-kicker font-bold text-on-surface-variant uppercase">
                  Yenilen Gol
                </span>
                <span className="font-headline text-headline-sm font-bold text-primary">
                  {goalsConceded}
                </span>
              </div>
            ) : (
              <div>
                <span className="font-kicker mb-1 block text-kicker font-bold text-on-surface-variant uppercase">
                  Gol / Asist
                </span>
                <span className="font-headline text-headline-sm font-bold text-primary">
                  {goals} / {assists}
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  )
}
