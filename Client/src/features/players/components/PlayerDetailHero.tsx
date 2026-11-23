import { useState } from 'react'
import { PlayerCategory, type PlayerResponseDto } from '../playerTypes'
import { formatMarketValue } from '../utils/formatMarketValue'
import { getNationalityFlagUrl } from '../utils/nationalityFlag'

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

  if (
    normalized === 'both' ||
    normalized === 'çift' ||
    normalized === 'cift' ||
    normalized === 'çift ayak' ||
    normalized === 'cift ayak' ||
    normalized.length === 0
  ) {
    return 'Çift Ayak'
  }

  return preferredFoot
}

function formatVoteCount(count: number) {
  return count.toLocaleString('tr-TR')
}

function resolveRosterBadge(player: PlayerResponseDto): { label: string; active: boolean } {
  if (player.category === PlayerCategory.Legend) {
    return { label: 'Efsane', active: player.isActive }
  }

  if (player.category === PlayerCategory.TransferTarget) {
    return { label: 'Transfer Hedefi', active: player.isActive }
  }

  return {
    label: player.isActive ? 'Aktif Kadro' : 'Pasif',
    active: player.isActive,
  }
}

function resolveBandLabel(player: PlayerResponseDto): string {
  return player.positionName.toUpperCase()
}

function resolveSeasonLabel(player: PlayerResponseDto): string {
  const seasonName = player.currentSeasonStats?.seasonName?.trim()

  if (seasonName) {
    return seasonName
  }

  return '—'
}

type PlayerDetailHeroProps = {
  player: PlayerResponseDto
}

export function PlayerDetailHero({ player }: PlayerDetailHeroProps) {
  const [flagFailed, setFlagFailed] = useState(false)
  const isLegend = player.category === PlayerCategory.Legend
  const tone = CARD_TONES[player.name.length % CARD_TONES.length]
  const shirtLabel =
    player.shirtNumber != null && player.shirtNumber > 0 ? `#${player.shirtNumber}` : '—'
  const positionLabel = `${player.positionName.toUpperCase()} / NO: ${
    player.shirtNumber != null && player.shirtNumber > 0 ? player.shirtNumber : '—'
  }`
  const flagUrl = getNationalityFlagUrl(player.nationality)
  const showFlag = !player.imageUrl && Boolean(flagUrl) && !flagFailed
  const rosterBadge = resolveRosterBadge(player)
  const bandLabel = resolveBandLabel(player)
  const seasonLabel = isLegend ? null : resolveSeasonLabel(player)
  const teamLabel = isLegend ? null : player.currentTeam?.trim() || '—'
  const description = player.description?.trim()

  return (
    <>
      <section className="relative w-full overflow-hidden bg-primary text-on-primary">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-container to-primary opacity-95" />
        <div className="pointer-events-none absolute -right-20 -bottom-32 h-[550px] w-[550px] rounded-full bg-secondary-container opacity-10 blur-3xl" />
        <div className="pointer-events-none absolute top-1/4 left-1/4 h-[350px] w-[350px] rounded-full bg-secondary opacity-15 blur-2xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] opacity-5 [background-size:24px_24px]" />

        <div className="relative z-10 mx-auto max-w-[1360px] px-4 pt-space-md pb-space-lg sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 items-end gap-gutter lg:grid-cols-12">
            <div className="relative flex flex-col justify-end lg:col-span-4">
              <div
                className={[
                  'relative flex aspect-[4/5] max-h-[320px] w-full items-end justify-center overflow-hidden shadow-2xl',
                  player.imageUrl || showFlag
                    ? 'bg-surface-container'
                    : `bg-gradient-to-br ${tone}`,
                ].join(' ')}
              >
                {player.imageUrl ? (
                  <img
                    src={player.imageUrl}
                    alt={player.name}
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                ) : showFlag && flagUrl ? (
                  <img
                    src={flagUrl}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    onError={() => {
                      setFlagFailed(true)
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(255,255,255,0.16),transparent_42%)]" />
                )}
                <span className="absolute top-space-sm left-space-sm z-[1] font-display text-5xl leading-none font-extrabold text-white/25 select-none sm:text-6xl">
                  {shirtLabel}
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />
                <div className="absolute right-space-md bottom-space-md left-space-md flex items-center justify-between bg-primary/90 px-space-sm py-space-xs backdrop-blur-md">
                  <span className="font-kicker text-kicker tracking-widest text-secondary-container uppercase">
                    {bandLabel}
                  </span>
                  <span className="font-label flex items-center gap-1 text-label-md font-bold text-tertiary-fixed-dim uppercase">
                    <span
                      className="material-symbols-outlined text-[15px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                    {rosterBadge.label}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex h-full flex-col justify-between gap-space-sm pt-space-sm lg:col-span-8">
              <div className="flex flex-col gap-space-sm">
                {seasonLabel != null && teamLabel != null ? (
                  <div className="font-label flex flex-wrap items-center gap-space-sm text-label-md font-semibold tracking-wider text-on-primary uppercase">
                    <span>
                      <span className="text-tertiary-fixed-dim">SEZON:</span> {seasonLabel}
                    </span>
                    <span>
                      <span className="text-tertiary-fixed-dim">TAKIM:</span> {teamLabel}
                    </span>
                  </div>
                ) : null}

                <div className="flex flex-wrap items-center justify-between gap-space-sm">
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
                    {player.category === PlayerCategory.TransferTarget ? (
                      <span className="bg-secondary-container px-space-sm py-space-xs font-kicker text-kicker font-bold tracking-wider text-on-secondary-container uppercase">
                        TRANSFER
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

                <div>
                  <div className="mb-1 flex flex-wrap items-center gap-space-sm">
                    <span className="font-label text-label-md font-semibold tracking-wider text-on-primary/90 uppercase">
                      {player.nationality}
                    </span>
                  </div>
                  <h1 className="-ml-1 font-display text-display-xl-mobile leading-none font-black tracking-tight text-on-primary uppercase sm:text-display-xl">
                    {player.name}
                  </h1>
                  {description ? (
                    <p className="font-body mt-space-sm max-w-3xl text-body-md text-on-primary/85">
                      {description}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-wrap items-stretch gap-space-sm bg-primary-container/80 p-space-sm sm:p-space-md">
                <div className="grid min-w-0 flex-1 grid-cols-2 gap-space-sm sm:grid-cols-4">
                  <div>
                    <span className="font-kicker block text-kicker text-on-primary/70 uppercase">
                      Piyasa Değeri
                    </span>
                    <span className="font-headline text-headline-md font-bold text-tertiary-fixed-dim">
                      {player.marketValue != null
                        ? formatMarketValue(player.marketValue)
                        : '—'}
                    </span>
                  </div>
                  <div>
                    <span className="font-kicker block text-kicker text-on-primary/70 uppercase">
                      Maaş
                    </span>
                    <span className="font-headline text-headline-md font-bold text-tertiary-fixed-dim">
                      {player.wage != null ? formatMarketValue(player.wage) : '—'}
                    </span>
                  </div>
                  <div>
                    <span className="font-kicker block text-kicker text-on-primary/70 uppercase">
                      {isLegend ? 'Doğum Tarihi' : 'Yaş / Doğum'}
                    </span>
                    {isLegend ? (
                      <span className="font-headline text-headline-md font-bold text-on-primary">
                        {formatBirthDate(player.dateOfBirth)}
                      </span>
                    ) : (
                      <>
                        <span className="font-headline text-headline-md font-bold text-on-primary">
                          {player.age} Yaş
                        </span>
                        <span className="font-body block text-[11px] text-on-primary/60">
                          {formatBirthDate(player.dateOfBirth)}
                        </span>
                      </>
                    )}
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
                <button
                  type="button"
                  title="Profili Paylaş"
                  onClick={() => {
                    void navigator.clipboard?.writeText(window.location.href)
                  }}
                  className="flex shrink-0 cursor-pointer items-center justify-center self-center bg-surface-container-highest/20 px-space-sm py-space-sm text-on-primary transition-colors hover:bg-surface-container-highest/40"
                >
                  <span className="material-symbols-outlined text-[20px]">share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
