import { Link } from 'react-router-dom'
import type { BuilderFormationId } from '../utils/squadBuilderTypes'
import { formationConfigs } from '../utils/squadBuilderPlaceholders'

type SquadBuilderToolbarProps = {
  title: string
  formationId: BuilderFormationId
  avgAge: string
  totalValue: string
  canPublish: boolean
  isPublishing: boolean
  onTitleChange: (value: string) => void
  onFormationChange: (id: BuilderFormationId) => void
  onClear: () => void
  onPublish: () => void
}

export function SquadBuilderToolbar({
  title,
  formationId,
  avgAge,
  totalValue,
  canPublish,
  isPublishing,
  onTitleChange,
  onFormationChange,
  onClear,
  onPublish,
}: SquadBuilderToolbarProps) {
  return (
    <section className="w-full bg-surface py-space-md">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-space-md px-4 sm:px-6 lg:px-12">
        <div className="font-label flex flex-wrap items-center gap-space-xs text-label-md text-on-surface-variant">
          <Link to="/" className="transition-colors hover:text-primary">
            Ana Sayfa
          </Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <Link to="/kadrolar" className="transition-colors hover:text-primary">
            Kadrolar
          </Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="font-bold text-primary">Kadro Oluştur & Taktik Tahtası</span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-space-md lg:flex-nowrap">
          <div className="flex min-w-[280px] flex-1 items-center gap-space-sm bg-surface-container px-space-md py-space-xs">
            <span className="material-symbols-outlined text-primary">edit_square</span>
            <input
              className="font-headline w-full bg-transparent text-headline-sm font-bold tracking-tight text-on-surface placeholder-on-surface-variant/50 focus:outline-none lg:text-headline-md"
              placeholder="Kadro Başlığı Yazın... (Örn: Akyazı Şok Presi 4-2-3-1)"
              type="text"
              value={title}
              onChange={(event) => {
                onTitleChange(event.target.value)
              }}
            />
          </div>
          <div className="flex flex-wrap items-center gap-space-sm">
            <button
              type="button"
              onClick={onClear}
              className="font-label flex items-center gap-1 px-space-md py-space-xs text-label-md tracking-wider text-on-surface-variant uppercase transition-colors hover:text-error"
            >
              <span className="material-symbols-outlined text-[18px]">restart_alt</span>
              Temizle
            </button>
            <button
              type="button"
              onClick={onPublish}
              disabled={!canPublish || isPublishing}
              className={
                canPublish && !isPublishing
                  ? 'font-headline flex items-center gap-2 bg-primary-container px-space-lg py-space-xs text-label-md tracking-wider text-on-primary uppercase shadow-sm transition-all hover:bg-primary'
                  : 'font-headline flex cursor-not-allowed items-center gap-2 bg-surface-container-highest px-space-lg py-space-xs text-label-md tracking-wider text-on-surface-variant uppercase opacity-70'
              }
            >
              <span className="material-symbols-outlined text-[18px] text-tertiary-fixed-dim">
                military_tech
              </span>
              {isPublishing ? 'YAYINLANIYOR…' : 'KAYDET & YAYINLA'}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-space-sm">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="font-kicker pr-2 text-kicker font-bold text-on-surface-variant uppercase">
              DİZİLİŞ:
            </span>
            {formationConfigs.map((formation) => {
              const isActive = formation.id === formationId

              return (
                <button
                  key={formation.id}
                  type="button"
                  onClick={() => {
                    onFormationChange(formation.id)
                  }}
                  className={
                    isActive
                      ? 'font-label bg-primary px-3 py-1 text-label-md text-on-primary uppercase shadow-sm transition-all'
                      : 'font-label bg-surface-container px-3 py-1 text-label-md text-on-surface uppercase transition-all hover:bg-primary hover:text-on-primary'
                  }
                >
                  {formation.label}
                </button>
              )
            })}
          </div>

          <div className="flex flex-wrap items-center gap-space-sm">
            <div className="font-label flex items-center gap-1.5 bg-surface-container px-3 py-1 text-[12px] text-on-surface">
              <span className="material-symbols-outlined text-[16px] text-secondary">analytics</span>
              <span className="font-bold">Ortalama Yaş:</span>
              <span>{avgAge}</span>
            </div>
            <div className="font-label flex items-center gap-1.5 bg-surface-container px-3 py-1 text-[12px] text-on-surface">
              <span className="material-symbols-outlined text-[16px] text-tertiary-container">
                payments
              </span>
              <span className="font-bold">Piyasa Değeri:</span>
              <span>{totalValue}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
