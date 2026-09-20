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
  const metaParts = [post.publishedLabel, post.readTimeLabel].filter(Boolean)
  const detailPath = `/gonderiler/${post.id}`

  return (
    <article
      className={[
        'group relative flex flex-col gap-space-md bg-surface-container-lowest p-space-lg shadow-sm',
        post.featured ? 'overflow-hidden' : '',
      ].join(' ')}
    >
      {post.featured ? (
        <div className="absolute top-0 left-0 h-full w-2 bg-primary-container" />
      ) : null}

      <div
        className={[
          'flex flex-wrap items-center justify-between gap-space-xs',
          post.featured ? 'pl-space-xs' : '',
        ].join(' ')}
      >
        <div className="flex items-center gap-space-sm">
          <span
            className={[
              'px-space-sm py-space-xs font-kicker text-kicker font-bold uppercase',
              categoryToneClass[post.categoryTone],
            ].join(' ')}
          >
            {post.categoryLabel}
          </span>
          {post.badge ? (
            <span
              className={[
                'font-kicker text-kicker font-bold tracking-wider uppercase',
                post.badgeTone === 'tertiary'
                  ? 'bg-tertiary-container px-space-xs py-space-xs text-tertiary-fixed-dim'
                  : 'text-secondary',
              ].join(' ')}
            >
              {post.badge}
            </span>
          ) : null}
        </div>
        <span className="font-body text-body-sm text-on-surface-variant">
          {metaParts.join(' • ')}
        </span>
      </div>

      {post.featured && post.imageUrl ? (
        <div className="relative h-72 w-full overflow-hidden bg-surface-container">
          <img
            src={post.imageUrl}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
          />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-primary/90 via-primary/20 to-transparent p-space-md">
            {post.imageOverlayLabel ? (
              <span className="bg-primary/80 px-space-sm py-space-xs font-kicker text-kicker font-bold tracking-widest text-tertiary-fixed-dim uppercase">
                {post.imageOverlayLabel}
              </span>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className={['flex flex-col gap-space-xs', post.featured ? 'pl-space-xs' : ''].join(' ')}>
        <Link
          to={detailPath}
          className="font-headline text-headline-md leading-snug font-bold text-primary uppercase transition-colors hover:text-primary-container"
        >
          {post.title}
        </Link>
        <p
          className={[
            'font-body text-body-md text-on-surface-variant',
            post.featured ? 'line-clamp-2' : '',
          ].join(' ')}
        >
          {post.excerpt}
        </p>
      </div>

      {post.pollSnippet ? (
        <div className="flex items-center justify-between gap-space-md bg-surface-container p-space-sm">
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-secondary">analytics</span>
            <span className="font-kicker text-kicker font-bold text-on-surface uppercase">
              {post.pollSnippet.label}
            </span>
            <span className="font-body text-body-sm font-bold text-primary">
              {post.pollSnippet.result}
            </span>
          </div>
          <span className="font-kicker text-kicker text-on-surface-variant uppercase">
            {post.pollSnippet.votesLabel}
          </span>
        </div>
      ) : null}

      <div
        className={[
          'flex flex-wrap items-center justify-between gap-space-sm border-t border-surface-container pt-space-sm',
          post.featured ? 'pl-space-xs' : '',
        ].join(' ')}
      >
        <div className="flex items-center gap-space-sm">
          <div
            className={[
              'flex h-10 w-10 items-center justify-center font-headline text-label-md font-bold',
              avatarToneClass[post.authorAvatarTone],
            ].join(' ')}
          >
            {post.authorInitials}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-space-xs">
              <span className="font-label text-label-md font-bold text-on-surface">
                {post.authorUsername}
              </span>
              {post.verified ? (
                <span className="material-symbols-outlined text-sm text-secondary">verified</span>
              ) : null}
            </div>
            <span className="font-kicker text-kicker text-on-surface-variant uppercase">
              {post.authorRole}
            </span>
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

          {post.showBookmark ? (
            <button
              type="button"
              className={[
                'bg-surface-container text-on-surface transition-colors hover:bg-surface-container-high',
                post.showSaveLabel
                  ? 'flex items-center gap-space-xs px-space-sm py-space-xs font-label text-label-md font-bold'
                  : 'p-space-xs',
              ].join(' ')}
            >
              <span className="material-symbols-outlined text-base">bookmark</span>
              {post.showSaveLabel ? <span>Kaydet</span> : null}
            </button>
          ) : null}

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
