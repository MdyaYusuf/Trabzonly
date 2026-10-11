type SquadBuilderSidebarActionsProps = {
  canPublish: boolean
  isPublishing: boolean
  onClear: () => void
  onPublish: () => void
}

export function SquadBuilderSidebarActions({
  canPublish,
  isPublishing,
  onClear,
  onPublish,
}: SquadBuilderSidebarActionsProps) {
  return (
    <div className="flex w-full flex-wrap items-center justify-end gap-space-sm">
      <button
        type="button"
        onClick={onClear}
        className="font-label flex items-center gap-1 px-space-md py-space-xs text-label-md tracking-wider text-on-surface-variant uppercase transition-colors hover:text-error"
      >
        <span className="material-symbols-outlined text-[18px]">restart_alt</span>
        Temizle
      </button>
      <button
        type="button"
        onClick={onPublish}
        disabled={!canPublish || isPublishing}
        className={
          canPublish && !isPublishing
            ? 'font-headline flex items-center gap-2 bg-primary-container px-space-lg py-space-xs text-label-md tracking-wider text-on-primary uppercase shadow-sm transition-all hover:bg-primary'
            : 'font-headline flex cursor-not-allowed items-center gap-2 bg-surface-container-highest px-space-lg py-space-xs text-label-md tracking-wider text-on-surface-variant uppercase opacity-70'
        }
      >
        <span className="material-symbols-outlined text-[18px] text-tertiary-fixed-dim">
          military_tech
        </span>
        {isPublishing ? 'YAYINLANIYOR…' : 'KAYDET & YAYINLA'}
      </button>
    </div>
  )
}
