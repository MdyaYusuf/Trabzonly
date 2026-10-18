import { Link } from 'react-router-dom'
import type { SquadDetailViewModel, SquadInstructionRow } from '../utils/squadDetailTypes'

type SquadDetailSidebarProps = {
  squad: SquadDetailViewModel
}

const instructionMeta: Record<
  string,
  { icon: string; accentClass: string; iconClass: string }
> = {
  'Hücum Anlayışı': {
    icon: 'rocket_launch',
    accentClass: 'bg-primary/10',
    iconClass: 'text-primary',
  },
  'Savunma Çizgisi': {
    icon: 'shield',
    accentClass: 'bg-secondary/15',
    iconClass: 'text-secondary',
  },
  Tempo: {
    icon: 'speed',
    accentClass: 'bg-tertiary-container/20',
    iconClass: 'text-tertiary',
  },
  Kaptan: {
    icon: 'military_tech',
    accentClass: 'bg-[#f5d76e]/20',
    iconClass: 'text-[#b8860b]',
  },
  'Duran Top Sorumluları': {
    icon: 'sports',
    accentClass: 'bg-primary/10',
    iconClass: 'text-primary',
  },
}

function InstructionCard({ item }: { item: SquadInstructionRow }) {
  const meta = instructionMeta[item.title] ?? {
    icon: 'tune',
    accentClass: 'bg-surface-container',
    iconClass: 'text-on-surface-variant',
  }

  const isSetPieces = item.title === 'Duran Top Sorumluları'
  const [cornerName, freeKickName] = isSetPieces
    ? item.value.split('|')
    : [item.value, '']

  return (
    <div
      className={`flex gap-space-sm border border-outline-variant/25 bg-surface-container-low p-space-sm transition-colors hover:border-primary/30 hover:bg-surface-container ${
        isSetPieces ? 'items-center' : 'items-start'
      }`}
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center ${meta.accentClass}`}
      >
        <span className={`material-symbols-outlined text-[22px] ${meta.iconClass}`}>
          {meta.icon}
        </span>
      </span>
      <div className="min-w-0 flex-1">
        <span className="font-kicker text-[10px] font-bold tracking-wider text-on-surface-variant uppercase">
          {item.title}
        </span>
        {isSetPieces ? (
          <div className="mt-1.5 flex flex-col gap-1">
            <p className="font-headline text-[15px] leading-snug text-on-surface">
              <span className="font-kicker text-[11px] font-bold text-secondary uppercase">
                Korner:{' '}
              </span>
              <span className="font-bold text-on-surface">{cornerName || '—'}</span>
            </p>
            <p className="font-headline text-[15px] leading-snug text-on-surface">
              <span className="font-kicker text-[11px] font-bold text-secondary uppercase">
                Serbest Vuruş:{' '}
              </span>
              <span className="font-bold text-on-surface">{freeKickName || '—'}</span>
            </p>
          </div>
        ) : (
          <p className="font-headline mt-0.5 text-[15px] leading-snug font-bold text-on-surface">
            {item.value}
          </p>
        )}
      </div>
    </div>
  )
}

export function SquadDetailSidebar({ squad }: SquadDetailSidebarProps) {
  return (
    <aside className="flex flex-col gap-space-md lg:col-span-4">
      <div className="flex flex-col gap-space-md bg-surface-container-lowest p-space-md shadow-sm">
        <div className="flex items-center justify-between gap-space-sm">
          <h2 className="font-headline flex items-center gap-1.5 text-headline-sm font-bold text-primary uppercase">
            <span className="material-symbols-outlined text-[20px]">grid_view</span>
            Taktik Talimatlar
          </h2>
          <span className="font-kicker text-[10px] tracking-wider text-on-surface-variant uppercase">
            {squad.formation}
          </span>
        </div>
        <p className="font-body text-body-sm text-on-surface-variant">
          Bu kadronun saha içi planı ve duran top sorumluları.
        </p>
        <div className="grid grid-cols-1 gap-space-xs sm:grid-cols-2 lg:grid-cols-1">
          {squad.instructions.map((item) => (
            <InstructionCard key={item.title} item={item} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-space-md bg-surface-container-lowest p-space-md shadow-sm">
        <h2 className="font-headline flex items-center gap-1.5 text-headline-sm font-bold text-primary uppercase">
          <span className="material-symbols-outlined text-[20px]">monitoring</span>
          Kadro İstatistik Özeti
        </h2>
        <div className="grid grid-cols-2 gap-space-sm">
          <div className="flex flex-col bg-surface-container-low p-space-sm">
            <span className="font-kicker flex items-center gap-1 text-kicker text-on-surface-variant uppercase">
              <span className="material-symbols-outlined text-[14px] text-secondary">
                calendar_month
              </span>
              Ortalama Yaş
            </span>
            <span className="font-stat text-[32px] leading-tight font-extrabold text-primary">
              {squad.avgAge}
            </span>
            <span className="font-body text-xs text-on-surface-variant">{squad.avgAgeCaption}</span>
          </div>
          <div className="flex flex-col bg-surface-container-low p-space-sm">
            <span className="font-kicker flex items-center gap-1 text-kicker text-on-surface-variant uppercase">
              <span className="material-symbols-outlined text-[14px] text-tertiary-container">
                payments
              </span>
              Toplam Değer
            </span>
            <span className="font-stat text-[32px] leading-tight font-extrabold text-secondary">
              {squad.totalValue}
            </span>
            <span className="font-body text-xs text-on-surface-variant">
              {squad.totalValueCaption}
            </span>
          </div>
        </div>
      </div>

      {squad.notes.trim() ? (
        <div className="relative flex flex-col gap-space-sm overflow-hidden bg-primary p-space-md text-on-primary shadow-sm">
          <div className="pointer-events-none absolute -right-4 -bottom-4 select-none text-on-primary/5">
            <span className="material-symbols-outlined text-[140px]">sports_soccer</span>
          </div>
          <div className="z-10 flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[20px] text-tertiary-fixed-dim">
              format_quote
            </span>
            <span className="font-kicker text-kicker font-bold tracking-widest text-tertiary-fixed-dim uppercase">
              YAZARIN TAKTİK NOTU
            </span>
          </div>
          <p className="font-body z-10 text-body-md leading-relaxed text-on-primary/90 italic">
            &ldquo;{squad.notes.trim()}&rdquo;
          </p>
          <div className="z-10 border-t border-on-primary/10 pt-space-xs">
            <span className="font-label text-label-md font-bold text-tertiary-fixed">
              {squad.authorNoteCredit}
            </span>
          </div>
        </div>
      ) : null}

      <Link
        to="/kadrolar"
        className="font-label group flex w-full cursor-pointer items-center justify-start gap-space-xs bg-surface-container-lowest px-space-md py-space-sm text-label-md font-bold tracking-wider text-primary uppercase shadow-sm transition-all hover:text-secondary"
      >
        <span className="material-symbols-outlined text-[18px]">grid_on</span>
        <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-translate-x-0.5">
          arrow_back
        </span>
        <span>Tüm Kadrolara Dön</span>
      </Link>
    </aside>
  )
}
