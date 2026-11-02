import { useEffect, useMemo, useRef, useState } from 'react'
import type { BuilderPlayer } from '../utils/squadBuilderTypes'

type SquadPlayerPickerMenuProps = {
  title: string
  candidates: BuilderPlayer[]
  openUpward?: boolean
  emptyLabel?: string
  onPick: (playerId: string) => void
  onClose: () => void
}

export function SquadPlayerPickerMenu({
  title,
  candidates,
  openUpward = false,
  emptyLabel = 'Uygun oyuncu yok.',
  onPick,
  onClose,
}: SquadPlayerPickerMenuProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        onClose()
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) {
      return candidates
    }

    return candidates.filter((player) => {
      return (
        player.name.toLowerCase().includes(query) ||
        player.shortName.toLowerCase().includes(query) ||
        player.number.includes(query)
      )
    })
  }, [candidates, search])

  return (
    <div
      ref={rootRef}
      role="listbox"
      aria-label={title}
      className={
        openUpward
          ? 'absolute bottom-full left-1/2 z-[80] mb-1.5 w-60 -translate-x-1/2 overflow-hidden border border-white/15 bg-[#0d1a12]/95 shadow-[0_12px_28px_rgba(0,0,0,0.55)] backdrop-blur-md'
          : 'absolute top-full left-1/2 z-[80] mt-1.5 w-60 -translate-x-1/2 overflow-hidden border border-white/15 bg-[#0d1a12]/95 shadow-[0_12px_28px_rgba(0,0,0,0.55)] backdrop-blur-md'
      }
      onClick={(event) => {
        event.stopPropagation()
      }}
      onMouseDown={(event) => {
        event.stopPropagation()
      }}
    >
      <div className="flex items-center justify-between gap-2 border-b border-white/10 px-2.5 py-1.5">
        <span className="font-kicker text-[10px] font-bold tracking-[0.14em] text-white uppercase">
          {title}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="flex h-5 w-5 cursor-pointer items-center justify-center text-white transition-transform hover:scale-125"
          aria-label="Kapat"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>

      <div className="border-b border-white/10 px-2 py-1.5">
        <label className="relative block">
          <span className="material-symbols-outlined pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-[15px] text-secondary-container">
            search
          </span>
          <input
            autoFocus
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value)
            }}
            placeholder="İsim veya no…"
            className="font-body w-full bg-white/5 py-1.5 pr-2 pl-10 text-[12px] text-white/90 placeholder:text-white/35 focus:outline-none focus:ring-1 focus:ring-secondary-container/60"
          />
        </label>
      </div>

      <div className="flex max-h-56 flex-col overflow-y-auto py-1 [scrollbar-width:thin] [scrollbar-color:rgba(140,206,253,0.55)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-sm [&::-webkit-scrollbar-thumb]:bg-secondary-container/50 hover:[&::-webkit-scrollbar-thumb]:bg-secondary-container/75">
        {filtered.map((player) => (
          <button
            key={player.id}
            type="button"
            role="option"
            onClick={() => {
              onPick(player.id)
            }}
            className="flex cursor-pointer items-center gap-2 px-2.5 py-1.5 text-left text-white/90 transition-colors hover:bg-white/8"
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-[10px] font-bold text-white ${player.avatarGradient}`}
            >
              {player.initials}
            </div>
            <div className="min-w-0 flex-1 overflow-hidden">
              <span className="font-headline block truncate text-[12px] font-bold leading-tight text-secondary-container">
                {player.name}
              </span>
              <span
                className="font-kicker block truncate text-[9px] text-white uppercase"
                title={`#${player.number} · ${player.roleHint}`}
              >
                #{player.number} · {player.roleHint}
              </span>
            </div>
          </button>
        ))}
        {filtered.length === 0 ? (
          <p className="font-body px-2.5 py-3 text-center text-[11px] text-white/45">
            {emptyLabel}
          </p>
        ) : null}
      </div>
    </div>
  )
}
