import type { AdminHubProfile, AdminShellProfile } from './adminHubTypes'

export const adminShellProfile: AdminShellProfile = {
  brandTitle: 'TRABZONLY',
  brandSubtitle: 'Yönetim Masası',
  navHeading: 'Operasyonel Menü',
  navItems: [
    { id: 'overview', label: 'Genel Bakış', to: '/yonetim', icon: 'dashboard' },
    { id: 'players', label: 'Oyuncular', to: '/yonetim/oyuncular', icon: 'groups' },
    {
      id: 'match-week',
      label: 'Maç Haftası',
      to: '/yonetim/mac-haftasi/kadro',
      icon: 'sports_soccer',
    },
    {
      id: 'fixtures',
      label: 'Fikstür',
      to: '/yonetim/mac-haftasi/fikstur',
      icon: 'event',
    },
    { id: 'stats', label: 'İstatistikler', to: '/yonetim/istatistikler', icon: 'bar_chart' },
    { id: 'injuries', label: 'Sakatlıklar', to: '/yonetim/sakatliklar', icon: 'healing' },
    { id: 'seasons', label: 'Sezonlar', to: '/yonetim/sezonlar', icon: 'calendar_month' },
    { id: 'positions', label: 'Pozisyonlar', to: '/yonetim/pozisyonlar', icon: 'schema' },
    { id: 'categories', label: 'Kategoriler', to: '/yonetim/kategoriler', icon: 'category' },
    { id: 'polls', label: 'Anketler', to: '/yonetim/anketler', icon: 'ballot' },
    { id: 'quizzes', label: 'Quizler', to: '/yonetim/quizler', icon: 'quiz' },
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
      id: 'match-week',
      title: 'Maç Haftası',
      description:
        'Canlı haftanın dizilişini yerleştir, rakibi ve skoru yönet. Kaydet ve Yeni hafta ile puanları kontrol et.',
      categoryLabel: 'Maç Kadrosu',
      icon: 'sports_soccer',
      to: '/yonetim/mac-haftasi/kadro',
    },
    {
      id: 'fixtures',
      title: 'Fikstür',
      description:
        'Aktif sezon haftalarını düzenle, maç saatlerini ve skorları güncelle. Gösterilen haftayı ayarla.',
      categoryLabel: 'Lig & Fikstür',
      icon: 'event',
      to: '/yonetim/mac-haftasi/fikstur',
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
      id: 'polls',
      title: 'Anketler',
      description:
        'Günün taraftar anketini ve oyuncu anketlerini oluştur, aktif yayını yönet.',
      categoryLabel: 'Taraftar Etkileşimi',
      icon: 'ballot',
      to: '/yonetim/anketler',
    },
    {
      id: 'quizzes',
      title: 'Quizler',
      description: 'Trabzonspor tarih ve hafıza testleri oluştur, soruları düzenle ve yayınla.',
      categoryLabel: 'Trabzonspor Testleri',
      icon: 'quiz',
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
