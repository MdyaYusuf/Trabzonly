type BrandLogoProps = {
  size?: number
  className?: string
  alt?: string
}

export function BrandLogo({
  size = 32,
  className,
  alt = 'Trabzonly',
}: BrandLogoProps) {
  return (
    <img
      src="/assets/brand/trabzonly-logo.svg"
      alt={alt}
      width={size}
      height={size}
      decoding="async"
      className={['shrink-0 object-contain', className].filter(Boolean).join(' ')}
    />
  )
}
