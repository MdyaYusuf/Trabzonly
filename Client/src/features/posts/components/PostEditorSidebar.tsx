import { Link } from 'react-router-dom'
import { editorGuidelines, featureTips } from '../utils/postEditorPlaceholders'

export function PostEditorSidebar() {
  return (
    <aside className="flex flex-col gap-space-lg lg:col-span-4">
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
      </div>

      <Link
        to="/gonderiler"
        className="font-label bg-surface-container-lowest px-space-md py-space-sm text-center text-label-md tracking-wider text-on-surface-variant uppercase shadow-sm transition-colors hover:text-primary"
      >
        Gönderilere Dön
      </Link>
    </aside>
  )
}
