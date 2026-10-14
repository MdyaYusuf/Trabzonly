import { useEffect, useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppSelector } from '@/core/store/hooks'
import playerService from '../playerService'

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

type PlayerDetailRatingBarProps = {
  playerId: number
  averageRating: number
  ratingCount: number
  currentUserScore?: number | null
  onRated?: (averageRating: number, ratingCount: number, score: number) => void
}

function toRatingScore(value: number | null | undefined): RatingScore {
  if (value == null) {
    return '7.5'
  }

  return snapToRatingScore(value)
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

function scoreFromPointer(starIndex: number, isLeftHalf: boolean): RatingScore {
  const raw = isLeftHalf ? starIndex + 0.5 : starIndex + 1
  return snapToRatingScore(raw)
}

function InteractiveRatingStars({
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
      className={disabled ? 'flex items-center gap-0.5 opacity-60' : 'flex items-center gap-0.5'}
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
        const gradientId = `${reactId}-star-half-${index}`

        return (
          <span key={index} className="relative inline-flex h-7 w-7">
            <svg
              width="28"
              height="28"
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

export function PlayerDetailRatingBar({
  playerId,
  averageRating,
  ratingCount,
  currentUserScore,
  onRated,
}: PlayerDetailRatingBarProps) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  const [selectedScore, setSelectedScore] = useState<RatingScore>(
    toRatingScore(currentUserScore),
  )
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setSelectedScore(toRatingScore(currentUserScore))
  }, [currentUserScore])

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
    setSaved(false)

    const result = await playerService.rate(playerId, {
      score: apiScore,
    })

    setIsSaving(false)

    if (!result.success || !result.data) {
      setSelectedScore(toRatingScore(currentUserScore))
      return
    }

    onRated?.(result.data.averageRating, result.data.ratingCount, result.data.score)
    setSaved(true)
    window.setTimeout(() => {
      setSaved(false)
    }, 2000)
  }

  const displayYourScore =
    isAuthenticated || currentUserScore != null ? selectedScore : '—'

  return (
    <section className="w-full bg-surface-container-low py-space-md">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-space-sm px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col gap-space-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-space-md">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-primary">stars</span>
              <span className="font-headline text-[15px] font-bold tracking-tight text-primary uppercase">
                Bu Oyuncuyu Puanla
              </span>
            </div>

            <InteractiveRatingStars
              value={Number(selectedScore)}
              disabled={isSaving}
              onChange={(score) => {
                void handleRate(score)
              }}
            />

            <div className="flex flex-wrap items-end gap-space-md">
              <div className="flex flex-col gap-0.5">
                <span className="font-kicker text-[10px] tracking-wider text-on-surface-variant uppercase">
                  Senin puanın
                </span>
                <span className="font-headline text-[18px] leading-none font-bold tabular-nums text-primary">
                  {displayYourScore}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-kicker text-[10px] tracking-wider text-on-surface-variant uppercase">
                  Ortalama
                </span>
                <span className="font-headline text-[18px] leading-none font-bold tabular-nums text-on-surface">
                  {ratingCount > 0 ? averageRating.toFixed(1) : '—'}
                  <span className="font-body ml-1 text-[11px] font-normal text-on-surface-variant">
                    / 10 · {ratingCount} oy
                  </span>
                </span>
              </div>
              {isSaving ? (
                <span className="font-body text-[11px] text-on-surface-variant">Kaydediliyor…</span>
              ) : null}
              {saved ? (
                <span className="font-body text-[11px] font-bold text-secondary">Kaydedildi</span>
              ) : null}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm">
            <a
              href="#yorumlar"
              onClick={(event) => {
                event.preventDefault()
                document.getElementById('yorumlar')?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                })
              }}
              className="font-label inline-flex items-center gap-1.5 bg-surface-container-highest px-space-md py-2 text-label-md font-bold tracking-wider text-on-surface uppercase transition-colors hover:bg-primary hover:text-on-primary"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              Yorum Yap
            </a>
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="font-label inline-flex items-center gap-1.5 bg-primary px-space-md py-2 text-label-md font-bold tracking-wider text-on-primary uppercase transition-colors hover:bg-primary-container"
              >
                <span className="material-symbols-outlined text-[18px]">login</span>
                Giriş Yap
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
