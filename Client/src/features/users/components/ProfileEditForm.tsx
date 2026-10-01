import { useEffect, useState, type FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '@/core/store/hooks'
import { setCredentials } from '@/features/auth/authSlice'
import userService from '../userService'
import {
  defaultProfileSettings,
  tribuneOptions,
} from '../utils/profileSettingsPlaceholders'
import { USER_DISPLAY_TAGS } from '../utils/userDisplayTags'

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
  const [displayTag, setDisplayTag] = useState(authUser?.displayTag ?? '')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [tribune, setTribune] = useState(defaultProfileSettings.tribune)
  const [city, setCity] = useState(defaultProfileSettings.city)
  const [xHandle, setXHandle] = useState(defaultProfileSettings.xHandle)
  const [newsletterUrl, setNewsletterUrl] = useState(defaultProfileSettings.newsletterUrl)

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
        setDisplayTag(result.data.displayTag ?? '')
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
    setUsername(authUser?.username ?? '')
    setBio(authUser?.bio ?? '')
    setDisplayTag(authUser?.displayTag ?? '')
    setImageFile(null)
    setTribune(defaultProfileSettings.tribune)
    setCity(defaultProfileSettings.city)
    setXHandle(defaultProfileSettings.xHandle)
    setNewsletterUrl(defaultProfileSettings.newsletterUrl)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSaving || username.trim().length === 0) {
      return
    }

    setIsSaving(true)

    const result = await userService.updateProfile({
      username: username.trim(),
      bio: bio.trim().length > 0 ? bio.trim() : null,
      displayTag: displayTag.trim().length > 0 ? displayTag.trim() : null,
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
      setDisplayTag(me.data.displayTag ?? '')
    }

    setImageFile(null)
    setIsSaving(false)
    onSaved()
  }

  const initials = initialsFromUsername(username || authUser?.username || '')

  if (isLoading) {
    return (
      <section className="flex flex-col gap-space-lg bg-surface-container-lowest p-space-lg shadow-sm">
        <p className="font-body text-body-md text-on-surface-variant">Profil yükleniyor...</p>
      </section>
    )
  }

  return (
    <section className="flex flex-col gap-space-lg bg-surface-container-lowest p-space-lg shadow-sm">
      <div className="flex flex-col gap-space-xs bg-surface-container-low p-space-md pb-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="inline-block h-3 w-3 bg-primary" />
            <h2 className="font-headline text-headline-md font-extrabold tracking-tight text-primary uppercase">
              Profili Düzenle
            </h2>
          </div>
          <span className="font-kicker text-kicker font-bold tracking-widest text-secondary uppercase">
            Kimlik Modülü
          </span>
        </div>
        <p className="font-body text-body-md text-on-surface-variant">
          Toplulukta, maç tartışmalarında ve taktik analizlerinde görünen kimlik detaylarını yönetin.
        </p>
      </div>

      <div className="flex flex-col items-center justify-between gap-space-md bg-surface-container-low p-space-md sm:flex-row">
        <div className="flex items-center gap-space-md">
          <div className="font-headline flex h-16 w-16 items-center justify-center bg-primary-container text-headline-md font-extrabold text-secondary-container shadow-inner">
            {initials}
          </div>
          <div className="flex flex-col">
            <span className="font-headline text-headline-sm font-bold text-on-surface">
              Profil Görseli
            </span>
            <span className="font-body text-body-sm text-on-surface-variant">
              Kare PNG veya JPG, maks 2MB.
            </span>
          </div>
        </div>
        <div className="flex items-center gap-space-xs">
          <label className="cursor-pointer bg-primary px-space-md py-space-xs font-label text-label-md tracking-wider text-on-primary uppercase transition-colors hover:bg-primary-container">
            Yeni Fotoğraf Yükle
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
            className="bg-surface-container px-space-md py-space-xs font-label text-label-md tracking-wider text-error uppercase transition-colors hover:bg-surface-container-high"
          >
            Kaldır
          </button>
        </div>
      </div>

      {imageFile ? (
        <p className="font-body text-body-sm text-on-surface-variant">
          Seçilen dosya: {imageFile.name}
        </p>
      ) : null}

      <form className="flex flex-col gap-space-md" onSubmit={(event) => void handleSubmit(event)}>
        <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label className="font-label text-label-md font-bold text-on-surface uppercase">
                Kullanıcı Adı
              </label>
              <span className="font-kicker text-kicker text-on-surface-variant">
                {username.length}/50
              </span>
            </div>
            <input
              type="text"
              maxLength={50}
              value={username}
              onChange={(event) => {
                setUsername(event.target.value)
              }}
              className="font-body w-full bg-surface-container-lowest px-space-md py-space-xs text-body-md text-on-surface shadow-sm focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <span className="font-body text-body-sm text-on-surface-variant">
              Yorumlarınızda ve profilinizde bu isim görünür.
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-label text-label-md font-bold text-on-surface uppercase">
              Görünen Etiket
            </label>
            <select
              value={displayTag}
              onChange={(event) => {
                setDisplayTag(event.target.value)
              }}
              className="font-body w-full bg-surface-container-lowest px-space-md py-space-xs text-body-md text-on-surface shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="">Etiket seçilmedi</option>
              {USER_DISPLAY_TAGS.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
            <span className="font-body text-body-sm text-on-surface-variant">
              Tribün yorumlarında kullanıcı adınızın yanında görünür.
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <label className="font-label text-label-md font-bold text-on-surface uppercase">
              Biyografi (Hakkında)
            </label>
            <span className="font-kicker text-kicker text-on-surface-variant">
              {bio.length} / 1000
            </span>
          </div>
          <textarea
            rows={4}
            maxLength={1000}
            value={bio}
            onChange={(event) => {
              setBio(event.target.value)
            }}
            className="font-body w-full bg-surface-container-lowest p-space-md text-body-md leading-relaxed text-on-surface shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
          />
          <span className="font-body text-body-sm text-on-surface-variant">
            Profil kartınızda görünen kısa özet.
          </span>
        </div>

        <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label className="font-label text-label-md font-bold text-on-surface uppercase">
              Stadyum / Tribün Tercihi
            </label>
            <select
              value={tribune}
              onChange={(event) => {
                setTribune(event.target.value as (typeof tribuneOptions)[number])
              }}
              className="font-body w-full bg-surface-container-lowest px-space-md py-space-xs text-body-md text-on-surface shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
            >
              {tribuneOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className="font-body text-body-sm text-on-surface-variant">
              Yakında kaydedilecek (şimdilik yerel önizleme).
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-label text-label-md font-bold text-on-surface uppercase">
              Şehir / Lokasyon
            </label>
            <input
              type="text"
              value={city}
              onChange={(event) => {
                setCity(event.target.value)
              }}
              className="font-body w-full bg-surface-container-lowest px-space-md py-space-xs text-body-md text-on-surface shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-space-md pt-space-xs sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label className="font-label text-label-md font-bold text-on-surface uppercase">
              X (Twitter) Hesabı
            </label>
            <div className="flex items-center bg-surface-container-low shadow-sm">
              <span className="px-space-sm font-label text-label-md text-on-surface-variant">
                x.com/
              </span>
              <input
                type="text"
                value={xHandle}
                onChange={(event) => {
                  setXHandle(event.target.value)
                }}
                className="font-body w-full bg-transparent px-space-sm py-space-xs text-body-md text-on-surface focus:outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-label text-label-md font-bold text-on-surface uppercase">
              Futbol Bülteni / Substack
            </label>
            <input
              type="text"
              value={newsletterUrl}
              onChange={(event) => {
                setNewsletterUrl(event.target.value)
              }}
              className="font-body w-full bg-surface-container-lowest px-space-md py-space-xs text-body-md text-on-surface shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-space-sm bg-surface-container-low p-space-md pt-space-md">
          <button
            type="button"
            onClick={handleReset}
            className="bg-surface-container px-space-md py-space-xs font-label text-label-md tracking-wider text-on-surface uppercase transition-colors hover:bg-surface-container-high"
          >
            Vazgeç
          </button>
          <button
            type="submit"
            disabled={isSaving || username.trim().length === 0}
            className="bg-primary px-space-lg py-space-xs font-label text-label-md tracking-wider text-on-primary uppercase shadow-md transition-all hover:bg-primary-container disabled:opacity-50"
          >
            {isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
          </button>
        </div>
      </form>
    </section>
  )
}
