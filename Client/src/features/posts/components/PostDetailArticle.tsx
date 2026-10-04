import { useState } from 'react'
import { toast } from 'react-toastify'
import { useAppSelector } from '../../../core/store/hooks'
import postService from '../postService'
import type { PostReactionType, PostResponseDto } from '../postTypes'
import { PostPollCard } from './PostPollCard'

const LIKE: PostReactionType = 1
const DISLIKE: PostReactionType = 2

type PostDetailArticleProps = {
  post: PostResponseDto
  textScale: number
}

export function PostDetailArticle({ post, textScale }: PostDetailArticleProps) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const [likeCount, setLikeCount] = useState(post.likeCount)
  const [dislikeCount, setDislikeCount] = useState(post.dislikeCount)
  const [currentReaction, setCurrentReaction] = useState<PostReactionType | null>(
    post.currentReaction ?? null,
  )
  const [isReacting, setIsReacting] = useState(false)

  const liked = currentReaction === LIKE
  const disliked = currentReaction === DISLIKE

  async function handleReact(type: PostReactionType) {
    if (!isAuthenticated || isReacting) {
      return
    }

    setIsReacting(true)

    try {
      const result = type === LIKE ? await postService.like(post.id) : await postService.dislike(post.id)

      if (!result.success || !result.data) {
        return
      }

      setLikeCount(result.data.likeCount)
      setDislikeCount(result.data.dislikeCount)
      setCurrentReaction(result.data.currentReaction ?? null)
    } catch {
      // apiClient already surfaces errors via toast
    } finally {
      setIsReacting(false)
    }
  }

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast.success('Bağlantı panoya kopyalandı.')
    } catch {
      toast.error('Bağlantı kopyalanamadı.')
    }
  }

  return (
    <div className="flex flex-col gap-space-lg">
      {post.imageUrl ? (
        <div className="overflow-hidden bg-surface-container">
          <img src={post.imageUrl} alt="" className="h-auto max-h-[28rem] w-full object-cover" />
        </div>
      ) : null}

      <div
        className="font-body whitespace-pre-wrap text-body-lg leading-relaxed text-on-surface"
        style={{ fontSize: `${textScale}rem` }}
      >
        {post.content}
      </div>

      <PostPollCard postId={post.id} />

      <div className="flex flex-wrap items-center gap-space-xs border-t border-surface-container pt-space-md">
        <div className="flex items-center bg-surface-container">
          <button
            type="button"
            disabled={!isAuthenticated || isReacting}
            onClick={() => {
              void handleReact(LIKE)
            }}
            className={[
              'flex items-center gap-space-xs px-space-sm py-space-xs font-label text-label-md font-bold disabled:opacity-50',
              liked ? 'bg-secondary-container text-on-secondary-container' : 'text-primary',
            ].join(' ')}
          >
            <span className="text-secondary">▲</span>
            <span>{likeCount}</span>
          </button>
          <div className="h-4 w-px bg-surface-container-highest" />
          <button
            type="button"
            disabled={!isAuthenticated || isReacting}
            onClick={() => {
              void handleReact(DISLIKE)
            }}
            className={[
              'flex items-center gap-space-xs px-space-sm py-space-xs font-label text-label-md font-bold disabled:opacity-50',
              disliked ? 'bg-error-container text-on-error-container' : 'text-on-surface-variant',
            ].join(' ')}
          >
            <span className="text-error">▼</span>
            <span>{dislikeCount}</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            void handleShare()
          }}
          className="bg-surface-container px-space-sm py-space-xs font-label text-label-md font-bold text-on-surface uppercase"
        >
          Paylaş
        </button>
      </div>
    </div>
  )
}
