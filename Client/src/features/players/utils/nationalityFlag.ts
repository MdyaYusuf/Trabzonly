const NATIONALITY_FLAG_FILES: Record<string, string> = {
  türkiye: 'turkey.svg',
  turkey: 'turkey.svg',
  kamerun: 'cameroon.svg',
  cameroon: 'cameroon.svg',
  ukrayna: 'ukraine.svg',
  ukraine: 'ukraine.svg',
  nijerya: 'nigeria.svg',
  nigeria: 'nigeria.svg',
  karadağ: 'montenegro.svg',
  montenegro: 'montenegro.svg',
  'yeşil burun adaları': 'cape-verde.svg',
  'cape verde': 'cape-verde.svg',
  brezilya: 'brazil.svg',
  brazil: 'brazil.svg',
  fransa: 'france.svg',
  france: 'france.svg',
  marokko: 'morocco.svg',
  morocco: 'morocco.svg',
  arnavutluk: 'albania.svg',
  albania: 'albania.svg',
  belçika: 'belgium.svg',
  belgium: 'belgium.svg',
  'gine-bissau': 'gine-bissau.svg',
  'guinea-bissau': 'gine-bissau.svg',
  mısır: 'egypt.svg',
  egypt: 'egypt.svg',
}

function normalizeNationality(nationality: string): string {
  return nationality.trim().toLocaleLowerCase('tr-TR')
}

export function getNationalityFlagUrl(nationality: string): string | null {
  const fileName = NATIONALITY_FLAG_FILES[normalizeNationality(nationality)]

  if (!fileName) {
    return null
  }

  return `/assets/flags/${fileName}`
}
