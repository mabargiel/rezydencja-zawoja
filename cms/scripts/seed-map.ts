type Localized = { pl: string; en: string; de: string }
type Category = 'interiors' | 'spa' | 'terraceGarden' | 'surroundings'

export type PhotoSeed = { file: string; category: Category; alt: Localized }

export const photos: PhotoSeed[] = [
  {
    file: 'Ekspres.jpeg',
    category: 'interiors',
    alt: {
      pl: 'Ekspres do kawy i czajnik w kuchni z drewnianą zabudową',
      en: 'Coffee machine and kettle in a kitchen with wooden fittings',
      de: 'Kaffeevollautomat und Wasserkocher in einer Küche mit Holzeinbauten',
    },
  },
  {
    file: 'Grota3-1-480x650.jpg',
    category: 'spa',
    alt: {
      pl: 'Grota solna z leżakami i widokiem na góry przez przeszkloną ścianę',
      en: 'Salt grotto with deckchairs and a mountain view through a glass wall',
      de: 'Salzgrotte mit Liegestühlen und Bergblick durch eine Glaswand',
    },
  },
  {
    file: 'IMG_1798-480x650.jpg',
    category: 'spa',
    alt: {
      pl: 'Sala bilardowa z drewnianym stropem i żyrandolem',
      en: 'Billiard room with a wooden ceiling and a chandelier',
      de: 'Billardzimmer mit Holzdecke und Kronleuchter',
    },
  },
  {
    file: 'IMG_2239.jpg',
    category: 'spa',
    alt: {
      pl: 'Siłownia z rowerem stacjonarnym i bieżnią przy panoramicznym oknie z widokiem na góry',
      en: 'Gym with an exercise bike and a treadmill by a panoramic window overlooking the mountains',
      de: 'Fitnessraum mit Heimtrainer und Laufband an einem Panoramafenster mit Bergblick',
    },
  },
  {
    file: 'IMG_2660.jpg',
    category: 'terraceGarden',
    alt: {
      pl: 'Widok z balkonu na zielone pasma Beskidów w słoneczny dzień',
      en: 'View from the balcony over the green Beskid ranges on a sunny day',
      de: 'Blick vom Balkon auf die grünen Beskiden an einem sonnigen Tag',
    },
  },
  {
    file: 'IMG_2681.jpeg',
    category: 'terraceGarden',
    alt: {
      pl: 'Kwitnące hortensje i trawnik w ogrodzie z widokiem na góry',
      en: 'Hydrangeas in bloom and a lawn in the garden with a mountain view',
      de: 'Blühende Hortensien und Rasen im Garten mit Bergblick',
    },
  },
  {
    file: 'IMG_3178-480x650.jpeg',
    category: 'spa',
    alt: {
      pl: 'Wnętrze drewnianej sauny z cebrzykiem i ręcznikami',
      en: 'Inside the wooden sauna with a bucket and towels',
      de: 'In der Holzsauna mit Aufgusskübel und Handtüchern',
    },
  },
  {
    file: 'IMG_7886.jpeg',
    category: 'interiors',
    alt: {
      pl: 'Sypialnia na poddaszu z podwójnym łóżkiem, fotelem i nocnymi lampkami',
      en: 'Attic bedroom with a double bed, an armchair and bedside lamps',
      de: 'Schlafzimmer im Dachgeschoss mit Doppelbett, Sessel und Nachttischlampen',
    },
  },
  {
    file: 'IMG_8296.jpeg',
    category: 'terraceGarden',
    alt: {
      pl: 'Drewniany dom z bali o zmierzchu, z oświetlonym balkonem i balią',
      en: 'The log house at dusk, with a lit balcony and the hot tub',
      de: 'Das Blockhaus in der Abenddämmerung mit beleuchtetem Balkon und Badebottich',
    },
  },
  {
    file: 'Sypialnia406.jpg',
    category: 'interiors',
    alt: {
      pl: 'Sypialnia na poddaszu z łóżkiem, dywanem i oknem z zasłonami',
      en: 'Attic bedroom with a bed, a rug and a curtained window',
      de: 'Schlafzimmer im Dachgeschoss mit Bett, Teppich und Fenster mit Vorhängen',
    },
  },
  {
    file: 'apartament-zabytkowa-lampa2.jpg',
    category: 'interiors',
    alt: {
      pl: 'Zabytkowa lampa z frędzlami przy secesyjnym obrazie w stylu Muchy',
      en: 'Antique fringed lamp next to an Art Nouveau print in the style of Mucha',
      de: 'Antike Fransenlampe neben einem Jugendstilbild im Stil von Mucha',
    },
  },
  {
    file: 'apartament-zabytkowy-kredens5.jpg',
    category: 'interiors',
    alt: {
      pl: 'Zabytkowy kredens, kołowrotek i stół z koronkowym obrusem w drewnianym wnętrzu',
      en: 'Antique sideboard, spinning wheel and a table with a lace tablecloth in a wooden room',
      de: 'Antiker Küchenschrank, Spinnrad und Tisch mit Spitzendecke in einem Holzraum',
    },
  },
  {
    file: 'apartament-zabytkowy-kufer.jpeg',
    category: 'interiors',
    alt: {
      pl: 'Stary kufer podróżny z mosiężnymi okuciami',
      en: 'Old travel trunk with brass fittings',
      de: 'Alter Reisekoffer mit Messingbeschlägen',
    },
  },
  {
    file: 'babia-gora-trails.jpg',
    category: 'surroundings',
    alt: {
      pl: 'Rowerzysta na leśnym szlaku wśród wysokich świerków',
      en: 'Mountain biker on a forest trail among tall spruces',
      de: 'Mountainbiker auf einem Waldweg zwischen hohen Fichten',
    },
  },
  {
    file: 'bania-wieczorem.jpg',
    category: 'spa',
    alt: {
      pl: 'Gorąca bania przy domu wieczorem, pod oświetlonym balkonem',
      en: 'The hot tub beside the house in the evening, below the lit balcony',
      de: 'Der Badebottich am Haus am Abend, unter dem beleuchteten Balkon',
    },
  },
  {
    file: 'dom-noca1.jpeg',
    category: 'terraceGarden',
    alt: {
      pl: 'Rezydencja nocą, z rozświetlonymi oknami za rzędem tui',
      en: 'The residence at night, its windows lit behind a row of thujas',
      de: 'Die Residenz bei Nacht, beleuchtete Fenster hinter einer Reihe Thujen',
    },
  },
  {
    file: 'grill01.jpeg',
    category: 'terraceGarden',
    alt: {
      pl: 'Miejsce na grilla i ognisko z drewnianymi ławami i widokiem na góry',
      en: 'Barbecue and fire pit area with wooden benches and a mountain view',
      de: 'Grill- und Feuerstelle mit Holzbänken und Bergblick',
    },
  },
  {
    file: 'lazienka-pietro1.jpg',
    category: 'interiors',
    alt: {
      pl: 'Łazienka na piętrze z umywalką, lustrem i wiklinowymi koszami',
      en: 'Upstairs bathroom with a washbasin, a mirror and wicker baskets',
      de: 'Bad im Obergeschoss mit Waschbecken, Spiegel und Weidenkörben',
    },
  },
  {
    file: 'lazienkadolna1.jpeg',
    category: 'interiors',
    alt: {
      pl: 'Łazienka na parterze z drewnianą ławą i ciemnymi płytkami',
      en: 'Ground-floor bathroom with a wooden bench and dark tiles',
      de: 'Bad im Erdgeschoss mit Holzbank und dunklen Fliesen',
    },
  },
  {
    file: 'map-zawoja-2.png',
    category: 'surroundings',
    alt: {
      pl: 'Mapa okolic Zawoi',
      en: 'Map of the Zawoja area',
      de: 'Karte der Umgebung von Zawoja',
    },
  },
  {
    file: 'map-zawoja.png',
    category: 'surroundings',
    alt: {
      pl: 'Mapa Zawoi i okolicznych miejscowości',
      en: 'Map of Zawoja and the surrounding villages',
      de: 'Karte von Zawoja und den umliegenden Dörfern',
    },
  },
  {
    file: 'okolica-promo.jpeg',
    category: 'surroundings',
    alt: {
      pl: 'Tradycyjna drewniana chata góralska na łące',
      en: 'Traditional wooden highland cottage in a meadow',
      de: 'Traditionelle Holzhütte der Goralen auf einer Wiese',
    },
  },
  {
    file: 'salon-widok2-2048x1152.jpg',
    category: 'interiors',
    alt: {
      pl: 'Salon z kominkiem i przeszklonymi ścianami z widokiem na góry',
      en: 'Living room with a fireplace and glass walls overlooking the mountains',
      de: 'Wohnzimmer mit Kamin und Glaswänden mit Blick auf die Berge',
    },
  },
  {
    file: 'silownia2.jpeg',
    category: 'spa',
    alt: {
      pl: 'Siłownia z przeszkloną ścianą, bieżnią i workiem treningowym',
      en: 'Gym with a glass wall, a treadmill and a punching bag',
      de: 'Fitnessraum mit Glaswand, Laufband und Boxsack',
    },
  },
  {
    file: 'sypialnia2-dekoracja5.jpg',
    category: 'interiors',
    alt: {
      pl: 'Biała ceramiczna figurka jeźdźca na koniu na drewnianej półce',
      en: 'White ceramic figurine of a rider on horseback on a wooden shelf',
      de: 'Weiße Keramikfigur eines Reiters auf einem Holzregal',
    },
  },
  {
    file: 'sypialnia413.jpg',
    category: 'interiors',
    alt: {
      pl: 'Łóżko z pikowaną narzutą i drewniana szafka nocna z lampką',
      en: 'Bed with a quilted bedspread and a wooden bedside table with a lamp',
      de: 'Bett mit gesteppter Tagesdecke und Nachttisch aus Holz mit Lampe',
    },
  },
  {
    file: 'sypialnia513.jpeg',
    category: 'interiors',
    alt: {
      pl: 'Sypialnia z drewnianą komodą, dywanem i oknem z zasłonami',
      en: 'Bedroom with a wooden chest of drawers, a rug and a curtained window',
      de: 'Schlafzimmer mit Holzkommode, Teppich und Fenster mit Vorhängen',
    },
  },
  {
    file: 'taras-widokowy.jpeg',
    category: 'terraceGarden',
    alt: {
      pl: 'Zadaszony taras z wiszącym fotelem, stołem i widokiem na góry',
      en: 'Covered terrace with a hanging chair, a table and a mountain view',
      de: 'Überdachte Terrasse mit Hängesessel, Tisch und Bergblick',
    },
  },
  {
    file: 'wjazd3.jpeg',
    category: 'terraceGarden',
    alt: {
      pl: 'Drewniana brama wjazdowa z gontowym daszkiem',
      en: 'Wooden entrance gate with a shingle roof',
      de: 'Hölzernes Einfahrtstor mit Schindeldach',
    },
  },
  {
    file: 'wyciag-krzeselkowy.jpeg',
    category: 'surroundings',
    alt: {
      pl: 'Wyciąg krzesełkowy nad zielonym stokiem z widokiem na górskie pasmo',
      en: 'Chairlift above a green slope with a view of the mountain range',
      de: 'Sessellift über einem grünen Hang mit Blick auf die Bergkette',
    },
  },
  {
    file: 'zimowy-spacer3.jpg',
    category: 'surroundings',
    alt: {
      pl: 'Turysta na zaśnieżonym grzbiecie pod bezchmurnym niebem',
      en: 'Hiker on a snowy ridge under a clear sky',
      de: 'Wanderer auf einem verschneiten Bergrücken unter klarem Himmel',
    },
  },
  {
    file: 'zimowy-widok2-800x800.jpg',
    category: 'terraceGarden',
    alt: {
      pl: 'Rezydencja pod śniegiem, w zimowej scenerii Beskidów',
      en: 'The residence under snow in the winter Beskid landscape',
      de: 'Die Residenz im Schnee in der winterlichen Landschaft der Beskiden',
    },
  },
]

export const photoId = (file: string) =>
  `photo-${file
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')}`

export const layout = {
  homePage: {
    heroPoster: 'dom-noca1.jpeg',
    intro: { house: 'salon-widok2-2048x1152.jpg', detail: 'IMG_2681.jpeg' },
    spa: {
      saltGrotto: 'Grota3-1-480x650.jpg',
      hotTub: 'bania-wieczorem.jpg',
      sauna: 'IMG_3178-480x650.jpeg',
    },
    interiors: 'apartament-zabytkowy-kredens5.jpg',
    location: 'zimowy-widok2-800x800.jpg',
    galleryPreview: [
      'Sypialnia406.jpg',
      'IMG_1798-480x650.jpg',
      'taras-widokowy.jpeg',
      'zimowy-spacer3.jpg',
    ],
  },
  interiorsPage: {
    header: 'apartament-zabytkowy-kredens5.jpg',
    livingRoom: 'salon-widok2-2048x1152.jpg',
    antiques: 'apartament-zabytkowy-kredens5.jpg',
    bedrooms: 'Sypialnia406.jpg',
    comfort: 'lazienka-pietro1.jpg',
    relaxation: ['IMG_1798-480x650.jpg', 'silownia2.jpeg'],
    details: [
      'apartament-zabytkowa-lampa2.jpg',
      'Ekspres.jpeg',
      'apartament-zabytkowy-kufer.jpeg',
      'sypialnia2-dekoracja5.jpg',
    ],
  },
  surroundingsPage: {
    header: 'zimowy-widok2-800x800.jpg',
    babiaGora: 'zimowy-spacer3.jpg',
    slopes: 'wyciag-krzeselkowy.jpeg',
    trails: 'babia-gora-trails.jpg',
    waterfalls: 'okolica-promo.jpeg',
  },
  galleryPage: {
    header: 'salon-widok2-2048x1152.jpg',
    photos: [
      'salon-widok2-2048x1152.jpg',
      'Sypialnia406.jpg',
      'grill01.jpeg',
      'Ekspres.jpeg',
      'apartament-zabytkowy-kredens5.jpg',
      'lazienka-pietro1.jpg',
      'taras-widokowy.jpeg',
      'sypialnia513.jpeg',
      'Grota3-1-480x650.jpg',
      'IMG_1798-480x650.jpg',
      'zimowy-widok2-800x800.jpg',
      'apartament-zabytkowa-lampa2.jpg',
      'bania-wieczorem.jpg',
      'sypialnia2-dekoracja5.jpg',
      'IMG_3178-480x650.jpeg',
      'silownia2.jpeg',
    ],
  },
  contactPage: {
    header: 'dom-noca1.jpeg',
    map: 'map-zawoja-2.png',
  },
}

type Unit = 'night' | 'stay' | 'week' | 'weekend'

export const pricing: {
  year: number
  rates: {
    period: Localized
    minimumStay: Localized
    amount: number
    unit: Unit
    extraPerson: { amount: number; unit: Unit }
  }[]
  addOns: { name: Localized; note: Localized; amount: number; unit: Unit }[]
  facts: { label: Localized; value: Localized }[]
} = {
  year: 2026,
  rates: [
    {
      period: { pl: 'Standard', en: 'Standard', de: 'Standard' },
      minimumStay: { pl: 'minimum 3 noclegi', en: 'minimum 3 nights', de: 'mindestens 3 Nächte' },
      amount: 1500,
      unit: 'night',
      extraPerson: { amount: 150, unit: 'stay' },
    },
    {
      period: { pl: 'Tydzień', en: 'Week', de: 'Woche' },
      minimumStay: { pl: '7 noclegów', en: '7 nights', de: '7 Nächte' },
      amount: 8000,
      unit: 'week',
      extraPerson: { amount: 200, unit: 'week' },
    },
    {
      period: { pl: 'Weekend', en: 'Weekend', de: 'Wochenende' },
      minimumStay: {
        pl: 'od piątku do niedzieli',
        en: 'Friday to Sunday',
        de: 'Freitag bis Sonntag',
      },
      amount: 4000,
      unit: 'weekend',
      extraPerson: { amount: 200, unit: 'weekend' },
    },
    {
      period: {
        pl: 'Wakacje i ferie',
        en: 'Summer and winter school holidays',
        de: 'Sommer- und Winterferien',
      },
      minimumStay: { pl: 'minimum 5 noclegów', en: 'minimum 5 nights', de: 'mindestens 5 Nächte' },
      amount: 1500,
      unit: 'night',
      extraPerson: { amount: 200, unit: 'stay' },
    },
    {
      period: {
        pl: 'Tydzień w wakacje i ferie',
        en: 'Week during school holidays',
        de: 'Woche in den Ferien',
      },
      minimumStay: { pl: '7 noclegów', en: '7 nights', de: '7 Nächte' },
      amount: 8500,
      unit: 'week',
      extraPerson: { amount: 200, unit: 'week' },
    },
    {
      period: { pl: 'Święta wiosenne', en: 'Easter', de: 'Ostern' },
      minimumStay: { pl: 'minimum 4 noclegi', en: 'minimum 4 nights', de: 'mindestens 4 Nächte' },
      amount: 1800,
      unit: 'night',
      extraPerson: { amount: 150, unit: 'night' },
    },
    {
      period: {
        pl: 'Boże Narodzenie i Sylwester',
        en: "Christmas and New Year's Eve",
        de: 'Weihnachten und Silvester',
      },
      minimumStay: {
        pl: 'minimum 5 noclegów, 21.12 do 06.01',
        en: 'minimum 5 nights, 21.12 to 06.01',
        de: 'mindestens 5 Nächte, 21.12. bis 06.01.',
      },
      amount: 2500,
      unit: 'night',
      extraPerson: { amount: 200, unit: 'night' },
    },
  ],
  addOns: [
    {
      name: {
        pl: 'Gorąca bania z jacuzzi',
        en: 'Hot tub with jacuzzi',
        de: 'Badebottich mit Whirlpool',
      },
      note: {
        pl: 'opcja płatna dodatkowo',
        en: 'available at extra cost',
        de: 'gegen Aufpreis',
      },
      amount: 800,
      unit: 'stay',
    },
  ],
  facts: [
    {
      label: { pl: 'Doba wynajmu', en: 'Check-in and check-out', de: 'An- und Abreise' },
      value: {
        pl: 'od 16:00 w dniu przyjazdu do 10:00 w dniu wyjazdu',
        en: 'from 16:00 on arrival day to 10:00 on departure day',
        de: 'von 16:00 Uhr am Anreisetag bis 10:00 Uhr am Abreisetag',
      },
    },
    {
      label: { pl: 'Depozyt zwrotny', en: 'Refundable deposit', de: 'Rückzahlbare Kaution' },
      value: {
        pl: '1200 zł lub 300 EUR, zwrot do 3 dni po wyjeździe',
        en: 'PLN 1,200 or EUR 300, refunded within 3 days of departure',
        de: '1.200 PLN oder 300 EUR, Rückzahlung innerhalb von 3 Tagen nach Abreise',
      },
    },
    {
      label: { pl: 'Zwierzęta', en: 'Pets', de: 'Haustiere' },
      value: {
        pl: 'pieski i kotki są u nas mile widziane',
        en: 'dogs and cats are welcome',
        de: 'Hunde und Katzen sind willkommen',
      },
    },
    {
      label: { pl: 'Wi-Fi i parking', en: 'Wi-Fi and parking', de: 'WLAN und Parkplatz' },
      value: {
        pl: 'bezpłatne na terenie całej posiadłości',
        en: 'free throughout the property',
        de: 'kostenlos auf dem gesamten Grundstück',
      },
    },
  ],
}
