import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { PublicMemberProfileBreadcrumb } from '../components/PublicMemberProfileBreadcrumb'
import { PublicMemberProfileComments } from '../components/PublicMemberProfileComments'
import { PublicMemberProfileHero } from '../components/PublicMemberProfileHero'
import { PublicMemberProfilePosts } from '../components/PublicMemberProfilePosts'
import { PublicMemberProfileQuizzes } from '../components/PublicMemberProfileQuizzes'
import { PublicMemberProfileSidebar } from '../components/PublicMemberProfileSidebar'
import { PublicMemberProfileSquads } from '../components/PublicMemberProfileSquads'
import { PublicMemberProfileStats } from '../components/PublicMemberProfileStats'
import { PublicMemberProfileTabs } from '../components/PublicMemberProfileTabs'
import { getPublicMemberProfile } from '../utils/publicMemberProfilePlaceholders'
import type { PublicMemberTabId } from '../utils/publicMemberProfileTypes'

export function PublicMemberProfilePage() {
  const { username } = useParams<{ username: string }>()
  const profile = getPublicMemberProfile(username)
  const [activeTab, setActiveTab] = useState<PublicMemberTabId>('posts')

  return (
    <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
      <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
        <PublicMemberProfileBreadcrumb profile={profile} />
        <PublicMemberProfileHero profile={profile} />
        <PublicMemberProfileStats profile={profile} />
        <PublicMemberProfileTabs
          tabs={profile.tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        <div className="grid grid-cols-1 items-start gap-gutter lg:grid-cols-12">
          <div className="flex flex-col gap-space-xl lg:col-span-8">
            {activeTab === 'posts' && (
              <>
                <PublicMemberProfilePosts posts={profile.posts} />
                <PublicMemberProfileSquads
                  squads={profile.squads}
                  totalCount={
                    profile.tabs.find((tab) => tab.id === 'squads')?.count ?? profile.squads.length
                  }
                />
              </>
            )}

            {activeTab === 'squads' && (
              <PublicMemberProfileSquads
                squads={profile.squads}
                totalCount={
                  profile.tabs.find((tab) => tab.id === 'squads')?.count ?? profile.squads.length
                }
              />
            )}

            {activeTab === 'quizzes' && (
              <PublicMemberProfileQuizzes
                quizCount={profile.tabs.find((tab) => tab.id === 'quizzes')?.count ?? 0}
                averagePercent={profile.quizAveragePercent}
              />
            )}

            {activeTab === 'comments' && (
              <PublicMemberProfileComments
                activities={profile.activities}
                totalCount={profile.tabs.find((tab) => tab.id === 'comments')?.count ?? 0}
              />
            )}
          </div>

          <div className="lg:col-span-4">
            <PublicMemberProfileSidebar profile={profile} />
          </div>
        </div>
      </div>
    </main>
  )
}
