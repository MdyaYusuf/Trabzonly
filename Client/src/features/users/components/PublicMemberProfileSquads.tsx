import { useEffect, useState } from 'react'
import { SquadGalleryCard } from '@/features/squads/components/SquadGalleryCard'
import squadService from '@/features/squads/squadService'
import { mapSquadPreviewToGalleryCard } from '@/features/squads/utils/mapSquadToGalleryCard'
import type { SquadGalleryCardData } from '@/features/squads/utils/squadsGalleryTypes'

type PublicMemberProfileSquadsProps = {
  userId: string
}

export function PublicMemberProfileSquads({ userId }: PublicMemberProfileSquadsProps) {
  const [squads, setSquads] = useState<SquadGalleryCardData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadSquads() {
      setIsLoading(true)

      const result = await squadService.getByUserId(userId)

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setSquads(result.data.map(mapSquadPreviewToGalleryCard))
      } else {
        setSquads([])
      }

      setIsLoading(false)
    }

    void loadSquads()

    return () => {
      cancelled = true
    }
  }, [userId])

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
    <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
      {squads.map((squad) => (
        <SquadGalleryCard key={squad.id} squad={squad} />
      ))}
    </div>
  )
}
