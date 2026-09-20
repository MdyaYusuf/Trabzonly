import { Outlet } from 'react-router-dom'
import { SiteFooter } from '@/core/components/layout/SiteFooter'
import { SiteHeader } from '@/core/components/layout/SiteHeader'

export function PublicLayout() {
  return (
    <>
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </>
  )
}
