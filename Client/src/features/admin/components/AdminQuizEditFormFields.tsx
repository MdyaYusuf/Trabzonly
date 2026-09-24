import type { AdminQuizEditDraft } from '../utils/adminQuizTypes'

type AdminQuizEditFormFieldsProps = {
  draft: AdminQuizEditDraft
  onChange: <K extends keyof AdminQuizEditDraft>(
    key: K,
    value: AdminQuizEditDraft[K],
  ) => void
  onRemoveTag: (tagId: string) => void
}

const inputClass =
  'font-body w-full border border-outline-variant/50 bg-surface px-space-md py-space-sm text-body-md text-on-surface outline-none focus:border-primary'

export function AdminQuizEditFormFields({
  draft,
  onChange,
  onRemoveTag,
}: AdminQuizEditFormFieldsProps) {
  return (
    <div className="flex flex-col gap-space-md">
      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex flex-wrap items-center justify-between gap-space-sm border-b border-outline-variant/40 pb-space-sm">
          <h2 className="font-headline text-headline-sm font-bold text-primary uppercase">
            Temel Metaveri Bilgileri
          </h2>
          <span className="font-kicker text-kicker text-on-surface-variant uppercase">
            Zorunlu Alanlar
          </span>
        </div>

        <div className="flex flex-col gap-space-md">
          <div>
            <div className="mb-1 flex flex-wrap items-center justify-between gap-space-sm">
              <label
                htmlFor="editTitle"
                className="font-label text-label-md text-on-surface-variant"
              >
                Başlık <span className="text-error">*</span>
              </label>
              <span className="font-body text-body-sm text-on-surface-variant">
                Karakter Limiti: {draft.title.length}/80
              </span>
            </div>
            <div className="relative">
              <input
                id="editTitle"
                maxLength={80}
                className={`${inputClass} pr-10`}
                value={draft.title}
                onChange={(event) => {
                  onChange('title', event.target.value)
                }}
              />
              <span className="material-symbols-outlined absolute top-1/2 right-3 -translate-y-1/2 text-on-surface-variant">
                edit
              </span>
            </div>
          </div>

          <div>
            <div className="mb-1 flex flex-wrap items-center justify-between gap-space-sm">
              <label
                htmlFor="editDescription"
                className="font-label text-label-md text-on-surface-variant"
              >
                Açıklama
              </label>
              <span className="font-kicker text-kicker text-on-surface-variant uppercase">
                {draft.description.length} / 300 Karakter
              </span>
            </div>
            <textarea
              id="editDescription"
              rows={3}
              maxLength={300}
              className={inputClass}
              value={draft.description}
              onChange={(event) => {
                onChange('description', event.target.value)
              }}
            />
            <p className="font-body mt-space-xs text-body-sm text-on-surface-variant">
              Bu metin taraftar portalı listeleme kartlarında ve sosyal medya paylaşımlarında özet
              olarak görüntülenir.
            </p>
          </div>

          <div>
            <p className="font-label mb-space-sm text-label-md text-on-surface-variant">
              Kategori & Etiketler
            </p>
            <div className="flex flex-wrap gap-space-sm">
              {draft.tags.map((tag) => (
                <span
                  key={tag.id}
                  className={`font-label inline-flex items-center gap-1 px-space-sm py-1 text-label-md uppercase ${tag.tone}`}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {tag.id === 't1' ? 'military_tech' : tag.id === 't2' ? 'history_edu' : 'stadium'}
                  </span>
                  {tag.label}
                  <button
                    type="button"
                    aria-label={`${tag.label} etiketini kaldır`}
                    onClick={() => {
                      onRemoveTag(tag.id)
                    }}
                    className="inline-flex"
                  >
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </span>
              ))}
              <button
                type="button"
                className="font-label inline-flex items-center gap-1 border border-outline-variant px-space-sm py-1 text-label-md uppercase text-on-surface-variant hover:border-primary hover:text-primary"
              >
                <span className="material-symbols-outlined text-[14px]">add</span>
                Etiket Ekle
              </button>
            </div>
          </div>

          <label className="flex items-center justify-between gap-space-md border border-outline-variant/40 bg-surface-container-low px-space-md py-space-sm">
            <span>
              <span className="font-label block text-label-md font-bold text-on-surface uppercase">
                Aktif Durumu (Yayın Açık / Kapalı)
              </span>
              <span className="font-kicker mt-1 inline-block text-kicker text-secondary uppercase">
                {draft.isLive ? 'Canlı Yayında' : 'Pasif / Taslak'}
              </span>
              <span className="font-body mt-1 block text-body-sm text-on-surface-variant">
                Aktif olduğunda tüm kayıtlı ve misafir Trabzonly üyeleri testi çözebilir ve liderlik
                sıralamasına puan yazdırabilir.
              </span>
            </span>
            <input
              type="checkbox"
              className="h-5 w-5 accent-primary"
              checked={draft.isLive}
              onChange={(event) => {
                onChange('isLive', event.target.checked)
              }}
            />
          </label>
        </div>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md flex flex-wrap items-center justify-between gap-space-sm border-b border-outline-variant/40 pb-space-sm">
          <div>
            <h2 className="font-headline text-headline-sm font-bold text-primary uppercase">
              Soru ve Puanlama Özeti
            </h2>
            <p className="font-body mt-1 text-body-sm text-on-surface-variant">
              Kayıtlı {draft.questionCount} Soru • Toplam {draft.totalPoints} Puan
            </p>
          </div>
          <button
            type="button"
            className="font-label inline-flex items-center gap-1 border border-outline-variant px-space-md py-space-sm text-label-md uppercase transition-colors hover:border-primary hover:text-primary"
          >
            Soruları Düzenle / Soru Oluşturucuyu Aç
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
          </button>
        </div>

        <ul className="flex flex-col gap-space-sm">
          {draft.questions.map((question) => (
            <li
              key={question.id}
              className="flex flex-wrap items-start justify-between gap-space-sm border border-outline-variant/30 px-space-md py-space-sm"
            >
              <div className="flex min-w-0 flex-1 gap-space-sm">
                <span className="font-kicker text-kicker text-on-surface-variant uppercase">
                  {question.numberLabel}
                </span>
                <div className="min-w-0">
                  <p className="font-label text-label-md font-bold text-on-surface">
                    {question.text}
                  </p>
                  <p className="font-body mt-1 inline-flex items-center gap-1 text-body-sm text-secondary">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    Doğru Cevap: {question.correctAnswer}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-space-sm">
                <span className="font-kicker text-kicker text-on-surface-variant uppercase">
                  {question.points} Puan
                </span>
                <span className="font-kicker bg-secondary-container px-space-sm py-0.5 text-kicker text-on-secondary-container uppercase">
                  Aktif
                </span>
                <span className="material-symbols-outlined text-on-surface-variant">
                  drag_handle
                </span>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-space-md flex flex-wrap items-center justify-between gap-space-sm border-t border-outline-variant/30 pt-space-md">
          <p className="font-body text-body-sm text-on-surface-variant">
            + {draft.hiddenQuestionCount} soru daha bu sette yer alıyor
          </p>
          <button
            type="button"
            className="font-label inline-flex items-center gap-1 text-label-md text-primary uppercase hover:text-secondary"
          >
            Tüm {draft.questionCount} Soruyu Görüntüle
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </section>

      <section className="border border-outline-variant/40 bg-surface-container-lowest p-space-md">
        <div className="mb-space-md border-b border-outline-variant/40 pb-space-sm">
          <h2 className="font-headline text-headline-sm font-bold text-primary uppercase">
            Erişim ve Sınırlama Ayarları
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
          <div>
            <label
              htmlFor="retakeRule"
              className="font-label mb-1 block text-label-md text-on-surface-variant"
            >
              Tekrar Çözme İzni
            </label>
            <select
              id="retakeRule"
              className={inputClass}
              value={draft.retakeRule}
              onChange={(event) => {
                onChange('retakeRule', event.target.value)
              }}
            >
              <option value="daily">Günde 1 Kez</option>
              <option value="unlimited">Sınırsız (Serbest Antrenman)</option>
              <option value="once">Yalnızca 1 Kez (Resmi Yarışma)</option>
            </select>
            <p className="font-body mt-space-xs text-body-sm text-on-surface-variant">
              Kullanıcıların puanlarının tekrarlı şişirilmesini engeller.
            </p>
          </div>
          <div>
            <label
              htmlFor="timeLimit"
              className="font-label mb-1 block text-label-md text-on-surface-variant"
            >
              Süre Limiti
            </label>
            <div className="relative">
              <select
                id="timeLimit"
                className={`${inputClass} pr-10`}
                value={draft.timeLimit}
                onChange={(event) => {
                  onChange('timeLimit', event.target.value)
                }}
              >
                <option value="30s">Soru Başına 30 Saniye (Toplam 5 Dk)</option>
                <option value="15s">Soru Başına 15 Saniye (Hızlı Mod)</option>
                <option value="none">Süre Sınırı Yok</option>
              </select>
              <span className="material-symbols-outlined pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-on-surface-variant">
                timer
              </span>
            </div>
            <p className="font-body mt-space-xs text-body-sm text-on-surface-variant">
              Süre bitiminde yanıtlanmamış soru boş kabul edilir.
            </p>
          </div>
        </div>

        <label className="mt-space-md flex items-start gap-space-sm border border-outline-variant/40 bg-surface-container-low px-space-md py-space-sm">
          <input
            type="checkbox"
            className="mt-1 accent-primary"
            checked={draft.addToLeaderboard}
            onChange={(event) => {
              onChange('addToLeaderboard', event.target.checked)
            }}
          />
          <span>
            <span className="font-label block text-label-md font-bold text-on-surface">
              Sonuçlar genel sıralamaya eklensin
            </span>
            <span className="font-body text-body-sm text-on-surface-variant">
              İşaretlendiğinde, quiz sonuçları Trabzonly Taraftar Liderlik tablosundaki aylık ve
              genel puan durumuna işlenir.
            </span>
          </span>
        </label>
      </section>
    </div>
  )
}
