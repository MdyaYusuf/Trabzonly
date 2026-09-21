import type { PublicMemberActivity } from '../utils/publicMemberProfileTypes'

type PublicMemberProfileCommentsProps = {
  activities: PublicMemberActivity[]
  totalCount: number
}

export function PublicMemberProfileComments({
  activities,
  totalCount,
}: PublicMemberProfileCommentsProps) {
  const comments = activities.filter((item) => item.kind === 'comment')

  return (
    <section className="flex flex-col gap-space-md">
      <div className="flex items-center gap-space-xs border-b border-outline-variant/40 pb-space-sm">
        <span className="h-3 w-3 bg-primary" />
        <h2 className="font-headline text-headline-sm font-extrabold text-primary uppercase">
          Üyenin Son Yorumları ({totalCount})
        </h2>
      </div>

      {comments.length === 0 ? (
        <p className="font-body py-space-xl text-center text-body-md text-on-surface-variant">
          Henüz görüntülenecek yorum yok.
        </p>
      ) : (
        <ul className="flex flex-col gap-space-md">
          {comments.map((item) => (
            <li
              key={item.id}
              className="border border-outline-variant/40 bg-surface-container-lowest p-space-md"
            >
              <p className="font-body text-body-md text-on-surface">
                <span className="font-bold">{item.title}</span> {item.detail}
              </p>
              <span className="font-kicker mt-space-sm inline-block text-kicker text-on-surface-variant uppercase">
                {item.timeLabel}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
