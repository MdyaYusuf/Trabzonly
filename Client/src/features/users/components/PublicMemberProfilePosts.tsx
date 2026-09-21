import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { PublicMemberPost } from '../utils/publicMemberProfileTypes'

type PublicMemberProfilePostsProps = {
  posts: PublicMemberPost[]
}

const categoryClass = {
  primary: 'bg-primary text-on-primary',
  secondary: 'bg-secondary text-on-secondary',
  tertiary: 'bg-tertiary-container text-tertiary-fixed-dim',
} as const

export function PublicMemberProfilePosts({ posts }: PublicMemberProfilePostsProps) {
  const [sort, setSort] = useState<'newest' | 'popular'>('newest')

  const sorted =
    sort === 'popular'
      ? [...posts].sort((a, b) => b.likeCount - a.likeCount)
      : posts

  return (
    <section className="flex flex-col gap-space-md">
      <div className="flex flex-wrap items-center justify-between gap-space-sm border-b border-outline-variant/40 pb-space-sm">
        <div className="flex items-center gap-space-xs">
          <span className="h-3 w-3 bg-primary" />
          <h2 className="font-headline text-headline-sm font-extrabold text-primary uppercase">
            Üyenin Gönderileri & Taktik Yazıları
          </h2>
        </div>
        <div className="font-label flex items-center gap-space-xs text-label-md text-on-surface-variant">
          <span>Sırala:</span>
          <button
            type="button"
            onClick={() => {
              setSort('newest')
            }}
            className={sort === 'newest' ? 'font-bold text-primary' : 'hover:text-primary'}
          >
            En Yeniler
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => {
              setSort('popular')
            }}
            className={sort === 'popular' ? 'font-bold text-primary' : 'hover:text-primary'}
          >
            En Çok Okunan
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-space-md">
        {sorted.map((post) => (
          <article
            key={post.id}
            className="grid grid-cols-1 gap-space-md border border-outline-variant/40 bg-surface-container-lowest p-space-md sm:grid-cols-12"
          >
            <div
              className={`relative h-36 overflow-hidden bg-gradient-to-br sm:col-span-4 sm:h-auto ${post.imageTone}`}
              role="img"
              aria-label={post.title}
            >
              <span
                className={`font-kicker absolute top-2 left-2 px-space-xs py-0.5 text-kicker font-bold uppercase ${categoryClass[post.categoryTone]}`}
              >
                {post.categoryLabel}
              </span>
            </div>

            <div className="flex flex-col gap-space-sm sm:col-span-8">
              <div className="font-body flex flex-wrap items-center gap-space-xs text-body-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                <span>{post.readTime}</span>
                <span>•</span>
                <span>{post.publishedLabel}</span>
              </div>
              <h3 className="font-headline text-headline-sm font-bold text-on-surface">
                {post.title}
              </h3>
              <p className="font-body line-clamp-3 text-body-sm text-on-surface-variant">
                {post.excerpt}
              </p>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-space-sm border-t border-outline-variant/30 pt-space-sm">
                <div className="font-label flex items-center gap-space-md text-label-md text-on-surface-variant">
                  <span className="inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">favorite</span>
                    {post.likeCount}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">chat_bubble</span>
                    {post.commentCount}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">bookmark</span>
                    {post.saveCount}
                  </span>
                </div>
                <Link
                  to={`/gonderiler/${post.id}`}
                  className="font-label inline-flex items-center gap-1 text-label-md font-bold text-primary uppercase transition-colors hover:text-primary-container"
                >
                  Tamamını Oku
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
