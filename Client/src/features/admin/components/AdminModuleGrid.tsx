import { AdminModuleCardView } from './AdminModuleCard'
import type { AdminModuleCard } from '../utils/adminHubTypes'

type AdminModuleGridProps = {
  modules: AdminModuleCard[]
}

export function AdminModuleGrid({ modules }: AdminModuleGridProps) {
  return (
    <section className="grid grid-cols-1 gap-gutter md:grid-cols-2 xl:grid-cols-3">
      {modules.map((module) => (
        <AdminModuleCardView key={module.id} module={module} />
      ))}
    </section>
  )
}
