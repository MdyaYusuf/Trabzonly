import { StatusPageLayout } from '../components/StatusPageLayout'

export function ForbiddenPage() {
  return (
    <StatusPageLayout
      kicker="TRABZONLY • GÜVENLİK PROTOKOLÜ"
      code="403"
      title="ERİŞİM YOK"
      description="Bu bölüme girmek için yetkin bulunmuyor. Ana sayfadan devam edebilirsin."
      metaIcon="verified_user"
      metaLabel="Yetki Düzeyi: Kısıtlı"
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
      footnote="Hata olduğunu düşünüyorsan profil ayarlarındaki Admine Ulaş bölümünden yazabilirsin."
    />
  )
}
