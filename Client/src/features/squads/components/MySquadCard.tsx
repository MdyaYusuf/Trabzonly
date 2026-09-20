import { Link } from 'react-router-dom'
import type { MySquadCardData, MySquadPitchPlayer } from '../utils/mySquadsTypes'

type MySquadCardProps = {
  squad: MySquadCardData
  onDelete: (squad: MySquadCardData) => void
}

function playerToneClass(tone: MySquadPitchPlayer['tone'], size: 'sm' | 'md') {
  const base = size === 'md' ? 'h-7 w-7 text-[11px]' : 'h-6 w-6 text-[10px]'

  if (tone === 'accent') {
    return `${base} bg-secondary-container text-on-secondary-container`
  }

  if (tone === 'light') {
    return `${base} bg-on-primary text-primary`
  }

  if (tone === 'gold') {
    return `${base} bg-tertiary-fixed-dim text-primary`
  }

  return `${base} bg-surface text-on-surface`
}

function FeaturedPitch({ squad }: { squad: MySquadCardData }) {
  const rows = squad.pitchRows ?? []

  return (
    <div className="relative flex flex-col justify-between overflow-hidden bg-primary p-space-md text-on-primary lg:col-span-4">
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 opacity-15">
        <div className="relative flex h-full w-full flex-col justify-between border-2 border-on-primary">
          <div className="flex h-1/2 w-full items-center justify-center border-b-2 border-on-primary">
            <div className="h-20 w-20 rounded-full border-2 border-on-primary" />
          </div>
          <div className="absolute bottom-0 left-1/2 h-12 w-28 -translate-x-1/2 border-t-2 border-x-2 border-on-primary" />
          <div className="absolute top-0 left-1/2 h-12 w-28 -translate-x-1/2 border-b-2 border-x-2 border-on-primary" />
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between">
        <span className="font-kicker bg-primary-container px-2 py-0.5 text-kicker font-bold tracking-wider text-secondary-container uppercase">
          {squad.formationLabel}
        </span>
        <span className="font-kicker text-kicker text-on-primary/80">FORMASYON HARİTASI</span>
      </div>

      <div className="relative z-10 my-space-lg flex h-56 flex-col justify-between px-space-md">
        {rows.map((row, rowIndex) => {
          const isBack = rowIndex === rows.length - 2
          const isGk = rowIndex === rows.length - 1
          const isMid = row.length === 2
          const isAtt = row.length === 3

          return (
            <div
              key={`row-${rowIndex}`}
              className={
                isGk
                  ? 'flex -mt-1 justify-center'
                  : isBack
                    ? 'flex justify-between px-space-xs'
                    : isMid
                      ? 'flex justify-around px-space-md'
                      : isAtt
                        ? 'flex justify-between px-space-sm'
                        : 'flex justify-center'
              }
            >
              {row.map((player) => (
                <div key={`${player.number}-${player.name}`} className="flex flex-col items-center">
                  <div
                    className={`font-kicker flex items-center justify-center rounded-full font-bold shadow-sm ${playerToneClass(
                      player.tone,
                      isBack || isGk ? 'sm' : 'md',
                    )}`}
                  >
                    {player.number}
                  </div>
                  <span
                    className={`font-kicker mt-0.5 uppercase ${
                      isBack || isGk
                        ? 'text-[9px] text-on-primary/90'
                        : 'mt-1 text-[10px] font-bold tracking-tight text-on-primary'
                    } ${isGk ? 'font-bold text-on-primary' : ''}`}
                  >
                    {player.name}
                  </span>
                </div>
              ))}
            </div>
          )
        })}
      </div>

      {squad.pitchFooter ? (
        <div className="font-kicker relative z-10 flex items-center justify-between pt-space-xs text-kicker text-on-primary/70">
          <span>{squad.pitchFooter[0]}</span>
          <span>{squad.pitchFooter[1]}</span>
        </div>
      ) : null}
    </div>
  )
}

function MiniDotsPitch({ squad }: { squad: MySquadCardData }) {
  const rows = squad.pitchRows ?? []

  return (
    <div className="w-48 shrink-0 bg-primary p-space-sm text-on-primary">
      <div className="font-kicker mb-2 flex items-center justify-between text-[10px] tracking-wider text-secondary-container uppercase">
        <span>DİZİLİŞ ŞEMASI</span>
        <span>{squad.formationLabel.replace('FORMASYON: ', '').split(' ')[0]}</span>
      </div>
      <div className="relative flex h-20 flex-col justify-around bg-primary-container px-3 py-1">
        {rows.map((row, rowIndex) => (
          <div
            key={`mini-${rowIndex}`}
            className={
              row.length >= 5
                ? 'flex justify-between px-1'
                : row.length === 3
                  ? 'flex justify-around'
                  : 'flex justify-around'
            }
          >
            {row.map((player, playerIndex) => (
              <span
                key={`${rowIndex}-${playerIndex}`}
                className={`inline-block rounded-full ${
                  player.tone === 'accent'
                    ? 'h-3.5 w-3.5 bg-secondary-container'
                    : player.tone === 'light'
                      ? 'h-3 w-3 bg-on-primary'
                      : 'h-3 w-3 bg-surface-container-highest'
                }`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function MySquadCard({ squad, onDelete }: MySquadCardProps) {
  if (squad.variant === 'featured') {
    return (
      <article className="relative overflow-hidden bg-surface-container-lowest shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <FeaturedPitch squad={squad} />
          <div className="flex flex-col justify-between p-space-lg lg:col-span-8">
            <div>
              <div className="mb-space-sm flex flex-wrap items-center justify-between gap-space-xs">
                <div className="flex flex-wrap items-center gap-space-xs">
                  <span className="font-kicker flex items-center gap-1 bg-secondary px-space-xs py-0.5 text-[10px] font-bold tracking-wider text-on-secondary uppercase">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary-container" />
                    YAYINDA • HERKESE AÇIK
                  </span>
                  <span className="font-kicker bg-tertiary-container px-space-xs py-0.5 text-[10px] font-bold text-on-tertiary-container uppercase">
                    ★ TARAFTAR FAVORİSİ
                  </span>
                </div>
                <div className="font-kicker text-kicker text-on-surface-variant">
                  {squad.updatedLabel}
                </div>
              </div>

              <h2 className="font-headline text-headline-md font-bold tracking-tight text-primary uppercase">
                {squad.title}
              </h2>
              <p className="font-body mt-1 text-body-md text-on-surface-variant">{squad.excerpt}</p>

              <div className="mt-space-md flex flex-wrap items-center gap-space-xs">
                {squad.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-label bg-surface-container px-space-sm py-1 text-[12px] font-semibold text-on-surface"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {squad.keyRoles ? (
                <div className="mt-space-md bg-surface-container-low p-space-sm pt-space-md">
                  <span className="font-kicker mb-1 block text-kicker tracking-wider text-on-surface-variant uppercase">
                    KİLİT SAHA İÇİ ROLLERİ:
                  </span>
                  <div className="font-label flex flex-wrap items-center gap-space-sm text-label-md text-on-surface">
                    {squad.keyRoles.map((role, index) => (
                      <span key={role.name} className="contents">
                        {index > 0 ? <span className="text-outline">•</span> : null}
                        <span className="font-bold text-primary">
                          {role.name}{' '}
                          <span className="font-normal text-on-surface-variant">({role.role})</span>
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mt-space-lg flex flex-col justify-between gap-space-md pt-space-md md:flex-row md:items-center">
              <div className="flex flex-wrap items-center gap-space-lg">
                <div className="flex items-center gap-1.5">
                  <span
                    className="material-symbols-outlined text-[24px] text-tertiary-fixed-dim"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="font-headline text-headline-sm font-bold text-on-surface">
                    {squad.rating}
                  </span>
                  <span className="font-body text-body-sm text-on-surface-variant">
                    ({squad.ratingCount} Oy)
                  </span>
                </div>
                <div className="font-body flex items-center gap-space-md text-body-sm text-on-surface-variant">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-secondary">
                      visibility
                    </span>{' '}
                    {squad.viewsLabel}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-secondary">
                      chat_bubble
                    </span>{' '}
                    {squad.commentCount}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-secondary">share</span>{' '}
                    {squad.shareCount}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-space-xs">
                <Link
                  to={`/kadrolar/${squad.id}`}
                  className="font-label flex items-center gap-1 bg-secondary-container px-space-md py-space-xs text-label-md font-bold text-on-secondary-container uppercase transition-colors hover:bg-secondary hover:text-on-secondary"
                >
                  <span className="material-symbols-outlined text-[16px]">sports_score</span>
                  Taktik Tahtasında Aç
                </Link>
                <Link
                  to="/kadrolar/olustur"
                  className="font-label bg-surface-container px-space-md py-space-xs text-label-md font-bold text-on-surface uppercase transition-colors hover:bg-primary hover:text-on-primary"
                >
                  Düzenle
                </Link>
                <button
                  type="button"
                  title="Paylaş"
                  className="bg-surface-container p-space-xs text-on-surface transition-colors hover:bg-surface-container-high"
                >
                  <span className="material-symbols-outlined text-[20px]">share</span>
                </button>
                <button
                  type="button"
                  title="Sil"
                  onClick={() => {
                    onDelete(squad)
                  }}
                  className="bg-surface-container p-space-xs text-error transition-colors hover:bg-error-container"
                >
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    )
  }

  if (squad.variant === 'draft') {
    return (
      <article className="flex flex-col justify-between bg-surface-container p-space-lg shadow-sm">
        <div>
          <div className="mb-space-sm flex flex-wrap items-center justify-between gap-space-xs">
            <div className="flex flex-wrap items-center gap-space-xs">
              <span className="font-kicker flex items-center gap-1 bg-tertiary-container px-space-xs py-0.5 text-[10px] font-bold tracking-wider text-on-tertiary-container uppercase">
                <span className="material-symbols-outlined text-[13px]">edit_document</span>
                TASLAK • YAYINLANMADI
              </span>
              <span className="font-kicker bg-surface-container-high px-space-xs py-0.5 text-[10px] font-bold text-on-surface-variant uppercase">
                {squad.formationLabel}
              </span>
            </div>
            <span className="font-kicker flex items-center gap-1 text-kicker font-bold text-error">
              <span className="material-symbols-outlined text-[14px]">warning</span>
              {squad.draftPlayerCount}
            </span>
          </div>

          <div className="flex flex-col justify-between gap-space-md lg:flex-row lg:items-start">
            <div className="max-w-3xl">
              <h2 className="font-headline text-headline-sm font-bold tracking-tight text-on-surface uppercase">
                {squad.title}
              </h2>
              <p className="font-body mt-1 text-body-md text-on-surface-variant">{squad.excerpt}</p>
              <div className="mt-space-sm flex flex-wrap items-center gap-space-xs">
                {squad.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-label bg-surface-container-highest px-space-sm py-0.5 text-[11px] text-on-surface"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="w-full shrink-0 bg-surface-container-lowest p-space-sm lg:w-64">
              <div className="mb-1 flex items-center justify-between">
                <span className="font-kicker text-kicker font-bold text-on-surface uppercase">
                  TAMAMLANMA ORANI
                </span>
                <span className="font-kicker text-kicker font-bold text-primary">
                  %{squad.draftProgress}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden bg-surface-container-highest">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${squad.draftProgress ?? 0}%` }}
                />
              </div>
              <p className="font-body mt-1.5 text-[12px] text-on-surface-variant">
                Eksik mevkiler: <strong>{squad.draftMissing}</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-space-md flex flex-col justify-between gap-space-sm bg-surface-container-lowest p-space-sm pt-space-md sm:flex-row sm:items-center">
          <div className="font-body flex items-center gap-space-xs text-body-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px]">lock</span>
            <span>Bu kadro şu anda yalnızca sizin profilinizde görüntülenmektedir.</span>
          </div>
          <div className="flex items-center gap-space-xs">
            <Link
              to="/kadrolar/olustur"
              className="font-label flex items-center gap-1 bg-primary px-space-md py-1 text-label-md font-bold text-on-primary uppercase transition-colors hover:bg-primary-container"
            >
              <span className="material-symbols-outlined text-[16px]">edit</span>
              Tamamla ve Düzenle
            </Link>
            <button
              type="button"
              onClick={() => {
                onDelete(squad)
              }}
              className="p-1 text-error transition-colors hover:bg-error-container"
            >
              <span className="material-symbols-outlined text-[20px]">delete</span>
            </button>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="flex flex-col justify-between bg-surface-container-lowest p-space-lg shadow-sm">
      <div>
        <div className="mb-space-sm flex flex-wrap items-center justify-between gap-space-xs">
          <div className="flex flex-wrap items-center gap-space-xs">
            <span className="font-kicker bg-secondary px-space-xs py-0.5 text-[10px] font-bold tracking-wider text-on-secondary uppercase">
              YAYINDA • HERKESE AÇIK
            </span>
            <span className="font-kicker bg-surface-container-high px-space-xs py-0.5 text-[10px] font-bold text-on-surface uppercase">
              {squad.formationLabel}
            </span>
          </div>
          <span className="font-kicker text-kicker text-on-surface-variant">{squad.updatedLabel}</span>
        </div>

        <div className="flex flex-col justify-between gap-space-md lg:flex-row lg:items-start">
          <div className="max-w-3xl">
            <h2 className="font-headline text-headline-sm font-bold tracking-tight text-primary uppercase">
              {squad.title}
            </h2>
            <p className="font-body mt-1 text-body-md text-on-surface-variant">{squad.excerpt}</p>
            <div className="mt-space-sm flex flex-wrap items-center gap-space-xs">
              {squad.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-label bg-surface-container px-space-sm py-0.5 text-[11px] text-on-surface"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {squad.pitchRows ? <MiniDotsPitch squad={squad} /> : null}

          {squad.strategyStats ? (
            <div className="min-w-[200px] bg-surface-container p-space-sm">
              <span className="font-kicker mb-1 block text-kicker text-on-surface-variant uppercase">
                STRATEJİK VERİ
              </span>
              {squad.strategyStats.map((stat) => (
                <div
                  key={stat.label}
                  className="font-body flex justify-between py-0.5 text-body-sm"
                >
                  <span className="text-on-surface-variant">{stat.label}</span>
                  <span className="font-bold text-primary">{stat.value}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {squad.lineupPreview ? (
          <div className="font-body mt-space-md text-body-sm text-on-surface-variant">
            <span className="font-kicker mr-1 text-kicker font-bold text-on-surface uppercase">
              Sahadaki 11:
            </span>
            {squad.lineupPreview}
          </div>
        ) : null}
      </div>

      <div className="mt-space-md flex flex-col justify-between gap-space-sm bg-surface-container-low p-space-sm pt-space-md sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center gap-space-md">
          <div className="flex items-center gap-1">
            <span
              className="material-symbols-outlined text-[20px] text-tertiary-fixed-dim"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span className="font-bold text-on-surface">{squad.rating}</span>
            <span className="text-[13px] text-on-surface-variant">({squad.ratingCount} Oy)</span>
          </div>
          <span className="text-outline">•</span>
          <span className="font-body text-body-sm text-on-surface-variant">
            {squad.viewsLabel} Görüntülenme
          </span>
          <span className="text-outline">•</span>
          <span className="font-body text-body-sm text-on-surface-variant">
            {squad.commentCount} Yorum
          </span>
          <span className="text-outline">•</span>
          <span className="font-body text-body-sm text-on-surface-variant">
            {squad.shareCount} Paylaşım
          </span>
        </div>
        <div className="flex items-center gap-space-xs">
          <Link
            to="/kadrolar/olustur"
            className="font-label bg-surface-container-highest px-space-md py-1 text-label-md font-semibold text-on-surface uppercase transition-colors hover:bg-primary hover:text-on-primary"
          >
            Düzenle
          </Link>
          <Link
            to={`/kadrolar/${squad.id}`}
            className="font-label bg-secondary-container px-space-md py-1 text-label-md font-semibold text-on-secondary-container uppercase transition-colors hover:bg-secondary hover:text-on-secondary"
          >
            Görüntüle
          </Link>
          <button
            type="button"
            onClick={() => {
              onDelete(squad)
            }}
            className="p-1 text-error transition-colors hover:bg-error-container"
          >
            <span className="material-symbols-outlined text-[20px]">delete</span>
          </button>
        </div>
      </div>
    </article>
  )
}
