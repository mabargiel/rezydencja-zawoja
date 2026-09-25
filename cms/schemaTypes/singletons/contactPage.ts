import { EnvelopeIcon } from '@sanity/icons/Envelope'
import { defineType } from 'sanity'

import { header, slot } from './fields'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Kontakt',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [header, slot('map', 'Mapa dojazdu')],
  preview: { prepare: () => ({ title: 'Kontakt' }) },
})
