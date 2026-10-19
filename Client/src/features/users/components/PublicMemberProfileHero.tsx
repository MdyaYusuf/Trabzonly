import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppSelector } from '@/core/store/hooks'
import type { PublicUserProfileDto } from '../userTypes'
import userService from '../userService'
import { DEFAULT_USER_DISPLAY_TAG } from '../utils/userDisplayTags'

type PublicMemberProfileHeroProps = {
  profile: PublicUserProfileDto
  isFollowing: boolean
  onFollowChange: (isFollowing: boolean, followerCount: number) => void
}

function initialsFromUsername(username: string): string {
  const cleaned = username.trim()

  if (cleaned.length === 0) {
    return '?'
  }

  return cleaned.slice(0, 2).toUpperCase()
}

function formatJoinedLabel(isoDate: string): string {
  const label = new Date(isoDate).toLocaleDateString('tr-TR', {
    month: 'long',
    year: 'numeric',
  })

  return `Katılım: ${label}`
}

export function PublicMemberProfileHero({
  profile,
  isFollowing,
  onFollowChange,
}: PublicMemberProfileHeroProps) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const currentUserId = useAppSelector((state) => state.auth.user?.id)
  const isOwnProfile = currentUserId != null && currentUserId === profile.id
  const displayTag = profile.displayTag?.trim() || DEFAULT_USER_DISPLAY_TAG
  const initials = initialsFromUsername(profile.username)
  const [isFollowUpdating, setIsFollowUpdating] = useState(false)

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast.success('Bağlantı panoya kopyalandı.')
    } catch {
      toast.error('Bağlantı kopyalanamadı.')
    }
  }

  async function handleFollowToggle() {
    if (isOwnProfile || isFollowUpdating) {
      return
    }

    if (!isAuthenticated) {
      toast.info('Takip etmek için giriş yapmalısınız.')
      return
    }

    setIsFollowUpdating(true)

    try {
      const result = isFollowing
        ? await userService.unfollow(profile.id)
        : await userService.follow(profile.id)

      if (!result.success || !result.data) {
        return
      }

      onFollowChange(result.data.isFollowedByCurrentUser, result.data.followerCount)
    } catch {
      // apiClient already surfaces errors via toast
    } finally {
      setIsFollowUpdating(false)
    }
  }

  return (
    <section className="flex flex-col">
      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-[#1a040b] via-primary to-[#0b3a55] sm:h-48 lg:h-56">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(140,206,253,0.25), transparent 45%), radial-gradient(circle at 80% 70%, rgba(247,189,91,0.15), transparent 40%)',
          }}
        />
      </div>

      <div className="relative z-10 -mt-16 border border-outline-variant/40 bg-surface-container-lowest p-space-md shadow-sm sm:-mt-20 sm:p-space-lg">
        <div className="flex flex-col gap-space-lg lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-space-md sm:flex-row sm:items-start">
            <div className="relative shrink-0 self-start">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary to-secondary ring-4 ring-surface-container-lowest sm:h-28 sm:w-28">
                {profile.profileImageUrl ? (
                  <img
                    src={profile.profileImageUrl}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="font-headline text-headline-md font-extrabold text-on-primary">
                    {initials}
                  </span>
                )}
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-space-sm">
              <span className="font-kicker w-fit bg-secondary-container px-space-sm py-1 text-kicker text-on-secondary-container uppercase">
                {displayTag}
              </span>

              <div>
                <h1 className="font-headline text-headline-md font-extrabold text-primary">
                  {profile.username}
                </h1>
                <p className="font-label mt-1 text-label-md text-on-surface-variant">
                  @{profile.username}
                </p>
              </div>

              <p className="font-body inline-flex items-center gap-1 text-body-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                {formatJoinedLabel(profile.createdDate)}
              </p>

              {profile.bio ? (
                <p className="font-body max-w-2xl text-body-md text-on-surface-variant">
                  {profile.bio}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm lg:shrink-0">
            {isOwnProfile ? (
              <Link
                to="/profil"
                className="font-label inline-flex items-center justify-center gap-space-xs bg-primary-container px-space-md py-space-sm text-label-md font-bold tracking-wider text-on-primary uppercase transition-all hover:bg-primary"
              >
                <span className="material-symbols-outlined text-[18px]">edit</span>
                Profili Düzenle
              </Link>
            ) : (
              <button
                type="button"
                disabled={isFollowUpdating}
                onClick={() => {
                  void handleFollowToggle()
                }}
                className="font-label inline-flex items-center justify-center gap-space-xs bg-primary-container px-space-md py-space-sm text-label-md font-bold tracking-wider text-on-primary uppercase transition-all hover:bg-primary disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isFollowing ? 'person_check' : 'person_add'}
                </span>
                {isFollowing ? 'Takiptesin' : 'Takip Et'}
              </button>
            )}

            <button
              type="button"
              aria-label="Paylaş"
              onClick={() => {
                void handleShare()
              }}
              className="flex h-10 w-10 items-center justify-center border border-outline-variant text-on-surface transition-colors hover:border-primary hover:text-primary"
            >
              <span className="material-symbols-outlined text-[18px]">share</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
