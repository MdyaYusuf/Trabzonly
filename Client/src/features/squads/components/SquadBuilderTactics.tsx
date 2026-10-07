import type {
  AttackStyleOption,
  BuilderPlayer,
  DefenseLineOption,
  TempoOption,
} from '../utils/squadBuilderTypes'
import {
  attackStyleOptions,
  defenseLineOptions,
  tempoOptions,
} from '../utils/squadBuilderPlaceholders'

type SquadBuilderTacticsProps = {
  attackStyle: AttackStyleOption
  defenseLine: DefenseLineOption
  tempo: TempoOption
  captainPlayerId: string
  cornerTakerPlayerId: string
  freeKickTakerPlayerId: string
  starterPlayers: BuilderPlayer[]
  onAttackStyleChange: (value: AttackStyleOption) => void
  onDefenseLineChange: (value: DefenseLineOption) => void
  onTempoChange: (value: TempoOption) => void
  onCaptainChange: (playerId: string) => void
  onCornerTakerChange: (playerId: string) => void
  onFreeKickTakerChange: (playerId: string) => void
}

export function SquadBuilderTactics({
  attackStyle,
  defenseLine,
  tempo,
  captainPlayerId,
  cornerTakerPlayerId,
  freeKickTakerPlayerId,
  starterPlayers,
  onAttackStyleChange,
  onDefenseLineChange,
  onTempoChange,
  onCaptainChange,
  onCornerTakerChange,
  onFreeKickTakerChange,
}: SquadBuilderTacticsProps) {
  const hasStarters = starterPlayers.length > 0

  return (
    <div className="flex flex-col gap-space-md bg-surface-container-lowest p-space-md shadow-sm">
      <div className="grid w-full grid-cols-1 gap-space-md sm:grid-cols-3">
        <div className="flex flex-col gap-1">
          <label className="font-kicker text-kicker font-bold text-on-surface-variant uppercase">
            Hücum Anlayışı
          </label>
          <select
            className="font-label w-full cursor-pointer bg-surface-container px-2.5 py-1.5 text-label-md text-on-surface focus:outline-none"
            value={attackStyle}
            onChange={(event) => {
              onAttackStyleChange(event.target.value as AttackStyleOption)
            }}
          >
            {attackStyleOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-kicker text-kicker font-bold text-on-surface-variant uppercase">
            Savunma Çizgisi
          </label>
          <select
            className="font-label w-full cursor-pointer bg-surface-container px-2.5 py-1.5 text-label-md text-on-surface focus:outline-none"
            value={defenseLine}
            onChange={(event) => {
              onDefenseLineChange(event.target.value as DefenseLineOption)
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
            Tempo
          </label>
          <select
            className="font-label w-full cursor-pointer bg-surface-container px-2.5 py-1.5 text-label-md text-on-surface focus:outline-none"
            value={tempo}
            onChange={(event) => {
              onTempoChange(event.target.value as TempoOption)
            }}
          >
            {tempoOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-space-md sm:grid-cols-3">
        <div className="flex flex-col gap-1">
          <label className="font-kicker text-kicker font-bold text-on-surface-variant uppercase">
            Kaptan
          </label>
          <select
            className="font-label w-full cursor-pointer bg-surface-container px-2.5 py-1.5 text-label-md text-on-surface focus:outline-none disabled:opacity-60"
            value={captainPlayerId}
            disabled={!hasStarters}
            onChange={(event) => {
              onCaptainChange(event.target.value)
            }}
          >
            <option value="">İlk 11&apos;den seç…</option>
            {starterPlayers.map((player) => (
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-kicker text-kicker font-bold text-on-surface-variant uppercase">
            Korner
          </label>
          <select
            className="font-label w-full cursor-pointer bg-surface-container px-2.5 py-1.5 text-label-md text-on-surface focus:outline-none disabled:opacity-60"
            value={cornerTakerPlayerId}
            disabled={!hasStarters}
            onChange={(event) => {
              onCornerTakerChange(event.target.value)
            }}
          >
            <option value="">İlk 11&apos;den seç…</option>
            {starterPlayers.map((player) => (
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-kicker text-kicker font-bold text-on-surface-variant uppercase">
            Serbest Vuruş
          </label>
          <select
            className="font-label w-full cursor-pointer bg-surface-container px-2.5 py-1.5 text-label-md text-on-surface focus:outline-none disabled:opacity-60"
            value={freeKickTakerPlayerId}
            disabled={!hasStarters}
            onChange={(event) => {
              onFreeKickTakerChange(event.target.value)
            }}
          >
            <option value="">İlk 11&apos;den seç…</option>
            {starterPlayers.map((player) => (
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
