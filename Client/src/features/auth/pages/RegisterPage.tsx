import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthCard, AuthPageShell } from '@/features/auth/components/AuthPageShell'
import { authService } from '@/features/auth/authService'

export function RegisterPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [acceptRules, setAcceptRules] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [formError, setFormError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)

    if (isSubmitting) {
      return
    }

    if (!acceptRules) {
      setFormError('Devam etmek için topluluk kurallarını kabul etmelisin.')
      return
    }

    if (password !== confirmPassword) {
      setFormError('Şifreler eşleşmiyor.')
      return
    }

    setIsSubmitting(true)
    setStatusMessage('Kayıt işlemi gerçekleştiriliyor...')

    try {
      const response = await authService.register({ username, password })

      if (response.success) {
        setStatusMessage('Kayıt tamamlandı. Giriş sayfasına yönlendiriliyorsunuz...')
        navigate('/login')
        return
      }

      setStatusMessage(null)
    } catch {
      setStatusMessage(null)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthPageShell>
      <AuthCard
        title="Topluluğa Katıl"
        subtitle="Bordo-Mavi fırtınanın bağımsız dijital tribününde yerini almak için hesabını oluştur."
      >
        <form className="flex flex-col gap-space-md" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label
              className="font-label flex items-center justify-between text-label-md font-bold tracking-wider text-on-surface-variant uppercase"
              htmlFor="register-username"
            >
              <span>Kullanıcı Adı</span>
              <span className="font-kicker text-kicker font-normal text-outline normal-case">
                Zorunlu
              </span>
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined pointer-events-none absolute left-3 text-[20px] text-outline">
                person
              </span>
              <input
                id="register-username"
                className="w-full rounded bg-surface-container-low py-2.5 pr-4 pl-10 font-body text-body-md text-on-surface transition-all placeholder:text-outline/70 focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary focus:outline-none"
                placeholder="@kullaniciadi veya bordo yoldaş adı"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-space-sm md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label
                className="font-label text-label-md font-bold tracking-wider text-on-surface-variant uppercase"
                htmlFor="register-password"
              >
                Şifre
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined pointer-events-none absolute left-3 text-[20px] text-outline">
                  lock
                </span>
                <input
                  id="register-password"
                  className="w-full rounded bg-surface-container-low py-2.5 pr-10 pl-10 font-body text-body-md text-on-surface transition-all placeholder:text-outline/70 focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary focus:outline-none"
                  placeholder="••••••••"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
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
                htmlFor="register-confirm-password"
              >
                Şifre Tekrar
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined pointer-events-none absolute left-3 text-[20px] text-outline">
                  lock_reset
                </span>
                <input
                  id="register-confirm-password"
                  className="w-full rounded bg-surface-container-low py-2.5 pr-10 pl-10 font-body text-body-md text-on-surface transition-all placeholder:text-outline/70 focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary focus:outline-none"
                  placeholder="••••••••"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
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
          </div>

          <div className="flex items-start gap-2 pt-1">
            <input
              id="accept-rules"
              className="mt-0.5 h-4 w-4 cursor-pointer rounded bg-surface-container accent-primary-container focus:ring-0"
              type="checkbox"
              checked={acceptRules}
              onChange={(event) => setAcceptRules(event.target.checked)}
              required
            />
            <label
              className="font-body cursor-pointer text-body-sm leading-tight text-on-surface-variant select-none"
              htmlFor="accept-rules"
            >
              <span className="font-bold text-primary underline hover:text-secondary">
                Topluluk Kuralları
              </span>{' '}
              ve{' '}
              <span className="font-bold text-primary underline hover:text-secondary">
                Bağımsız Taraftar İlkeleri
              </span>
              &apos;ni kabul ediyorum.
            </label>
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
            <span>KAYIT OL</span>
            <span className="material-symbols-outlined text-[22px] transition-transform duration-200 group-hover:translate-x-1">
              arrow_forward
            </span>
          </button>

          <div className="pt-space-xs text-center">
            <p className="font-body text-body-md text-on-surface-variant">
              Zaten hesabın var mı?{' '}
              <Link
                to="/login"
                className="ml-1 font-headline text-body-md font-bold text-primary underline decoration-secondary decoration-2 underline-offset-4 transition-colors hover:text-secondary"
              >
                Giriş Yap
              </Link>
            </p>
          </div>

          {statusMessage ? (
            <div className="flex items-center gap-2 rounded bg-surface-container p-space-sm font-body text-body-sm text-primary">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>{statusMessage}</span>
            </div>
          ) : null}
        </form>
      </AuthCard>
    </AuthPageShell>
  )
}
