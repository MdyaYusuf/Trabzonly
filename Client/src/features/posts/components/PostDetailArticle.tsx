import { useState } from 'react'
import type { PostDetailProfile } from '../utils/postDetailTypes'

type PostDetailArticleProps = {
  post: PostDetailProfile
  textScale: number
}

export function PostDetailArticle({ post, textScale }: PostDetailArticleProps) {
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likeCount)
  const [dislikeCount, setDislikeCount] = useState(post.dislikeCount)

  return (
    <>
      <div className="relative overflow-hidden bg-surface-container-highest shadow-md">
        <div className="relative aspect-[16/9] w-full">
          <img src={post.heroImageUrl} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary/80 via-transparent to-transparent p-space-md">
            <div className="flex flex-wrap items-center justify-between gap-space-xs text-on-primary">
              <div className="flex items-center gap-space-sm bg-primary/90 px-space-sm py-1">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-secondary-container" />
                <span className="font-kicker text-kicker tracking-widest text-secondary-fixed uppercase">
                  {post.heroHudLabel}
                </span>
              </div>
              <div className="font-label flex items-center gap-space-xs bg-inverse-surface/80 px-space-sm py-1 text-label-md">
                <span className="font-bold text-tertiary-fixed-dim">BLOK BASKI:</span>
                <span>{post.heroHudStat}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="font-body flex items-center justify-between bg-surface-container p-space-sm text-body-sm text-on-surface-variant">
          <span>
            <strong>Görsel 1:</strong> {post.heroCaption}
          </span>
          <span className="font-kicker text-kicker font-bold text-primary uppercase">
            TAKTIK LAB
          </span>
        </div>
      </div>

      <div
        className="font-body flex flex-col gap-space-md bg-surface-container-lowest p-space-lg text-body-md text-on-surface shadow-sm"
        style={{ fontSize: `${textScale}em` }}
      >
        <p className="leading-relaxed">
          <span className="font-display float-left pr-3 pt-1 text-stat-counter leading-none font-extrabold text-primary uppercase">
            T
          </span>
          {post.opening}
        </p>

        <h2 className="font-headline mt-space-sm text-headline-md text-primary uppercase">
          {post.sections[0].heading}
        </h2>
        <p className="leading-relaxed">{post.sections[0].body}</p>

        <div className="my-space-xs bg-surface-container-low p-space-md shadow-sm">
          <div className="mb-space-xs flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary-container">psychology</span>
            <span className="font-headline text-headline-sm text-primary uppercase">
              {post.tacticNote.title}
            </span>
          </div>
          <p className="font-body text-body-md text-on-surface-variant italic">
            &quot;{post.tacticNote.body}&quot;
          </p>
        </div>

        <div className="my-space-sm bg-surface-container p-space-md shadow-sm">
          <div className="mb-space-sm flex items-center justify-between">
            <span className="font-kicker text-kicker font-bold tracking-widest text-primary uppercase">
              {post.metricsTitle}
            </span>
            <span className="font-body text-body-sm font-bold text-secondary">
              {post.metricsSource}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
            {post.playerMetrics.map((player) => (
              <div key={player.name} className="bg-surface-container-lowest p-space-sm shadow-sm">
                <div className="mb-1 flex items-baseline justify-between">
                  <span
                    className={[
                      'font-headline text-headline-sm',
                      player.nameTone === 'primary' ? 'text-primary' : 'text-secondary',
                    ].join(' ')}
                  >
                    {player.name}
                  </span>
                  <span className="font-kicker text-kicker font-bold text-on-surface-variant uppercase">
                    {player.role}
                  </span>
                </div>
                <div className="mt-space-xs space-y-2">
                  {player.rows.map((row) => (
                    <div key={row.label}>
                      <div className="mb-0.5 flex justify-between text-body-sm">
                        <span className="text-on-surface-variant">{row.label}</span>
                        <span
                          className={[
                            'font-bold',
                            player.nameTone === 'primary' ? 'text-primary' : 'text-secondary',
                          ].join(' ')}
                        >
                          {row.value}
                        </span>
                      </div>
                      <div className="h-2 w-full bg-surface-container-highest">
                        <div className={`h-2 ${row.barClass}`} style={{ width: row.width }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {post.sections.slice(1).map((section) => (
          <div key={section.heading} className="flex flex-col gap-space-md">
            <h2 className="font-headline mt-space-sm text-headline-md text-primary uppercase">
              {section.heading}
            </h2>
            <p className="leading-relaxed">{section.body}</p>
          </div>
        ))}

        <div className="flex flex-wrap items-center gap-space-xs pt-space-md">
          <span className="font-kicker mr-1 text-kicker font-bold text-on-surface-variant uppercase">
            Etiketler:
          </span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-surface-container px-space-xs py-0.5 font-kicker text-kicker text-on-surface uppercase transition-colors hover:bg-primary-container hover:text-on-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-space-md bg-surface-container-lowest p-space-md shadow-sm">
        <div className="flex flex-wrap items-center gap-space-sm">
          <button
            type="button"
            onClick={() => {
              if (liked) {
                setLiked(false)
                setLikeCount((count) => count - 1)
              } else {
                setLiked(true)
                setLikeCount((count) => count + 1)
                if (disliked) {
                  setDisliked(false)
                  setDislikeCount((count) => count - 1)
                }
              }
            }}
            className={[
              'font-label flex items-center gap-2 px-space-md py-space-xs text-label-md tracking-wider uppercase shadow-sm transition-colors',
              liked
                ? 'bg-primary-container text-on-primary'
                : 'bg-primary text-on-primary hover:bg-primary-container',
            ].join(' ')}
          >
            <span className="material-symbols-outlined text-[18px]">thumb_up</span>
            <span>Beğen ({likeCount})</span>
          </button>
          <button
            type="button"
            onClick={() => {
              if (disliked) {
                setDisliked(false)
                setDislikeCount((count) => count - 1)
              } else {
                setDisliked(true)
                setDislikeCount((count) => count + 1)
                if (liked) {
                  setLiked(false)
                  setLikeCount((count) => count - 1)
                }
              }
            }}
            className="font-label flex items-center gap-2 bg-surface-container px-space-md py-space-xs text-label-md tracking-wider text-on-surface uppercase transition-colors hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-[18px]">thumb_down</span>
            <span>Katılmıyorum ({dislikeCount})</span>
          </button>
          <div className="flex items-center gap-1.5 bg-surface-container-low px-space-sm py-1 text-primary">
            <span
              className="material-symbols-outlined text-[18px] text-secondary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
            <span className="font-kicker text-kicker font-bold uppercase">
              {post.endorsementLabel}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-space-xs">
          <button
            type="button"
            className="font-label flex items-center gap-1 bg-surface-container px-space-sm py-1 text-label-md text-on-surface hover:bg-surface-container-high"
          >
            <span className="font-bold">X</span>
            <span>Paylaş</span>
          </button>
          <button
            type="button"
            className="font-label flex items-center gap-1 bg-surface-container px-space-sm py-1 text-label-md text-on-surface hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-[16px]">chat</span>
            <span>WhatsApp</span>
          </button>
          <button
            type="button"
            onClick={() => {
              void navigator.clipboard?.writeText(window.location.href)
            }}
            className="font-label flex items-center gap-1 bg-surface-container px-space-sm py-1 text-label-md text-on-surface hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-[16px]">link</span>
            <span>Kopyala</span>
          </button>
        </div>
      </div>
    </>
  )
}
