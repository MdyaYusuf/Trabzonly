import { useState } from 'react'
import type { CommentSort, PostDetailProfile } from '../utils/postDetailTypes'

type PostDetailCommentsProps = {
  post: PostDetailProfile
}

const sortTabs: { id: CommentSort; label: string }[] = [
  { id: 'top', label: 'En Beğenilenler' },
  { id: 'newest', label: 'En Yeniler' },
  { id: 'tactical', label: 'Taktikçiler' },
]

export function PostDetailComments({ post }: PostDetailCommentsProps) {
  const [sort, setSort] = useState<CommentSort>('top')
  const [draft, setDraft] = useState('')

  return (
    <section
      id="yorumlar"
      className="flex flex-col gap-space-lg bg-surface-container-lowest p-space-lg shadow-sm"
    >
      <div className="flex flex-col justify-between gap-space-sm pb-space-sm sm:flex-row sm:items-center">
        <div className="flex items-center gap-space-sm">
          <h3 className="font-headline text-headline-md text-primary uppercase">
            Taraftar Yorumları & Tartışma
          </h3>
          <span className="bg-primary-container px-space-xs py-0.5 font-kicker text-kicker text-on-primary uppercase">
            {post.commentCount} Yorum
          </span>
        </div>
        <div className="font-label flex items-center gap-1 bg-surface-container p-1 text-label-md">
          {sortTabs.map((tab) => {
            const isActive = sort === tab.id

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setSort(tab.id)
                }}
                className={[
                  'px-space-xs py-1',
                  isActive
                    ? 'bg-surface-container-lowest font-bold text-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface',
                ].join(' ')}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="bg-surface-container-low p-space-md shadow-sm">
        <div className="mb-space-xs flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-container text-xs font-bold text-on-primary">
              61
            </div>
            <div>
              <span className="font-label text-label-md font-bold text-primary">
                @BordoFirtina61
              </span>
              <span className="font-kicker ml-1 text-kicker font-bold text-secondary uppercase">
                Resmi Topluluk Üyesi
              </span>
            </div>
          </div>
          <span className="font-body text-body-sm text-on-surface-variant">
            Karakter Sınırı: 500
          </span>
        </div>
        <textarea
          rows={4}
          value={draft}
          maxLength={500}
          onChange={(event) => {
            setDraft(event.target.value)
          }}
          placeholder="Bu analiz hakkındaki taktik düşüncelerini, saha içi tespitlerini ve derbi 11 önerini yaz..."
          className="font-body w-full resize-none bg-surface-container-lowest p-space-sm text-body-md text-on-surface focus:outline-none"
        />
        <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
          <div className="flex items-center gap-1 text-on-surface-variant">
            <button type="button" className="p-1 transition-colors hover:bg-surface-container" title="Kalın">
              <span className="material-symbols-outlined text-[18px]">format_bold</span>
            </button>
            <button type="button" className="p-1 transition-colors hover:bg-surface-container" title="İtalik">
              <span className="material-symbols-outlined text-[18px]">format_italic</span>
            </button>
            <button
              type="button"
              className="font-body flex items-center gap-1 px-2 py-0.5 text-body-sm font-bold hover:bg-surface-container"
            >
              <span className="material-symbols-outlined text-[16px]">sports_soccer</span>
              <span>Taktik Şablonu</span>
            </button>
            <button
              type="button"
              className="font-body flex items-center gap-1 px-2 py-0.5 text-body-sm font-bold hover:bg-surface-container"
            >
              <span className="material-symbols-outlined text-[16px]">format_list_numbered</span>
              <span>11&apos;ini Ekle</span>
            </button>
          </div>
          <button
            type="button"
            className="bg-primary-container px-space-lg py-space-xs font-headline text-label-md font-bold tracking-wider text-on-primary uppercase shadow-sm transition-colors hover:bg-primary"
          >
            Yorumu Gönder
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-space-md">
        {post.comments.map((comment) => (
          <div key={comment.id} className="bg-surface-container-low p-space-md shadow-sm">
            <div className="flex items-start justify-between gap-space-sm">
              <div className="flex items-center gap-space-sm">
                <div
                  className={[
                    'flex h-10 w-10 items-center justify-center text-sm font-bold',
                    comment.avatarTone === 'primary'
                      ? 'bg-primary text-on-primary'
                      : 'bg-secondary text-on-secondary',
                  ].join(' ')}
                >
                  {comment.initials}
                </div>
                <div>
                  <div className="flex items-center gap-space-xs">
                    <span className="font-headline text-label-md font-bold text-primary">
                      {comment.username}
                    </span>
                    {comment.badge ? (
                      <span
                        className={[
                          'px-1 font-kicker text-kicker uppercase',
                          comment.badgeTone === 'primary'
                            ? 'bg-primary-fixed text-on-primary-fixed'
                            : 'bg-surface-container text-on-surface-variant',
                        ].join(' ')}
                      >
                        {comment.badge}
                      </span>
                    ) : null}
                  </div>
                  <span className="font-body text-body-sm text-on-surface-variant">
                    {comment.timeLabel}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-surface-container-lowest px-2 py-1">
                <button
                  type="button"
                  className="font-label flex items-center gap-1 text-label-md font-bold text-primary hover:text-secondary"
                >
                  <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
                  <span>{comment.upvotes}</span>
                </button>
                <span className="text-outline-variant">|</span>
                <button
                  type="button"
                  className="font-label flex items-center text-label-md text-on-surface-variant hover:text-error"
                >
                  <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
                  <span>{comment.downvotes}</span>
                </button>
              </div>
            </div>
            <p className="font-body mt-space-sm text-body-md leading-relaxed text-on-surface">
              {comment.body}
            </p>
            <div className="font-body mt-space-sm flex items-center gap-space-md text-body-sm">
              <button
                type="button"
                className="font-label flex items-center gap-1 text-label-md font-bold text-secondary uppercase hover:text-primary"
              >
                <span className="material-symbols-outlined text-[16px]">reply</span>
                <span>
                  Yanıtla{comment.replyCount ? ` (${comment.replyCount})` : ''}
                </span>
              </button>
              <button
                type="button"
                className="flex items-center gap-1 text-on-surface-variant hover:text-primary"
              >
                <span className="material-symbols-outlined text-[16px]">share</span>
                <span>Paylaş</span>
              </button>
            </div>

            {comment.replies && comment.replies.length > 0 ? (
              <div className="mt-space-md space-y-space-sm pl-space-md">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="bg-surface-container-lowest p-space-sm shadow-sm">
                    <div className="mb-1 flex items-center justify-between">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-label text-label-md font-bold text-primary">
                          {reply.username}
                        </span>
                        {reply.badge ? (
                          <span className="bg-tertiary-fixed px-1 font-kicker text-kicker text-on-tertiary-fixed uppercase">
                            {reply.badge}
                          </span>
                        ) : null}
                        <span className="font-body text-body-sm text-on-surface-variant">
                          {reply.timeLabel}
                        </span>
                      </div>
                      <span className="font-label text-label-md font-bold text-secondary">
                        ▲ {reply.upvotes}
                      </span>
                    </div>
                    <p className="font-body text-body-md text-on-surface-variant">{reply.body}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <button
        type="button"
        className="w-full bg-surface-container py-space-sm text-center font-headline text-label-md font-bold tracking-wider text-primary uppercase transition-colors hover:bg-surface-container-high"
      >
        Daha Fazla Yorum Yükle (76)
      </button>
    </section>
  )
}
