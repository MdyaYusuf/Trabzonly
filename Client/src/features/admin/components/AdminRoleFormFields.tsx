import type { AdminRoleColor, AdminRoleFormDraft } from '../utils/adminRoleTypes'
import { adminRoleColorOptions } from '../utils/adminRolePlaceholders'

type AdminRoleFormFieldsProps = {
  draft: AdminRoleFormDraft
  onChange: <K extends keyof AdminRoleFormDraft>(
    key: K,
    value: AdminRoleFormDraft[K],
  ) => void
  onTogglePermission: (groupId: string, permissionId: string) => void
  onSelectAllPermissions: () => void
  onClearPermissions: () => void
}

const inputClass =
  'font-body w-full border border-outline-variant/50 bg-surface px-space-md py-space-sm text-body-md text-on-surface outline-none focus:border-primary'

export function AdminRoleFormFields({
  draft,
  onChange,
  onTogglePermission,
  onSelectAllPermissions,
  onClearPermissions,
}: AdminRoleFormFieldsProps) {
  return (
    <div className="flex flex-col gap-space-md">
      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex flex-wrap items-center justify-between gap-space-sm border-b border-outline-variant/40 pb-space-sm">
          <h2 className="font-headline text-headline-sm font-bold text-primary uppercase">
            Temel Rol Bilgileri
          </h2>
          <span className="font-kicker text-kicker text-on-surface-variant uppercase">
            Bölüm 01
          </span>
        </div>

        <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
          <div>
            <label htmlFor="roleName" className="font-label mb-1 block text-label-md text-on-surface-variant">
              Rol Adı <span className="text-error">*</span>
            </label>
            <input
              id="roleName"
              className={inputClass}
              value={draft.name}
              onChange={(event) => {
                onChange('name', event.target.value)
              }}
            />
            <p className="font-body mt-space-xs text-body-sm text-on-surface-variant">
              Sistem ve taraftar arayüzünde görüntülenecek resmi rol unvanı.
            </p>
          </div>

          <div>
            <div className="mb-1 flex flex-wrap items-center justify-between gap-space-sm">
              <label
                htmlFor="roleCode"
                className="font-label text-label-md text-on-surface-variant"
              >
                Rol Kodu
              </label>
              <span className="font-kicker inline-flex items-center gap-1 text-kicker text-on-surface-variant uppercase">
                <span className="material-symbols-outlined text-[14px]">lock</span>
                Salt Okunur
              </span>
            </div>
            <input
              id="roleCode"
              readOnly
              className={`${inputClass} cursor-not-allowed bg-surface-container-high font-mono text-body-sm font-bold text-on-surface-variant`}
              value={draft.code}
            />
            <p className="font-body mt-space-xs text-body-sm text-on-surface-variant">
              Sistem çekirdeği tarafından kullanılan değişmez anahtar.
            </p>
          </div>
        </div>

        <div className="mt-space-md">
          <div className="mb-1 flex flex-wrap items-center justify-between gap-space-sm">
            <label
              htmlFor="roleDescription"
              className="font-label text-label-md text-on-surface-variant"
            >
              Açıklama ve Operasyonel Kapsam
            </label>
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              {draft.description.length} / 250
            </span>
          </div>
          <textarea
            id="roleDescription"
            rows={3}
            maxLength={250}
            className={inputClass}
            value={draft.description}
            onChange={(event) => {
              onChange('description', event.target.value)
            }}
          />
          <p className="font-body mt-space-xs text-body-sm text-on-surface-variant">
            Ekip içi oryantasyon ve denetim loglarında rolün sınırlarını netleştirir.
          </p>
        </div>

        <div className="mt-space-md">
          <p className="font-label mb-space-sm text-label-md text-on-surface-variant">
            Rol Rengi / Rozet Teması
          </p>
          <div className="grid grid-cols-1 gap-space-sm sm:grid-cols-2">
            {adminRoleColorOptions.map((option) => {
              const isSelected = draft.color === option.id

              return (
                <label
                  key={option.id}
                  className={`flex cursor-pointer items-center gap-space-sm border px-space-md py-space-sm transition-colors ${
                    isSelected
                      ? 'border-primary bg-primary-fixed/30'
                      : 'border-outline-variant/40 hover:border-primary'
                  }`}
                >
                  <input
                    type="radio"
                    name="role-color"
                    className="sr-only"
                    checked={isSelected}
                    onChange={() => {
                      onChange('color', option.id as AdminRoleColor)
                    }}
                  />
                  <span className={`h-8 w-8 shrink-0 ${option.swatch}`} />
                  <span className="min-w-0 flex-1">
                    <span className="font-label block text-label-md font-bold text-on-surface">
                      {option.label}
                    </span>
                    <span className="font-mono text-body-sm text-on-surface-variant">
                      {option.hex}
                    </span>
                  </span>
                  {isSelected && (
                    <span className="material-symbols-outlined text-primary">check</span>
                  )}
                </label>
              )
            })}
          </div>
        </div>

        <label className="mt-space-md flex items-center justify-between gap-space-md border border-outline-variant/40 bg-surface-container-low px-space-md py-space-sm">
          <span>
            <span className="font-label block text-label-md font-bold text-on-surface uppercase">
              Varsayılan Kayıt Rolü
            </span>
            <span className="font-body text-body-sm text-on-surface-variant">
              Yeni kayıt olan kullanıcılara bu rol otomatik atansın mı? (Genellikle &apos;Taraftar&apos;
              için etkindir)
            </span>
          </span>
          <input
            type="checkbox"
            className="h-5 w-5 accent-primary"
            checked={draft.isDefaultRegistrationRole}
            onChange={(event) => {
              onChange('isDefaultRegistrationRole', event.target.checked)
            }}
          />
        </label>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex flex-wrap items-center justify-between gap-space-sm border-b border-outline-variant/40 pb-space-sm">
          <h2 className="font-headline text-headline-sm font-bold text-primary uppercase">
            Modüler Yetki Matrisi (İzinler)
          </h2>
          <div className="flex gap-space-sm">
            <button
              type="button"
              onClick={onSelectAllPermissions}
              className="font-label text-label-md text-primary uppercase hover:text-secondary"
            >
              Tümünü Seç
            </button>
            <button
              type="button"
              onClick={onClearPermissions}
              className="font-label text-label-md text-on-surface-variant uppercase hover:text-primary"
            >
              Temizle
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-space-md">
          {draft.permissionGroups.map((group) => {
            const enabledCount = group.permissions.filter((permission) => permission.enabled)
              .length

            return (
              <article
                key={group.id}
                className="border border-outline-variant/40 bg-surface-container-low p-space-md"
              >
                <div className="mb-space-md flex flex-wrap items-center justify-between gap-space-sm">
                  <h3 className="font-label flex items-center gap-space-xs text-label-md font-bold text-on-surface uppercase">
                    <span className="material-symbols-outlined text-[18px] text-secondary">
                      {group.icon}
                    </span>
                    {group.title}
                  </h3>
                  <span className="font-kicker bg-secondary-container px-space-sm py-1 text-kicker text-on-secondary-container uppercase">
                    {enabledCount} / {group.permissions.length} İzin Etkin
                  </span>
                </div>
                <ul className="flex flex-col gap-space-sm">
                  {group.permissions.map((permission) => (
                    <li key={permission.id}>
                      <label className="flex cursor-pointer items-start gap-space-sm border border-outline-variant/30 bg-surface-container-lowest px-space-md py-space-sm">
                        <input
                          type="checkbox"
                          className="mt-1 accent-primary"
                          checked={permission.enabled}
                          onChange={() => {
                            onTogglePermission(group.id, permission.id)
                          }}
                        />
                        <span>
                          <span className="font-label block text-label-md font-bold text-on-surface">
                            {permission.label}
                          </span>
                          <span className="font-body text-body-sm text-on-surface-variant">
                            {permission.description}
                          </span>
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}
