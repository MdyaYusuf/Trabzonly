import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PublicMemberProfileBreadcrumb } from '../components/PublicMemberProfileBreadcrumb'
import { PublicMemberProfileHero } from '../components/PublicMemberProfileHero'
import { PublicMemberProfilePosts } from '../components/PublicMemberProfilePosts'
import { PublicMemberProfileSquads } from '../components/PublicMemberProfileSquads'
import { PublicMemberProfileStats } from '../components/PublicMemberProfileStats'
import { PublicMemberProfileTabs } from '../components/PublicMemberProfileTabs'
import userService from '../userService'
import type { PublicUserProfileDto } from '../userTypes'
import type { PublicMemberTab, PublicMemberTabId } from '../utils/publicMemberProfileTypes'

function buildTabs(profile: PublicUserProfileDto): PublicMemberTab[] {
  return [
    {
      id: 'posts',
      label: 'Gönderiler',
      icon: 'article',
      count: profile.postCount,
    },
    {
      id: 'squads',
      label: 'Kadrolar & Taktikler',
      icon: 'sports',
      count: profile.squadCount,
    },
  ]
}

export function PublicMemberProfilePage() {
  const { username } = useParams<{ username: string }>()
  const [profile, setProfile] = useState<PublicUserProfileDto | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [activeTab, setActiveTab] = useState<PublicMemberTabId>('posts')
  const [isFollowing, setIsFollowing] = useState(false)
  const [followerCount, setFollowerCount] = useState(0)
  const [followingCount, setFollowingCount] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function loadProfile() {
      if (!username || username.trim().length === 0) {
        setProfile(null)
        setNotFound(true)
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setNotFound(false)
      setActiveTab('posts')

      const result = await userService.getByUsername(username.trim())

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setProfile(result.data)
        setIsFollowing(result.data.isFollowedByCurrentUser === true)
        setFollowerCount(result.data.followerCount)
        setFollowingCount(result.data.followingCount)
        setNotFound(false)
      } else {
        setProfile(null)
        setNotFound(true)
      }

      setIsLoading(false)
    }

    void loadProfile()

    return () => {
      cancelled = true
    }
  }, [username])

  return (
    <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
      <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
        {username ? <PublicMemberProfileBreadcrumb username={username} /> : null}

        {isLoading ? (
          <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
            Profil yükleniyor...
          </p>
        ) : notFound || !profile ? (
          <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
            Üye bulunamadı.
          </p>
        ) : (
          <>
            <PublicMemberProfileHero
              profile={profile}
              isFollowing={isFollowing}
              onFollowChange={(nextFollowing, nextFollowerCount) => {
                setIsFollowing(nextFollowing)
                setFollowerCount(nextFollowerCount)
              }}
            />
            <PublicMemberProfileStats
              profile={profile}
              followerCount={followerCount}
              followingCount={followingCount}
            />
            <PublicMemberProfileTabs
              tabs={buildTabs(profile)}
              activeTab={activeTab}
              onChange={setActiveTab}
            />

            <div className="flex flex-col gap-space-xl">
              {activeTab === 'posts' ? (
                <PublicMemberProfilePosts userId={profile.id} />
              ) : null}
              {activeTab === 'squads' ? (
                <PublicMemberProfileSquads userId={profile.id} />
              ) : null}
            </div>
          </>
        )}
      </div>
    </main>
  )
}
