import { useState, type FormEvent } from 'react'
import contactMessageService from '@/features/contactMessages/contactMessageService'

const MESSAGE_MAX_LENGTH = 400

type ProfileContactAdminFormProps = {
  onSent: () => void
}

export function ProfileContactAdminForm({ onSent }: ProfileContactAdminFormProps) {
  const [message, setMessage] = useState('')
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [isSending, setIsSending] = useState(false)

  const remaining = MESSAGE_MAX_LENGTH - message.length

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmed = message.trim()

    if (!trimmed) {
      setStatusMessage('Mesaj boş olamaz.')
      return
    }

    if (trimmed.length > MESSAGE_MAX_LENGTH) {
      setStatusMessage(`Mesaj en fazla ${MESSAGE_MAX_LENGTH} karakter olabilir.`)
      return
    }

    setIsSending(true)
    setStatusMessage(null)

    try {
      const result = await contactMessageService.create({ message: trimmed })

      if (result.success) {
        setMessage('')
        onSent()
      }
    } catch {
      // apiClient already surfaces the error toast (cooldown / daily cap / validation).
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section className="flex flex-col border border-outline-variant/30 bg-surface-container-lowest shadow-[0_4px_24px_rgba(31,27,23,0.06)]">
      <div className="border-b border-outline-variant/25 px-space-lg pt-space-lg pb-space-md">
        <h2 className="font-headline text-headline-sm font-extrabold tracking-tight text-primary">
          Admine Ulaş
        </h2>
        <p className="font-body mt-1 text-body-sm text-on-surface-variant">
          Sitede yaşadığınız sorunlar veya önerileriniz için site yöneticilerine mesaj
          gönderebilirsiniz.
        </p>
      </div>

      <form
        className="flex flex-col gap-space-md p-space-lg"
        onSubmit={(event) => {
          void handleSubmit(event)
        }}
      >
        <div className="flex flex-col gap-1.5">
          <label className="font-label text-label-md font-bold text-on-surface" htmlFor="admin-contact-message">
            Mesajınız
          </label>
          <textarea
            id="admin-contact-message"
            value={message}
            maxLength={MESSAGE_MAX_LENGTH}
            rows={5}
            onChange={(event) => {
              setMessage(event.target.value)
              if (statusMessage) {
                setStatusMessage(null)
              }
            }}
            placeholder="Kısaca yazın…"
            className="font-body w-full resize-y border border-outline-variant/30 bg-background px-space-md py-space-xs text-body-md text-on-surface outline-none transition-colors focus:border-primary"
          />
          <div className="flex items-center justify-between gap-space-sm">
            <span className="font-body text-body-sm text-on-surface-variant">
              En fazla {MESSAGE_MAX_LENGTH} karakter. Günde 3 mesaj, aralarında 1 saat.
            </span>
            <span
              className={`font-label text-label-md tabular-nums ${
                remaining <= 40 ? 'text-primary' : 'text-on-surface-variant'
              }`}
            >
              {remaining}
            </span>
          </div>
        </div>

        {statusMessage ? (
          <p className="font-label text-label-md font-bold text-error">{statusMessage}</p>
        ) : null}

        <div className="flex items-center justify-end border-t border-outline-variant/25 pt-space-md">
          <button
            type="submit"
            disabled={isSending}
            className="cursor-pointer bg-primary px-space-lg py-space-xs font-label text-label-md tracking-wider text-on-primary uppercase transition-colors hover:bg-primary-container disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSending ? 'Gönderiliyor...' : 'Admine Ulaş'}
          </button>
        </div>
      </form>
    </section>
  )
}
