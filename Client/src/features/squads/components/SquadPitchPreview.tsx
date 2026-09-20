import type { PitchPlayer } from '../utils/squadsGalleryTypes'

type SquadPitchPreviewProps = {
  formationLabel: string
  badge?: string
  badgeTone?: 'trend' | 'gold' | 'target' | 'derby' | 'classic'
  pitchTags: [string, string]
  columns: PitchPlayer[][]
}

function badgeClasses(tone?: SquadPitchPreviewProps['badgeTone']) {
  if (tone === 'trend') {
    return 'bg-[#1f1b17]/80 text-[#f7bd5b]'
  }

  if (tone === 'gold') {
    return 'bg-[#1f1b17]/80 text-[#f7bd5b]'
  }

  if (tone === 'target') {
    return 'bg-secondary text-on-secondary'
  }

  if (tone === 'derby') {
    return 'bg-error text-on-error'
  }

  if (tone === 'classic') {
    return 'bg-surface-container-highest text-on-surface'
  }

  return 'bg-[#1f1b17]/80 text-white'
}

function badgeIcon(tone?: SquadPitchPreviewProps['badgeTone']) {
  if (tone === 'trend') {
    return 'local_fire_department'
  }

  if (tone === 'gold') {
    return 'star'
  }

  if (tone === 'target') {
    return 'gps_fixed'
  }

  if (tone === 'derby') {
    return 'bolt'
  }

  if (tone === 'classic') {
    return 'history_edu'
  }

  return null
}

export function SquadPitchPreview({
  formationLabel,
  badge,
  badgeTone,
  pitchTags,
  columns,
}: SquadPitchPreviewProps) {
  const colCount = Math.max(columns.length, 1)
  const icon = badgeIcon(badgeTone)

  return (
    <div className="relative flex h-60 flex-col justify-between overflow-hidden bg-[#163828] p-3">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 400 240"
        aria-hidden="true"
      >
        <rect fill="#1b4332" height="40" opacity="0.4" width="400" y="0" />
        <rect fill="#1b4332" height="40" opacity="0.4" width="400" y="80" />
        <rect fill="#1b4332" height="40" opacity="0.4" width="400" y="160" />
        <rect fill="none" height="220" stroke="#FFFFFF" strokeWidth="1.2" width="370" x="15" y="10" />
        <line stroke="#FFFFFF" strokeWidth="1.2" x1="200" x2="200" y1="10" y2="230" />
        <circle cx="200" cy="120" fill="none" r="36" stroke="#FFFFFF" strokeWidth="1.2" />
        <circle cx="200" cy="120" fill="#FFFFFF" r="2.5" />
        <rect fill="none" height="120" stroke="#FFFFFF" strokeWidth="1.2" width="60" x="15" y="60" />
        <rect fill="none" height="70" stroke="#FFFFFF" strokeWidth="1.2" width="22" x="15" y="85" />
        <rect fill="none" height="120" stroke="#FFFFFF" strokeWidth="1.2" width="60" x="325" y="60" />
        <rect fill="none" height="70" stroke="#FFFFFF" strokeWidth="1.2" width="22" x="363" y="85" />
      </svg>

      <div className="relative z-10 flex items-center justify-between gap-2">
        <span className="font-kicker bg-primary px-2 py-0.5 text-kicker font-bold tracking-wider text-on-primary uppercase">
          {formationLabel}
        </span>
        {badge ? (
          <span
            className={`font-kicker flex items-center gap-1 px-2 py-0.5 text-kicker font-bold uppercase ${badgeClasses(badgeTone)}`}
          >
            {icon ? <span className="material-symbols-outlined text-[13px]">{icon}</span> : null}
            {badge}
          </span>
        ) : null}
      </div>

      <div
        className="relative z-10 my-1 grid flex-1 items-center justify-items-center text-center"
        style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
      >
        {columns.map((column, columnIndex) => {
          const isEdge = columnIndex === 0 || columnIndex === columns.length - 1

          return (
            <div
              key={`col-${columnIndex}`}
              className={
                column.length === 1
                  ? 'flex flex-col items-center'
                  : 'flex h-full flex-col justify-around py-1'
              }
            >
              {column.map((player) => {
                const isBordo = player.tone === 'bordo'
                const sizeClass = isEdge
                  ? 'h-5 w-5 text-[9px]'
                  : 'h-4 w-4 text-[8px]'

                return (
                  <div key={`${player.number}-${player.name}`} className="flex flex-col items-center">
                    <span
                      className={`flex items-center justify-center rounded-full font-bold shadow-sm ${sizeClass} ${
                        isBordo
                          ? 'bg-[#5A0E27] text-white'
                          : 'bg-[#75B7E5] text-[#1A040B]'
                      }`}
                    >
                      {player.number}
                    </span>
                    <span
                      className={`mt-0.5 bg-black/40 px-0.5 text-white ${
                        isEdge ? 'bg-black/50 text-[9px] font-bold' : 'text-[8px]'
                      }`}
                    >
                      {player.name}
                    </span>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>

      <div className="font-kicker relative z-10 flex items-center justify-between text-[10px] text-white/80">
        <span>{pitchTags[0]}</span>
        <span>{pitchTags[1]}</span>
      </div>
    </div>
  )
}
