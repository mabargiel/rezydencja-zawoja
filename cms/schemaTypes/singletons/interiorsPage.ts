import { BlockContentIcon } from '@sanity/icons/BlockContent'
import { defineType } from 'sanity'

import { header, slot, slotList } from './fields'

export const interiorsPage = defineType({
  name: 'interiorsPage',
  title: 'Wnętrza',
  type: 'document',
  icon: BlockContentIcon,
  fields: [
    header,
    slot('livingRoom', 'Salon z kominkiem'),
    slot('antiques', 'Zabytkowe meble'),
    slot('bedrooms', 'Sypialnie'),
    slot('comfort', 'Wygoda i łazienki'),
    slotList('relaxation', 'Relaks', 2),
    slotList('details', 'Detale', 4),
  ],
  preview: { prepare: () => ({ title: 'Wnętrza' }) },
})
