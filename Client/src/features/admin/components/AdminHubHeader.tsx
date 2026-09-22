import type { AdminHubProfile } from '../utils/adminHubTypes'

type AdminHubHeaderProps = {
  profile: AdminHubProfile
}

export function AdminHubHeader({ profile }: AdminHubHeaderProps) {
  return (
    <header className="flex flex-col gap-space-md lg:flex-row lg:items-start lg:justify-between">
      <div className="flex max-w-3xl flex-col gap-space-sm">
        <h1 className="font-headline flex items-center gap-space-sm text-headline-lg font-extrabold tracking-tight text-primary uppercase">
          {profile.title}
          <span className="h-2.5 w-2.5 rounded-full bg-tertiary-fixed-dim" aria-hidden />
        </h1>
        <p className="font-body text-body-md text-on-surface-variant lg:text-body-lg">
          {profile.description}
        </p>
      </div>

      <div className="shrink-0 border border-outline-variant/40 bg-primary-fixed/40 px-space-md py-space-sm">
        <span className="font-kicker text-kicker text-on-surface-variant uppercase">
          {profile.permissionLabel}
        </span>
        <p className="font-label mt-1 text-label-md font-bold text-primary uppercase">
          {profile.permissionValue}
        </p>
      </div>
    </header>
  )
}
