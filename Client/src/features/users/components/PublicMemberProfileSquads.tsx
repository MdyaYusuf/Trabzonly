import { Link } from 'react-router-dom'
import type { PublicMemberSquad } from '../utils/publicMemberProfileTypes'

type PublicMemberProfileSquadsProps = {
  squads: PublicMemberSquad[]
  totalCount: number
}

export function PublicMemberProfileSquads({
  squads,
  totalCount,
}: PublicMemberProfileSquadsProps) {
  return (
    <section className="flex flex-col gap-space-md">
      <div className="flex flex-wrap items-center justify-between gap-space-sm border-b border-outline-variant/40 pb-space-sm">
        <div className="flex items-center gap-space-xs">
          <span className="h-3 w-3 bg-primary" />
          <h2 className="font-headline text-headline-sm font-extrabold text-primary uppercase">
            Üyenin Taktik Kadroları & İlk 11&apos;leri
          </h2>
        </div>
        <Link
          to="/kadrolar"
          className="font-label inline-flex items-center gap-1 text-label-md font-bold text-secondary uppercase transition-colors hover:text-primary"
        >
          Tüm {totalCount} Kadroyu Gör
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
        {squads.map((squad) => (
          <article
            key={squad.id}
            className="flex flex-col border border-outline-variant/40 bg-surface-container-lowest"
          >
            <div className={`relative h-28 bg-gradient-to-br ${squad.pitchTone}`}>
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    'linear-gradient(90deg, transparent 49%, rgba(255,255,255,0.2) 50%, transparent 51%), linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
                  backgroundSize: '100% 100%, 100% 20%',
                }}
              />
              <div className="absolute top-2 left-2 flex items-center gap-space-sm">
                <span className="font-kicker bg-black/50 px-space-sm py-1 text-kicker text-white uppercase">
                  {squad.formation}
                </span>
                <span className="font-label flex items-center gap-0.5 bg-black/50 px-space-sm py-1 text-label-md text-tertiary-fixed-dim">
                  <span
                    className="material-symbols-outlined text-[14px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  {squad.rating}
                  <span className="text-white/70">{squad.votesLabel}</span>
                </span>
              </div>
              <span className="font-kicker absolute right-2 bottom-2 bg-black/50 px-space-xs py-0.5 text-kicker text-white/80 uppercase">
                {squad.boardLabel}
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-space-sm p-space-md">
              <h3 className="font-headline text-headline-sm font-bold text-primary uppercase">
                {squad.title}
              </h3>
              <p className="font-body text-body-sm text-on-surface-variant">
                <span className="font-bold text-on-surface">Kritik Oyuncular:</span>{' '}
                {squad.keyPlayers}
              </p>
              <p className="font-body text-body-sm text-on-surface-variant">{squad.tacticLabel}</p>
              <div className="mt-auto pt-space-sm">
                <Link
                  to={`/kadrolar/${squad.id}`}
                  className="font-label inline-flex w-full items-center justify-center bg-primary-container px-space-md py-space-sm text-label-md font-bold tracking-wider text-on-primary uppercase transition-all hover:bg-primary"
                >
                  Görüntüle
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
