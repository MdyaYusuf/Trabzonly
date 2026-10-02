import { Link } from 'react-router-dom'
import { forumPrinciples } from '../utils/postsFeedTypes'

export function PostDetailSidebar() {
  return (
    <aside className="flex flex-col gap-space-lg lg:col-span-4">
      <div className="bg-surface-container-lowest p-space-md shadow-sm">
        <div className="mb-space-sm flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-lg text-secondary">shield</span>
          <span className="font-headline text-label-md font-bold tracking-wider text-primary uppercase">
            Tribün ve Forum İlkeleri
          </span>
        </div>
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

      <Link
        to="/gonderiler"
        className="bg-primary-container px-space-md py-space-sm text-center font-label text-label-md font-bold text-on-primary uppercase shadow-sm transition-colors hover:bg-primary"
      >
        Tüm Gönderilere Dön
      </Link>
    </aside>
  )
}
