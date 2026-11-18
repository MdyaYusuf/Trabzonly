export function AdminContactMessageListHeader() {
  return (
    <header className="flex max-w-3xl flex-col gap-space-xs">
      <h1 className="font-headline text-headline-lg font-extrabold tracking-tight text-primary uppercase">
        Gelen Mesajlar
      </h1>
      <p className="font-body text-body-md text-on-surface-variant">
        Üyelerin sorun ve öneri mesajlarını okuyun, okundu işaretleyin veya silin.
      </p>
    </header>
  )
}
