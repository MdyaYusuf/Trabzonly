import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { BrandLogo } from '@/core/components/BrandLogo'
import { SiteHeaderAccountMenu } from '@/core/components/layout/SiteHeaderAccountMenu'
import { useAppSelector } from '@/core/store/hooks'

const navItems = [
  { to: '/oyuncular', label: 'Oyuncular' },
  { to: '/gonderiler', label: 'Gönderiler' },
  { to: '/kadrolar', label: 'Kadrolar' },
  { to: '/quizler', label: 'Quizler' },
] as const

function ActiveNavUnderline({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 100 6" preserveAspectRatio="none" className={className}>
      <path
        d="M2 4.2 C 28 1.2, 72 1.2, 98 4.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function SiteHeader() {
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 right-0 left-0 z-50 w-full bg-primary/95 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-12">
        <Link to="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <BrandLogo size={36} className="sm:h-10 sm:w-10" />
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="font-headline text-lg font-bold tracking-tight text-on-primary uppercase sm:text-headline-md">
                TRABZONLY
              </span>
              <span className="h-2 w-2 rounded-full bg-secondary-container" />
            </div>
            <span className="font-kicker -mt-0.5 text-[10px] font-bold tracking-widest text-tertiary-fixed-dim uppercase sm:text-kicker">
              TARAFTAR TOPLULUĞU
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  'px-4 py-1 font-label text-label-md uppercase transition-colors',
                  isActive
                    ? 'font-bold text-on-primary'
                    : 'text-on-primary/80 hover:text-on-primary',
                ].join(' ')
              }
            >
              {({ isActive }) => (
                <span className="relative inline-block">
                  {item.label}
                  {isActive ? (
                    <ActiveNavUnderline className="pointer-events-none absolute -bottom-2.5 left-0 h-1.5 w-full text-tertiary-fixed-dim" />
                  ) : null}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {isAuthenticated ? (
            <SiteHeaderAccountMenu />
          ) : (
            <>
              <Link
                to="/login"
                className="bg-secondary-container px-4 py-1 font-label text-label-md tracking-wider text-on-secondary-container uppercase transition-all hover:bg-surface-container-lowest hover:text-on-surface"
              >
                Giriş Yap
              </Link>
              <Link
                to="/register"
                className="bg-primary-container px-4 py-1 font-label text-label-md tracking-wider text-on-primary uppercase transition-all hover:bg-primary"
              >
                Topluluğa Katıl
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          {isAuthenticated ? (
            <SiteHeaderAccountMenu
              onNavigate={() => {
                setMobileOpen(false)
              }}
            />
          ) : null}
          <button
            type="button"
            className="flex h-10 w-10 cursor-pointer items-center justify-center text-on-primary"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-t border-white/10 bg-primary px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  [
                    'px-3 py-3 font-label text-label-md uppercase transition-colors',
                    isActive ? 'font-bold text-on-primary' : 'text-on-primary/90',
                  ].join(' ')
                }
              >
                {({ isActive }) => (
                  <span className="relative inline-block">
                    {item.label}
                    {isActive ? (
                      <ActiveNavUnderline className="pointer-events-none absolute -bottom-1.5 left-0 h-1.5 w-full text-tertiary-fixed-dim" />
                    ) : null}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
          {!isAuthenticated ? (
            <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4">
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="bg-secondary-container px-4 py-3 text-center font-label text-label-md tracking-wider text-on-secondary-container uppercase"
              >
                Giriş Yap
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="bg-primary-container px-4 py-3 text-center font-label text-label-md tracking-wider text-on-primary uppercase"
              >
                Topluluğa Katıl
              </Link>
            </div>
          ) : null}
        </div>
      ) : null}
    </header>
  )
}
