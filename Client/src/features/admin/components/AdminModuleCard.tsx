import { Link } from 'react-router-dom'
import type { AdminModuleCard } from '../utils/adminHubTypes'

type AdminModuleCardProps = {
  module: AdminModuleCard
}

export function AdminModuleCardView({ module }: AdminModuleCardProps) {
  return (
    <Link
      to={module.to}
      className="group flex h-full cursor-pointer flex-col border border-outline-variant/40 bg-surface-container-lowest p-space-md shadow-sm transition-all duration-200 hover:-translate-y-1 hover:scale-[1.035] hover:shadow-lg"
    >
      <div className="flex items-center gap-space-sm">
        <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-container text-on-primary">
          <span className="material-symbols-outlined text-[20px]">{module.icon}</span>
          {module.hasUnreadHint ? (
            <span
              className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-surface-container-lowest"
              aria-label="Okunmamış mesaj var"
            />
          ) : null}
        </div>
        <h3 className="font-headline min-w-0 text-[1.125rem] leading-none font-bold tracking-tight text-secondary whitespace-nowrap">
          {module.title}
        </h3>
      </div>

      <p className="font-body mt-space-md mb-space-md flex-1 text-body-sm leading-snug text-on-surface-variant">
        {module.description}
      </p>

      <div className="mt-auto flex justify-end border-t border-outline-variant/30 pt-space-sm">
        <span className="font-label inline-flex w-fit items-center gap-space-xs bg-gradient-to-r from-primary-container via-[#7a1235] to-primary px-space-md py-space-xs text-label-md font-bold tracking-wider text-on-primary uppercase shadow-sm transition-all group-hover:scale-[1.02] group-hover:shadow-md">
          Modüle git
          <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-0.5">
            arrow_forward
          </span>
        </span>
      </div>
    </Link>
  )
}
