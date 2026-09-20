import { useState, type FormEvent } from 'react'

type ProfilePasswordFormProps = {
  onUpdated: () => void
}

function passwordChecks(password: string) {
  return {
    minLength: password.length >= 8,
    hasDigit: /\d/.test(password),
    hasSpecial: /[^A-Za-z0-9]/.test(password),
  }
}

export function ProfilePasswordForm({ onUpdated }: ProfilePasswordFormProps) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  const checks = passwordChecks(newPassword)
  const passedCount = [checks.minLength, checks.hasDigit, checks.hasSpecial].filter(Boolean).length
  const strengthWidth = `${(passedCount / 3) * 100}%`
  const strengthLabel =
    passedCount === 3 ? 'Güçlü Seviye' : passedCount === 2 ? 'Orta Seviye' : 'Zayıf Seviye'

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!currentPassword || !newPassword || newPassword !== confirmPassword) {
      setStatusMessage('Şifre alanlarını kontrol edin.')
      return
    }

    if (passedCount < 3) {
      setStatusMessage('Yeni şifre güvenlik kurallarını karşılamıyor.')
      return
    }

    setStatusMessage(null)
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    onUpdated()
  }

  return (
    <section className="flex flex-col gap-space-lg bg-surface-container-lowest p-space-lg shadow-sm">
      <div className="flex flex-col gap-space-xs bg-surface-container-low p-space-md pb-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="inline-block h-3 w-3 bg-secondary" />
            <h2 className="font-headline text-headline-md font-extrabold tracking-tight text-primary uppercase">
              Şifre Değiştir
            </h2>
          </div>
          <span className="font-kicker text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
            Hesap Muhafızı
          </span>
        </div>
        <p className="font-body text-body-md text-on-surface-variant">
          Hesap ve yayıncı haklarının güvenliği için güçlü, tahmin edilemez bir parola belirleyin.
        </p>
      </div>

      <div className="flex items-start gap-space-sm bg-primary/5 p-space-md shadow-sm">
        <span className="material-symbols-outlined text-[24px] text-secondary">shield</span>
        <div className="flex flex-col gap-0.5">
          <span className="font-label text-label-md font-bold text-primary uppercase">
            İki Adımlı Doğrulama (2FA) Aktif
          </span>
          <p className="font-body text-body-sm text-on-surface-variant">
            Hesabınız Akyazı seviyesinde korunmaktadır. Yeni bir cihazdan giriş yapıldığında SMS /
            Authenticator onay kodu talep edilir.
          </p>
        </div>
      </div>

      <form className="flex flex-col gap-space-md" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label className="font-label text-label-md font-bold text-on-surface uppercase">
            Mevcut Şifre
          </label>
          <div className="relative">
            <input
              type={showCurrent ? 'text' : 'password'}
              value={currentPassword}
              onChange={(event) => {
                setCurrentPassword(event.target.value)
              }}
              className="font-body w-full bg-surface-container-lowest px-space-md py-space-xs pr-10 text-body-md text-on-surface shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <button
              type="button"
              onClick={() => {
                setShowCurrent((value) => !value)
              }}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-on-surface-variant hover:text-primary"
            >
              <span className="material-symbols-outlined text-[18px]">
                {showCurrent ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label className="font-label text-label-md font-bold text-on-surface uppercase">
              Yeni Şifre
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(event) => {
                setNewPassword(event.target.value)
              }}
              placeholder="Yeni parolanızı girin"
              className="font-body w-full bg-surface-container-lowest px-space-md py-space-xs text-body-md text-on-surface shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-label text-label-md font-bold text-on-surface uppercase">
              Yeni Şifre (Tekrar)
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value)
              }}
              placeholder="Yeni parolayı onaylayın"
              className="font-body w-full bg-surface-container-lowest px-space-md py-space-xs text-body-md text-on-surface shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-space-xs bg-surface-container-low p-space-sm">
          <div className="flex items-center justify-between">
            <span className="font-kicker text-kicker font-bold text-on-surface-variant uppercase">
              Şifre Mukavemeti
            </span>
            <span className="font-label text-label-md font-bold text-secondary uppercase">
              {strengthLabel}
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden bg-surface-container-highest">
            <div className="h-full bg-secondary transition-all" style={{ width: strengthWidth }} />
          </div>
          <div className="font-body grid grid-cols-1 gap-space-xs pt-1 text-body-sm sm:grid-cols-3">
            <div
              className={[
                'flex items-center gap-1',
                checks.minLength ? 'text-secondary' : 'text-on-surface-variant',
              ].join(' ')}
            >
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              <span>En az 8 karakter</span>
            </div>
            <div
              className={[
                'flex items-center gap-1',
                checks.hasDigit ? 'text-secondary' : 'text-on-surface-variant',
              ].join(' ')}
            >
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              <span>En az 1 rakam</span>
            </div>
            <div
              className={[
                'flex items-center gap-1',
                checks.hasSpecial ? 'text-secondary' : 'text-on-surface-variant',
              ].join(' ')}
            >
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              <span>En az 1 özel karakter</span>
            </div>
          </div>
        </div>

        {statusMessage ? (
          <p className="font-label text-label-md font-bold text-error">{statusMessage}</p>
        ) : null}

        <div className="flex items-center justify-end gap-space-sm pt-space-xs">
          <button
            type="submit"
            className="bg-surface-container px-space-lg py-space-xs font-label text-label-md tracking-wider text-primary uppercase transition-all hover:bg-primary hover:text-on-primary"
          >
            Şifreyi Güncelle
          </button>
        </div>
      </form>
    </section>
  )
}
