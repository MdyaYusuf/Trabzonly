import { useState } from 'react'
import { authService } from '@/features/auth/authService'
import { useAppSelector } from '@/core/store/hooks'
import { toast } from 'react-toastify'

export function EmailConfirmationBanner() {
  const user = useAppSelector((state) => state.auth.user)
  const [isResending, setIsResending] = useState(false)

  if (!user || user.emailConfirmed) {
    return null
  }

  async function handleResend() {
    if (!user?.email || isResending) {
      return
    }

    setIsResending(true)

    try {
      const response = await authService.resendEmailConfirmation({ email: user.email })

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

  return (
    <div className="fixed top-16 right-0 left-0 z-40 border-b border-secondary-container/30 bg-surface-container-lowest/95 px-6 py-3 backdrop-blur-sm sm:top-20 sm:px-10 lg:px-14 xl:px-16">
      <div className="mx-auto flex w-full max-w-[1520px] flex-wrap items-center justify-between gap-3">
        <p className="font-body text-body-sm text-on-surface">
          E-posta adresiniz henüz doğrulanmadı. Gönderi, yorum ve diğer etkileşimler için
          gelen kutunuzdaki bağlantıyı kullanın.
        </p>
        <button
          type="button"
          className="font-label shrink-0 text-label-md font-bold tracking-wider text-primary uppercase underline decoration-secondary decoration-2 underline-offset-4 hover:text-secondary disabled:opacity-60"
          onClick={() => void handleResend()}
          disabled={isResending}
        >
          {isResending ? 'Gönderiliyor...' : 'Yeniden gönder'}
        </button>
      </div>
    </div>
  )
}
