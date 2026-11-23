const NATIONALITY_FLAG_FILES: Record<string, string> = {
  türkiye: 'turkey.svg',
  kamerun: 'cameroon.svg',
  ukrayna: 'ukraine.svg',
  nijerya: 'nigeria.svg',
  karadağ: 'montenegro.svg',
  'yeşil burun adaları': 'cape-verde.svg',
  brezilya: 'brazil.svg',
  fransa: 'france.svg',
  fas: 'morocco.svg',
  arnavutluk: 'albania.svg',
  belçika: 'belgium.svg',
  'gine-bissau': 'gine-bissau.svg',
  mısır: 'egypt.svg',
  hollanda: 'netherlands.svg',
  gürcistan: 'georgia.svg',
  polonya: 'poland.svg',
  arjantin: 'argentina.svg',
  hırvatistan: 'croatia.svg',
  norveç: 'norway.svg',
  slovakya: 'slovakia.svg',
  kolombiya: 'colombia.svg',
  portekiz: 'portugal.svg',
  yunanistan: 'greece.svg',
  paraguay: 'paraguay.svg',
  'bosna-hersek': 'bosnia-and-herzegovina.svg',
  'fildişi sahili': 'cote-d-ivoire.svg',
  iskoçya: 'scotland.svg',
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
