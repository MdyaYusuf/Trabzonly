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
  const [authorPostCount, setAuthorPostCount] = useState(0)
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
        setAuthorPostCount(result.data.totalCount)
        setAuthorPosts(
          result.data.items.filter((item) => item.id !== excludePostId).slice(0, 1),
        )
      } else {
        setAuthorPostCount(0)
        setAuthorPosts([])
      }

      setIsLoadingAuthorPosts(false)
    }

    void loadAuthorPosts()

    return () => {
      cancelled = true
    }
  }, [authorUserId, excludePostId])

  const latestAuthorPost = authorPosts[0] ?? null

  return (
    <aside className="flex flex-col gap-space-lg lg:col-span-4">
      <div className="flex flex-col gap-space-md bg-surface-container p-space-lg">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-lg text-secondary">shield</span>
          <span className="font-headline text-label-md font-bold tracking-wider text-primary uppercase">
            Tribün ve Forum İlkeleri
          </span>
        </div>
        <p className="font-body text-body-sm text-on-surface-variant">
          Trabzonly, seviyeli futbol tartışmalarının ve Karadeniz spor ahlakının dijital kalesidir.
        </p>
        <div className="flex flex-col gap-space-sm">
          {forumPrinciples.map((principle, index) => (
            <div
              key={principle.title}
              className="flex items-center gap-space-sm bg-surface-container-lowest p-space-sm"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-on-secondary">
                {index + 1}
              </span>
              <p className="font-body text-body-sm text-on-surface">
                <strong>{principle.title}:</strong> {principle.body}
              </p>
            </div>
          ))}
        </div>
        <Link
          to="/topluluk-kurallari"
          className="font-label group ml-auto inline-flex items-center gap-1 text-label-md font-bold text-secondary uppercase transition-colors hover:text-primary"
        >
          <span className="material-symbols-outlined text-base">menu_book</span>
          <span>Tüm topluluk kuralları</span>
          <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-0.5">
            arrow_forward
          </span>
        </Link>
      </div>

      <div className="relative flex flex-col gap-space-md bg-surface-container-lowest p-space-md shadow-sm">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-lg text-secondary">auto_stories</span>
          <span className="font-headline text-label-md font-bold tracking-wider text-primary uppercase">
            Yazardan Daha Fazla
          </span>
        </div>

        {isLoadingAuthorPosts ? (
          <p className="font-body text-body-sm text-on-surface-variant">Yükleniyor...</p>
        ) : (
          <div className="flex flex-col gap-space-md">
            <div className="flex items-center gap-space-sm bg-surface-container px-space-md py-space-sm">
              <span className="font-stat text-headline-sm font-extrabold text-primary">
                {authorPostCount}
              </span>
              <span className="font-kicker text-kicker font-bold tracking-wider text-on-surface-variant uppercase">
                Toplam Gönderi
              </span>
            </div>

            {latestAuthorPost ? (
              <Link
                to={`/gonderiler/${latestAuthorPost.id}`}
                className="flex flex-col gap-1 bg-surface-container px-space-md py-space-sm transition-colors hover:bg-surface-container-high"
              >
                <span className="font-kicker text-kicker font-bold tracking-wider text-on-surface-variant uppercase">
                  Son Gönderi
                </span>
                <span className="font-label line-clamp-2 text-label-md font-bold text-secondary">
                  {latestAuthorPost.title}
                </span>
                <span className="font-body text-body-sm text-on-surface-variant">
                  {latestAuthorPost.categoryName} •{' '}
                  {formatAuthorPostDate(latestAuthorPost.createdDate)}
                </span>
              </Link>
            ) : (
              <p className="font-body text-body-sm text-on-surface-variant">
                Bu yazardan başka aktif gönderi yok.
              </p>
            )}

            <Link
              to={`/uyeler/${authorUsername}`}
              className="font-label group ml-auto inline-flex cursor-pointer items-center gap-1 text-label-md font-bold text-secondary uppercase transition-colors hover:text-primary"
            >
              <span className="material-symbols-outlined text-base">person</span>
              <span>Profiline Git</span>
              <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-0.5">
                arrow_forward
              </span>
            </Link>
          </div>
        )}
      </div>

      <Link
        to="/gonderiler"
        className="font-label group flex w-full cursor-pointer items-center justify-start gap-space-xs bg-surface-container-lowest px-space-md py-space-sm text-label-md font-bold tracking-wider text-primary uppercase shadow-sm transition-all hover:text-secondary"
      >
        <span className="material-symbols-outlined text-[18px]">feed</span>
        <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-translate-x-0.5">
          arrow_back
        </span>
        <span>Tüm Gönderilere Dön</span>
      </Link>
    </aside>
  )
}
