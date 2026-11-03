import { Link } from 'react-router-dom'
import type { AdminCategoryListRow } from '../utils/adminCategoryTypes'

type AdminCategoryTableProps = {
  categories: AdminCategoryListRow[]
  deletingId: number | null
  onDelete: (category: AdminCategoryListRow) => void
}

export function AdminCategoryTable({
  categories,
  deletingId,
  onDelete,
}: AdminCategoryTableProps) {
  if (categories.length === 0) {
    return (
      <section className="border border-outline-variant/40 bg-surface-container-lowest px-space-md py-space-xl text-center">
        <p className="font-body text-body-md text-on-surface-variant">
          Henüz kategori eklenmedi veya eşleşme yok.
        </p>
      </section>
    )
  }

  return (
    <section className="overflow-x-auto border border-outline-variant/40 bg-surface-container-lowest">
      <table className="w-full min-w-[880px] border-collapse text-left">
        <thead className="bg-surface-container-low">
          <tr className="font-kicker text-kicker text-on-surface-variant uppercase">
            <th className="px-space-sm py-space-sm">Kategori</th>
            <th className="px-space-sm py-space-sm">Açıklama</th>
            <th className="px-space-sm py-space-sm">Gönderi Sayısı</th>
            <th className="px-space-sm py-space-sm">Durum</th>
            <th className="px-space-sm py-space-sm">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => {
            const isDeleting = deletingId === category.id
            const statusClass = category.isActive
              ? 'bg-secondary-container/50 text-on-secondary-container'
              : 'bg-error-container text-on-error-container'
            const hasPosts = category.postCount > 0

            return (
              <tr
                key={category.id}
                className="border-t border-outline-variant/30 transition-colors hover:bg-surface-container-low/60"
              >
                <td className="px-space-sm py-space-sm">
                  <span className="font-label text-label-md font-bold text-on-surface">
                    {category.name}
                  </span>
                </td>
                <td className="font-body max-w-sm px-space-sm py-space-sm text-body-sm text-on-surface-variant">
                  {category.description}
                </td>
                <td className="px-space-sm py-space-sm">
                  <span className="font-label inline-flex items-center gap-1 bg-surface-container-high px-space-sm py-1 text-label-md tabular-nums text-on-surface">
                    <span className="material-symbols-outlined text-[16px]">article</span>
                    {category.postCount}
                  </span>
                </td>
                <td className="px-space-sm py-space-sm">
                  <span
                    className={`font-label inline-flex px-space-sm py-0.5 text-label-md uppercase ${statusClass}`}
                  >
                    {category.statusLabel}
                  </span>
                </td>
                <td className="px-space-sm py-space-sm">
                  <div className="flex items-center gap-1">
                    <Link
                      to={`/yonetim/kategoriler/${category.id}/duzenle`}
                      aria-label="Düzenle"
                      className="flex h-8 w-8 cursor-pointer items-center justify-center text-secondary transition-colors hover:bg-secondary-container/40"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </Link>
                    <button
                      type="button"
                      aria-label="Sil"
                      disabled={hasPosts || isDeleting}
                      title={
                        hasPosts
                          ? 'Bu kategoriye bağlı gönderiler varken silinemez.'
                          : undefined
                      }
                      onClick={() => {
                        onDelete(category)
                      }}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center text-error transition-colors hover:bg-error-container disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}
