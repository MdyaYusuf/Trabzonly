import { Link } from 'react-router-dom'

export function PlayerDirectoryCta() {
  return (
    <section className="w-full bg-primary-container py-space-lg text-on-primary">
      <div className="mx-auto flex max-w-[1360px] flex-col items-center justify-between gap-space-lg px-4 sm:px-6 lg:flex-row lg:px-12">
        <div className="flex flex-col items-center gap-space-md text-center sm:flex-row sm:text-left">
          <div className="flex h-14 w-14 items-center justify-center bg-surface-container-lowest/10 p-2">
            <div className="flex h-10 w-10 flex-col items-center justify-center bg-primary text-tertiary-fixed-dim">
              <span className="text-lg leading-none">★</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-kicker text-kicker font-bold tracking-widest text-secondary-container uppercase">
              TARAFTAR PUANLAMASI
            </span>
            <h3 className="font-headline text-headline-md font-bold tracking-tight uppercase">
              HER MAÇ SONRASI 11&apos;İNİ VE OYUNCULARI SEN DE OYLA!
            </h3>
            <p className="font-body text-body-sm leading-normal text-primary-fixed">
              Bordo-Mavili renklere gönül veren 40.000+ taraftarın oluşturduğu haftalık ortalama
              oyuncu reytingine kendi analizini kat.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-stretch gap-space-sm sm:flex-row sm:items-center">
          <Link
            to="/gonderiler"
            className="bg-secondary-container px-space-lg py-3 text-center font-headline text-label-md font-bold tracking-wider text-on-secondary-container uppercase shadow-sm transition-colors hover:bg-surface-container-lowest"
          >
            Son Maçı Puanla
          </Link>
          <Link
            to="/kadrolar/olustur"
            className="bg-transparent px-space-md py-3 text-center font-headline text-label-md font-bold tracking-wider text-on-primary uppercase transition-colors hover:bg-white/10"
          >
            Kadronu Kur
          </Link>
        </div>
      </div>
    </section>
  )
}
