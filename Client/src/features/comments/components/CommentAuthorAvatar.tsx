import { UserProfileLink } from '@/features/users/components/UserProfileLink'

type CommentAuthorAvatarProps = {
  username: string
  profileImageUrl?: string | null
  /** `md` for comment rows, `sm` for the compose form. */
  size?: 'sm' | 'md'
  /** When false, renders a non-link avatar (e.g. current user in the composer). */
  linkToProfile?: boolean
}

function initialsFromUsername(username: string): string {
  const cleaned = username.trim()

  if (cleaned.length === 0) {
    return '?'
  }

  return cleaned.slice(0, 2).toUpperCase()
}

export function CommentAuthorAvatar({
  username,
  profileImageUrl,
  size = 'md',
  linkToProfile = true,
}: CommentAuthorAvatarProps) {
  const initials = initialsFromUsername(username)
  const sizeClass =
    size === 'sm'
      ? 'h-9 w-9 text-[11px]'
      : 'h-10 w-10 font-headline text-[12px]'
  const toneClass =
    size === 'sm'
      ? 'bg-primary text-on-primary'
      : 'bg-primary-container text-on-primary'

  const className = [
    'flex shrink-0 items-center justify-center overflow-hidden rounded-full font-bold uppercase',
    sizeClass,
    toneClass,
  ].join(' ')

  const content = profileImageUrl ? (
    <img src={profileImageUrl} alt="" className="h-full w-full object-cover" />
  ) : (
    initials
  )

  if (!linkToProfile) {
    return <div className={className}>{content}</div>
  }

  return (
    <UserProfileLink
      username={username}
      aria-label={`@${username} profili`}
      className={className}
    >
      {content}
    </UserProfileLink>
  )
}
