import { useState } from 'react'
import type { PostDetailProfile } from '../utils/postDetailTypes'

type PostDetailHeaderProps = {
  post: PostDetailProfile
  textScale: number
  onTextScaleChange: (value: number) => void
}

export function PostDetailHeader({
  post,
  textScale,
  onTextScaleChange,
}: PostDetailHeaderProps) {
  const [following, setFollowing] = useState(false)

  return (
    <>
      <div className="mb-space-lg max-w-4xl">
        <div className="font-body mb-space-xs flex flex-wrap items-center gap-space-md text-body-sm text-on-surface-variant">
          <span className="flex items-center gap-1 font-bold text-secondary">
            <span className="h-2 w-2 rounded-full bg-secondary-container" />
            {post.dossierLabel}
          </span>
          <span>•</span>
          <span>{post.readTimeLabel}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">visibility</span>
            {post.viewsLabel}
          </span>
        </div>
        <h1 className="font-display mb-space-md text-headline-lg leading-none tracking-tight text-primary uppercase md:text-display-xl">
          {post.title}
        </h1>
        <p className="font-body bg-surface-container-lowest p-space-md text-body-lg leading-relaxed font-normal text-on-surface-variant shadow-sm">
          {post.lead}
        </p>
      </div>

      <div className="mb-space-lg flex flex-col justify-between gap-space-md bg-surface-container-lowest p-space-md shadow-sm md:flex-row md:items-center">
        <div className="flex items-center gap-space-md">
          <div className="relative">
            <img
              src={post.author.imageUrl}
              alt=""
              className="h-14 w-14 object-cover ring-2 ring-primary-container"
            />
            <span className="absolute -right-1 -bottom-1 flex h-4 w-4 items-center justify-center rounded-full bg-secondary-container text-[10px] font-bold text-primary">
              ✓
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-space-xs">
              <span className="font-headline text-headline-sm text-primary">
                {post.author.username}
              </span>
              <span className="bg-surface-container px-space-xs py-0.5 font-kicker text-kicker text-on-surface-variant uppercase">
                {post.author.roleBadge}
              </span>
            </div>
            <p className="font-body text-body-sm text-on-surface-variant">
              {post.author.subtitle}
            </p>
            <div className="font-label mt-0.5 flex flex-wrap items-center gap-space-sm text-label-md text-on-surface">
              <span className="font-bold text-primary">{post.author.postsLabel}</span>
              <span className="text-outline">•</span>
              <span>{post.author.readsLabel}</span>
              <span className="text-outline">•</span>
              <span className="font-bold text-secondary">{post.author.trustLabel}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-space-xs">
          <button
            type="button"
            onClick={() => {
              setFollowing((value) => !value)
            }}
            className="bg-primary-container px-space-md py-space-xs font-label text-label-md tracking-wider text-on-primary uppercase shadow-sm transition-colors hover:bg-primary"
          >
            {following ? 'Takip Ediliyor' : 'Yazarı Takip Et'}
          </button>
          <div className="flex items-center bg-surface-container p-0.5">
            <button
              type="button"
              title="Küçült"
              onClick={() => {
                onTextScaleChange(Math.max(0.9, textScale - 0.05))
              }}
              className="px-space-xs py-1 text-on-surface transition-colors hover:text-primary"
            >
              <span className="font-headline text-label-md font-bold">A-</span>
            </button>
            <span className="px-1 text-outline-variant">|</span>
            <button
              type="button"
              title="Büyüt"
              onClick={() => {
                onTextScaleChange(Math.min(1.2, textScale + 0.05))
              }}
              className="px-space-xs py-1 text-on-surface transition-colors hover:text-primary"
            >
              <span className="font-headline text-label-md font-bold">A+</span>
            </button>
          </div>
          <button
            type="button"
            title="Kaydet"
            className="bg-surface-container p-space-xs text-on-surface transition-colors hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-[20px]">bookmark</span>
          </button>
          <button
            type="button"
            title="Paylaş"
            className="bg-surface-container p-space-xs text-on-surface transition-colors hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-[20px]">share</span>
          </button>
        </div>
      </div>
    </>
  )
}
