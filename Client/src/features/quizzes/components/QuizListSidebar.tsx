import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  badgeShowcase,
  dailyQuestion,
  leaderboardEntries,
} from '../utils/quizListPlaceholders'

export function QuizListSidebar() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  return (
    <aside className="flex flex-col gap-space-lg">
      <div className="overflow-hidden bg-surface-container-lowest shadow-sm">
        <div className="flex items-center justify-between bg-surface-container-low p-space-md">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[20px] text-primary">leaderboard</span>
            <h3 className="font-headline text-headline-sm font-bold text-primary uppercase">
              Liderlik Tablosu
            </h3>
          </div>
          <span className="font-kicker text-kicker font-bold text-secondary uppercase">
            BU AYIN TRİBÜN HAFIZALARI
          </span>
        </div>

        <div className="p-space-md pb-space-sm">
          {leaderboardEntries.map((entry) => {
            if (entry.compact) {
              return (
                <div
                  key={entry.username}
                  className="flex items-center justify-between p-space-sm"
                >
                  <div className="flex items-center gap-space-sm">
                    <div className="font-label flex h-7 w-7 items-center justify-center bg-surface-container text-label-md text-on-surface-variant">
                      {entry.rank}
                    </div>
                    <span className="font-label text-label-md font-medium text-on-surface">
                      {entry.username}
                    </span>
                  </div>
                  <span className="font-label text-label-md font-bold text-on-surface-variant">
                    {entry.pointsLabel ?? `${entry.points.toLocaleString('tr-TR')} P`}
                  </span>
                </div>
              )
            }

            const rankTone =
              entry.rank === 1
                ? 'bg-tertiary-fixed-dim text-on-tertiary-fixed'
                : entry.rank === 2
                  ? 'bg-surface-container-highest text-on-surface'
                  : 'bg-surface-container-high text-on-surface'

            return (
              <div
                key={entry.username}
                className="mb-space-xs flex items-center justify-between bg-surface-container-lowest p-space-sm"
              >
                <div className="flex items-center gap-space-sm">
                  <div
                    className={`font-headline flex h-7 w-7 items-center justify-center text-[13px] font-bold ${rankTone}`}
                  >
                    {entry.rank}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-space-xs">
                      <span className="font-label text-label-md font-bold text-primary">
                        {entry.username}
                      </span>
                      {entry.verified ? (
                        <span
                          className="material-symbols-outlined text-[16px] text-tertiary-fixed-dim"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          verified
                        </span>
                      ) : null}
                    </div>
                    {entry.badge ? (
                      <span className="font-kicker text-[10px] font-bold text-tertiary uppercase">
                        {entry.badge}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-headline text-headline-sm font-extrabold text-primary">
                    {entry.points.toLocaleString('tr-TR')}
                  </span>
                  <span className="font-kicker block text-[9px] text-on-surface-variant uppercase">
                    PUAN
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="p-space-md pt-0">
          <Link
            to="/quizler"
            className="font-label block w-full bg-surface-container py-space-xs text-center text-label-md font-bold text-primary uppercase transition-all hover:bg-secondary-container hover:text-on-secondary-container"
          >
            Tüm Sıralamayı Gör (TOP 100)
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-space-md bg-surface-container-lowest p-space-lg shadow-sm">
        <div className="flex items-center gap-space-sm">
          <div className="flex h-10 w-10 items-center justify-center bg-secondary text-on-secondary">
            <span className="material-symbols-outlined text-2xl">military_tech</span>
          </div>
          <div className="flex flex-col">
            <span className="font-kicker text-kicker font-bold text-secondary uppercase">
              TRİBÜN PUANI SİSTEMİ
            </span>
            <span className="font-headline text-headline-sm font-bold text-primary uppercase">
              ROZETLERİ TOPLA
            </span>
          </div>
        </div>
        <p className="font-body text-body-sm leading-relaxed text-on-surface-variant">
          Quizleri tamamla, doğru cevaplarınla tribün puanlarını topla, profil rozetlerini kazan!
          Toplulukta ve maç günü canlı sohbetlerinde rütbenle öne çık.
        </p>
        <div className="grid grid-cols-3 gap-space-xs py-space-xs">
          {badgeShowcase.map((badge) => (
            <div
              key={badge.label}
              className="flex flex-col items-center bg-surface-container-low p-space-xs text-center"
            >
              <span
                className={`material-symbols-outlined text-xl ${
                  badge.tone === 'primary'
                    ? 'text-primary'
                    : badge.tone === 'secondary'
                      ? 'text-secondary'
                      : 'text-tertiary-fixed-dim'
                }`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {badge.icon}
              </span>
              <span
                className={`font-kicker mt-1 text-[10px] font-bold uppercase ${
                  badge.tone === 'primary'
                    ? 'text-primary'
                    : badge.tone === 'secondary'
                      ? 'text-secondary'
                      : 'text-tertiary'
                }`}
              >
                {badge.label}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between bg-surface-container p-space-sm">
          <span className="font-label text-label-md text-on-surface">
            Senin Puanın: <strong className="font-bold text-primary">340 P</strong>
          </span>
          <Link
            to="/profil"
            className="font-label text-label-md font-bold text-secondary uppercase hover:underline"
          >
            Detaylar
          </Link>
        </div>
      </div>

      <div className="relative flex flex-col gap-space-sm overflow-hidden bg-primary p-space-lg text-on-primary shadow-sm">
        <div className="flex items-center justify-between">
          <span className="font-kicker text-kicker font-bold tracking-widest text-tertiary-fixed-dim uppercase">
            GÜNÜN HIZLI SORUSU
          </span>
          <span className="font-kicker bg-primary-container px-2 py-0.5 text-[10px] font-bold text-on-primary uppercase">
            {dailyQuestion.pointsLabel}
          </span>
        </div>
        <h4 className="font-headline text-[18px] leading-tight font-bold text-on-primary">
          {dailyQuestion.prompt}
        </h4>
        <div className="mt-space-xs flex flex-col gap-space-xs">
          {dailyQuestion.options.map((option) => {
            const isSelected = selectedOption === option.id

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  setSelectedOption(option.id)
                }}
                className={
                  isSelected
                    ? 'font-label flex w-full items-center justify-between bg-secondary-container px-space-md py-space-xs text-left text-label-md text-on-secondary-container uppercase transition-all'
                    : 'font-label flex w-full items-center justify-between bg-primary-container px-space-md py-space-xs text-left text-label-md text-on-primary uppercase transition-all hover:bg-secondary-container hover:text-on-secondary-container'
                }
              >
                <span>{option.label}</span>
                <span className="font-kicker text-[11px] opacity-60">Seç</span>
              </button>
            )
          })}
        </div>
        <span className="font-kicker text-right text-[10px] text-on-primary/60 uppercase">
          Cevaplamak için giriş yapın
        </span>
      </div>
    </aside>
  )
}
