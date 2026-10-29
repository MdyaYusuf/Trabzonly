import type { AdminHubProfile, AdminShellProfile } from './adminHubTypes'

export const adminShellProfile: AdminShellProfile = {
  brandTitle: 'TRABZONLY',
  brandSubtitle: 'Yönetim Masası',
  navHeading: 'Operasyonel Menü',
  navItems: [
    { id: 'overview', label: 'Genel Bakış', to: '/yonetim', icon: 'dashboard' },
    { id: 'players', label: 'Oyuncular', to: '/yonetim/oyuncular', icon: 'groups' },
    { id: 'stats', label: 'İstatistikler', to: '/yonetim/istatistikler', icon: 'bar_chart' },
    { id: 'injuries', label: 'Sakatlıklar', to: '/yonetim/sakatliklar', icon: 'healing' },
    { id: 'seasons', label: 'Sezonlar', to: '/yonetim/sezonlar', icon: 'calendar_month' },
    { id: 'positions', label: 'Pozisyonlar', to: '/yonetim/pozisyonlar', icon: 'schema' },
    { id: 'categories', label: 'Kategoriler', to: '/yonetim/kategoriler', icon: 'category' },
    { id: 'quizzes', label: 'Quizler', to: '/yonetim/quizler', icon: 'fact_check' },
    { id: 'members', label: 'Üyeler', to: '/yonetim/uyeler', icon: 'people' },
    {
      id: 'roles',
      label: 'Roller',
      to: '/yonetim/roller',
      icon: 'admin_panel_settings',
    },
  ],
}

export const adminHubProfile: AdminHubProfile = {
  title: 'Yönetim Paneli',
  description:
    'Karadeniz Fırtınası yönetim konsolu ile Trabzonly içeriklerini ve verilerini yönet.',
  modules: [
    {
      id: 'players',
      title: 'Oyuncular',
      description: 'Oyuncu kayıtlarını ekle, profil kartlarını ve transfer durumlarını düzenle.',
      categoryLabel: 'Trabzonspor Kadrosu',
      icon: 'groups',
      to: '/yonetim/oyuncular',
    },
    {
      id: 'stats',
      title: 'İstatistikler',
      description:
        'Sezon bazlı oyuncu ve maç performans metriklerini, gol/asist verilerini yönet.',
      categoryLabel: 'Performans Havuzu',
      icon: 'bar_chart',
      to: '/yonetim/istatistikler',
    },
    {
      id: 'injuries',
      title: 'Sakatlıklar',
      description:
        'Sakatlık kayıtlarını, sağlık raporlarını ve sahalara tahmini dönüş sürelerini yönet.',
      categoryLabel: 'Sağlık & Tedavi',
      icon: 'healing',
      to: '/yonetim/sakatliklar',
    },
    {
      id: 'seasons',
      title: 'Sezonlar',
      description: 'Süper Lig ve Avrupa sezonlarını tanımla, arşiv periyotlarını yapılandır.',
      categoryLabel: 'Lig & Arşiv',
      icon: 'calendar_month',
      to: '/yonetim/sezonlar',
    },
    {
      id: 'positions',
      title: 'Pozisyonlar',
      description:
        'Pozisyon sözlüğünü ve taktik tahtası saha rollerini (ST, OOS, DOS, STP) yönet.',
      categoryLabel: 'Taktik Tanımlar',
      icon: 'schema',
      to: '/yonetim/pozisyonlar',
    },
    {
      id: 'categories',
      title: 'Kategoriler',
      description: 'Gönderi ve taktik analiz kategorilerini, etiket filtrelerini yönet.',
      categoryLabel: 'İçerik Türleri',
      icon: 'category',
      to: '/yonetim/kategoriler',
    },
    {
      id: 'quizzes',
      title: 'Quizler',
      description: 'Trabzonspor tarih ve hafıza testleri oluştur, soruları düzenle ve yayınla.',
      categoryLabel: 'Trabzonspor Testleri',
      icon: 'fact_check',
      to: '/yonetim/quizler',
    },
    {
      id: 'members',
      title: 'Üyeler',
      description:
        'Kayıtlı taraftar listesini görüntüle, üye profillerini ve tribün puanlarını incele.',
      categoryLabel: 'Topluluk',
      icon: 'people',
      to: '/yonetim/uyeler',
    },
    {
      id: 'roles',
      title: 'Roller',
      description: 'Yetki şablonlarını, moderatör ve yazar erişim matrislerini yönet.',
      categoryLabel: 'Erişim & Güvenlik',
      icon: 'admin_panel_settings',
      to: '/yonetim/roller',
    },
  ],
}
