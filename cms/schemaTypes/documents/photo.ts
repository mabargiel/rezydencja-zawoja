import { ImagesIcon } from '@sanity/icons/Images'
import { defineField, defineType } from 'sanity'

import { localizedValidation } from '../localized'

export const photoCategories = [
  { title: 'Wnętrza', value: 'interiors' },
  { title: 'Strefa SPA', value: 'spa' },
  { title: 'Taras i ogród', value: 'terraceGarden' },
  { title: 'Okolica', value: 'surroundings' },
]

export const photo = defineType({
  name: 'photo',
  title: 'Zdjęcie',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Zdjęcie',
      type: 'image',
      options: { hotspot: true },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Opis alternatywny',
      description: 'Krótki opis tego, co widać na zdjęciu, dla czytników ekranu i wyszukiwarek.',
      type: 'internationalizedArrayString',
      validation: localizedValidation,
    }),
    defineField({
      name: 'category',
      title: 'Kategoria w galerii',
      type: 'string',
      options: { layout: 'radio', list: photoCategories },
      validation: rule => rule.required(),
    }),
  ],
  preview: {
    select: { alt: 'alt', category: 'category', media: 'image' },
    prepare: ({ alt, category, media }) => ({
      media,
      subtitle: photoCategories.find(item => item.value === category)?.title,
      title:
        (alt as { language: string; value: string }[] | undefined)?.find(
          item => item.language === 'pl'
        )?.value ?? 'Bez opisu',
    }),
  },
})
