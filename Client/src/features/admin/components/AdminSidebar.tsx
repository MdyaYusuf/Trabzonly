import { Link, NavLink } from 'react-router-dom'
import { adminShellProfile } from '@/features/admin/utils/adminHubPlaceholders'

export function AdminSidebar() {
  const shell = adminShellProfile

  return (
    <aside className="flex w-64 shrink-0 flex-col bg-primary text-on-primary">
      <div className="flex items-center gap-space-sm border-b border-white/10 px-space-md py-space-md">
        <div className="flex h-10 w-10 items-center justify-center bg-primary-container">
          <span
            className="material-symbols-outlined text-[22px] text-tertiary-fixed-dim"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            sports_soccer
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-headline text-headline-sm font-extrabold tracking-tight uppercase">
            {shell.brandTitle}
          </span>
          <span className="font-kicker text-kicker tracking-widest text-secondary-container uppercase">
            {shell.brandSubtitle}
          </span>
        </div>
      </div>

      <nav
        className="flex flex-1 flex-col gap-1 overflow-y-auto p-space-md"
        aria-label="Operasyonel menü"
      >
        <p className="font-kicker mb-space-sm px-space-sm text-kicker tracking-widest text-secondary-container/80 uppercase">
          {shell.navHeading}
        </p>

        {shell.navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.to}
            end={item.to === '/yonetim'}
            className={({ isActive }) =>
              `font-label flex items-center justify-between gap-space-sm px-space-sm py-space-sm text-label-md transition-colors ${
                isActive
                  ? 'border-l-4 border-secondary-container bg-white/15 font-bold text-on-primary'
                  : 'border-l-4 border-transparent text-on-primary/75 hover:bg-white/10 hover:text-on-primary'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="flex items-center gap-space-sm">
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      isActive ? 'text-secondary-container' : 'text-on-primary/70'
                    }`}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </span>
                {item.badgeTone === 'alert' && (
                  <span className="h-2 w-2 rounded-full bg-tertiary-fixed-dim" aria-hidden />
                )}
                {item.badge && item.badgeTone !== 'alert' && (
                  <span className="font-kicker bg-black/25 px-space-xs py-0.5 text-kicker text-on-primary/80">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto border-t border-white/10 px-space-md py-space-md">
        <div className="flex items-center gap-space-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-primary-container font-headline text-sm font-bold">
            {shell.adminInitials}
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="font-label truncate text-label-md font-bold">{shell.adminName}</span>
            <span className="font-body truncate text-body-sm text-on-primary/70">
              {shell.adminRole}
            </span>
          </div>
        </div>
        <Link
          to="/"
          className="font-label mt-space-sm hidden text-label-md text-on-primary/60 underline-offset-2 hover:text-on-primary hover:underline lg:hidden"
        >
          Siteye dön
        </Link>
      </div>
    </aside>
  )
}
