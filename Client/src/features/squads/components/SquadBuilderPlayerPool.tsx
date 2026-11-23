import { useEffect, useRef, useState } from 'react'
import { ActiveNavUnderline } from '@/core/components/ActiveNavUnderline'
import { PlayerCategory } from '@/features/players/playerTypes'
import type {
  AssignmentSlotId,
  BuilderPlayer,
  BuilderPosGroup,
} from '../utils/squadBuilderTypes'
import { setSquadPlayerDragData } from '../utils/squadBuilderDnD'
import {
  SQUAD_POOL_CATEGORY_TOGGLES,
  builderBadgeClass,
} from '../utils/squadPoolCategories'

type SquadBuilderPlayerPoolProps = {
  players: BuilderPlayer[]
  assignments: Partial<Record<AssignmentSlotId, string>>
  search: string
  posFilter: BuilderPosGroup
  enabledCategories: Set<PlayerCategory>
  onSearchChange: (value: string) => void
  onPosFilterChange: (value: BuilderPosGroup) => void
  onToggleCategory: (category: PlayerCategory) => void
  onAssign: (playerId: string) => void
}

const posTabs: { id: BuilderPosGroup; label: string }[] = [
  { id: 'ALL', label: 'Tümü' },
  { id: 'GK', label: 'Kaleci' },
  { id: 'DF', label: 'Defans' },
  { id: 'MF', label: 'Orta Saha' },
  { id: 'FW', label: 'Forvet' },
]

const SCROLL_STEP = 360

function slotLabelForPlayer(
  assignments: Partial<Record<AssignmentSlotId, string>>,
  playerId: string,
): string | null {
  const entry = Object.entries(assignments).find(([, id]) => id === playerId)

  if (!entry) {
    return null
  }

  return entry[0]
}

export function SquadBuilderPlayerPool({
  players,
  assignments,
  search,
  posFilter,
  enabledCategories,
  onSearchChange,
  onPosFilterChange,
  onToggleCategory,
  onAssign,
}: SquadBuilderPlayerPoolProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const filtered = players.filter((player) => {
    if (posFilter !== 'ALL' && player.posGroup !== posFilter) {
      return false
    }

    const query = search.trim().toLowerCase()

    if (!query) {
      return true
    }

    return (
      player.name.toLowerCase().includes(query) ||
      player.number.includes(query) ||
      player.shortName.toLowerCase().includes(query)
    )
  })

  function updateScrollState() {
    const node = scrollerRef.current

    if (!node) {
      setCanScrollLeft(false)
      setCanScrollRight(false)
      return
    }

    const maxScroll = node.scrollWidth - node.clientWidth
    setCanScrollLeft(node.scrollLeft > 4)
    setCanScrollRight(node.scrollLeft < maxScroll - 4)
  }

  useEffect(() => {
    const node = scrollerRef.current

    if (!node) {
      return
    }

    updateScrollState()

    const handleScroll = () => {
      updateScrollState()
    }

    node.addEventListener('scroll', handleScroll, { passive: true })

    const resizeObserver = new ResizeObserver(() => {
      updateScrollState()
    })
    resizeObserver.observe(node)

    return () => {
      node.removeEventListener('scroll', handleScroll)
      resizeObserver.disconnect()
    }
  }, [filtered.length])

  function scrollByDirection(direction: -1 | 1) {
    const node = scrollerRef.current

    if (!node) {
      return
    }

    node.scrollBy({ left: direction * SCROLL_STEP, behavior: 'smooth' })
  }

  return (
    <div className="overflow-hidden bg-surface-container-lowest shadow-sm">
      <div className="flex flex-col gap-1.5 border-b border-outline-variant/30 bg-surface-container-low/60 px-space-sm py-space-sm sm:px-space-md">
        <div className="flex flex-wrap items-center gap-x-space-sm gap-y-0.5">
          <h2 className="font-headline flex items-center gap-1.5 text-headline-sm font-bold text-primary uppercase">
            <span className="material-symbols-outlined text-[20px] text-secondary">groups</span>
            Oyuncu Havuzu
          </h2>
          <span className="font-label text-[12px] font-semibold text-on-surface-variant">
            {filtered.length}/{players.length} oyuncu
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-1.5">
            {SQUAD_POOL_CATEGORY_TOGGLES.map((toggle) => {
              const isActive = enabledCategories.has(toggle.category)

              return (
                <button
                  key={toggle.category}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => {
                    onToggleCategory(toggle.category)
                  }}
                  className={
                    isActive
                      ? 'font-kicker cursor-pointer bg-primary px-2.5 py-1 text-kicker font-bold text-on-primary uppercase shadow-sm'
                      : 'font-kicker cursor-pointer border border-outline-variant/60 bg-transparent px-2.5 py-1 text-kicker font-bold text-on-surface uppercase transition-colors hover:border-primary/40 hover:bg-surface-container'
                  }
                >
                  {toggle.label}
                </button>
              )
            })}
          </div>
          <p className="font-body text-[10px] leading-snug text-on-surface-variant/70">
            * Oyuncu havuzuna istediklerinizi dahil ediniz.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-space-sm">
          <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5">
            {posTabs.map((tab) => {
              const isActive = posFilter === tab.id

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    onPosFilterChange(tab.id)
                  }}
                  className={
                    isActive
                      ? 'font-label cursor-pointer px-2 py-0.5 text-label-md font-bold text-secondary uppercase'
                      : 'font-label cursor-pointer px-2 py-0.5 text-label-md font-semibold text-on-surface-variant uppercase transition-colors hover:text-primary'
                  }
                >
                  <span className="relative inline-block">
                    {tab.label}
                    {isActive ? (
                      <ActiveNavUnderline className="pointer-events-none absolute -bottom-1.5 left-0 h-1.5 w-full text-secondary" />
                    ) : null}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="relative min-w-[12rem] flex-1">
            <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-[18px] text-on-surface-variant">
              search
            </span>
            <input
              className="font-body w-full bg-surface-container-lowest py-1.5 pr-space-md pl-10 text-body-sm text-on-surface placeholder-on-surface-variant/60 focus:ring-1 focus:ring-primary focus:outline-none"
              placeholder="Oyuncu adı veya forma no ara…"
              type="search"
              value={search}
              onChange={(event) => {
                onSearchChange(event.target.value)
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-stretch">
        <button
          type="button"
          aria-label="Önceki oyuncular"
          disabled={!canScrollLeft}
          onClick={() => {
            scrollByDirection(-1)
          }}
          className={
            canScrollLeft
              ? 'flex w-9 cursor-pointer items-center justify-center bg-primary text-on-primary transition-colors hover:bg-primary-container'
              : 'flex w-9 cursor-default items-center justify-center bg-surface-container text-on-surface-variant/40'
          }
        >
          <span className="material-symbols-outlined text-[24px]">chevron_left</span>
        </button>

        <div
          ref={scrollerRef}
          className="flex gap-1.5 overflow-x-auto scroll-smooth px-space-sm py-space-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {filtered.map((player) => {
            const assignedSlot = slotLabelForPlayer(assignments, player.id)
            const isAssigned = Boolean(assignedSlot)

            if (isAssigned) {
              return (
                <div
                  key={player.id}
                  className="flex w-[7rem] shrink-0 cursor-not-allowed flex-col items-center gap-1 bg-surface-container px-1.5 py-1.5 opacity-50"
                  title={`${player.name} · kadroda`}
                >
                  <div className="relative">
                    <div
                      className={`relative h-11 w-11 rounded-full p-0.5 shadow-lg ring-2 grayscale ${
                        player.posGroup === 'GK'
                          ? 'bg-tertiary ring-tertiary-fixed'
                          : 'bg-primary-container ring-white/60'
                      }`}
                    >
                      <div
                        className={`flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br text-[12px] font-bold text-white ${player.avatarGradient}`}
                      >
                        {player.initials}
                      </div>
                    </div>
                    <span
                      className={`font-kicker absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold shadow ${
                        player.posGroup === 'GK'
                          ? 'bg-tertiary-container text-on-tertiary-container'
                          : 'bg-primary text-on-primary'
                      }`}
                    >
                      #{player.number}
                    </span>
                    {player.badge ? (
                      <span
                        className={`font-kicker absolute -right-3 -bottom-1 px-1 text-[8px] font-bold uppercase ${builderBadgeClass(player.badge.tone)}`}
                      >
                        {player.badge.label}
                      </span>
                    ) : null}
                  </div>
                  <div className="w-full text-center">
                    <p className="font-headline truncate text-[11px] font-bold text-on-surface-variant line-through">
                      {player.shortName || player.name}
                    </p>
                    <p className="font-body mt-0.5 truncate text-[10px] text-on-surface-variant">
                      {player.roleHint}
                    </p>
                    {player.nationality ? (
                      <p className="font-body truncate text-[10px] text-on-surface-variant">
                        {player.nationality}
                      </p>
                    ) : null}
                  </div>
                </div>
              )
            }

            return (
              <button
                key={player.id}
                type="button"
                draggable
                title={`${player.name} · sürükle veya tıkla`}
                onDragStart={(event) => {
                  setSquadPlayerDragData(
                    event.dataTransfer,
                    { playerId: player.id },
                    player.initials,
                  )
                }}
                onClick={() => {
                  onAssign(player.id)
                }}
                className="group flex w-[7rem] shrink-0 cursor-grab flex-col items-center gap-1 bg-surface-container-low px-1.5 py-1.5 text-left transition-colors hover:bg-surface-container-high active:cursor-grabbing"
              >
                <div className="relative">
                  <div
                    className={`relative h-11 w-11 rounded-full p-0.5 shadow-lg ring-2 transition-[box-shadow] ${
                      player.posGroup === 'GK'
                        ? 'bg-tertiary ring-tertiary-fixed group-hover:ring-white'
                        : 'bg-primary-container ring-white/60 group-hover:ring-secondary-container'
                    }`}
                  >
                    <div
                      className={`flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br text-[12px] font-bold text-white ${player.avatarGradient}`}
                    >
                      {player.initials}
                    </div>
                  </div>
                  <span
                    className={`font-kicker absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold shadow ${
                      player.posGroup === 'GK'
                        ? 'bg-tertiary-container text-on-tertiary-container'
                        : 'bg-primary text-on-primary'
                    }`}
                  >
                    #{player.number}
                  </span>
                  {player.badge ? (
                    <span
                      className={`font-kicker absolute -right-3 -bottom-1 px-1 text-[8px] font-bold uppercase ${builderBadgeClass(player.badge.tone)}`}
                    >
                      {player.badge.label}
                    </span>
                  ) : null}
                </div>
                <div className="w-full text-center">
                  <p className="font-headline truncate text-[11px] font-bold text-on-surface transition-colors group-hover:text-primary">
                    {player.shortName || player.name}
                  </p>
                  <p className="font-body mt-0.5 truncate text-[10px] text-on-surface-variant">
                    {player.roleHint}
                  </p>
                  {player.nationality ? (
                    <p className="font-body truncate text-[10px] text-on-surface-variant">
                      {player.nationality}
                    </p>
                  ) : null}
                </div>
              </button>
            )
          })}

          {filtered.length === 0 ? (
            <div className="flex min-h-[6.5rem] w-full items-center justify-center px-space-md">
              <p className="font-body text-center text-body-sm text-on-surface-variant">
                Bu filtrelere uygun oyuncu bulunamadı.
              </p>
            </div>
          ) : null}
        </div>

        <button
          type="button"
          aria-label="Sonraki oyuncular"
          disabled={!canScrollRight}
          onClick={() => {
            scrollByDirection(1)
          }}
          className={
            canScrollRight
              ? 'flex w-9 cursor-pointer items-center justify-center bg-primary text-on-primary transition-colors hover:bg-primary-container'
              : 'flex w-9 cursor-default items-center justify-center bg-surface-container text-on-surface-variant/40'
          }
        >
          <span className="material-symbols-outlined text-[24px]">chevron_right</span>
        </button>
      </div>
    </div>
  )
}
