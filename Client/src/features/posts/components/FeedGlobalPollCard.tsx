import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../core/store/hooks'
import pollService from '../../polls/pollService'
import type { PollResponseDto } from '../../polls/pollTypes'

export function FeedGlobalPollCard() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const [poll, setPoll] = useState<PollResponseDto | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isVoting, setIsVoting] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadPoll() {
      setIsLoading(true)

      const result = await pollService.getActiveGlobal()

      if (cancelled) {
        return
      }

      if (result.success && result.data) {
        setPoll(result.data)
      } else {
        setPoll(null)
      }

      setIsLoading(false)
    }

    void loadPoll()

    return () => {
      cancelled = true
    }
  }, [])

  async function handleVote(optionId: number) {
    if (!poll || !isAuthenticated || isVoting) {
      return
    }

    setIsVoting(true)

    try {
      const result = await pollService.vote(poll.id, { optionId })

      if (result.success && result.data) {
        setPoll(result.data)
      }
    } catch {
      // apiClient already surfaces errors via toast
    } finally {
      setIsVoting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="relative border-t-4 border-primary bg-surface-container-lowest p-space-md shadow-sm">
        <p className="font-body text-body-sm text-on-surface-variant">Anket yükleniyor...</p>
      </div>
    )
  }

  if (!poll) {
    return null
  }

  return (
    <div className="relative border-t-4 border-primary bg-surface-container-lowest p-space-md shadow-sm">
      <div className="mb-space-sm flex items-center justify-between gap-space-xs">
        <span className="font-kicker text-kicker font-bold tracking-widest text-secondary uppercase">
          Günün Taraftar Anketi
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

      <div className="mb-space-sm flex flex-col gap-space-xs">
        {poll.options.map((option) => {
          const isSelected = poll.currentUserOptionId === option.id
          const showResults = poll.totalVotes > 0 || poll.currentUserOptionId != null

          return (
            <button
              key={option.id}
              type="button"
              disabled={!isAuthenticated || isVoting}
              onClick={() => {
                void handleVote(option.id)
              }}
              className={`flex cursor-pointer flex-col gap-1 bg-surface-container p-space-xs transition-colors hover:bg-surface-container-high disabled:cursor-default disabled:hover:bg-surface-container ${
                isSelected ? 'ring-1 ring-primary' : ''
              }`}
            >
              <div className="mb-1 flex items-center justify-between font-label text-label-md font-bold text-on-surface">
                <span className="flex items-center gap-2 text-left">
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] text-on-primary ${
                      isSelected ? 'bg-primary' : 'bg-outline-variant'
                    }`}
                  >
                    {isSelected ? '✓' : ''}
                  </span>
                  {option.label}
                </span>
                {showResults ? (
                  <span
                    className={`shrink-0 font-bold ${isSelected ? 'text-primary' : 'text-on-surface-variant'}`}
                  >
                    %{Math.round(option.percentage)}
                  </span>
                ) : null}
              </div>
              {showResults ? (
                <div className="h-2 w-full overflow-hidden bg-surface-container-highest">
                  <div
                    className={`h-full ${isSelected ? 'bg-primary' : 'bg-outline-variant'}`}
                    style={{ width: `${Math.min(100, option.percentage)}%` }}
                  />
                </div>
              ) : null}
            </button>
          )
        })}
      </div>

      <span className="font-kicker text-kicker font-bold text-on-surface-variant uppercase">
        Toplam Oy: {poll.totalVotes.toLocaleString('tr-TR')}
      </span>
    </div>
  )
}
