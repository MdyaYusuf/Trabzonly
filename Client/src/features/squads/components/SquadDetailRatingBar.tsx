import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '@/core/store/hooks'
import squadService from '../squadService'
import {
  ratingFeedbackMap,
  ratingScores,
  type RatingScore,
} from '../utils/squadDetailTypes'

type SquadDetailRatingBarProps = {
  squadId: string
  authorUserId: string
  currentUserScore?: number | null
  onRated?: (averageRating: number, ratingCount: number, score: number) => void
}

function toRatingScore(value: number | null | undefined): RatingScore {
  if (value == null) {
    return '4.5'
  }

  const formatted = value.toFixed(1) as RatingScore

  if (ratingScores.includes(formatted)) {
    return formatted
  }

  return '4.5'
}

export function SquadDetailRatingBar({
  squadId,
  authorUserId,
  currentUserScore,
  onRated,
}: SquadDetailRatingBarProps) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const currentUserId = useAppSelector((state) => state.auth.user?.id)
  const isOwner = currentUserId != null && currentUserId === authorUserId

  const [selectedScore, setSelectedScore] = useState<RatingScore>(
    toRatingScore(currentUserScore),
  )
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setSelectedScore(toRatingScore(currentUserScore))
  }, [currentUserScore])

  const phrase = ratingFeedbackMap[selectedScore]

  async function handleSave() {
    if (!isAuthenticated || isOwner || isSaving) {
      return
    }

    setIsSaving(true)

    const result = await squadService.rate(squadId, {
      score: Number(selectedScore),
    })

    setIsSaving(false)

    if (!result.success || !result.data) {
      return
    }

    onRated?.(result.data.averageRating, result.data.ratingCount, result.data.score)
    setSaved(true)
    window.setTimeout(() => {
      setSaved(false)
    }, 2000)
  }

  return (
    <section className="w-full bg-surface-container py-space-md">
      <div className="mx-auto flex max-w-[1360px] flex-col justify-between gap-space-md px-4 sm:px-6 xl:flex-row xl:items-center lg:px-12">
        <div className="flex flex-1 flex-col gap-space-md sm:flex-row sm:items-center">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[22px] text-primary">how_to_vote</span>
            <span className="font-headline text-headline-sm font-bold text-primary uppercase">
              Bu Kadroyu ve Taktik Planı Puanla:
            </span>
          </div>

          <div className="flex items-center gap-1 bg-surface-container-lowest p-1.5 shadow-sm">
            {ratingScores.map((score) => {
              const isActive = selectedScore === score

              return (
                <button
                  key={score}
                  type="button"
                  disabled={isOwner || !isAuthenticated}
                  onClick={() => {
                    setSelectedScore(score)
                  }}
                  className={
                    isActive
                      ? 'font-label bg-primary px-2 py-1 text-label-md font-bold text-on-primary shadow-sm transition-all disabled:opacity-60'
                      : 'font-label px-2 py-1 text-label-md font-bold text-on-surface-variant transition-all hover:bg-surface-container-high disabled:opacity-60'
                  }
                >
                  {isActive ? `${score} ★` : score}
                </button>
              )
            })}
          </div>

          <div className="flex flex-wrap items-center gap-space-sm">
            <span className="font-body text-body-sm text-on-surface-variant">
              Seçilen:{' '}
              <strong className="font-bold text-primary">
                {selectedScore} ★ (&quot;{phrase}&quot;)
              </strong>
            </span>
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="font-label bg-primary-container px-space-md py-1.5 text-label-md font-bold tracking-wider text-on-primary uppercase shadow-sm transition-colors hover:bg-primary"
              >
                GİRİŞ YAP
              </Link>
            ) : (
              <button
                type="button"
                disabled={isOwner || isSaving}
                onClick={() => {
                  void handleSave()
                }}
                className={
                  saved
                    ? 'font-label bg-secondary px-space-md py-1.5 text-label-md font-bold tracking-wider text-on-secondary uppercase shadow-sm transition-colors'
                    : 'font-label bg-primary-container px-space-md py-1.5 text-label-md font-bold tracking-wider text-on-primary uppercase shadow-sm transition-colors hover:bg-primary disabled:opacity-50'
                }
              >
                {saved ? 'KAYDEDİLDİ ✓' : isSaving ? 'KAYDEDİLİYOR…' : 'PUANI KAYDET'}
              </button>
            )}
          </div>
        </div>

        <div className="font-body flex items-center gap-2 bg-surface-container-lowest px-space-md py-2 text-body-sm text-on-surface-variant shadow-sm">
          <span className="material-symbols-outlined text-[18px] text-outline">lock</span>
          <span>
            <strong className="font-semibold text-on-surface">Kadro Sahibi Koruması:</strong> Kendi
            taktiğinizi oylayamazsınız.
          </span>
        </div>
      </div>
    </section>
  )
}
