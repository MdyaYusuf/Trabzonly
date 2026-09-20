import { useMemo, useState } from 'react'
import { MySquadCard } from '../components/MySquadCard'
import { MySquadsCta } from '../components/MySquadsCta'
import { MySquadsDeleteModal } from '../components/MySquadsDeleteModal'
import { MySquadsFilters } from '../components/MySquadsFilters'
import { MySquadsHero } from '../components/MySquadsHero'
import { placeholderMySquads } from '../utils/mySquadsPlaceholders'
import type {
  MySquadCardData,
  MySquadFilter,
  MySquadSort,
} from '../utils/mySquadsTypes'

export function MySquadsPage() {
  const [squads, setSquads] = useState(placeholderMySquads)
  const [filter, setFilter] = useState<MySquadFilter>('all')
  const [sort, setSort] = useState<MySquadSort>('newest')
  const [search, setSearch] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<MySquadCardData | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const filteredSquads = useMemo(() => {
    let result = [...squads]

    if (filter === 'published') {
      result = result.filter((squad) => squad.status === 'published')
    } else if (filter === 'draft') {
      result = result.filter((squad) => squad.status === 'draft')
    } else if (filter === 'popular') {
      result = result.filter((squad) => squad.isPopular)
    }

    const query = search.trim().toLowerCase()

    if (query) {
      result = result.filter(
        (squad) =>
          squad.title.toLowerCase().includes(query) ||
          squad.excerpt.toLowerCase().includes(query) ||
          squad.formationLabel.toLowerCase().includes(query) ||
          squad.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    result.sort((a, b) => {
      if (sort === 'rating') {
        return (b.rating ?? 0) - (a.rating ?? 0)
      }

      if (sort === 'comments') {
        return (b.commentCount ?? 0) - (a.commentCount ?? 0)
      }

      return Number(a.id) - Number(b.id)
    })

    return result
  }, [filter, search, sort, squads])

  function showToast(message: string) {
    setToastMessage(message)
    window.setTimeout(() => {
      setToastMessage(null)
    }, 3500)
  }

  function handleConfirmDelete() {
    if (!deleteTarget) {
      return
    }

    setSquads((prev) => prev.filter((squad) => squad.id !== deleteTarget.id))
    setDeleteTarget(null)
    showToast('Kadro kalıcı olarak silindi.')
  }

  function resetFilters() {
    setSearch('')
    setFilter('all')
  }

  return (
    <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
      <MySquadsHero />

      <div className="mx-auto w-full max-w-[1360px] px-4 py-space-xl sm:px-6 lg:px-12">
        <MySquadsFilters
          filter={filter}
          sort={sort}
          search={search}
          onFilterChange={setFilter}
          onSortChange={setSort}
          onSearchChange={setSearch}
        />

        {filteredSquads.length === 0 ? (
          <div className="my-space-lg flex flex-col items-center justify-center bg-surface-container-lowest p-space-xl text-center">
            <span className="material-symbols-outlined mb-space-sm text-[48px] text-outline">
              sports_soccer
            </span>
            <h3 className="font-headline text-headline-sm font-bold text-primary uppercase">
              Aramanızla Eşleşen Kadro Bulunamadı
            </h3>
            <p className="font-body mt-1 mb-space-md max-w-md text-body-md text-on-surface-variant">
              Farklı bir arama terimi deneyin ya da filtreleri temizleyerek tüm dizilişlerinizi
              görüntüleyin.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="font-label bg-primary px-space-md py-space-xs text-label-md font-bold text-on-primary uppercase"
            >
              Filtreleri Sıfırla
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-space-lg">
            {filteredSquads.map((squad) => (
              <MySquadCard
                key={squad.id}
                squad={squad}
                onDelete={(target) => {
                  setDeleteTarget(target)
                }}
              />
            ))}
          </div>
        )}

        <MySquadsCta />
      </div>

      <MySquadsDeleteModal
        open={Boolean(deleteTarget)}
        squadTitle={deleteTarget?.title ?? 'Kadro'}
        onCancel={() => {
          setDeleteTarget(null)
        }}
        onConfirm={handleConfirmDelete}
      />

      {toastMessage ? (
        <div className="fixed right-8 bottom-8 z-50 flex items-center gap-space-sm border-l-4 border-secondary-container bg-primary px-space-md py-space-sm text-on-primary shadow-xl">
          <span className="material-symbols-outlined text-[20px] text-secondary-container">
            check_circle
          </span>
          <span className="font-label text-label-md font-semibold">{toastMessage}</span>
        </div>
      ) : null}
    </main>
  )
}
