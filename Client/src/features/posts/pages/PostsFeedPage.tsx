import { useEffect, useState } from 'react'
import categoryService from '../../categories/categoryService'
import type { CategoryResponseDto } from '../../categories/categoryTypes'
import { PostCard } from '../components/PostCard'
import { PostsFeedFilters } from '../components/PostsFeedFilters'
import { PostsFeedHero } from '../components/PostsFeedHero'
import { PostsFeedPagination } from '../components/PostsFeedPagination'
import { PostsFeedSidebar } from '../components/PostsFeedSidebar'
import postService from '../postService'
import { mapPostToFeedCard } from '../utils/mapPostToFeedCard'
import { PAGE_SIZE, type FeedPostCard, type FeedSortOption } from '../utils/postsFeedTypes'

export function PostsFeedPage() {
  const [categories, setCategories] = useState<CategoryResponseDto[]>([])
  const [categoryId, setCategoryId] = useState<number | 'all'>('all')
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [sort, setSort] = useState<FeedSortOption>('newest')
  const [page, setPage] = useState(1)
  const [posts, setPosts] = useState<FeedPostCard[]>([])
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

    async function loadCategories() {
      const result = await categoryService.getAll({ pageNumber: 1, pageSize: 50 })

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setCategories(result.data.items.filter((category) => category.isActive))
      }
    }

    void loadCategories()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    async function loadPosts() {
      setIsLoading(true)

      const result = await postService.getAll({
        pageNumber: page,
        pageSize: PAGE_SIZE,
        categoryId: categoryId === 'all' ? undefined : categoryId,
        search: debouncedSearch,
        sort,
      })

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setPosts(result.data.items.map(mapPostToFeedCard))
        setTotalCount(result.data.totalCount)
        setTotalPages(Math.max(1, Math.ceil(result.data.totalCount / PAGE_SIZE)))
      } else {
        setPosts([])
        setTotalCount(0)
        setTotalPages(1)
      }

      setIsLoading(false)
    }

    void loadPosts()

    return () => {
      cancelled = true
    }
  }, [categoryId, debouncedSearch, sort, page])

  const rangeStart = totalCount === 0 ? 0 : (page - 1) * PAGE_SIZE + 1
  const rangeEnd = Math.min(page * PAGE_SIZE, totalCount)

  function resetToFirstPage() {
    setPage(1)
  }

  return (
    <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
      <PostsFeedHero />

      <PostsFeedFilters
        categories={categories}
        categoryId={categoryId}
        search={search}
        sort={sort}
        onCategoryChange={(value) => {
          setCategoryId(value)
          resetToFirstPage()
        }}
        onSearchChange={(value) => {
          setSearch(value)
          resetToFirstPage()
        }}
        onSortChange={(value) => {
          setSort(value)
          resetToFirstPage()
        }}
      />

      <div className="w-full bg-background py-space-xl">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12">
            <div className="flex flex-col gap-space-lg lg:col-span-8">
              {isLoading ? (
                <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
                  Gönderiler yükleniyor...
                </p>
              ) : posts.length === 0 ? (
                <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
                  Bu filtrelere uygun gönderi bulunamadı.
                </p>
              ) : (
                posts.map((post) => <PostCard key={post.id} post={post} />)
              )}

              <PostsFeedPagination
                filteredCount={totalCount}
                rangeStart={rangeStart}
                rangeEnd={rangeEnd}
                totalPages={totalPages}
                currentPage={page}
                onPageChange={(nextPage) => {
                  setPage(nextPage)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
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
