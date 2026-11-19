import { PlayerCategory } from '@/features/players/playerTypes'

export type AdminPlayerModule = {
  category: PlayerCategory
  listPath: string
  listLabel: string
  listDescription: string
  createTitle: string
  createDescription: string
  editTitle: string
  editDescription: string
  addButtonLabel: string
  hideMarketFields: boolean
  currentTeamRequired: boolean
  defaultCurrentTeam: string
}

export const ADMIN_PLAYER_MODULES: Record<PlayerCategory, AdminPlayerModule> = {
  [PlayerCategory.Current]: {
    category: PlayerCategory.Current,
    listPath: '/yonetim/oyuncular',
    listLabel: 'Oyuncular',
    listDescription: 'Aktif kadrodaki oyuncuları listele, ekle, düzenle ve yönet.',
    createTitle: 'Yeni Oyuncu Ekle',
    createDescription:
      'Yeni kadro oyuncusu kaydı oluşturun. Temel kimlik, pozisyon ve kulüp alanlarını doldurun.',
    editTitle: 'Oyuncuyu Düzenle',
    editDescription: 'Oyuncu kimlik, fizik ve kadro bilgilerini güncelleyin.',
    addButtonLabel: 'Oyuncu Ekle',
    hideMarketFields: false,
    currentTeamRequired: true,
    defaultCurrentTeam: 'Trabzonspor',
  },
  [PlayerCategory.Legend]: {
    category: PlayerCategory.Legend,
    listPath: '/yonetim/efsaneler',
    listLabel: 'Efsaneler',
    listDescription: 'Trabzonspor efsanelerini listele, ekle ve kariyer profillerini yönet.',
    createTitle: 'Yeni Efsane Ekle',
    createDescription:
      'Efsane oyuncu kaydı oluşturun. Forma numarası ve açıklama yeterlidir; piyasa alanları gizlenir.',
    editTitle: 'Efsaneyi Düzenle',
    editDescription: 'Efsane kimlik, pozisyon ve açıklama bilgilerini güncelleyin.',
    addButtonLabel: 'Efsane Ekle',
    hideMarketFields: true,
    currentTeamRequired: false,
    defaultCurrentTeam: '',
  },
  [PlayerCategory.TransferTarget]: {
    category: PlayerCategory.TransferTarget,
    listPath: '/yonetim/transfer-hedefleri',
    listLabel: 'Transfer Hedefleri',
    listDescription: 'Transfer gündemindeki hedefleri listele, ekle ve güncelle.',
    createTitle: 'Yeni Transfer Hedefi Ekle',
    createDescription:
      'Transfer hedefi kaydı oluşturun. Mevcut kulüp ve piyasa bilgilerini doldurun.',
    editTitle: 'Transfer Hedefini Düzenle',
    editDescription: 'Transfer hedefi kimlik, kulüp ve finans bilgilerini güncelleyin.',
    addButtonLabel: 'Hedef Ekle',
    hideMarketFields: false,
    currentTeamRequired: true,
    defaultCurrentTeam: '',
  },
}

export function getAdminPlayerModule(category: PlayerCategory): AdminPlayerModule {
  return ADMIN_PLAYER_MODULES[category]
}

export function getAdminPlayerEditPath(category: PlayerCategory, playerId: number): string {
  return `${getAdminPlayerModule(category).listPath}/${playerId}/duzenle`
}

export function getAdminPlayerCreatePath(category: PlayerCategory): string {
  return `${getAdminPlayerModule(category).listPath}/yeni`
}
