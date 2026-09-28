import { BlockContentIcon } from '@sanity/icons/BlockContent'
import { defineArrayMember, defineField, defineType } from 'sanity'

import { localizedValidation } from '../localized'
import { header } from './fields'

export const roomTypes = [
  { title: 'Salon', value: 'salon' },
  { title: 'Kuchnia', value: 'kitchen' },
  { title: 'Sypialnie', value: 'bedrooms' },
  { title: 'Rozrywka i fitness', value: 'recreation' },
  { title: 'Łazienki', value: 'bathrooms' },
]

type LocalizedItem = { language: string; value: string }
const polish = (items?: LocalizedItem[]) => items?.find(item => item.language === 'pl')?.value

export const interiorsPage = defineType({
  name: 'interiorsPage',
  title: 'Wnętrza',
  type: 'document',
  icon: BlockContentIcon,
  fields: [
    header,
    defineField({
      name: 'rooms',
      title: 'Pomieszczenia',
      description: 'Kolejność pomieszczeń na stronie. Pierwsze zdjęcie w każdym jest największe.',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'room',
          title: 'Pomieszczenie',
          type: 'object',
          fields: [
            defineField({
              name: 'type',
              title: 'Rodzaj',
              type: 'string',
              options: { list: roomTypes },
              validation: rule => rule.required(),
            }),
            defineField({
              name: 'photos',
              title: 'Zdjęcia',
              type: 'array',
              of: [defineArrayMember({ type: 'reference', to: [{ type: 'photo' }] })],
              options: { layout: 'grid' },
              validation: rule => rule.required().min(1).max(16).unique(),
            }),
          ],
          preview: {
            select: { count: 'photos.length', media: 'photos.0.image', type: 'type' },
            prepare: ({ count, media, type }) => ({
              media,
              subtitle: `${count ?? 0} zdj.`,
              title: roomTypes.find(item => item.value === type)?.title ?? 'Pomieszczenie',
            }),
          },
        }),
      ],
      validation: rule =>
        rule.required().custom<{ type?: string }[]>(rooms => {
          const types = (rooms ?? []).map(room => room.type).filter(Boolean)
          return new Set(types).size === types.length
            ? true
            : 'Każdy rodzaj pomieszczenia może wystąpić tylko raz'
        }),
    }),
    defineField({
      name: 'bedrooms',
      title: 'Sypialnie',
      description: 'Karty sypialni widoczne w sekcji „Sypialnie”.',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'bedroom',
          title: 'Sypialnia',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Nazwa',
              type: 'internationalizedArrayString',
              validation: localizedValidation,
            }),
            defineField({
              name: 'beds',
              title: 'Łóżka',
              description: 'Np. „łóżko podwójne i pojedyncze”.',
              type: 'internationalizedArrayString',
              validation: localizedValidation,
            }),
            defineField({
              name: 'guests',
              title: 'Liczba osób',
              type: 'number',
              validation: rule => rule.required().integer().min(1).max(4),
            }),
            defineField({
              name: 'photos',
              title: 'Zdjęcia',
              description: 'Pierwsze zdjęcie pojawia się na karcie, wszystkie w podglądzie.',
              type: 'array',
              of: [defineArrayMember({ type: 'reference', to: [{ type: 'photo' }] })],
              options: { layout: 'grid' },
              validation: rule => rule.required().min(1).max(12).unique(),
            }),
          ],
          preview: {
            select: { guests: 'guests', media: 'photos.0.image', name: 'name' },
            prepare: ({ guests, media, name }) => ({
              media,
              subtitle: guests ? `${guests} os.` : undefined,
              title: polish(name) ?? 'Sypialnia',
            }),
          },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Wnętrza' }) },
})
