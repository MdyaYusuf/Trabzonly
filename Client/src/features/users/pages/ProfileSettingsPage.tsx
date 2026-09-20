import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '@/features/auth/authService'
import { ProfileEditForm } from '../components/ProfileEditForm'
import { ProfilePasswordForm } from '../components/ProfilePasswordForm'
import { ProfileSettingsBreadcrumb } from '../components/ProfileSettingsBreadcrumb'
import { ProfileSettingsHero } from '../components/ProfileSettingsHero'
import { ProfileSettingsSidebar } from '../components/ProfileSettingsSidebar'

export function ProfileSettingsPage() {
  const navigate = useNavigate()
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  function showToast(message: string) {
    setToastMessage(message)
  }

  function handleLogout() {
    authService.logout()
    navigate('/login')
  }

  return (
    <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
      <ProfileSettingsBreadcrumb />
      <ProfileSettingsHero onLogout={handleLogout} />

      <div className="mx-auto w-full max-w-[1360px] px-4 py-space-xl sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-gutter lg:grid-cols-12">
          <div className="flex flex-col gap-space-xl lg:col-span-7">
            {toastMessage ? (
              <div className="flex items-center justify-between bg-secondary-container px-space-md py-space-sm text-on-secondary-container shadow-sm">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  <span className="font-label text-label-md">{toastMessage}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setToastMessage(null)
                  }}
                  className="hover:opacity-75"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
            ) : null}

            <ProfileEditForm
              onSaved={() => {
                showToast('Profil ve taktik kimlik verileriniz başarıyla güncellendi.')
              }}
            />
            <ProfilePasswordForm
              onUpdated={() => {
                showToast('Şifreniz başarıyla güncellendi.')
              }}
            />
          </div>

          <ProfileSettingsSidebar />
        </div>
      </div>
    </main>
  )
}
