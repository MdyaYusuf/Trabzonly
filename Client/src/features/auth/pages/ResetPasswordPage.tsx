import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { AuthCard, AuthPageShell } from '@/features/auth/components/AuthPageShell'
import { authService } from '@/features/auth/authService'

export function ResetPasswordPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [email, setEmail] = useState(searchParams.get('email') ?? '')
  const [token] = useState(searchParams.get('token') ?? '')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const hasValidLink = email.trim().length > 0 && token.trim().length > 0

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)

    if (isSubmitting) {
      return
    }

    if (!hasValidLink) {
      setFormError('Şifre sıfırlama bağlantısı eksik veya geçersiz.')
      return
    }

    if (newPassword !== confirmNewPassword) {
      setFormError('Şifreler eşleşmiyor.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await authService.resetPassword({
        email,
        token,
        newPassword,
        confirmNewPassword,
      })

      if (response.success) {
        navigate('/login')
      }
    } catch {
      // Toast handled by apiClient
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthPageShell>
      <AuthCard
        title="Yeni Şifre Belirle"
        subtitle="E-postandaki bağlantı ile geldiysen yeni şifreni buradan oluşturabilirsin."
      >
        {!hasValidLink ? (
          <div className="flex flex-col gap-space-md">
            <p className="font-body text-body-sm text-error" role="alert">
              Şifre sıfırlama bağlantısı eksik veya geçersiz. Lütfen e-postandaki bağlantıyı kullan
              veya yeni bir talep oluştur.
            </p>
            <Link
              to="/sifremi-unuttum"
              className="font-headline text-center text-body-md font-bold text-primary underline decoration-secondary decoration-2 underline-offset-4 transition-colors hover:text-secondary"
            >
              Yeni bağlantı iste
            </Link>
          </div>
        ) : (
          <form className="flex flex-col gap-space-md" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label
                className="font-label text-label-md font-bold tracking-wider text-on-surface-variant uppercase"
                htmlFor="reset-email"
              >
                E-posta
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined pointer-events-none absolute left-3 text-[20px] text-outline">
                  mail
                </span>
                <input
                  id="reset-email"
                  className="w-full rounded bg-surface-container-low py-2.5 pr-4 pl-10 font-body text-body-md text-on-surface transition-all placeholder:text-outline/70 focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container focus:outline-none"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label
                className="font-label text-label-md font-bold tracking-wider text-on-surface-variant uppercase"
                htmlFor="reset-password"
              >
                Yeni Şifre
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined pointer-events-none absolute left-3 text-[20px] text-outline">
                  lock
                </span>
                <input
                  id="reset-password"
                  className="w-full rounded bg-surface-container-low py-2.5 pr-10 pl-10 font-body text-body-md text-on-surface transition-all placeholder:text-outline/70 focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container focus:outline-none"
                  placeholder="••••••••"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
                  className="absolute right-2.5 flex items-center justify-center p-1 text-on-surface-variant transition-colors hover:text-primary"
                  onClick={() => setShowPassword((value) => !value)}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label
                className="font-label text-label-md font-bold tracking-wider text-on-surface-variant uppercase"
                htmlFor="reset-confirm-password"
              >
                Yeni Şifre Tekrar
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined pointer-events-none absolute left-3 text-[20px] text-outline">
                  lock_reset
                </span>
                <input
                  id="reset-confirm-password"
                  className="w-full rounded bg-surface-container-low py-2.5 pr-10 pl-10 font-body text-body-md text-on-surface transition-all placeholder:text-outline/70 focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container focus:outline-none"
                  placeholder="••••••••"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={confirmNewPassword}
                  onChange={(event) => setConfirmNewPassword(event.target.value)}
                />
                <button
                  type="button"
                  aria-label={showConfirmPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
                  className="absolute right-2.5 flex items-center justify-center p-1 text-on-surface-variant transition-colors hover:text-primary"
                  onClick={() => setShowConfirmPassword((value) => !value)}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showConfirmPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {formError ? (
              <p className="font-body text-body-sm text-error" role="alert">
                {formError}
              </p>
            ) : null}

            <button
              className="group mt-space-xs flex w-full items-center justify-center gap-space-sm bg-primary-container px-space-lg py-3.5 font-headline text-headline-sm tracking-wider text-on-primary uppercase shadow-md transition-all duration-200 hover:bg-primary hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-75"
              type="submit"
              disabled={isSubmitting}
            >
              <span>ŞİFREYİ GÜNCELLE</span>
              <span className="material-symbols-outlined text-[22px] transition-transform duration-200 group-hover:translate-x-1">
                check
              </span>
            </button>

            <div className="pt-space-xs text-center">
              <Link
                to="/login"
                className="font-headline text-body-md font-bold text-primary underline decoration-secondary decoration-2 underline-offset-4 transition-colors hover:text-secondary"
              >
                Giriş sayfasına dön
              </Link>
            </div>
          </form>
        )}
      </AuthCard>
    </AuthPageShell>
  )
}
