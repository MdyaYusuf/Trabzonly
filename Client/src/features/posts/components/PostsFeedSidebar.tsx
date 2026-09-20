import { forumPrinciples, weeklyAuthors } from '../utils/postsFeedPlaceholders'

const avatarToneClass = {
  primary: 'bg-primary text-on-primary',
  'primary-container': 'bg-primary-container text-on-primary',
  secondary: 'bg-secondary text-on-secondary',
} as const

export function PostsFeedSidebar() {
  return (
    <aside className="flex flex-col gap-space-lg lg:col-span-4">
      <div className="relative border-t-4 border-primary bg-surface-container-lowest p-space-md shadow-sm">
        <div className="mb-space-sm flex items-center justify-between gap-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-error" />
            <span className="font-kicker text-kicker font-bold tracking-wider text-error uppercase">
              Canlı Tartışma
            </span>
          </div>
          <span className="font-kicker text-kicker font-bold text-on-surface-variant uppercase">
            342 Oy Kullanıldı
          </span>
        </div>

        <h3 className="font-headline mb-space-xs text-headline-sm leading-tight font-bold text-primary uppercase">
          Cham mı yoksa Lundstram mı 11 başlamalı?
        </h3>
        <p className="font-body mb-space-md text-body-sm text-on-surface-variant">
          Teknik heyet deplasmanda orta saha direncini mi yoksa hücum yaratıcılığını mı tercih
          etmeli?
        </p>

        <div className="mb-space-md flex flex-col gap-space-xs">
          <div className="cursor-pointer bg-surface-container p-space-xs transition-colors hover:bg-surface-container-high">
            <div className="mb-1 flex items-center justify-between font-label text-label-md font-bold text-on-surface">
              <span>Muhammed Cham (Yaratıcı 10 Numara)</span>
              <span className="font-bold text-primary">68%</span>
            </div>
            <div className="h-2 w-full overflow-hidden bg-surface-container-highest">
              <div className="h-full bg-primary" style={{ width: '68%' }} />
            </div>
          </div>
          <div className="cursor-pointer bg-surface-container p-space-xs transition-colors hover:bg-surface-container-high">
            <div className="mb-1 flex items-center justify-between font-label text-label-md font-bold text-on-surface">
              <span>John Lundstram (Dirençli 6/8 Numara)</span>
              <span className="font-bold text-secondary">32%</span>
            </div>
            <div className="h-2 w-full overflow-hidden bg-surface-container-highest">
              <div className="h-full bg-secondary" style={{ width: '32%' }} />
            </div>
          </div>
        </div>

        <div className="mb-space-md border-l-2 border-secondary bg-surface p-space-sm">
          <span className="font-kicker mb-1 block text-kicker font-bold text-secondary uppercase">
            Öne Çıkan Yorum
          </span>
          <p className="font-body text-body-sm text-on-surface italic">
            &quot;Deplasmanda ilk 30 dakikayı hasarsız geçmek istiyorsak Lundstram ile başlamak
            zorundayız, Cham sonradan oyunu çözer.&quot;
          </p>
          <span className="font-kicker mt-1 block text-kicker text-on-surface-variant uppercase">
            — @HasanKalyoncu
          </span>
        </div>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-space-xs bg-primary-container py-space-xs font-label text-label-md font-bold text-on-primary uppercase shadow-sm transition-colors hover:bg-primary"
        >
          <span>Tartışmaya Katıl</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>

      <div className="relative bg-surface-container-lowest p-space-md shadow-sm">
        <div className="mb-space-sm flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-lg text-secondary">shield</span>
          <span className="font-headline text-label-md font-bold tracking-wider text-primary uppercase">
            Tribün ve Forum İlkeleri
          </span>
        </div>
        <p className="font-body mb-space-md text-body-sm text-on-surface-variant">
          Trabzonly, seviyeli futbol tartışmalarının ve Karadeniz spor ahlakının dijital kalesidir.
        </p>
        <ul className="flex flex-col gap-space-sm">
          {forumPrinciples.map((principle, index) => (
            <li key={principle.title} className="flex items-start gap-space-xs">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-primary-container font-headline text-kicker font-bold text-on-primary">
                {index + 1}
              </span>
              <div className="flex flex-col">
                <span className="font-label text-label-md font-bold text-on-surface">
                  {principle.title}
                </span>
                <span className="font-body text-body-sm text-on-surface-variant">
                  {principle.body}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-surface-container-lowest p-space-md shadow-sm">
        <div className="mb-space-sm flex items-center justify-between gap-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-lg text-tertiary-fixed-dim">
              hotel_class
            </span>
            <span className="font-headline text-label-md font-bold tracking-wider text-primary uppercase">
              Haftanın Yazarları
            </span>
          </div>
          <span className="font-kicker text-kicker font-bold text-on-surface-variant uppercase">
            Lider Tablosu
          </span>
        </div>

        <div className="flex flex-col gap-space-sm">
          {weeklyAuthors.map((author) => (
            <div
              key={author.username}
              className="flex items-center justify-between gap-space-sm bg-surface-container p-space-xs transition-colors hover:bg-surface-container-high"
            >
              <div className="flex items-center gap-space-sm">
                <span
                  className={[
                    'font-headline text-label-md font-bold',
                    author.rank === 1 ? 'text-tertiary-fixed-dim' : 'text-on-surface-variant',
                  ].join(' ')}
                >
                  #{author.rank}
                </span>
                <div
                  className={[
                    'flex h-8 w-8 items-center justify-center font-headline text-kicker font-bold',
                    avatarToneClass[author.avatarTone],
                  ].join(' ')}
                >
                  {author.initials}
                </div>
                <div className="flex flex-col">
                  <span className="font-label text-label-md font-bold text-on-surface">
                    {author.username}
                  </span>
                  <span className="font-kicker text-kicker text-on-surface-variant uppercase">
                    {author.readsLabel}
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="px-space-xs py-1 font-kicker text-kicker font-bold text-secondary uppercase hover:text-on-secondary-container"
              >
                Takip Et
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden bg-primary p-space-md text-on-primary shadow-sm">
        <div className="mb-space-xs flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-lg text-tertiary-fixed-dim">
            mark_email_unread
          </span>
          <span className="font-kicker text-kicker font-bold tracking-wider text-tertiary-fixed-dim uppercase">
            Trabzonly Bülten
          </span>
        </div>
        <h4 className="font-headline mb-space-xs text-headline-sm font-bold uppercase">
          61. Dakika Özeti E-Postana Gelsin.
        </h4>
        <p className="font-body mb-space-md text-body-sm text-on-primary/80">
          Haftalık taktik dosyaları, kulüp perde arkası kulisleri ve seçilmiş en iyi taraftar
          yorumları her Cuma sabahı kutunda.
        </p>
        <form
          className="flex flex-col gap-space-xs"
          onSubmit={(event) => {
            event.preventDefault()
          }}
        >
          <input
            type="email"
            placeholder="E-posta adresinizi yazın..."
            className="font-body bg-surface-container-lowest px-space-sm py-space-xs text-body-sm text-on-surface outline-none placeholder:text-on-surface-variant"
          />
          <button
            type="submit"
            className="bg-secondary py-space-xs font-label text-label-md font-bold text-on-secondary uppercase transition-colors hover:bg-surface-container-lowest hover:text-on-surface"
          >
            Abone Ol (Ücretsiz)
          </button>
        </form>
        <span className="font-kicker mt-space-xs block text-center text-kicker tracking-widest text-on-primary/60 uppercase">
          Spam yok • Dilediğin zaman ayrıl
        </span>
      </div>

      <div className="flex items-center justify-between bg-surface-container p-space-sm shadow-sm">
        <div className="flex items-center gap-space-xs">
          <span className="inline-block h-3 w-3 bg-secondary" />
          <div className="flex flex-col">
            <span className="font-kicker text-kicker font-bold text-on-surface uppercase">
              Sonraki Maç:
            </span>
            <span className="font-label text-label-md font-bold text-primary">
              Trabzonspor — Başakşehir
            </span>
          </div>
        </div>
        <span className="font-kicker text-kicker font-bold text-secondary uppercase">
          Pazar 19:00
        </span>
      </div>
    </aside>
  )
}
