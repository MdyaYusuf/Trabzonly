import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ReactionButtons } from '../../../core/components/ReactionButtons'
import { useAppSelector } from '../../../core/store/hooks'
import commentService from '../../comments/commentService'
import {
  CommentReaction,
  type CommentReactionType,
  type CommentResponseDto,
  type CommentSort,
} from '../../comments/commentTypes'

type PlayerCommentsSectionProps = {
  playerId: number
  playerName: string
}

const PAGE_COUNT = 20

function initialsFromUsername(username: string): string {
  const cleaned = username.trim()

  if (cleaned.length === 0) {
    return '?'
  }

  return cleaned.slice(0, 2).toUpperCase()
}

function formatRelativeTime(isoDate: string): string {
  const created = new Date(isoDate).getTime()
  const now = Date.now()
  const diffMs = Math.max(0, now - created)
  const minutes = Math.floor(diffMs / 60_000)

  if (minutes < 1) {
    return 'az önce'
  }

  if (minutes < 60) {
    return `${minutes} dk önce`
  }

  const hours = Math.floor(minutes / 60)

  if (hours < 24) {
    return `${hours} saat önce`
  }

  const days = Math.floor(hours / 24)

  if (days < 7) {
    return `${days} gün önce`
  }

  return new Date(isoDate).toLocaleDateString('tr-TR')
}

function applyReactionToComment(
  comment: CommentResponseDto,
  result: {
    likeCount: number
    dislikeCount: number
    currentReaction?: CommentReactionType | null
  },
): CommentResponseDto {
  return {
    ...comment,
    likeCount: result.likeCount,
    dislikeCount: result.dislikeCount,
    currentUserReaction: result.currentReaction ?? null,
  }
}

export function PlayerCommentsSection({ playerId, playerName }: PlayerCommentsSectionProps) {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)
  const [commentSort, setCommentSort] = useState<CommentSort>('liked')
  const [commentDraft, setCommentDraft] = useState('')
  const [replyingToId, setReplyingToId] = useState<string | null>(null)
  const [replyDraft, setReplyDraft] = useState('')
  const [comments, setComments] = useState<CommentResponseDto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [nextCursorDate, setNextCursorDate] = useState<string | undefined>()
  const [nextCursorId, setNextCursorId] = useState<string | undefined>()
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const commentPlaceholder = useMemo(
    () =>
      `${playerName}'ın performansı hakkında ne düşünüyorsun? Görüşünü bordo-mavi tribünle paylaş...`,
    [playerName],
  )

  async function loadComments(options?: { append?: boolean }) {
    const append = options?.append === true

    if (append) {
      setIsLoadingMore(true)
    } else {
      setIsLoading(true)
    }

    const result = await commentService.getRecent(
      PAGE_COUNT,
      undefined,
      playerId,
      append ? nextCursorDate : undefined,
      append ? nextCursorId : undefined,
      commentSort,
    )

    if (!result.success || !result.data) {
      if (!append) {
        setComments([])
        setHasNextPage(false)
      }

      setIsLoading(false)
      setIsLoadingMore(false)
      return
    }

    const items = result.data.items

    setComments((current) => (append ? [...current, ...items] : items))
    setHasNextPage(result.data.hasNextPage)
    setNextCursorDate(result.data.nextCursorDate ?? undefined)
    setNextCursorId(result.data.nextCursorId ?? undefined)
    setIsLoading(false)
    setIsLoadingMore(false)
  }

  useEffect(() => {
    let cancelled = false

    async function run() {
      setIsLoading(true)

      const result = await commentService.getRecent(
        PAGE_COUNT,
        undefined,
        playerId,
        undefined,
        undefined,
        commentSort,
      )

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setComments(result.data.items)
        setHasNextPage(result.data.hasNextPage)
        setNextCursorDate(result.data.nextCursorDate ?? undefined)
        setNextCursorId(result.data.nextCursorId ?? undefined)
      } else {
        setComments([])
        setHasNextPage(false)
      }

      setIsLoading(false)
    }

    void run()

    return () => {
      cancelled = true
    }
  }, [playerId, commentSort])

  const rootComments = comments.filter((comment) => !comment.parentCommentId)
  const repliesByParent = comments.reduce<Record<string, CommentResponseDto[]>>((acc, comment) => {
    if (!comment.parentCommentId) {
      return acc
    }

    const existing = acc[comment.parentCommentId] ?? []
    existing.push(comment)
    acc[comment.parentCommentId] = existing
    return acc
  }, {})

  async function handleCommentSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const content = commentDraft.trim()

    if (!content || !isAuthenticated || isSubmitting) {
      return
    }

    setIsSubmitting(true)

    const result = await commentService.add({
      content,
      playerId,
    })

    setIsSubmitting(false)

    if (!result.success) {
      return
    }

    setCommentDraft('')
    await loadComments()
  }

  async function handleReplySubmit(event: FormEvent<HTMLFormElement>, parentCommentId: string) {
    event.preventDefault()

    const content = replyDraft.trim()

    if (!content || !isAuthenticated || isSubmitting) {
      return
    }

    setIsSubmitting(true)

    const result = await commentService.add({
      content,
      playerId,
      parentCommentId,
    })

    setIsSubmitting(false)

    if (!result.success) {
      return
    }

    setReplyDraft('')
    setReplyingToId(null)
    await loadComments()
  }

  async function handleReact(commentId: string, type: CommentReactionType) {
    if (!isAuthenticated) {
      return
    }

    const result =
      type === CommentReaction.Like
        ? await commentService.like(commentId)
        : await commentService.dislike(commentId)

    if (!result.success || !result.data) {
      return
    }

    const reaction = result.data

    setComments((current) =>
      current.map((comment) => {
        if (comment.id !== commentId) {
          return comment
        }

        return applyReactionToComment(comment, reaction)
      }),
    )
  }

  const displayUsername = user?.username ?? 'Misafir'
  const displayInitials = initialsFromUsername(displayUsername)

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
        <span className="font-label text-label-md text-on-surface-variant">
          {rootComments.length} Yorum
        </span>
      </div>

      {isAuthenticated ? (
        <form
          className="flex flex-col gap-space-sm bg-surface-container-low p-space-md"
          onSubmit={handleCommentSubmit}
        >
          <div className="flex items-center gap-space-sm">
            <div className="flex h-9 w-9 items-center justify-center bg-primary text-[13px] font-bold text-on-primary uppercase">
              {displayInitials}
            </div>
            <div className="flex flex-col">
              <span className="font-label text-label-md font-bold text-on-surface">
                @{displayUsername}
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
          <div className="flex flex-wrap items-center justify-end gap-space-sm pt-space-xs">
            <button
              type="submit"
              disabled={isSubmitting || commentDraft.trim().length === 0}
              className="font-label flex items-center gap-2 bg-primary px-space-lg py-space-xs text-label-md font-bold tracking-wider text-on-primary uppercase transition-all hover:bg-primary-container disabled:opacity-50"
            >
              <span>Yorum Gönder</span>
              <span className="material-symbols-outlined text-[16px]">send</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-surface-container-low p-space-md">
          <p className="font-body text-body-md text-on-surface-variant">
            Yorum yazmak için{' '}
            <Link to="/login" className="font-bold text-primary hover:text-secondary">
              giriş yap
            </Link>
            .
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-space-xs">
        {(
          [
            { key: 'liked' as const, label: 'En Beğenilenler' },
            { key: 'newest' as const, label: 'En Yeniler' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setCommentSort(tab.key)}
            className={
              commentSort === tab.key
                ? 'cursor-pointer bg-primary px-space-md py-space-xs font-label text-label-md font-bold text-on-primary uppercase'
                : 'cursor-pointer bg-surface-container px-space-md py-space-xs font-label text-label-md text-on-surface-variant uppercase transition-colors hover:bg-surface-container-high'
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <p className="font-body text-body-md text-on-surface-variant">Yorumlar yükleniyor...</p>
      ) : rootComments.length === 0 ? (
        <p className="font-body text-body-md text-on-surface-variant">
          Henüz yorum yok. İlk tribün yorumunu sen yaz.
        </p>
      ) : (
        <div className="flex flex-col gap-space-md">
          {rootComments.map((comment) => {
            const replies = repliesByParent[comment.id] ?? []

            return (
              <div key={comment.id} className="flex flex-col gap-space-sm bg-surface p-space-md">
                <div className="flex items-start justify-between gap-space-sm">
                  <div className="flex items-center gap-space-sm">
                    <div className="font-headline flex h-10 w-10 items-center justify-center bg-primary-container text-headline-sm font-bold text-on-primary">
                      {initialsFromUsername(comment.authorUsername)}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-space-xs">
                        <span className="font-headline text-[16px] font-bold text-on-surface">
                          {comment.authorUsername}
                        </span>
                        {comment.authorDisplayTag ? (
                          <span className="bg-secondary px-1.5 py-0.5 font-kicker text-[9px] font-bold text-on-secondary uppercase">
                            {comment.authorDisplayTag}
                          </span>
                        ) : null}
                      </div>
                      <span className="font-body text-[11px] text-on-surface-variant">
                        @{comment.authorUsername} • {formatRelativeTime(comment.createdDate)}
                      </span>
                    </div>
                  </div>
                  <ReactionButtons
                    size="sm"
                    className="bg-surface-container-low"
                    likeCount={comment.likeCount}
                    dislikeCount={comment.dislikeCount}
                    currentReaction={comment.currentUserReaction}
                    disabled={!isAuthenticated}
                    onLike={() => {
                      void handleReact(comment.id, CommentReaction.Like)
                    }}
                    onDislike={() => {
                      void handleReact(comment.id, CommentReaction.Dislike)
                    }}
                  />
                </div>
                <p className="font-body text-body-md text-on-surface">{comment.content}</p>
                <div className="font-label flex items-center gap-space-md pt-space-xs text-label-md text-on-surface-variant">
                  {isAuthenticated ? (
                    <button
                      type="button"
                      onClick={() => {
                        setReplyingToId((current) =>
                          current === comment.id ? null : comment.id,
                        )
                        setReplyDraft('')
                      }}
                      className="inline-flex items-center gap-1 hover:text-primary"
                    >
                      <span className="material-symbols-outlined text-[16px]">reply</span>
                      Cevapla{replies.length > 0 ? ` (${replies.length})` : ''}
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">reply</span>
                      {replies.length} Cevap
                    </span>
                  )}
                </div>

                {replyingToId === comment.id ? (
                  <form
                    className="ml-space-md flex flex-col gap-space-sm border-l-2 border-l-secondary bg-surface-container-lowest p-space-sm pl-space-md"
                    onSubmit={(event) => void handleReplySubmit(event, comment.id)}
                  >
                    <textarea
                      className="font-body w-full resize-none bg-surface p-space-sm text-body-sm text-on-surface outline-none focus:ring-1 focus:ring-primary"
                      rows={2}
                      placeholder="Cevabını yaz..."
                      value={replyDraft}
                      onChange={(event) => setReplyDraft(event.target.value)}
                    />
                    <div className="flex justify-end gap-space-xs">
                      <button
                        type="button"
                        onClick={() => {
                          setReplyingToId(null)
                          setReplyDraft('')
                        }}
                        className="font-label px-space-sm py-1 text-label-md text-on-surface-variant uppercase"
                      >
                        Vazgeç
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting || replyDraft.trim().length === 0}
                        className="font-label bg-primary px-space-md py-1 text-label-md font-bold text-on-primary uppercase disabled:opacity-50"
                      >
                        Gönder
                      </button>
                    </div>
                  </form>
                ) : null}

                {replies.map((reply) => (
                  <div
                    key={reply.id}
                    className="ml-space-md flex flex-col gap-space-xs border-l-2 border-l-secondary bg-surface-container-lowest p-space-sm pl-space-md"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-space-xs">
                        <span className="font-label text-label-md font-bold text-on-surface">
                          {reply.authorUsername}
                        </span>
                        {reply.authorDisplayTag ? (
                          <span className="bg-primary-container px-1.5 py-0.5 font-kicker text-[9px] font-bold text-on-primary uppercase">
                            {reply.authorDisplayTag}
                          </span>
                        ) : null}
                        <span className="font-body text-[11px] text-on-surface-variant">
                          @{reply.authorUsername} • {formatRelativeTime(reply.createdDate)}
                        </span>
                      </div>
                      <ReactionButtons
                        size="sm"
                        likeCount={reply.likeCount}
                        dislikeCount={reply.dislikeCount}
                        currentReaction={reply.currentUserReaction}
                        disabled={!isAuthenticated}
                        onLike={() => {
                          void handleReact(reply.id, CommentReaction.Like)
                        }}
                        onDislike={() => {
                          void handleReact(reply.id, CommentReaction.Dislike)
                        }}
                      />
                    </div>
                    <p className="font-body text-body-sm text-on-surface">{reply.content}</p>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      )}

      {hasNextPage ? (
        <button
          type="button"
          disabled={isLoadingMore}
          onClick={() => void loadComments({ append: true })}
          className="w-full bg-surface-container py-space-sm font-label text-label-md font-bold tracking-wider text-primary uppercase transition-colors hover:bg-surface-container-high disabled:opacity-50"
        >
          {isLoadingMore ? 'Yükleniyor...' : 'Daha Fazla Tribün Yorumu Yükle'}
        </button>
      ) : null}
    </section>
  )
}
