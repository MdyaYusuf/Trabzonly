import { useEffect, useState } from 'react'
import { useAppSelector } from '../../../core/store/hooks'
import { PollCard } from '../../polls/components/PollCard'
import pollService from '../../polls/pollService'
import type { PollResponseDto } from '../../polls/pollTypes'

type PostPollCardProps = {
  postId: string
}

export function PostPollCard({ postId }: PostPollCardProps) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const [poll, setPoll] = useState<PollResponseDto | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isVoting, setIsVoting] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadPoll() {
      setIsLoading(true)

      const result = await pollService.getActiveByPost(postId)

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
  }, [postId])

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
      <div className="flex flex-col gap-space-md bg-surface-container-lowest p-space-md shadow-sm">
        <p className="font-body text-body-sm text-on-surface-variant">Anket yükleniyor...</p>
      </div>
    )
  }

  if (!poll) {
    return null
  }

  return (
    <PollCard
      poll={poll}
      title="Gönderi Anketi"
      isAuthenticated={isAuthenticated}
      isVoting={isVoting}
      onVote={(optionId) => {
        void handleVote(optionId)
      }}
      className="flex flex-col border-l-2 border-secondary bg-surface-container-lowest p-space-md shadow-sm"
    />
  )
}
