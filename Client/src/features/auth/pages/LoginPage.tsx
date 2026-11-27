import { useEffect, useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthCard, AuthPageShell } from '@/features/auth/components/AuthPageShell'
import { authService } from '@/features/auth/authService'
import { setCredentials } from '@/features/auth/authSlice'
import { useAppDispatch } from '@/core/store/hooks'

type LoginLocationState = {
  from?: string
  notice?: string
  registeredEmail?: string
}

function resolvePostLoginPath(from: string | undefined): string {
  if (!from || !from.startsWith('/') || from.startsWith('//')) {
    return '/'
  }

  return from
}

export function LoginPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const locationState = (location.state as LoginLocationState | null) ?? null
  const [email, setEmail] = useState(locationState?.registeredEmail ?? '')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!locationState?.notice) {
      return
    }

    toast.info(locationState.notice)
  }, [locationState?.notice])

  async function handleResendConfirmation() {
    const trimmedEmail = email.trim()

    if (!trimmedEmail || isResending) {
      return
    }

    setIsResending(true)

    try {
      const response = await authService.resendEmailConfirmation({ email: trimmedEmail })

      if (response.success) {
        toast.success(
          response.message ||
            'Eğer doğrulanmamış bir hesabınız varsa yeni bağlantı gönderildi.',
        )
      }
    } catch {
      // Global toast handles API errors.
    } finally {
      setIsResending(false)
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    setIsSubmitting(true)
    setStatusMessage('Bordo-Mavi tribüne bağlanıyor...')

    try {
      const response = await authService.login({ email, password })

      if (response.success && response.data) {
        dispatch(setCredentials(response.data))
        setStatusMessage('Doğrulama başarılı. Yönlendiriliyorsunuz!')
        navigate(resolvePostLoginPath(locationState?.from))
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
        title="Topluluğa Giriş Yap"
        subtitle="Bordo-Mavi fırtınanın dijital tribününe katılmak için bilgilerinizi giriniz."
      >
        <form className="flex flex-col gap-space-md" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label
              className="font-label flex items-center justify-between text-label-md font-bold tracking-wider text-on-surface-variant uppercase"
              htmlFor="login-email"
            >
              <span>E-posta</span>
              <span className="font-kicker text-kicker font-normal text-outline normal-case">
                Zorunlu
              </span>
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined pointer-events-none absolute left-3 text-[20px] text-outline">
                mail
              </span>
              <input
                id="login-email"
                className="w-full rounded bg-surface-container-low py-3 pr-4 pl-10 font-body text-body-md text-on-surface transition-all placeholder:text-outline/70 focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container focus:outline-none"
                placeholder="ornek@eposta.com"
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
              className="font-label flex items-center justify-between text-label-md font-bold tracking-wider text-on-surface-variant uppercase"
              htmlFor="login-password"
            >
              <span>Şifre</span>
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined pointer-events-none absolute left-3 text-[20px] text-outline">
                lock
              </span>
              <input
                id="login-password"
                className="w-full rounded bg-surface-container-low py-3 pr-12 pl-10 font-body text-body-md text-on-surface transition-all placeholder:text-outline/70 focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container focus:outline-none"
                placeholder="••••••••"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button
                type="button"
                aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
                className="absolute right-3 flex items-center justify-center p-1 text-on-surface-variant transition-colors hover:text-primary"
                onClick={() => setShowPassword((value) => !value)}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 py-1">
            <button
              type="button"
              className="font-label text-label-md font-bold text-on-surface-variant transition-colors hover:text-primary disabled:opacity-60"
              onClick={() => void handleResendConfirmation()}
              disabled={isResending || !email.trim()}
            >
              {isResending ? 'Gönderiliyor...' : 'Doğrulama e-postasını yeniden gönder'}
            </button>
            <Link
              to="/sifremi-unuttum"
              className="font-label text-label-md font-bold text-secondary transition-colors hover:text-primary"
            >
              Şifremi unuttum
            </Link>
          </div>

          <button
            className="group mt-space-xs flex w-full items-center justify-center gap-space-sm bg-primary-container px-space-lg py-3.5 font-headline text-headline-sm tracking-wider text-on-primary uppercase shadow-md transition-all duration-200 hover:bg-primary hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-75"
            type="submit"
            disabled={isSubmitting}
          >
            <span>GİRİŞ YAP</span>
            <span className="material-symbols-outlined text-[22px] transition-transform duration-200 group-hover:translate-x-1">
              arrow_forward
            </span>
          </button>

          <div className="pt-space-xs text-center">
            <p className="font-body text-body-md text-on-surface-variant">
              Hesabın yok mu?{' '}
              <Link
                to="/register"
                state={locationState}
                className="ml-1 font-headline text-body-md font-bold text-primary underline decoration-secondary decoration-2 underline-offset-4 transition-colors hover:text-secondary"
              >
                Hemen Kayıt Ol
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
