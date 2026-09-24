import type { AdminMemberDetailDraft, AdminMemberRole } from '../utils/adminMemberTypes'
import { adminMemberRoleOptions } from '../utils/adminMemberPlaceholders'

type AdminMemberDetailFormFieldsProps = {
  draft: AdminMemberDetailDraft
  onChange: <K extends keyof AdminMemberDetailDraft>(
    key: K,
    value: AdminMemberDetailDraft[K],
  ) => void
}

const inputClass =
  'font-body w-full border border-outline-variant/50 bg-surface px-space-md py-space-sm text-body-md text-on-surface outline-none focus:border-primary'

const roleSummaries: Record<string, string> = {
  admin:
    'Yönetici rolü içerik onaylama, kadro ve quiz moderasyonu ile kullanıcı ve sistem denetimi yetkilerine tam kapsamlı olarak sahiptir.',
  moderator:
    'Moderatör rolü içerik inceleme, kadro raporları ve topluluk yorum moderasyonu yetkilerine sahiptir.',
  editor:
    'Editör rolü makale, maç raporları ve quiz hazırlama yetkilerine sahiptir.',
  member: 'Standart portal katılımcısı gönderi, kadro ve quiz etkileşimine açıktır.',
  community: 'Standart portal katılımcısı gönderi, kadro ve quiz etkileşimine açıktır.',
}

export function AdminMemberDetailFormFields({
  draft,
  onChange,
}: AdminMemberDetailFormFieldsProps) {
  return (
    <div className="flex flex-col gap-space-md">
      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex flex-wrap items-center justify-between gap-space-sm border-b border-outline-variant/40 pb-space-sm">
          <h2 className="font-headline text-headline-sm font-bold text-primary uppercase">
            Temel Hesap ve Profil Bilgileri
          </h2>
          <span className="font-kicker bg-surface-container-high px-space-sm py-1 text-kicker text-on-surface-variant uppercase">
            Üye Sicil No: {draft.registryNo}
          </span>
        </div>

        <div className="mb-space-md flex flex-col gap-space-md border border-outline-variant/30 bg-surface-container-low p-space-md sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-space-sm">
            <div
              className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-lg font-bold text-on-primary ${draft.avatarTone}`}
            >
              {draft.initials}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-space-xs">
                <p className="font-headline text-headline-sm font-extrabold text-on-surface">
                  {draft.username}
                </p>
                {draft.isVerified && (
                  <span
                    className="material-symbols-outlined text-[18px] text-secondary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                )}
              </div>
              <span className="font-kicker mt-1 inline-block bg-secondary-container px-space-sm py-0.5 text-kicker text-on-secondary-container uppercase">
                {draft.verifiedLabel}
              </span>
              <p className="font-body mt-1 text-body-sm text-on-surface-variant">
                Özel profil fotoğrafı 1400x1400 px, PNG formatında yüklendi.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-space-sm">
            <button
              type="button"
              className="font-label inline-flex items-center gap-1 border border-outline-variant px-space-md py-space-sm text-label-md uppercase hover:border-primary hover:text-primary"
            >
              <span className="material-symbols-outlined text-[16px]">photo_camera</span>
              Avatar Değiştir
            </button>
            <button
              type="button"
              className="font-label border border-outline-variant px-space-md py-space-sm text-label-md uppercase text-on-surface-variant hover:border-primary hover:text-primary"
            >
              Varsayılana Sıfırla
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
          <div>
            <div className="mb-1 flex flex-wrap items-center justify-between gap-space-sm">
              <label
                htmlFor="username"
                className="font-label text-label-md text-on-surface-variant uppercase"
              >
                Kullanıcı Adı
              </label>
              <span className="font-kicker inline-flex items-center gap-1 text-kicker text-secondary uppercase">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                Doğrulandı
              </span>
            </div>
            <div className="relative">
              <input
                id="username"
                className={`${inputClass} pr-10`}
                value={draft.username}
                onChange={(event) => {
                  onChange('username', event.target.value)
                }}
              />
              <span className="material-symbols-outlined absolute top-1/2 right-3 -translate-y-1/2 text-on-surface-variant">
                lock
              </span>
            </div>
            <p className="font-body mt-space-xs text-body-sm text-on-surface-variant">
              Değişiklik 30 günde bir yapılabilir
            </p>
          </div>

          <div>
            <div className="mb-1 flex flex-wrap items-center justify-between gap-space-sm">
              <label
                htmlFor="email"
                className="font-label text-label-md text-on-surface-variant uppercase"
              >
                E-posta Adresi
              </label>
              {draft.emailVerified && (
                <span className="font-kicker bg-secondary-container px-space-sm py-0.5 text-kicker text-on-secondary-container uppercase">
                  ✓ E-posta Onaylandı
                </span>
              )}
            </div>
            <div className="relative">
              <input
                id="email"
                type="email"
                readOnly
                className={`${inputClass} cursor-not-allowed bg-surface-container-low pr-10 opacity-90`}
                value={draft.email}
              />
              <span className="material-symbols-outlined absolute top-1/2 right-3 -translate-y-1/2 text-on-surface-variant">
                mail_lock
              </span>
            </div>
            <p className="font-body mt-space-xs text-body-sm text-on-surface-variant">
              Birincil iletişim e-posta adresi taraftar verification koduyla kilitlenmiştir.
            </p>
          </div>
        </div>

        <div className="mt-space-md">
          <div className="mb-1 flex flex-wrap items-center justify-between gap-space-sm">
            <label
              htmlFor="bio"
              className="font-label text-label-md text-on-surface-variant uppercase"
            >
              Biyografi (Profil Tanıtımı)
            </label>
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              {draft.bio.length} / 250 Karakter
            </span>
          </div>
          <textarea
            id="bio"
            rows={3}
            maxLength={250}
            className={inputClass}
            value={draft.bio}
            onChange={(event) => {
              onChange('bio', event.target.value)
            }}
          />
        </div>

        <div className="mt-space-md">
          <label
            htmlFor="role"
            className="font-label mb-1 block text-label-md text-on-surface-variant uppercase"
          >
            Kulüp Direktörlüğü & Topluluk Rolü
          </label>
          <select
            id="role"
            className={inputClass}
            value={draft.role}
            onChange={(event) => {
              const nextRole = event.target.value as AdminMemberRole
              onChange('role', nextRole)
              onChange('roleSummary', roleSummaries[nextRole] ?? roleSummaries.member)
              onChange(
                'previewRole',
                nextRole === 'admin'
                  ? 'Yönetici'
                  : nextRole === 'moderator'
                    ? 'Moderatör'
                    : nextRole === 'editor'
                      ? 'Editör'
                      : nextRole === 'community'
                        ? 'Üye'
                        : 'Onaylı Taraftar',
              )
            }}
          >
            {adminMemberRoleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <p className="font-body mt-space-sm border border-outline-variant/30 bg-surface-container-low px-space-md py-space-sm text-body-sm text-on-surface-variant">
            <strong className="text-on-surface">Yetki Özeti:</strong> {draft.roleSummary}
          </p>
        </div>

        <label className="mt-space-md flex items-center justify-between gap-space-md border border-outline-variant/40 bg-surface-container-low px-space-md py-space-sm">
          <span>
            <span className="font-label block text-label-md font-bold text-on-surface uppercase">
              Hesap Durumu: {draft.isActive ? 'Aktif' : 'Pasif'}
            </span>
            <span className="font-body text-body-sm text-on-surface-variant">
              Üye portalda oturum açabilir, gönderi paylaşabilir, kadro oluşturabilir ve quiz
              çözebilir.
            </span>
          </span>
          <input
            type="checkbox"
            className="h-5 w-5 accent-primary"
            checked={draft.isActive}
            onChange={(event) => {
              onChange('isActive', event.target.checked)
            }}
          />
        </label>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex items-center gap-space-sm border-b border-outline-variant/40 pb-space-sm">
          <span className="material-symbols-outlined text-secondary">shield_lock</span>
          <h2 className="font-headline text-headline-sm font-bold text-primary uppercase">
            Salt Okunur Sistem ve Güvenlik Metaverisi
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-space-sm sm:grid-cols-2">
          <article className="border border-outline-variant/30 p-space-md">
            <p className="font-kicker text-kicker text-on-surface-variant uppercase">
              Kayıt Tarihi
            </p>
            <p className="font-label mt-1 text-label-md font-bold text-on-surface">
              {draft.registeredAt}
            </p>
            <p className="font-body mt-1 text-body-sm text-on-surface-variant">
              {draft.registerChannel}
            </p>
          </article>
          <article className="border border-outline-variant/30 p-space-md">
            <p className="font-kicker text-kicker text-on-surface-variant uppercase">
              Son Giriş Tarihi
            </p>
            <p className="font-label mt-1 text-label-md font-bold text-on-surface">
              {draft.lastLogin}
            </p>
            <p className="font-body mt-1 text-body-sm text-on-surface-variant">
              {draft.lastLoginMeta}
            </p>
          </article>
          <article className="border border-outline-variant/30 p-space-md">
            <p className="font-kicker text-kicker text-on-surface-variant uppercase">
              Son IP & Konum
            </p>
            <p className="font-label mt-1 text-label-md font-bold text-on-surface">
              {draft.location}
            </p>
            <p className="font-body mt-1 text-body-sm text-on-surface-variant">{draft.ipMask}</p>
          </article>
          <article className="border border-outline-variant/30 p-space-md">
            <p className="font-kicker text-kicker text-on-surface-variant uppercase">
              Şifre & 2FA Durumu
            </p>
            <p className="font-label mt-1 inline-flex items-center gap-1 text-label-md font-bold text-secondary">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              2FA (İki Aşamalı) Aktif
            </p>
            <p className="font-body mt-1 text-body-sm text-on-surface-variant">
              {draft.passwordHashLabel}
            </p>
          </article>
        </div>
      </section>
    </div>
  )
}
