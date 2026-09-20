import { Link } from 'react-router-dom'
import { leagueCta } from '../utils/mySquadsPlaceholders'

export function MySquadsCta() {
  return (
    <section className="relative mt-space-xl overflow-hidden bg-primary p-space-lg text-on-primary shadow-md">
      <div className="relative z-10 grid grid-cols-1 items-center gap-space-lg lg:grid-cols-12">
        <div className="flex flex-col gap-space-xs lg:col-span-8">
          <div className="flex items-center gap-space-xs">
            <span
              className="material-symbols-outlined text-[22px] text-tertiary-fixed-dim"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              emoji_events
            </span>
            <span className="font-kicker text-kicker font-bold tracking-widest text-tertiary-fixed-dim uppercase">
              TRABZONLY TARAFTAR STRATEJİ LİGİ
            </span>
          </div>
          <h2 className="font-headline text-headline-md font-bold tracking-tight text-on-primary uppercase">
            Haftanın Taktisyeni Olmaya Hazır Mısınız?
          </h2>
          <p className="font-body max-w-2xl text-body-md leading-relaxed text-on-primary/80">
            Herkese açık olarak yayınladığınız kadrolar maç haftasında taraftarlar tarafından
            oylanır. En yüksek puanı alan 11, maç günü ana sayfa vitrininde{' '}
            <strong>&quot;Haftanın Taraftar Kadrosu&quot;</strong> unvanıyla on binlerce
            Bordo-Maviliye duyurulur.
          </p>
          <div className="font-label mt-space-sm flex flex-wrap items-center gap-space-md text-label-md text-on-primary/90">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px] text-secondary-container">
                check_circle
              </span>
              <span>Haftalık Taraftar Rozeti</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px] text-secondary-container">
                check_circle
              </span>
              <span>Akyazı Skor Bülteninde Yayın</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px] text-secondary-container">
                check_circle
              </span>
              <span>Özel Taktikçi Profil Başlığı</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-center lg:col-span-4 lg:items-end">
          <div className="w-full max-w-xs bg-primary-container p-space-md text-center">
            <span className="font-kicker block text-kicker font-bold tracking-wider text-tertiary-fixed-dim uppercase">
              BU HAFTAKİ LİDER PUANI
            </span>
            <div className="font-stat my-1 text-stat-counter font-bold text-on-primary">
              {leagueCta.leaderScore}
            </div>
            <span className="font-body block text-body-sm text-on-primary/80">
              {leagueCta.leaderSquad}
            </span>
            <Link
              to="/kadrolar"
              className="font-label mt-space-md inline-block w-full bg-secondary-container py-2 text-label-md font-bold text-on-secondary-container uppercase transition-colors hover:bg-surface-container-lowest"
            >
              Lig Sıralamasını Gör
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
