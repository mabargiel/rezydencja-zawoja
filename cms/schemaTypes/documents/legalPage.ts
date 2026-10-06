import { DocumentTextIcon } from '@sanity/icons/DocumentText'
import { defineArrayMember, defineField, defineType } from 'sanity'

import { localizedValidation } from '../localized'

export const legalPages = {
  privacyPolicy: 'Polityka prywatności',
  rentalTerms: 'Regulamin najmu',
} as const

const bodyField = (name: 'pl' | 'en' | 'de', title: string) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [
      defineArrayMember({
        type: 'block',
        styles: [
          { title: 'Akapit', value: 'normal' },
          { title: 'Nagłówek', value: 'h2' },
          { title: 'Podtytuł', value: 'h3' },
        ],
        lists: [
          { title: 'Punkty', value: 'bullet' },
          { title: 'Numeracja', value: 'number' },
        ],
        marks: {
          decorators: [{ title: 'Pogrubienie', value: 'strong' }],
          annotations: [
            defineArrayMember({
              name: 'link',
              title: 'Link',
              type: 'object',
              fields: [
                defineField({
                  name: 'href',
                  title: 'Adres',
                  type: 'url',
                  validation: rule => rule.required().uri({ scheme: ['https', 'mailto', 'tel'] }),
                }),
              ],
            }),
          ],
        },
      }),
    ],
    validation: rule =>
      name === 'pl'
        ? rule.required().min(1)
        : rule
            .custom(value => (Array.isArray(value) && value.length > 0 ? true : 'Brak tłumaczenia'))
            .warning(),
  })

export const legalPage = defineType({
  name: 'legalPage',
  title: 'Dokument prawny',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł',
      type: 'internationalizedArrayString',
      validation: localizedValidation,
    }),
    defineField({
      name: 'updatedAt',
      title: 'Ostatnia aktualizacja',
      type: 'date',
      options: { dateFormat: 'D MMMM YYYY' },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Treść',
      type: 'object',
      options: { collapsible: false },
      fields: [
        bodyField('pl', 'Po polsku (wersja wiążąca)'),
        bodyField('en', 'English'),
        bodyField('de', 'Deutsch'),
      ],
    }),
  ],
  preview: {
    select: { id: '_id' },
    prepare: ({ id }) => ({
      title: legalPages[id as keyof typeof legalPages] ?? 'Dokument prawny',
    }),
  },
})
