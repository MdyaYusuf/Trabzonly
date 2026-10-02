import type { PostResponseDto } from '../postTypes'
import type { CategoryBadgeTone, FeedPostCard } from './postsFeedTypes'

const CATEGORY_TONES: CategoryBadgeTone[] = [
  'primary-container',
  'secondary',
  'primary',
]

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

export function mapPostToFeedCard(post: PostResponseDto): FeedPostCard {
  const tone = CATEGORY_TONES[Math.abs(post.categoryId) % CATEGORY_TONES.length]

  return {
    id: post.id,
    categoryId: post.categoryId,
    categoryLabel: post.categoryName,
    categoryTone: tone,
    publishedLabel: formatRelativeTime(post.createdDate),
    title: post.title,
    excerpt: post.description?.trim() || post.content.slice(0, 220),
    content: post.content,
    authorInitials: initialsFromUsername(post.authorUsername),
    authorUsername: post.authorUsername,
    authorDisplayTag: post.authorDisplayTag,
    likeCount: post.likeCount,
    dislikeCount: post.dislikeCount,
    commentCount: post.commentCount,
    imageUrl: post.imageUrl,
  }
}
