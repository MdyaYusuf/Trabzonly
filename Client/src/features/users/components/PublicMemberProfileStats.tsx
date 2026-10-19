import type { PublicUserProfileDto } from '../userTypes'
import type { PublicMemberStat } from '../utils/publicMemberProfileTypes'

type PublicMemberProfileStatsProps = {
  profile: PublicUserProfileDto
  followerCount: number
  followingCount: number
}

function buildStats(
  profile: PublicUserProfileDto,
  followerCount: number,
  followingCount: number,
): PublicMemberStat[] {
  const quizValue =
    profile.quizAttemptCount === 0
      ? '0 / *'
      : `${profile.quizAveragePercent ?? 0}% / ${profile.quizAttemptCount}`

  return [
    {
      id: 'quiz',
      label: 'Quiz Ortalaması',
      value: quizValue,
      unit: 'Başarı',
    },
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
  ]
}

export function PublicMemberProfileStats({
  profile,
  followerCount,
  followingCount,
}: PublicMemberProfileStatsProps) {
  const stats = buildStats(profile, followerCount, followingCount)

  return (
    <section className="grid grid-cols-2 gap-px overflow-hidden border border-outline-variant/40 bg-outline-variant/40 sm:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="flex flex-col gap-1 bg-surface-container-low px-space-md py-space-md"
        >
          <span className="font-kicker text-kicker text-on-surface-variant uppercase">
            {stat.label}
          </span>
          <div className="flex flex-wrap items-baseline gap-space-xs">
            <span className="font-headline text-headline-md font-extrabold text-primary tabular-nums">
              {stat.value}
            </span>
            <span className="font-label text-label-md text-on-surface-variant">{stat.unit}</span>
          </div>
        </div>
      ))}
    </section>
  )
}
