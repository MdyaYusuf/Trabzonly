import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppSelector } from '../../../core/store/hooks'
import userService from '../../users/userService'
import postService from '../postService'
import type { PostReactionType } from '../postTypes'
import type { CategoryBadgeTone, FeedPostCard } from '../utils/postsFeedTypes'

const LIKE: PostReactionType = 1
const DISLIKE: PostReactionType = 2

const categoryToneClass: Record<CategoryBadgeTone, string> = {
  primary: 'bg-primary text-on-primary',
  'primary-container': 'bg-primary-container text-on-primary',
  secondary: 'bg-secondary text-on-secondary',
}

const avatarToneClass: Record<CategoryBadgeTone, string> = {
  primary: 'bg-primary text-on-primary',
  'primary-container': 'bg-primary-container text-on-primary',
  secondary: 'bg-secondary text-on-secondary',
}

type PostCardProps = {
  post: FeedPostCard
}

export function PostCard({ post }: PostCardProps) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const currentUserId = useAppSelector((state) => state.auth.user?.id)
  const detailPath = `/gonderiler/${post.id}`
  const [likeCount, setLikeCount] = useState(post.likeCount)
  const [dislikeCount, setDislikeCount] = useState(post.dislikeCount)
  const [currentReaction, setCurrentReaction] = useState<PostReactionType | null>(null)
  const [isReacting, setIsReacting] = useState(false)
  const [isFollowingAuthor, setIsFollowingAuthor] = useState(post.isAuthorFollowedByCurrentUser)
  const [isFollowUpdating, setIsFollowUpdating] = useState(false)

  const liked = currentReaction === LIKE
  const disliked = currentReaction === DISLIKE
  const canFollowAuthor =
    isAuthenticated &&
    currentUserId != null &&
    currentUserId !== post.authorUserId

  async function handleFollowToggle() {
    if (!canFollowAuthor || isFollowUpdating) {
      return
    }

    setIsFollowUpdating(true)

    try {
      const result = isFollowingAuthor
        ? await userService.unfollow(post.authorUserId)
        : await userService.follow(post.authorUserId)

      if (!result.success || !result.data) {
        return
      }

      setIsFollowingAuthor(result.data.isFollowedByCurrentUser)
    } catch {
      // apiClient already surfaces errors via toast
    } finally {
      setIsFollowUpdating(false)
    }
  }

  async function handleReact(type: PostReactionType) {
    if (!isAuthenticated || isReacting) {
      return
    }

    setIsReacting(true)

    try {
      const result = type === LIKE ? await postService.like(post.id) : await postService.dislike(post.id)

      if (!result.success || !result.data) {
        return
      }

      setLikeCount(result.data.likeCount)
      setDislikeCount(result.data.dislikeCount)
      setCurrentReaction(result.data.currentReaction ?? null)
    } catch {
      // apiClient already surfaces errors via toast
    } finally {
      setIsReacting(false)
    }
  }

  async function handleShare() {
    const shareUrl = `${window.location.origin}/gonderiler/${post.id}`

    try {
      await navigator.clipboard.writeText(shareUrl)
      toast.success('Bağlantı panoya kopyalandı.')
    } catch {
      toast.error('Bağlantı kopyalanamadı.')
    }
  }

  return (
    <article className="group relative flex flex-col gap-space-md bg-surface-container-lowest p-space-lg shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-space-xs">
        <div className="flex items-center gap-space-sm">
          <span
            className={[
              'px-space-sm py-space-xs font-kicker text-kicker font-bold uppercase',
              categoryToneClass[post.categoryTone],
            ].join(' ')}
          >
            {post.categoryLabel}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-space-sm font-body text-body-sm text-on-surface-variant">
          <span>{post.publishedLabel}</span>
          {post.readTimeLabel ? (
            <>
              <span aria-hidden="true">•</span>
              <span>{post.readTimeLabel}</span>
            </>
          ) : null}
        </div>
      </div>

      {post.imageUrl ? (
        <div className="relative h-56 w-full overflow-hidden bg-surface-container sm:h-72">
          <img
            src={post.imageUrl}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
          />
        </div>
      ) : null}

      <div className="flex flex-col gap-space-xs">
        <Link
          to={detailPath}
          className="font-headline text-headline-md leading-snug font-bold text-primary uppercase transition-colors hover:text-primary-container"
        >
          {post.title}
        </Link>
        <p className="font-body line-clamp-3 text-body-md text-on-surface-variant">{post.excerpt}</p>
      </div>

      {post.topComment ? (
        <div className="border-l-2 border-secondary bg-surface p-space-sm">
          <div className="mb-1 flex flex-wrap items-center justify-between gap-space-xs">
            <span className="font-kicker text-kicker font-bold tracking-wider text-secondary uppercase">
              Öne Çıkan Yorum
            </span>
            <span className="font-kicker text-kicker font-bold text-on-surface-variant uppercase">
              {post.topComment.likeCount} beğeni
            </span>
          </div>
          <p className="font-body text-body-sm text-on-surface italic">
            &quot;{post.topComment.content}&quot;
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-space-xs">
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              — @{post.topComment.authorUsername}
            </span>
            {post.topComment.authorDisplayTag ? (
              <span className="bg-secondary px-1.5 py-0.5 font-kicker text-[9px] font-bold text-on-secondary uppercase">
                {post.topComment.authorDisplayTag}
              </span>
            ) : null}
          </div>
        </div>
      ) : null}

      {post.poll ? (
        <div className="border-l-2 border-secondary bg-surface p-space-sm">
          <div className="mb-space-xs flex items-center justify-between gap-space-xs">
            <span className="font-kicker text-kicker font-bold tracking-wider text-secondary uppercase">
              Anket
            </span>
            <span className="font-kicker text-kicker font-bold text-on-surface-variant uppercase">
              {post.poll.totalVotes} Oy
            </span>
          </div>
          <p className="font-label mb-space-xs text-label-md font-bold text-on-surface">
            {post.poll.question}
          </p>
          <div className="flex items-center justify-between gap-space-sm bg-surface-container px-space-sm py-space-xs">
            <span className="font-body line-clamp-1 text-body-sm text-on-surface">
              {post.poll.leadingOption.label}
            </span>
            <span className="font-label shrink-0 text-label-md font-bold text-primary">
              {post.poll.leadingOption.percentage}%
            </span>
          </div>
          <Link
            to={detailPath}
            className="font-kicker mt-space-xs inline-flex items-center gap-1 text-kicker font-bold text-secondary uppercase hover:text-primary"
          >
            <span>Detayda oyla</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-space-sm border-t border-surface-container pt-space-sm">
        <div className="flex items-center gap-space-sm">
          <div
            className={[
              'flex h-10 w-10 items-center justify-center font-headline text-label-md font-bold',
              avatarToneClass[post.categoryTone],
            ].join(' ')}
          >
            {post.authorInitials}
          </div>
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-space-xs">
              <span className="font-label text-label-md font-bold text-on-surface">
                @{post.authorUsername}
              </span>
              {post.authorDisplayTag ? (
                <span className="bg-secondary px-1.5 py-0.5 font-kicker text-[9px] font-bold text-on-secondary uppercase">
                  {post.authorDisplayTag}
                </span>
              ) : null}
              {canFollowAuthor ? (
                <button
                  type="button"
                  disabled={isFollowUpdating}
                  onClick={() => {
                    void handleFollowToggle()
                  }}
                  className={[
                    'px-space-xs py-0.5 font-kicker text-kicker font-bold uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-50',
                    isFollowingAuthor
                      ? 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                      : 'text-secondary hover:text-on-secondary-container',
                  ].join(' ')}
                >
                  {isFollowingAuthor ? 'Takiptesin' : 'Takip Et'}
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-space-xs">
          <div className="flex items-center bg-surface-container">
            <button
              type="button"
              disabled={!isAuthenticated || isReacting}
              onClick={() => {
                void handleReact(LIKE)
              }}
              className={[
                'flex items-center gap-space-xs px-space-sm py-space-xs font-label text-label-md font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-50',
                liked
                  ? 'bg-secondary-container text-on-secondary-container'
                  : 'text-primary hover:bg-secondary-container hover:text-on-secondary-container',
              ].join(' ')}
            >
              <span className="font-bold text-secondary">▲</span>
              <span>{likeCount}</span>
            </button>
            <div className="h-4 w-px bg-surface-container-highest" />
            <button
              type="button"
              disabled={!isAuthenticated || isReacting}
              onClick={() => {
                void handleReact(DISLIKE)
              }}
              className={[
                'flex items-center gap-space-xs px-space-sm py-space-xs font-label text-label-md font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-50',
                disliked
                  ? 'bg-error-container text-on-error-container'
                  : 'text-on-surface-variant hover:bg-error-container hover:text-on-error-container',
              ].join(' ')}
            >
              <span className="font-bold text-error">▼</span>
              <span>{dislikeCount}</span>
            </button>
          </div>

          <Link
            to={detailPath}
            className="flex items-center gap-space-xs bg-surface-container px-space-sm py-space-xs font-label text-label-md font-bold text-on-surface transition-colors hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-base">chat_bubble</span>
            <span>{post.commentCount} Yorum</span>
          </Link>

          <button
            type="button"
            onClick={() => {
              void handleShare()
            }}
            className="bg-surface-container p-space-xs text-on-surface transition-colors hover:bg-surface-container-high"
            aria-label="Bağlantıyı kopyala"
          >
            <span className="material-symbols-outlined text-base">share</span>
          </button>
        </div>
      </div>
    </article>
  )
}
