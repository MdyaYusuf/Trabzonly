import { Link } from 'react-router-dom'

type PageBackButtonProps = {
  to: string
  label?: string
}

export function PageBackButton({
  to,
  label = 'Geri dön',
}: PageBackButtonProps) {
  return (
    <Link
      to={to}
      title={label}
      aria-label={label}
      className="flex h-12 w-12 shrink-0 items-center justify-center bg-surface-container text-primary shadow-sm transition-colors hover:bg-primary hover:text-on-primary"
    >
      <span
        className="material-symbols-outlined text-[32px]"
        style={{ fontVariationSettings: "'FILL' 0, 'wght' 700, 'GRAD' 0, 'opsz' 32" }}
      >
        arrow_back
      </span>
    </Link>
  )
}
