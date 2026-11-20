import { SiteFooter } from '@/core/components/layout/SiteFooter'
import { SiteHeader } from '@/core/components/layout/SiteHeader'
import { ServerErrorPage } from './ServerErrorPage'

/** Used as a router errorElement so header/footer still render outside PublicLayout. */
export function StatusErrorBoundary() {
  return (
    <>
      <SiteHeader />
      <ServerErrorPage />
      <SiteFooter />
    </>
  )
}
