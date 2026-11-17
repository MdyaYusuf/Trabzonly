import { useEffect, useState } from 'react'
import { SquadGalleryCard } from '@/features/squads/components/SquadGalleryCard'
import { SquadsGalleryPagination } from '@/features/squads/components/SquadsGalleryPagination'
import squadService from '@/features/squads/squadService'
import { mapSquadPreviewToGalleryCard } from '@/features/squads/utils/mapSquadToGalleryCard'
import {
  PAGE_SIZE,
  type SquadGalleryCardData,
} from '@/features/squads/utils/squadsGalleryTypes'

type PublicMemberProfileSquadsProps = {
  userId: string
}

export function PublicMemberProfileSquads({ userId }: PublicMemberProfileSquadsProps) {
  const [page, setPage] = useState(1)
  const [squads, setSquads] = useState<SquadGalleryCardData[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setPage(1)
  }, [userId])

  useEffect(() => {
    let cancelled = false

    async function loadSquads() {
      setIsLoading(true)

      const result = await squadService.getByUserId(userId, {
        pageNumber: page,
        pageSize: PAGE_SIZE,
        sort: 'newest',
      })

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setSquads(result.data.items.map(mapSquadPreviewToGalleryCard))
        setTotalCount(result.data.totalCount)
        setTotalPages(Math.max(1, Math.ceil(result.data.totalCount / PAGE_SIZE)))
      } else {
        setSquads([])
        setTotalCount(0)
        setTotalPages(1)
      }

      setIsLoading(false)
    }

    void loadSquads()

    return () => {
      cancelled = true
    }
  }, [userId, page])

  const currentPage = Math.min(page, totalPages)

  if (isLoading) {
    return (
      <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
        Kadrolar yükleniyor...
      </p>
    )
  }

  if (squads.length === 0) {
    return (
      <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
        Bu üyenin henüz yayınlanmış kadrosu yok.
      </p>
    )
  }

  return (
    <section className="flex flex-col gap-space-md">
      <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
        {squads.map((squad) => (
          <SquadGalleryCard key={squad.id} squad={squad} />
        ))}
      </div>

      {totalCount > 0 ? (
        <SquadsGalleryPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          onPageChange={setPage}
        />
      ) : null}
    </section>
  )
}
