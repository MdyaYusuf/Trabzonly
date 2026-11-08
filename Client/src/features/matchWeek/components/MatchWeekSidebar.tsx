import { useState } from 'react'
import type {
  FixtureResponseDto,
  LeagueStandingResponseDto,
  MatchWeekLeaderboardEntryDto,
} from '../matchWeekTypes'
import { MatchWeekFixturesPanel } from './MatchWeekFixturesPanel'
import { MatchWeekLeaderboard } from './MatchWeekLeaderboard'
import { MatchWeekStandingsTable } from './MatchWeekStandingsTable'

type SidebarTab = 'standings' | 'fixtures'

type MatchWeekSidebarProps = {
  leaderboard: MatchWeekLeaderboardEntryDto[]
  isLeaderboardLoading?: boolean
  standings: LeagueStandingResponseDto[]
  isStandingsLoading?: boolean
  weekNumber: number
  fixtures: FixtureResponseDto[]
  isFixturesLoading?: boolean
  onWeekChange: (weekNumber: number) => void
}

export function MatchWeekSidebar({
  leaderboard,
  isLeaderboardLoading,
  standings,
  isStandingsLoading,
  weekNumber,
  fixtures,
  isFixturesLoading,
  onWeekChange,
}: MatchWeekSidebarProps) {
  const [tab, setTab] = useState<SidebarTab>('standings')

  return (
    <aside className="flex flex-col gap-space-md lg:col-span-4">
      <MatchWeekLeaderboard entries={leaderboard} isLoading={isLeaderboardLoading} />

      <section className="border border-outline-variant/30 bg-surface-container-lowest p-space-md shadow-sm">
        <div
          className="mb-space-md grid grid-cols-2 border border-outline-variant/40"
          role="tablist"
          aria-label="Lig paneli"
        >
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'standings'}
            className={`font-label cursor-pointer px-space-sm py-space-xs text-label-md tracking-wider uppercase ${
              tab === 'standings'
                ? 'bg-primary text-on-primary'
                : 'bg-surface text-on-surface-variant hover:bg-surface-container'
            }`}
            onClick={() => {
              setTab('standings')
            }}
          >
            Puan durumu
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'fixtures'}
            className={`font-label cursor-pointer px-space-sm py-space-xs text-label-md tracking-wider uppercase ${
              tab === 'fixtures'
                ? 'bg-primary text-on-primary'
                : 'bg-surface text-on-surface-variant hover:bg-surface-container'
            }`}
            onClick={() => {
              setTab('fixtures')
            }}
          >
            Fikstür
          </button>
        </div>

        {tab === 'standings' ? (
          <MatchWeekStandingsTable standings={standings} isLoading={isStandingsLoading} />
        ) : (
          <MatchWeekFixturesPanel
            weekNumber={weekNumber}
            fixtures={fixtures}
            isLoading={isFixturesLoading}
            onWeekChange={onWeekChange}
          />
        )}
      </section>
    </aside>
  )
}
