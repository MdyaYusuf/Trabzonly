import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import postService from '../postService'
import type { PostResponseDto } from '../postTypes'
import { forumPrinciples } from '../utils/postsFeedTypes'

type PostDetailSidebarProps = {
  authorUserId: string
  authorUsername: string
  excludePostId: string
}

function formatAuthorPostDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function PostDetailSidebar({
  authorUserId,
  authorUsername,
  excludePostId,
}: PostDetailSidebarProps) {
  const [authorPosts, setAuthorPosts] = useState<PostResponseDto[]>([])
  const [isLoadingAuthorPosts, setIsLoadingAuthorPosts] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadAuthorPosts() {
      setIsLoadingAuthorPosts(true)

      const result = await postService.getAll({
        pageNumber: 1,
        pageSize: 6,
        userId: authorUserId,
        sort: 'newest',
      })

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setAuthorPosts(
          result.data.items.filter((item) => item.id !== excludePostId).slice(0, 5),
        )
      } else {
        setAuthorPosts([])
      }

      setIsLoadingAuthorPosts(false)
    }

    void loadAuthorPosts()

    return () => {
      cancelled = true
    }
  }, [authorUserId, excludePostId])

  return (
    <aside className="flex flex-col gap-space-lg lg:col-span-4">
      <div className="bg-surface-container-lowest p-space-md shadow-sm">
        <div className="mb-space-sm flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-lg text-secondary">shield</span>
          <span className="font-headline text-label-md font-bold tracking-wider text-primary uppercase">
            Tribün ve Forum İlkeleri
          </span>
        </div>
        <ul className="flex flex-col gap-space-sm">
          {forumPrinciples.map((principle, index) => (
            <li key={principle.title} className="flex items-start gap-space-xs">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-primary-container font-headline text-kicker font-bold text-on-primary">
                {index + 1}
              </span>
              <div className="flex flex-col">
                <span className="font-label text-label-md font-bold text-on-surface">
                  {principle.title}
                </span>
                <span className="font-body text-body-sm text-on-surface-variant">
                  {principle.body}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <Link
          to="/topluluk-kurallari"
          className="font-label mt-space-md inline-flex items-center gap-1 text-label-md font-bold text-secondary uppercase transition-colors hover:text-primary"
        >
          <span>Tüm topluluk kuralları</span>
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </Link>
      </div>

      <div className="bg-surface-container-lowest p-space-md shadow-sm">
        <div className="mb-space-sm flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-lg text-secondary">person</span>
          <span className="font-headline text-label-md font-bold tracking-wider text-primary uppercase">
            @{authorUsername} yazılarından
          </span>
        </div>

        {isLoadingAuthorPosts ? (
          <p className="font-body text-body-sm text-on-surface-variant">Yükleniyor...</p>
        ) : authorPosts.length === 0 ? (
          <p className="font-body text-body-sm text-on-surface-variant">
            Bu yazardan başka aktif gönderi yok.
          </p>
        ) : (
          <ul className="flex flex-col gap-space-sm">
            {authorPosts.map((item) => (
              <li key={item.id} className="border-t border-surface-container pt-space-sm first:border-t-0 first:pt-0">
                <Link
                  to={`/gonderiler/${item.id}`}
                  className="font-label block text-label-md font-bold text-on-surface transition-colors hover:text-primary"
                >
                  {item.title}
                </Link>
                <div className="font-body mt-1 flex flex-wrap items-center gap-space-xs text-body-sm text-on-surface-variant">
                  <span>{item.categoryName}</span>
                  <span aria-hidden="true">•</span>
                  <span>{formatAuthorPostDate(item.createdDate)}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Link
        to="/gonderiler"
        className="bg-primary-container px-space-md py-space-sm text-center font-label text-label-md font-bold text-on-primary uppercase shadow-sm transition-colors hover:bg-primary"
      >
        Tüm Gönderilere Dön
      </Link>
    </aside>
  )
}
