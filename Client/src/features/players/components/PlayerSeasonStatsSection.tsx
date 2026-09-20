import {
  comparisons,
  recentMatches,
  type PlayerProfile,
} from '../utils/playerDetailPlaceholders'

type PlayerSeasonStatsSectionProps = {
  profile: PlayerProfile
}

export function PlayerSeasonStatsSection({ profile }: PlayerSeasonStatsSectionProps) {
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
                <div className="flex items-center gap-space-xs">
                  <span className="bg-primary-container px-space-sm py-space-xs font-kicker text-kicker font-bold text-on-primary">
                    2024/25 SÜPER LİG
                  </span>
                  <span className="bg-surface-container px-space-sm py-space-xs font-kicker text-kicker font-semibold text-on-surface-variant">
                    TÜM KULVARLAR
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-space-sm sm:grid-cols-4">
                <div className="flex flex-col justify-between bg-surface-container p-space-md">
                  <span className="font-kicker text-kicker font-bold text-on-surface-variant uppercase">
                    Maç / 11 Başlama
                  </span>
                  <div className="my-space-xs">
                    <span className="font-stat text-stat-counter font-extrabold text-primary">18</span>
                    <span className="font-headline text-headline-sm font-semibold text-on-surface-variant">
                      {' '}
                      / 17
                    </span>
                  </div>
                  <span className="font-body text-[12px] text-on-surface-variant">
                    1.490 Dakika Görev Aldı
                  </span>
                </div>
                <div className="flex flex-col justify-between bg-primary-container p-space-md text-on-primary">
                  <span className="font-kicker text-kicker font-bold text-secondary-fixed-dim uppercase">
                    Atılan Gol
                  </span>
                  <div className="my-space-xs flex items-baseline gap-1">
                    <span className="font-stat text-stat-counter font-extrabold text-on-primary">12</span>
                    <span
                      className="material-symbols-outlined text-[20px] text-tertiary-fixed-dim"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      military_tech
                    </span>
                  </div>
                  <span className="font-body text-[12px] font-semibold text-tertiary-fixed-dim">
                    Takımın Gol Kralı (1. Sırada)
                  </span>
                </div>
                <div className="flex flex-col justify-between bg-surface-container p-space-md">
                  <span className="font-kicker text-kicker font-bold text-on-surface-variant uppercase">
                    Asist Sayısı
                  </span>
                  <div className="my-space-xs">
                    <span className="font-stat text-stat-counter font-extrabold text-secondary">3</span>
                  </div>
                  <span className="font-body text-[12px] text-on-surface-variant">
                    Doğrudan 15 Skora Katkı
                  </span>
                </div>
                <div className="flex flex-col justify-between bg-surface-container p-space-md">
                  <span className="font-kicker text-kicker font-bold text-on-surface-variant uppercase">
                    Dakika / Gol
                  </span>
                  <div className="my-space-xs">
                    <span className="font-stat text-stat-counter font-extrabold text-primary">124</span>
                    <span className="font-label text-label-md text-on-surface-variant"> dk</span>
                  </div>
                  <span className="font-body text-[12px] text-on-surface-variant">
                    Lig Genelinde İlk %5
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-space-sm bg-surface-container-low p-space-md md:grid-cols-3">
                <div>
                  <span className="font-kicker mb-1 block text-kicker font-bold text-on-surface-variant uppercase">
                    Şut / İsabet
                  </span>
                  <div className="flex items-baseline gap-space-xs">
                    <span className="font-headline text-headline-sm font-bold text-primary">42 / 24</span>
                    <span className="font-body text-body-sm font-bold text-secondary">(%57 İsabet)</span>
                  </div>
                </div>
                <div>
                  <span className="font-kicker mb-1 block text-kicker font-bold text-on-surface-variant uppercase">
                    Pas İsabeti
                  </span>
                  <div className="flex items-baseline gap-space-xs">
                    <span className="font-headline text-headline-sm font-bold text-primary">%78.4</span>
                    <span className="font-body text-body-sm text-on-surface-variant">284 Başarılı Pas</span>
                  </div>
                </div>
                <div>
                  <span className="font-kicker mb-1 block text-kicker font-bold text-on-surface-variant uppercase">
                    İkili Mücadele
                  </span>
                  <div className="flex items-baseline gap-space-xs">
                    <span className="font-headline text-headline-sm font-bold text-primary">%58.2</span>
                    <span className="font-body text-body-sm text-on-surface-variant">114 Kazanılan</span>
                  </div>
                </div>
                <div>
                  <span className="font-kicker mb-1 block text-kicker font-bold text-on-surface-variant uppercase">
                    Kart Durumu
                  </span>
                  <div className="flex items-center gap-space-xs">
                    <span className="bg-tertiary-fixed px-2 py-0.5 text-[12px] font-bold text-tertiary">
                      3 Sarı
                    </span>
                    <span className="bg-surface-container-highest px-2 py-0.5 text-[12px] font-bold text-on-surface-variant">
                      0 Kırmızı
                    </span>
                  </div>
                </div>
                <div>
                  <span className="font-kicker mb-1 block text-kicker font-bold text-on-surface-variant uppercase">
                    Penaltı Golleri
                  </span>
                  <span className="font-headline text-headline-sm font-bold text-primary">3 / 3</span>
                </div>
                <div>
                  <span className="font-kicker mb-1 block text-kicker font-bold text-on-surface-variant uppercase">
                    xG (Beklenen Gol)
                  </span>
                  <span className="font-headline text-headline-sm font-bold text-primary">10.84 (+1.16)</span>
                </div>
              </div>

              <div className="bg-surface p-space-md">
                <div className="mb-space-md flex flex-col gap-space-sm sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-headline text-headline-sm font-bold text-primary uppercase">
                    Süper Lig Santrfor Ortalaması ile Kıyaslama
                  </h3>
                  <div className="flex items-center gap-space-md text-[12px]">
                    <span className="flex items-center gap-1 font-semibold text-primary">
                      <span className="inline-block h-3 w-3 bg-primary" /> {profile.name}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-on-surface-variant">
                      <span className="inline-block h-3 w-3 bg-outline-variant" /> Lig Ortalaması
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-space-md">
                  {comparisons.map((row) => (
                    <div key={row.label}>
                      <div className="font-body mb-1 flex justify-between text-body-sm font-semibold">
                        <span className="text-on-surface">{row.label}</span>
                        <span className="font-bold text-primary">
                          {row.player}{' '}
                          <span className="font-normal text-on-surface-variant">{row.league}</span>
                        </span>
                      </div>
                      <div className="relative h-3 w-full overflow-hidden bg-surface-container">
                        <div
                          className="absolute top-0 bottom-0 left-0 bg-outline-variant"
                          style={{ width: row.leagueWidth }}
                        />
                        <div
                          className={`absolute top-0 bottom-0 left-0 opacity-90 ${row.bar}`}
                          style={{ width: row.playerWidth }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-space-sm pt-space-xs">
                <div className="flex items-center justify-between gap-space-sm">
                  <h3 className="font-headline text-headline-sm font-bold text-primary uppercase">
                    Son 5 Resmi Maç Performansı
                  </h3>
                  <span className="font-kicker text-kicker text-on-surface-variant uppercase">
                    Süper Lig &amp; Kupa
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="font-body w-full text-left text-body-sm">
                    <thead>
                      <tr className="bg-surface-container font-kicker text-[11px] tracking-wider text-on-surface-variant uppercase">
                        <th className="p-space-sm">Rakip</th>
                        <th className="p-space-sm">Tarih</th>
                        <th className="p-space-sm">Skor</th>
                        <th className="p-space-sm text-center">Süre</th>
                        <th className="p-space-sm text-center">Gol</th>
                        <th className="p-space-sm text-center">Asist</th>
                        <th className="p-space-sm text-right">Tribün Puanı</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentMatches.map((match, index) => (
                        <tr
                          key={match.opponent}
                          className={
                            index % 2 === 0
                              ? 'bg-surface-container-lowest transition-colors hover:bg-surface-container-low'
                              : 'bg-surface transition-colors hover:bg-surface-container-low'
                          }
                        >
                          <td className="p-space-sm font-bold text-primary">
                            <span className="inline-flex items-center gap-2">
                              <span
                                className={`h-2 w-2 rounded-full ${match.win ? 'bg-secondary' : 'bg-surface-tint'}`}
                              />
                              {match.opponent}
                            </span>
                          </td>
                          <td className="p-space-sm text-on-surface-variant">{match.date}</td>
                          <td className="p-space-sm font-bold text-on-surface">{match.score}</td>
                          <td className="p-space-sm text-center">{match.minutes}</td>
                          <td className="p-space-sm text-center font-bold text-primary">{match.goals}</td>
                          <td className="p-space-sm text-center">{match.assists}</td>
                          <td className="font-headline p-space-sm text-right text-headline-sm font-bold text-secondary">
                            {match.rating}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
  )
}
