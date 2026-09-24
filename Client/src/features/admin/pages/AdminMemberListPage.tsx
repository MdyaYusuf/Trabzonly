import { useMemo, useState } from 'react'
import { AdminMemberListFilters } from '../components/AdminMemberListFilters'
import { AdminMemberListHeader } from '../components/AdminMemberListHeader'
import { AdminMemberPagination } from '../components/AdminMemberPagination'
import { AdminMemberTable } from '../components/AdminMemberTable'
import { adminMemberListRows } from '../utils/adminMemberPlaceholders'
import type { AdminMemberStatusFilter } from '../utils/adminMemberTypes'

const PAGE_SIZE = 6

export function AdminMemberListPage() {
  const [search, setSearch] = useState('')
  const [role, setRole] = useState('all')
  const [status, setStatus] = useState('all')
  const [quickView, setQuickView] = useState<AdminMemberStatusFilter>('all')
  const [page, setPage] = useState(1)

  const counts = useMemo(() => {
    return {
      all: 14850,
      active: 13920,
      passive: 930,
      admins: 18,
    }
  }, [])

  const filtered = useMemo(() => {
    let result = [...adminMemberListRows]

    if (role !== 'all') {
      result = result.filter((row) => row.role === role)
    }

    if (status !== 'all') {
      result = result.filter((row) => row.status === status)
    }

    if (quickView === 'active') {
      result = result.filter((row) => row.status === 'active')
    } else if (quickView === 'passive') {
      result = result.filter((row) => row.status === 'passive' || row.status === 'suspended')
    } else if (quickView === 'admins') {
      result = result.filter((row) => row.role === 'admin' || row.role === 'moderator')
    }

    const query = search.trim().toLowerCase()

    if (query) {
      result = result.filter(
        (row) =>
          row.username.toLowerCase().includes(query) ||
          row.email.toLowerCase().includes(query) ||
          row.memberCode.toLowerCase().includes(query) ||
          row.id.includes(query),
      )
    }

    return result
  }, [search, role, status, quickView])

  const totalPages = Math.max(1, Math.ceil(Math.max(filtered.length, 1) / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageStart = (currentPage - 1) * PAGE_SIZE
  const pageRows = filtered.slice(pageStart, pageStart + PAGE_SIZE)

  function resetPage() {
    setPage(1)
  }

  function clearFilters() {
    setSearch('')
    setRole('all')
    setStatus('all')
    setQuickView('all')
    setPage(1)
  }

  const displayTotal =
    filtered.length === adminMemberListRows.length &&
    role === 'all' &&
    status === 'all' &&
    quickView === 'all' &&
    !search.trim()
      ? 14850
      : filtered.length

  return (
    <main className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
      <AdminMemberListHeader />

      <AdminMemberListFilters
        search={search}
        role={role}
        status={status}
        quickView={quickView}
        counts={counts}
        onSearchChange={(value) => {
          setSearch(value)
          resetPage()
        }}
        onRoleChange={(value) => {
          setRole(value)
          resetPage()
        }}
        onStatusChange={(value) => {
          setStatus(value)
          resetPage()
        }}
        onQuickViewChange={(value) => {
          setQuickView(value)
          resetPage()
        }}
        onClear={clearFilters}
      />

      <AdminMemberTable rows={pageRows} />

      <AdminMemberPagination
        page={currentPage}
        pageSize={PAGE_SIZE}
        total={displayTotal}
        onPageChange={setPage}
      />

      <section className="flex gap-space-sm border border-outline-variant/40 bg-surface-container-low p-space-md">
        <span className="material-symbols-outlined text-secondary">security</span>
        <div>
          <h2 className="font-label text-label-md font-bold text-on-surface uppercase">
            Kullanıcı Gizliliği ve KVKK Protokolü
          </h2>
          <p className="font-body mt-1 text-body-sm text-on-surface-variant">
            Üye şifreleri tek yönlü kriptografik algoritmalarla şifrelenmiş (hash) olup yönetim
            konsolunda asla düz metin olarak görüntülenemez ve dışa aktarılamaz. E-posta ve kayıt
            logları 6698 sayılı KVKK ve kulüp taraftar topluluğu veri güvenlik ilkelerine tam uyumlu
            biçimde korunmaktadır.
          </p>
        </div>
      </section>
    </main>
  )
}
