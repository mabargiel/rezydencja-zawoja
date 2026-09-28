import type { Messages } from '../types'

export const en = {
  meta: {
    siteName: 'Rezydencja Zawoja',
    home: {
      title: 'Rezydencja Zawoja · A private mountain house',
      description:
        'An exclusive-use luxury residence in Zawoja, at the foot of Babia Góra. A log house with a spa area and Beskid mountain views for up to 10 guests.',
    },
    interiors: {
      title: 'Interiors',
      description:
        'A log house with antique furniture and five bedrooms. Explore the interiors of Rezydencja Zawoja room by room.',
    },
    surroundings: {
      title: 'Surroundings',
      description:
        'Babia Góra, ski slopes, hiking trails and waterfalls. What to do in and around Zawoja.',
    },
    gallery: {
      title: 'Gallery',
      description:
        'Photos of Rezydencja Zawoja: interiors, spa area, terrace, garden and views of Babia Góra.',
    },
    contact: {
      title: 'Contact',
      description: 'Ask about availability at Rezydencja Zawoja. We reply the same day.',
    },
  },
  nav: {
    label: 'Main navigation',
    homeLink: 'Rezydencja Zawoja, home page',
    home: 'Home',
    interiors: 'Interiors',
    surroundings: 'Surroundings',
    gallery: 'Gallery',
    pricing: 'Prices',
    contact: 'Contact',
    book: 'Book',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
  },
  footer: {
    label: 'Footer',
    navigation: 'Footer navigation',
    address: 'Zawoja, Beskid Mountains, at the foot of Babia Góra',
    copyright: '© {{year}} Rezydencja Zawoja. All rights reserved.',
  },
  home: {
    hero: {
      eyebrow: 'Beskid Mountains · at the foot of Babia Góra',
      title: 'A mountain house\nthat is yours alone',
      intro:
        'A luxury residence for exclusive use. Silence, space and a view of Babia Góra from every window.',
    },
    booking: {
      label: 'Check availability',
      arrival: 'Arrival',
      departure: 'Departure',
      guests: 'Guests',
      guestsAny: 'up to 10',
      submit: 'Check availability',
    },
    intro: {
      eyebrow: 'About the residence',
      title: 'An escape from everyday life',
      lead: 'Rezydencja Zawoja is the place for those who value peace, privacy and a touch of luxury.',
      body: 'Stylish interiors and high-quality amenities: a spacious living room with a fireplace and a view, a relaxation and fitness area with a jacuzzi, sauna, salt grotto and gym, a billiard room and five cosy bedrooms. Set in the heart of the Beskids, at the foot of Babia Góra, just 100 km from Kraków.',
      link: 'Discover the house',
    },
    spa: {
      eyebrow: 'Relaxation',
      title: 'On-site attractions and spa',
      body: 'We wanted Rezydencja Zawoja to be a haven for body and soul. That is why the house has a salt grotto, a sauna and a jacuzzi with heated salt water.',
      saltGrotto: {
        title: 'Salt grotto',
        description: 'A salty microclimate that soothes the senses and aids recovery.',
      },
      hotTub: {
        title: 'Hot tub',
        description: 'A traditional wood-fired tub with a mountain view, special in winter too.',
      },
      sauna: {
        title: 'Sauna',
        description: 'A Finnish sauna to warm up after a day on the trail.',
      },
      amenities: {
        jacuzzi: 'Salt-water jacuzzi',
        billiards: 'Billiard room',
        fitness: 'Fitness room',
        fireplace: 'Living room with a fireplace and a view',
        terrace: 'Viewing terrace',
        grill: 'Garden grill',
      },
    },
    interiors: {
      eyebrow: 'Unique interiors',
      title: 'A house with soul',
      body: 'Rezydencja Zawoja is a log house where, instead of the typical highland style, we chose distinctive interiors and high-quality furnishings. It is inspired by the magic of residences from past centuries, with antique furniture from the early 20th century collected over the years.',
      antiques: {
        title: 'Furniture with a history',
        description:
          'French chests of drawers, a table from the turn of the last century and an oak sideboard from a Polish manor house.',
      },
      bedrooms: {
        title: 'Five bedrooms',
        description:
          'Each bedroom upstairs has its own individual decor that brings out the style of its furniture.',
      },
      link: 'See the interiors',
    },
    location: {
      eyebrow: 'Picturesque location',
      title: 'Magical views all year round',
      body: 'The house stands on a hilltop among forests that change colour with every season, with a panorama of the Babia Góra massif from the living room windows.',
      facts: {
        trails: { title: 'Babia Góra trails', detail: 'hiking' },
        waterfalls: { title: 'Mountain waterfalls', detail: 'and village chapels' },
        lifts: { title: 'Ski lifts', detail: 'winter season' },
        cycling: { title: 'Cycling routes', detail: 'summer in the Beskids' },
        krakow: { title: '100 km', detail: 'from Kraków' },
      },
    },
    gallery: {
      eyebrow: 'Gallery',
      title: 'Take a look inside',
      link: 'Full gallery',
    },
    pricing: {
      eyebrow: 'Prices {{year}}',
      title: 'The whole house, clear rules',
      note: 'The residence is rented only as a whole, for up to 10 people including children. The sauna, billiards, salt grotto and gym are included. Prices cover a stay for up to 6 people.',
      period: 'Period',
      minimumStay: 'Minimum stay',
      price: 'Price for the house',
      extraPerson: 'Surcharge per person 7–10',
      bookingTitle: 'Book your dates',
      bookingBody: 'Call or write to us and we will confirm availability the same day.',
    },
    cta: {
      eyebrow: 'Booking',
      title: 'Mountains, silence and a house just for you',
      body: 'Check available dates or write to us. We are happy to answer any question about your stay at the Residence.',
      primary: 'Check dates',
      secondary: 'Write to us',
    },
  },
  pricing: {
    unit: { night: 'night', stay: 'stay', week: 'week', weekend: 'weekend' },
  },
  lightbox: {
    label: 'Photo viewer',
    close: 'Close',
    previous: 'Previous photo',
    next: 'Next photo',
    counter: '{{current}} / {{total}}',
  },
  pages: {
    interiors: {
      eyebrow: 'Interiors',
      title: 'A house with soul,\nroom by room',
      intro:
        'A log house where antique furniture meets modern comfort. Every room has a character of its own.',
      nav: 'Rooms',
      guests: 'Number of guests',
      openPhoto: 'Enlarge photo: {{alt}}',
      rooms: {
        salon: {
          name: 'Living room',
          title: 'A living room with a fireplace and a view',
          body: 'The heart of the house is a spacious living room with a stone fireplace and panoramic windows facing the Babia Góra massif. This is where everyone gathers, by the fire, with a view that changes throughout the day.',
          facts: [
            'Wood-burning stone fireplace',
            'Panoramic mountain windows',
            'Seating areas for the whole group',
          ],
        },
        bedrooms: {
          name: 'Bedrooms',
          title: 'Five individual bedrooms',
          body: 'Upstairs there are five cosy bedrooms, each with its own individual decor that brings out the style of its furniture. Soft fabrics, warm wood and the view outside the window make for a peaceful night.',
          facts: [
            'Five bedrooms upstairs',
            'Comfortable beds and bedding',
            'A view of the mountains or forest from every window',
          ],
        },
        bathrooms: {
          name: 'Bathrooms',
          title: 'Comfort in every detail',
          body: 'Bright, well-kept bathrooms with showers and full amenities on every floor make a stay for a large group truly comfortable.',
          facts: ['A bathroom on every floor', 'Showers and full amenities'],
        },
        kitchen: {
          name: 'Kitchen',
          title: 'A kitchen for the whole group',
          body: 'The equipped kitchen lets you cook a shared meal for everyone, and the morning coffee from the espresso machine tastes best with a mountain view.',
          facts: ['Espresso machine', 'Equipment for cooking together'],
        },
        recreation: {
          name: 'Games & fitness',
          title: 'Evenings to enjoy',
          body: 'A billiard room and a fully equipped fitness room mean there is never a dull moment, even in bad weather. There is entertainment for the whole group in every season.',
          facts: [
            'Billiard room',
            'Fitness room with a mountain view',
            'Salt grotto, sauna and jacuzzi',
          ],
        },
        details: {
          name: 'Details',
          title: 'A collection from past centuries',
          body: 'Instead of the typical highland style, we chose distinctive interiors inspired by the magic of old residences. French chests of drawers, an oak sideboard from a Polish manor house and a table from the turn of the last century give the rooms a unique character.',
          facts: [
            'French chests of drawers and an oak sideboard',
            'Antique pieces collected over the years',
            'Hunting trophies and old prints',
          ],
        },
      },
    },
    surroundings: {
      eyebrow: 'Surroundings',
      title: 'At the foot of\nBabia Góra',
      intro:
        'Zawoja is the longest village in Poland, stretching 18 km through the Żywiec Beskids, right below the majestic Queen of the Beskids.',
      overview: {
        eyebrow: 'Żywiec Beskids',
        title: 'A moment of peace, far from the bustle',
        lead: 'Zawoja stretches along the Skawica, Jaworzyna and Mosorczyk rivers at the foot of Babia Góra, which draws adventurous visitors like a magnet.',
        body: 'The location is ideal for rest and sport. You will find everything you need to get away from the city: picturesque landscapes, highland traditions and attractions for the whole family, all year round.',
      },
      rows: {
        babiaGora: {
          eyebrow: 'Babia Góra',
          title: 'Queen of the Beskids',
          body: 'The highest peak of the Żywiec Beskids and, outside the Tatras, the highest in Poland, part of the Crown of Polish Mountains. Unpredictable and mysterious, it offers real high-mountain hiking and breathtaking views. And those famous sunrises!',
          bullets: [
            'Babia Góra National Park, a UNESCO site since 1977',
            'PTTK mountain hut at Markowe Szczawiny, 1,180 m',
            'Snowshoes to borrow for our guests',
          ],
        },
        slopes: {
          eyebrow: 'Winter and skiing',
          title: 'Slopes close at hand',
          body: 'The Mosorny Groń resort in Zawoja Policzne has a chairlift and an almost 1.5 km run with a view of Babia Góra, with artificial snow and evening lighting. Beginners have a separate T-bar lift, and in Czatoża there is the Wojtek lift complex.',
          bullets: [
            'Chairlift to Mosorny Groń, 1,045 m',
            'Red run, open in the evening too',
            'Equipment rental and ski school',
          ],
        },
        trails: {
          eyebrow: 'By bike',
          title: 'Babia Góra Trails',
          body: 'A 20 km network of mountain singletracks built jointly by Zawoja and Oravská Polhora. On the Polish side there are 14.5 km of climbing and descending trails of varying difficulty, with a cross-border link to Slovakia.',
          bullets: [
            'Dual pump track and bike park in Zawoja Morgi',
            'Trails of varying difficulty',
            '5.2 km singletrack connecting to Slovakia',
          ],
        },
        waterfalls: {
          eyebrow: 'Nature and culture',
          title: 'Waterfalls and wooden chapels',
          body: 'It is worth venturing further: the waterfall on the Mosorny stream is about 8 m high, one of the largest in the Beskids. Nearby you will also find the historic Chapel of Our Lady of the Angels and an open-air museum of Babia Góra folk architecture.',
          bullets: [
            'Waterfall on the Mosorny stream, about 8 m high',
            'Chapel of Our Lady of the Angels, 1905–1908',
            'Józef Żak open-air museum in Zawoja Markowa',
          ],
        },
      },
      facts: [
        { value: '100 km', label: 'from Kraków' },
        { value: '1725 m', label: 'Babia Góra summit' },
        { value: '20 km', label: 'of cycling trails' },
        { value: '18 km', label: 'length of Zawoja' },
      ],
    },
    gallery: {
      eyebrow: 'Gallery',
      title: 'Look into\nevery corner',
      intro:
        'Interiors full of character, a place to unwind and views you will remember for a long time. See Rezydencja Zawoja inside and out.',
      filters: {
        label: 'Filter photos',
        all: 'All',
        interiors: 'Interiors',
        spa: 'Spa',
        terraceGarden: 'Terrace & garden',
        surroundings: 'Surroundings',
      },
      openPhoto: 'Enlarge photo: {{alt}}',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Welcome to\nthe Residence',
      intro:
        'If you have questions or would like to book, we are here to help. Call us or use the form, and we will confirm availability the same day.',
    },
    notFound: {
      eyebrow: 'Error 404',
      title: 'This page\ndoes not exist',
      intro: 'The page you are looking for does not exist or has been moved.',
      back: 'Back to the home page',
    },
  },
} satisfies Messages
