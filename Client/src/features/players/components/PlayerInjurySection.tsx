import { injuries } from '../utils/playerDetailPlaceholders'

export function PlayerInjurySection() {
  return (
            <section className="flex flex-col gap-space-md bg-surface-container-lowest p-space-lg shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-xs">
                <div>
                  <span className="font-kicker mb-1 block text-kicker font-bold tracking-widest text-secondary uppercase">
                    KULÜP DOKTORU RAPORU
                  </span>
                  <h2 className="font-headline text-headline-md font-bold tracking-tight text-primary">
                    SAKATLIK GEÇMİŞİ
                  </h2>
                </div>
                <div className="font-label flex items-center gap-2 bg-secondary/10 px-space-md py-space-xs font-semibold text-secondary">
                  <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
                  Şu Anki Durum: Tamamen Sağlıklı &amp; Maça Hazır
                </div>
              </div>
              <div className="flex flex-col gap-space-sm pt-space-xs">
                {injuries.map((injury) => (
                  <div
                    key={injury.title}
                    className={`flex flex-col justify-between gap-space-sm bg-surface-container-low p-space-md sm:flex-row sm:items-center ${
                      injury.accent ? 'border-l-4 border-l-secondary' : 'border-l-4 border-l-outline'
                    }`}
                  >
                    <div className="flex items-start gap-space-sm">
                      <span
                        className={`material-symbols-outlined text-[24px] ${
                          injury.accent ? 'text-primary' : 'text-on-surface-variant'
                        }`}
                      >
                        {injury.icon}
                      </span>
                      <div>
                        <h4 className="font-headline text-headline-sm font-bold text-on-surface">
                          {injury.title}
                        </h4>
                        <p className="font-body text-body-sm text-on-surface-variant">{injury.detail}</p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-end justify-between sm:flex-col sm:items-end sm:justify-center">
                      <span
                        className={`font-label text-label-md font-bold ${
                          injury.accent ? 'text-primary' : 'text-on-surface'
                        }`}
                      >
                        {injury.duration}
                      </span>
                      <div
                        className={`flex items-center gap-1 text-[12px] font-semibold ${
                          injury.accent ? 'text-secondary' : 'text-on-surface-variant'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[14px]">check_circle</span>
                        {injury.recovered}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
  )
}
