import { Link } from 'react-router-dom'
import type { AdminModuleBadgeTone, AdminModuleCard } from '../utils/adminHubTypes'

type AdminModuleCardProps = {
  module: AdminModuleCard
}

const badgeClass: Record<AdminModuleBadgeTone, string> = {
  neutral: 'bg-surface-container-high text-on-surface-variant',
  warning: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
  success: 'bg-secondary-container/60 text-on-secondary-container',
  info: 'bg-secondary-fixed text-on-secondary-fixed-variant',
}

export function AdminModuleCardView({ module }: AdminModuleCardProps) {
  return (
    <article className="flex flex-col border border-outline-variant/40 bg-surface-container-lowest p-space-md transition-shadow hover:shadow-sm">
      <div className="mb-space-md flex items-start justify-between gap-space-sm">
        <div className="flex h-11 w-11 items-center justify-center bg-primary-container text-on-primary">
          <span className="material-symbols-outlined text-[24px]">{module.icon}</span>
        </div>
        <span
          className={`font-kicker px-space-sm py-1 text-kicker font-bold uppercase ${badgeClass[module.badgeTone]}`}
        >
          {module.badgeLabel}
        </span>
      </div>

      <h3 className="font-headline text-headline-sm font-bold text-primary">{module.title}</h3>
      <p className="font-body mt-space-xs flex-1 text-body-sm text-on-surface-variant">
        {module.description}
      </p>

      <div className="mt-space-md flex items-center justify-between gap-space-sm border-t border-outline-variant/30 pt-space-sm">
        <span className="font-kicker text-kicker text-on-surface-variant uppercase">
          {module.categoryLabel}
        </span>
        <Link
          to={module.to}
          className="font-label inline-flex items-center gap-1 bg-primary-container px-space-md py-space-xs text-label-md font-bold tracking-wider text-on-primary uppercase transition-all hover:bg-primary"
        >
          Modüle git
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </Link>
      </div>
    </article>
  )
}
