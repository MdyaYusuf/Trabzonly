import { Link } from 'react-router-dom'
import { PostCreateIcon } from './PostCreateIcon'

export function PostsFeedCta() {
  return (
    <section className="relative w-full overflow-hidden bg-primary-container py-space-xl">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <div className="absolute top-1/2 left-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[48px] border-white" />
        <div className="absolute top-1/2 left-1/2 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[8px] border-white" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1360px] flex-col items-start justify-between gap-space-xl px-4 sm:px-6 lg:flex-row lg:items-center lg:px-12">
        <div className="max-w-3xl">
          <div className="mb-space-xs flex flex-wrap items-center gap-space-xs">
            <span className="font-kicker bg-secondary px-2 py-0.5 text-kicker font-bold tracking-wider text-white uppercase">
              TRIBÜN YAZISI
            </span>
          </div>
          <h2 className="font-headline mb-space-sm text-headline-md font-bold tracking-tight text-white uppercase lg:text-headline-lg">
            Fikrini Yaz, Taraftar Topluluğuna Katıl
          </h2>
          <p className="font-body text-body-md text-white/90">
            Maç analizi, transfer yorumu veya form tartışmanı kaleme al. Beğeni topla,
            yorumlara katıl ve Bordo-Mavi sohbetin sesi ol.
          </p>
          <div className="font-body mt-space-md flex flex-wrap items-center gap-space-lg text-[13px] text-white/80">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-secondary-container">
                edit_note
              </span>
              Analizini paylaş
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-tertiary-fixed">
                thumb_up
              </span>
              Beğeni topla
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-white">forum</span>
              Tartışmaya katıl
            </span>
          </div>
        </div>

        <div className="relative z-10 w-full shrink-0 lg:w-auto">
          <Link
            to="/gonderiler/yeni"
            className="font-headline flex items-center justify-center gap-space-sm bg-secondary-container px-space-xl py-space-md text-headline-sm font-extrabold tracking-wider text-on-secondary-container uppercase shadow-md transition-all hover:bg-surface-container-lowest"
          >
            <PostCreateIcon size={24} />
            <span>ŞİMDİ GÖNDERİ YAZ</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
