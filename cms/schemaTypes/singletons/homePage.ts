import { HomeIcon } from '@sanity/icons/Home'
import { defineField, defineType } from 'sanity'

import { photoList, slot } from './fields'

export const homePage = defineType({
  name: 'homePage',
  title: 'Strona główna',
  type: 'document',
  icon: HomeIcon,
  fields: [
    slot('heroDesktop', 'Zdjęcie powitalne (komputer)'),
    slot('heroMobile', 'Zdjęcie powitalne (telefon)'),
    defineField({
      name: 'intro',
      title: 'O rezydencji',
      type: 'object',
      fields: [slot('house', 'Dom'), slot('detail', 'Detal')],
    }),
    defineField({
      name: 'spa',
      title: 'Strefa SPA',
      type: 'object',
      fields: [
        slot('saltGrotto', 'Grota solna'),
        slot('hotTub', 'Gorąca bania'),
        slot('sauna', 'Sauna'),
      ],
    }),
    slot('interiors', 'Wnętrza'),
    slot('location', 'Lokalizacja (panorama)'),
    photoList('galleryPreview', 'Podgląd galerii', 4),
  ],
  preview: { prepare: () => ({ title: 'Strona główna' }) },
})
