import { Link } from 'react-router-dom'
import type { AdminModuleCard } from '../utils/adminHubTypes'

type AdminModuleCardProps = {
  module: AdminModuleCard
}

export function AdminModuleCardView({ module }: AdminModuleCardProps) {
  return (
    <article className="flex flex-col border border-outline-variant/40 bg-surface-container-lowest p-space-md transition-shadow hover:shadow-sm">
      <div className="flex flex-1 items-center gap-space-md">
        <div className="flex min-w-0 w-4/5 flex-col gap-space-sm">
          <h3 className="font-headline text-headline-md font-bold text-primary">{module.title}</h3>
          <p className="font-body text-body-sm text-on-surface-variant">{module.description}</p>
        </div>

        <div className="flex w-1/5 shrink-0 items-center justify-center self-stretch">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-container text-on-primary">
            <span className="material-symbols-outlined text-[24px]">{module.icon}</span>
          </div>
        </div>
      </div>

      <div className="mt-space-md flex items-center justify-between gap-space-sm border-t border-outline-variant/30 pt-space-sm">
        <span className="font-kicker text-kicker text-secondary uppercase">
          {module.categoryLabel}
        </span>
        <Link
          to={module.to}
          className="font-label group/cta inline-flex cursor-pointer items-center gap-space-xs bg-gradient-to-r from-primary-container via-[#7a1235] to-primary px-space-md py-space-xs text-label-md font-bold tracking-wider text-on-primary uppercase shadow-sm transition-all hover:scale-[1.02] hover:shadow-md"
        >
          Modüle git
          <span className="material-symbols-outlined text-[18px] transition-transform group-hover/cta:translate-x-0.5">
            arrow_forward
          </span>
        </Link>
      </div>
    </article>
  )
}
