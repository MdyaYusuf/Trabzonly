import { useEffect, useState } from 'react'
import { useAppSelector } from '@/core/store/hooks'
import { authService } from '@/features/auth/authService'
import { PostCard } from '@/features/posts/components/PostCard'
import { PostsFeedPagination } from '@/features/posts/components/PostsFeedPagination'
import postService from '@/features/posts/postService'
import { mapPostToFeedCard } from '@/features/posts/utils/mapPostToFeedCard'
import { PAGE_SIZE, type FeedPostCard } from '@/features/posts/utils/postsFeedTypes'

type PublicMemberProfilePostsProps = {
  userId: string
}

export function PublicMemberProfilePosts({ userId }: PublicMemberProfilePostsProps) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const currentUserId = useAppSelector((state) => state.auth.user?.id)
  const [page, setPage] = useState(1)
  const [posts, setPosts] = useState<FeedPostCard[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setPage(1)
  }, [userId])

  useEffect(() => {
    let cancelled = false

    async function loadPosts() {
      setIsLoading(true)

      await authService.ensureViewerSession()

      if (cancelled) {
        return
      }

      const result = await postService.getAll({
        pageNumber: page,
        pageSize: PAGE_SIZE,
        userId,
        sort: 'newest',
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
  }, [userId, page, isAuthenticated, currentUserId])

  const rangeStart = totalCount === 0 ? 0 : (page - 1) * PAGE_SIZE + 1
  const rangeEnd = Math.min(page * PAGE_SIZE, totalCount)

  return (
    <section className="flex flex-col gap-space-md">
      <div className="flex flex-col bg-background px-space-md py-space-sm shadow-[0_4px_24px_rgba(31,27,23,0.06)] sm:px-space-lg">
        {isLoading ? (
          <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
            Gönderiler yükleniyor...
          </p>
        ) : posts.length === 0 ? (
          <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
            Bu üyenin henüz yayınlanmış gönderisi yok.
          </p>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>

      {!isLoading && totalCount > 0 ? (
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
      ) : null}
    </section>
  )
}
