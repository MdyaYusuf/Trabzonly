import { Link, useLocation } from 'react-router-dom'
import { PageBackButton } from '@/core/components/PageBackButton'
import { resolveAdminBreadcrumb } from '../utils/adminBreadcrumbs'
import { AdminAccountMenu } from './AdminAccountMenu'

type AdminTopBarProps = {
  onMenuClick?: () => void
}

export function AdminTopBar({ onMenuClick }: AdminTopBarProps) {
  const location = useLocation()
  const crumb = resolveAdminBreadcrumb(location.pathname)

  return (
    <header className="flex min-h-16 flex-wrap items-center justify-between gap-space-sm border-b border-outline-variant/40 bg-gradient-to-r from-secondary-fixed/55 via-surface-container-lowest to-primary-fixed/45 px-6 py-space-sm sm:px-10 lg:px-16">
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-space-sm sm:gap-space-md">
        {onMenuClick ? (
          <button
            type="button"
            className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center bg-surface-container text-primary transition-colors hover:bg-primary hover:text-on-primary lg:hidden"
            aria-label="Menüyü aç"
            onClick={onMenuClick}
          >
            <span className="material-symbols-outlined text-[28px]">menu</span>
          </button>
        ) : null}

        {crumb.backTo ? (
          <PageBackButton to={crumb.backTo} label={crumb.backLabel ?? 'Geri dön'} />
        ) : null}

        <nav
          aria-label="Breadcrumb"
          className="font-label flex min-w-0 flex-1 flex-wrap items-center gap-space-xs text-label-md text-on-surface-variant"
        >
          {crumb.segments.map((segment, index) => {
            const isLast = index === crumb.segments.length - 1

            return (
              <span key={`${segment.label}-${index}`} className="flex items-center gap-space-xs">
                {index > 0 ? (
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                ) : null}
                {segment.to && !isLast ? (
                  <Link to={segment.to} className="transition-colors hover:text-primary">
                    {segment.label}
                  </Link>
                ) : (
                  <span className={isLast ? 'font-bold text-primary' : undefined}>
                    {segment.label}
                  </span>
                )}
              </span>
            )
          })}
        </nav>
      </div>

      <AdminAccountMenu />
    </header>
  )
}
