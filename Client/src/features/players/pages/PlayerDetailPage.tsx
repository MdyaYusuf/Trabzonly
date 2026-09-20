import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { PlayerCommentsSection } from '../components/PlayerCommentsSection'
import { PlayerDetailHero } from '../components/PlayerDetailHero'
import { PlayerDetailSidebar } from '../components/PlayerDetailSidebar'
import { PlayerInjurySection } from '../components/PlayerInjurySection'
import { PlayerSeasonStatsSection } from '../components/PlayerSeasonStatsSection'
import {
  defaultProfile,
  playerProfiles,
} from '../utils/playerDetailPlaceholders'

export function PlayerDetailPage() {
  const { playerId } = useParams<{ playerId: string }>()
  const profile = playerProfiles[playerId ?? ''] ?? defaultProfile
  const [favorited, setFavorited] = useState(false)

  return (
    <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
      <PlayerDetailHero
        profile={profile}
        favorited={favorited}
        setFavorited={setFavorited}
      />

      <div className="mx-auto w-full max-w-[1360px] px-4 py-space-xl sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12">
          <div className="flex flex-col gap-space-xl lg:col-span-8">
            <PlayerSeasonStatsSection profile={profile} />
            <PlayerInjurySection />
            <PlayerCommentsSection profile={profile} />
          </div>

          <PlayerDetailSidebar profile={profile} />
        </div>
      </div>
    </main>
  )
}
