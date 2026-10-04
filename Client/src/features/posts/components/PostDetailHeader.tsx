import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppSelector } from '../../../core/store/hooks'
import userService from '../../users/userService'
import type { PostResponseDto } from '../postTypes'
import { estimateReadTimeLabel } from '../utils/estimateReadTime'

type PostDetailHeaderProps = {
  post: PostResponseDto
  textScale: number
  onTextScaleChange: (value: number) => void
}

function formatPublishedLabel(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function PostDetailHeader({
  post,
  textScale,
  onTextScaleChange,
}: PostDetailHeaderProps) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const currentUser = useAppSelector((state) => state.auth.user)
  const currentUserId = currentUser?.id
  const [isFollowing, setIsFollowing] = useState(post.isAuthorFollowedByCurrentUser ?? false)
  const [isFollowUpdating, setIsFollowUpdating] = useState(false)
  const readTimeLabel = estimateReadTimeLabel(post.description, post.content)
  const canFollow =
    isAuthenticated && currentUserId != null && currentUserId !== post.userId
  const canEdit =
    isAuthenticated &&
    currentUserId != null &&
    (currentUserId === post.userId || currentUser?.roleName === 'Admin')

  async function handleFollowToggle() {
    if (!canFollow || isFollowUpdating) {
      return
    }

    setIsFollowUpdating(true)

    try {
      const result = isFollowing
        ? await userService.unfollow(post.userId)
        : await userService.follow(post.userId)

      if (result.success && result.data) {
        setIsFollowing(result.data.isFollowedByCurrentUser)
      }
    } catch {
      // apiClient already surfaces errors via toast
    } finally {
      setIsFollowUpdating(false)
    }
  }

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast.success('Bağlantı panoya kopyalandı.')
    } catch {
      toast.error('Bağlantı kopyalanamadı.')
    }
  }

  return (
    <header className="mb-space-lg flex flex-col gap-space-md">
      <div className="flex flex-wrap items-center gap-space-sm">
        <span className="bg-primary-container px-space-sm py-space-xs font-kicker text-kicker font-bold text-on-primary uppercase">
          {post.categoryName}
        </span>
        <span className="font-body text-body-sm text-on-surface-variant">
          {formatPublishedLabel(post.createdDate)}
        </span>
        {readTimeLabel ? (
          <span className="font-body text-body-sm text-on-surface-variant">{readTimeLabel}</span>
        ) : null}
      </div>

      <h1 className="font-headline text-headline-lg font-bold tracking-tight text-primary uppercase lg:text-display-sm">
        {post.title}
      </h1>

      {post.description ? (
        <p className="font-body max-w-3xl text-body-lg text-on-surface-variant">{post.description}</p>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-space-sm border-y border-surface-container py-space-sm">
        <div className="flex flex-wrap items-center gap-space-sm">
          <span className="font-label text-label-md font-bold text-on-surface">
            @{post.authorUsername}
          </span>
          {post.authorDisplayTag ? (
            <span className="bg-secondary px-1.5 py-0.5 font-kicker text-[9px] font-bold text-on-secondary uppercase">
              {post.authorDisplayTag}
            </span>
          ) : null}
          {canFollow ? (
            <button
              type="button"
              disabled={isFollowUpdating}
              onClick={() => {
                void handleFollowToggle()
              }}
              className="font-kicker px-space-xs py-0.5 text-kicker font-bold text-secondary uppercase disabled:opacity-50"
            >
              {isFollowing ? 'Takiptesin' : 'Takip Et'}
            </button>
          ) : null}
        </div>

        <div className="flex items-center gap-space-xs">
          {canEdit ? (
            <Link
              to={`/gonderiler/${post.id}/duzenle`}
              className="bg-surface-container px-space-sm py-1 font-label text-label-md font-bold text-primary uppercase"
            >
              Düzenle
            </Link>
          ) : null}
          <button
            type="button"
            onClick={() => {
              onTextScaleChange(Math.max(0.9, textScale - 0.1))
            }}
            className="bg-surface-container px-space-sm py-1 font-label text-label-md"
          >
            A-
          </button>
          <button
            type="button"
            onClick={() => {
              onTextScaleChange(Math.min(1.3, textScale + 0.1))
            }}
            className="bg-surface-container px-space-sm py-1 font-label text-label-md"
          >
            A+
          </button>
          <button
            type="button"
            onClick={() => {
              void handleShare()
            }}
            className="bg-surface-container p-space-xs text-on-surface"
            aria-label="Paylaş"
          >
            <span className="material-symbols-outlined text-base">share</span>
          </button>
        </div>
      </div>
    </header>
  )
}
