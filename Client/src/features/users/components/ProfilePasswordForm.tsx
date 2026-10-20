import { useState, type FormEvent } from 'react'
import userService from '../userService'

type ProfilePasswordFormProps = {
  onUpdated: () => void
}

function passwordChecks(password: string) {
  return {
    minLength: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasDigit: /\d/.test(password),
  }
}

export function ProfilePasswordForm({ onUpdated }: ProfilePasswordFormProps) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const checks = passwordChecks(newPassword)
  const passedCount = [
    checks.minLength,
    checks.hasUpper,
    checks.hasLower,
    checks.hasDigit,
  ].filter(Boolean).length
  const strengthWidth = `${(passedCount / 4) * 100}%`
  const strengthLabel =
    passedCount === 4
      ? 'Güçlü Seviye'
      : passedCount >= 3
        ? 'Orta Seviye'
        : 'Zayıf Seviye'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSaving) {
      return
    }

    if (!currentPassword || !newPassword || newPassword !== confirmPassword) {
      setStatusMessage('Şifre alanlarını kontrol edin.')
      return
    }

    if (passedCount < 4) {
      setStatusMessage('Yeni şifre güvenlik kurallarını karşılamıyor.')
      return
    }

    setIsSaving(true)
    setStatusMessage(null)

    const result = await userService.changePassword({
      currentPassword,
      newPassword,
      confirmNewPassword: confirmPassword,
    })

    setIsSaving(false)

    if (!result.success) {
      return
    }

    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    onUpdated()
  }

  return (
    <section className="flex flex-col border border-outline-variant/30 bg-surface-container-lowest shadow-[0_4px_24px_rgba(31,27,23,0.06)]">
      <div className="border-b border-outline-variant/25 px-space-lg pt-space-lg pb-space-md">
        <h2 className="font-headline text-headline-sm font-extrabold tracking-tight text-primary">
          Şifre Değiştir
        </h2>
        <p className="font-body mt-1 text-body-sm text-on-surface-variant">
          Hesap güvenliği için güçlü bir parola belirleyin.
        </p>
      </div>

      <form
        className="flex flex-col gap-space-lg p-space-lg"
        onSubmit={(event) => {
          void handleSubmit(event)
        }}
      >
        <div className="flex flex-col gap-1.5">
          <label className="font-label text-label-md font-bold text-on-surface">Mevcut şifre</label>
          <div className="relative">
            <input
              type={showCurrent ? 'text' : 'password'}
              value={currentPassword}
              onChange={(event) => {
                setCurrentPassword(event.target.value)
              }}
              className="font-body w-full border border-outline-variant/30 bg-background px-space-md py-space-xs pr-10 text-body-md text-on-surface outline-none transition-colors focus:border-primary"
            />
            <button
              type="button"
              onClick={() => {
                setShowCurrent((value) => !value)
              }}
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-on-surface-variant hover:text-primary"
            >
              <span className="material-symbols-outlined text-[18px]">
                {showCurrent ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-space-md">
          <div className="flex flex-col gap-1.5">
            <label className="font-label text-label-md font-bold text-on-surface">Yeni şifre</label>
            <input
              type="password"
              value={newPassword}
              onChange={(event) => {
                setNewPassword(event.target.value)
              }}
              placeholder="Yeni parolanızı girin"
              className="font-body w-full border border-outline-variant/30 bg-background px-space-md py-space-xs text-body-md text-on-surface outline-none transition-colors focus:border-primary"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-label text-label-md font-bold text-on-surface">
              Yeni şifre (tekrar)
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value)
              }}
              placeholder="Yeni parolayı onaylayın"
              className="font-body w-full border border-outline-variant/30 bg-background px-space-md py-space-xs text-body-md text-on-surface outline-none transition-colors focus:border-primary"
            />
          </div>
        </div>

        <div className="flex flex-col gap-space-sm rounded-sm border border-outline-variant/25 bg-surface-container/40 p-space-md">
          <div className="flex items-center justify-between gap-space-sm">
            <span className="font-label text-label-md font-bold text-on-surface">
              Şifre gücü
            </span>
            <span className="font-label text-label-md font-bold text-secondary">{strengthLabel}</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden bg-surface-container-highest">
            <div className="h-full bg-secondary transition-all" style={{ width: strengthWidth }} />
          </div>
          <ul className="font-body grid grid-cols-1 gap-1 text-body-sm sm:grid-cols-2">
            <li
              className={
                checks.minLength ? 'text-secondary' : 'text-on-surface-variant'
              }
            >
              En az 8 karakter
            </li>
            <li
              className={
                checks.hasUpper ? 'text-secondary' : 'text-on-surface-variant'
              }
            >
              En az 1 büyük harf
            </li>
            <li
              className={
                checks.hasLower ? 'text-secondary' : 'text-on-surface-variant'
              }
            >
              En az 1 küçük harf
            </li>
            <li
              className={
                checks.hasDigit ? 'text-secondary' : 'text-on-surface-variant'
              }
            >
              En az 1 rakam
            </li>
          </ul>
        </div>

        {statusMessage ? (
          <p className="font-label text-label-md font-bold text-error">{statusMessage}</p>
        ) : null}

        <div className="flex items-center justify-end border-t border-outline-variant/25 pt-space-md">
          <button
            type="submit"
            disabled={isSaving}
            className="cursor-pointer bg-primary px-space-lg py-space-xs font-label text-label-md tracking-wider text-on-primary uppercase transition-colors hover:bg-primary-container disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? 'Güncelleniyor...' : 'Şifreyi Güncelle'}
          </button>
        </div>
      </form>
    </section>
  )
}
