import { Link } from 'react-router-dom'

export function SiteFooter() {
  return (
    <footer className="w-full bg-surface-container-lowest py-space-xl text-on-surface">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-12">
        <div className="mb-space-xl grid grid-cols-1 gap-gutter md:grid-cols-12">
          <div className="flex flex-col gap-space-md md:col-span-5">
            <div className="flex items-baseline gap-space-xs">
              <span className="font-headline text-headline-md font-bold tracking-tight text-primary uppercase">
                TRABZONLY
              </span>
              <span className="h-2 w-2 rounded-full bg-secondary" />
            </div>
            <p className="max-w-md font-body text-body-md text-on-surface-variant">
              Karadeniz Fırtınası&apos;nın kalbi burada atıyor. Bordo-Mavi renklere gönül vermiş
              bağımsız taraftar topluluğu için gönderiler, kadrolar, quizler ve daha fazlası.
            </p>
            <div className="flex items-center gap-space-xs">
              <span className="inline-block h-3 w-3 rounded-full bg-secondary-container" />
              <span className="font-kicker text-kicker font-bold text-secondary uppercase">
                BİZE HER YER TRABZON
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-space-sm md:col-span-3">
            <span className="font-kicker text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
              Topluluk &amp; Keşfet
            </span>
            <div className="flex flex-col gap-space-xs">
              <Link
                to="/oyuncular"
                className="font-body text-body-sm text-on-surface-variant transition-colors hover:text-primary"
              >
                Oyuncular
              </Link>
              <Link
                to="/gonderiler"
                className="font-body text-body-sm text-on-surface-variant transition-colors hover:text-primary"
              >
                Taraftar Gönderileri
              </Link>
              <Link
                to="/kadrolar"
                className="font-body text-body-sm text-on-surface-variant transition-colors hover:text-primary"
              >
                Taraftar Kadroları
              </Link>
              <Link
                to="/mac-haftasi"
                className="font-body text-body-sm text-on-surface-variant transition-colors hover:text-primary"
              >
                Haftanın Kadrosu &amp; Puan Durumu &amp; Fikstür
              </Link>
              <Link
                to="/quizler"
                className="font-body text-body-sm text-on-surface-variant transition-colors hover:text-primary"
              >
                Trabzonspor Quizleri
              </Link>
              <Link
                to="/topluluk-kurallari"
                className="font-body text-body-sm text-on-surface-variant transition-colors hover:text-primary"
              >
                Topluluk Kuralları
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-space-sm md:col-span-4">
            <span className="font-kicker text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
              Bağlantıda Kalın
            </span>
            <p className="font-body text-body-sm text-on-surface-variant">
              Aşağıdaki mail adresi aracılığıyla bizimle iletişime geçebilirsiniz.
            </p>
            <a
              href="mailto:trabzonly@gmail.com"
              className="inline-flex items-center gap-space-sm text-on-surface transition-colors hover:text-primary"
            >
              <span className="flex items-center justify-center bg-surface-container p-space-xs">
                <span className="material-symbols-outlined">mail</span>
              </span>
              <span className="font-body text-body-sm">trabzonly@gmail.com</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-space-md pt-space-lg text-center md:flex-row md:text-left">
          <p className="font-body text-body-sm text-on-surface-variant">
            Trabzonly bağımsız bir Trabzonspor taraftar topluluğu platformudur, resmi kulüp sitesi
            değildir.
          </p>
          <p className="font-kicker text-kicker text-on-surface-variant uppercase">
            © {new Date().getFullYear()} TRABZONLY. TÜM HAKLARI SAKLIDIR.
          </p>
        </div>
      </div>
    </footer>
  )
}
