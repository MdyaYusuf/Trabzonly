import { Link } from 'react-router-dom'
import { useAppSelector } from '@/core/store/hooks'
import { DEFAULT_USER_DISPLAY_TAG } from '../utils/userDisplayTags'

type ProfileSettingsHeroProps = {
  onLogout: () => void
}

function initialsFromUsername(username: string): string {
  const cleaned = username.trim()

  if (cleaned.length === 0) {
    return '?'
  }

  return cleaned.slice(0, 2).toUpperCase()
}

function formatJoinedLabel(isoDate: string | undefined): string {
  if (!isoDate) {
    return ''
  }

  const label = new Date(isoDate).toLocaleDateString('tr-TR', {
    month: 'long',
    year: 'numeric',
  })

  return `Katılım: ${label}`
}

export function ProfileSettingsHero({ onLogout }: ProfileSettingsHeroProps) {
  const user = useAppSelector((state) => state.auth.user)
  const username = user?.username ?? ''
  const displayTag = user?.displayTag?.trim() || DEFAULT_USER_DISPLAY_TAG
  const initials = initialsFromUsername(username)
  const joinedLabel = formatJoinedLabel(user?.createdDate)
  const publicProfilePath = username ? `/uyeler/${encodeURIComponent(username)}` : '/uyeler'

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
              {user?.profileImageUrl ? (
                <img
                  src={user.profileImageUrl}
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
                @{username || '—'}
              </h1>

              {joinedLabel ? (
                <p className="font-body inline-flex items-center gap-1 text-body-sm text-on-primary/75">
                  <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                  {joinedLabel}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm sm:shrink-0">
            <Link
              to={publicProfilePath}
              className="font-label inline-flex cursor-pointer items-center justify-center gap-space-xs bg-secondary-container px-space-md py-space-sm text-label-md font-bold tracking-wider text-on-secondary-container uppercase transition-all hover:brightness-110"
            >
              <span className="material-symbols-outlined text-[18px]">visibility</span>
              Genel Profili Görüntüle
            </Link>
            <button
              type="button"
              onClick={onLogout}
              className="flex h-10 w-10 cursor-pointer items-center justify-center border border-on-primary/35 text-on-primary transition-colors hover:border-on-primary hover:bg-on-primary/10"
              aria-label="Çıkış Yap"
              title="Çıkış Yap"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
