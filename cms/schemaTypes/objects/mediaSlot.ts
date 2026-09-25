import { ImageIcon } from '@sanity/icons/Image'
import { defineField, defineType } from 'sanity'

export const mediaSlot = defineType({
  name: 'mediaSlot',
  title: 'Zdjęcie',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'photo',
      title: 'Zdjęcie',
      type: 'reference',
      to: [{ type: 'photo' }],
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'winterPhoto',
      title: 'Zdjęcie zimowe',
      description: 'Pokazywane zamiast zdjęcia głównego, gdy w ustawieniu „Sezon” wybrano zimę.',
      type: 'reference',
      to: [{ type: 'photo' }],
    }),
  ],
  preview: {
    select: { media: 'photo.image', title: 'photo.alt.0.value', winter: 'winterPhoto._ref' },
    prepare: ({ media, title, winter }) => ({
      media,
      subtitle: winter ? 'Ma wariant zimowy' : undefined,
      title: title ?? 'Brak zdjęcia',
    }),
  },
})
