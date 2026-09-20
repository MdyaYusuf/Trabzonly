import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PostEditorForm } from '../components/PostEditorForm'
import { PostEditorSidebar } from '../components/PostEditorSidebar'
import {
  defaultEditorDraft,
  type EditorCategoryId,
} from '../utils/postEditorPlaceholders'

type PostCreateEditPageProps = {
  mode?: 'create' | 'edit'
}

export function PostCreateEditPage({ mode: modeProp }: PostCreateEditPageProps) {
  const params = useParams<{ postId: string }>()
  const navigate = useNavigate()
  const mode = modeProp ?? (params.postId ? 'edit' : 'create')

  const [title, setTitle] = useState(defaultEditorDraft.title)
  const [categoryId, setCategoryId] = useState<EditorCategoryId>(
    defaultEditorDraft.categoryId,
  )
  const [tagsInput, setTagsInput] = useState(defaultEditorDraft.tagsInput)
  const [summary, setSummary] = useState(defaultEditorDraft.summary)
  const [body, setBody] = useState(defaultEditorDraft.body)
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(
    defaultEditorDraft.coverImageUrl,
  )
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  function handlePublish() {
    setStatusMessage(mode === 'edit' ? 'Gönderi güncellendi (placeholder).' : 'Gönderi yayınlandı (placeholder).')
    navigate('/gonderiler/1')
  }

  function handleSaveDraft() {
    setStatusMessage('Taslak kaydedildi (placeholder).')
  }

  return (
    <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
      <div className="w-full bg-surface-container-low">
        <div className="mx-auto flex max-w-[1360px] items-center justify-between px-4 py-space-sm sm:px-6 lg:px-12">
          <div className="flex items-center gap-space-xs text-on-surface-variant">
            <Link
              to="/gonderiler"
              className="font-label flex items-center gap-1 text-label-md font-bold text-primary transition-colors hover:text-primary"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span>Gönderilere Dön</span>
            </Link>
            <span className="text-outline-variant">/</span>
            <span className="font-label text-label-md text-on-surface-variant">
              {mode === 'edit' ? 'Gönderiyi Düzenle' : 'Yeni Gönderi Oluştur'}
            </span>
          </div>
          <div className="hidden items-center gap-space-md md:flex">
            <div className="font-label flex items-center gap-space-xs text-label-md text-on-surface-variant">
              <span className="h-2 w-2 animate-pulse rounded-full bg-secondary" />
              <span>Otomatik Kayıt Devrede</span>
            </div>
            <span className="font-kicker text-kicker text-outline uppercase">
              {defaultEditorDraft.draftId}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full bg-surface-container-lowest">
        <div className="mx-auto max-w-[1360px] px-4 py-space-lg sm:px-6 lg:px-12">
          <div className="flex flex-col gap-space-xs">
            <div className="flex flex-wrap items-center gap-space-xs">
              <span className="bg-primary-container px-2 py-0.5 font-kicker text-kicker tracking-widest text-on-primary uppercase">
                Editoryal Masası
              </span>
              <span className="font-kicker text-kicker font-bold tracking-widest text-secondary uppercase">
                • Tahmin, Taktik & Tribün Sesi
              </span>
            </div>
            <h1 className="font-headline text-headline-lg tracking-tight text-primary uppercase">
              {mode === 'edit' ? 'Gönderiyi Düzenle' : 'Yeni Gönderi Oluştur'}
            </h1>
            <p className="font-body max-w-4xl text-body-md text-on-surface-variant">
              Bordo-Mavi fırtınanın sahadaki taktiğini, tribün anılarını veya transfer nabzını tüm
              camia ile paylaş. Editoryal standartlara ve küfürsüz tribün ahlakına uygun içerikler
              haftalık özet bülteninde ve ana vitrinde öne çıkarılır.
            </p>
            {statusMessage ? (
              <p className="font-label text-label-md font-bold text-secondary">{statusMessage}</p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="w-full py-space-xl">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12">
            <PostEditorForm
              mode={mode}
              draftId={defaultEditorDraft.draftId}
              title={title}
              categoryId={categoryId}
              tagsInput={tagsInput}
              summary={summary}
              body={body}
              coverImageUrl={coverImageUrl}
              coverFileName={defaultEditorDraft.coverFileName}
              coverMeta={defaultEditorDraft.coverMeta}
              onTitleChange={setTitle}
              onCategoryChange={setCategoryId}
              onTagsChange={setTagsInput}
              onSummaryChange={setSummary}
              onBodyChange={setBody}
              onRemoveCover={() => {
                setCoverImageUrl(null)
              }}
              onPublish={handlePublish}
              onSaveDraft={handleSaveDraft}
            />
            <PostEditorSidebar />
          </div>
        </div>
      </div>
    </main>
  )
}
