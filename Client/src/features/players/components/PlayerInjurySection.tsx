import { useEffect, useState } from 'react'
import injuryService from '../../injuries/injuryService'
import type { InjuryResponseDto } from '../../injuries/injuryTypes'

type PlayerInjurySectionProps = {
  playerId: number
}

export function PlayerInjurySection({ playerId }: PlayerInjurySectionProps) {
  const [injuries, setInjuries] = useState<InjuryResponseDto[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadInjuries() {
      setIsLoading(true)

      const result = await injuryService.getAll(
        { pageNumber: 1, pageSize: 50 },
        playerId,
      )

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setInjuries(result.data.items)
      } else {
        setInjuries([])
      }

      setIsLoading(false)
    }

    void loadInjuries()

    return () => {
      cancelled = true
    }
  }, [playerId])

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
      </div>

      {isLoading ? (
        <p className="font-body text-body-md text-on-surface-variant">Sakatlık kayıtları yükleniyor...</p>
      ) : injuries.length === 0 ? (
        <p className="font-body text-body-md text-on-surface-variant">
          Bu oyuncu için kayıtlı sakatlık bulunmuyor.
        </p>
      ) : (
        <div className="flex flex-col gap-space-sm pt-space-xs">
          {injuries.map((injury, index) => (
            <div
              key={injury.id}
              className={`flex flex-col justify-between gap-space-sm bg-surface-container-low p-space-md sm:flex-row sm:items-center ${
                index === 0 ? 'border-l-4 border-l-secondary' : 'border-l-4 border-l-outline'
              }`}
            >
              <div className="flex items-start gap-space-sm">
                <span
                  className={`material-symbols-outlined text-[24px] ${
                    index === 0 ? 'text-primary' : 'text-on-surface-variant'
                  }`}
                >
                  healing
                </span>
                <div>
                  <h4 className="font-headline text-headline-sm font-bold text-on-surface">
                    {injury.name}
                  </h4>
                  {injury.seasonName ? (
                    <p className="font-body text-body-sm text-on-surface-variant">{injury.seasonName}</p>
                  ) : null}
                </div>
              </div>
              <div className="flex shrink-0 items-end justify-between gap-space-md sm:flex-col sm:items-end sm:justify-center">
                <span
                  className={`font-label text-label-md font-bold ${
                    index === 0 ? 'text-primary' : 'text-on-surface'
                  }`}
                >
                  {injury.daysInjured} Gün
                </span>
                <span className="font-body text-[12px] font-semibold text-on-surface-variant">
                  {injury.gamesMissed} Maç Kaçırdı
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
