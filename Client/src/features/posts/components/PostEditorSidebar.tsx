import { Link } from 'react-router-dom'
import { editorGuidelines, featureTips } from '../utils/postEditorPlaceholders'

type PostEditorSidebarProps = {
  mode: 'create' | 'edit'
  cancelTo: string
  pollQuestion: string
  pollOptions: string[]
  hasExistingPoll?: boolean
  existingPollQuestion?: string | null
  existingPollTotalVotes?: number
  deactivatePoll?: boolean
  canPublish: boolean
  isSubmitting: boolean
  onPollQuestionChange: (value: string) => void
  onPollOptionChange: (index: number, value: string) => void
  onAddPollOption: () => void
  onRemovePollOption: (index: number) => void
  onDeactivatePollChange?: (value: boolean) => void
  onPublish: () => void
}

export function PostEditorSidebar({
  mode,
  cancelTo,
  pollQuestion,
  pollOptions,
  hasExistingPoll = false,
  existingPollQuestion = null,
  existingPollTotalVotes = 0,
  deactivatePoll = false,
  canPublish,
  isSubmitting,
  onPollQuestionChange,
  onPollOptionChange,
  onAddPollOption,
  onRemovePollOption,
  onDeactivatePollChange,
  onPublish,
}: PostEditorSidebarProps) {
  const canConfigurePoll = mode === 'create' || (mode === 'edit' && !hasExistingPoll)

  return (
    <aside className="flex h-full flex-col gap-space-lg lg:col-span-4">
      <div className="flex w-full flex-col gap-space-md bg-surface-container-lowest p-space-md shadow-sm">
        <div className="flex items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-lg text-secondary">ballot</span>
            <span className="font-headline text-label-md font-bold tracking-wider text-primary uppercase">
              İsteğe Bağlı Anket
            </span>
          </div>
          <span className="font-kicker bg-secondary-container px-2 py-0.5 text-[10px] font-bold text-on-secondary-container">
            OPSİYONEL
          </span>
        </div>

        <p className="font-body text-body-sm text-on-surface-variant">
          Tribünü bir soruyla hareketlendir. Boş bırakırsan anket eklenmez.
        </p>

        {mode === 'edit' && hasExistingPoll ? (
          <div className="flex flex-col gap-space-sm bg-surface-container px-space-md py-space-sm">
            <p className="font-body text-body-md text-on-surface">
              {existingPollQuestion ?? 'Anket'}
            </p>
            <p className="font-label text-label-md text-on-surface-variant">
              Toplam oy: {existingPollTotalVotes.toLocaleString('tr-TR')}
            </p>
            <p className="font-label text-label-md text-on-surface-variant">
              Soru ve seçenekler oy kullananlar nedeniyle düzenlenemez.
            </p>
            <label className="font-label flex items-center gap-space-xs text-label-md text-on-surface">
              <input
                type="checkbox"
                checked={deactivatePoll}
                onChange={(event) => {
                  onDeactivatePollChange?.(event.target.checked)
                }}
              />
              Anketi kapat
            </label>
          </div>
        ) : null}

        {canConfigurePoll ? (
          <div className="flex flex-col gap-space-sm">
            <div className="flex flex-col gap-space-xs">
              <label className="font-kicker text-kicker tracking-widest text-on-surface uppercase">
                Anket Sorusu
              </label>
              <input
                type="text"
                maxLength={300}
                value={pollQuestion}
                onChange={(event) => {
                  onPollQuestionChange(event.target.value)
                }}
                placeholder="Örn: Bu hafta Papara Park'ta galibiyet gelir mi?"
                className="font-body w-full bg-surface-container px-space-md py-space-sm text-body-md text-on-surface focus:ring-1 focus:ring-primary focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-space-xs">
              <span className="font-kicker text-kicker tracking-widest text-on-surface uppercase">
                Seçenekler
              </span>
              {pollOptions.map((option, index) => (
                <div key={index} className="flex items-center gap-space-xs">
                  <input
                    type="text"
                    maxLength={200}
                    value={option}
                    onChange={(event) => {
                      onPollOptionChange(index, event.target.value)
                    }}
                    placeholder={`Seçenek ${index + 1}`}
                    className="font-body w-full bg-surface-container px-space-md py-space-sm text-body-md text-on-surface focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                  {pollOptions.length > 2 ? (
                    <button
                      type="button"
                      onClick={() => {
                        onRemovePollOption(index)
                      }}
                      className="font-label shrink-0 px-space-sm py-space-xs text-label-md text-error uppercase"
                    >
                      Sil
                    </button>
                  ) : null}
                </div>
              ))}
              {pollOptions.length < 6 ? (
                <button
                  type="button"
                  onClick={onAddPollOption}
                  className="font-label self-start px-space-sm py-1 text-label-md font-bold text-secondary uppercase"
                >
                  + Seçenek Ekle
                </button>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-space-md bg-surface-container-lowest p-space-lg shadow-sm">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-lg text-secondary">verified_user</span>
          <span className="font-headline text-label-md font-bold tracking-wider text-primary uppercase">
            Tribün & Editoryal İlkeler
          </span>
        </div>
        <p className="font-body text-body-sm text-on-surface-variant">
          Trabzonly tribünü, seviyeli tartışma ve futbol kültürünü yüceltme zeminidir. Aşağıdaki
          ilkelere dikkat etmenizi önemle rica ediyoruz.
        </p>
        <div className="flex flex-col gap-space-sm">
          {editorGuidelines.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-space-sm bg-surface-container p-space-sm"
            >
              <span className="material-symbols-outlined mt-0.5 shrink-0 text-[18px] text-secondary">
                {item.icon}
              </span>
              <span className="font-body text-body-sm text-on-surface">
                <strong>{item.title}:</strong> {item.body}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-space-md bg-surface-container p-space-lg">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-lg text-secondary">tips_and_updates</span>
          <span className="font-headline text-label-md font-bold tracking-wider text-primary uppercase">
            Manşete Çıkma İpuçları
          </span>
        </div>
        <div className="flex flex-col gap-space-sm">
          {featureTips.map((tip, index) => (
            <div
              key={tip}
              className="flex items-center gap-space-sm bg-surface-container-lowest p-space-sm"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-on-secondary">
                {index + 1}
              </span>
              <p className="font-body text-body-sm text-on-surface">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto flex w-full flex-wrap items-center justify-end gap-space-sm pt-space-md">
        <Link
          to={cancelTo}
          className="font-label flex items-center gap-1 px-space-md py-space-xs text-label-md tracking-wider text-on-surface-variant uppercase transition-colors hover:text-error"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
          İptal
        </Link>
        <button
          type="button"
          onClick={onPublish}
          disabled={!canPublish || isSubmitting}
          className={
            canPublish && !isSubmitting
              ? 'font-headline flex items-center gap-2 bg-primary-container px-space-lg py-space-xs text-label-md tracking-wider text-on-primary uppercase shadow-sm transition-all hover:bg-primary'
              : 'font-headline flex cursor-not-allowed items-center gap-2 bg-surface-container-highest px-space-lg py-space-xs text-label-md tracking-wider text-on-surface-variant uppercase opacity-70'
          }
        >
          <span className="material-symbols-outlined text-[18px] text-secondary-container">
            send
          </span>
          {isSubmitting
            ? 'Kaydediliyor…'
            : mode === 'edit'
              ? 'Güncelle'
              : 'Yayınla'}
        </button>
      </div>
    </aside>
  )
}
