import type { KeyboardEvent, MouseEvent, ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export function publicProfilePath(username: string): string {
  const cleaned = username.trim().replace(/^@+/, '')
  return `/uyeler/${encodeURIComponent(cleaned)}`
}

type UserProfileLinkProps = {
  username: string
  className?: string
  children?: ReactNode
  /** Use when this sits inside another link/card click target (avoids nested anchors). */
  nested?: boolean
  'aria-label'?: string
}

export function UserProfileLink({
  username,
  className,
  children,
  nested = false,
  'aria-label': ariaLabel,
}: UserProfileLinkProps) {
  const navigate = useNavigate()
  const cleaned = username.trim().replace(/^@+/, '')
  const path = publicProfilePath(cleaned)
  const content = children ?? `@${cleaned}`
  const classes = ['cursor-pointer', className].filter(Boolean).join(' ')

  if (nested) {
    function go(event: MouseEvent | KeyboardEvent) {
      event.preventDefault()
      event.stopPropagation()
      navigate(path)
    }

    return (
      <span
        role="link"
        tabIndex={0}
        aria-label={ariaLabel ?? `@${cleaned} profili`}
        className={classes}
        onClick={go}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            go(event)
          }
        }}
      >
        {content}
      </span>
    )
  }

  return (
    <Link to={path} aria-label={ariaLabel} className={classes}>
      {content}
    </Link>
  )
}
