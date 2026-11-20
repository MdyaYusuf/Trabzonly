import { StatusPageLayout } from '../components/StatusPageLayout'

type ContentNotFoundPageProps = {
  secondaryTo?: string
  secondaryLabel?: string
  secondaryIcon?: string
}

export function ContentNotFoundPage({
  secondaryTo = '/oyuncular',
  secondaryLabel = 'Oyunculara Göz At',
  secondaryIcon = 'groups',
}: ContentNotFoundPageProps) {
  return (
    <StatusPageLayout
      kicker="TRABZONLY • İÇERİK DURUMU"
      code="404"
      title="İÇERİK BULUNAMADI"
      description="Bu içerik silinmiş, taşınmış veya hiç yayınlanmamış olabilir."
      metaIcon="inventory_2"
      metaLabel="Durum: Kayıt Yok"
      actions={[
        {
          to: '/',
          label: 'Ana Sayfaya Dön',
          icon: 'arrow_back',
          variant: 'primary',
        },
        {
          to: secondaryTo,
          label: secondaryLabel,
          icon: secondaryIcon,
          variant: 'secondary',
        },
      ]}
    />
  )
}
