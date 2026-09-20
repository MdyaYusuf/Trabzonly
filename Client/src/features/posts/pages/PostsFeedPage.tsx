import { useMemo, useState } from 'react'
import { PostCard } from '../components/PostCard'
import { PostsFeedFilters } from '../components/PostsFeedFilters'
import { PostsFeedHero } from '../components/PostsFeedHero'
import { PostsFeedPagination } from '../components/PostsFeedPagination'
import { PostsFeedSidebar } from '../components/PostsFeedSidebar'
import { PAGE_SIZE, placeholderPosts } from '../utils/postsFeedPlaceholders'
import type { FeedSortOption, PostCategoryId } from '../utils/postsFeedTypes'

export function PostsFeedPage() {
  const [categoryId, setCategoryId] = useState<PostCategoryId>('all')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<FeedSortOption>('newest')
  const [page, setPage] = useState(1)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const filteredPosts = useMemo(() => {
    let result = [...placeholderPosts]

    if (categoryId !== 'all') {
      result = result.filter((post) => post.categoryId === categoryId)
    }

    const query = search.trim().toLowerCase()

    if (query) {
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.authorUsername.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query),
      )
    }

    result.sort((a, b) => {
      if (sort === 'popular') {
        return b.likeCount - a.likeCount
      }

      if (sort === 'discussed') {
        return b.commentCount - a.commentCount
      }

      if (sort === 'tactical') {
        if (a.categoryId === 'taktik' && b.categoryId !== 'taktik') {
          return -1
        }

        if (b.categoryId === 'taktik' && a.categoryId !== 'taktik') {
          return 1
        }
      }

      return Number(a.id) - Number(b.id)
    })

    return result
  }, [categoryId, search, sort])

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageStart = (currentPage - 1) * PAGE_SIZE
  const pagePosts =
    currentPage === 1
      ? filteredPosts.slice(0, Math.min(visibleCount, filteredPosts.length))
      : filteredPosts.slice(pageStart, pageStart + PAGE_SIZE)

  function resetPaging() {
    setPage(1)
    setVisibleCount(PAGE_SIZE)
  }

  return (
    <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
      <PostsFeedHero
        sort={sort}
        onSortChange={(value) => {
          setSort(value)
          resetPaging()
        }}
      />

      <PostsFeedFilters
        categoryId={categoryId}
        search={search}
        onCategoryChange={(value) => {
          setCategoryId(value)
          resetPaging()
        }}
        onSearchChange={(value) => {
          setSearch(value)
          resetPaging()
        }}
      />

      <div className="w-full bg-background py-space-xl">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12">
            <div className="flex flex-col gap-space-lg lg:col-span-8">
              {pagePosts.length === 0 ? (
                <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
                  Bu filtrelere uygun gönderi bulunamadı.
                </p>
              ) : (
                pagePosts.map((post) => <PostCard key={post.id} post={post} />)
              )}

              <PostsFeedPagination
                currentPage={currentPage}
                totalPages={Math.max(totalPages, 28)}
                onPageChange={(nextPage) => {
                  setPage(nextPage)
                  setVisibleCount(PAGE_SIZE)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                onLoadMore={() => {
                  setVisibleCount((count) => Math.min(filteredPosts.length, count + PAGE_SIZE))
                }}
              />
            </div>

            <PostsFeedSidebar />
          </div>
        </div>
      </div>
    </main>
  )
}
