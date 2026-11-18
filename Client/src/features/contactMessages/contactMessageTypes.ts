export type CreateContactMessageRequest = {
  message: string
}

export type CreatedContactMessageResponseDto = {
  id: number
}

export type ContactMessageAdminListItemDto = {
  id: number
  message: string
  isRead: boolean
  isResolved: boolean
  createdDate: string
  userId: string
  username: string
  email: string
}

export type ContactMessageUnreadStatusDto = {
  hasUnread: boolean
}

export type ContactMessageAdminListQuery = {
  pageNumber?: number
  pageSize?: number
  search?: string
  isRead?: boolean
  isResolved?: boolean
  sort?: string
}

export type ContactMessageReadFilter = 'all' | 'unread' | 'read'

export type ContactMessageResolvedFilter = 'all' | 'open' | 'resolved'
