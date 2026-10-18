import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import categoryService from '../../categories/categoryService'
import type { CategoryResponseDto } from '../../categories/categoryTypes'
import { PostEditorForm } from '../components/PostEditorForm'
import { PostEditorSidebar } from '../components/PostEditorSidebar'
import { PostEditorToolbar } from '../components/PostEditorToolbar'
import postService from '../postService'

type PostCreateEditPageProps = {
  mode?: 'create' | 'edit'
}

export function PostCreateEditPage({ mode: modeProp }: PostCreateEditPageProps) {
  const params = useParams<{ postId: string }>()
  const navigate = useNavigate()
  const mode = modeProp ?? (params.postId ? 'edit' : 'create')
  const postId = params.postId
  const cancelTo =
    mode === 'edit' && postId ? `/gonderiler/${postId}` : '/gonderiler'

  const [categories, setCategories] = useState<CategoryResponseDto[]>([])
  const [title, setTitle] = useState('')
  const [categoryId, setCategoryId] = useState<number | ''>('')
  const [summary, setSummary] = useState('')
  const [body, setBody] = useState('')
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null)
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null)
  const [pollQuestion, setPollQuestion] = useState('')
  const [pollOptions, setPollOptions] = useState(['', ''])
  const [hasExistingPoll, setHasExistingPoll] = useState(false)
  const [existingPollQuestion, setExistingPollQuestion] = useState<string | null>(null)
  const [existingPollTotalVotes, setExistingPollTotalVotes] = useState(0)
  const [deactivatePoll, setDeactivatePoll] = useState(false)
  const [isActive, setIsActive] = useState(true)
  const [isLoading, setIsLoading] = useState(mode === 'edit')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  const canPublish =
    title.trim().length > 0 && body.trim().length > 0 && categoryId !== '' && !isSubmitting

  useEffect(() => {
    let cancelled = false

    async function loadCategories() {
      const result = await categoryService.getAll({ pageNumber: 1, pageSize: 50 })

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setCategories(result.data.items.filter((category) => category.isActive))
      }
    }

    void loadCategories()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (mode !== 'edit' || !postId) {
      return
    }

    const editPostId = postId
    let cancelled = false

    async function loadPost() {
      setIsLoading(true)

      const result = await postService.getById(editPostId)

      if (cancelled) {
        return
      }

      if (!result.success || !result.data) {
        setStatusMessage('Gönderi yüklenemedi.')
        setIsLoading(false)
        return
      }

      const post = result.data
      setTitle(post.title)
      setCategoryId(post.categoryId)
      setSummary(post.description ?? '')
      setBody(post.content)
      setExistingImageUrl(post.imageUrl ?? null)
      setCoverPreviewUrl(post.imageUrl ?? null)
      setIsActive(post.isActive)
      setHasExistingPoll(Boolean(post.poll))
      setExistingPollQuestion(post.poll?.question ?? null)
      setExistingPollTotalVotes(post.poll?.totalVotes ?? 0)
      setDeactivatePoll(false)
      setPollQuestion('')
      setPollOptions(['', ''])
      setIsLoading(false)
    }

    void loadPost()

    return () => {
      cancelled = true
    }
  }, [mode, postId])

  useEffect(() => {
    return () => {
      if (coverPreviewUrl && coverPreviewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(coverPreviewUrl)
      }
    }
  }, [coverPreviewUrl])

  function handleCoverFileChange(file: File | null) {
    if (coverPreviewUrl && coverPreviewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(coverPreviewUrl)
    }

    setCoverFile(file)

    if (file) {
      setCoverPreviewUrl(URL.createObjectURL(file))
      return
    }

    setCoverPreviewUrl(existingImageUrl)
  }

  function handleRemoveCover() {
    if (coverPreviewUrl && coverPreviewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(coverPreviewUrl)
    }

    setCoverFile(null)
    setCoverPreviewUrl(null)
    setExistingImageUrl(null)
  }

  async function handlePublish() {
    const trimmedTitle = title.trim()
    const trimmedBody = body.trim()

    if (!trimmedTitle || !trimmedBody || categoryId === '') {
      setStatusMessage('Başlık, kategori ve içerik zorunludur.')
      return
    }

    const filledOptions = pollOptions.map((option) => option.trim()).filter(Boolean)
    const trimmedQuestion = pollQuestion.trim()
    const hasPollIntent = trimmedQuestion.length > 0 || filledOptions.length > 0
    const includePoll =
      !hasExistingPoll && trimmedQuestion.length > 0 && filledOptions.length >= 2

    if (hasPollIntent && !includePoll) {
      setStatusMessage('Anket için soru ve en az 2 seçenek gerekli.')
      return
    }

    setIsSubmitting(true)
    setStatusMessage(null)

    const pollPayload = includePoll
      ? {
          question: trimmedQuestion,
          options: filledOptions,
        }
      : undefined

    try {
      if (mode === 'edit' && postId) {
        const result = await postService.update({
          id: postId,
          title: trimmedTitle,
          description: summary.trim() || undefined,
          content: trimmedBody,
          categoryId,
          imageFile: coverFile,
          isActive,
          poll: pollPayload,
          deactivatePoll: hasExistingPoll && deactivatePoll ? true : undefined,
        })

        if (!result.success) {
          return
        }

        navigate(`/gonderiler/${postId}`)
        return
      }

      const result = await postService.add({
        title: trimmedTitle,
        description: summary.trim() || undefined,
        content: trimmedBody,
        categoryId,
        imageFile: coverFile,
        poll: pollPayload,
      })

      if (!result.success || !result.data) {
        return
      }

      navigate(`/gonderiler/${result.data.id}`)
    } catch {
      // apiClient already surfaces errors via toast
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
        <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
          Gönderi yükleniyor...
        </p>
      </main>
    )
  }

  return (
    <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
      <PostEditorToolbar
        mode={mode}
        cancelTo={cancelTo}
        title={title}
        categoryId={categoryId}
        categories={categories}
        isSubmitting={isSubmitting}
        canPublish={canPublish}
        onTitleChange={setTitle}
        onCategoryChange={setCategoryId}
        onPublish={() => {
          void handlePublish()
        }}
      />

      {statusMessage ? (
        <div className="w-full bg-surface-container-low">
          <div className="mx-auto max-w-[1360px] px-4 py-space-sm sm:px-6 lg:px-12">
            <p className="font-label text-label-md font-bold text-secondary">{statusMessage}</p>
          </div>
        </div>
      ) : null}

      <div className="w-full py-space-xl">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 items-stretch gap-gutter lg:grid-cols-12">
            <div className="lg:col-span-8">
              <PostEditorForm
                summary={summary}
                body={body}
                coverPreviewUrl={coverPreviewUrl}
                coverFileName={coverFile?.name ?? null}
                onSummaryChange={setSummary}
                onBodyChange={setBody}
                onCoverFileChange={handleCoverFileChange}
                onRemoveCover={handleRemoveCover}
              />
            </div>

            <PostEditorSidebar
              mode={mode}
              cancelTo={cancelTo}
              pollQuestion={pollQuestion}
              pollOptions={pollOptions}
              hasExistingPoll={hasExistingPoll}
              existingPollQuestion={existingPollQuestion}
              existingPollTotalVotes={existingPollTotalVotes}
              deactivatePoll={deactivatePoll}
              canPublish={canPublish}
              isSubmitting={isSubmitting}
              onPollQuestionChange={setPollQuestion}
              onPollOptionChange={(index, value) => {
                setPollOptions((current) =>
                  current.map((option, optionIndex) =>
                    optionIndex === index ? value : option,
                  ),
                )
              }}
              onAddPollOption={() => {
                setPollOptions((current) => [...current, ''])
              }}
              onRemovePollOption={(index) => {
                setPollOptions((current) =>
                  current.filter((_, optionIndex) => optionIndex !== index),
                )
              }}
              onDeactivatePollChange={setDeactivatePoll}
              onPublish={() => {
                void handlePublish()
              }}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
