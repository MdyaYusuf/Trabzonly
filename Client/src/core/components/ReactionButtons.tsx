export type ReactionValue = 1 | 2

type ReactionButtonsProps = {
  likeCount: number
  dislikeCount: number
  currentReaction?: ReactionValue | null
  disabled?: boolean
  size?: 'sm' | 'md'
  className?: string
  onLike: () => void
  onDislike: () => void
}

const LIKE: ReactionValue = 1
const DISLIKE: ReactionValue = 2

export function ReactionButtons({
  likeCount,
  dislikeCount,
  currentReaction = null,
  disabled = false,
  size = 'md',
  className,
  onLike,
  onDislike,
}: ReactionButtonsProps) {
  const liked = currentReaction === LIKE
  const disliked = currentReaction === DISLIKE
  const isCompact = size === 'sm'

  const wrapperClass = [
    'flex items-center overflow-hidden',
    className ?? 'bg-surface-container',
  ].join(' ')

  const buttonBase = [
    'flex cursor-pointer items-center transition-colors disabled:cursor-not-allowed',
    isCompact
      ? 'gap-0.5 px-space-xs py-1 disabled:opacity-40'
      : 'gap-space-xs px-space-sm py-space-xs font-label text-label-md font-bold disabled:opacity-50',
  ].join(' ')

  const iconClass = isCompact
    ? 'material-symbols-outlined text-[16px]'
    : 'material-symbols-outlined text-base'

  const countClass = isCompact
    ? 'min-w-[1rem] text-center text-[12px] font-bold'
    : 'font-label text-label-md font-bold'

  return (
    <div className={wrapperClass}>
      <button
        type="button"
        disabled={disabled}
        onClick={onLike}
        title="Beğen"
        aria-label="Beğen"
        className={[
          buttonBase,
          liked
            ? 'bg-success-container text-on-success-container'
            : 'hover:bg-success-container hover:text-on-success-container',
        ].join(' ')}
      >
        <span
          className={`${iconClass} text-success`}
          style={liked ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          thumb_up
        </span>
        <span className={`${countClass} text-success`}>{likeCount}</span>
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={onDislike}
        title="Beğenme"
        aria-label="Beğenme"
        className={[
          buttonBase,
          disliked
            ? 'bg-error-container text-on-error-container'
            : 'hover:bg-error-container hover:text-on-error-container',
        ].join(' ')}
      >
        <span
          className={`${iconClass} text-error`}
          style={disliked ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          thumb_down
        </span>
        <span className={`${countClass} text-error`}>{dislikeCount}</span>
      </button>
    </div>
  )
}
