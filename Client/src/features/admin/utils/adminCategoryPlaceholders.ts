import type { AdminCategoryFormDraft, AdminCategoryListRow } from './adminCategoryTypes'

export const adminCategoryListRows: AdminCategoryListRow[] = [
  {
    id: '1',
    name: 'Maç Önü & Maç Sonu',
    slug: '/kategori/mac-sonu',
    description:
      'Süper Lig ve kupa maçlarının taktiksel değerlendirmeleri, 90 dakika analizleri ve hakem kararları.',
    postCount: 412,
    postCountLabel: '412 Gönderi',
    status: 'active',
    statusLabel: 'Aktif',
    icon: 'sports_soccer',
    accent: 'bordo',
    updatedRank: 3,
  },
  {
    id: '2',
    name: 'Transfer Gündemi',
    slug: '/kategori/transfer',
    description:
      'KAP bildirimleri, doğrulanmış kulüp duyuruları, transfer söylentileri ve sözleşme analizleri.',
    postCount: 348,
    postCountLabel: '348 Gönderi',
    status: 'active',
    statusLabel: 'Aktif',
    icon: 'swap_horizontal_circle',
    accent: 'mavi',
    updatedRank: 2,
  },
  {
    id: '3',
    name: 'Tarih & Efsaneler',
    slug: '/kategori/tarih',
    description:
      '1967 kurucu ruhu, şampiyonluk belgeselleri, efsane futbolcular ve kulüp hafızası.',
    postCount: 285,
    postCountLabel: '285 Gönderi',
    status: 'active',
    statusLabel: 'Aktif',
    icon: 'military_tech',
    accent: 'bordo',
    updatedRank: 5,
  },
  {
    id: '4',
    name: 'Taktik & Analiz',
    slug: '/kategori/taktik-analiz',
    description:
      'Akyazı pres varyasyonları, oyuncu ısı haritaları ve detaylı şablon okumaları.',
    postCount: 219,
    postCountLabel: '219 Gönderi',
    status: 'active',
    statusLabel: 'Aktif',
    icon: 'scoreboard',
    accent: 'bordo',
    updatedRank: 1,
  },
  {
    id: '5',
    name: 'Tribün & Karadeniz Ruhu',
    slug: '/kategori/tribun',
    description:
      'Kuzey ve Güney kale arkası koreografileri, deplasman hikayeleri ve taraftar besteleri.',
    postCount: 164,
    postCountLabel: '164 Gönderi',
    status: 'active',
    statusLabel: 'Aktif',
    icon: 'campaign',
    accent: 'mavi',
    updatedRank: 4,
  },
  {
    id: '6',
    name: 'Altyapı & Özkan Sümer Akademisi',
    slug: '/kategori/altyapi',
    description:
      'Gelişim ligleri, U19 müsabakaları ve Karadeniz fırtınasının genç yetenekleri.',
    postCount: 142,
    postCountLabel: '142 Gönderi',
    status: 'active',
    statusLabel: 'Aktif',
    icon: 'school',
    accent: 'bordo',
    updatedRank: 6,
  },
  {
    id: '7',
    name: 'Arşiv & Sezonluk Dosyalar',
    slug: '/kategori/arsiv',
    description: 'Eski sezon tartışmaları ve dondurulmuş istatistiki başlıklar.',
    postCount: 0,
    postCountLabel: '0 Gönderi',
    status: 'inactive',
    statusLabel: 'Pasif',
    icon: 'archive',
    accent: 'bordo',
    updatedRank: 7,
  },
]

export const defaultAdminCategoryFormDraft: AdminCategoryFormDraft = {
  id: '4',
  recordCode: '#KAT-01',
  name: 'Taktik & Analiz',
  slug: 'taktik-analiz',
  description:
    "Akyazı taktik tahtası, maç analizleri, oyuncu ısı haritaları ve saha diziliş raporları. Trabzonspor'un saha içi taktiksel kurgusunu irdeleyen derinlemesine taraftar yazıları.",
  icon: 'grid_view',
  iconLabel: 'Pano & Taktik Düzeni',
  accent: 'bordo',
  isPublished: true,
  linkedPostsLabel: '412 Onaylı Gönderi',
  linkedPostsCount: 412,
  totalReadsLabel: '124.500+ Okunma',
  createdBy: 'Dozer Cemil',
  lastUpdated: 'Bugün, 14:20',
  statusDetail: 'Yayında ve Dizine Açık',
  previewDateLabel: '14 OCAK 2025 • EDİTÖRÜN SEÇİMİ',
  previewTitle: "Karadeniz Fırtınası'nın 3. Bölge Pres Şemaları",
}

export const emptyAdminCategoryFormDraft: AdminCategoryFormDraft = {
  id: '',
  recordCode: '#KAT-YENİ',
  name: '',
  slug: '',
  description: '',
  icon: 'category',
  iconLabel: 'Varsayılan Kategori İkonu',
  accent: 'bordo',
  isPublished: true,
  linkedPostsLabel: '0 Onaylı Gönderi',
  linkedPostsCount: 0,
  totalReadsLabel: '0 Okunma',
  createdBy: 'Dozer Cemil',
  lastUpdated: '—',
  statusDetail: 'Taslak',
  previewDateLabel: 'YENİ KATEGORİ',
  previewTitle: 'Önizleme başlığı burada görünecek',
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getAdminCategoryFormDraft(
  categoryId: string | undefined,
): AdminCategoryFormDraft {
  if (!categoryId) {
    return emptyAdminCategoryFormDraft
  }

  if (categoryId === defaultAdminCategoryFormDraft.id || categoryId === '4') {
    return defaultAdminCategoryFormDraft
  }

  const row = adminCategoryListRows.find((category) => category.id === categoryId)

  if (!row) {
    return {
      ...emptyAdminCategoryFormDraft,
      id: categoryId,
      recordCode: `#KAT-${categoryId}`,
      name: `Kategori ${categoryId}`,
    }
  }

  return {
    ...emptyAdminCategoryFormDraft,
    id: row.id,
    recordCode: `#KAT-${row.id.padStart(2, '0')}`,
    name: row.name,
    slug: row.slug.replace('/kategori/', ''),
    description: row.description,
    icon: row.icon,
    iconLabel: row.name,
    accent: row.accent,
    isPublished: row.status === 'active',
    linkedPostsLabel: `${row.postCount} Onaylı Gönderi`,
    linkedPostsCount: row.postCount,
    statusDetail: row.status === 'active' ? 'Yayında ve Dizine Açık' : 'Pasif',
    previewTitle: `${row.name} örnek gönderi başlığı`,
  }
}

export function buildCategorySlugFromName(name: string) {
  return slugify(name)
}
