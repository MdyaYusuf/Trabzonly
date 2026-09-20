import { Link } from 'react-router-dom'
import {
  editorCategories,
  type EditorCategoryId,
} from '../utils/postEditorPlaceholders'

type PostEditorFormProps = {
  mode: 'create' | 'edit'
  draftId: string
  title: string
  categoryId: EditorCategoryId
  tagsInput: string
  summary: string
  body: string
  coverImageUrl: string | null
  coverFileName: string
  coverMeta: string
  onTitleChange: (value: string) => void
  onCategoryChange: (value: EditorCategoryId) => void
  onTagsChange: (value: string) => void
  onSummaryChange: (value: string) => void
  onBodyChange: (value: string) => void
  onRemoveCover: () => void
  onPublish: () => void
  onSaveDraft: () => void
}

function parseTags(input: string) {
  return input
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
}

function wordCount(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean)
  return words.length
}

export function PostEditorForm({
  mode,
  draftId,
  title,
  categoryId,
  tagsInput,
  summary,
  body,
  coverImageUrl,
  coverFileName,
  coverMeta,
  onTitleChange,
  onCategoryChange,
  onTagsChange,
  onSummaryChange,
  onBodyChange,
  onRemoveCover,
  onPublish,
  onSaveDraft,
}: PostEditorFormProps) {
  const selectedCategory =
    editorCategories.find((category) => category.id === categoryId)?.label ?? ''
  const tags = parseTags(tagsInput)
  const words = wordCount(body)
  const readMinutes = Math.max(1, Math.round((words / 200) * 10) / 10)

  return (
    <div className="flex flex-col gap-space-lg lg:col-span-8">
      <div className="w-full bg-surface-container-low lg:hidden">
        <div className="flex items-center justify-between px-0 py-space-sm">
          <span className="font-kicker text-kicker text-outline uppercase">{draftId}</span>
        </div>
      </div>

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
              {title.length} / 120 Karakter
            </span>
          </label>
          <input
            type="text"
            maxLength={120}
            value={title}
            onChange={(event) => {
              onTitleChange(event.target.value)
            }}
            placeholder="Örn: Akyazı'da Çift Forvet Presi: Banza ve Drăguș Birlikte Nasıl Oynamalı?"
            className="font-headline w-full bg-surface-container-low px-space-md py-space-sm text-headline-sm text-on-surface transition-all focus:bg-surface-container-lowest focus:outline-none"
          />
          <p className="font-body text-body-sm text-on-surface-variant">
            Manşetinizin güçlü, merak uyandırıcı ve Karadeniz ruhunun ciddiyetini yansıtan netlikte
            olmasına özen gösterin.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-space-md pt-space-xs md:grid-cols-2">
          <div className="flex flex-col gap-space-xs">
            <label className="font-label text-label-md tracking-wider text-on-surface uppercase">
              Kategori <span className="text-error">*</span>
            </label>
            <div className="relative">
              <select
                value={categoryId}
                onChange={(event) => {
                  onCategoryChange(event.target.value as EditorCategoryId)
                }}
                className="font-body w-full cursor-pointer appearance-none bg-surface-container-low px-space-md py-space-sm text-body-md text-on-surface transition-all focus:bg-surface-container-lowest focus:outline-none"
              >
                {editorCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-on-surface-variant">
                expand_more
              </span>
            </div>
            <div className="mt-1 flex items-center gap-space-xs">
              <span className="font-label text-label-md text-on-surface-variant">
                Seçili Etiket:
              </span>
              <span className="bg-primary-container px-2 py-0.5 font-kicker text-kicker tracking-wider text-on-primary uppercase">
                {selectedCategory}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-space-xs">
            <label className="font-label text-label-md tracking-wider text-on-surface uppercase">
              Etiketler (Virgülle Ayırın)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(event) => {
                onTagsChange(event.target.value)
              }}
              placeholder="#Trabzonspor, #Akyazı, #Banza"
              className="font-body w-full bg-surface-container-low px-space-md py-space-sm text-body-md text-on-surface transition-all focus:bg-surface-container-lowest focus:outline-none"
            />
            <div className="mt-1 flex flex-wrap gap-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="font-label bg-surface-container px-1.5 py-0.5 text-label-md font-bold text-secondary"
                >
                  {tag.startsWith('#') ? tag : `#${tag}`}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-space-xs pt-space-xs">
          <label className="font-label flex items-center justify-between text-label-md tracking-wider text-on-surface uppercase">
            <span>
              Açıklama (Özet & Giriş Spotu) <span className="text-error">*</span>
            </span>
            <span className="font-label text-label-md text-on-surface-variant">
              {summary.length} / 250 Karakter
            </span>
          </label>
          <textarea
            rows={3}
            maxLength={250}
            value={summary}
            onChange={(event) => {
              onSummaryChange(event.target.value)
            }}
            placeholder="Gönderi akışında ve önizleme kartlarında görünecek kısa giriş cümlesi..."
            className="font-body w-full bg-surface-container-low px-space-md py-space-sm text-body-md text-on-surface transition-all focus:bg-surface-container-lowest focus:outline-none"
          />
          <p className="font-body text-body-sm text-on-surface-variant">
            Okuyucuların yazının içeriğine dair ilk izlenimi edinmesini sağlar (maksimum 250
            karakter).
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-space-md bg-surface-container-lowest p-space-lg shadow-sm">
        <div className="flex items-center justify-between">
          <span className="font-kicker text-kicker font-bold tracking-widest text-primary uppercase">
            2. Kapak Görseli veya Taktik Şablonu
          </span>
          <span className="font-label text-label-md font-bold text-secondary uppercase">
            16:9 Önerilir
          </span>
        </div>

        {coverImageUrl ? (
          <div className="relative flex flex-col items-center gap-space-md overflow-hidden bg-surface-container-low p-space-md md:flex-row">
            <div className="group relative h-36 w-full shrink-0 overflow-hidden bg-surface-container-high shadow-sm md:w-56">
              <img
                src={coverImageUrl}
                alt=""
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-primary/30 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="material-symbols-outlined text-on-primary">zoom_in</span>
              </div>
            </div>
            <div className="flex h-full w-full flex-col justify-between gap-space-xs">
              <div className="flex flex-col">
                <div className="flex items-center gap-space-xs">
                  <span className="bg-secondary px-2 py-0.5 font-kicker text-kicker text-on-secondary uppercase">
                    Yüklendi
                  </span>
                  <span className="font-body truncate text-body-md font-bold text-on-surface">
                    {coverFileName}
                  </span>
                </div>
                <p className="font-body mt-1 text-body-sm text-on-surface-variant">{coverMeta}</p>
              </div>
              <div className="flex items-center gap-space-xs pt-space-xs">
                <button
                  type="button"
                  className="font-label flex items-center gap-1 bg-surface-container px-space-md py-1 text-label-md tracking-wider text-on-surface uppercase transition-colors hover:bg-surface-container-high"
                >
                  <span className="material-symbols-outlined text-sm">swap_horiz</span>
                  Görseli Değiştir
                </button>
                <button
                  type="button"
                  onClick={onRemoveCover}
                  className="font-label flex items-center gap-1 bg-error-container px-space-md py-1 text-label-md tracking-wider text-on-error-container uppercase transition-opacity hover:opacity-80"
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                  Kaldır
                </button>
              </div>
            </div>
          </div>
        ) : null}

        <div className="flex cursor-pointer flex-col items-center justify-center gap-space-xs bg-surface-container p-space-lg text-center transition-colors hover:bg-surface-container-high">
          <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container">
            <span className="material-symbols-outlined text-2xl">cloud_upload</span>
          </div>
          <p className="font-headline text-headline-sm text-on-surface">
            Kapak görselini buraya sürükleyin veya bilgisayarınızdan seçin
          </p>
          <p className="font-body max-w-md text-body-sm text-on-surface-variant">
            PNG, JPG veya WEBP (Maksimum 5MB • Önerilen boyut 1200x630 piksel • 16:9 yatay format)
          </p>
          <div className="mt-space-xs">
            <button
              type="button"
              className="bg-secondary px-space-md py-space-xs font-label text-label-md tracking-wider text-on-secondary uppercase transition-colors hover:bg-secondary-container hover:text-on-secondary-container"
            >
              Dosya Seç
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-space-md bg-surface-container-lowest p-space-lg shadow-sm">
        <div className="flex items-center justify-between">
          <span className="font-kicker text-kicker font-bold tracking-widest text-primary uppercase">
            3. İçerik (Yazı Gövdesi & Taktik Dökümü)
          </span>
          <span className="font-label flex items-center gap-1 text-label-md text-on-surface-variant">
            <span className="material-symbols-outlined text-sm text-secondary">check_circle</span>
            Canlı İmla Denetimi
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1 bg-surface-container-low p-space-xs">
          <button type="button" className="p-2 text-sm font-bold text-on-surface hover:bg-surface-container" title="Kalın">
            B
          </button>
          <button type="button" className="p-2 text-sm text-on-surface italic hover:bg-surface-container" title="İtalik">
            I
          </button>
          <button type="button" className="px-2 py-1 text-xs font-bold text-on-surface uppercase hover:bg-surface-container">
            H2
          </button>
          <button type="button" className="px-2 py-1 text-xs font-bold text-on-surface uppercase hover:bg-surface-container">
            H3
          </button>
          <div className="mx-1 h-6 w-px bg-outline-variant" />
          <button type="button" className="flex items-center p-2 text-on-surface hover:bg-surface-container">
            <span className="material-symbols-outlined text-base">format_quote</span>
          </button>
          <button type="button" className="flex items-center p-2 text-on-surface hover:bg-surface-container">
            <span className="material-symbols-outlined text-base">format_list_bulleted</span>
          </button>
          <button type="button" className="flex items-center p-2 text-on-surface hover:bg-surface-container">
            <span className="material-symbols-outlined text-base">format_list_numbered</span>
          </button>
          <button type="button" className="flex items-center p-2 text-on-surface hover:bg-surface-container">
            <span className="material-symbols-outlined text-base">link</span>
          </button>
          <div className="mx-1 h-6 w-px bg-outline-variant" />
          <button
            type="button"
            className="font-label flex items-center gap-1 bg-surface-container-high px-space-sm py-1 text-label-md tracking-wider text-on-surface uppercase transition-colors hover:bg-primary hover:text-on-primary"
          >
            <span className="material-symbols-outlined text-sm">assignment</span>
            <span>Taktik Notu Ekle</span>
          </button>
          <button
            type="button"
            className="font-label flex items-center gap-1 bg-surface-container-high px-space-sm py-1 text-label-md tracking-wider text-on-surface uppercase transition-colors hover:bg-secondary hover:text-on-secondary"
          >
            <span className="material-symbols-outlined text-sm">sports_soccer</span>
            <span>11&apos;ini Ekle</span>
          </button>
          <button
            type="button"
            className="font-label flex items-center gap-1 bg-surface-container-high px-space-sm py-1 text-label-md tracking-wider text-on-surface uppercase transition-colors hover:bg-surface-container-highest"
          >
            <span className="material-symbols-outlined text-sm">bar_chart</span>
            <span>İstatistik Tablosu</span>
          </button>
        </div>

        <textarea
          rows={14}
          value={body}
          onChange={(event) => {
            onBodyChange(event.target.value)
          }}
          placeholder="Buraya yazınızı detaylandırın..."
          className="font-body w-full bg-surface-container-low p-space-md text-body-lg leading-relaxed text-on-surface transition-all focus:bg-surface-container-lowest focus:outline-none"
        />

        <div className="font-label flex flex-col justify-between gap-space-xs bg-surface-container-low px-space-md py-space-xs text-label-md text-on-surface-variant sm:flex-row sm:items-center">
          <div className="flex items-center gap-space-md">
            <span>
              Kelime Sayısı: <strong className="text-on-surface">{words}</strong>
            </span>
            <span>
              Tahmini Okuma: <strong className="text-on-surface">{readMinutes} Dakika</strong>
            </span>
          </div>
          <div className="flex items-center gap-space-xs text-secondary">
            <span className="material-symbols-outlined text-sm">schedule</span>
            <span>Taslak otomatik kaydedildi (14:32)</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-space-md bg-surface-container-lowest p-space-lg shadow-sm sm:flex-row">
        <div className="flex w-full items-center gap-space-xs sm:w-auto">
          <button
            type="button"
            onClick={onPublish}
            className="font-headline flex w-full items-center justify-center gap-space-xs bg-primary-container px-space-xl py-space-sm text-headline-sm tracking-wider text-on-primary uppercase shadow-md transition-all hover:bg-primary sm:w-auto"
          >
            <span className="material-symbols-outlined">send</span>
            <span>{mode === 'edit' ? 'Güncelle' : 'Yayınla'}</span>
          </button>
          <button
            type="button"
            onClick={onSaveDraft}
            className="font-label flex w-full items-center justify-center gap-space-xs bg-surface-container px-space-lg py-space-sm text-label-md tracking-wider text-on-surface uppercase transition-colors hover:bg-surface-container-high sm:w-auto"
          >
            <span className="material-symbols-outlined text-base">save</span>
            <span>Taslağı Kaydet</span>
          </button>
        </div>
        <div className="flex w-full items-center justify-end gap-space-md sm:w-auto">
          <button
            type="button"
            className="font-label flex items-center gap-1 px-space-md py-space-sm text-label-md tracking-wider text-on-surface-variant uppercase transition-colors hover:text-primary"
          >
            <span className="material-symbols-outlined text-base">visibility</span>
            <span>Önizleme</span>
          </button>
          <Link
            to="/gonderiler"
            className="font-label px-space-md py-space-sm text-label-md tracking-wider text-outline uppercase transition-colors hover:text-on-surface"
          >
            İptal
          </Link>
        </div>
      </div>
    </div>
  )
}
