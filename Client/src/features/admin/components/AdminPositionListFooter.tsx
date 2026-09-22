import { adminPositionDistribution } from '../utils/adminPositionPlaceholders'

type AdminPositionListFooterProps = {
  visibleCount: number
  totalCount: number
}

export function AdminPositionListFooter({
  visibleCount,
  totalCount,
}: AdminPositionListFooterProps) {
  return (
    <div className="flex flex-col gap-space-md">
      <div className="flex flex-col gap-space-sm border border-outline-variant/40 bg-surface-container-lowest px-space-md py-space-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="font-label text-label-md text-on-surface-variant">
          Toplam <strong className="text-primary">{totalCount}</strong> pozisyon gösteriliyor (1 -{' '}
          {visibleCount})
        </p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled
            className="font-label px-space-sm py-space-xs text-label-md uppercase opacity-40"
          >
            Önceki
          </button>
          <span className="font-label flex h-8 w-8 items-center justify-center bg-primary text-label-md text-on-primary">
            1
          </span>
          <button
            type="button"
            disabled
            className="font-label px-space-sm py-space-xs text-label-md uppercase opacity-40"
          >
            Sonraki
          </button>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-gutter lg:grid-cols-12">
        <article className="flex gap-space-sm border border-outline-variant/40 bg-surface-container-low p-space-md lg:col-span-7">
          <span className="material-symbols-outlined text-secondary">info</span>
          <div>
            <h2 className="font-label text-label-md font-bold text-on-surface uppercase">
              Taktik Entegrasyon Notu
            </h2>
            <p className="font-body mt-1 text-body-sm text-on-surface-variant">
              Burada tanımlanan pozisyon kodları (ST, CB, CM, GK vb.), kadro kurulum editöründeki{' '}
              <strong className="text-primary">Taktik Tahtası</strong> ve maç günü 11 önizleme
              grafikleriyle anlık senkronizedir. Bir pozisyonun silinmesi veya kısaltmasının
              değiştirilmesi, bağlı 28 oyuncunun maç kartlarını doğrudan etkiler.
            </p>
            <p className="font-kicker mt-space-sm text-kicker text-on-surface-variant uppercase">
              Son Güncelleme: 2024/25 Sezonu 1. Devre Revizyonu • Yetkili: Dozer Cemil (Teknik
              Kurul)
            </p>
          </div>
        </article>

        <article className="border border-outline-variant/40 bg-surface-container-lowest p-space-md lg:col-span-5">
          <div className="mb-space-md flex items-center justify-between gap-space-sm">
            <h2 className="font-kicker text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
              Kadro Dağılım Özeti
            </h2>
            <span className="font-label text-label-md font-bold text-primary">
              {adminPositionDistribution.totalPlayers} Oyuncu
            </span>
          </div>
          <ul className="flex flex-col gap-space-sm">
            {adminPositionDistribution.lines.map((line) => (
              <li key={line.id} className="flex flex-col gap-1">
                <div className="font-label flex items-center justify-between text-label-md">
                  <span className="text-on-surface">{line.label}</span>
                  <span className="text-on-surface-variant">
                    {line.count} Oyuncu (%{line.percent})
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden bg-surface-container-high">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${line.percent}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-space-md flex items-center justify-between border-t border-outline-variant/40 pt-space-sm">
            <span className="font-label text-label-md text-on-surface-variant">
              İdeal Kadro Kotası: {adminPositionDistribution.idealQuota}
            </span>
            <button
              type="button"
              className="font-label text-label-md font-bold text-secondary uppercase transition-colors hover:text-primary"
            >
              Detaylı Rapor →
            </button>
          </div>
        </article>
      </section>
    </div>
  )
}
