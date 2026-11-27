import { Outlet } from 'react-router-dom'
import { SiteFooter } from '@/core/components/layout/SiteFooter'
import { SiteHeader } from '@/core/components/layout/SiteHeader'
import { EmailConfirmationBanner } from '@/features/auth/components/EmailConfirmationBanner'

export function PublicLayout() {
  return (
    <>
      <SiteHeader />
      <EmailConfirmationBanner />
      <Outlet />
      <SiteFooter />
    </>
  )
}
