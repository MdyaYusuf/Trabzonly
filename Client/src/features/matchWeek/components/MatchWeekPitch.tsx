import { SquadPitchSlotCaption } from '@/features/squads/components/SquadPitchSlotCaption'
import {
  getFormationConfig,
  pitchRowGridClass,
  pitchRowShiftClass,
  pitchSlotNudgeClass,
} from '@/features/squads/utils/squadBuilderPlaceholders'
import type { BuilderFormationId, FormationSlot } from '@/features/squads/utils/squadBuilderTypes'
import type { MatchWeekSlotResponseDto } from '../matchWeekTypes'
import {
  avatarGradientForPlayerId,
  findFormationSlot,
  shortNameFromFull,
  splitBoardSlots,
} from '../utils/matchWeekPublicUtils'
import { MatchWeekPlayerRateControl } from './MatchWeekPlayerRateControl'

type MatchWeekPitchProps = {
  formation: string
  slots: MatchWeekSlotResponseDto[]
  onPlayerRated: (
    playerId: number,
    averageRating: number,
    ratingCount: number,
    score: number,
  ) => void
}

function PitchSlotCard({
  slot,
  player,
  onPlayerRated,
}: {
  slot: FormationSlot
  player?: MatchWeekSlotResponseDto
  onPlayerRated: MatchWeekPitchProps['onPlayerRated']
}) {
  const isGk = slot.id === 'GK'

  if (!player) {
    return (
      <div className="relative flex flex-col items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-white/50 bg-black/20 shadow-lg">
          <span className="font-kicker text-[12px] font-bold tracking-[0.08em] text-white/80 uppercase">
            {slot.label}
          </span>
        </div>
        <SquadPitchSlotCaption empty name="Boş" isGk={isGk} />
      </div>
    )
  }

  return (
    <div className="group relative flex flex-col items-center">
      <div
        className={`relative h-12 w-12 rounded-full p-0.5 shadow-lg ring-2 ${
          isGk
            ? 'bg-tertiary ring-tertiary-fixed'
            : 'bg-primary-container ring-white/60'
        }`}
      >
        <div
          className={`flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br ${avatarGradientForPlayerId(player.playerId)}`}
          title={player.playerName}
        >
          <span className="font-kicker text-[12px] font-bold tracking-[0.08em] text-white uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
            {slot.label}
          </span>
        </div>
        <span
          className={`font-kicker absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold shadow ${
            isGk
              ? 'bg-tertiary-container text-on-tertiary-container'
              : 'bg-primary text-on-primary'
          }`}
        >
          #{player.shirtNumber ?? '—'}
        </span>
      </div>
      <SquadPitchSlotCaption
        name={shortNameFromFull(player.playerName)}
        roleLabel={slot.roleLabel}
        isGk={isGk}
      />
      <MatchWeekPlayerRateControl
        playerId={player.playerId}
        averageRating={player.averageRating}
        ratingCount={player.ratingCount}
        currentUserScore={player.currentUserScore}
        onRated={(averageRating, ratingCount, score) => {
          onPlayerRated(player.playerId, averageRating, ratingCount, score)
        }}
      />
    </div>
  )
}

export function MatchWeekPitch({ formation, slots, onPlayerRated }: MatchWeekPitchProps) {
  const formationConfig = getFormationConfig(formation.trim() as BuilderFormationId)
  const { starters, bench } = splitBoardSlots(slots)
  const playersBySlotId = new Map(
    starters.map((player) => [player.slotKey.trim().toUpperCase(), player]),
  )

  return (
    <div className="flex flex-col gap-space-md">
      <div className="relative min-h-[640px] w-full select-none overflow-visible bg-[#1e4a2c] shadow-xl sm:min-h-[700px] md:min-h-[760px]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#183c24] via-[#1f4e2d] to-[#153520] opacity-95" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_50%,transparent_50%)] bg-[length:100%_48px]" />
          <svg
            className="absolute inset-0 h-full w-full fill-none stroke-white/40"
            preserveAspectRatio="none"
            strokeWidth="2"
            viewBox="0 0 720 960"
            aria-hidden="true"
          >
            <rect height="912" width="672" x="24" y="24" />
            <line x1="24" x2="696" y1="480" y2="480" />
            <circle cx="360" cy="480" r="72" />
            <rect height="150" width="360" x="180" y="24" />
            <rect height="56" width="180" x="270" y="24" />
            <rect height="150" width="360" x="180" y="786" />
            <rect height="56" width="180" x="270" y="880" />
          </svg>
        </div>

        <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 sm:left-6">
          <span className="font-kicker bg-primary/90 px-2.5 py-1 text-[10px] font-bold tracking-widest text-on-primary uppercase">
            TRABZONSPOR
          </span>
          <span className="font-label bg-secondary-container/90 px-2 py-0.5 text-[10px] font-bold text-on-secondary-container uppercase">
            {formationConfig.lineLabel}
          </span>
        </div>

        <div className="relative z-20 flex min-h-[640px] w-full flex-col justify-between p-3 sm:min-h-[700px] sm:p-4 md:min-h-[760px]">
          {formationConfig.rows.map((row, rowIndex) => {
            const isFirst = rowIndex === 0
            const isLast = rowIndex === formationConfig.rows.length - 1

            return (
              <div
                key={`row-${rowIndex}`}
                className={`${pitchRowGridClass(row.length, formationConfig.rowSpreads?.[rowIndex])} ${pitchRowShiftClass(formationConfig.rowShifts?.[rowIndex])} ${isFirst ? 'pt-6 sm:pt-8' : ''} ${isLast ? 'pb-2' : ''}`}
              >
                {row.map((slot) => (
                  <div
                    key={slot.id}
                    className={`flex justify-center ${pitchSlotNudgeClass(slot.id)}`}
                  >
                    <PitchSlotCard
                      slot={slot}
                      player={playersBySlotId.get(slot.id)}
                      onPlayerRated={onPlayerRated}
                    />
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>

      {bench.length > 0 ? (
        <div className="bg-surface-container-lowest p-space-md shadow-sm">
          <div className="mb-space-sm flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-secondary">
              airline_seat_recline_extra
            </span>
            <span className="font-kicker text-kicker font-bold tracking-widest text-on-surface-variant uppercase">
              Yedek Kulübesi ({bench.length})
            </span>
          </div>
          <div className="grid grid-cols-2 gap-space-sm sm:grid-cols-3 lg:grid-cols-6">
            {bench.map((player) => {
              const formationSlot = findFormationSlot(formation, player.slotKey)

              return (
                <div
                  key={`${player.playerId}-${player.slotKey}`}
                  className="flex flex-col items-center gap-1 border border-outline-variant/30 bg-surface p-space-sm"
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br text-[11px] font-bold text-white ${avatarGradientForPlayerId(player.playerId)}`}
                  >
                    {shortNameFromFull(player.playerName).slice(0, 2)}
                  </div>
                  <span className="font-kicker text-[10px] text-on-surface-variant">
                    #{player.shirtNumber ?? '—'}
                  </span>
                  <span className="font-headline text-center text-xs font-bold text-on-surface">
                    {shortNameFromFull(player.playerName)}
                  </span>
                  <span className="font-kicker text-[10px] font-bold tracking-wider text-secondary uppercase">
                    {formationSlot?.label ?? player.slotKey.replace('BENCH_', 'Y')}
                  </span>
                  <MatchWeekPlayerRateControl
                    playerId={player.playerId}
                    averageRating={player.averageRating}
                    ratingCount={player.ratingCount}
                    currentUserScore={player.currentUserScore}
                    tone="onSurface"
                    onRated={(averageRating, ratingCount, score) => {
                      onPlayerRated(player.playerId, averageRating, ratingCount, score)
                    }}
                  />
                </div>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}
