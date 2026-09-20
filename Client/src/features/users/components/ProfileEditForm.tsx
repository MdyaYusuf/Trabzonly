import { useState, type FormEvent } from 'react'
import {
  defaultProfileSettings,
  tribuneOptions,
} from '../utils/profileSettingsPlaceholders'

type ProfileEditFormProps = {
  onSaved: () => void
}

export function ProfileEditForm({ onSaved }: ProfileEditFormProps) {
  const [displayName, setDisplayName] = useState(defaultProfileSettings.displayName)
  const [handle, setHandle] = useState(defaultProfileSettings.handle)
  const [bio, setBio] = useState(defaultProfileSettings.bio)
  const [tribune, setTribune] = useState(defaultProfileSettings.tribune)
  const [city, setCity] = useState(defaultProfileSettings.city)
  const [xHandle, setXHandle] = useState(defaultProfileSettings.xHandle)
  const [newsletterUrl, setNewsletterUrl] = useState(defaultProfileSettings.newsletterUrl)

  function handleReset() {
    setDisplayName(defaultProfileSettings.displayName)
    setHandle(defaultProfileSettings.handle)
    setBio(defaultProfileSettings.bio)
    setTribune(defaultProfileSettings.tribune)
    setCity(defaultProfileSettings.city)
    setXHandle(defaultProfileSettings.xHandle)
    setNewsletterUrl(defaultProfileSettings.newsletterUrl)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSaved()
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
            {defaultProfileSettings.initials}
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
            <input accept="image/*" className="hidden" type="file" />
          </label>
          <button
            type="button"
            className="bg-surface-container px-space-md py-space-xs font-label text-label-md tracking-wider text-error uppercase transition-colors hover:bg-surface-container-high"
          >
            Kaldır
          </button>
        </div>
      </div>

      <form className="flex flex-col gap-space-md" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label className="font-label text-label-md font-bold text-on-surface uppercase">
                Kullanıcı Adı / Görünen İsim
              </label>
              <span className="font-kicker text-kicker text-on-surface-variant">
                {displayName.length}/30
              </span>
            </div>
            <input
              type="text"
              maxLength={30}
              value={displayName}
              onChange={(event) => {
                setDisplayName(event.target.value)
              }}
              className="font-body w-full bg-surface-container-lowest px-space-md py-space-xs text-body-md text-on-surface shadow-sm focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <span className="font-body text-body-sm text-on-surface-variant">
              Yorumlarınızda ve taktik tahtalarınızda bu isim görünür.
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-label text-label-md font-bold text-on-surface uppercase">
              Kullanıcı Kimliği (@handle)
            </label>
            <div className="flex items-center bg-surface-container-low shadow-sm">
              <span className="px-space-sm font-label text-label-md font-bold text-on-surface-variant">
                @
              </span>
              <input
                type="text"
                value={handle}
                onChange={(event) => {
                  setHandle(event.target.value)
                }}
                className="font-body w-full bg-transparent px-space-sm py-space-xs text-body-md text-on-surface focus:outline-none"
              />
            </div>
            <span className="font-body text-body-sm text-on-surface-variant">
              trabzonly.com/@{handle || '…'}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <label className="font-label text-label-md font-bold text-on-surface uppercase">
              Biyografi (Hakkında)
            </label>
            <span className="font-kicker text-kicker text-on-surface-variant">
              {bio.length} / 250
            </span>
          </div>
          <textarea
            rows={4}
            maxLength={250}
            value={bio}
            onChange={(event) => {
              setBio(event.target.value)
            }}
            className="font-body w-full bg-surface-container-lowest p-space-md text-body-md leading-relaxed text-on-surface shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
          />
          <span className="font-body text-body-sm text-on-surface-variant">
            Profil kartınızda ve yayımladığınız analiz makalelerinde öne çıkan özet.
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
            className="bg-primary px-space-lg py-space-xs font-label text-label-md tracking-wider text-on-primary uppercase shadow-md transition-all hover:bg-primary-container"
          >
            Değişiklikleri Kaydet
          </button>
        </div>
      </form>
    </section>
  )
}
