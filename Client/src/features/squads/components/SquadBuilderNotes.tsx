import { NOTES_MAX_LENGTH } from '../utils/squadBuilderConfig'

type SquadBuilderNotesProps = {
  notes: string
  onNotesChange: (value: string) => void
}

export function SquadBuilderNotes({ notes, onNotesChange }: SquadBuilderNotesProps) {
  const remaining = NOTES_MAX_LENGTH - notes.length

  return (
    <div className="flex h-full min-h-[14rem] w-full flex-col gap-space-sm bg-surface-container-lowest p-space-md shadow-sm">
      <h2 className="font-headline flex flex-wrap items-center gap-1.5 text-headline-sm font-bold text-primary uppercase">
        <span className="material-symbols-outlined text-[20px] text-secondary">stylus_note</span>
        Taktik Notu
        <span className="font-kicker text-kicker font-bold tracking-wider text-on-surface-variant normal-case">
          (İsteğe bağlı)
        </span>
      </h2>

      <textarea
        maxLength={NOTES_MAX_LENGTH}
        value={notes}
        onChange={(event) => {
          onNotesChange(event.target.value.slice(0, NOTES_MAX_LENGTH))
        }}
        placeholder="Kadronuzun kısa ve net taktiksel fikri..."
        className="font-body min-h-[8rem] w-full flex-1 resize-none bg-surface-container p-space-sm text-body-sm leading-relaxed text-on-surface focus:ring-1 focus:ring-primary focus:outline-none"
      />

      <div className="flex justify-end">
        <span
          className={
            remaining < 40
              ? 'font-kicker text-kicker font-bold text-error uppercase'
              : 'font-kicker text-kicker text-on-surface-variant uppercase'
          }
        >
          {notes.length} / {NOTES_MAX_LENGTH} Karakter
        </span>
      </div>
    </div>
  )
}
