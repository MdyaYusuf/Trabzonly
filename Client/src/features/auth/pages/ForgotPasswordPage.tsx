import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { AuthCard, AuthPageShell } from '@/features/auth/components/AuthPageShell'
import { authService } from '@/features/auth/authService'

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSent, setIsSent] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await authService.forgotPassword({ email })

      if (response.success) {
        setIsSent(true)
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
        title="Şifremi Unuttum"
        subtitle="Kayıtlı e-posta adresini gir; şifre sıfırlama bağlantısını göndereceğiz."
      >
        {isSent ? (
          <div className="flex flex-col gap-space-md">
            <div className="flex items-start gap-2 rounded bg-surface-container p-space-sm font-body text-body-sm text-primary">
              <span className="material-symbols-outlined text-[18px]">mark_email_read</span>
              <span>
                Eğer bu e-posta ile kayıtlı bir hesap varsa, şifre sıfırlama bağlantısı gönderildi.
                Gelen kutunu ve spam klasörünü kontrol et.
              </span>
            </div>
            <Link
              to="/login"
              className="font-headline text-center text-body-md font-bold text-primary underline decoration-secondary decoration-2 underline-offset-4 transition-colors hover:text-secondary"
            >
              Giriş sayfasına dön
            </Link>
          </div>
        ) : (
          <form className="flex flex-col gap-space-md" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label
                className="font-label flex items-center justify-between text-label-md font-bold tracking-wider text-on-surface-variant uppercase"
                htmlFor="forgot-email"
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
                  id="forgot-email"
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

            <button
              className="group mt-space-xs flex w-full items-center justify-center gap-space-sm bg-primary-container px-space-lg py-3.5 font-headline text-headline-sm tracking-wider text-on-primary uppercase shadow-md transition-all duration-200 hover:bg-primary hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-75"
              type="submit"
              disabled={isSubmitting}
            >
              <span>BAĞLANTI GÖNDER</span>
              <span className="material-symbols-outlined text-[22px] transition-transform duration-200 group-hover:translate-x-1">
                send
              </span>
            </button>

            <div className="pt-space-xs text-center">
              <p className="font-body text-body-md text-on-surface-variant">
                Şifreni hatırladın mı?{' '}
                <Link
                  to="/login"
                  className="ml-1 font-headline text-body-md font-bold text-primary underline decoration-secondary decoration-2 underline-offset-4 transition-colors hover:text-secondary"
                >
                  Giriş Yap
                </Link>
              </p>
            </div>
          </form>
        )}
      </AuthCard>
    </AuthPageShell>
  )
}
