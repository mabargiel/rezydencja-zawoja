import { defineArrayMember, defineField } from 'sanity'

export const slot = (name: string, title: string) =>
  defineField({ name, title, type: 'mediaSlot', validation: rule => rule.required() })

export const slotList = (name: string, title: string, count: number) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [defineArrayMember({ type: 'mediaSlot' })],
    validation: rule => rule.required().length(count).error(`Dodaj dokładnie ${count} zdjęcia`),
  })

export const photoList = (name: string, title: string, max?: number) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [defineArrayMember({ type: 'reference', to: [{ type: 'photo' }] })],
    options: { layout: 'grid' },
    validation: rule => {
      const required = rule.required().min(1).unique()
      return max ? required.max(max) : required
    },
  })

export const header = slot('header', 'Zdjęcie w nagłówku')
