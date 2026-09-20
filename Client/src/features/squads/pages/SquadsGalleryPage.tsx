import { useMemo, useState } from 'react'
import { SquadGalleryCard } from '../components/SquadGalleryCard'
import { SquadsGalleryBreadcrumb } from '../components/SquadsGalleryBreadcrumb'
import { SquadsGalleryCta } from '../components/SquadsGalleryCta'
import { SquadsGalleryFilters } from '../components/SquadsGalleryFilters'
import { SquadsGalleryHero } from '../components/SquadsGalleryHero'
import { SquadsGalleryPagination } from '../components/SquadsGalleryPagination'
import {
  PAGE_SIZE,
  placeholderSquads,
} from '../utils/squadsGalleryPlaceholders'
import type {
  FormationFilter,
  GallerySortTab,
  GalleryViewMode,
  MatchFilter,
} from '../utils/squadsGalleryTypes'

export function SquadsGalleryPage() {
  const [sortTab, setSortTab] = useState<GallerySortTab>('newest')
  const [formationFilter, setFormationFilter] = useState<FormationFilter>('all')
  const [matchFilter, setMatchFilter] = useState<MatchFilter>('all')
  const [viewMode, setViewMode] = useState<GalleryViewMode>('grid')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const filteredSquads = useMemo(() => {
    let result = [...placeholderSquads]

    if (sortTab === 'week11') {
      result = result.filter((squad) => squad.isWeekEleven)
    } else if (sortTab === 'derby') {
      result = result.filter((squad) => squad.isDerby)
    }

    if (formationFilter !== 'all') {
      result = result.filter((squad) => squad.formation === formationFilter)
    }

    const query = search.trim().toLowerCase()

    if (query) {
      result = result.filter(
        (squad) =>
          squad.title.toLowerCase().includes(query) ||
          squad.excerpt.toLowerCase().includes(query) ||
          squad.authorUsername.toLowerCase().includes(query) ||
          squad.formationLabel.toLowerCase().includes(query),
      )
    }

    result.sort((a, b) => {
      if (sortTab === 'topRated' || sortTab === 'week11') {
        return b.rating - a.rating
      }

      return Number(a.id) - Number(b.id)
    })

    return result
  }, [formationFilter, search, sortTab])

  const totalPages = Math.max(1, Math.ceil(filteredSquads.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageStart = (currentPage - 1) * PAGE_SIZE
  const pageSquads = filteredSquads.slice(pageStart, pageStart + PAGE_SIZE)

  function resetPage() {
    setPage(1)
  }

  return (
    <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
      <SquadsGalleryBreadcrumb />
      <SquadsGalleryHero />

      <SquadsGalleryFilters
        sortTab={sortTab}
        formationFilter={formationFilter}
        matchFilter={matchFilter}
        viewMode={viewMode}
        search={search}
        visibleCount={filteredSquads.length}
        onSortTabChange={(tab) => {
          setSortTab(tab)
          resetPage()
        }}
        onFormationFilterChange={(value) => {
          setFormationFilter(value)
          resetPage()
        }}
        onMatchFilterChange={(value) => {
          setMatchFilter(value)
          resetPage()
        }}
        onViewModeChange={setViewMode}
        onSearchChange={(value) => {
          setSearch(value)
          resetPage()
        }}
      />

      <section className="mx-auto w-full max-w-[1360px] px-4 pb-space-xl sm:px-6 lg:px-12">
        {pageSquads.length === 0 ? (
          <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
            Bu filtrelere uygun kadro bulunamadı.
          </p>
        ) : (
          <div
            className={
              viewMode === 'list'
                ? 'flex flex-col gap-gutter'
                : 'grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3'
            }
          >
            {pageSquads.map((squad) => (
              <SquadGalleryCard key={squad.id} squad={squad} listMode={viewMode === 'list'} />
            ))}
          </div>
        )}

        <SquadsGalleryPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={filteredSquads.length}
          onPageChange={setPage}
        />
      </section>

      <SquadsGalleryCta />
    </main>
  )
}
