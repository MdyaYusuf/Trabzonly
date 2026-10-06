import { useEffect, useState } from 'react'
import { SquadGalleryCard } from '../components/SquadGalleryCard'
import { SquadsGalleryBreadcrumb } from '../components/SquadsGalleryBreadcrumb'
import { SquadsGalleryCta } from '../components/SquadsGalleryCta'
import { SquadsGalleryFilters } from '../components/SquadsGalleryFilters'
import { SquadsGalleryHero } from '../components/SquadsGalleryHero'
import { SquadsGalleryPagination } from '../components/SquadsGalleryPagination'
import squadService from '../squadService'
import { mapSquadPreviewToGalleryCard } from '../utils/mapSquadToGalleryCard'
import {
  PAGE_SIZE,
  type GallerySortTab,
  type GalleryViewMode,
  type SquadGalleryCardData,
} from '../utils/squadsGalleryTypes'

export function SquadsGalleryPage() {
  const [sortTab, setSortTab] = useState<GallerySortTab>('newest')
  const [viewMode, setViewMode] = useState<GalleryViewMode>('grid')
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

      const result = await squadService.getAll({
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
      <SquadsGalleryBreadcrumb />
      <SquadsGalleryHero />

      <section className="mx-auto w-full max-w-[1360px] px-4 pb-space-xl sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12">
          <div className="flex flex-col lg:col-span-9">
            {isLoading ? (
              <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
                Kadrolar yükleniyor...
              </p>
            ) : squads.length === 0 ? (
              <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
                Bu filtrelere uygun kadro bulunamadı.
              </p>
            ) : (
              <div
                className={
                  viewMode === 'list'
                    ? 'flex flex-col gap-gutter'
                    : 'grid grid-cols-1 gap-gutter md:grid-cols-2'
                }
              >
                {squads.map((squad) => (
                  <SquadGalleryCard key={squad.id} squad={squad} listMode={viewMode === 'list'} />
                ))}
              </div>
            )}

            <SquadsGalleryPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalCount={totalCount}
              onPageChange={setPage}
            />
          </div>

          <div className="lg:col-span-3">
            <SquadsGalleryFilters
              sortTab={sortTab}
              viewMode={viewMode}
              search={search}
              visibleCount={squads.length}
              totalCount={totalCount}
              onSortTabChange={(tab) => {
                setSortTab(tab)
                resetPage()
              }}
              onViewModeChange={setViewMode}
              onSearchChange={(value) => {
                setSearch(value)
                resetPage()
              }}
            />
          </div>
        </div>
      </section>

      <SquadsGalleryCta />
    </main>
  )
}
