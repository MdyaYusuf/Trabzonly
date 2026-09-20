import { Link } from 'react-router-dom'
import type { FeedSortOption } from '../utils/postsFeedTypes'
import { sortOptions } from '../utils/postsFeedPlaceholders'

type PostsFeedHeroProps = {
  sort: FeedSortOption
  onSortChange: (value: FeedSortOption) => void
}

export function PostsFeedHero({ sort, onSortChange }: PostsFeedHeroProps) {
  return (
    <section className="w-full border-b border-surface-container-highest bg-surface">
      <div className="mx-auto max-w-[1360px] px-4 py-space-lg sm:px-6 lg:px-12">
        <div className="mb-space-sm flex flex-col gap-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="inline-block h-2 w-2 bg-secondary" />
            <span className="font-kicker text-kicker font-bold tracking-widest text-secondary uppercase">
              TRABZONLY TARAFTAR FORUMU & EDİTÖRYAL AKIŞ
            </span>
          </div>

          <div className="flex flex-col justify-between gap-space-md lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <h1 className="font-display text-headline-lg leading-tight font-bold tracking-tight text-primary uppercase lg:text-display-xl">
                TARAFTAR GÖNDERİLERİ & ANALİZLER
              </h1>
              <p className="font-body mt-space-xs text-body-md text-on-surface-variant">
                Bordo-Mavi fırtınanın tribün sesi, maç sonu taktik analizleri, tarih kokan anılar ve
                bağımsız taraftar tartışmaları tek bir akışta.
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-space-sm">
              <div className="flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-space-sm shadow-sm">
                <span className="material-symbols-outlined text-lg text-secondary">sort</span>
                <span className="font-label text-label-md font-bold text-on-surface uppercase">
                  Sıralama:
                </span>
                <select
                  className="cursor-pointer bg-transparent font-label text-label-md font-bold text-primary uppercase outline-none"
                  value={sort}
                  onChange={(event) => {
                    onSortChange(event.target.value as FeedSortOption)
                  }}
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <Link
                to="/gonderiler/yeni"
                className="flex items-center gap-space-xs bg-primary-container px-space-lg py-space-sm font-headline text-label-md font-bold text-on-primary uppercase shadow-sm transition-all duration-150 hover:bg-primary"
              >
                <span className="material-symbols-outlined text-lg">add</span>
                <span>+ Yeni Gönderi</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
