import { useEffect, useState } from 'react'
import { MySquadsBreadcrumb } from '../components/MySquadsBreadcrumb'
import { MySquadsHero } from '../components/MySquadsHero'
import { SquadGalleryCard } from '../components/SquadGalleryCard'
import { SquadsGalleryFilters } from '../components/SquadsGalleryFilters'
import { SquadsGalleryPagination } from '../components/SquadsGalleryPagination'
import squadService from '../squadService'
import { mapSquadPreviewToGalleryCard } from '../utils/mapSquadToGalleryCard'
import {
  PAGE_SIZE,
  type GallerySortTab,
  type SquadGalleryCardData,
} from '../utils/squadsGalleryTypes'

export function MySquadsPage() {
  const [sortTab, setSortTab] = useState<GallerySortTab>('newest')
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [page, setPage] = useState(1)
  const [squads, setSquads] = useState<SquadGalleryCardData[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search)
    }, 300)

    return () => {
      window.clearTimeout(timer)
    }
  }, [search])

  useEffect(() => {
    let cancelled = false

    async function loadSquads() {
      setIsLoading(true)

      const result = await squadService.getMine({
        pageNumber: page,
        pageSize: PAGE_SIZE,
        sort: sortTab,
        search: debouncedSearch,
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
  }, [debouncedSearch, page, sortTab])

  function resetPage() {
    setPage(1)
  }

  const currentPage = Math.min(page, totalPages)

  return (
    <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
      <MySquadsBreadcrumb />
      <MySquadsHero />

      <SquadsGalleryFilters
        sortTab={sortTab}
        search={search}
        searchPlaceholder="Kadro adı ara…"
        onSortTabChange={(tab) => {
          setSortTab(tab)
          resetPage()
        }}
        onSearchChange={(value) => {
          setSearch(value)
          resetPage()
        }}
      />

      <div className="w-full bg-background py-space-xl">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-12">
          {isLoading ? (
            <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
              Kadrolarınız yükleniyor...
            </p>
          ) : squads.length === 0 ? (
            <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
              Bu filtrelere uygun kadro bulunamadı.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
              {squads.map((squad) => (
                <SquadGalleryCard key={squad.id} squad={squad} />
              ))}
            </div>
          )}

          <div className="mt-space-lg">
            <SquadsGalleryPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalCount={totalCount}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
