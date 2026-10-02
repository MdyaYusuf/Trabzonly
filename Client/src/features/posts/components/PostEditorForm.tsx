import { useRef } from 'react'
import { Link } from 'react-router-dom'
import type { CategoryResponseDto } from '../../categories/categoryTypes'

type PostEditorFormProps = {
  mode: 'create' | 'edit'
  title: string
  categoryId: number | ''
  categories: CategoryResponseDto[]
  summary: string
  body: string
  coverPreviewUrl: string | null
  coverFileName: string | null
  pollEnabled: boolean
  pollQuestion: string
  pollOptions: string[]
  hasExistingPoll?: boolean
  existingPollQuestion?: string | null
  existingPollTotalVotes?: number
  deactivatePoll?: boolean
  isSubmitting: boolean
  onTitleChange: (value: string) => void
  onCategoryChange: (value: number | '') => void
  onSummaryChange: (value: string) => void
  onBodyChange: (value: string) => void
  onCoverFileChange: (file: File | null) => void
  onRemoveCover: () => void
  onPollEnabledChange: (value: boolean) => void
  onPollQuestionChange: (value: string) => void
  onPollOptionChange: (index: number, value: string) => void
  onAddPollOption: () => void
  onRemovePollOption: (index: number) => void
  onDeactivatePollChange?: (value: boolean) => void
  onPublish: () => void
}

function wordCount(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean)
  return words.length
}

export function PostEditorForm({
  mode,
  title,
  categoryId,
  categories,
  summary,
  body,
  coverPreviewUrl,
  coverFileName,
  pollEnabled,
  pollQuestion,
  pollOptions,
  hasExistingPoll = false,
  existingPollQuestion = null,
  existingPollTotalVotes = 0,
  deactivatePoll = false,
  isSubmitting,
  onTitleChange,
  onCategoryChange,
  onSummaryChange,
  onBodyChange,
  onCoverFileChange,
  onRemoveCover,
  onPollEnabledChange,
  onPollQuestionChange,
  onPollOptionChange,
  onAddPollOption,
  onRemovePollOption,
  onDeactivatePollChange,
  onPublish,
}: PostEditorFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const selectedCategory = categories.find((category) => category.id === categoryId)?.name ?? ''
  const words = wordCount(body)
  const readMinutes = Math.max(1, Math.round((words / 200) * 10) / 10)
  const canConfigurePoll = mode === 'create' || (mode === 'edit' && !hasExistingPoll)
  const showPollFields = canConfigurePoll && pollEnabled

  return (
    <div className="flex flex-col gap-space-lg lg:col-span-8">
      <div className="flex flex-col gap-space-md bg-surface-container-lowest p-space-lg shadow-sm">
        <div className="flex items-center justify-between">
          <span className="font-kicker text-kicker font-bold tracking-widest text-primary uppercase">
            1. Temel Başlık ve Kategorizasyon
          </span>
          <span className="font-label flex items-center gap-1 text-label-md text-error">
            * Zorunlu Alanlar
          </span>
        </div>

        <div className="flex flex-col gap-space-xs">
          <label className="font-label flex items-center justify-between text-label-md tracking-wider text-on-surface uppercase">
            <span>
              Başlık <span className="text-error">*</span>
            </span>
            <span className="font-label text-label-md text-on-surface-variant">
              {title.length} / 200 Karakter
            </span>
          </label>
          <input
            type="text"
            maxLength={200}
            value={title}
            onChange={(event) => {
              onTitleChange(event.target.value)
            }}
            placeholder="Örn: Akyazı'da Çift Forvet Presi..."
            className="font-headline w-full bg-surface-container-low px-space-md py-space-sm text-headline-sm text-on-surface transition-all focus:bg-surface-container-lowest focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-space-xs">
          <label className="font-label text-label-md tracking-wider text-on-surface uppercase">
            Kategori <span className="text-error">*</span>
          </label>
          <div className="relative">
            <select
              value={categoryId === '' ? '' : String(categoryId)}
              onChange={(event) => {
                const value = event.target.value
                onCategoryChange(value === '' ? '' : Number(value))
              }}
              className="font-body w-full cursor-pointer appearance-none bg-surface-container-low px-space-md py-space-sm text-body-md text-on-surface transition-all focus:bg-surface-container-lowest focus:outline-none"
            >
              <option value="">Kategori seçin</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-on-surface-variant">
              expand_more
            </span>
          </div>
          {selectedCategory ? (
            <span className="mt-1 inline-flex w-fit bg-primary-container px-2 py-0.5 font-kicker text-kicker tracking-wider text-on-primary uppercase">
              {selectedCategory}
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-space-xs pt-space-xs">
          <label className="font-label flex items-center justify-between text-label-md tracking-wider text-on-surface uppercase">
            <span>Açıklama (Özet)</span>
            <span className="font-label text-label-md text-on-surface-variant">
              {summary.length} / 500 Karakter
            </span>
          </label>
          <textarea
            rows={3}
            maxLength={500}
            value={summary}
            onChange={(event) => {
              onSummaryChange(event.target.value)
            }}
            placeholder="Gönderi akışında görünecek kısa giriş..."
            className="font-body w-full bg-surface-container-low px-space-md py-space-sm text-body-md text-on-surface transition-all focus:bg-surface-container-lowest focus:outline-none"
          />
        </div>
      </div>

      <div className="flex flex-col gap-space-md bg-surface-container-lowest p-space-lg shadow-sm">
        <span className="font-kicker text-kicker font-bold tracking-widest text-primary uppercase">
          2. Kapak Görseli
        </span>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0] ?? null
            onCoverFileChange(file)
          }}
        />

        {coverPreviewUrl ? (
          <div className="relative flex flex-col items-center gap-space-md overflow-hidden bg-surface-container-low p-space-md md:flex-row">
            <div className="h-36 w-full shrink-0 overflow-hidden bg-surface-container-high md:w-56">
              <img src={coverPreviewUrl} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="flex w-full flex-col gap-space-xs">
              <span className="font-body truncate text-body-md font-bold text-on-surface">
                {coverFileName ?? 'Kapak görseli'}
              </span>
              <div className="flex items-center gap-space-xs">
                <button
                  type="button"
                  onClick={() => {
                    fileInputRef.current?.click()
                  }}
                  className="font-label flex items-center gap-1 bg-surface-container px-space-md py-1 text-label-md tracking-wider text-on-surface uppercase"
                >
                  Değiştir
                </button>
                <button
                  type="button"
                  onClick={onRemoveCover}
                  className="font-label flex items-center gap-1 bg-error-container px-space-md py-1 text-label-md tracking-wider text-on-error-container uppercase"
                >
                  Kaldır
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              fileInputRef.current?.click()
            }}
            className="flex flex-col items-center justify-center gap-space-xs bg-surface-container p-space-lg text-center transition-colors hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-2xl text-secondary">cloud_upload</span>
            <p className="font-headline text-headline-sm text-on-surface">Kapak görseli seç</p>
            <p className="font-body text-body-sm text-on-surface-variant">
              PNG, JPG veya WEBP • Maksimum 5MB
            </p>
          </button>
        )}
      </div>

      <div className="flex flex-col gap-space-md bg-surface-container-lowest p-space-lg shadow-sm">
        <span className="font-kicker text-kicker font-bold tracking-widest text-primary uppercase">
          3. İçerik <span className="text-error">*</span>
        </span>
        <textarea
          rows={14}
          value={body}
          onChange={(event) => {
            onBodyChange(event.target.value)
          }}
          placeholder="Buraya yazınızı detaylandırın..."
          className="font-body w-full bg-surface-container-low p-space-md text-body-lg leading-relaxed text-on-surface transition-all focus:bg-surface-container-lowest focus:outline-none"
        />
        <div className="font-label flex gap-space-md bg-surface-container-low px-space-md py-space-xs text-label-md text-on-surface-variant">
          <span>
            Kelime: <strong className="text-on-surface">{words}</strong>
          </span>
          <span>
            Okuma: <strong className="text-on-surface">{readMinutes} dk</strong>
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-space-md bg-surface-container-lowest p-space-lg shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-space-sm">
          <span className="font-kicker text-kicker font-bold tracking-widest text-primary uppercase">
            4. İsteğe Bağlı Anket
          </span>
          {mode === 'edit' && hasExistingPoll ? (
            <span className="font-label text-label-md text-on-surface-variant">
              Aktif anket mevcut
            </span>
          ) : (
            <label className="font-label flex items-center gap-space-xs text-label-md text-on-surface">
              <input
                type="checkbox"
                checked={pollEnabled}
                onChange={(event) => {
                  onPollEnabledChange(event.target.checked)
                }}
              />
              Anket ekle
            </label>
          )}
        </div>

        {mode === 'edit' && hasExistingPoll ? (
          <div className="flex flex-col gap-space-sm bg-surface-container-low px-space-md py-space-sm">
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

        {showPollFields ? (
          <div className="flex flex-col gap-space-sm">
            <input
              type="text"
              maxLength={300}
              value={pollQuestion}
              onChange={(event) => {
                onPollQuestionChange(event.target.value)
              }}
              placeholder="Anket sorusu"
              className="font-body w-full bg-surface-container-low px-space-md py-space-sm text-body-md text-on-surface focus:outline-none"
            />
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
                  className="font-body w-full bg-surface-container-low px-space-md py-space-sm text-body-md text-on-surface focus:outline-none"
                />
                {pollOptions.length > 2 ? (
                  <button
                    type="button"
                    onClick={() => {
                      onRemovePollOption(index)
                    }}
                    className="font-label px-space-sm py-space-xs text-label-md text-error uppercase"
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
        ) : null}
      </div>

      <div className="flex flex-col items-center justify-between gap-space-md bg-surface-container-lowest p-space-lg shadow-sm sm:flex-row">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={onPublish}
          className="font-headline flex w-full items-center justify-center gap-space-xs bg-primary-container px-space-xl py-space-sm text-headline-sm tracking-wider text-on-primary uppercase shadow-md transition-all hover:bg-primary disabled:opacity-50 sm:w-auto"
        >
          <span className="material-symbols-outlined">send</span>
          <span>{isSubmitting ? 'Kaydediliyor...' : mode === 'edit' ? 'Güncelle' : 'Yayınla'}</span>
        </button>
        <Link
          to="/gonderiler"
          className="font-label px-space-md py-space-sm text-label-md tracking-wider text-outline uppercase transition-colors hover:text-on-surface"
        >
          İptal
        </Link>
      </div>
    </div>
  )
}
