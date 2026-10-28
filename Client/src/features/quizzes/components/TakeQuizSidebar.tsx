import { useAppSelector } from '@/core/store/hooks'

const RULES = [
  'Her soru için 10 saniye süren var.',
  'Süre dolarsa cevap yanlış sayılır.',
  'Seçenek sırası her soruda karışır.',
  'Cevaptan sonra açıklamayı oku, sonra ilerlersin.',
  'Skor sunucuda hesaplanır; istediğin kadar tekrar çözebilirsin.',
] as const

function initialsFromUsername(username: string): string {
  const cleaned = username.trim()

  if (cleaned.length === 0) {
    return '?'
  }

  return cleaned.slice(0, 2).toUpperCase()
}

export function TakeQuizSidebar() {
  const username = useAppSelector((state) => state.auth.user?.username)
  const profileImageUrl = useAppSelector((state) => state.auth.user?.profileImageUrl)
  const displayName = username ? `@${username}` : 'Üye'
  const initials = username ? initialsFromUsername(username) : '?'

  return (
    <aside className="flex flex-col gap-space-md">
      <section className="flex flex-col gap-space-md border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="flex items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-lg text-secondary">sports_esports</span>
            <span className="font-headline text-label-md font-bold tracking-wider text-primary uppercase">
              Yarışmacı
            </span>
          </div>
          <span className="font-kicker inline-flex items-center gap-1 bg-secondary-container px-space-sm py-0.5 text-kicker font-bold text-on-secondary-container uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            Aktif
          </span>
        </div>

        <div className="flex items-center gap-space-md bg-surface-container px-space-md py-space-sm">
          <div
            aria-hidden="true"
            className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary font-headline text-label-md font-bold text-on-secondary"
          >
            {profileImageUrl ? (
              <img src={profileImageUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              initials
            )}
          </div>
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="font-label truncate text-label-md font-bold text-on-surface">
              {displayName}
            </span>
            <span className="font-body text-body-sm text-on-surface-variant">
              Quiz oturumu devam ediyor
            </span>
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-space-md bg-surface-container p-space-md">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-lg text-secondary">shield</span>
          <span className="font-headline text-label-md font-bold tracking-wider text-primary uppercase">
            Quiz Kuralları
          </span>
        </div>
        <p className="font-body text-body-sm text-on-surface-variant">
          Kısa süreli bilgi yarışması: her soruyu dikkatli oku, süre dolmadan cevapla.
        </p>
        <div className="flex flex-col gap-space-sm">
          {RULES.map((rule, index) => (
            <div
              key={rule}
              className="flex items-start gap-space-sm bg-surface-container-lowest p-space-sm"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-on-secondary">
                {index + 1}
              </span>
              <p className="font-body text-body-sm text-on-surface">{rule}</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
