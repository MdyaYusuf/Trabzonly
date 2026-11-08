import { useEffect, useId, useState } from 'react'
import { toast } from 'react-toastify'
import { useAppSelector } from '@/core/store/hooks'
import matchWeekService from '../matchWeekService'

const STAR_COLOR = '#D39D3F'
const STAR_COUNT = 10

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

function scoreFromPointer(starIndex: number, isLeftHalf: boolean): RatingScore {
  const raw = isLeftHalf ? starIndex + 0.5 : starIndex + 1
  return snapToRatingScore(raw)
}

function CompactStars({
  value,
  disabled,
  onChange,
}: {
  value: number
  disabled: boolean
  onChange: (score: RatingScore) => void
}) {
  const reactId = useId().replace(/:/g, '')
  const [hoverValue, setHoverValue] = useState<number | null>(null)
  const displayValue = hoverValue ?? value

  return (
    <div
      className={disabled ? 'flex items-center gap-px opacity-60' : 'flex items-center gap-px'}
      role="radiogroup"
      aria-label="Puan seçimi"
      onMouseLeave={() => {
        setHoverValue(null)
      }}
    >
      {Array.from({ length: STAR_COUNT }, (_, index) => {
        const starValue = index + 1
        const fill: 'full' | 'half' | 'empty' =
          displayValue >= starValue
            ? 'full'
            : displayValue >= starValue - 0.5
              ? 'half'
              : 'empty'
        const gradientId = `${reactId}-mw-star-${index}`

        return (
          <span key={index} className="relative inline-flex h-4 w-4">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              className="pointer-events-none absolute inset-0"
              aria-hidden="true"
            >
              {fill === 'half' ? (
                <defs>
                  <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="0">
                    <stop offset="50%" stopColor={STAR_COLOR} />
                    <stop offset="50%" stopColor={STAR_COLOR} stopOpacity="0.22" />
                  </linearGradient>
                </defs>
              ) : null}
              <path
                d="M12 2.5l2.74 6.16 6.76.62-5.1 4.5 1.5 6.72L12 16.9l-6 3.6 1.5-6.72-5.1-4.5 6.76-.62L12 2.5z"
                fill={
                  fill === 'full'
                    ? STAR_COLOR
                    : fill === 'half'
                      ? `url(#${gradientId})`
                      : STAR_COLOR
                }
                fillOpacity={fill === 'empty' ? 0.22 : 1}
              />
            </svg>
            <button
              type="button"
              disabled={disabled}
              aria-label={`${scoreFromPointer(index, true)} puan`}
              className="absolute top-0 left-0 h-full w-1/2 cursor-pointer disabled:cursor-not-allowed"
              onMouseEnter={() => {
                if (!disabled) {
                  setHoverValue(Number(scoreFromPointer(index, true)))
                }
              }}
              onClick={() => {
                onChange(scoreFromPointer(index, true))
              }}
            />
            <button
              type="button"
              disabled={disabled}
              aria-label={`${scoreFromPointer(index, false)} puan`}
              className="absolute top-0 right-0 h-full w-1/2 cursor-pointer disabled:cursor-not-allowed"
              onMouseEnter={() => {
                if (!disabled) {
                  setHoverValue(Number(scoreFromPointer(index, false)))
                }
              }}
              onClick={() => {
                onChange(scoreFromPointer(index, false))
              }}
            />
          </span>
        )
      })}
    </div>
  )
}

export function MatchWeekPlayerRateControl({
  playerId,
  averageRating,
  ratingCount,
  currentUserScore,
  tone = 'onPitch',
  onRated,
}: MatchWeekPlayerRateControlProps) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const [selectedScore, setSelectedScore] = useState<RatingScore | null>(
    toRatingScore(currentUserScore),
  )
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    setSelectedScore(toRatingScore(currentUserScore))
  }, [playerId, currentUserScore, isAuthenticated])

  async function handleRate(score: RatingScore) {
    if (isSaving) {
      return
    }

    if (!isAuthenticated) {
      toast.info('Puan vermek için giriş yapmalısınız.')
      return
    }

    const apiScore = Number(score)

    if (
      currentUserScore != null &&
      Number(apiScore.toFixed(1)) === Number(currentUserScore.toFixed(1))
    ) {
      setSelectedScore(score)
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

    onRated?.(result.data.averageRating, result.data.ratingCount, result.data.score)
  }

  const avgClass =
    tone === 'onPitch'
      ? 'font-kicker text-[9px] font-bold tracking-wider text-white/85 uppercase drop-shadow'
      : 'font-kicker text-[9px] font-bold tracking-wider text-on-surface uppercase'
  const countClass =
    tone === 'onPitch' ? 'font-normal text-white/70' : 'font-normal text-on-surface-variant'

  return (
    <div className="mt-1 flex flex-col items-center gap-0.5">
      <CompactStars
        value={selectedScore != null ? Number(selectedScore) : 0}
        disabled={isSaving}
        onChange={(score) => {
          void handleRate(score)
        }}
      />
      <p className={avgClass}>
        {ratingCount > 0 ? averageRating.toFixed(1) : '—'}
        <span className={countClass}> · {ratingCount}</span>
      </p>
    </div>
  )
}
