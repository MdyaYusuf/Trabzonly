import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { authService } from '@/features/auth/authService'
import { AdminSidebar } from '@/features/admin/components/AdminSidebar'
import { AdminTopBar } from '@/features/admin/components/AdminTopBar'
import { adminShellProfile } from '@/features/admin/utils/adminHubPlaceholders'

export function AdminLayout() {
  const navigate = useNavigate()
  const shell = adminShellProfile

  function handleLogout() {
    authService.logout()
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen bg-background text-on-surface">
      <div className="hidden lg:flex">
        <AdminSidebar />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="lg:hidden">
          <div className="flex items-center justify-between bg-primary px-space-md py-space-sm text-on-primary">
            <div className="flex flex-col">
              <span className="font-headline text-sm font-extrabold uppercase">
                {shell.brandTitle}
              </span>
              <span className="font-kicker text-[10px] tracking-widest text-secondary-container uppercase">
                {shell.brandSubtitle}
              </span>
            </div>
            <span className="font-label text-label-md">{shell.adminName}</span>
          </div>
          <nav
            aria-label="Operasyonel menü"
            className="flex gap-1 overflow-x-auto border-b border-outline-variant/40 bg-primary-container px-space-sm py-space-xs"
          >
            {shell.navItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.to}
                end={item.to === '/yonetim'}
                className={({ isActive }) =>
                  `font-label shrink-0 px-space-sm py-space-xs text-label-md uppercase transition-colors ${
                    isActive
                      ? 'bg-primary font-bold text-on-primary'
                      : 'text-on-primary/80 hover:text-on-primary'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <AdminTopBar onLogout={handleLogout} />

        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>

        <footer className="flex flex-col gap-space-xs border-t border-outline-variant/40 bg-surface-container-lowest px-space-md py-space-sm sm:flex-row sm:items-center sm:justify-between lg:px-space-lg">
          <p className="font-body text-body-sm text-on-surface-variant">{shell.footerLeft}</p>
          <p className="font-kicker text-kicker text-primary uppercase">{shell.footerRight}</p>
        </footer>
      </div>
    </div>
  )
}
