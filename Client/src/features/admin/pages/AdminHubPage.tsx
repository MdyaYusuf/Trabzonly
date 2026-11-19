import { useEffect, useState } from 'react'
import contactMessageService from '@/features/contactMessages/contactMessageService'
import { AdminHubHeader } from '../components/AdminHubHeader'
import { AdminModuleGrid } from '../components/AdminModuleGrid'
import { adminHubProfile } from '../utils/adminHubConfig'

export function AdminHubPage() {
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadUnreadHint() {
      const result = await contactMessageService.getHasUnread()

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setHasUnreadMessages(result.data.hasUnread)
      } else {
        setHasUnreadMessages(false)
      }
    }

    void loadUnreadHint()

    return () => {
      cancelled = true
    }
  }, [])

  const modules = adminHubProfile.modules.map((module) => {
    if (module.id !== 'contact-messages') {
      return module
    }

    return {
      ...module,
      hasUnreadHint: hasUnreadMessages,
    }
  })

  return (
    <main className="mx-auto flex w-full max-w-[1520px] flex-col gap-space-md px-4 pt-14 pb-space-lg sm:px-6 sm:pt-16 lg:px-10">
      <AdminHubHeader profile={adminHubProfile} />
      <AdminModuleGrid modules={modules} />
    </main>
  )
}
