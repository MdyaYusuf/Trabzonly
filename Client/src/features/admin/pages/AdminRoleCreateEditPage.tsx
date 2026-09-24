import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AdminRoleFormFields } from '../components/AdminRoleFormFields'
import { AdminRoleFormSidebar } from '../components/AdminRoleFormSidebar'
import { getAdminRoleFormDraft } from '../utils/adminRolePlaceholders'
import type { AdminRoleFormDraft } from '../utils/adminRoleTypes'

type AdminRoleCreateEditPageProps = {
  mode?: 'create' | 'edit'
}

export function AdminRoleCreateEditPage({ mode: modeProp }: AdminRoleCreateEditPageProps) {
  const { roleId } = useParams<{ roleId: string }>()
  const navigate = useNavigate()
  const mode = modeProp ?? (roleId ? 'edit' : 'create')
  const [draft, setDraft] = useState<AdminRoleFormDraft>(() =>
    getAdminRoleFormDraft(mode === 'edit' ? roleId : undefined),
  )

  function updateField<K extends keyof AdminRoleFormDraft>(
    key: K,
    value: AdminRoleFormDraft[K],
  ) {
    setDraft((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  function togglePermission(groupId: string, permissionId: string) {
    setDraft((prev) => ({
      ...prev,
      permissionGroups: prev.permissionGroups.map((group) => {
        if (group.id !== groupId) {
          return group
        }

        return {
          ...group,
          permissions: group.permissions.map((permission) =>
            permission.id === permissionId
              ? { ...permission, enabled: !permission.enabled }
              : permission,
          ),
        }
      }),
    }))
  }

  function selectAllPermissions() {
    setDraft((prev) => ({
      ...prev,
      permissionGroups: prev.permissionGroups.map((group) => ({
        ...group,
        permissions: group.permissions.map((permission) => ({
          ...permission,
          enabled: true,
        })),
      })),
    }))
  }

  function clearPermissions() {
    setDraft((prev) => ({
      ...prev,
      permissionGroups: prev.permissionGroups.map((group) => ({
        ...group,
        permissions: group.permissions.map((permission) => ({
          ...permission,
          enabled: false,
        })),
      })),
    }))
  }

  function handleCancel() {
    navigate('/yonetim/roller')
  }

  function handleSave() {
    navigate('/yonetim/roller')
  }

  const title = mode === 'edit' ? 'Rolü Düzenle' : 'Yeni Rol Ekle'
  const crumbTitle = mode === 'edit' ? 'Rol Düzenle' : 'Yeni Rol'

  return (
    <div className="flex min-h-full flex-col">
      <main className="mx-auto flex w-full max-w-[1360px] flex-1 flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
        <header className="flex flex-col gap-space-md lg:flex-row lg:items-start lg:justify-between">
          <div className="flex max-w-3xl flex-col gap-space-xs">
            <nav
              aria-label="Breadcrumb"
              className="font-label flex flex-wrap items-center gap-space-xs text-label-md text-on-surface-variant"
            >
              <Link to="/yonetim" className="transition-colors hover:text-primary">
                Yönetim Masası
              </Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <Link to="/yonetim/roller" className="transition-colors hover:text-primary">
                Roller
              </Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="font-bold text-primary uppercase">{crumbTitle}</span>
            </nav>
            <div className="flex flex-wrap items-center gap-space-sm">
              <h1 className="font-headline border-l-4 border-primary pl-space-sm text-headline-lg font-extrabold tracking-tight text-primary uppercase">
                {title}
              </h1>
              <span className="font-label bg-primary-container px-space-sm py-1 text-label-md text-on-primary">
                {draft.recordCode}
                {draft.isSystemRole ? ' • Sistem Rolü' : ''}
              </span>
            </div>
            <p className="font-body text-body-md text-on-surface-variant">
              Çekirdek erişim seviyeleri, modüler izin atamaları ve arayüz kimlik rozeti
              konfigürasyonu.
            </p>
            <p className="font-label inline-flex flex-wrap items-center gap-space-sm text-label-md text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px] text-secondary">
                verified_user
              </span>
              {draft.protocolVersion}
              <span className="text-outline-variant">|</span>
              {draft.lastUpdated}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm">
            {mode === 'edit' && !draft.isSystemRole && (
              <button
                type="button"
                className="font-label inline-flex items-center gap-1 border border-error px-space-md py-space-sm text-label-md text-error uppercase transition-colors hover:bg-error-container"
              >
                <span className="material-symbols-outlined text-[18px]">delete_forever</span>
                Rolü Sil
              </button>
            )}
            <button
              type="button"
              onClick={handleCancel}
              className="font-label border border-outline-variant px-space-md py-space-sm text-label-md uppercase transition-colors hover:border-primary hover:text-primary"
            >
              İptal
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="font-label inline-flex items-center gap-1 bg-primary-container px-space-md py-space-sm text-label-md font-bold tracking-wider text-on-primary uppercase transition-all hover:bg-primary"
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              Kaydet
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 items-start gap-gutter lg:grid-cols-12">
          <div className="lg:col-span-7">
            <AdminRoleFormFields
              draft={draft}
              onChange={updateField}
              onTogglePermission={togglePermission}
              onSelectAllPermissions={selectAllPermissions}
              onClearPermissions={clearPermissions}
            />
          </div>
          <div className="lg:col-span-5">
            <AdminRoleFormSidebar draft={draft} />
          </div>
        </div>
      </main>

      <footer className="sticky bottom-0 border-t border-outline-variant/50 bg-surface-container-lowest px-4 py-space-md sm:px-6 lg:px-12">
        <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-sm lg:flex-row lg:items-center lg:justify-between">
          <p className="font-body flex items-start gap-1 text-body-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px]">info</span>
            Güvenlik Uyarısı: Yapılan yetki değişiklikleri anlık olarak güvenlik önbelleğine ve
            oturum tokenlarına işlenecektir.
          </p>
          <div className="flex gap-space-sm">
            <button
              type="button"
              onClick={handleCancel}
              className="font-label border border-outline-variant px-space-md py-space-sm text-label-md uppercase transition-colors hover:border-primary hover:text-primary"
            >
              İptal
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="font-label inline-flex items-center gap-1 bg-primary-container px-space-md py-space-sm text-label-md font-bold tracking-wider text-on-primary uppercase transition-all hover:bg-primary"
            >
              <span className="material-symbols-outlined text-[18px]">verified</span>
              Değişiklikleri Kaydet
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
