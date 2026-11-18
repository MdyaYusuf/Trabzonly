type SquadBuilderSidebarActionsProps = {
  isPublishing: boolean
  onClear: () => void
  onCancel: () => void
  onPublish: () => void
}

export function SquadBuilderSidebarActions({
  isPublishing,
  onClear,
  onCancel,
  onPublish,
}: SquadBuilderSidebarActionsProps) {
  return (
    <div className="flex w-full flex-wrap items-center justify-end gap-space-sm">
      <button
        type="button"
        onClick={onClear}
        className="font-label flex cursor-pointer items-center gap-1 px-space-md py-space-xs text-label-md tracking-wider text-on-surface-variant uppercase transition-colors hover:text-error"
      >
        <span className="material-symbols-outlined text-[18px]">ink_eraser</span>
        Temizle
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="font-label flex cursor-pointer items-center gap-1 px-space-md py-space-xs text-label-md tracking-wider text-on-surface-variant uppercase transition-colors hover:text-primary"
      >
        <span className="material-symbols-outlined text-[18px]">close</span>
        İptal
      </button>
      <button
        type="button"
        onClick={onPublish}
        disabled={isPublishing}
        className={
          isPublishing
            ? 'font-headline flex cursor-not-allowed items-center gap-2 bg-surface-container-highest px-space-lg py-space-xs text-label-md tracking-wider text-on-surface-variant uppercase opacity-70'
            : 'font-headline flex cursor-pointer items-center gap-2 bg-primary-container px-space-lg py-space-xs text-label-md tracking-wider text-on-primary uppercase shadow-sm transition-all hover:bg-primary'
        }
      >
        <span className="material-symbols-outlined text-[18px] text-secondary-container">
          send
        </span>
        {isPublishing ? 'Yayınlanıyor…' : 'Yayınla'}
      </button>
    </div>
  )
}
