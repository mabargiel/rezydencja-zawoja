import { EarthGlobeIcon } from '@sanity/icons/EarthGlobe'
import { defineType } from 'sanity'

import { header, slot } from './fields'

export const surroundingsPage = defineType({
  name: 'surroundingsPage',
  title: 'Okolica',
  type: 'document',
  icon: EarthGlobeIcon,
  fields: [
    header,
    slot('babiaGora', 'Babia Góra'),
    slot('slopes', 'Stoki narciarskie'),
    slot('trails', 'Szlaki'),
    slot('waterfalls', 'Wodospady i kaplice'),
  ],
  preview: { prepare: () => ({ title: 'Okolica' }) },
})
