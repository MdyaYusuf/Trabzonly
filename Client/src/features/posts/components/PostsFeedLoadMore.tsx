import { useEffect, useRef } from 'react'

type PostsFeedLoadMoreProps = {
  hasMore: boolean
  isLoadingMore: boolean
  onLoadMore: () => void
  scrollRoot: HTMLElement | null
}

export function PostsFeedLoadMore({
  hasMore,
  isLoadingMore,
  onLoadMore,
  scrollRoot,
}: PostsFeedLoadMoreProps) {
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const onLoadMoreRef = useRef(onLoadMore)
  const isLoadingMoreRef = useRef(isLoadingMore)

  useEffect(() => {
    onLoadMoreRef.current = onLoadMore
  }, [onLoadMore])

  useEffect(() => {
    isLoadingMoreRef.current = isLoadingMore
  }, [isLoadingMore])

  useEffect(() => {
    const node = sentinelRef.current

    if (!node || !scrollRoot || !hasMore) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]

        if (!entry?.isIntersecting || isLoadingMoreRef.current) {
          return
        }

        onLoadMoreRef.current()
      },
      {
        root: scrollRoot,
        rootMargin: '80px 0px',
        threshold: 0,
      },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [hasMore, scrollRoot])

  if (!hasMore && !isLoadingMore) {
    return (
      <p className="font-body py-space-md text-center text-body-sm text-on-surface-variant/60">
        Daha fazla gönderi yok.
      </p>
    )
  }

  return (
    <div
      ref={sentinelRef}
      className="flex items-center justify-center py-space-md"
      aria-live="polite"
    >
      <p className="font-body text-body-sm tracking-wide text-on-surface-variant/65">
        {isLoadingMore ? 'Yükleniyor…' : 'Daha fazla gönderi yükle…'}
      </p>
    </div>
  )
}
