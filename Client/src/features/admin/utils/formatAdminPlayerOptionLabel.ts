type AdminPlayerOptionSource = {
  name: string
  shirtNumber?: number | null
}

export function formatAdminPlayerOptionLabel(player: AdminPlayerOptionSource): string {
  if (player.shirtNumber != null) {
    return `${player.name} (#${player.shirtNumber})`
  }

  return player.name
}
