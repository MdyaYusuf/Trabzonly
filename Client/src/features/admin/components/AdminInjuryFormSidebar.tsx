import type { AdminInjuryFormDraft } from '../utils/adminInjuryTypes'
import { adminInjuryRotation } from '../utils/adminInjuryPlaceholders'

type AdminInjuryFormSidebarProps = {
  draft: AdminInjuryFormDraft
}

function formatReturnDate(value: string) {
  if (!value) {
    return '—'
  }

  const date = new Date(`${value}T00:00:00`)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function AdminInjuryFormSidebar({ draft }: AdminInjuryFormSidebarProps) {
  return (
    <aside className="flex flex-col gap-space-md">
      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex items-center justify-between gap-space-sm">
          <h2 className="font-kicker flex items-center gap-1 text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
            Canlı Kadro Önizlemesi
          </h2>
          <span className="font-kicker text-kicker text-secondary uppercase">Portal Görünümü</span>
        </div>

        <article className="overflow-hidden border border-outline-variant/40">
          <div className={`relative bg-gradient-to-br p-space-md text-on-primary ${draft.avatarTone}`}>
            <span className="font-kicker bg-black/30 px-space-sm py-0.5 text-kicker uppercase">
              Kadro Dışı
            </span>
            <p className="font-kicker mt-space-md text-kicker text-on-primary/80 uppercase">
              #{draft.playerNumber} Stoper
            </p>
            <h3 className="font-headline text-headline-md font-extrabold uppercase">
              {draft.playerName}
            </h3>
            <p className="font-body mt-1 line-clamp-2 text-body-sm text-on-primary/85">
              {draft.previewDiagnosis}
            </p>
            <p className="font-kicker mt-space-md text-kicker text-on-primary uppercase">
              {draft.daysInjuredLabel}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-px bg-outline-variant/40">
            <div className="bg-surface-container-lowest p-space-sm">
              <p className="font-kicker text-kicker text-on-surface-variant uppercase">
                İyileşme Evresi
              </p>
              <p className="font-headline mt-1 text-headline-sm font-bold text-primary tabular-nums">
                %{draft.recoveryPercent}
              </p>
            </div>
            <div className="bg-surface-container-lowest p-space-sm">
              <p className="font-kicker text-kicker text-on-surface-variant uppercase">
                Kaçırılan Müsabaka
              </p>
              <p className="font-headline mt-1 text-headline-sm font-bold text-primary tabular-nums">
                {draft.missedMatches} Maç
              </p>
            </div>
            <div className="bg-surface-container-lowest p-space-sm">
              <p className="font-kicker text-kicker text-on-surface-variant uppercase">
                Öngörülen Dönüş
              </p>
              <p className="font-label mt-1 text-label-md font-bold text-on-surface">
                {formatReturnDate(draft.expectedReturnDate)}
              </p>
              <p className="font-body text-body-sm text-on-surface-variant">
                {draft.returnMatchLabel}
              </p>
            </div>
          </div>

          <dl className="flex flex-col gap-space-sm border-t border-outline-variant/40 p-space-md">
            <div className="flex items-start justify-between gap-space-sm">
              <dt className="font-body text-body-sm text-on-surface-variant">Mevcut Durum:</dt>
              <dd className="font-label text-right text-label-md font-bold text-on-surface">
                {draft.currentStatusLabel}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-space-sm">
              <dt className="font-body text-body-sm text-on-surface-variant">Topla Çalışma İzni:</dt>
              <dd className="font-label text-right text-label-md font-bold text-on-surface">
                {draft.ballWorkLabel}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-space-sm">
              <dt className="font-body text-body-sm text-on-surface-variant">Son Kontrol Tarihi:</dt>
              <dd className="font-label text-right text-label-md font-bold text-on-surface">
                {draft.lastCheckLabel}
              </dd>
            </div>
          </dl>
        </article>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex items-center justify-between gap-space-sm">
          <h2 className="font-kicker flex items-center gap-1 text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
            <span className="material-symbols-outlined text-[16px]">sports</span>
            Taktik Savunma Rotasyonu
          </h2>
          <span className="font-kicker bg-primary-container px-space-sm py-0.5 text-kicker text-on-primary uppercase">
            Tandem
          </span>
        </div>
        <p className="font-body mb-space-md text-body-sm text-on-surface-variant">
          Savić&apos;in yokluğunda teknik direktör Şenol Güneş tarafından planlanan stoper tandem
          kurgusu:
        </p>
        <ul className="flex flex-col gap-space-sm">
          {adminInjuryRotation.map((player) => (
            <li
              key={player.name}
              className="flex items-center justify-between gap-space-sm border border-outline-variant/30 px-space-md py-space-sm"
            >
              <div>
                <p className="font-label text-label-md font-bold text-on-surface">{player.name}</p>
                <p className="font-body text-body-sm text-on-surface-variant">{player.line}</p>
              </div>
              <span className={`font-kicker px-space-sm py-1 text-kicker uppercase ${player.tone}`}>
                {player.badge}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <h2 className="font-kicker mb-space-md flex items-center gap-1 text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
          <span className="material-symbols-outlined text-[16px]">verified</span>
          Resmi Onay Protokolü
        </h2>
        <div className="flex gap-space-sm">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container">
            <span className="material-symbols-outlined">medical_services</span>
          </div>
          <div>
            <p className="font-label text-label-md font-bold text-on-surface">{draft.doctorName}</p>
            <p className="font-body text-body-sm text-on-surface-variant">{draft.doctorTitle}</p>
            <p className="font-body mt-space-xs text-body-sm text-on-surface-variant">
              Protokol No: <strong className="text-primary">{draft.protocolNo}</strong>
            </p>
            <span className="font-kicker mt-space-sm inline-flex bg-secondary-container px-space-sm py-1 text-kicker text-on-secondary-container uppercase">
              E-İmzalı
            </span>
          </div>
        </div>
      </section>
    </aside>
  )
}
