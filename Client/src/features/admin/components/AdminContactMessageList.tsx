import type { ContactMessageAdminListItemDto } from '@/features/contactMessages/contactMessageTypes'

type AdminContactMessageListProps = {
  messages: ContactMessageAdminListItemDto[]
  resolvingId: number | null
  deletingId: number | null
  onMarkRead: (message: ContactMessageAdminListItemDto) => void
  onSetResolved: (message: ContactMessageAdminListItemDto, isResolved: boolean) => void
  onDelete: (message: ContactMessageAdminListItemDto) => void
}

function formatDateTime(value: string): string {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return '—'
  }

  return date.toLocaleString('tr-TR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function AdminContactMessageList({
  messages,
  resolvingId,
  deletingId,
  onMarkRead,
  onSetResolved,
  onDelete,
}: AdminContactMessageListProps) {
  if (messages.length === 0) {
    return (
      <section className="border border-outline-variant/40 bg-surface-container-lowest px-space-md py-space-xl text-center">
        <p className="font-body text-body-md text-on-surface-variant">
          Henüz mesaj yok veya eşleşme bulunamadı.
        </p>
      </section>
    )
  }

  return (
    <section className="flex flex-col border border-outline-variant/40 bg-surface-container-lowest">
      {messages.map((message) => {
        const isDeleting = deletingId === message.id
        const isResolving = resolvingId === message.id

        return (
          <article
            key={message.id}
            className={`border-b border-outline-variant/30 last:border-b-0 ${
              message.isRead ? 'bg-surface-container-lowest' : 'bg-secondary-container/20'
            }`}
          >
            <div className="flex flex-col gap-space-sm px-space-md py-space-md">
              <div className="flex flex-col gap-space-sm sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 flex-1 flex-wrap items-center gap-space-sm">
                  {!message.isRead ? (
                    <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden />
                  ) : null}
                  <span className="font-label text-label-md font-bold text-on-surface">
                    @{message.username}
                  </span>
                  <span className="font-body bg-secondary-container/60 px-space-sm py-0.5 text-body-sm text-on-secondary-container">
                    {message.email}
                  </span>
                  <span className="font-body text-body-sm text-on-surface-variant">
                    {formatDateTime(message.createdDate)}
                  </span>
                  {message.isRead ? (
                    <span className="font-label inline-flex items-center gap-1 bg-surface-container-high px-space-sm py-0.5 text-label-md text-on-surface-variant uppercase">
                      <span className="material-symbols-outlined text-[18px] text-emerald-600" aria-hidden>
                        check_circle
                      </span>
                      Okundu
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        onMarkRead(message)
                      }}
                      className="font-label cursor-pointer bg-primary px-space-sm py-0.5 text-label-md text-on-primary uppercase transition-opacity hover:opacity-90"
                    >
                      Yeni
                    </button>
                  )}
                  {message.isResolved ? (
                    <span className="font-label inline-flex items-center gap-1 bg-emerald-600/10 px-space-sm py-0.5 text-label-md text-emerald-700 uppercase">
                      <span className="material-symbols-outlined text-[18px]" aria-hidden>
                        verified
                      </span>
                      Çözüldü
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-wrap items-center gap-space-xs self-start">
                  <button
                    type="button"
                    disabled={isResolving}
                    onClick={() => {
                      onSetResolved(message, !message.isResolved)
                    }}
                    className={`font-label inline-flex cursor-pointer items-center gap-1 px-space-sm py-1 text-label-md tracking-wider uppercase transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 ${
                      message.isResolved
                        ? 'text-on-surface-variant'
                        : 'text-emerald-700'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {message.isResolved ? 'undo' : 'task_alt'}
                    </span>
                    {isResolving
                      ? 'İşleniyor...'
                      : message.isResolved
                        ? 'Çözülmedi Olarak İşaretle'
                        : 'Çözüldü Olarak İşaretle'}
                  </button>
                  <button
                    type="button"
                    disabled={isDeleting}
                    onClick={() => {
                      onDelete(message)
                    }}
                    className="font-label inline-flex cursor-pointer items-center gap-1 px-space-sm py-1 text-label-md tracking-wider text-error uppercase transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                    {isDeleting ? 'Siliniyor...' : 'Sil'}
                  </button>
                </div>
              </div>

              <p
                onClick={() => {
                  if (!message.isRead) {
                    onMarkRead(message)
                  }
                }}
                className={`font-body whitespace-pre-wrap bg-on-surface/[0.03] px-space-md py-space-md text-body-md leading-relaxed text-on-surface ${
                  message.isRead ? '' : 'cursor-pointer'
                }`}
              >
                {message.message}
              </p>
            </div>
          </article>
        )
      })}
    </section>
  )
}
