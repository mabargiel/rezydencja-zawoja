import { LockIcon } from '@sanity/icons/Lock'
import { defineField, defineType } from 'sanity'

export const tracking = defineType({
  name: 'tracking',
  title: 'Pliki cookies i Piksel Meta',
  type: 'document',
  icon: LockIcon,
  fields: [
    defineField({
      name: 'enabled',
      title: 'Włączone',
      description:
        'Pokazuje baner zgody na cookies i po akceptacji ładuje Piksel Meta. Przed włączeniem opublikuj politykę prywatności, która opisuje piksel.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'pixelId',
      title: 'ID Piksela Meta',
      description: 'Znajdziesz je w Meta Events Manager (same cyfry).',
      type: 'string',
      validation: rule =>
        rule.custom((value, context) => {
          const isEnabled = (context.document as { enabled?: boolean } | undefined)?.enabled
          if (!value) return isEnabled ? 'Podaj ID piksela, aby włączyć śledzenie' : true
          return /^\d{10,20}$/.test(value) ? true : 'ID piksela składa się z samych cyfr'
        }),
    }),
    defineField({
      name: 'activeFrom',
      title: 'Aktywne od',
      description: 'Opcjonalnie. Przed tą datą baner i piksel nie działają.',
      type: 'datetime',
    }),
    defineField({
      name: 'activeUntil',
      title: 'Aktywne do',
      description: 'Opcjonalnie. Po tej dacie baner i piksel przestają działać.',
      type: 'datetime',
      validation: rule =>
        rule.custom((value, context) => {
          const from = (context.document as { activeFrom?: string } | undefined)?.activeFrom
          return value && from && value <= from ? 'Data końca musi być po dacie początku' : true
        }),
    }),
    defineField({
      name: 'consentMonths',
      title: 'Jak długo pamiętać decyzję (miesiące)',
      description: 'Po tym czasie baner zapyta odwiedzającego ponownie.',
      type: 'number',
      initialValue: 12,
      validation: rule => rule.required().integer().min(1).max(24),
    }),
  ],
  preview: {
    select: { enabled: 'enabled' },
    prepare: ({ enabled }) => ({
      subtitle: enabled ? 'Włączone' : 'Wyłączone',
      title: 'Pliki cookies i Piksel Meta',
    }),
  },
})
