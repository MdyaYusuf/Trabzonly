import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ReactionButtons } from '../../../core/components/ReactionButtons'
import { useAppSelector } from '../../../core/store/hooks'
import { UserProfileLink } from '../../users/components/UserProfileLink'
import userService from '../../users/userService'
import postService from '../postService'
import type { PostReactionType } from '../postTypes'
import type { CategoryBadgeTone, FeedPostCard } from '../utils/postsFeedTypes'

const LIKE: PostReactionType = 1
const DISLIKE: PostReactionType = 2

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
  const [currentReaction, setCurrentReaction] = useState<PostReactionType | null>(
    post.currentReaction ?? null,
  )
  const [isReacting, setIsReacting] = useState(false)
  const [isFollowingAuthor, setIsFollowingAuthor] = useState(post.isAuthorFollowedByCurrentUser)
  const [isFollowUpdating, setIsFollowUpdating] = useState(false)

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

    if (currentUserId != null && currentUserId === post.authorUserId) {
      toast.warning('Kendi gönderinize tepki veremezsiniz.')
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
    <article className="group relative cursor-pointer border-b border-outline-variant/20 px-1 py-space-lg last:border-b-0 transition-colors hover:bg-on-surface/[0.03]">
      <Link
        to={detailPath}
        className="absolute inset-0 z-0"
        aria-label={post.title}
      />

      <div className="relative z-10 flex gap-space-md pointer-events-none">
        <UserProfileLink
          username={post.authorUsername}
          aria-label={`@${post.authorUsername} profili`}
          className={[
            'pointer-events-auto flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full font-headline text-label-md font-bold',
            avatarToneClass[post.categoryTone],
          ].join(' ')}
        >
          {post.authorProfileImageUrl ? (
            <img
              src={post.authorProfileImageUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            post.authorInitials
          )}
        </UserProfileLink>

        <div className="min-w-0 flex-1">
          <div className="mb-space-xs flex flex-wrap items-center justify-between gap-x-space-sm gap-y-0.5">
            <div className="flex min-w-0 flex-wrap items-center gap-x-space-xs gap-y-0.5">
              <UserProfileLink
                username={post.authorUsername}
                className="pointer-events-auto font-label text-label-md font-bold text-on-surface transition-colors hover:text-primary"
              />
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
                    'pointer-events-auto font-kicker cursor-pointer text-kicker font-bold uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-50',
                    isFollowingAuthor
                      ? 'text-on-surface-variant hover:text-primary'
                      : 'text-secondary hover:text-primary',
                  ].join(' ')}
                >
                  {isFollowingAuthor ? '· Takiptesin' : '· Takip Et'}
                </button>
              ) : null}
            </div>
            <span className="font-body shrink-0 text-body-sm text-on-surface-variant">
              {post.publishedLabel}
            </span>
          </div>

          <span className="font-kicker mb-space-sm inline-block text-kicker font-bold tracking-wider text-secondary uppercase">
            {post.categoryLabel}
          </span>

          <h2 className="font-headline text-headline-sm leading-snug font-bold text-primary transition-colors group-hover:text-secondary">
            {post.title}
          </h2>
          <p className="font-body mt-space-sm line-clamp-3 text-body-md text-on-surface-variant">
            {post.excerpt}
          </p>

          {post.imageUrl ? (
            <div className="mt-space-md overflow-hidden border border-outline-variant/25">
              <img
                src={post.imageUrl}
                alt=""
                className="max-h-72 w-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
              />
            </div>
          ) : null}

          {post.topComment ? (
            <div className="mt-space-md border-l-[3px] border-secondary bg-surface-container/55 px-space-sm py-space-sm">
              <div className="mb-1 flex flex-wrap items-center justify-between gap-space-xs">
                <span className="font-kicker text-[10px] font-bold tracking-wider text-secondary uppercase">
                  Öne çıkan yorum
                </span>
                <span className="font-kicker flex items-center gap-space-xs text-[10px] font-bold uppercase">
                  <span className="inline-flex items-center gap-0.5 text-success">
                    <span className="material-symbols-outlined text-[13px]">thumb_up</span>
                    {post.topComment.likeCount}
                  </span>
                  <span className="inline-flex items-center gap-0.5 text-error">
                    <span className="material-symbols-outlined text-[13px]">thumb_down</span>
                    {post.topComment.dislikeCount}
                  </span>
                </span>
              </div>
              <p className="font-body line-clamp-2 text-body-sm text-on-surface">
                &quot;{post.topComment.content}&quot;
              </p>
              <UserProfileLink
                username={post.topComment.authorUsername}
                className="pointer-events-auto font-kicker mt-1 inline-block text-[10px] text-on-surface-variant uppercase transition-colors hover:text-primary"
              >
                — @{post.topComment.authorUsername}
              </UserProfileLink>
            </div>
          ) : null}

          {post.poll ? (
            <div className="mt-space-md border-l-[3px] border-secondary bg-surface-container/55 px-space-sm py-space-sm transition-colors group-hover:bg-surface-container/80">
              <div className="mb-1 flex items-center justify-between gap-space-xs">
                <span className="font-kicker text-[10px] font-bold tracking-wider text-secondary uppercase">
                  Anket
                </span>
                <span className="font-kicker text-[10px] font-bold text-on-surface-variant uppercase">
                  {post.poll.totalVotes} oy
                </span>
              </div>
              <p className="font-label mb-1 text-label-md font-bold text-on-surface">
                {post.poll.question}
              </p>
              <div className="flex items-center justify-between gap-space-sm">
                <span className="font-body line-clamp-1 text-body-sm text-on-surface-variant">
                  {post.poll.leadingOption.label}
                </span>
                <span className="font-label shrink-0 text-label-md font-bold text-primary">
                  {post.poll.leadingOption.percentage}%
                </span>
              </div>
            </div>
          ) : null}

          <div className="pointer-events-auto mt-space-md flex flex-wrap items-center gap-space-xs">
            <ReactionButtons
              size="sm"
              likeCount={likeCount}
              dislikeCount={dislikeCount}
              currentReaction={currentReaction}
              disabled={!isAuthenticated || isReacting}
              className="bg-transparent"
              onLike={() => {
                void handleReact(LIKE)
              }}
              onDislike={() => {
                void handleReact(DISLIKE)
              }}
            />

            <span className="inline-flex items-center gap-1 px-space-xs py-1 font-label text-[12px] font-bold text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px]">chat</span>
              <span>{post.commentCount}</span>
            </span>

            <div className="ml-auto flex items-center gap-space-xs">
              {post.readTimeLabel ? (
                <span className="font-body px-space-xs py-1 text-body-sm text-on-surface-variant">
                  {post.readTimeLabel}
                </span>
              ) : null}
              <button
                type="button"
                onClick={() => {
                  void handleShare()
                }}
                className="inline-flex cursor-pointer items-center gap-1 px-space-xs py-1 text-on-surface-variant transition-colors hover:text-secondary"
                title="Bağlantıyı kopyala"
                aria-label="Bağlantıyı kopyala"
              >
                <span className="material-symbols-outlined text-[16px]">share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
