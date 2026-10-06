type SquadCreateIconProps = {
  className?: string
  size?: number
}

export function SquadCreateIcon({ className, size = 22 }: SquadCreateIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className ?? 'shrink-0'}
    >
      <rect
        x="2.5"
        y="3.5"
        width="19"
        height="17"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <line x1="12" y1="3.5" x2="12" y2="20.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="12" cy="6.2" r="1.15" fill="currentColor" />
      <circle cx="7.2" cy="9.4" r="1.05" fill="currentColor" />
      <circle cx="16.8" cy="9.4" r="1.05" fill="currentColor" />
      <circle cx="5.6" cy="14.2" r="1.05" fill="currentColor" />
      <circle cx="18.4" cy="14.2" r="1.05" fill="currentColor" />
      <circle cx="12" cy="17.6" r="1.15" fill="currentColor" />
    </svg>
  )
}
