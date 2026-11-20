import { Link } from 'react-router-dom'
import { BrandLogo } from '@/core/components/BrandLogo'

export type StatusPageAction = {
  label: string
  icon: string
  variant: 'primary' | 'secondary'
  to?: string
  onClick?: () => void
}

type StatusPageLayoutProps = {
  kicker: string
  code: string
  title: string
  description: string
  metaIcon?: string
  metaLabel?: string
  actions: StatusPageAction[]
  footnote?: string
}

function actionClassName(variant: StatusPageAction['variant']) {
  if (variant === 'primary') {
    return 'font-label inline-flex w-full items-center justify-center gap-1.5 bg-primary-container px-8 py-3.5 text-label-md font-bold tracking-wider text-on-primary uppercase shadow-sm transition-all duration-200 hover:bg-primary active:scale-95 sm:w-auto'
  }

  return 'font-label inline-flex w-full items-center justify-center gap-1.5 bg-secondary px-8 py-3.5 text-label-md font-bold tracking-wider text-on-secondary uppercase shadow-sm transition-all duration-200 hover:bg-on-secondary-container active:scale-95 sm:w-auto'
}

export function StatusPageLayout({
  kicker,
  code,
  title,
  description,
  metaIcon,
  metaLabel,
  actions,
  footnote,
}: StatusPageLayoutProps) {
  return (
    <main className="relative flex min-h-[calc(100vh-8rem)] w-full flex-col items-center justify-center bg-background px-4 py-space-xl pt-16 sm:px-6 sm:pt-20 lg:px-12">
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-40">
        <div className="h-[420px] w-[420px] bg-gradient-to-tr from-secondary-fixed/50 via-surface-container-high/30 to-transparent blur-3xl md:h-[560px] md:w-[560px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-2xl flex-col items-center text-center">
        <BrandLogo size={72} className="mb-space-md" />

        <div className="mb-space-xl inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-secondary" />
          <span className="font-kicker text-kicker font-bold tracking-[0.22em] text-on-surface-variant uppercase">
            {kicker}
          </span>
        </div>

        <div className="flex w-full flex-col items-center justify-center">
          <span className="font-display text-[56px] leading-none font-extrabold tracking-tighter text-surface-container-highest md:text-[80px]">
            {code}
          </span>
          <h1 className="font-headline mt-space-sm text-headline-lg font-extrabold tracking-tight text-primary uppercase md:text-display-xl">
            {title}
          </h1>
          <div className="mt-3 h-1 w-16 bg-secondary" />
        </div>

        <div className="mt-space-lg mx-auto max-w-lg">
          <p className="font-body text-body-lg leading-relaxed text-on-surface">{description}</p>

          {metaIcon && metaLabel ? (
            <div className="mt-space-md inline-flex items-center justify-center gap-1.5 bg-surface-container px-space-md py-space-xs font-label text-[11px] font-bold tracking-wider text-primary uppercase">
              <span className="material-symbols-outlined text-[16px] text-secondary">{metaIcon}</span>
              {metaLabel}
            </div>
          ) : null}
        </div>

        <div className="mt-space-xl flex w-full max-w-md flex-col items-center justify-center gap-space-md sm:flex-row">
          {actions.map((action) => {
            const className = actionClassName(action.variant)
            const content = (
              <>
                <span className="material-symbols-outlined text-[18px]">{action.icon}</span>
                {action.label}
              </>
            )

            if (action.onClick) {
              return (
                <button
                  key={action.label}
                  type="button"
                  onClick={action.onClick}
                  className={`${className} cursor-pointer`}
                >
                  {content}
                </button>
              )
            }

            return (
              <Link key={action.to ?? action.label} to={action.to ?? '/'} className={className}>
                {content}
              </Link>
            )
          })}
        </div>

        {footnote ? (
          <div className="font-body mt-space-xl flex items-center justify-center gap-space-xs pt-space-md text-body-sm text-on-surface-variant/80">
            <span className="material-symbols-outlined text-[16px] text-outline">help_outline</span>
            <span>{footnote}</span>
          </div>
        ) : null}
      </div>
    </main>
  )
}
