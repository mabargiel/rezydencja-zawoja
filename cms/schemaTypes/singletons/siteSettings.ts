import { SunIcon } from '@sanity/icons/Sun'
import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Sezon',
  type: 'document',
  icon: SunIcon,
  fields: [
    defineField({
      name: 'season',
      title: 'Aktualny sezon',
      description:
        'Zima pokazuje zimowe warianty zdjęć i wideo wszędzie tam, gdzie je dodano. Pozostałe miejsca pokazują zdjęcia główne.',
      type: 'string',
      initialValue: 'summer',
      options: {
        layout: 'radio',
        list: [
          { title: 'Lato', value: 'summer' },
          { title: 'Zima', value: 'winter' },
        ],
      },
      validation: rule => rule.required(),
    }),
  ],
  preview: {
    select: { season: 'season' },
    prepare: ({ season }) => ({
      subtitle: season === 'winter' ? 'Zima' : 'Lato',
      title: 'Sezon',
    }),
  },
})
