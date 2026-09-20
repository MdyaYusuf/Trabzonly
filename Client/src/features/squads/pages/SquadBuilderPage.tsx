import { useMemo, useState } from 'react'
import { SquadBuilderNotes } from '../components/SquadBuilderNotes'
import { SquadBuilderPitch } from '../components/SquadBuilderPitch'
import { SquadBuilderPlayerPool } from '../components/SquadBuilderPlayerPool'
import { SquadBuilderPublishModal } from '../components/SquadBuilderPublishModal'
import { SquadBuilderToolbar } from '../components/SquadBuilderToolbar'
import {
  attackWidthOptions,
  builderPlayers,
  computeSquadStats,
  defaultAssignments,
  defaultNotes,
  defaultTitle,
  defenseLineOptions,
  getFormationConfig,
  pressOptions,
  slotIdsForFormation,
} from '../utils/squadBuilderPlaceholders'
import type {
  BuilderFormationId,
  BuilderPosGroup,
  BuilderSlotId,
} from '../utils/squadBuilderTypes'

export function SquadBuilderPage() {
  const [title, setTitle] = useState(defaultTitle)
  const [formationId, setFormationId] = useState<BuilderFormationId>('4-2-3-1')
  const [assignments, setAssignments] =
    useState<Partial<Record<BuilderSlotId, string>>>(defaultAssignments)
  const [selectedSlotId, setSelectedSlotId] = useState<BuilderSlotId | null>(null)
  const [search, setSearch] = useState('')
  const [posFilter, setPosFilter] = useState<BuilderPosGroup>('ALL')
  const [press, setPress] = useState<string>(pressOptions[0])
  const [defenseLine, setDefenseLine] = useState<string>(defenseLineOptions[0])
  const [attackWidth, setAttackWidth] = useState<string>(attackWidthOptions[0])
  const [notes, setNotes] = useState(defaultNotes)
  const [openForVoting, setOpenForVoting] = useState(true)
  const [generateCard, setGenerateCard] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [draftToast, setDraftToast] = useState<string | null>(null)

  const formation = getFormationConfig(formationId)
  const stats = useMemo(() => computeSquadStats(assignments), [assignments])

  function showToast(message: string) {
    setDraftToast(message)
    window.setTimeout(() => {
      setDraftToast(null)
    }, 2200)
  }

  function handleFormationChange(nextId: BuilderFormationId) {
    const nextSlots = new Set(slotIdsForFormation(nextId))
    const kept: Partial<Record<BuilderSlotId, string>> = {}

    for (const [slotId, playerId] of Object.entries(assignments)) {
      if (nextSlots.has(slotId as BuilderSlotId) && playerId) {
        kept[slotId as BuilderSlotId] = playerId
      }
    }

    setFormationId(nextId)
    setAssignments(kept)
    setSelectedSlotId(null)
  }

  function handleClear() {
    setAssignments({})
    setSelectedSlotId(null)
  }

  function handleClearSlot(slotId: BuilderSlotId) {
    setAssignments((prev) => {
      const next = { ...prev }
      delete next[slotId]
      return next
    })

    if (selectedSlotId === slotId) {
      setSelectedSlotId(null)
    }
  }

  function handleSelectSlot(slotId: BuilderSlotId) {
    setSelectedSlotId((prev) => (prev === slotId ? null : slotId))
  }

  function handleAssign(playerId: string) {
    const alreadyAssigned = Object.values(assignments).includes(playerId)

    if (alreadyAssigned) {
      return
    }

    const slotIds = slotIdsForFormation(formationId)
    let targetSlot = selectedSlotId

    if (!targetSlot || assignments[targetSlot]) {
      targetSlot = slotIds.find((slotId) => !assignments[slotId]) ?? null
    }

    if (!targetSlot) {
      showToast('Tüm slotlar dolu. Önce bir pozisyonu boşaltın.')
      return
    }

    setAssignments((prev) => ({
      ...prev,
      [targetSlot]: playerId,
    }))
    setSelectedSlotId(null)
  }

  return (
    <main className="min-h-screen w-full bg-background pt-16 sm:pt-20">
      <SquadBuilderToolbar
        title={title}
        formationId={formationId}
        filled={stats.filled}
        foreign={stats.foreign}
        domestic={stats.domestic}
        avgAge={stats.avgAge}
        totalValue={stats.totalValue}
        onTitleChange={setTitle}
        onFormationChange={handleFormationChange}
        onClear={handleClear}
        onSaveDraft={() => {
          showToast('Taslak kaydedildi.')
        }}
        onPreview={() => {
          setModalOpen(true)
        }}
        onPublish={() => {
          setModalOpen(true)
        }}
      />

      {draftToast ? (
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-12">
          <div className="mb-space-sm bg-secondary-container px-space-md py-space-sm text-on-secondary-container shadow-sm">
            <span className="font-label text-label-md">{draftToast}</span>
          </div>
        </div>
      ) : null}

      <section className="mx-auto w-full max-w-[1360px] px-4 py-space-xl sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-gutter lg:grid-cols-12">
          <div className="flex flex-col gap-space-md lg:col-span-7">
            <SquadBuilderPitch
              formation={formation}
              assignments={assignments}
              selectedSlotId={selectedSlotId}
              onSelectSlot={handleSelectSlot}
              onClearSlot={handleClearSlot}
            />

            <div className="grid w-full grid-cols-1 gap-space-md bg-surface-container-lowest p-space-md shadow-sm sm:grid-cols-3">
              <div className="flex flex-col gap-1">
                <label className="font-kicker text-kicker font-bold text-on-surface-variant uppercase">
                  PRES ŞİDDETİ
                </label>
                <select
                  className="font-label w-full cursor-pointer bg-surface-container px-2.5 py-1.5 text-label-md text-on-surface focus:outline-none"
                  value={press}
                  onChange={(event) => {
                    setPress(event.target.value)
                  }}
                >
                  {pressOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-kicker text-kicker font-bold text-on-surface-variant uppercase">
                  SAVUNMA ÇİZGİSİ
                </label>
                <select
                  className="font-label w-full cursor-pointer bg-surface-container px-2.5 py-1.5 text-label-md text-on-surface focus:outline-none"
                  value={defenseLine}
                  onChange={(event) => {
                    setDefenseLine(event.target.value)
                  }}
                >
                  {defenseLineOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-kicker text-kicker font-bold text-on-surface-variant uppercase">
                  HÜCUM GENİŞLİĞİ
                </label>
                <select
                  className="font-label w-full cursor-pointer bg-surface-container px-2.5 py-1.5 text-label-md text-on-surface focus:outline-none"
                  value={attackWidth}
                  onChange={(event) => {
                    setAttackWidth(event.target.value)
                  }}
                >
                  {attackWidthOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-space-lg lg:col-span-5">
            <SquadBuilderPlayerPool
              players={builderPlayers}
              assignments={assignments}
              search={search}
              posFilter={posFilter}
              filled={stats.filled}
              selectedSlotId={selectedSlotId}
              onSearchChange={setSearch}
              onPosFilterChange={setPosFilter}
              onAssign={handleAssign}
            />
            <SquadBuilderNotes
              notes={notes}
              openForVoting={openForVoting}
              generateCard={generateCard}
              onNotesChange={setNotes}
              onOpenForVotingChange={setOpenForVoting}
              onGenerateCardChange={setGenerateCard}
              onDownload={() => {
                showToast('Taktik kartı indirme yakında aktif.')
              }}
            />
          </div>
        </div>
      </section>

      <SquadBuilderPublishModal
        open={modalOpen}
        title={title || defaultTitle}
        formationLabel={formationId}
        filled={stats.filled}
        onClose={() => {
          setModalOpen(false)
        }}
      />
    </main>
  )
}
