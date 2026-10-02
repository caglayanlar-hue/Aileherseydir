import { Activity, Story, TaskItem } from '../types';

export const LOVE_WORDS = [
  "Seninle vakit geçirmek günümün en güzel anı.",
  "Fikrin benim için çok değerli, iyi ki bizimlesin ve paylaştın.",
  "Bu konuda gösterdiğin çabayı ve emeği görüyor, gönülden takdir ediyorum.",
  "İyi ki bizim ailemizdensin, seninle evimiz daha huzurlu.",
  "Bugün sana nasıl destek olabilirim veya yükünü nasıl hafifletebilirim?",
  "Varlığın ve tebessümün bana daima güven ve huzur veriyor.",
  "Hatalarımız da bizim, önemli olan her koşulda birbirimizin elini tutabilmemiz.",
  "Bugün seninle gurur duydum, iyi ki varsın."
];

export const ACTIVITIES_DATA: Activity[] = [
  {
    id: 'act-1',
    title: "Duygu Pandomimi (Sessiz Sinema)",
    day: "Pazartesi",
    category: "Oyun",
    duration: "15 Dk",
    iconName: "Drama",
    desc: "Küçük kağıtlara 'mutlu, üzgün, kızgın, şaşırmış, korkmuş, gururlu, kıskanç, heyecanlı' gibi duygular yazın. Sırayla kağıt çekip, konuşmadan sadece mimik ve beden diliyle o duyguyu anlatmaya çalışın.",
    rules: [
      "Her oyuncunun anlatmak için 1 dakikası vardır.",
      "Ses çıkarmak ve dudak okutmak yasaktır.",
      "En çok doğru tahmin eden kişi 'Duygu Dedektifi' unvanını alır."
    ],
    benefit: "Sözel olmayan ipuçlarıyla duyguları tanıma ve ifade etme becerisini geliştirir. Duygularını konuşmakta zorlanan çocuklar ve yetişkinler için harika bir köprüdür."
  },
  {
    id: 'act-2',
    title: "Günün En'leri Masası",
    day: "Salı",
    category: "Sohbet",
    duration: "10 Dk",
    iconName: "Sparkles",
    desc: "Akşam yemeğinde veya çay saatinde herkes sırayla gününün 'En komik', 'En zor' ve 'En gurur verici' anını paylaşır.",
    rules: [
      "Konuşan kişinin sözü asla kesilmez, tam dikkatle dinlenir.",
      "Yargılamak, eleştirmek veya akıl vermek yasaktır; sadece şefkatle dinlenir.",
      "Gönüllü olmayan zorlanmaz, bir sonraki tura kadar pas diyebilir."
    ],
    benefit: "Aile üyelerinin birbirlerinin günlük yaşantılarından haberdar olmasını sağlar, empatiyi ve güvenli paylaşım alanını güçlendirir."
  },
  {
    id: 'act-3',
    title: "Birlikte Mutfak Zamanı",
    day: "Çarşamba",
    category: "Etkinlik",
    duration: "45 Dk",
    iconName: "Utensils",
    desc: "Ailecek kolay bir tarif (örneğin kurabiye, el yapımı pizza veya kek) seçin ve mutfakta iş bölümü yaparak birlikte hazırlayın.",
    rules: [
      "Herkesin yeteneğine uygun bir görevi olmalı (çırpma, dökme, şekil verme, servis).",
      "Mutfak biraz kirlenebilir, temizlik de aynı keyifle ortaklaşa yapılmalıdır.",
      "Eğlenmek ve bir arada olmak esastır, mükemmel şekilli tarifler şart değildir."
    ],
    benefit: "İşbirliği ve takım çalışması becerilerini pekiştirir. Birlikte emek verip üretmenin lezzetini ve hazzını yaşatır."
  },
  {
    id: 'act-4',
    title: "Ev İçi Hazine Avı",
    day: "Perşembe",
    category: "Oyun",
    duration: "30 Dk",
    iconName: "MapPin",
    desc: "Evin farklı köşelerine küçük ipuçları veya bilmeceler saklayın. Her ipucu bir sonrakini göstersin ve finalde ailecek paylaşılacak küçük bir sürpriz olsun.",
    rules: [
      "İpuçları evin güvenli bölgelerine yerleştirilmelidir.",
      "Büyükler küçükler için, çocuklar da ebeveynleri için ipucu hazırlayabilir.",
      "İpuçlarını çözerken işbirliği yapmak teşvik edilir."
    ],
    benefit: "Problem çözme yeteneğini ve analitik düşünmeyi eğlenceli, hareketli bir yöntemle destekler."
  },
  {
    id: 'act-5',
    title: "Aile Albümü ve Hatıra Saati",
    day: "Cuma",
    category: "Sohbet",
    duration: "20 Dk",
    iconName: "Image",
    desc: "Eski fotoğraf albümlerini veya telefonlardaki aile arşivini açın. Anne, baba veya büyükanne/büyükbabanın çocukluk yıllarına ait anıları konuşun.",
    rules: [
      "Herkes bir fotoğraf seçip onunla ilgili bir anı, his veya merak ettiği bir detayı paylaşsın.",
      "Çocuklar o dönemin yaşamı, oyunları ve okulları hakkında sorular sorsun."
    ],
    benefit: "Kuşaklar arası bağı perçinler, köklenme hissi verir. Ailenin geçmişini ve hikayesini öğrenmek çocuklara derin bir aidiyet ve özgüven aşılar."
  },
  {
    id: 'act-6',
    title: "Ev Yapımı Sinema & Muhabbet Gecesi",
    day: "Cumartesi",
    category: "Etkinlik",
    duration: "120 Dk",
    iconName: "Film",
    desc: "Ailecek izlenecek ortak bir film seçin. Ortamı sinema salonuna çevirin (ışıkları kısın, sembolik biletler hazırlayın, sıcak patlamış mısır veya ıhlamur yapın).",
    rules: [
      "Film seçimi demokratik oylamayla ortak kararla yapılmalıdır.",
      "Film esnasında telefon, tablet gibi ikinci ekranlar tamamen kapatılır.",
      "Film bittikten sonra 10 dakika 'En etkilendiğimiz sahne ve karakterin seçimi' üzerine konuşulur."
    ],
    benefit: "Ortak kültürel zemin oluşturur. Karakterler üzerinden değerler eğitimi ve eleştirel düşünmeyi sohbet ortamına taşır."
  },
  {
    id: 'act-7',
    title: "Sessiz Okuma ve Çay Saati",
    day: "Pazar",
    category: "Etkinlik",
    duration: "30 Dk",
    iconName: "BookOpen",
    desc: "Televizyon ve telefonları kapatın. Herkes kendi kitabını veya dergisini alsın. Hafif bir müzik veya çıtırdayan çay sesi eşliğinde sessiz okuma saati yapın.",
    rules: [
      "Süre bitene kadar teknolojik aletlere bakılmaz, evde huzurlu bir sessizlik korunur.",
      "Süre bitiminde herkes okuduğu bölümden altını çizdiği veya ilginç bulduğu bir cümleyi paylaşır."
    ],
    benefit: "Okuma sevgisini rol model olarak kazandırır. Birlikte sessizliği ve dinginliği paylaşabilmek ailedeki duygusal regülasyonu yükseltir."
  }
];

export const STORIES_DATA: Story[] = [
  {
    id: 'story-foreword',
    title: "Önsöz",
    author: "Hümeyra EKMEN",
    content: `
      <p class="mb-4">Kıymetli aileler,</p>
      <p class="mb-4"><strong>"Aile Dediğin"</strong> kitabı, öğrencilerimizin tertemiz yüreklerinden süzülen, aile olmanın sıcaklığını, zorluklarını ve eşsiz güzelliklerini anlatan samimi hikayelerden oluşuyor. Bu kitap sadece okunup bir kenara konulmak için değil; üzerinde konuşulmak, birbirimizin gözlerinin içine bakmak, iç dünyamızı anlamak ve bağlarımızı güçlendirmek için hazırlandı.</p>
      <p class="mb-4">Modern çağın telaşına ve dijital ekranların kalabalığına kapılıp birbirimize vakit ayıramadığımız şu günlerde, bu kitaptaki her bir hikaye, kendi ailenizden bir parça bulabileceğiniz sıcacık bir ayna niteliğindedir. Bir hikayede kendi çocukluğunuza uzanacak, diğerinde evlatlarınızın dünyasına yepyeni bir pencere açacaksınız.</p>
      <p class="mb-4">Sizlerden istirhamımız; bu portalı rehber olarak kullanırken hikayeleri ailecek, göz teması kurarak, televizyonu ve telefonları bir kenara bırakıp <strong>kitabınızdan</strong> birlikte okumanızdır. Ardından burada hazırladığımız "Aile Sohbeti Gündemi" ve "Üzerine Düşünelim" başlıklarıyla muhabbeti derinleştirin.</p>
      <p class="mt-6 italic text-slate-700">İletişiminizin, muhabbetinizin ve sevginizin daim olması dileğiyle... Keyifli okumalar ve sıcacık aile meclisleri dilerim.</p>
    `,
    questions: [],
    chatTopic: ""
  },
  {
    id: 'story-miras',
    title: "Mirasın Gerçek Sahibi",
    author: "Ertuğrul ERDEM",
    content: `
      <div class="rounded-2xl border border-amber-200/80 bg-amber-50/70 p-6 md:p-8 text-center my-4">
        <div class="w-12 h-12 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-700 mb-3 font-serif font-bold text-xl">📖</div>
        <h3 class="text-xl font-bold font-serif text-amber-950 mb-2">Okuma Zamanı</h3>
        <p class="text-amber-800 text-base max-w-xl mx-auto leading-relaxed">
          Lütfen <strong>"Mirasın Gerçek Sahibi"</strong> adlı hikayeyi <strong>Aile Dediğin</strong> kitabınızdan ailecek okuyunuz. Okuma tamamlandıktan sonra aşağıdaki sorular üzerine keyifli bir aile sohbeti başlatabilirsiniz.
        </p>
      </div>
    `,
    questions: [
      "Sizce teknoloji ve ekranlar, aile mirasını, geleneklerini ve geçmiş anıları bize unutturuyor olabilir mi? Neden?",
      "Evimizde büyüklerimizden (dedelerimiz, ninelerimiz) kalan; maddi değeri olmasa da manevi değeri bizim için çok yüksek olan hangi eşyalar veya hatıralar var?",
      "Hikayedeki çoban kaftanı neden satmadı? Sizin ve ailemiz için asla parayla ölçülemeyecek değerler nelerdir?"
    ],
    chatTopic: "Aile yadigarları, geçmişten günümüze taşıdığımız manevi değerler ve hatıraların aile ruhundaki yeri."
  },
  {
    id: 'story-pazar',
    title: "Keşke Her Gün Pazar Olsa",
    author: "Büşra ERYİĞİT",
    content: `
      <div class="rounded-2xl border border-amber-200/80 bg-amber-50/70 p-6 md:p-8 text-center my-4">
        <div class="w-12 h-12 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-700 mb-3 font-serif font-bold text-xl">☕</div>
        <h3 class="text-xl font-bold font-serif text-amber-950 mb-2">Okuma Zamanı</h3>
        <p class="text-amber-800 text-base max-w-xl mx-auto leading-relaxed">
          Lütfen <strong>"Keşke Her Gün Pazar Olsa"</strong> adlı hikayeyi <strong>Aile Dediğin</strong> kitabınızdan ailecek okuyunuz. Ardından haftalık tempomuzu ve aile zamanımızı değerlendirelim.
        </p>
      </div>
    `,
    questions: [
      "Hafta içi koşturmacasında birbirimize daha fazla vakit ayırmak için günlük rutinlerimizde ne gibi küçük ama etkili değişiklikler yapabiliriz?",
      "Sizin evinizde veya hayatınızda 'Keşke her gün o gün olsa' dediğiniz özel bir gün, saat veya ritüel var mı?",
      "Ailecek birlikte yaptığımız ve hepinizin yüzünü güldüren favori pazar günü etkinliğimiz nedir?"
    ],
    chatTopic: "Hızla akıp giden hayatın içinde ailemize bilinçli ve kesintisiz 'nitelikli zaman' ayırmanın yolları."
  },
  {
    id: 'story-saat',
    title: "Duvardaki Saat",
    author: "Eslem Beyza EKMEN",
    content: `
      <div class="rounded-2xl border border-amber-200/80 bg-amber-50/70 p-6 md:p-8 text-center my-4">
        <div class="w-12 h-12 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-700 mb-3 font-serif font-bold text-xl">⏳</div>
        <h3 class="text-xl font-bold font-serif text-amber-950 mb-2">Okuma Zamanı</h3>
        <p class="text-amber-800 text-base max-w-xl mx-auto leading-relaxed">
          Lütfen <strong>"Duvardaki Saat"</strong> adlı hikayeyi <strong>Aile Dediğin</strong> kitabınızdan ailecek okuyunuz. Hikaye sonrasında zaman yönetimi ve iletişimimizi konuşalım.
        </p>
      </div>
    `,
    questions: [
      "Evinizde birlikte vakit geçirirken zamanın nasıl aktığını unuttuğunuz anlar hangileridir? Böyle anları nasıl çoğaltabiliriz?",
      "Hikayede saat neden durmuş olabilir? Aile içi bağların zayıflaması veya suskunluk bir evin atmosferini nasıl etkiler?",
      "Telefon ve televizyon kullanımını evimizde dengede tutmak için ailecek uygulayabileceğimiz 'ekransız saatler' kuralı koyabilir miyiz?"
    ],
    chatTopic: "Teknolojinin aile içi iletişimi bölmesine izin vermemek ve evde 'ekransız ortak zamanlar' oluşturmak."
  },
  {
    id: 'story-hasret',
    title: "Zaman Yolculuğu ve Aile Hasreti",
    author: "Sahra KARAKAYA",
    content: `
      <div class="rounded-2xl border border-amber-200/80 bg-amber-50/70 p-6 md:p-8 text-center my-4">
        <div class="w-12 h-12 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-700 mb-3 font-serif font-bold text-xl">🕰️</div>
        <h3 class="text-xl font-bold font-serif text-amber-950 mb-2">Okuma Zamanı</h3>
        <p class="text-amber-800 text-base max-w-xl mx-auto leading-relaxed">
          Lütfen <strong>"Zaman Yolculuğu ve Aile Hasreti"</strong> adlı hikayeyi <strong>Aile Dediğin</strong> kitabınızdan ailecek okuyunuz. Ardından geleceğe güzel anılar bırakmak üzerine düşünelim.
        </p>
      </div>
    `,
    questions: [
      "Elinizde bir zaman makinesi olsaydı, ailenizle birlikte yaşadığınız hangi mutlu ve huzurlu güne geri dönmek isterdiniz?",
      "Birbirimizin kıymetini sadece özel günlerde değil, bugünün sıradan anlarında da hissettirmek için bugün birbirimize ne söylemek istersiniz?",
      "Gelecekte 'İyi ki o günleri doya doya yaşamışız' diyeceğimiz tatlı hatıralar biriktirmek için bu hafta sonu ne yapalım?"
    ],
    chatTopic: "Anı yaşamak, sahip olduklarımızın şükrünü ve kıymetini bilmek, sevgi sözcüklerini ertelememek."
  }
];

export const INITIAL_TASKS: TaskItem[] = [
  {
    id: 't-1',
    text: "Akşam yemeği sonrası sofrayı birlikte toplamak",
    assignees: [],
    done: false,
    createdAt: Date.now() - 100000
  },
  {
    id: 't-2',
    text: "Pazar sabahı kahvaltısını hep beraber hazırlamak",
    assignees: [],
    done: false,
    createdAt: Date.now() - 50000
  },
  {
    id: 't-3',
    text: "Haftalık aile toplantısı için çay ve kurabiyeleri hazırlamak",
    assignees: [],
    done: true,
    createdAt: Date.now() - 20000
  }
];

export const PRESET_CONFLICT_SCENARIOS = [
  {
    id: 'sc-1',
    title: 'Dağınık Oda / Eşyalar',
    behavior: 'Kıyafetlerin ve eşyaların odanın ortasında günlerce dağınık kaldığında',
    feeling: 'yorulmuş ve evin düzenini tek başıma sırtlamış hissediyorum',
    request: 'Kıyafetlerini akşamları dolaba yerleştirmene ve odanı toplamana yardımcı olabilir miyim?'
  },
  {
    id: 'sc-2',
    title: 'Sözün Kesilmesi',
    behavior: 'Bir konuyu anlatırken sözüm birden kesildiğinde',
    feeling: 'fikirlerimin önemsenmediğini hissediyor ve üzülüyorum',
    request: 'Lütfen cümlemi bitirene kadar dinleyip ardından kendi düşünceni paylaşır mısın?'
  },
  {
    id: 'sc-3',
    title: 'Yemekte Telefon Kullanımı',
    behavior: 'Sofradayken sürekli ekrana bakıldığında',
    feeling: 'birbirimizden kopuk olduğumuzu hissediyor ve bu ortak anı kaçırdığımız için üzülüyorum',
    request: 'Yemek boyunca telefonları sehpanın üzerine bırakıp günümüzü konuşabilir miyiz?'
  },
  {
    id: 'sc-4',
    title: 'Kapıyı Çalmadan Girme',
    behavior: 'Odamın kapısı çalınmadan içeri girildiğinde',
    feeling: 'mahremiyetime saygı duyulmadığını düşünüp tedirgin oluyorum',
    request: 'Girmeden önce kapıyı tıklatıp yanıtımı beklemeni rica ediyorum.'
  }
];
