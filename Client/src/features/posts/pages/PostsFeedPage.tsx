import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useAppSelector } from '@/core/store/hooks'
import { authService } from '@/features/auth/authService'
import categoryService from '../../categories/categoryService'
import type { CategoryResponseDto } from '../../categories/categoryTypes'
import { PostCard } from '../components/PostCard'
import { PostsFeedBreadcrumb } from '../components/PostsFeedBreadcrumb'
import { PostsFeedCta } from '../components/PostsFeedCta'
import { PostsFeedFilters } from '../components/PostsFeedFilters'
import { PostsFeedHero } from '../components/PostsFeedHero'
import { PostsFeedLoadMore } from '../components/PostsFeedLoadMore'
import { PostsFeedSidebar } from '../components/PostsFeedSidebar'
import postService from '../postService'
import { mapPostToFeedCard } from '../utils/mapPostToFeedCard'
import {
  FEED_SCROLL_PANEL_CLASS,
  measureRemovedFeedHeight,
} from '../utils/postsFeedScroll'
import {
  FEED_PAGE_SIZE,
  MAX_FEED_POSTS,
  type FeedPostCard,
  type FeedSortOption,
} from '../utils/postsFeedTypes'

export function PostsFeedPage() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const userId = useAppSelector((state) => state.auth.user?.id)
  const [categories, setCategories] = useState<CategoryResponseDto[]>([])
  const [categoryId, setCategoryId] = useState<number | 'all'>('all')
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [sort, setSort] = useState<FeedSortOption>('newest')
  const [page, setPage] = useState(1)
  const [reloadToken, setReloadToken] = useState(0)
  const [posts, setPosts] = useState<FeedPostCard[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasTrimmedWindow, setHasTrimmedWindow] = useState(false)
  const [feedScrollEl, setFeedScrollEl] = useState<HTMLDivElement | null>(null)
  const feedScrollElRef = useRef<HTMLDivElement | null>(null)
  const postsRef = useRef<FeedPostCard[]>([])
  const scrollAdjustRef = useRef(0)

  useEffect(() => {
    feedScrollElRef.current = feedScrollEl
  }, [feedScrollEl])

  useEffect(() => {
    postsRef.current = posts
  }, [posts])

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
    const isFirstPage = page === 1

    async function loadPosts() {
      if (isFirstPage) {
        setIsLoading(true)
      } else {
        setIsLoadingMore(true)
      }

      await authService.ensureViewerSession()

      if (cancelled) {
        return
      }

      const result = await postService.getAll({
        pageNumber: page,
        pageSize: FEED_PAGE_SIZE,
        categoryId: categoryId === 'all' ? undefined : categoryId,
        search: debouncedSearch,
        sort,
      })

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        const mapped = result.data.items.map(mapPostToFeedCard)
        const nextTotalPages = Math.max(1, Math.ceil(result.data.totalCount / FEED_PAGE_SIZE))

        setTotalCount(result.data.totalCount)
        setTotalPages(nextTotalPages)

        if (isFirstPage) {
          scrollAdjustRef.current = 0
          setHasTrimmedWindow(false)
          setPosts(mapped)
        } else {
          const current = postsRef.current
          const seen = new Set(current.map((post) => post.id))
          const appended = mapped.filter((post) => !seen.has(post.id))
          const merged = [...current, ...appended]

          if (merged.length <= MAX_FEED_POSTS) {
            scrollAdjustRef.current = 0
            setPosts(merged)
          } else {
            const removeCount = merged.length - MAX_FEED_POSTS
            const removedIds = merged.slice(0, removeCount).map((post) => post.id)
            const scrollRoot = feedScrollElRef.current

            scrollAdjustRef.current = scrollRoot
              ? measureRemovedFeedHeight(scrollRoot, removedIds)
              : 0
            setHasTrimmedWindow(true)
            setPosts(merged.slice(-MAX_FEED_POSTS))
          }
        }
      } else if (isFirstPage) {
        scrollAdjustRef.current = 0
        setHasTrimmedWindow(false)
        setPosts([])
        setTotalCount(0)
        setTotalPages(1)
      }

      setIsLoading(false)
      setIsLoadingMore(false)
    }

    void loadPosts()

    return () => {
      cancelled = true
    }
  }, [categoryId, debouncedSearch, sort, page, reloadToken, isAuthenticated, userId])

  useLayoutEffect(() => {
    const el = feedScrollEl
    const delta = scrollAdjustRef.current

    if (!el || delta <= 0) {
      return
    }

    el.scrollTop = Math.max(0, el.scrollTop - delta)
    scrollAdjustRef.current = 0
  }, [posts, feedScrollEl])

  const hasMore = page < totalPages

  function scrollFeedToTop() {
    feedScrollEl?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function resetToFirstPage() {
    scrollFeedToTop()
    setPage(1)
  }

  function handleRefresh() {
    scrollFeedToTop()
    setPage(1)
    setReloadToken((token) => token + 1)
  }

  function handleLoadMore() {
    if (isLoading || isLoadingMore || !hasMore) {
      return
    }

    setPage((current) => current + 1)
  }

  return (
    <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
      <PostsFeedBreadcrumb />
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
            <div className="flex flex-col gap-space-md lg:col-span-8">
              <div className="flex items-center justify-end px-space-xs">
                <button
                  type="button"
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="font-label inline-flex cursor-pointer items-center gap-1 text-label-md tracking-wider text-on-surface-variant uppercase transition-colors hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                  title="Akışı yenile"
                >
                  <span className="material-symbols-outlined text-[18px]">refresh</span>
                  Yenile
                </button>
              </div>

              <div className="flex flex-col bg-background shadow-[0_4px_24px_rgba(31,27,23,0.06)]">
                <div ref={setFeedScrollEl} className={FEED_SCROLL_PANEL_CLASS}>
                  {isLoading ? (
                    <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
                      Gönderiler yükleniyor...
                    </p>
                  ) : posts.length === 0 ? (
                    <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
                      Bu filtrelere uygun gönderi bulunamadı.
                    </p>
                  ) : (
                    <>
                      {hasTrimmedWindow ? (
                        <p className="font-body border-b border-outline-variant/15 py-space-sm text-center text-body-sm text-on-surface-variant/70">
                          Eski gönderiler temizlendi — başa dönmek için Yenile.
                        </p>
                      ) : null}
                      {posts.map((post) => (
                        <div key={post.id} data-feed-post-id={post.id}>
                          <PostCard post={post} />
                        </div>
                      ))}
                      <PostsFeedLoadMore
                        hasMore={hasMore}
                        isLoadingMore={isLoadingMore}
                        onLoadMore={handleLoadMore}
                        scrollRoot={feedScrollEl}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>

            <PostsFeedSidebar />
          </div>
        </div>
      </div>

      <PostsFeedCta />
    </main>
  )
}
