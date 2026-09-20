import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthCard, AuthPageShell } from '../components/auth/AuthPageShell'
import { authService } from '../features/auth/authService'
import { setCredentials } from '../features/auth/authSlice'
import { useAppDispatch } from '../core/store/hooks'

export function LoginPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    setIsSubmitting(true)
    setStatusMessage(`${username || 'Yoldaş'}, Bordo-Mavi tribüne bağlanıyor...`)

    try {
      const response = await authService.login({ username, password })

      if (response.success && response.data) {
        dispatch(setCredentials(response.data))
        setStatusMessage('Doğrulama başarılı. Yönlendiriliyorsunuz!')
        navigate('/')
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
              htmlFor="login-username"
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
                id="login-username"
                className="w-full rounded bg-surface-container-low py-3 pr-4 pl-10 font-body text-body-md text-on-surface transition-all placeholder:text-outline/70 focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container focus:outline-none"
                placeholder="@kadi veya kullanıcı adın"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
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

          <div className="flex items-center justify-between py-1">
            <label className="flex cursor-pointer items-center gap-2 select-none">
              <input
                className="h-4 w-4 cursor-pointer rounded bg-surface-container accent-primary-container focus:ring-0"
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
              />
              <span className="font-label text-label-md text-on-surface-variant">Beni hatırla</span>
            </label>
            <span className="font-label cursor-default text-label-md font-bold text-secondary">
              Şifremi unuttum
            </span>
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
