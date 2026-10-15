import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import userService from '../../users/userService'
import type { UserPreviewDto } from '../../users/userTypes'
import { forumPrinciples } from '../utils/postsFeedTypes'
import { FeedGlobalPollCard } from './FeedGlobalPollCard'

const AVATAR_TONES = [
  'bg-primary-container text-on-primary',
  'bg-secondary text-on-secondary',
  'bg-primary text-on-primary',
] as const

function initialsFromUsername(username: string): string {
  const cleaned = username.trim()

  if (cleaned.length === 0) {
    return '?'
  }

  return cleaned.slice(0, 2).toUpperCase()
}

export function PostsFeedSidebar() {
  const [contributors, setContributors] = useState<UserPreviewDto[]>([])
  const [isLoadingContributors, setIsLoadingContributors] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadContributors() {
      setIsLoadingContributors(true)

      const result = await userService.getTopContributors(5)

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setContributors(result.data)
      } else {
        setContributors([])
      }

      setIsLoadingContributors(false)
    }

    void loadContributors()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <aside className="flex flex-col gap-space-lg lg:col-span-4">
      <FeedGlobalPollCard />

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
          className="font-label ml-auto inline-flex items-center gap-1 text-label-md font-bold text-secondary uppercase transition-colors hover:text-primary"
        >
          <span className="material-symbols-outlined text-base">menu_book</span>
          <span>Tüm topluluk kuralları</span>
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </Link>
      </div>

      <div className="bg-surface-container-lowest p-space-md shadow-sm">
        <div className="mb-space-sm flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-lg text-tertiary-fixed-dim">
            hotel_class
          </span>
          <span className="font-headline text-label-md font-bold tracking-wider text-primary uppercase">
            Öne Çıkan Yazarlar
          </span>
        </div>

        {isLoadingContributors ? (
          <p className="font-body text-body-sm text-on-surface-variant">Yazarlar yükleniyor...</p>
        ) : contributors.length === 0 ? (
          <p className="font-body text-body-sm text-on-surface-variant">
            Henüz listelenecek yazar yok.
          </p>
        ) : (
          <div className="flex flex-col gap-space-sm">
            {contributors.map((contributor, index) => {
              const rank = index + 1
              const avatarTone = AVATAR_TONES[index % AVATAR_TONES.length]

              return (
                <Link
                  key={contributor.id}
                  to={`/uyeler/${contributor.username}`}
                  className="flex items-center gap-space-sm bg-surface-container p-space-xs transition-colors hover:bg-surface-container-high"
                >
                  <span
                    aria-label={`${rank}. sıra`}
                    className={[
                      'font-headline w-8 shrink-0 text-center text-[22px] leading-none font-bold tabular-nums',
                      rank === 1 ? 'text-primary' : 'text-on-surface-variant/45',
                    ].join(' ')}
                  >
                    {rank}
                  </span>
                  <div
                    className={[
                      'flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden font-headline text-kicker font-bold',
                      avatarTone,
                    ].join(' ')}
                  >
                    {contributor.profileImageUrl ? (
                      <img
                        src={contributor.profileImageUrl}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      initialsFromUsername(contributor.username)
                    )}
                  </div>
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span className="font-label truncate text-label-md font-bold text-secondary">
                      @{contributor.username}
                    </span>
                    <span className="font-kicker text-kicker text-on-surface-variant uppercase">
                      {contributor.postCount} gönderi
                    </span>
                    <span className="font-body text-body-sm text-on-surface-variant">
                      {contributor.totalLikeCount} beğeni
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </aside>
  )
}
