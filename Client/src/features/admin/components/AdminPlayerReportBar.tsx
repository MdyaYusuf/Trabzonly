import type { AdminPlayerReportStrip } from '../utils/adminPlayerTypes'

type AdminPlayerReportBarProps = {
  report: AdminPlayerReportStrip
}

export function AdminPlayerReportBar({ report }: AdminPlayerReportBarProps) {
  return (
    <section className="flex flex-col gap-space-sm bg-primary px-space-md py-space-sm text-on-primary lg:flex-row lg:items-center lg:justify-between lg:px-space-lg">
      <div className="flex flex-wrap items-center gap-space-sm">
        <span className="font-kicker text-kicker tracking-widest text-tertiary-fixed-dim uppercase">
          {report.kicker}
        </span>
        <span className="text-on-primary/40">•</span>
        <span className="font-body text-body-sm text-on-primary/90">{report.message}</span>
      </div>
      <div className="font-label flex flex-wrap items-center gap-space-sm text-label-md">
        <span>
          Piyasa Değer Toplamı:{' '}
          <strong className="text-tertiary-fixed-dim">{report.marketValueTotal}</strong>
        </span>
        <span className="text-on-primary/40">|</span>
        <span>
          Yabancı Kontenjanı: <strong>{report.foreignQuota}</strong>
        </span>
      </div>
    </section>
  )
}
