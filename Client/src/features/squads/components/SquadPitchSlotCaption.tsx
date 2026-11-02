import { useEffect, useMemo, useRef, useState } from 'react'
import type { PositionRoleResponseDto } from '@/features/positions/positionTypes'

type SquadPitchSlotCaptionProps = {
  name: string
  roleLabel?: string
  roleDescription?: string | null
  isGk?: boolean
  empty?: boolean
  roleOptions?: PositionRoleResponseDto[]
  selectedRoleId?: number
  openRoleMenuUpward?: boolean
  onRoleChange?: (roleId: number) => void
  onRoleMenuOpenChange?: (open: boolean) => void
}

function RoleMenu({
  options,
  selectedRoleId,
  openUpward,
  onPick,
  onClose,
}: {
  options: PositionRoleResponseDto[]
  selectedRoleId?: number
  openUpward: boolean
  onPick: (roleId: number) => void
  onClose: () => void
}) {
  const rootRef = useRef<HTMLDivElement>(null)

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

  return (
    <div
      ref={rootRef}
      role="listbox"
      aria-label="Pozisyon rolü"
      className={
        openUpward
          ? 'absolute bottom-full left-1/2 z-[80] mb-1.5 w-56 -translate-x-1/2 overflow-hidden border border-white/15 bg-[#0d1a12]/95 shadow-[0_12px_28px_rgba(0,0,0,0.55)] backdrop-blur-md'
          : 'absolute top-full left-1/2 z-[80] mt-1.5 w-56 -translate-x-1/2 overflow-hidden border border-white/15 bg-[#0d1a12]/95 shadow-[0_12px_28px_rgba(0,0,0,0.55)] backdrop-blur-md'
      }
      onClick={(event) => {
        event.stopPropagation()
      }}
      onMouseDown={(event) => {
        event.stopPropagation()
      }}
    >
      <div className="border-b border-white/10 px-2.5 py-1.5">
        <span className="font-kicker text-[9px] font-bold tracking-[0.14em] text-white/55 uppercase">
          Rol seç
        </span>
      </div>
      <div className="flex max-h-52 flex-col overflow-y-auto py-1">
        {options.map((role) => {
          const selected = role.id === selectedRoleId

          return (
            <button
              key={role.id}
              type="button"
              role="option"
              aria-selected={selected}
              title={role.description}
              onClick={() => {
                onPick(role.id)
              }}
              className={`flex flex-col gap-0.5 px-2.5 py-1.5 text-left transition-colors ${
                selected
                  ? 'bg-secondary-container/25 text-secondary-container'
                  : 'text-white/90 hover:bg-white/8'
              }`}
            >
              <span className="font-headline text-[11px] font-bold leading-tight">
                {role.name}
              </span>
              <span className="font-body line-clamp-2 text-[9px] leading-snug text-white/45">
                {role.description}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function SquadPitchSlotCaption({
  name,
  roleLabel,
  roleDescription,
  isGk = false,
  empty = false,
  roleOptions,
  selectedRoleId,
  openRoleMenuUpward = false,
  onRoleChange,
  onRoleMenuOpenChange,
}: SquadPitchSlotCaptionProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const selectable = Boolean(roleOptions && roleOptions.length > 0 && onRoleChange)

  const selectedRole = useMemo(() => {
    if (!roleOptions || selectedRoleId == null) {
      return undefined
    }

    return roleOptions.find((role) => role.id === selectedRoleId)
  }, [roleOptions, selectedRoleId])

  const displayRole = selectedRole?.name ?? roleLabel
  const displayDescription = selectedRole?.description ?? roleDescription
  const accentClass = isGk ? 'text-tertiary-fixed' : 'text-secondary-container'

  function setMenuOpenState(open: boolean) {
    setMenuOpen(open)
    onRoleMenuOpenChange?.(open)
  }

  return (
    <div className="relative mt-1.5 flex w-[7.75rem] flex-col items-center text-center">
      <span
        className={`font-headline block max-w-full text-[11px] leading-tight font-bold tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] ${
          empty ? 'text-white/75' : 'text-white'
        }`}
      >
        {name}
      </span>

      {selectable ? (
        <button
          type="button"
          title={displayDescription ?? 'Rol seç'}
          aria-haspopup="listbox"
          aria-expanded={menuOpen}
          onClick={(event) => {
            event.stopPropagation()
            setMenuOpenState(!menuOpen)
          }}
          onMouseDown={(event) => {
            event.stopPropagation()
          }}
          className={`font-kicker group/role mt-0.5 flex max-w-full cursor-pointer flex-col items-center text-center text-[9px] leading-snug font-bold tracking-wide uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)] transition-colors hover:text-white ${accentClass}`}
        >
          <span className="whitespace-normal break-words text-center">
            {displayRole ?? 'Rol'}
          </span>
          <span
            aria-hidden="true"
            className={`material-symbols-outlined -mt-0.5 text-[14px] leading-none text-white/75 transition-transform group-hover/role:text-white ${
              menuOpen ? 'rotate-180 text-white' : ''
            }`}
          >
            expand_more
          </span>
        </button>
      ) : displayRole ? (
        <span
          title={displayDescription ?? undefined}
          className={`font-kicker mt-0.5 max-w-full whitespace-normal break-words text-center text-[9px] leading-snug font-bold tracking-wide uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)] ${accentClass}`}
        >
          {displayRole}
        </span>
      ) : null}

      {menuOpen && selectable && roleOptions ? (
        <RoleMenu
          options={roleOptions}
          selectedRoleId={selectedRoleId}
          openUpward={openRoleMenuUpward}
          onPick={(roleId) => {
            onRoleChange?.(roleId)
            setMenuOpenState(false)
          }}
          onClose={() => {
            setMenuOpenState(false)
          }}
        />
      ) : null}
    </div>
  )
}
