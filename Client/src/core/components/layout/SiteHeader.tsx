import { Link, NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { ActiveNavUnderline } from '@/core/components/ActiveNavUnderline'
import { BrandLogo } from '@/core/components/BrandLogo'
import { SiteHeaderAccountMenu } from '@/core/components/layout/SiteHeaderAccountMenu'
import { useAppSelector } from '@/core/store/hooks'

const navItems = [
  { to: '/oyuncular', label: 'Oyuncular' },
  { to: '/gonderiler', label: 'Gönderiler' },
  { to: '/kadrolar', label: 'Kadrolar' },
  { to: '/mac-haftasi', label: 'Maç Haftası' },
  { to: '/quizler', label: 'Quizler' },
] as const

const loginButtonClass =
  'font-label inline-flex h-10 items-center border border-secondary-container/45 bg-on-primary/5 px-5 text-label-md tracking-wider text-on-primary uppercase transition-all hover:border-secondary-container hover:bg-secondary-container/20'

const registerButtonClass =
  'font-label inline-flex h-10 items-center gap-1.5 bg-gradient-to-r from-[#7a1235] via-primary-container to-secondary px-5 text-label-md font-bold tracking-wider text-on-primary uppercase shadow-[0_4px_14px_rgba(18,100,142,0.35)] transition-all hover:brightness-110 hover:shadow-[0_6px_18px_rgba(18,100,142,0.45)]'

export function SiteHeader() {
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const { pathname } = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isHome = pathname === '/'

  return (
    <header
      className={[
        'fixed top-0 right-0 left-0 z-50 w-full bg-gradient-to-r from-[#0d4a6e] via-primary to-[#0d4a6e]',
        isHome ? 'shadow-[0_16px_40px_-12px_rgba(13,74,110,0.55)]' : '',
      ].join(' ')}
    >
      <div className="mx-auto grid h-16 w-full max-w-[1520px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-10 px-6 sm:h-20 sm:gap-14 sm:px-10 lg:gap-16 lg:px-14 xl:px-16">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-3"
          onClick={() => setMobileOpen(false)}
        >
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

        <nav className="hidden min-w-0 items-center justify-center gap-1 lg:flex xl:gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  'px-3 py-1 font-label text-label-md uppercase transition-colors xl:px-3.5',
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

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          {isAuthenticated ? (
            <SiteHeaderAccountMenu />
          ) : (
            <>
              <Link to="/login" className={loginButtonClass}>
                Giriş Yap
              </Link>
              <Link to="/register" className={registerButtonClass}>
                Topluluğa Katıl
                <span className="material-symbols-outlined text-[16px] leading-none">
                  arrow_forward
                </span>
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 lg:hidden">
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
        <div className="border-t border-white/10 bg-primary/90 px-6 py-4 backdrop-blur-sm sm:px-10 lg:hidden">
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
            <div className="mt-4 flex flex-col gap-2.5 border-t border-white/10 pt-4">
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className={`${loginButtonClass} w-full justify-center`}
              >
                Giriş Yap
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                className={`${registerButtonClass} w-full justify-center`}
              >
                Topluluğa Katıl
                <span className="material-symbols-outlined text-[16px] leading-none">
                  arrow_forward
                </span>
              </Link>
            </div>
          ) : null}
        </div>
      ) : null}
    </header>
  )
}
