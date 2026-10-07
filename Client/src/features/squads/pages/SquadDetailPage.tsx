import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { SquadCommentsSection } from '../components/SquadCommentsSection'
import { SquadDetailBreadcrumb } from '../components/SquadDetailBreadcrumb'
import { SquadDetailHeader } from '../components/SquadDetailHeader'
import { SquadDetailPitch } from '../components/SquadDetailPitch'
import { SquadDetailRatingBar } from '../components/SquadDetailRatingBar'
import { SquadDetailSidebar } from '../components/SquadDetailSidebar'
import squadService from '../squadService'
import { mapSquadToDetailView } from '../utils/mapSquadToDetailView'
import type { SquadDetailViewModel } from '../utils/squadDetailTypes'

export function SquadDetailPage() {
  const { squadId } = useParams<{ squadId: string }>()
  const [squad, setSquad] = useState<SquadDetailViewModel | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadSquad() {
      if (!squadId) {
        setNotFound(true)
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setNotFound(false)

      const result = await squadService.getById(squadId)

      if (cancelled) {
        return
      }

      if (!result.success || !result.data) {
        setSquad(null)
        setNotFound(true)
        setIsLoading(false)
        return
      }

      setSquad(mapSquadToDetailView(result.data))
      setIsLoading(false)
    }

    void loadSquad()

    return () => {
      cancelled = true
    }
  }, [squadId])

  if (isLoading) {
    return (
      <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
        <p className="font-body mx-auto max-w-[1360px] px-4 py-space-xl text-center text-body-md text-on-surface-variant sm:px-6 lg:px-12">
          Kadro yükleniyor...
        </p>
      </main>
    )
  }

  if (notFound || !squad) {
    return (
      <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
        <div className="mx-auto flex max-w-[1360px] flex-col items-center gap-space-md px-4 py-space-xl sm:px-6 lg:px-12">
          <p className="font-body text-center text-body-md text-on-surface-variant">
            Kadro bulunamadı.
          </p>
          <Link
            to="/kadrolar"
            className="font-label bg-primary-container px-space-lg py-space-xs text-label-md tracking-wider text-on-primary uppercase"
          >
            Galeriye Dön
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
      <SquadDetailBreadcrumb title={squad.title} />
      <SquadDetailHeader
        squad={squad}
        onFollowChange={(isFollowed) => {
          setSquad((current) =>
            current
              ? { ...current, isAuthorFollowedByCurrentUser: isFollowed }
              : current,
          )
        }}
      />
      <SquadDetailRatingBar
        squadId={squad.id}
        authorUserId={squad.userId}
        currentUserScore={squad.currentUserScore}
        onRated={(averageRating, ratingCount, score) => {
          setSquad((current) =>
            current
              ? {
                  ...current,
                  rating: averageRating,
                  ratingCount,
                  currentUserScore: score,
                }
              : current,
          )
        }}
      />

      <section className="w-full bg-background py-space-xl">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 items-start gap-gutter lg:grid-cols-12">
            <SquadDetailPitch
              players={squad.pitchPlayers}
              benchPlayers={squad.benchPlayers}
              tacticalArrows={squad.tacticalArrows}
            />
            <SquadDetailSidebar squad={squad} />
          </div>
        </div>
      </section>

      <section id="yorumlar" className="w-full bg-surface-container-low py-space-xl">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-12">
          <SquadCommentsSection
            squadId={squad.id}
            squadTitle={squad.title}
            commentCount={squad.commentCount}
            onCommentCountChange={(count) => {
              setSquad((current) =>
                current ? { ...current, commentCount: count } : current,
              )
            }}
          />
        </div>
      </section>
    </main>
  )
}
