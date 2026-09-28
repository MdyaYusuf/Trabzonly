import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { AuthCard, AuthPageShell } from '@/features/auth/components/AuthPageShell'
import { authService } from '@/features/auth/authService'

const FORGOT_DESCRIPTION =
  'Bağımsız Trabzonspor dijital taraftar topluluğuna hoş geldin. Hüseyin Avni Aker inancıyla, Akyazı tutkusuyla; parola sıfırlama işlemlerini güvenle tamamlayabilir, fırtınanın hakiki sesine yeniden katılabilirsin.'

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

  function handleRequestAgain() {
    setIsSent(false)
  }

  return (
    <AuthPageShell description={FORGOT_DESCRIPTION} showSecurityBanner>
      {isSent ? (
        <AuthCard
          brandKicker="TARAFTAR PLATFORMU GÜVENLİK MERKEZİ"
          footer={
            <div className="mt-space-lg pt-space-sm text-center">
              <span className="font-kicker text-kicker tracking-widest text-on-surface-variant uppercase">
                HESAP GÜVENLİĞİ • BORDO - MAVİ KORUMA KODU
              </span>
            </div>
          }
        >
          <div className="flex flex-col">
            <div className="mb-space-lg flex items-center justify-center">
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-secondary-fixed/50">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-container shadow-inner">
                  <span className="material-symbols-outlined text-3xl text-on-primary">
                    mark_email_read
                  </span>
                </div>
                <div className="absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-on-secondary">
                  <span className="material-symbols-outlined text-sm font-bold">check</span>
                </div>
              </div>
            </div>

            <div className="mb-space-lg flex flex-col gap-space-xs text-center">
              <span className="font-kicker text-kicker font-bold tracking-widest text-secondary uppercase">
                GÜVENLİ TARAFTAR PROTOKOLÜ
              </span>
              <h2 className="font-headline text-headline-md font-bold tracking-tight text-on-surface uppercase">
                Sıfırlama Bağlantısı Gönderildi
              </h2>
              <p className="mx-auto max-w-md font-body text-body-md text-on-surface-variant">
                Belirttiğin adrese şifre sıfırlama yönergelerini içeren tek kullanımlık güvenli bir
                bağlantı gönderdik. Lütfen gelen kutunu ve gerekiyorsa spam/istenmeyen klasörünü
                kontrol et.
              </p>
            </div>

            <div className="mb-space-lg flex items-start gap-space-md rounded-lg bg-surface-container p-space-md">
              <span className="material-symbols-outlined mt-0.5 shrink-0 text-2xl text-primary">
                lock_clock
              </span>
              <div className="flex flex-col gap-space-xs text-left">
                <span className="font-label text-label-md font-bold text-on-surface uppercase">
                  Zaman Aşımı ve Gizlilik İlkesi
                </span>
                <p className="font-body text-body-sm text-on-surface-variant">
                  Eğer sistemimizde bu e-posta adresiyle eşleşen bir taraftar hesabı bulunuyorsa,
                  sıfırlama bağlantısı iletilmiştir. Bağlantı <strong>1 saat</strong> boyunca
                  geçerlidir. E-posta ulaşmadıysa tekrar gönderebilirsin.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-space-sm">
              <Link
                to="/login"
                className="flex w-full items-center justify-center gap-space-sm bg-primary-container px-space-lg py-4 font-headline text-headline-sm font-bold tracking-wider text-on-primary uppercase shadow-md transition-all hover:bg-primary"
              >
                <span className="material-symbols-outlined text-xl">login</span>
                <span>GİRİŞ SAYFASINA DÖN</span>
              </Link>
              <button
                type="button"
                onClick={handleRequestAgain}
                className="flex w-full items-center justify-center gap-space-xs bg-surface-container px-space-lg py-3 font-label text-label-md font-bold tracking-wider text-on-surface uppercase transition-all hover:bg-surface-container-high"
              >
                <span className="material-symbols-outlined text-base">refresh</span>
                <span>Tekrar Bağlantı İste</span>
              </button>
            </div>
          </div>
        </AuthCard>
      ) : (
        <AuthCard
          title="Şifremi Unuttum"
          subtitle="Kayıtlı e-posta adresini gir, hesabına ait güvenli şifre sıfırlama bağlantısını hemen iletelim."
          brandKicker="TARAFTAR PLATFORMU GÜVENLİK MERKEZİ"
        >
          <form className="flex flex-col gap-space-md" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <label
                  className="font-label text-label-md font-bold tracking-wider text-on-surface uppercase"
                  htmlFor="forgot-email"
                >
                  E-POSTA ADRESİ
                </label>
                <span className="font-kicker text-kicker font-bold text-secondary uppercase">
                  ZORUNLU ALAN
                </span>
              </div>
              <div className="relative flex items-center rounded bg-surface-container-low">
                <span className="material-symbols-outlined pointer-events-none absolute left-space-md text-xl text-on-surface-variant">
                  mail
                </span>
                <input
                  id="forgot-email"
                  className="w-full rounded bg-transparent py-3.5 pr-space-md pl-12 font-body text-body-md text-on-surface transition-colors placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none"
                  placeholder="yoldas@trabzon.net veya kayitli e-postan"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <span className="font-body text-body-sm text-on-surface-variant">
                Hesabına tanımlı kurumsal veya kişisel posta adresini eksiksiz girmelisin.
              </span>
            </div>

            <button
              className="group mt-space-sm flex w-full items-center justify-center gap-space-sm bg-primary-container px-space-lg py-4 font-headline text-headline-sm font-bold tracking-wider text-on-primary uppercase shadow-md transition-all hover:bg-primary disabled:cursor-not-allowed disabled:opacity-75"
              type="submit"
              disabled={isSubmitting}
            >
              <span>BAĞLANTI GÖNDER</span>
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </button>
          </form>

          <div className="mt-space-md flex flex-col items-center justify-center gap-space-xs rounded bg-surface-container-low/50 p-space-md pt-space-lg text-center">
            <span className="font-body text-body-md text-on-surface-variant">
              Şifreni hatırladın mı?
              <Link
                to="/login"
                className="font-label ml-1 text-label-md font-bold text-primary uppercase underline underline-offset-4 hover:text-primary-container"
              >
                Giriş Yap
              </Link>
            </span>
            <span className="font-body text-body-sm text-on-surface-variant">
              Hesabın yoksa topluluğa katılıp{' '}
              <Link to="/register" className="font-bold text-secondary hover:underline">
                Aramıza Katıl
              </Link>
              .
            </span>
          </div>
        </AuthCard>
      )}
    </AuthPageShell>
  )
}
