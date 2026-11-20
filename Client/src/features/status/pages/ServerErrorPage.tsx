import { StatusPageLayout } from '../components/StatusPageLayout'

export function ServerErrorPage() {
  return (
    <StatusPageLayout
      kicker="TRABZONLY • SİSTEM DURUMU"
      code="500"
      title="BİR ŞEYLER TERS GİTTİ"
      description="Sunucuya şu an ulaşılamıyor. Kısa süre sonra tekrar dene."
      metaIcon="cloud_off"
      metaLabel="Geçici Sorun"
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
