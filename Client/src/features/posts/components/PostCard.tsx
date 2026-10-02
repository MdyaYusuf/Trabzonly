import { Link } from 'react-router-dom'
import type { CategoryBadgeTone, FeedPostCard } from '../utils/postsFeedTypes'

const categoryToneClass: Record<CategoryBadgeTone, string> = {
  primary: 'bg-primary text-on-primary',
  'primary-container': 'bg-primary-container text-on-primary',
  secondary: 'bg-secondary text-on-secondary',
}

const avatarToneClass: Record<CategoryBadgeTone, string> = {
  primary: 'bg-primary text-on-primary',
  'primary-container': 'bg-primary-container text-on-primary',
  secondary: 'bg-secondary text-on-secondary',
}

type PostCardProps = {
  post: FeedPostCard
}

export function PostCard({ post }: PostCardProps) {
  const detailPath = `/gonderiler/${post.id}`

  return (
    <article className="group relative flex flex-col gap-space-md bg-surface-container-lowest p-space-lg shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-space-xs">
        <div className="flex items-center gap-space-sm">
          <span
            className={[
              'px-space-sm py-space-xs font-kicker text-kicker font-bold uppercase',
              categoryToneClass[post.categoryTone],
            ].join(' ')}
          >
            {post.categoryLabel}
          </span>
        </div>
        <span className="font-body text-body-sm text-on-surface-variant">{post.publishedLabel}</span>
      </div>

      {post.imageUrl ? (
        <div className="relative h-56 w-full overflow-hidden bg-surface-container sm:h-72">
          <img
            src={post.imageUrl}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
          />
        </div>
      ) : null}

      <div className="flex flex-col gap-space-xs">
        <Link
          to={detailPath}
          className="font-headline text-headline-md leading-snug font-bold text-primary uppercase transition-colors hover:text-primary-container"
        >
          {post.title}
        </Link>
        <p className="font-body line-clamp-3 text-body-md text-on-surface-variant">{post.excerpt}</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-space-sm border-t border-surface-container pt-space-sm">
        <div className="flex items-center gap-space-sm">
          <div
            className={[
              'flex h-10 w-10 items-center justify-center font-headline text-label-md font-bold',
              avatarToneClass[post.categoryTone],
            ].join(' ')}
          >
            {post.authorInitials}
          </div>
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-space-xs">
              <span className="font-label text-label-md font-bold text-on-surface">
                @{post.authorUsername}
              </span>
              {post.authorDisplayTag ? (
                <span className="bg-secondary px-1.5 py-0.5 font-kicker text-[9px] font-bold text-on-secondary uppercase">
                  {post.authorDisplayTag}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-space-xs">
          <div className="flex items-center bg-surface-container">
            <button
              type="button"
              className="flex items-center gap-space-xs px-space-sm py-space-xs font-label text-label-md font-bold text-primary transition-colors hover:bg-secondary-container hover:text-on-secondary-container"
            >
              <span className="font-bold text-secondary">▲</span>
              <span>{post.likeCount}</span>
            </button>
            <div className="h-4 w-px bg-surface-container-highest" />
            <button
              type="button"
              className="flex items-center gap-space-xs px-space-sm py-space-xs font-label text-label-md font-bold text-on-surface-variant transition-colors hover:bg-error-container hover:text-on-error-container"
            >
              <span className="font-bold text-error">▼</span>
              <span>{post.dislikeCount}</span>
            </button>
          </div>

          <Link
            to={detailPath}
            className="flex items-center gap-space-xs bg-surface-container px-space-sm py-space-xs font-label text-label-md font-bold text-on-surface transition-colors hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-base">chat_bubble</span>
            <span>{post.commentCount} Yorum</span>
          </Link>

          <button
            type="button"
            className="bg-surface-container p-space-xs text-on-surface transition-colors hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-base">share</span>
          </button>
        </div>
      </div>
    </article>
  )
}
