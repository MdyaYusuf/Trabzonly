import { Link } from 'react-router-dom'
import type { AdminCategoryListRow } from '../utils/adminCategoryTypes'

type AdminCategoryTableProps = {
  categories: AdminCategoryListRow[]
  selectedIds: Set<string>
  onToggle: (id: string) => void
  onToggleAll: () => void
}

export function AdminCategoryTable({
  categories,
  selectedIds,
  onToggle,
  onToggleAll,
}: AdminCategoryTableProps) {
  const allSelected =
    categories.length > 0 && categories.every((category) => selectedIds.has(category.id))

  return (
    <section className="overflow-x-auto border border-outline-variant/40 bg-surface-container-lowest">
      {categories.length === 0 ? (
        <p className="font-body px-space-md py-space-xl text-center text-body-md text-on-surface-variant">
          Henüz kategori yok. Yeni içerik grubu oluşturmak için Kategori Ekle butonunu
          kullanabilirsiniz.
        </p>
      ) : (
        <table className="w-full min-w-[880px] border-collapse text-left">
          <thead className="bg-surface-container-low">
            <tr className="font-kicker text-kicker text-on-surface-variant uppercase">
              <th className="px-space-sm py-space-sm">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onToggleAll}
                  aria-label="Tümünü seç"
                  className="accent-primary"
                />
              </th>
              <th className="px-space-sm py-space-sm">Kategori Adı & Kalıcı Bağlantı</th>
              <th className="px-space-sm py-space-sm">Açıklama</th>
              <th className="px-space-sm py-space-sm">Gönderi Sayısı</th>
              <th className="px-space-sm py-space-sm">Durum</th>
              <th className="px-space-sm py-space-sm">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => {
              const isSelected = selectedIds.has(category.id)
              const iconTone =
                category.accent === 'mavi'
                  ? 'bg-secondary-container text-on-secondary-container'
                  : 'bg-primary-container text-on-primary'
              const statusClass =
                category.status === 'active'
                  ? 'bg-secondary-container/50 text-on-secondary-container'
                  : 'bg-surface-container-high text-on-surface-variant'

              return (
                <tr
                  key={category.id}
                  className="border-t border-outline-variant/30 transition-colors hover:bg-surface-container-low/60"
                >
                  <td className="px-space-sm py-space-sm">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {
                        onToggle(category.id)
                      }}
                      aria-label={`${category.name} seç`}
                      className="accent-primary"
                    />
                  </td>
                  <td className="px-space-sm py-space-sm">
                    <div className="flex items-start gap-space-sm">
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center ${iconTone}`}
                      >
                        <span className="material-symbols-outlined text-[22px]">
                          {category.icon}
                        </span>
                      </span>
                      <div className="flex min-w-0 flex-col gap-0.5">
                        <span className="font-label text-label-md font-bold text-on-surface">
                          {category.name}
                        </span>
                        <span className="font-body text-body-sm text-on-surface-variant">
                          {category.slug}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="font-body max-w-sm px-space-sm py-space-sm text-body-sm text-on-surface-variant">
                    {category.description}
                  </td>
                  <td className="px-space-sm py-space-sm">
                    <span className="font-label inline-flex items-center gap-1 bg-surface-container-high px-space-sm py-1 text-label-md text-on-surface">
                      <span className="material-symbols-outlined text-[16px]">article</span>
                      {category.postCountLabel}
                    </span>
                  </td>
                  <td className="px-space-sm py-space-sm">
                    <span
                      className={`font-kicker inline-flex items-center gap-1 px-space-sm py-0.5 text-kicker uppercase ${statusClass}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          category.status === 'active' ? 'bg-secondary' : 'bg-outline'
                        }`}
                      />
                      {category.statusLabel}
                    </span>
                  </td>
                  <td className="px-space-sm py-space-sm">
                    <div className="flex items-center gap-1">
                      <Link
                        to={`/yonetim/kategoriler/${category.id}/duzenle`}
                        aria-label="Düzenle"
                        className="flex h-8 w-8 items-center justify-center text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit_note</span>
                      </Link>
                      <button
                        type="button"
                        aria-label="Sil"
                        className="flex h-8 w-8 items-center justify-center text-on-surface-variant transition-colors hover:bg-error-container hover:text-error"
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
      )}
    </section>
  )
}
