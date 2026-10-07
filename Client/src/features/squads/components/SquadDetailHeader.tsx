import { useState } from 'react'
import { toast } from 'react-toastify'
import { useAppSelector } from '@/core/store/hooks'
import userService from '@/features/users/userService'
import type { SquadDetailViewModel } from '../utils/squadDetailTypes'

type SquadDetailHeaderProps = {
  squad: SquadDetailViewModel
  onFollowChange?: (isFollowed: boolean) => void
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating.toFixed(1)} / 5`}>
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1
        const fill: 'full' | 'half' | 'empty' =
          rating >= starValue ? 'full' : rating >= starValue - 0.5 ? 'half' : 'empty'
        const gradientId = `detail-star-half-${index}`

        return (
          <svg
            key={index}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            className="shrink-0"
            aria-hidden="true"
          >
            {fill === 'half' ? (
              <defs>
                <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="0">
                  <stop offset="50%" stopColor="#D39D3F" />
                  <stop offset="50%" stopColor="#D39D3F" stopOpacity="0.28" />
                </linearGradient>
              </defs>
            ) : null}
            <path
              d="M12 2.5l2.74 6.16 6.76.62-5.1 4.5 1.5 6.72L12 16.9l-6 3.6 1.5-6.72-5.1-4.5 6.76-.62L12 2.5z"
              fill={
                fill === 'full' ? '#D39D3F' : fill === 'half' ? `url(#${gradientId})` : '#D39D3F'
              }
              fillOpacity={fill === 'empty' ? 0.28 : 1}
            />
          </svg>
        )
      })}
    </div>
  )
}

function formatViewCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(/\.0$/, '')}k`
  }

  return count.toLocaleString('tr-TR')
}

export function SquadDetailHeader({ squad, onFollowChange }: SquadDetailHeaderProps) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const currentUser = useAppSelector((state) => state.auth.user)
  const currentUserId = currentUser?.id
  const [isFollowing, setIsFollowing] = useState(squad.isAuthorFollowedByCurrentUser)
  const [isFollowUpdating, setIsFollowUpdating] = useState(false)
  const [isSharing, setIsSharing] = useState(false)

  const authorLabel = squad.authorUsername.startsWith('@')
    ? squad.authorUsername
    : `@${squad.authorUsername}`

  const canFollow =
    isAuthenticated && currentUserId != null && currentUserId !== squad.userId

  async function handleFollowToggle() {
    if (!canFollow || isFollowUpdating) {
      return
    }

    setIsFollowUpdating(true)

    try {
      const result = isFollowing
        ? await userService.unfollow(squad.userId)
        : await userService.follow(squad.userId)

      if (result.success && result.data) {
        setIsFollowing(result.data.isFollowedByCurrentUser)
        onFollowChange?.(result.data.isFollowedByCurrentUser)
      }
    } catch {
      // apiClient surfaces errors via toast
    } finally {
      setIsFollowUpdating(false)
    }
  }

  async function handleShare() {
    if (isSharing) {
      return
    }

    setIsSharing(true)

    try {
      await navigator.clipboard.writeText(window.location.href)
      toast.success('Bağlantı panoya kopyalandı.')
    } catch {
      toast.error('Bağlantı kopyalanamadı.')
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <section className="w-full bg-surface py-space-lg">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col justify-between gap-space-lg lg:flex-row lg:items-start">
          <div className="flex flex-1 flex-col gap-space-md">
            <div className="flex flex-wrap items-center gap-space-sm">
              <span className="font-kicker flex items-center gap-1 bg-primary-container px-space-sm py-1 text-kicker tracking-widest text-on-primary uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-tertiary-fixed-dim" />
                {squad.formation}
              </span>
              <span className="font-label bg-secondary-container px-space-sm py-1 text-label-md font-bold text-on-secondary-container">
                Taraftar Analizi
              </span>
              <span className="font-kicker flex items-center gap-1 bg-surface-container-high px-space-sm py-1 text-kicker font-semibold text-on-surface-variant uppercase">
                <span className="material-symbols-outlined text-[14px]">groups</span>
                Topluluk Kadrosu
              </span>
            </div>

            <h1 className="font-display max-w-4xl text-headline-lg leading-none font-extrabold tracking-tight text-primary uppercase lg:text-display-xl">
              {squad.title}
            </h1>

            <div className="flex flex-wrap items-center gap-space-lg pt-space-xs">
              <div className="flex items-center gap-space-sm">
                <div className="font-headline relative flex h-12 w-12 items-center justify-center bg-primary text-headline-sm font-bold text-on-primary shadow-sm">
                  {squad.authorInitials}
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-space-xs">
                    <span className="font-headline text-headline-sm font-bold text-on-surface">
                      {authorLabel}
                    </span>
                    {squad.authorDisplayTag ? (
                      <span className="font-kicker bg-surface-container-highest px-1.5 py-0.5 text-kicker font-bold text-primary uppercase">
                        {squad.authorDisplayTag}
                      </span>
                    ) : null}
                  </div>
                  <span className="font-body text-body-sm text-on-surface-variant">
                    Yayınlanma: {squad.publishedLabel}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-space-xs">
                {canFollow ? (
                  <button
                    type="button"
                    disabled={isFollowUpdating}
                    onClick={() => {
                      void handleFollowToggle()
                    }}
                    className="font-label flex items-center gap-1.5 bg-surface-container px-space-md py-space-xs text-label-md tracking-wider text-on-surface uppercase transition-colors hover:bg-surface-container-highest disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-[18px]">person_add</span>
                    <span>{isFollowing ? 'Takiptesin' : 'Yazarı Takip Et'}</span>
                  </button>
                ) : null}
                <button
                  type="button"
                  disabled={isSharing}
                  onClick={() => {
                    void handleShare()
                  }}
                  className="font-label flex items-center gap-1.5 bg-surface-container px-space-md py-space-xs text-label-md tracking-wider text-on-surface uppercase transition-colors hover:bg-surface-container-highest disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[18px]">share</span>
                  <span>Paylaş</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col justify-between gap-space-md bg-surface-container-lowest p-space-md shadow-sm lg:w-80">
            <span className="font-kicker text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
              TOPLULUK PUANI
            </span>
            <div className="flex items-baseline gap-space-sm">
              <span className="font-stat text-stat-counter leading-none font-extrabold text-primary">
                {squad.rating.toFixed(1)}
              </span>
              <div className="flex flex-col">
                <RatingStars rating={squad.rating} />
                <span className="font-body mt-1 text-body-sm text-on-surface-variant">
                  {squad.ratingCount.toLocaleString('tr-TR')} Taraftar Oyladı
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-space-xs pt-space-xs text-center">
              <div className="bg-surface-container-low p-2">
                <span className="font-label block text-label-md font-bold text-primary">
                  {squad.commentCount.toLocaleString('tr-TR')}
                </span>
                <span className="font-kicker text-kicker text-on-surface-variant uppercase">
                  Yorum
                </span>
              </div>
              <div className="bg-surface-container-low p-2">
                <span className="font-label block text-label-md font-bold text-secondary">
                  {formatViewCount(squad.viewCount)}
                </span>
                <span className="font-kicker text-kicker text-on-surface-variant uppercase">
                  Görüntü
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
