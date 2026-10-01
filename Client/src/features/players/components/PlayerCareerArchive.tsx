import { useEffect, useState } from 'react'
import playerStatsService from '../../stats/playerStatsService'
import type { PlayerStatsResponseDto } from '../../stats/playerStatsTypes'
import { positionGroupFromAbbreviation } from '../utils/mapPlayerToCardData'
import type { PositionGroup } from '../utils/playerDirectoryTypes'

type PlayerCareerArchiveProps = {
  playerId: number
  positionAbbreviation: string
}

function formatCareerRecord(stats: PlayerStatsResponseDto, group: PositionGroup): string {
  if (group === 'gk') {
    return `${stats.cleanSheets} Golsüz / ${stats.goalsConceded} Yenilen / ${stats.appearances} Maç`
  }

  if (group === 'def') {
    return `${stats.cleanSheets} Golsüz / ${stats.goals} Gol / ${stats.appearances} Maç`
  }

  return `${stats.goals} Gol / ${stats.assists} Asist / ${stats.appearances} Maç`
}

export function PlayerCareerArchive({
  playerId,
  positionAbbreviation,
}: PlayerCareerArchiveProps) {
  const [entries, setEntries] = useState<PlayerStatsResponseDto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const group = positionGroupFromAbbreviation(positionAbbreviation)

  useEffect(() => {
    let cancelled = false

    async function loadCareer() {
      setIsLoading(true)

      const result = await playerStatsService.getByPlayer(playerId)

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setEntries(result.data.items)
      } else {
        setEntries([])
      }

      setIsLoading(false)
    }

    void loadCareer()

    return () => {
      cancelled = true
    }
  }, [playerId])

  return (
    <div className="flex flex-col gap-space-md bg-surface-container-lowest p-space-md shadow-sm">
      <span className="font-kicker text-kicker font-bold tracking-widest text-secondary uppercase">
        KARİYER ARŞİVİ
      </span>

      {isLoading ? (
        <p className="font-body text-body-sm text-on-surface-variant">Kariyer yükleniyor...</p>
      ) : entries.length === 0 ? (
        <p className="font-body text-body-sm text-on-surface-variant">
          Bu oyuncu için kariyer kaydı bulunmuyor.
        </p>
      ) : (
        <div className="relative flex flex-col gap-space-md border-l-2 border-l-border-subtle pl-space-md">
          {entries.map((entry) => (
            <div key={entry.id} className="relative">
              <span className="absolute top-1 -left-[1.4rem] h-3 w-3 rounded-full bg-primary" />
              <span className="font-headline block text-sm font-bold text-primary">{entry.team}</span>
              <span className="font-kicker text-kicker text-on-surface-variant uppercase">
                {entry.seasonName}
              </span>
              <span className="font-body block text-body-sm text-on-surface">
                {formatCareerRecord(entry, group)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
