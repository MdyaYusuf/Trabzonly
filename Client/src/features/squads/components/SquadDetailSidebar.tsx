import type { SquadDetailViewModel } from '../utils/squadDetailTypes'

type SquadDetailSidebarProps = {
  squad: SquadDetailViewModel
}

export function SquadDetailSidebar({ squad }: SquadDetailSidebarProps) {
  return (
    <aside className="flex flex-col gap-space-md lg:col-span-4">
      <div className="flex flex-col gap-space-md bg-surface-container-lowest p-space-md shadow-sm">
        <div className="flex items-center justify-between gap-space-sm">
          <h2 className="font-headline flex items-center gap-1.5 text-headline-sm font-bold text-primary uppercase">
            <span className="material-symbols-outlined text-[20px]">tune</span>
            Taktik Talimatlar
          </h2>
        </div>
        <div className="flex flex-col gap-space-sm">
          {squad.instructions.map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-0.5 bg-surface-container-low p-space-sm"
            >
              <span className="font-kicker text-kicker font-bold text-on-surface-variant uppercase">
                {item.title}
              </span>
              <p className="font-headline text-sm font-bold text-on-surface">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-space-md bg-surface-container-lowest p-space-md shadow-sm">
        <h2 className="font-headline flex items-center gap-1.5 text-headline-sm font-bold text-primary uppercase">
          <span className="material-symbols-outlined text-[20px]">analytics</span>
          Kadro İstatistik Özeti
        </h2>
        <div className="grid grid-cols-2 gap-space-sm">
          <div className="flex flex-col bg-surface-container-low p-space-sm">
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              ORTALAMA YAŞ
            </span>
            <span className="font-stat text-[32px] leading-tight font-extrabold text-primary">
              {squad.avgAge}
            </span>
            <span className="font-body text-xs text-on-surface-variant">{squad.avgAgeCaption}</span>
          </div>
          <div className="flex flex-col bg-surface-container-low p-space-sm">
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              TOPLAM DEĞER
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
    </aside>
  )
}
