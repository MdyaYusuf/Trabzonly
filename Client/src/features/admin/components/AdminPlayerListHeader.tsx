type AdminPlayerListHeaderProps = {
  title: string
  description: string
}

export function AdminPlayerListHeader({ title, description }: AdminPlayerListHeaderProps) {
  return (
    <header className="flex max-w-3xl flex-col gap-space-xs">
      <h1 className="font-headline text-headline-lg font-extrabold tracking-tight text-primary uppercase">
        {title}
      </h1>
      <p className="font-body text-body-md text-on-surface-variant">{description}</p>
    </header>
  )
}
