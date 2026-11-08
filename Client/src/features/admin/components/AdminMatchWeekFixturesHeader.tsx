import { Link } from 'react-router-dom'

export function AdminMatchWeekFixturesHeader() {
  return (
    <header className="flex max-w-3xl flex-col gap-space-xs">
      <h1 className="font-headline text-headline-lg font-extrabold tracking-tight text-primary uppercase">
        Fikstür
      </h1>
      <p className="font-body text-body-md text-on-surface-variant">
        Aktif sezon haftalarını düzenle, maç saatlerini ve skorları güncelle. Gösterilen hafta
        genel sitede varsayılan fikstür haftasını belirler.
      </p>
      <Link
        to="/yonetim/mac-haftasi/kadro"
        className="font-label w-fit text-label-md text-primary uppercase underline-offset-2 hover:underline"
      >
        Maç haftası kadrosuna git
      </Link>
    </header>
  )
}
