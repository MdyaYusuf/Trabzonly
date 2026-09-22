import type { AdminPositionFormDraft } from '../utils/adminPositionTypes'

type AdminPositionFormSidebarProps = {
  draft: AdminPositionFormDraft
}

export function AdminPositionFormSidebar({ draft }: AdminPositionFormSidebarProps) {
  const abbreviation = draft.abbreviation || '—'
  const zoneBadge =
    draft.zone === 'attack'
      ? 'HÜCUM'
      : draft.zone === 'midfield'
        ? 'ORTA SAHA'
        : draft.zone === 'defence'
          ? 'SAVUNMA'
          : 'KALE'

  return (
    <aside className="flex flex-col gap-space-md">
      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <h2 className="font-kicker mb-space-sm text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
          Canlı Taktik Önizlemesi
        </h2>
        <p className="font-body mb-space-md text-body-sm text-on-surface-variant">
          Girdiğiniz kısaltma ve pozisyon adının maç kadrosunda ve oyuncu rozetinde nasıl
          görüneceğini inceleyin:
        </p>

        <div className="mb-space-md">
          <p className="font-kicker mb-space-xs text-kicker text-on-surface-variant uppercase">
            Görünüm A: Oyuncu Kartı Rozeti
          </p>
          <article className="flex items-center gap-space-sm border border-outline-variant/40 bg-surface p-space-sm">
            <div className="flex h-14 w-14 flex-col items-center justify-center bg-primary text-on-primary">
              <span className="font-kicker text-[10px] uppercase">{draft.previewNumber}</span>
              <span className="font-headline text-sm font-bold">{abbreviation}</span>
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-kicker bg-secondary-container px-space-xs py-0.5 text-kicker text-on-secondary-container uppercase">
                {zoneBadge}
              </span>
              <p className="font-label mt-1 text-label-md font-bold text-on-surface">
                {draft.previewPlayerName}
              </p>
              <p className="font-body text-body-sm text-on-surface-variant">
                {draft.name || 'Pozisyon'} • 1. Tercih
              </p>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant">visibility</span>
          </article>
        </div>

        <div>
          <p className="font-kicker mb-space-xs text-kicker text-on-surface-variant uppercase">
            Görünüm B: Diziliş Slotu
          </p>
          <article className="relative flex h-28 flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#0d3b1f] via-[#14532d] to-primary text-on-primary">
            <span className="font-kicker absolute top-2 left-2 text-kicker text-white/70 uppercase">
              {draft.formationLabel}
            </span>
            <span className="font-headline text-headline-sm font-extrabold">{abbreviation}</span>
            <span className="font-label mt-1 text-label-md uppercase">
              {draft.previewNumber.replace('#', '')}. {draft.previewPlayerName.split(' ').pop()}
            </span>
          </article>
        </div>

        <p className="font-body mt-space-sm flex items-start gap-1 text-body-sm text-on-surface-variant">
          <span className="material-symbols-outlined text-[16px]">info</span>
          Kısaltmalar oyuncu kartlarında ve kadro slotlarında görünür.
        </p>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-secondary">groups</span>
            <h2 className="font-kicker text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
              Bağlı Oyuncular ({draft.linkedPlayers.length})
            </h2>
          </div>
          <button
            type="button"
            className="font-label text-label-md font-bold text-secondary uppercase transition-colors hover:text-primary"
          >
            Tümünü Aç
          </button>
        </div>

        {draft.linkedPlayers.length === 0 ? (
          <p className="font-body text-body-sm text-on-surface-variant">
            Bu pozisyona henüz oyuncu atanmadı.
          </p>
        ) : (
          <ul className="flex flex-col gap-space-sm">
            {draft.linkedPlayers.map((player) => (
              <li
                key={player.id}
                className="flex items-center justify-between gap-space-sm border-b border-outline-variant/30 pb-space-sm last:border-b-0 last:pb-0"
              >
                <div className="flex items-center gap-space-sm">
                  <span className="font-label flex h-9 w-9 items-center justify-center bg-surface-container-high text-label-md font-bold text-primary">
                    {player.numberLabel}
                  </span>
                  <div>
                    <p className="font-label text-label-md font-bold text-on-surface">
                      {player.name}
                    </p>
                    <p className="font-body text-body-sm text-on-surface-variant">
                      {player.roleNote}
                    </p>
                  </div>
                </div>
                <span className="font-kicker bg-surface-container-high px-space-xs py-0.5 text-kicker text-on-surface-variant uppercase">
                  {player.preferenceLabel}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-space-md border-t border-outline-variant/40 pt-space-md">
          <p className="font-kicker text-kicker text-on-surface-variant uppercase">
            Toplam Kadro Derinliği
          </p>
          <p className="font-headline mt-1 text-headline-sm font-bold text-primary">
            {draft.depthLabel}
          </p>
          <p className="font-body mt-1 flex items-start gap-1 text-body-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px]">sports</span>
            {draft.depthNote}
          </p>
          <p className="font-kicker mt-space-sm text-kicker text-on-surface-variant uppercase">
            Son Güncelleme: {draft.lastUpdated}
          </p>
        </div>
      </section>
    </aside>
  )
}
