import type { AdminRoleFormDraft } from '../utils/adminRoleTypes'
import { adminRoleColorOptions } from '../utils/adminRolePlaceholders'

type AdminRoleFormSidebarProps = {
  draft: AdminRoleFormDraft
}

function badgeTone(color: AdminRoleFormDraft['color']) {
  if (color === 'mavi') {
    return 'bg-secondary-container text-on-secondary-container'
  }

  if (color === 'amber') {
    return 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
  }

  if (color === 'gri') {
    return 'bg-surface-container-high text-on-surface-variant'
  }

  return 'bg-primary-container text-on-primary'
}

export function AdminRoleFormSidebar({ draft }: AdminRoleFormSidebarProps) {
  const enabledPermissions = draft.permissionGroups.reduce(
    (total, group) => total + group.permissions.filter((permission) => permission.enabled).length,
    0,
  )
  const totalPermissions = draft.permissionGroups.reduce(
    (total, group) => total + group.permissions.length,
    0,
  )
  const selectedColor = adminRoleColorOptions.find((option) => option.id === draft.color)

  return (
    <aside className="flex flex-col gap-space-md">
      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex items-center justify-between gap-space-sm">
          <h2 className="font-kicker flex items-center gap-1 text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
            <span className="material-symbols-outlined text-[16px]">preview</span>
            Canlı Rozet & Kimlik Önizlemesi
          </h2>
        </div>

        <div className="border border-outline-variant/40 bg-surface-container-low p-space-md">
          <p className="font-kicker mb-space-sm text-kicker text-on-surface-variant uppercase">
            Forum Mesajı Simülasyonu
          </p>
          <div className="flex items-start gap-space-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-container text-xs font-bold text-on-primary">
              BF
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-space-xs">
                <span className="font-label text-label-md font-bold text-on-surface">
                  {draft.previewUsername}
                </span>
                <span
                  className={`font-kicker inline-flex items-center gap-1 px-space-sm py-0.5 text-kicker uppercase ${badgeTone(draft.color)}`}
                >
                  <span className="material-symbols-outlined text-[12px]">star</span>
                  {draft.name || 'Rol'}
                </span>
              </div>
              <p className="font-body mt-space-xs text-body-sm text-on-surface-variant">
                &quot;Haftasonu oynanacak derbi için taktik varyasyon analizleri yönetim konsoluna
                yüklendi.&quot;
              </p>
              <p className="font-kicker mt-space-xs text-kicker text-on-surface-variant uppercase">
                12 dk önce
              </p>
            </div>
          </div>
        </div>

        <div className="mt-space-md border border-outline-variant/40 bg-primary-container p-space-md text-on-primary">
          <p className="font-kicker mb-space-sm text-kicker text-on-primary/80 uppercase">
            Yönetim Konsolu Üst Çubuk
          </p>
          <div className="flex items-center gap-space-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-sm font-bold text-on-secondary">
              DC
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-label text-label-md font-bold">{draft.previewAdminName}</p>
              <p className="font-body text-body-sm text-on-primary/80">{draft.previewAdminRole}</p>
            </div>
            <span className="font-kicker bg-black/25 px-space-sm py-0.5 text-kicker uppercase">
              {draft.code}
            </span>
          </div>
        </div>

        <p className="font-body mt-space-md text-body-sm text-on-surface-variant">
          Forum mesajlarında, kadro paylaşımlarında ve yorumlarda kullanıcı adının yanında bu rozet
          görüntülenecektir.
          {selectedColor ? ` Tema: ${selectedColor.label}.` : ''}
        </p>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex items-center justify-between gap-space-sm">
          <h2 className="font-kicker flex items-center gap-1 text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
            <span className="material-symbols-outlined text-[16px]">shield_with_heart</span>
            Rol İstatistikleri & Etki Alanı
          </h2>
          <span className="font-kicker text-kicker text-secondary uppercase">Canlı Veri</span>
        </div>

        <div className="border border-outline-variant/30 p-space-md">
          <p className="font-kicker text-kicker text-on-surface-variant uppercase">Atanmış Üye</p>
          <p className="font-headline mt-1 text-headline-md font-extrabold text-primary tabular-nums">
            {draft.assignedMembers}
          </p>
          <p className="font-body text-body-sm text-on-surface-variant">
            Aktif ve doğrulanmış kullanıcı
          </p>
        </div>

        <dl className="mt-space-md flex flex-col gap-space-sm">
          <div className="flex items-start justify-between gap-space-sm">
            <dt className="font-body text-body-sm text-on-surface-variant">Son Atanan Üye:</dt>
            <dd className="text-right">
              <p className="font-label text-label-md font-bold text-on-surface">
                {draft.lastAssignedMember}
              </p>
              <p className="font-body text-body-sm text-on-surface-variant">
                {draft.lastAssignedMeta}
              </p>
            </dd>
          </div>
          <div className="flex items-start justify-between gap-space-sm">
            <dt className="font-body text-body-sm text-on-surface-variant">
              Sistem Kritiklik Seviyesi:
            </dt>
            <dd className="font-label text-right text-label-md font-bold text-on-surface">
              {draft.criticalityLabel}
            </dd>
          </div>
          <div className="flex items-start justify-between gap-space-sm">
            <dt className="font-body text-body-sm text-on-surface-variant">
              2FA (İki Aşamalı Doğrulama):
            </dt>
            <dd className="font-label text-right text-label-md font-bold text-on-surface">
              {draft.twoFactorLabel}
            </dd>
          </div>
          <div className="flex items-start justify-between gap-space-sm">
            <dt className="font-body text-body-sm text-on-surface-variant">İzin Toplamı:</dt>
            <dd className="font-label text-right text-label-md font-bold text-primary">
              {enabledPermissions} / {totalPermissions} Modül Aktif
            </dd>
          </div>
        </dl>

        {draft.assignedMembers > 0 && (
          <p className="font-body mt-space-md flex items-start gap-1 border border-error/40 bg-error-container/40 px-space-md py-space-sm text-body-sm text-on-error-container">
            <span className="material-symbols-outlined text-[16px]">gavel</span>
            Bu rolün izinlerinde yapılacak kısıtlamalar, sistemdeki mevcut{' '}
            {draft.assignedMembers} idari kullanıcının oturumlarında anında geçerli olacaktır.
          </p>
        )}
      </section>
    </aside>
  )
}
