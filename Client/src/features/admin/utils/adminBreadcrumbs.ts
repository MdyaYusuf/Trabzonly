export type AdminBreadcrumbSegment = {
  label: string
  to?: string
}

export type AdminBreadcrumbState = {
  backTo: string | null
  backLabel: string | null
  segments: AdminBreadcrumbSegment[]
}

type ModuleCrumb = {
  listPath: string
  listLabel: string
  createSuffix: string
  createLabel: string
  editLabel: string
}

const MODULES: ModuleCrumb[] = [
  {
    listPath: '/yonetim/oyuncular',
    listLabel: 'Oyuncular',
    createSuffix: '/yeni',
    createLabel: 'Yeni Oyuncu',
    editLabel: 'Oyuncuyu Düzenle',
  },
  {
    listPath: '/yonetim/kategoriler',
    listLabel: 'Kategoriler',
    createSuffix: '/yeni',
    createLabel: 'Yeni Kategori',
    editLabel: 'Kategoriyi Düzenle',
  },
  {
    listPath: '/yonetim/pozisyonlar',
    listLabel: 'Pozisyonlar',
    createSuffix: '/yeni',
    createLabel: 'Yeni Pozisyon',
    editLabel: 'Pozisyonu Düzenle',
  },
  {
    listPath: '/yonetim/sezonlar',
    listLabel: 'Sezonlar',
    createSuffix: '/yeni',
    createLabel: 'Yeni Sezon',
    editLabel: 'Sezonu Düzenle',
  },
  {
    listPath: '/yonetim/istatistikler',
    listLabel: 'İstatistikler',
    createSuffix: '/yeni',
    createLabel: 'Yeni İstatistik',
    editLabel: 'İstatistik Düzenle',
  },
  {
    listPath: '/yonetim/sakatliklar',
    listLabel: 'Sakatlıklar',
    createSuffix: '/yeni',
    createLabel: 'Yeni Sakatlık',
    editLabel: 'Sakatlık Düzenle',
  },
  {
    listPath: '/yonetim/quizler',
    listLabel: 'Quizler',
    createSuffix: '/yeni',
    createLabel: 'Yeni Quiz',
    editLabel: 'Quiz Düzenle',
  },
  {
    listPath: '/yonetim/roller',
    listLabel: 'Roller',
    createSuffix: '/yeni',
    createLabel: 'Yeni Rol',
    editLabel: 'Rol Düzenle',
  },
]

const OVERVIEW: AdminBreadcrumbSegment = { label: 'Genel Bakış', to: '/yonetim' }

function isExactListPath(pathname: string, listPath: string): boolean {
  return pathname === listPath || pathname.startsWith(`${listPath}?`)
}

export function resolveAdminBreadcrumb(pathname: string): AdminBreadcrumbState {
  if (pathname === '/yonetim' || pathname.startsWith('/yonetim?')) {
    return {
      backTo: '/',
      backLabel: 'Siteye dön',
      segments: [{ label: 'Genel Bakış' }],
    }
  }

  if (pathname.startsWith('/yonetim/uyeler/')) {
    return {
      backTo: '/yonetim/uyeler',
      backLabel: 'Üye listesine dön',
      segments: [
        OVERVIEW,
        { label: 'Üyeler', to: '/yonetim/uyeler' },
        { label: 'Üye Detayı' },
      ],
    }
  }

  if (isExactListPath(pathname, '/yonetim/uyeler')) {
    return {
      backTo: '/yonetim',
      backLabel: 'Genel bakışa dön',
      segments: [OVERVIEW, { label: 'Üyeler' }],
    }
  }

  for (const module of MODULES) {
    if (pathname === `${module.listPath}${module.createSuffix}`) {
      return {
        backTo: module.listPath,
        backLabel: `${module.listLabel} listesine dön`,
        segments: [
          OVERVIEW,
          { label: module.listLabel, to: module.listPath },
          { label: module.createLabel },
        ],
      }
    }

    if (pathname.startsWith(`${module.listPath}/`) && pathname.includes('/duzenle')) {
      return {
        backTo: module.listPath,
        backLabel: `${module.listLabel} listesine dön`,
        segments: [
          OVERVIEW,
          { label: module.listLabel, to: module.listPath },
          { label: module.editLabel },
        ],
      }
    }

    if (isExactListPath(pathname, module.listPath)) {
      return {
        backTo: '/yonetim',
        backLabel: 'Genel bakışa dön',
        segments: [OVERVIEW, { label: module.listLabel }],
      }
    }
  }

  return {
    backTo: '/yonetim',
    backLabel: 'Genel bakışa dön',
    segments: [OVERVIEW, { label: 'Yönetim' }],
  }
}
