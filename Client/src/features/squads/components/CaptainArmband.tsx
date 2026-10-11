type CaptainArmbandProps = {
  side: 'left' | 'right'
  className?: string
}

export function CaptainArmband({ side, className }: CaptainArmbandProps) {
  const sideClass = side === 'left' ? '-left-2.5' : '-right-2.5'
  const extraClass = className ? ` ${className}` : ''

  return (
    <span
      title="Kaptan"
      className={`absolute -top-1 ${sideClass} flex h-[21px] w-[26px] flex-col items-stretch overflow-hidden rounded-[3px] bg-[#111111] shadow-md${extraClass}`}
    >
      <span className="h-[3px] shrink-0" aria-hidden="true" />
      <span className="h-px w-full shrink-0 bg-[#f5d76e]" />
      <span className="flex min-h-0 flex-1 items-center justify-center">
        <span
          className="font-kicker text-[12px] font-black leading-none text-[#f5d76e]"
          style={{ WebkitTextStroke: '0.4px #f5d76e' }}
        >
          C
        </span>
      </span>
      <span className="h-px w-full shrink-0 bg-[#f5d76e]" />
      <span className="h-[3px] shrink-0" aria-hidden="true" />
    </span>
  )
}
