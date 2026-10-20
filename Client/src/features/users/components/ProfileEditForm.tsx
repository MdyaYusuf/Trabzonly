import { useEffect, useState, type FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '@/core/store/hooks'
import { setCredentials } from '@/features/auth/authSlice'
import userService from '../userService'
import {
  DEFAULT_USER_DISPLAY_TAG,
  USER_DISPLAY_TAGS,
} from '../utils/userDisplayTags'

type ProfileEditFormProps = {
  onSaved: () => void
}

function initialsFromUsername(username: string): string {
  const cleaned = username.trim()

  if (cleaned.length === 0) {
    return '?'
  }

  return cleaned.slice(0, 2).toUpperCase()
}

export function ProfileEditForm({ onSaved }: ProfileEditFormProps) {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector((state) => state.auth.user)
  const [username, setUsername] = useState(authUser?.username ?? '')
  const [bio, setBio] = useState(authUser?.bio ?? '')
  const [displayTag, setDisplayTag] = useState(
    authUser?.displayTag ?? DEFAULT_USER_DISPLAY_TAG,
  )
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadProfile() {
      setIsLoading(true)

      const result = await userService.getMe()

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setUsername(result.data.username)
        setBio(result.data.bio ?? '')
        setDisplayTag(result.data.displayTag ?? DEFAULT_USER_DISPLAY_TAG)
        dispatch(setCredentials(result.data))
      }

      setIsLoading(false)
    }

    void loadProfile()

    return () => {
      cancelled = true
    }
  }, [dispatch])

  function handleReset() {
    setBio(authUser?.bio ?? '')
    setDisplayTag(authUser?.displayTag ?? DEFAULT_USER_DISPLAY_TAG)
    setImageFile(null)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSaving) {
      return
    }

    setIsSaving(true)

    const result = await userService.updateProfile({
      bio: bio.trim().length > 0 ? bio.trim() : null,
      displayTag: displayTag.trim() || DEFAULT_USER_DISPLAY_TAG,
      imageFile,
    })

    if (!result.success) {
      setIsSaving(false)
      return
    }

    const me = await userService.getMe()

    if (me.success && me.data) {
      dispatch(setCredentials(me.data))
      setUsername(me.data.username)
      setBio(me.data.bio ?? '')
      setDisplayTag(me.data.displayTag ?? DEFAULT_USER_DISPLAY_TAG)
    }

    setImageFile(null)
    setIsSaving(false)
    onSaved()
  }

  const initials = initialsFromUsername(username || authUser?.username || '')
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(
    authUser?.profileImageUrl ?? null,
  )

  useEffect(() => {
    if (!imageFile) {
      setPreviewImageUrl(authUser?.profileImageUrl ?? null)
      return
    }

    const objectUrl = URL.createObjectURL(imageFile)
    setPreviewImageUrl(objectUrl)

    return () => {
      URL.revokeObjectURL(objectUrl)
    }
  }, [imageFile, authUser?.profileImageUrl])

  if (isLoading) {
    return (
      <section className="flex flex-col border border-outline-variant/30 bg-surface-container-lowest p-space-lg shadow-[0_4px_24px_rgba(31,27,23,0.06)]">
        <p className="font-body text-body-md text-on-surface-variant">Profil yükleniyor...</p>
      </section>
    )
  }

  return (
    <section className="flex flex-col border border-outline-variant/30 bg-surface-container-lowest shadow-[0_4px_24px_rgba(31,27,23,0.06)]">
      <div className="border-b border-outline-variant/25 px-space-lg pt-space-lg pb-space-md">
        <h2 className="font-headline text-headline-sm font-extrabold tracking-tight text-primary">
          Profili Düzenle
        </h2>
        <p className="font-body mt-1 text-body-sm text-on-surface-variant">
          Toplulukta görünen kimlik detaylarını yönetin.
        </p>
      </div>

      <form
        className="flex flex-col gap-space-lg p-space-lg"
        onSubmit={(event) => void handleSubmit(event)}
      >
        <div className="flex flex-col items-center gap-space-md rounded-sm border border-dashed border-outline-variant/50 bg-surface-container/40 px-space-md py-space-lg">
          <div className="relative">
            <div className="font-headline flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-primary-container text-headline-md font-extrabold text-on-primary ring-4 ring-surface-container-lowest">
              {previewImageUrl ? (
                <img src={previewImageUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                initials
              )}
            </div>
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="font-label text-label-md font-bold text-on-surface">
              Profil fotoğrafı
            </span>
            <span className="font-body text-body-sm text-on-surface-variant">
              PNG veya JPG · en fazla 5MB
            </span>
            {imageFile ? (
              <span className="font-body mt-1 text-body-sm text-secondary">{imageFile.name}</span>
            ) : null}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-space-xs">
            <label className="inline-flex cursor-pointer items-center gap-1.5 bg-primary px-space-md py-space-xs font-label text-label-md tracking-wider text-on-primary uppercase transition-colors hover:bg-primary-container">
              <span className="material-symbols-outlined text-[18px]">upload</span>
              Yükle
              <input
                accept="image/*"
                className="hidden"
                type="file"
                onChange={(event) => {
                  const file = event.target.files?.[0] ?? null
                  setImageFile(file)
                }}
              />
            </label>
            <button
              type="button"
              onClick={() => {
                setImageFile(null)
              }}
              className="cursor-pointer px-space-md py-space-xs font-label text-label-md tracking-wider text-on-surface-variant uppercase transition-colors hover:text-error"
            >
              Kaldır
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="font-label text-label-md font-bold text-on-surface">
              Kullanıcı adı
            </label>
            <input
              type="text"
              readOnly
              value={username}
              className="font-body w-full cursor-default border border-outline-variant/30 bg-surface-container-low px-space-md py-space-xs text-body-md text-on-surface-variant outline-none"
            />
            <span className="font-body text-body-sm text-on-surface-variant">
              Kayıt sonrası değiştirilemez.
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label text-label-md font-bold text-on-surface">
              Görünen etiket
            </label>
            <select
              value={displayTag}
              onChange={(event) => {
                setDisplayTag(event.target.value)
              }}
              className="font-body w-full cursor-pointer border border-outline-variant/30 bg-background px-space-md py-space-xs text-body-md text-on-surface outline-none transition-colors focus:border-primary"
            >
              {USER_DISPLAY_TAGS.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
            <span className="font-body text-body-sm text-on-surface-variant">
              Kullanıcı adınızın yanında görünür.
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="font-label text-label-md font-bold text-on-surface">Biyografi</label>
            <span className="font-kicker text-kicker text-on-surface-variant">
              {bio.length} / 400
            </span>
          </div>
          <textarea
            rows={4}
            maxLength={400}
            value={bio}
            onChange={(event) => {
              setBio(event.target.value)
            }}
            className="font-body w-full resize-y border border-outline-variant/30 bg-background p-space-md text-body-md leading-relaxed text-on-surface outline-none transition-colors focus:border-primary"
          />
          <span className="font-body text-body-sm text-on-surface-variant">
            Profil kartınızda görünen kısa özet.
          </span>
        </div>

        <div className="flex items-center justify-end gap-space-sm border-t border-outline-variant/25 pt-space-md">
          <button
            type="button"
            onClick={handleReset}
            className="cursor-pointer px-space-md py-space-xs font-label text-label-md tracking-wider text-on-surface-variant uppercase transition-colors hover:text-on-surface"
          >
            Vazgeç
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="cursor-pointer bg-primary px-space-lg py-space-xs font-label text-label-md tracking-wider text-on-primary uppercase transition-colors hover:bg-primary-container disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </form>
    </section>
  )
}
