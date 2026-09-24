import { useMemo, useState } from 'react'
import { AdminRoleListFilters } from '../components/AdminRoleListFilters'
import { AdminRoleListHeader } from '../components/AdminRoleListHeader'
import { AdminRoleTable } from '../components/AdminRoleTable'
import { adminRoleListRows } from '../utils/adminRolePlaceholders'
import type { AdminRoleKindFilter } from '../utils/adminRoleTypes'

export function AdminRoleListPage() {
  const [search, setSearch] = useState('')
  const [kindFilter, setKindFilter] = useState<AdminRoleKindFilter>('all')

  const counts = useMemo(() => {
    return {
      all: adminRoleListRows.length,
      system: adminRoleListRows.filter((row) => row.kind === 'system').length,
      community: adminRoleListRows.filter((row) => row.kind === 'community').length,
    }
  }, [])

  const filtered = useMemo(() => {
    let result = [...adminRoleListRows]

    if (kindFilter !== 'all') {
      result = result.filter((row) => row.kind === kindFilter)
    }

    const query = search.trim().toLowerCase()

    if (query) {
      result = result.filter(
        (row) =>
          row.name.toLowerCase().includes(query) ||
          row.description.toLowerCase().includes(query) ||
          row.kindLabel.toLowerCase().includes(query),
      )
    }

    return result
  }, [search, kindFilter])

  return (
    <main className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
      <AdminRoleListHeader />

      <AdminRoleListFilters
        search={search}
        kindFilter={kindFilter}
        counts={counts}
        onSearchChange={setSearch}
        onKindChange={setKindFilter}
      />

      <AdminRoleTable rows={filtered} />

      <div className="flex flex-col gap-space-sm border border-outline-variant/40 bg-surface-container-lowest px-space-md py-space-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="font-label text-label-md text-on-surface-variant">
          Toplam <strong className="text-primary">{filtered.length}</strong> rol listeleniyor. (2
          Çekirdek, 2 Modüler)
        </p>
        <span className="font-label inline-flex h-8 w-8 items-center justify-center bg-primary text-label-md text-on-primary">
          1
        </span>
      </div>

      <section className="flex gap-space-sm border border-outline-variant/40 bg-surface-container-low p-space-md">
        <span className="material-symbols-outlined text-secondary">gavel</span>
        <div>
          <h2 className="font-label text-label-md font-bold text-on-surface uppercase">
            Güvenlik ve Rol Matrisi Protokolü
          </h2>
          <p className="font-body mt-1 text-body-sm text-on-surface-variant">
            Rol yetkilerinde yapılan değişiklikler oturumu açık üyelerin izin matrisine anlık
            yansıtılır. Sistem rollerinin (<strong className="text-primary">Yönetici</strong>,{' '}
            <strong className="text-primary">Üye</strong>) ana mimarisi çekirdek güvenlik protokolü
            gereği silinemez.
          </p>
        </div>
      </section>
    </main>
  )
}
