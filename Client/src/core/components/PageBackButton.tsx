import { Link, useNavigate } from 'react-router-dom'

type PageBackButtonProps = {
  to: string
  label?: string
  /** When true, go back in history if possible; otherwise navigate to `to`. */
  preferHistory?: boolean
}

export function PageBackButton({
  to,
  label = 'Geri dön',
  preferHistory = false,
}: PageBackButtonProps) {
  const navigate = useNavigate()

  const className =
    'flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center bg-surface-container text-primary shadow-sm transition-colors hover:bg-primary hover:text-on-primary'

  const icon = (
    <span
      className="material-symbols-outlined text-[32px]"
      style={{ fontVariationSettings: "'FILL' 0, 'wght' 700, 'GRAD' 0, 'opsz' 32" }}
    >
      arrow_back
    </span>
  )

  if (preferHistory) {
    return (
      <button
        type="button"
        title={label}
        aria-label={label}
        className={className}
        onClick={() => {
          const historyIndex =
            typeof window.history.state?.idx === 'number' ? window.history.state.idx : 0

          if (historyIndex > 0) {
            navigate(-1)
            return
          }

          navigate(to)
        }}
      >
        {icon}
      </button>
    )
  }

  return (
    <Link to={to} title={label} aria-label={label} className={className}>
      {icon}
    </Link>
  )
}
