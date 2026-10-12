import { Link } from 'react-router-dom'
import { PageBackButton } from '@/core/components/PageBackButton'
import { PageBreadcrumbHome } from '@/core/components/PageBreadcrumbHome'
import type { PostResponseDto } from '../postTypes'

type PostDetailBreadcrumbProps = {
  post: PostResponseDto
}

export function PostDetailBreadcrumb({ post }: PostDetailBreadcrumbProps) {
  return (
    <div className="w-full border-b border-surface-container bg-surface-container-low">
      <div className="mx-auto flex max-w-[1360px] flex-wrap items-center gap-space-md px-4 py-space-sm sm:px-6 lg:px-12">
        <PageBackButton to="/gonderiler" label="Gönderiler listesine dön" />
        <nav
          aria-label="Breadcrumb"
          className="font-label flex min-w-0 flex-1 flex-wrap items-center gap-space-xs text-label-md text-on-surface-variant"
        >
          <PageBreadcrumbHome />
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <Link to="/gonderiler" className="transition-colors hover:text-primary">
            Gönderiler
          </Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-on-surface-variant">{post.categoryName}</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="line-clamp-1 font-bold text-primary">{post.title}</span>
        </nav>
      </div>
    </div>
  )
}
