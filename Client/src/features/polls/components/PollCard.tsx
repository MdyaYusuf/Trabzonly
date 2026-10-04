import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { PollResponseDto } from '../pollTypes'

type PollCardProps = {
  poll: PollResponseDto
  title: string
  isAuthenticated: boolean
  isVoting: boolean
  onVote: (optionId: number) => void
  className?: string
  footerTrailing?: ReactNode
}

export function PollCard({
  poll,
  title,
  isAuthenticated,
  isVoting,
  onVote,
  className = 'flex flex-col gap-space-md bg-surface-container-lowest p-space-md shadow-sm',
  footerTrailing,
}: PollCardProps) {
  const hasVoted = poll.currentUserOptionId != null

  return (
    <div className={className}>
      <div className="mb-space-sm flex items-center justify-between gap-space-xs">
        <span className="font-kicker text-kicker font-bold tracking-widest text-secondary uppercase">
          {title}
        </span>
        <span className="font-kicker flex items-center gap-1 text-[10px] font-bold text-primary uppercase">
          <span className="h-2 w-2 animate-ping rounded-full bg-secondary-container" />
          Aktif
        </span>
      </div>

      <h3 className="font-headline mb-space-sm text-headline-sm leading-tight font-bold text-primary">
        {poll.question}
      </h3>

      {!isAuthenticated ? (
        <p className="font-body mb-space-sm text-body-sm text-on-surface-variant">
          Sonuçları görebilirsin. Oy vermek için{' '}
          <Link to="/login" className="font-bold text-primary hover:text-secondary">
            giriş yap
          </Link>
          .
        </p>
      ) : null}

      <div className="mb-space-sm flex flex-col gap-space-sm">
        {poll.options.map((option) => {
          const isSelected = poll.currentUserOptionId === option.id
          const showResults = poll.totalVotes > 0 || hasVoted

          return (
            <button
              key={option.id}
              type="button"
              disabled={!isAuthenticated || isVoting}
              onClick={() => {
                onVote(option.id)
              }}
              className="flex cursor-pointer flex-col gap-1 bg-surface-container p-space-sm transition-colors hover:bg-surface-container-high disabled:cursor-default disabled:hover:bg-surface-container"
            >
              <div className="font-label mb-1 flex items-center justify-between gap-space-sm text-label-md font-bold text-on-surface">
                <span className="flex items-center gap-2 text-left">
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] ${
                      isSelected
                        ? 'bg-secondary-container text-on-secondary-container'
                        : 'bg-outline-variant text-on-primary'
                    }`}
                  >
                    {isSelected ? '✓' : ''}
                  </span>
                  {option.label}
                </span>
                {showResults ? (
                  <span
                    className={`shrink-0 font-bold ${
                      isSelected ? 'text-secondary' : 'text-on-surface-variant'
                    }`}
                  >
                    %{Math.round(option.percentage)}
                  </span>
                ) : null}
              </div>
              {showResults ? (
                <div className="h-2 w-full overflow-hidden bg-surface-container-highest">
                  <div
                    className={`h-full ${
                      isSelected ? 'bg-secondary-container' : 'bg-secondary-container/55'
                    }`}
                    style={{ width: `${Math.min(100, option.percentage)}%` }}
                  />
                </div>
              ) : null}
            </button>
          )
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-space-sm gap-y-0.5">
        <span className="font-kicker text-kicker font-bold text-on-surface-variant uppercase">
          Toplam Oy: {poll.totalVotes.toLocaleString('tr-TR')}
        </span>
        <div className="flex flex-wrap items-center gap-x-space-sm gap-y-0.5">
          {hasVoted ? (
            <span className="font-kicker text-[10px] font-bold tracking-wide text-secondary">
              Oyunuz alındı.
            </span>
          ) : null}
          {footerTrailing}
        </div>
      </div>
    </div>
  )
}
