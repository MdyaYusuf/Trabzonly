import { useEffect, useState } from 'react'
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

      <div className="relative bg-surface-container-lowest p-space-md shadow-sm">
        <div className="mb-space-sm flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-lg text-secondary">shield</span>
          <span className="font-headline text-label-md font-bold tracking-wider text-primary uppercase">
            Tribün ve Forum İlkeleri
          </span>
        </div>
        <p className="font-body mb-space-md text-body-sm text-on-surface-variant">
          Trabzonly, seviyeli futbol tartışmalarının ve Karadeniz spor ahlakının dijital kalesidir.
        </p>
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
      </div>

      <div className="bg-surface-container-lowest p-space-md shadow-sm">
        <div className="mb-space-sm flex items-center justify-between gap-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-lg text-tertiary-fixed-dim">
              hotel_class
            </span>
            <span className="font-headline text-label-md font-bold tracking-wider text-primary uppercase">
              Öne Çıkan Yazarlar
            </span>
          </div>
          <span className="font-kicker text-kicker font-bold text-on-surface-variant uppercase">
            Lider Tablosu
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
                <div
                  key={contributor.id}
                  className="flex items-center justify-between gap-space-sm bg-surface-container p-space-xs"
                >
                  <div className="flex min-w-0 items-center gap-space-sm">
                    <span
                      className={[
                        'font-headline shrink-0 text-label-md font-bold',
                        rank === 1 ? 'text-tertiary-fixed-dim' : 'text-on-surface-variant',
                      ].join(' ')}
                    >
                      #{rank}
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
                    <div className="flex min-w-0 flex-col">
                      <span className="font-label truncate text-label-md font-bold text-on-surface">
                        @{contributor.username}
                      </span>
                      <span className="font-kicker text-kicker text-on-surface-variant uppercase">
                        {contributor.postCount} gönderi · {contributor.totalLikeCount} beğeni
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </aside>
  )
}
