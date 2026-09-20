import { Link } from 'react-router-dom'
import { mySquadsStats } from '../utils/mySquadsPlaceholders'

export function MySquadsHero() {
  return (
    <section className="w-full bg-surface">
      <div className="mx-auto max-w-[1360px] px-4 pt-space-md pb-space-lg sm:px-6 lg:px-12">
        <nav
          aria-label="Breadcrumb"
          className="font-label mb-space-md flex items-center gap-space-xs text-label-md text-on-surface-variant"
        >
          <Link to="/" className="flex items-center gap-1 transition-colors hover:text-primary">
            <span className="material-symbols-outlined text-[16px]">home</span>
            <span>Ana Sayfa</span>
          </Link>
          <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
          <Link to="/kadrolar" className="transition-colors hover:text-primary">
            Kadrolar
          </Link>
          <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
          <span className="font-bold text-primary">Benim Kadrolarım</span>
        </nav>

        <div className="flex flex-col justify-between gap-space-lg pb-space-lg lg:flex-row lg:items-end">
          <div className="flex max-w-2xl flex-col">
            <div className="mb-space-xs flex items-center gap-space-xs">
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              <span className="font-kicker text-kicker font-bold tracking-widest text-secondary uppercase">
                TRABZONSPOR TAKTİK LABORATUVARI
              </span>
            </div>
            <h1 className="font-headline text-headline-lg font-bold tracking-tight text-primary uppercase">
              BENİM KADROLARIM
            </h1>
            <p className="font-body mt-space-xs text-body-md leading-relaxed text-on-surface-variant">
              Oluşturduğunuz taktik dizilişler, topluluk puanlamaları ve maç stratejileri. Bordo-Mavi
              fırtınayı saha içine yansıtın, taraftarın takdirine sunun.
            </p>
          </div>
          <div className="flex items-center gap-space-sm">
            <Link
              to="/kadrolar/olustur"
              className="font-label group flex items-center gap-space-xs bg-primary px-space-lg py-space-sm text-label-md tracking-wider text-on-primary uppercase shadow-md transition-all hover:bg-primary-container"
            >
              <span className="material-symbols-outlined text-tertiary-fixed-dim transition-transform group-hover:rotate-90">
                add_circle
              </span>
              <span className="font-bold">+ YENİ KADRO OLUŞTUR</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-gutter bg-surface-container-low p-space-md pt-space-md md:grid-cols-4">
          <div className="flex flex-col">
            <span className="font-kicker text-kicker tracking-wider text-on-surface-variant uppercase">
              TOPLAM KADRO
            </span>
            <div className="mt-0.5 flex items-baseline gap-space-xs">
              <span className="font-headline text-headline-md font-bold text-primary">
                {mySquadsStats.total}
              </span>
              <span className="font-body text-body-sm text-on-surface-variant">
                {mySquadsStats.totalCaption}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-kicker text-kicker tracking-wider text-on-surface-variant uppercase">
              ORTALAMA PUAN
            </span>
            <div className="mt-0.5 flex items-baseline gap-space-xs">
              <span className="font-headline flex items-center gap-1 text-headline-md font-bold text-tertiary-container">
                <span
                  className="material-symbols-outlined text-[20px] text-tertiary-fixed-dim"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>{' '}
                {mySquadsStats.avgRating}
              </span>
              <span className="font-body text-body-sm text-on-surface-variant">
                {mySquadsStats.avgCaption}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-kicker text-kicker tracking-wider text-on-surface-variant uppercase">
              TOPLAM GÖRÜNTÜLENME
            </span>
            <div className="mt-0.5 flex items-baseline gap-space-xs">
              <span className="font-headline text-headline-md font-bold text-secondary">
                {mySquadsStats.views}
              </span>
              <span className="font-body text-body-sm text-on-surface-variant">
                {mySquadsStats.viewsCaption}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-kicker text-kicker tracking-wider text-on-surface-variant uppercase">
              TARTIŞMA & YORUM
            </span>
            <div className="mt-0.5 flex items-baseline gap-space-xs">
              <span className="font-headline text-headline-md font-bold text-on-surface">
                {mySquadsStats.comments}
              </span>
              <span className="font-body text-body-sm text-on-surface-variant">
                {mySquadsStats.commentsCaption}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
