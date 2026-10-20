import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '@/features/auth/authService'
import { useAppSelector } from '@/core/store/hooks'

type SiteHeaderAccountMenuProps = {
  onNavigate?: () => void
}

function initialsFromUsername(username: string): string {
  const cleaned = username.trim()

  if (cleaned.length === 0) {
    return '?'
  }

  return cleaned.slice(0, 2).toUpperCase()
}

export function SiteHeaderAccountMenu({ onNavigate }: SiteHeaderAccountMenuProps) {
  const user = useAppSelector((state) => state.auth.user)
  const navigate = useNavigate()
  const rootRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const username = user?.username ?? ''
  const initials = initialsFromUsername(username)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  function handleLogout() {
    setIsOpen(false)
    onNavigate?.()
    authService.logout()
    navigate('/login')
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={username ? `@${username} hesabı` : 'Hesap menüsü'}
        title={username ? `@${username}` : 'Hesap'}
        className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-secondary-container ring-2 ring-white/25 transition-opacity hover:opacity-90"
        onClick={() => {
          setIsOpen((open) => !open)
        }}
      >
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="font-headline text-sm font-extrabold text-on-secondary-container">
            {initials}
          </span>
        )}
      </button>

      {isOpen ? (
        <div
          role="menu"
          aria-label="Hesap menüsü"
          className="absolute top-full left-1/2 z-50 mt-2 min-w-[12.5rem] -translate-x-1/2 overflow-hidden border border-outline-variant/30 bg-surface-container-lowest shadow-[0_8px_24px_rgba(26,4,11,0.18)]"
        >
          {username ? (
            <div className="border-b border-outline-variant/25 px-space-md py-space-sm">
              <p className="font-label truncate text-label-md font-bold text-on-surface">
                @{username}
              </p>
            </div>
          ) : null}

          <Link
            role="menuitem"
            to="/profil"
            className="font-label flex cursor-pointer items-center gap-space-sm px-space-md py-space-sm text-label-md text-on-surface uppercase transition-colors hover:bg-surface-container"
            onClick={() => {
              setIsOpen(false)
              onNavigate?.()
            }}
          >
            <span className="material-symbols-outlined text-[18px] text-primary">settings</span>
            Profil Ayarları
          </Link>

          <button
            type="button"
            role="menuitem"
            className="font-label flex w-full cursor-pointer items-center gap-space-sm px-space-md py-space-sm text-left text-label-md text-on-surface uppercase transition-colors hover:bg-surface-container"
            onClick={handleLogout}
          >
            <span className="material-symbols-outlined text-[18px] text-error">logout</span>
            Çıkış Yap
          </button>
        </div>
      ) : null}
    </div>
  )
}
