import { useAppSelector } from '@/core/store/hooks'

const RULES = [
  'Her soru için 10 saniye süren var.',
  'Süre dolarsa cevap yanlış sayılır.',
  'Seçenek sırası her soruda karışır.',
  'Cevaptan sonra açıklamayı oku, sonra ilerlersin.',
  'Skor sunucuda hesaplanır; istediğin kadar tekrar çözebilirsin.',
] as const

export function TakeQuizSidebar() {
  const username = useAppSelector((state) => state.auth.user?.username)
  const initials = (username ?? '?').trim().slice(0, 2).toUpperCase() || '?'

  return (
    <aside className="flex flex-col gap-space-md">
      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex items-center justify-between">
          <h3 className="font-kicker text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
            Yarışmacı
          </h3>
          <span className="font-kicker flex items-center gap-1 text-kicker text-secondary uppercase">
            <span className="h-2 w-2 rounded-full bg-secondary-container" />
            Aktif
          </span>
        </div>

        <div className="flex items-center gap-space-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary font-headline text-sm font-bold text-on-primary">
            {initials}
          </div>
          <div className="flex flex-col">
            <span className="font-label text-label-md font-bold text-on-surface">
              {username ?? 'Üye'}
            </span>
            <span className="font-body text-body-sm text-on-surface-variant">
              Quiz oturumu devam ediyor
            </span>
          </div>
        </div>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-low p-space-md">
        <div className="mb-space-sm flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-on-surface-variant">info</span>
          <h3 className="font-kicker text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
            Quiz Kuralları
          </h3>
        </div>
        <ul className="flex flex-col gap-space-xs">
          {RULES.map((rule) => (
            <li key={rule} className="font-body flex gap-space-xs text-body-sm text-on-surface-variant">
              <span className="text-primary">•</span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  )
}
