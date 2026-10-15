type SquadBuilderSidebarStatsProps = {
  avgAge: string
  totalValue: string
}

export function SquadBuilderSidebarStats({
  avgAge,
  totalValue,
}: SquadBuilderSidebarStatsProps) {
  return (
    <div className="flex flex-col gap-space-sm bg-surface-container-lowest p-space-md shadow-sm">
      <h2 className="font-headline flex items-center gap-1.5 text-headline-sm font-bold text-primary uppercase">
        <span className="material-symbols-outlined text-[20px] text-secondary">groups</span>
        Kadro Özeti
      </h2>
      <p className="font-body text-body-sm text-on-surface-variant">
        Ortalama yaş yalnızca ilk 11 için hesaplanır. Piyasa değeri ilk 11 ve yedeklerin toplamıdır.
      </p>
      <div className="flex w-full flex-wrap items-center gap-space-sm">
        <div className="font-label flex min-w-0 flex-1 flex-col gap-0.5 bg-surface-container px-3 py-2 text-[12px] text-on-surface sm:min-w-[10rem]">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-secondary">
              calendar_month
            </span>
            <span className="font-bold">Ortalama Yaş</span>
          </span>
          <span className="tabular-nums text-[14px] font-bold text-primary">{avgAge}</span>
          <span className="font-kicker text-[10px] text-on-surface-variant uppercase">
            İlk 11
          </span>
        </div>
        <div className="font-label flex min-w-0 flex-1 flex-col gap-0.5 bg-surface-container px-3 py-2 text-[12px] text-on-surface sm:min-w-[10rem]">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-secondary">
              payments
            </span>
            <span className="font-bold">Piyasa Değeri</span>
          </span>
          <span className="tabular-nums text-[14px] font-bold text-primary">{totalValue}</span>
          <span className="font-kicker text-[10px] text-on-surface-variant uppercase">
            İlk 11 + Yedek
          </span>
        </div>
      </div>
    </div>
  )
}
