import { TagIcon } from '@sanity/icons/Tag'
import { defineArrayMember, defineField, defineType } from 'sanity'

import { localizedValidation } from '../localized'

const units = [
  { title: 'za dobę', value: 'night' },
  { title: 'za pobyt', value: 'stay' },
  { title: 'za tydzień', value: 'week' },
  { title: 'za weekend', value: 'weekend' },
]

const amountField = defineField({
  name: 'amount',
  title: 'Kwota (zł)',
  type: 'number',
  validation: rule => rule.required().positive().integer(),
})

const unitField = defineField({
  name: 'unit',
  title: 'Za',
  type: 'string',
  options: { layout: 'radio', direction: 'horizontal', list: units },
  validation: rule => rule.required(),
})

type LocalizedItem = { language: string; value: string }
const polish = (items?: LocalizedItem[]) => items?.find(item => item.language === 'pl')?.value

export const pricing = defineType({
  name: 'pricing',
  title: 'Cennik',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'year',
      title: 'Rok cennika',
      type: 'number',
      validation: rule => rule.required().integer().min(2026),
    }),
    defineField({
      name: 'rates',
      title: 'Stawki',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'rate',
          title: 'Stawka',
          type: 'object',
          fields: [
            defineField({
              name: 'period',
              title: 'Termin',
              type: 'internationalizedArrayString',
              validation: localizedValidation,
            }),
            defineField({
              name: 'minimumStay',
              title: 'Minimalny pobyt',
              type: 'internationalizedArrayString',
              validation: localizedValidation,
            }),
            amountField,
            unitField,
            defineField({
              name: 'extraPerson',
              title: 'Dopłata za osobę 7–10',
              type: 'object',
              fields: [amountField, unitField],
              validation: rule => rule.required(),
            }),
          ],
          preview: {
            select: { amount: 'amount', period: 'period', unit: 'unit' },
            prepare: ({ amount, period, unit }) => ({
              subtitle: `${amount} zł ${units.find(item => item.value === unit)?.title ?? ''}`,
              title: polish(period) ?? 'Stawka',
            }),
          },
        }),
      ],
      validation: rule => rule.required().min(1),
    }),
    defineField({
      name: 'addOns',
      title: 'Opcje dodatkowo płatne',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'addOn',
          title: 'Opcja',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Nazwa',
              type: 'internationalizedArrayString',
              validation: localizedValidation,
            }),
            defineField({
              name: 'note',
              title: 'Uwaga',
              type: 'internationalizedArrayString',
            }),
            amountField,
            unitField,
          ],
          preview: {
            select: { amount: 'amount', name: 'name' },
            prepare: ({ amount, name }) => ({
              subtitle: `${amount} zł`,
              title: polish(name) ?? 'Opcja',
            }),
          },
        }),
      ],
    }),
    defineField({
      name: 'facts',
      title: 'Zasady pobytu',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'fact',
          title: 'Zasada',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Nazwa',
              type: 'internationalizedArrayString',
              validation: localizedValidation,
            }),
            defineField({
              name: 'value',
              title: 'Opis',
              type: 'internationalizedArrayString',
              validation: localizedValidation,
            }),
          ],
          preview: {
            select: { label: 'label', value: 'value' },
            prepare: ({ label, value }) => ({ subtitle: polish(value), title: polish(label) }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { year: 'year' },
    prepare: ({ year }) => ({ title: `Cennik ${year ?? ''}` }),
  },
})
