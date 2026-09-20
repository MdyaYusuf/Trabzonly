import { useParams } from 'react-router-dom'
import { SquadDetailBreadcrumb } from '../components/SquadDetailBreadcrumb'
import { SquadDetailComments } from '../components/SquadDetailComments'
import { SquadDetailHeader } from '../components/SquadDetailHeader'
import { SquadDetailPitch } from '../components/SquadDetailPitch'
import { SquadDetailRatingBar } from '../components/SquadDetailRatingBar'
import { SquadDetailSidebar } from '../components/SquadDetailSidebar'
import {
  defaultSquadDetail,
  squadDetailById,
} from '../utils/squadDetailPlaceholders'

export function SquadDetailPage() {
  const { squadId } = useParams<{ squadId: string }>()
  const squad = squadDetailById[squadId ?? ''] ?? defaultSquadDetail

  return (
    <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
      <SquadDetailBreadcrumb squad={squad} />
      <SquadDetailHeader squad={squad} />
      <SquadDetailRatingBar />

      <section className="w-full bg-background py-space-xl">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 items-start gap-gutter lg:grid-cols-12">
            <SquadDetailPitch
              players={squad.pitchPlayers}
              benchPlayers={squad.benchPlayers}
              benchPlanLabel={squad.benchPlanLabel}
            />
            <SquadDetailSidebar squad={squad} />
          </div>
        </div>
      </section>

      <SquadDetailComments squad={squad} />
    </main>
  )
}
