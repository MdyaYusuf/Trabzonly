import type { AdminQuizCreateDraft } from '../utils/adminQuizTypes'

type AdminQuizCreateSidebarProps = {
  draft: AdminQuizCreateDraft
}

const categoryLabels: Record<string, string> = {
  tarih: 'Kulüp Tarihi',
  sampiyonluklar: 'Şampiyonluklar',
  kadrolar: 'Efsane Kadrolar',
  guncel: 'Güncel Kadro',
}

export function AdminQuizCreateSidebar({ draft }: AdminQuizCreateSidebarProps) {
  const firstQuestion = draft.questions[0]
  const previewOptions = firstQuestion?.options.slice(0, 3) ?? []
  const activeCount = draft.questions.length
  const readyForTen = activeCount >= draft.plannedQuestionCount

  return (
    <aside className="flex flex-col gap-space-md">
      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex items-center justify-between gap-space-sm">
          <h2 className="font-kicker flex items-center gap-1 text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
            <span className="material-symbols-outlined text-[16px]">visibility</span>
            Canlı Önizleme
          </h2>
          <span className="font-kicker text-kicker text-secondary uppercase">
            Mobil / Web Arayüzü
          </span>
        </div>
        <p className="font-body mb-space-md text-body-sm text-on-surface-variant">
          Taraftarların sayfada göreceği dinamik soru kartı modülü:
        </p>

        <article className="overflow-hidden border border-outline-variant/40">
          <div className="bg-primary-container p-space-md text-on-primary">
            <span className="font-kicker bg-black/25 px-space-sm py-0.5 text-kicker uppercase">
              {categoryLabels[draft.category] ?? 'Quiz'}
            </span>
            <p className="font-kicker mt-space-sm text-kicker text-on-primary/80 uppercase">
              {draft.plannedQuestionCount} Soru • {draft.plannedMaxScore} Puan
            </p>
            <h3 className="font-headline mt-1 text-headline-sm font-extrabold uppercase">
              {draft.title || 'Yeni Quiz'}
            </h3>
            <div className="mt-space-md">
              <div className="mb-1 flex items-center justify-between">
                <span className="font-body text-body-sm text-on-primary/80">
                  İlerleme: Soru 1/{draft.plannedQuestionCount}
                </span>
                <span className="font-label text-label-md">%10</span>
              </div>
              <div className="h-1.5 bg-black/30">
                <div className="h-full w-[10%] bg-secondary-container" />
              </div>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-space-md">
            <p className="font-body text-body-md text-on-surface">
              {firstQuestion?.text ?? 'Soru metni eklendiğinde burada görünür.'}
            </p>
            <ul className="mt-space-md flex flex-col gap-space-sm">
              {previewOptions.map((option) => (
                <li
                  key={option.id}
                  className={`flex items-center gap-space-sm border px-space-md py-space-sm ${
                    option.isCorrect
                      ? 'border-secondary bg-secondary-fixed/40'
                      : 'border-outline-variant/40'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px] text-secondary">
                    {option.isCorrect ? 'radio_button_checked' : 'radio_button_unchecked'}
                  </span>
                  <span className="font-label text-label-md text-on-surface">{option.text}</span>
                </li>
              ))}
            </ul>
            <div className="mt-space-md flex flex-wrap items-center justify-between gap-space-sm border-t border-outline-variant/40 pt-space-sm">
              <span className="font-label inline-flex items-center gap-1 text-label-md text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">timer</span>
                Kalan Süre: 04:58
              </span>
              <span className="font-kicker text-kicker text-on-surface-variant uppercase">
                Değer: {firstQuestion?.points ?? 10} Puan
              </span>
            </div>
          </div>
        </article>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <h2 className="font-kicker mb-space-md flex items-center gap-1 text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
          <span className="material-symbols-outlined text-[16px]">military_tech</span>
          Puan & Ödül Kuralları
        </h2>
        <dl className="flex flex-col gap-space-sm">
          <div className="flex items-center justify-between gap-space-sm">
            <dt className="font-body text-body-sm text-on-surface-variant">Toplam Soru Sayısı:</dt>
            <dd className="font-label text-label-md font-bold text-on-surface">
              {draft.plannedQuestionCount} Adet
            </dd>
          </div>
          <div className="flex items-center justify-between gap-space-sm">
            <dt className="font-body text-body-sm text-on-surface-variant">Maksimum Skor:</dt>
            <dd className="font-label text-label-md font-bold text-on-surface">
              {draft.plannedMaxScore} Puan
            </dd>
          </div>
        </dl>
        <div className="mt-space-md border border-outline-variant/40 bg-surface-container-low p-space-md">
          <p className="font-kicker text-kicker text-on-surface-variant uppercase">
            Kazanılacak Taraftar Rozeti
          </p>
          <p className="font-label mt-space-xs inline-flex items-center gap-1 text-label-md font-bold text-primary">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            &quot;{draft.badgeName}&quot;
          </p>
          <p className="font-body mt-1 text-body-sm text-on-surface-variant">
            {draft.badgeRequirement}
          </p>
        </div>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <h2 className="font-kicker mb-space-md flex items-center gap-1 text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
          <span className="material-symbols-outlined text-[16px]">fact_check</span>
          Yayın Denetimi
        </h2>
        <ul className="flex flex-col gap-space-sm">
          {[
            {
              ok: true,
              text: 'Tüm sorular için en az bir doğru şık işaretlenmiş durumda.',
            },
            {
              ok: true,
              text: 'Her soruda en az 2 aktif seçenek yer alıyor.',
            },
            {
              ok: true,
              text: 'Quiz başlığı ve açıklaması Tribün standartlarına uygun.',
            },
            {
              ok: readyForTen,
              text: '10 soru tamamlandığında "Tamamlandı" onayı verilecek.',
            },
          ].map((item) => (
            <li key={item.text} className="flex items-start gap-space-sm">
              <span
                className={`material-symbols-outlined text-[18px] ${
                  item.ok ? 'text-secondary' : 'text-on-surface-variant'
                }`}
              >
                {item.ok ? 'check_circle' : 'pending'}
              </span>
              <span className="font-body text-body-sm text-on-surface-variant">{item.text}</span>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  )
}
