import { StatusPageLayout } from '../components/StatusPageLayout'

export function NotFoundPage() {
  return (
    <StatusPageLayout
      kicker="TRABZONLY • SAYFA DURUMU"
      code="404"
      title="SAYFA BULUNAMADI"
      description="Aradığın adres tribünde yok. Link eski olabilir ya da yanlış yazılmış olabilir."
      metaIcon="travel_explore"
      metaLabel="Durum: Adres Geçersiz"
      actions={[
        {
          to: '/',
          label: 'Ana Sayfaya Dön',
          icon: 'arrow_back',
          variant: 'primary',
        },
        {
          to: '/topluluk-kurallari',
          label: 'Topluluk Kuralları',
          icon: 'gavel',
          variant: 'secondary',
        },
      ]}
    />
  )
}
