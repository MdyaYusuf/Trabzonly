import type {
  AdminRoleFormDraft,
  AdminRoleListRow,
  AdminRolePermissionGroup,
} from './adminRoleTypes'

export const adminRoleListStats = {
  definedValue: '4 Rol',
  definedNote: '2 Sistem Rolü, 2 Özel Rol',
  hierarchyLabel: 'Hiyerarşi OK',
  assignedValue: '14.850',
  assignedNote: 'Tüm aktif ve pasif taraftarlar',
  assignedTrend: '+142 Bu Hafta',
  topAuthValue: '18 Yönetici',
  topAuthNote: 'Sistem ve içerik tam erişimi',
  topAuthBadge: 'Kritik Güvenlik',
}

export const adminRoleListRows: AdminRoleListRow[] = [
  {
    id: 'admin',
    name: 'Yönetici',
    kind: 'system',
    kindLabel: 'Sistem Rolü',
    description:
      'Tüm sistem, üye, istatistik, quiz ve CMS modüllerine tam erişim ve düzenleme yetkisi.',
    accessTitle: 'Tam Yetki (Süper Admin / Direktörlük)',
    accessDetails: ['14 Modül Aktif • Kök Dizin Kontrolü'],
    memberCount: 18,
    memberCountLabel: '18 Üye',
    createdAt: '12.08.2021',
    createdNote: 'Sistem Varsayılanı',
    statusLabel: 'Kilitli / Sistem',
    isLocked: true,
    icon: 'admin_panel_settings',
    iconTone: 'bg-primary-container text-on-primary',
  },
  {
    id: 'moderator',
    name: 'Moderatör',
    kind: 'community',
    kindLabel: 'Topluluk',
    description:
      'Gönderi, yorum ve taraftar kadrolarını denetleme, spam engelleme yetkisi.',
    accessTitle: 'İçerik & Topluluk Moderasyonu',
    accessDetails: ['Yorum Engelleme • İçerik Kaldırma'],
    memberCount: 34,
    memberCountLabel: '34 Üye',
    createdAt: '15.09.2021',
    createdNote: 'Özel Yetkilendirme',
    statusLabel: 'Aktif',
    isLocked: false,
    icon: 'policy',
    iconTone: 'bg-secondary-container text-on-secondary-container',
  },
  {
    id: 'editor',
    name: 'Editör',
    kind: 'community',
    kindLabel: 'Medya & Köşe Yazarı',
    description:
      'Taktik analiz, resmi maç yazıları ve oyuncu değerlendirme içerikleri yayınlama yetkisi.',
    accessTitle: 'Yazı & İçerik Yayınlama',
    accessDetails: ['CMS Erişimi • Taslak & Canlı Yayım'],
    memberCount: 52,
    memberCountLabel: '52 Üye',
    createdAt: '04.01.2022',
    createdNote: 'Basın & Analiz Grubu',
    statusLabel: 'Aktif',
    isLocked: false,
    icon: 'edit_note',
    iconTone: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
  },
  {
    id: 'member',
    name: 'Üye',
    kind: 'system',
    kindLabel: 'Standart Taraftar',
    description:
      'Portal girişi, kadro kurma, taktik oylama ve quiz çözme temel taraftar yetkileri.',
    accessTitle: 'Temel Topluluk Erişimi',
    accessDetails: ['Yorum • Beğeni • Kadro Kurucu'],
    memberCount: 14746,
    memberCountLabel: '14.746 Üye',
    createdAt: '12.08.2021',
    createdNote: 'Sistem Varsayılanı',
    statusLabel: 'Kilitli / Varsayılan',
    isLocked: true,
    icon: 'person',
    iconTone: 'bg-surface-container-high text-on-surface-variant',
  },
]

export const adminRoleColorOptions = [
  { id: 'bordo' as const, label: 'Fırtına Bordo', hex: '#5A0E27', swatch: 'bg-primary-container' },
  { id: 'mavi' as const, label: 'Karadeniz Mavi', hex: '#12648E', swatch: 'bg-secondary' },
  { id: 'amber' as const, label: 'Kupa Altını', hex: '#3F2900', swatch: 'bg-tertiary-container' },
  { id: 'gri' as const, label: 'İdari Kurşuni', hex: '#544245', swatch: 'bg-on-surface-variant' },
]

const adminPermissionGroups: AdminRolePermissionGroup[] = [
  {
    id: 'users',
    title: 'Kullanıcı & Roller',
    icon: 'group',
    permissions: [
      {
        id: 'view-members',
        label: 'Üyeleri Görüntüle',
        description: 'Üye dizinini ve profillerini listeleme',
        enabled: true,
      },
      {
        id: 'edit-members',
        label: 'Üye Düzenle / Askıya Al',
        description: 'Ceza verme ve profil güncelleme',
        enabled: true,
      },
      {
        id: 'manage-roles',
        label: 'Rolleri Yönet',
        description: 'Rol ve yetki matrisi oluşturma',
        enabled: true,
      },
    ],
  },
  {
    id: 'football',
    title: 'Futbol & Kadro Verileri',
    icon: 'sports_soccer',
    permissions: [
      {
        id: 'edit-players',
        label: 'Oyuncu Ekle / Düzenle',
        description: 'A Takım ve altyapı sözleşme girişi',
        enabled: true,
      },
      {
        id: 'manage-stats',
        label: 'İstatistikleri Yönet',
        description: 'Maç verileri, xG, pas ve gol kayıtları',
        enabled: true,
      },
      {
        id: 'injury-reports',
        label: 'Sakatlık Raporu Gir',
        description: 'Sağlık heyeti raporu ve geri dönüş',
        enabled: true,
      },
    ],
  },
  {
    id: 'community',
    title: 'Topluluk & Quiz',
    icon: 'forum',
    permissions: [
      {
        id: 'manage-quizzes',
        label: 'Quiz Oluştur / Yayınla',
        description: 'Trabzonspor tarih quizleri ve ödülleri',
        enabled: true,
      },
      {
        id: 'moderate-content',
        label: 'Gönderi & Yorum Moderasyonu',
        description: 'Küfür filtreleme ve içerik silme',
        enabled: true,
      },
      {
        id: 'approve-squads',
        label: 'Taktik Kadro Onayı',
        description: "Haftalık taraftar 11'i seçki onayı",
        enabled: true,
      },
    ],
  },
]

export const defaultAdminRoleFormDraft: AdminRoleFormDraft = {
  id: 'admin',
  recordCode: '#ROL-ADMIN-01',
  name: 'Yönetici',
  code: 'ROLE_ADMIN',
  description:
    'Tüm sistem, üye, istatistik, quiz ve CMS modüllerine tam erişim ve yetkilendirme yetkisine sahip kulüp yöneticisi rolü.',
  color: 'bordo',
  isDefaultRegistrationRole: false,
  isSystemRole: true,
  permissionGroups: adminPermissionGroups,
  assignedMembers: 18,
  lastAssignedMember: 'Dozer Cemil',
  lastAssignedMeta: 'Bugün 14:20 (ID: #8921)',
  criticalityLabel: 'Tier 1 (Çekirdek Rol)',
  twoFactorLabel: 'Zorunlu (Tüm Üyeler)',
  protocolVersion: 'Güvenlik Protokolü v4.2',
  lastUpdated: 'Son Güncelleme: 14.10.2024',
  previewUsername: 'BordoFırtına61',
  previewAdminName: 'Dozer Cemil',
  previewAdminRole: 'Sistem Yöneticisi',
}

export const emptyAdminRoleFormDraft: AdminRoleFormDraft = {
  id: '',
  recordCode: '#ROL-YENİ',
  name: '',
  code: 'ROLE_CUSTOM',
  description: '',
  color: 'bordo',
  isDefaultRegistrationRole: false,
  isSystemRole: false,
  permissionGroups: adminPermissionGroups.map((group) => ({
    ...group,
    permissions: group.permissions.map((permission) => ({
      ...permission,
      enabled: false,
    })),
  })),
  assignedMembers: 0,
  lastAssignedMember: '—',
  lastAssignedMeta: 'Henüz atama yok',
  criticalityLabel: 'Tier 3 (Özel Rol)',
  twoFactorLabel: 'Opsiyonel',
  protocolVersion: 'Güvenlik Protokolü v4.2',
  lastUpdated: 'Yeni kayıt',
  previewUsername: 'YeniKullanıcı61',
  previewAdminName: 'Yeni Kullanıcı',
  previewAdminRole: 'Özel Rol',
}

export function getAdminRoleFormDraft(roleId: string | undefined): AdminRoleFormDraft {
  if (!roleId) {
    return emptyAdminRoleFormDraft
  }

  if (roleId === 'admin' || roleId === '1') {
    return defaultAdminRoleFormDraft
  }

  const row = adminRoleListRows.find((item) => item.id === roleId)

  if (!row) {
    return {
      ...emptyAdminRoleFormDraft,
      id: roleId,
      recordCode: `#ROL-${roleId.toUpperCase()}`,
    }
  }

  const codeMap: Record<string, string> = {
    moderator: 'ROLE_MODERATOR',
    editor: 'ROLE_EDITOR',
    member: 'ROLE_MEMBER',
  }

  const colorMap: Record<string, AdminRoleFormDraft['color']> = {
    moderator: 'mavi',
    editor: 'amber',
    member: 'gri',
  }

  return {
    ...emptyAdminRoleFormDraft,
    id: row.id,
    recordCode: `#ROL-${row.id.toUpperCase()}-01`,
    name: row.name,
    code: codeMap[row.id] ?? `ROLE_${row.id.toUpperCase()}`,
    description: row.description,
    color: colorMap[row.id] ?? 'bordo',
    isSystemRole: row.isLocked,
    assignedMembers: row.memberCount,
    previewAdminRole: row.name,
    permissionGroups: adminPermissionGroups.map((group) => ({
      ...group,
      permissions: group.permissions.map((permission) => ({
        ...permission,
        enabled: row.id === 'member' ? permission.id === 'view-members' : true,
      })),
    })),
  }
}
