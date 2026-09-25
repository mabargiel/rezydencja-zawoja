import { ImagesIcon } from '@sanity/icons/Images'
import { defineType } from 'sanity'

import { header, photoList } from './fields'

export const galleryPage = defineType({
  name: 'galleryPage',
  title: 'Galeria',
  type: 'document',
  icon: ImagesIcon,
  fields: [header, photoList('photos', 'Zdjęcia w galerii')],
  preview: { prepare: () => ({ title: 'Galeria' }) },
})
