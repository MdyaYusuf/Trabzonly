type PostCreateIconProps = {
  className?: string
  size?: number
}

export function PostCreateIcon({ className, size = 20 }: PostCreateIconProps) {
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
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <line x1="7" y1="8" x2="17" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="7" y1="12" x2="17" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="7" y1="16" x2="13" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
