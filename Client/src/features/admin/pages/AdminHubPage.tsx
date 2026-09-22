import { AdminHubHeader } from '../components/AdminHubHeader'
import { AdminModuleGrid } from '../components/AdminModuleGrid'
import { adminHubProfile } from '../utils/adminHubPlaceholders'

export function AdminHubPage() {
  const profile = adminHubProfile

  return (
    <main className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
      <AdminHubHeader profile={profile} />
      <AdminModuleGrid modules={profile.modules} />
    </main>
  )
}
