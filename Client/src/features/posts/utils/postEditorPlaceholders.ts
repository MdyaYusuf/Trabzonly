export type EditorCategoryId =
  | 'taktik'
  | 'mac'
  | 'transfer'
  | 'tribun'
  | 'tarih'
  | 'serbest'

export const editorCategories: { id: EditorCategoryId; label: string }[] = [
  { id: 'taktik', label: 'Taktik & Analiz' },
  { id: 'mac', label: 'Maç Değerlendirmesi' },
  { id: 'transfer', label: 'Transfer & Kadro' },
  { id: 'tribun', label: 'Tribün & Deplasman Hikayesi' },
  { id: 'tarih', label: 'Tarihçe & Efsaneler' },
  { id: 'serbest', label: 'Serbest Kürsü (Görüş / Yorum)' },
]

export const defaultEditorDraft = {
  title: "Akyazı'da Çift Forvet Presi: Banza ve Drăguș Birlikte Nasıl Oynamalı?",
  categoryId: 'taktik' as EditorCategoryId,
  tagsInput: '#Trabzonspor, #Akyazı, #Banza, #TaktikTahtası',
  summary:
    "Süper Lig'in sertleşen fikstüründe ön alan baskısını simetrik kurmak adına Simon Banza ve Denis Drăguș ikilisinin birlikte üretkenliği masaya yatırılıyor.",
  body: `Karadeniz Fırtınası son haftalarda iç sahada kurduğu yüksek yoğunluklu ön alan baskısıyla dikkat çekiyor. Özellikle Papara Park zemininde oynanan maçlarda rakip stoperlerin pas koridorlarını kapatmak, hücum hattımızın birinci önceliği haline geldi.

Simon Banza'nın sırtı dönük top saklama kabiliyeti ve ceza sahası içindeki fiziki hakimiyeti, Denis Drăguș'un kanat forvet olarak içe kat ettiği anlarda muazzam bir alan yaratıyor. Drăguș merkezdeki boşlukları kullanırken, arkasından bindiren sol bekin açtığı koridorlar Trabzonspor'un akın zenginliğini katlıyor.

📋 TAKTİK DÖKÜMÜ VE KİLİT NOKTALAR:
• 1. Bölge pres geçişinde 4-4-2 asimetrik yerleşim
• Rakip 6 numaraya yapılan gölge markajı
• İkinci topların toplanma süresinin 3.2 saniyeye çekilmesi

Orta alandaki direncin korunması durumunda bu kurgu, Akyazı'da oynanacak derbi maçlarında en önemli hücum kozumuz olacaktır. Tribünlerin desteğiyle ilk 20 dakikadaki boğucu baskı skoru lehimize çevirmek için kilit role sahip.`,
  coverImageUrl: '/assets/posts/post-editor-cover.png',
  coverFileName: 'post-editor-cover.png',
  coverMeta: '1280 x 720 px • PNG Kapak Görseli',
  draftId: 'TASLAK #61-EDT',
}

export const editorGuidelines = [
  {
    title: 'Küfürsüz Bordo-Mavi Sevda',
    body: 'Hakaret, küfür veya rakip taraftarlara yönelik nefret dili barındıran içerikler doğrudan reddedilir.',
  },
  {
    title: 'Teyitli Bilgi & Transfer',
    body: 'Asılsız dedikodular yerine güvenilir kaynaklara dayanan transfer ve kulüp haberlerine öncelik verilir.',
  },
  {
    title: 'Yapıcı Taktik Eleştiri',
    body: 'Teknik heyet ve futbolculara dönük yapıcı, veri ve gözlem odaklı taktik değerlendirmeler teşvik edilir.',
  },
]

export const featureTips = [
  'Göz alıcı ve yüksek çözünürlüklü bir kapak görseli ekleyin.',
  'Taktik notları, rakip analizi ve istatistiklerle metninizi zenginleştirin.',
  'En az 200 kelimelik doyurucu ve akıcı bir Karadeniz futbolu yazısı kurgulayın.',
]
