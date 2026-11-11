import { useEffect, useState } from 'react'
import matchWeekService from '@/features/matchWeek/matchWeekService'
import type { AdminFixtureDraftRow } from '@/features/matchWeek/matchWeekTypes'
import seasonService from '@/features/seasons/seasonService'
import { AdminMatchWeekFixturesHeader } from '../components/AdminMatchWeekFixturesHeader'
import {
  mapDraftRowsToUpdateItems,
  mapFixtureToDraftRow,
  validateFixtureDraftRows,
} from '../utils/adminMatchWeekFixtureUtils'

const TOTAL_WEEKS = 34

const inputClass =
  'font-body w-full border border-outline-variant/50 bg-surface px-space-sm py-space-xs text-body-md text-on-surface outline-none focus:border-primary'

const buttonClass =
  'font-label inline-flex h-10 cursor-pointer items-center justify-center gap-1 border px-space-md text-label-md uppercase disabled:cursor-not-allowed disabled:opacity-40'

export function AdminMatchWeekFixturesPage() {
  const [seasonId, setSeasonId] = useState<number | null>(null)
  const [seasonName, setSeasonName] = useState('')
  const [displayedWeek, setDisplayedWeek] = useState(1)
  const [displayedWeekDraft, setDisplayedWeekDraft] = useState('1')
  const [weekNumber, setWeekNumber] = useState(1)
  const [rows, setRows] = useState<AdminFixtureDraftRow[]>([])
  const [isLoadingSeason, setIsLoadingSeason] = useState(true)
  const [isLoadingWeek, setIsLoadingWeek] = useState(false)
  const [isSavingWeek, setIsSavingWeek] = useState(false)
  const [isSavingDisplayedWeek, setIsSavingDisplayedWeek] = useState(false)
  const [isRebuilding, setIsRebuilding] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [weekVersion, setWeekVersion] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function loadSeason() {
      setIsLoadingSeason(true)
      setError(null)

      const result = await seasonService.getActive()

      if (cancelled) {
        return
      }

      if (!result.success || !result.data) {
        setSeasonId(null)
        setError(result.message || 'Aktif sezon bulunamadı.')
        setIsLoadingSeason(false)
        return
      }

      setSeasonId(result.data.id)
      setSeasonName(result.data.name)
      setDisplayedWeek(result.data.displayedFixtureWeek)
      setDisplayedWeekDraft(String(result.data.displayedFixtureWeek))
      setWeekNumber(result.data.displayedFixtureWeek)
      setIsLoadingSeason(false)
    }

    void loadSeason()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (seasonId == null) {
      return
    }

    let cancelled = false

    async function loadWeek() {
      setIsLoadingWeek(true)
      setError(null)

      const result = await matchWeekService.getWeekFixtures(weekNumber, seasonId ?? undefined)

      if (cancelled) {
        return
      }

      if (!result.success || !result.data) {
        setRows([])
        setError(result.message || 'Hafta fikstürü yüklenemedi.')
        setIsLoadingWeek(false)
        return
      }

      setRows(result.data.fixtures.map(mapFixtureToDraftRow))
      setIsLoadingWeek(false)
    }

    void loadWeek()

    return () => {
      cancelled = true
    }
  }, [seasonId, weekNumber, weekVersion])

  function updateRow<K extends keyof AdminFixtureDraftRow>(
    id: number,
    key: K,
    value: AdminFixtureDraftRow[K],
  ) {
    setRows((prev) =>
      prev.map((row) => {
        if (row.id !== id) {
          return row
        }

        return {
          ...row,
          [key]: value,
        }
      }),
    )
  }

  function goToWeek(nextWeek: number) {
    if (nextWeek < 1 || nextWeek > TOTAL_WEEKS || isSavingWeek) {
      return
    }

    setWeekNumber(nextWeek)
  }

  async function handleSaveWeek() {
    if (seasonId == null || isSavingWeek) {
      return
    }

    const validationError = validateFixtureDraftRows(rows)

    if (validationError) {
      setError(validationError)
      return
    }

    setIsSavingWeek(true)
    setError(null)

    const result = await matchWeekService.updateWeekFixtures({
      seasonId,
      weekNumber,
      fixtures: mapDraftRowsToUpdateItems(rows),
    })

    if (result.success && result.data) {
      setRows(result.data.fixtures.map(mapFixtureToDraftRow))
    } else {
      setError(result.message || 'Hafta fikstürü kaydedilemedi.')
    }

    setIsSavingWeek(false)
  }

  async function handleSaveDisplayedWeek() {
    if (seasonId == null || isSavingDisplayedWeek) {
      return
    }

    const parsed = Number(displayedWeekDraft)

    if (!Number.isInteger(parsed) || parsed < 1 || parsed > TOTAL_WEEKS) {
      setError('Gösterilen hafta 1 ile 34 arasında olmalıdır.')
      return
    }

    setIsSavingDisplayedWeek(true)
    setError(null)

    const result = await seasonService.updateDisplayedFixtureWeek({
      seasonId,
      displayedFixtureWeek: parsed,
    })

    if (result.success && result.data) {
      setDisplayedWeek(result.data.displayedFixtureWeek)
      setDisplayedWeekDraft(String(result.data.displayedFixtureWeek))
    } else {
      setError(result.message || 'Gösterilen hafta kaydedilemedi.')
    }

    setIsSavingDisplayedWeek(false)
  }

  async function handleRebuildStandings() {
    if (seasonId == null || isRebuilding) {
      return
    }

    setIsRebuilding(true)
    setError(null)

    const result = await matchWeekService.rebuildStandings(seasonId)

    if (!result.success) {
      setError(result.message || 'Puan durumu yenilenemedi.')
    }

    setIsRebuilding(false)
  }

  const isBusy = isLoadingSeason || isLoadingWeek || isSavingWeek || isSavingDisplayedWeek || isRebuilding

  return (
    <div className="flex flex-col">
      <main className="mx-auto flex w-full max-w-[1360px] flex-col gap-space-lg px-4 py-space-lg sm:px-6 lg:px-12">
        <AdminMatchWeekFixturesHeader />

        {error ? (
          <p className="font-body border border-error/30 bg-error-container/30 px-space-md py-space-sm text-body-md text-error">
            {error}
          </p>
        ) : null}

        {isLoadingSeason ? (
          <p className="font-body text-body-md text-on-surface-variant">Sezon yükleniyor…</p>
        ) : seasonId == null ? (
          <p className="font-body text-body-md text-on-surface-variant">
            Fikstür yönetimi için önce aktif bir sezon oluşturun.
          </p>
        ) : (
          <>
            <section className="flex flex-col gap-space-md border border-outline-variant/40 bg-surface px-space-md py-space-md">
              <div className="flex flex-wrap items-end justify-between gap-space-md">
                <div>
                  <p className="font-kicker text-kicker tracking-widest text-on-surface-variant uppercase">
                    Aktif Sezon
                  </p>
                  <p className="font-headline text-headline-sm font-bold text-primary uppercase">
                    {seasonName}
                  </p>
                </div>

                <div className="flex flex-wrap items-end gap-space-sm">
                  <div>
                    <label
                      htmlFor="displayed-fixture-week"
                      className="font-label mb-1 block text-label-md text-on-surface-variant"
                    >
                      Gösterilen Hafta
                    </label>
                    <input
                      id="displayed-fixture-week"
                      type="number"
                      min={1}
                      max={TOTAL_WEEKS}
                      value={displayedWeekDraft}
                      disabled={isBusy}
                      onChange={(event) => {
                        setDisplayedWeekDraft(event.target.value)
                      }}
                      className={`${inputClass} w-28`}
                    />
                  </div>
                  <button
                    type="button"
                    disabled={isBusy || Number(displayedWeekDraft) === displayedWeek}
                    onClick={() => {
                      void handleSaveDisplayedWeek()
                    }}
                    className={`${buttonClass} border-primary bg-primary text-on-primary`}
                  >
                    {isSavingDisplayedWeek ? 'Kaydediliyor…' : 'Gösterilen Haftayı Kaydet'}
                  </button>
                  <button
                    type="button"
                    disabled={isBusy}
                    onClick={() => {
                      void handleRebuildStandings()
                    }}
                    className={`${buttonClass} border-outline-variant/50 text-on-surface-variant hover:border-primary hover:text-primary`}
                  >
                    {isRebuilding ? 'Hesaplanıyor…' : 'Puan Tablosunu Yeniden Hesapla'}
                  </button>
                </div>
              </div>
            </section>

            <section className="flex flex-col gap-space-md border border-outline-variant/40 bg-surface px-space-md py-space-md">
              <div className="flex flex-wrap items-center gap-space-md">
                <div className="flex items-center gap-space-sm">
                  <button
                    type="button"
                    disabled={isBusy || weekNumber <= 1}
                    onClick={() => {
                      goToWeek(weekNumber - 1)
                    }}
                    className={`${buttonClass} border-outline-variant/50 text-on-surface`}
                    aria-label="Önceki hafta"
                  >
                    <span className="material-symbols-outlined text-[1.1rem]">chevron_left</span>
                  </button>
                  <p className="font-headline min-w-[8rem] text-center text-headline-sm font-bold text-primary uppercase">
                    {weekNumber}. Hafta
                  </p>
                  <button
                    type="button"
                    disabled={isBusy || weekNumber >= TOTAL_WEEKS}
                    onClick={() => {
                      goToWeek(weekNumber + 1)
                    }}
                    className={`${buttonClass} border-outline-variant/50 text-on-surface`}
                    aria-label="Sonraki hafta"
                  >
                    <span className="material-symbols-outlined text-[1.1rem]">chevron_right</span>
                  </button>
                </div>

                <div className="ml-auto flex items-center gap-space-sm">
                  <label
                    htmlFor="week-jump"
                    className="font-label shrink-0 text-label-md text-on-surface-variant"
                  >
                    Haftaya Git
                  </label>
                  <select
                    id="week-jump"
                    value={weekNumber}
                    disabled={isBusy}
                    onChange={(event) => {
                      goToWeek(Number(event.target.value))
                    }}
                    className="font-body w-28 shrink-0 cursor-pointer border border-outline-variant/50 bg-surface px-space-sm py-space-xs text-body-md text-on-surface outline-none focus:border-primary"
                  >
                    {Array.from({ length: TOTAL_WEEKS }, (_, index) => index + 1).map((week) => (
                      <option key={week} value={week}>
                        {week}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    disabled={isBusy || rows.length === 0}
                    onClick={() => {
                      void handleSaveWeek()
                    }}
                    className={`${buttonClass} shrink-0 border-primary bg-primary text-on-primary`}
                  >
                    {isSavingWeek ? 'Kaydediliyor…' : 'Kaydet'}
                  </button>
                  <button
                    type="button"
                    disabled={isBusy}
                    onClick={() => {
                      setWeekVersion((prev) => prev + 1)
                    }}
                    className={`${buttonClass} shrink-0 border-outline-variant/50 text-on-surface-variant hover:border-primary hover:text-primary`}
                  >
                    Yenile
                  </button>
                </div>
              </div>

              {isLoadingWeek ? (
                <p className="font-body text-body-md text-on-surface-variant">
                  Hafta fikstürü yükleniyor…
                </p>
              ) : rows.length === 0 ? (
                <p className="font-body text-body-md text-on-surface-variant">
                  Bu hafta için maç bulunamadı. Önce fikstür seed’ini çalıştırın.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px] border-collapse">
                    <thead>
                      <tr className="border-b border-outline-variant/40 text-left">
                        <th className="font-label px-space-sm py-space-sm text-label-md text-on-surface-variant uppercase">
                          Ev Sahibi
                        </th>
                        <th className="font-label px-space-sm py-space-sm text-label-md text-on-surface-variant uppercase">
                          Deplasman
                        </th>
                        <th className="font-label px-space-sm py-space-sm text-label-md text-on-surface-variant uppercase">
                          Maç Saati
                        </th>
                        <th className="font-label px-space-sm py-space-sm text-label-md text-on-surface-variant uppercase">
                          Ev
                        </th>
                        <th className="font-label px-space-sm py-space-sm text-label-md text-on-surface-variant uppercase">
                          Dep
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row) => (
                        <tr key={row.id} className="border-b border-outline-variant/20">
                          <td className="font-body px-space-sm py-space-sm text-body-md text-on-surface">
                            {row.homeClubName}
                          </td>
                          <td className="font-body px-space-sm py-space-sm text-body-md text-on-surface">
                            {row.awayClubName}
                          </td>
                          <td className="px-space-sm py-space-sm">
                            <input
                              type="datetime-local"
                              value={row.kickoffLocal}
                              disabled={isBusy}
                              onChange={(event) => {
                                updateRow(row.id, 'kickoffLocal', event.target.value)
                              }}
                              className={`${inputClass} cursor-pointer`}
                            />
                          </td>
                          <td className="px-space-sm py-space-sm">
                            <input
                              type="text"
                              inputMode="numeric"
                              value={row.homeScore}
                              disabled={isBusy}
                              onChange={(event) => {
                                updateRow(row.id, 'homeScore', event.target.value)
                              }}
                              className={`${inputClass} w-16`}
                              aria-label={`${row.homeClubName} skoru`}
                            />
                          </td>
                          <td className="px-space-sm py-space-sm">
                            <input
                              type="text"
                              inputMode="numeric"
                              value={row.awayScore}
                              disabled={isBusy}
                              onChange={(event) => {
                                updateRow(row.id, 'awayScore', event.target.value)
                              }}
                              className={`${inputClass} w-16`}
                              aria-label={`${row.awayClubName} skoru`}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  )
}
