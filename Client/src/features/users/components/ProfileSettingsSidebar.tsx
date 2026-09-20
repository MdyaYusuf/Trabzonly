import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  defaultNotificationPrefs,
  myTacticalSquads,
  recentAuthorPosts,
} from '../utils/profileSettingsPlaceholders'

export function ProfileSettingsSidebar() {
  const [prefs, setPrefs] = useState(defaultNotificationPrefs)

  return (
    <aside className="flex flex-col gap-space-xl lg:col-span-5">
      <section className="flex flex-col gap-space-md bg-surface-container-lowest p-space-md shadow-sm">
        <div className="flex items-center justify-between bg-surface-container-low p-space-sm pb-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[20px] text-primary">edit_note</span>
            <h3 className="font-headline text-headline-sm font-bold text-primary uppercase">
              Yazarın Son Gönderileri
            </h3>
          </div>
          <span className="bg-primary/10 px-2 py-0.5 font-kicker text-kicker font-bold text-primary uppercase">
            24 Yazı
          </span>
        </div>

        <div className="flex flex-col gap-space-sm">
          {recentAuthorPosts.map((post) => {
            const isDraft = post.status === 'draft'

            return (
              <article
                key={post.id}
                className={[
                  'flex flex-col gap-space-xs p-space-sm transition-colors',
                  isDraft
                    ? 'bg-surface-container'
                    : 'bg-surface-container-low hover:bg-surface-container',
                ].join(' ')}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={[
                      'font-kicker text-kicker font-bold uppercase',
                      isDraft ? 'text-on-surface-variant' : 'text-secondary',
                    ].join(' ')}
                  >
                    {post.category}
                  </span>
                  <span
                    className={[
                      'px-2 font-kicker text-kicker font-bold uppercase',
                      isDraft
                        ? 'bg-surface-container-highest text-on-surface-variant'
                        : 'bg-secondary-container text-on-secondary-container',
                    ].join(' ')}
                  >
                    {isDraft ? 'Taslak' : 'Yayında'}
                  </span>
                </div>
                <h4
                  className={[
                    'font-headline text-headline-sm leading-tight font-bold',
                    isDraft
                      ? 'text-on-surface-variant'
                      : 'cursor-pointer text-on-surface transition-colors hover:text-primary',
                  ].join(' ')}
                >
                  {isDraft ? (
                    post.title
                  ) : (
                    <Link to={`/gonderiler/${post.id}`}>{post.title}</Link>
                  )}
                </h4>
                <div className="font-body flex items-center justify-between pt-1 text-body-sm text-on-surface-variant">
                  {isDraft ? (
                    <>
                      <span>{post.meta}</span>
                      <Link
                        to={`/gonderiler/${post.id}/duzenle`}
                        className="font-label text-label-md font-bold text-primary hover:underline"
                      >
                        Yazmaya Devam Et
                      </Link>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-space-sm">
                        <span>{post.meta}</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[14px]">favorite</span>
                          {post.likes}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[14px]">chat</span>
                          {post.comments}
                        </span>
                      </div>
                      <div className="font-label flex items-center gap-space-xs text-label-md">
                        <Link
                          to={`/gonderiler/${post.id}/duzenle`}
                          className="font-bold text-secondary hover:underline"
                        >
                          Düzenle
                        </Link>
                        <span>/</span>
                        <Link
                          to={`/gonderiler/${post.id}`}
                          className="font-bold text-primary hover:underline"
                        >
                          Görüntüle
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </article>
            )
          })}
        </div>

        <Link
          to="/gonderiler"
          className="w-full bg-surface-container py-space-xs text-center font-label text-label-md font-bold tracking-wider text-primary uppercase transition-colors hover:bg-surface-container-high"
        >
          Tüm Gönderilerimi Yönet (24) →
        </Link>
      </section>

      <section className="flex flex-col gap-space-md bg-surface-container-lowest p-space-md shadow-sm">
        <div className="flex items-center justify-between bg-surface-container-low p-space-sm pb-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[20px] text-primary">sports</span>
            <h3 className="font-headline text-headline-sm font-bold text-primary uppercase">
              Dijital Taktik Kadrolarım
            </h3>
          </div>
          <span className="bg-secondary/15 px-2 py-0.5 font-kicker text-kicker font-bold text-secondary uppercase">
            14 Şablon
          </span>
        </div>

        {myTacticalSquads.map((squad) => {
          if (squad.featured) {
            return (
              <div
                key={squad.id}
                className="flex flex-col gap-space-sm bg-primary p-space-md text-on-primary shadow-md"
              >
                <div className="flex items-center justify-between gap-space-sm">
                  <span className="font-headline text-headline-sm font-extrabold text-secondary-container uppercase">
                    {squad.title}
                  </span>
                  <span className="shrink-0 bg-primary-container px-2 py-0.5 font-kicker text-kicker font-bold text-on-primary-container uppercase">
                    {squad.badge}
                  </span>
                </div>
                <p className="font-body text-body-sm leading-snug text-on-primary/80">
                  <strong className="text-secondary-container">11 Oyuncu:</strong> {squad.body}
                </p>
                <div className="font-body flex items-center justify-between bg-primary-container/40 p-space-xs pt-space-xs text-body-sm text-on-primary/80">
                  <div className="flex items-center gap-space-sm">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">visibility</span>
                      {squad.views.toLocaleString('tr-TR')}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">thumb_up</span>
                      {squad.likes}
                    </span>
                  </div>
                  <div className="font-label flex items-center gap-space-xs text-label-md">
                    <Link
                      to="/kadrolar"
                      className="bg-secondary-container px-2 py-1 text-[11px] font-bold tracking-wider text-on-secondary-container uppercase transition-colors hover:bg-surface-container-lowest"
                    >
                      Tahtada Aç
                    </Link>
                    <button
                      type="button"
                      className="bg-primary-container px-2 py-1 text-[11px] font-bold tracking-wider text-on-primary uppercase transition-colors hover:bg-surface-container-highest hover:text-on-surface"
                    >
                      Yazıya Bağla
                    </button>
                  </div>
                </div>
              </div>
            )
          }

          return (
            <div
              key={squad.id}
              className="flex flex-col gap-space-sm bg-surface-container-low p-space-md shadow-sm"
            >
              <div className="flex items-center justify-between gap-space-sm">
                <span className="font-headline text-headline-sm font-bold text-on-surface uppercase">
                  {squad.title}
                </span>
                <span className="shrink-0 bg-surface-container px-2 py-0.5 font-kicker text-kicker font-bold text-on-surface-variant uppercase">
                  {squad.badge}
                </span>
              </div>
              <p className="font-body text-body-sm text-on-surface-variant">{squad.body}</p>
              <div className="font-body flex items-center justify-between pt-space-xs text-body-sm text-on-surface-variant">
                <div className="flex items-center gap-space-sm">
                  <span>{squad.views} Görüntülenme</span>
                  <span>•</span>
                  <span>{squad.likes} Beğeni</span>
                </div>
                <Link
                  to="/kadrolar"
                  className="font-label text-label-md font-bold text-secondary uppercase hover:underline"
                >
                  Tahtada İncele
                </Link>
              </div>
            </div>
          )
        })}

        <Link
          to="/kadrolarim"
          className="w-full bg-surface-container py-space-xs text-center font-label text-label-md font-bold tracking-wider text-primary uppercase transition-colors hover:bg-surface-container-high"
        >
          Tüm Kadrolarımı Yönet →
        </Link>

        <Link
          to="/kadrolar/olustur"
          className="font-label flex w-full items-center justify-center gap-space-xs bg-secondary py-space-sm text-label-md font-bold tracking-wider text-on-secondary uppercase shadow-sm transition-all hover:bg-secondary-container hover:text-on-secondary-container"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Yeni Taktik Kadro Kur
        </Link>
      </section>

      <section className="flex flex-col gap-space-md bg-surface-container-lowest p-space-md shadow-sm">
        <div className="flex items-center gap-space-xs bg-surface-container-low p-space-sm pb-space-xs">
          <span className="material-symbols-outlined text-[20px] text-primary">
            notifications_active
          </span>
          <h3 className="font-headline text-headline-sm font-bold text-primary uppercase">
            Bildirim & Tribün Tercihleri
          </h3>
        </div>

        <div className="flex flex-col gap-space-sm">
          <label className="flex cursor-pointer items-start justify-between gap-space-sm p-space-xs transition-colors hover:bg-surface-container-low">
            <div className="flex flex-col">
              <span className="font-label text-label-md font-bold text-on-surface">
                Yorum Bildirimleri
              </span>
              <span className="font-body text-body-sm text-on-surface-variant">
                Yayımladığım analizlere yeni yorum geldiğinde anlık e-posta ve push bildir.
              </span>
            </div>
            <input
              type="checkbox"
              checked={prefs.commentNotifications}
              onChange={(event) => {
                setPrefs((current) => ({
                  ...current,
                  commentNotifications: event.target.checked,
                }))
              }}
              className="mt-1 h-4 w-4 accent-primary"
            />
          </label>

          <label className="flex cursor-pointer items-start justify-between gap-space-sm p-space-xs transition-colors hover:bg-surface-container-low">
            <div className="flex flex-col">
              <span className="font-label text-label-md font-bold text-on-surface">
                Maç Önü 11 Anketi
              </span>
              <span className="font-body text-body-sm text-on-surface-variant">
                Haftalık maçtan 24 saat önce taraftar ilk 11 oylaması başladığında hatırlat.
              </span>
            </div>
            <input
              type="checkbox"
              checked={prefs.preMatchPoll}
              onChange={(event) => {
                setPrefs((current) => ({
                  ...current,
                  preMatchPoll: event.target.checked,
                }))
              }}
              className="mt-1 h-4 w-4 accent-primary"
            />
          </label>

          <label className="flex cursor-pointer items-start justify-between gap-space-sm p-space-xs transition-colors hover:bg-surface-container-low">
            <div className="flex flex-col">
              <span className="font-label text-label-md font-bold text-on-surface">
                Haftalık 61. Dakika Bülteni
              </span>
              <span className="font-body text-body-sm text-on-surface-variant">
                Karadeniz Fırtınası&apos;nın haftalık taktik ve scout bülteni e-postama gelsin.
              </span>
            </div>
            <input
              type="checkbox"
              checked={prefs.weeklyNewsletter}
              onChange={(event) => {
                setPrefs((current) => ({
                  ...current,
                  weeklyNewsletter: event.target.checked,
                }))
              }}
              className="mt-1 h-4 w-4 accent-primary"
            />
          </label>
        </div>
      </section>
    </aside>
  )
}
