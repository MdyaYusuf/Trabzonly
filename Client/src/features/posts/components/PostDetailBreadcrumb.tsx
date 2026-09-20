import { Link } from 'react-router-dom'
import type { PostDetailProfile } from '../utils/postDetailTypes'

type PostDetailBreadcrumbProps = {
  post: PostDetailProfile
}

export function PostDetailBreadcrumb({ post }: PostDetailBreadcrumbProps) {
  return (
    <section className="w-full bg-surface-container-low">
      <div className="mx-auto flex max-w-[1360px] flex-wrap items-center justify-between gap-space-sm px-4 py-space-sm sm:px-6 lg:px-12">
        <div className="font-label flex flex-wrap items-center gap-space-xs text-label-md text-on-surface-variant">
          <Link
            to="/gonderiler"
            className="flex items-center gap-1 font-bold text-primary-container transition-colors hover:text-primary"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Gönderilere Dön</span>
          </Link>
          <span className="text-outline">/</span>
          <span className="tracking-wider text-on-surface-variant uppercase">
            {post.categoryLabel}
          </span>
          <span className="text-outline">/</span>
          <span className="max-w-md truncate font-semibold text-on-surface">
            {post.breadcrumbTitle}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-space-md">
          <span className="bg-primary-container px-space-xs py-0.5 font-kicker text-kicker tracking-widest text-on-primary uppercase">
            {post.categoryLabel}
          </span>
          {post.isEditorsPick ? (
            <span className="flex items-center gap-1 bg-tertiary-container px-space-xs py-0.5 font-kicker text-kicker tracking-wider text-tertiary-fixed uppercase">
              <span
                className="material-symbols-outlined text-[13px] text-tertiary-fixed-dim"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span>Editörün Seçimi</span>
            </span>
          ) : null}
          <span className="font-body hidden items-center gap-1 text-body-sm text-on-surface-variant md:inline-flex">
            <span className="material-symbols-outlined text-[15px]">schedule</span>
            <span>{post.publishedLabel}</span>
          </span>
        </div>
      </div>
    </section>
  )
}
