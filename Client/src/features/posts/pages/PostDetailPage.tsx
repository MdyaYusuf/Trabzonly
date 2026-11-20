import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '@/core/store/hooks'
import { authService } from '@/features/auth/authService'
import { ContentNotFoundPage } from '@/features/status/pages/ContentNotFoundPage'
import { PostCommentsSection } from '../components/PostCommentsSection'
import { PostDetailArticle } from '../components/PostDetailArticle'
import { PostDetailBreadcrumb } from '../components/PostDetailBreadcrumb'
import { PostDetailHeader } from '../components/PostDetailHeader'
import { PostDetailSidebar } from '../components/PostDetailSidebar'
import postService from '../postService'
import type { PostResponseDto } from '../postTypes'

export function PostDetailPage() {
  const { postId } = useParams<{ postId: string }>()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const userId = useAppSelector((state) => state.auth.user?.id)
  const [post, setPost] = useState<PostResponseDto | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [textScale, setTextScale] = useState(1)

  useEffect(() => {
    if (!postId) {
      setNotFound(true)
      setIsLoading(false)
      return
    }

    const detailPostId = postId
    let cancelled = false

    async function loadPost() {
      setIsLoading(true)
      setNotFound(false)

      try {
        await authService.ensureViewerSession()

        if (cancelled) {
          return
        }

        const result = await postService.getById(detailPostId)

        if (cancelled) {
          return
        }

        if (!result.success || !result.data) {
          setPost(null)
          setNotFound(true)
          return
        }

        setPost(result.data)
        setNotFound(false)
      } catch {
        if (cancelled) {
          return
        }

        setPost(null)
        setNotFound(true)
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void loadPost()

    return () => {
      cancelled = true
    }
  }, [postId, isAuthenticated, userId])

  if (isLoading) {
    return (
      <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
        <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
          Gönderi yükleniyor...
        </p>
      </main>
    )
  }

  if (notFound || !post) {
    return (
      <ContentNotFoundPage
        secondaryTo="/gonderiler"
        secondaryLabel="Gönderilere Göz At"
        secondaryIcon="article"
      />
    )
  }

  return (
    <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
      <PostDetailBreadcrumb post={post} />

      <div className="w-full bg-background py-space-lg">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-12">
          <PostDetailHeader
            post={post}
            textScale={textScale}
            onTextScaleChange={setTextScale}
          />

          <div className="grid grid-cols-1 items-start gap-gutter lg:grid-cols-12">
            <article className="flex flex-col gap-space-lg lg:col-span-8">
              <PostDetailArticle post={post} textScale={textScale} />
              <PostCommentsSection
                postId={post.id}
                postTitle={post.title}
                commentCount={post.commentCount}
                onCommentCountChange={(count) => {
                  setPost((current) => {
                    if (!current) {
                      return current
                    }

                    return {
                      ...current,
                      commentCount: count,
                    }
                  })
                }}
              />
            </article>
            <PostDetailSidebar
              authorUserId={post.userId}
              authorUsername={post.authorUsername}
              excludePostId={post.id}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
