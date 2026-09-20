import { Link } from 'react-router-dom'
import type { PostDetailProfile } from '../utils/postDetailTypes'

type PostDetailSidebarProps = {
  post: PostDetailProfile
}

export function PostDetailSidebar({ post }: PostDetailSidebarProps) {
  return (
    <aside className="flex flex-col gap-space-lg lg:col-span-4">
      <div className="flex flex-col gap-space-sm bg-surface-container-lowest p-space-md shadow-sm">
        <div className="flex items-baseline justify-between pb-space-xs">
          <span className="font-kicker text-kicker font-bold tracking-widest text-primary uppercase">
            Yazarın Diğer Analizleri
          </span>
          <Link
            to="/gonderiler"
            className="font-kicker text-kicker font-bold text-secondary uppercase hover:underline"
          >
            Tümü
          </Link>
        </div>
        <div className="flex flex-col gap-space-sm">
          {post.authorOtherPosts.map((item) => (
            <Link
              key={item.title}
              to="/gonderiler/1"
              className="group bg-surface-container-low p-space-xs transition-colors hover:bg-surface-container"
            >
              <span
                className={[
                  'font-kicker text-kicker font-bold uppercase',
                  item.kickerTone === 'primary' ? 'text-primary' : 'text-secondary',
                ].join(' ')}
              >
                {item.kicker}
              </span>
              <h4 className="font-headline mt-0.5 line-clamp-2 text-label-md font-bold text-primary transition-colors group-hover:text-secondary">
                {item.title}
              </h4>
              <div className="font-body mt-1 flex items-center justify-between text-body-sm text-on-surface-variant">
                <span>{item.date}</span>
                <span>{item.reads}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-space-sm bg-surface-container-lowest p-space-md shadow-sm">
        <div className="flex items-center justify-between">
          <span className="font-kicker text-kicker font-bold tracking-widest text-primary uppercase">
            Günün Taktik Tartışması
          </span>
          <span className="h-2 w-2 animate-pulse rounded-full bg-secondary" />
        </div>
        <p className="font-headline text-label-md font-bold text-on-surface">{post.poll.question}</p>
        <div className="mt-space-xs space-y-space-xs">
          {post.poll.options.map((option) => (
            <button
              key={option.label}
              type="button"
              className="group relative w-full overflow-hidden bg-surface-container-low p-space-xs text-left transition-colors hover:bg-surface-container"
            >
              <div
                className={[
                  'absolute inset-y-0 left-0 transition-all duration-500',
                  option.tone === 'primary' ? 'bg-primary-fixed/40' : 'bg-secondary-fixed/40',
                ].join(' ')}
                style={{ width: `${option.percent}%` }}
              />
              <div
                className={[
                  'font-body relative flex items-center justify-between text-body-sm font-bold',
                  option.tone === 'primary' ? 'text-primary' : 'text-secondary',
                ].join(' ')}
              >
                <span>{option.label}</span>
                <span>{option.votes}</span>
              </div>
            </button>
          ))}
        </div>
        <span className="font-body text-right text-body-sm text-on-surface-variant">
          {post.poll.totalLabel}
        </span>
      </div>

      <div className="flex flex-col gap-space-sm bg-primary p-space-md text-on-primary shadow-sm">
        <div className="flex items-center justify-between">
          <span className="font-kicker text-kicker font-bold tracking-widest text-secondary-fixed uppercase">
            Dijital Taktik Tahtası
          </span>
          <span className="material-symbols-outlined text-secondary-container">draw</span>
        </div>
        <p className="font-body text-body-sm text-on-primary/90">
          Kendi derbi ilk 11&apos;ini ve hücum setini tahtada kur, analizini toplulukla paylaş.
        </p>
        <Link
          to="/kadrolar"
          className="w-full bg-secondary-container py-space-xs text-center font-headline text-label-md font-bold tracking-wider text-on-secondary-container uppercase transition-all hover:bg-surface-container-lowest hover:text-on-surface"
        >
          11&apos;ini Şimdi Kur
        </Link>
      </div>

      <div className="flex flex-col gap-space-xs bg-surface-container-low p-space-md shadow-sm">
        <div className="flex items-center gap-space-xs font-bold text-primary">
          <span className="material-symbols-outlined text-[20px]">shield</span>
          <span className="font-kicker text-kicker tracking-widest uppercase">
            Tribün Kültürü & Etik
          </span>
        </div>
        <p className="font-body text-body-sm leading-relaxed text-on-surface-variant">
          Trabzonly dijital tribününde seviyesiz küfür, şahsi hakaret ve kulüp değerlerini zedeleyici
          ifadeler yasaktır. Fırtınanın gücü bilgide, analizde ve Karadeniz spor ahlakında saklıdır.
        </p>
      </div>

      <div className="flex flex-col gap-space-sm bg-surface-container-lowest p-space-md shadow-sm">
        <span className="font-kicker pb-space-xs text-kicker font-bold tracking-widest text-primary uppercase">
          İlgili Gönderiler
        </span>
        {post.relatedPosts.map((item) => (
          <Link key={item.title} to="/gonderiler/1" className="group flex gap-space-sm">
            <img
              src={item.imageUrl}
              alt=""
              className="h-16 w-20 shrink-0 object-cover"
            />
            <div className="flex flex-col justify-between">
              <h5 className="font-headline line-clamp-2 text-label-md font-bold text-on-surface transition-colors group-hover:text-primary">
                {item.title}
              </h5>
              <span className="font-body text-body-sm text-on-surface-variant">{item.meta}</span>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  )
}
