import { NOTES_MAX_LENGTH } from '../utils/squadBuilderPlaceholders'

type SquadBuilderNotesProps = {
  notes: string
  onNotesChange: (value: string) => void
}

export function SquadBuilderNotes({ notes, onNotesChange }: SquadBuilderNotesProps) {
  const remaining = NOTES_MAX_LENGTH - notes.length

  return (
    <div className="flex w-full flex-col gap-space-sm bg-surface-container-lowest p-space-md shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-space-sm">
        <span className="font-headline flex items-center gap-2 text-[16px] font-bold text-primary uppercase">
          <span className="material-symbols-outlined text-secondary">stylus_note</span>
          Yazarın Taktik Notu
        </span>
        <span
          className={
            remaining < 40
              ? 'font-kicker text-kicker font-bold text-error uppercase'
              : 'font-kicker text-kicker text-on-surface-variant uppercase'
          }
        >
          {notes.length} / {NOTES_MAX_LENGTH}
        </span>
      </div>

      <textarea
        rows={5}
        maxLength={NOTES_MAX_LENGTH}
        value={notes}
        onChange={(event) => {
          onNotesChange(event.target.value.slice(0, NOTES_MAX_LENGTH))
        }}
        placeholder="Kadronuzun taktik fikrini kısa ve net yazın (en fazla 400 karakter)..."
        className="font-body w-full bg-surface-container p-space-sm text-body-sm leading-relaxed text-on-surface focus:ring-1 focus:ring-primary focus:outline-none"
      />
    </div>
  )
}
