import { defineArrayMember, defineField, defineType } from 'sanity'

export const photoGallery = defineType({
  name: 'photoGallery',
  title: 'Photo Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Gallery Title',
      type: 'string',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [defineArrayMember({ type: 'image', options: { hotspot: true } })],
      options: { layout: 'grid' },
    }),
  ],
})
