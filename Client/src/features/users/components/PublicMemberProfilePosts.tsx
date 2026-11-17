import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useAppSelector } from '@/core/store/hooks'
import { authService } from '@/features/auth/authService'
import { PostCard } from '@/features/posts/components/PostCard'
import { PostsFeedLoadMore } from '@/features/posts/components/PostsFeedLoadMore'
import postService from '@/features/posts/postService'
import { mapPostToFeedCard } from '@/features/posts/utils/mapPostToFeedCard'
import {
  FEED_SCROLL_PANEL_CLASS,
  measureRemovedFeedHeight,
} from '@/features/posts/utils/postsFeedScroll'
import {
  FEED_PAGE_SIZE,
  MAX_FEED_POSTS,
  type FeedPostCard,
} from '@/features/posts/utils/postsFeedTypes'

type PublicMemberProfilePostsProps = {
  userId: string
}

export function PublicMemberProfilePosts({ userId }: PublicMemberProfilePostsProps) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const currentUserId = useAppSelector((state) => state.auth.user?.id)
  const [page, setPage] = useState(1)
  const [reloadToken, setReloadToken] = useState(0)
  const [posts, setPosts] = useState<FeedPostCard[]>([])
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
    setPage(1)
    setReloadToken(0)
    setHasTrimmedWindow(false)
  }, [userId])

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
        userId,
        sort: 'newest',
      })

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        const mapped = result.data.items.map(mapPostToFeedCard)
        const nextTotalPages = Math.max(1, Math.ceil(result.data.totalCount / FEED_PAGE_SIZE))

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
        setTotalPages(1)
      }

      setIsLoading(false)
      setIsLoadingMore(false)
    }

    void loadPosts()

    return () => {
      cancelled = true
    }
  }, [userId, page, reloadToken, isAuthenticated, currentUserId])

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

  function handleRefresh() {
    feedScrollEl?.scrollTo({ top: 0, behavior: 'smooth' })
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
    <section className="flex flex-col gap-space-md">
      <div className="flex items-center justify-end px-space-xs">
        <button
          type="button"
          onClick={handleRefresh}
          disabled={isLoading}
          className="font-label inline-flex cursor-pointer items-center gap-1 text-label-md tracking-wider text-on-surface-variant uppercase transition-colors hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
          title="Gönderileri yenile"
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
              Bu üyenin henüz yayınlanmış gönderisi yok.
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
    </section>
  )
}
