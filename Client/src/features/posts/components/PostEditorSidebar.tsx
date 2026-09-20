import { Link } from 'react-router-dom'
import { editorGuidelines, featureTips } from '../utils/postEditorPlaceholders'

export function PostEditorSidebar() {
  return (
    <aside className="flex flex-col gap-space-lg lg:col-span-4">
      <div className="relative flex flex-col gap-space-md overflow-hidden bg-surface-container-lowest p-space-lg shadow-sm">
        <div className="pointer-events-none absolute -right-6 -bottom-6 select-none text-primary opacity-5">
          <span className="material-symbols-outlined text-9xl">shield</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-kicker text-kicker font-bold tracking-widest text-primary uppercase">
            Yazar Editoryal Kartı
          </span>
          <span className="flex items-center gap-1 bg-tertiary-fixed px-2 py-0.5 font-kicker text-kicker font-bold text-on-tertiary-fixed uppercase">
            <span className="material-symbols-outlined text-xs">star</span> Kıdemli
          </span>
        </div>
        <div className="flex items-center gap-space-md">
          <div className="font-headline flex h-14 w-14 items-center justify-center bg-primary-container text-headline-md font-bold text-on-primary uppercase shadow-sm">
            BF
          </div>
          <div className="flex flex-col">
            <span className="font-headline text-headline-sm font-bold text-on-surface">
              @BordoFirtina61
            </span>
            <span className="font-body text-body-sm text-on-surface-variant">
              Topluluk Taktik Analisti • Trabzon
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-space-xs bg-surface-container-low p-space-sm">
          <div className="font-label flex items-center justify-between text-label-md">
            <span className="text-on-surface">Topluluk Güven Puanı</span>
            <span className="font-bold text-primary">%98</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-high">
            <div className="h-full bg-primary" style={{ width: '98%' }} />
          </div>
          <div className="flex items-center justify-between pt-1 font-kicker text-kicker text-on-surface-variant uppercase">
            <span>14 Onaylı Yazı</span>
            <span>0 İhlal Bildirimi</span>
          </div>
        </div>
      </div>

      <div className="relative flex flex-col gap-space-md overflow-hidden bg-primary p-space-lg text-on-primary shadow-sm">
        <div className="flex items-center justify-between">
          <span className="font-kicker text-kicker font-bold tracking-widest text-tertiary-fixed-dim uppercase">
            Kadro Entegrasyonu
          </span>
          <span className="h-2 w-2 rounded-full bg-secondary-container" />
        </div>
        <div className="flex flex-col gap-space-xs">
          <h2 className="font-headline text-headline-sm text-on-primary uppercase">
            Taktik Tahtası Bağla
          </h2>
          <p className="font-body text-body-sm text-on-primary/80">
            Yazına interaktif bir Trabzonspor dizilişi eklemek ister misin? &quot;11&apos;ini Kur&quot;
            modülüyle hazırladığın taktik şablonunu bu yazıya doğrudan iliştirebilirsin.
          </p>
        </div>
        <div className="flex flex-col gap-space-xs bg-primary-container p-space-sm">
          <div className="font-label flex items-center justify-between text-label-md text-on-primary">
            <span>
              Diziliş: <strong>4-2-3-1 (Hücum)</strong>
            </span>
            <span className="text-tertiary-fixed-dim">Aktif</span>
          </div>
          <div className="relative flex h-20 w-full items-center justify-center overflow-hidden bg-primary/60">
            <div className="absolute inset-x-4 inset-y-2 flex items-center justify-center border border-on-primary/20">
              <div className="h-8 w-8 rounded-full border border-on-primary/20" />
            </div>
            <span className="font-kicker text-kicker text-on-primary/60 uppercase">
              Akyazı Pres Şablonu #1
            </span>
          </div>
        </div>
        <Link
          to="/kadrolar"
          className="font-label flex w-full items-center justify-center gap-1 bg-secondary-container py-space-sm text-label-md font-bold tracking-wider text-on-secondary-container uppercase transition-all hover:bg-surface-container-lowest hover:text-on-surface"
        >
          <span className="material-symbols-outlined text-sm">add_circle</span>
          Kadro / 11 Ekle +
        </Link>
      </div>

      <div className="flex flex-col gap-space-md bg-surface-container-lowest p-space-lg shadow-sm">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-secondary">verified_user</span>
          <span className="font-kicker text-kicker font-bold tracking-widest text-primary uppercase">
            Tribün & Editoryal İlkeler
          </span>
        </div>
        <p className="font-body text-body-sm text-on-surface-variant">
          Trabzonly tribünü, seviyeli tartışma ve futbol kültürünü yüceltme zeminidir. Gönderileriniz
          moderasyon tarafından onaylanmadan önce şu ilkeler kontrol edilir:
        </p>
        <div className="flex flex-col gap-space-sm">
          {editorGuidelines.map((item) => (
            <div key={item.title} className="flex items-start gap-space-xs">
              <span className="material-symbols-outlined mt-0.5 shrink-0 text-sm text-primary">
                check
              </span>
              <span className="font-body text-body-sm text-on-surface">
                <strong>{item.title}:</strong> {item.body}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-space-md bg-surface-container p-space-lg">
        <span className="font-kicker text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
          Manşete Çıkma İpuçları
        </span>
        <div className="flex flex-col gap-space-sm">
          {featureTips.map((tip, index) => (
            <div
              key={tip}
              className="flex items-center gap-space-sm bg-surface-container-lowest p-space-sm"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-on-secondary">
                {index + 1}
              </span>
              <p className="font-body text-body-sm text-on-surface">{tip}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between pt-space-xs font-kicker text-kicker text-on-surface-variant uppercase">
          <span>Haftalık Bülten Seçkisi</span>
          <span className="font-bold text-secondary">Her Pazartesi</span>
        </div>
      </div>
    </aside>
  )
}
