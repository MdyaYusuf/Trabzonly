export type CommunityRuleItem = {
  title: string
  body: string
}

export type CommunityRuleSection = {
  id: string
  number: string
  tocLabel: string
  heading: string
  items: CommunityRuleItem[]
  fullWidth?: boolean
}

export const communityRulesToc = [
  { id: 'kural-01', label: '01 Genel' },
  { id: 'kural-02', label: '02 Saygı' },
  { id: 'kural-03', label: '03 İçerik' },
  { id: 'kural-04', label: '04 Hesap' },
  { id: 'kural-05', label: '05 Moderasyon' },
  { id: 'kural-06', label: '06 Güvenlik' },
  { id: 'kural-07', label: '07 Sorumluluk Reddi' },
] as const

export const communityRuleSections: CommunityRuleSection[] = [
  {
    id: 'kural-01',
    number: '01',
    tocLabel: 'Genel',
    heading: 'Genel İlkeler',
    items: [
      {
        title: 'Bordo-Mavi Renklerin Temsili:',
        body: 'Trabzonly, Trabzonspor sevdalılarının fikir ürettiği, taktik konuştuğu ve kulüp hafızasını diri tuttuğu bağımsız bir taraftar platformudur.',
      },
      {
        title: 'Bağımsız Duruş:',
        body: 'Platform hiçbir siyasi, ticari ya da harici çıkar grubunun güdümünde değildir; topluluğun tek ortak paydası Karadeniz fırtınasıdır.',
      },
      {
        title: 'Ortak Sağduyu:',
        body: 'Her üye, yazdığı her cümlenin ve paylaştığı her analizin topluluğun editoryal saygınlığını yansıttığını kabul eder.',
      },
    ],
  },
  {
    id: 'kural-02',
    number: '02',
    tocLabel: 'Saygı',
    heading: 'Saygı & İletişim',
    items: [
      {
        title: 'Medeni Tartışma Kültürü:',
        body: 'Maç sonu yenilgi ya da galibiyet fark etmeksizin tüm taraftarlar birbirine ve kulüp emekçilerine karşı nezaket sınırlarını korur.',
      },
      {
        title: 'Nefret ve Hakarete Sıfır Tolerans:',
        body: 'Şahıslara, rakip camialara, etnik veya bölgesel kimliklere yönelik hakaret, küfür ve aşağılayıcı ifadeler derhal uzaklaştırma sebebidir.',
      },
      {
        title: 'Yapıcı Eleştiri:',
        body: 'Teknik heyet ve futbolcu performansları rasyonel veriler, sahadaki taktik gerçeklikler ve futbol aklıyla eleştirilmelidir.',
      },
    ],
  },
  {
    id: 'kural-03',
    number: '03',
    tocLabel: 'İçerik',
    heading: 'İçerik Kuralları',
    items: [
      {
        title: 'Özgünlük ve Editoryal Değer:',
        body: 'Paylaşılan taktik yazılar, maç analizleri ve köşe yazıları intihal içermemeli, taraftarın özgün emeğini yansıtmalıdır.',
      },
      {
        title: 'Kaynak Belirtme Zorunluluğu:',
        body: 'Transfer iddiaları, istatistiki veriler ve resmi açıklamalar paylaşılırken güvenilir kaynak açıkça belirtilmelidir.',
      },
      {
        title: 'Tıklama Tuzağı ve Spam Yasağı:',
        body: 'Yanıltıcı başlıklar (clickbait), ticari reklam bağlantıları ve tekrarlayan gönderiler platformdan süresiz kaldırılır.',
      },
    ],
  },
  {
    id: 'kural-04',
    number: '04',
    tocLabel: 'Hesap',
    heading: 'Hesap & Kimlik',
    items: [
      {
        title: 'Tek Kişi, Tek Hesap:',
        body: 'Her taraftar platformda tek bir profille temsil edilir; sahte kimliklerle açılan (troll/bot) hesaplar tespit edildiğinde doğrudan kapatılır.',
      },
      {
        title: 'Profil Bütünlüğü:',
        body: 'Profil fotoğraflarında, kullanıcı adlarında veya biyografilerde müstehcen, kışkırtıcı ya da Trabzonspor etiğiyle bağdaşmayan içerik kullanılamaz.',
      },
      {
        title: 'Hesap Güvenliği:',
        body: 'Giriş bilgilerinin ve oturum güvenliğinin korunması üyenin sorumluluğundadır.',
      },
    ],
  },
  {
    id: 'kural-05',
    number: '05',
    tocLabel: 'Moderasyon',
    heading: 'Moderasyon',
    items: [
      {
        title: 'Topluluk Denetimi:',
        body: 'Moderatörler ve editörler kural ihlallerini tespit ettiğinde uyarı, gönderi gizleme veya süreli/süresiz erişim kısıtlama yetkisine sahiptir.',
      },
      {
        title: 'Şeffaf İşlem Geçmişi:',
        body: 'Uygulanan yaptırımlar keyfi olmayıp, topluluk sicil protokolü çerçevesinde kayıt altına alınır.',
      },
      {
        title: 'İtiraz Hakkı:',
        body: "Kısıtlama uygulanan üyeler, 7 iş günü içerisinde Topluluk Yönetim Masası'na gerekçeli itirazda bulunabilir.",
      },
    ],
  },
  {
    id: 'kural-06',
    number: '06',
    tocLabel: 'Güvenlik',
    heading: 'Güvenlik & Gizlilik',
    items: [
      {
        title: 'Veri Mahremiyeti:',
        body: 'Üyelerin e-posta adresleri ve kişisel erişim kayıtları KVKK standartlarında korunur, üçüncü taraflarla paylaşılmaz.',
      },
      {
        title: 'Özel Mesajlaşma Güvenliği:',
        body: 'Üyeler arasındaki doğrudan iletişim kanalları taciz veya ticari teklif amacıyla kullanılamaz.',
      },
      {
        title: 'Parola Standartları:',
        body: 'Kullanıcı şifreleri tek yönlü güçlü kriptografik özetleme (hash) ile korunur; sistem yöneticileri dahi şifreleri göremez.',
      },
    ],
  },
  {
    id: 'kural-07',
    number: '07',
    tocLabel: 'Sorumluluk Reddi',
    heading: 'Sorumluluk Reddi (Bağımsız Topluluk)',
    fullWidth: true,
    items: [
      {
        title: 'Resmi Kulüp Bağlantısı:',
        body: "Trabzonly, Trabzonspor Kulübü Derneği'nin veya iştiraklerinin resmi internet sitesi değildir.",
      },
      {
        title: 'Fikirlerin Bağlayıcılığı:',
        body: 'Platformda üyeler ve köşe yazarları tarafından ifade edilen görüşler tamamen yazarların şahsi görüşleridir.',
      },
      {
        title: 'Logo ve Telif Hakları:',
        body: 'Trabzonspor markası ve tescilli armaları kulübün mülkiyetindedir; topluluk bağımsız taraftar kültürü çerçevesinde faaliyet gösterir.',
      },
    ],
  },
]
