import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AuthCard, AuthPageShell } from '@/features/auth/components/AuthPageShell'
import { authService } from '@/features/auth/authService'
import { setCredentials } from '@/features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '@/core/store/hooks'

export function VerifyEmailPage() {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email')?.trim() ?? ''
  const token = searchParams.get('token')?.trim() ?? ''
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('E-posta adresiniz doğrulanıyor...')
  const [isResending, setIsResending] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function verify() {
      if (!email || !token) {
        if (!cancelled) {
          setStatus('error')
          setMessage('Doğrulama bağlantısı eksik veya geçersiz.')
        }
        return
      }

      try {
        const response = await authService.verifyEmail({ email, token })

        if (cancelled) {
          return
        }

        if (response.success) {
          setStatus('success')
          setMessage(response.message || 'E-posta adresiniz doğrulandı.')

          if (isAuthenticated) {
            try {
              const me = await authService.checkAuth()

              if (me.success && me.data) {
                dispatch(setCredentials(me.data))
              }
            } catch {
              // Banner will clear on next session restore.
            }
          }

          return
        }

        setStatus('error')
        setMessage(response.message || 'Doğrulama başarısız.')
      } catch {
        if (!cancelled) {
          setStatus('error')
          setMessage('Doğrulama başarısız. Bağlantı geçersiz veya süresi dolmuş olabilir.')
        }
      }
    }

    void verify()

    return () => {
      cancelled = true
    }
  }, [dispatch, email, isAuthenticated, token])

  async function handleResend() {
    if (!email || isResending) {
      return
    }

    setIsResending(true)

    try {
      const response = await authService.resendEmailConfirmation({ email })

      if (response.success) {
        setMessage(
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

  return (
    <AuthPageShell>
      <AuthCard
        title="E-posta Doğrulama"
        subtitle="Hesabını etkinleştirmek için e-posta adresini onaylıyoruz."
      >
        <div className="flex flex-col gap-space-md">
          <div
            className={`flex items-start gap-2 rounded p-space-sm font-body text-body-sm ${
              status === 'success'
                ? 'bg-surface-container text-primary'
                : status === 'error'
                  ? 'bg-error-container text-on-error-container'
                  : 'bg-surface-container text-on-surface-variant'
            }`}
            role="status"
          >
            <span className="material-symbols-outlined text-[18px]">
              {status === 'success'
                ? 'verified'
                : status === 'error'
                  ? 'error'
                  : 'progress_activity'}
            </span>
            <span>{message}</span>
          </div>

          {status === 'success' ? (
            <Link
              to="/login"
              className="flex w-full items-center justify-center bg-primary-container px-space-lg py-3.5 font-headline text-headline-sm tracking-wider text-on-primary uppercase"
            >
              Giriş Yap
            </Link>
          ) : null}

          {status === 'error' && email ? (
            <button
              type="button"
              className="font-body text-body-sm font-bold text-primary underline hover:text-secondary disabled:opacity-60"
              onClick={() => void handleResend()}
              disabled={isResending}
            >
              {isResending ? 'Gönderiliyor...' : 'Doğrulama e-postasını yeniden gönder'}
            </button>
          ) : null}
        </div>
      </AuthCard>
    </AuthPageShell>
  )
}
