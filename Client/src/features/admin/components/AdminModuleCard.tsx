import { Link } from 'react-router-dom'
import type { AdminModuleCard } from '../utils/adminHubTypes'

type AdminModuleCardProps = {
  module: AdminModuleCard
}

export function AdminModuleCardView({ module }: AdminModuleCardProps) {
  return (
    <article className="flex h-full flex-col border border-outline-variant/40 bg-surface-container-lowest p-space-md shadow-sm transition-all duration-200 hover:-translate-y-1 hover:scale-[1.035] hover:shadow-lg">
      <div className="flex items-center gap-space-sm">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-container text-on-primary">
          <span className="material-symbols-outlined text-[22px]">{module.icon}</span>
        </div>
        <h3 className="font-headline text-headline-md font-bold text-secondary">{module.title}</h3>
      </div>

      <p className="font-body mt-space-md min-h-[4.5rem] text-body-sm text-on-surface-variant">
        {module.description}
      </p>

      <div className="mt-space-md flex justify-end border-t border-outline-variant/30 pt-space-sm">
        <Link
          to={module.to}
          className="font-label group/cta inline-flex w-fit cursor-pointer items-center gap-space-xs bg-gradient-to-r from-primary-container via-[#7a1235] to-primary px-space-md py-space-xs text-label-md font-bold tracking-wider text-on-primary uppercase shadow-sm transition-all hover:scale-[1.02] hover:shadow-md"
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
