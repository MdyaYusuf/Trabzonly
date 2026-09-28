import { useMemo, useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { AuthPageShell } from '@/features/auth/components/AuthPageShell'
import { authService } from '@/features/auth/authService'

const RESET_DESCRIPTION =
  "Dalgalı Karadeniz'in dik duruşu, tribünlerde omuz omuza verilen yarım asırlık mücadele. Trabzonly bağımsız taraftar topluluğunda güvenliğin ve ortak hafızan en yüksek standartlarla korunur."

type PasswordChecks = {
  minLength: boolean
  hasUpper: boolean
  hasLower: boolean
  hasDigit: boolean
}

function evaluatePassword(password: string): PasswordChecks {
  return {
    minLength: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasDigit: /[0-9]/.test(password),
  }
}

function strengthScore(checks: PasswordChecks): number {
  return [checks.minLength, checks.hasUpper, checks.hasLower, checks.hasDigit].filter(Boolean)
    .length
}

function strengthLabel(score: number): string {
  if (score <= 1) {
    return 'PAROLA GÜCÜ: ZAYIF'
  }

  if (score === 2) {
    return 'PAROLA GÜCÜ: ORTA'
  }

  if (score === 3) {
    return 'PAROLA GÜCÜ: İYİ'
  }

  return 'PAROLA GÜCÜ: GÜÇLÜ'
}

export function ResetPasswordPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [email] = useState(searchParams.get('email') ?? '')
  const [token] = useState(searchParams.get('token') ?? '')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const hasValidLink = email.trim().length > 0 && token.trim().length > 0
  const checks = useMemo(() => evaluatePassword(newPassword), [newPassword])
  const score = strengthScore(checks)

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

    if (score < 4) {
      setFormError('Yeni şifre güvenlik kurallarını karşılamıyor.')
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
    <AuthPageShell description={RESET_DESCRIPTION} showSecurityBanner>
      <div className="mx-auto w-full max-w-[560px] lg:ml-auto">
        <div className="bg-surface-container-lowest p-space-lg text-on-surface shadow-2xl lg:p-space-xl">
          <div className="-mx-space-lg -mt-space-lg mb-space-lg flex items-center justify-between bg-surface-container-low px-space-lg py-space-md lg:-mx-space-xl lg:-mt-space-xl lg:px-space-xl">
            <div className="flex items-center gap-space-sm">
              <div className="flex h-8 w-8 items-center justify-center bg-primary font-headline text-headline-sm font-extrabold text-on-primary">
                61
              </div>
              <div className="flex flex-col">
                <span className="font-kicker text-kicker font-bold tracking-widest text-primary uppercase">
                  TRABZONLY GÜVENLİK
                </span>
                <span className="font-body text-[11px] leading-none text-on-surface-variant">
                  HESAP MERKEZİ DOĞRULAMA PROTOKOLÜ
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-surface-container px-2 py-1 font-label text-label-md text-on-surface">
              <span className="material-symbols-outlined text-[16px] text-secondary">vpn_key</span>
              <span>SEC-AUTH</span>
            </div>
          </div>

          {hasValidLink ? (
            <div className="flex flex-col">
              <div className="mb-space-md">
                <h2 className="font-headline text-headline-md font-bold tracking-tight text-primary uppercase">
                  YENİ ŞİFRE BELİRLE
                </h2>
                <p className="font-body mt-1 text-body-md text-on-surface-variant">
                  Hesabınız için yeni ve güçlü bir parola belirleyin. Güncelleme sonrası tüm aktif
                  oturumlarınız güvenle yenilenecektir.
                </p>
              </div>

              <form className="flex flex-col gap-space-md" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <label
                      className="font-kicker text-kicker font-bold tracking-wider text-on-surface uppercase"
                      htmlFor="reset-email"
                    >
                      E-POSTA ADRESİ
                    </label>
                    <span className="inline-flex items-center gap-1 font-kicker text-kicker font-bold text-secondary uppercase">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      DOĞRULANMIŞ HESAP
                    </span>
                  </div>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined pointer-events-none absolute left-space-sm text-[20px] text-on-surface-variant">
                      mail
                    </span>
                    <input
                      id="reset-email"
                      className="w-full cursor-not-allowed bg-surface-container py-space-sm pr-10 pl-10 font-body text-body-md text-on-surface focus:outline-none"
                      type="email"
                      autoComplete="email"
                      readOnly
                      value={email}
                    />
                    <span className="material-symbols-outlined pointer-events-none absolute right-space-sm text-[18px] text-on-surface-variant">
                      lock
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <label
                      className="font-kicker text-kicker font-bold tracking-wider text-on-surface uppercase"
                      htmlFor="reset-password"
                    >
                      YENİ ŞİFRE
                    </label>
                    <span className="font-kicker text-kicker font-bold text-on-surface-variant uppercase">
                      {strengthLabel(score)}
                    </span>
                  </div>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined pointer-events-none absolute left-space-sm text-[20px] text-on-surface-variant">
                      lock_reset
                    </span>
                    <input
                      id="reset-password"
                      className="w-full bg-surface-container-lowest py-space-sm pr-10 pl-10 font-body text-body-md text-on-surface transition-colors focus:bg-surface-container-low focus:outline-none"
                      placeholder="••••••••••••"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={newPassword}
                      onChange={(event) => setNewPassword(event.target.value)}
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
                      className="absolute right-space-sm flex items-center text-on-surface-variant transition-colors hover:text-primary"
                      onClick={() => setShowPassword((value) => !value)}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                  <div className="mt-1 grid h-1.5 w-full grid-cols-4 gap-1 bg-surface-container">
                    <div
                      className={`h-full transition-all ${score >= 1 ? 'bg-primary-container' : 'bg-surface-container-highest'}`}
                    />
                    <div
                      className={`h-full transition-all ${score >= 2 ? 'bg-primary-container' : 'bg-surface-container-highest'}`}
                    />
                    <div
                      className={`h-full transition-all ${score >= 3 ? 'bg-secondary' : 'bg-surface-container-highest'}`}
                    />
                    <div
                      className={`h-full transition-all ${score >= 4 ? 'bg-secondary' : 'bg-surface-container-highest'}`}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    className="font-kicker text-kicker font-bold tracking-wider text-on-surface uppercase"
                    htmlFor="reset-confirm-password"
                  >
                    YENİ ŞİFRE TEKRAR
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined pointer-events-none absolute left-space-sm text-[20px] text-on-surface-variant">
                      lock
                    </span>
                    <input
                      id="reset-confirm-password"
                      className="w-full bg-surface-container-lowest py-space-sm pr-10 pl-10 font-body text-body-md text-on-surface transition-colors focus:bg-surface-container-low focus:outline-none"
                      placeholder="••••••••••••"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={confirmNewPassword}
                      onChange={(event) => setConfirmNewPassword(event.target.value)}
                    />
                    <button
                      type="button"
                      aria-label={showConfirmPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
                      className="absolute right-space-sm flex items-center text-on-surface-variant transition-colors hover:text-primary"
                      onClick={() => setShowConfirmPassword((value) => !value)}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showConfirmPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 bg-surface-container-low p-space-sm">
                  <div className="font-kicker flex items-center gap-1 text-kicker font-bold text-on-surface uppercase">
                    <span className="material-symbols-outlined text-[15px] text-secondary">info</span>
                    PAROLA KRİTERLERİ:
                  </div>
                  <div className="font-body grid grid-cols-1 gap-x-space-md gap-y-1 text-body-sm text-on-surface-variant sm:grid-cols-2">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`h-1.5 w-1.5 ${checks.minLength ? 'bg-secondary' : 'bg-primary-container'}`}
                      />
                      <span>En az 8 karakter</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`h-1.5 w-1.5 ${checks.hasUpper && checks.hasLower ? 'bg-secondary' : 'bg-primary-container'}`}
                      />
                      <span>1 büyük &amp; 1 küçük harf</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`h-1.5 w-1.5 ${checks.hasDigit ? 'bg-secondary' : 'bg-primary-container'}`}
                      />
                      <span>En az 1 rakam</span>
                    </div>
                  </div>
                </div>

                {formError ? (
                  <p className="font-body text-body-sm text-error" role="alert">
                    {formError}
                  </p>
                ) : null}

                <button
                  className="group mt-space-xs flex w-full items-center justify-center gap-space-xs bg-primary-container px-space-md py-space-sm font-headline text-headline-sm tracking-wider text-on-primary uppercase shadow-md transition-all hover:bg-primary disabled:cursor-not-allowed disabled:opacity-75"
                  type="submit"
                  disabled={isSubmitting}
                >
                  <span>ŞİFREYİ GÜNCELLE</span>
                  <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </button>

                <div className="pt-space-xs text-center">
                  <Link
                    to="/login"
                    className="font-label inline-flex items-center gap-1 text-label-md text-on-surface-variant transition-colors hover:text-primary"
                  >
                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                    <span>Giriş sayfasına dön</span>
                  </Link>
                </div>
              </form>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="mb-space-md flex items-start gap-space-md bg-surface-container-low p-space-md">
                <div className="flex shrink-0 items-center justify-center bg-primary-container p-space-sm text-on-primary">
                  <span className="material-symbols-outlined text-[28px]">history_toggle_off</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-kicker text-kicker font-bold tracking-widest text-primary uppercase">
                    GÜVENLİK PROTOKOLÜ UYARISI
                  </span>
                  <h3 className="font-headline mt-1 text-headline-md font-bold tracking-tight text-primary uppercase">
                    BAĞLANTI GEÇERSİZ VEYA SÜRESİ DOLMUŞ
                  </h3>
                </div>
              </div>

              <p className="font-body mb-space-md text-body-md text-on-surface-variant">
                Kullanmaya çalıştığınız şifre sıfırlama bağlantısının 1 saatlik güvenlik süresi
                dolmuş veya bu bağlantı daha önce tek seferlik kullanılmıştır. Güvenliğiniz için
                lütfen yeni bir sıfırlama bağlantısı talep edin.
              </p>

              <div className="mb-space-lg flex flex-col gap-space-xs bg-surface-container p-space-md">
                <div className="font-label flex items-center justify-between text-label-md text-on-surface">
                  <span className="font-kicker text-kicker text-on-surface-variant uppercase">
                    Durum Kodu:
                  </span>
                  <span className="font-kicker text-kicker font-bold text-primary uppercase">
                    #SEC-EXP-61
                  </span>
                </div>
                <div className="font-label flex items-center justify-between text-label-md text-on-surface">
                  <span className="font-kicker text-kicker text-on-surface-variant uppercase">
                    Token Geçerliliği:
                  </span>
                  <span className="font-kicker text-kicker font-bold text-error uppercase">
                    Zaman Aşımı / Tüketildi
                  </span>
                </div>
                <div className="font-label flex items-center justify-between text-label-md text-on-surface">
                  <span className="font-kicker text-kicker text-on-surface-variant uppercase">
                    Koruma:
                  </span>
                  <span className="font-kicker text-kicker font-bold text-secondary uppercase">
                    Tek Kullanımlık Şifreleme
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-space-sm">
                <Link
                  to="/sifremi-unuttum"
                  className="group flex w-full items-center justify-center gap-space-xs bg-primary-container px-space-md py-space-sm font-headline text-headline-sm tracking-wider text-on-primary uppercase shadow-md transition-all hover:bg-primary"
                >
                  <span>YENİ BAĞLANTI İSTE</span>
                  <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
                    refresh
                  </span>
                </Link>
                <Link
                  to="/login"
                  className="w-full bg-surface-container px-space-md py-space-sm text-center font-label text-label-md tracking-wider text-on-surface uppercase transition-all hover:bg-surface-container-high"
                >
                  Giriş Yap
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthPageShell>
  )
}
