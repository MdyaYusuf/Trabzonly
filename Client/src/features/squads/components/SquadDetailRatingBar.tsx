import { useState } from 'react'
import {
  ratingFeedbackMap,
  ratingScores,
} from '../utils/squadDetailPlaceholders'

type SquadDetailRatingBarProps = {
  initialScore?: (typeof ratingScores)[number]
}

export function SquadDetailRatingBar({ initialScore = '4.5' }: SquadDetailRatingBarProps) {
  const [selectedScore, setSelectedScore] = useState<(typeof ratingScores)[number]>(initialScore)
  const [saved, setSaved] = useState(false)

  const phrase = ratingFeedbackMap[selectedScore]

  function handleSave() {
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
                  onClick={() => {
                    setSelectedScore(score)
                  }}
                  className={
                    isActive
                      ? 'font-label bg-primary px-2 py-1 text-label-md font-bold text-on-primary shadow-sm transition-all'
                      : 'font-label px-2 py-1 text-label-md font-bold text-on-surface-variant transition-all hover:bg-surface-container-high'
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
            <button
              type="button"
              onClick={handleSave}
              className={
                saved
                  ? 'font-label bg-secondary px-space-md py-1.5 text-label-md font-bold tracking-wider text-on-secondary uppercase shadow-sm transition-colors'
                  : 'font-label bg-primary-container px-space-md py-1.5 text-label-md font-bold tracking-wider text-on-primary uppercase shadow-sm transition-colors hover:bg-primary'
              }
            >
              {saved ? 'KAYDEDİLDİ ✓' : 'PUANI KAYDET'}
            </button>
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
