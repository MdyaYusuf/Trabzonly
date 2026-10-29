import { NavLink } from 'react-router-dom'
import { BrandLogo } from '@/core/components/BrandLogo'
import { adminShellProfile } from '@/features/admin/utils/adminHubPlaceholders'

type AdminNavPanelProps = {
  onNavigate?: () => void
  className?: string
}

export function AdminNavPanel({ onNavigate, className }: AdminNavPanelProps) {
  const shell = adminShellProfile

  return (
    <aside
      className={['flex h-full w-64 shrink-0 flex-col bg-primary text-on-primary', className]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex min-h-16 items-center gap-space-sm border-b border-white/10 px-space-md py-space-sm">
        <BrandLogo size={40} />
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
        className="flex flex-1 flex-col gap-1 overflow-y-auto px-space-md pt-space-lg pb-space-md"
        aria-label="Operasyonel menü"
      >
        <p className="font-kicker mb-space-md px-space-sm text-kicker tracking-widest text-secondary-container/80 uppercase">
          {shell.navHeading}
        </p>

        {shell.navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.to}
            end={item.to === '/yonetim'}
            onClick={onNavigate}
            className={({ isActive }) =>
              `font-label flex items-center gap-space-sm px-space-sm py-space-sm text-label-md transition-colors ${
                isActive
                  ? 'border-l-4 border-secondary-container bg-white/15 font-bold text-on-primary'
                  : 'border-l-4 border-transparent text-on-primary/75 hover:bg-white/10 hover:text-on-primary'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`material-symbols-outlined text-[20px] ${
                    isActive ? 'text-secondary-container' : 'text-on-primary/70'
                  }`}
                >
                  {item.icon}
                </span>
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
