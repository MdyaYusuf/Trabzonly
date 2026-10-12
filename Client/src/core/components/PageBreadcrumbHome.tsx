import { Link } from 'react-router-dom'

export function PageBreadcrumbHome() {
  return (
    <Link to="/" className="flex items-center gap-1 transition-colors hover:text-primary">
      <span className="material-symbols-outlined text-[16px]">home</span>
      <span>Ana Sayfa</span>
    </Link>
  )
}
