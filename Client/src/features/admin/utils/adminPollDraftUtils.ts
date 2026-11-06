import type {
  CreatePollRequest,
  PollAdminDetailDto,
  PollAdminListItemDto,
  PollScope,
  UpdatePollRequest,
} from '@/features/polls/pollTypes'
import type {
  AdminPollFormDraft,
  AdminPollListRow,
  AdminPollOptionDraft,
  AdminPollStatus,
} from './adminPollTypes'

const SCOPE_LABELS: Record<PollScope, string> = {
  global: 'Global',
  player: 'Oyuncu',
  post: 'Gönderi',
}

export function createEmptyPollOption(index: number): AdminPollOptionDraft {
  return {
    key: `opt-${index}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    label: '',
  }
}

export function createEmptyAdminPollFormDraft(): AdminPollFormDraft {
  return {
    id: null,
    question: '',
    scope: 'global',
    playerId: null,
    playerName: null,
    postId: null,
    postTitle: null,
    isActive: true,
    options: [createEmptyPollOption(1), createEmptyPollOption(2)],
    optionsLocked: false,
    totalVotes: 0,
  }
}

export function mapPollAdminItemToListRow(poll: PollAdminListItemDto): AdminPollListRow {
  const status: AdminPollStatus = poll.isActive ? 'active' : 'passive'
  let targetLabel = '—'

  if (poll.scope === 'player') {
    targetLabel = poll.playerName?.trim() || `Oyuncu #${poll.playerId}`
  } else if (poll.scope === 'post') {
    targetLabel = poll.postTitle?.trim() || 'Gönderi'
  } else {
    targetLabel = 'Günün Taraftar Anketi'
  }

  return {
    id: poll.id,
    question: poll.question,
    scope: poll.scope,
    scopeLabel: SCOPE_LABELS[poll.scope] ?? poll.scope,
    targetLabel,
    optionCount: poll.optionCount,
    totalVotes: poll.totalVotes,
    status,
    statusLabel: poll.isActive ? 'Aktif' : 'Pasif',
    isActive: poll.isActive,
  }
}

export function mapPollAdminDetailToFormDraft(poll: PollAdminDetailDto): AdminPollFormDraft {
  return {
    id: poll.id,
    question: poll.question,
    scope: poll.scope,
    playerId: poll.playerId ?? null,
    playerName: poll.playerName ?? null,
    postId: poll.postId ?? null,
    postTitle: poll.postTitle ?? null,
    isActive: poll.isActive,
    options:
      poll.options.length > 0
        ? poll.options.map((option, index) => ({
            key: `opt-${option.id}-${index}`,
            label: option.label,
          }))
        : [createEmptyPollOption(1), createEmptyPollOption(2)],
    optionsLocked: poll.optionsLocked,
    totalVotes: poll.totalVotes,
    createdDate: poll.createdDate,
    updatedDate: poll.updatedDate,
  }
}

export function mapDraftToCreateRequest(draft: AdminPollFormDraft): CreatePollRequest {
  return {
    question: draft.question.trim(),
    playerId: draft.scope === 'player' ? draft.playerId : null,
    postId: draft.scope === 'post' ? draft.postId : null,
    isActive: draft.isActive,
    options: draft.options.map((option, index) => ({
      label: option.label.trim(),
      sortOrder: index + 1,
    })),
  }
}

export function mapDraftToUpdateRequest(draft: AdminPollFormDraft): UpdatePollRequest {
  if (draft.id == null) {
    throw new Error('Poll id is required for update.')
  }

  const request: UpdatePollRequest = {
    id: draft.id,
    question: draft.question.trim(),
    isActive: draft.isActive,
  }

  if (!draft.optionsLocked) {
    request.options = draft.options.map((option, index) => ({
      label: option.label.trim(),
      sortOrder: index + 1,
    }))
  }

  return request
}

export function validateAdminPollDraft(
  draft: AdminPollFormDraft,
  mode: 'create' | 'edit',
): string | null {
  if (!draft.question.trim()) {
    return 'Anket sorusu zorunludur.'
  }

  if (mode === 'create' && draft.scope === 'post') {
    return 'Yönetim panelinden gönderi anketi oluşturulamaz.'
  }

  if (mode === 'create' && draft.scope === 'player' && (draft.playerId == null || draft.playerId < 1)) {
    return 'Oyuncu anketi için bir oyuncu seçin.'
  }

  if (!draft.optionsLocked) {
    if (draft.options.length < 2 || draft.options.length > 4) {
      return 'Anket 2 ile 4 arasında seçenek içermelidir.'
    }

    if (draft.options.some((option) => !option.label.trim())) {
      return 'Tüm seçenek metinlerini doldurun.'
    }
  }

  return null
}
