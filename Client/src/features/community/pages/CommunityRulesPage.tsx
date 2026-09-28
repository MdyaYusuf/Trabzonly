import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  communityRuleSections,
  communityRulesToc,
  type CommunityRuleSection,
} from '@/features/community/utils/communityRulesContent'

const HERO_BG = '/assets/background.jpeg'

function RuleArticle({ section }: { section: CommunityRuleSection }) {
  const listClassName = section.fullWidth
    ? 'grid grid-cols-1 gap-space-md text-on-surface md:grid-cols-3'
    : 'flex flex-col gap-space-md text-on-surface'

  return (
    <article
      id={section.id}
      className={`flex scroll-mt-28 flex-col justify-between bg-surface-container-lowest p-space-lg shadow-sm transition-all hover:shadow-md md:scroll-mt-32 md:p-space-xl ${
        section.fullWidth ? 'w-full border-t-2 border-primary-container' : ''
      }`}
    >
      <div>
        <header className="mb-space-md flex items-baseline justify-between">
          <h2 className="font-headline text-headline-md tracking-tight text-primary-container">
            {section.heading}
          </h2>
          <span className="font-stat text-stat-counter select-none text-secondary">
            {section.number}
          </span>
        </header>
        <div className="mb-space-md h-1 w-12 bg-secondary" />
        <ul className={listClassName}>
          {section.items.map((item) => (
            <li key={item.title} className="flex items-start gap-space-sm">
              <span className="material-symbols-outlined mt-0.5 shrink-0 text-lg text-secondary">
                check_circle
              </span>
              <div>
                <strong className="font-headline mb-0.5 block text-body-md font-semibold text-on-surface">
                  {item.title}
                </strong>
                <span className="font-body text-body-md leading-relaxed text-on-surface-variant">
                  {item.body}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export function CommunityRulesPage() {
  const [accepted, setAccepted] = useState(true)

  const gridSections = communityRuleSections.filter((section) => !section.fullWidth)
  const fullWidthSections = communityRuleSections.filter((section) => section.fullWidth)

  return (
    <main className="min-h-screen w-full bg-surface pt-16 sm:pt-20">
      <section className="relative w-full overflow-hidden bg-primary text-on-primary">
        <div
          className="pointer-events-none absolute inset-0 scale-105 bg-cover bg-center opacity-30 mix-blend-luminosity"
          style={{ backgroundImage: `url('${HERO_BG}')` }}
          role="img"
          aria-label="Akyazı stadyum atmosferi"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary via-primary-container/90 to-primary/80" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(117,183,229,0.18),transparent_65%)]" />

        <div className="relative z-10 mx-auto flex min-h-[520px] max-w-[1240px] flex-col justify-end px-4 pt-20 pb-16 sm:px-6 md:min-h-[580px] md:pt-28 md:pb-24 lg:px-12">
          <div className="mb-space-md flex items-center gap-space-sm">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-xs text-on-secondary">
              ★
            </span>
            <span className="font-kicker text-kicker tracking-[0.22em] text-secondary-fixed-dim uppercase">
              TRABZONLY BAĞIMSIZ TARAFTAR TOPLULUĞU
            </span>
          </div>

          <h1 className="font-display mb-space-md max-w-4xl text-display-xl-mobile tracking-tighter text-on-primary uppercase sm:text-display-xl">
            TOPLULUK KURALLARI
          </h1>

          <p className="font-body mb-space-xl max-w-2xl text-body-md leading-relaxed text-surface-container-high sm:text-body-lg">
            Bordo-mavi armanın onurunu, saygılı fikir teatisi ve bağımsız tribün kültürüyle geleceğe
            taşıyan ortak ilkelerimiz.
          </p>

          <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
            <Link
              to="/register"
              className="inline-flex items-center justify-center bg-on-primary px-8 py-3.5 font-headline text-label-md tracking-wider text-primary-container uppercase shadow-md transition-all duration-200 hover:bg-secondary-fixed hover:text-on-secondary-fixed active:scale-95"
            >
              Topluluğa Katıl
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center bg-transparent px-8 py-3.5 font-headline text-label-md tracking-wider text-on-primary uppercase shadow-sm transition-all duration-200 hover:bg-on-primary/10 active:scale-95"
            >
              Giriş Yap
            </Link>
          </div>

          <div className="mt-14 flex items-center justify-between pt-space-sm font-kicker text-kicker tracking-widest text-surface-variant/80 uppercase">
            <span className="flex items-center gap-space-xs text-secondary-fixed-dim">
              <span className="h-2 w-2 animate-pulse rounded-full bg-secondary-fixed-dim" />
              Resmi Olmayan Bağımsız Taraftar Platformu
            </span>
            <span className="hidden md:inline-block">7 Temel İlke • Yürürlük: 2025</span>
          </div>
        </div>
      </section>

      <section className="w-full bg-surface-container-low py-space-xl text-on-surface">
        <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-space-lg px-4 sm:px-6 lg:px-12">
          <div className="sticky top-16 z-10 flex flex-col items-start justify-between gap-space-sm border border-outline-variant/30 bg-surface-container-lowest/95 p-space-md shadow-sm backdrop-blur-md sm:top-20 md:flex-row md:items-center">
            <div className="flex items-center gap-space-sm">
              <span className="font-headline flex items-center gap-1 text-label-md font-bold tracking-wider text-primary-container uppercase">
                <span className="material-symbols-outlined text-[18px] text-secondary">
                  menu_book
                </span>
                İçindekiler
              </span>
              <span className="rounded-full bg-secondary-fixed/50 px-2 py-0.5 font-kicker text-xs font-bold text-secondary uppercase">
                01 — 07
              </span>
            </div>
            <nav className="flex w-full flex-wrap items-center gap-space-xs md:w-auto">
              {communityRulesToc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="group flex items-center gap-1 rounded-full bg-surface-container px-3 py-1.5 font-headline text-xs text-on-surface transition-colors hover:bg-secondary-fixed hover:text-on-secondary-fixed"
                >
                  <span className="font-bold text-secondary group-hover:text-on-secondary-fixed">
                    {item.label.slice(0, 2)}
                  </span>
                  {item.label.slice(3)}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex w-full flex-col justify-between gap-space-sm border-l-4 border-primary-container bg-surface-container p-space-md text-on-surface-variant shadow-sm md:flex-row md:items-center">
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined shrink-0 text-[22px] text-primary">
                info
              </span>
              <div>
                <span className="font-headline block text-label-md font-bold text-primary">
                  Önemli Hatırlatma
                </span>
                <p className="font-body text-body-sm leading-relaxed text-on-surface-variant">
                  Platforma gönderi yazan ya da yorum yapan her bordo-mavili bu kuralları peşinen
                  kabul etmiş sayılır.
                </p>
              </div>
            </div>
            <span className="hidden shrink-0 font-kicker text-kicker font-bold text-secondary uppercase md:inline-block">
              Trabzonly Etik İlkeleri
            </span>
          </div>

          <div className="grid w-full grid-cols-1 gap-space-lg md:grid-cols-2">
            {gridSections.map((section) => (
              <RuleArticle key={section.id} section={section} />
            ))}
          </div>

          {fullWidthSections.map((section) => (
            <RuleArticle key={section.id} section={section} />
          ))}
        </div>
      </section>

      <section className="w-full bg-surface-container py-space-xl">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col items-center justify-between gap-space-lg bg-surface-container-lowest p-space-xl shadow-md md:flex-row">
            <div className="flex max-w-2xl items-start gap-space-md">
              <label className="relative flex cursor-pointer items-center pt-1">
                <input
                  id="rules-checkbox"
                  type="checkbox"
                  checked={accepted}
                  onChange={(event) => setAccepted(event.target.checked)}
                  className="h-6 w-6 cursor-pointer appearance-none bg-surface-container-high transition-all checked:bg-primary-container checked:after:block after:hidden after:content-['✓'] after:text-center after:font-bold after:text-on-primary"
                />
              </label>
              <div className="flex flex-col">
                <label
                  className="font-headline cursor-pointer text-headline-sm text-primary-container select-none"
                  htmlFor="rules-checkbox"
                >
                  İlkeleri Kabul Ediyorum
                </label>
                <p className="font-body mt-1 text-body-md text-on-surface-variant">
                  Bu kuralları okudum ve Trabzonly bağımsız taraftar ailesinin bir parçası olarak
                  kabul ediyorum.
                </p>
              </div>
            </div>

            <div className="flex w-full shrink-0 flex-col items-center gap-space-md sm:flex-row md:w-auto">
              {accepted ? (
                <Link
                  to="/register"
                  className="w-full bg-primary-container px-8 py-4 text-center font-headline text-label-md tracking-wider text-on-primary uppercase shadow-sm transition-all duration-200 hover:bg-primary active:scale-95 sm:w-auto"
                >
                  Kabul Et ve Kayıt Ol
                </Link>
              ) : (
                <span
                  className="w-full cursor-not-allowed bg-primary-container px-8 py-4 text-center font-headline text-label-md tracking-wider text-on-primary uppercase opacity-40 shadow-sm sm:w-auto"
                  aria-disabled="true"
                >
                  Kabul Et ve Kayıt Ol
                </span>
              )}
              <Link
                to="/login"
                className="w-full px-6 py-4 text-center font-headline text-label-md tracking-wider text-secondary uppercase transition-colors hover:text-on-secondary-container sm:w-auto"
              >
                Zaten üye misin? Giriş Yap
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
