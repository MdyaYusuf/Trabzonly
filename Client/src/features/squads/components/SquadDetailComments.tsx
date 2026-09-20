import { useState } from 'react'
import type { SquadDetailProfile } from '../utils/squadDetailTypes'

type SquadDetailCommentsProps = {
  squad: SquadDetailProfile
}

type CommentSort = 'top' | 'newest'

function avatarClass(tone: 'primary' | 'secondary' | 'primary-container') {
  if (tone === 'secondary') {
    return 'bg-secondary text-on-secondary'
  }

  if (tone === 'primary-container') {
    return 'bg-primary-container text-on-primary'
  }

  return 'bg-primary text-on-primary'
}

export function SquadDetailComments({ squad }: SquadDetailCommentsProps) {
  const [sort, setSort] = useState<CommentSort>('top')
  const [draft, setDraft] = useState('')

  const comments =
    sort === 'newest' ? [...squad.comments].reverse() : squad.comments

  const remaining = Math.max(0, squad.commentCount - comments.length)

  return (
    <section
      id="yorumlar"
      className="w-full bg-surface-container-low py-space-xl"
    >
      <div className="mx-auto flex max-w-[1360px] flex-col gap-space-lg px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col justify-between gap-space-xs border-b border-outline-variant/40 pb-space-sm sm:flex-row sm:items-baseline">
          <div className="flex flex-wrap items-baseline gap-space-sm">
            <h2 className="font-headline text-headline-md font-bold text-primary uppercase lg:text-headline-lg">
              Taktik Tartışması & Yorumlar
            </h2>
            <span className="font-label bg-primary-container px-2 py-0.5 text-label-md font-bold text-on-primary">
              {squad.commentCount} YORUM
            </span>
          </div>
          <div className="font-label flex items-center gap-space-xs text-label-md text-on-surface-variant">
            <span>Sırala:</span>
            <button
              type="button"
              onClick={() => {
                setSort('top')
              }}
              className={
                sort === 'top'
                  ? 'font-bold text-primary underline'
                  : 'transition-colors hover:text-primary'
              }
            >
              En Çok Beğenilen
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                setSort('newest')
              }}
              className={
                sort === 'newest'
                  ? 'font-bold text-primary underline'
                  : 'transition-colors hover:text-primary'
              }
            >
              En Yeni
            </button>
          </div>
        </div>

        <div className="flex items-start gap-space-md bg-surface-container-lowest p-space-md shadow-sm">
          <div className="font-headline flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary-container text-sm font-bold text-on-secondary-container">
            TS
          </div>
          <div className="flex flex-1 flex-col gap-space-sm">
            <textarea
              rows={3}
              value={draft}
              onChange={(event) => {
                setDraft(event.target.value)
              }}
              placeholder="Bu 11 hakkındaki taktik düşünceleriniz neler? Banza-Drăguș uyumu nasıl işlemeli?..."
              className="font-body w-full bg-surface-container-low p-space-sm text-body-md text-on-surface placeholder:text-on-surface-variant/70 focus:ring-1 focus:ring-primary focus:outline-none"
            />
            <div className="flex flex-wrap items-center justify-between gap-space-sm">
              <div className="flex items-center gap-space-xs text-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">info</span>
                <span>Saygı çerçevesinde Trabzonspor taktik analizine katkıda bulunun.</span>
              </div>
              <button
                type="button"
                className="font-label bg-primary-container px-space-lg py-space-xs text-label-md font-bold tracking-wider text-on-primary uppercase shadow-sm transition-colors hover:bg-primary"
              >
                YORUM YAP
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-space-md">
          {comments.map((comment) => (
            <article
              key={comment.id}
              className="flex flex-col gap-space-sm bg-surface-container-lowest p-space-md shadow-sm"
            >
              <div className="flex items-center justify-between gap-space-sm">
                <div className="flex items-center gap-space-sm">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${avatarClass(comment.avatarTone)}`}
                  >
                    {comment.initials}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-wrap items-center gap-space-xs">
                      <span className="font-headline text-sm font-bold text-on-surface">
                        {comment.displayName}
                      </span>
                      {comment.badge ? (
                        <span
                          className={
                            comment.badgeTone === 'secondary'
                              ? 'font-kicker bg-secondary-container px-1.5 text-[10px] font-bold text-on-secondary-container uppercase'
                              : 'font-kicker bg-surface-container-high px-1.5 text-[10px] font-bold text-on-surface-variant uppercase'
                          }
                        >
                          {comment.badge}
                        </span>
                      ) : null}
                    </div>
                    <span className="font-body text-xs text-on-surface-variant">
                      {comment.timeLabel}
                    </span>
                  </div>
                </div>
                <div className="font-label flex items-center gap-2 text-xs text-on-surface-variant">
                  <button
                    type="button"
                    className="flex items-center gap-1 transition-colors hover:text-primary"
                  >
                    <span className="material-symbols-outlined text-[18px]">thumb_up</span>
                    <span>{comment.upvotes}</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-1 transition-colors hover:text-error"
                  >
                    <span className="material-symbols-outlined text-[18px]">thumb_down</span>
                    <span>{comment.downvotes}</span>
                  </button>
                </div>
              </div>
              <p className="font-body pl-12 text-body-md leading-normal text-on-surface">
                {comment.body}
              </p>
              <div className="font-label flex items-center gap-space-md pl-12 text-xs">
                <button
                  type="button"
                  className="font-bold tracking-wider text-secondary uppercase transition-colors hover:underline"
                >
                  Yanıtla{comment.replyCount > 0 ? ` (${comment.replyCount})` : ''}
                </button>
                <button
                  type="button"
                  className="text-on-surface-variant uppercase transition-colors hover:text-on-surface"
                >
                  Paylaş
                </button>
              </div>
            </article>
          ))}
        </div>

        {remaining > 0 ? (
          <div className="flex justify-center pt-space-sm">
            <button
              type="button"
              className="font-label bg-surface-container-highest px-space-xl py-space-xs text-label-md font-bold tracking-wider text-on-surface uppercase transition-colors hover:bg-surface-container"
            >
              DAHA FAZLA TARTIŞMA YÜKLE (Kalan: {remaining} Yorum)
            </button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
