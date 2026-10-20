import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppSelector } from '@/core/store/hooks'
import type { PublicUserProfileDto } from '../userTypes'
import userService from '../userService'
import type { PublicMemberStat } from '../utils/publicMemberProfileTypes'
import { DEFAULT_USER_DISPLAY_TAG } from '../utils/userDisplayTags'

type PublicMemberProfileHeroProps = {
  profile: PublicUserProfileDto
  isFollowing: boolean
  followerCount: number
  followingCount: number
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

function buildStats(
  profile: PublicUserProfileDto,
  followerCount: number,
  followingCount: number,
): PublicMemberStat[] {
  const hasQuizAttempts = profile.quizAttemptCount > 0

  return [
    {
      id: 'posts',
      label: 'Toplam Gönderi',
      value: String(profile.postCount),
      unit: 'Yazı',
    },
    {
      id: 'squads',
      label: 'Taktik Kadrolar',
      value: String(profile.squadCount),
      unit: 'Diziliş',
    },
    {
      id: 'network',
      label: 'Topluluk Ağı',
      value: String(followerCount),
      unit: `Takipçi / ${followingCount} Takip`,
    },
    {
      id: 'quiz',
      label: 'Quiz Ortalaması',
      value: hasQuizAttempts
        ? `${profile.quizAveragePercent ?? 0}% / ${profile.quizAttemptCount}`
        : '—',
      unit: hasQuizAttempts ? 'Başarı' : '',
      title: hasQuizAttempts ? undefined : 'Henüz quiz çözmedi.',
    },
  ]
}

export function PublicMemberProfileHero({
  profile,
  isFollowing,
  followerCount,
  followingCount,
  onFollowChange,
}: PublicMemberProfileHeroProps) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const currentUserId = useAppSelector((state) => state.auth.user?.id)
  const isOwnProfile = currentUserId != null && currentUserId === profile.id
  const displayTag = profile.displayTag?.trim() || DEFAULT_USER_DISPLAY_TAG
  const initials = initialsFromUsername(profile.username)
  const [isFollowUpdating, setIsFollowUpdating] = useState(false)
  const stats = buildStats(profile, followerCount, followingCount)

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
    <section className="overflow-hidden shadow-[0_8px_28px_rgba(26,4,11,0.18)]">
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1a040b] via-primary to-[#0b3a55]">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(140,206,253,0.25), transparent 45%), radial-gradient(circle at 80% 70%, rgba(247,189,91,0.15), transparent 40%)',
          }}
        />

        <div className="relative z-10 flex flex-col gap-space-md p-space-md sm:flex-row sm:items-start sm:justify-between sm:p-space-lg">
          <div className="flex min-w-0 flex-col gap-space-md sm:flex-row sm:items-start">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary-container ring-2 ring-white/30 sm:h-24 sm:w-24">
              {profile.profileImageUrl ? (
                <img
                  src={profile.profileImageUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="font-headline text-headline-sm font-extrabold text-on-secondary-container sm:text-headline-md">
                  {initials}
                </span>
              )}
            </div>

            <div className="flex min-w-0 flex-col gap-space-xs">
              <span className="font-kicker w-fit bg-secondary-container px-space-sm py-1 text-kicker text-on-secondary-container uppercase">
                {displayTag}
              </span>

              <h1 className="font-headline text-headline-md font-extrabold text-on-primary">
                @{profile.username}
              </h1>

              <p className="font-body inline-flex items-center gap-1 text-body-sm text-on-primary/75">
                <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                {formatJoinedLabel(profile.createdDate)}
              </p>

              {profile.bio ? (
                <p className="font-body max-w-2xl text-body-md text-on-primary/85">{profile.bio}</p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm sm:shrink-0">
            {isOwnProfile ? (
              <Link
                to="/profil"
                className="font-label inline-flex cursor-pointer items-center justify-center gap-space-xs bg-secondary-container px-space-md py-space-sm text-label-md font-bold tracking-wider text-on-secondary-container uppercase transition-all hover:brightness-110"
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
                className="font-label inline-flex cursor-pointer items-center justify-center gap-space-xs bg-secondary-container px-space-md py-space-sm text-label-md font-bold tracking-wider text-on-secondary-container uppercase transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
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
              className="flex h-10 w-10 cursor-pointer items-center justify-center border border-on-primary/35 text-on-primary transition-colors hover:border-on-primary hover:bg-on-primary/10"
            >
              <span className="material-symbols-outlined text-[18px]">share</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 divide-x divide-y divide-outline-variant/40 border-x border-b border-outline-variant/40 bg-surface-container-lowest sm:grid-cols-4 sm:divide-y-0">
        {stats.map((stat) => (
          <div
            key={stat.id}
            title={stat.title}
            className="flex flex-col gap-0.5 px-space-md py-space-sm"
          >
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              {stat.label}
            </span>
            <div className="flex flex-wrap items-baseline gap-space-xs">
              <span className="font-headline text-headline-sm font-extrabold text-primary tabular-nums sm:text-headline-md">
                {stat.value}
              </span>
              {stat.unit.length > 0 ? (
                <span className="font-label text-label-md text-on-surface-variant">{stat.unit}</span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
