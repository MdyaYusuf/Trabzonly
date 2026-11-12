import { useEffect, useId, useRef, useState, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { toast } from 'react-toastify'
import { useAppSelector } from '@/core/store/hooks'
import matchWeekService from '../matchWeekService'

const ratingScores = [
  '1.0',
  '1.5',
  '2.0',
  '2.5',
  '3.0',
  '3.5',
  '4.0',
  '4.5',
  '5.0',
  '5.5',
  '6.0',
  '6.5',
  '7.0',
  '7.5',
  '8.0',
  '8.5',
  '9.0',
  '9.5',
  '10.0',
] as const

type RatingScore = (typeof ratingScores)[number]

type MatchWeekPlayerRateControlProps = {
  playerId: number
  averageRating: number
  ratingCount: number
  currentUserScore?: number | null
  tone?: 'onPitch' | 'onSurface'
  placement?: 'stack' | 'corner'
  /** Host element for corner chips (player avatar). Keeps the badge tight like shirt numbers. */
  cornerHost?: HTMLElement | null
  /** Larger click target (avatar card). Opens the rating menu on click. */
  clickHost?: HTMLElement | null
  onRated?: (averageRating: number, ratingCount: number, score: number) => void
}

function snapToRatingScore(raw: number): RatingScore {
  let best: RatingScore = ratingScores[0]
  let bestDist = Number.POSITIVE_INFINITY

  for (const score of ratingScores) {
    const dist = Math.abs(Number(score) - raw)

    if (dist < bestDist) {
      bestDist = dist
      best = score
    }
  }

  return best
}

function toRatingScore(value: number | null | undefined): RatingScore | null {
  if (value == null) {
    return null
  }

  return snapToRatingScore(value)
}

/** Distinct hue bands so high scores read as elite, not “more green”. */
function ratingBadgeStyle(score: number | null): { backgroundColor: string; color: string } {
  if (score == null) {
    return { backgroundColor: '#5c6670', color: '#ffffff' }
  }

  if (score >= 9) {
    return { backgroundColor: '#1565c0', color: '#ffffff' }
  }

  if (score >= 8) {
    return { backgroundColor: '#0288d1', color: '#ffffff' }
  }

  if (score >= 7) {
    return { backgroundColor: '#43a047', color: '#ffffff' }
  }

  if (score >= 6.5) {
    return { backgroundColor: '#c0ca33', color: '#1a1a1a' }
  }

  if (score >= 6) {
    return { backgroundColor: '#fb8c00', color: '#1a1a1a' }
  }

  if (score >= 5) {
    return { backgroundColor: '#ef6c00', color: '#ffffff' }
  }

  return { backgroundColor: '#e53935', color: '#ffffff' }
}

function formatScore(score: number): string {
  return score.toFixed(1)
}

function buildRatingHoverTitle(
  userScore: number | null,
  averageRating: number,
  ratingCount: number,
): string {
  const userPart =
    userScore != null ? `${formatScore(userScore)} Senin Puanın` : 'Henüz Puanlamadın'
  const averagePart =
    ratingCount > 0 ? `${formatScore(averageRating)} Ortalama Puan` : '— Ortalama Puan'

  return `${userPart} / ${averagePart}`
}

export function MatchWeekPlayerRateControl({
  playerId,
  averageRating,
  ratingCount,
  currentUserScore,
  tone = 'onPitch',
  placement = 'stack',
  cornerHost = null,
  clickHost = null,
  onRated,
}: MatchWeekPlayerRateControlProps) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuTitleId = useId()
  const [selectedScore, setSelectedScore] = useState<RatingScore | null>(
    toRatingScore(currentUserScore),
  )
  const [isSaving, setIsSaving] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [menuStyle, setMenuStyle] = useState<CSSProperties>({
    position: 'fixed',
    top: 0,
    left: 0,
    visibility: 'hidden',
  })

  function toggleOpen() {
    if (isSaving) {
      return
    }

    setIsOpen((prev) => !prev)
  }

  useEffect(() => {
    setSelectedScore(toRatingScore(currentUserScore))
  }, [playerId, currentUserScore, isAuthenticated])

  useEffect(() => {
    const host = clickHost ?? (placement === 'corner' ? cornerHost : null)

    if (!host) {
      return
    }

    function handleHostClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null

      if (target?.closest('[data-mw-rate-chip="true"]')) {
        return
      }

      setIsOpen((prev) => !prev)
    }

    host.classList.add('cursor-pointer')
    host.addEventListener('click', handleHostClick)

    return () => {
      host.classList.remove('cursor-pointer')
      host.removeEventListener('click', handleHostClick)
    }
  }, [placement, cornerHost, clickHost])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    function placeMenu() {
      const anchor = cornerHost ?? clickHost ?? triggerRef.current

      if (!anchor) {
        return
      }

      const rect = anchor.getBoundingClientRect()
      const menuWidth = 220
      const menuHeight = menuRef.current?.offsetHeight ?? 260
      const gap = 6

      let left = rect.left + rect.width / 2 - menuWidth / 2
      left = Math.max(8, Math.min(left, window.innerWidth - menuWidth - 8))

      let top = rect.bottom + gap

      if (top + menuHeight > window.innerHeight - 8) {
        top = Math.max(8, rect.top - gap - menuHeight)
      }

      setMenuStyle({
        position: 'fixed',
        top,
        left,
        width: menuWidth,
        visibility: 'visible',
        zIndex: 90,
      })
    }

    placeMenu()

    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node

      if (
        menuRef.current?.contains(target) ||
        triggerRef.current?.contains(target) ||
        cornerHost?.contains(target) ||
        clickHost?.contains(target)
      ) {
        return
      }

      setIsOpen(false)
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('resize', placeMenu)
    window.addEventListener('scroll', placeMenu, true)
    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('resize', placeMenu)
      window.removeEventListener('scroll', placeMenu, true)
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, cornerHost, clickHost])

  async function handleRate(score: RatingScore) {
    if (isSaving) {
      return
    }

    if (!isAuthenticated) {
      toast.info('Puan vermek için giriş yapmalısınız.')
      setIsOpen(false)
      return
    }

    const apiScore = Number(score)

    if (
      currentUserScore != null &&
      Number(apiScore.toFixed(1)) === Number(currentUserScore.toFixed(1))
    ) {
      setSelectedScore(score)
      setIsOpen(false)
      return
    }

    setSelectedScore(score)
    setIsSaving(true)

    const result = await matchWeekService.ratePlayer(playerId, { score: apiScore })

    setIsSaving(false)

    if (!result.success || !result.data) {
      setSelectedScore(toRatingScore(currentUserScore))
      return
    }

    setIsOpen(false)
    onRated?.(result.data.averageRating, result.data.ratingCount, result.data.score)
  }

  const hasAverage = ratingCount > 0
  const hasUserVote = selectedScore != null
  const isCorner = placement === 'corner'
  const badgeColors = hasAverage
    ? ratingBadgeStyle(averageRating)
    : ratingBadgeStyle(null)
  const label = hasAverage ? formatScore(averageRating) : '—'
  const hintClass =
    tone === 'onPitch'
      ? 'font-kicker text-[11px] font-extrabold tracking-[0.12em] text-[#FFD54F] uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.65)]'
      : 'font-kicker text-[11px] font-extrabold tracking-[0.12em] text-primary uppercase'
  const title = buildRatingHoverTitle(
    selectedScore != null ? Number(selectedScore) : null,
    averageRating,
    ratingCount,
  )

  useEffect(() => {
    if (!clickHost) {
      return
    }

    clickHost.title = title

    return () => {
      clickHost.title = ''
    }
  }, [clickHost, title])

  const chipButton = (
    <button
      ref={triggerRef}
      type="button"
      data-mw-rate-chip="true"
      disabled={isSaving}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      title={title}
      onClick={(event) => {
        event.stopPropagation()
        toggleOpen()
      }}
      style={badgeColors}
      className={`font-headline inline-flex cursor-pointer items-center justify-center rounded-full font-extrabold tabular-nums shadow-sm transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60 ${
        isCorner
          ? 'absolute -top-1 -left-2.5 z-10 min-w-[2.15rem] px-1.5 py-0.5 text-[13px] leading-none'
          : 'min-w-[2.75rem] px-2 py-0.5 text-[12px]'
      } ${tone === 'onPitch' ? 'drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]' : ''}`}
    >
      {label}
    </button>
  )

  return (
    <div className={isCorner ? 'mt-0.5 flex flex-col items-center' : 'mt-1 flex flex-col items-center gap-0.5'}>
      {isCorner
        ? cornerHost
          ? createPortal(chipButton, cornerHost)
          : null
        : chipButton}
      {!hasUserVote ? (
        <button
          type="button"
          disabled={isSaving}
          onClick={(event) => {
            event.stopPropagation()
            toggleOpen()
          }}
          className={`${hintClass} cursor-pointer disabled:cursor-not-allowed`}
        >
          Puanla
        </button>
      ) : null}

      {isOpen
        ? createPortal(
            <div
              ref={menuRef}
              role="dialog"
              aria-labelledby={menuTitleId}
              style={menuStyle}
              className="overflow-hidden border border-white/15 bg-[#0d1a12]/96 shadow-[0_12px_28px_rgba(0,0,0,0.55)] backdrop-blur-md"
              onClick={(event) => {
                event.stopPropagation()
              }}
              onMouseDown={(event) => {
                event.stopPropagation()
              }}
            >
              <div className="flex items-center justify-between gap-2 border-b border-white/10 px-2.5 py-1.5">
                <span
                  id={menuTitleId}
                  className="font-kicker text-[10px] font-bold tracking-[0.14em] text-white uppercase"
                >
                  Puan seç
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false)
                  }}
                  className="flex h-5 w-5 cursor-pointer items-center justify-center text-white transition-transform hover:scale-125"
                  aria-label="Kapat"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>

              <div className="grid grid-cols-4 gap-1 p-2">
                {ratingScores.map((score) => {
                  const isSelected = selectedScore === score
                  const numeric = Number(score)
                  const optionColors = ratingBadgeStyle(numeric)

                  return (
                    <button
                      key={score}
                      type="button"
                      disabled={isSaving}
                      onClick={() => {
                        void handleRate(score)
                      }}
                      style={optionColors}
                      className={`font-headline cursor-pointer rounded-sm px-1 py-1.5 text-[12px] font-bold tabular-nums transition-opacity disabled:cursor-not-allowed hover:opacity-90 ${
                        isSelected ? 'ring-2 ring-white ring-offset-1 ring-offset-[#0d1a12]' : ''
                      }`}
                    >
                      {formatScore(numeric)}
                    </button>
                  )
                })}
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  )
}
