import { useMemo, useState, type FormEvent } from 'react'
import {
  placeholderComments,
  type CommentSort,
  type PlayerProfile,
} from '../utils/playerDetailPlaceholders'

type PlayerCommentsSectionProps = {
  profile: PlayerProfile
}

export function PlayerCommentsSection({ profile }: PlayerCommentsSectionProps) {
  const [commentSort, setCommentSort] = useState<CommentSort>('liked')
  const [commentDraft, setCommentDraft] = useState('')

  const commentPlaceholder = useMemo(
    () => `${profile.name}'ın performansı hakkında ne düşünüyorsun? Görüşünü bordo-mavi tribünle paylaş...`,
    [profile.name],
  )

  function handleCommentSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setCommentDraft('')
  }

  return (
            <section className="flex flex-col gap-space-lg bg-surface-container-lowest p-space-lg shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-xs">
                <div>
                  <span className="font-kicker mb-1 block text-kicker font-bold tracking-widest text-secondary uppercase">
                    BORDO-MAVİ TARAFTAR FORUMU
                  </span>
                  <h2 className="font-headline text-headline-md font-bold tracking-tight text-primary">
                    TRİBÜN YORUMLARI &amp; TARTIŞMA
                  </h2>
                </div>
                <span className="font-label text-label-md text-on-surface-variant">Toplam 384 Yorum</span>
              </div>

              <form
                className="flex flex-col gap-space-sm bg-surface-container-low p-space-md"
                onSubmit={handleCommentSubmit}
              >
                <div className="flex items-center gap-space-sm">
                  <div className="flex h-9 w-9 items-center justify-center bg-primary text-[13px] font-bold text-on-primary uppercase">
                    TS
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label text-label-md font-bold text-on-surface">
                      @KaradenizFirtinasi61
                    </span>
                    <span className="font-kicker text-[10px] font-bold text-secondary uppercase">
                      Resmi Topluluk Üyesi
                    </span>
                  </div>
                </div>
                <textarea
                  className="font-body w-full resize-none bg-surface-container-lowest p-space-sm text-body-md text-on-surface outline-none transition-all focus:ring-1 focus:ring-primary"
                  placeholder={commentPlaceholder}
                  rows={3}
                  value={commentDraft}
                  onChange={(event) => setCommentDraft(event.target.value)}
                />
                <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
                  <div className="flex items-center gap-space-xs text-on-surface-variant">
                    <span className="material-symbols-outlined p-1.5 text-[18px]">sports_soccer</span>
                    <span className="material-symbols-outlined p-1.5 text-[18px]">image</span>
                    <span className="material-symbols-outlined p-1.5 text-[18px]">grade</span>
                  </div>
                  <button
                    type="submit"
                    className="font-label flex items-center gap-2 bg-primary px-space-lg py-space-xs text-label-md font-bold tracking-wider text-on-primary uppercase transition-all hover:bg-primary-container"
                  >
                    <span>Yorum Gönder</span>
                    <span className="material-symbols-outlined text-[16px]">send</span>
                  </button>
                </div>
              </form>

              <div className="flex flex-wrap items-center gap-space-xs">
                {(
                  [
                    { key: 'liked' as const, label: 'En Beğenilenler' },
                    { key: 'newest' as const, label: 'En Yeniler' },
                    { key: 'analysis' as const, label: 'Yalnızca Analizler' },
                  ]
                ).map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setCommentSort(tab.key)}
                    className={
                      commentSort === tab.key
                        ? 'bg-primary px-space-md py-space-xs font-label text-label-md font-bold text-on-primary uppercase'
                        : 'bg-surface-container px-space-md py-space-xs font-label text-label-md text-on-surface-variant uppercase transition-colors hover:bg-surface-container-high'
                    }
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-space-md">
                {placeholderComments.map((comment) => (
                  <div key={comment.id} className="flex flex-col gap-space-sm bg-surface p-space-md">
                    <div className="flex items-start justify-between gap-space-sm">
                      <div className="flex items-center gap-space-sm">
                        <div
                          className={`font-headline flex h-10 w-10 items-center justify-center text-headline-sm font-bold ${
                            comment.badgeTone === 'mavi'
                              ? 'bg-primary-container text-on-primary'
                              : 'bg-secondary text-on-secondary'
                          }`}
                        >
                          {comment.initials}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-space-xs">
                            <span className="font-headline text-[16px] font-bold text-on-surface">
                              {comment.name}
                            </span>
                            <span
                              className={`px-1.5 py-0.5 font-kicker text-[9px] font-bold uppercase ${
                                comment.badgeTone === 'mavi'
                                  ? 'bg-secondary text-on-secondary'
                                  : 'bg-primary-container text-on-primary'
                              }`}
                            >
                              {comment.badge}
                            </span>
                          </div>
                          <span className="font-body text-[11px] text-on-surface-variant">
                            {comment.handle}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-surface-container-low px-space-xs py-1">
                        <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                          keyboard_arrow_up
                        </span>
                        <span className="text-[13px] font-bold text-primary">{comment.votes}</span>
                        <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                          keyboard_arrow_down
                        </span>
                      </div>
                    </div>
                    <p className="font-body text-body-md text-on-surface">{comment.body}</p>
                    <div className="font-label flex items-center gap-space-md pt-space-xs text-label-md text-on-surface-variant">
                      <span className="inline-flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">reply</span>
                        Cevapla{comment.replies > 0 ? ` (${comment.replies})` : ''}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">bookmark_border</span>
                        Kaydet
                      </span>
                    </div>
                    {comment.reply ? (
                      <div className="ml-space-md flex flex-col gap-space-xs border-l-2 border-l-secondary bg-surface-container-lowest p-space-sm pl-space-md">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-space-xs">
                            <span className="font-label text-label-md font-bold text-on-surface">
                              {comment.reply.name}
                            </span>
                            <span className="font-body text-[11px] text-on-surface-variant">
                              {comment.reply.handle}
                            </span>
                          </div>
                          <span className="text-[12px] font-bold text-secondary">
                            {comment.reply.votes}
                          </span>
                        </div>
                        <p className="font-body text-body-sm text-on-surface">{comment.reply.body}</p>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="w-full bg-surface-container py-space-sm font-label text-label-md font-bold tracking-wider text-primary uppercase transition-colors hover:bg-surface-container-high"
              >
                Daha Fazla Tribün Yorumu Yükle (381)
              </button>
            </section>
  )
}
