import type { ReactNode } from 'react'
import type { PollScope } from '@/features/polls/pollTypes'
import type { AdminPollFormDraft, AdminPollOptionDraft } from '../utils/adminPollTypes'
import { createEmptyPollOption } from '../utils/adminPollDraftUtils'

type PlayerOption = { id: number; name: string }

type AdminPollFormFieldsProps = {
  draft: AdminPollFormDraft
  mode: 'create' | 'edit'
  players: PlayerOption[]
  onChange: <K extends keyof AdminPollFormDraft>(
    key: K,
    value: AdminPollFormDraft[K],
  ) => void
  onOptionsChange: (options: AdminPollOptionDraft[]) => void
}

function FieldLabel({
  children,
  required,
  htmlFor,
}: {
  children: ReactNode
  required?: boolean
  htmlFor?: string
}) {
  return (
    <label htmlFor={htmlFor} className="font-label mb-1 block text-label-md text-on-surface-variant">
      {children}
      {required ? <span className="text-error"> *</span> : null}
    </label>
  )
}

const inputClass =
  'font-body w-full border border-outline-variant/50 bg-surface px-space-md py-space-sm text-body-md text-on-surface outline-none focus:border-primary'

const createScopeOptions: Array<{ id: Exclude<PollScope, 'post'>; label: string }> = [
  { id: 'global', label: 'Global' },
  { id: 'player', label: 'Oyuncu' },
]

export function AdminPollFormFields({
  draft,
  mode,
  players,
  onChange,
  onOptionsChange,
}: AdminPollFormFieldsProps) {
  const optionsLocked = draft.optionsLocked
  const canAddOption = !optionsLocked && draft.options.length < 4
  const canRemoveOption = !optionsLocked && draft.options.length > 2

  function handleScopeChange(scope: Exclude<PollScope, 'post'>) {
    if (mode !== 'create') {
      return
    }

    onChange('scope', scope)
    onChange('postId', null)
    onChange('postTitle', null)

    if (scope !== 'player') {
      onChange('playerId', null)
      onChange('playerName', null)
    }
  }

  return (
    <div className="flex flex-col gap-space-md">
      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex flex-wrap items-center justify-between gap-space-sm border-b border-outline-variant/40 pb-space-sm">
          <h2 className="font-headline text-headline-sm font-bold text-primary uppercase">
            Anket Bilgisi
          </h2>
          <span className="font-kicker text-kicker text-on-surface-variant uppercase">
            Bölüm 01
          </span>
        </div>

        <div className="flex flex-col gap-space-md">
          <div>
            <FieldLabel htmlFor="poll-question" required>
              Soru
            </FieldLabel>
            <textarea
              id="poll-question"
              rows={3}
              className={inputClass}
              value={draft.question}
              onChange={(event) => {
                onChange('question', event.target.value)
              }}
              maxLength={300}
            />
          </div>

          {mode === 'create' ? (
            <div>
              <FieldLabel required>Kapsam</FieldLabel>
              <div className="flex flex-wrap gap-1">
                {createScopeOptions.map((option) => {
                  const isActive = draft.scope === option.id

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        handleScopeChange(option.id)
                      }}
                      className={`font-label cursor-pointer px-space-md py-space-sm text-label-md uppercase transition-colors ${
                        isActive
                          ? 'bg-primary text-on-primary'
                          : 'bg-surface-container-high text-on-surface-variant hover:text-primary'
                      }`}
                    >
                      {option.label}
                    </button>
                  )
                })}
              </div>
              <p className="font-body mt-space-sm text-body-sm text-on-surface-variant">
                Kapsam oluşturma sonrası değiştirilemez.
              </p>
            </div>
          ) : null}

          {mode === 'create' && draft.scope === 'player' ? (
            <div>
              <FieldLabel htmlFor="poll-player" required>
                Oyuncu
              </FieldLabel>
              <select
                id="poll-player"
                className={inputClass}
                value={draft.playerId ?? ''}
                onChange={(event) => {
                  const value = Number(event.target.value)
                  const match = players.find((player) => player.id === value)
                  onChange('playerId', Number.isFinite(value) && value > 0 ? value : null)
                  onChange('playerName', match?.name ?? null)
                }}
              >
                <option value="">Oyuncu seçin</option>
                {players.map((player) => (
                  <option key={player.id} value={player.id}>
                    {player.name}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
        </div>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex flex-wrap items-center justify-between gap-space-sm border-b border-outline-variant/40 pb-space-sm">
          <h2 className="font-headline text-headline-sm font-bold text-primary uppercase">
            Durum
          </h2>
          <span className="font-kicker text-kicker text-on-surface-variant uppercase">
            Bölüm 02
          </span>
        </div>
        <div className="flex items-start justify-between gap-space-md border border-outline-variant/30 bg-surface-container-low px-space-md py-space-sm">
          <div>
            <p className="font-label text-label-md font-bold text-on-surface uppercase">
              {draft.isActive ? 'Aktif Anket' : 'Pasif Anket'}
            </p>
            <p className="font-body mt-1 text-body-sm text-on-surface-variant">
              {draft.isActive
                ? 'Anket aktif. Aynı kapsamda başka aktif anket varsa diğeri otomatik pasifleşir.'
                : 'Anket pasif. Taraftar arayüzünde görünmez.'}
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={draft.isActive}
            aria-label="Anket durumunu değiştir"
            onClick={() => {
              onChange('isActive', !draft.isActive)
            }}
            className={`relative h-7 w-12 shrink-0 cursor-pointer transition-colors ${
              draft.isActive ? 'bg-primary' : 'bg-outline-variant'
            }`}
          >
            <span
              className={`absolute top-0.5 h-6 w-6 bg-surface-container-lowest transition-transform ${
                draft.isActive ? 'left-5' : 'left-0.5'
              }`}
            />
          </button>
        </div>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex flex-wrap items-center justify-between gap-space-sm border-b border-outline-variant/40 pb-space-sm">
          <div className="flex flex-wrap items-center gap-space-sm">
            <h2 className="font-headline text-headline-sm font-bold text-primary uppercase">
              Seçenekler
            </h2>
            <span className="font-kicker bg-secondary-container px-space-sm py-1 text-kicker text-on-secondary-container uppercase">
              {draft.options.length} / 4
            </span>
          </div>
          {canAddOption ? (
            <button
              type="button"
              onClick={() => {
                onOptionsChange([...draft.options, createEmptyPollOption(draft.options.length + 1)])
              }}
              className="font-label inline-flex cursor-pointer items-center gap-1 text-label-md text-primary uppercase transition-colors hover:text-secondary"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              Seçenek Ekle
            </button>
          ) : null}
        </div>

        {optionsLocked ? (
          <p className="font-body mb-space-md text-body-sm text-on-surface-variant">
            Bu ankete oy verildiği için seçenekler kilitlidir. Sadece soru metni ve aktif durum
            güncellenebilir.
          </p>
        ) : (
          <p className="font-body mb-space-md text-body-sm text-on-surface-variant">
            En az 2, en fazla 4 seçenek ekleyebilirsiniz.
          </p>
        )}

        <div className="flex flex-col gap-space-sm">
          {draft.options.map((option, index) => (
            <div
              key={option.key}
              className="flex flex-wrap items-center gap-space-sm border border-outline-variant/40 bg-surface px-space-sm py-space-xs"
            >
              <span className="font-label w-6 text-label-md font-bold text-on-surface">
                {index + 1}
              </span>
              <input
                className="font-body min-w-0 flex-1 border-0 bg-transparent px-space-sm py-space-xs text-body-md outline-none disabled:opacity-60"
                value={option.label}
                disabled={optionsLocked}
                maxLength={200}
                onChange={(event) => {
                  const next = draft.options.map((item) =>
                    item.key === option.key
                      ? { ...item, label: event.target.value }
                      : item,
                  )
                  onOptionsChange(next)
                }}
                placeholder={`Seçenek ${index + 1}`}
              />
              {canRemoveOption ? (
                <button
                  type="button"
                  aria-label="Seçeneği sil"
                  onClick={() => {
                    onOptionsChange(draft.options.filter((item) => item.key !== option.key))
                  }}
                  className="flex h-8 w-8 items-center justify-center text-on-surface-variant hover:bg-error-container hover:text-error"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
