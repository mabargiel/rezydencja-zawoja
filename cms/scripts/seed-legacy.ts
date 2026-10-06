import { type Category, type Localized, photoId } from './localized'

export type LegacyPhoto = {
  id: string
  file: string
  category: Category
  alt: Localized
}

export const legacySource = 'https://rezydencjazawoja.pl/wp-content/uploads/2025/09/'

const interior = (id: string, file: string, pl: string, en: string, de: string): LegacyPhoto => ({
  alt: { de, en, pl },
  category: 'interiors',
  file,
  id: `photo-${id}`,
})

const spa = (id: string, file: string, pl: string, en: string, de: string): LegacyPhoto => ({
  ...interior(id, file, pl, en, de),
  category: 'spa',
})

export const legacyPhotos: LegacyPhoto[] = [
  interior(
    'salon-wide',
    'salon1.jpeg',
    'Salon z jadalnią i wypoczynkiem przy panoramicznych oknach',
    'Living and dining room by the panoramic windows',
    'Wohn- und Essbereich an den Panoramafenstern'
  ),
  interior(
    'salon-table-set',
    'stol-1024x768-1.jpg',
    'Nakryty stół z czerwonymi świecami przed zabytkowym kredensem',
    'Table set with red candles in front of an antique sideboard',
    'Gedeckter Tisch mit roten Kerzen vor einem antiken Buffet'
  ),
  interior(
    'salon-fireplace',
    'kominek11-1024x768-1.jpg',
    'Kamienny kominek z ogniem i kanapy w salonie',
    'Stone fireplace with a fire and sofas in the living room',
    'Steinkamin mit Feuer und Sofas im Wohnzimmer'
  ),
  interior(
    'salon-table-view',
    'Projekt-bez-nazwy-1.jpeg',
    'Nakryty stół przy oknie z widokiem na Beskidy',
    'A set table by the window with a view of the Beskids',
    'Gedeckter Tisch am Fenster mit Blick auf die Beskiden'
  ),
  interior(
    'salon-dinner',
    'IMG_1116-1-rotated-e1740758382884-851x1024-1.jpeg',
    'Stół nakryty do kolacji przed dębowym kredensem',
    'A table laid for dinner in front of an oak sideboard',
    'Zum Abendessen gedeckter Tisch vor einem Eichenbuffet'
  ),
  interior(
    'salon-dining',
    'IMG_7882-1024x768-1.jpeg',
    'Jadalnia z długim stołem, kredensem i telewizorem',
    'Dining area with a long table, a sideboard and a TV',
    'Essbereich mit langem Tisch, Buffet und Fernseher'
  ),
  interior(
    'salon-kitchen-open',
    'kuchnia-i-salon2.jpeg',
    'Kuchnia otwarta na salon z widokiem na góry',
    'The kitchen opening onto the living room with a mountain view',
    'Die zum Wohnzimmer offene Küche mit Bergblick'
  ),
  interior(
    'salon-winter-view',
    'zdj8-1-1024x594-—-kopia.jpg',
    'Zimowy widok na zaśnieżone Beskidy z okien salonu',
    'Winter view of the snowy Beskids from the living room windows',
    'Winterblick auf die verschneiten Beskiden aus den Wohnzimmerfenstern'
  ),
  interior(
    'salon-dining-room',
    'salon-jadalnia.jpeg',
    'Jadalnia ze stołem dla całej grupy i zabytkowymi meblami',
    'Dining room with a table for the whole group and antique furniture',
    'Esszimmer mit Tisch für die ganze Gruppe und antiken Möbeln'
  ),
  interior(
    'salon-autumn-view',
    'widok-Jesienia1-1-1024x768-1.jpg',
    'Jesienny widok na kolorowe lasy z okna salonu',
    'Autumn view of colourful forests from the living room window',
    'Herbstblick auf bunte Wälder aus dem Wohnzimmerfenster'
  ),
  interior(
    'salon-sideboard',
    'IMG_6445-1024x768-1.jpeg',
    'Rzeźbiony kredens z zastawą i samowarem',
    'A carved sideboard with tableware and a samovar',
    'Geschnitztes Buffet mit Geschirr und Samowar'
  ),
  interior(
    'salon-fireplace-detail',
    'kominek1-844x1024-1.jpg',
    'Kamienny kominek z płonącym ogniem',
    'Stone fireplace with a burning fire',
    'Steinkamin mit brennendem Feuer'
  ),
  interior(
    'salon-costume',
    'stroj-polski-1024x734-1.jpeg',
    'Dawny strój polski i secesyjny plakat Muchy na ścianie',
    'A historical Polish costume and an Art Nouveau Mucha poster',
    'Historische polnische Tracht und ein Jugendstilplakat von Mucha'
  ),
  interior(
    'salon-autumn-view-2',
    'widok-Jesienia3-1024x768-1.jpg',
    'Jesienne lasy i góry widziane z balkonu',
    'Autumn forests and mountains seen from the balcony',
    'Herbstwälder und Berge vom Balkon aus gesehen'
  ),
  interior(
    'kitchen-island',
    'IMG_7855-1-951x1024-1.jpeg',
    'Kuchnia z wyspą i zabytkowym kredensem',
    'Kitchen with an island and an antique dresser',
    'Küche mit Kochinsel und antikem Küchenschrank'
  ),
  interior(
    'kitchen-counter',
    'IMG_2512-1-768x1024-1.jpeg',
    'Blat kuchenny z płytą, piekarnikiem i ekspresem do kawy',
    'Kitchen counter with a hob, an oven and a coffee machine',
    'Küchenzeile mit Kochfeld, Backofen und Kaffeevollautomat'
  ),
  interior(
    'kitchen-hob',
    'IMG_0008-768x1024-1.jpeg',
    'Płyta indukcyjna, czajnik i ekspres pod okapem',
    'Induction hob, kettle and coffee machine under the hood',
    'Induktionskochfeld, Wasserkocher und Kaffeemaschine unter der Haube'
  ),
  interior(
    'kitchen-dresser',
    'IMG_1456-768x1024-1.jpeg',
    'Rzeźbiony dębowy kredens w kuchni',
    'A carved oak dresser in the kitchen',
    'Geschnitzter Eichenschrank in der Küche'
  ),
  interior(
    'apartament-sitting',
    'IMG_7901-1024x768-3.jpeg',
    'Apartament z salonikiem i sypialnią pod skosem dachu',
    'The apartment with its sitting area and bedroom under the roof slope',
    'Das Apartment mit Wohnbereich und Schlafzimmer unter der Dachschräge'
  ),
  interior(
    'apartament-bed',
    'IMG_8714-1024x768-1.jpeg',
    'Rzeźbione łóżko podwójne z poduszkami w apartamencie',
    'A carved double bed with cushions in the apartment',
    'Geschnitztes Doppelbett mit Kissen im Apartment'
  ),
  interior(
    'apartament-bedroom',
    'IMG_8715-1024x768-1.jpeg',
    'Sypialnia apartamentu z łóżkiem podwójnym i fotelem',
    'The apartment bedroom with a double bed and an armchair',
    'Das Schlafzimmer des Apartments mit Doppelbett und Sessel'
  ),
  interior(
    'apartament-lounge',
    'IMG_7897-1024x768-1.jpeg',
    'Salonik apartamentu z kanapą i koronkowym stolikiem',
    'The apartment sitting room with a sofa and a lace-covered table',
    'Der Wohnbereich des Apartments mit Sofa und Spitzentisch'
  ),
  interior(
    'bedroom-2-wardrobe',
    'IMG_8241-768x1024-1.jpeg',
    'Przeszklona zabytkowa witryna w sypialni',
    'An antique glazed cabinet in the bedroom',
    'Antike Vitrine im Schlafzimmer'
  ),
  interior(
    'bedroom-3-beds',
    'IMG_7921-1024x768-1.jpeg',
    'Sypialnia z dwoma pojedynczymi łóżkami pod skosem',
    'Bedroom with two single beds under the roof slope',
    'Schlafzimmer mit zwei Einzelbetten unter der Dachschräge'
  ),
  interior(
    'bedroom-3-room',
    'IMG_7922-1024x768-2.jpeg',
    'Sypialnia z komodą, lustrem i krzesłem',
    'Bedroom with a chest of drawers, a mirror and a chair',
    'Schlafzimmer mit Kommode, Spiegel und Stuhl'
  ),
  interior(
    'bedroom-3-pillows',
    'sypialnia3-poduszka-1024x605-2.jpg',
    'Haftowane poduszki na łóżku',
    'Embroidered cushions on the bed',
    'Bestickte Kissen auf dem Bett'
  ),
  interior(
    'bedroom-4-beds',
    'IMG_7919-1024x768-1.jpeg',
    'Sypialnia z dwoma pojedynczymi łóżkami i dywanem',
    'Bedroom with two single beds and a rug',
    'Schlafzimmer mit zwei Einzelbetten und Teppich'
  ),
  interior(
    'bedroom-4-dresser',
    'Sypialnia-4-komoda2-1024x768-1.jpg',
    'Zabytkowa komoda z lustrem w sypialni',
    'An antique dressing table with a mirror in the bedroom',
    'Antike Frisierkommode mit Spiegel im Schlafzimmer'
  ),
  interior(
    'bedroom-4-window',
    'IMG_0307-768x1024-2.jpeg',
    'Łóżko pod oknem dachowym z lampką nocną',
    'A bed under a skylight with a bedside lamp',
    'Bett unter einem Dachfenster mit Nachttischlampe'
  ),
  interior(
    'bedroom-5-bed',
    'IMG_7939-1024x768-1.jpeg',
    'Rzeźbione łóżko podwójne z poduszkami',
    'A carved double bed with cushions',
    'Geschnitztes Doppelbett mit Kissen'
  ),
  spa(
    'recreation-lounge',
    'IMG_2226.1-1024x689-1.jpg',
    'Fotele i stolik z grami w pokoju bilardowym',
    'Armchairs and a games table in the billiard room',
    'Sessel und Spieltisch im Billardzimmer'
  ),
  spa(
    'recreation-trophies',
    'IMG_8735-768x1024-1.jpeg',
    'Myśliwskie trofea i skóra dzika w pokoju bilardowym',
    'Hunting trophies and a boar skin in the billiard room',
    'Jagdtrophäen und ein Wildschweinfell im Billardzimmer'
  ),
  spa(
    'recreation-corner',
    'IMG_2228-1-1024x768-1.jpg',
    'Kącik z telewizorem, akordeonem i fotelem przy stole bilardowym',
    'A corner with a TV, an accordion and an armchair by the billiard table',
    'Ecke mit Fernseher, Akkordeon und Sessel am Billardtisch'
  ),
  spa(
    'recreation-billiards',
    'IMG_2237-2-1024x768-1.jpg',
    'Stół bilardowy w pokoju w stylu myśliwskim',
    'A billiard table in the hunting-style room',
    'Billardtisch im Zimmer im Jagdstil'
  ),
  spa(
    'recreation-relax-room',
    'silownia05-1024x620-1.jpg',
    'Strefa wypoczynku z kanapą i telewizorem',
    'Lounge area with a sofa and a TV',
    'Ruhebereich mit Sofa und Fernseher'
  ),
  interior(
    'bathroom-bath',
    'lazienkadolna.0-1024x768-1.jpg',
    'Łazienka z wanną i umywalką na dolnym poziomie',
    'Bathroom with a bathtub and a washbasin on the lower level',
    'Bad mit Badewanne und Waschbecken im Untergeschoss'
  ),
  interior(
    'bathroom-ground-floor',
    'lazienkaparter-768x1024-1.jpeg',
    'Łazienka na parterze z drewnianą szafką',
    'Ground-floor bathroom with a wooden cabinet',
    'Bad im Erdgeschoss mit Holzschrank'
  ),
  interior(
    'bathroom-upstairs',
    'IMG_8706-768x1024-1.jpeg',
    'Łazienka na piętrze z ręcznikami na regale',
    'Upstairs bathroom with towels on a shelf',
    'Bad im Obergeschoss mit Handtüchern im Regal'
  ),
  interior(
    'bathroom-bath-sauna',
    'lazienkadolna4-1024x768-1.jpg',
    'Łazienka z wanną i wejściem do sauny',
    'Bathroom with a bathtub and the sauna entrance',
    'Bad mit Badewanne und Saunaeingang'
  ),
  interior(
    'bathroom-toilet',
    'lazienkadolna2-768x1024-1.jpeg',
    'Toaleta z ciemnymi płytkami',
    'Toilet with dark tiles',
    'Toilette mit dunklen Fliesen'
  ),
  interior(
    'bathroom-shower',
    'Prysznic1-768x1024-1.jpg',
    'Kabina prysznicowa z deszczownicą',
    'Walk-in shower with a rain shower head',
    'Dusche mit Regenbrause'
  ),
  interior(
    'bathroom-laundry',
    'pralka.jpg',
    'Pralka i lodówka w pomieszczeniu gospodarczym',
    'Washing machine and fridge in the utility room',
    'Waschmaschine und Kühlschrank im Hauswirtschaftsraum'
  ),
]

const legacyId = (id: string) => `photo-${id}`

export const roomsLayout: { type: string; photos: string[] }[] = [
  {
    type: 'salon',
    photos: [
      photoId('salon-widok2-2048x1152.jpg'),
      ...[
        'salon-fireplace',
        'salon-wide',
        'salon-dining',
        'salon-kitchen-open',
        'salon-table-view',
        'salon-dining-room',
        'salon-fireplace-detail',
        'salon-autumn-view',
        'salon-winter-view',
        'salon-sideboard',
        'salon-table-set',
        'salon-dinner',
        'salon-costume',
        'salon-autumn-view-2',
      ].map(legacyId),
    ],
  },
  {
    type: 'kitchen',
    photos: ['kitchen-island', 'kitchen-counter', 'kitchen-hob', 'kitchen-dresser'].map(legacyId),
  },
  {
    type: 'bedrooms',
    photos: [
      'apartament-sitting',
      'apartament-bed',
      'bedroom-3-beds',
      'bedroom-4-beds',
      'bedroom-5-bed',
    ].map(legacyId),
  },
  {
    type: 'recreation',
    photos: [
      photoId('IMG_1798-480x650.jpg'),
      legacyId('recreation-billiards'),
      legacyId('recreation-trophies'),
      legacyId('recreation-corner'),
      legacyId('recreation-lounge'),
      photoId('IMG_2239.jpg'),
      photoId('silownia2.jpeg'),
      legacyId('recreation-relax-room'),
    ],
  },
  {
    type: 'bathrooms',
    photos: [
      legacyId('bathroom-bath'),
      photoId('lazienka-pietro1.jpg'),
      legacyId('bathroom-ground-floor'),
      legacyId('bathroom-upstairs'),
      legacyId('bathroom-bath-sauna'),
      photoId('lazienkadolna1.jpeg'),
      legacyId('bathroom-shower'),
      legacyId('bathroom-toilet'),
      legacyId('bathroom-laundry'),
    ],
  },
]

export const bedroomsLayout: {
  name: Localized
  beds: Localized
  guests: number
  photos: string[]
}[] = [
  {
    beds: {
      de: 'Wohnbereich und Schlafzimmer mit Doppelbett, TV',
      en: 'Sitting room and a bedroom with a double bed, TV',
      pl: 'Salonik i sypialnia z łóżkiem podwójnym, TV',
    },
    guests: 2,
    name: { de: 'Apartment', en: 'Apartment', pl: 'Apartament' },
    photos: [
      legacyId('apartament-sitting'),
      legacyId('apartament-bed'),
      legacyId('apartament-lounge'),
      legacyId('apartament-bedroom'),
      photoId('apartament-zabytkowy-kredens5.jpg'),
      photoId('apartament-zabytkowa-lampa2.jpg'),
      photoId('apartament-zabytkowy-kufer.jpeg'),
    ],
  },
  {
    beds: { de: 'Doppelbett, TV', en: 'Double bed, TV', pl: 'Łóżko podwójne, TV' },
    guests: 2,
    name: { de: 'Schlafzimmer 2', en: 'Bedroom 2', pl: 'Sypialnia 2' },
    photos: [
      photoId('IMG_7886.jpeg'),
      legacyId('bedroom-2-wardrobe'),
      photoId('sypialnia2-dekoracja5.jpg'),
    ],
  },
  {
    beds: { de: 'Zwei Einzelbetten', en: 'Two single beds', pl: 'Dwa łóżka pojedyncze' },
    guests: 2,
    name: { de: 'Schlafzimmer 3', en: 'Bedroom 3', pl: 'Sypialnia 3' },
    photos: ['bedroom-3-beds', 'bedroom-3-room', 'bedroom-3-pillows'].map(legacyId),
  },
  {
    beds: { de: 'Zwei Einzelbetten', en: 'Two single beds', pl: 'Dwa łóżka pojedyncze' },
    guests: 2,
    name: { de: 'Schlafzimmer 4', en: 'Bedroom 4', pl: 'Sypialnia 4' },
    photos: [
      legacyId('bedroom-4-beds'),
      legacyId('bedroom-4-dresser'),
      photoId('Sypialnia406.jpg'),
      legacyId('bedroom-4-window'),
    ],
  },
  {
    beds: { de: 'Doppelbett, TV', en: 'Double bed, TV', pl: 'Łóżko podwójne, TV' },
    guests: 2,
    name: { de: 'Schlafzimmer 5', en: 'Bedroom 5', pl: 'Sypialnia 5' },
    photos: [legacyId('bedroom-5-bed'), photoId('sypialnia513.jpeg')],
  },
]
