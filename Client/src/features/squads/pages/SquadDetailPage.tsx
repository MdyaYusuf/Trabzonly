import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '@/core/store/hooks'
import { authService } from '@/features/auth/authService'
import { ContentNotFoundPage } from '@/features/status/pages/ContentNotFoundPage'
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
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const userId = useAppSelector((state) => state.auth.user?.id)
  const [squad, setSquad] = useState<SquadDetailViewModel | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadSquad() {
      if (!squadId) {
        setSquad(null)
        setNotFound(true)
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setNotFound(false)

      try {
        await authService.ensureViewerSession()

        if (cancelled) {
          return
        }

        const result = await squadService.getById(squadId)

        if (cancelled) {
          return
        }

        if (!result.success || !result.data) {
          setSquad(null)
          setNotFound(true)
          return
        }

        setSquad(mapSquadToDetailView(result.data))
        setNotFound(false)
      } catch {
        if (cancelled) {
          return
        }

        setSquad(null)
        setNotFound(true)
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void loadSquad()

    return () => {
      cancelled = true
    }
  }, [squadId, isAuthenticated, userId])

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
      <ContentNotFoundPage
        secondaryTo="/kadrolar"
        secondaryLabel="Kadrolara Göz At"
        secondaryIcon="person_play"
      />
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
        averageRating={squad.rating}
        ratingCount={squad.ratingCount}
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
              formation={squad.formation}
              players={squad.pitchPlayers}
              benchPlayers={squad.benchPlayers}
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
