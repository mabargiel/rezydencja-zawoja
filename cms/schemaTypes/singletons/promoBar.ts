import { BellIcon } from '@sanity/icons/Bell'
import { defineArrayMember, defineField, defineType } from 'sanity'

import { localizedValidation, polishText } from '../localized'

const actions = [
  { title: 'Zadzwoń', value: 'call' },
  { title: 'Napisz do nas', value: 'contact' },
  { title: 'Bez przycisku', value: 'none' },
]

const formatDate = (value: unknown) =>
  typeof value === 'string' ? value.split('-').reverse().join('.') : '…'

export const promoBar = defineType({
  name: 'promoBar',
  title: 'Pasek promocyjny',
  type: 'document',
  icon: BellIcon,
  fields: [
    defineField({
      name: 'enabled',
      title: 'Włączony',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'messages',
      title: 'Komunikaty',
      description:
        'Pasek pokazuje pierwszy komunikat z listy, którego daty obejmują dzisiejszy dzień. Komunikat bez dat pasuje zawsze, więc taki dawaj na koniec.',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'promoMessage',
          title: 'Komunikat',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Nagłówek',
              description: 'Krótko, np. „Wolne terminy”. Na telefonie jest ukryty.',
              type: 'internationalizedArrayString',
              validation: localizedValidation,
            }),
            defineField({
              name: 'text',
              title: 'Treść',
              type: 'internationalizedArrayString',
              validation: localizedValidation,
            }),
            defineField({
              name: 'shortText',
              title: 'Krótka treść na telefon',
              description: 'Opcjonalnie. Gdy pusta, telefon pokazuje pełną treść.',
              type: 'internationalizedArrayString',
            }),
            defineField({
              name: 'showFrom',
              title: 'Pokazuj od',
              description: 'Opcjonalnie, włącznie.',
              type: 'date',
              options: { dateFormat: 'DD.MM.YYYY' },
            }),
            defineField({
              name: 'showUntil',
              title: 'Pokazuj do',
              description: 'Opcjonalnie, włącznie.',
              type: 'date',
              options: { dateFormat: 'DD.MM.YYYY' },
              validation: rule =>
                rule.custom((value, context) => {
                  const from = (context.parent as { showFrom?: string } | undefined)?.showFrom
                  return value && from && value < from
                    ? 'Data końca jest przed datą początku'
                    : true
                }),
            }),
            defineField({
              name: 'action',
              title: 'Przycisk',
              type: 'string',
              initialValue: 'call',
              options: { layout: 'radio', list: actions },
              validation: rule => rule.required(),
            }),
          ],
          preview: {
            select: { from: 'showFrom', text: 'text', until: 'showUntil' },
            prepare: ({ from, text, until }) => ({
              subtitle: from || until ? `${formatDate(from)} – ${formatDate(until)}` : 'Zawsze',
              title: polishText(text) ?? 'Komunikat',
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { enabled: 'enabled' },
    prepare: ({ enabled }) => ({
      subtitle: enabled ? 'Włączony' : 'Wyłączony',
      title: 'Pasek promocyjny',
    }),
  },
})
