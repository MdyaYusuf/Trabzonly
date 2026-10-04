import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatMarketValue } from '../utils/formatMarketValue'
import type { PlayerResponseDto } from '../playerTypes'

const CARD_TONES = [
  'from-[#5A0E27] to-[#1A040B]',
  'from-[#3f2900] to-[#1A040B]',
  'from-[#12648e] to-[#1A040B]',
  'from-[#1A3A2A] to-[#1A040B]',
  'from-[#4A1A4A] to-[#1A040B]',
] as const

function formatBirthDate(value: string) {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return '—'
  }

  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

function formatHeight(height?: number) {
  if (height == null) {
    return '—'
  }

  return `${(height / 100).toFixed(2).replace('.', ',')} m`
}

function formatFoot(preferredFoot: string) {
  const normalized = preferredFoot.trim().toLowerCase()

  if (normalized === 'left' || normalized === 'sol') {
    return 'Sol Ayak'
  }

  if (normalized === 'right' || normalized === 'sağ' || normalized === 'sag') {
    return 'Sağ Ayak'
  }

  return preferredFoot
}

function formatVoteCount(count: number) {
  return count.toLocaleString('tr-TR')
}

type PlayerDetailHeroProps = {
  player: PlayerResponseDto
  seasonLabel?: string | null
  onRate: (score: number) => Promise<boolean>
}

export function PlayerDetailHero({
  player,
  seasonLabel,
  onRate,
}: PlayerDetailHeroProps) {
  const [isRatingOpen, setIsRatingOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const tone = CARD_TONES[player.name.length % CARD_TONES.length]
  const shirtNumber = player.shirtNumber ?? '—'
  const positionLabel = `${player.positionName.toUpperCase()} / NO: ${shirtNumber}`

  async function handleScoreSelect(score: number) {
    if (isSubmitting) {
      return
    }

    setIsSubmitting(true)
    const ok = await onRate(score)
    setIsSubmitting(false)

    if (ok) {
      setIsRatingOpen(false)
    }
  }

  return (
    <>
      <div className="border-b border-border-subtle bg-surface-container-low">
        <div className="mx-auto flex max-w-[1360px] flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-12">
          <Link
            to="/oyuncular"
            className="font-label inline-flex items-center gap-1 text-label-md font-bold tracking-wider text-primary uppercase transition-colors hover:text-secondary"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Tüm Kadroya Dön
          </Link>
          <div className="font-kicker flex flex-wrap items-center gap-space-sm text-kicker tracking-wider text-on-surface-variant uppercase">
            <span>
              SEZON:{' '}
              <strong className="text-primary">
                {seasonLabel?.trim() || player.currentSeasonStats?.seasonName || '—'}
              </strong>
            </span>
            <span className="text-outline-variant">•</span>
            <span>
              TAKIM: <strong className="text-primary">{player.currentTeam}</strong>
            </span>
          </div>
        </div>
      </div>

      <section className="relative w-full overflow-hidden bg-primary text-on-primary">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-container to-primary opacity-95" />
        <div className="pointer-events-none absolute -right-20 -bottom-32 h-[550px] w-[550px] rounded-full bg-secondary-container opacity-10 blur-3xl" />
        <div className="pointer-events-none absolute top-1/4 left-1/4 h-[350px] w-[350px] rounded-full bg-secondary opacity-15 blur-2xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] opacity-5 [background-size:24px_24px]" />

        <div className="relative z-10 mx-auto max-w-[1360px] px-4 pt-space-lg pb-space-xl sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 items-end gap-gutter lg:grid-cols-12">
            <div className="relative flex flex-col justify-end lg:col-span-4">
              <div
                className={`relative flex aspect-[4/5] max-h-[480px] w-full items-end justify-center overflow-hidden bg-gradient-to-br shadow-2xl ${tone}`}
              >
                <span className="absolute top-space-md left-space-md font-display text-display-xl leading-none font-extrabold text-on-primary/20 select-none">
                  {shirtNumber}
                </span>
                {player.imageUrl ? (
                  <img
                    src={player.imageUrl}
                    alt={player.name}
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-6xl font-extrabold text-white/15">
                      #{shirtNumber}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />
                <div className="absolute right-space-md bottom-space-md left-space-md flex items-center justify-between bg-primary/90 px-space-sm py-space-xs backdrop-blur-md">
                  <span className="font-kicker text-kicker tracking-widest text-secondary-container uppercase">
                    A TAKIM {player.positionName.toUpperCase()}
                  </span>
                  <span className="font-label flex items-center gap-1 text-label-md font-bold text-tertiary-fixed-dim uppercase">
                    <span
                      className="material-symbols-outlined text-[15px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                    {player.isActive ? 'Aktif Kadro' : 'Pasif'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex h-full flex-col justify-between pt-space-md lg:col-span-8">
              <div className="flex flex-wrap items-center justify-between gap-space-md pb-space-md">
                <div className="flex flex-wrap items-center gap-space-xs">
                  <span className="bg-secondary px-space-sm py-space-xs font-kicker text-kicker font-bold tracking-wider text-on-secondary uppercase">
                    {positionLabel}
                  </span>
                  {player.isCaptain ? (
                    <span className="flex items-center gap-1 bg-tertiary-container px-space-sm py-space-xs font-kicker text-kicker font-bold text-tertiary-fixed-dim uppercase">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tertiary-fixed-dim" />
                      KAPTAN
                    </span>
                  ) : null}
                </div>
                <div className="flex items-center gap-space-xs bg-primary-container px-space-md py-space-xs shadow-md">
                  <span
                    className="material-symbols-outlined text-[20px] text-tertiary-fixed-dim"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-1">
                      <span className="font-headline text-headline-sm font-bold text-tertiary-fixed-dim">
                        {player.averageRating.toFixed(1)}
                      </span>
                      <span className="font-kicker text-kicker text-on-primary/60">/ 10</span>
                    </div>
                    <span className="font-kicker text-[9px] tracking-wider text-on-primary/80 uppercase">
                      {formatVoteCount(player.ratingCount)} Taraftar Oyu
                    </span>
                  </div>
                </div>
              </div>

              <div className="my-space-sm">
                <div className="mb-space-xs flex flex-wrap items-center gap-space-sm">
                  <span className="font-label text-label-md font-semibold tracking-wider text-on-primary/90 uppercase">
                    {player.nationality}
                  </span>
                  {player.isDomestic ? (
                    <>
                      <span className="h-1 w-1 rounded-full bg-secondary-container" />
                      <span className="font-label text-label-md text-secondary-fixed-dim">Yerli</span>
                    </>
                  ) : null}
                </div>
                <h1 className="-ml-1 font-display text-display-xl-mobile leading-none font-black tracking-tight text-on-primary uppercase sm:text-display-xl">
                  {player.name}
                </h1>
              </div>

              <div className="my-space-md grid grid-cols-2 gap-space-sm bg-primary-container/80 p-space-md sm:grid-cols-3">
                <div>
                  <span className="font-kicker block text-kicker text-on-primary/70 uppercase">
                    Piyasa Değeri
                  </span>
                  <span className="font-headline text-headline-md font-bold text-tertiary-fixed-dim">
                    {player.marketValue != null ? formatMarketValue(player.marketValue) : '—'}
                  </span>
                </div>
                <div>
                  <span className="font-kicker block text-kicker text-on-primary/70 uppercase">
                    Yaş / Doğum
                  </span>
                  <span className="font-headline text-headline-md font-bold text-on-primary">
                    {player.age} Yaş
                  </span>
                  <span className="font-body block text-[11px] text-on-primary/60">
                    {formatBirthDate(player.dateOfBirth)}
                  </span>
                </div>
                <div>
                  <span className="font-kicker block text-kicker text-on-primary/70 uppercase">
                    Boy / Ayak
                  </span>
                  <span className="font-headline text-headline-md font-bold text-on-primary">
                    {formatHeight(player.height)}
                  </span>
                  <span className="font-body block text-[11px] font-semibold text-secondary-container">
                    {formatFoot(player.preferredFoot)}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-space-md pt-space-xs">
                <div className="flex flex-col gap-space-sm">
                  <div className="flex flex-wrap items-center gap-space-sm">
                    <button
                      type="button"
                      onClick={() => {
                        setIsRatingOpen((open) => !open)
                      }}
                      className="font-label flex cursor-pointer items-center gap-2 bg-secondary-container px-space-lg py-space-sm text-label-md font-bold tracking-wider text-on-secondary-container uppercase shadow-md transition-all hover:bg-surface-container-lowest"
                    >
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      {player.currentUserScore != null
                        ? `Puanın: ${player.currentUserScore.toFixed(1)}`
                        : 'Oyuncuyu Puanla'}
                    </button>
                    <button
                      type="button"
                      title="Profili Paylaş"
                      onClick={() => {
                        void navigator.clipboard?.writeText(window.location.href)
                      }}
                      className="flex cursor-pointer items-center justify-center bg-surface-container-highest/20 p-space-sm text-on-primary transition-colors hover:bg-surface-container-highest/40"
                    >
                      <span className="material-symbols-outlined text-[18px]">share</span>
                    </button>
                  </div>
                  {isRatingOpen ? (
                    <div className="flex flex-wrap items-center gap-1">
                      {Array.from({ length: 10 }, (_, index) => {
                        const score = index + 1

                        return (
                          <button
                            key={score}
                            type="button"
                            disabled={isSubmitting}
                            onClick={() => {
                              void handleScoreSelect(score)
                            }}
                            className={`font-label h-9 w-9 text-label-md font-bold transition-colors ${
                              player.currentUserScore === score
                                ? 'bg-secondary-container text-on-secondary-container'
                                : 'bg-surface-container-highest/20 text-on-primary hover:bg-surface-container-highest/40'
                            }`}
                          >
                            {score}
                          </button>
                        )
                      })}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
