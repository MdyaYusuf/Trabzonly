import { Link } from 'react-router-dom'
import type { PostResponseDto } from '../postTypes'

type PostDetailBreadcrumbProps = {
  post: PostResponseDto
}

export function PostDetailBreadcrumb({ post }: PostDetailBreadcrumbProps) {
  return (
    <div className="w-full border-b border-surface-container bg-surface-container-low">
      <div className="mx-auto flex max-w-[1360px] flex-wrap items-center gap-space-xs px-4 py-space-sm sm:px-6 lg:px-12">
        <Link
          to="/gonderiler"
          className="font-label text-label-md font-bold text-primary hover:text-primary-container"
        >
          Gönderiler
        </Link>
        <span className="text-outline-variant">/</span>
        <span className="font-label text-label-md text-on-surface-variant">{post.categoryName}</span>
        <span className="text-outline-variant">/</span>
        <span className="font-label line-clamp-1 text-label-md text-on-surface">{post.title}</span>
      </div>
    </div>
  )
}
