import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AdminNavPanel } from '@/features/admin/components/AdminNavPanel'
import { AdminSidebar } from '@/features/admin/components/AdminSidebar'
import { AdminTopBar } from '@/features/admin/components/AdminTopBar'

export function AdminLayout() {
  const location = useLocation()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    setMobileNavOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!mobileNavOpen) {
      return
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMobileNavOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [mobileNavOpen])

  return (
    <div className="flex min-h-screen bg-background text-on-surface">
      <div className="hidden lg:flex">
        <AdminSidebar />
      </div>

      {mobileNavOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Menüyü kapat"
            className="absolute inset-0 cursor-pointer bg-black/45"
            onClick={() => {
              setMobileNavOpen(false)
            }}
          />
          <div className="relative flex h-full w-64 max-w-[85vw] shadow-2xl">
            <AdminNavPanel
              className="min-h-full"
              onNavigate={() => {
                setMobileNavOpen(false)
              }}
            />
            <button
              type="button"
              aria-label="Menüyü kapat"
              className="absolute top-space-sm right-space-sm flex h-9 w-9 cursor-pointer items-center justify-center bg-white/10 text-on-primary transition-colors hover:bg-white/20"
              onClick={() => {
                setMobileNavOpen(false)
              }}
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopBar
          onMenuClick={() => {
            setMobileNavOpen(true)
          }}
        />

        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
