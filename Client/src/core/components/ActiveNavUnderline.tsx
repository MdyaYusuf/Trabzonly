type ActiveNavUnderlineProps = {
  className?: string
}

export function ActiveNavUnderline({ className }: ActiveNavUnderlineProps) {
  return (
    <svg aria-hidden viewBox="0 0 100 6" preserveAspectRatio="none" className={className}>
      <path
        d="M2 4.2 C 28 1.2, 72 1.2, 98 4.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}
